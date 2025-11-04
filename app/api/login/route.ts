import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();
        
        // Find user by email with role info only
        const user = await prisma.tb_user.findFirst({
            where: {
                email: username, // username field from frontend is actually email
                is_active: 1
            },
            include: {
                role: true
            }
        });

        if (user) {
            // Compare password using bcrypt
            const isPasswordValid = await bcrypt.compare(password, user.password);
            
            if (isPasswordValid) {
                // Get airline info separately if needed
                let airlineInfo = null;
                if (user.id_air && user.id_air !== 0) {
                    try {
                        airlineInfo = await prisma.tb_airline.findUnique({
                            where: { id_air: user.id_air }
                        });
                    } catch (error) {
                        console.log('Airline not found for id_air:', user.id_air);
                        airlineInfo = null;
                    }
                }
                
                // User found and password valid - Login successful
                const loginTime = new Date().getTime(); // Get current timestamp
                // Role logic for frontend menu access
                let menuAccess = {
                    showAllMenu: false,
                    canGenerateReport: false,
                    canManageUser: false,
                    airlineMenuDirect: false,
                    airlineCode: airlineInfo?.airline_code || null,
                    allowedMenus: [] as string[]
                };
                const roleCode = user.role.code_role.toLowerCase();
                
                if (roleCode === 'admin') {
                    menuAccess = {
                        showAllMenu: true,
                        canGenerateReport: true,
                        canManageUser: true,
                        airlineMenuDirect: false,
                        airlineCode: null,
                        allowedMenus: ['dashboard', 'airline', 'user', 'report']
                    };
                } else if (roleCode === 'view') {
                    menuAccess = {
                        showAllMenu: true,
                        canGenerateReport: false,
                        canManageUser: true,
                        airlineMenuDirect: false,
                        airlineCode: null,
                        allowedMenus: ['dashboard', 'airline', 'user', 'report']
                    };
                } else if (roleCode === 'airline') {
                    menuAccess = {
                        showAllMenu: false, // hanya menu tertentu
                        canGenerateReport: false,
                        canManageUser: false,
                        airlineMenuDirect: true,
                        airlineCode: airlineInfo?.airline_code || null,
                        allowedMenus: ['dashboard', 'airline']
                    };
                }
                return NextResponse.json({ 
                    success: true,
                    logged_in: "1",
                    login_time: loginTime,
                    user: {
                        id: user.id_usr,
                        email: user.email,
                        role: user.role.code_role.toLowerCase(), // Convert to lowercase for consistency
                        roleId: user.id_role,
                        airlineCode: airlineInfo?.airline_code,
                        airlineName: airlineInfo?.airline_name,
                        menuAccess
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
