"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import { useState, useRef, useEffect } from "react";
import { 
  Bars3Icon, 
  XMarkIcon, 
  UserCircleIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  BriefcaseIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  /* 
    Note: "My Bookings" is moved to the profile dropdown for authenticated users, 
    but we keep it in main nav for mobile if needed or conditionally render it.
    For now, let's keep the main nav clean and put user-specific links in the dropdown.
  */

  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-200/50 animate-slide-down">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:shadow-xl group-hover:shadow-primary-500/40 transition-all duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-2xl font-display font-bold gradient-text">
              Care.xyz
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-accent-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 pl-4 pr-2 py-2 bg-white border border-gray-200 hover:border-primary-200 rounded-full transition-all duration-200 hover:shadow-md group"
                >
                  <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 group-hover:bg-primary-100 transition-colors">
                    <UserCircleIcon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-scale-in origin-top-right overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Signed in as</p>
                      <p className="text-sm font-bold text-gray-900 truncate">{user?.email}</p>
                    </div>
                    
                    <div className="p-2 space-y-1">
                      <Link 
                        href="/profile" 
                        className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-xl hover:bg-primary-50 hover:text-primary-700 transition-colors"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <UserIcon className="w-4 h-4 mr-3" />
                        My Profile
                      </Link>
                      
                      {user?.role === 'admin' ? (
                        <Link 
                          href="/admin" 
                          className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-xl hover:bg-primary-50 hover:text-primary-700 transition-colors"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          <ShieldCheckIcon className="w-4 h-4 mr-3" />
                          Admin Dashboard
                        </Link>
                      ) : (
                        <Link 
                          href="/my-bookings" 
                          className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-xl hover:bg-primary-50 hover:text-primary-700 transition-colors"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          <BriefcaseIcon className="w-4 h-4 mr-3" />
                          My Bookings
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-gray-100 pt-1 mt-1 p-2">
                       <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                        }}
                        className="flex w-full items-center px-3 py-2 text-sm text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                      >
                        <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="btn-ghost">
                  Login
                </Link>
                <Link href="/register" className="btn-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6 text-gray-700" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            mobileMenuOpen ? "max-h-[32rem] opacity-100 pb-6" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col space-y-4 pt-4 border-t border-gray-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 px-4 py-2 hover:bg-primary-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="border-t border-gray-200 pt-4 space-y-3">
              {isAuthenticated ? (
                <div className="space-y-3 px-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                      <UserCircleIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  
                  <Link 
                    href="/profile"
                    className="flex items-center p-3 bg-gray-50 rounded-xl text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <UserIcon className="w-5 h-5 mr-3 text-gray-400" />
                    My Profile
                  </Link>

                  {user?.role === 'admin' ? (
                     <Link 
                      href="/admin"
                      className="flex items-center p-3 bg-gray-50 rounded-xl text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <ShieldCheckIcon className="w-5 h-5 mr-3 text-gray-400" />
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link 
                      href="/my-bookings"
                      className="flex items-center p-3 bg-gray-50 rounded-xl text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <BriefcaseIcon className="w-5 h-5 mr-3 text-gray-400" />
                      My Bookings
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full btn-outline flex items-center justify-center mt-4"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block w-full text-center btn-ghost"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full text-center btn-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
