import { ArrowDown, Sparkles } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
//  MainContent component for the HeroSection.
// It displays the main content including title, subtitle, description, and action buttons.

export const MainContent = () => {
  return (
    <div className="relative pt-[150px] mb-12 animate-fade-in-up  flex items-center justify-center flex-col px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-center mb-6">
      <Sparkles className="w-8 h-8 text-amber-300 mr-3 animate-pulse" />
      <span className="text-amber-200 font-medium tracking-wider uppercase text-sm">
        Premium Wooden Furniture
      </span>
      <Sparkles className="w-8 h-8 text-amber-300 ml-3 animate-pulse" />
    </div>
    
    <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
      <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-white bg-clip-text text-transparent animate-gradient">
        NobleWood
      </span>
      <br />
      <span className="text-xl sm:text-3xl md:text-5xl font-light text-amber-100 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        Crafted with Passion
      </span>
    </h1>
    
    <p className="text-md md:text-2xl text-amber-100/90 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
      Discover our exclusive collection of handcrafted wooden furniture, 
      where traditional craftsmanship meets modern design to create timeless pieces 
      that transform your living space.
    </p>
    
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
      <Link
        href="#products"
        className="group relative bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-amber-400 hover:via-amber-500 hover:to-amber-600 transform hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-amber-500/25 overflow-hidden"
      >
        <span className="relative z-10">Explore Collection</span>
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </Link>
      
      <Link
        href="#about"
        className="group border-2 border-amber-300 text-amber-100 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-amber-300 hover:text-amber-900 transition-all duration-500 backdrop-blur-sm bg-white/5 hover:shadow-xl"
      >
        <span className="group-hover:scale-105 inline-block transition-transform duration-300">
          Our Story
        </span>
      </Link>
    </div>
          {/* Scroll Indicator */}
<div className="mt-20  animate-bounce">
  <div className="w-12 h-12 rounded-full border-2 border-amber-300 flex items-center justify-center bg-white/10 backdrop-blur-sm">
    <ArrowDown className="w-6 h-6 text-amber-300" />
  </div>
</div>
  </div>
  )
}
