'use client';

import Navbar from '@/components/Navbar';
import SnapshotCard from '@/components/SnapshotCard';
import { SubscriptionHeader } from '@/components/TypingHeader';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {FiUploadCloud, FiPieChart, FiShield, FiDollarSign, FiTrendingUp, FiSmartphone, FiMusic, FiInbox, FiActivity, FiMonitor, FiDatabase, FiShoppingBag, FiDribbble } from 'react-icons/fi';

export default function Landing() {
    const subscriptions = [
        { name: 'Vodafone AU', amount: '$30.00', frequency: 'Monthly', yearly: '$360.00' },
        { name: 'Anytime Fitness', amount: '$17.95', frequency: 'Weekly', yearly: '$933.40' },
        { name: 'Spotify', amount: '$12.99', frequency: 'Monthly', yearly: '$155.88' },
        { name: 'Apple', amount: '$2.99', frequency: 'Monthly', yearly: '$35.88' },
        { name: 'RevenueNSW', amount: '$50.00', frequency: 'Fortnightly', yearly: '$1200.00' },
        { name: 'Doordash', amount: '$17.99', frequency: 'Monthly', yearly: '$215.88' },
    ];

    const australianStats = [
        { 
            title: "Average Monthly Spend", 
            value: "$156", 
            description: "Australians spend on recurring subscriptions",
            icon: <FiTrendingUp className="w-8 h-8 text-blue-500" />
        },
        {
            title: "Top Categories",
            value: "Streaming 34%",
            description: "Followed by fitness (22%) and software (18%)",
            icon: <FiSmartphone className="w-8 h-8 text-purple-500" />
        },
        {
            title: "Yearly Total",
            value: "$1,872",
            description: "Average annual spend per household",
            icon: <FiDollarSign className="w-8 h-8 text-green-500" />
        }
    ];

    const commonSubscriptions = [
      { 
        name: "Streaming Services", 
        examples: "Netflix, Spotify, Disney+", 
        average: "$45/mo",
        icon: <FiSmartphone className="w-5 h-5 text-purple-600" />
      },
      { 
        name: "Gym Memberships", 
        examples: "Anytime Fitness, F45", 
        average: "$65/mo",
        icon: <FiDribbble className="w-5 h-5 text-red-600" />
      },
      { 
        name: "Meal Kits", 
        examples: "HelloFresh, Youfoodz", 
        average: "$75/wk",
        icon: <FiShoppingBag className="w-5 h-5 text-green-600" />
      },
      { 
        name: "Mobile Plans", 
        examples: "Telstra, Optus, Vodafone", 
        average: "$55/mo",
        icon: <FiSmartphone className="w-5 h-5 text-blue-600" />
      },
      { 
        name: "Cloud Storage", 
        examples: "iCloud, Google One", 
        average: "$4.99/mo",
        icon: <FiDatabase className="w-5 h-5 text-yellow-600" />
      },
      { 
        name: "Software Subs", 
        examples: "Adobe, Microsoft 365", 
        average: "$25/mo",
        icon: <FiMonitor className="w-5 h-5 text-pink-600" />
      }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F5F7FF] to-[#FFFFFF]">
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
                            Take Control Back <br></br> from <SubscriptionHeader />
                        </h1>
                        
                        <p className="text-lg text-gray-600 mb-8">
                            Upload your bank statement and let our tool analyse your subscription spend. 
                            Get a clear financial snapshot of where your money is going.
                        </p>

                        {/* Feature Bullets */}
                        <div className="space-y-4 mb-12">
                            <div className="flex items-center space-x-3">
                                <FiUploadCloud className="h-6 w-6 text-blue-500" />
                                <span className="text-gray-700">Instant analysis of PDF & image bank statements</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FiDollarSign className="h-6 w-6 text-green-500" />
                                <span className="text-gray-700">Yearly subscription cost projections</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FiShield className="h-6 w-6 text-purple-500" />
                                <span className="text-gray-700">Secure & encrypted data handling</span>
                            </div>
                        </div>
                        <Link href="/upload" className="inline-block">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-blue-200 transition-all flex items-center"
                            >
                                Get Started →
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Right Column - Preview Card */}
                    {/* Right Column - Email Preview Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="bg-white rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform p-6 border border-gray-100">
                            {/* Email Header */}
                            <div className="flex items-center border-b border-gray-200 pb-4 mb-4">
                                <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full font-bold text-lg flex-shrink-0">
                                    S
                                </div>
                                <div className="ml-3 overflow-hidden">
                                    <p className="font-semibold text-gray-900 truncate">Your Subscription Snapshot is Ready</p>
                                    <p className="text-sm text-gray-500 truncate">From: Snapshot Finance</p>
                                </div>
                            </div>

                            {/* Key Stats */}
                            <div className="bg-blue-50 rounded-lg p-4 mb-4 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-medium">Total Yearly</p>
                                    <p className="text-xl font-bold text-blue-700">$1304.67</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-medium">Most Expensive</p>
                                    <p className="text-lg font-bold text-red-600 truncate">Anytime Fitness</p>
                                </div>
                            </div>

                            {/* Subscription List */}
                            <div className="space-y-2">
                                <p className="text-sm font-semibold text-gray-700">ANZ Access Advantage:</p>
                                <div className="space-y-2">
                                    {subscriptions.slice(0, 3).map((sub) => (
                                        <div key={sub.name} className="flex justify-between items-center bg-gray-50 p-2 rounded-md">
                                            <span className="text-sm text-gray-800">{sub.name}</span>
                                            <div className="text-right">
                                                <span className="font-semibold text-sm text-gray-900">{sub.yearly}</span>
                                                <span className="block text-xs text-gray-500">{sub.amount} / {sub.frequency}</span>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="text-center text-gray-400 pt-1 text-sm">...and 3 more</div>
                                </div>
                            </div>

                            {/* Email Footer */}
                            <div className="text-center mt-4 border-t border-gray-200 pt-3">
                                <p className="text-xs text-gray-400">
                                    Unlock the full report to see all details.
                                </p>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute -top-8 -right-8 w-24 h-24 bg-purple-100 rounded-full opacity-50" />
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-teal-100 rounded-full opacity-50" />
                    </motion.div>
                </div>
            </div>


          {/* Australian Spending Statistics */}
          <section className="max-w-6xl mx-auto px-4 py-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Australian Subscription Trends
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-base">
                Understanding how subscription services impact household budgets across Australia
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 mb-20">
              {australianStats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="mb-3">{stat.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{stat.title}</h3>
                  <p className="text-2xl font-semibold text-blue-600 mb-3">{stat.value}</p>
                  <p className="text-gray-600 text-sm">{stat.description}</p>
                </motion.div>
              ))}
            </div>

            {/* How It Works Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-12 bg-white rounded-2xl p-8 shadow-md"
            >
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Take Control of Your Subscriptions
                </h2>
                <p className="text-gray-600 mb-8 text-base max-w-3xl mx-auto">
                  Snapshot Finance gives you complete visibility over your recurring payments without 
                  needing to link bank accounts. Get actionable insights in 3 simple steps:
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  {/* Step 1 */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="p-4"
                  >
                    <div className="w-14 h-14 bg-blue-100 rounded-xl mb-3 mx-auto">
                      <FiUploadCloud className="w-7 h-14 text-blue-600 mx-auto mt-3" />
                    </div>
                    <h3 className="text-lg font-semibold mb-1.5">1. Upload Statement</h3>
                    <p className="text-gray-600 text-sm">
                      Securely upload a PDF of your bank statement.
                    </p>
                  </motion.div>

                  {/* Step 2 */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="p-4"
                  >
                    <div className="w-14 h-14 bg-purple-100 rounded-xl mb-3 mx-auto">
                      <FiActivity className="w-7 h-14 text-purple-600 mx-auto mt-3" />
                    </div>
                    <h3 className="text-lg font-semibold mb-1.5">2. Instant Analysis</h3>
                    <p className="text-gray-600 text-sm">
                      Have snapshot analyse your subscription spend.
                    </p>
                  </motion.div>

                  {/* Step 3 */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="p-4"
                  >
                    <div className="w-14 h-14 bg-green-100 rounded-xl mb-3 mx-auto">
                      <FiInbox className="w-7 h-14 text-green-600 mx-auto mt-3" />
                    </div>
                    <h3 className="text-lg font-semibold mb-1.5">3. Get Your Report</h3>
                    <p className="text-gray-600 text-sm">
                      Detailed breakdown displayed and emailed in less than a minute.
                    </p>
                  </motion.div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <Link href="/pricing">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="bg-white text-blue-600 px-6 py-3 rounded-lg text-base font-semibold border-2 w-full"
                    >
                      View Pricing
                    </motion.button>
                  </Link>
                  <Link href="/upload">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg text-base font-semibold border-2 border-transparent w-full"
                    >
                      Get Started →
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Common Subscriptions Section */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Most Common Australian Subscriptions
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {commonSubscriptions.map((sub, index) => (
                 <motion.div
                 key={sub.name}
                 className="bg-white p-4 rounded-lg"
               >
                 <div className="flex items-center gap-3 mb-3">
                   <div className="p-2 bg-purple-100 rounded-md">  {/* Color matches icon */}
                     {sub.icon}
                   </div>
                   <h4 className="text-lg font-semibold">{sub.name}</h4>
                 </div>
                    <p className="text-gray-600 text-sm mb-1.5">{sub.examples}</p>
                    <p className="text-blue-600 text-base">{sub.average}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Cost Reduction Tips */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mt-20 bg-gray-900 text-white rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6">Reducing Subscription Costs</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FiPieChart className="w-5 h-5 text-purple-400 mt-1" />
                    <div>
                      <h4 className="text-lg font-semibold mb-1.5">Audit Regularly</h4>
                      <p className="text-gray-400 text-sm">40% of Australians pay for unused services</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FiShield className="w-5 h-5 text-green-400 mt-1" />
                    <div>
                      <h4 className="text-lg font-semibold mb-1.5">Bundle Services</h4>
                      <p className="text-gray-400 text-sm">Save with provider bundle packages</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FiDollarSign className="w-5 h-5 text-yellow-400 mt-1" />
                    <div>
                      <h4 className="text-lg font-semibold mb-1.5">Annual Payments</h4>
                      <p className="text-gray-400 text-sm">Save 20% with yearly billing</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FiTrendingUp className="w-5 h-5 text-pink-400 mt-1" />
                    <div>
                      <h4 className="text-lg font-semibold mb-1.5">Usage Tracking</h4>
                      <p className="text-gray-400 text-sm">Monitor actual service usage</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* User Testimonials Section */}
<motion.section 
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  className="max-w-6xl mx-auto px-4 py-12"
>
  <div className="text-center mb-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">
      What Australians Are Saying
    </h2>
    <p className="text-gray-600 max-w-xl mx-auto">
      Real people finding real savings across our suburbs
    </p>
  </div>

  <div className="grid md:grid-cols-3 gap-6">
    {/* Sydney Nurse */}
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-red-100 rounded-full">
          <FiActivity className="w-6 h-6 text-red-500" />
        </div>
        <div>
          <h3 className="font-semibold">Emma, 31</h3>
          <span className="text-gray-500 text-sm">Surry Hills, NSW</span>
        </div>
      </div>
      <p className="text-gray-700 mb-4 italic">
        "As a nurse with shift work, I completely missed double payments for my 
        Fitbit Premium and ClassPass. Saved $34/month just by cancelling one!"
      </p>
      
    </motion.div>

    {/* Melbourne Student */}
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
    >
      <div className="flex items-center gap-3 mb-4">
        
        <div>
          <h3 className="font-semibold">Liam, 23</h3>
          <span className="text-gray-500 text-sm">Brunswick, VIC</span>
        </div>
      </div>
      <p className="text-gray-700 mb-4 italic">
        "Turns out I was paying for extra iCloud storage through both Afterpay 
        and Zip - no wonder my budget never added up!"
      </p>
      
    </motion.div>

    {/* Brisbane Parent */}
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-green-100 rounded-full">
          <FiMonitor className="w-6 h-6 text-green-500" />
        </div>
        <div>
          <h3 className="font-semibold">Olivia, 37</h3>
          <span className="text-gray-500 text-sm">Indooroopilly, QLD</span>
        </div>
      </div>
      <p className="text-gray-700 mb-4 italic">
        "Found three different kids' learning apps we weren't using anymore. 
        That's $45/month back into the family budget!"
      </p>
      
    </motion.div>
  </div>

  {/* Regional Highlight */}
  <motion.div
    initial={{ scale: 0.95 }}
    whileInView={{ scale: 1 }}
    className="mt-12 bg-blue-600 text-white rounded-2xl p-8 text-center"
  >
    <div className="mb-4 flex justify-center">
      <FiDollarSign className="w-12 h-12 text-blue-200 mx-auto" />
    </div>
    <blockquote className="text-xl font-medium mb-4 max-w-2xl mx-auto">
      "As a teacher in Bendigo, I discovered I'd been paying for both Bupa extras 
      and Medibank through my union. Snapshot paid for itself 10 times over!"
    </blockquote>
    <p className="font-semibold">- Sarah, 42, Regional VIC</p>
    <div className="mt-3 text-sm opacity-80 flex items-center justify-center gap-2">
      <FiShield className="w-4 h-4" />
      <span>Found in: HESTA super payment deductions</span>
    </div>
  </motion.div>
</motion.section>

        </div>
    );
}