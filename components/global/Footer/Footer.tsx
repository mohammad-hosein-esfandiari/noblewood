import React from 'react'

export const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
      }} />
    </div>
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">NW</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              NobleWood
            </span>
            <span className="text-sm text-amber-300">Crafted Excellence</span>
          </div>
        </div>
        <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
          Creating timeless wooden furniture that brings warmth and elegance to your home. 
          Handcrafted with passion, delivered with pride.
        </p>
        <div className="border-t border-gray-700 pt-8">
          <p className="text-gray-400 text-sm">
            © 2024 NobleWood. All rights reserved. | Crafted with ❤️ for furniture lovers
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}
