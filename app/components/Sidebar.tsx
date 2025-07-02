'use client'
import Image from 'next/image'
import { FaHome, FaPlane } from 'react-icons/fa'
import { MdSummarize } from 'react-icons/md'
import { FiLogOut } from 'react-icons/fi'

export default function Sidebar() {
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
            <a href="#" className="hover:text-yellow-200 transition-transform hover:scale-125">
                <FaHome />
            </a>

            {/* Garis bawah ikon terakhir */}
            <div className="w-10 border-b border-white/30 my-4" />

            <a href="#" className="hover:text-yellow-200 transition-transform hover:scale-125">
                <FaPlane />
            </a>
            <a href="#" className="hover:text-yellow-200 transition-transform hover:scale-125">
                <MdSummarize />
            </a>

            {/* Garis bawah ikon terakhir */}
            <div className="w-10 border-b border-white/30 my-4" />

            {/* Icon Sign Out */}
            <button
                onClick={() => {
                // TODO: Ganti dengan fungsi logout sebenarnya
                alert('Signed out')
                }}
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
