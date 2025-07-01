'use client'
import DataTable from 'react-data-table-component'

interface AwbData {
  awb: string
  origin: string
  destination: string
  weight: string
  airline: string
}

export default function AwbTable({ awbData }: { awbData: AwbData[] }) {
  const columns = [
    { name: 'AWB', selector: (row: AwbData) => row.awb, sortable: true },
    { name: 'Airline', selector: (row: AwbData) => row.airline, sortable: true },
    { name: 'Origin', selector: (row: AwbData) => row.origin },
    { name: 'Destination', selector: (row: AwbData) => row.destination },
    { name: 'Weight', selector: (row: AwbData) => row.weight },
  ]

  return (
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
            <p className="text-sm text-gray-400 mb-1">AWB</p>
            <p className="font-bold text-orange-300">{row.awb}</p>

            <div className="mt-2 grid grid-cols-2 text-sm gap-2">
              <div>
                <p className="text-gray-400">Airline</p>
                <p>{row.airline}</p>
              </div>
              <div>
                <p className="text-gray-400">Weight</p>
                <p>{row.weight}</p>
              </div>
              <div>
                <p className="text-gray-400">Origin</p>
                <p>{row.origin}</p>
              </div>
              <div>
                <p className="text-gray-400">Destination</p>
                <p>{row.destination}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
