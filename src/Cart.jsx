// src/Components/pages/Cart.jsx

import React, { useState, useEffect, useRef } from "react";
import {
  ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Truck, Shield, Clock, 
  Leaf, CheckCircle, X, AlertCircle, Gift, Percent, Zap, Users, Package, 
  Sparkles, Timer, Star, TrendingUp, Award, Flame, Heart, Share2, RefreshCw, 
  MapPin, CreditCard, RotateCcw, ThumbsUp, MessageCircle, Rocket, Coffee, Sun,
  Crown, Gem, Diamond, Wand2, Feather, Compass
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [discount, setDiscount] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [selectedDelivery, setSelectedDelivery] = useState("standard");
  const [isInitialized, setIsInitialized] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [particles, setParticles] = useState([]);
  
  // Refs
  const cartContainerRef = useRef(null);
  const mainContainerRef = useRef(null);

  // Load cart from localStorage with better error handling
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        console.log('Cart page - Raw cart data from localStorage:', savedCart);
        
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          console.log('Cart page - Parsed cart data:', parsedCart);
          
          if (Array.isArray(parsedCart) && parsedCart.length > 0) {
            setCartItems(parsedCart);
          } else {
            setCartItems([]);
          }
        } else {
          setCartItems([]);
        }
        setIsInitialized(true);
      } catch (e) {
        console.error('Cart page - Error loading cart:', e);
        setCartItems([]);
        setIsInitialized(true);
      }
    };

    loadCart();

    const handleStorageChange = (e) => {
      if (e.key === 'cart') {
        loadCart();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      try {
        if (cartItems.length > 0) {
          localStorage.setItem('cart', JSON.stringify(cartItems));
          console.log('Cart page - Cart saved to localStorage:', cartItems);
        } else {
          localStorage.removeItem('cart');
        }
      } catch (e) {
        console.error('Cart page - Error saving cart:', e);
      }
    }
  }, [cartItems, isInitialized]);

  // Update delivery fee based on cart total
  useEffect(() => {
    const subtotal = getSubtotal();
    // Set default delivery fee based on subtotal
    if (subtotal >= 499) {
      setDeliveryFee(0);
      if (selectedDelivery === "standard") {
        setSelectedDelivery("express");
      }
    } else if (subtotal >= 299) {
      setDeliveryFee(49);
      if (selectedDelivery === "standard") {
        setSelectedDelivery("standard");
      }
    } else {
      setDeliveryFee(49);
      setSelectedDelivery("standard");
    }
  }, [cartItems]);

  // Fix scrolling on mount and route changes
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  // Particle animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (cartItems.length > 0) {
        const newParticle = {
          id: Date.now(),
          x: Math.random() * 100,
          y: -10,
          size: Math.random() * 6 + 2,
          speed: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          color: ['#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'][Math.floor(Math.random() * 5)]
        };
        setParticles(prev => [...prev, newParticle]);
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, 3000);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [cartItems]);

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
  };

  const updateQuantity = (productId, change) => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === productId) {
          const newQuantity = (item.quantity || 0) + change;
          if (newQuantity < 1) return item;
          if (newQuantity > 10) return item;
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const removeItem = (productId) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== productId);
      if (newItems.length === 0) {
        localStorage.removeItem('cart');
      }
      return newItems;
    });
  };

  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      setCartItems([]);
      localStorage.removeItem('cart');
      setPromoApplied(false);
      setDiscount(0);
      setPromoCode("");
    }
  };

  const applyPromoCode = () => {
    if (!promoCode.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }

    const validPromoCodes = {
      "FRESH10": { discount: 10, type: "percentage" },
      "FRESH20": { discount: 20, type: "percentage" },
      "WELCOME": { discount: 50, type: "fixed" },
      "SAVE15": { discount: 15, type: "percentage" },
      "ORGANIC": { discount: 25, type: "percentage" },
      "VIP2026": { discount: 30, type: "percentage" },
    };

    const promo = validPromoCodes[promoCode.toUpperCase()];
    if (promo) {
      const subtotal = getSubtotal();
      let discountAmount = 0;
      if (promo.type === "percentage") {
        discountAmount = (subtotal * promo.discount) / 100;
      } else {
        discountAmount = promo.discount;
      }
      setDiscount(Math.min(discountAmount, subtotal));
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
      setDiscount(0);
      setPromoApplied(false);
    }
  };

  const removePromoCode = () => {
    setPromoApplied(false);
    setDiscount(0);
    setPromoCode("");
    setPromoError("");
  };

  const subtotal = getSubtotal();
  const totalItems = getTotalItems();
  const total = subtotal + deliveryFee - discount;

  // FIXED: handleCheckout now sends selectedDelivery to checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setLoading(true);
    
    // IMPORTANT: Send ALL data to checkout including selectedDelivery
    const checkoutData = {
      cartItems: cartItems,
      deliveryFee: deliveryFee,
      selectedDelivery: selectedDelivery, // THIS WAS MISSING!
      discount: discount || 0
    };
    
    // Save to localStorage as backup
    localStorage.setItem('deliveryInfo', JSON.stringify({
      deliveryFee: deliveryFee,
      selectedDelivery: selectedDelivery
    }));
    
    setTimeout(() => {
      setLoading(false);
      navigate('/checkout', { state: checkoutData });
    }, 1500);
  };

  // Get delivery options based on subtotal with real-time timing
  const getDeliveryOptions = () => {
    const currentHour = new Date().getHours();
    const isMorning = currentHour < 12;
    const isAfternoon = currentHour >= 12 && currentHour < 17;
    const isEvening = currentHour >= 17;

    const getNextTimeSlot = (baseHour, baseMinute, addHours = 0) => {
      const now = new Date();
      const target = new Date(now);
      target.setHours(baseHour, baseMinute, 0, 0);
      
      if (target < now) {
        target.setDate(target.getDate() + 1);
      }
      
      if (addHours > 0) {
        target.setHours(target.getHours() + addHours);
      }
      
      return target;
    };

    const formatTime = (date) => {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    };

    let standardStart, standardEnd, expressStart, expressEnd, quickStart, quickEnd;

    if (isMorning) {
      standardStart = getNextTimeSlot(14, 0);
      standardEnd = getNextTimeSlot(16, 0);
      expressStart = getNextTimeSlot(11, 0);
      expressEnd = getNextTimeSlot(13, 0);
      quickStart = getNextTimeSlot(9, 30);
      quickEnd = getNextTimeSlot(11, 30);
    } else if (isAfternoon) {
      standardStart = getNextTimeSlot(17, 0);
      standardEnd = getNextTimeSlot(19, 0);
      expressStart = getNextTimeSlot(14, 0);
      expressEnd = getNextTimeSlot(16, 0);
      quickStart = getNextTimeSlot(12, 30);
      quickEnd = getNextTimeSlot(14, 30);
    } else {
      standardStart = getNextTimeSlot(10, 0, 1);
      standardEnd = getNextTimeSlot(12, 0, 1);
      expressStart = getNextTimeSlot(9, 0, 1);
      expressEnd = getNextTimeSlot(11, 0, 1);
      quickStart = getNextTimeSlot(8, 0, 1);
      quickEnd = getNextTimeSlot(10, 0, 1);
    }

    const options = [
      {
        id: "quick",
        label: "Quick Delivery",
        icon: "⚡",
        time: `${formatTime(quickStart)} - ${formatTime(quickEnd)}`,
        fee: subtotal >= 399 ? 0 : 99,
        min: 0,
        description: subtotal >= 399 ? "Free Quick Delivery" : "Priority Delivery",
        estimated: "15-25 mins",
        color: "purple",
        bgColor: "purple",
        borderColor: "purple-400",
        textColor: "purple-600",
        popular: true,
        tag: "Fastest"
      },
      {
        id: "express",
        label: "Express Delivery",
        icon: "🚀",
        time: `${formatTime(expressStart)} - ${formatTime(expressEnd)}`,
        fee: subtotal >= 499 ? 0 : 59,
        min: 0,
        description: subtotal >= 499 ? "Free Express" : "Standard Express",
        estimated: "30-45 mins",
        color: "orange",
        bgColor: "orange",
        borderColor: "orange-400",
        textColor: "orange-600",
        popular: false,
        tag: "Popular"
      },
      {
        id: "standard",
        label: "Standard Delivery",
        icon: "🚚",
        time: `${formatTime(standardStart)} - ${formatTime(standardEnd)}`,
        fee: subtotal >= 299 ? 0 : 49,
        min: 0,
        description: subtotal >= 299 ? "Free Standard" : "Standard Delivery",
        estimated: "1-2 hrs",
        color: "blue",
        bgColor: "blue",
        borderColor: "blue-400",
        textColor: "blue-600",
        popular: false,
        tag: "Economy"
      },
    ];
    return options;
  };

  const deliveryOptions = getDeliveryOptions();

  // Show loading state
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin-slow mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-orange-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="mt-6 text-gray-600 font-light tracking-wide">Preparing your cart...</p>
        </div>
      </div>
    );
  }

  // Empty Cart Component
  if (cartItems.length === 0) {
    return (
      <div ref={mainContainerRef} className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 mt-10">
        <div className="w-auto mx-auto px-4 pt-32 pb-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="w-40 h-40 bg-gradient-to-br from-emerald-100 to-orange-100 rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-700 group-hover:scale-110">
                  <ShoppingCart className="w-20 h-20 text-emerald-600 group-hover:text-emerald-500 transition-all duration-300" />
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg animate-float">
                  <X className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center shadow-lg animate-pulse-slow">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-800 mb-4 tracking-tight">
              Your Cart is <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-orange-500">Empty</span>
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto text-lg font-light">
              Looks like you haven't added any fresh products yet. Explore our collection and find the freshest produce!
            </p>
            
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-2xl shadow-2xl shadow-emerald-200 hover:shadow-3xl hover:scale-105 transition-all duration-500 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform duration-300" />
              <span className="font-medium tracking-wide">Start Shopping</span>
              <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </button>
          </div>

          <div className="mt-20">
            <h3 className="text-2xl font-semibold text-gray-700 mb-8 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-orange-500">✦ Fresh Picks</span> For You
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { icon: "🍎", label: "Fresh Fruits", bg: "from-red-50 to-orange-50", hover: "hover:from-red-100 hover:to-orange-100" },
                { icon: "🥬", label: "Vegetables", bg: "from-green-50 to-emerald-50", hover: "hover:from-green-100 hover:to-emerald-100" },
                { icon: "🍊", label: "Exotic Fruits", bg: "from-orange-50 to-yellow-50", hover: "hover:from-orange-100 hover:to-yellow-100" },
                { icon: "🥑", label: "Organic Picks", bg: "from-emerald-50 to-teal-50", hover: "hover:from-emerald-100 hover:to-teal-100" },
              ].map((category, index) => (
                <button
                  key={index}
                  onClick={() => navigate('/fresh-products')}
                  className={`p-6 rounded-2xl bg-gradient-to-br ${category.bg} ${category.hover} transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-white/50 group`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
                  <p className="text-sm font-medium text-gray-700 group-hover:text-emerald-600 transition-colors duration-300">{category.label}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mainContainerRef} 
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 relative overflow-hidden"
    >
      {/* Background particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute pointer-events-none rounded-full animate-float-up"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: particle.color,
            opacity: particle.opacity,
            animationDuration: `${particle.speed}s`,
          }}
        />
      ))}

      {/* Cart Header */}
      <div className="w-full bg-white/80 backdrop-blur-md border-b border-emerald-100/30 shadow-xl mt-32 relative z-10">
        <div className="w-auto mx-auto px-4 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-3 hover:bg-emerald-50 rounded-2xl transition-all duration-500 hover:scale-110 hover:rotate-6 group"
              >
                <ArrowLeft className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                  <div className="relative">
                    <ShoppingCart className="w-8 h-8 text-emerald-600 animate-bounce-slow" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center animate-pulse-slow">
                      <span className="text-[8px] text-white font-bold">{totalItems}</span>
                    </div>
                  </div>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-orange-500">Your Cart</span>
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all duration-500 hover:scale-105 group"
              >
                <Share2 className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-sm font-medium hidden sm:inline">Share</span>
              </button>
              <button
                onClick={clearCart}
                className="flex items-center gap-2 px-4 py-2.5 text-red-500 hover:bg-red-50 rounded-2xl transition-all duration-500 hover:scale-105 group"
              >
                <Trash2 className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                <span className="text-sm font-medium hidden sm:inline">Clear</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Content */}
      <div ref={cartContainerRef} className="w-auto mx-auto px-4 pt-8 pb-12 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats Bar */}
            <div className="bg-gradient-to-r from-emerald-50/80 via-white/80 to-orange-50/80 backdrop-blur-sm p-5 rounded-2xl border border-emerald-100/50 flex items-center justify-between flex-wrap gap-3 shadow-lg">
              <div className="flex items-center gap-6 flex-wrap">
                <span className="text-sm text-gray-600 flex items-center gap-2">
                  <Package className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold">{totalItems}</span> items
                </span>
                <span className="text-sm text-gray-600 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold">₹{subtotal}</span> subtotal
                </span>
                {deliveryFee === 0 && subtotal >= 499 && (
                  <span className="text-sm text-emerald-600 flex items-center gap-2 animate-pulse-slow bg-emerald-100/50 px-3 py-1 rounded-full">
                    <Truck className="w-4 h-4" />
                    Free Delivery
                    <Sparkles className="w-3 h-3" />
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md flex items-center gap-1">
                  <Shield className="w-3 h-3 text-emerald-600" />
                  Secure
                </span>
                <span className="text-xs bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md flex items-center gap-1">
                  <RefreshCw className="w-3 h-3 text-orange-500" />
                  Easy Returns
                </span>
              </div>
            </div>

            {cartItems.map((item, index) => {
              if (!item || !item.id) return null;
              
              let itemImage = '/default-product.jpg';
              if (item.image) {
                if (Array.isArray(item.image) && item.image.length > 0) {
                  itemImage = item.image[0];
                } else if (typeof item.image === 'string') {
                  itemImage = item.image;
                }
              }
              
              const itemTotal = (item.price || 0) * (item.quantity || 0);
              const isHovered = hoveredItem === item.id;
              
              return (
                <div
                  key={item.id}
                  className={`group bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden border border-emerald-100/30 hover:border-emerald-200/50 transform hover:-translate-y-1 ${
                    isHovered ? 'scale-[1.02] shadow-3xl' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.08}s` }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-6">
                    <div className="relative flex-shrink-0 group">
                      <div className="w-28 h-28 rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-50 to-orange-50 shadow-xl group-hover:shadow-2xl transition-all duration-500">
                        <img
                          src={itemImage}
                          alt={item.name || 'Product'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            e.target.src = '/default-product.jpg';
                          }}
                        />
                      </div>
                      {item.discount > 0 && (
                        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-2xl animate-pulse-slow">
                          {item.discount}% OFF
                        </div>
                      )}
                      {item.isOrganic && (
                        <div className="absolute -bottom-2 -left-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[8px] font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                          <Leaf className="w-3 h-3" />
                          Organic
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors duration-500">
                              {item.name || 'Product'}
                            </h3>
                            {item.rating && (
                              <span className="flex items-center gap-1 text-xs bg-orange-50 px-2.5 py-1 rounded-full shadow-sm">
                                <Star className="w-3 h-3 fill-orange-400 text-orange-400" />
                                {item.rating}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 font-light">{item.unit || 'unit'}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {item.isOrganic && (
                              <span className="inline-flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
                                <Leaf className="w-3 h-3" />
                                Organic
                              </span>
                            )}
                            {item.inStock && (
                              <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
                                <CheckCircle className="w-3 h-3" />
                                In Stock
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setWishlistItems([...wishlistItems, item.id]);
                            }}
                            className="p-2.5 text-gray-400 hover:text-pink-500 rounded-xl hover:bg-pink-50 transition-all duration-500 hover:scale-110 group"
                          >
                            <Heart className="w-4 h-4 group-hover:fill-pink-500 transition-all duration-300" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2.5 text-gray-400 hover:text-red-500 rounded-xl hover:bg-red-50 transition-all duration-500 hover:scale-110 group"
                          >
                            <Trash2 className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xl font-bold text-emerald-700">
                            ₹{item.price || 0}
                          </span>
                          {item.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              ₹{item.originalPrice}
                            </span>
                          )}
                          {item.discount > 0 && (
                            <span className="text-xs text-orange-500 font-medium bg-orange-50 px-2.5 py-1 rounded-full shadow-sm">
                              Save ₹{Math.round((item.originalPrice - item.price) * (item.quantity || 0))}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-50/80 to-orange-50/80 backdrop-blur-sm rounded-2xl p-1.5 border border-emerald-200/50 shadow-inner">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-2 rounded-xl hover:bg-emerald-200/80 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={(item.quantity || 0) <= 1}
                            >
                              <Minus className="w-4 h-4 text-emerald-600" />
                            </button>
                            <span className="w-10 text-center font-bold text-gray-800 text-sm">
                              {item.quantity || 0}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-2 rounded-xl hover:bg-emerald-200/80 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={(item.quantity || 0) >= 10}
                            >
                              <Plus className="w-4 h-4 text-emerald-600" />
                            </button>
                          </div>

                          <span className="text-base font-bold text-gray-800 min-w-[60px] text-right">
                            ₹{itemTotal}
                          </span>
                        </div>
                      </div>

                      {/* Additional product details */}
                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                        {item.weight && (
                          <span className="flex items-center gap-1 bg-gray-50/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
                            <Package className="w-3 h-3" />
                            {item.weight}
                          </span>
                        )}
                        {item.origin && (
                          <span className="flex items-center gap-1 bg-gray-50/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
                            <MapPin className="w-3 h-3" />
                            {item.origin}
                          </span>
                        )}
                        {item.category && (
                          <span className="bg-gray-50/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
                            {item.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {item.inStock === false && (
                    <div className="px-6 pb-4">
                      <div className="flex items-center gap-2 text-red-600 bg-red-50/80 backdrop-blur-sm p-3 rounded-xl text-xs animate-pulse-slow border border-red-200/50">
                        <AlertCircle className="w-4 h-4" />
                        <span>Out of stock! Please remove this item.</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <button
              onClick={() => navigate('/')}
              className="w-full py-5 text-emerald-600 font-semibold hover:bg-emerald-50/80 backdrop-blur-sm rounded-3xl transition-all duration-500 flex items-center justify-center gap-3 group border-2 border-dashed border-emerald-200/50 hover:border-emerald-400/80 hover:shadow-lg"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform duration-500" />
              Continue Shopping
              <span className="text-xs text-gray-400 group-hover:text-emerald-600 transition-colors duration-300">
                • Add more fresh items
              </span>
              <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-500" />
            </button>
          </div>

          {/* Order Summary - Sticky */}
          <div className="lg:col-span-1 self-start">
            <div className="sticky top-[145px]">
              <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-emerald-100/30 hover:shadow-3xl transition-all duration-500">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Diamond className="w-5 h-5 text-emerald-600" />
                    Order Summary
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm">
                    <CheckCircle className="w-3 h-3" />
                    Secure Checkout
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-emerald-100/50">
                  <span className="text-gray-600">Items ({totalItems})</span>
                  <span className="font-semibold text-gray-800">₹{subtotal}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-emerald-100/50">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    <span className="text-gray-600">Delivery Fee</span>
                  </div>
                  <span className={deliveryFee === 0 ? "text-emerald-600 font-semibold" : "text-gray-800"}>
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                  </span>
                </div>

                {/* Delivery Options */}
                <div className="py-4 border-b border-emerald-100/50">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-gray-500 font-medium">Delivery Options</p>
                    <span className="text-[10px] text-orange-500 flex items-center gap-1 animate-pulse-slow">
                      <Timer className="w-3 h-3" />
                      Live
                    </span>
                  </div>
                  <div className="space-y-3">
                    {deliveryOptions.map((option) => {
                      const isAvailable = subtotal >= option.min;
                      const isSelected = selectedDelivery === option.id;
                      
                      return (
                        <label
                          key={option.id}
                          className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all duration-500 relative ${
                            isSelected
                              ? `bg-gradient-to-r from-${option.bgColor}-50/90 to-${option.bgColor}-100/90 backdrop-blur-sm border-2 border-${option.borderColor} shadow-xl scale-[1.02]`
                              : isAvailable 
                                ? "hover:bg-gray-50/80 backdrop-blur-sm border-2 border-transparent hover:border-emerald-200/50" 
                                : "opacity-40 cursor-not-allowed border-2 border-transparent"
                          }`}
                        >
                          {option.popular && (
                            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[8px] font-bold px-2.5 py-1 rounded-full shadow-2xl animate-pulse-slow">
                              {option.tag}
                            </div>
                          )}
                          
                          <div className="flex items-center gap-3 flex-1">
                            <input
                              type="radio"
                              name="delivery"
                              value={option.id}
                              checked={isSelected}
                              onChange={() => {
                                if (isAvailable) {
                                  setSelectedDelivery(option.id);
                                  setDeliveryFee(option.fee);
                                }
                              }}
                              className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
                              disabled={!isAvailable}
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-base">{option.icon}</span>
                                <span className="text-sm font-medium text-gray-700">
                                  {option.label}
                                </span>
                                {isSelected && (
                                  <Sparkles className="w-3 h-3 text-orange-500 animate-pulse-slow" />
                                )}
                                <span className={`text-[10px] bg-${option.bgColor}-100 text-${option.textColor} px-2 py-0.5 rounded-full shadow-sm`}>
                                  {option.estimated}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 font-light">
                                {option.time}
                              </p>
                              <p className="text-[10px] text-gray-400 font-light">
                                {option.description}
                              </p>
                              {!isAvailable && (
                                <p className="text-[10px] text-orange-500 animate-pulse-slow mt-1">
                                  Add ₹{option.min - subtotal} more
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className={`text-sm font-semibold ${option.fee === 0 ? "text-emerald-600" : "text-gray-700"}`}>
                              {option.fee === 0 ? "FREE" : `₹${option.fee}`}
                            </span>
                            {option.fee > 0 && subtotal >= option.min && (
                              <span className="text-[8px] text-emerald-500">
                                Free above ₹{option.min}
                              </span>
                            )}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                  
                  {/* Delivery Time Info */}
                  <div className="mt-3 p-3 bg-gradient-to-r from-emerald-50/80 to-blue-50/80 backdrop-blur-sm rounded-xl border border-emerald-100/50 shadow-sm">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      <span>All items are delivered fresh within 2 hours</span>
                    </div>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="py-4 border-b border-emerald-100/50">
                  {!promoApplied ? (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter promo code"
                          className="flex-1 px-4 py-2.5 border border-emerald-200/50 rounded-xl text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100/50 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                          onKeyPress={(e) => e.key === 'Enter' && applyPromoCode()}
                        />
                        <button
                          onClick={applyPromoCode}
                          className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl text-sm font-medium hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-2xl"
                        >
                          Apply
                        </button>
                      </div>
                      {promoError && (
                        <p className="text-xs text-red-500 animate-shake">{promoError}</p>
                      )}
                      <div className="flex flex-wrap gap-1.5">
                        <span className="text-[10px] text-gray-400">Try:</span>
                        {["FRESH10", "FRESH20", "WELCOME", "ORGANIC"].map((code) => (
                          <button
                            key={code}
                            onClick={() => setPromoCode(code)}
                            className="text-[10px] bg-gray-100/80 backdrop-blur-sm px-2.5 py-0.5 rounded-full hover:bg-emerald-100 transition-all duration-300 hover:scale-105"
                          >
                            {code}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50/90 to-emerald-100/90 backdrop-blur-sm rounded-xl animate-slide-up border border-emerald-200/50 shadow-md">
                      <div className="flex items-center gap-2">
                        <Gift className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-medium text-emerald-700">
                          Promo Applied! 🎉
                        </span>
                      </div>
                      <button
                        onClick={removePromoCode}
                        className="text-sm text-red-500 hover:text-red-700 transition-all duration-300 hover:scale-105"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {discount > 0 && (
                  <div className="flex items-center justify-between py-3 border-b border-emerald-100/50 text-emerald-600 animate-slide-up">
                    <span className="flex items-center gap-2">
                      <Percent className="w-4 h-4" />
                      Discount
                    </span>
                    <span className="font-semibold">-₹{discount}</span>
                  </div>
                )}

                <div className="flex items-center justify-between py-6 mt-2">
                  <span className="text-xl font-bold text-gray-800">Total</span>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-emerald-700">
                      ₹{total}
                    </span>
                    {deliveryFee === 0 && subtotal >= 499 && (
                      <p className="text-xs text-emerald-600 flex items-center gap-1 justify-end animate-pulse-slow">
                        <CheckCircle className="w-3 h-3" />
                        Free Delivery
                      </p>
                    )}
                  </div>
                </div>

                {subtotal < 499 && (
                  <div className="mb-4 p-4 bg-gradient-to-r from-orange-50/90 to-yellow-50/90 backdrop-blur-sm rounded-xl border border-orange-200/50 animate-slide-up shadow-sm">
                    <div className="flex items-center gap-2 text-sm text-orange-700">
                      <Truck className="w-4 h-4" />
                      <span>
                        Add ₹{499 - subtotal} more for FREE delivery
                      </span>
                    </div>
                    <div className="mt-2 h-2 bg-orange-200/50 rounded-full overflow-hidden shadow-inner">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min((subtotal / 499) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-orange-600 mt-1.5 font-medium">
                      {Math.round((subtotal / 499) * 100)}% to free delivery
                    </p>
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={loading || cartItems.length === 0}
                  className={`w-full py-5 rounded-2xl font-bold text-white transition-all duration-500 flex items-center justify-center gap-3 ${
                    loading || cartItems.length === 0
                      ? "bg-gray-300/80 cursor-not-allowed"
                      : "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-2xl shadow-emerald-200/50 hover:shadow-3xl hover:scale-[1.02] active:scale-95"
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      <span className="tracking-wide">Proceed to Checkout</span>
                      <Sparkles className="w-4 h-4 opacity-0 hover:opacity-100 transition-all duration-300" />
                    </>
                  )}
                </button>

                {/* Trust Badges */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { icon: Shield, label: "Secure", sub: "Payments", color: "emerald" },
                    { icon: Clock, label: "Fresh", sub: "Guarantee", color: "orange" },
                    { icon: Users, label: "Support", sub: "24/7", color: "blue" },
                  ].map((badge, index) => (
                    <div
                      key={index}
                      className={`flex flex-col items-center p-3 bg-gradient-to-br from-${badge.color}-50/80 to-${badge.color}-100/80 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-500 group cursor-pointer hover:scale-105 border border-white/20`}
                    >
                      <badge.icon className={`w-5 h-5 text-${badge.color}-600 group-hover:scale-110 transition-transform duration-500`} />
                      <span className="text-xs font-medium text-gray-700 mt-1.5">{badge.label}</span>
                      <span className="text-[10px] text-gray-400 font-light">{badge.sub}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-gray-400">
                  <span className="flex items-center gap-1.5 bg-gray-50/50 px-3 py-1 rounded-full">
                    <CreditCard className="w-3 h-3" />
                    SSL Secure
                  </span>
                  <span className="flex items-center gap-1.5 bg-gray-50/50 px-3 py-1 rounded-full">
                    <RotateCcw className="w-3 h-3" />
                    7-day return
                  </span>
                  <span className="flex items-center gap-1.5 bg-gray-50/50 px-3 py-1 rounded-full">
                    <ThumbsUp className="w-3 h-3" />
                    100% fresh
                  </span>
                </div>

                <button
                  onClick={() => setShowFeedback(true)}
                  className="mt-4 w-full text-center text-[10px] text-gray-400 hover:text-emerald-600 transition-colors duration-300 flex items-center justify-center gap-1.5 group"
                >
                  <MessageCircle className="w-3 h-3 group-hover:scale-110 transition-transform duration-300" />
                  Have feedback about this page?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-md w-full mx-4 shadow-3xl animate-scale-in border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Share2 className="w-6 h-6 text-emerald-600" />
                Share Your Cart
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-2.5 hover:bg-gray-100 rounded-2xl transition-all duration-300 hover:scale-110"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: "📱", label: "WhatsApp", color: "from-green-50 to-green-100" },
                { icon: "📧", label: "Email", color: "from-blue-50 to-blue-100" },
                { icon: "🔗", label: "Link", color: "from-purple-50 to-purple-100" },
              ].map((share) => (
                <button
                  key={share.label}
                  className={`p-5 bg-gradient-to-br ${share.color} rounded-2xl hover:shadow-2xl transition-all duration-500 hover:scale-105 text-center group`}
                  onClick={() => {
                    alert(`Share via ${share.label} coming soon!`);
                    setShowShareModal(false);
                  }}
                >
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-300">{share.icon}</div>
                  <p className="text-xs font-medium text-gray-600 mt-2">{share.label}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-md w-full mx-4 shadow-3xl animate-scale-in border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-emerald-600" />
                Feedback
              </h3>
              <button
                onClick={() => setShowFeedback(false)}
                className="p-2.5 hover:bg-gray-100 rounded-2xl transition-all duration-300 hover:scale-110"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-base text-gray-600 font-light">How was your shopping experience?</p>
              <div className="flex justify-center gap-4">
                {[
                  { emoji: "😊", label: "Great" },
                  { emoji: "😐", label: "Okay" },
                  { emoji: "😞", label: "Poor" }
                ].map((item) => (
                  <button
                    key={item.emoji}
                    className="flex flex-col items-center gap-2 p-4 hover:bg-emerald-50/80 rounded-2xl transition-all duration-500 hover:scale-110 group"
                    onClick={() => {
                      alert("Thanks for your feedback! 🙏");
                      setShowFeedback(false);
                    }}
                  >
                    <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{item.emoji}</span>
                    <span className="text-xs text-gray-500">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-slide-up { animation: slideUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; opacity: 0; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(5deg); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }

        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.85; }
        }
        .animate-pulse-slow { animation: pulse-slow 2.5s ease-in-out infinite; }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-bounce-slow { animation: bounce-slow 2.5s ease-in-out infinite; }

        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in { animation: scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake { animation: shake 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }

        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 1.2s linear infinite; }

        @keyframes float-up {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(-120px) scale(0); opacity: 0; }
        }
        .animate-float-up { animation: float-up 3s ease-out forwards; }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(241, 241, 241, 0.5);
          backdrop-filter: blur(10px);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10b981, #059669);
          border-radius: 10px;
          transition: all 0.3s;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #059669, #047857);
        }

        /* Glass morphism enhancements */
        .backdrop-blur-sm {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .backdrop-blur-md {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        /* Shadow enhancements */
        .shadow-3xl {
          box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.15), 0 15px 25px -6px rgba(0, 0, 0, 0.05);
        }
        .shadow-2xl {
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.12), 0 10px 15px -6px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </div>
  );
};

export default Cart;