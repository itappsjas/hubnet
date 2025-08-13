'use client'

import Sidebar from '../components/Sidebar'
import MobileNav from '../components/MobileNav'
import PageHeader from '../components/PageHeader'
import AwbTable from '../components/AwbTable'
import Image from 'next/image'
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'


export default function DashboardPage() {
  // Data grafik dummy
  const todayChartData = [
    { name: '00:00', count: 0 },
    { name: '06:00', count: 4 },
    { name: '12:00', count: 8 },
    { name: '18:00', count: 5 },
    { name: '24:00', count: 6 },
  ]

  const mtdChartData = [
    { name: 'Jul 1', count: 12 },
    { name: 'Jul 2', count: 18 },
    { name: 'Jul 3', count: 9 },
    { name: 'Jul 4', count: 15 },
    { name: 'Jul 5', count: 11 },
    { name: 'Jul 6', count: 20 },
    { name: 'Jul 7', count: 14 },
  ]

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-800 to-gray-900 text-white relative">
      <Sidebar />
      <MobileNav />
      <main className="flex-1 p-6 pb-24 lg:pb-6">
        <PageHeader title="📦 AWB SENT TO HUBNET" />

        {/* Airline Cargo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Garuda Indonesia */}
          <div className="relative flex flex-col overflow-hidden rounded-lg bg-gradient-to-br from-orange-600 to-orange-800 p-3.5">
            <p className="text-xs uppercase text-orange-100">Garuda Indonesia</p>
            <div className="flex items-end justify-between space-x-2">
              <p className="mt-4 text-2xl font-medium text-white">2,450 kg</p>
              <a href="#" className="border-b border-dotted border-current pb-0.5 text-xs font-medium text-orange-100 outline-none transition-colors duration-300 line-clamp-1 hover:text-white focus:text-white">
                SQ 737-800
              </a>
            </div>
            <div className="absolute -top-6 right-0 -m-3 w-32 h-32 bg-white/20 flex items-center justify-center">
              <Image 
                src="/airlines/GM.png" 
                alt="Garuda Indonesia" 
                width={80} 
                height={80} 
                className="object-contain"
              />
            </div>
          </div>

          {/* Lion Air */}
          <div className="relative flex flex-col overflow-hidden rounded-lg bg-gradient-to-br from-red-600 to-red-800 p-3.5">
            <p className="text-xs uppercase text-red-100">Lion Air</p>
            <div className="flex items-end justify-between space-x-2">
              <p className="mt-4 text-2xl font-medium text-white">1,875 kg</p>
              <a href="#" className="border-b border-dotted border-current pb-0.5 text-xs font-medium text-red-100 outline-none transition-colors duration-300 line-clamp-1 hover:text-white focus:text-white">
                ZY 737-900
              </a>
            </div>
            <div className="absolute -top-6 right-0 -m-3 w-32 h-32 bg-white/20 flex items-center justify-center">
              <Image 
                src="/airlines/2Y.png" 
                alt="Lion Air" 
                width={80} 
                height={80} 
                className="object-contain"
              />
            </div>
          </div>

          {/* Citilink */}
          <div className="relative flex flex-col overflow-hidden rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 p-3.5">
            <p className="text-xs uppercase text-blue-100">Citilink</p>
            <div className="flex items-end justify-between space-x-2">
              <p className="mt-4 text-2xl font-medium text-white">1,320 kg</p>
              <a href="#" className="border-b border-dotted border-current pb-0.5 text-xs font-medium text-blue-100 outline-none transition-colors duration-300 line-clamp-1 hover:text-white focus:text-white">
               AK 320
              </a>
            </div>
            <div className="absolute -top-6 right-0 -m-3 w-32 h-32 bg-white/20 flex items-center justify-center">
              <Image 
                src="/airlines/HO.png" 
                alt="Citilink" 
                width={80} 
                height={80} 
                className="object-contain"
              />
            </div>
          </div>

          {/* Batik Air */}
          <div className="relative flex flex-col overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 p-3.5">
            <p className="text-xs uppercase text-purple-100">Batik Air</p>
            <div className="flex items-end justify-between space-x-2">
              <p className="mt-4 text-2xl font-medium text-white">1,950 kg</p>
              <a href="#" className="border-b border-dotted border-current pb-0.5 text-xs font-medium text-purple-100 outline-none transition-colors duration-300 line-clamp-1 hover:text-white focus:text-white">
                AI 737
              </a>
            </div>
            <div className="absolute -top-6 right-0 -m-3 w-32 h-32 bg-white/20 flex items-center justify-center">
              <Image 
                src="/airlines/EY.png" 
                alt="Batik Air" 
                width={80} 
                height={80} 
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-6 p-4 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Station Filter */}
            <div>
              <label htmlFor="station" className="block text-base font-medium text-yellow-500">Station</label>
              <select
                id="station"
                className="mt-1 block w-full text-base h-12 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Station</option>
              </select>
            </div>

            {/* Airline Filter */}
            <div>
              <label htmlFor="airline" className="block text-base font-medium text-yellow-500">Airline</label>
              <select
                id="airline"
                className="mt-1 block w-full text-base h-12 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Airline</option>
              </select>
            </div>

            {/* Date From Filter */}
            <div>
              <label htmlFor="dateFrom" className="block text-base font-medium text-yellow-500">Date From<span className="text-red-500"> *</span></label>
              <input
                type="date"
                id="dateFrom"
                required
                className="mt-1 block w-full text-base h-12 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Date To Filter */}
            <div>
              <label htmlFor="dateTo" className="block text-base font-medium text-yellow-500">Date To<span className="text-red-500"> *</span></label>
              <input
                type="date"
                id="dateTo"
                required
                className="mt-1 block w-full text-base h-12 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Tabel AWB */}
        <AwbTable />
        <p className="text-sm text-gray-400 mt-4">The data will be updated every 1 minutes</p>
      </main>
    </div>
  )
}
