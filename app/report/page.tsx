"use client";

import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import PageHeader from "../components/PageHeader";
import AwbTable from "../components/AwbTable";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-800 to-gray-900 text-white relative">
      <Sidebar />
      <MobileNav />
      <main className="flex-1 p-6 pb-24 lg:pb-6">
        <PageHeader title="📦 AWB SENT TO HUBNET" />

        {/* Filter Section */}
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Station Filter */}
            <div className="bg-slate-800/40 backdrop-blur-md rounded-xl border border-white/10 p-4 hover:border-white/20 transition-all duration-300">
              <label
                htmlFor="station"
                className="block text-base font-medium text-yellow-500 flex items-center gap-2"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-700/40 border border-yellow-500/20">
                  🏢
                </span>
                Station
              </label>
              <select
                id="station"
                className="mt-3 block w-full text-base h-12 px-4 py-2 bg-slate-900/50 border-slate-700 text-white rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200"
              >
                <option value="">Select Station</option>
              </select>
            </div>

            {/* Airline Filter */}
            <div className="bg-slate-800/40 backdrop-blur-md rounded-xl border border-white/10 p-4 hover:border-white/20 transition-all duration-300">
              <label
                htmlFor="airline"
                className="block text-base font-medium text-yellow-400 flex items-center gap-2"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-700/40 border border-yellow-500/20">
                  ✈️
                </span>
                Airline
              </label>
              <select
                id="airline"
                className="mt-3 block w-full text-base h-12 px-4 py-2 bg-slate-900/50 border-slate-700 text-white rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200"
              >
                <option value="">Select Airline</option>
              </select>
            </div>

            {/* Date From Filter */}
            <div className="bg-slate-800/40 backdrop-blur-md rounded-xl border border-white/10 p-4 hover:border-white/20 transition-all duration-300">
              <label
                htmlFor="dateFrom"
                className="block text-base font-medium text-yellow-400 flex items-center gap-2"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-700/40 border border-yellow-500/20">
                  📅
                </span>
                Date From<span className="text-red-400 ml-1">*</span>
              </label>
              <input
                type="date"
                id="dateFrom"
                required
                className="mt-3 block w-full text-base h-12 px-4 py-2 bg-slate-900/50 border-slate-700 text-white rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200"
              />
            </div>

            {/* Date To Filter */}
            <div className="bg-slate-800/40 backdrop-blur-md rounded-xl border border-white/10 p-4 hover:border-white/20 transition-all duration-300">
              <label
                htmlFor="dateTo"
                className="block text-base font-medium text-yellow-400 flex items-center gap-2"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-700/40 border border-yellow-500/20">
                  📅
                </span>
                Date To<span className="text-red-400 ml-1">*</span>
              </label>
              <input
                type="date"
                id="dateTo"
                required
                className="mt-3 block w-full text-base h-12 px-4 py-2 bg-slate-900/50 border-slate-700 text-white rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200"
              />
            </div>
          </div>
        </div>

        {/* Generate Report Button */}
        <div className="mb-6 flex justify-start">
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
