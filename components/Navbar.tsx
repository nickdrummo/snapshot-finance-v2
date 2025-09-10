'use client';

import Link from 'next/link';
import { FiPieChart, FiMenu, FiX } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Effect to close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Effect to prevent body scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <nav className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2 z-50">
        <FiPieChart className={`h-8 w-8 ${isMenuOpen ? 'text-gray-900' : 'text-blue-500'} transition-colors duration-300`} />
        <span className={`text-2xl font-bold ${isMenuOpen ? 'text-gray-900' : 'text-gray-900'} transition-colors duration-300`}>Snapshot</span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-8">
        <Link href="/" className="text-gray-600 hover:text-blue-500 transition-colors">About</Link>
        <Link href="/features" className="text-gray-600 hover:text-blue-500 transition-colors">Features</Link>
        <Link href="/pricing" className="text-gray-600 hover:text-blue-500 transition-colors">Pricing</Link>
        <Link href="/contact" className="text-gray-600 hover:text-blue-500 transition-colors">Contact</Link>
        <Link href="/privacy" className="text-gray-600 hover:text-blue-500 transition-colors">Privacy</Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          className="text-gray-800"
        >
          {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-10 transition-opacity duration-300 ease-in-out
          ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <Link href="/" className="text-3xl font-semibold text-gray-800 hover:text-blue-500 transition-colors">About</Link>
        <Link href="/features" className="text-3xl font-semibold text-gray-800 hover:text-blue-500 transition-colors">Features</Link>
        <Link href="/pricing" className="text-3xl font-semibold text-gray-800 hover:text-blue-500 transition-colors">Pricing</Link>
        <Link href="/contact" className="text-3xl font-semibold text-gray-800 hover:text-blue-500 transition-colors">Contact</Link>
        <Link href="/privacy" className="text-3xl font-semibold text-gray-800 hover:text-blue-500 transition-colors">Privacy</Link>
      </div>
    </nav>
  );
}