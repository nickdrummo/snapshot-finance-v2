// components/PDFSnapCard.tsx

interface Subscription {
    name: string;
    amount: string;
    yearly: string;
}

interface PDFSnapCardProps {
  gradient: string;
  date: string;
  totalSpend: string;
  mostExpensive: {
    name: string;
    amount: string;
  };
  subscriptions: Subscription[];
  onDownload: () => void;
}

export default function PDFSnapCard({
  gradient,
  date,
  totalSpend,
  mostExpensive,
  subscriptions,
  onDownload,
}: PDFSnapCardProps) {
  return (
    <div className="relative group">
      <div 
        className={`rounded-lg p-6 w-96 h-[520px] transform transition-transform duration-300 hover:scale-105 ${gradient}`}
        style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
      >
        {/* Card Content */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Subscription Snapshot</h1>
            <p className="text-gray-500 text-sm">{date}</p>
          </div>
        </div>

        {/* Summary Section */}
        <div className="space-y-4 mb-6">
          <div className="bg-white/30 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Yearly Spend</p>
            <p className="text-xl font-semibold text-gray-900">{totalSpend}</p>
          </div>
          <div className="bg-white/30 p-4 rounded-lg">
            <p className="text-sm text-blue-600">Most Expensive</p>
            <p className="text-lg font-semibold text-gray-900">
              {mostExpensive.name} <span className="text-gray-600">{mostExpensive.amount}</span>
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase border-b">
              <tr>
                <th className="px-2 py-3 bg-white/30">Subscription</th>
                <th className="px-2 py-3 bg-white/30">Amount</th>
                <th className="px-2 py-3 bg-white/30">Yearly</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub, index) => (
                <tr key={index} className="border-b">
                  <td className="px-2 py-3 font-medium text-gray-900 bg-white/10">{sub.name}</td>
                  <td className="px-2 py-3 bg-white/10">{sub.amount}</td>
                  <td className="px-2 py-3 bg-white/10">{sub.yearly}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Download Overlay */}
      <button 
        onClick={onDownload}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
        bg-black/80 text-white px-6 py-3 rounded-lg hover:bg-black/90
        flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download PDF
      </button>
    </div>
  );
}