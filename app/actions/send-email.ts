'use server';

import { Resend } from 'resend';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to generate 6-character token with guaranteed mix of letters and numbers
function generateResetToken(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  
  let result = '';
  
  // Ensure at least 2 letters and 2 numbers
  const letterCount = Math.floor(Math.random() * 3) + 2; // 2-4 letters
  const numberCount = 6 - letterCount; // remaining positions for numbers
  
  // Generate letters
  for (let i = 0; i < letterCount; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  
  // Generate numbers
  for (let i = 0; i < numberCount; i++) {
    result += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  
  // Shuffle the result to randomize positions
  return result.split('').sort(() => Math.random() - 0.5).join('');
}

export async function sendEmail(formData: FormData) {
  const email = formData.get('email') as string;

  if (!email) {
    return { success: false, message: "Email address is required." };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  try {
    // Generate 6-digit alphanumeric token
    const resetToken = generateResetToken();
    
    // Set token expiration (10 minutes from now)
    const resetTokenExpires = new Date();
    resetTokenExpires.setMinutes(resetTokenExpires.getMinutes() + 10);

    // Check if user exists
    const user = await prisma.tb_user.findFirst({
      where: {
        email: email,
        is_active: 1
      }
    });

    if (!user) {
      return { success: false, message: "Email address not found in our system." };
    }

    // Update user with reset token and expiration
    await prisma.tb_user.update({
      where: {
        id_usr: user.id_usr
      },
      data: {
        reset_token: resetToken,
        reset_token_expires: resetTokenExpires
      }
    });

    // Check if RESEND_API_KEY is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured in environment variables');
      return { success: false, message: "Email service is not configured. Please contact support." };
    }

    // Send email with Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    console.log('Resend API Key exists:', !!process.env.RESEND_API_KEY);
    console.log('Sending email to:', email);
    console.log('Reset token:', resetToken);
    console.log('From email:', process.env.RESEND_FROM_EMAIL || 'noreply@ptjas.co.id');

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'noreply@ptjas.co.id',
      to: email,
      subject: 'Password Reset Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Reset your password</h2>
          <p>We have received a password reset request for your account. Please enter the verification code below:</p>
          <div style="background-color: #f8f9fa; border: 1px solid #e1e5e9; border-radius: 12px; padding: 32px; text-align: center; margin: 20px 0;">
            <h1 style="font-size: 36px; font-weight: bold; color: #1a1a1a; letter-spacing: 8px; margin: 0; font-family: monospace;">${resetToken}</h1>
          </div>
          <p style="color: #6a737d; font-size: 14px;">If you did not request a password reset, please ignore this email. This code will expire in 10 minutes.</p>
          <p style="color: #4a4a4a; font-size: 16px; font-weight: 500;">JAS - Your trusted cargo and logistics partner</p>
          <p style="color: #8b949e; font-size: 12px;">© 2024 JAS. All rights reserved.</p>
        </div>
      `,
    });

    console.log('Email response data:', JSON.stringify(data, null, 2));
    console.log('Email response error:', JSON.stringify(error, null, 2));

    if (error) {
      console.error('Resend error details:', JSON.stringify(error, null, 2));
      
      // Provide more specific error messages
      if (error.message?.includes('API key') || error.message?.includes('api_key')) {
        return { success: false, message: "Email service configuration error. Please contact support." };
      } else if (error.message?.includes('domain') || error.message?.includes('Domain')) {
        return { success: false, message: "Email domain not verified. Please contact support." };
      } else {
        return { success: false, message: `Failed to send email: ${error.message || 'Unknown error'}` };
      }
    }

    console.log('Email sent successfully:', data);
    return { success: true, message: "Password reset token sent to your email!" };
  } catch (error: any) {
    console.error('Error in sendEmail function:', error);
    console.error('Error stack:', error?.stack);
    return { success: false, message: `Failed to send reset token: ${error.message || 'Please try again.'}` };
  }
}
