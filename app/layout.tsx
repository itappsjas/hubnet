import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

// Font utama
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JAS Connect",
  description: "Hubnet Monitoring Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable}`}
      suppressHydrationWarning // ✅ Tambahkan ini
    >
      <body className="antialiased" suppressHydrationWarning> {/* ✅ Bisa juga di sini */}
        {children}
        <Toaster position="top-right" /> {/* ✅ Ini penting */}
      </body>
    </html>
  );
}
