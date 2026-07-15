// About.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {Leaf,ShoppingBag,Truck,Users,Award,Shield,Star,Clock,Heart,Globe,Recycle,Gift,ArrowRight,BadgePercent,CheckCircle,Sparkles,ChevronRight,Zap,Crown,Coffee,Package,ThumbsUp,Play,Pause,Quote,Award as AwardIcon,
} from 'lucide-react';

const About = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

 
  

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Values Data
  const values = [
    { 
      icon: "🌿", 
      title: "100% Fresh", 
      desc: "Directly sourced from farms for maximum freshness",
      gradient: "from-emerald-400 to-emerald-600",
      background:"bg-emerald-50/80"
    },
    { 
      icon: "🛡️", 
      title: "Quality Guaranteed", 
      desc: "Rigorous quality checks before delivery",
      gradient: "from-blue-400 to-blue-600",
      background:"bg-orange-50/80"
    },
    { 
      icon: "🚚", 
      title: "Fast Delivery", 
      desc: "Same-day delivery in all major cities",
      gradient: "from-orange-400 to-orange-600",
      background:"bg-emerald-50/80"
    },
    { 
      icon: "♻️", 
      title: "Sustainable", 
      desc: "Eco-friendly packaging and sustainable practices",
      gradient: "from-green-400 to-green-600",
      background:"bg-orange-50/80"
    }
  ];

  // Categories Data
  const categories = [
    { 
      icon: "🥬", 
      label: "Fresh Products", 
      path: "/fresh-products", 
      bg: "from-emerald-50 to-emerald-100",
      color: "text-emerald-600",
      
    },
    { 
      icon: "🍳", 
      label: "Kitchen Essentials", 
      path: "/kitchen-essentials", 
      bg: "from-orange-50 to-orange-100",
      color: "text-orange-600"
    },
    { 
      icon: "🌶️", 
      label: "Spices & Dry Fruits", 
      path: "/spices-dry-fruits", 
      bg: "from-red-50 to-red-100",
      color: "text-red-600"
    },
    { 
      icon: "🧀", 
      label: "Dairy & Snacks", 
      path: "/dairy-snacks", 
      bg: "from-blue-50 to-blue-100",
      color: "text-blue-600"
    },
  ];

  // Testimonials Data
  const testimonials = [
    { quote: "The freshest groceries I've ever ordered online! The quality is amazing and delivery is always on time.", name: "Priya Sharma", role:"Regular Customer",rating: 5,},
    { quote: "I love the variety and the attention to quality. Every product feels premium and carefully selected.", name: "Rajesh Kumar", role: "Home Chef",rating: 5,},
    { quote: "Fast delivery and excellent customer service. Highly recommended for daily grocery needs!", name: "Ananya Reddy", role: "Loyal Customer",rating: 5,},

     { quote: "The freshest groceries I've ever ordered online! The quality is amazing and delivery is always on time.", name: "Priya Sharma", role:"Regular Customer",rating: 5,},
    { quote: "I love the variety and the attention to quality. Every product feels premium and carefully selected.", name: "Rajesh Kumar", role: "Home Chef",rating: 5,},
    { quote: "Fast delivery and excellent customer service. Highly recommended for daily grocery needs!", name: "Ananya Reddy", role: "Loyal Customer",rating: 5,},
     { quote: "The freshest groceries I've ever ordered online! The quality is amazing and delivery is always on time.", name: "Priya Sharma", role:"Regular Customer",rating: 5,},
    { quote: "I love the variety and the attention to quality. Every product feels premium and carefully selected.", name: "Rajesh Kumar", role: "Home Chef",rating: 5,},
    { quote: "Fast delivery and excellent customer service. Highly recommended for daily grocery needs!", name: "Ananya Reddy", role: "Loyal Customer",rating: 5,},

     { quote: "The freshest groceries I've ever ordered online! The quality is amazing and delivery is always on time.", name: "Priya Sharma", role:"Regular Customer",rating: 5,},
    { quote: "I love the variety and the attention to quality. Every product feels premium and carefully selected.", name: "Rajesh Kumar", role: "Home Chef",rating: 5,},
    { quote: "Fast delivery and excellent customer service. Highly recommended for daily grocery needs!", name: "Ananya Reddy", role: "Loyal Customer",rating: 5,},
     { quote: "The freshest groceries I've ever ordered online! The quality is amazing and delivery is always on time.", name: "Priya Sharma", role:"Regular Customer",rating: 5,},
    { quote: "I love the variety and the attention to quality. Every product feels premium and carefully selected.", name: "Rajesh Kumar", role: "Home Chef",rating: 5,},
    { quote: "Fast delivery and excellent customer service. Highly recommended for daily grocery needs!", name: "Ananya Reddy", role: "Loyal Customer",rating: 5,},
     { quote: "The freshest groceries I've ever ordered online! The quality is amazing and delivery is always on time.", name: "Priya Sharma", role:"Regular Customer",rating: 5,},
    { quote: "I love the variety and the attention to quality. Every product feels premium and carefully selected.", name: "Rajesh Kumar", role: "Home Chef",rating: 5,},
    { quote: "Fast delivery and excellent customer service. Highly recommended for daily grocery needs!", name: "Ananya Reddy", role: "Loyal Customer",rating: 5,},
    
  ];

  // Stats Data
  const stats = [
    { icon: Users, value: "50K+", label: "Happy Customers", color: "text-emerald-600" },
    { icon: ShoppingBag, value: "1M+", label: "Products Delivered", color: "text-orange-500" },
    { icon: Truck, value: "150+", label: "Cities Served", color: "text-emerald-600" },
    { icon: Award, value: "12", label: "Awards Won", color: "text-orange-500" },
  ];

   const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 6;
