"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import HeroSection from '@/components/pages/home/components/HeroSection/HeroSection';
import ProductCard from '@/components/ProductCard';
import ProductFilter from '@/components/ProductFilter';
import Pagination from '@/components/Pagination';
import { Mail, Phone, MapPin, Award, Users, Clock, Sparkles } from 'lucide-react';
import productsData from '@/data/products.json';
import gsap from 'gsap';

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

interface FilterOptions {
  category: string;
  woodType: string;
  priceRange: string;
}

const ITEMS_PER_PAGE = 6;

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [scrollY, setScrollY] = useState(0);
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    woodType: 'all',
    priceRange: 'all',
  });

  const mainRef = useRef<HTMLDivElement>(null);

  const products: Product[] = productsData.products;
  const categories = productsData.categories;
  const woodTypes = productsData.woodTypes;

  const priceRanges = {
    'all': { min: 0, max: Infinity },
    'under-200': { min: 0, max: 200 },
    '200-500': { min: 200, max: 500 },
    '500-1000': { min: 500, max: 1000 },
    'over-1000': { min: 1000, max: Infinity },
  };



  // Filter products
  const filteredProducts = products.filter((product) => {
    const categoryMatch = filters.category === 'all' || product.category === filters.category;
    const woodTypeMatch = filters.woodType === 'all' || product.woodType === filters.woodType;
    
    const priceRange = priceRanges[filters.priceRange as keyof typeof priceRanges];
    const priceMatch = product.price >= priceRange.min && product.price <= priceRange.max;

    return categoryMatch && woodTypeMatch && priceMatch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to products section
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, filter: 'blur(2px)', y: 40 },
    visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  // Helper motion wrapper
  function FadeInWhenVisible({ children, className = '', as = 'div', index = 0, ...props }: any) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-40px' });
  
    const Comp = as === 'section'
      ? motion.section
      : as === 'footer'
      ? motion.footer
      : motion.div;
  
    const safeIndex = typeof index === 'number' ? index : 0;
  
    const localVariants = {
      hidden: { opacity: 0, filter: 'blur(2px)', y: 40 },
      visible: {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        transition: {
          duration: 0.6,
          ease: 'easeOut',
          delay: safeIndex * 0.4,
        },
      },
    };
  
    return (
      <Comp
        ref={ref}
        className={className}
        variants={localVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        {...props}
      >
        {children}
      </Comp>
    );
  }
  

  return (
    <div className="">
        <HeroSection />

      
      {/* Products Section */}
      <FadeInWhenVisible as="section" id="products" className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-amber-300/20 to-yellow-200/20 rounded-full blur-3xl"
            style={{ transform: `translateY(${scrollY * -0.1}px)` }}
          />
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-300/20 to-yellow-200/20 rounded-full blur-3xl"
            style={{ transform: `translateY(${scrollY * -0.1}px)` }}
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeInWhenVisible className="text-center mb-16">
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
              Discover our curated collection of premium wooden furniture, 
              where traditional craftsmanship meets contemporary design
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible>
            <ProductFilter
              categories={categories}
              woodTypes={woodTypes}
              onFilterChange={handleFilterChange}
              currentFilters={filters}
            />
          </FadeInWhenVisible>

          {/* Results count */}
          <FadeInWhenVisible className="mb-8 text-center">
            <p className="text-gray-600 text-lg">
              <span className="font-bold text-amber-600">{filteredProducts.length}</span> products found
              {filteredProducts.length !== products.length && 
                ` from ${products.length} total products`
              }
            </p>
          </FadeInWhenVisible>

          {/* Products Grid */}
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {paginatedProducts.map((product, index) => (
                <FadeInWhenVisible key={product.id} index={index}>
                  <ProductCard product={product} index={index} />
                </FadeInWhenVisible>
              ))}
            </div>
          ) : (
            <FadeInWhenVisible className="text-center py-20">
              <div className="text-8xl mb-6">🔍</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                No Products Found
              </h3>
              <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
                We couldnt find any products matching your current filters. 
                Please try adjusting your search criteria.
              </p>
              <button
                onClick={() => setFilters({ category: 'all', woodType: 'all', priceRange: 'all' })}
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Show All Products
              </button>
            </FadeInWhenVisible>
          )}

          {/* Pagination */}
          <FadeInWhenVisible>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </FadeInWhenVisible>
        </div>
      </FadeInWhenVisible>

      {/* About Section */}
      <FadeInWhenVisible as="section" id="about" className="py-32 bg-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D2691E' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeInWhenVisible>
              <div className="flex items-center mb-6">
                <Award className="w-8 h-8 text-amber-500 mr-3" />
                <span className="text-amber-600 font-semibold tracking-wider uppercase text-sm">
                  About NobleWood
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 leading-tight">
                Crafting Excellence Since 
                <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent"> 2010</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                NobleWood has been at the forefront of premium wooden furniture craftsmanship for over a decade. 
                We specialize in creating exceptional pieces using the finest natural woods and modern techniques, 
                producing furniture that combines beauty, durability, and superior quality.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our philosophy is simple: every home deserves furniture that tells a story. 
                Using natural, beautiful wood, we transform living spaces into warm, 
                inviting, and inspiring environments that reflect your unique style.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { icon: <Clock className="w-6 h-6" />, number: "10+", label: "Years Experience" },
                  { icon: <Users className="w-6 h-6" />, number: "5000+", label: "Happy Customers" },
                  { icon: <Award className="w-6 h-6" />, number: "50+", label: "Awards Won" },
                  { icon: <Sparkles className="w-6 h-6" />, number: "100%", label: "Satisfaction" }
                ].map((stat, index) => (
                  <FadeInWhenVisible key={index} className="text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mx-auto mb-3 text-white">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-amber-700 mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </FadeInWhenVisible>
                ))}
              </div>
            </FadeInWhenVisible>
            <FadeInWhenVisible className="grid grid-cols-2 gap-4">
              {[
                "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
                "https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg",
                "https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg",
                "https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg"
              ].map((src, index) => (
                <FadeInWhenVisible key={index} className={`relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 ${index % 2 === 0 ? 'mt-8' : '-mt-8'}`} style={{ animationDelay: `${0.6 + index * 0.2}s`, transform: `translateY(${scrollY * (0.05 + index * 0.02)}px)` }}>
                  <img
                    src={src}
                    alt={`Craftsmanship ${index + 1}`}
                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </FadeInWhenVisible>
              ))}
            </FadeInWhenVisible>
          </div>
        </div>
      </FadeInWhenVisible>

      {/* Contact Section */}
      <FadeInWhenVisible as="section" id="contact" className="py-32 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-400/30 rounded-full animate-pulse"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + i * 8}%`,
                animationDelay: `${i * 0.3}s`,
                transform: `translateY(${scrollY * (0.05 + i * 0.02)}px)`,
              }}
            />
          ))}
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <FadeInWhenVisible>
            <div className="flex items-center justify-center mb-6">
              <Mail className="w-8 h-8 text-amber-500 mr-3 animate-pulse" />
              <span className="text-amber-600 font-semibold tracking-wider uppercase text-sm">
                Get In Touch
              </span>
              <Mail className="w-8 h-8 text-amber-500 ml-3 animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Lets Create Something 
              <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent"> Beautiful</span>
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Ready to transform your space with our handcrafted wooden furniture? 
              Contact us for consultation and custom orders.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ animationDelay: '0.3s' }}>
            {[
              {
                icon: <Phone className="w-8 h-8" />,
                title: "Call Us",
                info: "+1 (555) 123-4567",
                description: "Mon-Fri 9AM-6PM"
              },
              {
                icon: <Mail className="w-8 h-8" />,
                title: "Email Us",
                info: "hello@noblewood.com",
                description: "We reply within 24 hours"
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Visit Us",
                info: "123 Craft Street, Wood City",
                description: "Showroom & Workshop"
              }
            ].map((contact, index) => (
              <FadeInWhenVisible key={index} className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-amber-100" style={{ animationDelay: `${0.6 + index * 0.2}s` }}>
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <div className="text-white">
                    {contact.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-amber-700 transition-colors duration-300">
                  {contact.title}
                </h3>
                <p className="text-lg font-semibold text-amber-700 mb-2">{contact.info}</p>
                <p className="text-gray-600">{contact.description}</p>
              </FadeInWhenVisible>
            ))}
          </FadeInWhenVisible>
        </div>
      </FadeInWhenVisible>

      {/* Footer */}
      <FadeInWhenVisible as="footer" className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeInWhenVisible className="text-center">
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
          </FadeInWhenVisible>
        </div>
      </FadeInWhenVisible>
    </div>
  );
}