"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { apiPost } from "@/lib/api";
import { useAuth } from "@/components/AuthContext";
import { AuthResponse } from "@/types";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

function RegisterContent() {
  const [form, setForm] = useState({
    nidNo: "",
    name: "",
    email: "",
    contact: "",
    password: "",
  });
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
      const data = await apiPost<AuthResponse>("/auth/register", form);
      login(data.token, data.user);
      router.push(redirect);
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen py-20 bg-gray-50 flex flex-col items-center justify-center -mt-20">
      <div className="container-custom max-w-lg w-full">
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-primary-600 mb-8 transition-colors">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-500 mt-2">Join Care.xyz to get started</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NID No</label>
                <input
                  type="text"
                  value={form.nidNo}
                  onChange={(e) => setForm({ ...form, nidNo: e.target.value })}
                  className="input"
                  placeholder="Optional"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                <input
                  type="text"
                  required
                  value={form.contact}
                  onChange={(e) => setForm({ ...form, contact: e.target.value })}
                  className="input"
                  placeholder="+880..."
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input"
                  placeholder="you@example.com"
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input"
                  placeholder="Minimum 6 characters"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Password must include at least 6 characters, one uppercase, and one lowercase letter.
                </p>
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
                  Creating Account...
                </div>
              ) : "Sign Up"}
            </button>
          </form>

          <div className="mt-8 text-center pt-8 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-primary-600 hover:text-primary-700">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen py-20 flex justify-center items-center"><div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" /></div>}>
      <RegisterContent />
    </Suspense>
  );
}
