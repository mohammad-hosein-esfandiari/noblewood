"use client";

import { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';

interface FilterOptions {
  category: string;
  woodType: string;
  priceRange: string;
}

interface ProductFilterProps {
  categories: Array<{ id: string; name: string; icon: string }>;
  woodTypes: Array<{ id: string; name: string; color: string }>;
  onFilterChange: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

export default function ProductFilter({ 
  categories, 
  woodTypes, 
  onFilterChange, 
  currentFilters 
}: ProductFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const priceRanges = [
    { id: 'all', name: 'All Prices', min: 0, max: Infinity },
    { id: 'under-200', name: 'Under $200', min: 0, max: 200 },
    { id: '200-500', name: '$200 - $500', min: 200, max: 500 },
    { id: '500-1000', name: '$500 - $1,000', min: 500, max: 1000 },
    { id: 'over-1000', name: 'Over $1,000', min: 1000, max: Infinity },
  ];

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    onFilterChange({
      ...currentFilters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFilterChange({
      category: 'all',
      woodType: 'all',
      priceRange: 'all',
    });
  };

  const hasActiveFilters = 
    currentFilters.category !== 'all' || 
    currentFilters.woodType !== 'all' || 
    currentFilters.priceRange !== 'all';

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
            <Filter className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Filter Products</h3>
            <p className="text-sm text-gray-500">Find exactly what you're looking for</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-2 text-sm text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl transition-all duration-300 font-medium"
            >
              <X className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          )}
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center space-x-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-xl text-sm font-medium hover:bg-amber-200 transition-colors duration-300"
          >
            <span>{isOpen ? 'Hide Filters' : 'Show Filters'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-500 ${isOpen ? 'block' : 'hidden md:grid'}`}>
        {/* Category Filter */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-700 mb-3">
            Category
          </label>
          <div className="relative">
            <select
              value={currentFilters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-gray-800 font-medium appearance-none cursor-pointer hover:border-amber-300 transition-all duration-300"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Wood Type Filter */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-700 mb-3">
            Wood Type
          </label>
          <div className="relative">
            <select
              value={currentFilters.woodType}
              onChange={(e) => handleFilterChange('woodType', e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-gray-800 font-medium appearance-none cursor-pointer hover:border-amber-300 transition-all duration-300"
            >
              <option value="all">All Wood Types</option>
              {woodTypes.map((woodType) => (
                <option key={woodType.id} value={woodType.id}>
                  {woodType.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-700 mb-3">
            Price Range
          </label>
          <div className="relative">
            <select
              value={currentFilters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-gray-800 font-medium appearance-none cursor-pointer hover:border-amber-300 transition-all duration-300"
            >
              {priceRanges.map((range) => (
                <option key={range.id} value={range.id}>
                  {range.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-600 mr-2">Active filters:</span>
            {currentFilters.category !== 'all' && (
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium">
                {categories.find(c => c.id === currentFilters.category)?.name}
              </span>
            )}
            {currentFilters.woodType !== 'all' && (
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium">
                {woodTypes.find(w => w.id === currentFilters.woodType)?.name}
              </span>
            )}
            {currentFilters.priceRange !== 'all' && (
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium">
                {priceRanges.find(p => p.id === currentFilters.priceRange)?.name}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}