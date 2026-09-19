"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Leaf,
  Eye,
  EyeOff,
  Mail,
  Lock,
  CheckSquare,
  Square,
} from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-green-100 to-lime-100 px-6">

      {/* Background Blur */}
      <div className="absolute -left-24 top-10 h-80 w-80 animate-pulse rounded-full bg-green-400/15 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-96 w-96 animate-pulse rounded-full bg-emerald-500/15 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-300/15 blur-3xl animate-float" />

      {/* Floating Leaves */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <Leaf
            key={i}
            className="absolute text-green-400/15 animate-float"
            style={{
              left: `${10 + i * 15}%`,
              top: `${10 + (i % 3) * 25}%`,
              width: `${20 + i * 5}px`,
              height: `${20 + i * 5}px`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${6 + i}s`,
            }}
          />
        ))}
      </div>

      {/* Card */}
      <div className="group relative w-full max-w-md rounded-3xl border border-white/40 bg-white/75 p-8 shadow-2xl backdrop-blur-xl animate-fade transition-all duration-500 hover:shadow-emerald-100/60">

        {/* Gradient Border Glow - Soft */}
        <div className="absolute -inset-[1px] -z-10 rounded-3xl bg-gradient-to-r from-white/60 via-emerald-50/50 to-white/60 opacity-0 blur-lg transition-opacity duration-700 group-hover:opacity-100" />

        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-3xl shadow-lg animate-glow transition-transform duration-500 hover:scale-110 hover:rotate-6">
            <Leaf className="h-8 w-8 text-white" />
          </div>

          <h1 className="text-4xl font-bold text-emerald-700">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-500">
            Login to continue using the application.
          </p>
        </div>

        <form className="space-y-5">

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-emerald-500" />
            <input
              type="email"
              placeholder="Email Address"
              className="peer w-full rounded-xl border border-green-200 bg-white/70 px-4 py-3 pl-12 outline-none transition-all duration-300 hover:border-emerald-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:scale-[1.02]"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-emerald-500" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="peer w-full rounded-xl border border-green-200 bg-white/70 px-4 py-3 pl-12 pr-12 outline-none transition-all duration-300 hover:border-emerald-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:scale-[1.02]"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors hover:text-emerald-600"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">

            <label className="flex cursor-pointer items-center gap-2 text-gray-600 transition-colors hover:text-emerald-700">
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className="flex items-center"
              >
                {rememberMe ? (
                  <CheckSquare className="h-5 w-5 text-emerald-600 transition-transform duration-300 scale-110" />
                ) : (
                  <Square className="h-5 w-5 text-gray-400" />
                )}
              </button>
              Remember me
            </label>

            <Link
              href="/forgot-password"
              className="relative font-medium text-emerald-600 transition-colors hover:text-emerald-800 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-emerald-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              Forgot Password?
            </Link>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn-shine w-full rounded-xl bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-emerald-200 hover:shadow-2xl active:scale-95"
          >
            Login
          </button>

        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-300"></div>
          <span className="text-sm text-gray-400">or</span>
          <div className="h-px flex-1 bg-gray-300"></div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-4">

          <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-3 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-gray-50 hover:shadow-md active:scale-95">
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>

          <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-3 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-gray-50 hover:shadow-md active:scale-95">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.387.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 3-.399s2.04.132 3 .399c2.292-1.552 3.3-1.23 3.3-1.23.653 1.64.24 2.86.118 3.16.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.22 0 1.602-.015 2.894-.015 3.287 0 .322.216.698.83.578 4.765-1.588 8.2-6.086 8.2-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </button>

        </div>

        {/* Register */}
        <p className="mt-6 text-center text-gray-500">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="relative font-semibold text-emerald-700 transition-colors hover:text-emerald-900 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-emerald-700 after:transition-all after:duration-300 hover:after:w-full"
          >
            Register
          </Link>
        </p>

      </div>

    </main>
  );
}