'use client';

import Navbar from '@/components/Navbar';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-md border border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <div className="prose max-w-none text-gray-700">
            <p>Your privacy is not just a policy for us; it's the foundation of our service. We designed Snapshot from the ground up to be as private and secure as possible.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Core Privacy Principles</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-2">1. No Account Linking. Ever.</h3>
            <p>We will never ask for your bank login credentials. Unlike other apps that use third-party services to link to your accounts, our process relies solely on the bank statements you choose to upload. You remain in 100% control of your sensitive information.</p>

            <h3 className="text-xl font-semibold mt-6 mb-2">2. We Do Not Store Your Statements</h3>
            <p>When you upload a bank statement, it is processed in-memory to extract subscription data. Once the analysis is complete, the file is permanently discarded from our systems. We do not keep copies of your statements.</p>

            <h3 className="text-xl font-semibold mt-6 mb-2">4. AI-Assisted Analysis</h3>
            <p>To identify subscriptions from your statements, we use an AI-powered analysis tool. This automated system is designed specifically to recognize recurring payments. The entire analysis happens in-memory, the AI model does not learn from your data, and once your snapshot is generated, your statement and all associated data are permanently discarded. This allows us to provide a fast and precise service without compromising your privacy.</p>

            <h3 className="text-xl font-semibold mt-6 mb-2">3. We Only Collect What's Necessary</h3>
            <p>We only collect the data required to provide our service. This includes the extracted, anonymized subscription data (name, cost, frequency) and the email address you provide for payment and to receive your report. We do not collect personally identifiable transaction data beyond what is needed to identify a subscription.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
            <ul>
              <li><strong>To Provide the Service:</strong> To analyse your statements, generate your subscription snapshot, and email you the report.</li>
              <li><strong>For Payment:</strong> We use Stripe, a secure third-party payment processor, to handle all payments. We do not see or store your credit card information.</li>
              <li><strong>To Communicate With You:</strong> To send your report and respond to any inquiries you make.</li>
            </ul>

            <p className="mt-8">If you have any questions about our privacy practices, please don't hesitate to get in touch via our <a href="/contact">Contact Page</a>.</p>
            <p className="text-sm text-gray-500">Last updated: 10 September 2025</p>
          </div>
        </div>
      </main>
    </div>
  );
}