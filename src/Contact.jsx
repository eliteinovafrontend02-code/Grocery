// Contact.jsx - COMPLETELY FIXED

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  User,
  Mail as MailIcon,
  MessageSquare,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Star,
  Shield,
  Truck,
  Headphones,
  Globe,
  Heart,
   ThumbsUp,
   Award,
   ShoppingBag,  
     ChevronRight,
} from 'lucide-react';

const Contact = () => {

  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: "123 Grocery Street, Chennai, Tamil Nadu 600001",
    sub: "Find us on map",
    color: "from-emerald-400 to-emerald-600",
    bg: "bg-emerald-50/80",
    delay: "0s"
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+91 98765 43210",
    sub: "Mon-Sat, 9AM - 9PM",
    color: "from-orange-400 to-orange-600",
    bg: "bg-orange-50/80",
    delay: "0.1s"
  },
  {
    icon: Mail,
    title: "Email Us",
    details: "support@groceryitems.com",
    sub: "24/7 Customer Support",
    color: "from-blue-400 to-blue-600",
    bg: "bg-blue-50/80",
    delay: "0.2s"
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: "Monday - Saturday",
    sub: "9:00 AM - 9:00 PM",
    color: "from-purple-400 to-purple-600",
    bg: "bg-purple-50/80",
    delay: "0.3s"
  }
];

  // ✅ ALL CUSTOM SVG ICONS - No lucide-react imports needed
  const socialLinks = [
    { 
      icon: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      ),
      label: "Instagram", 
      color: "hover:bg-gradient-to-br from-pink-500 to-orange-500", 
      link: "#" 
    },
    { 
      icon: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      label: "Facebook", 
      color: "hover:bg-blue-600", 
      link: "#" 
    },
    { 
      icon: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      label: "Twitter", 
      color: "hover:bg-sky-500", 
      link: "#" 
    },
    { 
      icon: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      label: "YouTube", 
      color: "hover:bg-red-600", 
      link: "#" 
    }
  ];

  const faqs = [
    {
      q: "How do I place an order?",
      a: "Simply browse our products, add items to your cart, and proceed to checkout. We'll deliver fresh groceries to your doorstep!"
    },
    {
      q: "What is the delivery time?",
      a: "We offer same-day delivery in all major cities. Orders placed before 2 PM are delivered the same day."
    },
    {
      q: "Do you offer returns?",
      a: "Yes! We have a 100% satisfaction guarantee. If you're not happy with any product, we'll replace it or refund your money."
    },
    {
      q: "Is there a minimum order?",
      a: "No minimum order required! However, orders above ₹499 get free delivery."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/30 via-white to-orange-50/30 pt-24 overflow-x-hidden">

   {/* 🎯 HERO SECTION - Ultra Premium Enhanced */}
<section className="relative w-full min-h-[45vh] sm:min-h-[55vh] md:min-h-[60vh] lg:min-h-[70vh] flex items-center overflow-hidden">
  
  {/* Background with Overlay */}
  <div className="absolute inset-0">
    <img 
      src="/contact-banner.webp" 
      alt="Contact Us" 
      className="w-full h-full object-cover object-center scale-105 animate-zoom-slow"
      onError={(e) => {
        e.target.src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop";
      }}
    />
    
    {/* Premium Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-emerald-800/80 to-orange-900/85"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent"></div>
    
    {/* Animated Gradient Orbs */}
    <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-emerald-400/20 rounded-full blur-3xl animate-float-slow"></div>
    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-400/20 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: "1.5s" }}></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-300/15 rounded-full blur-3xl animate-pulse-slow"></div>
    <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-orange-300/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: "2.5s" }}></div>
    
    {/* Shimmer Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent animate-shimmer"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/3 to-transparent animate-shimmer-reverse"></div>
    
    {/* Premium Pattern Overlay */}
    <div className="absolute inset-0 opacity-[0.04]" style={{ 
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M50 50v-5h-5v5h-5v5h5v5h5v-5h5v-5h-5zm0-40v-5h-5v5h-5v5h5v5h5v-5h5v-5h-5zM10 50v-5H5v5H0v5h5v5h5v-5h5v-5h-5zm0-40v-5H5v5H0v5h5v5h5v-5h5v-5h-5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundSize: "80px 80px"
    }}></div>
  </div>

  {/* Floating Particles */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(50)].map((_, i) => {
      const size = i % 5 === 0 ? '3px' : i % 3 === 0 ? '2px' : '1.5px';
      const colors = ['rgba(255,255,255,0.4)', 'rgba(16,185,129,0.3)', 'rgba(251,146,60,0.3)', 'rgba(255,255,255,0.2)'];
      return (
        <div
          key={i}
          className="absolute rounded-full animate-float-particle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${12 + Math.random() * 18}s`,
            width: size,
            height: size,
            background: colors[i % colors.length],
          }}
        />
      );
    })}
  </div>

  {/* Floating Badges */}
  <div className="absolute top-10 left-10 z-20 animate-float-slow hidden lg:block" style={{ animationDelay: "0.3s" }}>
    <div className="bg-white/10 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-500 group">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center animate-pulse-slow group-hover:scale-110 transition-transform duration-500">
          <Star className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-sm group-hover:text-emerald-300 transition-colors">4.9/5 Rating</p>
          <p className="text-white/60 text-[10px]">50K+ Happy Reviews</p>
        </div>
      </div>
    </div>
  </div>

  <div className="absolute top-20 right-10 z-20 animate-float-slow hidden lg:block" style={{ animationDelay: "1s" }}>
    <div className="bg-white/10 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-500 group">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center animate-pulse-slow group-hover:scale-110 transition-transform duration-500" style={{ animationDelay: "0.5s" }}>
          <Award className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-sm group-hover:text-orange-300 transition-colors">Award Winning</p>
          <p className="text-white/60 text-[10px]">Best Grocery 2024</p>
        </div>
      </div>
    </div>
  </div>

  <div className="absolute bottom-10 right-10 z-20 animate-float-slow hidden lg:block" style={{ animationDelay: "2s" }}>
    <div className="bg-white/10 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-500 group">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center animate-pulse-slow group-hover:scale-110 transition-transform duration-500" style={{ animationDelay: "1s" }}>
          <Headphones className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-sm group-hover:text-blue-300 transition-colors">24/7 Support</p>
          <p className="text-white/60 text-[10px]">Always Here to Help</p>
        </div>
      </div>
    </div>
  </div>

  {/* Main Content */}
  <div className="relative z-10 w-full px-4 sm:px-6 lg:px-20 py-16 sm:py-20">
    <div className="max-w-5xl mx-auto text-center">
      
      {/* Premium Badge */}
      <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20 mb-6 animate-fadeInUp hover:border-white/40 hover:bg-white/15 transition-all duration-500 group">
        <div className="relative">
          <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse group-hover:rotate-12 transition-transform duration-500" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
        </div>
        <span className="text-white/90 text-xs sm:text-sm font-medium tracking-wider">GET IN TOUCH</span>
        <span className="w-px h-4 bg-white/20"></span>
        <span className="text-emerald-300 text-xs font-medium animate-pulse">✦ We're Here</span>
        <span className="w-px h-4 bg-white/20 hidden sm:block"></span>
        <span className="text-white/60 text-[10px] hidden sm:block animate-pulse" style={{ animationDelay: "0.5s" }}>24/7</span>
      </div>

      {/* Main Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4 animate-fadeInUp">
        <span className="text-white drop-shadow-2xl">Get In</span>
        <br />
        <span className="bg-gradient-to-r from-emerald-300 via-orange-300 to-emerald-300 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%] drop-shadow-2xl">
          Touch
        </span>
        <span className="text-white drop-shadow-2xl">.</span>
      </h1>

      {/* Animated Divider */}
      <div className="flex items-center justify-center gap-4 mb-4 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full animate-pulse"></div>
        <div className="relative">
          <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-orange-400 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 w-3 h-3 bg-orange-400 rounded-full animate-ping opacity-50"></div>
        </div>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
      </div>

      {/* Description */}
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
        Have questions, feedback, or want to collaborate? 
        <span className="block mt-1 text-white/60 text-xs sm:text-sm">
          We'd love to hear from you. Reach out to us anytime!
        </span>
      </p>

      {/* Trust Indicators */}
      <div className="flex flex-wrap justify-center items-center gap-6 mt-6 animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
        <div className="flex items-center gap-2 text-white/70 group cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 group-hover:bg-emerald-500/30 group-hover:shadow-lg">
            <ThumbsUp className="w-4 h-4 text-emerald-300 group-hover:text-white transition-colors" />
          </div>
          <span className="text-xs sm:text-sm group-hover:text-white transition-colors">98% Satisfaction</span>
        </div>
        <div className="w-px h-6 bg-white/20"></div>
        <div className="flex items-center gap-2 text-white/70 group cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 group-hover:bg-orange-500/30 group-hover:shadow-lg">
            <Award className="w-4 h-4 text-orange-300 group-hover:text-white transition-colors" />
          </div>
          <span className="text-xs sm:text-sm group-hover:text-white transition-colors">Award Winning</span>
        </div>
        <div className="w-px h-6 bg-white/20"></div>
        <div className="flex items-center gap-2 text-white/70 group cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 group-hover:bg-emerald-500/30 group-hover:shadow-lg">
            <Shield className="w-4 h-4 text-emerald-300 group-hover:text-white transition-colors" />
          </div>
          <span className="text-xs sm:text-sm group-hover:text-white transition-colors">100% Secure</span>
        </div>
        <div className="w-px h-6 bg-white/20 hidden sm:block"></div>
        <div className="flex items-center gap-2 text-white/70 group cursor-pointer hidden sm:flex">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 group-hover:bg-blue-500/30 group-hover:shadow-lg">
            <Clock className="w-4 h-4 text-blue-300 group-hover:text-white transition-colors" />
          </div>
          <span className="text-xs sm:text-sm group-hover:text-white transition-colors">Fast Response</span>
        </div>
      </div>

     {/* ✅ CTA Buttons - WORKING */}
