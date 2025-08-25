import { Heart, Share2, ShoppingCart } from 'lucide-react'
import React, { useState } from 'react'
import { addToCart } from '@/utils/global/addToCart';
import { useCartStore } from '@/store/cart';

interface ActionButtonsProps {
  productId: number;
  isVariable: boolean;
  selectedVariationId: number | null;
  stockStatus: string;
  quantity: number;
  selectedAttributes: { [key: string]: string };
  mainProductId: number;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  productId, 
  isVariable, 
  selectedVariationId, 
  stockStatus,
  quantity,
  selectedAttributes,
  mainProductId
}) => {
  const {count , setCount } = useCartStore()
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    if (isLoading) return; // Prevent multiple clicks
    
    setIsLoading(true);

    try {
      let cartItem;

      if (isVariable) {
        if (!selectedVariationId) {
          return; // This should not happen due to button disabled state
        }
        // محصول وریشنی
        cartItem = {
          variation_id: selectedVariationId,
          quantity: quantity || 1,
          attributes: selectedAttributes
        };
      } else {
        // محصول ساده
        cartItem = {
          id: productId,
          quantity: quantity || 1
        };
      }

      console.log("Cart item payload:", cartItem);

      const result = await addToCart(cartItem, {
        onSuccess: (data) => {
          console.log("Product added to cart successfully:", data);
          setCount(count + cartItem.quantity)
          // اینجا می‌تونی state کارت رو آپدیت کنی
        },
        onError: (error) => {
          console.error("Error adding product to cart:", error);
        },
        onFinally: () => {
          setIsLoading(false);
        }
      });

      if (!result.success) {
        // Error is already handled by the global function
        console.error("Failed to add product to cart");
      }

    } catch (error) {
      console.error("Unexpected error:", error);
      setIsLoading(false);
    }
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
  const canAddToCart = isInStock && (!isVariable || (isVariable && selectedVariationId));
  const isButtonDisabled = !canAddToCart || isLoading;

  return (
    <div className="space-y-4">
      <button
        onClick={handleAddToCart}
        disabled={isButtonDisabled}
        className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-5 px-8 rounded-2xl font-bold text-lg hover:from-amber-700 hover:to-amber-800 transform hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
      >
        <ShoppingCart className="w-6 h-6" />
        <span>
          {isLoading ? 'Adding to Cart...' :
           !isInStock ? 'Out of Stock' : 
           isVariable && !selectedVariationId ? 'Select Options' : 
           'Add to Cart'}
        </span>
      </button>

      <div className="flex space-x-4">
        <button 
          onClick={handleWishlist}
          disabled={isLoading}
          className={`flex-1 border-2 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
            isLiked 
              ? 'border-red-300 text-red-600 bg-red-50' 
              : 'border-gray-300 text-gray-700 hover:border-gray-400'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          <span>Wishlist</span>
        </button>
        <button 
          onClick={handleShare}
          disabled={isLoading}
          className="flex-1 border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-2xl font-semibold hover:border-gray-400 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Share2 className="w-5 h-5" />
          <span>Share</span>
        </button>
      </div>

      {/* Debug info - you can remove this in production */}
      {/* <div className="text-xs text-gray-500 p-2 bg-gray-100 rounded">
        <p>Main Product ID: {mainProductId}</p>
        <p>Current Product ID: {productId}</p>
        <p>Is Variable: {isVariable ? 'Yes' : 'No'}</p>
        {isVariable && <p>Selected Variation ID: {selectedVariationId || 'None'}</p>}
        <p>Quantity: {quantity}</p>
        <p>Selected Attributes: {Object.keys(selectedAttributes).length > 0 ? 
          Object.entries(selectedAttributes).map(([key, value]) => `${key}: ${value}`).join(', ') : 
          'None'}</p>
        <p>Stock Status: {stockStatus}</p>
        <p>Can Add to Cart: {canAddToCart ? 'Yes' : 'No'}</p>
        <p>Is Loading: {isLoading ? 'Yes' : 'No'}</p>
      </div> */}
    </div>
  )
}
