'use client'
import { FaHome, FaPlane } from 'react-icons/fa'
import { MdSummarize } from 'react-icons/md'

export default function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-orange-600 flex justify-around py-3 z-50 text-white text-3xl shadow-inner">
      <a href="#" className="hover:text-yellow-200">
        <FaHome />
      </a>
      <a href="#" className="hover:text-yellow-200">
        <FaPlane />
      </a>
      <a href="#" className="hover:text-yellow-200">
        <MdSummarize />
      </a>
    </nav>
  )
}
