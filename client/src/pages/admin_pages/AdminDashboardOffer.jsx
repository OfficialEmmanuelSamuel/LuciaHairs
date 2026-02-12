import { useEffect, useState } from "react";
import { IoBarChart } from "react-icons/io5";

export default function AdminOfferDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/analytics/stats`)
      .then((res) => res.json())
      .then(setStats);
  }, []);

  if (!stats) return <p>Loading analytics...</p>;

  return (
    <section className="py-14 min-h-screen">

      <p className="flex flex-col gap-5 items-center justify-center text-xl font-playfair font-bold mb-10">
        OFFER SALES STATS... <IoBarChart size={40} />
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-5 px-5 w-70 sm:w-3xl mx-auto">
        <StatCard title="Total Offers" value={stats.total} />
        <StatCard title="Active Offers" value={stats.active} />
        <StatCard title="Expired Offers" value={stats.expired} />
      </div>
    </section>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl flex flex-col gap-3 items-center shadow p-6 text-center font-playfair font-bold w-full shadow-sm shadow-gray-300">
      <p className="text-sm text-gray-800">{title}</p>
      <h3 className="text-3xl font-bold text-gray-950">{value}</h3>
    </div>
  );
}
