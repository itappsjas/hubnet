// ✅ Import selalu di paling atas
import { NextRequest, NextResponse } from 'next/server'
import speakeasy from 'speakeasy'

export async function POST(req: NextRequest) {
  const { token, secret } = await req.json()

  if (!token || !secret) {
    return NextResponse.json({ success: false, message: 'Token atau secret kosong' }, { status: 400 })
  }

  const verified = speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 1, // toleransi waktu (misalnya user telat klik OTP 30 detik)
  })

  if (verified) {
    return NextResponse.json({ success: true })
  } else {
    return NextResponse.json({ success: false, message: 'Kode OTP salah' }, { status: 401 })
  }
}
