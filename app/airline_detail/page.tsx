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
    <div className="flex min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#1a2744] to-[#0f1829] text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/3 to-blue-500/3 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <Sidebar />
      <MobileNav />
      <main className="flex-1 p-4 flex flex-col h-screen relative z-10">
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
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
          {/* Kiri - Enhanced Cargo Visual */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative">
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
                    width={380}
                    height={280}
                    className="object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="group relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-md rounded-2xl border border-blue-500/20 p-4 hover:border-blue-400/40 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative text-center">
                    {/* <div className="flex items-center justify-center mb-2">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      </div>
                    </div> */}
                    {/* <p className="text-xs text-blue-300 font-medium">Total Weight</p> */}
                    <p className="text-xl font-bold text-blue-400 mt-1">
                      {cargoSummary.totalWeight}
                    </p>
                  </div>
                </div>

                <div className="group relative overflow-hidden bg-gradient-to-br from-green-500/10 to-green-600/5 backdrop-blur-md rounded-2xl border border-green-500/20 p-4 hover:border-green-400/40 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative text-center">
                    {/* <div className="flex items-center justify-center mb-2">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                    </div> */}
                    {/* <p className="text-xs text-green-300 font-medium">Total Pieces</p> */}
                    <p className="text-xl font-bold text-green-400 mt-1">
                      {cargoSummary.totalPieces}
                    </p>
                  </div>
                </div>

                <div className="group relative overflow-hidden bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 backdrop-blur-md rounded-2xl border border-yellow-500/20 p-4 hover:border-yellow-400/40 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative text-center">
                    {/* <div className="flex items-center justify-center mb-2">
                      <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      </div>
                    </div> */}
                    {/* <p className="text-xs text-yellow-300 font-medium">AWB Count</p> */}
                    <p className="text-xl font-bold text-yellow-400 mt-1">
                      {cargoSummary.totalAWB}
                    </p>
                  </div>
                </div>
              </div>

              {/* Enhanced Tracking Info */}
              <div className="flex justify-center mt-8">
                <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-gray-600/30">
                  <p className="text-sm text-gray-300 font-mono text-center">
                    🔍 123456788919
                  </p>
                  <p className="text-xs text-gray-400 text-center mt-1">
                    14 AUG 2025 11:16:21
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Kanan - Enhanced AWB Details */}
          <div className="lg:col-span-7 flex flex-col min-h-0">
            {/* Enhanced Header */}
            <div className="relative overflow-hidden bg-gradient-to-r from-slate-800/30 to-slate-700/30 backdrop-blur-sm rounded-2xl border border-white/10 p-4 mb-4">
              <div className="relative flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    ✈️ AWB Manifest
                  </h3>
                  <p className="text-cyan-400 text-sm">
                    🌍 Destination: {cargoSummary.destination}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border border-yellow-500/30">
                      🔄 {cargoSummary.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    🕒 ETD:{" "}
                    <span className="text-green-400 font-semibold">
                      {cargoSummary.estimatedDeparture}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced AWB List */}
            <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-slate-800/20 to-slate-900/20 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
              <div className="relative flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-white flex items-center">
                  📋 Air Waybill Details
                </h4>
                <div className="bg-gradient-to-r from-indigo-500/15 to-purple-500/15 backdrop-blur-sm px-3 py-1 rounded-lg border border-indigo-500/30">
                  <p className="text-xs text-indigo-300 font-mono">
                    🔍 123456788919 (14 AUG 2025 11:16:21)
                  </p>
                </div>
              </div>

              {/* Enhanced AWB Cards */}
              <div className="space-y-3 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {awbData.map((awb, index) => (
                  <div
                    key={awb.awbNumber}
                    className="group relative overflow-hidden bg-gradient-to-r from-slate-800/40 to-slate-700/20 backdrop-blur-sm rounded-xl border border-white/10 p-4 hover:border-white/20 transition-all duration-300"
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
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border transition-all duration-300 ${
                          awb.status === "Loaded"
                            ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30"
                            : "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30"
                        }`}
                      >
                        {awb.status === "Loaded" ? "✅" : "⏳"} {awb.status}
                      </span>
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
                      <div className="text-center p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                        <p className="text-purple-300 text-xs mb-1">
                          📈 Progress
                        </p>
                        <div className="w-full bg-gray-700/50 rounded-full h-1.5 mt-1">
                          <div
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                              awb.status === "Loaded"
                                ? "bg-gradient-to-r from-green-500 to-emerald-400"
                                : "bg-gradient-to-r from-yellow-500 to-orange-400"
                            }`}
                            style={{
                              width: awb.status === "Loaded" ? "100%" : "75%",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Summary Footer */}
              <div className="mt-4 pt-4 border-t border-white/10 relative">
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
                    <p className="text-blue-300 text-xs mb-1">📊 Total AWB</p>
                    <p className="text-xl font-bold text-blue-400">
                      {awbData.length}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                    <p className="text-green-300 text-xs mb-1">✅ Loaded</p>
                    <p className="text-xl font-bold text-green-400">
                      {awbData.filter((awb) => awb.status === "Loaded").length}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20">
                    <p className="text-yellow-300 text-xs mb-1">⏳ Loading</p>
                    <p className="text-xl font-bold text-yellow-400">
                      {awbData.filter((awb) => awb.status === "Loading").length}
                    </p>
                  </div>
                </div>
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
