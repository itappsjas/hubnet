'use client'

import Sidebar from '../components/Sidebar'
import MobileNav from '../components/MobileNav'
import PageHeader from '../components/PageHeader'
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

      </main>
    </div>
  )
}
