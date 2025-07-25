"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Eye, Heart, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  woodType: string;
  image: string;
  description: string;
  dimensions: string;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { dispatch } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const getWoodTypeLabel = (woodType: string) => {
    const types: { [key: string]: string } = {
      'walnut': 'Walnut',
      'oak': 'Oak',
      'ash': 'Ash',
      'pine': 'Pine'
    };
    return types[woodType] || woodType;
  };

  return (
    <div 
      className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden transform hover:scale-[1.02] hover:-translate-y-2 animate-fade-in-up"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100">
        <div className={`transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        
        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsLiked(!isLiked);
                }}
                className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                  isLiked 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <Link
                href={`/product/${product.id}`}
                className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
              >
                <Eye className="w-5 h-5" />
              </Link>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-3 rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stock Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
            product.inStock 
              ? 'bg-green-500/90 text-white' 
              : 'bg-red-500/90 text-white'
          }`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
          <Star className="w-4 h-4 text-amber-400 fill-current" />
          <span className="text-xs font-bold text-gray-800">4.8</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
            {getWoodTypeLabel(product.woodType)} Wood
          </span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {product.dimensions}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-amber-700 transition-colors duration-300">
          {product.name}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-gray-500">Free Shipping</span>
          </div>
          
          <Link
            href={`/product/${product.id}`}
            className="group/btn bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span className="group-hover/btn:scale-105 inline-block transition-transform duration-200">
              View Details
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}