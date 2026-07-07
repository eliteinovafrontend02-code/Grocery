// src/Components/pages/FreshProducts.jsx

import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  ChevronRight,
  Star,
  Heart,
  Truck,
  BadgePercent,
  Leaf,
  Grid,
  List,
  StarHalf,
  ChevronDown,
  Shield,
  Clock,
  Eye,
} from "lucide-react";
import { products, categories, getProductsByCategory } from "../data/FreshProductsData";

// Custom Fruit & Vegetable SVG Icons
const AppleIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20a7 7 0 0 1-7-7c0-2.5 1.5-5.5 4-7 1.2-.7 2.5-1 3-1 .5 0 1.8.3 3 1 2.5 1.5 4 4.5 4 7a7 7 0 0 1-7 7z" />
    <path d="M12 4c-.5-1.5-1.5-3-3-3" />
    <path d="M12 4c.5-1.5 1.5-3 3-3" />
    <path d="M8 14c.5 1 1.5 1.5 2.5 1.5" />
  </svg>
);

const OrangeIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="8" />
    <path d="M12 4c-.5-2-2-3.5-4-3" />
    <path d="M12 4c.5-2 2-3.5 4-3" />
    <path d="M8 12c.5 1.5 2 2 3.5 2" />
  </svg>
);

const LemonIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c-2.5 0-5 1.5-6 4-1 2.5 0 6 2 8.5s5.5 3 8 2c2.5-1 4-3.5 4-6s-1.5-5-3.5-7c-1.5-1-3-1.5-4.5-1.5z" />
    <path d="M12 2v2" />
    <path d="M18 6l-1.5 1.5" />
    <path d="M6 6l1.5 1.5" />
  </svg>
);

const BananaIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20c2-2 4-6 5-9.5S10 4 12 4c2 0 3.5 2 4 4.5s.5 6 1 8.5c.5 2.5 2 3 3 3" />
    <path d="M4 20c-1 0-2-.5-2-2s1-3 2-4" />
    <path d="M4 20c1 0 2 1 3 1s2-1 3-2" />
  </svg>
);

const WatermelonIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a8 8 0 0 0-8 8c0 4 3.5 8 8 8s8-4 8-8a8 8 0 0 0-8-8z" />
    <path d="M12 2v4" />
    <path d="M4 10h4" />
    <path d="M16 10h4" />
    <path d="M10 14l1 1" />
    <path d="M14 14l-1 1" />
  </svg>
);

const GrapeIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="2" />
    <circle cx="12" cy="6" r="2" />
    <circle cx="16" cy="8" r="2" />
    <circle cx="7" cy="12" r="2" />
    <circle cx="11" cy="12" r="2" />
    <circle cx="15" cy="12" r="2" />
    <circle cx="9" cy="16" r="2" />
    <circle cx="13" cy="16" r="2" />
    <circle cx="11" cy="20" r="2" />
  </svg>
);

const StrawberryIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c-2.5-1-4-4-4-7 0-3.5 1.5-6 4-7s4 3.5 4 7c0 3-1.5 6-4 7z" />
    <path d="M8 15c-1-1-1.5-2.5-1-4" />
    <path d="M16 15c1-1 1.5-2.5 1-4" />
    <circle cx="9" cy="10" r="1" />
    <circle cx="12" cy="9" r="1" />
    <circle cx="15" cy="10" r="1" />
  </svg>
);

const BlueberryIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="10" r="3" />
    <circle cx="14" cy="8" r="3" />
    <circle cx="6" cy="16" r="2" />
    <circle cx="12" cy="14" r="2" />
    <circle cx="18" cy="12" r="2" />
    <circle cx="10" cy="19" r="1.5" />
  </svg>
);

const PeachIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c-3-1-5-4-5-7 0-3.5 2-6 5-7s5 3.5 5 7c0 3-2 6-5 7z" />
    <path d="M12 8c-1-2-2.5-3.5-4-4" />
    <path d="M12 8c1-2 2.5-3.5 4-4" />
    <path d="M10 14c.5 1 1.5 1.5 2.5 1.5" />
  </svg>
);

const CherryIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="12" r="3" />
    <circle cx="16" cy="12" r="3" />
    <path d="M8 9c-.5-2-1-3-3-4" />
    <path d="M16 9c.5-2 1-3 3-4" />
    <path d="M11 12v8" />
    <path d="M13 12v8" />
  </svg>
);

// Vegetable Icons
const LettuceIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4c-2 0-4 1.5-5 3.5S6 11 8 12c2 1 4 0 5-1s2-4 1.5-5.5S14 4 12 4z" />
    <path d="M12 4c2 0 4 1.5 5 3.5S18 11 16 12c-2 1-4 0-5-1s-2-4-1.5-5.5S10 4 12 4z" />
    <path d="M8 12c-1.5 1-3 3-2.5 5s2.5 3 4 2.5" />
    <path d="M16 12c1.5 1 3 3 2.5 5s-2.5 3-4 2.5" />
  </svg>
);

const CucumberIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8c-1 2-.5 5 1.5 7s5 2 7 0 .5-5-1.5-7-5-2-7 0z" />
    <path d="M8 6c.5-1.5 2-2.5 3.5-2.5" />
    <path d="M16 6c-.5-1.5-2-2.5-3.5-2.5" />
    <circle cx="9" cy="10" r="0.5" fill="currentColor" />
    <circle cx="12" cy="11" r="0.5" fill="currentColor" />
    <circle cx="15" cy="10" r="0.5" fill="currentColor" />
  </svg>
);

const CornIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 4c-1 2-2 5-1.5 8s2.5 5 4.5 6c2 1 4 0 5-1.5s1-5-.5-7-3.5-4-5.5-5.5c-1.5-.5-2.5-.5-2 0z" />
    <path d="M12 4v2" />
    <path d="M12 10v2" />
    <path d="M12 16v2" />
    <path d="M8 8l1.5 1.5" />
    <path d="M16 8l-1.5 1.5" />
    <path d="M8 14l1.5-1.5" />
    <path d="M16 14l-1.5-1.5" />
  </svg>
);

const CarrotIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4c-.5-1.5-2-2.5-3.5-2" />
    <path d="M12 4c.5-1.5 2-2.5 3.5-2" />
    <path d="M8.5 6c-.5 1.5 0 3.5 1.5 4.5s3.5.5 4.5-1.5-1-3.5-2.5-4.5c-1-.5-2-.5-3.5 1.5z" />
    <path d="M6 12c-1 1.5-1 4 1 6s4.5 2 6 .5" />
    <path d="M18 12c1 1.5 1 4-1 6s-4.5 2-6 .5" />
    <path d="M10 14l1 1" />
    <path d="M14 14l-1 1" />
  </svg>
);

const OnionIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="6" />
    <path d="M12 6c-1-2-2.5-3-4-2.5" />
    <path d="M12 6c1-2 2.5-3 4-2.5" />
    <path d="M6 12c-2 1-3 2.5-2.5 4" />
    <path d="M18 12c2 1 3 2.5 2.5 4" />
    <path d="M8 8l-1.5-1.5" />
    <path d="M16 8l1.5-1.5" />
  </svg>
);

const GarlicIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4c-2 0-4 1.5-4.5 3.5S7 11 9 12.5s4 1 5.5-.5 1-4-.5-5.5S14 4 12 4z" />
    <path d="M12 4c2 0 4 1.5 4.5 3.5S17 11 15 12.5s-4 1-5.5-.5-1-4 .5-5.5S10 4 12 4z" />
    <path d="M9 12c-1.5 1-2.5 3-1.5 4.5s3 2 4.5.5" />
    <path d="M15 12c1.5 1 2.5 3 1.5 4.5s-3 2-4.5.5" />
  </svg>
);

const BroccoliIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8c-2 0-4 1-5 2.5S6 14 7 16s3 2 5 1 3-3 2.5-5-2-4-3.5-4.5c-1-.5-1.5-.5-2 0z" />
    <path d="M12 8c2 0 4 1 5 2.5S18 14 17 16s-3 2-5 1-3-3-2.5-5 2-4 3.5-4.5c1-.5 1.5-.5 2 0z" />
    <path d="M7 16c-1.5 1-3 2.5-2.5 4.5s2.5 3 4.5 1.5" />
    <path d="M17 16c1.5 1 3 2.5 2.5 4.5s-2.5 3-4.5 1.5" />
    <path d="M10 11l1-1" />
    <path d="M14 11l-1-1" />
  </svg>
);

const TomatoIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="13" r="7" />
    <path d="M12 6c-1-2-2.5-3.5-4-4" />
    <path d="M12 6c1-2 2.5-3.5 4-4" />
    <path d="M8 13c.5 1.5 2 2.5 3.5 2.5" />
    <path d="M16 13c-.5 1.5-2 2.5-3.5 2.5" />
    <path d="M10 9c.5-.5 1.5-1 2-1s1.5.5 2 1" />
  </svg>
);

const PepperIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 6c-1.5 1-2.5 3-2 5s2.5 3.5 4.5 3.5 3.5-1 4-3 .5-4-1-5-3-1.5-5.5-.5z" />
    <path d="M12 4v2" />
    <path d="M6 8l1.5 1.5" />
    <path d="M18 8l-1.5 1.5" />
    <path d="M6 14l1.5-1.5" />
    <path d="M18 14l-1.5-1.5" />
    <path d="M8 18c1.5 1 3.5 1.5 5 1s2.5-1.5 2-3" />
  </svg>
);

const AvocadoIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c-3-1-5.5-4.5-5.5-8 0-3 2-6 5.5-6s5.5 3 5.5 6c0 3.5-2.5 7-5.5 8z" />
    <circle cx="12" cy="14" r="3" />
    <path d="M12 8c-1-2-2.5-3.5-4-3.5" />
    <path d="M12 8c1-2 2.5-3.5 4-3.5" />
  </svg>
);

const MangoIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c-3-1-5-4-5-7 0-3.5 2-6 5-7s5 3.5 5 7c0 3-2 6-5 7z" />
    <path d="M12 8c-.5-1.5-2-3-3.5-3" />
    <path d="M12 8c.5-1.5 2-3 3.5-3" />
    <path d="M7 12c-1 1-1.5 2.5-1 4" />
    <path d="M17 12c1 1 1.5 2.5 1 4" />
  </svg>
);

const FreshProducts = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [wishlist, setWishlist] = useState([]);
  const [bannerIndex, setBannerIndex] = useState(0);

  // Banner Data
  const BANNERS = [
    {
      id: "fresh-fruits",
      title1: "Fresh Fruits",
      title2: "& Vegetables",
      copy: "From farm-fresh produce to daily essentials, everything you need, delivered fresh!",
      image: "/fresh-products/fbanner1.png",
      tags: [
        { icon: Leaf, label: "Farm Fresh", sub: "100% Natural" },
        { icon: Truck, label: "Free Delivery", sub: "On orders above ₹499" },
        { icon: BadgePercent, label: "Best Quality", sub: "Quality You Can Trust" },
      ],
    },
    {
      id: "organic-veg",
      title1: "Organic",
      title2: "Vegetables",
      copy: "Certified organic vegetables grown without pesticides. Healthy living starts here.",
      image: "/fresh-products/fbanner2.png",
      tags: [
        { icon: Leaf, label: "Organic", sub: "Chemical Free" },
        { icon: Truck, label: "Free Delivery", sub: "On orders above ₹499" },
        { icon: BadgePercent, label: "Great Prices", sub: "Up to 25% Off" },
      ],
    },
    {
      id: "exotic-fruits",
      title1: "Exotic",
      title2: "Fruits",
      copy: "Premium exotic fruits imported from around the world. Dragon fruit, Avocado & more.",
      image:"/fresh-products/fbanner3.png",
      tags: [
        { icon: Leaf, label: "Exotic", sub: "Imported Quality" },
        { icon: Truck, label: "Free Delivery", sub: "On orders above ₹499" },
        { icon: BadgePercent, label: "Special Price", sub: "Limited Time Offer" },
      ],
    },
  ];

  // Auto slide banners
  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % BANNERS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const goToBanner = (index) => {
    setBannerIndex(index);
  };

  const banner = BANNERS[bannerIndex];

  const filteredProducts = getProductsByCategory(selectedCategory);
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case "popular": return b.rating - a.rating;
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "discount": return b.discount - a.discount;
      default: return 0;
    }
  });

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);
    
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 animate-star-pop" style={{ animationDelay: `${i * 0.1}s` }} />
        ))}
        {hasHalfStar && <StarHalf className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 animate-star-pop" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-3.5 h-3.5 text-gray-300" />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#fdfcf9]">
     
      {/* Hero Banner - Smaller height */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pt-2">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-60 via-[#fdf6f0] to-green-80/50 transition-colors duration-700 w-full h-[260px] sm:h-[300px] md:h-[340px] lg:h-[380px]">

          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100/20 via-transparent to-green-100/20 animate-gradient-shift"></div>

          {/* Bottom Shade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-800/30 via-green-600/10 to-transparent pointer-events-none z-0"></div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-900/20 to-transparent pointer-events-none z-0"></div>

          {/* Corner blob shapes */}
          <div className="absolute -top-10 -right-10 w-28 h-28 md:w-36 md:h-36 bg-green-300/50 rounded-full pointer-events-none z-0 animate-blob-pulse" />
          <div className="absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 bg-green-400/30 rounded-bl-[3rem] pointer-events-none z-0 animate-blob-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute -bottom-10 -left-8 w-24 h-24 md:w-32 md:h-32 bg-orange-300/40 rounded-full pointer-events-none z-0 animate-blob-pulse" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-0 left-0 w-16 h-16 md:w-20 md:h-20 bg-orange-200/40 rounded-tr-[2.5rem] pointer-events-none z-0 animate-blob-pulse" style={{ animationDelay: "1.5s" }} />

          {/* Decorative dots */}
          <div className="absolute top-6 left-6 w-24 h-16 opacity-60 pointer-events-none z-0 animate-float-slow" style={{ backgroundImage: "radial-gradient(circle, #22c55e 1.5px, transparent 1.5px)", backgroundSize: "10px 10px" }} />
          <div className="absolute bottom-8 left-10 w-20 h-14 opacity-50 pointer-events-none z-0 animate-float-slow" style={{ animationDelay: "1s", backgroundImage: "radial-gradient(circle, #22c55e 1.5px, transparent 1.5px)", backgroundSize: "10px 10px" }} />
          <div className="absolute top-8 right-28 w-20 h-14 opacity-40 pointer-events-none z-0 animate-float-slow hidden md:block" style={{ animationDelay: "2s", backgroundImage: "radial-gradient(circle, #22c55e 1.5px, transparent 1.5px)", backgroundSize: "10px 10px" }} />

          {/* Floating Fruits & Vegetables - EXACT SAME POSITIONS & COLORS as leaves */}
          <AppleIcon className="absolute top-8 left-[36%] w-5 h-5 text-orange-600/40 pointer-events-none z-0 hidden sm:block animate-float-leaf-1" style={{ transform: 'scale(1.2)', transformOrigin: 'center' }} />
          <LettuceIcon className="absolute top-1/2 left-[40%] w-6 h-6 text-orange-600/30 pointer-events-none z-0 hidden md:block animate-float-leaf-2" style={{ transform: 'scale(1.1)', transformOrigin: 'center' }} />
          <OrangeIcon className="absolute bottom-10 left-[46%] w-5 h-5 text-orange-600/30 pointer-events-none z-0 hidden md:block animate-float-leaf-3" style={{ transform: 'scale(1.3)', transformOrigin: 'center' }} />
          <CarrotIcon className="absolute top-6 right-[38%] w-6 h-6 text-orange-600/30 pointer-events-none z-0 hidden md:block animate-float-leaf-4" style={{ transform: 'scale(1.2)', transformOrigin: 'center' }} />
          <LemonIcon className="absolute bottom-12 right-[20%] w-5 h-5 text-green-400/30 pointer-events-none z-0 hidden lg:block animate-float-leaf-5" style={{ transform: 'scale(1.1)', transformOrigin: 'center' }} />
          <CornIcon className="absolute top-1/3 left-[15%] w-7 h-7 text-orange-500/20 pointer-events-none z-0 hidden lg:block animate-float-leaf-6" style={{ transform: 'scale(1.1)', transformOrigin: 'center' }} />
          <BananaIcon className="absolute top-5 right-[35%] w-6 h-6 text-green-400/25 pointer-events-none z-0 animate-float-leaf-7" style={{ transform: 'scale(1.2)', transformOrigin: 'center' }} />
          <CucumberIcon className="absolute bottom-20 left-[30%] w-7 h-7 text-green-400/20 pointer-events-none z-0 animate-float-leaf-8" style={{ transform: 'scale(1.1)', transformOrigin: 'center' }} />
          <WatermelonIcon className="absolute top-2/3 left-[45%] w-5 h-5 text-green-300/30 pointer-events-none z-0 animate-float-leaf-9" style={{ transform: 'scale(1.2)', transformOrigin: 'center' }} />
          <GrapeIcon className="absolute top-1/4 right-[40%] w-7 h-7 text-orange-500/15 pointer-events-none z-0 animate-float-leaf-10" style={{ transform: 'scale(1.1)', transformOrigin: 'center' }} />
          <StrawberryIcon className="absolute bottom-1/3 right-[30%] w-6 h-6 text-green-400/20 pointer-events-none z-0 animate-float-leaf-11" style={{ transform: 'scale(1.2)', transformOrigin: 'center' }} />
          <BlueberryIcon className="absolute top-10 left-[45%] w-5 h-5 text-orange-400/35 pointer-events-none z-0 animate-float-leaf-12" style={{ transform: 'scale(1.1)', transformOrigin: 'center' }} />
          <PeachIcon className="absolute bottom-16 left-[8%] w-7 h-7 text-green-500/20 pointer-events-none z-0 animate-float-leaf-13" style={{ transform: 'scale(1.2)', transformOrigin: 'center' }} />
          <CherryIcon className="absolute top-1/2 right-[45%] w-6 h-6 text-green-500/25 pointer-events-none z-0 animate-float-leaf-14" style={{ transform: 'scale(1.1)', transformOrigin: 'center' }} />

          {/* Falling Fruits & Vegetables - EXACT SAME POSITIONS */}
          <AppleIcon className="absolute top-0 left-[12%] w-6 h-6 text-orange-500/30 pointer-events-none z-0 animate-falling-leaf-1" style={{ transform: 'scale(1.2)', transformOrigin: 'center' }} />
          <LettuceIcon className="absolute top-0 right-[18%] w-5 h-5 text-green-400/25 pointer-events-none z-0 animate-falling-leaf-2" style={{ transform: 'scale(1.1)', transformOrigin: 'center' }} />
          <OrangeIcon className="absolute top-0 left-[45%] w-7 h-7 text-green-400/20 pointer-events-none z-0 animate-falling-leaf-3" style={{ transform: 'scale(1.2)', transformOrigin: 'center' }} />
          <CarrotIcon className="absolute top-0 right-[8%] w-5 h-5 text-orange-600/25 pointer-events-none z-0 animate-falling-leaf-4" style={{ transform: 'scale(1.1)', transformOrigin: 'center' }} />
          <LemonIcon className="absolute top-0 left-[70%] w-6 h-6 text-green-400/20 pointer-events-none z-0 animate-falling-leaf-5" style={{ transform: 'scale(1.2)', transformOrigin: 'center' }} />

          {/* Spinning Fruits & Vegetables */}
          <CornIcon className="absolute top-1/3 left-[60%] w-7 h-7 text-orange-400/20 pointer-events-none z-0 animate-spin-leaf-1" style={{ transform: 'scale(1.1)', transformOrigin: 'center' }} />
          <BananaIcon className="absolute bottom-1/4 right-[60%] w-6 h-6 text-green-300/25 pointer-events-none z-0 animate-spin-leaf-2" style={{ transform: 'scale(1.2)', transformOrigin: 'center' }} />
          <CucumberIcon className="absolute top-1/2 left-[75%] w-5 h-5 text-green-400/30 pointer-events-none z-0 animate-spin-leaf-3" style={{ transform: 'scale(1.1)', transformOrigin: 'center' }} />

          {/* Bouncing Fruits & Vegetables */}
          <WatermelonIcon className="absolute bottom-8 right-[40%] w-6 h-6 text-orange-400/30 pointer-events-none z-0 animate-bounce-leaf-1" style={{ transform: 'scale(1.2)', transformOrigin: 'center' }} />
          <GrapeIcon className="absolute top-12 left-[55%] w-5 h-5 text-green-300/25 pointer-events-none z-0 animate-bounce-leaf-2" style={{ transform: 'scale(1.1)', transformOrigin: 'center' }} />
          <StrawberryIcon className="absolute bottom-20 left-[60%] w-7 h-7 text-green-400/20 pointer-events-none z-0 animate-bounce-leaf-3" style={{ transform: 'scale(1.2)', transformOrigin: 'center' }} />

          {/* Shimmer effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer pointer-events-none z-0"></div>

          {/* Left Content */}
          <div className="absolute left-4 sm:left-8 md:left-16 lg:left-40 top-1/2 -translate-y-1/2 z-10 max-w-[45%] sm:max-w-[42%] md:max-w-[38%]">
            <p className="banner-script text-3xl sm:text-4xl md:text-5xl text-green-600 leading-none mb-1 animate-slide-up">
              {banner.title1}
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-orange-700 leading-tight mb-2 sm:mb-3 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              {banner.title2}
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 max-w-md animate-slide-up" style={{ animationDelay: "0.2s" }}>
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
                    <tag.icon className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
                  </div>
                  <div className="leading-tight">
                    <p className="text-[11px] sm:text-sm font-semibold text-gray-700">{tag.label}</p>
                    <p className="text-[9px] sm:text-xs text-gray-500">{tag.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            
          </div>

          {/* Right Content - Image */}
          <div className="absolute right-0 sm:right-1 md:right-6 lg:right-15 top-1/2 -translate-y-1/2 z-10 w-[58%] sm:w-[55%] md:w-[52%] lg:w-[50%] flex items-center justify-center h-full">
            <div className="animate-scale-in w-full h-full flex items-center justify-center">
              <img
                src={banner.image}
                alt={banner.title1}
                className="w-[120%] h-[120%] sm:w-[130%] sm:h-[130%] md:w-[140%] md:h-[140%] lg:w-[140%] lg:h-[100%] object-contain hover-scale "
              />
            </div>
          </div>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {BANNERS.map((b, i) => (
              <button
                key={b.id}
                onClick={() => goToBanner(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === bannerIndex ? "w-6 bg-orange-600 animate-dot-expand" : "w-2 bg-white/70 hover:bg-white/90"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Bar - Mixed Theme Colors (Orange & Green) */}
<section className="w-full px-4 sm:px-6 lg:px-8 mt-6 mb-8">
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
    {[
      { icon: Truck, title: "Free Delivery", sub: "Above ₹499", bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-100", hover: "group-hover:text-orange-700", accent: "bg-orange-100/30", hoverAccent: "group-hover:bg-orange-200/40" },
      { icon: Shield, title: "100% Fresh", sub: "Quality Guaranteed", bg: "bg-green-50", text: "text-green-600", border: "border-green-100", hover: "group-hover:text-green-700", accent: "bg-green-100/30", hoverAccent: "group-hover:bg-green-200/40" },
      { icon: Clock, title: "Same Day", sub: "Delivery Available", bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-100", hover: "group-hover:text-orange-700", accent: "bg-orange-100/30", hoverAccent: "group-hover:bg-orange-200/40" },
      { icon: Leaf, title: "Organic", sub: "Certified Organic", bg: "bg-green-50", text: "text-green-600", border: "border-green-100", hover: "group-hover:text-green-700", accent: "bg-green-100/30", hoverAccent: "group-hover:bg-green-200/40" },
    ].map((f, index) => (
      <div 
        key={f.title} 
        className={`group relative overflow-hidden bg-white px-4 py-4 rounded-2xl shadow-sm border ${f.border} hover:shadow-lg transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] animate-slide-up cursor-pointer`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {/* Animated gradient overlay on hover - Mixed colors */}
        <div className={`absolute inset-0 bg-gradient-to-r from-${f.bg.split('-')[1]}-50/0 via-${f.bg.split('-')[1]}-100/0 to-${f.bg.split('-')[1]}-50/0 group-hover:from-${f.bg.split('-')[1]}-50/40 group-hover:via-${f.bg.split('-')[1]}-100/30 group-hover:to-${f.bg.split('-')[1]}-50/40 transition-all duration-700`}></div>
        
        {/* Shine effect */}
        <div className={`absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-${f.bg.split('-')[1]}-200/20 to-transparent`}></div>
        
        <div className="relative z-10 flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${f.bg} group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
            <f.icon className={`w-5 h-5 ${f.text} group-hover:scale-110 transition-transform duration-300`} />
          </div>
          <div>
            <p className={`text-sm font-semibold text-gray-800 ${f.hover} transition-colors duration-300`}>{f.title}</p>
            <p className="text-xs text-gray-400 group-hover:text-gray-500 transition-colors duration-300">{f.sub}</p>
          </div>
        </div>
        
        {/* Decorative corner accent */}
        <div className={`absolute -top-1 -right-1 w-8 h-8 ${f.accent} rounded-bl-2xl ${f.hoverAccent} transition-colors duration-300`}></div>
      </div>
    ))}
  </div>
</section>

  {/* Breadcrumb with gradient */}
<div className="max-w-auto mx-auto px-4 sm:px-6 lg:px-8 ">
  <div className="flex items-center gap-2 text-sm py-4 animate-slide-up">
    <span className="text-orange-400 hover:text-emerald-500 cursor-pointer transition-all duration-300 hover:translate-x-1 hover:scale-105">Home</span>
    <span className="text-gray-600 animate-pulse-slow">/</span>
    <span className="text-emerald-500 font-medium bg-emerald-50 px-3 py-1 rounded-full hover:scale-105 transition-transform duration-300">Fresh Products</span>
    <span className="ml-auto text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full animate-pulse-slow hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-300">
      {products.length} Products Available
    </span>
  </div>
</div>

{/* Main Content */}
<div className="max-w-auto mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-gradient-to-b from-orange-50 to-orange-100">
  
  {/* Premium Category Navigation */}
  <div className="relative mb-8">
    <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
      {categories.map((cat, index) => (
        <button
          key={cat.id}
          onClick={() => setSelectedCategory(cat.id)}
          className={`relative flex items-center gap-2.5 px-5 py-2.5 rounded-2xl whitespace-nowrap transition-all duration-500 animate-slide-up ${
            selectedCategory === cat.id
              ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-200/50 scale-105"
              : "bg-white backdrop-blur-sm text-gray-600 hover:bg-white hover:text-emerald-700 border border-gray-100 hover:border-emerald-200 hover:shadow-md hover:scale-105"
          }`}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <span className={`text-xl ${selectedCategory === cat.id ? 'animate-float' : 'group-hover:animate-bounce-slow'}`}>{cat.icon}</span>
          <span className="text-sm font-medium">{cat.name}</span>
          {cat.id !== "all" && (
            <span className={`text-xs px-2 py-0.5 rounded-full transition-all duration-300 ${
              selectedCategory === cat.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500 group-hover:bg-emerald-100 group-hover:text-emerald-600"
            }`}>
              {products.filter(p => p.category === cat.id).length}
            </span>
          )}
          {selectedCategory === cat.id && (
            <>
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-ping"></span>
              <span className="absolute inset-0 rounded-2xl animate-pulse-slow bg-white/10"></span>
            </>
          )}
        </button>
      ))}
    </div>
    {/* Gradient fade */}
    <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
  </div>

  {/* Premium Filters and Controls */}
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm animate-slide-up hover:shadow-md transition-shadow duration-300">
    <p className="text-sm text-gray-600 animate-slide-up">
      Showing <span className="font-bold text-emerald-700 text-base animate-pulse-slow">{sortedProducts.length}</span> premium products
    </p>

    <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
      <div className="relative flex-1 sm:flex-none animate-slide-up group" style={{ animationDelay: "0.1s" }}>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full sm:w-auto appearance-none bg-white border-2 border-gray-100 rounded-xl px-5 py-2.5 pr-10 text-sm text-gray-700 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 cursor-pointer hover:border-emerald-300 transition-all duration-300 hover:shadow-md"
        >
          <option value="popular">⭐ Most Popular</option>
          <option value="price-low">💰 Price: Low to High</option>
          <option value="price-high">💰 Price: High to Low</option>
          <option value="discount">🏷️ Best Discounts</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-hover:text-emerald-500 transition-colors duration-300 group-hover:rotate-180" />
      </div>

      <div className="flex items-center bg-white border-2 border-gray-100 rounded-xl overflow-hidden animate-slide-up shadow-sm hover:shadow-md transition-shadow duration-300" style={{ animationDelay: "0.2s" }}>
        <button
          onClick={() => setViewMode("grid")}
          className={`p-2.5 transition-all duration-500 ${
            viewMode === "grid" 
              ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white scale-110 shadow-lg shadow-emerald-200" 
              : "text-gray-500 hover:bg-gray-50 hover:text-emerald-600 hover:scale-110"
          }`}
        >
          <Grid className="w-4 h-4" />
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`p-2.5 transition-all duration-500 ${
            viewMode === "list" 
              ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white scale-110 shadow-lg shadow-emerald-200" 
              : "text-gray-500 hover:bg-gray-50 hover:text-emerald-600 hover:scale-110"
          }`}
        >
          <List className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>

  {/* Premium Products Grid */}
  <div className={`grid ${
    viewMode === "grid" 
      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" 
      : "grid-cols-1"
  } gap-5 md:gap-7`}>
    {sortedProducts.map((product, index) => (
      <div
        key={product.id}
        className={`group relative bg-gradient-to-br from-emerald-50/80 via-white to-orange-50/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 animate-scale-in border border-white/50 hover:border-emerald-200 ${
          viewMode === "grid" ? "" : "flex items-center gap-6 p-5"
        }`}
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        {viewMode === "grid" ? (
          <>
            {/* Premium Card Design */}
            <div className="relative overflow-hidden">
              {/* Background gradient - Light theme colors */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-emerald-100/30 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Animated gradient orb */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-200/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-150 group-hover:animate-spin-slow"></div>
              
              {/* Second decorative element */}
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-200/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-150"></div>
              
              {/* Image container with premium overlay */}
              <div className="relative p-2 overflow-hidden">
                {product.discount > 0 && (
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-lg shadow-orange-200 animate-pulse-slow hover:animate-bounce-slow">
                    {product.discount}% OFF
                  </span>
                )}
                
                {product.isOrganic && (
                  <span className="absolute top-3 right-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-lg shadow-emerald-200 animate-bounce-slow hover:animate-pulse-slow">
                    🌿 Organic
                  </span>
                )}

                <div className="relative overflow-hidden rounded-xl">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  
                  {/* Image overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -skew-x-12 group-hover:translate-x-full"></div>

                {/* Premium action buttons */}
                <div className="absolute bottom-3 right-3 flex flex-col gap-2">
                  <button 
                    onClick={() => toggleWishlist(product.id)}
                    className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:rotate-12"
                  >
                    <Heart className={`w-4 h-4 transition-colors ${
                      wishlist.includes(product.id) ? "fill-red-500 text-red-500 animate-pulse-slow" : "text-gray-600 group-hover:text-red-500"
                    }`} />
                  </button>
                  
                  <button 
                    className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:-rotate-12"
                  >
                    <Eye className="w-4 h-4 text-gray-600 group-hover:text-emerald-600" />
                  </button>
                </div>
              </div>

              {/* Premium product info */}
              <div className="p-4 relative">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 group-hover:text-emerald-600 transition-colors duration-300 group-hover:translate-x-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-1 group-hover:text-emerald-500 transition-colors duration-300">{product.origin}</p>
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all duration-300">
                    {product.unit}
                  </span>
                </div>
                
                <div className="flex items-center gap-1.5 mb-2">
                  {renderStars(product.rating)}
                  <span className="text-xs text-gray-400 ml-1 group-hover:text-emerald-500 transition-colors duration-300">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-emerald-700 group-hover:scale-110 transition-transform duration-300 inline-block">
                      ₹{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through group-hover:text-red-400 transition-colors duration-300">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  <button
                    className={`p-2.5 rounded-xl transition-all duration-300 ${
                      product.inStock 
                        ? "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg shadow-emerald-200 hover:shadow-xl hover:scale-110 hover:rotate-3 hover:animate-bounce-slow" 
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>

                {!product.inStock && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-2xl animate-fade-in">
                    <span className="text-sm font-semibold text-red-500 animate-pulse-slow">Out of Stock</span>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          // Premium List View
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-4 w-full group bg-gradient-to-r from-emerald-50/30 via-white to-orange-50/30 rounded-xl">
            <div className="relative flex-shrink-0">
              <div className="w-36 h-36 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                {product.discount > 0 && (
                  <span className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg animate-pulse-slow">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-emerald-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110"></div>
            </div>
            
            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300 group-hover:translate-x-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-300">{product.description}</p>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <div className="flex items-center gap-1">
                      {renderStars(product.rating)}
                      <span className="text-xs text-gray-400 ml-1 group-hover:text-emerald-500 transition-colors duration-300">({product.reviews})</span>
                    </div>
                    <span className="text-xs text-gray-300">|</span>
                    <span className="text-xs text-gray-500 group-hover:text-emerald-500 transition-colors duration-300">📍 {product.origin}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline gap-2 justify-end">
                    <span className="text-2xl font-bold text-emerald-700 group-hover:scale-110 transition-transform duration-300 inline-block">
                      ₹{product.price}
                    </span>
                    <span className="text-sm text-gray-400">/{product.unit}</span>
                  </div>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through group-hover:text-red-400 transition-colors duration-300">₹{product.originalPrice}</span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 mt-3">
                {product.isOrganic && (
                  <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200 animate-pulse-slow hover:scale-105 transition-transform duration-300">
                    🌿 Organic
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="text-xs bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full border border-orange-200 hover:scale-105 transition-transform duration-300 hover:animate-bounce-slow">
                    🔥 {product.discount}% OFF
                  </span>
                )}
                <span className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-300 ${
                  product.inStock 
                    ? "bg-green-50 text-green-700 border-green-200 hover:scale-105 hover:shadow-md" 
                    : "bg-red-50 text-red-700 border-red-200 animate-pulse-slow"
                }`}>
                  {product.inStock ? "✅ In Stock" : "❌ Out of Stock"}
                </span>
                <button
                  className={`ml-auto px-6 py-2.5 rounded-xl transition-all duration-300 ${
                    product.inStock 
                      ? "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg shadow-emerald-200 hover:shadow-xl hover:scale-105 hover:rotate-1" 
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!product.inStock}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    ))}
  </div>

  {sortedProducts.length === 0 && (
    <div className="text-center py-16 animate-scale-in">
      <div className="text-7xl mb-6 animate-float hover:scale-110 transition-transform duration-300">🛒</div>
      <h3 className="text-2xl font-bold text-gray-700 mb-3 animate-pulse-slow">No products found</h3>
      <p className="text-gray-400">Try adjusting your filters or search terms</p>
      <button 
        onClick={() => setSelectedCategory('all')}
        className="mt-6 px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-200 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:rotate-1"
      >
        Reset Filters
      </button>
    </div>
  )}
</div>

      {/* Animation Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&display=swap');
        .banner-script { font-family: 'Dancing Script', cursive; }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes blobPulse {
          0%, 100% { transform: scale(1) rotate(0deg); }
          33% { transform: scale(1.1) rotate(10deg); }
          66% { transform: scale(0.9) rotate(-10deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        @keyframes dotExpand {
          0% { transform: scaleX(1); }
          50% { transform: scaleX(1.5); }
          100% { transform: scaleX(1); }
        }
        @keyframes iconFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes starPop {
          0% { transform: scale(0) rotate(-20deg); opacity: 0; }
          60% { transform: scale(1.3) rotate(10deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes iconBounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(5deg); }
        }
        @keyframes imageFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.02); }
        }

        /* Leaf/Fruit Animation Keyframes */
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

        .animate-slide-up { animation: slideUp 0.6s ease-out forwards; opacity: 0; }
        .animate-scale-in { animation: scaleIn 0.5s ease-out forwards; opacity: 0; }
        .animate-blob-pulse { animation: blobPulse 8s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 6s ease-in-out infinite; }
        .animate-dot-expand { animation: dotExpand 1s ease-in-out infinite; }
        .animate-icon-float { animation: iconFloat 3s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulseSlow 3s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounceSlow 2s ease-in-out infinite; }
        .animate-star-pop { animation: starPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; opacity: 0; }
        .animate-icon-bounce { animation: iconBounce 2s ease-in-out infinite; }
        .animate-gradient-shift { animation: gradientShift 10s ease-in-out infinite; background-size: 200% 200%; }
        .animate-float-slow { animation: floatSlow 8s ease-in-out infinite; }
        .animate-image-float { animation: imageFloat 4s ease-in-out infinite; }

        .hover-scale { transition: transform 0.3s ease; }
        .hover-scale:hover { transform: scale(1.05); }

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

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

/* Premium card hover effects */
.group:hover .group-hover\:animate-shimmer {
  animation: shimmer 1.5s infinite;
}

/* Glassmorphism effect */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Custom scrollbar for category nav */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}
      `}</style>
    </div>
  );
};

export default FreshProducts;