<div className="flex flex-wrap justify-center gap-4 mt-8 animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
  
  {/* ✅ Explore Products Button */}
  <Link to="/">
    <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-orange-500 text-white font-semibold rounded-full shadow-2xl hover:shadow-emerald-500/50 hover:shadow-orange-500/30 transition-all duration-500 hover:scale-105 flex items-center gap-3 overflow-hidden">
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
      <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-orange-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></span>
      <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-orange-400 opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700"></span>
      <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
        Explore Products
        <ShoppingBag className="w-4 h-4 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-300" />
      </span>
      <span className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-orange-400 rounded-full blur-lg opacity-0 group-hover:opacity-30 group-hover:animate-pulse transition-opacity duration-500"></span>
    </button>
  </Link>

  {/* Call Now Button */}
  <a href="tel:+919876543210">
    <button className="group relative px-8 py-4 bg-white/10 backdrop-blur-xl text-white font-semibold rounded-full border-2 border-white/30 hover:border-white/60 transition-all duration-500 hover:scale-105 hover:bg-white/20 flex items-center gap-2 overflow-hidden">
      <span className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
      <Phone className="w-4 h-4 group-hover:animate-bounce-slow group-hover:rotate-12 transition-transform duration-300" />
      <span className="relative z-10 text-sm sm:text-base">Call Now</span>
    </button>
  </a>
</div>

      {/* Bottom Trust Bar */}
      <div className="flex flex-wrap justify-center items-center gap-4 mt-6 animate-fadeInUp" style={{ animationDelay: "0.5s" }}>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-orange-400 text-orange-400 animate-star-pop" style={{ animationDelay: `${i * 0.1 + 0.5}s` }} />
          ))}
          <span className="text-white/60 text-xs ml-2">4.9/5 from 50K+ reviews</span>
        </div>
      </div>
    </div>
  </div>

  {/* Scroll Indicator */}
  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 animate-bounce-slow hidden sm:flex">
    <span className="text-[8px] tracking-[0.2em] uppercase opacity-50">Scroll</span>
    <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1 relative">
      <div className="w-1 h-2 bg-white/30 rounded-full animate-scroll-dot"></div>
      <div className="absolute inset-0 rounded-full border border-white/5 animate-pulse"></div>
    </div>
  </div>
