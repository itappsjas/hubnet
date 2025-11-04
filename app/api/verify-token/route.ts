import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email, token } = await request.json();

    // Validate input
    if (!email || !token) {
      return NextResponse.json(
        { success: false, message: "Email and token are required" },
        { status: 400 }
      );
    }

    // Find user with the reset token
    const user = await prisma.tb_user.findFirst({
      where: {
        email: email,
        reset_token: token,
        is_active: 1
      }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid token or email" },
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

    // Token is valid
    return NextResponse.json({
      success: true,
      message: "Token verified successfully",
      user: {
        id: user.id_usr,
        email: user.email,
      }
    });

  } catch (error) {
    console.error("Verify token error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
