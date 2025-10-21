'use client'

import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

interface AwbData {
  awb: string
  origin: string
  destination: string
  weight: string
  airline: string
}

interface RawAwbData {
  AWB_NO: string
  PORT_ORI: string
  PORT_DIS: string
  QTY_SHP_WGT: number | string
  COD_FLT_CAR: string
}

export default function AwbTable() {
  const [awbData, setAwbData] = useState<AwbData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/proxy/data-today')
        const json: { data?: { data?: RawAwbData[] } } = await res.json()

        if (json?.data?.data && Array.isArray(json.data.data)) {
          const mapped = json.data.data.map((item: RawAwbData) => ({
            awb: item.AWB_NO,
            origin: item.PORT_ORI,
            destination: item.PORT_DIS,
            weight: String(item.QTY_SHP_WGT),
            airline: item.COD_FLT_CAR,
          }))
          setAwbData(mapped)
        } else {
          console.warn('⚠️ Response format mismatch:', json)
        }
      } catch (error) {
        console.error('❌ Fetch failed:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 60000)
    return () => clearInterval(interval)
  }, [])

  const columns = [
    { name: 'AWB', selector: (row: AwbData) => row.awb, sortable: true },
    { name: 'Airline', selector: (row: AwbData) => row.airline, sortable: true },
    { name: 'Origin', selector: (row: AwbData) => row.origin },
    { name: 'Destination', selector: (row: AwbData) => row.destination },
    { name: 'Weight', selector: (row: AwbData) => row.weight },
  ]

  return (
    <div className="p-4">
      <h4 className="text-xl font-bold text-orange-400 mb-4">
        Data Airway Bill Hari Ini
      </h4>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block bg-white/5 backdrop-blur-md rounded-xl p-4 shadow-xl border border-white/10">
            <DataTable
              columns={columns}
              data={awbData}
              pagination
              highlightOnHover
              dense
              customStyles={{
                headCells: {
                  style: {
                    backgroundColor: '#1f2937',
                    color: '#fbbf24',
                  },
                },
                rows: {
                  style: {
                    backgroundColor: '#111827',
                    color: 'white',
                  },
                },
              }}
            />
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden grid gap-4">
            {awbData.map((row, index) => (
              <div
                key={index}
                className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-md"
              >
                <p className="text-lg text-gray-400 mb-1">AWB</p>
                <p className="font-bold text-orange-300">{row.awb}</p>

                <div className="mt-2 grid grid-cols-2 text-lg gap-2">
                  <div>
                    <p className="text-lg text-gray-400">Airline</p>
                    <p>{row.airline}</p>
                  </div>
                  <div>
                    <p className="text-lg text-gray-400">Weight</p>
                    <p>{row.weight}</p>
                  </div>
                  <div>
                    <p className="text-lg text-gray-400">Origin</p>
                    <p>{row.origin}</p>
                  </div>
                  <div>
                    <p className="text-lg text-gray-400">Destination</p>
                    <p>{row.destination}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
