"use client";

import { useEffect, useRef, useState, useActionState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import PixelBlast from "../../src/components/ui/Backgrounds/PixelBlast/PixelBlast";
import StarBorder from "../../src/components/ui/Animations/StarBorder/StarBorder";
import { sendEmail } from '../actions/send-email';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: email, 2: token, 3: new password

  const emailRef = useRef<HTMLInputElement>(null);
  const tokenRef = useRef<HTMLInputElement>(null);

  const [, formAction, isPending] = useActionState(async (prevState: { success: boolean; message: string } | null, formData: FormData) => {
    const result = await sendEmail(formData);
    
    if (result.success) {
      const emailValue = formData.get('email') as string;
      setEmail(emailValue);
      setCurrentStep(2);
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    
    return result;
  }, null);

  useEffect(() => {
    // Smooth page entrance animation
    setIsPageLoaded(true);
    if (currentStep === 1) {
      emailRef.current?.focus();
    } else if (currentStep === 2) {
      tokenRef.current?.focus();
    }
  }, [currentStep]);



  const handleVerifyToken = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Token is required.");
      return;
    }

    if (token.length < 6) {
      toast.error("Token must be at least 6 characters.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/verify-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      });

      const data = await res.json();

      if (data.success) {
        setCurrentStep(3);
        toast.success("Token verified successfully!");
      } else {
        toast.error(data.message || "Invalid token. Please try again.");
      }
    } catch {
      toast.error("Failed to verify token. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("All password fields are required.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, newPassword }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
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

  const handleBackToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
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
      <div className={`z-10 flex flex-col items-center justify-center text-center space-y-8 px-4 sm:px-8 max-w-7xl mx-auto transition-all duration-1200 ease-out ${
        isPageLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
      }`}>
        {/* Forgot Password Form Card */}
        <div className="w-full max-w-5xl">
          <div className="relative bg-black/5 backdrop-blur-xs border border-white/5 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/50 animate-slide-in-clean">
            
            {/* Navigation Icons - Top Left & Right */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
              {/* Back Button (Left) */}
              {currentStep > 1 && (
                <button
                  onClick={handleBackToPreviousStep}
                  className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 group"
                  title="Back"
                >
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
              )}
              
              {/* Close Button (Right) */}
              <button
                onClick={handleBackToLogin}
                className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 group ml-auto"
                title="Close"
              >
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

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

            {/* Progress Steps */}
            <div className="flex justify-center mb-6 animate-fade-in-clean" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center space-x-2">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      currentStep >= step 
                        ? 'bg-cyan-500 text-white' 
                        : 'bg-white/10 text-white/50'
                    }`}>
                      {step}
                    </div>
                    {step < 3 && (
                      <div className={`w-8 h-0.5 mx-2 transition-all duration-300 ${
                        currentStep > step ? 'bg-cyan-500' : 'bg-white/10'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Email Input */}
            {currentStep === 1 && (
              <>
                {/* Header */}
                <div className="text-center mb-6 animate-fade-in-clean" style={{ animationDelay: "0.4s" }}>
                  <h1 className="text-2xl font-light text-white mb-2">Forgot Password?</h1>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Enter your email address and we&apos;ll send you a reset token.
                  </p>
                </div>

                {/* Form */}
                <form action={formAction} className="space-y-6">
                  {/* Email Input */}
                  <div className="animate-fade-in-clean" style={{ animationDelay: "0.6s" }}>
                    <label className="block text-sm text-white/70 mb-2">Email Address</label>
                    <input
                      ref={emailRef}
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full px-5 py-4 text-base bg-white/5 backdrop-blur-md text-white placeholder-white/50 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 hover:bg-white/10"
                      required
                    />
                  </div>

                  {/* Send Token Button */}
                  <div className="animate-fade-in-clean" style={{ animationDelay: "0.8s" }}>
                    <StarBorder
                      as="button"
                      type="submit"
                      disabled={isPending}
                      className="w-full"
                      color="cyan"
                      speed="5s"
                    >
                      {isPending ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Sending Token...</span>
                        </div>
                      ) : (
                        "Send Reset Token"
                      )}
                    </StarBorder>
                  </div>
                </form>
              </>
            )}

            {/* Step 2: Token Verification */}
            {currentStep === 2 && (
              <>
                {/* Header */}
                <div className="text-center mb-6 animate-fade-in-clean" style={{ animationDelay: "0.4s" }}>
                  <h1 className="text-2xl font-light text-white mb-2">Verify Token</h1>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Enter the 6-character token sent to <span className="text-cyan-400 font-medium">{email}</span>
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleVerifyToken} className="space-y-6">
                  {/* Token Input */}
                  <div className="animate-fade-in-clean" style={{ animationDelay: "0.6s" }}>
                    <label className="block text-sm text-white/70 mb-2">Reset Token</label>
                    <input
                      ref={tokenRef}
                      type="text"
                      placeholder="Enter 6-character token"
                      value={token}
                      onChange={(e) => setToken(e.target.value.replace(/[^A-Z0-9]/gi, '').slice(0, 6).toUpperCase())}
                      className="w-full px-5 py-4 text-base bg-white/5 backdrop-blur-md text-white placeholder-white/50 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 hover:bg-white/10 text-center text-2xl tracking-widest"
                      maxLength={6}
                      required
                    />
                  </div>

                  {/* Verify Token Button */}
                  <div className="animate-fade-in-clean" style={{ animationDelay: "0.8s" }}>
                    <StarBorder
                      as="button"
                      type="submit"
                      disabled={isLoading || token.length < 6}
                      className="w-full"
                      color="cyan"
                      speed="5s"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Verifying...</span>
                        </div>
                      ) : (
                        "Verify Token"
                      )}
                    </StarBorder>
                  </div>
                </form>
              </>
            )}

            {/* Step 3: New Password */}
            {currentStep === 3 && (
              <>
                {/* Header */}
                <div className="text-center mb-6 animate-fade-in-clean" style={{ animationDelay: "0.4s" }}>
                  <h1 className="text-2xl font-light text-white mb-2">New Password</h1>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Create a new password for your account.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleResetPassword} className="space-y-4">
                  {/* New Password Input */}
                  <div className="animate-fade-in-clean" style={{ animationDelay: "0.6s" }}>
                    <label className="block text-sm text-white/70 mb-2">New Password</label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-5 py-4 text-base bg-white/5 backdrop-blur-md text-white placeholder-white/50 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 hover:bg-white/10"
                      required
                    />
                  </div>

                  {/* Confirm Password Input */}
                  <div className="animate-fade-in-clean" style={{ animationDelay: "0.7s" }}>
                    <label className="block text-sm text-white/70 mb-2">Confirm Password</label>
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-5 py-4 text-base bg-white/5 backdrop-blur-md text-white placeholder-white/50 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 hover:bg-white/10"
                      required
                    />
                  </div>

                  {/* Reset Password Button */}
                  <div className="animate-fade-in-clean" style={{ animationDelay: "0.8s" }}>
                    <StarBorder
                      as="button"
                      type="submit"
                      disabled={isLoading || newPassword !== confirmPassword || newPassword.length < 6}
                      className="w-full"
                      color="cyan"
                      speed="5s"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Resetting...</span>
                        </div>
                      ) : (
                        "Reset Password"
                      )}
                    </StarBorder>
                  </div>
                </form>
              </>
            )}

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
