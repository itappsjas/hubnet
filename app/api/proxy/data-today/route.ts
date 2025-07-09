// app/api/proxy/data-today/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const username = 'EpostHubnet2025'
  const password = 'Hackedby12100650'
  const auth = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')

  try {
    const res = await fetch('http://127.0.0.1:3101/api/data-today', {
      headers: {
        Authorization: auth,
      },
    })

    const data = await res.json()
    return NextResponse.json(data)
  } catch (_) {
    return NextResponse.json({ error: 'Gagal fetch dari API lokal' }, { status: 500 })
  }
}
