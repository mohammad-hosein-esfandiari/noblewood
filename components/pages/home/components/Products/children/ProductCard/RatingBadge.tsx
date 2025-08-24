"use client";

import { Star } from "lucide-react";

interface RatingBadgeProps {
  rating: string;
}

export function RatingBadge({ rating }: RatingBadgeProps) {
  return (
    <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
      <Star className="w-4 h-4 text-amber-400 fill-current" />
      <span className="text-xs font-bold text-gray-800">
        {rating}
      </span>
    </div>
  );
}
