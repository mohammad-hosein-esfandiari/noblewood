"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Heart, Share2, Plus, Minus, Star, Shield, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import productsData from '@/data/products.json';

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

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const productId = parseInt(params.id as string);
  const product: Product | undefined = productsData.products.find(p => p.id === productId);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    setIsLoading(false);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-6">❌</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/"
            className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 font-semibold"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getWoodTypeName = (woodType: string) => {
    const woodTypes: { [key: string]: string } = {
      'walnut': 'Walnut Wood',
      'oak': 'Oak Wood',
      'ash': 'Ash Wood',
      'pine': 'Pine Wood',
    };
    return woodTypes[woodType] || woodType;
  };

  const getCategoryName = (category: string) => {
    const categories: { [key: string]: string } = {
      'chairs': 'Wooden Chairs',
      'tables': 'Wooden Tables',
      'decorative': 'Decorative Items',
      'bedroom': 'Bedroom Sets',
      'bookcase': 'Bookcases',
    };
    return categories[category] || category;
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_ITEM', payload: product });
    }
    router.push('/cart');
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D2691E' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="mb-8 animate-fade-in-up">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-amber-600 transition-colors duration-200">
              Home
            </Link>
            <span>→</span>
            <span className="text-gray-400">{getCategoryName(product.category)}</span>
            <span>→</span>
            <span className="text-gray-800 font-medium">{product.name}</span>
          </div>
        </nav>

        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-amber-600 hover:text-amber-700 transition-colors duration-200 mb-8 animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Shop</span>
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Product Image */}
            <div className="relative group">
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-96 lg:h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Status Badge */}
              <div className="absolute top-6 left-6">
                <span className={`px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm ${
                  product.inStock 
                    ? 'bg-green-500/90 text-white' 
                    : 'bg-red-500/90 text-white'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Rating Badge */}
              <div className="absolute top-6 right-6 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2">
                <Star className="w-4 h-4 text-amber-400 fill-current" />
                <span className="text-sm font-bold text-gray-800">4.8</span>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-8 lg:p-12">
              <div className="mb-8">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                    {getCategoryName(product.category)}
                  </span>
                  <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
                    {getWoodTypeName(product.woodType)}
                  </span>
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                  {product.name}
                </h1>
                
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-600">(127 reviews)</span>
                </div>

                <p className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent mb-8">
                  {formatPrice(product.price)}
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Product Description</h3>
                <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                  {product.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                      Dimensions
                    </h4>
                    <p className="text-gray-600 font-medium">{product.dimensions}</p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                      Material
                    </h4>
                    <p className="text-gray-600 font-medium">{getWoodTypeName(product.woodType)}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {[
                    { icon: <Shield className="w-5 h-5" />, text: "2 Year Warranty" },
                    { icon: <Truck className="w-5 h-5" />, text: "Free Shipping" },
                    { icon: <RotateCcw className="w-5 h-5" />, text: "30 Day Returns" }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-600">
                      <div className="text-amber-600">{feature.icon}</div>
                      <span className="text-sm font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-gray-800 mb-4">
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-12 h-12 rounded-xl border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-amber-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-20 text-center text-xl font-bold bg-gray-50 py-3 rounded-xl">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    className="w-12 h-12 rounded-xl border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-amber-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-5 px-8 rounded-2xl font-bold text-lg hover:from-amber-700 hover:to-amber-800 transform hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>

                <div className="flex space-x-4">
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex-1 border-2 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                      isLiked 
                        ? 'border-red-300 text-red-600 bg-red-50' 
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                    <span>Wishlist</span>
                  </button>
                  <button className="flex-1 border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-2xl font-semibold hover:border-gray-400 transition-all duration-300 flex items-center justify-center space-x-2">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-20">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Related Products
            </h2>
            <p className="text-gray-600 text-lg">
              Discover more beautiful pieces from our collection
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productsData.products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 3)
              .map((relatedProduct, index) => (
                <Link
                  key={relatedProduct.id}
                  href={`/product/${relatedProduct.id}`}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors duration-300">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                      {formatPrice(relatedProduct.price)}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}