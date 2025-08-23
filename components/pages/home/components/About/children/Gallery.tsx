import Image from 'next/image'
import React from 'react'

export const Gallery = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
    {[
      "http://noblewood.local/wp-content/uploads/2025/07/photo_2025-07-29_21-05-04.jpg",
      "http://noblewood.local/wp-content/uploads/2025/07/photo_2025-07-29_20-56-33.jpg",
      "http://noblewood.local/wp-content/uploads/2025/07/photo_2025-07-29_20-47-39.jpg",
      "http://noblewood.local/wp-content/uploads/2025/07/photo_2025-07-28_15-49-49.jpg"
    ].map((src, index) => (
      <div key={index} className={`relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 `}>
        <Image
          src={src}
          alt={`Craftsmanship ${index + 1}`}
          width={1080}
          height={1080}
          priority
          className="w-full  h-full object-cover hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    ))}
  </div>
  )
}
