'use client'
import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Base64 } from 'js-base64'

interface AwbData {
  awb: string
  origin: string
  destination: string
  weight: string
  airline: string
}

export default function AwbTable() {
  const [awbData, setAwbData] = useState<AwbData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const fetchData = async () => {
    try {
      const username = 'EpostHubnet2025'
      const password = 'Hackedby12100650'
      const auth = 'Basic ' + Base64.encode(`${username}:${password}`)

      const res = await fetch('/api/proxy/data-today', {
        headers: {
          Authorization: auth,
        },
      })

      const json = await res.json()

      if (json.success) {
        const mapped = json.data.map((item: any) => ({
          awb: item.AWB_NO,
          origin: item.ORG,
          destination: item.DST,
          weight: item.WGT,
          airline: item.AIRLINE_NAME,
        }))
        setAwbData(mapped)
      }
    } catch (err) {
      console.error('❌ Gagal fetch:', err)
    } finally {
      setLoading(false)
    }
  }

  fetchData()
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
      <h2 className="text-xl font-bold text-orange-400 mb-4">Data Airway Bill Hari Ini</h2>

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

                <div className="mt-2 grid grid-cols-2 text-sm gap-2">
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
