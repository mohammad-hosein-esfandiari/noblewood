import { Sparkles } from "lucide-react";
import React from "react";

export const Title = () => {
  return (
    <div className="text-center mb-16">
      <div className="flex items-center justify-center mb-6">
        <Sparkles className="w-8 h-8 text-amber-500 mr-3 animate-pulse" />
        <span className="text-amber-600 font-semibold tracking-wider uppercase text-sm">
          Our Collection
        </span>
        <Sparkles className="w-8 h-8 text-amber-500 ml-3 animate-pulse" />
      </div>
      <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent mb-6">
        Handcrafted Excellence
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Discover our curated collection of premium wooden furniture, where
        traditional craftsmanship meets contemporary design
      </p>
    </div>
  );
};
