'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [secret, setSecret] = useState('')
  const [qr, setQr] = useState('')
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const usernameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMounted(true)
    usernameRef.current?.focus()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !password) {
      toast.error('Username dan password wajib diisi.')
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!res.ok) {
        const errorJson = await res.json()
        toast.error(errorJson.message || 'Login gagal')
        return
      }

      const data = await res.json()
      if (data.success) {
        setSecret(data.secret)
        setQr(data.qr)
        setStep(2)
      } else {
        toast.error('Login gagal: Username atau password salah.')
      }
    } catch {
      toast.error('Terjadi kesalahan saat login.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()

    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      toast.error('Kode OTP harus terdiri dari 6 angka.')
      return
    }

    try {
      const res = await fetch('/api/verify-mfa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: otp, secret }),
      })

      if (!res.ok) {
        const errorText = await res.text()
        toast.error('Verifikasi gagal: ' + errorText)
        return
      }

      const data = await res.json()
      if (data.success) {
        router.push('/dashboard')
      } else {
        toast.error('Kode OTP salah. Silakan coba lagi.')
      }
    } catch {
      toast.error('Terjadi kesalahan saat verifikasi.')
    }
  }

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-900 overflow-hidden">
      {/* Grid Background */}
      {mounted && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      )}

      {/* Cloud Animation */}
      {mounted && (
        <div className="absolute w-[400%] h-full z-0 animate-clouds">
          <div className="absolute top-10 left-0 w-96 h-32 bg-white opacity-10 rounded-full blur-3xl" />
          <div className="absolute top-20 left-1/4 w-64 h-24 bg-white opacity-10 rounded-full blur-2xl" />
          <div className="absolute top-32 left-1/2 w-80 h-28 bg-white opacity-10 rounded-full blur-2xl" />
          <div className="absolute top-12 left-[70%] w-96 h-32 bg-white opacity-10 rounded-full blur-3xl" />
          <div className="absolute top-24 left-[90%] w-72 h-28 bg-white opacity-10 rounded-full blur-2xl" />
          <div className="absolute top-40 left-[120%] w-80 h-24 bg-white opacity-10 rounded-full blur-2xl" />
        </div>
      )}

      {/* Form Box */}
      <div className="z-10 p-8 bg-white/5 backdrop-blur-md border border-white/30 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-4 tracking-widest">
          JAS CONNECT
        </h1>
        <p className="text-center text-white/50 mb-6 text-sm tracking-wide">
          HUBNET MONITORING DATA
        </p>

        {step === 1 ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              ref={usernameRef}
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-md bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full p-3 rounded-md text-white font-semibold tracking-wide transition ${
                isLoading
                  ? 'bg-orange-400 cursor-not-allowed'
                  : 'bg-orange-600 hover:bg-orange-700'
              }`}
            >
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <p className="text-white text-sm text-center mb-2">
              Masukkan 6-digit kode dari Google Authenticator
            </p>

            {qr && (
              <div className="flex justify-center mb-4">
                <Image
                  src={qr}
                  alt="QR Code"
                  className="w-40 h-40 border border-white/30 rounded-md"
                />
              </div>
            )}

            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              pattern="\d{6}"
              placeholder="Kode OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 rounded-md bg-white/10 text-white text-center tracking-widest text-xl placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <button
              type="submit"
              className="w-full p-3 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold tracking-wide transition"
            >
              Verifikasi OTP
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
