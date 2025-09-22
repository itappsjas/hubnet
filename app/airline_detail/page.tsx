"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import Image from "next/image";

const airlineAirplanes: { [key: string]: string } = {
  QR: "QR.png",
  IN: "IN.png",
  SQ: "SQ.png",
  AK: "AK.png",
  "5J": "5J.png",
  AI: "AI.png",
  BR: "BR.png",
  FS: "FS.png",
  EY: "EY.png",
  SV: "SV.png",
  WY: "WY.png",
  NH: "NH.png",
  "2Y": "2Y.png",
  "3K": "3K.png",
  "7B": "7B.png",
  "8B": "8B.png",
  "8K": "8K.png",
  CV: "CV.png",
  CX: "CX.png",
  EK: "EK.png",
  FD: "FD.png",
  GM: "GM.png",
  HO: "HO.png",
  JX: "JX.png",
  MH: "MH.png",
  MU: "MU.png",
  NZ: "NZ.png",
  PR: "PR.png",
  QF: "QF.png",
  QZ: "QZ.png",
  SJ: "SJ.png",
  TA: "TA.png",
  TK: "TK.png",
  VA: "VA.png",
};

const airlineData: any = {
  QR: {
    name: "Qatar Airways",
    code: "QR",
  },
  IN: { name: "Nam Air", code: "IN" },
  SQ: { name: "Singapore Airlines", code: "SQ" },
  AK: { name: "Air Asia", code: "AK" },
  "5J": { name: "Cebu Pacific", code: "5J" },
  AI: { name: "Air India", code: "AI" },
  BR: { name: "EVA Air", code: "BR" },
  FS: { name: "Air Fast", code: "FS" },
  EY: { name: "Etihad Airways", code: "EY" },
  SV: { name: "Saudi Arabian Airlines", code: "SV" },
  WY: { name: "Oman Air", code: "WY" },
  NH: { name: "All Nippon Airways", code: "NH" },
};

