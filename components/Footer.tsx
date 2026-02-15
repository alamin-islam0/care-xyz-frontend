import Link from "next/link";
import { 
  HeartIcon, 
  EnvelopeIcon, 
  PhoneIcon,
  MapPinIcon 
} from "@heroicons/react/24/outline";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: "All Services", href: "/services" },
      { label: "Baby Care", href: "/services" },
      { label: "Elderly Care", href: "/services" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/" },
      { label: "Terms of Service", href: "/" },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-20">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="text-2xl font-display font-bold text-white">
                Care.xyz
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Trusted baby sitting and elderly care at home. Making caregiving secure, 
              fast, and accessible for every family.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <HeartIcon className="w-5 h-5 text-red-500" />
              <span className="text-gray-400">Caring for your loved ones</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <EnvelopeIcon className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">support@care.xyz</span>
              </li>
              <li className="flex items-start space-x-3">
                <PhoneIcon className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">+880 1234-567890</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPinIcon className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
          <div className="border-t border-gray-700 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-col md:items-start items-center space-y-2">
                <p className="text-gray-400 text-sm">
                  © {currentYear} Care.xyz. All rights reserved.
                </p>
                <div className="text-sm text-gray-500 flex items-center space-x-1">
                  <span>Built by</span>
                  <a 
                    href="https://github.com/alamin-islam0" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-400 hover:text-white transition-colors duration-200 font-medium"
                  >
                    Alamin Islam
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <a href="https://github.com/alamin-islam0" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                
                <a href="https://www.facebook.com/Alamin.islam19.19/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>

                <a href="https://www.linkedin.com/in/alaminislam2/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>

                <a href="https://wa.me/01722930883" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-colors">
                  <span className="sr-only">WhatsApp</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 15.13C16.5 15.53 15.86 15.93 15.58 16.03C15.39 16.1 14.86 16.27 12.82 15.42C10.79 14.58 9.4 12.55 9.3 12.41C9.2 12.27 8.48 11.31 8.48 10.31C8.48 9.32 8.98 8.84 9.18 8.63C9.33 8.46 9.53 8.42 9.72 8.42C9.89 8.42 10.05 8.43 10.18 8.45C10.45 8.52 10.6 8.35 10.68 8.16C10.96 7.48 11.23 6.81 11.3 6.66C11.37 6.51 11.41 6.37 11.23 6.16C11.05 5.96 10.84 5.76 10.68 5.56C10.51 5.38 10.32 5.39 10.15 5.39C9.97 5.39 9.81 5.39 9.61 5.39C9.25 5.39 8.88 5.51 8.58 5.84C8.17 6.29 7.04 7.34 7.04 9.49C7.04 11.64 8.6 13.73 8.82 14.02C9.04 14.31 11.83 18.62 16.09 20.45C18.91 21.67 19.49 21.43 20.01 21.38C20.69 21.31 22.08 20.57 22.37 19.76C22.66 18.95 22.66 18.25 22.58 18.11C22.5 17.97 22.3 17.88 22.01 17.74C21.72 17.59 20.29 16.89 20.02 16.76C19.75 16.62 19.55 16.55 19.35 16.85C19.16 17.14 18.6 17.8 18.42 18.01C18.25 18.21 18.06 18.24 17.77 18.1C17.48 17.96 16.64 17.68 15.65 16.8C14.88 16.11 14.36 15.26 14.21 15.01C14.06 14.76 14.19 14.62 14.34 14.48C14.47 14.35 14.63 14.15 14.78 13.97C14.92 13.8 15 13.68 15.11 13.48C15.21 13.28 15.16 13.11 15.08 12.95C15 12.79 14.38 11.27 14.12 10.65" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
      </div>
    </footer>
  );
}