const totalPages = Math.ceil(testimonials.length / itemsPerPage);

const getCurrentTestimonials = () => {
  const start = (currentPage - 1) * itemsPerPage;
  return testimonials.slice(start, start + itemsPerPage);
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/30 via-white to-orange-50/30 pt-24 overflow-x-hidden">
      
      {/* 🏆 HERO BANNER - Full Width with Background Image */}
      <section className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/aboutbanner.png" 
            alt="Grocery Items" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-white/20 rounded-full animate-float-particle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 8}s`,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-20 py-20">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 mb-6 animate-fadeInUp">
              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-white/90 text-xs sm:text-sm font-medium tracking-wider">SINCE 2020</span>
              <span className="w-px h-4 bg-white/20"></span>
              <span className="text-emerald-300 text-xs font-medium">✦ Premium Quality</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mb-6 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
              Our <span className="bg-gradient-to-r from-emerald-300 via-orange-300 to-emerald-300 bg-clip-text text-transparent animate-gradient-shift">Fresh</span> Story
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
              Bringing farm-fresh, organic, and high-quality groceries straight to your doorstep with love and care.
            </p>

            <div className="flex flex-wrap justify-center gap-4 animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
              <Link to="/">
                <button className="group relative px-8 sm:px-10 py-3.5 sm:py-4 bg-white text-emerald-700 font-semibold rounded-full shadow-2xl hover:shadow-emerald-500/30 transition-all duration-500 hover:scale-105 flex items-center gap-3 overflow-hidden">
                  <span className="relative z-10">Explore Products</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-orange-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
              </Link>
              <Link to="/contact">
                <button className="px-8 sm:px-10 py-3.5 sm:py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  Get in Touch
                </button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 mt-10 animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center gap-3 text-white/70">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white/30 bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-xs font-bold text-white">
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-sm">10K+ Trusted</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
                ))}
                <span className="text-sm ml-2">4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-bounce">
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* 📊 STATS SECTION - Premium Cards with Alternating Colors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 animate-fadeInUp border hover:border-emerald-200/50 ${
                index % 2 === 0 
                  ? 'bg-gradient-to-br from-emerald-50/90 to-emerald-100/50 border-emerald-100/50' 
                  : 'bg-gradient-to-br from-orange-50/90 to-orange-100/50 border-orange-100/50'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg ${
                  index % 2 === 0 
                    ? 'bg-gradient-to-br from-emerald-100 to-emerald-200' 
                    : 'bg-gradient-to-br from-orange-100 to-orange-200'
                }`}>
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-orange-500 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 📖 OUR STORY - Premium Elegant Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-20 -mt-8 relative overflow-hidden">
        {/* Elegant Background with Soft Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-orange-50/70 to-emerald-50/90"></div>
        
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23065f46' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px"
        }}></div>

        {/* Elegant Floating Orbs */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl animate-pulse-slow"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="animate-fadeInUp">
              <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm px-6 py-2.5 rounded-full border border-white/60 shadow-lg hover:shadow-xl transition-all duration-500">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-emerald-700 text-xs sm:text-sm font-semibold tracking-widest uppercase">About Us</span>
                <span className="w-px h-5 bg-gradient-to-b from-emerald-300 to-orange-300"></span>
                <span className="text-orange-500 text-xs font-medium">✦ Premium Quality</span>
              </div>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-8 mb-4 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
              <span className="text-emerald-900">Where Freshness Meets</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-500 via-orange-400 to-emerald-500 bg-clip-text text-transparent animate-gradient-shift">Excellence</span>
            </h2>
            
            <div className="flex items-center justify-center gap-4 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-orange-500 rounded-full"></div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <div className="w-20 h-0.5 bg-gradient-to-r from-orange-500 to-transparent via-emerald-500 rounded-full"></div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* First Paragraph */}
              <div className="relative animate-fadeInUp group" style={{ animationDelay: "0.1s" }}>
                <div className="absolute -top-2 -left-3 text-6xl text-emerald-200/40 font-serif leading-none">"</div>
                <div className="relative pl-8">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    <span className="font-bold text-emerald-600 relative">
                      Grocery Items
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500 to-orange-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></span>
                    </span> 
                    was born from a simple yet powerful vision — to make fresh, organic, and high-quality groceries accessible to every household.
                  </p>
                </div>
              </div>
              
              {/* Second Paragraph */}
              <div className="relative animate-fadeInUp pl-8" style={{ animationDelay: "0.2s" }}>
                <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-emerald-400 via-orange-400 to-emerald-400 rounded-full"></div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  What started as a small local delivery service has grown into a trusted platform serving{' '}
                  <span className="relative inline-block">
                    <span className="font-bold text-emerald-600 relative z-10">50,000+</span>
                    <span className="absolute inset-0 bg-emerald-100/60 rounded-full blur-sm -z-0 transform scale-110"></span>
                  </span>{' '}
                  happy customers across India.
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 font-medium">4.9/5 Rating</span>
                </div>
              </div>
              
              {/* Third Paragraph */}
              <div className="animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
                <div className="relative bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/70 shadow-lg hover:shadow-xl transition-all duration-500 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-orange-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      We work directly with farmers and producers to bring you the finest quality products at the best prices.
                    </p>
                    <div className="flex items-center gap-3 mt-4">
                      <div className="flex items-center gap-2 text-emerald-600">
                        <Leaf className="w-4 h-4" />
                        <span className="text-sm font-medium">100% Fresh</span>
                      </div>
                      <span className="w-px h-4 bg-gray-200"></span>
                      <div className="flex items-center gap-2 text-orange-600">
                        <Shield className="w-4 h-4" />
                        <span className="text-sm font-medium">Quality Assured</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-2 gap-3 animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
                {[
                  { icon: "🌱", label: "Farm Fresh", color: "text-emerald-600", bg: "bg-emerald-50/100" },
                  { icon: "✅", label: "Quality Assured", color: "text-blue-600", bg: "bg-emerald-50/100" },
                  { icon: "🚚", label: "Free Delivery", color: "text-orange-600", bg: "bg-emerald-50/100" },
                  { icon: "❤️", label: "100% Satisfaction", color: "text-red-600", bg: "bg-emerald-50/100" },
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className={`${item.bg} backdrop-blur-sm rounded-xl p-3 flex items-center gap-3 transition-all duration-500 hover:scale-105 hover:shadow-lg cursor-pointer group border border-white/50`}
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                    <span className="text-sm font-semibold text-gray-700 group-hover:${item.color} transition-colors">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Back to Home Button */}
              <div className="animate-fadeInUp" style={{ animationDelay: "0.5s" }}>
                <Link to="/">
                  <button className="group relative px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 flex items-center gap-3 overflow-hidden">
                    <span className="relative z-10 font-medium tracking-wide">Back to Home</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 group-hover:rotate-12 transition-all duration-300 relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="relative animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
              {/* Decorative Elements */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-200/30 rounded-full blur-2xl animate-float-slow"></div>
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-orange-200/30 rounded-full blur-2xl animate-float-slow" style={{ animationDelay: "1.5s" }}></div>
              
              {/* Floating Badges */}
              <div className="absolute -top-4 -right-4 z-20 animate-float-slow" style={{ animationDelay: "0.5s" }}>
                <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-white/60">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                      <Leaf className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">100% Fresh</p>
                      <p className="text-[10px] text-gray-500">Farm to Table</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-2 -left-4 z-20 animate-float-slow" style={{ animationDelay: "1.2s" }}>
                <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-white/60">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                      <Truck className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">Free Delivery</p>
                      <p className="text-[10px] text-gray-500">Above ₹499</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Image */}
              <div className="relative bg-gradient-to-br from-emerald-50/90 to-orange-50/90 p-3 rounded-3xl shadow-2xl border border-white/60 hover:shadow-3xl transition-all duration-700 group">
                <div className="relative overflow-hidden rounded-2xl">
                  <img 
                    src="/abanner.png" 
                    alt="Our Story" 
                    className="w-full h-[300px] sm:h-[400px] object-cover transition-all duration-1000 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop";
                    }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  {/* Corner Decorations */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/30 rounded-tl-lg"></div>
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/30 rounded-tr-lg"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/30 rounded-bl-lg"></div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/30 rounded-br-lg"></div>
                </div>
                
                {/* Year Badge */}
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-3.5 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-lg">✦</span>
                    </div>
                    <div>
                      <p className="text-2xl font-bold leading-none">2020</p>
                      <p className="text-[10px] opacity-80 tracking-wider uppercase">Founded</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-600">10K+ Trusted</span>
                </div>
                <div className="w-px h-8 bg-gradient-to-b from-emerald-200 to-orange-200"></div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                  ))}
                  <span className="text-sm font-semibold text-gray-700 ml-1">4.9/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


