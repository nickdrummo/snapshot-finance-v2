'use client';

import Navbar from '@/components/Navbar';
import { FiMail, FiHelpCircle } from 'react-icons/fi';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-md border border-gray-200 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Have a question about our service, a suggestion, or need help with your report? We'd love to hear from you.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Email Support */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <FiMail className="h-10 w-10 text-blue-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Email Us</h2>
              <p className="text-gray-600 mb-4">For general inquiries and support, please email us directly.</p>
              <a href="mailto:support@snapshotfinance.com" className="font-semibold text-blue-600 hover:underline">
                support@snapshotfinance.com
              </a>
            </div>

            {/* FAQ */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <FiHelpCircle className="h-10 w-10 text-purple-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Check our FAQ</h2>
              <p className="text-gray-600 mb-4">Many common questions are answered on our features and pricing pages.</p>
              <a href="/features" className="font-semibold text-purple-600 hover:underline">
                Visit Features & FAQ
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}