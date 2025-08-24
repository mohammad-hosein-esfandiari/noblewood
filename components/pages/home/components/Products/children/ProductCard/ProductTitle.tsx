"use client";

interface ProductTitleProps {
  title: string;
}

export function ProductTitle({ title }: ProductTitleProps) {
  return (
    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 transition-colors duration-300">
      {title}
    </h3>
  );
}
