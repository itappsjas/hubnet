"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import PixelBlast from "../../src/components/ui/Backgrounds/PixelBlast/PixelBlast";
import StarBorder from "../../src/components/ui/Animations/StarBorder/StarBorder";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Smooth page entrance animation
    setIsPageLoaded(true);
    usernameRef.current?.focus();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Username and password are required");
      return;
    }

    setIsLoading(true);

    try {
      // Add minimum loading time of 5 seconds
      const [res] = await Promise.all([
        fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }),
        new Promise(resolve => setTimeout(resolve, 5000)) // 5 second delay
      ]);

      if (!res.ok) {
        const errorJson = await res.json();
        toast.error(errorJson.message || "Login failed");
        return;
      }

      const data = await res.json();
      if (data.success) {
        // Save user data to localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('logged_in', data.logged_in);
        localStorage.setItem('login_time', data.login_time.toString());
        
        toast.success("Login successful!");
        router.push("/dashboard");
      } else {
        toast.error("Login failed: Invalid username or password");
      }
    } catch {
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
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
      <div className={`z-10 flex flex-col items-center justify-center text-center space-y-8 px-6 max-w-4xl mx-auto transition-all duration-1200 ease-out ${
        isPageLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
      }`}>
        {/* Login Form Card */}
        <div className="w-full max-w-3xl">
          <div className="bg-black/5 backdrop-blur-xs border border-white/5 rounded-3xl p-12 shadow-2xl shadow-black/50 flex flex-col md:flex-row items-center justify-between gap-10 animate-slide-in-clean">
                {/* Left Side (Logo and Text) */}
                <div className="hidden md:flex flex-col items-center justify-center w-1/2 text-center space-y-6">
                  <div className="animate-fade-in-clean" style={{ animationDelay: "0.2s" }}>
                    <Image
                      src="/logojas.png"
                      alt="JAS Logo"
                      width={200}
                      height={160}
                      className="rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="space-y-3 animate-fade-in-clean" style={{ animationDelay: "0.4s" }}>
                    {/* <h1 className="text-2xl font-light text-white tracking-wide">
                      Welcome to JAS HUBNET
                    </h1> */}
                    <p className="text-slate-300 text-sm leading-relaxed max-w-xs">
                      Integrated data monitoring system for more efficient operations
                    </p>
                  </div>
                </div>

                {/* Right Side (Form) */}
                <div className="w-full md:w-1/2">
                  <form onSubmit={handleLogin} className="space-y-6">
                    {/* Username Input */}
                    <div className="animate-fade-in-clean" style={{ animationDelay: "0.6s" }}>
                      <input
                        ref={usernameRef}
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-5 py-4 text-base bg-white/5 backdrop-blur-md text-white placeholder-white/50 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 hover:bg-white/10"
                        required
                      />
                    </div>

                    {/* Password Input */}
                    <div className="animate-fade-in-clean" style={{ animationDelay: "0.8s" }}>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-5 py-4 pr-14 text-base bg-white/5 backdrop-blur-md text-white placeholder-white/50 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 hover:bg-white/10"
                          required
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

                    {/* Remember & Forgot */}
                    <div className="flex items-center justify-end text-sm animate-fade-in-clean" style={{ animationDelay: "1.0s" }}>
                      <button
                        type="button"
                        onClick={() => router.push("/forgot-password")}
                        className="text-white/70 hover:text-white transition-colors duration-200"
                      >
                        Forgot password?
                      </button>
                    </div>

                    {/* Sign In Button */}
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
                            <span>Signing in...</span>
                          </div>
                        ) : (
                          "Sign In"
                        )}
                      </StarBorder>
                    </div>
                  </form>

                  {/* Register Link */}
                  <div className="mt-6 animate-fade-in-clean" style={{ animationDelay: "1.4s" }}>
                    <p className="text-center text-white/70 text-sm">
                      Don&apos;t have an account?{" "}
                      <span className="text-cyan-400 hover:text-cyan-300 cursor-pointer font-medium transition-colors duration-200">
                        Register Here
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
      </div>

      {/* Login Page Animations */}
      <style jsx global>{`
        /* Consistent animations with splash screen */
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

        @keyframes glow {
          0%,
          100% {
            text-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
          }
          50% {
            text-shadow: 0 0 30px rgba(6, 182, 212, 0.6),
              0 0 40px rgba(6, 182, 212, 0.4);
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

        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        
        @keyframes star-movement-bottom {
          0% {
            transform: translate(0%, 0%);
            opacity: 1;
          }
          100% {
            transform: translate(-100%, 0%);
            opacity: 0;
          }
        }
        
        @keyframes star-movement-top {
          0% {
            transform: translate(0%, 0%);
            opacity: 1;
          }
          100% {
            transform: translate(100%, 0%);
            opacity: 0;
          }
        }
        
        .animate-star-movement-bottom {
          animation: star-movement-bottom linear infinite alternate;
        }
        
        .animate-star-movement-top {
          animation: star-movement-top linear infinite alternate;
        }
      `}</style>
    </div>
  );
}
