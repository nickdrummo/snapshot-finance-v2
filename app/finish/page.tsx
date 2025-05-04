'use client'

import { Resend } from 'resend';
import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiChevronLeft, FiPieChart, FiDollarSign, FiAward, FiDatabase } from 'react-icons/fi';
import { getAnalysisResults } from '../actions/getAnalysisResults';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

type Frequency = 'monthly' | 'yearly' | 'weekly' | 'fortnightly' | 'quarterly' | string;

interface Subscription {
  id: number;
  name: string;
  cost: number;
  frequency: Frequency;
  yearly: string | number;
  accountTitle: string;
}

interface Account {
  title: string;
  subscriptions: Subscription[];
  totalYearly: number;
}



export default function SnapshotPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [initialEmailSent, setInitialEmailSent] = useState(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    isSuccess: boolean;
  }>({ show: false, message: '', isSuccess: false });
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Update the useEffect data processing
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionId = searchParams.get('sessionId');
        if (!sessionId) return;

        const response = await fetch(`/api/analysis/${sessionId}`);
        const resultsFull = await response.json();
        const results = resultsFull.subscriptions;

        const stripeSessionId = searchParams.get('session_id');
        const stripeResponse = await fetch(`/api/get-session?session_id=${stripeSessionId}`);

        const session = await stripeResponse.json();
        // setUserEmail(session.customer_details?.email)
        
        // 3. Set user email
        if (session?.customer_details?.email) {
          setUserEmail(session.customer_details.email);
        }

        if (results) {
          // Explicitly type the accountsMap
          const accountsMap = results.reduce((acc: { [key: string]: Account }, sub: Subscription) => {
            const yearly = calculateYearlyCost(sub);
            if (!acc[sub.accountTitle]) {
              acc[sub.accountTitle] = {
                title: sub.accountTitle,
                subscriptions: [],
                totalYearly: 0
              };
            }
            acc[sub.accountTitle].subscriptions.push({ ...sub, yearly });
            acc[sub.accountTitle].totalYearly += yearly;
            return acc;
          }, {} as { [key: string]: Account }); // Add type assertion here

          const accountsArray: Account[] = Object.values(accountsMap);
          setAccounts(accountsArray); // Now properly typed as Account[]
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId || initialEmailSent) return;
  
    const checkAndSendEmail = async () => {
      try {
        // 1. Check sessionStorage first
        const storageKey = `emailSent-${sessionId}`;
        const emailWasSent = sessionStorage.getItem(storageKey);
  
        if (!emailWasSent && accounts.length > 0 && userEmail) {
          // 2. Send email only if all conditions met
          await sendEmailReport(userEmail);
          
          // 3. Mark as sent in sessionStorage and state
          sessionStorage.setItem(storageKey, 'true');
          setInitialEmailSent(true);
        }
      } catch (error) {
        console.error('Error handling initial email:', error);
      }
    };
  
    checkAndSendEmail();
  }, [accounts, userEmail, searchParams, initialEmailSent]);

  const totalSubscriptions = accounts.reduce((sum, account) => sum + account.subscriptions.length, 0);

  const sendEmailReport = async (alternateEmail?: string) => {
    try {
      setIsSending(true);
      const emailToUse = alternateEmail || userEmail;
      if (!emailToUse) throw new Error('No email available');

      const emailContent = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 20px;
              background-color: #f7fafc;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              border-radius: 12px;
              padding: 30px;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding-bottom: 20px;
              border-bottom: 3px solid #e2e8f0;
              margin-bottom: 25px;
            }
            .header h1 {
              color: #2d3748;
              font-size: 28px;
              margin: 0;
              font-weight: 700;
            }
            .card {
              background: #f8fafc;
              border-radius: 8px;
              padding: 20px;
              margin-bottom: 20px;
              border-left: 4px solid #4299e1;
            }
            .card h2 {
              color: #2d3748;
              margin: 0 0 8px 0;
              font-size: 20px;
            }
            .card h3 {
              color: #4a5568;
              margin: 0 0 8px 0;
              font-size: 18px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
              background: white;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }
            th {
              background-color: #4299e1;
              color: white;
              padding: 12px 15px;
              text-align: left;
              font-weight: 600;
            }
            td {
              padding: 12px 15px;
              border-bottom: 1px solid #e2e8f0;
            }
            tr:hover {
              background-color: #f8fafc;
            }
            .total-amount {
              color: #2b6cb0;
              font-weight: 700;
              font-size: 18px;
            }
            .warning {
              color: #c53030;
              font-weight: 600;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📊 Your Subscription Snapshot</h1>
            </div>

            <div class="card">
              <h2>Total Yearly Spend</h2>
              <p class="total-amount">${formatCurrency(totalYearly)}<br>
              <p>Across ${totalSubscriptions} subscriptions</p>
            </div>

            <div class="card" style="border-color: #fc8181;">
              <h2>💰 Most Expensive Subscription</h2>
              <p class="warning">${mostExpensive.name}<br>
              <span style="font-size: 16px;">${formatCurrency(mostExpensive.yearly as number)}/year</span></p>
            </div>

            ${accounts.map(account => `
              <div class="account-section">
                <div class="account-header">
                  <h3 class="account-title">${account.title}</h3>
                  <p class="account-total">
                    ${account.subscriptions.length} subscriptions · 
                    ${formatCurrency(account.totalYearly)}/year
                  </p>
                </div>
                
                <table>
                  <thead>
                    <tr>
                      <th>Subscription</th>
                      <th>Amount</th>
                      <th>Frequency</th>
                      <th>Yearly Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${account.subscriptions.map(sub => `
                      <tr>
                        <td>${sub.name}</td>
                        <td>${formatCurrency(sub.cost)}</td>
                        <td>${sub.frequency}</td>
                        <td class="${sub.yearly as number > 500 ? 'warning' : ''}">
                          ${formatCurrency(sub.yearly as number)}
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            `).join('')}

            <div style="margin-top: 25px; text-align: center; color: #718096; font-size: 14px;">
              <p>This report was generated on ${new Date().toLocaleDateString()}</p>
              <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e2e8f0;">
                <p style="margin: 0; font-size: 12px; color: #a0aec0;">
                  🔍 Insights powered by <strong style="color: #4299e1;">Snapshot Finance</strong>
                </p>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: #a0aec0;">
                  Take control of your recurring expenses
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
      `;

      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailToUse,
          content: emailContent
        })
      });

      if (!res.ok) throw new Error('Failed to send email');
      setNotification({ 
        show: true, 
        message: `Report sent to ${emailToUse}`, 
        isSuccess: true 
      });      if (alternateEmail) setNewEmail('');
    } catch (error) {
      console.error('Error:', error);
      setNotification({ 
        show: true, 
        message: 'Failed to send report', 
        isSuccess: false 
      });    } finally {
      setIsSending(false);
    }
  };

  const calculateYearlyCost = (sub: Subscription): number => {
    const freq = sub.frequency.toLowerCase();
    switch (freq) {
      case 'monthly': return sub.cost * 12;
      case 'weekly': return sub.cost * 52;
      case 'fortnightly': return sub.cost * 27;
      case 'yearly': return sub.cost;
      case 'quarterly': return sub.cost * 4;
      default: return sub.cost;
    }
  };

  
  const totalYearly = accounts.reduce((sum, account) => sum + account.totalYearly, 0);
  const allSubscriptions = accounts.flatMap(account => account.subscriptions);
  const mostExpensive = allSubscriptions.reduce((max, sub) => 
    (sub.yearly as number) > (max.yearly as number) ? sub : max, 
    { id: -1, name: '', cost: 0, frequency: '', yearly: 0, accountTitle: '' }
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
      {/* Notification Modal */}
      {notification.show && (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
        {/* Modal Container */}
        <div className="bg-white/95 rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-full ${notification.isSuccess ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              {notification.isSuccess ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <h3 className={`text-lg font-semibold ${notification.isSuccess ? 'text-green-800' : 'text-red-800'}`}>
              {notification.isSuccess ? 'Success!' : 'Error'}
            </h3>
          </div>
          <p className="text-gray-700 mb-4">{notification.message}</p>
          <button
            onClick={() => setNotification({ ...notification, show: false })}
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    )}

      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => router.push("/")}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              Across {totalSubscriptions} subscriptions
            </p>
          </div>

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

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-300">
            <h2 className="text-lg font-semibold text-gray-900">Your Subscriptions</h2>
          </div>
          
          {/* Accounts Sections */}
          {accounts.map((account, index) => (
            <div key={account.title} className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-gray-300 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <FiDatabase className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{account.title}</h2>
                    <p className="text-sm text-gray-500">
                      {account.subscriptions.length} subscriptions · {formatCurrency(account.totalYearly)}/year
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  {/* Table Header */}
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subscription
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Frequency
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Yearly Cost
                      </th>
                    </tr>
                  </thead>

                  {/* Account Subscriptions */}
                  <tbody className="bg-white divide-y divide-gray-200">
                    {account.subscriptions.map((sub) => (
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
          ))}
        </div>

        {/* Email Confirmation Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <div className="mb-4">
            {userEmail && (
              <p className="text-gray-600 mt-2">
                A copy of this report has been sent to <span className="font-medium text-blue-600">{userEmail}</span>
              </p>
            )}
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">
              Need to send to a different email?
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter alternate email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => sendEmailReport(newEmail)}
                disabled={isSending}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
              >
                {isSending ? 'Sending...' : 'Resend'}
              </button>
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
}