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

    if (!res.ok) {
      return NextResponse.json({ success: false, message: 'Gagal ambil data dari server lokal' }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json({ success: true, data })
  } catch {
    return NextResponse.json({ success: false, message: 'Gagal fetch dari API lokal' }, { status: 500 })
  }
}
