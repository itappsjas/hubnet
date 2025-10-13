"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import PixelBlast from "../../src/components/ui/Backgrounds/PixelBlast/PixelBlast";
import StarBorder from "../../src/components/ui/Animations/StarBorder/StarBorder";
import { Suspense } from "react";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [token, setToken] = useState("");

  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Get token from URL params
    const tokenParam = searchParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      toast.error("Invalid reset link. Please request a new password reset.");
      router.push("/forgot-password");
      return;
    }

    // Smooth page entrance animation
    setIsPageLoaded(true);
    passwordRef.current?.focus();
  }, [searchParams, router]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Both password fields are required.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Password reset successfully!");
        router.push("/login");
      } else {
        toast.error(data.message || "Failed to reset password.");
      }
    } catch {
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 overflow-hidden">
      {/* Smooth Entrance Overlay */}
      <div className={`absolute inset-0 z-30 bg-slate-950 transition-all duration-1000 ease-out ${
        isPageLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`} />
      
      {/* PixelBlast Background with smooth animation */}
      <div className={`absolute inset-0 z-0 transition-all duration-1200 ease-out ${
        isPageLoaded ? 'opacity-100' : 'opacity-0'
      }`}>
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color="#06B6D4"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={false}
          speed={0.6}
          edgeFade={0.25}
          transparent
        />
      </div>

      {/* Subtle Floating Elements */}
      <div className={`absolute inset-0 z-5 transition-all duration-1200 ease-out pointer-events-none ${
        isPageLoaded ? 'opacity-100' : 'opacity-0'
      }`}>
        {[...Array(3)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-white/10 rounded-full animate-float-subtle pointer-events-none"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className={`z-10 flex flex-col items-center justify-center text-center space-y-8 px-6 max-w-4xl mx-auto transition-all duration-1200 ease-out ${
        isPageLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
      }`}>
        {/* Reset Password Form Card */}
        <div className="w-full max-w-md">
          <div className="bg-black/5 backdrop-blur-xs border border-white/5 rounded-3xl p-8 shadow-2xl shadow-black/50 animate-slide-in-clean">
            
            {/* Logo */}
            <div className="flex justify-center mb-6 animate-fade-in-clean" style={{ animationDelay: "0.2s" }}>
              <Image
                src="/logojas.png"
                alt="JAS Logo"
                width={120}
                height={96}
                className="rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
              />
            </div>

            {/* Header */}
            <div className="text-center mb-6 animate-fade-in-clean" style={{ animationDelay: "0.4s" }}>
              <h1 className="text-2xl font-light text-white mb-2">Reset Password</h1>
              <p className="text-slate-300 text-sm leading-relaxed">
                Enter your new password below.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleResetPassword} className="space-y-6">
              {/* New Password Input */}
              <div className="animate-fade-in-clean" style={{ animationDelay: "0.6s" }}>
                <div className="relative">
                  <input
                    ref={passwordRef}
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-4 pr-14 text-base bg-white/5 backdrop-blur-md text-white placeholder-white/50 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 hover:bg-white/10"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors duration-200 focus:outline-none"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="animate-fade-in-clean" style={{ animationDelay: "0.8s" }}>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-5 py-4 pr-14 text-base bg-white/5 backdrop-blur-md text-white placeholder-white/50 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 hover:bg-white/10"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors duration-200 focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="animate-fade-in-clean text-xs text-slate-400" style={{ animationDelay: "1.0s" }}>
                Password must be at least 6 characters long
              </div>

              {/* Reset Password Button */}
              <div className="animate-fade-in-clean" style={{ animationDelay: "1.2s" }}>
                <StarBorder
                  as="button"
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                  color="cyan"
                  speed="5s"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Resetting Password...</span>
                    </div>
                  ) : (
                    "Reset Password"
                  )}
                </StarBorder>
              </div>
            </form>

            {/* Back to Login */}
            <div className="mt-6 animate-fade-in-clean" style={{ animationDelay: "1.4s" }}>
              <button
                onClick={handleBackToLogin}
                className="w-full flex items-center justify-center space-x-2 text-white/70 hover:text-white transition-colors duration-200 text-sm py-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes slide-in-clean {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-clean {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float-subtle {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-slide-in-clean {
          animation: slide-in-clean 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          opacity: 0;
        }

        .animate-fade-in-clean {
          animation: fade-in-clean 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-float-subtle {
          animation: float-subtle 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
