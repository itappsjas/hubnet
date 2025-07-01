'use client'

import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import MobileNav from '../components/MobileNav'
import PageHeader from '../components/PageHeader'
import AwbTable from '../components/AwbTable'


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

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-800 to-gray-900 text-white relative">
      <Sidebar />
      <MobileNav />
      <main className="flex-1 p-6 pb-24 lg:pb-6">
        <PageHeader title="📦 AWB SENT TO HUBNET" />
        <AwbTable awbData={awbData} />
        <p className="text-sm text-gray-400 mt-4">Data refresh otomatis setiap 15 detik</p>
      </main>
    </div>
  )
}
