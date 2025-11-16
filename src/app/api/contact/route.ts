import { NextRequest, NextResponse } from 'next/server';
import { saveSubmission, hasEmailBeenSubmitted, updateSubmission } from '@/lib/storage';
import { sendSubmissionNotification, EmailConfig } from '@/lib/email';

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
    // Threshold of 0.5 is balanced (recommended for production)
    const scoreThreshold = 0.5;
    
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
      recaptchaToken
    } = body;

    // Verify reCAPTCHA token (skip in development if browser-error occurs)
    const recaptchaResult = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaResult.success) {
      // In development, allow browser-error to pass through (domain mismatch on localhost)
      if (process.env.NODE_ENV === 'development' && recaptchaResult.error?.includes('browser-error')) {
        console.warn('reCAPTCHA browser-error in development - allowing submission. Add localhost to reCAPTCHA domains for proper testing.');
      } else {
        console.error('reCAPTCHA verification failed:', {
          error: recaptchaResult.error,
          score: recaptchaResult.score,
          hasToken: !!recaptchaToken,
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
      console.log('reCAPTCHA verification successful, score:', recaptchaResult.score);
    }

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'First name, last name, and email are required' },
        { status: 400 }
      );
    }

    // Check if this email has been submitted before (BEFORE saving)
    const isNewEmail = !hasEmailBeenSubmitted(email);
    console.log(`Email ${email} is ${isNewEmail ? 'NEW' : 'EXISTING'} - Mailchimp will ${isNewEmail ? 'be called' : 'be skipped'}`);

    // Save submission to local JSON storage
    const submission = saveSubmission({
      firstName,
      lastName,
      email,
      phone,
      service,
      eventDate,
      address1,
      address2,
      details
    });

    console.log('Form submission saved locally:', submission.id);

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
