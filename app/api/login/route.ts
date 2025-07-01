import { NextResponse } from 'next/server'
import speakeasy from 'speakeasy'
import qrcode from 'qrcode'

export async function POST(req: Request) {
  const body = await req.json()
  const { username, password } = body

  // Simulasi autentikasi user
  if (username !== 'admin' || password !== '123456') {
    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 })
  }

  // Generate secret MFA
  const secret = speakeasy.generateSecret({
    name: `JASConnect (${username})`,
  })

  // QR Code opsional (untuk registrasi MFA pertama kali)
  const qr = await qrcode.toDataURL(secret.otpauth_url ?? '')

  // Simpan `secret.base32` ke database jika perlu

  return NextResponse.json({
    success: true,
    secret: secret.base32,
    qr, // optional
  })
}
