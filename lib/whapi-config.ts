import nodemailer from 'nodemailer';

// WhatsApp API Configuration using WHAPI
// API Key from environment variable (required, format: UnoDIn8ROY6AgbgX5dtIyGPokc7OXfE1)
const WHAPI_TOKEN = process.env.WHAPI_TOKEN || process.env.WHAPI_API_KEY || '';
const WHAPI_BASE_URL = process.env.WHAPI_BASE_URL || 'https://gate.whapi.cloud';
const WHAPI_TEXT_URL = `${WHAPI_BASE_URL}/messages/text`;
const WHAPI_INTERACTIVE_URL = `${WHAPI_BASE_URL}/messages/interactive`;

// Get verified sender phone number from environment
const WHAPI_SENDER_PHONE = process.env.WHAPI_SENDER_PHONE || '';

// Send WhatsApp message with button (for interactive messages)
export async function sendWhatsAppMessage({
  phone,
  message,
  buttonTitle,
  buttonUrl,
}: {
  phone: string;
  message: string;
  buttonTitle?: string;
  buttonUrl?: string;
}) {
  try {
    // Validate API Key
    if (!WHAPI_TOKEN || WHAPI_TOKEN.trim() === '') {
      throw new Error('WHAPI_TOKEN or WHAPI_API_KEY is required in environment variables');
    }

    // Format phone number (remove +, spaces, etc)
    const formattedPhone = phone.replace(/[^0-9]/g, '');

    // Validate phone number
    if (!formattedPhone || formattedPhone.length < 10) {
      throw new Error(`Invalid phone number: ${phone}`);
    }

    // Prepare interactive message with button
    const buttonFormat = {
      header: {
        text: 'Password Reset - JAS HubNet',
      },
      body: {
        text: message,
      },
      footer: {
        text: buttonUrl ? 'Click the button below to reset your password' : 'JAS HubNet System',
      },
      action: buttonUrl && buttonTitle ? {
        buttons: [
          {
            type: 'url',
            title: buttonTitle,
            id: '1',
            url: buttonUrl,
          },
        ],
      } : undefined,
      type: 'button',
      to: formattedPhone,
    };

    // Send WhatsApp message
    const response = await fetch(WHAPI_INTERACTIVE_URL, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'authorization': WHAPI_TOKEN,
        'content-type': 'application/json',
      },
      body: JSON.stringify(buttonFormat),
    });

    const statusCode = response.status;
    const data = await response.json();

    // Check response from Whapi
    if (statusCode === 200 && !data.error) {
      console.log('✅ WhatsApp interactive message sent successfully to:', phone);
      return { success: true, messageId: data.id || 'sent' };
    } else {
      // Log error from Whapi response
      const errorMessage = data.error || data.message || `HTTP ${statusCode}`;
      console.error('❌ WhatsApp send failed:', {
        statusCode,
        error: errorMessage,
        response: data,
        phone: formattedPhone,
      });
      throw new Error(`WhatsApp API error: ${errorMessage} (Status: ${statusCode})`);
    }
  } catch (error: any) {
    console.error('❌ Error sending WhatsApp interactive message:', {
      message: error.message,
      phone,
      stack: error.stack,
    });
    throw error;
  }
}

// Send simple text WhatsApp message
// Format: {to, body} as per Whapi specification
export async function sendWhatsAppText({
  phone,
  message,
}: {
  phone: string;
  message: string;
}) {
  try {
    // Validate API Key (wajib banget!)
    if (!WHAPI_TOKEN || WHAPI_TOKEN.trim() === '') {
      throw new Error('WHAPI_TOKEN or WHAPI_API_KEY is required in environment variables. Format: UnoDIn8ROY6AgbgX5dtIyGPokc7OXfE1');
    }

    // Format phone number (remove +, spaces, etc)
    const formattedPhone = phone.replace(/[^0-9]/g, '');

    // Validate phone number
    if (!formattedPhone || formattedPhone.length < 10) {
      throw new Error(`Invalid phone number: ${phone}. Must be at least 10 digits.`);
    }

    // Format payload JSON sesuai spesifikasi Whapi: {to, body}
    const textMessage = {
      to: formattedPhone,
      body: message,
    };

    // Send WhatsApp message dengan format yang benar
    const response = await fetch(WHAPI_TEXT_URL, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'authorization': WHAPI_TOKEN,
        'content-type': 'application/json', // Header Content-Type wajib application/json
      },
      body: JSON.stringify(textMessage),
    });

    const statusCode = response.status;
    let data;
    
    try {
      data = await response.json();
    } catch (parseError) {
      const textResponse = await response.text();
      console.error('❌ Failed to parse Whapi response:', textResponse);
      throw new Error(`Whapi response parsing error: ${textResponse}`);
    }

    // Cek log response dari Whapi
    if (statusCode === 200 && !data.error) {
      console.log('✅ WhatsApp text sent successfully to:', phone);
      console.log('📱 Whapi response:', { messageId: data.id || data.message_id, status: 'sent' });
      return { success: true, messageId: data.id || data.message_id || 'sent' };
    } else {
      // Log error dari Whapi response (penting buat debugging)
      const errorMessage = data.error || data.message || `HTTP ${statusCode}`;
      console.error('❌ WhatsApp text send failed - Whapi error response:', {
        statusCode,
        error: errorMessage,
        fullResponse: data,
        phone: formattedPhone,
        apiKeyLength: WHAPI_TOKEN.length,
        apiKeyPrefix: WHAPI_TOKEN.substring(0, 10) + '...',
      });
      
      // Throw error dengan detail dari Whapi
      throw new Error(`WhatsApp API error: ${errorMessage} (Status: ${statusCode})`);
    }
  } catch (error: any) {
    console.error('❌ Error sending WhatsApp text:', {
      message: error.message,
      phone,
      stack: error.stack,
      apiKeyConfigured: !!WHAPI_TOKEN,
      apiKeyLength: WHAPI_TOKEN?.length || 0,
    });
    throw error;
  }
}

// Email SMTP Configuration (for fallback or dual send)
export function createEmailTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || '50.1.1.6',
    port: parseInt(process.env.SMTP_PORT || '25'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER ? {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    } : undefined,
    tls: {
      rejectUnauthorized: false
    },
    connectionTimeout: parseInt(process.env.SMTP_TIMEOUT || '30000'),
    greetingTimeout: parseInt(process.env.SMTP_TIMEOUT || '30000'),
  });
}

export function getDefaultSender() {
  return process.env.EMAIL_FROM || 'noreply@ptjas.co.id';
}

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
  const transporter = createEmailTransporter();
  const from = getDefaultSender();

  try {
    const info = await transporter.sendMail({
      from,
      to: Array.isArray(to) ? to.join(', ') : to,
      subject,
      html,
      text,
      headers: {
        'X-Priority': '1',
      },
    });

    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('Error sending email:', error);
    throw error;
  }
}


