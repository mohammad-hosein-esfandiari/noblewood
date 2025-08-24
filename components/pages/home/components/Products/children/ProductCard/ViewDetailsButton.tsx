"use client";

import Link from "next/link";

interface ViewDetailsButtonProps {
  slug: string;
}

export function ViewDetailsButton({ slug }: ViewDetailsButtonProps) {
  return (
    <Link
      href={`/products/${slug}`}
      className="group/btn bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
      <span className="group-hover/btn:scale-105 inline-block transition-transform duration-200">
        View Details
      </span>
    </Link>
  );
}
