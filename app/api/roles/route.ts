import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET - Get all roles
export async function GET() {
  try {
    const roles = await prisma.tb_role.findMany({
      where: {
        is_active: 1
      },
      orderBy: {
        code_role: 'asc'
      }
    })

    return NextResponse.json({ success: true, data: roles })
  } catch (error) {
    console.error('Error fetching roles:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch roles' },
      { status: 500 }
    )
  }
}

