import { Heart, Share2, ShoppingCart } from 'lucide-react'
import React, { useState } from 'react'

interface ActionButtonsProps {
  productId: number;
  isVariable: boolean;
  selectedVariationId: number | null;
  stockStatus: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  productId, 
  isVariable, 
  selectedVariationId, 
  stockStatus 
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = () => {
    // Log the current product ID for debugging
    console.log('Adding to cart - Product ID:', productId);
    console.log('Is Variable Product:', isVariable);
    console.log('Selected Variation ID:', selectedVariationId);
    console.log('Stock Status:', stockStatus);
    
    // Here you can implement the actual add to cart logic
    // The productId will be either the main product ID or the selected variation ID
  };

  const handleWishlist = () => {
    setIsLiked(!isLiked);
    console.log('Wishlist - Product ID:', productId);
  };

  const handleShare = () => {
    console.log('Share - Product ID:', productId);
    // Implement share functionality
  };

  const isInStock = stockStatus === "instock";

  return (
    <div className="space-y-4">
      <button
        onClick={handleAddToCart}
        disabled={!isInStock}
        className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-5 px-8 rounded-2xl font-bold text-lg hover:from-amber-700 hover:to-amber-800 transform hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
      >
        <ShoppingCart className="w-6 h-6" />
        <span>{isInStock ? 'Add to Cart' : 'Out of Stock'}</span>
      </button>

      <div className="flex space-x-4">
        <button 
          onClick={handleWishlist}
          className={`flex-1 border-2 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
            isLiked 
              ? 'border-red-300 text-red-600 bg-red-50' 
              : 'border-gray-300 text-gray-700 hover:border-gray-400'
          }`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          <span>Wishlist</span>
        </button>
        <button 
          onClick={handleShare}
          className="flex-1 border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-2xl font-semibold hover:border-gray-400 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <Share2 className="w-5 h-5" />
          <span>Share</span>
        </button>
      </div>

      {/* Debug info - you can remove this in production */}
      <div className="text-xs text-gray-500 p-2 bg-gray-100 rounded">
        <p>Current Product ID: {productId}</p>
        <p>Is Variable: {isVariable ? 'Yes' : 'No'}</p>
        {isVariable && <p>Selected Variation ID: {selectedVariationId || 'None'}</p>}
        <p>Stock Status: {stockStatus}</p>
      </div>
    </div>
  )
}
