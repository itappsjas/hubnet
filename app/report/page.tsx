"use client";

import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import PageHeader from "../components/PageHeader";
import AwbTable from "../components/AwbTable";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {
  // Data grafik dummy
  const todayChartData = [
    { name: "00:00", count: 0 },
    { name: "06:00", count: 4 },
    { name: "12:00", count: 8 },
    { name: "18:00", count: 5 },
    { name: "24:00", count: 6 },
  ];

  const mtdChartData = [
    { name: "Jul 1", count: 12 },
    { name: "Jul 2", count: 18 },
    { name: "Jul 3", count: 9 },
    { name: "Jul 4", count: 15 },
    { name: "Jul 5", count: 11 },
    { name: "Jul 6", count: 20 },
    { name: "Jul 7", count: 14 },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-800 to-gray-900 text-white relative">
      <Sidebar />
      <MobileNav />
      <main className="flex-1 p-6 pb-24 lg:pb-6">
        <PageHeader title="📦 AWB SENT TO HUBNET" />

        {/* Filter Section */}
        <div className="mb-6 p-4 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Station Filter */}
            <div>
              <label
                htmlFor="station"
                className="block text-base font-medium text-yellow-500"
              >
                Station
              </label>
              <select
                id="station"
                className="mt-1 block w-full text-base h-12 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Station</option>
              </select>
            </div>

            {/* Airline Filter */}
            <div>
              <label
                htmlFor="airline"
                className="block text-base font-medium text-yellow-500"
              >
                Airline
              </label>
              <select
                id="airline"
                className="mt-1 block w-full text-base h-12 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Airline</option>
              </select>
            </div>

            {/* Date From Filter */}
            <div>
              <label
                htmlFor="dateFrom"
                className="block text-base font-medium text-yellow-500"
              >
                Date From<span className="text-red-500"> *</span>
              </label>
              <input
                type="date"
                id="dateFrom"
                required
                className="mt-1 block w-full text-base h-12 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Date To Filter */}
            <div>
              <label
                htmlFor="dateTo"
                className="block text-base font-medium text-yellow-500"
              >
                Date To<span className="text-red-500"> *</span>
              </label>
              <input
                type="date"
                id="dateTo"
                required
                className="mt-1 block w-full text-base h-12 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Generate Report Button */}
        <div className="mb-6 flex justify-end">
          <button
            type="button"
            className="relative inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 transition-all duration-200"
          >
            <span>Generate Report</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Tabel AWB */}
        <AwbTable />
        <p className="text-sm text-gray-400 mt-4">
          The data will be updated every 1 minutes
        </p>
      </main>
    </div>
  );
}
