"use client";

import { useAuth } from "@/components/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { 
  UserCircleIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  IdentificationIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

export default function ProfilePage() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-20">
      <div className="container-custom max-w-4xl">
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100">
          {/* Header Banner */}
          <div className="h-48 bg-gradient-to-r from-primary-600 to-accent-600 relative">
             <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
          </div>

          <div className="px-8 md:px-12 pb-12 relative">
            {/* Profile Avatar */}
            <div className="relative -mt-20 mb-8 flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6">
              <div className="w-40 h-40 bg-white rounded-full p-2 shadow-2xl">
                <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border-4 border-primary-50">
                  <span className="text-6xl font-bold text-gray-400 uppercase">
                    {user.name?.[0]}
                  </span>
                </div>
              </div>
              <div className="text-center md:text-left pb-4">
                <h1 className="text-3xl font-display font-bold text-gray-900">{user.name}</h1>
                <div className="flex items-center justify-center md:justify-start space-x-2 mt-1">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                    user.role === 'admin' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-primary-100 text-primary-700'
                  }`}>
                    {user.role} Account
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 pt-8 border-t border-gray-100">
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <UserCircleIcon className="w-6 h-6 mr-2 text-primary-600" />
                  Personal Information
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                    <EnvelopeIcon className="w-6 h-6 text-gray-400 mr-4 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Email Address</p>
                      <p className="text-gray-900 font-medium">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                    <PhoneIcon className="w-6 h-6 text-gray-400 mr-4 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Phone Number</p>
                      <p className="text-gray-900 font-medium">{user.contact || "Not Provided"}</p>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                    <IdentificationIcon className="w-6 h-6 text-gray-400 mr-4 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">NID Number</p>
                      <p className="text-gray-900 font-medium">{user.nidNo || "Not Provided"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <ShieldCheckIcon className="w-6 h-6 mr-2 text-accent-600" />
                  Account Status
                </h2>
                <div className="bg-gradient-to-br from-primary-50 to-white border border-primary-100 p-6 rounded-3xl">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-4">
                      <ShieldCheckIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">Active Member</p>
                      <p className="text-sm text-gray-500">Your account is fully verified</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    Thank you for being a valued member of the Care.xyz community. 
                    You have full access to book services and manage your appointments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
