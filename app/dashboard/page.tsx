import Link from 'next/link'; // <-- ADD THIS LINE
import { createClient } from '@supabase/supabase-js';

// Define the structure for your data rows
interface Subscriber {
  id: number;
  name: string;
  email: string;
  address: string;
}

// Function to fetch data securely on the server
async function getSubscribers(): Promise<Subscriber[]> {
  // IMPORTANT: We use the SERVICE_KEY here instead of the public ANON_KEY
  // to ensure only we can access ALL data securely on the server.
  // Note: You must add the SERVICE_KEY to your Vercel Environment Variables.
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY! // <-- NEW: Use the Service Key
  );

  const { data, error } = await supabase
    .from('subscribers')
    .select('id, name, email, address') // Select only the columns you want
    .order('id', { ascending: false }); // Sort by newest first

  if (error) {
    console.error('Error fetching data:', error);
    return [];
  }
  return data || [];
}

export default async function DashboardPage() {
  const subscribers = await getSubscribers();

  return (
    <div className="min-h-screen p-10 bg-gray-950 text-white">

      {/* NEW LINK TO LANDING PAGE */}
      <div className="mb-6">
        <Link href="/" className="text-blue-400 hover:text-blue-300">
            &larr; Back to Landing Page
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Subscribers Dashboard</h1>
      
      <p className="mb-4">Total Records: {subscribers.length}</p>

      {/* Simple HTML Table to display the data */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg">
          <thead>
            <tr className="border-b border-gray-700 text-left">
              <th className="p-3 text-sm font-semibold tracking-wide">ID</th>
              <th className="p-3 text-sm font-semibold tracking-wide">Name</th>
              <th className="p-3 text-sm font-semibold tracking-wide">Email</th>
              <th className="p-3 text-sm font-semibold tracking-wide">Address</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber) => (
              <tr key={subscriber.id} className="border-b border-gray-700 hover:bg-gray-700">
                <td className="p-3 text-sm">{subscriber.id}</td>
                <td className="p-3 text-sm">{subscriber.name}</td>
                <td className="p-3 text-sm">{subscriber.email}</td>
                <td className="p-3 text-sm">{subscriber.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}