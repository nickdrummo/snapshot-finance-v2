//subtable.tsx
interface Subscription {
    name: string;
    amount: string;
    frequency: string;
    yearly: string;
  }
  
  interface SubscriptionTableProps {
    subscriptions: Subscription[];
  }
  
  export default function SubscriptionTable({ subscriptions }: SubscriptionTableProps) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Subscription</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Frequency</th>
              <th className="py-3 px-4 text-left">Yearly</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="py-3 px-4">{sub.name}</td>
                <td className="py-3 px-4">{sub.amount}</td>
                <td className="py-3 px-4">{sub.frequency}</td>
                <td className="py-3 px-4">{sub.yearly}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }