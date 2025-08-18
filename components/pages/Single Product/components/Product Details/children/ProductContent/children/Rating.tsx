import { Star } from 'lucide-react';
import React, { FC } from 'react';

interface RatingProps {
  averageRating: string;
  ratingCount: number;
}

export const Rating: FC<RatingProps> = ({ averageRating, ratingCount }) => {
  if (ratingCount === 0) return null; // شرط: اگر تعداد ریت صفر بود هیچ‌چی رندر نشه

  const avg = parseFloat(averageRating); // "1.45" → 1.45

  return (
    <div className="flex items-center space-x-4 mb-6">
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.round(avg) ? 'text-amber-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <span className="text-gray-400 text-[12px]">({ratingCount} reviews)</span>
    </div>
  );
};