</section>

    {/* 📍 CONTACT INFO - Premium Enhanced */}
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
    {contactInfo.map((info, index) => (
      <div
        key={index}
        className={`group relative bg-white/90 backdrop-blur-sm rounded-3xl p-7 shadow-xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-3 animate-fadeInUp border border-white/50 hover:border-emerald-200/50 overflow-hidden  ${
                index % 2 === 0 
                  ? 'bg-gradient-to-br from-emerald-50/90 to-emerald-100/50 border-emerald-100/50' 
                  : 'bg-gradient-to-br from-orange-50/90 to-orange-100/50 border-orange-100/50'
              }`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {/* Premium Background - Dynamic Colors */}
        <div className={`absolute inset-0 ${info.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
        
        {/* Animated Gradient Glow */}
        <div className={`absolute -inset-2 bg-gradient-to-r ${info.color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700`}></div>
        
        {/* Floating Orbs Background */}
        <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${info.color} rounded-full blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-1000`}></div>
        <div className={`absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br ${info.color} rounded-full blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-1000`} style={{ animationDelay: "0.5s" }}></div>
        
        {/* Corner Decorations - Enhanced */}
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-emerald-200/20 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:border-emerald-400/50"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-emerald-200/20 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:border-emerald-400/50"></div>
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-emerald-200/20 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:border-emerald-400/50" style={{ animationDelay: "0.2s" }}></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-emerald-200/20 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:border-emerald-400/50" style={{ animationDelay: "0.2s" }}></div>

        <div className="relative z-10">
          {/* Premium Icon Container */}
          <div className="relative inline-block mb-5">
            {/* Icon Glow Ring */}
            <div className={`absolute inset-0 bg-gradient-to-r ${info.color} rounded-2xl blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 scale-150`}></div>
            
            {/* Icon with Animation */}
            <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 shadow-lg group-hover:shadow-xl`}>
              <info.icon className="w-7 h-7 text-white transition-transform duration-500 group-hover:scale-110" />
              {/* Inner Glow */}
              <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            {/* Pulse Ring */}
            <div className={`absolute inset-0 rounded-2xl border-2 border-emerald-400/30 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
          </div>
          
          {/* Title with Hover Animation */}
          <h3 className="text-lg font-bold text-gray-800 mb-1 transition-all duration-300 group-hover:text-emerald-600 group-hover:translate-x-1">
            {info.title}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed transition-all duration-300 group-hover:text-gray-700 group-hover:translate-x-1">
            {info.details}
          </p>
          
          {/* Sub Text with Arrow */}
          {info.sub && (
            <div className="flex items-center gap-1 mt-1 transition-all duration-300 group-hover:translate-x-1">
              <p className="text-xs text-emerald-500 font-medium">{info.sub}</p>
              <ArrowRight className="w-3 h-3 text-emerald-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </div>
          )}
          
          {/* Animated Underline */}
          <div className="mt-3 flex items-center gap-2">
            <div className={`w-0 h-0.5 bg-gradient-to-r ${info.color} rounded-full group-hover:w-12 transition-all duration-500`}></div>
            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${info.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-150`}></div>
            <div className={`w-0 h-0.5 bg-gradient-to-r ${info.color} rounded-full group-hover:w-12 transition-all duration-500`} style={{ animationDelay: "0.2s" }}></div>
          </div>
        </div>
        
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        {/* Border Glow on Hover */}
        <div className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-emerald-200/50 transition-all duration-500`}></div>
      </div>
    ))}
  </div>
  
  {/* Bottom Decorative Elements */}
  <div className="mt-8 text-center animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
    <div className="inline-flex flex-wrap items-center justify-center gap-4 text-gray-400 text-sm">
      <span className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
        <span>Trusted by 50K+</span>
      </span>
      <span className="w-px h-4 bg-gray-200"></span>
      <span className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></span>
        <span>Premium Quality</span>
      </span>
      <span className="w-px h-4 bg-gray-200"></span>
      <span className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></span>
        <span>100% Satisfaction</span>
      </span>
    </div>
  </div>
</section>

{/* 📝 CONTACT FORM & MAP - Premium Enhanced */}
<section 
  id="contact-form"
  ref={sectionRef}
  className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-20 relative overflow-hidden"
>
  {/* Premium Animated Background */}
  <div className="absolute inset-0">
    {/* Base Gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-white/60 to-orange-50/40"></div>
    
    {/* Animated Gradient Orbs */}
    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-200/25 rounded-full blur-3xl animate-float-slow"></div>
    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-200/25 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: "1.5s" }}></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-300/10 rounded-full blur-3xl animate-pulse-slow"></div>
    
    {/* Premium Pattern Overlay */}
    <div className="absolute inset-0 opacity-[0.02]" style={{ 
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23065f46' fill-opacity='0.4'%3E%3Cpath d='M50 50v-5h-5v5h-5v5h5v5h5v-5h5v-5h-5zm0-40v-5h-5v5h-5v5h5v5h5v-5h5v-5h-5zM10 50v-5H5v5H0v5h5v5h5v-5h5v-5h-5zm0-40v-5H5v5H0v5h5v5h5v-5h5v-5h-5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundSize: "80px 80px"
    }}></div>
    
    {/* Floating Particles */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float-particle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 12}s`,
            animationDuration: `${10 + Math.random() * 15}s`,
            width: i % 3 === 0 ? '2px' : '1.5px',
            height: i % 3 === 0 ? '2px' : '1.5px',
            background: i % 3 === 0 ? 'rgba(16,185,129,0.2)' : 'rgba(251,146,60,0.2)',
          }}
        />
      ))}
    </div>
  </div>

  <div className="relative z-10 max-w-7xl mx-auto">
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20">
      
      {/* LEFT - Contact Form */}
      <div className="animate-fadeInUp">
        {/* Premium Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/60 shadow-lg hover:shadow-xl transition-all duration-500 mb-4 group">
            <span className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-orange-500 rounded-full animate-pulse"></span>
            <span className="text-emerald-700 text-xs font-semibold tracking-widest uppercase">Send Message</span>
            <span className="w-px h-4 bg-gradient-to-b from-emerald-300 to-orange-300"></span>
            <span className="text-orange-500 text-xs font-medium animate-pulse">✦ Quick Response</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Let's Start a{' '}
            <span className="bg-gradient-to-r from-emerald-500 via-orange-400 to-emerald-500 bg-clip-text text-transparent animate-gradient-shift">
              Conversation
            </span>
          </h2>
          
          <div className="flex items-center gap-3 mt-3">
            <div className="w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-orange-500 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
            <div className="w-12 h-0.5 bg-gradient-to-r from-orange-500 to-emerald-500 rounded-full"></div>
          </div>
          
          <p className="text-gray-500 mt-3 text-sm leading-relaxed">
            Fill out the form below and we'll get back to you within <span className="text-emerald-600 font-semibold">24 hours</span>.
          </p>
        </div>

        {/* Premium Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-orange-400/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-orange-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors duration-300 z-10" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Full Name"
                className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none text-gray-800 placeholder-gray-400 group-hover:border-emerald-300/50"
              />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-orange-500 group-focus-within:w-full transition-all duration-500 rounded-full"></div>
            </div>
          </div>

          {/* Email Field */}
          <div className="group relative">
            <div className="relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-orange-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
              <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors duration-300 z-10" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your Email Address"
                className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none text-gray-800 placeholder-gray-400 group-hover:border-emerald-300/50"
              />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-orange-500 group-focus-within:w-full transition-all duration-500 rounded-full"></div>
            </div>
          </div>

          {/* Subject Field */}
          <div className="group relative">
            <div className="relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-orange-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
              <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors duration-300 z-10" />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Subject"
                className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none text-gray-800 placeholder-gray-400 group-hover:border-emerald-300/50"
              />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-orange-500 group-focus-within:w-full transition-all duration-500 rounded-full"></div>
            </div>
          </div>

          {/* Message Field */}
          <div className="group relative">
            <div className="relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-orange-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
              <MessageCircle className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors duration-300 z-10" />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Your Message"
                className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none text-gray-800 placeholder-gray-400 group-hover:border-emerald-300/50 resize-none"
              ></textarea>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-orange-500 group-focus-within:w-full transition-all duration-500 rounded-full"></div>
            </div>
          </div>

          {/* Submit Button - Enhanced */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full py-4.5 bg-gradient-to-r from-emerald-500 to-orange-500 text-white font-semibold rounded-xl shadow-xl hover:shadow-emerald-500/40 transition-all duration-500 hover:scale-[1.02] flex items-center justify-center gap-3 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {/* Animated Background Layers */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-orange-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-orange-400 opacity-0 group-hover:opacity-15 blur-2xl transition-opacity duration-700"></span>
            
            {/* Pulse Ring on Hover */}
            <span className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-orange-400 rounded-xl blur-lg opacity-0 group-hover:opacity-30 group-hover:animate-pulse transition-opacity duration-500"></span>
            
            {isSubmitting ? (
              <>
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Sending...
              </>
            ) : (
              <>
                <span className="relative z-10 flex items-center gap-2 text-base">
                  Send Message
                  <Send className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-300 group-hover:rotate-12" />
                </span>
              </>
            )}
          </button>

          {/* Success Message - Enhanced */}
          {isSubmitted && (
            <div className="flex items-center gap-4 p-4 bg-emerald-50/95 backdrop-blur-sm rounded-xl border border-emerald-200 animate-fadeInUp shadow-lg">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center animate-bounce-slow">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <p className="font-bold text-emerald-700 text-sm">✓ Message Sent Successfully!</p>
                <p className="text-sm text-emerald-600">We'll get back to you within 24 hours.</p>
              </div>
            </div>
          )}
        </form>

        {/* Trust Badges - Enhanced */}
        <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 group">
            <Shield className="w-4 h-4 text-emerald-500 group-hover:rotate-12 transition-transform duration-300" />
            <span className="group-hover:text-emerald-600 transition-colors">100% Privacy</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 group">
            <Clock className="w-4 h-4 text-orange-500 group-hover:rotate-12 transition-transform duration-300" />
            <span className="group-hover:text-orange-600 transition-colors">24hr Response</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 group">
            <Headphones className="w-4 h-4 text-blue-500 group-hover:rotate-12 transition-transform duration-300" />
            <span className="group-hover:text-blue-600 transition-colors">Premium Support</span>
          </div>
        </div>
      </div>

      {/* RIGHT - Map & Info */}
      <div className="space-y-6 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
        
        {/* Map Container - Enhanced */}
        <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/50 group hover:shadow-2xl transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          {/* Map Glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/10 to-orange-400/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="relative w-full h-[300px] sm:h-[350px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.328315172326!2d80.2503853!3d13.0824118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52677b9d26f7c7%3A0x8d9fc3ba56c1f73e!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location"
              className="filter brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-1000"
            ></iframe>
          </div>
          
          {/* Location Badge - Enhanced */}
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 group/badge">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-50"></div>
              </div>
              <span className="text-xs font-medium text-gray-700 group-hover/badge:text-emerald-600 transition-colors">📍 We're Here</span>
              <ChevronRight className="w-3 h-3 text-gray-400 opacity-0 group-hover/badge:opacity-100 group-hover/badge:translate-x-1 transition-all duration-300" />
            </div>
          </div>
          
          {/* Map Corner Decorations */}
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-white/30 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/30 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* Quick Connect - Enhanced */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 group">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <div className="relative">
              <Headphones className="w-5 h-5 text-emerald-500 animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
            </div>
            Quick Connect
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a href="tel:+919876543210" className="group/btn flex items-center gap-3 p-3.5 bg-emerald-50/50 rounded-xl hover:bg-emerald-100/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center group-hover/btn:animate-bounce-slow shadow-lg group-hover/btn:shadow-xl transition-all duration-300">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Call Now</p>
                <p className="text-sm font-semibold text-gray-800 group-hover/btn:text-emerald-600 transition-colors">+91 98765 43210</p>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-400 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all duration-300 ml-auto" />
            </a>
            
            <a href="mailto:support@groceryitems.com" className="group/btn flex items-center gap-3 p-3.5 bg-orange-50/50 rounded-xl hover:bg-orange-100/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center group-hover/btn:animate-bounce-slow shadow-lg group-hover/btn:shadow-xl transition-all duration-300">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email Us</p>
                <p className="text-sm font-semibold text-gray-800 group-hover/btn:text-orange-600 transition-colors truncate">support@...</p>
              </div>
              <ArrowRight className="w-4 h-4 text-orange-400 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all duration-300 ml-auto" />
            </a>
          </div>
        </div>

        {/* Social Links - Enhanced */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 group">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-orange-500 animate-spin-slow" />
            Connect With Us
          </h3>
          <div className="flex gap-3 flex-wrap">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group/social w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:shadow-xl ${social.color} text-gray-600 hover:text-white relative overflow-hidden`}
                style={{ animationDelay: social.delay }}
              >
                <span className={`absolute inset-0 bg-gradient-to-r ${social.gradient} opacity-0 group-hover/social:opacity-100 transition-opacity duration-500`}></span>
                <span className="relative z-10 group-hover/social:scale-110 transition-transform duration-300">
                  <social.icon />
                </span>
                {/* Tooltip */}
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {social.label}
                </span>
                {/* Pulse Ring */}
                <span className="absolute inset-0 rounded-full border-2 border-white/30 opacity-0 group-hover/social:opacity-100 group-hover/social:scale-150 transition-all duration-500"></span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


