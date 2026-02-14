import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { publicApiUrl } from "@/lib/api";
import { Service } from "@/types";
import { 
  CurrencyDollarIcon, 
  ClockIcon, 
  CheckBadgeIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/outline";

async function getService(serviceId: string): Promise<Service | null> {
  try {
    const res = await fetch(`${publicApiUrl}/services/${serviceId}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.service;
  } catch (error) {
    console.error("Failed to fetch service:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ serviceId: string }> }) {
  const { serviceId } = await params;
  const service = await getService(serviceId);

  if (!service) {
    return {
      title: "Service Not Found | Care.xyz",
      description: "The requested service could not be found.",
    };
  }

  return {
    title: `${service.name} | Care.xyz`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ serviceId: string }> }) {
  const { serviceId } = await params;
  const service = await getService(serviceId);

  if (!service) notFound();

  return (
    <section className="min-h-screen py-12 bg-gray-50">
      <div className="container-custom">
        <Link 
          href="/#services" 
          className="inline-flex items-center text-gray-500 hover:text-primary-600 mb-8 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to Services
        </Link>
        
        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative h-[400px] lg:h-auto">
              <Image
                src={service.imageUrl}
                alt={service.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden" />
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-16 flex flex-col justify-center">
              <div className="inline-flex items-center space-x-2 bg-primary-50 px-4 py-2 rounded-full border border-primary-100 w-fit mb-6">
                <CheckBadgeIcon className="w-5 h-5 text-primary-600" />
                <span className="text-primary-700 font-medium text-sm">Verified Service</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
                {service.name}
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {service.longDescription}
              </p>
              
              <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Pricing Plans</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-3 bg-primary-50 rounded-lg mr-4">
                      <ClockIcon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Hourly Rate</p>
                      <p className="text-xl font-bold text-gray-900">${service.chargePerHour}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-3 bg-accent-50 rounded-lg mr-4">
                      <CurrencyDollarIcon className="w-6 h-6 text-accent-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Daily Rate</p>
                      <p className="text-xl font-bold text-gray-900">${service.chargePerDay}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href={`/booking/${service._id}`} 
                  className="btn-primary text-center flex-1 py-4 text-lg"
                >
                  Book Now
                </Link>
                <Link 
                  href="/contact" 
                  className="btn-outline text-center flex-1 py-4 text-lg"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
