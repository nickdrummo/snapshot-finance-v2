'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { FiUpload, FiEye, FiDollarSign, FiAward, FiPieChart, FiDatabase, FiMail, FiHome, FiBookOpen, FiUsers, FiLock, FiLayers } from 'react-icons/fi';

const exampleAccounts = [
	{
		title: 'Everyday Account',
		subscriptions: [
			{ id: 1, name: 'Spotify', cost: 12.99, frequency: 'Monthly', yearly: 155.88 },
			{ id: 2, name: 'Netflix', cost: 16.99, frequency: 'Monthly', yearly: 203.88 },
			{ id: 3, name: 'Apple iCloud', cost: 2.99, frequency: 'Monthly', yearly: 35.88 },
		],
		totalYearly: 395.64,
	},
	{
		title: 'Credit Card',
		subscriptions: [
			{ id: 4, name: 'Adobe Creative Cloud', cost: 29.99, frequency: 'Monthly', yearly: 359.88 },
			{ id: 5, name: 'Anytime Fitness', cost: 17.95, frequency: 'Fortnightly', yearly: 466.7 },
			{ id: 6, name: 'Disney+', cost: 13.99, frequency: 'Monthly', yearly: 167.88 },
		],
		totalYearly: 994.46,
	},
];

const allSubs = exampleAccounts.flatMap((a) => a.subscriptions);
const totalYearly = exampleAccounts.reduce((sum, acc) => sum + acc.totalYearly, 0);
const mostExpensive = allSubs.reduce((max, sub) => (sub.yearly > max.yearly ? sub : max), allSubs[0]);

function formatCurrency(amount: number) {
	return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(amount);
}

