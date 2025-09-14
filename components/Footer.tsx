import Link from 'next/link';
import { FiPieChart } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <FiPieChart className="h-7 w-7 text-blue-500" />
            <span className="text-xl font-bold text-gray-900">Snapshot</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-gray-600">
            <Link href="/" className="hover:text-blue-500 transition-colors">About</Link>
            <Link href="/features" className="hover:text-blue-500 transition-colors">Features</Link>
            <Link href="/pricing" className="hover:text-blue-500 transition-colors">Pricing</Link>
            <Link href="/contact" className="hover:text-blue-500 transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-blue-500 transition-colors">Privacy</Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Snapshot Finance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}