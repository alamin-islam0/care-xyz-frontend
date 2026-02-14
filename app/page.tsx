import Link from "next/link";
import Image from "next/image";
import { publicApiUrl } from "@/lib/api";
import { Service } from "@/types";
import { 
  ShieldCheckIcon, 
  UserGroupIcon, 
  ClockIcon,
  ArrowRightIcon,
  StarIcon
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "Care.xyz Home | Trusted Caregiving Services",
  description: "Care.xyz helps families book trusted baby care, elderly care, and sick person care at home with secure booking and status tracking.",
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

export default async function HomePage() {
  const services = await getServices();

  const features = [
    {
      icon: <ShieldCheckIcon className="w-6 h-6 text-primary-600" />,
      title: "Verified Caregivers",
      description: "All our caregivers undergo rigorous background checks and training."
    },
    {
      icon: <UserGroupIcon className="w-6 h-6 text-primary-600" />,
      title: "Expert Matching",
      description: "We match you with caregivers that best fit your specific needs."
    },
    {
      icon: <ClockIcon className="w-6 h-6 text-primary-600" />,
      title: "24/7 Support",
      description: "Our support team is available round the clock to assist you."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-20 lg:pt-20 lg:pb-28">
        <div className="absolute top-0 right-0 -z-10 opacity-30 transform translate-x-1/3 -translate-y-1/4">
           <div className="w-[800px] h-[800px] bg-gradient-to-br from-primary-200 to-accent-200 rounded-full blur-3xl filter" />
        </div>
        
        <div className="container-custom grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center space-x-2 bg-primary-50 px-4 py-2 rounded-full border border-primary-100">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
              <span className="text-primary-700 font-medium text-sm tracking-wide uppercase">
                Reliable Family Support
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-display font-extrabold leading-tight">
              Trusted Care, <br />
              <span className="gradient-text">Right at Home</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              Care.xyz makes caregiving secure, fast, and accessible for every family. 
              Book certified caretakers by duration and location in minutes.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="#services" className="btn-primary group">
                Explore Services
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/register" className="btn-outline">
                Get Started
              </Link>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <div className="flex items-center space-x-8">
                <div>
                  <p className="text-3xl font-bold text-gray-900">1,200+</p>
                  <p className="text-gray-500 text-sm">Bookings Completed</p>
                </div>
                <div className="w-px h-12 bg-gray-200" />
                <div>
                  <p className="text-3xl font-bold text-gray-900">94%</p>
                  <p className="text-gray-500 text-sm">Repeat Customers</p>
                </div>
                <div className="w-px h-12 bg-gray-200" />
                <div>
                  <p className="text-3xl font-bold text-gray-900">24/7</p>
                  <p className="text-gray-500 text-sm">Availability</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative animate-scale-in delay-100 hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-600 to-accent-500 rounded-[2rem] transform rotate-3 opacity-10" />
            <div className="relative bg-white border border-gray-100 rounded-[2rem] shadow-2xl p-8 max-w-md mx-auto">
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl animate-float">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
                    ))}
                  </div>
                  <div className="text-sm font-bold text-gray-700">
                    500+ Carers
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-6 font-display">Why Choose Us?</h3>
              <div className="space-y-6">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0 bg-primary-50 p-3 rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{feature.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50" id="services">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary-600 font-semibold tracking-wide uppercase text-sm">Our Services</span>
            <h2 className="text-4xl font-display font-bold mt-2 mb-4">Professional Care Services</h2>
            <p className="text-gray-600">
              Choose from our wide range of professional care services tailored to your specific needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <article 
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1" 
                key={service._id}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={service.imageUrl}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white font-medium line-clamp-2">
                      {service.shortDescription}
                    </p>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 font-display group-hover:text-primary-600 transition-colors">
                    {service.name}
                  </h3>
                  
                  <div className="flex items-center space-x-4 mb-6 text-sm text-gray-500">
                    <div className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                      <span className="font-semibold text-gray-900 mr-1">${service.chargePerHour}</span>
                      / hour
                    </div>
                    <div className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                      <span className="font-semibold text-gray-900 mr-1">${service.chargePerDay}</span>
                      / day
                    </div>
                  </div>

                  <Link 
                    href={`/service/${service._id}`} 
                    className="w-full btn-outline flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600"
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="bg-primary-900 rounded-[3rem] p-8 md:p-16 relative overflow-hidden text-center md:text-left">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
              <svg className="absolute right-0 top-0 h-full w-1/2 text-white transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <polygon points="50,0 100,0 50,100 0,100" />
              </svg>
            </div>
            
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                  Care with Compassion & Excellence
                </h2>
                <p className="text-primary-100 text-lg leading-relaxed mb-8">
                  We connect families with trained and trusted caregivers for children, senior
                  citizens, and sick family members. Our mission is to make home caregiving easy,
                  secure, and available for everyone.
                </p>
                <Link href="/register" className="btn-secondary inline-block">
                  Join Our Network
                </Link>
              </div>
              <div className="hidden md:block">
                {/* Abstract visualization or image could go here */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Families Trust Us</h2>
            <p className="text-gray-600">See what our community has to say about their experience.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                text: "The caregiver was kind and professional. Booking was straightforward and the support team was amazing.",
                author: "Sarah Johnson",
                role: "Parent"
              },
              {
                text: "My father gets reliable support every day. Highly recommended platform for anyone needing elderly care.",
                author: "Michael Chen",
                role: "Check-in Son"
              }
            ].map((testimonial, idx) => (
              <blockquote key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex space-x-1 text-accent-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center text-primary-700 font-bold">
                    {testimonial.author[0]}
                  </div>
                  <div>
                    <cite className="not-italic font-bold text-gray-900 block">{testimonial.author}</cite>
                    <span className="text-sm text-gray-500">{testimonial.role}</span>
                  </div>
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
