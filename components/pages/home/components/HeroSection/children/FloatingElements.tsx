import React, { FC } from 'react'

// FloatingElements component for the HeroSection.
// It displays animated floating elements in the background to enhance the visual appeal.

export const FloatingElements:FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none px-4 sm:px-6 lg:px-8">
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-amber-300/30 rounded-full animate-pulse"
        style={{
          left: `${20 + i * 15}%`,
          top: `${30 + i * 10}%`,
          animationDelay: `${i * 0.5}s`,
          
        }}
      />
    ))}
  </div>
  )
}
