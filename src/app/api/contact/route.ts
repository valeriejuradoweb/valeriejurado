import { NextRequest, NextResponse } from 'next/server';
import { saveSubmission, hasEmailBeenSubmitted, updateSubmission } from '@/lib/storage';
import { sendSubmissionNotification, EmailConfig } from '@/lib/email';

/**
 * Detects if a string contains mostly random characters (high entropy, no dictionary words)
 * This helps identify bot-generated spam like "qMyhibqJxAFehtyuRIXqi"
 */
function isRandomCharacterString(text: string): boolean {
  if (!text || text.trim().length === 0) return false;
  
  const cleaned = text.trim();
  const length = cleaned.length;
  
  // If too short, not suspicious
  if (length < 8) return false;
  
  // Count uppercase, lowercase, and numbers
  const upperCaseCount = (cleaned.match(/[A-Z]/g) || []).length;
  const lowerCaseCount = (cleaned.match(/[a-z]/g) || []).length;
  const numberCount = (cleaned.match(/[0-9]/g) || []).length;
  const specialCharCount = (cleaned.match(/[^A-Za-z0-9\s]/g) || []).length;
  
  // High ratio of mixed case suggests random generation
  const hasMixedCase = upperCaseCount > 0 && lowerCaseCount > 0;
  const mixedCaseRatio = hasMixedCase ? (upperCaseCount + lowerCaseCount) / length : 0;
  
  // Check for common dictionary words (simple check)
  const commonWords = ['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'has', 'let', 'put', 'say', 'she', 'too', 'use'];
  const lowerText = cleaned.toLowerCase();
  const hasDictionaryWord = commonWords.some(word => lowerText.includes(word));
  
  // Calculate character diversity (entropy indicator)
  const uniqueChars = new Set(cleaned.toLowerCase().replace(/[^a-z]/g, '')).size;
  const diversityRatio = uniqueChars / Math.min(length, 26);
  
  // Suspicious patterns:
  // 1. High mixed case ratio (>0.5) with no dictionary words
  // 2. High character diversity (>0.7) with mixed case
  // 3. Mostly alphanumeric with no spaces and no dictionary words
  const hasSpaces = cleaned.includes(' ');
  const suspiciousPattern = 
    (!hasDictionaryWord && mixedCaseRatio > 0.5 && length > 10) ||
    (hasMixedCase && diversityRatio > 0.7 && !hasSpaces && length > 12) ||
    (!hasSpaces && !hasDictionaryWord && length > 15 && (upperCaseCount + lowerCaseCount) / length > 0.8);
  
  return suspiciousPattern;
}

/**
 * Validates content for spam patterns
 */
function detectSpamPatterns(firstName: string, lastName: string, email: string, address1?: string, address2?: string, details?: string): { isSpam: boolean; reasons: string[] } {
  const reasons: string[] = [];
  
  // Check names for random character patterns
  if (isRandomCharacterString(firstName)) {
    reasons.push('First name contains random character pattern');
  }
  if (isRandomCharacterString(lastName)) {
    reasons.push('Last name contains random character pattern');
  }
  
  // Check full name together
  const fullName = `${firstName} ${lastName}`.trim();
  if (isRandomCharacterString(fullName)) {
    reasons.push('Full name appears to be randomly generated');
  }
  
  // Check addresses for random patterns
  if (address1 && isRandomCharacterString(address1)) {
    reasons.push('Address 1 contains random character pattern');
  }
  if (address2 && isRandomCharacterString(address2)) {
    reasons.push('Address 2 contains random character pattern');
  }
  
  // Check email for suspicious patterns
  const emailLocal = email.split('@')[0];
  if (emailLocal && isRandomCharacterString(emailLocal)) {
    reasons.push('Email local part appears randomly generated');
  }
  
  // Check for excessive random character sequences in details
  if (details) {
    const words = details.split(/\s+/);
    const randomWordCount = words.filter(word => isRandomCharacterString(word)).length;
    if (randomWordCount > 2 && words.length > 0) {
      const randomRatio = randomWordCount / words.length;
      if (randomRatio > 0.3) {
        reasons.push('Details field contains excessive random character sequences');
      }
    }
  }
  
  return {
    isSpam: reasons.length > 0,
    reasons
  };
}

/**
 * Extracts IP address from request headers
 */
function getIpAddress(request: NextRequest): string | undefined {
  // Check various headers that might contain the real IP
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim();
  }
  
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  
  // Fallback to connection remote address (if available)
  return undefined;
}

