// src/Components/pages/Cart.jsx

import React, { useState, useEffect, useRef } from "react";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Truck,
  Shield,
  Clock,
  Leaf,
  CheckCircle,
  X,
  AlertCircle,
  Gift,
  Percent,
  Zap,
  Users,
  Package,
  Sparkles,
  Timer,
  Star,
  TrendingUp,
  Award,
  Flame,
  Heart,
  Share2,
  RefreshCw,
  MapPin,
  CreditCard,
  RotateCcw,
  ThumbsUp,
  MessageCircle,
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

    // Listen for storage changes (if cart is updated in another tab)
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
    // Auto-select delivery based on subtotal
    if (subtotal >= 499) {
      setDeliveryFee(0);
      if (selectedDelivery === "standard") {
        setSelectedDelivery("same-day");
      }
    } else if (subtotal >= 299) {
      setDeliveryFee(49);
      if (selectedDelivery === "standard") {
        setSelectedDelivery("express");
      }
    } else {
      setDeliveryFee(49);
      setSelectedDelivery("standard");
    }
  }, [cartItems]);

  // Fix scrolling on mount and route changes
  useEffect(() => {
    // Reset scroll position when component mounts
    window.scrollTo(0, 0);
    
    // Enable body scroll
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    return () => {
      // Cleanup - ensure scroll is enabled
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

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

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/checkout', { state: { cartItems, total, deliveryFee, discount } });
    }, 1500);
  };

  // Get delivery options based on subtotal with real-time timing
  const getDeliveryOptions = () => {
    const currentHour = new Date().getHours();
    const isMorning = currentHour < 12;
    const isAfternoon = currentHour >= 12 && currentHour < 17;
    const isEvening = currentHour >= 17;

    let standardTime, expressTime, sameDayTime;
    
    // Standard delivery times
    if (subtotal >= 499) {
      standardTime = isMorning ? "Today 2-4 PM" : isAfternoon ? "Today 5-7 PM" : "Tomorrow 9-11 AM";
    } else if (subtotal >= 299) {
      standardTime = isMorning ? "Today 4-6 PM" : isAfternoon ? "Today 6-8 PM" : "Tomorrow 10 AM-12 PM";
    } else {
      standardTime = isMorning ? "Tomorrow 9-11 AM" : isAfternoon ? "Tomorrow 10 AM-12 PM" : "Day after tomorrow 9-11 AM";
    }

    // Express delivery times
    if (subtotal >= 499) {
      expressTime = isMorning ? "Today 11 AM-1 PM" : isAfternoon ? "Today 3-5 PM" : "Today 6-8 PM";
    } else if (subtotal >= 299) {
      expressTime = isMorning ? "Today 1-3 PM" : isAfternoon ? "Today 4-6 PM" : "Tomorrow 9-11 AM";
    } else {
      expressTime = isMorning ? "Today 3-5 PM" : isAfternoon ? "Today 5-7 PM" : "Tomorrow 10 AM-12 PM";
    }

    // Same day delivery times
    if (subtotal >= 499) {
      sameDayTime = isMorning ? "Today 10 AM-12 PM" : isAfternoon ? "Today 2-4 PM" : "Today 5-7 PM";
    } else {
      sameDayTime = isMorning ? "Today 12-2 PM" : isAfternoon ? "Today 3-5 PM" : "Tomorrow 9-11 AM";
    }

    const options = [
      {
        id: "standard",
        label: "Standard",
        time: standardTime,
        fee: subtotal >= 499 ? 0 : 49,
        min: 0,
        icon: "🚚",
        description: subtotal >= 499 ? "Free Standard" : subtotal >= 299 ? "Standard Delivery" : "Economy Delivery",
        estimated: subtotal >= 499 ? "30-45 mins" : subtotal >= 299 ? "1-2 hrs" : "4-6 hrs",
        color: "blue"
      },
      {
        id: "express",
        label: "Express",
        time: expressTime,
        fee: subtotal >= 499 ? 0 : 99,
        min: subtotal >= 299 ? 0 : 299,
        icon: "⚡",
        description: subtotal >= 499 ? "Free Express" : "Priority Delivery",
        estimated: subtotal >= 499 ? "15-30 mins" : subtotal >= 299 ? "30-60 mins" : "2-4 hrs",
        color: "orange"
      },
      {
        id: "same-day",
        label: "Same Day",
        time: sameDayTime,
        fee: subtotal >= 499 ? 0 : 149,
        min: 499,
        icon: "🌟",
        description: "Same Day Delivery",
        estimated: subtotal >= 499 ? "10-20 mins" : "20-40 mins",
        color: "purple"
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
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  // Empty Cart Component
  if (cartItems.length === 0) {
    return (
      <div ref={mainContainerRef} className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 overflow-y-auto">
        <div className="w-auto mx-auto px-4 pt-32 pb-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-orange-100 rounded-full flex items-center justify-center animate-float shadow-xl">
                  <ShoppingCart className="w-16 h-16 text-emerald-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center animate-pulse-slow shadow-lg">
                  <X className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Your Cart is Empty</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Looks like you haven't added any fresh products yet. Explore our collection and find the freshest produce!
            </p>
            <button
              onClick={() => navigate('/fresh-products')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-2xl shadow-lg shadow-emerald-200 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Start Shopping
            </button>
          </div>

          <div className="mt-16">
            <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center">
              🍎 Fresh Picks For You
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { icon: "🍎", label: "Fresh Fruits", bg: "bg-gradient-to-br from-red-50 to-orange-50", hover: "hover:from-red-100 hover:to-orange-100" },
                { icon: "🥬", label: "Vegetables", bg: "bg-gradient-to-br from-green-50 to-emerald-50", hover: "hover:from-green-100 hover:to-emerald-100" },
                { icon: "🍊", label: "Exotic Fruits", bg: "bg-gradient-to-br from-orange-50 to-yellow-50", hover: "hover:from-orange-100 hover:to-yellow-100" },
                { icon: "🥑", label: "Organic Picks", bg: "bg-gradient-to-br from-emerald-50 to-teal-50", hover: "hover:from-emerald-100 hover:to-teal-100" },
              ].map((category, index) => (
                <button
                  key={index}
                  onClick={() => navigate('/fresh-products')}
                  className={`p-6 rounded-2xl ${category.bg} ${category.hover} transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/50`}
                >
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <p className="text-sm font-medium text-gray-700">{category.label}</p>
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
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 overflow-y-auto"
    >
      {/* Cart Header */}
      <div className="w-full bg-white/80 backdrop-blur-sm border-b border-emerald-100 shadow-sm">
        <div className="w-auto mx-auto px-4 pt-4 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-emerald-50 rounded-xl transition-all duration-300 hover:scale-110 hover:rotate-6"
              >
                <ArrowLeft className="w-5 h-5 text-emerald-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6 text-emerald-600 animate-bounce-slow" />
                  Your Cart
                  <span className="text-sm bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                    {totalItems} items
                  </span>
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 px-3 py-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">Share</span>
              </button>
              <button
                onClick={clearCart}
                className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">Clear</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Content */}
      <div ref={cartContainerRef} className="w-auto mx-auto px-4 pt-6 pb-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Quick Stats Bar */}
            <div className="bg-gradient-to-r from-emerald-50 to-orange-50 p-4 rounded-2xl border border-emerald-100 flex items-center justify-between flex-wrap gap-2 animate-fade-in">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-sm text-gray-600 flex items-center gap-2">
                  <Package className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium">{totalItems}</span> items
                </span>
                <span className="text-sm text-gray-600 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium">₹{subtotal}</span> subtotal
                </span>
                {deliveryFee === 0 && subtotal >= 499 && (
                  <span className="text-sm text-emerald-600 flex items-center gap-2 animate-pulse-slow">
                    <Truck className="w-4 h-4" />
                    Free Delivery
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-white px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <Shield className="w-3 h-3 text-emerald-600" />
                  Secure
                </span>
                <span className="text-xs bg-white px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
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
              
              return (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-emerald-100 hover:border-emerald-300 animate-slide-up hover:scale-[1.01]"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex flex-col sm:flex-row items-center gap-4 p-4">
                    <div className="relative flex-shrink-0">
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-50 to-orange-50 shadow-md">
                        <img
                          src={itemImage}
                          alt={item.name || 'Product'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src = '/default-product.jpg';
                          }}
                        />
                      </div>
                      {item.discount > 0 && (
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg animate-pulse-slow">
                          {item.discount}% OFF
                        </div>
                      )}
                      {item.isOrganic && (
                        <div className="absolute -bottom-1 -left-1 bg-emerald-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1">
                          <Leaf className="w-3 h-3" />
                          Organic
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                              {item.name || 'Product'}
                            </h3>
                            {item.rating && (
                              <span className="flex items-center gap-1 text-xs bg-orange-50 px-2 py-0.5 rounded-full">
                                <Star className="w-3 h-3 fill-orange-400 text-orange-400" />
                                {item.rating}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400">{item.unit || 'unit'}</p>
                          {item.isOrganic && (
                            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
                              <Leaf className="w-3 h-3" />
                              Organic
                            </span>
                          )}
                          {item.inStock && (
                            <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-1 ml-1">
                              <CheckCircle className="w-3 h-3" />
                              In Stock
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setWishlistItems([...wishlistItems, item.id]);
                            }}
                            className="p-2 text-gray-400 hover:text-pink-500 rounded-lg hover:bg-pink-50 transition-all duration-300 hover:scale-110"
                          >
                            <Heart className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all duration-300 hover:scale-110"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-3">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-emerald-700">
                            ₹{item.price || 0}
                          </span>
                          {item.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              ₹{item.originalPrice}
                            </span>
                          )}
                          {item.discount > 0 && (
                            <span className="text-xs text-orange-500 font-medium bg-orange-50 px-2 py-0.5 rounded-full">
                              Save ₹{Math.round((item.originalPrice - item.price) * (item.quantity || 0))}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-orange-50 rounded-xl p-1 border border-emerald-200 shadow-inner">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1.5 rounded-lg hover:bg-emerald-200 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={(item.quantity || 0) <= 1}
                            >
                              <Minus className="w-4 h-4 text-emerald-600" />
                            </button>
                            <span className="w-8 text-center font-semibold text-gray-800 text-sm">
                              {item.quantity || 0}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1.5 rounded-lg hover:bg-emerald-200 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={(item.quantity || 0) >= 10}
                            >
                              <Plus className="w-4 h-4 text-emerald-600" />
                            </button>
                          </div>

                          <span className="text-sm font-semibold text-gray-800">
                            ₹{itemTotal}
                          </span>
                        </div>
                      </div>

                      {/* Additional product details */}
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                        {item.weight && (
                          <span className="flex items-center gap-1">
                            <Package className="w-3 h-3" />
                            {item.weight}
                          </span>
                        )}
                        {item.origin && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {item.origin}
                          </span>
                        )}
                        {item.category && (
                          <span className="bg-gray-100 px-2 py-0.5 rounded-full">
                            {item.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {item.inStock === false && (
                    <div className="px-4 pb-3">
                      <div className="flex items-center gap-2 text-red-600 bg-red-50 p-2 rounded-xl text-xs animate-pulse">
                        <AlertCircle className="w-4 h-4" />
                        <span>Out of stock! Please remove this item.</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <button
              onClick={() => navigate('/fresh-products')}
              className="w-full py-4 text-emerald-600 font-semibold hover:bg-emerald-50 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group border-2 border-dashed border-emerald-200 hover:border-emerald-400"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              Continue Shopping
              <span className="text-xs text-gray-400 group-hover:text-emerald-600">
                • Add more fresh items
              </span>
            </button>

          </div>

          {/* Order Summary - Sticky */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">Order Summary</h3>
                  <div className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    <CheckCircle className="w-3 h-3" />
                    Secure Checkout
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-emerald-100">
                  <span className="text-gray-600">Items ({totalItems})</span>
                  <span className="font-medium text-gray-800">₹{subtotal}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-emerald-100">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    <span className="text-gray-600">Delivery Fee</span>
                  </div>
                  <span className={deliveryFee === 0 ? "text-emerald-600 font-medium" : "text-gray-800"}>
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                  </span>
                </div>

                {/* Delivery Options */}
                <div className="py-3 border-b border-emerald-100">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-gray-500">Delivery Options</p>
                    <span className="text-[10px] text-orange-500 flex items-center gap-1 animate-pulse">
                      <Timer className="w-3 h-3" />
                      Live
                    </span>
                  </div>
                  <div className="space-y-2">
                    {deliveryOptions.map((option) => {
                      const isAvailable = subtotal >= option.min;
                      return (
                        <label
                          key={option.id}
                          className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all duration-300 ${
                            selectedDelivery === option.id
                              ? `bg-gradient-to-r from-emerald-50 to-${option.color}-50 border-2 border-emerald-400 shadow-md`
                              : isAvailable 
                                ? "hover:bg-emerald-50 border-2 border-transparent" 
                                : "opacity-50 cursor-not-allowed border-2 border-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="delivery"
                              value={option.id}
                              checked={selectedDelivery === option.id}
                              onChange={() => {
                                if (isAvailable) {
                                  setSelectedDelivery(option.id);
                                  setDeliveryFee(option.fee);
                                }
                              }}
                              className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                              disabled={!isAvailable}
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-700">
                                  {option.icon} {option.label}
                                </span>
                                {selectedDelivery === option.id && (
                                  <Sparkles className="w-3 h-3 text-orange-500 animate-pulse" />
                                )}
                                <span className={`text-[10px] bg-${option.color}-100 text-${option.color}-600 px-1.5 py-0.5 rounded-full`}>
                                  {option.estimated}
                                </span>
                              </div>
                              <p className="text-xs text-gray-400">
                                {option.time} • {option.description}
                              </p>
                              {!isAvailable && (
                                <p className="text-[10px] text-orange-500 animate-pulse">
                                  Add ₹{option.min - subtotal} more
                                </p>
                              )}
                            </div>
                          </div>
                          <span className={`text-sm font-medium ${option.fee === 0 ? "text-emerald-600" : "text-gray-700"}`}>
                            {option.fee === 0 ? "FREE" : `₹${option.fee}`}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Promo Code */}
                <div className="py-3 border-b border-emerald-100">
                  {!promoApplied ? (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter promo code"
                          className="flex-1 px-3 py-2 border border-emerald-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all duration-300"
                          onKeyPress={(e) => e.key === 'Enter' && applyPromoCode()}
                        />
                        <button
                          onClick={applyPromoCode}
                          className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl text-sm font-medium hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          Apply
                        </button>
                      </div>
                      {promoError && (
                        <p className="text-xs text-red-500 animate-shake">{promoError}</p>
                      )}
                      <div className="flex flex-wrap gap-1">
                        <span className="text-[10px] text-gray-400">Try:</span>
                        {["FRESH10", "FRESH20", "WELCOME", "ORGANIC"].map((code) => (
                          <button
                            key={code}
                            onClick={() => setPromoCode(code)}
                            className="text-[10px] bg-gray-100 px-2 py-0.5 rounded hover:bg-emerald-100 transition-colors"
                          >
                            {code}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-2 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl animate-fade-in">
                      <div className="flex items-center gap-2">
                        <Gift className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-medium text-emerald-700">
                          Promo Applied! 🎉
                        </span>
                      </div>
                      <button
                        onClick={removePromoCode}
                        className="text-sm text-red-500 hover:text-red-700 transition-colors hover:scale-105"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {discount > 0 && (
                  <div className="flex items-center justify-between py-2 border-b border-emerald-100 text-emerald-600 animate-slide-up">
                    <span className="flex items-center gap-2">
                      <Percent className="w-4 h-4" />
                      Discount
                    </span>
                    <span className="font-medium">-₹{discount}</span>
                  </div>
                )}

                <div className="flex items-center justify-between py-4 mt-2">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-emerald-700">
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
                  <div className="mb-4 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200 animate-fade-in">
                    <div className="flex items-center gap-2 text-sm text-orange-700">
                      <Truck className="w-4 h-4" />
                      <span>
                        Add ₹{499 - subtotal} more for FREE delivery
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 bg-orange-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min((subtotal / 499) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-orange-600 mt-1">
                      {Math.round((subtotal / 499) * 100)}% to free delivery
                    </p>
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={loading || cartItems.length === 0}
                  className={`w-full py-4 rounded-2xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                    loading || cartItems.length === 0
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-lg shadow-emerald-200 hover:shadow-xl hover:scale-105 active:scale-95"
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
                      Proceed to Checkout
                    </>
                  )}
                </button>

                {/* Trust Badges */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { icon: Shield, label: "Secure", sub: "Payments", color: "emerald" },
                    { icon: Clock, label: "Fresh", sub: "Guarantee", color: "orange" },
                    { icon: Users, label: "Support", sub: "24/7", color: "blue" },
                  ].map((badge, index) => (
                    <div
                      key={index}
                      className={`flex flex-col items-center p-2 bg-gradient-to-br from-${badge.color}-50 to-${badge.color}-100 rounded-xl hover:shadow-lg transition-all duration-300 group cursor-pointer hover:scale-105`}
                    >
                      <badge.icon className={`w-5 h-5 text-${badge.color}-600 group-hover:scale-110 transition-transform duration-300`} />
                      <span className="text-xs font-medium text-gray-700 mt-1">{badge.label}</span>
                      <span className="text-[10px] text-gray-400">{badge.sub}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-center gap-4 text-[10px] text-gray-400">
                  <span className="flex items-center gap-1">
                    <CreditCard className="w-3 h-3" />
                    SSL Secure
                  </span>
                  <span className="flex items-center gap-1">
                    <RotateCcw className="w-3 h-3" />
                    7-day return
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" />
                    100% fresh
                  </span>
                </div>

                <button
                  onClick={() => setShowFeedback(true)}
                  className="mt-3 w-full text-center text-[10px] text-gray-400 hover:text-emerald-600 transition-colors flex items-center justify-center gap-1"
                >
                  <MessageCircle className="w-3 h-3" />
                  Have feedback about this page?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Share Your Cart</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "📱", label: "WhatsApp" },
                { icon: "📧", label: "Email" },
                { icon: "🔗", label: "Link" },
              ].map((share) => (
                <button
                  key={share.label}
                  className="p-4 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-all duration-300 hover:scale-105 text-center"
                  onClick={() => {
                    alert(`Share via ${share.label} coming soon!`);
                    setShowShareModal(false);
                  }}
                >
                  <div className="text-2xl">{share.icon}</div>
                  <p className="text-xs font-medium text-gray-600 mt-1">{share.label}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Feedback</h3>
              <button
                onClick={() => setShowFeedback(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">How was your shopping experience?</p>
              <div className="flex justify-center gap-2">
                {["😊", "😐", "😞"].map((emoji) => (
                  <button
                    key={emoji}
                    className="text-3xl p-2 hover:bg-emerald-50 rounded-full transition-all duration-300 hover:scale-125"
                    onClick={() => {
                      alert("Thanks for your feedback! 🙏");
                      setShowFeedback(false);
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slideUp 0.6s ease-out forwards; opacity: 0; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }

        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }

        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in { animation: scale-in 0.3s ease-out; }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.3s ease-in-out; }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin { animation: spin 1s linear infinite; }

        /* Fix for scrolling */
        body {
          overflow-y: auto !important;
        }
        html {
          overflow-y: auto !important;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10b981, #059669);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #059669;
        }
      `}</style>
    </div>
  );
};

export default Cart;