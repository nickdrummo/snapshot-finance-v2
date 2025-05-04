'use client'

import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { FiFileText, FiArrowRight, FiPieChart, FiList, FiLock, FiDollarSign } from 'react-icons/fi';
import Link from 'next/link';
import SnapshotCard from '@/components/SnapshotCard';
import CheckoutButton from '@/components/CheckoutButton';
import { getAnalysisResults } from '../actions/getAnalysisResults';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Frequency = 'monthly' | 'yearly' | 'weekly' | 'fortnightly' | 'quarterly' | string;

interface Subscription {
  id: number;
  name: string;
  cost: number;
  frequency: Frequency;
  yearly: number;
  accountTitle: string;
}

export default function CheckoutPage() {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <CheckoutContent />
      </Suspense>
    );
  }

function CheckoutContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('sessionId');
    const router = useRouter();
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [price, setPrice] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
          try {
            if (!sessionId) return;

            const response = await fetch(`/api/analysis/${sessionId}`);
            const results = await response.json();
       
            if (results) {
              let analysisData;
              analysisData = results.subscriptions;
              setPrice(formatCurrency(results.snapshot_price));

              const enrichedSubscriptions = analysisData.map((sub: Subscription) => ({
                ...sub,
                yearly: calculateYearlyCost(sub)
              }));
              
              setSubscriptions(enrichedSubscriptions);
            }
          } catch (error) {
            console.error('Error fetching analysis results:', error);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchData();
      }, []);
    
      const calculateYearlyCost = (sub: Subscription): number => {
        const freq = sub.frequency.toLowerCase();
        switch (freq) {
          case 'monthly': return sub.cost * 12;
          case 'weekly': return sub.cost * 52;
          case 'fortnightly': return sub.cost * 27;
          case 'yearly': return sub.cost;
          case 'quarterly': return sub.cost * 4;
          default: return sub.cost; // Default to monthly calculation
        }
      };
    
      const totalYearly: number = subscriptions.reduce(
        (sum: number, sub) => sum + (typeof sub.yearly === 'number' ? sub.yearly : 0), 
        0
      );
    
      const mostExpensive: Subscription = subscriptions.reduce(
        (max: Subscription, sub: Subscription) => {
          const yearlyCost = typeof sub.yearly === 'number' ? sub.yearly : 0;
          return yearlyCost > (typeof max.yearly === 'number' ? max.yearly : 0) 
            ? { ...sub, yearly: yearlyCost } 
            : max;
        }, 
        { id: -1, name: '', cost: 0, frequency: '', yearly: 0, accountTitle: '' }
      );
    
      const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('en-AU', {
          style: 'currency',
          currency: 'AUD',
        }).format(amount);
      };
    
    //   if (isLoading) {
    //     return (
    //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    //       </div>
    //     );
    //   }
    

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FF] to-[#FFFFFF]">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Hero CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Subscription Snapshot
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See exactly where your money is going each year
          </p>
        </motion.div>

        {/* Focused Stats Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-2xl mx-auto">
          {/* Yearly Spend - Now More Prominent */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <FiPieChart className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold">Yearly Spend</h3>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-1">
              {formatCurrency(totalYearly)}
            </p>
            <p className="text-sm text-gray-500">
              That's {formatCurrency(totalYearly / 12)} monthly
            </p>
          </motion.div>

          {/* Subscription Count - Enhanced */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center mb-3">
              <div className="bg-purple-100 p-2 rounded-lg mr-3">
                <FiList className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold">Active Subscriptions</h3>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-1">
              {subscriptions.length}
            </p>
            <p className="text-sm text-gray-500">
              Recurring services found
            </p>
          </motion.div>
        </div>


        {/* Premium Report Card with Sample */}
        <div className="grid md:grid-cols-2 gap-8 items-start mt-12">
        {/* Sample Report - Left Side */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
        >
            <div className="card-gradient rounded-2xl shadow-xl">
            <div className="p-6">
                <SnapshotCard
                date="29th March 2025"
                totalSpend={formatCurrency(totalYearly)}
                mostExpensive={{ name: mostExpensive.name, amount: formatCurrency(mostExpensive.yearly) }}
                subscriptions={[
                    { name: '██████', amount: '$██.██',  yearly: '$███.██' },
                    { name: '████ ██', amount: '$██.██',   yearly: '$███.██' },
                    { name: '████████', amount: '$██.██',  yearly: '$███.██' }
                ]}
                />
            </div>
            {/* <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-white/90 hover:bg-white px-4 py-2 rounded-full shadow-md border border-gray-200 font-medium text-sm flex items-center transition-all">
                View Sample
                </button>
            </div> */}
            </div>
        </motion.div>

        {/* Payment Box - Right Side */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm p-6 h-full"
        >
            <div className="flex flex-col items-center text-center mb-6">
            <FiFileText className="h-12 w-12 text-blue-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Full Snapshot Report</h2>
            <p className="text-gray-600">One-time payment • Permanent access</p>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 text-center mb-6">
            <div className="flex items-center justify-center space-x-2 mb-3">
                <span className="text-3xl font-bold text-gray-900">{price}</span>
            </div>
            <p className="text-sm text-gray-600">7-day money back guarantee</p>
            </div>

            <CheckoutButton sessionId={sessionId as string} />
            
            <div className="mt-4 text-center text-sm text-gray-500 flex items-center justify-center">
            <FiLock className="h-4 w-4 mr-1" />
            Secure 256-bit SSL encryption
            </div>
        </motion.div>
        </div>

        {/* Simple Trust Assurance */}
        <div className="max-w-md mx-auto mt-12 text-center text-sm text-gray-500">
          <div className="flex items-center justify-center space-x-2">
            <FiLock className="h-4 w-4" />
            <span>Secure payment • No recurring charges</span>
          </div>
        </div>
      </main>
    </div>
  );
}

function LoadingSpinner() {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }