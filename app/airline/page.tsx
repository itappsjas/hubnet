"use client";

import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import PageHeader from "../components/PageHeader";
import Image from "next/image";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-800 to-gray-900 text-white relative">
      <Sidebar />
      <MobileNav />
      <main className="flex-1 p-6 pb-24 lg:pb-6">
        <PageHeader title="📦 AWB SENT TO HUBNET" />

        {/* Airline Cargo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {/* Qatar Airways */}
          <Link
            href="/airline_detail?airline=QR"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-500/90 via-orange-600/90 to-orange-700/90 backdrop-blur-sm border border-orange-400/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 block"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-radial from-white/10 to-transparent rounded-full -translate-y-12 translate-x-12"></div>

            {/* Content */}
            <div className="relative p-4 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 pr-2">
                  <h3 className="text-lg font-bold text-white leading-tight tracking-wide">
                    Qatar Airways
                  </h3>
                </div>
                <div className="relative flex-shrink-0">
                  <div className="w-40 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg group-hover:bg-white/20 transition-all duration-300">
                    <Image
                      src="/airlines/QR.png"
                      alt="Qatar Airways"
                      width={80}
                      height={80}
                      className="object-contain filter drop-shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">2.45</p>
                  <p className="text-orange-100/70 text-xs uppercase tracking-wide">
                    Ton
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">2,450</p>
                  <p className="text-orange-100/70 text-xs uppercase tracking-wide">
                    Pcs
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">2.45</p>
                  <p className="text-orange-100/70 text-xs uppercase tracking-wide">
                    m³
                  </p>
                </div>
              </div>

              {/* Aircraft Info */}
              <div className="mt-auto">
                <div className="flex justify-center p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15">
                  <span className="text-orange-100/80 text-xs bg-white/15 px-3 py-1 rounded-full">
                    QR-D123
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Nam Air */}
          <Link
            href="/airline_detail?airline=IN"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-red-500/90 via-red-600/90 to-red-700/90 backdrop-blur-sm border border-red-400/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 block"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-radial from-white/10 to-transparent rounded-full -translate-y-12 translate-x-12"></div>

            {/* Content */}
            <div className="relative p-4 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 pr-2">
                  <h3 className="text-lg font-bold text-white leading-tight tracking-wide">
                    Nam Air
                  </h3>
                </div>
                <div className="relative flex-shrink-0">
                  <div className="w-40 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg group-hover:bg-white/20 transition-all duration-300">
                    <Image
                      src="/airlines/IN.png"
                      alt="Nam Air"
                      width={80}
                      height={80}
                      className="object-contain filter drop-shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">1.85</p>
                  <p className="text-red-100/70 text-xs uppercase tracking-wide">
                    Ton
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">1,850</p>
                  <p className="text-red-100/70 text-xs uppercase tracking-wide">
                    Pcs
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">1.85</p>
                  <p className="text-red-100/70 text-xs uppercase tracking-wide">
                    m³
                  </p>
                </div>
              </div>

              {/* Aircraft Info */}
              <div className="mt-auto">
                <div className="flex justify-center p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15">
                  <span className="text-red-100/80 text-xs bg-white/15 px-3 py-1 rounded-full">
                    IN-7239
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Singapore Airlines */}
          <Link
            href="/airline_detail?airline=SQ"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/90 via-blue-600/90 to-blue-700/90 backdrop-blur-sm border border-blue-400/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 block"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-radial from-white/10 to-transparent rounded-full -translate-y-12 translate-x-12"></div>

            {/* Content */}
            <div className="relative p-4 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 pr-2">
                  <h3 className="text-lg font-bold text-white leading-tight tracking-wide">
                    Singapore
                    <br />
                    Airlines
                  </h3>
                </div>
                <div className="relative flex-shrink-0">
                  <div className="w-40 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg group-hover:bg-white/20 transition-all duration-300">
                    <Image
                      src="/airlines/SQ.png"
                      alt="Singapore Airlines"
                      width={80}
                      height={80}
                      className="object-contain filter drop-shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">4.2</p>
                  <p className="text-blue-100/70 text-xs uppercase tracking-wide">
                    Ton
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">4,200</p>
                  <p className="text-blue-100/70 text-xs uppercase tracking-wide">
                    Pcs
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">4.2</p>
                  <p className="text-blue-100/70 text-xs uppercase tracking-wide">
                    m³
                  </p>
                </div>
              </div>

              {/* Aircraft Info */}
              <div className="mt-auto">
                <div className="flex justify-center p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15">
                  <span className="text-blue-100/80 text-xs bg-white/15 px-3 py-1 rounded-full">
                    SQ-955
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Air Asia */}
          <Link
            href="/airline_detail?airline=AK"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-yellow-500/90 via-yellow-600/90 to-yellow-700/90 backdrop-blur-sm border border-yellow-400/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 block"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-radial from-white/10 to-transparent rounded-full -translate-y-12 translate-x-12"></div>

            {/* Content */}
            <div className="relative p-4 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 pr-2">
                  <h3 className="text-lg font-bold text-white leading-tight tracking-wide">
                    Air Asia
                  </h3>
                </div>
                <div className="relative flex-shrink-0">
                  <div className="w-40 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg group-hover:bg-white/20 transition-all duration-300">
                    <Image
                      src="/airlines/AK.png"
                      alt="Air Asia"
                      width={50}
                      height={50}
                      className="object-contain filter drop-shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">3.1</p>
                  <p className="text-yellow-100/70 text-xs uppercase tracking-wide">
                    Ton
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">3,100</p>
                  <p className="text-yellow-100/70 text-xs uppercase tracking-wide">
                    Pcs
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">3.1</p>
                  <p className="text-yellow-100/70 text-xs uppercase tracking-wide">
                    m³
                  </p>
                </div>
              </div>

              {/* Aircraft Info */}
              <div className="mt-auto">
                <div className="flex justify-center p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15">
                  <span className="text-yellow-100/80 text-xs bg-white/15 px-3 py-1 rounded-full">
                    AK-1537
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Cebu Pacific */}
          <Link
            href="/airline_detail?airline=5J"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-red-500/90 via-red-600/90 to-red-700/90 backdrop-blur-sm border border-red-400/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 block"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-radial from-white/10 to-transparent rounded-full -translate-y-12 translate-x-12"></div>

            {/* Content */}
            <div className="relative p-4 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 pr-2">
                  <h3 className="text-lg font-bold text-white leading-tight tracking-wide">
                    Cebu Pacific
                  </h3>
                </div>
                <div className="relative flex-shrink-0">
                  <div className="w-40 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg group-hover:bg-white/20 transition-all duration-300">
                    <Image
                      src="/airlines/5J.png"
                      alt="Cebu Pacific"
                      width={80}
                      height={80}
                      className="object-contain filter drop-shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">2.45</p>
                  <p className="text-orange-100/70 text-xs uppercase tracking-wide">
                    Ton
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">2,450</p>
                  <p className="text-orange-100/70 text-xs uppercase tracking-wide">
                    Pcs
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">2.45</p>
                  <p className="text-orange-100/70 text-xs uppercase tracking-wide">
                    m³
                  </p>
                </div>
              </div>

              {/* Aircraft Info */}
              <div className="mt-auto">
                <div className="flex justify-center p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15">
                  <span className="text-orange-100/80 text-xs bg-white/15 px-3 py-1 rounded-full">
                    5J-D123
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Air India */}
          <Link
            href="/airline_detail?airline=AI"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-yellow-500/90 via-yellow-600/90 to-yellow-700/90 backdrop-blur-sm border border-yellow-400/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 block"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-radial from-white/10 to-transparent rounded-full -translate-y-12 translate-x-12"></div>

            {/* Content */}
            <div className="relative p-4 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 pr-2">
                  <h3 className="text-lg font-bold text-white leading-tight tracking-wide">
                    Air India
                  </h3>
                </div>
                <div className="relative flex-shrink-0">
                  <div className="w-40 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg group-hover:bg-white/20 transition-all duration-300">
                    <Image
                      src="/airlines/AI.png"
                      alt="Air India"
                      width={80}
                      height={80}
                      className="object-contain filter drop-shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">1.85</p>
                  <p className="text-red-100/70 text-xs uppercase tracking-wide">
                    Ton
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">1,850</p>
                  <p className="text-red-100/70 text-xs uppercase tracking-wide">
                    Pcs
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">1.85</p>
                  <p className="text-red-100/70 text-xs uppercase tracking-wide">
                    m³
                  </p>
                </div>
              </div>

              {/* Aircraft Info */}
              <div className="mt-auto">
                <div className="flex justify-center p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15">
                  <span className="text-red-100/80 text-xs bg-white/15 px-3 py-1 rounded-full">
                    AI-7239
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Eva Air */}
          <Link
            href="/airline_detail?airline=BR"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-500/90 via-orange-600/90 to-orange-700/90 backdrop-blur-sm border border-orange-400/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 block"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-radial from-white/10 to-transparent rounded-full -translate-y-12 translate-x-12"></div>

            {/* Content */}
            <div className="relative p-4 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 pr-2">
                  <h3 className="text-lg font-bold text-white leading-tight tracking-wide">
                    Eva Air
                  </h3>
                </div>
                <div className="relative flex-shrink-0">
                  <div className="w-40 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg group-hover:bg-white/20 transition-all duration-300">
                    <Image
                      src="/airlines/BR.png"
                      alt="Eva Air"
                      width={120}
                      height={120}
                      className="object-contain filter drop-shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">4.2</p>
                  <p className="text-blue-100/70 text-xs uppercase tracking-wide">
                    Ton
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">4,200</p>
                  <p className="text-blue-100/70 text-xs uppercase tracking-wide">
                    Pcs
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">4.2</p>
                  <p className="text-blue-100/70 text-xs uppercase tracking-wide">
                    m³
                  </p>
                </div>
              </div>

              {/* Aircraft Info */}
              <div className="mt-auto">
                <div className="flex justify-center p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15">
                  <span className="text-blue-100/80 text-xs bg-white/15 px-3 py-1 rounded-full">
                    BR-955
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Air Fast Indonesia*/}
          <Link
            href="/airline_detail?airline=FS"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/90 via-blue-600/90 to-blue-700/90 backdrop-blur-sm border border-blue-400/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 block"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-radial from-white/10 to-transparent rounded-full -translate-y-12 translate-x-12"></div>

            {/* Content */}
            <div className="relative p-4 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 pr-2">
                  <h3 className="text-lg font-bold text-white leading-tight tracking-wide">
                    Air Fast <br />
                    Indonesia
                  </h3>
                </div>
                <div className="relative flex-shrink-0">
                  <div className="w-40 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg group-hover:bg-white/20 transition-all duration-300">
                    <Image
                      src="/airlines/FS.png"
                      alt="Air Fast Indonesia"
                      width={120}
                      height={120}
                      className="object-contain filter drop-shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">3.1</p>
                  <p className="text-yellow-100/70 text-xs uppercase tracking-wide">
                    Ton
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">3,100</p>
                  <p className="text-yellow-100/70 text-xs uppercase tracking-wide">
                    Pcs
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">3.1</p>
                  <p className="text-yellow-100/70 text-xs uppercase tracking-wide">
                    m³
                  </p>
                </div>
              </div>

              {/* Aircraft Info */}
              <div className="mt-auto">
                <div className="flex justify-center p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15">
                  <span className="text-yellow-100/80 text-xs bg-white/15 px-3 py-1 rounded-full">
                    FS-1537
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Etihad Airways */}
          <Link
            href="/airline_detail?airline=EY"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/90 via-blue-600/90 to-blue-700/90 backdrop-blur-sm border border-blue-400/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 block"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-radial from-white/10 to-transparent rounded-full -translate-y-12 translate-x-12"></div>

            {/* Content */}
            <div className="relative p-4 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 pr-2">
                  <h3 className="text-lg font-bold text-white leading-tight tracking-wide">
                    Etihad Airways
                  </h3>
                </div>
                <div className="relative flex-shrink-0">
                  <div className="w-40 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg group-hover:bg-white/20 transition-all duration-300">
                    <Image
                      src="/airlines/EY.png"
                      alt="Etihad Airways"
                      width={70}
                      height={70}
                      className="object-contain filter drop-shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">2.45</p>
                  <p className="text-orange-100/70 text-xs uppercase tracking-wide">
                    Ton
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">2,450</p>
                  <p className="text-orange-100/70 text-xs uppercase tracking-wide">
                    Pcs
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">2.45</p>
                  <p className="text-orange-100/70 text-xs uppercase tracking-wide">
                    m³
                  </p>
                </div>
              </div>

              {/* Aircraft Info */}
              <div className="mt-auto">
                <div className="flex justify-center p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15">
                  <span className="text-orange-100/80 text-xs bg-white/15 px-3 py-1 rounded-full">
                    EY-D123
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Saudia */}
          <Link
            href="/airline_detail?airline=SV"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-500/90 via-orange-600/90 to-orange-700/90 backdrop-blur-sm border border-orange-400/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 block"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-radial from-white/10 to-transparent rounded-full -translate-y-12 translate-x-12"></div>

            {/* Content */}
            <div className="relative p-4 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 pr-2">
                  <h3 className="text-lg font-bold text-white leading-tight tracking-wide">
                    Saudia
                  </h3>
                </div>
                <div className="relative flex-shrink-0">
                  <div className="w-40 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg group-hover:bg-white/20 transition-all duration-300">
                    <Image
                      src="/airlines/SV.png"
                      alt="Saudia"
                      width={80}
                      height={80}
                      className="object-contain filter drop-shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">1.85</p>
                  <p className="text-red-100/70 text-xs uppercase tracking-wide">
                    Ton
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">1,850</p>
                  <p className="text-red-100/70 text-xs uppercase tracking-wide">
                    Pcs
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">1.85</p>
                  <p className="text-red-100/70 text-xs uppercase tracking-wide">
                    m³
                  </p>
                </div>
              </div>

              {/* Aircraft Info */}
              <div className="mt-auto">
                <div className="flex justify-center p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15">
                  <span className="text-red-100/80 text-xs bg-white/15 px-3 py-1 rounded-full">
                    SV-7239
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Oman Air */}
          <Link
            href="/airline_detail?airline=WY"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-red-500/90 via-red-600/90 to-red-700/90 backdrop-blur-sm border border-red-400/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 block"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-radial from-white/10 to-transparent rounded-full -translate-y-12 translate-x-12"></div>

            {/* Content */}
            <div className="relative p-4 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 pr-2">
                  <h3 className="text-lg font-bold text-white leading-tight tracking-wide">
                    Oman Air
                  </h3>
                </div>
                <div className="relative flex-shrink-0">
                  <div className="w-40 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg group-hover:bg-white/20 transition-all duration-300">
                    <Image
                      src="/airlines/WY.png"
                      alt="Oman Air"
                      width={80}
                      height={80}
                      className="object-contain filter drop-shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">4.2</p>
                  <p className="text-blue-100/70 text-xs uppercase tracking-wide">
                    Ton
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">4,200</p>
                  <p className="text-blue-100/70 text-xs uppercase tracking-wide">
                    Pcs
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">4.2</p>
                  <p className="text-blue-100/70 text-xs uppercase tracking-wide">
                    m³
                  </p>
                </div>
              </div>

              {/* Aircraft Info */}
              <div className="mt-auto">
                <div className="flex justify-center p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15">
                  <span className="text-blue-100/80 text-xs bg-white/15 px-3 py-1 rounded-full">
                    WY-955
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* All Nippon Airways*/}
          <Link
            href="/airline_detail?airline=NH"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-yellow-500/90 via-yellow-600/90 to-yellow-700/90 backdrop-blur-sm border border-yellow-400/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 block"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-radial from-white/10 to-transparent rounded-full -translate-y-12 translate-x-12"></div>

            {/* Content */}
            <div className="relative p-4 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 pr-2">
                  <h3 className="text-lg font-bold text-white leading-tight tracking-wide">
                    All Nippon Airways
                  </h3>
                </div>
                <div className="relative flex-shrink-0">
                  <div className="w-40 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg group-hover:bg-white/20 transition-all duration-300">
                    <Image
                      src="/airlines/NH.png"
                      alt="All Nippon Airways"
                      width={80}
                      height={80}
                      className="object-contain filter drop-shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">3.1</p>
                  <p className="text-yellow-100/70 text-xs uppercase tracking-wide">
                    Ton
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">3,100</p>
                  <p className="text-yellow-100/70 text-xs uppercase tracking-wide">
                    Pcs
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-0.5">3.1</p>
                  <p className="text-yellow-100/70 text-xs uppercase tracking-wide">
                    m³
                  </p>
                </div>
              </div>

              {/* Aircraft Info */}
              <div className="mt-auto">
                <div className="flex justify-center p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15">
                  <span className="text-yellow-100/80 text-xs bg-white/15 px-3 py-1 rounded-full">
                    NH-1537
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
