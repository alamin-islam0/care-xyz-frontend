import Link from "next/link";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="bg-white/50 backdrop-blur-sm p-12 rounded-3xl border border-gray-100 shadow-xl text-center max-w-lg w-full">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <ExclamationTriangleIcon className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="btn-primary inline-flex items-center">
          Return Home
        </Link>
      </div>
    </section>
  );
}
