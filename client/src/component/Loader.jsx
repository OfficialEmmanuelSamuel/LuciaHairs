export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white rounded-3xl shadow p-6 space-y-4">
      <div className="h-40 bg-gray-200 rounded-xl" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-10 bg-gray-200 rounded" />
    </div>
  );
}
