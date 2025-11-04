import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email, token, newPassword, password } = await request.json();

    // Support both {token, password} and {email, token, newPassword} formats
    const resetToken = token;
    const newPass = newPassword || password;

    // Validate input
    if (!resetToken || !newPass) {
      return NextResponse.json(
        { success: false, message: "Token and new password are required" },
        { status: 400 }
      );
    }

    if (newPass.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Find user with the reset token
    // If email is provided, use it for additional security check
    // Otherwise, find user by token only
    const user = email 
      ? await prisma.tb_user.findFirst({
          where: {
            email: email,
            reset_token: resetToken,
            is_active: 1
          }
        })
      : await prisma.tb_user.findFirst({
          where: {
            reset_token: resetToken,
            is_active: 1
          }
        });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Check if token has expired
    if (!user.reset_token_expires || new Date() > user.reset_token_expires) {
      return NextResponse.json(
        { success: false, message: "Token has expired. Please request a new one." },
        { status: 401 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPass, 12);

    // Update user's password and clear reset token
    await prisma.tb_user.update({
      where: {
        id_usr: user.id_usr
      },
      data: {
        password: hashedPassword,
        reset_token: null,
        reset_token_expires: null
      }
    });

    console.log(`✅ Password reset successfully for user: ${user.email}`);

    return NextResponse.json({
      success: true,
      message: "Password has been reset successfully"
    });

  } catch (error: any) {
    console.error("❌ Reset password error:", {
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
