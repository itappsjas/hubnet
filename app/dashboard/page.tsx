"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
  AreaChart,
  Area,
} from "recharts";

export default function DashboardPage() {
  // State untuk summary data
  const [summaryData, setSummaryData] = useState({
    totalSent: 0,
    totalSuccess: 0,
    totalFlight: 0,
    totalAwb: 0,
    successRate: 0,
  });

  // Data grafik 7 hari ke belakang
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push({
        date: date.toISOString().split("T")[0],
        name: date.toLocaleDateString("id-ID", {
          month: "short",
          day: "numeric",
        }),
        sent: Math.floor(Math.random() * 50) + 10,
        success: Math.floor(Math.random() * 45) + 8,
        flights: Math.floor(Math.random() * 15) + 3,
        awb: Math.floor(Math.random() * 100) + 20,
      });
    }
    return days;
  };

  const [last7DaysData] = useState(getLast7Days());

  // Load summary data (simulate API call)
  useEffect(() => {
    const loadSummaryData = () => {
      // Simulate API response
      const totalSent = last7DaysData.reduce((sum, day) => sum + day.sent, 0);
      const totalSuccess = last7DaysData.reduce(
        (sum, day) => sum + day.success,
        0
      );
      const totalFlight = last7DaysData.reduce(
        (sum, day) => sum + day.flights,
        0
      );
      const totalAwb = last7DaysData.reduce((sum, day) => sum + day.awb, 0);
      const successRate =
        totalSent > 0 ? Math.round((totalSuccess / totalSent) * 100) : 0;

      setSummaryData({
        totalSent,
        totalSuccess,
        totalFlight,
        totalAwb,
        successRate,
      });
    };

    loadSummaryData();
  }, [last7DaysData]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-800 to-gray-900 text-white relative">
      <Sidebar />
      <MobileNav />
      <main className="flex-1 p-6 pb-24 lg:pb-6">
        <PageHeader title="📦 AWB SENT TO HUBNET" />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {/* Total Data Dikirim */}
          <div className="relative bg-gradient-to-br from-slate-700/80 to-slate-800/90 backdrop-blur-sm p-5 rounded-xl shadow-lg border border-blue-300/20 hover:border-blue-300/40 transition-all duration-300 hover:scale-105">
            <div className="absolute -bottom-5 right-0 w-36 h-36 z-20">
              <Image
                src="/pesawat.png"
                alt="Airplane"
                width={144}
                height={144}
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
            <div className="relative z-10">
              <p className="text-blue-200 text-sm font-medium">Total Sent</p>
              <p className="text-3xl font-bold text-white mb-1">
                {summaryData.totalSent}
              </p>
              {/* <p className="text-blue-300/70 text-xs">Last 7 days</p> */}
            </div>
          </div>

          {/* Berhasil Terkirim */}
          <div className="relative bg-gradient-to-br from-slate-700/80 to-slate-800/90 backdrop-blur-sm p-5 rounded-xl shadow-lg border border-emerald-300/20 hover:border-emerald-300/40 transition-all duration-300 hover:scale-105">
            <div className="absolute -bottom-5 right-0 w-36 h-36 z-20">
              <Image
                src="/pesawat.png"
                alt="Airplane"
                width={144}
                height={144}
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
            <div className="relative z-10">
              <p className="text-emerald-200 text-sm font-medium">
                Successfully Sent
              </p>
              <p className="text-3xl font-bold text-white mb-1">
                {summaryData.totalSuccess}
              </p>
              {/* <p className="text-emerald-300/70 text-xs">
                {summaryData.successRate}% success rate
              </p> */}
            </div>
          </div>

          {/* Total Flight */}
          <div className="relative bg-gradient-to-br from-slate-700/80 to-slate-800/90 backdrop-blur-sm p-5 rounded-xl shadow-lg border border-violet-300/20 hover:border-violet-300/40 transition-all duration-300 hover:scale-105">
            <div className="absolute -bottom-5 right-0 w-36 h-36 z-20">
              <Image
                src="/pesawat.png"
                alt="Airplane"
                width={144}
                height={144}
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
            <div className="relative z-10">
              <p className="text-violet-200 text-sm font-medium">
                Total Flight
              </p>
              <p className="text-3xl font-bold text-white mb-1">
                {summaryData.totalFlight}
              </p>
              {/* <p className="text-violet-300/70 text-xs">Last 7 days</p> */}
            </div>
          </div>

          {/* Total AWB */}
          <div className="relative bg-gradient-to-br from-slate-700/80 to-slate-800/90 backdrop-blur-sm p-5 rounded-xl shadow-lg border border-amber-300/20 hover:border-amber-300/40 transition-all duration-300 hover:scale-105">
            <div className="absolute -bottom-5 right-0 w-36 h-36 z-20">
              <Image
                src="/pesawat.png"
                alt="Airplane"
                width={144}
                height={144}
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
            <div className="relative z-10">
              <p className="text-amber-200 text-sm font-medium">Total AWB</p>
              <p className="text-3xl font-bold text-white mb-1">
                {summaryData.totalAwb}
              </p>
              {/* <p className="text-amber-300/70 text-xs">Last 7 days</p> */}
            </div>
          </div>

          {/* Success Rate */}
          <div className="relative bg-gradient-to-br from-slate-700/80 to-slate-800/90 backdrop-blur-sm p-5 rounded-xl shadow-lg border border-teal-300/20 hover:border-teal-300/40 transition-all duration-300 hover:scale-105">
            <div className="absolute -bottom-5 right-0 w-36 h-36 z-20">
              <Image
                src="/pesawat.png"
                alt="Airplane"
                width={144}
                height={144}
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
            <div className="relative z-10">
              <p className="text-teal-200 text-sm font-medium">Success Rate</p>
              <p className="text-3xl font-bold text-white mb-1">
                {summaryData.successRate}%
              </p>
              {/* <p className="text-teal-300/70 text-xs">Average success</p> */}
            </div>
          </div>
        </div>

        {/* Charts Section - 7 Days Trend & AWB Flight Performance */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          {/* Grafik 7 Hari Ke Belakang */}
          <div className="bg-gradient-to-br from-slate-700/80 to-slate-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-600/30 hover:border-slate-500/40 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500/80 to-cyan-600/80 rounded-xl flex items-center justify-center backdrop-blur-sm border border-blue-400/30">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">7 Days Trend Analysis</h3>
                <p className="text-sm text-slate-400">Data performance over the last week</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={last7DaysData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <YAxis 
                  allowDecimals={false} 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    color: '#f8fafc'
                  }}
                  formatter={(value, name) => {
                    const labels = {
                      sent: "Data Sent",
                      success: "Successfully Sent",
                      flights: "Total Flights",
                    };
                    return [value, labels[name as keyof typeof labels] || name];
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sent"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorSent)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="success"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorSuccess)"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="flights"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
            {/* Legend */}
            <div className="flex justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-slate-300">Data Sent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-slate-300">Successfully Sent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-slate-300">Total Flights</span>
              </div>
            </div>
          </div>

          {/* AWB vs Flight Performance */}
          <div className="bg-gradient-to-br from-slate-700/80 to-slate-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-600/30 hover:border-slate-500/40 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500/80 to-red-600/80 rounded-xl flex items-center justify-center backdrop-blur-sm border border-orange-400/30">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">AWB & Flight Performance</h3>
                <p className="text-sm text-slate-400">Combined metrics analysis</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={last7DaysData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <YAxis 
                  yAxisId="left" 
                  allowDecimals={false} 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    color: '#f8fafc'
                  }}
                  formatter={(value, name) => {
                    const labels = {
                      awb: "Total AWB",
                      flights: "Total Flights",
                      success: "Successfully Sent",
                    };
                    return [value, labels[name as keyof typeof labels] || name];
                  }}
                />
                <Bar
                  yAxisId="left"
                  dataKey="awb"
                  barSize={35}
                  fill="#f97316"
                  name="Total AWB"
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="flights"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  name="Total Flights"
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2 }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="success"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Successfully Sent"
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
            {/* Legend */}
            <div className="flex justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 bg-orange-500 rounded"></div>
                <span className="text-slate-300">Total AWB</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-slate-300">Total Flights</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-slate-300">Successfully Sent</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-6 bg-gradient-to-br from-slate-700/60 to-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-600/30 hover:border-slate-500/40 transition-all duration-300">
          {/* Header */}
          {/* <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/80 to-purple-600/80 rounded-xl flex items-center justify-center backdrop-blur-sm border border-blue-400/20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Filter Data AWB</h3>
              <p className="text-sm text-slate-400">Pilih kriteria untuk memfilter data</p>
            </div>
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Station Filter */}
            <div className="group">
              <label htmlFor="station" className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
                <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-400/30">
                  <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 2h8v8H6V6z" clipRule="evenodd" />
                  </svg>
                </div>
                Station
              </label>
              <select
                id="station"
                className="w-full h-11 px-4 py-2 bg-slate-600/40 border border-slate-500/40 rounded-xl text-white/90 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-200 group-hover:border-slate-400/60"
              >
                <option value="">Select Station</option>
                <option value="CGK">CGK - Soekarno Hatta</option>
                <option value="SUB">SUB - Juanda</option>
                <option value="DPS">DPS - Ngurah Rai</option>
              </select>
            </div>

            {/* Airline Filter */}
            <div className="group">
              <label htmlFor="airline" className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
                <div className="w-6 h-6 bg-emerald-500/20 rounded-lg flex items-center justify-center border border-emerald-400/30">
                  <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                  </svg>
                </div>
                Airline
              </label>
              <select
                id="airline"
                className="w-full h-11 px-4 py-2 bg-slate-600/40 border border-slate-500/40 rounded-xl text-white/90 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-all duration-200 group-hover:border-slate-400/60"
              >
                <option value="">Select Airline</option>
                <option value="GA">Garuda Indonesia</option>
                <option value="ID">Batik Air</option>
                <option value="QZ">AirAsia</option>
                <option value="JT">Lion Air</option>
              </select>
            </div>

            {/* Date From Filter */}
            <div className="group">
              <label htmlFor="dateFrom" className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
                <div className="w-6 h-6 bg-violet-500/20 rounded-lg flex items-center justify-center border border-violet-400/30">
                  <svg className="w-3 h-3 text-violet-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                Date From<span className="text-red-400 ml-1">*</span>
              </label>
              <input
                type="date"
                id="dateFrom"
                required
                className="w-full h-11 px-4 py-2 bg-slate-600/40 border border-slate-500/40 rounded-xl text-white/90 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all duration-200 group-hover:border-slate-400/60"
              />
            </div>

            {/* Date To Filter */}
            <div className="group">
              <label htmlFor="dateTo" className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
                <div className="w-6 h-6 bg-amber-500/20 rounded-lg flex items-center justify-center border border-amber-400/30">
                  <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                Date To<span className="text-red-400 ml-1">*</span>
              </label>
              <input
                type="date"
                id="dateTo"
                required
                className="w-full h-11 px-4 py-2 bg-slate-600/40 border border-slate-500/40 rounded-xl text-white/90 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-200 group-hover:border-slate-400/60"
              />
            </div>
          </div>
          
          {/* Action Buttons */}
          {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6 pt-5 border-t border-slate-600/30">
            <p className="text-xs text-slate-400 flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              * Field wajib diisi untuk melakukan filter
            </p>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-slate-600/50 text-slate-300 rounded-lg hover:bg-slate-600/70 transition-all duration-200 text-sm font-medium border border-slate-500/30 hover:border-slate-400/50">
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                </svg>
                Filter Data
              </button>
            </div>
          </div> */}
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
