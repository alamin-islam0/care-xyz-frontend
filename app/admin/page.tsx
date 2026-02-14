"use client";

import { useEffect, useState } from "react";
import AdminProtectedPage from "@/components/AdminProtectedPage";
import { useAuth } from "@/components/AuthContext";
import { apiGet, apiPatch } from "@/lib/api";
import { Booking, BookingsResponse } from "@/types";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import {
  ExclamationCircleIcon,
  CheckBadgeIcon,
  XCircleIcon,
  ClockIcon,
  BanknotesIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

export default function AdminDashboardPage() {
  return (
    <AdminProtectedPage>
      <AdminContent />
    </AdminProtectedPage>
  );
}

function AdminContent() {
  const { token } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  async function loadBookings() {
    try {
      setLoading(true);
      const data = await apiGet<BookingsResponse>("/bookings/all", token);
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

  async function updateStatus(bookingId: string, status: string) {
    try {
      const result = await Swal.fire({
        title: "Update Status?",
        text: `Are you sure you want to change status to ${status}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3B82F6",
        cancelButtonColor: "#6B7280",
        confirmButtonText: "Yes, update it!"
      });

      if (!result.isConfirmed) return;

      const { booking } = await apiPatch<{ booking: Booking }>(
        `/bookings/${bookingId}/status`,
        { status },
        token
      );

      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: booking.status } : b))
      );
      
      Swal.fire(
        "Updated!",
        `Booking status has been updated to ${status}.`,
        "success"
      );
    } catch (err: any) {
      Swal.fire(
        "Error!",
        err.message || "Failed to update status",
        "error"
      );
    }
  }

  const filteredBookings = bookings.filter((b) => {
    const matchesFilter = filter === "all" || b.status === filter;
    const matchesSearch =
      b._id.toLowerCase().includes(search.toLowerCase()) ||
      (b.user as any)?.name?.toLowerCase().includes(search.toLowerCase()) ||
      (b.user as any)?.email?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    totalRevenue: bookings
      .filter((b) => b.status === "completed" || b.status === "confirmed")
      .reduce((acc, curr) => acc + curr.totalCost, 0),
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section className="min-h-screen py-12 bg-gray-50">
      <div className="container-custom">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Total Bookings</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Pending Requests</h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Active/Completed</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{stats.confirmed + stats.completed}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Est. Revenue</h3>
            <p className="text-3xl font-bold text-primary-600 mt-2">{formatCurrency(stats.totalRevenue)}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            {["all", "pending", "confirmed", "completed", "cancelled"].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize whitespace-nowrap transition-colors ${
                  filter === s
                    ? "bg-primary-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search user or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-12 flex justify-center">
              <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-600">{error}</div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-12 text-center text-gray-500">No bookings found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-500">Details</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-500">Customer</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-500">Date/Location</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-500">Amount</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-500">Status</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredBookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {(booking.service as any)?.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">ID: {booking._id.slice(-6)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{(booking.user as any)?.name}</div>
                        <div className="text-sm text-gray-500">{(booking.user as any)?.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{formatDateTime(booking.startDate)}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {booking.location.city}, {booking.location.area}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {formatCurrency(booking.totalCost)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-xs font-semibold capitalize ${getStatusBadge(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={booking.status}
                          onChange={(e) => updateStatus(booking._id, e.target.value)}
                          className="text-sm border-gray-200 rounded-lg focus:ring-primary-500 focus:border-primary-500 py-1"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirm</option>
                          <option value="completed">Complete</option>
                          <option value="cancelled">Cancel</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