export default function FeaturesPage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
			<Navbar />
			<main className="max-w-5xl mx-auto px-4 py-12">
				<div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">From Clutter to Clarity</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Our process is simple, transparent, and designed with your privacy in mind. See how it works and what your final report looks like.
                    </p>
                </div>

                {/* Combined "How it Works" and "Example Email" Section */}
                <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
                    {/* Left Column: How It Works (1/3 width) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8 lg:col-span-1"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">A Simple, Secure Process</h2>
                        {/* Step 1 */}
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600">
                                <FiUpload className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">1. Upload Statements</h3>
                                <p className="text-gray-600 text-sm mt-1">
                                    Start by gathering your bank statements. Our tool accepts PDFs and images from any bank. Your files are never stored on our servers, ensuring your data remains private and secure from the very first step.                                </p>
                            </div>
                        </div>
                        {/* Step 2 */}
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600">
                                <FiEye className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">2. Get a Free Preview</h3>
                                <p className="text-gray-600 text-sm mt-1">
                                    Instantly, our system analyses your statements to identify recurring payments. Before you pay anything, we show you a free preview: your total number of subscriptions, your total annual spend, and your single most expensive subscription. This allows you to see the value upfront.

                                </p>
                            </div>
                        </div>
                        {/* Step 3 */}
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600">
                                <FiDollarSign className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">3. Unlock Full Report</h3>
                                <p className="text-gray-600 text-sm mt-1">
                                    If you like what you see, a single one-time payment unlocks your complete, detailed report. This includes a full breakdown of every subscription across all accounts, plus an emailed copy for your records. No recurring fees, just permanent access to your insights.

                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Example Email (2/3 width) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 h-full">
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
                                    <FiMail /> Your Emailed Report
                                </h3>
                            </div>
                            <div className="bg-blue-50 rounded-lg p-4 mb-4">
                                <div className="flex items-center justify-around gap-4">
                                    <div className="text-center">
                                        <span className="text-xs text-gray-500">Total Yearly </span>
                                        <span className="text-lg font-bold text-blue-700">{formatCurrency(totalYearly)}</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-xs text-gray-500">Most Expensive </span>
                                        <span className="text-lg font-bold text-red-600">{mostExpensive.name}</span>
                                    </div>
                                </div>
                            </div>
                            {exampleAccounts.map((account) => (
                                <div key={account.title} className="mb-4">
                                    <div className="font-semibold text-gray-800 mb-1">{account.title}</div>
                                    <table className="w-full text-sm mb-2 table-fixed">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="w-4/12 py-1 px-2 text-left font-medium">Subscription</th>
                                                <th className="w-3/12 py-1 px-2 text-left font-medium">Amount</th>
                                                <th className="w-3/12 py-1 px-2 text-left font-medium">Frequency</th>
                                                <th className="w-2/12 py-1 px-2 text-right font-medium">Yearly</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {account.subscriptions.map((sub) => (
                                                <tr key={sub.id} className="border-b border-gray-100">
                                                    <td className="py-1 px-2 truncate">{sub.name}</td>
                                                    <td className="py-1 px-2 text-gray-600">{formatCurrency(sub.cost)}</td>
                                                    <td className="py-1 px-2 text-gray-600">{sub.frequency}</td>
                                                    <td className={`py-1 px-2 text-right font-medium ${sub.yearly > 500 ? 'text-red-600' : 'text-gray-800'}`}>
                                                        {formatCurrency(sub.yearly)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                            <div className="text-center text-xs text-gray-400 mt-6 border-t pt-4">
                                <span>
                                    🔍 Insights by{' '}
                                    <span className="font-semibold text-blue-700">Snapshot Finance</span>
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>

				{/* Detailed On-Screen Snapshot */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="mb-20"
				>
					<div className="text-center mb-8">
						<h2 className="text-3xl font-bold text-gray-900">Your Detailed On-Screen Report</h2>
						<p className="text-lg text-gray-600 mt-2">
							Once unlocked, you get a comprehensive view with powerful insights.
						</p>
					</div>
					<div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
						{/* Top Stats */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
							<div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
								<div className="p-3 rounded-full bg-blue-100 text-blue-600 mb-2">
									<FiDollarSign className="h-6 w-6" />
								</div>
								<div className="text-sm text-gray-500">Total Yearly</div>
								<div className="text-2xl font-bold text-gray-900">{formatCurrency(totalYearly)}</div>
							</div>
							<div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
								<div className="p-3 rounded-full bg-purple-100 text-purple-600 mb-2">
									<FiAward className="h-6 w-6" />
								</div>
								<div className="text-sm text-gray-500">Most Expensive</div>
								<div className="text-lg font-bold text-gray-900">{mostExpensive.name}</div>
								<div className="text-gray-600">{formatCurrency(mostExpensive.yearly)}/year</div>
							</div>
							<div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
								<div className="p-3 rounded-full bg-green-100 text-green-600 mb-2">
									<FiPieChart className="h-6 w-6" />
								</div>
								<div className="text-sm text-gray-500">Avg Monthly</div>
								<div className="text-2xl font-bold text-gray-900">{formatCurrency(totalYearly / 12)}</div>
							</div>
						</div>

						{/* Accounts */}
						<div className="space-y-8">
							{exampleAccounts.map((account) => (
								<div key={account.title} className="bg-gray-50 rounded-xl p-6 shadow-sm">
									<div className="flex items-center mb-4">
										<div className="p-2 rounded-lg bg-blue-100 mr-3">
											<FiDatabase className="h-5 w-5 text-blue-600" />
										</div>
										<div>
											<h3 className="text-lg font-semibold text-gray-900">{account.title}</h3>
											<p className="text-sm text-gray-500">
												{account.subscriptions.length} subscriptions · {formatCurrency(account.totalYearly)}/year
											</p>
										</div>
									</div>
									<div className="overflow-x-auto">
										<table className="min-w-full divide-y divide-gray-200">
											<thead className="bg-gray-200">
												<tr>
													<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
														Subscription
													</th>
													<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
														Amount
													</th>
													<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
														Frequency
													</th>
													<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
														Yearly Cost
													</th>
												</tr>
											</thead>
											<tbody className="bg-white divide-y divide-gray-200">
												{account.subscriptions.map((sub) => (
													<tr key={sub.id}>
														<td className="px-4 py-2 text-sm font-medium text-gray-900">{sub.name}</td>
														<td className="px-4 py-2 text-sm text-gray-500">{formatCurrency(sub.cost)}</td>
														<td className="px-4 py-2 text-sm text-gray-500">{sub.frequency}</td>
														<td
															className={`px-4 py-2 text-sm font-medium ${
																sub.yearly > 500 ? 'text-red-600' : 'text-gray-900'
															}`}
														>
															{formatCurrency(sub.yearly)}
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							))}
						</div>
					</div>
				</motion.div>

				{/* Why Snapshot? */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="mb-20"
				>
					<h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Snapshot is Different</h2>
					<div className="grid md:grid-cols-2 gap-8">
						<div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 flex flex-col items-center text-center">
							<div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
								<FiLayers className="w-8 h-8 text-blue-600" />
							</div>
							<h3 className="font-bold text-lg mb-2 text-blue-700">Your Entire Financial Picture</h3>
							<p className="text-gray-600 text-sm mb-4">
								Your bank's app can't see the Netflix subscription on your partner's credit card or the gym membership paid from another account. Snapshot unifies everything. By analysing statements from all your accounts (e.g., ANZ, CommBank, Revolut, Amex), we provide a single source of truth for your total recurring spend.
							</p>
							<ul className="text-s text-gray-500 mt-2 space-y-1 text-left">
								<li>
									<span className="font-semibold text-blue-700">✓</span> Combine multiple banks and cards
								</li>
								<li>
									<span className="font-semibold text-blue-700">✓</span> Spot duplicate subscriptions across accounts
								</li>
								<li>
									<span className="font-semibold text-blue-700">✓</span> Get one true total for your household
								</li>
							</ul>
						</div>
						<div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 flex flex-col items-center text-center">
							<div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
								<FiLock className="w-8 h-8 text-green-600" />
							</div>
							<h3 className="font-bold text-lg mb-2 text-green-600">Safer By Design: No Account Linking</h3>
							<p className="text-gray-600 text-sm mb-4">
								Other apps ask you to hand over your bank login details, creating a permanent link and a security risk. We don't. Snapshot is designed for privacy from the ground up. You simply upload read-only statements. Your files are processed instantly, never stored, and we never gain access to your accounts.
							</p>
							<ul className="text-s text-gray-500 mt-2 space-y-1 text-left">
								<li>
									<span className="font-semibold text-green-700">✓</span> No open banking or third-party access
								</li>
								<li>
									<span className="font-semibold text-green-700">✓</span> You stay in 100% control of your data
								</li>
								<li>
									<span className="font-semibold text-green-700">✓</span> No passwords, no connections, no risk
								</li>
							</ul>
						</div>
					</div>
				</motion.div>

				{/* Who Is Snapshot For? */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="mb-20"
				>
					<h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Who Is Snapshot For?</h2>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 flex flex-col items-center text-center">
							<div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
								<FiUsers className="w-8 h-8 text-blue-600" />
							</div>
							<h3 className="font-bold text-lg mb-2 text-blue-700">The Busy Family</h3>
							<p className="text-gray-600 text-sm mb-4">
								Between health insurance, multiple streaming services, and kids' apps on different credit cards, it's easy to lose track. Snapshot consolidates everything into one clear report, so you can finally see where all the money is going and find savings for the family budget.
							</p>
							<ul className="text-xs text-gray-500 mt-2 space-y-1">
								<li>• Health insurance & utilities</li>
								<li>• Netflix, Disney+, Spotify</li>
								<li>• Kids’ gaming & learning apps</li>
							</ul>
						</div>
						<div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 flex flex-col items-center text-center">
							<div className="flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
								<FiBookOpen className="w-8 h-8 text-purple-600" />
							</div>
							<h3 className="font-bold text-lg mb-2 text-purple-600">The Savvy Student</h3>
							<p className="text-gray-600 text-sm mb-4">
								On a tight budget, every dollar counts. Snapshot acts like a financial detective, finding those small, forgotten subscriptions that quietly drain your account—from free trials that expired to study tools you no longer use. Cancel what you don't need and keep more money for what matters.
							</p>
							<ul className="text-xs text-gray-500 mt-2 space-y-1">
								<li>• Study tools & cloud storage</li>
								<li>• Streaming & food delivery</li>
								<li>• Forgotten free trials</li>
							</ul>
						</div>
						<div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 flex flex-col items-center text-center">
							<div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
								<FiHome className="w-8 h-8 text-green-600" />
							</div>
							<h3 className="font-bold text-lg mb-2 text-green-600">The Future Homeowner</h3>
							<p className="text-gray-600 text-sm mb-4">
								When applying for a home loan, lenders scrutinize your recurring expenses to determine your borrowing power. Snapshot provides a clear, comprehensive list of your financial commitments, helping you clean up unnecessary spending and present a stronger application.
							</p>
							<ul className="text-xs text-gray-500 mt-2 space-y-1">
								<li>• Identify unnecessary spending</li>
								<li>• Improve your loan application</li>
								<li>• Budget with confidence</li>
							</ul>
						</div>
					</div>
				</motion.div>
			</main>
            <Footer />
		</div>
	);
}