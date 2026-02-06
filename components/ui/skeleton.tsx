export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
      <div className="skeleton h-48 rounded-lg mb-4"></div>
      <div className="skeleton h-4 w-3/4 rounded mb-3"></div>
      <div className="skeleton h-4 w-1/2 rounded mb-4"></div>
      <div className="skeleton h-10 w-full rounded"></div>
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="skeleton h-6 w-48 rounded"></div>
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="p-6 border-b border-gray-100 flex items-center gap-4">
          <div className="skeleton h-12 w-12 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="skeleton h-4 w-3/4 rounded"></div>
            <div className="skeleton h-3 w-1/2 rounded"></div>
          </div>
          <div className="skeleton h-8 w-24 rounded"></div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      {[...Array(lines)].map((_, i) => (
        <div
          key={i}
          className="skeleton h-4 rounded"
          style={{ width: `${Math.random() * 30 + 70}%` }}
        ></div>
      ))}
    </div>
  );
}
