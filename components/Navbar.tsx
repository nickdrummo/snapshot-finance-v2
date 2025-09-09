import Link from 'next/link';
import { FiPieChart } from 'react-icons/fi';

export default function Navbar() {
  return (
    <nav className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <FiPieChart className="h-8 w-8 text-blue-500" />
          <span className="text-2xl font-bold text-gray-900">Snapshot</span>
        </Link>
        <div className="flex space-x-6">
          <Link href="/" className="text-gray-600 hover:text-blue-500 transition-colors">About</Link>
          <Link href="/pricing" className="text-gray-600 hover:text-blue-500 transition-colors">Pricing</Link>
          <Link href="/features" className="text-gray-600 hover:text-blue-500 transition-colors">Features</Link>
        </div>
      </nav>
  );
}