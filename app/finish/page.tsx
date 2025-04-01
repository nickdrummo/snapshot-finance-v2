'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiChevronLeft, FiPieChart, FiDollarSign, FiAward } from 'react-icons/fi';
import { getAnalysisResults } from '../actions/getAnalysisResults';

// Type definitions
type Frequency = 'monthly' | 'yearly' | 'weekly' | 'fortnightly' | 'quarterly' | string;

interface Subscription {
  id: number;
  name: string;
  cost: number;
  frequency: Frequency;
  yearly: string | number;
}

interface AnalysisResult extends Array<Subscription> {}

export default function SnapshotPage () {
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your actual API call
        const results = await getAnalysisResults();
        
        if (results) {
          let analysisData;
          analysisData = JSON.parse(results);

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
    { id: -1, name: '', cost: 0, frequency: '', yearly: 0 }
  );

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => router.back()} 
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <FiChevronLeft className="mr-1" />
            Back
          </button>
          <h1 className="text-xl font-bold text-gray-900">Subscription Snapshot</h1>
          <div className="w-8"></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Yearly Spend */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-3">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                <FiDollarSign className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-medium text-gray-500">Total Yearly</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalYearly)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Across {subscriptions.length} subscriptions
            </p>
          </div>

          {/* Most Expensive */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-3">
              <div className="p-2 rounded-full bg-purple-100 text-purple-600 mr-3">
                <FiAward className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-medium text-gray-500">Most Expensive</h3>
            </div>
            <p className="text-xl font-bold text-gray-900">
              {mostExpensive.name}
            </p>
            <p className="text-gray-600">
              {formatCurrency(mostExpensive.yearly as number)}/year
            </p>
          </div>

          {/* Average Monthly */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-3">
              <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
                <FiPieChart className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-medium text-gray-500">Avg Monthly</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalYearly / 12)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Based on yearly total
            </p>
          </div>
        </div>

        {/* Subscription Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Your Subscriptions</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subscription
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Frequency
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Yearly Cost
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscriptions.map((sub) => (
                  <tr key={sub.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {sub.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(sub.cost)}/{sub.frequency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        sub.frequency.toLowerCase() === 'yearly' ? 'bg-green-100 text-green-800' :
                        sub.frequency.toLowerCase() === 'monthly' ? 'bg-blue-100 text-blue-800' :
                        sub.frequency.toLowerCase() === 'weekly' ? 'bg-purple-100 text-purple-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {sub.frequency}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      typeof sub.yearly === 'number' && sub.yearly > 500 ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {typeof sub.yearly === 'number' ? formatCurrency(sub.yearly) : sub.yearly}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};