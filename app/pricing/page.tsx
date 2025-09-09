'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiCheckCircle, FiXCircle, FiInfo, FiChevronDown, FiChevronUp, FiArrowRight } from 'react-icons/fi';

const pricingTiers = [
  {
    name: 'Single Analysis',
    price: '$7.99',
    description: 'Perfect for a quick check-up on one account.',
    features: [
      '1 Bank Statement Analysis',
      'Subscription Identification',
      'Annual Spend Calculation',
    ],
    nonFeatures: ['Separated Account Insights', 'Duplicate Detection'],
    isPopular: false,
  },
  {
    name: 'Double Analysis',
    price: '$12.99',
    description: 'Ideal for comparing two accounts or time periods.',
    features: [
      '2 Bank Statement Analyses',
      'Subscription Identification',
      'Annual Spend Calculation',
      'Separated Account Insights',
      'Duplicate Detection',
    ],
    nonFeatures: [],
    isPopular: true,
    savings: 'Save $2.99',
  },
  {
    name: 'Triple Analysis',
    price: '$15.99',
    description: 'For a complete overview of your finances.',
    features: [
      '3 Bank Statement Analyses',
      'Subscription Identification',
      'Annual Spend Calculation',
      'Separated Account Insights',
      'Duplicate Detection',
    ],
    nonFeatures: [],
    isPopular: false,
    savings: 'Save $7.98',
  },
];

const faqs = [
  {
    question: 'How does the one-time payment work?',
    answer: "You pay once to analyse your bank statements, and you'll have lifetime access to the insights and reports generated from that analysis. There are no recurring fees or subscriptions.",
  },
  {
    question: 'What if I have more than 3 statements?',
    answer: 'For more than 3 statements, each additional statement is just $2.00, perfect for saving on the whole household.',
  },
  {
    question: 'What happens before I pay?',
    answer: "We believe in full transparency. After analysing your statements, we'll show you a summary of our findings - including your total yearly subscription spend and your most expensive subscription - before asking for any payment. This way, you can see the value for yourself.",
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pay once to analyse your statements. Get lifetime access to your financial snapshot. No subscriptions, ever.
          </p>
        </motion.div>

        {/* Pricing Tiers */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white rounded-2xl shadow-md border ${
                tier.isPopular ? 'border-blue-500 shadow-blue-100' : 'border-gray-200'
              } p-8 flex flex-col h-full relative`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                  BEST VALUE
                </div>
              )}

              <h2 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h2>
              <p className="text-gray-600 mb-6 text-sm">{tier.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-extrabold text-gray-900">{tier.price}</span>
                <span className="text-gray-500"> / one-time</span>
              </div>

              {tier.savings && (
                <p className="text-sm font-medium text-green-600 bg-green-50 rounded-md p-2 text-center mb-6">
                  {tier.savings} vs. individual analysis
                </p>
              )}

              <ul className="space-y-4 text-sm flex-grow mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <FiCheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
                {tier.nonFeatures?.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-400">
                    <FiXCircle className="w-4 h-4 text-gray-300 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/upload" passHref>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    tier.isPopular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-white text-blue-600 border-2 border-blue-500 hover:bg-blue-50'
                  }`}
                >
                  Get Started
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Custom Plan */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 bg-white rounded-2xl border border-gray-200 p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Have More Than 3 Accounts?</h3>
                <p className="text-gray-600">Add more statements for just <span className="font-semibold text-blue-600">$2.00 each</span>. Our uploader will calculate the total price for you.</p>
            </div>
            <Link href="/upload" passHref>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="bg-blue-100 text-blue-700 font-semibold px-6 py-3 rounded-lg flex items-center gap-2 whitespace-nowrap"
                >
                    Upload Now <FiArrowRight />
                </motion.button>
            </Link>
        </motion.div>

        {/* Transparency Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-20 bg-blue-50 border border-blue-100 rounded-2xl p-8"
        >
          <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-6">
            <FiInfo className="w-12 h-12 text-blue-500 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Know The Value Before You Pay</h3>
              <p className="text-gray-700">
                After you upload your statements, we provide a free preview of your financial snapshot, including total yearly spend and most expensive subscription. You only pay if you decide the full report is worth it.
              </p>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-20 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex justify-between items-center text-left p-5 font-semibold"
                >
                  <span>{faq.question}</span>
                  {openFaq === index ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-gray-600">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
        </main>
    </div>
);
}