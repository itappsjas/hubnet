import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

// GET - Get all users
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const roleFilter = searchParams.get('role')
    const statusFilter = searchParams.get('status')

    const where: Record<string, string | number | boolean> = {}
    
    if (roleFilter) {
      where.id_role = parseInt(roleFilter)
    }
    
    if (statusFilter !== null && statusFilter !== '') {
      where.is_active = parseInt(statusFilter)
    }

    const users = await prisma.tb_user.findMany({
      where,
      include: {
        role: true
      },
      orderBy: {
        id_usr: 'asc'
      }
    })

    return NextResponse.json({ success: true, data: users })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// POST - Create new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, id_role, is_active } = body

    // Validation
    if (!email || !password || !id_role) {
      return NextResponse.json(
        { success: false, message: 'Email, password, and role are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.tb_user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const newUser = await prisma.tb_user.create({
      data: {
        email,
        password: hashedPassword,
        id_role: parseInt(id_role),
        is_active: is_active ?? 1
      },
      include: {
        role: true
      }
    })

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      data: newUser
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create user' },
      { status: 500 }
    )
  }
}

// PUT - Update user
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id_usr, email, password, id_role, is_active } = body

    if (!id_usr) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      )
    }

    // Check if user exists
    const existingUser = await prisma.tb_user.findUnique({
      where: { id_usr: parseInt(id_usr) }
    })

    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }

    // Prepare update data
    const updateData: {
      email: string;
      id_role: number;
      is_active: number;
      password?: string;
    } = {
      email,
      id_role: parseInt(id_role),
      is_active: is_active ? 1 : 0
    }

    // Only update password if provided
    if (password && password.trim() !== '') {
      updateData.password = await bcrypt.hash(password, 12)
    }

    // Update user
    const updatedUser = await prisma.tb_user.update({
      where: { id_usr: parseInt(id_usr) },
      data: updateData,
      include: {
        role: true
      }
    })

    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update user' },
      { status: 500 }
    )
  }
}

// DELETE - Delete user
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id_usr = searchParams.get('id_usr')

    if (!id_usr) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      )
    }

    // Check if user exists
    const existingUser = await prisma.tb_user.findUnique({
      where: { id_usr: parseInt(id_usr) }
    })

    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }

    // Delete user
    await prisma.tb_user.delete({
      where: { id_usr: parseInt(id_usr) }
    })

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete user' },
      { status: 500 }
    )
  }
}

