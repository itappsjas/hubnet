"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import LightRays from "../components/LightRays";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [secret, setSecret] = useState("");
  const [qr, setQr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Username dan password wajib diisi.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorJson = await res.json();
        toast.error(errorJson.message || "Login gagal");
        return;
      }

      const data = await res.json();
      if (data.success) {
        setSecret(data.secret);
        setQr(data.qr);
        setStep(2);
      } else {
        toast.error("Login gagal: Username atau password salah.");
      }
    } catch {
      toast.error("Terjadi kesalahan saat login.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      toast.error("Kode OTP harus terdiri dari 6 angka.");
      return;
    }

    try {
      const res = await fetch("/api/verify-mfa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: otp, secret }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        toast.error("Verifikasi gagal: " + errorText);
        return;
      }

      const data = await res.json();
      if (data.success) {
        router.push("/dashboard");
      } else {
        toast.error("Kode OTP salah. Silakan coba lagi.");
      }
    } catch {
      toast.error("Terjadi kesalahan saat verifikasi.");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900 overflow-hidden">
      {/* Light Rays Background */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
        />
      </div>

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center justify-center text-center space-y-8 px-6 max-w-4xl mx-auto">
        {step === 1 ? (
          <>
            {/* Hero Section */}
            <div className="space-y-6">
              <div className="flex justify-center mb-4">
                <Image
                  src="/logojas.png"
                  alt="JAS Logo"
                  width={160}
                  height={80}
                  className="object-contain"
                />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                LOGIN
              </h1>
              {/* <p className="text-white/70 text-base md:text-lg max-w-md mx-auto">
                Sign in to access your account and continue where you left off.
              </p> */}
            </div>

            {/* Login Form */}
            <div className="w-full max-w-md space-y-5">
              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  ref={usernameRef}
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-white/10 backdrop-blur-md text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-white/10 backdrop-blur-md text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                  required
                />

                <div className="flex items-center justify-between text-sm text-white/60">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="form-checkbox rounded bg-white/20 border-white/30"
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="hover:text-white transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full p-4 rounded-2xl font-semibold transition-all ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed text-gray-200"
                      : "bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              <p className="text-sm text-white/60 text-center">
                Don’t have an account?{" "}
                <span className="text-cyan-400 hover:text-cyan-300 cursor-pointer">
                  Contact Admin
                </span>
              </p>
            </div>
          </>
        ) : (
          /* MFA Step */
          <div className="w-full max-w-md">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-white text-center mb-4">
                Two-Factor Authentication
              </h2>
              <p className="text-white/70 text-sm text-center mb-6">
                Enter the 6-digit code from your authenticator app to continue.
              </p>

              <form onSubmit={handleVerify} className="space-y-6">
                {qr && (
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-white rounded-2xl">
                      <Image
                        src={qr}
                        alt="QR Code"
                        width={160}
                        height={160}
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                )}

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  pattern="\d{6}"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-white/10 backdrop-blur-md text-white text-center text-xl tracking-widest placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                  required
                />

                <button
                  type="submit"
                  className="w-full p-4 rounded-2xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  Verify & Continue
                </button>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full mt-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  ← Back to Login
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
