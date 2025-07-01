'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SplashPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login')
    }, 10000) // 10 detik
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-orange-800 to-gray-900 overflow-hidden">
      {/* Shapes */}
      <div className="absolute w-full h-full">
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500 opacity-20 rounded-full blur-3xl animate-ping" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-500 opacity-20 rotate-12 rounded-lg blur-2xl animate-spin-slow" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-teal-400 opacity-10 transform -translate-x-1/2 -translate-y-1/2 rotate-45 blur-xl" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-pink-500 rounded-full opacity-10 blur-md animate-bounce" />
      </div>

      {/* Text only */}
      <div className="z-10 text-center text-white animate-fade-in-up font-[var(--font-roboto)]">
        <h1 className="text-4xl md:text-6xl font-bold tracking-wide">JAS CONNECT</h1>
        <p className="mt-4 text-lg md:text-2xl text-white/80 tracking-widest">HUBNET MONITORING DATA</p>
      </div>
    </div>
  )
}
