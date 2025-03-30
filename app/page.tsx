'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import SnapshotCard from '@/components/SnapshotCard';

export default function Home() {
  useEffect(() => {
    // Scroll animations would be implemented here
    // For a production app, consider using Framer Motion or similar
  }, []);

  const subscriptions = [
    { name: 'Vodafone AU', amount: '$30.00', frequency: 'Monthly', yearly: '$360.00' },
    { name: 'Anytime Fitness', amount: '$17.95', frequency: 'Fortnightly', yearly: '$432.00' },
    { name: 'Spotify', amount: '$12.99', frequency: 'Monthly', yearly: '$155.88' },
    { name: 'Apple', amount: '$2.99', frequency: 'Monthly', yearly: '$35.88' },
    { name: 'RevenueNSW', amount: '$50.00', frequency: 'Fortnightly', yearly: '$1200.00' },
    { name: 'Doordash', amount: '$17.99', frequency: 'Monthly', yearly: '$215.88' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-6">Take control of your subscriptions</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Upload your bank statement and have our tool analyse your subscription spend, then view in an easy to read snapshot.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition">
          Get started →
        </button>
        <div className="mt-8 text-blue-600 font-medium">
          <span className="mx-2">Upload</span> → 
          <span className="mx-2">analyse</span> → 
          <span className="mx-2">snapshot</span>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Your Snapshot is waiting</h2>
          <p className="text-gray-600 mb-8">Scroll to take a look</p>
          
          <SnapshotCard
            date="29th March 2025"
            totalSpend="$1304.67"
            mostExpensive={{ name: 'Anytime Fitness', amount: '$855.44' }}
            subscriptions={subscriptions}
          />
        </div>
      </section>
    </div>
  );
}