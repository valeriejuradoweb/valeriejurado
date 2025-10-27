import nodemailer from 'nodemailer';
import { FormSubmission } from './storage';

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  from: string;
  to: string | string[];
}

export function createEmailTransporter(config: EmailConfig) {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
  });
}

export async function sendSubmissionNotification(
  submission: FormSubmission,
  config: EmailConfig
): Promise<boolean> {
  try {
    const transporter = createEmailTransporter(config);
    
    const subject = `New Contact Form Submission - ${submission.firstName} ${submission.lastName}`;
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #495057; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${submission.firstName} ${submission.lastName}</p>
          <p><strong>Email:</strong> <a href="mailto:${submission.email}">${submission.email}</a></p>
          ${submission.phone ? `<p><strong>Phone:</strong> <a href="tel:${submission.phone}">${submission.phone}</a></p>` : ''}
        </div>
        
        ${submission.service ? `
        <div style="background-color: #e9ecef; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #495057; margin-top: 0;">Service Details</h3>
          <p><strong>Service:</strong> ${submission.service}</p>
          ${submission.eventDate ? `<p><strong>Event Date:</strong> ${submission.eventDate}</p>` : ''}
        </div>
        ` : ''}
        
        ${submission.address1 || submission.address2 ? `
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #495057; margin-top: 0;">Address</h3>
          ${submission.address1 ? `<p><strong>Address 1:</strong> ${submission.address1}</p>` : ''}
          ${submission.address2 ? `<p><strong>Address 2:</strong> ${submission.address2}</p>` : ''}
        </div>
        ` : ''}
        
        ${submission.details ? `
        <div style="background-color: #e9ecef; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #495057; margin-top: 0;">Additional Details</h3>
          <p style="white-space: pre-wrap;">${submission.details}</p>
        </div>
        ` : ''}
        
        <div style="background-color: #d1ecf1; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 0; color: #0c5460;">
            <strong>Submission ID:</strong> ${submission.id}<br>
            <strong>Submitted:</strong> ${new Date(submission.timestamp).toLocaleString()}<br>
            <strong>Mailchimp Status:</strong> ${submission.mailchimpAdded ? 'Added to audience' : 'Not added (existing customer)'}
          </p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
        
        <p style="color: #6c757d; font-size: 14px;">
          This notification was sent automatically from your website contact form.
        </p>
      </div>
    `;
    
    const textContent = `
New Contact Form Submission

Contact Information:
- Name: ${submission.firstName} ${submission.lastName}
- Email: ${submission.email}
${submission.phone ? `- Phone: ${submission.phone}` : ''}

${submission.service ? `
Service Details:
- Service: ${submission.service}
${submission.eventDate ? `- Event Date: ${submission.eventDate}` : ''}
` : ''}

${submission.address1 || submission.address2 ? `
Address:
${submission.address1 ? `- Address 1: ${submission.address1}` : ''}
${submission.address2 ? `- Address 2: ${submission.address2}` : ''}
` : ''}

${submission.details ? `
Additional Details:
${submission.details}
` : ''}

Submission Details:
- Submission ID: ${submission.id}
- Submitted: ${new Date(submission.timestamp).toLocaleString()}
- Mailchimp Status: ${submission.mailchimpAdded ? 'Added to audience' : 'Not added (existing customer)'}

---
This notification was sent automatically from your website contact form.
    `;
    
    const mailOptions = {
      from: config.from,
      to: config.to,
      subject,
      text: textContent,
      html: htmlContent,
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return true;
    
  } catch (error) {
    console.error('Error sending email notification:', error);
    return false;
  }
}
