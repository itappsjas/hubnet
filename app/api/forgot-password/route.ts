import { NextRequest, NextResponse } from "next/server";

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

    // Here you would typically:
    // 1. Check if the email exists in your database
    // 2. Generate a secure reset token
    // 3. Store the token with expiration time
    // 4. Send email with reset link

    // For now, we'll simulate the process
    console.log(`Password reset requested for: ${email}`);

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real application, you might want to always return success
    // to avoid revealing which emails are registered
    return NextResponse.json({
      success: true,
      message: "If an account with that email exists, we've sent password reset instructions."
    });

  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
