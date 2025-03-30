import SubscriptionTable from './SubscriptionTable';

interface SnapshotCardProps {
  date: string;
  totalSpend: string;
  mostExpensive: {
    name: string;
    amount: string;
  };
  subscriptions: {
    name: string;
    amount: string;
    frequency: string;
    yearly: string;
  }[];
}

export default function SnapshotCard({
  date,
  totalSpend,
  mostExpensive,
  subscriptions,
}: SnapshotCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">Nick's Snapshot</h2>
      <p className="text-gray-500 mb-6">{date}</p>
      
      <div className="mb-8">
        <p className="text-lg mb-2">
          Your total estimated subscription spend for the year was <strong>{totalSpend}</strong>.
        </p>
        <p className="text-lg">
          Your most expensive subscription was <strong>{mostExpensive.name}</strong> totalling at <strong>{mostExpensive.amount}</strong>.
        </p>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">Let's see the whole breakdown:</h3>
      <SubscriptionTable subscriptions={subscriptions} />
    </div>
  );
}