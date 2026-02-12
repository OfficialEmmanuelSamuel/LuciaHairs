import { useEffect, useState } from "react";
import { IoBarChart } from "react-icons/io5";

export default function AdminPreorderDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/admin/preorders/stats`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch preorder stats");
        }

        const data = await res.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStats();
  }, []);

  if (error)
    return (
      <p className="text-center text-red-600 font-semibold mt-10">
        {error}
      </p>
    );

  if (!stats)
    return (
      <p className="text-center font-semibold mt-10">
        Loading preorder analytics...
      </p>
    );

  return (
    <section className="py-14">
      <p className="flex flex-col gap-5 items-center justify-center text-xl font-playfair font-bold mb-10">
        PREORDER STATS <IoBarChart size={40} />
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-5 px-5 w-70 sm:w-3xl mx-auto">
        <StatCard title="Total Preorders" value={stats.total} />
        <StatCard title="Active Preorders" value={stats.active} />
        <StatCard title="Expired Preorders" value={stats.expired} />
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
