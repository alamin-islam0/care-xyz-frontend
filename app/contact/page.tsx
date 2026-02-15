import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  PaperAirplaneIcon
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "Contact Us - Care.xyz",
  description: "Get in touch with Care.xyz for any questions or support.",
};

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-primary-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>
        <div className="container-custom relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Get in Touch</h1>
          <p className="text-primary-100 max-w-2xl mx-auto text-lg">
            We'd love to hear from you. Our friendly team is always here to chat.
          </p>
        </div>
      </div>

      <div className="container-custom py-16 -mt-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 transform hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-6">
                <EnvelopeIcon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Chat to us</h3>
              <p className="text-gray-500 mb-4">Our friendly team is here to help.</p>
              <a href="mailto:hi@care.xyz" className="text-primary-600 font-semibold hover:text-primary-700">hi@care.xyz</a>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 transform hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-accent-50 rounded-xl flex items-center justify-center mb-6">
                <MapPinIcon className="w-6 h-6 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Visit us</h3>
              <p className="text-gray-500 mb-4">Come say hello at our office HQ.</p>
              <p className="text-gray-900 font-medium">100 Smith Street<br/>Collingwood VIC 3066 AU</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 transform hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                <PhoneIcon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Call us</h3>
              <p className="text-gray-500 mb-4">Mon-Fri from 8am to 5pm.</p>
              <a href="tel:+1(555)000-0000" className="text-primary-600 font-semibold hover:text-primary-700">+1 (555) 000-0000</a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-8">Send us a message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input type="text" className="input" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input type="text" className="input" placeholder="Doe" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" className="input" placeholder="you@company.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone number</label>
                  <input type="tel" className="input" placeholder="+1 (555) 000-0000" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea rows={4} className="input resize-none" placeholder="Leave us a message..." />
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="privacy" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    I agree to our <a href="#" className="text-primary-600 hover:underline">privacy policy</a>.
                  </label>
                </div>

                <button type="submit" className="w-full btn-primary flex items-center justify-center">
                  Send Message
                  <PaperAirplaneIcon className="w-5 h-5 ml-2" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