{/* ❓ FAQ SECTION - Premium with Enhanced Bubble Animations */}
<section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-20 relative overflow-hidden">
  
  {/* ===== PREMIUM ANIMATED BACKGROUND ===== */}
  <div className="absolute inset-0">
    {/* Base Gradient with Animation */}
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-white/60 to-orange-50/40 animate-gradient-shift-slow"></div>
    
    {/* Animated Gradient Orbs */}
    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-200/25 rounded-full blur-3xl animate-float-slow"></div>
    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-200/25 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: "1.5s" }}></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-300/10 rounded-full blur-3xl animate-pulse-slow"></div>
    
    {/* ===== ENHANCED BUBBLE ANIMATIONS - INCREASED SIZES ===== */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large Bubbles - Left Side (Increased) */}
      <div className="absolute -bottom-20 -left-10 w-64 h-64 rounded-full bg-emerald-400/8 animate-bubble-float-large"></div>
      <div className="absolute -bottom-10 left-20 w-48 h-48 rounded-full bg-orange-400/8 animate-bubble-float-large-delayed"></div>
      
      {/* Medium Bubbles - Left Side (Increased) */}
      <div className="absolute -bottom-5 left-40 w-32 h-32 rounded-full bg-emerald-400/8 animate-bubble-float-medium"></div>
      <div className="absolute bottom-10 left-60 w-24 h-24 rounded-full bg-orange-400/8 animate-bubble-float-medium-delayed"></div>
      
      {/* Small Bubbles - Left Side (Increased) */}
      <div className="absolute bottom-30 left-20 w-16 h-16 rounded-full bg-emerald-400/8 animate-bubble-float-small"></div>
      <div className="absolute bottom-40 left-50 w-12 h-12 rounded-full bg-orange-400/8 animate-bubble-float-small-delayed"></div>
      
      {/* Large Bubbles - Right Side (Increased) */}
      <div className="absolute -bottom-20 -right-10 w-60 h-60 rounded-full bg-orange-400/8 animate-bubble-float-right-large"></div>
      <div className="absolute -bottom-10 right-20 w-44 h-44 rounded-full bg-emerald-400/8 animate-bubble-float-right-large-delayed"></div>
      
      {/* Medium Bubbles - Right Side (Increased) */}
      <div className="absolute -bottom-5 right-40 w-28 h-28 rounded-full bg-orange-400/8 animate-bubble-float-right-medium"></div>
      <div className="absolute bottom-10 right-60 w-20 h-20 rounded-full bg-emerald-400/8 animate-bubble-float-right-medium-delayed"></div>
      
      {/* Small Bubbles - Right Side (Increased) */}
      <div className="absolute bottom-30 right-20 w-14 h-14 rounded-full bg-orange-400/8 animate-bubble-float-right-small"></div>
      <div className="absolute bottom-40 right-50 w-10 h-10 rounded-full bg-emerald-400/8 animate-bubble-float-right-small-delayed"></div>
      
      {/* Center Bubbles (Increased) */}
      <div className="absolute bottom-1/4 left-1/3 w-36 h-36 rounded-full bg-emerald-400/8 animate-bubble-float-center"></div>
      <div className="absolute bottom-1/3 right-1/3 w-28 h-28 rounded-full bg-orange-400/8 animate-bubble-float-center-delayed"></div>
      
      {/* Tiny Floating Bubbles - Scattered (INCREASED SIZES) */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`tiny-bubble-${i}`}
          className="absolute rounded-full animate-bubble-float-tiny"
          style={{
            top: `${5 + Math.random() * 85}%`,
            left: `${5 + Math.random() * 85}%`,
            animationDelay: `${i * 0.3}s`,
            width: i % 3 === 0 ? '14px' : i % 3 === 1 ? '10px' : '8px',
            height: i % 3 === 0 ? '14px' : i % 3 === 1 ? '10px' : '8px',
            background: i % 2 === 0 ? 'rgba(16,185,129,0.15)' : 'rgba(251,146,60,0.15)',
          }}
        />
      ))}
    </div>
    
    {/* Bubble Glow Effects (Increased) */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute bottom-10 left-20 w-56 h-56 rounded-full bg-emerald-300/10 blur-3xl animate-bubble-glow-large"></div>
      <div className="absolute bottom-20 right-20 w-56 h-56 rounded-full bg-orange-300/10 blur-3xl animate-bubble-glow-large-delayed"></div>
      <div className="absolute top-1/4 left-1/2 w-44 h-44 rounded-full bg-emerald-300/8 blur-2xl animate-bubble-glow-medium"></div>
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-orange-300/8 blur-2xl animate-bubble-glow-medium-delayed"></div>
    </div>
    
    {/* Bubble Trail Effects (Increased) */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-gradient-to-t from-emerald-400/5 to-transparent rounded-full blur-2xl animate-bubble-trail"></div>
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-gradient-to-t from-orange-400/5 to-transparent rounded-full blur-2xl animate-bubble-trail-delayed"></div>
    </div>
    
    {/* Animated Gradient Stripes */}
    <div className="absolute inset-0 opacity-[0.03]">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-transparent to-orange-500 animate-slide-stripe"></div>
      <div className="absolute inset-0 bg-gradient-to-l from-emerald-500 via-transparent to-orange-500 animate-slide-stripe-reverse" style={{ animationDelay: "2s" }}></div>
    </div>
    
    {/* Animated Dots Grid Background */}
    <div className="absolute inset-0 opacity-[0.03]">
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle, rgba(16,185,129,0.3) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>
      <div className="absolute inset-0 animate-dots-scroll" style={{
        backgroundImage: `radial-gradient(circle, rgba(251,146,60,0.2) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        backgroundPosition: '30px 30px'
      }}></div>
    </div>
    
    {/* Premium Pattern Overlay */}
    <div className="absolute inset-0 opacity-[0.02]" style={{ 
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23065f46' fill-opacity='0.4'%3E%3Cpath d='M50 50v-5h-5v5h-5v5h5v5h5v-5h5v-5h-5zm0-40v-5h-5v5h-5v5h5v5h5v-5h5v-5h-5zM10 50v-5H5v5H0v5h5v5h5v-5h5v-5h-5zm0-40v-5H5v5H0v5h5v5h5v-5h5v-5h-5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundSize: "80px 80px"
    }}></div>
    
    {/* Floating Particles */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float-particle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${12 + Math.random() * 18}s`,
            width: i % 3 === 0 ? '3px' : i % 3 === 1 ? '2px' : '1.5px',
            height: i % 3 === 0 ? '3px' : i % 3 === 1 ? '2px' : '1.5px',
            background: i % 3 === 0 ? 'rgba(16,185,129,0.25)' : i % 3 === 1 ? 'rgba(251,146,60,0.25)' : 'rgba(255,255,255,0.3)',
            borderRadius: i % 4 === 0 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  </div>
  
  {/* ===== OUTSIDE DECORATIVE ANIMATIONS ===== */}
  
  {/* Animated Floating Leaves - Top Left */}
  <div className="absolute -top-10 -left-10 w-32 h-32 text-emerald-200/20 animate-float-leaf hidden lg:block">
    <svg viewBox="0 0 100 100" fill="currentColor">
      <path d="M50 10 C30 30 20 60 50 90 C80 60 70 30 50 10Z"/>
    </svg>
  </div>
  
  {/* Animated Floating Leaves - Bottom Right */}
  <div className="absolute -bottom-10 -right-10 w-32 h-32 text-orange-200/20 animate-float-leaf-delayed hidden lg:block">
    <svg viewBox="0 0 100 100" fill="currentColor">
      <path d="M50 10 C30 30 20 60 50 90 C80 60 70 30 50 10Z"/>
    </svg>
  </div>
  
  {/* Animated Circles - Top Right */}
  <div className="absolute -top-20 -right-20 w-64 h-64 border-2 border-emerald-200/10 rounded-full animate-spin-slow hidden lg:block"></div>
  <div className="absolute -top-10 -right-10 w-40 h-40 border-2 border-orange-200/10 rounded-full animate-spin-slow-reverse hidden lg:block"></div>
  
  {/* Animated Dots Pattern - Bottom Left */}
  <div className="absolute bottom-10 left-10 grid grid-cols-4 gap-2 opacity-10 hidden lg:block">
    {[...Array(16)].map((_, i) => (
      <div key={i} className={`w-2 h-2 rounded-full bg-emerald-500 animate-pulse-dot`} 
           style={{ animationDelay: `${i * 0.1}s` }}></div>
    ))}
  </div>
  
  {/* Animated Lines - Top Left */}
  <div className="absolute top-20 left-10 w-20 h-0.5 bg-gradient-to-r from-emerald-400/20 to-transparent animate-line-grow hidden lg:block"></div>
  <div className="absolute top-24 left-10 w-12 h-0.5 bg-gradient-to-r from-orange-400/20 to-transparent animate-line-grow-delayed hidden lg:block"></div>
  
  {/* Animated Sparkles - Scattered */}
  {[...Array(12)].map((_, i) => (
    <div
      key={`sparkle-${i}`}
      className="absolute rounded-full animate-sparkle hidden lg:block"
      style={{
        top: `${5 + Math.random() * 90}%`,
        left: `${5 + Math.random() * 90}%`,
        animationDelay: `${i * 0.35}s`,
        width: i % 2 === 0 ? '4px' : '2px',
        height: i % 2 === 0 ? '4px' : '2px',
        background: i % 3 === 0 ? 'rgba(16,185,129,0.3)' : i % 3 === 1 ? 'rgba(251,146,60,0.3)' : 'rgba(255,255,255,0.4)',
      }}
    ></div>
  ))}

  <div className="relative z-10 max-w-7xl mx-auto">
    {/* Premium Section Header */}
    <div className="text-center mb-14">
      <div className="animate-fadeInUp">
        <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-2.5 rounded-full border border-white/60 shadow-lg hover:shadow-xl transition-all duration-500 group">
          <span className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-orange-500 rounded-full animate-pulse"></span>
          <span className="text-emerald-700 text-xs sm:text-sm font-semibold tracking-widest uppercase">FAQ</span>
          <span className="w-px h-5 bg-gradient-to-b from-emerald-300 to-orange-300"></span>
          <span className="text-orange-500 text-xs font-medium animate-pulse">✦ Quick Answers</span>
        </div>
      </div>
      
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-8 mb-4 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
        <span className="text-emerald-900">Frequently Asked</span>
        <br />
        <span className="bg-gradient-to-r from-emerald-500 via-orange-400 to-emerald-500 bg-clip-text text-transparent animate-gradient-shift">Questions</span>
      </h2>
      
      <div className="flex items-center justify-center gap-4 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-orange-500 rounded-full"></div>
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
        <div className="w-20 h-0.5 bg-gradient-to-r from-orange-500 to-transparent via-emerald-500 rounded-full"></div>
      </div>
      
      <p className="text-gray-500 mt-6 max-w-2xl mx-auto animate-fadeInUp leading-relaxed" style={{ animationDelay: "0.3s" }}>
        Find quick answers to common questions about our products, delivery, and services.
      </p>
    </div>

    {/* Premium FAQ Grid */}
    <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-7 shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 animate-fadeInUp border border-white/50 hover:border-emerald-200/50 overflow-hidden"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-white to-orange-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/10 to-orange-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-emerald-200/20 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-emerald-200/20 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="absolute -top-2 -right-2 text-7xl font-bold text-emerald-100/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {String(index + 1).padStart(2, '0')}
          </div>

          <div className="relative z-10">
            <div className="flex items-start gap-5">
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                  <span className="text-emerald-600 font-bold text-xl group-hover:text-white group-hover:scale-110 transition-all duration-300">Q</span>
                </div>
                <div className="absolute inset-0 rounded-2xl border-2 border-emerald-400/30 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-orange-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 text-base sm:text-lg mb-3 group-hover:text-emerald-600 transition-colors duration-300 group-hover:translate-x-1 transition-transform">
                  {faq.q}
                </h4>
                
                <div className="w-12 h-0.5 bg-gradient-to-r from-emerald-400 to-orange-400 rounded-full mb-3 group-hover:w-20 transition-all duration-500"></div>
                
                <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {faq.a}
                </p>
                
                <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <button
                    onClick={() => {
                      const formSection = document.getElementById('contact-form');
                      if (formSection) {
                        formSection.scrollIntoView({ 
                          behavior: 'smooth',
                          block: 'start'
                        });
                      }
                    }}
                    className="text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1 cursor-pointer group/learn"
                  >
                    Learn More
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-500 group-hover/learn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-emerald-200/50 transition-all duration-500"></div>
        </div>
      ))}
    </div>

    {/* Bottom Decorative Elements */}
    <div className="mt-16 text-center animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
      <div className="inline-flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
          <span>24/7 Support</span>
        </span>
        <span className="w-px h-4 bg-gray-200"></span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></span>
          <span>Fast Response</span>
        </span>
        <span className="w-px h-4 bg-gray-200"></span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></span>
          <span>100% Satisfaction</span>
        </span>
        <span className="w-px h-4 bg-gray-200"></span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: "1.5s" }}></span>
          <span>Expert Answers</span>
        </span>
      </div>
    </div>

    {/* Still Have Questions? CTA */}
    <div className="mt-12 text-center animate-fadeInUp" style={{ animationDelay: "0.5s" }}>
      <div className="inline-flex flex-wrap items-center justify-center gap-4 bg-white/90 backdrop-blur-sm px-6 sm:px-8 py-4 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-500 group">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <div className="text-left">
          <p className="text-sm font-semibold text-gray-800">Still have questions?</p>
          <p className="text-xs text-gray-500">We're here to help you 24/7</p>
        </div>
        <Link to="/contact">
          <button className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-orange-500 text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-emerald-500/30 transition-all duration-500 hover:scale-105 flex items-center gap-2">
            Contact Us
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </Link>
      </div>
    </div>
  </div>
