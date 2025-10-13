"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useMemo } from "react";
import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import Link from "next/link";

interface FlightData {
  flightNumber: string;
  route: string;
  cargo: { weight: string; pieces: string; volume: string };
  pax: { capacity: number; booked: number; loadFactor: string };
  status: string;
  etd: string;
  eta: string;
}

const airlineData: { [key: string]: { name: string; code: string } } = {
  QR: { name: "Qatar Airways", code: "QR" },
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

const flightData: { [key: string]: FlightData[] } = {
  QR: [
    {
      flightNumber: "QR-8834",
      route: "DOH-CGK",
      cargo: { weight: "2.45T", pieces: "2,450Pcs", volume: "2.45m³" },
      pax: { capacity: 350, booked: 298, loadFactor: "85%" },
      status: "Send",
      etd: "14:30",
      eta: "02:15+1",
    },
    {
      flightNumber: "QR-8836",
      route: "DOH-CGK",
      cargo: { weight: "3.2T", pieces: "3,200Pcs", volume: "3.2m³" },
      pax: { capacity: 350, booked: 312, loadFactor: "89%" },
      status: "Delayed",
      etd: "18:45",
      eta: "06:30+1",
    },
    {
      flightNumber: "QR-8838",
      route: "DOH-CGK",
      cargo: { weight: "1.8T", pieces: "1,800Pcs", volume: "1.8m³" },
      pax: { capacity: 350, booked: 280, loadFactor: "80%" },
      status: "Send",
      etd: "10:15",
      eta: "22:45",
    },
    {
      flightNumber: "QR-8840",
      route: "DOH-CGK",
      cargo: { weight: "4.1T", pieces: "4,100Pcs", volume: "4.1m³" },
      pax: { capacity: 350, booked: 335, loadFactor: "96%" },
      status: "Send",
      etd: "22:30",
      eta: "11:15+1",
    },
    {
      flightNumber: "QR-8842",
      route: "DOH-CGK",
      cargo: { weight: "2.9T", pieces: "2,900Pcs", volume: "2.9m³" },
      pax: { capacity: 350, booked: 245, loadFactor: "70%" },
      status: "Delayed",
      etd: "06:20",
      eta: "18:55",
    },
    {
      flightNumber: "QR-8844",
      route: "DOH-CGK",
      cargo: { weight: "3.5T", pieces: "3,500Pcs", volume: "3.5m³" },
      pax: { capacity: 350, booked: 298, loadFactor: "85%" },
      status: "Send",
      etd: "16:45",
      eta: "05:20+1",
    },
    {
      flightNumber: "QR-8846",
      route: "DOH-CGK",
      cargo: { weight: "2.1T", pieces: "2,100Pcs", volume: "2.1m³" },
      pax: { capacity: 350, booked: 267, loadFactor: "76%" },
      status: "Send",
      etd: "12:10",
      eta: "00:45+1",
    },
    {
      flightNumber: "QR-8848",
      route: "DOH-CGK",
      cargo: { weight: "3.8T", pieces: "3,800Pcs", volume: "3.8m³" },
      pax: { capacity: 350, booked: 320, loadFactor: "91%" },
      status: "Send",
      etd: "20:15",
      eta: "08:50+1",
    },
    {
      flightNumber: "QR-8850",
      route: "DOH-CGK",
      cargo: { weight: "1.6T", pieces: "1,600Pcs", volume: "1.6m³" },
      pax: { capacity: 350, booked: 195, loadFactor: "56%" },
      status: "Delayed",
      etd: "08:30",
      eta: "21:05",
    },
    {
      flightNumber: "QR-8852",
      route: "DOH-CGK",
      cargo: { weight: "4.5T", pieces: "4,500Pcs", volume: "4.5m³" },
      pax: { capacity: 350, booked: 342, loadFactor: "98%" },
      status: "Send",
      etd: "04:45",
      eta: "17:20",
    },
    {
      flightNumber: "QR-8854",
      route: "DOH-CGK",
      cargo: { weight: "2.7T", pieces: "2,700Pcs", volume: "2.7m³" },
      pax: { capacity: 350, booked: 289, loadFactor: "83%" },
      status: "Send",
      etd: "13:20",
      eta: "01:55+1",
    },
    {
      flightNumber: "QR-8856",
      route: "DOH-CGK",
      cargo: { weight: "3.3T", pieces: "3,300Pcs", volume: "3.3m³" },
      pax: { capacity: 350, booked: 301, loadFactor: "86%" },
      status: "Send",
      etd: "19:00",
      eta: "07:35+1",
    },
  ],
  IN: [
    {
      flightNumber: "IN-7239",
      route: "CGK-DPS",
      cargo: { weight: "1.85T", pieces: "1,850Pcs", volume: "1.85m³" },
      pax: { capacity: 180, booked: 165, loadFactor: "92%" },
      status: "Send",
      etd: "09:15",
      eta: "12:30",
    },
    {
      flightNumber: "IN-7241",
      route: "CGK-DPS",
      cargo: { weight: "2.1T", pieces: "2,100Pcs", volume: "2.1m³" },
      pax: { capacity: 180, booked: 172, loadFactor: "96%" },
      status: "Delayed",
      etd: "15:20",
      eta: "18:35",
    },
    {
      flightNumber: "IN-7243",
      route: "CGK-DPS",
      cargo: { weight: "1.6T", pieces: "1,600Pcs", volume: "1.6m³" },
      pax: { capacity: 180, booked: 145, loadFactor: "81%" },
      status: "Send",
      etd: "11:40",
      eta: "14:55",
    },
    {
      flightNumber: "IN-7245",
      route: "CGK-DPS",
      cargo: { weight: "2.3T", pieces: "2,300Pcs", volume: "2.3m³" },
      pax: { capacity: 180, booked: 167, loadFactor: "93%" },
      status: "Send",
      etd: "07:25",
      eta: "10:40",
    },
    {
      flightNumber: "IN-7247",
      route: "CGK-DPS",
      cargo: { weight: "1.9T", pieces: "1,900Pcs", volume: "1.9m³" },
      pax: { capacity: 180, booked: 158, loadFactor: "88%" },
      status: "Send",
      etd: "17:10",
      eta: "20:25",
    },
    {
      flightNumber: "IN-7249",
      route: "CGK-DPS",
      cargo: { weight: "2.5T", pieces: "2,500Pcs", volume: "2.5m³" },
      pax: { capacity: 180, booked: 175, loadFactor: "97%" },
      status: "Delayed",
      etd: "13:55",
      eta: "17:10",
    },
    {
      flightNumber: "IN-7251",
      route: "CGK-DPS",
      cargo: { weight: "1.4T", pieces: "1,400Pcs", volume: "1.4m³" },
      pax: { capacity: 180, booked: 132, loadFactor: "73%" },
      status: "Send",
      etd: "06:30",
      eta: "09:45",
    },
    {
      flightNumber: "IN-7253",
      route: "CGK-DPS",
      cargo: { weight: "2.0T", pieces: "2,000Pcs", volume: "2.0m³" },
      pax: { capacity: 180, booked: 161, loadFactor: "89%" },
      status: "Send",
      etd: "19:45",
      eta: "23:00",
    },
    {
      flightNumber: "IN-7255",
      route: "CGK-DPS",
      cargo: { weight: "1.7T", pieces: "1,700Pcs", volume: "1.7m³" },
      pax: { capacity: 180, booked: 149, loadFactor: "83%" },
      status: "Send",
      etd: "12:15",
      eta: "15:30",
    },
    {
      flightNumber: "IN-7257",
      route: "CGK-DPS",
      cargo: { weight: "2.2T", pieces: "2,200Pcs", volume: "2.2m³" },
      pax: { capacity: 180, booked: 168, loadFactor: "93%" },
      status: "Delayed",
      etd: "16:00",
      eta: "19:15",
    },
    {
      flightNumber: "IN-7259",
      route: "CGK-DPS",
      cargo: { weight: "1.8T", pieces: "1,800Pcs", volume: "1.8m³" },
      pax: { capacity: 180, booked: 155, loadFactor: "86%" },
      status: "Send",
      etd: "08:50",
      eta: "12:05",
    },
    {
      flightNumber: "IN-7261",
      route: "CGK-DPS",
      cargo: { weight: "2.4T", pieces: "2,400Pcs", volume: "2.4m³" },
      pax: { capacity: 180, booked: 173, loadFactor: "96%" },
      status: "Send",
      etd: "14:35",
      eta: "17:50",
    },
  ],
  SQ: [
    {
      flightNumber: "SQ-955",
      route: "SIN-CGK",
      cargo: { weight: "4.2T", pieces: "4,200Pcs", volume: "4.2m³" },
      pax: { capacity: 280, booked: 251, loadFactor: "90%" },
      status: "Send",
      etd: "11:20",
      eta: "12:45",
    },
    {
      flightNumber: "SQ-957",
      route: "SIN-CGK",
      cargo: { weight: "3.8T", pieces: "3,800Pcs", volume: "3.8m³" },
      pax: { capacity: 280, booked: 268, loadFactor: "96%" },
      status: "Send",
      etd: "16:10",
      eta: "17:35",
    },
    {
      flightNumber: "SQ-959",
      route: "SIN-CGK",
      cargo: { weight: "5.1T", pieces: "5,100Pcs", volume: "5.1m³" },
      pax: { capacity: 280, booked: 275, loadFactor: "98%" },
      status: "Send",
      etd: "09:30",
      eta: "10:55",
    },
    {
      flightNumber: "SQ-961",
      route: "SIN-CGK",
      cargo: { weight: "3.5T", pieces: "3,500Pcs", volume: "3.5m³" },
      pax: { capacity: 280, booked: 234, loadFactor: "84%" },
      status: "Delayed",
      etd: "14:45",
      eta: "16:10",
    },
    {
      flightNumber: "SQ-963",
      route: "SIN-CGK",
      cargo: { weight: "4.7T", pieces: "4,700Pcs", volume: "4.7m³" },
      pax: { capacity: 280, booked: 261, loadFactor: "93%" },
      status: "Send",
      etd: "07:15",
      eta: "08:40",
    },
    {
      flightNumber: "SQ-965",
      route: "SIN-CGK",
      cargo: { weight: "3.2T", pieces: "3,200Pcs", volume: "3.2m³" },
      pax: { capacity: 280, booked: 198, loadFactor: "71%" },
      status: "Send",
      etd: "19:25",
      eta: "20:50",
    },
    {
      flightNumber: "SQ-967",
      route: "SIN-CGK",
      cargo: { weight: "4.9T", pieces: "4,900Pcs", volume: "4.9m³" },
      pax: { capacity: 280, booked: 272, loadFactor: "97%" },
      status: "Send",
      etd: "13:40",
      eta: "15:05",
    },
    {
      flightNumber: "SQ-969",
      route: "SIN-CGK",
      cargo: { weight: "2.8T", pieces: "2,800Pcs", volume: "2.8m³" },
      pax: { capacity: 280, booked: 215, loadFactor: "77%" },
      status: "Delayed",
      etd: "21:55",
      eta: "23:20",
    },
    {
      flightNumber: "SQ-971",
      route: "SIN-CGK",
      cargo: { weight: "4.4T", pieces: "4,400Pcs", volume: "4.4m³" },
      pax: { capacity: 280, booked: 258, loadFactor: "92%" },
      status: "Send",
      etd: "05:50",
      eta: "07:15",
    },
    {
      flightNumber: "SQ-973",
      route: "SIN-CGK",
      cargo: { weight: "3.9T", pieces: "3,900Pcs", volume: "3.9m³" },
      pax: { capacity: 280, booked: 245, loadFactor: "88%" },
      status: "Send",
      etd: "17:30",
      eta: "18:55",
    },
    {
      flightNumber: "SQ-975",
      route: "SIN-CGK",
      cargo: { weight: "5.3T", pieces: "5,300Pcs", volume: "5.3m³" },
      pax: { capacity: 280, booked: 278, loadFactor: "99%" },
      status: "Send",
      etd: "12:05",
      eta: "13:30",
    },
    {
      flightNumber: "SQ-977",
      route: "SIN-CGK",
      cargo: { weight: "3.1T", pieces: "3,100Pcs", volume: "3.1m³" },
      pax: { capacity: 280, booked: 201, loadFactor: "72%" },
      status: "Delayed",
      etd: "15:20",
      eta: "16:45",
    },
  ],
};

function AirlineFlightsContent() {
  const searchParams = useSearchParams();
  const airlineCode = searchParams.get("airline") || "QR";
  const airline = airlineData[airlineCode] || airlineData["QR"];
  const flights = flightData[airlineCode] || flightData["QR"];

  // Pagination and Search State
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Filter flights based on search term
  const filteredFlights = useMemo(() => {
    if (!searchTerm) return flights;
    return flights.filter(
      (flight: FlightData) =>
        flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flight.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flight.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [flights, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredFlights.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFlights = filteredFlights.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset to first page when search changes or items per page changes
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Send":
        return "text-green-400 bg-green-500/20 border-green-500/30";
      case "Delayed":
        return "text-red-400 bg-red-500/20 border-red-500/30";
      case "On Time":
        return "text-green-400 bg-green-500/20 border-green-500/30";
      case "Boarding":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30";
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/30";
    }
  };

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
        {/* Header with Airline Info */}
        <div className="mb-6">
          {/* <div className="flex items-center gap-4 mb-4">
            <Link
              href="/airline"
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-800/40 border border-white/10 hover:border-cyan-500/30 transition-colors duration-200"
            >
              ←
            </Link>
            <div className="flex-1 mt-3">
              <PageHeader title={`✈️ ${airline.name} Flights`} />
            </div>
          </div> */}

          {/* Flight Information Header */}
          <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg">
            <div className="p-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Header Title */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-400/30">
                    <span className="text-lg">✈️</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {airline.name} Operations
                    </h3>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                      Live Flight Dashboard
                    </p>
                  </div>
                </div>

                {/* Flight Info Cards */}
                <div className="flex flex-wrap gap-3">
                  {/* Station */}
                  <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg px-3 py-2 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400 text-sm">🏢</span>
                      <div>
                        <p className="text-xs text-blue-400 font-medium">
                          Station
                        </p>
                        <p className="text-sm font-bold text-white">
                          Jakarta (CGK)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="bg-green-500/10 border border-green-400/20 rounded-lg px-3 py-2 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 text-sm">📅</span>
                      <div>
                        <p className="text-xs text-green-400 font-medium">
                          Date
                        </p>
                        <p className="text-sm font-bold text-white">
                          08 SEP 2025
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Flight Count */}
                  <div className="bg-purple-500/10 border border-purple-400/20 rounded-lg px-3 py-2 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400 text-sm">✈️</span>
                      <div>
                        <p className="text-xs text-purple-400 font-medium">
                          Flights
                        </p>
                        <p className="text-sm font-bold text-white">
                          {flights.length} Active
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Last Updated */}
                  <div className="bg-orange-500/10 border border-orange-400/20 rounded-lg px-3 py-2 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-orange-400 text-sm">🕒</span>
                      <div>
                        <p className="text-xs text-orange-400 font-medium">
                          Updated
                        </p>
                        <p className="text-sm font-bold text-white">
                          14:30 WIB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800/40 backdrop-blur-md rounded-xl border border-white/10 p-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400">
                ✈️
              </span>
              <div>
                <p className="text-2xl font-bold text-white">
                  {flights.length}
                </p>
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  Total Flights
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-md rounded-xl border border-white/10 p-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-500/20 text-green-400">
                📦
              </span>
              <div>
                <p className="text-2xl font-bold text-white">
                  {flights
                    .reduce(
                      (acc: number, flight: FlightData) =>
                        acc + parseFloat(flight.cargo.weight.replace("T", "")),
                      0
                    )
                    .toFixed(1)}
                  T
                </p>
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  Total Cargo
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-md rounded-xl border border-white/10 p-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-yellow-500/20 text-yellow-400">
                👩🏼‍🦼
              </span>
              <div>
                <p className="text-2xl font-bold text-white">
                  {flights.reduce(
                    (acc: number, flight: FlightData) => acc + flight.pax.booked,
                    0
                  )}
                </p>
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  Total PAX
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-md rounded-xl border border-white/10 p-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-500/20 text-purple-400">
                📊
              </span>
              <div>
                <p className="text-2xl font-bold text-white">
                  {Math.round(
                    flights.reduce(
                      (acc: number, flight: FlightData) =>
                        acc + parseInt(flight.pax.loadFactor.replace("%", "")),
                      0
                    ) / flights.length
                  )}
                  %
                </p>
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  Avg Boarding Rate
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Flights Table */}
        <div className="flex-1 bg-slate-800/20 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-700/40 border border-white/10">
                📋
              </span>
              Flight Schedule
            </h3>

            {/* Search Bar and Controls */}
            <div className="flex items-center gap-3">
              {/* Items per page dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Items per page</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) =>
                    handleItemsPerPageChange(Number(e.target.value))
                  }
                  className="px-3 py-2 bg-slate-700/30 border border-slate-600/30 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-all duration-200 h-10 min-w-[70px]"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>

              <div className="text-sm relative">
                <input
                  type="text"
                  placeholder="Search flights..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-64 px-4 py-2 bg-slate-700/30 border border-slate-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:bg-slate-700/50 transition-all duration-200 h-10"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </span>
              </div>
              <div className="text-sm text-gray-400">
                {filteredFlights.length} of {flights.length} flights
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-300 uppercase tracking-wide">
                    No
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-300 uppercase tracking-wide">
                    Flight
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-300 uppercase tracking-wide">
                    Route
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-300 uppercase tracking-wide">
                    Cargo
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-300 uppercase tracking-wide">
                    Passengers
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-300 uppercase tracking-wide">
                    Schedule
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-300 uppercase tracking-wide">
                    Hubnet Status
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-300 uppercase tracking-wide">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedFlights.length > 0 ? (
                  paginatedFlights.map((flight: FlightData, index: number) => (
                    <tr
                      key={index}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                    >
                      <td className="py-4 px-4 text-gray-400">
                        {startIndex + index + 1}
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-cyan-400">
                          {flight.flightNumber}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-white font-medium">
                          {flight.route}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="text-white text-sm">
                            {flight.cargo.weight}
                          </div>
                          <div className="text-gray-400 text-xs">
                            {flight.cargo.pieces} • {flight.cargo.volume}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="text-white text-sm">
                            {flight.pax.booked}/{flight.pax.capacity}
                          </div>
                          <div className="text-gray-400 text-xs">
                            BR: {flight.pax.loadFactor}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="text-white text-sm">
                            ETD: {flight.etd}
                          </div>
                          <div className="text-gray-400 text-xs">
                            ETA: {flight.eta}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                            flight.status
                          )}`}
                        >
                          {flight.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <Link
                          href={`/airline_detail?airline=${airlineCode}&flight=${flight.flightNumber}`}
                          className="inline-flex items-center px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors duration-200 text-xs font-medium"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 px-4 text-center">
                      <div className="text-gray-400">
                        {searchTerm
                          ? `No flights found matching "${searchTerm}"`
                          : "No flights available"}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination - Always display it */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-6 pt-4 border-t border-white/10 gap-4">
            <div className="text-sm text-gray-400">
              {filteredFlights.length > 0 ? (
                <>
                  Showing {startIndex + 1} to{" "}
                  {Math.min(startIndex + itemsPerPage, filteredFlights.length)} of{" "}
                  {filteredFlights.length} entries
                </>
              ) : (
                <>Showing 1 to {itemsPerPage} of {itemsPerPage} entries</>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-md bg-cyan-700/30 border border-slate-600/30 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700/50 transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
              </button>

              <div className="flex items-center gap-1">
                {filteredFlights.length === 0 ? (
                  // When no data, show single page
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-md text-sm bg-slate-700/30 text-white font-medium shadow-sm"
                  >
                    1
                  </button>
                ) : (
                  // When data exists
                  Array.from({ length: Math.max(1, Math.min(5, totalPages)) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors duration-200 shadow-sm ${
                          currentPage === pageNumber
                            ? "bg-cyan-700/30 text-white"
                            : "bg-slate-700/30 border border-slate-600/30 text-gray-300 hover:bg-slate-700/50"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })
                )}
              </div>

              <button
                onClick={() => setCurrentPage(Math.min(totalPages || 1, currentPage + 1))}
                disabled={currentPage === (totalPages || 1)}
                className="w-8 h-8 flex items-center justify-center rounded-md bg-slate-700/30 border border-slate-600/30 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700/50 transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AirlineFlightsPage() {
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
      <AirlineFlightsContent />
    </Suspense>
  );
}
