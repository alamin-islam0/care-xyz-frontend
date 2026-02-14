"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProtectedPage from "@/components/ProtectedPage";
import { useAuth } from "@/components/AuthContext";
import { apiGet, apiPatch } from "@/lib/api";
import { Booking, BookingsResponse } from "@/types";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { 
  CalendarIcon, 
  MapPinIcon, 
  ClockIcon, 
  BanknotesIcon,
  EyeIcon,
  XCircleIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

export default function MyBookingsPage() {
  return (
    <ProtectedPage>
      <BookingsContent />
    </ProtectedPage>
  );
}

function BookingsContent() {
  const { token } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadBookings() {
    try {
      setError("");
      setLoading(true);
      const data = await apiGet<BookingsResponse>("/bookings/my", token);
      setBookings(data.bookings);
    } catch (err: any) {
      setError(err.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function cancelBooking(id: string) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#3B82F6",
      confirmButtonText: "Yes, cancel it!"
    });

    if (!result.isConfirmed) return;
    
    try {
      await apiPatch(`/bookings/${id}/cancel`, {}, token);
      await loadBookings();
      Swal.fire(
        "Cancelled!",
        "Your booking has been cancelled.",
        "success"
      );
    } catch (err: any) {
      Swal.fire(
        "Error!",
        err.message || "Failed to cancel booking",
        "error"
      );
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <section className="min-h-screen py-12 bg-gray-50">
      <div className="container-custom">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">My Bookings</h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500">Loading bookings...</p>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl">{error}</div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Bookings Yet</h3>
            <p className="text-gray-500 mb-6">You haven't booked any services yet.</p>
            <Link href="/#services" className="btn-primary">
              Browse Services
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div 
                key={booking._id} 
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-grow">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {(booking.service as any)?.name || "Service Unavailable"}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                      <div className="flex items-center text-gray-600 text-sm">
                        <ClockIcon className="w-4 h-4 mr-2 text-primary-500" />
                        {booking.durationValue} {booking.durationType}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <CalendarIcon className="w-4 h-4 mr-2 text-primary-500" />
                        {formatDateTime(booking.startDate)}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPinIcon className="w-4 h-4 mr-2 text-primary-500" />
                        {booking.location?.city}, {booking.location?.area}
                      </div>
                      <div className="flex items-center text-gray-900 font-bold text-sm">
                        <BanknotesIcon className="w-4 h-4 mr-2 text-primary-500" />
                        {formatCurrency(booking.totalCost)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                    <Link 
                      href={`/my-bookings/${booking._id}`} 
                      className="flex-1 md:flex-none btn-outline py-2 px-4 text-sm flex items-center justify-center"
                    >
                      <EyeIcon className="w-4 h-4 mr-2" />
                      Details
                    </Link>
                    
                    {booking.status !== "cancelled" && booking.status !== "completed" && (
                      <button
                        type="button"
                        className="flex-1 md:flex-none py-2 px-4 rounded-full border border-red-200 text-red-600 hover:bg-red-50 text-sm font-semibold transition-colors flex items-center justify-center"
                        onClick={() => cancelBooking(booking._id)}
                      >
                        <XCircleIcon className="w-4 h-4 mr-2" />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
