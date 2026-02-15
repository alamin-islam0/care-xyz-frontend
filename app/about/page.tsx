import Image from "next/image";
import { 
  UserGroupIcon, 
  HeartIcon, 
  SparklesIcon,
  CheckBadgeIcon
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "About Us - Care.xyz",
  description: "Learn about our mission to provide the best care for your family.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-primary-50">
        <div className="container-custom relative z-10 text-center">
          <span className="text-primary-600 font-semibold tracking-wide uppercase text-sm mb-4 block animate-fade-in">Our Mission</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6 leading-tight">
            We help families find <br className="hidden md:block" />
            <span className="gradient-text">trusted care easily</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We believe that everyone deserves verified, high-quality care. 
            Our platform connects you with the best caregivers in your area.
          </p>
        </div>
        
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-200 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-200 rounded-full blur-3xl opacity-30 translate-x-1/3 translate-y-1/3" />
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
            {[ 
              { label: "Bookings", value: "10k+" },
              { label: "Caregivers", value: "500+" },
              { label: "Cities", value: "20+" },
              { label: "Rating", value: "4.9/5" }
            ].map((stat, idx) => (
              <div key={idx} className="p-4">
                <div className="text-4xl font-bold text-primary-600 mb-2">{stat.value}</div>
                <div className="text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                  alt="Care.xyz Team"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl max-w-xs animate-float hidden md:block">
                <p className="text-gray-600 italic">"Care.xyz changed how we find support for our parents. Simply amazing."</p>
                <div className="flex items-center mt-4 space-x-3">
                   <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold">J</div>
                   <div>
                     <p className="font-bold text-gray-900">Jane Doe</p>
                     <p className="text-xs text-gray-500">Early Adopter</p>
                   </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <h2 className="text-4xl font-display font-bold text-gray-900">
                Driven by Passion, <br/>
                Built on Trust.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Care.xyz was founded in 2024 with a simple goal: to make finding reliable care straightforward and safe. 
                We understand the stress of finding the right person to look after your loved ones.
              </p>
              <div className="space-y-4">
                {[
                  { title: "Safety First", desc: "Every caregiver is background checked.", icon: ShieldCheckIcon },
                  { title: "Quality Care", desc: "We interview and train every professional.", icon: StarIcon },
                  { title: "Seamless Tech", desc: "Book, track, and pay all in one app.", icon: SparklesIcon },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 bg-primary-50 p-2 rounded-lg text-primary-600">
                      <CheckBadgeIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{item.title}</h3>
                      <p className="text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-600">The principles that guide every decision we make.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Empathy", desc: "We truly understand the needs of families and caregivers.", icon: HeartIcon },
              { title: "Integrity", desc: "We operate with complete transparency and honesty.", icon: UserGroupIcon },
              { title: "Innovation", desc: "We constantly improve our platform to serve you better.", icon: SparklesIcon },
            ].map((value, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center mb-6 text-primary-600">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ShieldCheckIcon(props: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function StarIcon(props: any) {
    return (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.545.044.757.74.34 1.107l-4.195 3.704a.562.562 0 00-.154.49l1.246 5.564c.123.55-.472.992-.953.722l-4.665-2.607a.562.562 0 00-.547 0l-4.665 2.607c-.481.27-1.076-.172-.953-.722l1.246-5.564a.562.562 0 00-.154-.49l-4.195-3.704c-.417-.367-.205-1.063.34-1.107l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    );
}
