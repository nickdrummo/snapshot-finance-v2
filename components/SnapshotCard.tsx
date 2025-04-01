// components/SnapshotCard.tsx
interface Subscription {
  name: string;
  amount: string;
  yearly: string;
}

interface SnapshotCardProps {
  date: string;
  totalSpend: string;
  mostExpensive: {
    name: string;
    amount: string;
  };
  subscriptions: Subscription[];
}

export default function SnapshotCard({
  date,
  totalSpend,
  mostExpensive,
  subscriptions,
}: SnapshotCardProps) {
  return (
    <div className="card-gradient rounded-lg p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nick's Snapshot</h1>
          <p className="text-gray-500">{date}</p>
        </div>
      </div>

      {/* Summary Section */}
      <div className="space-y-4 mb-6">
        <div>
          <p className="text-sm text-gray-500">Total yearly spend</p>
          <p className="text-xl font-semibold text-gray-900">{totalSpend}</p>
        </div>
        <div>
          <p className="text-sm text-color-accent-blue">Most expensive</p>
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
              <th scope="col" className="px-2 py-3">Subscription</th>
              <th scope="col" className="px-2 py-3">Amount</th>
              <th scope="col" className="px-2 py-3">Yearly</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub, index) => (
              <tr key={index} className="border-b">
                <td className="px-2 py-3 font-medium text-gray-900">{sub.name}</td>
                <td className="px-2 py-3">{sub.amount}</td>
                <td className="px-2 py-3">{sub.yearly}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}