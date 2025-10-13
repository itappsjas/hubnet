"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import PixelBlast from "../../src/components/ui/Backgrounds/PixelBlast/PixelBlast";
import StarBorder from "../../src/components/ui/Animations/StarBorder/StarBorder";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Smooth page entrance animation
    setIsPageLoaded(true);
    emailRef.current?.focus();
  }, []);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email address is required.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setIsEmailSent(true);
        toast.success("Password reset instructions sent to your email!");
      } else {
        toast.error(data.message || "Failed to send reset instructions.");
      }
    } catch {
      toast.error("Failed to send reset instructions. Please try again.");
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
        {/* Forgot Password Form Card */}
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

            {!isEmailSent ? (
              <>
                {/* Header */}
                <div className="text-center mb-6 animate-fade-in-clean" style={{ animationDelay: "0.4s" }}>
                  <h1 className="text-2xl font-light text-white mb-2">Forgot Password?</h1>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Enter your email address and we&apos;ll send you instructions to reset your password.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleForgotPassword} className="space-y-6">
                  {/* Email Input */}
                  <div className="animate-fade-in-clean" style={{ animationDelay: "0.6s" }}>
                    <input
                      ref={emailRef}
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-5 py-4 text-base bg-white/5 backdrop-blur-md text-white placeholder-white/50 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 hover:bg-white/10"
                      required
                    />
                  </div>

                  {/* Send Reset Instructions Button */}
                  <div className="animate-fade-in-clean" style={{ animationDelay: "0.8s" }}>
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
                          <span>Sending Instructions...</span>
                        </div>
                      ) : (
                        "Send Reset Instructions"
                      )}
                    </StarBorder>
                  </div>
                </form>
              </>
            ) : (
              /* Success Message */
              <div className="text-center animate-fade-in-clean">
                {/* Success Icon */}
                <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h2 className="text-xl font-light text-white mb-2">Check Your Email</h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  We&apos;ve sent password reset instructions to <span className="text-cyan-400 font-medium">{email}</span>
                </p>
                
                <div className="text-xs text-slate-400 mb-6">
                  Didn&apos;t receive the email? Check your spam folder or try again.
                </div>
              </div>
            )}

            {/* Back to Login */}
            <div className="mt-6 animate-fade-in-clean" style={{ animationDelay: isEmailSent ? "0.2s" : "1.0s" }}>
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
