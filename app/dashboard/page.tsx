'use client'

import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import MobileNav from '../components/MobileNav'
import PageHeader from '../components/PageHeader'
import AwbTable from '../components/AwbTable'
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



interface AwbData {
  awb: string
  origin: string
  destination: string
  weight: string
  airline: string
}

const fetchAwbData = async (): Promise<AwbData[]> => {
  return [
    {
      awb: '618-12345675',
      origin: 'CGK',
      destination: 'SIN',
      weight: '250kg',
      airline: 'Singapore Airlines',
    },
    {
      awb: '618-23456789',
      origin: 'CGK',
      destination: 'KUL',
      weight: '120kg',
      airline: 'Singapore Airlines',
    },
    {
      awb: '126-98765432',
      origin: 'CGK',
      destination: 'DPS',
      weight: '340kg',
      airline: 'Garuda Indonesia',
    },
  ]
}

export default function DashboardPage() {
  const [awbData, setAwbData] = useState<AwbData[]>([])

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchAwbData()
      setAwbData(data)
    }

    loadData()
    const interval = setInterval(loadData, 15000)
    return () => clearInterval(interval)
  }, [])

  // Contoh data dummy
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

        {/* Grafik Today & MTD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Grafik Today */}
            <div className="bg-slate-700 rounded-lg p-4 shadow-md">
              <h2 className="text-lg font-semibold mb-2 text-yellow-400">📊 Today</h2>
              <ResponsiveContainer width="100%" height={320}>
                <ComposedChart data={todayChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" barSize={30} fill="#f59e0b" />
                  <Line type="monotone" dataKey="count" stroke="#fff" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Grafik MTD */}
            <div className="bg-slate-700 rounded-lg p-4 shadow-md">
              <h2 className="text-lg font-semibold mb-2 text-yellow-400">📈 Month-To-Date</h2>
              <ResponsiveContainer width="100%" height={320}>
                <ComposedChart data={todayChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" barSize={30} fill="#f59e0b" />
                  <Line type="monotone" dataKey="count" stroke="#fff" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
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
              {/* Add station options here */}
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
              {/* Add airline options here */}
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
        {/* Awb Table */}
        <AwbTable awbData={awbData} />
        <p className="text-sm text-gray-400 mt-4">The data will be updated every 1 minutes</p>
      </main>

    </div>
  )
}
