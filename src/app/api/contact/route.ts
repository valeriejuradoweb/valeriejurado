import { NextRequest, NextResponse } from 'next/server';
import { saveSubmission, hasEmailBeenSubmitted, updateSubmission } from '@/lib/storage';
import { sendSubmissionNotification, EmailConfig } from '@/lib/email';

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
      details 
    } = body;

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

    // Send email notification to multiple recipients
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

    // Only add to Mailchimp if this is a new email address
    if (isNewEmail) {
      try {
        await addToMailchimp(submission);
        updateSubmission(submission.id, { mailchimpAdded: true });
        console.log('Added new email to Mailchimp audience');
      } catch (mailchimpError) {
        console.error('Error adding to Mailchimp:', mailchimpError);
        // Don't fail the request if Mailchimp fails
      }
    } else {
      console.log('Email already exists in submissions, skipping Mailchimp');
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
