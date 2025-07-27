import { Award, Sparkles, Truck } from 'lucide-react'
import React from 'react'


// FeaturesGrid component for the HeroSection.
// It displays a grid of features with icons, titles, and descriptions.

export const FeaturesGrid = () => {
  return (
    <div className="grid px-4 sm:px-6 lg:px-8 grid-cols-1 md:grid-cols-3 gap-8 mt-20 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
    {[
      {
        icon: <Award className="w-8 h-8" />,
        title: "Premium Quality",
        description: "Handcrafted from the finest natural woods with attention to every detail"
      },
      {
        icon: <Sparkles className="w-8 h-8" />,
        title: "Unique Design",
        description: "Each piece is designed with modern aesthetics and timeless appeal"
      },
      {
        icon: <Truck className="w-8 h-8" />,
        title: "Fast Delivery",
        description: "Free shipping and delivery in the shortest time possible nationwide"
      }
    ].map((feature, index) => (
      <div 
        key={index}
        className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/15 border border-white/20"
        style={{ animationDelay: `${1.5 + index * 0.2}s` }}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
          <div className="text-white">
            {feature.icon}
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-amber-200 transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="text-amber-100/80 leading-relaxed group-hover:text-amber-100 transition-colors duration-300">
          {feature.description}
        </p>
      </div>
    ))}
  </div>
  )
}
