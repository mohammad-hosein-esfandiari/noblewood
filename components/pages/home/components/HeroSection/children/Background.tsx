import React, { FC } from "react";

/**
 * Background component for the HeroSection.
 * It creates a gradient background with a subtle pattern overlay.
 */

export const Background:FC = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900">
      <div className="absolute inset-0 bg-black/20"></div>
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M50 30c11.046 0 20 8.954 20 20s-8.954 20-20 20-20-8.954-20-20 8.954-20 20-20zm0 5c-8.284 0-15 6.716-15 15s6.716 15 15 15 15-6.716 15-15-6.716-15-15-15z'/%3E%3C/g%3E%3C/svg%3E")`,
          
        }}
      />
    </div>
  );
};
