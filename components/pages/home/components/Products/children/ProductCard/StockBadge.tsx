"use client";

interface StockBadgeProps {
  stockStatus: string;
}

export function StockBadge({ stockStatus }: StockBadgeProps) {
  return (
    <div className="absolute top-4 left-4">
      <span
        className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
          stockStatus === "instock"
            ? "bg-green-500/70 text-white"
            : "bg-gray-300/70 text-gray-700"
        }`}>
        {stockStatus === "instock" ? "In Stock" : "Out of Stock"}
      </span>
    </div>
  );
}
