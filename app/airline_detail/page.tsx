"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import Image from "next/image";

const airlineAirplanes: { [key: string]: string } = {
  QR: "QR.jpg",
  IN: "IN.webp",
  SQ: "5J.webp",
  AK: "AK.jpeg",
  "5J": "5J.webp",
  AI: "AI.avif",
  BR: "BR.jpg",
  FS: "FS.jpg",
  EY: "EY.png",
  SV: "3K.jpg",
  WY: "7B.jpg",
  NH: "NH.webp",
};

const airlineData: any = {
  QR: {
    name: "Qatar Airways",
    code: "QR",
  },
  IN: { name: "Nam Air", code: "IN" },
  SQ: { name: "Singapore Airlines", code: "SQ" },
  AK: { name: "Air Asia", code: "AK" },
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
    <div className="flex min-h-screen bg-gradient-to-br from-[#0b1730] via-[#1a2744] to-[#0f1829] text-white relative overflow-hidden">
      <Sidebar />
      <MobileNav />
      <main className="flex-1 p-4 flex flex-col h-screen">
        {/* Header Pesawat - Compact */}
        <div className="mb-4">
          <div className="relative w-full h-24 rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={`/airplane/${airplaneImage}`}
              alt={`${airline.name} Aircraft`}
              fill
              className="object-cover"
              priority
            />
            {/* Overlay dengan info airline */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-6">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {airline.name}
                </h1>
                <p className="text-blue-300 text-sm">
                  Flight {airline.code} • Cargo Operations
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Single Screen Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-6 min-h-0">
          {/* Kiri - Gambar Kardus dengan Stats */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <div className="relative">
              {/* Background Circle Decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>

              <div className="relative flex justify-center mb-4">
                <Image
                  src="/box.png"
                  alt="Cargo Boxes"
                  width={350}
                  height={250}
                  className="object-contain drop-shadow-2xl"
                />
              </div>

              {/* Quick Stats Below Image */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="text-center p-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <p className="text-xs text-gray-300">Weight</p>
                  <p className="text-lg font-bold text-blue-400">
                    {cargoSummary.totalWeight}
                  </p>
                </div>
                <div className="text-center p-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <p className="text-xs text-gray-300">Pieces</p>
                  <p className="text-lg font-bold text-green-400">
                    {cargoSummary.totalPieces}
                  </p>
                </div>
                <div className="text-center p-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <p className="text-xs text-gray-300">AWB</p>
                  <p className="text-lg font-bold text-yellow-400">
                    {cargoSummary.totalAWB}
                  </p>
                </div>
              </div>
              <div className="flex justify-center mt-10">
                <p className="text-sm text-gray-400 font-mono">
                  123456788919 (14 AUG 2025 11:16:21)
                </p>
              </div>
            </div>
          </div>

          {/* Kanan - Cargo Details dalam Compact Layout */}
          <div className="lg:col-span-3 flex flex-col min-h-0">
            {/* Header dengan Status */}
            <div className="flex items-center justify-between mb-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20">
              <div>
                <h3 className="text-xl font-bold text-white">AWB Manifest</h3>
                <p className="text-blue-400 text-sm">
                  Destination: {cargoSummary.destination}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                    {cargoSummary.status}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  ETD: {cargoSummary.estimatedDeparture}
                </p>
              </div>
            </div>

            {/* AWB List - Compact Layout */}
            <div className="flex-1 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">
                  Air Waybill Details
                </h4>
                {/* Di bawah 3 box stats */}
                <div className="flex justify-end mt-4">
                  <p className="text-sm text-gray-400 font-mono">
                    123456788919 (14 AUG 2025 11:16:21)
                  </p>
                </div>
              </div>

              {/* AWB Cards */}
              <div className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {awbData.map((awb) => (
                  <div
                    key={awb.awbNumber}
                    className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h5 className="text-white font-semibold text-sm">
                          AWB: {awb.awbNumber}
                        </h5>
                        <p className="text-gray-400 text-xs">
                          {awb.description}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          awb.status === "Loaded"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                        }`}
                      >
                        {awb.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <div>
                        <p className="text-gray-400">Weight</p>
                        <p className="text-blue-400 font-semibold">
                          {awb.weight}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Pieces</p>
                        <p className="text-green-400 font-semibold">
                          {awb.pieces}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Progress</p>
                        <div className="w-full bg-gray-700/50 rounded-full h-1.5 mt-1">
                          <div
                            className={`h-1.5 rounded-full ${
                              awb.status === "Loaded"
                                ? "bg-gradient-to-r from-green-500 to-green-400"
                                : "bg-gradient-to-r from-yellow-500 to-yellow-400"
                            }`}
                            style={{
                              width: awb.status === "Loaded" ? "100%" : "75%",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-white/10">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-gray-400">Shipper</p>
                          <p className="text-gray-300">{awb.shipper}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Consignee</p>
                          <p className="text-gray-300">{awb.consignee}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Footer */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-gray-400">Total AWB</p>
                    <p className="text-lg font-bold text-blue-400">
                      {awbData.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Loaded</p>
                    <p className="text-lg font-bold text-green-400">
                      {awbData.filter((awb) => awb.status === "Loaded").length}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Loading</p>
                    <p className="text-lg font-bold text-yellow-400">
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
