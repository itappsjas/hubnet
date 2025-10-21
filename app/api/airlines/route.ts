import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET - Get all airlines
export async function GET() {
  try {
    const airlines = await prisma.tb_airline.findMany({
      orderBy: {
        airline_code: 'asc'
      }
    })

    return NextResponse.json({ success: true, data: airlines })
  } catch (error) {
    console.error('Error fetching airlines:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch airlines' },
      { status: 500 }
    )
  }
}