function AirlineDetailContent() {
  const searchParams = useSearchParams();
  const airlineCode = searchParams.get("airline") || "QR";
  const airline = airlineData[airlineCode] || airlineData["QR"];
  const airplaneImage = airlineAirplanes[airlineCode] || "QR.jpg";

  const cargoSummary = {
    totalWeight: "2.45 Ton",
    totalPieces: "2,450 Pcs",
    totalAWB: "3 AWB",
    status: "In Progress",
    estimatedDeparture: "14:30 WIB",
    destination: "Jakarta (CGK)",
  };

  const awbData = [
    {
      awbNumber: "157-12345678",
      description: "Electronics Components",
      weight: "0.5 Ton",
      pieces: "250 Pcs",
      shipper: "Tech Corp Ltd",
      consignee: "Jakarta Electronics",
      status: "Loaded",
    },
    {
      awbNumber: "157-12345679",
      description: "Textile Materials",
      weight: "0.8 Ton",
      pieces: "400 Pcs",
      shipper: "Fabric Industries",
      consignee: "Indo Textiles",
      status: "Loaded",
    },
    {
      awbNumber: "157-12345680",
      description: "Automotive Parts",
      weight: "1.15 Ton",
      pieces: "1,800 Pcs",
      shipper: "Auto Parts Co",
      consignee: "Jakarta Motors",
      status: "Loading",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#1a2744] to-[#0f1829] text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/3 to-blue-500/3 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <Sidebar />
      <MobileNav />
      <main className="flex-1 p-6 flex flex-col min-h-screen relative z-10 overflow-y-auto">
        {/* Header Pesawat - Enhanced */}
        <div className="mb-6">
          <div className="relative w-full h-28 rounded-3xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-sm">
            <Image
              src={`/airplane/${airplaneImage}`}
              alt={`${airline.name} Aircraft`}
              fill
              className="object-cover"
              priority
            />
            {/* Enhanced Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-between px-8">
              <div>
                <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                  {airline.name}
                </h1>
                <p className="text-cyan-300 text-sm font-medium">
                  Flight {airline.code} • Cargo Operations
                </p>
              </div>
              <div className="text-right">
                {/* <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                  <p className="text-xs text-gray-300">Live Status</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-sm font-semibold text-green-400">Active</p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Enhanced Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6">
          {/* Kiri - Modern Cargo Visual */}
          <div className="lg:col-span-5 flex flex-col space-y-10">
            <div className="relative">
              {/* Soft Animated Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />

              {/* Multiple Animated Background Layers */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-l from-green-500/5 via-blue-500/5 to-indigo-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>

              {/* Floating Particles Effect */}
              <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400/60 rounded-full animate-bounce delay-100"></div>
              <div className="absolute top-20 right-16 w-1 h-1 bg-purple-400/60 rounded-full animate-bounce delay-300"></div>
              <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-cyan-400/60 rounded-full animate-bounce delay-700"></div>

              <div className="relative flex justify-center mb-6">
                <div className="relative group">
                  <Image
                    src="/box.png"
                    alt="Cargo Boxes"
                    width={280}
                    height={180}
                    className="object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    label: "Total Weight",
                    value: cargoSummary.totalWeight,
                    gradient: "from-blue-500/20 to-blue-600/10",
                    border: "border-blue-400/30",
                    glow: "shadow-blue-500/20",
                  },
                  {
                    label: "Total Pieces",
                    value: cargoSummary.totalPieces,
                    gradient: "from-green-500/20 to-green-600/10",
                    border: "border-green-400/30",
                    glow: "shadow-green-500/20",
                  },
                  {
                    label: "AWB Count",
                    value: cargoSummary.totalAWB,
                    gradient: "from-yellow-500/20 to-yellow-600/10",
                    border: "border-yellow-400/30",
                    glow: "shadow-yellow-500/20",
                  },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className={`group relative bg-gradient-to-br ${stat.gradient} backdrop-blur-xl rounded-2xl border ${stat.border} p-4 hover:border-white/40 hover:shadow-lg hover:${stat.glow} hover:scale-105 transition-all duration-300 cursor-pointer`}
                  >
                    {/* Subtle animated background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                    ></div>

                    <div className="text-center">
                      {/* Enhanced Value */}
                      <p className="text-2xl font-bold text-white mb-1 group-hover:text-white transition-colors duration-300">
                        {stat.value}
                      </p>
                      {/* Enhanced Label */}
                      <p className="text-xs text-gray-400">{stat.label}</p>
                    </div>

                    {/* Subtle corner accent */}
                    <div
                      className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${stat.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                    ></div>
                  </div>
                ))}
              </div>

              {/* Passenger Information */}
              <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mt-8">
                <h3 className="text-lg font-bold text-white flex items-center space-x-2 mb-6">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-600/40 border border-white/10 text-lg">
                    👥
                  </span>
                  <span>Passenger Information</span>
                </h3>
                <div className="grid grid-cols-3 gap-5">
                  {[
                    {
                      label: "PCF",
                      value: "87.5%",
                      color: "blue",
                      icon: "📊",
                    },
                    {
                      label: "Total Seat",
                      value: "175",
                      color: "blue",
                      icon: "💺",
                    },
                    {
                      label: "Total Pax/Flight",
                      value: "200",
                      color: "blue",
                      icon: "🧳",
                    },
                  ].map((info, idx) => (
                    <div
                      key={idx}
                      className="group relative bg-slate-900/40 rounded-xl border border-white/10 p-5 hover:border-white/20 hover:shadow-lg hover:shadow-slate-900/30 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-3">
                        {/* Icon */}
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-${info.color}-500/20 to-${info.color}-600/10 text-lg`}
                        >
                          {info.icon}
                        </div>
                        <div>
                          {/* Value */}
                          <p className="text-xl font-bold text-white">
                            {info.value}
                          </p>
                          {/* Label */}
                          <p className="text-xs text-gray-400">{info.label}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Kanan - Enhanced AWB Details */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* Enhanced Header */}
            <div className="relative bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-lg shadow-black/30">
              <div className="relative flex flex-col space-y-4">
                {/* Header with Title and Status */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-600/30 border border-white/10 text-xl">
                        ✈️
                      </span>
                      <span>Flight Information</span>
                    </h3>
                    <div className="flex items-center mt-3 space-x-2">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border border-yellow-500/30 shadow-[0_0_8px_rgba(255,200,0,0.2)]">
                        🔄 {cargoSummary.status}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_8px_rgba(0,200,255,0.2)]">
                        🌐 International
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">
                      📅 Flight Date:{" "}
                      <span className="text-white font-medium">
                        14 AUG 2025
                      </span>
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      🕒 ETA:{" "}
                      <span className="text-white font-medium">
                        {cargoSummary.estimatedDeparture}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Flight Path Visualization */}
                <div className="flex items-center justify-between mt-6 px-6">
                  {/* Departure */}
                  <div className="text-center">
                    <p className="text-lg font-bold text-cyan-400">HKG</p>
                    <p className="text-xs text-gray-400 mt-1">Hong Kong</p>
                    <p className="text-xs text-gray-500 mt-1">STD</p>
                  </div>

                  {/* Flight Path */}
                  <div className="flex-1 relative flex items-center justify-center mx-6 h-24">
                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 100 40"
                      preserveAspectRatio="none"
                    >
                      {/* Main curved dashed line */}
                      <path
                        d="M0,12 Q50,-8 100,12"
                        stroke="url(#mainGradient)"
                        strokeWidth="1.5"
                        strokeDasharray="4 6"
                        strokeLinecap="round"
                        fill="transparent"
                        className="animate-[dashmove_6s_linear_infinite]"
                      />

                      {/* Accent underlay */}
                      <path
                        d="M0,12 Q50,-8 100,12"
                        stroke="url(#accentGradient)"
                        strokeWidth="1"
                        strokeDasharray="2 8"
                        strokeLinecap="round"
                        fill="transparent"
                        className="opacity-40"
                      />

                      <defs>
                        <linearGradient
                          id="mainGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop
                            offset="0%"
                            stopColor="#06b6d4"
                            stopOpacity="0.9"
                          />
                          <stop
                            offset="50%"
                            stopColor="#ffffff"
                            stopOpacity="1"
                          />
                          <stop
                            offset="100%"
                            stopColor="#06b6d4"
                            stopOpacity="0.9"
                          />
                        </linearGradient>
                        <linearGradient
                          id="accentGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop
                            offset="0%"
                            stopColor="#06b6d4"
                            stopOpacity="0.3"
                          />
                          <stop
                            offset="50%"
                            stopColor="#ffffff"
                            stopOpacity="0.5"
                          />
                          <stop
                            offset="100%"
                            stopColor="#06b6d4"
                            stopOpacity="0.3"
                          />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Plane & duration */}
                    <div className="absolute top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative flex flex-col items-center">
                        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800/70 border border-cyan-400/30 text-xl transform rotate-[25deg] shadow-[0_0_12px_rgba(0,255,255,0.3)]">
                          ✈️
                        </span>
                        <p className="mt-2 text-xs text-cyan-300 font-medium bg-slate-900/70 px-3 py-0.5 rounded-full border border-cyan-500/20 backdrop-blur-sm whitespace-nowrap shadow-sm">
                          3.257 km • 5h 4m
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Arrival */}
                  <div className="text-center">
                    <p className="text-lg font-bold text-cyan-400">CGK</p>
                    <p className="text-xs text-gray-400 mt-1">Jakarta</p>
                    <p className="text-xs text-gray-500 mt-1">STA</p>
                  </div>
                </div>
              </div>
            </div>
            <style>
              {`      
  @keyframes dashmove {
    to {
      stroke-dashoffset: -1000;
    }
  }
  
  path {
  stroke-dasharray: 2, 2;
  stroke-dashoffset: 0;
  animation: dashmove 150s linear infinite;
}
`}
            </style>

            {/* AWB Details Section */}
            <div className="flex-1 relative bg-gradient-to-br from-slate-800/20 to-slate-900/20 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
              <div className="relative flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-white flex items-center space-x-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-700/40 border border-white/10">
                    📋
                  </span>
                  <span>Air Waybill Details</span>
                </h4>
                <div className="bg-gradient-to-r from-indigo-500/15 to-purple-500/15 backdrop-blur-sm px-3 py-1 rounded-lg border border-indigo-500/30">
                  <p className="text-xs text-indigo-300 font-mono">
                    🔍 123456788919 (14 AUG 2025 11:16:21)
                  </p>
                </div>
              </div>

              {/* Enhanced AWB Cards */}
              <div className="space-y-3 max-h-[320px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {awbData.map((awb, index) => (
                  <div
                    key={awb.awbNumber}
                    className="group relative bg-gradient-to-r from-slate-800/40 to-slate-700/20 backdrop-blur-sm rounded-xl border border-white/10 p-5 hover:border-white/20 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative flex items-center justify-between mb-3">
                      <div>
                        <h5 className="text-white font-bold text-sm flex items-center">
                          📄 AWB:{" "}
                          <span className="text-cyan-400 ml-2">
                            {awb.awbNumber}
                          </span>
                        </h5>
                        <p className="text-gray-400 text-xs mt-1">
                          📦 {awb.description}
                        </p>
                      </div>
                      {/* <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border transition-all duration-300 ${
                          awb.status === "Loaded"
                            ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30"
                            : "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30"
                        }`}
                      >
                        {awb.status === "Loaded" ? "✅" : "⏳"} {awb.status}
                      </span> */}
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <p className="text-blue-300 text-xs mb-1">⚖️ Weight</p>
                        <p className="text-blue-400 font-bold text-sm">
                          {awb.weight}
                        </p>
                      </div>
                      <div className="text-center p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                        <p className="text-green-300 text-xs mb-1">📦 Pieces</p>
                        <p className="text-green-400 font-bold text-sm">
                          {awb.pieces}
                        </p>
                      </div>
                      <div className="flex items-center justify-center p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                            awb.status === "Loaded"
                              ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/30"
                              : "bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-400 border border-red-500/30"
                          }`}
                        >
                          {awb.status === "Loaded" ? "Completed" : "Not Send"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AirlineDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen bg-[#0b1730] text-white relative">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-white">Loading...</div>
          </div>
        </div>
      }
    >
      <AirlineDetailContent />
    </Suspense>
  );
}
