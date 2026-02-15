import Link from "next/link";
import Image from "next/image";
import { publicApiUrl } from "@/lib/api";
import { Service } from "@/types";
import { 
  CheckCircleIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "Our Services - Care.xyz",
  description: "Browse our comprehensive range of caregiving services for your family.",
};

async function getServices(): Promise<Service[]> {
  try {
    const response = await fetch(`${publicApiUrl}/services`, { cache: "no-store" });
    if (!response.ok) return [];
    const data = await response.json();
    return data.services || [];
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary-900 py-20 relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 opacity-10">
           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
           </svg>
        </div>
        <div className="container-custom relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-primary-200 text-sm font-semibold mb-4 border border-white/20">
            World-Class Care
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Find the Perfect Care Service
          </h1>
          <p className="text-primary-100 max-w-2xl mx-auto text-lg leading-relaxed">
            From baby sitting to elderly support, we have professional caregivers ready to help you 24/7.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 -mt-10">
        <div className="container-custom">
          {services.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <article 
                  key={service._id}
                  className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group flex flex-col"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={service.imageUrl}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
                      Best Seller
                    </div>
                  </div>
                  
                  <div className="p-8 flex-grow flex flex-col">
                    <h3 className="text-2xl font-bold mb-3 font-display text-gray-900 group-hover:text-primary-600 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-gray-500 mb-6 flex-grow line-clamp-3">
                      {service.shortDescription}
                    </p>
                    
                    <div className="space-y-3 mb-8">
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-gray-500 text-sm">Hourly Rate</span>
                        <span className="font-bold text-gray-900">${service.chargePerHour}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-gray-500 text-sm">Daily Rate</span>
                        <span className="font-bold text-gray-900">${service.chargePerDay}</span>
                      </div>
                    </div>

                    <Link 
                      href={`/service/${service._id}`} 
                      className="btn-primary w-full text-center flex items-center justify-center group-hover:scale-105"
                    >
                      Book Now
                      <ArrowRightIcon className="w-5 h-5 ml-2" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
             <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
               <p className="text-gray-500 text-lg">No services available at the moment.</p>
             </div>
          )}
        </div>
      </section>

      {/* Features / Benefits */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="bg-primary-50 rounded-[3rem] p-8 md:p-16">
            <div className="text-center max-w-3xl mx-auto mb-12">
               <h2 className="text-3xl font-display font-bold mb-4">Why Book With Us?</h2>
               <p className="text-gray-600">We provide more than just care; we provide peace of mind.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Vetted Professionals", desc: "100% background checked staff.", icon: ShieldCheckIcon },
                { title: "Flexible Scheduling", desc: "Book for an hour or a month.", icon: SparklesIcon },
                { title: "Satisfaction Guaranteed", desc: "Money-back guarantee policy.", icon: CheckCircleIcon },
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm text-center">
                  <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-20 text-center">
        <div className="container-custom">
          <h2 className="text-3xl font-display font-bold mb-6">Need a Custom Plan?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            If you have specific requirements or need long-term care management, contact our support team for a tailored solution.
          </p>
          <Link href="/contact" className="btn-outline">
            Contact Support
          </Link>
        </div>
      </section>
    </div>
  );
}
