'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function VerifyMFA() {
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const secret = localStorage.getItem('mfa_secret') // HARUS ADA

    if (!secret) {
      setError('Secret tidak ditemukan di localStorage')
      return
    }

    const res = await fetch('/api/verify-mfa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, secret }),
    })

    const data = await res.json()
    console.log('Response MFA:', data)

    if (data.success) {
      router.push('/dashboard') // ✅ Redirect ke dashboard
    } else {
      setError(data.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10">
      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Masukkan kode OTP"
        className="border p-2 w-full mb-2"
        autoFocus
        required
        pattern="\d{6}" // Validasi 6 digit angka
      />
      <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">
        Verifikasi
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  )
}
