'use client'
import Image from 'next/image'
import { FaHome, FaPlane, FaPortrait } from 'react-icons/fa'
import { MdSummarize } from 'react-icons/md'
import { FiLogOut } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

interface User {
  id: number
  email: string
  role: string
  roleId: number
  airlineCode?: string
  airlineName?: string
}

export default function Sidebar() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Get user info from localStorage
    const userStr = localStorage.getItem('user')
    if (userStr) {
      try {
        const userData = JSON.parse(userStr)
        setUser(userData)
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }
  }, [])

const handleLogout = async () => {
  const result = await Swal.fire({
    title: 'Logout Confirmation',
    text: 'Are you sure you want to log out?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Yes, logout!',
    cancelButtonText: 'Cancel',
    background: '#0f172a',
    color: '#f8fafc',
    customClass: {
      popup: 'rounded-2xl shadow-2xl border border-white/10'
    },
    showClass: {
      popup: 'animate__animated animate__fadeInDown animate__faster',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp animate__faster',
    }
  })

  if (result.isConfirmed) {
    let timerInterval: NodeJS.Timeout
    await Swal.fire({
      title: 'Logging out...',
      html: 'Redirecting in <b>3</b> seconds',
      timer: 3000,
      timerProgressBar: true,
      background: '#0f172a',
      color: '#f8fafc',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      customClass: {
        popup: 'rounded-2xl shadow-2xl border border-white/10'
      },
      didOpen: () => {
        Swal.showLoading()
        const timer = Swal.getPopup()?.querySelector("b")
        timerInterval = setInterval(() => {
          const timeLeft = Math.ceil((Swal.getTimerLeft() || 0) / 1000)
          if (timer) timer.textContent = timeLeft.toString()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    })

    // Setelah countdown selesai → tampilkan sesi babay
    await Swal.fire({
      title: 'Goodbye!',
      text: 'See you next time.',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
      background: '#0f172a',
      color: '#f8fafc',
      customClass: {
        popup: 'rounded-2xl shadow-2xl border border-white/10'
      },
      showClass: {
        popup: 'animate__animated animate__fadeInUp animate__faster',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutDown animate__faster',
      }
    })

    // Clear semua data session dari localStorage
    localStorage.clear()
    
    // Redirect ke login page
    router.push('/login')
  }
}



  return (
    <aside className="hidden lg:flex w-20 lg:w-32 bg-orange-600 rounded-tr-full rounded-br-full relative flex-col items-center shadow-2xl z-10 py-6">
      {/* Logo */}
      <div className="absolute top-18">
        <Image
          src="/logo_jas_white.png"
          alt="JAS Logo"
          width={120}
          height={100}
          className="object-contain"
          priority
        />
      </div>

      {/* Menu Ikon */}
        <nav className="flex flex-col gap-6 items-center text-white text-4xl flex-1 justify-center">
            <a href="/dashboard" className="hover:text-yellow-200 transition-transform hover:scale-125">
                <FaHome />
            </a>

            {/* Garis bawah ikon terakhir */}
            <div className="w-10 border-b border-white/30 my-4" />

            {/* Airline menu - untuk airline role langsung ke flights */}
            {user?.role === 'airline' ? (
              <a 
                href={`/airline_flight?airline=${user.airlineCode}`} 
                className="hover:text-yellow-200 transition-transform hover:scale-125"
                title={user.airlineName}
              >
                <FaPlane />
              </a>
            ) : (
              <a href="/airline" className="hover:text-yellow-200 transition-transform hover:scale-125">
                <FaPlane />
              </a>
            )}

            {/* User management - only admin can access */}
            {user?.role === 'admin' && (
              <a href="/user" className="hover:text-yellow-200 transition-transform hover:scale-125">
                <FaPortrait />
              </a>
            )}

            {/* Report menu - all authenticated roles can access */}
            <a href="/report" className="hover:text-yellow-200 transition-transform hover:scale-125">
              <MdSummarize />
            </a>

            {/* Garis bawah ikon terakhir */}
            <div className="w-10 border-b border-white/30 my-4" />

            {/* Icon Sign Out */}
            <button
                onClick={handleLogout}
                className="text-white hover:text-red-300 transition-transform hover:scale-125"
            >
                <FiLogOut size={28} />
            </button>
        </nav>

      {/* Versi di paling bawah (posisi lebih ke dalam) */}
      <div className="mb-4 text-white text-xs font-bold opacity-80 self-start ml-4">
        App v1.1.3
      </div>
    </aside>
  )
}