async function verifyRecaptcha(token: string): Promise<{ success: boolean; score?: number; error?: string }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.error('reCAPTCHA Secret Key not configured');
    return { success: false, error: 'Server configuration error' };
  }

  if (!token || token.trim() === '') {
    console.error('reCAPTCHA token is missing or empty');
    return { success: false, error: 'Token missing' };
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    
    // reCAPTCHA v3 returns a score (0.0 to 1.0)
    // 1.0 is very likely a human, 0.0 is very likely a bot
    // Increased threshold to 0.7 for stricter validation
    const scoreThreshold = 0.7;
    
    console.log('reCAPTCHA verification response:', {
      success: data.success,
      score: data.score,
      errors: data['error-codes'],
      action: data.action,
    });
    
    if (!data.success) {
      return { 
        success: false, 
        score: data.score,
        error: data['error-codes']?.join(', ') || 'Verification failed'
      };
    }
    
    if (data.score === undefined || data.score === null) {
      console.error('reCAPTCHA score is missing');
      return { success: false, error: 'Score missing' };
    }
    
    if (data.score < scoreThreshold) {
      console.log(`reCAPTCHA score ${data.score} is below threshold ${scoreThreshold}`);
      return { success: false, score: data.score, error: 'Score too low' };
    }
    
    return { success: true, score: data.score };
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      service, 
      eventDate, 
      address1, 
      address2, 
      details,
      recaptchaToken,
      website // Honeypot field - should be empty
    } = body;

    // Honeypot check - if this field is filled, it's a bot
    if (website && website.trim() !== '') {
      console.warn('Honeypot field filled - bot detected:', { website, email });
      return NextResponse.json(
        { error: 'Invalid submission detected.' },
        { status: 403 }
      );
    }

    // Extract IP address and user agent
    const ipAddress = getIpAddress(request);
    const userAgent = request.headers.get('user-agent') || undefined;

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'First name, last name, and email are required' },
        { status: 400 }
      );
    }

    // Validate email format more strictly
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Detect spam patterns BEFORE reCAPTCHA verification
    const spamCheck = detectSpamPatterns(firstName, lastName, email, address1, address2, details);
    
    // Verify reCAPTCHA token
    const recaptchaResult = await verifyRecaptcha(recaptchaToken);
    
    // For suspicious patterns, require higher reCAPTCHA score
    if (spamCheck.isSpam && recaptchaResult.score !== undefined) {
      const strictThreshold = 0.8;
      if (recaptchaResult.score < strictThreshold) {
        console.warn('Suspicious submission with low reCAPTCHA score:', {
          score: recaptchaResult.score,
          reasons: spamCheck.reasons,
          email,
          ipAddress
        });
        return NextResponse.json(
          { 
            error: 'Submission verification failed. Please try again.',
            details: process.env.NODE_ENV === 'development' ? `Score: ${recaptchaResult.score}, Threshold: ${strictThreshold}` : undefined
          },
          { status: 403 }
        );
      }
    }
    
    if (!recaptchaResult.success) {
      // In development, allow browser-error to pass through (domain mismatch on localhost)
      if (process.env.NODE_ENV === 'development' && recaptchaResult.error?.includes('browser-error')) {
        console.warn('reCAPTCHA browser-error in development - allowing submission. Add localhost to reCAPTCHA domains for proper testing.');
      } else {
        console.error('reCAPTCHA verification failed:', {
          error: recaptchaResult.error,
          score: recaptchaResult.score,
          hasToken: !!recaptchaToken,
          ipAddress,
          spamDetected: spamCheck.isSpam
        });
        return NextResponse.json(
          { 
            error: 'reCAPTCHA verification failed. Please try again.',
            details: process.env.NODE_ENV === 'development' ? recaptchaResult.error : undefined
          },
          { status: 403 }
        );
      }
    } else {
      console.log('reCAPTCHA verification successful, score:', recaptchaResult.score, {
        spamDetected: spamCheck.isSpam,
        ipAddress
      });
    }

    // Block spam submissions
    if (spamCheck.isSpam) {
      console.warn('Spam submission blocked:', {
        email,
        firstName,
        lastName,
        reasons: spamCheck.reasons,
        recaptchaScore: recaptchaResult.score,
        ipAddress,
        userAgent
      });
      
      // Still save it for analysis, but mark as spam and don't send emails
      const spamSubmission = saveSubmission({
        firstName,
        lastName,
        email,
        phone,
        service,
        eventDate,
        address1,
        address2,
        details,
        ipAddress,
        userAgent,
        recaptchaScore: recaptchaResult.score ?? undefined,
        spamDetected: true,
        spamReasons: spamCheck.reasons
      });
      
      console.log('Spam submission saved for analysis:', spamSubmission.id);
      
      return NextResponse.json(
        { error: 'Your submission could not be processed. Please check your information and try again.' },
        { status: 403 }
      );
    }

    // Check if this email has been submitted before (BEFORE saving)
    const isNewEmail = !hasEmailBeenSubmitted(email);
    console.log(`Email ${email} is ${isNewEmail ? 'NEW' : 'EXISTING'} - Mailchimp will ${isNewEmail ? 'be called' : 'be skipped'}`);

    // Save submission to local JSON storage with metadata
    const submission = saveSubmission({
      firstName,
      lastName,
      email,
      phone,
      service,
      eventDate,
      address1,
      address2,
      details,
      ipAddress,
      userAgent,
      recaptchaScore: recaptchaResult.score ?? undefined
    });

    console.log('Form submission saved locally:', submission.id, {
      ipAddress,
      recaptchaScore: recaptchaResult.score
    });

    // Only add to Mailchimp if this is a new email address
    // Do this BEFORE sending email so the email shows correct status
    if (isNewEmail) {
      try {
        await addToMailchimp(submission);
        updateSubmission(submission.id, { mailchimpAdded: true });
        console.log('Added new email to Mailchimp audience');
        // Reload submission to get updated mailchimpAdded status
        submission.mailchimpAdded = true;
      } catch (mailchimpError) {
        console.error('Error adding to Mailchimp:', mailchimpError);
        // Don't fail the request if Mailchimp fails
      }
    } else {
      console.log('Email already exists in submissions, skipping Mailchimp');
    }

    // Send email notification to multiple recipients (after Mailchimp update)
    const emailConfig: EmailConfig = {
      host: process.env.EMAIL_HOST!,
      port: parseInt(process.env.EMAIL_PORT!),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
      from: process.env.EMAIL_FROM!,
      to: [
        process.env.EMAIL_TO_1!,
        process.env.EMAIL_TO_2!,
        process.env.EMAIL_TO_3!
      ].filter(Boolean), // Remove any undefined values
    };

    // Validate email configuration
    if (!emailConfig.host || !emailConfig.auth.user || !emailConfig.auth.pass || !emailConfig.from || !Array.isArray(emailConfig.to) || emailConfig.to.length === 0) {
      console.error('Missing email configuration');
      // Don't fail the request, just log the error
    } else {
      try {
        const emailSent = await sendSubmissionNotification(submission, emailConfig);
        if (emailSent) {
          console.log('Email notification sent successfully');
        } else {
          console.error('Failed to send email notification');
        }
      } catch (emailError) {
        console.error('Error sending email notification:', emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you! Your message has been sent successfully.' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send message. Please try again later.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

async function addToMailchimp(submission: any) {
  // Get Mailchimp credentials from environment
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  if (!apiKey || !audienceId || !serverPrefix) {
    throw new Error('Missing Mailchimp environment variables');
  }

  // Prepare data for Mailchimp API
  const memberData = {
    email_address: submission.email,
    status: 'subscribed',
    merge_fields: {
      FNAME: submission.firstName,
      LNAME: submission.lastName,
      PHONE: submission.phone || '',
      'EVENTDATE': submission.eventDate || '',
      'DETAILS': submission.details || '',
      'ADDRESS1': submission.address1 || '',
      'ADDRESS2': submission.address2 || '',
    },
    tags: ['Contact Form', 'Website Submission', 'New Customer'],
  };

  console.log('Adding new email to Mailchimp:', submission.email);
  
  const response = await fetch(
    `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members/${Buffer.from(submission.email).toString('base64')}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `apikey ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memberData),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Mailchimp API error details:', errorData);
    throw new Error(`Mailchimp API error: ${errorData.detail || 'Unknown error'}`);
  }

  return response.json();
}