</section>

    {/* 🎯 CTA SECTION - Premium Enhanced (Reduced Height) */}
<section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-20 overflow-hidden">
  
  {/* ===== PREMIUM ANIMATED BACKGROUND ===== */}
  <div className="absolute inset-0">
    <img 
      src="/about.webp" 
      alt="CTA" 
      className="w-full h-full object-cover animate-zoom-slow"
      onError={(e) => {
        e.target.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=400&fit=crop";
      }}
    />
    
    {/* Premium Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/95 via-teal-800/90 to-orange-900/90"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
    
    {/* Animated Gradient Orbs - Smaller */}
    <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-emerald-400/25 rounded-full blur-3xl animate-float-slow"></div>
    <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-orange-400/25 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: "1.5s" }}></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-300/15 rounded-full blur-3xl animate-pulse-slow"></div>
    
    {/* Animated Shimmer Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent animate-shimmer"></div>
    
    {/* Premium Pattern Overlay */}
    <div className="absolute inset-0 opacity-[0.03]" style={{ 
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M50 50v-5h-5v5h-5v5h5v5h5v-5h5v-5h-5zm0-40v-5h-5v5h-5v5h5v5h5v-5h5v-5h-5zM10 50v-5H5v5H0v5h5v5h5v-5h5v-5h-5zm0-40v-5H5v5H0v5h5v5h5v-5h5v-5h-5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundSize: "80px 80px"
    }}></div>
    
    {/* Floating Particles - Reduced */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float-particle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 12}s`,
            animationDuration: `${10 + Math.random() * 15}s`,
            width: i % 3 === 0 ? '2px' : '1.5px',
            height: i % 3 === 0 ? '2px' : '1.5px',
            background: i % 2 === 0 ? 'rgba(255,255,255,0.3)' : 'rgba(16,185,129,0.2)',
          }}
        />
      ))}
    </div>
  </div>

  {/* ===== OUTSIDE DECORATIVE ANIMATIONS - REDUCED ===== */}
  
  {/* Animated Circles - Decorative */}
  <div className="absolute -top-20 -left-20 w-48 h-48 border-2 border-white/5 rounded-full animate-spin-slow hidden lg:block"></div>
  <div className="absolute -bottom-20 -right-20 w-48 h-48 border-2 border-white/5 rounded-full animate-spin-slow-reverse hidden lg:block"></div>

  {/* Animated Sparkles - Reduced */}
  {[...Array(6)].map((_, i) => (
    <div
      key={`sparkle-cta-${i}`}
      className="absolute rounded-full animate-sparkle hidden lg:block"
      style={{
        top: `${10 + Math.random() * 80}%`,
        left: `${10 + Math.random() * 80}%`,
        animationDelay: `${i * 0.4}s`,
        width: i % 2 === 0 ? '3px' : '2px',
        height: i % 2 === 0 ? '3px' : '2px',
        background: i % 2 === 0 ? 'rgba(255,255,255,0.3)' : 'rgba(16,185,129,0.2)',
      }}
    ></div>
  ))}

  {/* ===== MAIN CONTENT ===== */}
  <div className="relative z-10 max-w-4xl mx-auto text-center">
    <div className="animate-fadeInUp">
      
      {/* Premium Badge - Smaller */}
      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/20 mb-4 hover:border-white/40 transition-all duration-500 group">
        <Heart className="w-3.5 h-3.5 text-emerald-300 animate-pulse group-hover:scale-125 transition-transform duration-300" />
        <span className="text-white/90 text-[10px] sm:text-xs font-medium tracking-wider">WE'D LOVE TO HEAR FROM YOU</span>
      </div>
      
      {/* Main Heading - Smaller */}
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 animate-gradient-shift">
        <span className="text-white drop-shadow-2xl">Have Questions?</span>
        <br />
        <span className="bg-gradient-to-r from-emerald-300 via-orange-300 to-emerald-300 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%] drop-shadow-2xl">
          We're Here to Help
        </span>
      </h2>
      
      {/* Animated Divider - Smaller */}
      <div className="flex items-center justify-center gap-3 mb-4 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full animate-pulse"></div>
        <div className="relative">
          <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-orange-400 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 w-2 h-2 bg-orange-400 rounded-full animate-ping opacity-50"></div>
        </div>
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
      </div>
      
      {/* Description - Smaller */}
      <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-2xl mx-auto mb-5 leading-relaxed animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
        Whether you need help with an order, have a product question, or just want to say hello — we're all ears!
      </p>
      
      {/* Trust Indicators - Smaller */}
      <div className="flex flex-wrap justify-center items-center gap-4 mb-5 animate-fadeInUp" style={{ animationDelay: "0.25s" }}>
        <div className="flex items-center gap-1.5 text-white/70 group cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:bg-emerald-500/30 transition-all duration-300">
            <ThumbsUp className="w-3.5 h-3.5 text-emerald-300 group-hover:text-white transition-colors" />
          </div>
          <span className="text-[10px] sm:text-xs group-hover:text-white transition-colors">98% Satisfaction</span>
        </div>
        <div className="w-px h-5 bg-white/20"></div>
        <div className="flex items-center gap-1.5 text-white/70 group cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:bg-orange-500/30 transition-all duration-300">
            <Clock className="w-3.5 h-3.5 text-orange-300 group-hover:text-white transition-colors" />
          </div>
          <span className="text-[10px] sm:text-xs group-hover:text-white transition-colors">Fast Response</span>
        </div>
        <div className="w-px h-5 bg-white/20"></div>
        <div className="flex items-center gap-1.5 text-white/70 group cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:bg-emerald-500/30 transition-all duration-300">
            <Shield className="w-3.5 h-3.5 text-emerald-300 group-hover:text-white transition-colors" />
          </div>
          <span className="text-[10px] sm:text-xs group-hover:text-white transition-colors">100% Secure</span>
        </div>
      </div>
      
      {/* CTA Buttons - Smaller */}
      <div className="flex flex-wrap justify-center gap-3 animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
        
        {/* Call Now Button */}
        <a href="tel:+919876543210">
          <button className="group relative px-6 py-2.5 sm:px-8 sm:py-3 bg-white text-emerald-700 font-semibold rounded-full shadow-2xl hover:shadow-emerald-500/40 transition-all duration-500 hover:scale-105 flex items-center gap-2 overflow-hidden text-xs sm:text-sm">
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-orange-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            <span className="relative z-10 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:animate-bounce-slow group-hover:rotate-12 transition-transform duration-300" />
              Call Now
            </span>
          </button>
        </a>
        
        {/* Back to Home Button */}
        <Link to="/">
          <button className="group relative px-6 py-2.5 sm:px-8 sm:py-3 bg-white/10 backdrop-blur-xl text-white font-semibold rounded-full border-2 border-white/30 hover:border-white/60 transition-all duration-500 hover:scale-105 hover:bg-white/20 flex items-center gap-2 text-xs sm:text-sm overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <span className="relative z-10 flex items-center gap-2">
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Home
            </span>
          </button>
        </Link>
      </div>
      
      {/* Bottom Trust Bar - Smaller */}
      <div className="flex flex-wrap justify-center items-center gap-4 mt-5 animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-orange-400 text-orange-400 animate-star-pop" style={{ animationDelay: `${i * 0.1 + 0.4}s` }} />
          ))}
          <span className="text-white/60 text-[10px] sm:text-xs ml-1.5">4.9/5 from 50K+ reviews</span>
        </div>
        <div className="w-px h-5 bg-white/20 hidden sm:block"></div>
        <div className="flex items-center gap-1.5 text-white/60 text-[10px] sm:text-xs">
          <Truck className="w-3.5 h-3.5 text-emerald-300" />
          <span>Free Delivery</span>
        </div>
        <div className="w-px h-5 bg-white/20 hidden sm:block"></div>
        <div className="flex items-center gap-1.5 text-white/60 text-[10px] sm:text-xs">
          <Shield className="w-3.5 h-3.5 text-emerald-300" />
          <span>100% Guarantee</span>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(30px); opacity: 0; }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
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
          animation: float-particle 12s ease-in-out infinite;
        }
        
        .animate-gradient-shift {
          animation: gradient-shift 3s ease-in-out infinite;
          background-size: 200% 200%;
        }
        
        @media (max-width: 640px) {
          .min-h-\\[35vh\\] {
            min-height: 30vh !important;
          }
        }

        @keyframes zoom-slow {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes shimmer {
  0% { transform: translateX(-100%) rotate(10deg); }
  100% { transform: translateX(100%) rotate(10deg); }
}

@keyframes shimmer-reverse {
  0% { transform: translateX(100%) rotate(-10deg); }
  100% { transform: translateX(-100%) rotate(-10deg); }
}

@keyframes scroll-dot {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(16px); opacity: 0; }
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-25px) rotate(3deg); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
}

@keyframes star-pop {
  0% { transform: scale(0) rotate(-180deg); opacity: 0; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
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
  100% { transform: translateY(-120px) translateX(40px); opacity: 0; }
}

.animate-zoom-slow { animation: zoom-slow 20s ease-in-out infinite; }
.animate-shimmer { animation: shimmer 4s ease-in-out infinite; }
.animate-shimmer-reverse { animation: shimmer-reverse 5s ease-in-out infinite; }
.animate-scroll-dot { animation: scroll-dot 2s ease-in-out infinite; }
.animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
.animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
.animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
.animate-star-pop { animation: star-pop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; }
.animate-gradient-shift { animation: gradient-shift 3s ease-in-out infinite; background-size: 200% 200%; }
.animate-float-particle { animation: float-particle 12s ease-in-out infinite; }
.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}bounce-slow 2s ease-in-out infinite;
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.animate-spin-slow {
  animation: spin-slow 10s linear infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}

.animate-float-particle {
  animation: float-particle 12s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

/* Outside Animations */
@keyframes float-leaf {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(15deg); }
}

@keyframes float-leaf-delayed {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-25px) rotate(-15deg); }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spin-slow-reverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

@keyframes pulse-dot {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.5); opacity: 1; }
}

@keyframes line-grow {
  0% { transform: scaleX(0); opacity: 0; }
  100% { transform: scaleX(1); opacity: 1; }
}

@keyframes line-grow-delayed {
  0% { transform: scaleX(0); opacity: 0; }
  50% { transform: scaleX(0); opacity: 0; }
  100% { transform: scaleX(1); opacity: 1; }
}

@keyframes sparkle {
  0%, 100% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.5); opacity: 0.8; }
}

/* Animation Classes */
.animate-float-leaf {
  animation: float-leaf 6s ease-in-out infinite;
}

.animate-float-leaf-delayed {
  animation: float-leaf-delayed 7s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

.animate-spin-slow-reverse {
  animation: spin-slow-reverse 25s linear infinite;
}

.animate-pulse-dot {
  animation: pulse-dot 2s ease-in-out infinite;
}

.animate-line-grow {
  animation: line-grow 3s ease-in-out infinite;
}

.animate-line-grow-delayed {
  animation: line-grow-delayed 4s ease-in-out infinite;
}

.animate-sparkle {
  animation: sparkle 3s ease-in-out infinite;
}

/* Background Animations */
@keyframes gradient-shift-slow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}



@keyframes wave {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes wave-delayed {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes float-circle {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
  50% { transform: translateY(-30px) scale(1.1); opacity: 0.6; }
}

@keyframes float-circle-delayed {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.2; }
  50% { transform: translateY(20px) scale(0.9); opacity: 0.5; }
}

@keyframes float-circle-slow {
  0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
  50% { transform: translateY(-20px) rotate(180deg); opacity: 0.5; }
}

@keyframes float-square {
  0%, 100% { transform: translateY(0) rotate(45deg); opacity: 0.2; }
  50% { transform: translateY(-25px) rotate(90deg); opacity: 0.5; }
}

@keyframes float-square-delayed {
  0%, 100% { transform: translateY(0) rotate(45deg); opacity: 0.15; }
  50% { transform: translateY(20px) rotate(0deg); opacity: 0.4; }
}

@keyframes dots-scroll {
  0% { background-position: 0 0; }
  100% { background-position: 60px 60px; }
}

/* Animation Classes */
.animate-gradient-shift-slow {
  background-size: 200% 200%;
  animation: gradient-shift-slow 8s ease-in-out infinite;
}



.animate-wave {
  animation: wave 8s ease-in-out infinite;
}

.animate-wave-delayed {
  animation: wave-delayed 8s ease-in-out infinite;
}

.animate-float-circle {
  animation: float-circle 5s ease-in-out infinite;
}

.animate-float-circle-delayed {
  animation: float-circle-delayed 6s ease-in-out infinite;
}

.animate-float-circle-slow {
  animation: float-circle-slow 8s ease-in-out infinite;
}

.animate-float-square {
  animation: float-square 7s ease-in-out infinite;
}

.animate-float-square-delayed {
  animation: float-square-delayed 9s ease-in-out infinite;
}

.animate-dots-scroll {
  animation: dots-scroll 20s linear infinite;
}

/* CTA Animations */
@keyframes zoom-slow {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes shimmer {
  0% { transform: translateX(-100%) rotate(10deg); }
  100% { transform: translateX(100%) rotate(10deg); }
}

@keyframes shimmer-reverse {
  0% { transform: translateX(100%) rotate(-10deg); }
  100% { transform: translateX(-100%) rotate(-10deg); }
}

@keyframes wave {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes wave-delayed {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spin-slow-reverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes star-pop {
  0% { transform: scale(0) rotate(-180deg); opacity: 0; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}

@keyframes sparkle {
  0%, 100% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.5); opacity: 0.8; }
}

/* Animation Classes */
.animate-zoom-slow {
  animation: zoom-slow 20s ease-in-out infinite;
}

.animate-shimmer {
  animation: shimmer 4s ease-in-out infinite;
}

.animate-shimmer-reverse {
  animation: shimmer-reverse 5s ease-in-out infinite;
}

.animate-wave {
  animation: wave 8s ease-in-out infinite;
}

.animate-wave-delayed {
  animation: wave-delayed 8s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

.animate-spin-slow-reverse {
  animation: spin-slow-reverse 25s linear infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}

.animate-star-pop {
  animation: star-pop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

.animate-sparkle {
  animation: sparkle 3s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 6s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-float-particle {
  animation: float-particle 12s ease-in-out infinite;
}

.animate-gradient-shift {
  animation: gradient-shift 3s ease-in-out infinite;
  background-size: 200% 200%;
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

/* ===== BUBBLE ANIMATIONS ===== */

/* Floating Bubbles - Left Side */
@keyframes bubble-float {
  0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.3; }
  25% { transform: translateY(-20px) translateX(10px) scale(1.1); opacity: 0.5; }
  50% { transform: translateY(-40px) translateX(-10px) scale(0.9); opacity: 0.7; }
  75% { transform: translateY(-20px) translateX(15px) scale(1.05); opacity: 0.5; }
  100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.3; }
}

@keyframes bubble-float-delayed {
  0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.2; }
  25% { transform: translateY(-15px) translateX(-8px) scale(1.15); opacity: 0.4; }
  50% { transform: translateY(-35px) translateX(12px) scale(0.85); opacity: 0.6; }
  75% { transform: translateY(-15px) translateX(-12px) scale(1.1); opacity: 0.4; }
  100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.2; }
}

@keyframes bubble-float-slow {
  0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.15; }
  50% { transform: translateY(-30px) translateX(8px) scale(1.2); opacity: 0.5; }
  100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.15; }
}

/* Floating Bubbles - Right Side */
@keyframes bubble-float-right {
  0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.3; }
  25% { transform: translateY(-25px) translateX(-10px) scale(1.1); opacity: 0.5; }
  50% { transform: translateY(-45px) translateX(10px) scale(0.9); opacity: 0.7; }
  75% { transform: translateY(-25px) translateX(-15px) scale(1.05); opacity: 0.5; }
  100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.3; }
}

@keyframes bubble-float-right-delayed {
  0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.2; }
  25% { transform: translateY(-20px) translateX(8px) scale(1.15); opacity: 0.4; }
  50% { transform: translateY(-40px) translateX(-12px) scale(0.85); opacity: 0.6; }
  75% { transform: translateY(-20px) translateX(12px) scale(1.1); opacity: 0.4; }
  100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.2; }
}

@keyframes bubble-float-right-slow {
  0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.15; }
  50% { transform: translateY(-35px) translateX(-8px) scale(1.2); opacity: 0.5; }
  100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.15; }
}

/* Center Bubbles */
@keyframes bubble-float-center {
  0% { transform: translateY(0) scale(1); opacity: 0.2; }
  50% { transform: translateY(-25px) scale(1.3); opacity: 0.5; }
  100% { transform: translateY(0) scale(1); opacity: 0.2; }
}

@keyframes bubble-float-center-delayed {
  0% { transform: translateY(0) scale(1); opacity: 0.15; }
  50% { transform: translateY(-20px) scale(1.25); opacity: 0.4; }
  100% { transform: translateY(0) scale(1); opacity: 0.15; }
}

/* Tiny Bubbles */
@keyframes bubble-float-tiny {
  0% { transform: translateY(0) translateX(0); opacity: 0.1; }
  50% { transform: translateY(-30px) translateX(10px); opacity: 0.4; }
  100% { transform: translateY(0) translateX(0); opacity: 0.1; }
}

@keyframes bubble-float-tiny-delayed {
  0% { transform: translateY(0) translateX(0); opacity: 0.1; }
  50% { transform: translateY(-25px) translateX(-10px); opacity: 0.4; }
  100% { transform: translateY(0) translateX(0); opacity: 0.1; }
}

/* Bubble Glow Effects */
@keyframes bubble-glow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.2); }
}

@keyframes bubble-glow-delayed {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.3); }
}

/* Animation Classes */
.animate-bubble-float {
  animation: bubble-float 8s ease-in-out infinite;
}

.animate-bubble-float-delayed {
  animation: bubble-float-delayed 10s ease-in-out infinite;
}

.animate-bubble-float-slow {
  animation: bubble-float-slow 12s ease-in-out infinite;
}

.animate-bubble-float-right {
  animation: bubble-float-right 9s ease-in-out infinite;
}

.animate-bubble-float-right-delayed {
  animation: bubble-float-right-delayed 11s ease-in-out infinite;
}

.animate-bubble-float-right-slow {
  animation: bubble-float-right-slow 13s ease-in-out infinite;
}

.animate-bubble-float-center {
  animation: bubble-float-center 7s ease-in-out infinite;
}

.animate-bubble-float-center-delayed {
  animation: bubble-float-center-delayed 9s ease-in-out infinite;
}

.animate-bubble-float-tiny {
  animation: bubble-float-tiny 6s ease-in-out infinite;
}

.animate-bubble-float-tiny-delayed {
  animation: bubble-float-tiny-delayed 8s ease-in-out infinite;
}

.animate-bubble-glow {
  animation: bubble-glow 4s ease-in-out infinite;
}

.animate-bubble-glow-delayed {
  animation: bubble-glow-delayed 5s ease-in-out infinite;
}

/* ===== ENHANCED BUBBLE ANIMATIONS ===== */

/* Large Bubbles - Left */
@keyframes bubble-float-large {
  0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.15; }
  25% { transform: translateY(-30px) translateX(15px) scale(1.15); opacity: 0.4; }
  50% { transform: translateY(-60px) translateX(-15px) scale(0.85); opacity: 0.6; }
  75% { transform: translateY(-30px) translateX(20px) scale(1.08); opacity: 0.4; }
  100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.15; }
}

@keyframes bubble-float-large-delayed {
  0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.1; }
  25% { transform: translateY(-25px) translateX(-12px) scale(1.2); opacity: 0.35; }
  50% { transform: translateY(-50px) translateX(18px) scale(0.8); opacity: 0.55; }
  75% { transform: translateY(-25px) translateX(-18px) scale(1.1); opacity: 0.35; }
  100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.1; }
}

/* Medium Bubbles - Left */
@keyframes bubble-float-medium {
  0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.2; }
  25% { transform: translateY(-20px) translateX(10px) scale(1.1); opacity: 0.45; }
  50% { transform: translateY(-40px) translateX(-10px) scale(0.9); opacity: 0.65; }
  75% { transform: translateY(-20px) translateX(15px) scale(1.05); opacity: 0.45; }
  100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.2; }
}

@keyframes bubble-float-medium-delayed {
  0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.15; }
  25% { transform: translateY(-15px) translateX(-8px) scale(1.15); opacity: 0.4; }
  50% { transform: translateY(-35px) translateX(12px) scale(0.85); opacity: 0.6; }
  75% { transform: translateY(-15px) translateX(-12px) scale(1.1); opacity: 0.4; }
  100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.15; }
}

/* Small Bubbles - Left */
@keyframes bubble-float-small {
  0% { transform: translateY(0) translateX(0); opacity: 0.25; }
  50% { transform: translateY(-25px) translateX(8px); opacity: 0.6; }
  100% { transform: translateY(0) translateX(0); opacity: 0.25; }
}

@keyframes bubble-float-small-delayed {
  0% { transform: translateY(0) translateX(0); opacity: 0.2; }
  50% { transform: translateY(-20px) translateX(-8px); opacity: 0.5; }
  100% { transform: translateY(0) translateX(0); opacity: 0.2; }
}

/* Large Bubbles - Right */
@keyframes bubble-float-right-large {
  0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.15; }
  25% { transform: translateY(-35px) translateX(-15px) scale(1.15); opacity: 0.4; }
  50% { transform: translateY(-65px) translateX(15px) scale(0.85); opacity: 0.6; }
  75% { transform: translateY(-35px) translateX(-20px) scale(1.08); opacity: 0.4; }
  100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.15; }
}

@keyframes bubble-float-right-large-delayed {
  0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.1; }
  25% { transform: translateY(-30px) translateX(12px) scale(1.2); opacity: 0.35; }
  50% { transform: translateY(-55px) translateX(-18px) scale(0.8); opacity: 0.55; }
  75% { transform: translateY(-30px) translateX(18px) scale(1.1); opacity: 0.35; }
  100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.1; }
}

/* Right Medium Bubbles */
@keyframes bubble-float-right-medium {
  0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.2; }
  25% { transform: translateY(-25px) translateX(-10px) scale(1.1); opacity: 0.45; }
  50% { transform: translateY(-45px) translateX(10px) scale(0.9); opacity: 0.65; }
  75% { transform: translateY(-25px) translateX(-15px) scale(1.05); opacity: 0.45; }
  100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.2; }
}

@keyframes bubble-float-right-medium-delayed {
  0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.15; }
  25% { transform: translateY(-20px) translateX(8px) scale(1.15); opacity: 0.4; }
  50% { transform: translateY(-40px) translateX(-12px) scale(0.85); opacity: 0.6; }
  75% { transform: translateY(-20px) translateX(12px) scale(1.1); opacity: 0.4; }
  100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.15; }
}

/* Right Small Bubbles */
@keyframes bubble-float-right-small {
  0% { transform: translateY(0) translateX(0); opacity: 0.25; }
  50% { transform: translateY(-30px) translateX(-8px); opacity: 0.6; }
  100% { transform: translateY(0) translateX(0); opacity: 0.25; }
}

@keyframes bubble-float-right-small-delayed {
  0% { transform: translateY(0) translateX(0); opacity: 0.2; }
  50% { transform: translateY(-25px) translateX(8px); opacity: 0.5; }
  100% { transform: translateY(0) translateX(0); opacity: 0.2; }
}

/* Center Bubbles */
@keyframes bubble-float-center {
  0% { transform: translateY(0) scale(1); opacity: 0.2; }
  50% { transform: translateY(-30px) scale(1.3); opacity: 0.6; }
  100% { transform: translateY(0) scale(1); opacity: 0.2; }
}

@keyframes bubble-float-center-delayed {
  0% { transform: translateY(0) scale(1); opacity: 0.15; }
  50% { transform: translateY(-25px) scale(1.25); opacity: 0.5; }
  100% { transform: translateY(0) scale(1); opacity: 0.15; }
}

/* Tiny Bubbles */
@keyframes bubble-float-tiny {
  0% { transform: translateY(0) translateX(0); opacity: 0.1; }
  50% { transform: translateY(-40px) translateX(15px); opacity: 0.4; }
  100% { transform: translateY(0) translateX(0); opacity: 0.1; }
}

/* Bubble Glow Effects */
@keyframes bubble-glow-large {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.2); }
}

@keyframes bubble-glow-large-delayed {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.3); }
}

@keyframes bubble-glow-medium {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.15); }
}

@keyframes bubble-glow-medium-delayed {
  0%, 100% { opacity: 0.15; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.2); }
}

/* Bubble Trail Effects */
@keyframes bubble-trail {
  0% { transform: translateY(0) scale(1); opacity: 0.3; }
  50% { transform: translateY(-30px) scale(1.1); opacity: 0.6; }
  100% { transform: translateY(0) scale(1); opacity: 0.3; }
}

@keyframes bubble-trail-delayed {
  0% { transform: translateY(0) scale(1); opacity: 0.2; }
  50% { transform: translateY(-25px) scale(1.15); opacity: 0.5; }
  100% { transform: translateY(0) scale(1); opacity: 0.2; }
}
      `}</style>
    </div>
  );
};

export default Contact;