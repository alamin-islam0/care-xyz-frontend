"use client";

import { useEffect, useState } from "react";
import ProtectedPage from "@/components/ProtectedPage";
import { useAuth } from "@/components/AuthContext";
import { apiGet } from "@/lib/api";
import { Booking, Service } from "@/types";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { 
  ArrowLeftIcon, 
  MapPinIcon, 
  ClockIcon, 
  BanknotesIcon,
  CalendarIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from "@heroicons/react/24/outline";

export default function BookingDetailsPage({ params }: { params: { bookingId: string } }) {
  return (
    <ProtectedPage>
      <BookingDetails bookingId={params.bookingId} />
    </ProtectedPage>
  );
}

function BookingDetails({ bookingId }: { bookingId: string }) {
  const { token } = useAuth();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBooking() {
      try {
        const data = await apiGet<{ booking: Booking }>(`/bookings/${bookingId}`, token);
        setBooking(data.booking);
      } catch (err: any) {
        setError(err.message || "Failed to load booking details");
      } finally {
        setLoading(false);
      }
    }

    loadBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingId, token]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500">Loading details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-20 flex justify-center container-custom">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-red-100 max-w-md w-full text-center">
          <ExclamationCircleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <a href="/my-bookings" className="btn-primary">
            Go Back
          </a>
        </div>
      </div>
    );
  }

  if (!booking) return null;

  const service = booking.service as Service | undefined;

  return (
    <section className="min-h-screen py-12 bg-gray-50">
      <div className="container-custom max-w-4xl">
        <Link 
          href="/my-bookings" 
          className="inline-flex items-center text-gray-500 hover:text-primary-600 mb-8 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to My Bookings
        </Link>

        {/* Status Banner */}
        <div className={`
          p-6 rounded-t-3xl border-b border-gray-100 flex items-center justify-between
          ${booking.status === 'Confirmed' ? 'bg-green-50 text-green-800' : 
            booking.status === 'Pending' ? 'bg-yellow-50 text-yellow-800' :
            booking.status === 'Cancelled' ? 'bg-red-50 text-red-800' : 
            'bg-gray-50 text-gray-800'}
        `}>
          <div className="flex items-center space-x-3">
            {booking.status === 'Confirmed' ? <CheckCircleIcon className="w-6 h-6" /> :
             booking.status === 'Pending' ? <ClockIcon className="w-6 h-6" /> :
             booking.status === 'Cancelled' ? <ExclamationCircleIcon className="w-6 h-6" /> : null}
            <span className="font-bold text-lg uppercase tracking-wider">{booking.status}</span>
          </div>
          <span className="text-sm font-medium opacity-75">Booking ID: {booking._id.slice(-6)}</span>
        </div>

        <div className="bg-white rounded-b-3xl shadow-sm border border-gray-100 p-8 space-y-8">
          
          <div className="grid md:grid-cols-2 gap-8 border-b border-gray-100 pb-8">
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
                {service?.name || "Service Unavailable"}
              </h2>
              <p className="text-gray-500">{service?.shortDescription}</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-2xl">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Rate</span>
                <span className="font-medium text-gray-900">
                  ${booking.durationType === 'days' ? service?.chargePerDay : service?.chargePerHour} 
                  / {booking.durationType === 'days' ? 'day' : 'hour'}
                </span>
              </div>
              <div className="flex justify-between mb-4 pb-4 border-b border-gray-200">
                <span className="text-gray-500">Duration</span>
                <span className="font-medium text-gray-900">{booking.durationValue} {booking.durationType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">Total Cost</span>
                <span className="font-bold text-xl text-primary-600">{formatCurrency(booking.totalCost)}</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Location Details */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <MapPinIcon className="w-5 h-5 mr-2 text-primary-500" />
                Service Location
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 text-gray-600">
                  <span className="font-medium min-w-[80px]">Area:</span>
                  <span>{booking.location.area}, {booking.location.city}</span>
                </div>
                <div className="flex items-start space-x-3 text-gray-600">
                  <span className="font-medium min-w-[80px]">District:</span>
                  <span>{booking.location.district}</span>
                </div>
                <div className="flex items-start space-x-3 text-gray-600">
                  <span className="font-medium min-w-[80px]">Address:</span>
                  <span>{booking.location.address}</span>
                </div>
              </div>
            </div>

            {/* Timing & Contact */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-primary-500" />
                Schedule & Support
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 text-gray-600">
                  <span className="font-medium min-w-[80px]">Start Date:</span>
                  <span>{formatDateTime(booking.startDate)}</span>
                </div>
                <hr className="border-gray-100 my-4" />
                <div className="flex items-center space-x-2 text-primary-600">
                  <PhoneIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">Need Help? +880 1234-567890</span>
                </div>
                <div className="flex items-center space-x-2 text-primary-600">
                  <EnvelopeIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">support@care.xyz</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
