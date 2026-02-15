"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { apiPost } from "@/lib/api";
import { useAuth } from "@/components/AuthContext";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import { AuthResponse } from "@/types";
import { ArrowLeftIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const redirect = searchParams.get("redirect") || "/";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await apiPost<AuthResponse>("/auth/login", { email, password });
      login(data.token, data.user);
      router.push(redirect);
    } catch (err: any) {
      setError(err.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleSuccess(data: AuthResponse) {
    login(data.token, data.user);
    router.push(redirect);
  }

  return (
    <section className="min-h-screen py-20 bg-gray-50 flex flex-col items-center justify-center -mt-20">
      <div className="container-custom max-w-md w-full">
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-primary-600 mb-8 transition-colors">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">L</span>
            </div>
            <h1 className="text-2xl font-display font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-500 mt-2">Login to manage your care services</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              type="button"
              onClick={() => {
                setEmail("demoadmin@gmail.com");
                setPassword("Admin@2000");
              }}
              className="px-4 py-2 bg-primary-50 text-primary-700 rounded-xl text-sm font-medium hover:bg-primary-100 transition-colors"
            >
              Demo Admin
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail("demouser@gmail.com");
                setPassword("User@2000");
              }}
              className="px-4 py-2 bg-accent-50 text-accent-700 rounded-xl text-sm font-medium hover:bg-accent-100 transition-colors"
            >
              Demo User
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="input"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl">
                {error}
              </div>
            )}

            <button disabled={loading} className="w-full btn-primary" type="submit">
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Logging in...
                </div>
              ) : "Login"}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mb-8">
            <GoogleLoginButton onSuccess={handleGoogleSuccess} />
          </div>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link 
              href={`/register${redirect !== "/" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}
              className="font-semibold text-primary-600 hover:text-primary-700"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen py-20 flex justify-center items-center"><div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" /></div>}>
      <LoginContent />
    </Suspense>
  );
}