{/* 💎 OUR VALUES - Premium Elegant Section */}
<section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-20 -mt-20 relative overflow-hidden">
  {/* Premium Animated Background */}
  <div className="absolute inset-0">
    {/* Base Gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-white/80 to-orange-50/40"></div>
    
    {/* Animated Gradient Orbs */}
    <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl animate-float-slow"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: "1.5s" }}></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-300/10 rounded-full blur-3xl animate-pulse-slow"></div>
    
    {/* Premium Pattern Overlay */}
    <div className="absolute inset-0 opacity-[0.03]" style={{ 
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23065f46' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundSize: "60px 60px"
    }}></div>
    
    {/* Floating Particles */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-emerald-400/20 rounded-full animate-float-particle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${8 + Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  </div>

  <div className="relative z-10 max-w-7xl mx-auto">
    {/* Premium Section Header */}
    <div className="text-center mb-16">
      <div className="animate-fadeInUp">
        <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-2.5 rounded-full border border-white/60 shadow-lg hover:shadow-xl transition-all duration-500">
          <span className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-orange-500 rounded-full animate-pulse"></span>
          <span className="text-emerald-700 text-xs sm:text-sm font-semibold tracking-widest uppercase">Core Values</span>
          <span className="w-px h-5 bg-gradient-to-b from-emerald-300 to-orange-300"></span>
          <span className="text-orange-500 text-xs font-medium">✦ Our Promise</span>
        </div>
      </div>
      
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-8 mb-4 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
        <span className="text-emerald-900">What We Stand</span>
        <br />
        <span className="bg-gradient-to-r from-emerald-500 via-orange-400 to-emerald-500 bg-clip-text text-transparent animate-gradient-shift">For</span>
      </h2>
      
      <div className="flex items-center justify-center gap-4 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-orange-500 rounded-full"></div>
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
        <div className="w-20 h-0.5 bg-gradient-to-r from-orange-500 to-transparent via-emerald-500 rounded-full"></div>
      </div>
      
      <p className="text-gray-500 mt-6 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
        Our values shape everything we do — from sourcing the freshest produce to delivering 
        quality groceries to your doorstep.
      </p>
    </div>

    {/* Premium Values Grid */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {values.map((value, index) => (
        <div
          key={index}
          className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 text-center shadow-xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-4 animate-fadeInUp border border-white/50 overflow-hidden  "
          style={{ animationDelay: `${index * 0.15}s` }}
        >

          {/* Premium background  */}
          <div className={`absolute inset-0 bg- ${value.background}  `}></div>
          
          {/* Premium Hover Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-700`}></div>
          
          {/* Glow Effect */}
          <div className={`absolute -inset-1 bg-gradient-to-r ${value.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700`}></div>
          
          {/* Corner Decorations */}
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-emerald-200/30 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-emerald-200/30 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10">
            {/* Premium Icon Container */}
            <div className="relative inline-block">
              {/* Icon Glow Ring */}
              <div className={`absolute inset-0 bg-gradient-to-r ${value.gradient} rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 scale-150`}></div>
              
              {/* Icon with Premium Animation */}
              <div className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mx-auto mb-5 text-5xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 shadow-xl group-hover:shadow-2xl`}>
                <span className="relative z-10">{value.icon}</span>
                {/* Inner Glow */}
                <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
            
            {/* Title with Hover Animation */}
            <h3 className="text-xl font-bold text-gray-800 mb-3 transition-all duration-300 group-hover:text-emerald-600 group-hover:scale-105">
              {value.title}
            </h3>
            
            {/* Description with Elegant Style */}
            <p className="text-sm text-gray-500 leading-relaxed transition-all duration-300 group-hover:text-gray-600">
              {value.desc}
            </p>
            
            {/* Animated Underline */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-orange-400 rounded-full group-hover:w-12 transition-all duration-500"></div>
              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="w-0 h-0.5 bg-gradient-to-r from-orange-400 to-emerald-400 rounded-full group-hover:w-12 transition-all duration-500"></div>
            </div>
          </div>

          {/* Hover Border Glow */}
          <div className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-emerald-200/50 transition-all duration-500`}></div>
          
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
      ))}
    </div>

    {/* Bottom Decorative Elements */}
    <div className="mt-16 text-center animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
      <div className="inline-flex flex-wrap items-center justify-center gap-4 text-gray-400 text-sm">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
          <span>Trusted by 50K+</span>
        </span>
        <span className="w-px h-4 bg-gray-200"></span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
          <span>Premium Quality</span>
        </span>
        <span className="w-px h-4 bg-gray-200"></span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
          <span>100% Satisfaction</span>
        </span>
      </div>
    </div>
  </div>
</section>

     {/* 🛒 OUR CATEGORIES - Premium Elegant Section with Rich Box Designs */}
<section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-20 -mt-20 relative overflow-hidden">
  {/* Premium Animated Background */}
  <div className="absolute inset-0">
    {/* Base Gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-white/60 to-orange-50/30"></div>
    
    {/* Animated Gradient Orbs */}
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-200/20 rounded-full blur-3xl animate-float-slow"></div>
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-200/20 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: "1.5s" }}></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-300/10 rounded-full blur-3xl animate-pulse-slow"></div>
    
    {/* Premium Pattern Overlay */}
    <div className="absolute inset-0 opacity-[0.02]" style={{ 
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23065f46' fill-opacity='0.4'%3E%3Cpath d='M50 10l-5-5-5 5 5 5 5-5zM10 50l-5-5-5 5 5 5 5-5zM30 30l-5-5-5 5 5 5 5-5zM70 30l-5-5-5 5 5 5 5-5zM50 50l-5-5-5 5 5 5 5-5zM30 70l-5-5-5 5 5 5 5-5zM70 70l-5-5-5 5 5 5 5-5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundSize: "80px 80px"
    }}></div>
    
    {/* Floating Particles */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full animate-float-particle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${10 + Math.random() * 12}s`,
            background: i % 2 === 0 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(251, 146, 60, 0.3)',
          }}
        />
      ))}
    </div>
  </div>

  <div className="relative z-10 max-w-7xl mx-auto">
    {/* Premium Section Header */}
    <div className="text-center mb-16">
      <div className="animate-fadeInUp">
        <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-2.5 rounded-full border border-white/60 shadow-lg hover:shadow-xl transition-all duration-500">
          <span className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-orange-500 rounded-full animate-pulse"></span>
          <span className="text-emerald-700 text-xs sm:text-sm font-semibold tracking-widest uppercase">Categories</span>
          <span className="w-px h-5 bg-gradient-to-b from-emerald-300 to-orange-300"></span>
          <span className="text-orange-500 text-xs font-medium">✦ Premium Selection</span>
        </div>
      </div>
      
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-8 mb-4 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
        <span className="text-emerald-900">Explore Our</span>
        <br />
        <span className="bg-gradient-to-r from-emerald-500 via-orange-400 to-emerald-500 bg-clip-text text-transparent animate-gradient-shift">Premium Grocery</span>
      </h2>
      
      <div className="flex items-center justify-center gap-4 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-orange-500 rounded-full"></div>
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
        <div className="w-20 h-0.5 bg-gradient-to-r from-orange-500 to-transparent via-emerald-500 rounded-full"></div>
      </div>
      
      <p className="text-gray-500 mt-6 max-w-2xl mx-auto animate-fadeInUp leading-relaxed" style={{ animationDelay: "0.3s" }}>
        Discover our curated collection of premium groceries, sourced directly from the finest farms and producers.
      </p>
    </div>

    {/* Premium Categories Grid with Unique Box Designs */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8">
      {/* Card 1 - Emerald Green Theme */}
      <Link to={categories[0].path}>
        <div className="group relative bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-3xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 animate-fadeInUp border-2 border-emerald-200/30 hover:border-emerald-400/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-emerald-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-emerald-300/30 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-emerald-300/30 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 scale-150"></div>
              <div className="text-5xl sm:text-6xl lg:text-7xl mx-auto mb-4 transition-all duration-700 group-hover:scale-110 group-hover:-rotate-3 group-hover:-translate-y-1 relative">
                {categories[0].icon}
              </div>
            </div>
            
            <p className="text-sm sm:text-base lg:text-lg font-bold text-emerald-700 transition-all duration-300 group-hover:scale-105">
              {categories[0].label}
            </p>
            
            <div className="mt-3 flex items-center justify-center gap-2">
              <div className="w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full group-hover:w-10 transition-all duration-500"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-150"></div>
              <div className="w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full group-hover:w-10 transition-all duration-500"></div>
            </div>
            
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-3 group-hover:translate-y-0">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full shadow-sm group-hover:bg-emerald-100 transition-all duration-300">
                Shop Now 
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </div>
          </div>
          
          <div className="absolute inset-0 rounded-3xl border-2 border-emerald-300/20 group-hover:border-emerald-400/50 transition-all duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-emerald-100/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
      </Link>

      {/* Card 2 - Orange Theme */}
      <Link to={categories[1].path}>
        <div className="group relative bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-3xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 animate-fadeInUp border-2 border-orange-200/30 hover:border-orange-400/50 overflow-hidden" style={{ animationDelay: "0.15s" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-400/20 to-orange-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-orange-300/30 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-orange-300/30 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 scale-150"></div>
              <div className="text-5xl sm:text-6xl lg:text-7xl mx-auto mb-4 transition-all duration-700 group-hover:scale-110 group-hover:rotate-3 group-hover:-translate-y-1 relative">
                {categories[1].icon}
              </div>
            </div>
            
            <p className="text-sm sm:text-base lg:text-lg font-bold text-orange-700 transition-all duration-300 group-hover:scale-105">
              {categories[1].label}
            </p>
            
            <div className="mt-3 flex items-center justify-center gap-2">
              <div className="w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full group-hover:w-10 transition-all duration-500"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-150"></div>
              <div className="w-0 h-0.5 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full group-hover:w-10 transition-all duration-500"></div>
            </div>
            
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-3 group-hover:translate-y-0">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-orange-600 bg-orange-50 px-4 py-1.5 rounded-full shadow-sm group-hover:bg-orange-100 transition-all duration-300">
                Shop Now 
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </div>
          </div>
          
          <div className="absolute inset-0 rounded-3xl border-2 border-orange-300/20 group-hover:border-orange-400/50 transition-all duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-100/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
      </Link>

      {/* Card 3 - Red Theme */}
      <Link to={categories[2].path}>
        <div className="group relative bg-gradient-to-br from-red-50 to-red-100/50 rounded-3xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 animate-fadeInUp border-2 border-red-200/30 hover:border-red-400/50 overflow-hidden" style={{ animationDelay: "0.3s" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-red-400/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-red-400/20 to-red-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-red-300/30 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-red-300/30 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 scale-150"></div>
              <div className="text-5xl sm:text-6xl lg:text-7xl mx-auto mb-4 transition-all duration-700 group-hover:scale-110 group-hover:-rotate-3 group-hover:-translate-y-1 relative">
                {categories[2].icon}
              </div>
            </div>
            
            <p className="text-sm sm:text-base lg:text-lg font-bold text-red-700 transition-all duration-300 group-hover:scale-105">
              {categories[2].label}
            </p>
            
            <div className="mt-3 flex items-center justify-center gap-2">
              <div className="w-0 h-0.5 bg-gradient-to-r from-red-400 to-red-600 rounded-full group-hover:w-10 transition-all duration-500"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-150"></div>
              <div className="w-0 h-0.5 bg-gradient-to-r from-red-600 to-red-400 rounded-full group-hover:w-10 transition-all duration-500"></div>
            </div>
            
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-3 group-hover:translate-y-0">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-red-600 bg-red-50 px-4 py-1.5 rounded-full shadow-sm group-hover:bg-red-100 transition-all duration-300">
                Shop Now 
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </div>
          </div>
          
          <div className="absolute inset-0 rounded-3xl border-2 border-red-300/20 group-hover:border-red-400/50 transition-all duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-red-100/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
      </Link>

      {/* Card 4 - Blue Theme */}
      <Link to={categories[3].path}>
        <div className="group relative bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-3xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 animate-fadeInUp border-2 border-blue-200/30 hover:border-blue-400/50 overflow-hidden" style={{ animationDelay: "0.45s" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-blue-300/30 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-blue-300/30 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 scale-150"></div>
              <div className="text-5xl sm:text-6xl lg:text-7xl mx-auto mb-4 transition-all duration-700 group-hover:scale-110 group-hover:rotate-3 group-hover:-translate-y-1 relative">
                {categories[3].icon}
              </div>
            </div>
            
            <p className="text-sm sm:text-base lg:text-lg font-bold text-blue-700 transition-all duration-300 group-hover:scale-105">
              {categories[3].label}
            </p>
            
            <div className="mt-3 flex items-center justify-center gap-2">
              <div className="w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full group-hover:w-10 transition-all duration-500"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-150"></div>
              <div className="w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full group-hover:w-10 transition-all duration-500"></div>
            </div>
            
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-3 group-hover:translate-y-0">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full shadow-sm group-hover:bg-blue-100 transition-all duration-300">
                Shop Now 
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </div>
          </div>
          
          <div className="absolute inset-0 rounded-3xl border-2 border-blue-300/20 group-hover:border-blue-400/50 transition-all duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-100/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
      </Link>
    </div>

    {/* Bottom Decorative Elements */}
    <div className="mt-16 text-center animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
      <div className="inline-flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
          <span>Premium Quality</span>
        </span>
        <span className="w-px h-4 bg-gray-200"></span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></span>
          <span>Farm Fresh</span>
        </span>
        <span className="w-px h-4 bg-gray-200"></span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></span>
          <span>Free Delivery</span>
        </span>
        <span className="w-px h-4 bg-gray-200"></span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: "1.5s" }}></span>
          <span>100% Satisfaction</span>
        </span>
      </div>
    </div>
  </div>
</section>

    {/* 🌟 TESTIMONIALS - Premium Elegant Section */}
<section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-20 -mt-20  relative overflow-hidden">
  {/* Premium Animated Background */}
  <div className="absolute inset-0">
    {/* Base Gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-white/60 to-orange-50/40"></div>
    
    {/* Animated Gradient Orbs */}
    <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-emerald-200/20 rounded-full blur-3xl animate-float-slow"></div>
    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-200/20 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: "1.5s" }}></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-300/10 rounded-full blur-3xl animate-pulse-slow"></div>
    
    {/* Premium Pattern Overlay */}
    <div className="absolute inset-0 opacity-[0.02]" style={{ 
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23065f46' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundSize: "60px 60px"
    }}></div>
    
    {/* Floating Particles */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full animate-float-particle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${10 + Math.random() * 12}s`,
            background: i % 2 === 0 ? 'rgba(16, 185, 129, 0.25)' : 'rgba(251, 146, 60, 0.25)',
          }}
        />
      ))}
    </div>
  </div>

  <div className="relative z-10 max-w-7xl mx-auto">
    {/* Premium Section Header */}
    <div className="text-center mb-16">
      <div className="animate-fadeInUp">
        <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-2.5 rounded-full border border-white/60 shadow-lg hover:shadow-xl transition-all duration-500">
          <span className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-orange-500 rounded-full animate-pulse"></span>
          <span className="text-emerald-700 text-xs sm:text-sm font-semibold tracking-widest uppercase">Testimonials</span>
          <span className="w-px h-5 bg-gradient-to-b from-emerald-300 to-orange-300"></span>
          <span className="text-orange-500 text-xs font-medium">✦ Real Stories</span>
        </div>
      </div>
      
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-8 mb-4 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
        <span className="text-emerald-900">What Our</span>
        <br />
        <span className="bg-gradient-to-r from-emerald-500 via-orange-400 to-emerald-500 bg-clip-text text-transparent animate-gradient-shift">Customers Say</span>
      </h2>
      
      <div className="flex items-center justify-center gap-4 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-orange-500 rounded-full"></div>
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
        <div className="w-20 h-0.5 bg-gradient-to-r from-orange-500 to-transparent via-emerald-500 rounded-full"></div>
      </div>
      
      <p className="text-gray-500 mt-6 max-w-2xl mx-auto animate-fadeInUp leading-relaxed" style={{ animationDelay: "0.3s" }}>
        Real feedback from our valued customers who trust us for their daily grocery needs.
      </p>
    </div>

    {/* Premium Testimonials Grid */}
    <div className="grid md:grid-cols-3 gap-6 md:gap-8">
      {getCurrentTestimonials().map((testimonial, index) => (
       <div 
          key={testimonial.id || index} 
          className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-3 animate-fadeInUp border border-white/50 overflow-hidden"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          {/* Premium Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-white to-orange-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/10 to-orange-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          {/* Quote Icon */}
          <div className="absolute -top-2 -right-2 text-6xl text-emerald-200/20 font-serif leading-none">"</div>
          <div className="absolute -bottom-2 -left-2 text-6xl text-orange-200/20 font-serif leading-none">"</div>
          
          {/* Decorative Corner Elements */}
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-emerald-200/20 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-emerald-200/20 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10">
            {/* Star Rating with Animation */}
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating || 5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 fill-orange-400 text-orange-400 transition-all duration-300 ${
                    i < 5 ? 'animate-star-pop' : ''
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            
            {/* Quote Text */}
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 italic group-hover:text-gray-800 transition-colors duration-300">
              "{testimonial.quote}"
            </p>
            
            {/* Customer Info */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100/50">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-orange-400 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-500">
                  {testimonial.name.charAt(0)}
                </div>
                {/* Ring Animation */}
                <div className="absolute inset-0 rounded-full border-2 border-emerald-400/30 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div>
                <p className="font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                  {testimonial.role}
                </p>
              </div>
            </div>
            
            {/* Trust Badge */}
            <div className="mt-4 flex items-center gap-2 text-emerald-600/60 text-xs">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Verified Purchase</span>
            </div>
          </div>
          
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
      ))}
    </div>

    {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm"
            >
              ← Previous
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-xl transition-all duration-300 text-sm ${
                  currentPage === i + 1
                    ? 'bg-gradient-to-r from-emerald-500 to-orange-500 text-white shadow-lg'
                    : 'bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-emerald-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm"
            >
              Next →
            </button>
          </div>
        )}
        

    {/* Bottom Decorative Elements */}
    <div className="mt-16 text-center animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
      <div className="inline-flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
          <span>4.9/5 Average Rating</span>
        </span>
        <span className="w-px h-4 bg-gray-200"></span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></span>
          <span>50K+ Happy Customers</span>
        </span>
        <span className="w-px h-4 bg-gray-200"></span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></span>
          <span>100% Genuine Reviews</span>
        </span>
      </div>
    </div>
  </div>
</section>


 {/* 🎯 CTA SECTION - Premium Elegant (Reduced Height) */}
<section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-20 overflow-hidden">
  {/* Background with Gradient Overlay */}
  <div className="absolute inset-0">
    <img src="/about.png" alt="CTA" className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/95 via-teal-800/85 to-orange-900/90"></div>
    
    {/* Animated Gradient Orbs - Smaller */}
    <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-emerald-400/20 rounded-full blur-3xl animate-float-slow"></div>
    <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-orange-400/25 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: "1.5s" }}></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-300/10 rounded-full blur-3xl animate-pulse-slow"></div>
    
    {/* Shimmer Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent animate-shimmer"></div>
    
    {/* Premium Pattern Overlay */}
    <div className="absolute inset-0 opacity-[0.05]" style={{ 
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M50 50v-5h-5v5h-5v5h5v5h5v-5h5v-5h-5zm0-40v-5h-5v5h-5v5h5v5h5v-5h5v-5h-5zM10 50v-5H5v5H0v5h5v5h5v-5h5v-5h-5zm0-40v-5H5v5H0v5h5v5h5v-5h5v-5h-5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundSize: "80px 80px"
    }}></div>
    
    {/* Floating Particles - Reduced count */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full animate-float-particle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${10 + Math.random() * 12}s`,
            background: i % 3 === 0 ? 'rgba(255, 255, 255, 0.3)' : i % 3 === 1 ? 'rgba(16, 185, 129, 0.25)' : 'rgba(251, 146, 60, 0.25)',
          }}
        />
      ))}
    </div>
  </div>

  <div className="relative z-10 max-w-4xl mx-auto text-center">
    <div className="animate-fadeInUp">
      {/* Premium Badge - Smaller */}
      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/20 mb-4 hover:border-white/40 transition-all duration-500 group">
        <div className="relative">
          <Sparkles className="w-3.5 h-3.5 text-orange-300 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping"></span>
        </div>
        <span className="text-white/90 text-xs font-medium tracking-wider">✦ Limited Time Offer</span>
        <div className="w-px h-4 bg-white/20"></div>
        <span className="text-orange-300 text-[10px] font-semibold animate-pulse">Save 30%</span>
      </div>
      
      {/* Main Heading - Smaller */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 animate-gradient-shift">
        <span className="text-white">Ready to Experience</span>
        <br />
        <span className="bg-gradient-to-r from-emerald-300 via-orange-300 to-emerald-300 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
          Freshness
        </span>
        <span className="text-white">?</span>
      </h2>
      
      {/* Animated Divider - Smaller */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full animate-pulse"></div>
        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></div>
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
      </div>
      
      {/* Description - Smaller */}
      <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-6 leading-relaxed animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
        Join <span className="text-white font-semibold">50,000+</span> happy customers who trust 
        <span className="text-emerald-300 font-semibold"> Grocery Items</span>
        <span className="block mt-1 text-xs text-white/60">✓ Free Delivery • ✓ Fresh Guarantee • ✓ 24/7 Support</span>
      </p>
      
      {/* Buttons - Smaller */}
      <div className="flex flex-wrap justify-center gap-3 animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
        <Link to="/">
          <button className="group relative px-8 py-3 bg-gradient-to-r from-emerald-500 to-orange-500 text-white font-semibold rounded-full shadow-2xl hover:shadow-emerald-500/50 hover:shadow-orange-500/30 transition-all duration-500 hover:scale-105 flex items-center gap-2 overflow-hidden text-sm">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-orange-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></span>
            <span className="relative z-10 flex items-center gap-2">
              Start Shopping
              <ShoppingBag className="w-4 h-4 group-hover:translate-x-1 group-hover:rotate-12 transition-all duration-300" />
            </span>
            <span className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-orange-400 rounded-full blur-lg opacity-0 group-hover:opacity-30 group-hover:animate-pulse transition-opacity duration-500"></span>
          </button>
        </Link>
        
        <Link to="/contact">
          <button className="group px-8 py-3 bg-white/10 backdrop-blur-xl text-white font-semibold rounded-full border-2 border-white/30 hover:border-white/60 transition-all duration-500 hover:scale-105 hover:bg-white/20 flex items-center gap-2 text-sm">
            <span>Get in Touch</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </Link>
      </div>
      
      {/* Trust Indicators - Smaller */}
      <div className="mt-8 pt-6 border-t border-white/10 animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
              <Shield className="w-4 h-4 text-emerald-300" />
            </div>
            <div className="text-left">
              <p className="text-white text-xs font-semibold">100% Fresh</p>
              <p className="text-white/50 text-[10px]">Guaranteed</p>
            </div>
          </div>
          
          <div className="w-px h-8 bg-white/10"></div>
          
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
              <Truck className="w-4 h-4 text-orange-300" />
            </div>
            <div className="text-left">
              <p className="text-white text-xs font-semibold">Free Delivery</p>
              <p className="text-white/50 text-[10px]">On orders $50+</p>
            </div>
          </div>
          
          <div className="w-px h-8 bg-white/10"></div>
          
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
              <Star className="w-4 h-4 text-yellow-300" />
            </div>
            <div className="text-left">
              <p className="text-white text-xs font-semibold">4.9/5 Rating</p>
              <p className="text-white/50 text-[10px]">50K+ Reviews</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }
        
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          25% { transform: translateY(-40px) translateX(20px); opacity: 0.6; }
          50% { transform: translateY(20px) translateX(-15px); opacity: 0.8; }
          75% { transform: translateY(-30px) translateX(25px); opacity: 0.4; }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-float-particle {
          animation: float-particle 10s ease-in-out infinite;
        }
        
        .animate-gradient-shift {
          animation: gradient-shift 6s ease-in-out infinite;
          background-size: 200% 200%;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-bounce {
          animation: bounce 2s infinite;
        }

        @media (max-width: 480px) {
          .animate-fadeInUp {
            animation-duration: 0.6s;
          }
        }

        /* Add to your global CSS */
@keyframes float-slow {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(5deg); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes float-particle {
  0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translateY(-100px) translateX(30px); opacity: 0; }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes star-pop {
  0% { transform: scale(0) rotate(-180deg); opacity: 0; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}

/* Animation Classes */
.animate-float-slow {
  animation: float-slow 6s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-shimmer {
  animation: shimmer 3s ease-in-out infinite;
}

.animate-gradient-shift {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease-in-out infinite;
}

.animate-float-particle {
  animation: float-particle 12s ease-in-out infinite;
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.animate-star-pop {
  animation: star-pop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}
      `}</style>
    </div>
  );
};

export default About;