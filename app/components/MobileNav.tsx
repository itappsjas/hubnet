'use client'
import { FaHome, FaPlane, FaPortrait } from 'react-icons/fa'
import { MdSummarize } from 'react-icons/md'
import { useEffect, useState } from 'react'

interface User {
  id: number
  email: string
  role: string
  roleId: number
  airlineCode?: string
  airlineName?: string
}

export default function MobileNav() {
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

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-orange-600 flex justify-around py-3 z-50 text-white text-3xl shadow-inner">
      <a href="/dashboard" className="hover:text-yellow-200">
        <FaHome />
      </a>
      
      {/* Airline menu - untuk airline role langsung ke flights */}
      {user?.role === 'airline' ? (
        <a 
          href={`/airline_flight?airline=${user.airlineCode}`} 
          className="hover:text-yellow-200"
          title={user.airlineName}
        >
          <FaPlane />
        </a>
      ) : (
        <a href="/airline" className="hover:text-yellow-200">
          <FaPlane />
        </a>
      )}
      
      {/* User management - only admin can access */}
      {user?.role === 'admin' && (
        <a href="/user" className="hover:text-yellow-200">
          <FaPortrait />
        </a>
      )}
      
      {/* Report menu - all authenticated roles can access */}
      <a href="/report" className="hover:text-yellow-200">
        <MdSummarize />
      </a>
    </nav>
  )
}
