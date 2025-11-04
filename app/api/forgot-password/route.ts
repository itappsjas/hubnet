import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { sendEmail } from "@/lib/nodemailer-config";
import { sendWhatsAppText } from "@/lib/whapi-config";
import { render } from "@react-email/render";
import { PasswordResetEmail } from "@/app/components/password-reset-email";

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

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Generate 6-character alphanumeric token
    const resetToken = generateResetToken();
    
    // Set token expiration (10 minutes from now)
    const resetTokenExpires = new Date();
    resetTokenExpires.setMinutes(resetTokenExpires.getMinutes() + 10);

    // Check if user exists in database
    const user = await prisma.tb_user.findFirst({
      where: {
        email: email,
        is_active: 1
      }
    });

    // For security, always return success even if user doesn't exist
    // This prevents email enumeration attacks
    if (!user) {
      console.log(`Password reset requested for non-existent email: ${email}`);
      return NextResponse.json({
        success: true,
        message: "If an account with that email exists, we've sent password reset instructions."
      });
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

    console.log(`Password reset requested for: ${email}`);
    console.log(`Reset token generated: ${resetToken}`);

    // Check if user has phone number in database
    const hasPhoneInDb = !!user.no_hp && user.no_hp.trim() !== '';
    
    // Check if SMTP or WhatsApp is configured
    const hasSMTP = !!process.env.SMTP_HOST;
    const hasWhatsApp = !!process.env.WHAPI_TOKEN || !!process.env.WHAPI_API_KEY;
    
    let emailSent = false;
    let whatsappSent = false;

    // Try WhatsApp first (if configured and user has phone number)
    if (hasWhatsApp && hasPhoneInDb) {
      try {
        const whatsappMessage = `🔐 *Password Reset - JAS HubNet*\n\nWe received a request to reset your password for account: ${email}\n\n*Verification Code:*\n${resetToken}\n\nThis code is valid for 10 minutes.\n\nIf you didn't request this, please ignore.\n\n— JAS HubNet`;
        
        await sendWhatsAppText({
          phone: user.no_hp,
          message: whatsappMessage,
        });
        
        whatsappSent = true;
        console.log('✅ WhatsApp sent successfully to:', user.no_hp);
      } catch (whatsappError: any) {
        console.error('❌ WhatsApp sending error:', {
          message: whatsappError.message,
          error: whatsappError,
        });
      }
    }

    // Try email (if configured)
    if (hasSMTP && !process.env.USE_WHATSAPP_ONLY) {
      try {
        // Get base URL for email images
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 
          || process.env.NEXTAUTH_URL 
          || (process.env.NODE_ENV === 'production' ? 'https://hubnet.jas.com' : 'http://localhost:3000');
        
        // Render React email component to HTML
        const emailHtml = await render(
          PasswordResetEmail({ resetToken, baseUrl })
        );

        await sendEmail({
          to: email,
          subject: '🔐 Reset Your Password - JAS HubNet',
          html: emailHtml,
        });

        emailSent = true;
        console.log('✅ Email sent successfully to:', email);
      } catch (emailError: any) {
        console.error('❌ Email sending error:', {
          message: emailError.message,
          error: emailError,
        });
      }
    }

    // Return appropriate success message
    if (whatsappSent || emailSent) {
      if (whatsappSent && emailSent) {
        return NextResponse.json({
          success: true,
          message: "Password reset token sent via WhatsApp and email!"
        });
      } else if (whatsappSent) {
        return NextResponse.json({
          success: true,
          message: "Password reset token sent via WhatsApp!"
        });
      } else if (emailSent) {
        return NextResponse.json({
          success: true,
          message: "Password reset token sent to your email!"
        });
      }
    }

    // If nothing was sent, log to console as fallback
    console.log('========================================');
    console.log('🔐 PASSWORD RESET TOKEN (FALLBACK)');
    console.log('========================================');
    console.log('Email:', email);
    console.log('Phone:', user.no_hp || 'Not set');
    console.log('Token:', resetToken);
    console.log('========================================');

    return NextResponse.json({
      success: true,
      message: "If an account with that email exists, we've sent password reset instructions."
    });

  } catch (error: any) {
    console.error("❌ Forgot password error:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
