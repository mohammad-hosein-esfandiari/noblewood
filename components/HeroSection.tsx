import Link from 'next/link';
import { ArrowDown, Sparkles, Award, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero-section  relative min-h-screen flex items-center justify-center overflow-hidden pb-32">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900"
        
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M50 30c11.046 0 20 8.954 20 20s-8.954 20-20 20-20-8.954-20-20 8.954-20 20-20zm0 5c-8.284 0-15 6.716-15 15s6.716 15 15 15 15-6.716 15-15-6.716-15-15-15z'/%3E%3C/g%3E%3C/svg%3E")`,
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none px-4 sm:px-6 lg:px-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-amber-300/30 rounded-full animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              transform: `translateY(${scrollY * (0.1 + i * 0.05)}px)`,
            }}
          />
        ))}
      </div>

      <div className="relative  z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Main Content */}
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

        {/* Features Grid */}
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
      </div>



      {/* Gradient Overlay */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent"></div> */}
    </section>
  );
}