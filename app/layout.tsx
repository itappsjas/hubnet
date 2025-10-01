import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

// Font utama
const geistSans = localFont({
  src: "./fonts/geist-font/fonts/GeistMono/webfonts/GeistMono-Regular.woff2",
  variable: "--font-geist-sans"
});

const geistMono = localFont({
  src: "./fonts/geist-font/fonts/GeistMono/webfonts/GeistMono-Regular.woff2",
  variable: "--font-geist-mono"
});

const roboto = localFont({
  src: "./fonts/Roboto/static/Roboto-Regular.ttf",
  variable: "--font-roboto"
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
