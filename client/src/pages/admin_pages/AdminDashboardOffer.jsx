import { useEffect, useState } from "react";

export default function AdminOfferDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/analytics/stats`)
      .then((res) => res.json())
      .then(setStats);
  }, []);

  if (!stats) return <p>Loading analytics...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <StatCard title="Total Offers" value={stats.total} />
      <StatCard title="Active Offers" value={stats.active} />
      <StatCard title="Expired Offers" value={stats.expired} />
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 text-center">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
    </div>
  );
}
