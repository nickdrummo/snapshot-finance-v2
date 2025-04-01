'use client'

import Navbar from '@/components/Navbar';
import SnapshotCard from '@/components/SnapshotCard';
import { SubscriptionHeader } from '@/components/TypingHeader'
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiUploadCloud, FiPieChart, FiShield, FiDollarSign } from 'react-icons/fi';

export default function Landing() {

    const subscriptions = [
        { name: 'Vodafone AU', amount: '$30.00', frequency: 'Monthly', yearly: '$360.00' },
        { name: 'Anytime Fitness', amount: '$17.95', frequency: 'Fortnightly', yearly: '$432.00' },
        { name: 'Spotify', amount: '$12.99', frequency: 'Monthly', yearly: '$155.88' },
        { name: 'Apple', amount: '$2.99', frequency: 'Monthly', yearly: '$35.88' },
        { name: 'RevenueNSW', amount: '$50.00', frequency: 'Fortnightly', yearly: '$1200.00' },
        { name: 'Doordash', amount: '$17.99', frequency: 'Monthly', yearly: '$215.88' },
    ];
    
  return (
    
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FF] to-[#FFFFFF]">
      {/* Navigation */}
        <Navbar />

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-2">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Take Back Control <br></br> of <SubscriptionHeader />
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Upload your bank statement and let our tool analyse your subscription spend. 
              Get a clear financial snapshot with actionable insights.
            </p>

            {/* Feature Bullets */}
            <div className="space-y-4 mb-12">
              <div className="flex items-center space-x-3">
                <FiUploadCloud className="h-6 w-6 text-blue-500" />
                <span className="text-gray-700">Instant analysis of PDF & bank statements</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiDollarSign className="h-6 w-6 text-green-500" />
                <span className="text-gray-700">Yearly cost projections & savings tips</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiShield className="h-6 w-6 text-purple-500" />
                <span className="text-gray-700">Bank-level security & encryption</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-blue-200 transition-all"
            >
              <Link href="/upload" className="flex items-center">
                Get Started →
              </Link>
            </motion.button>
          </motion.div>

          {/* Right Column - Preview Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="card-gradient rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform">
              <div className="">
                <div className="flex justify-between items-start">
                </div>
                <div>
                    <SnapshotCard
                        date="29th March 2025"
                        totalSpend="$1304.67"
                        mostExpensive={{ name: 'Anytime Fitness', amount: '$855.44' }}
                        subscriptions={subscriptions}
                    />
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-purple-100 rounded-full opacity-50" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-teal-100 rounded-full opacity-50" />
          </motion.div>
        </div>
      </div>


      {/* Trust Badges */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center gap-8 items-center opacity-75">
          <span className="text-gray-500">Trusted by:</span>
          <div className="h-8 w-px bg-gray-300" />
          <span className="text-gray-600">256K+ Users</span>
          <div className="h-8 w-px bg-gray-300" />
          <span className="text-gray-600">Bank-Level Security</span>
          <div className="h-8 w-px bg-gray-300" />
          <span className="text-gray-600">4.9/5 Stars</span>
        </div>
      </div>
    </div>
  );
}