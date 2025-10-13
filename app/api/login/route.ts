import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();
        
        console.log('Login attempt:', {
            email: username, // username is actually email from frontend
            password: '[REDACTED]' // Don't log actual password
        });

        // Find user by email first (don't include password in where clause)
        const user = await prisma.tb_user.findFirst({
            where: {
                email: username, // username field from frontend is actually email
                is_active: 1
            }
        });

        console.log('User found:', user ? 'Yes' : 'No');

        if (user) {
            // Compare password using bcrypt
            const isPasswordValid = await bcrypt.compare(password, user.password);
            
            if (isPasswordValid) {
                // User found and password valid - Login successful
                const loginTime = new Date().getTime(); // Get current timestamp
                
                return NextResponse.json({ 
                    success: true,
                    logged_in: "1",
                    login_time: loginTime,
                    user: {
                        id: user.id_usr,
                        email: user.email,
                        role: user.id_role
                    }
                });
            }
        }
        
        // User not found or password invalid
        return NextResponse.json({ 
            success: false,
            logged_in: "0",
            message: "Invalid username or password" 
        }, { status: 401 });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ 
            success: false,
            logged_in: "0",
            message: "Server error occurred" 
        }, { status: 500 });
    }
}
