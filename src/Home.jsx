import React, { useState, useEffect } from "react";
import { useNavigate,NavLink } from "react-router-dom";
import {
  ShoppingCart,Carrot,UtensilsCrossed,Nut,Milk,ChevronRight,ChevronLeft,Star,Heart,Truck,RotateCcw,Lock,BadgePercent,Headphones,Leaf,
} from "lucide-react";

export default function Home() {

  const navigate = useNavigate();
  // Data
  const BANNERS = [
    {
      id: "fresh-products",
      title1: "Good Food",
      title2: "Good Life",
      copy: "From farm-fresh produce to daily essentials, everything you need, delivered fresh!",
      cta: "Shop Now",
      path:"/fresh-products",
      image: "/hbanner1.png",
      badgeLine1: "100%",
      badgeLine2: "Fresh & Natural",
      tags: [
        { icon: Leaf, label: "Farm Fresh", sub: "100% Natural" },
        { icon: Truck, label: "Free Delivery", sub: "On orders above ₹499" },
        { icon: BadgePercent, label: "Best Quality", sub: "Quality You Can Trust" },
      ],
    },

        {
      id: "kitchen-essentials",
      title1: "Cook With",
      title2: "Confidence",
      copy: "Oils, grains, staples and everyday must-haves — all in one place, always in stock.",
      cta: "Shop Now",
      path:"/kitchen-essentials",
      image: "/hbanner2.png",
      badgeLine1: "100%",
      badgeLine2: "Everyday Staples",
      tags: [
        { icon: UtensilsCrossed, label: "Daily Staples", sub: "Rice, Oil & More" },
        { icon: Truck, label: "Free Delivery", sub: "On orders above ₹499" },
        { icon: BadgePercent, label: "Bulk Savings", sub: "Buy More, Save More" },
      ],
    },
    {
      id: "spices-dryfruits",
      title1: "Pure Taste",
      title2: "Rich Aroma",
      copy: "Hand-picked spices and premium dry fruits sourced straight from trusted farms.",
      cta: "Shop Now",
       path:"/spices-dry-fruits",
      image: "/hbanner3.png",
      badgeLine1: "100%",
      badgeLine2: "Pure & Natural",
      tags: [
        { icon: Nut, label: "Premium Nuts", sub: "Handpicked Quality" },
        { icon: Leaf, label: "No Additives", sub: "Pure & Natural" },
        { icon: BadgePercent, label: "Great Prices", sub: "Up to 25% Off" },
      ],
    },
    {
      id: "dairy-snacks",
      title1: "Fresh Dairy",
      title2: "Happy Snacking",
      copy: "Farm-fresh milk, paneer and everyone's favourite snacks — delivered chilled and crisp.",
      cta: "Shop Now",
       path:"/dairy-snacks",
      image: "/hbanner4.png",
      badgeLine1: "100%",
      badgeLine2: "Farm to Fridge",
      tags: [
        { icon: Milk, label: "Fresh Dairy", sub: "Milk, Curd & Paneer" },
        { icon: Truck, label: "Cold Chain", sub: "Delivered Chilled" },
        { icon: BadgePercent, label: "Snack Deals", sub: "Up to 15% Off" },
      ],
    },
  ];

  const CATEGORIES = [
    { 
      name: "Fresh Products", 
      bg: "bg-green-50", 
      ring: "ring-green-200", 
      image: "/cfresh-products.png",
      link: "/fresh-products"
    },
    { 
      name: "Kitchen Essentials", 
      bg: "bg-orange-50", 
      ring: "ring-orange-200", 
      image: "/ckitchen-essentials.png",
      link: "/kitchen-essentials"
    },
    { 
      name: "Spices & Dry Fruits", 
      bg: "bg-amber-50", 
      ring: "ring-amber-200", 
      image: "/cspices_dryfruits.png",
      link: "/spices-dry-fruits"
    },
    { 
      name: "Dairy Products & Snacks", 
      bg: "bg-blue-50", 
      ring: "ring-blue-200", 
      image: "/cdairyproducts_snacks.png",
      link: "/dairy-snacks"
    },
  ];

  const FEATURES = [
    { icon: Truck, title: "Fast & Free Delivery", sub: "On orders above ₹499" },
    { icon: RotateCcw, title: "Easy Returns", sub: "7 days return policy" },
    { icon: Lock, title: "Secure Payments", sub: "100% secure checkout" },
    { icon: BadgePercent, title: "Best Price Guarantee", sub: "Get the best prices" },
    { icon: Headphones, title: "24/7 Customer Support", sub: "We are here to help" },
  ];

  // State
  const [bannerIndex, setBannerIndex] = useState(0);

  // Effects
  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Handlers
  const goToBanner = (index) => {
    setBannerIndex(index);
  };
  
  const prevBanner = () => {
    setBannerIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  };
  
  const nextBanner = () => {
    setBannerIndex((prev) => (prev + 1) % BANNERS.length);
  };

  const banner = BANNERS[bannerIndex];

  // Navigation handler
  const handleCategoryClick = (link) => {
  navigate(link);
};

  return (
    <div className="min-h-screen w-full bg-[#fdfcf9]">
     
{/* Hero Banner - Only Image Size Increased */}
<section className="w-full px-3 sm:px-6 lg:px-8 pt-2 mt-[9rem] sm:mt-32 md:mt-[8.5rem] lg:mt-[8.5rem] ">
  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-60 via-[#d0e6d8] to-green-80/50 transition-colors duration-700 w-full h-[200px] sm:h-[360px] md:h-[400px] lg:h-[480px]">

    {/* Animated Gradient Background */}
    <div className=" absolute inset-0 bg-gradient-to-br from-orange-100/20 via-transparent to-green-100/20 animate-gradient-shift"></div>

    {/* Bottom Shade - Theme Color Gradient */}
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-800/30 via-green-600/10 to-transparent pointer-events-none z-0"></div>
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-900/20 to-transparent pointer-events-none z-0"></div>

    {/* Corner blob shapes with pulse animation */}
    <div className="absolute -top-10 -right-10 w-28 h-28 md:w-36 md:h-36 bg-orange-300/50 rounded-full pointer-events-none z-0 animate-blob-pulse" />
    <div className="absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 bg-orange-400/30 rounded-bl-[3rem] pointer-events-none z-0 animate-blob-pulse" style={{ animationDelay: "1s" }} />
    <div className="absolute -bottom-10 -left-8 w-24 h-24 md:w-32 md:h-32 bg-green-300/40 rounded-full pointer-events-none z-0 animate-blob-pulse" style={{ animationDelay: "2s" }} />
    <div className="absolute bottom-0 left-0 w-16 h-16 md:w-20 md:h-20 bg-green-200/40 rounded-tr-[2.5rem] pointer-events-none z-0 animate-blob-pulse" style={{ animationDelay: "1.5s" }} />

    {/* Decorative floating dots with float animation */}
    <div className="hidden md:block absolute top-6 left-6 w-24 h-16 opacity-60 pointer-events-none z-0 animate-float-slow" style={{ backgroundImage: "radial-gradient(circle, #f4a13c 1.5px, transparent 1.5px)", backgroundSize: "10px 10px" }} />

    <div className="hidden md:block absolute bottom-8 left-10 w-20 h-14 opacity-50 pointer-events-none z-0 animate-float-slow" style={{ animationDelay: "1s", backgroundImage: "radial-gradient(circle, #f4a13c 1.5px, transparent 1.5px)", backgroundSize: "10px 10px" }} />
    
    <div className="hidden md:block absolute top-8 right-28 w-20 h-14 opacity-40 pointer-events-none z-0 animate-float-slow hidden md:block" style={{ animationDelay: "2s", backgroundImage: "radial-gradient(circle, #f4a13c 1.5px, transparent 1.5px)", backgroundSize: "10px 10px" }} />

    {/* Floating Leaves with elegant animations - 50% INCREASED SIZES */}
    <Leaf className="absolute top-8 left-[36%] w-6 h-6 text-green-600/40 pointer-events-none z-0 hidden sm:block animate-float-leaf" style={{ "--rot": "-15deg", animationDelay: "0s" }} />
    <Leaf className="absolute top-1/2 left-[40%] w-6 h-6 text-green-600/30 pointer-events-none z-0 hidden md:block animate-float-leaf" style={{ "--rot": "10deg", animationDelay: "1.5s" }} />
    <Leaf className="absolute bottom-10 left-[46%] w-5 h-5 text-green-600/30 pointer-events-none z-0 hidden md:block animate-float-leaf" style={{ "--rot": "20deg", animationDelay: "2s" }} />
    <Leaf className="absolute top-6 right-[38%] w-6 h-6 text-green-600/30 pointer-events-none z-0 hidden md:block animate-float-leaf" style={{ "--rot": "-25deg", animationDelay: "0.5s" }} />
    <Leaf className="absolute bottom-12 right-[20%] w-5 h-5 text-orange-400/30 pointer-events-none z-0 hidden lg:block animate-float-leaf" style={{ "--rot": "15deg", animationDelay: "1s" }} />
    <Leaf className="absolute top-1/3 left-[15%] w-7 h-7 text-green-500/20 pointer-events-none z-0 hidden lg:block animate-float-leaf" style={{ "--rot": "-30deg", animationDelay: "2.5s" }} />

    {/* Additional leaves with different colors and sizes - 50% INCREASED */}
    <Leaf className="absolute top-5 right-[35%] w-3 h-3 text-amber-400/25 pointer-events-none z-0 animate-float-leaf-16" />
    <Leaf className="hidden md:block absolute bottom-20 left-[30%] w-7 h-7 text-emerald-400/20 pointer-events-none z-0 animate-float-leaf-17" />
    <Leaf className="hidden md:block absolute top-2/3 left-[45%] w-5 h-5 text-orange-300/30 pointer-events-none z-0 animate-float-leaf-18" />
    <Leaf className="hidden md:block absolute top-1/4 right-[40%] w-8 h-8 text-green-500/15 pointer-events-none z-0 animate-float-leaf-19" />
    <Leaf className="hidden md:block absolute bottom-1/3 right-[30%] w-6 h-6 text-yellow-400/20 pointer-events-none z-0 animate-float-leaf-20" />
    <Leaf className="hidden md:block absolute top-10 left-[45%] w-5 h-5 text-green-400/35 pointer-events-none z-0 animate-float-leaf-21" />
    <Leaf className="hidden md:block absolute bottom-16 left-[8%] w-7 h-7 text-amber-500/20 pointer-events-none z-0 animate-float-leaf-22" />
    <Leaf className="hidden md:block absolute top-1/2 right-[45%] w-6 h-6 text-emerald-500/25 pointer-events-none z-0 animate-float-leaf-23" />

    {/* Falling leaves - 50% INCREASED */}
    <Leaf className="absolute top-0 left-[12%] w-6 h-6 text-green-500/30 pointer-events-none z-0 animate-falling-leaf-1" />
    <Leaf className="absolute top-0 right-[18%] w-5 h-5 text-orange-400/25 pointer-events-none z-0 animate-falling-leaf-2" />
    <Leaf className="absolute top-0 left-[45%] w-7 h-7 text-amber-400/20 pointer-events-none z-0 animate-falling-leaf-3" />
    <Leaf className="absolute top-0 right-[8%] w-5 h-5 text-green-600/25 pointer-events-none z-0 animate-falling-leaf-4" />
    <Leaf className="absolute top-0 left-[70%] w-6 h-6 text-emerald-400/20 pointer-events-none z-0 animate-falling-leaf-5" />

    {/* Spinning leaves - 50% INCREASED */}
    <Leaf className="absolute top-1/3 left-[60%] w-7 h-7 text-green-400/20 pointer-events-none z-0 animate-spin-leaf-1" />
    <Leaf className="absolute bottom-1/4 right-[60%] w-6 h-6 text-orange-300/25 pointer-events-none z-0 animate-spin-leaf-2" />
    <Leaf className="absolute top-1/2 left-[75%] w-5 h-5 text-emerald-400/30 pointer-events-none z-0 animate-spin-leaf-3" />

    {/* Bouncing leaves - 50% INCREASED */}
    <Leaf className="absolute bottom-8 right-[40%] w-6 h-6 text-green-400/30 pointer-events-none z-0 animate-bounce-leaf-1" />
    <Leaf className="absolute top-12 left-[55%] w-5 h-5 text-orange-300/25 pointer-events-none z-0 animate-bounce-leaf-2" />
    <Leaf className="absolute bottom-20 left-[60%] w-7 h-7 text-emerald-400/20 pointer-events-none z-0 animate-bounce-leaf-3" />

    {/* Shimmer effect overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer pointer-events-none z-0"></div>

    {/* Left Content - Text Section with enhanced animations */}
    <div className="absolute left-4 sm:left-8 md:left-16 lg:left-40 top-1/2 -translate-y-1/2 z-10 max-w-[45%] sm:max-w-[42%] md:max-w-[38%]">
      <p className="banner-script text-3xl sm:text-4xl md:text-5xl text-orange-500 leading-none mb-1 animate-slide-up">
        {banner.title1}
      </p>
      <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-800 leading-tight mb-2 sm:mb-3 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        {banner.title2}
      </h1>
      <p className="hidden md:block text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 max-w-md animate-slide-up" style={{ animationDelay: "0.2s" }}>
        {banner.copy}
      </p>

      <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-5">
        {banner.tags.map((tag, i) => (
          <div 
            key={i} 
            className="flex items-center gap-1.5 sm:gap-2 animate-slide-up" 
            style={{ animationDelay: `${(i + 3) * 0.15}s` }}
          >
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover-scale shrink-0 animate-icon-float">
              <tag.icon className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
            </div>
            <div className="leading-tight">
              <p className="text-[11px] sm:text-sm font-semibold text-gray-700">{tag.label}</p>
              <p className="text-[9px] sm:text-xs text-gray-500">{tag.sub}</p>
            </div>
          </div>
        ))}
      </div>
      <NavLink to={banner.path}>
       <button className=" hidden md:block flex items-center gap-1 bg-green-700 hover:bg-green-800 transition-all duration-300 text-white text-sm sm:text-base font-medium px-5 sm:px-6  py-2 sm:py-2.5 rounded-full hover-scale animate-slide-up group" style={{ animationDelay: "0.5s" }}>
        {banner.cta}
       
       </button>
      </NavLink>
    
    </div>

    {/* Right Content - Image with INCREASED SIZE ONLY */}
    <div className="absolute right-3 sm:right-1 md:right-4 lg:right-10 top-1/2 -translate-y-1/2 z-10 w-[50%] sm:w-[55%] md:w-[52%] lg:w-[50%] flex items-center justify-center h-full">
      <div className="animate-scale-in w-full h-full flex items-center justify-center">
        <img
          src={banner.image}
          alt={banner.title1}
          className="w-[120%] h-[120%] sm:w-[130%] sm:h-[130%] md:w-[140%] md:h-[140%] lg:w-[150%] lg:h-[150%] object-contain hover-scale"
        />
      </div>
      
      {/* 100% Badge with Border, Shadow and Dancing Animation */}
      <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -right-1 sm:-right-2 md:-right-3 lg:-right-10 bg-white rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26 lg:w-28 lg:h-28 flex flex-col items-center justify-center text-center shadow-2xl animate-badge-dance p-[3px] bg-gradient-to-r from-green-300 via-orange-300 to-green-300">
        <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/10 rounded-full animate-ping-slow"></div>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-green-700 leading-none relative">{banner.badgeLine1}</p>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-gray-500 leading-tight mt-1 px-1.5 relative">{banner.badgeLine2}</p>
          </div>
        </div>
      </div>
    </div>

    {/* Arrows with hover animations */}
    <button 
      onClick={prevBanner} 
      aria-label="Previous banner" 
      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg z-20 transition-all duration-300 hover-scale hover:shadow-xl"
    >
      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
    </button>
    <button 
      onClick={nextBanner} 
      aria-label="Next banner" 
      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg z-20 transition-all duration-300 hover-scale hover:shadow-xl"
    >
      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
    </button>

    {/* Dots with enhanced animations */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
      {BANNERS.map((b, i) => (
        <button
          key={b.id}
          onClick={() => goToBanner(i)}
          aria-label={`Go to banner ${i + 1}`}
          className={`h-2 rounded-full transition-all duration-300 ${i === bannerIndex ? "w-6 bg-green-700 animate-dot-expand" : "w-2 bg-white/70 hover:bg-white/90"}`}
        />
      ))}
    </div>
  </div>
</section>

{/*  CATEGORY SECTION with Enhanced Animations */}
<section className="py-10 sm:py-12 md:py-14 px-4 sm:px-6 md:px-12 bg-[#e7e6e5] relative overflow-hidden">
  {/* Background animated elements */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-200/20 rounded-full animate-blob-pulse"></div>
    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-green-200/20 rounded-full animate-blob-pulse" style={{ animationDelay: '2s' }}></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-200/10 rounded-full animate-spin-slow"></div>
    
   
  </div>

  <div className="relative z-10 mx-auto">
    <div className="text-center mb-2 sm:mb-10 md:mb-12">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-light text-orange-400 tracking-[0.2em] text-gray-900 mb-4 animate-slide-down">
        SHOP BY CATEGORIES
      </h2>
      <div className="h-[1px] w-10 sm:w-12 bg-green-500 mx-auto animate-width-expand"></div>
     
    </div>

    <div className="grid grid-cols-2 gap-x-1 sm:flex sm:flex-row sm:gap-5 md:gap-10 justify-items-center sm:justify-center mx-auto">
      {CATEGORIES.map((cat, index) => (
        <div 
          key={cat.name}
          onClick={() => handleCategoryClick(cat.link)}
          className="group flex flex-col items-center cursor-pointer animate-category-card"
          style={{ animationDelay: `${index * 0.15}s` }}
        >
          {/* Glow ring effect */}
          <div className="relative p-1.5 rounded-full bg-gradient-to-tr from-green-300 via-orange-300 to-green-300 hover:from-green-400 hover:via-orange-400 hover:to-green-400 transition-all duration-1000 group-hover:rotate-180 shadow-lg hover:shadow-orange-200/50 group-hover:shadow-2xl">
            
            {/* Outer rotating ring */}
            <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-green-300/50 animate-spin-slow group-hover:animate-spin-fast"></div>
            
            {/* Inner pulsing ring */}
            <div className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-green-400/0 via-orange-400/20 to-green-400/0 opacity-0 group-hover:opacity-100 animate-pulse-ring"></div>
            
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-55 lg:h-55 rounded-full overflow-hidden border-[3px] border-white shadow-2xl transition-transform duration-1000 group-hover:rotate-[-180deg] bg-gradient-to-br from-green-100 via-amber-50 to-green-200">
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />
              
              {/* Overlay effects */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-500"></div>
              
              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -skew-x-12"></div>
              
              {/* Corner accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          <div className="mt-0 sm:mt-8 md:mt-10 text-center">
            {/* Decorative line above title */}
            <div className="w-0 h-0.5 bg-gradient-to-r from-green-400 via-amber-500 to-green-400 mx-auto group-hover:w-12 transition-all duration-700 mb-3"></div>
            
            <h3 className="text-base sm:text-2xl font-serif font-light text-green-600 tracking-wider mb-3 sm:mb-4 transition-all duration-300 group-hover:text-amber-700 group-hover:scale-105 group-hover:tracking-widest">
              {cat.name}
            </h3>
            
            {/* Animated underline with glow */}
            <div className="relative h-[1px] w-8 sm:w-10 md:w-12 bg-gray-300 mx-auto overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-amber-500 to-green-400 translate-x-[-100%] group-hover:translate-x-[0%] transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-amber-500 to-green-400 opacity-0 group-hover:opacity-50 blur-sm transition-opacity duration-700"></div>
            </div>
            
            {/* Hover arrow indicator */}
            <div className="mt-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <ChevronRight className="w-4 h-4 text-amber-600 mx-auto animate-bounce-x" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>



       {/* Animation Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Poppins:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
        .banner-script { font-family: 'Dancing Script', cursive; }
        .category-title { font-family: 'Playfair Display', serif; }
        .category-name { font-family: 'Poppins', sans-serif; }
        
        /* Elegant Float Animations */
        @keyframes floatY {
          0%, 100% { transform: translateY(0) rotate(var(--rot, 0deg)); }
          50% { transform: translateY(-12px) rotate(var(--rot, 0deg)); }
        }
        .float-leaf { animation: floatY 5s ease-in-out infinite; }
        .animate-float-leaf { 
          animation: floatY 6s ease-in-out infinite;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(5deg); }
        }
        .animate-float-slow {
          animation: floatSlow 8s ease-in-out infinite;
        }
        
        /* Blob Pulse Animation */
        @keyframes blobPulse {
          0%, 100% { transform: scale(1) rotate(0deg); }
          33% { transform: scale(1.1) rotate(10deg); }
          66% { transform: scale(0.9) rotate(-10deg); }
        }
        .animate-blob-pulse {
          animation: blobPulse 8s ease-in-out infinite;
        }
        
        /* Shimmer Animation */
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        .animate-shimmer {
          animation: shimmer 6s ease-in-out infinite;
        }
        
        /* Gradient Shift */
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-shift {
          animation: gradientShift 10s ease-in-out infinite;
          background-size: 200% 200%;
        }
        
        /* Icon Float */
        @keyframes iconFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-icon-float {
          animation: iconFloat 3s ease-in-out infinite;
        }
        
        /* Badge Dancing Animation with Curve */
        @keyframes badgeDance {
          0% { transform: translateY(-50%) rotate(0deg) scale(1); }
          10% { transform: translateY(-50%) rotate(-8deg) scale(1.05); }
          20% { transform: translateY(-50%) rotate(8deg) scale(0.95); }
          30% { transform: translateY(-50%) rotate(-5deg) scale(1.02); }
          40% { transform: translateY(-50%) rotate(5deg) scale(0.98); }
          50% { transform: translateY(-50%) rotate(-3deg) scale(1.03); }
          60% { transform: translateY(-50%) rotate(3deg) scale(0.97); }
          70% { transform: translateY(-50%) rotate(-2deg) scale(1.01); }
          80% { transform: translateY(-50%) rotate(2deg) scale(0.99); }
          90% { transform: translateY(-50%) rotate(-1deg) scale(1); }
          100% { transform: translateY(-50%) rotate(0deg) scale(1); }
        }
        .animate-badge-dance {
          animation: badgeDance 3s ease-in-out infinite;
        }
        
        /* Slow Spin for Inner Rings */
        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spinSlowReverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spinSlow 8s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spinSlowReverse 10s linear infinite;
        }
        
        /* Badge Pop Animation */
        @keyframes badgePop {
          0% { transform: translateY(-50%) scale(0) rotate(-20deg); opacity: 0; }
          60% { transform: translateY(-50%) scale(1.3) rotate(10deg); opacity: 1; }
          80% { transform: translateY(-50%) scale(0.9) rotate(-5deg); }
          100% { transform: translateY(-50%) scale(1) rotate(0deg); opacity: 1; }
        }
        .animate-badge-pop {
          animation: badgePop 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        
        /* Dot Expand */
        @keyframes dotExpand {
          0% { transform: scaleX(1); }
          50% { transform: scaleX(1.5); }
          100% { transform: scaleX(1); }
        }
        .animate-dot-expand {
          animation: dotExpand 1s ease-in-out infinite;
        }
        
        /* Ping Slow */
        @keyframes pingSlow {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .animate-ping-slow {
          animation: pingSlow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .animate-slide-up { animation: slideUp 0.6s ease-out; }
        .animate-fade-in { animation: fadeIn 0.8s ease-out; }
        .animate-scale-in { animation: scaleIn 0.5s ease-out; }
        .animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }
        
        .hover-scale { transition: transform 0.3s ease; }
        .hover-scale:hover { transform: scale(1.05); }
        
        .hover-lift { transition: all 0.3s ease; }
        .hover-lift:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Category card styles */
        .category-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        .category-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 20px 50px rgba(34, 197, 94, 0.2);
        }
        .category-card:hover img {
          transform: scale(1.1);
        }
        .category-card img {
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .category-card:hover .category-name {
          background: linear-gradient(to right, #15803d, #16a34a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Enhanced Leaf Float Animations - Different speeds and patterns */
        @keyframes floatLeaf1 {
          0%, 100% { transform: translateY(0) rotate(-5deg) scale(1); }
          50% { transform: translateY(-20px) rotate(15deg) scale(1.1); }
        }
        @keyframes floatLeaf2 {
          0%, 100% { transform: translateY(0) rotate(10deg) scale(1); }
          50% { transform: translateY(-15px) rotate(-20deg) scale(0.9); }
        }
        @keyframes floatLeaf3 {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          50% { transform: translateY(-25px) rotate(25deg) scale(1.2); }
        }
        @keyframes floatLeaf4 {
          0%, 100% { transform: translateY(0) rotate(-8deg) scale(1); }
          50% { transform: translateY(-18px) rotate(12deg) scale(1.05); }
        }
        @keyframes floatLeaf5 {
          0%, 100% { transform: translateY(0) rotate(15deg) scale(1); }
          50% { transform: translateY(-22px) rotate(-15deg) scale(0.85); }
        }
        @keyframes floatLeaf6 {
          0%, 100% { transform: translateY(0) rotate(-12deg) scale(1); }
          50% { transform: translateY(-12px) rotate(18deg) scale(1.15); }
        }
        @keyframes floatLeaf7 {
          0%, 100% { transform: translateY(0) rotate(5deg) scale(1); }
          50% { transform: translateY(-20px) rotate(-10deg) scale(0.95); }
        }
        @keyframes floatLeaf8 {
          0%, 100% { transform: translateY(0) rotate(-15deg) scale(1); }
          50% { transform: translateY(-15px) rotate(20deg) scale(1.1); }
        }
        @keyframes floatLeaf9 {
          0%, 100% { transform: translateY(0) rotate(8deg) scale(1); }
          50% { transform: translateY(-22px) rotate(-25deg) scale(0.9); }
        }
        @keyframes floatLeaf10 {
          0%, 100% { transform: translateY(0) rotate(-10deg) scale(1); }
          50% { transform: translateY(-18px) rotate(15deg) scale(1.05); }
        }
        @keyframes floatLeaf11 {
          0%, 100% { transform: translateY(0) rotate(12deg) scale(1); }
          50% { transform: translateY(-15px) rotate(-12deg) scale(0.95); }
        }
        @keyframes floatLeaf12 {
          0%, 100% { transform: translateY(0) rotate(-5deg) scale(1); }
          50% { transform: translateY(-20px) rotate(22deg) scale(1.1); }
        }
        @keyframes floatLeaf13 {
          0%, 100% { transform: translateY(0) rotate(20deg) scale(1); }
          50% { transform: translateY(-10px) rotate(-15deg) scale(1.2); }
        }
        @keyframes floatLeaf14 {
          0%, 100% { transform: translateY(0) rotate(-20deg) scale(1); }
          50% { transform: translateY(-15px) rotate(10deg) scale(0.85); }
        }
        @keyframes floatLeaf15 {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          50% { transform: translateY(-25px) rotate(-20deg) scale(1.15); }
        }
        @keyframes floatLeaf16 {
          0%, 100% { transform: translateY(0) rotate(-15deg) scale(1) skewX(0deg); }
          50% { transform: translateY(-25px) rotate(20deg) scale(1.15) skewX(5deg); }
        }
        @keyframes floatLeaf17 {
          0%, 100% { transform: translateY(0) rotate(25deg) scale(1); }
          50% { transform: translateY(-18px) rotate(-30deg) scale(0.85) skewX(-5deg); }
        }
        @keyframes floatLeaf18 {
          0%, 100% { transform: translateY(0) rotate(-10deg) scale(1) skewY(0deg); }
          50% { transform: translateY(-30px) rotate(15deg) scale(1.2) skewY(3deg); }
        }
        @keyframes floatLeaf19 {
          0%, 100% { transform: translateY(0) rotate(5deg) scale(1); }
          50% { transform: translateY(-22px) rotate(-25deg) scale(0.9) skewX(-8deg); }
        }
        @keyframes floatLeaf20 {
          0%, 100% { transform: translateY(0) rotate(-20deg) scale(1); }
          50% { transform: translateY(-15px) rotate(30deg) scale(1.1) skewY(4deg); }
        }
        @keyframes floatLeaf21 {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          50% { transform: translateY(-28px) rotate(-15deg) scale(1.25) skewX(6deg); }
        }
        @keyframes floatLeaf22 {
          0%, 100% { transform: translateY(0) rotate(15deg) scale(1); }
          50% { transform: translateY(-20px) rotate(-20deg) scale(0.88) skewY(-5deg); }
        }
        @keyframes floatLeaf23 {
          0%, 100% { transform: translateY(0) rotate(-8deg) scale(1); }
          50% { transform: translateY(-32px) rotate(25deg) scale(1.18) skewX(4deg); }
        }

        /* Falling Leaves Animation */
        @keyframes fallingLeaf1 {
          0% { transform: translateY(-20px) rotate(0deg) scale(0.5); opacity: 0; }
          20% { transform: translateY(20px) rotate(30deg) scale(0.8); opacity: 0.6; }
          50% { transform: translateY(80px) rotate(-45deg) scale(1); opacity: 1; }
          80% { transform: translateY(180px) rotate(60deg) scale(0.8); opacity: 0.6; }
          100% { transform: translateY(320px) rotate(-30deg) scale(0.3); opacity: 0; }
        }
        @keyframes fallingLeaf2 {
          0% { transform: translateY(-30px) rotate(-20deg) scale(0.4); opacity: 0; }
          30% { transform: translateY(40px) rotate(40deg) scale(0.7); opacity: 0.5; }
          60% { transform: translateY(120px) rotate(-50deg) scale(0.9); opacity: 0.8; }
          100% { transform: translateY(340px) rotate(70deg) scale(0.2); opacity: 0; }
        }
        @keyframes fallingLeaf3 {
          0% { transform: translateY(-10px) rotate(15deg) scale(0.6); opacity: 0; }
          25% { transform: translateY(30px) rotate(-35deg) scale(0.9); opacity: 0.7; }
          55% { transform: translateY(100px) rotate(45deg) scale(1.1); opacity: 1; }
          85% { transform: translateY(200px) rotate(-60deg) scale(0.7); opacity: 0.5; }
          100% { transform: translateY(350px) rotate(30deg) scale(0.2); opacity: 0; }
        }
        @keyframes fallingLeaf4 {
          0% { transform: translateY(-25px) rotate(-10deg) scale(0.5); opacity: 0; }
          35% { transform: translateY(50px) rotate(25deg) scale(0.8); opacity: 0.6; }
          65% { transform: translateY(140px) rotate(-40deg) scale(1); opacity: 0.9; }
          100% { transform: translateY(360px) rotate(55deg) scale(0.15); opacity: 0; }
        }
        @keyframes fallingLeaf5 {
          0% { transform: translateY(-15px) rotate(20deg) scale(0.4); opacity: 0; }
          40% { transform: translateY(60px) rotate(-30deg) scale(0.7); opacity: 0.5; }
          70% { transform: translateY(160px) rotate(50deg) scale(1); opacity: 0.8; }
          100% { transform: translateY(370px) rotate(-45deg) scale(0.2); opacity: 0; }
        }

        /* Spinning Leaf Animations */
        @keyframes spinLeaf1 {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); }
          25% { transform: translate(30px, -20px) rotate(90deg) scale(1.2); }
          50% { transform: translate(-20px, -40px) rotate(180deg) scale(0.8); }
          75% { transform: translate(20px, -15px) rotate(270deg) scale(1.1); }
          100% { transform: translate(0, 0) rotate(360deg) scale(1); }
        }
        @keyframes spinLeaf2 {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); }
          33% { transform: translate(-25px, -30px) rotate(-120deg) scale(1.3); }
          66% { transform: translate(15px, -25px) rotate(120deg) scale(0.7); }
          100% { transform: translate(0, 0) rotate(360deg) scale(1); }
        }
        @keyframes spinLeaf3 {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); }
          50% { transform: translate(-40px, -35px) rotate(180deg) scale(1.4); }
          100% { transform: translate(0, 0) rotate(360deg) scale(1); }
        }

        /* Bouncing Leaf Animations */
        @keyframes bounceLeaf1 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-30px) rotate(10deg); }
          50% { transform: translateY(0) rotate(-5deg); }
          75% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes bounceLeaf2 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          30% { transform: translateY(-25px) rotate(-15deg); }
          60% { transform: translateY(0) rotate(10deg); }
          85% { transform: translateY(-20px) rotate(-5deg); }
        }
        @keyframes bounceLeaf3 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          20% { transform: translateY(-35px) rotate(20deg); }
          45% { transform: translateY(0) rotate(-10deg); }
          70% { transform: translateY(-25px) rotate(15deg); }
        }

        /* Apply animations with different durations and delays */
        .animate-float-leaf-1 { animation: floatLeaf1 6s ease-in-out infinite; }
        .animate-float-leaf-2 { animation: floatLeaf2 5s ease-in-out infinite 0.5s; }
        .animate-float-leaf-3 { animation: floatLeaf3 7s ease-in-out infinite 1s; }
        .animate-float-leaf-4 { animation: floatLeaf4 5.5s ease-in-out infinite 0.3s; }
        .animate-float-leaf-5 { animation: floatLeaf5 6.5s ease-in-out infinite 1.5s; }
        .animate-float-leaf-6 { animation: floatLeaf6 4.5s ease-in-out infinite 0.8s; }
        .animate-float-leaf-7 { animation: floatLeaf7 5.8s ease-in-out infinite 0.2s; }
        .animate-float-leaf-8 { animation: floatLeaf8 6.2s ease-in-out infinite 1.2s; }
        .animate-float-leaf-9 { animation: floatLeaf9 5.3s ease-in-out infinite 0.7s; }
        .animate-float-leaf-10 { animation: floatLeaf10 6.8s ease-in-out infinite 1.8s; }
        .animate-float-leaf-11 { animation: floatLeaf11 5.2s ease-in-out infinite 0.4s; }
        .animate-float-leaf-12 { animation: floatLeaf12 7.2s ease-in-out infinite 0.9s; }
        .animate-float-leaf-13 { animation: floatLeaf13 4.8s ease-in-out infinite 1.4s; }
        .animate-float-leaf-14 { animation: floatLeaf14 6.1s ease-in-out infinite 0.1s; }
        .animate-float-leaf-15 { animation: floatLeaf15 5.6s ease-in-out infinite 1.1s; }
        .animate-float-leaf-16 { animation: floatLeaf16 5.4s ease-in-out infinite 0.6s; }
        .animate-float-leaf-17 { animation: floatLeaf17 6.7s ease-in-out infinite 1.3s; }
        .animate-float-leaf-18 { animation: floatLeaf18 4.9s ease-in-out infinite 0.9s; }
        .animate-float-leaf-19 { animation: floatLeaf19 7.1s ease-in-out infinite 1.6s; }
        .animate-float-leaf-20 { animation: floatLeaf20 5.7s ease-in-out infinite 0.4s; }
        .animate-float-leaf-21 { animation: floatLeaf21 6.3s ease-in-out infinite 1.8s; }
        .animate-float-leaf-22 { animation: floatLeaf22 5.1s ease-in-out infinite 0.7s; }
        .animate-float-leaf-23 { animation: floatLeaf23 6.9s ease-in-out infinite 1.4s; }

        .animate-falling-leaf-1 { animation: fallingLeaf1 8s ease-in-out infinite; }
        .animate-falling-leaf-2 { animation: fallingLeaf2 9s ease-in-out infinite 0.5s; }
        .animate-falling-leaf-3 { animation: fallingLeaf3 7.5s ease-in-out infinite 1s; }
        .animate-falling-leaf-4 { animation: fallingLeaf4 8.5s ease-in-out infinite 0.3s; }
        .animate-falling-leaf-5 { animation: fallingLeaf5 9.5s ease-in-out infinite 0.8s; }

        .animate-spin-leaf-1 { animation: spinLeaf1 12s ease-in-out infinite; }
        .animate-spin-leaf-2 { animation: spinLeaf2 14s ease-in-out infinite 0.5s; }
        .animate-spin-leaf-3 { animation: spinLeaf3 10s ease-in-out infinite 1s; }

        .animate-bounce-leaf-1 { animation: bounceLeaf1 3.5s ease-in-out infinite; }
        .animate-bounce-leaf-2 { animation: bounceLeaf2 4.2s ease-in-out infinite 0.7s; }
        .animate-bounce-leaf-3 { animation: bounceLeaf3 3.8s ease-in-out infinite 1.2s; }

        /* New Category Section Animations */

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-30px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-slide-down {
  animation: slideDown 0.8s ease-out forwards;
}

@keyframes fadeInDelayed {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-delayed {
  animation: fadeInDelayed 0.8s ease-out 0.3s forwards;
  opacity: 0;
}

@keyframes widthExpand {
  from { width: 0; }
  to { width: 48px; }
}
.animate-width-expand {
  animation: widthExpand 1s ease-out forwards;
}

@keyframes categoryCard {
  from { opacity: 0; transform: translateY(30px) scale(0.9); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.animate-category-card {
  animation: categoryCard 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  opacity: 0;
}

@keyframes pulseRing {
  0% { transform: scale(1); opacity: 0; }
  50% { transform: scale(1.1); opacity: 0.5; }
  100% { transform: scale(1); opacity: 0; }
}
.animate-pulse-ring {
  animation: pulseRing 2s ease-in-out infinite;
}

@keyframes bounceX {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(5px); }
}
.animate-bounce-x {
  animation: bounceX 1.5s ease-in-out infinite;
}

@keyframes spinFast {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.group-hover\:animate-spin-fast {
  animation: spinFast 1s linear infinite;
}

@keyframes floatParticle {
  0%, 100% { 
    transform: translateY(0) translateX(0) scale(1);
    opacity: 0.3;
  }
  25% { 
    transform: translateY(-20px) translateX(10px) scale(1.2);
    opacity: 0.6;
  }
  50% { 
    transform: translateY(-40px) translateX(-10px) scale(0.8);
    opacity: 0.9;
  }
  75% { 
    transform: translateY(-20px) translateX(5px) scale(1.1);
    opacity: 0.6;
  }
  100% { 
    transform: translateY(0) translateX(0) scale(1);
    opacity: 0.3;
  }
}
.animate-float-particle {
  animation: floatParticle ease-in-out infinite;
}

/* Enhanced Card Hover Effects */
.category-card {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.category-card:hover {
  transform: translateY(-8px) scale(1.02);
}
.category-card:hover .rounded-full {
  box-shadow: 0 20px 60px rgba(251, 146, 60, 0.3);
}

/* Smooth transitions for category elements */
.category-card * {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
      `}
      
      </style>
    </div>
  );
}