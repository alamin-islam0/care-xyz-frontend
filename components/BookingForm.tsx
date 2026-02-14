"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ProtectedPage from "@/components/ProtectedPage";
import { useAuth } from "@/components/AuthContext";
import { apiGet, apiPost } from "@/lib/api";
import { locationTree } from "@/lib/locations";
import { Service } from "@/types";
import { 
  CheckCircleIcon, 
  MapPinIcon, 
  ClockIcon,
  CalendarDaysIcon,
  ArrowRightIcon,
  ExclamationCircleIcon
} from "@heroicons/react/24/outline";

export default function BookingForm({ serviceId }: { serviceId: string }) {
  const { token } = useAuth();
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);
  
  // Form State
  const [durationType, setDurationType] = useState<"hours" | "days">("hours");
  const [durationValue, setDurationValue] = useState(1);
  const [division, setDivision] = useState("Dhaka");
  const [district, setDistrict] = useState("Dhaka");
  const [city, setCity] = useState("Dhaka North");
  const [area, setArea] = useState("Uttara");
  const [address, setAddress] = useState("");
  const [startDate, setStartDate] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadService() {
      try {
        const data = await apiGet<{ service: Service }>(`/services/${serviceId}`);
        setService(data.service);
      } catch (err: any) {
        setError(err.message || "Failed to load service");
      }
    }

    loadService();
  }, [serviceId]);

  const divisionOptions = useMemo(() => Object.keys(locationTree), []);
  const districtOptions = useMemo(() => {
    return Object.keys(locationTree[division]?.districts || {});
  }, [division]);
  const cityOptions = useMemo(() => {
    return Object.keys(locationTree[division]?.districts[district]?.cities || {});
  }, [division, district]);
  const areaOptions = useMemo(() => {
    return locationTree[division]?.districts[district]?.cities[city] || [];
  }, [division, district, city]);

  useEffect(() => {
    if (!districtOptions.includes(district)) setDistrict(districtOptions[0] || "");
  }, [districtOptions, district]);

  useEffect(() => {
    if (!cityOptions.includes(city)) setCity(cityOptions[0] || "");
  }, [cityOptions, city]);

  useEffect(() => {
    if (!areaOptions.includes(area)) setArea(areaOptions[0] || "");
  }, [areaOptions, area]);

  const totalCost = useMemo(() => {
    if (!service) return 0;
    const unit = durationType === "days" ? service.chargePerDay : service.chargePerHour;
    return unit * Number(durationValue || 0);
  }, [service, durationType, durationValue]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await apiPost(
        "/bookings",
        {
          serviceId,
          durationType,
          durationValue: Number(durationValue),
          location: {
            division,
            district,
            city,
            area,
            address,
          },
          startDate: startDate || new Date().toISOString(),
        },
        token
      );
      router.push("/my-bookings");
    } catch (err: any) {
      setError(err.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!service && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error && !service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <ExclamationCircleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Service</h2>
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedPage>
    <section className="min-h-screen py-12 bg-gray-50">
      <div className="container-custom max-w-5xl">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">
          Complete Your Booking
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-8">
              
              {/* Duration Section */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <ClockIcon className="w-5 h-5 mr-2 text-primary-600" />
                  Service Duration
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select 
                      value={durationType} 
                      onChange={(e) => setDurationType(e.target.value as "hours" | "days")}
                      className="input"
                    >
                      <option value="hours">Hours</option>
                      <option value="days">Days</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {durationType === 'hours' ? 'Number of Hours' : 'Number of Days'}
                    </label>
                    <input
                      min={1}
                      type="number"
                      value={durationValue}
                      onChange={(e) => setDurationValue(Number(e.target.value))}
                      className="input"
                    />
                  </div>
                </div>
              </div>

              {/* Location Section */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <MapPinIcon className="w-5 h-5 mr-2 text-primary-600" />
                  Location Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Division</label>
                    <select 
                      value={division} 
                      onChange={(e) => setDivision(e.target.value)}
                      className="input"
                    >
                      {divisionOptions.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                    <select 
                      value={district} 
                      onChange={(e) => setDistrict(e.target.value)}
                      className="input"
                    >
                      {districtOptions.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City/Thana</label>
                    <select 
                      value={city} 
                      onChange={(e) => setCity(e.target.value)}
                      className="input"
                    >
                      {cityOptions.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                    <select 
                      value={area} 
                      onChange={(e) => setArea(e.target.value)}
                      className="input"
                    >
                      {areaOptions.map((a) => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                  <textarea 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    required 
                    className="input min-h-[100px]"
                    placeholder="House No, Road No, Flat No, etc."
                  />
                </div>
              </div>

              {/* Date Section */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <CalendarDaysIcon className="w-5 h-5 mr-2 text-primary-600" />
                  Preferred Start Date
                </h3>
                <div>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="input"
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-start">
                  <ExclamationCircleIcon className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <button 
                type="submit" 
                className="w-full btn-primary flex items-center justify-center py-4 text-lg shadow-lg shadow-primary-500/30 hover:shadow-primary-500/40" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                    Processing Booking...
                  </>
                ) : (
                  <>
                    Confirm Booking
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-xl font-bold font-display text-gray-900 mb-6">Booking Summary</h3>
              
              {service && (
                <div className="flex items-start space-x-4 mb-6 pb-6 border-b border-gray-100">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={service.imageUrl}
                      alt={service.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{service.name}</h4>
                    <span className="text-sm text-gray-500 line-clamp-2">{service.shortDescription}</span>
                  </div>
                </div>
              )}

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Rate</span>
                  <span className="font-medium">
                    ${durationType === 'days' ? service?.chargePerDay : service?.chargePerHour} 
                    / {durationType === 'days' ? 'day' : 'hour'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-medium">{durationValue} {durationType}</span>
                </div>
                <div className="border-t border-dashed border-gray-200 pt-4 flex justify-between items-center">
                  <span className="font-bold text-lg text-gray-900">Total</span>
                  <span className="font-bold text-2xl text-primary-600">${totalCost}</span>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl flex items-start space-x-3">
                <CheckCircleIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">
                  No payment required now. Pay directly to the caregiver after service verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </ProtectedPage>
  );
}
