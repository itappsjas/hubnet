import nodemailer from 'nodemailer';

// Configuration for Nodemailer with SMTP
// Based on your PHP configuration
export function createEmailTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || '50.1.1.6',
    port: parseInt(process.env.SMTP_PORT || '25'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: process.env.SMTP_USER ? {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    } : undefined,
    tls: {
      // Do not fail on invalid certs
      rejectUnauthorized: false
    },
    // Connection timeout in milliseconds
    connectionTimeout: parseInt(process.env.SMTP_TIMEOUT || '30000'),
    // Time to wait for greeting response in milliseconds
    greetingTimeout: parseInt(process.env.SMTP_TIMEOUT || '30000'),
  });
}

// Default sender email
export function getDefaultSender() {
  return process.env.EMAIL_FROM || 'noreply@ptjas.co.id';
}

// Email sending utility function
export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
}) {
  // Validate SMTP configuration
  const smtpHost = process.env.SMTP_HOST;
  if (!smtpHost || smtpHost.trim() === '') {
    throw new Error('SMTP_HOST is required in environment variables');
  }

  const transporter = createEmailTransporter();
  const from = getDefaultSender();

  try {
    // Verify SMTP connection before sending
    try {
      await transporter.verify();
      console.log('✅ SMTP connection verified');
    } catch (verifyError: any) {
      console.error('❌ SMTP verification failed:', {
        message: verifyError.message,
        error: verifyError,
      });
      // Continue anyway, sometimes verify fails but send works
    }

    const info = await transporter.sendMail({
      from,
      to: Array.isArray(to) ? to.join(', ') : to,
      subject,
      html,
      text,
      // Additional headers for better compatibility
      headers: {
        'X-Priority': '1',
      },
    });

    console.log('✅ Email sent successfully:', {
      messageId: info.messageId,
      to: Array.isArray(to) ? to.join(', ') : to,
      subject,
    });
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('❌ Error sending email:', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode,
      to: Array.isArray(to) ? to.join(', ') : to,
      smtpHost: process.env.SMTP_HOST,
      smtpPort: process.env.SMTP_PORT,
    });
    throw error;
  }
}


