// src/Components/pages/SpicesAndDryFruits.jsx

import React, { useState, useEffect, useRef } from "react";
import {
  ShoppingCart, ChevronRight, Star, Heart, Truck, BadgePercent, Leaf, Grid, List, StarHalf, ChevronDown, Shield, Clock, Eye, X, Plus, Minus, CheckCircle, Package, MapPin, Calendar, Users, Award, ChevronLeft, ChevronRight as ChevronRightIcon, Maximize2, Minimize2, Camera, User, Play, Pause, ShoppingBag, CreditCard, Zap, Gift, Percent, AlertCircle, Trash2,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { products, categories, getProductsByCategory } from "../data/SpicesAndDryFruitsData";

// Custom Spices & Dry Fruits SVG Icons
const ChilliIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 6c-1.5 1-2.5 3-2 5s2.5 3.5 4.5 3.5 3.5-1 4-3 .5-4-1-5-3-1.5-5.5-.5z" />
    <path d="M12 4v2" />
    <path d="M6 8l1.5 1.5" />
    <path d="M18 8l-1.5 1.5" />
    <path d="M6 14l1.5-1.5" />
    <path d="M18 14l-1.5-1.5" />
  </svg>
);

const TurmericIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4c-2 0-4 1-5.5 2.5" />
    <path d="M12 4c2 0 4 1 5.5 2.5" />
    <path d="M4 12c0-2 1-4 2.5-5.5" />
    <path d="M20 12c0-2-1-4-2.5-5.5" />
    <path d="M8 18c1 1.5 2.5 2.5 4 2.5s3-1 4-2.5" />
    <path d="M12 9v4" />
  </svg>
);

const CuminIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4c-3 0-5.5 2-6.5 4.5" />
    <path d="M12 4c3 0 5.5 2 6.5 4.5" />
    <path d="M5.5 8.5c-1 2-1.5 4.5-1 6.5" />
    <path d="M18.5 8.5c1 2 1.5 4.5 1 6.5" />
    <path d="M8 18c1 1.5 2.5 2.5 4 2.5s3-1 4-2.5" />
    <circle cx="8" cy="10" r="0.5" fill="currentColor" />
    <circle cx="12" cy="9" r="0.5" fill="currentColor" />
    <circle cx="16" cy="10" r="0.5" fill="currentColor" />
  </svg>
);

const CorianderIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4c-2 0-4 1-5 3s-1 4 0 6c1 2 3 3 5 3s4-1 5-3 1-4 0-6-3-3-5-3z" />
    <path d="M7 10c1-1.5 2.5-2.5 5-2.5s4 1 5 2.5" />
    <path d="M7 14c1 1.5 2.5 2.5 5 2.5s4-1 5-2.5" />
  </svg>
);

const ClovesIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4" />
    <path d="M12 10v4" />
    <path d="M12 18v2" />
    <circle cx="12" cy="12" r="3" />
    <path d="M18 6l1.5 1.5" />
    <path d="M4.5 16.5l1.5-1.5" />
    <path d="M18 18l1.5-1.5" />
    <path d="M4.5 7.5l1.5 1.5" />
  </svg>
);

const CardamomIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4c-2 0-4 1-5.5 2.5" />
    <path d="M12 4c2 0 4 1 5.5 2.5" />
    <path d="M6.5 6.5c-1.5 1.5-2.5 3.5-2.5 5.5s1 4 2.5 5.5" />
    <path d="M17.5 6.5c1.5 1.5 2.5 3.5 2.5 5.5s-1 4-2.5 5.5" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const AlmondIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4c-2 0-4 1-5.5 2.5" />
    <path d="M12 4c2 0 4 1 5.5 2.5" />
    <path d="M6.5 6.5c-2 2-3 4.5-2.5 7" />
    <path d="M17.5 6.5c2 2 3 4.5 2.5 7" />
    <path d="M10 16c-1-1-1.5-2.5-1-4" />
    <path d="M14 16c1-1 1.5-2.5 1-4" />
    <circle cx="12" cy="14" r="2" />
  </svg>
);

const CashewIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4c-3 0-5.5 2-6.5 4.5" />
    <path d="M12 4c3 0 5.5 2 6.5 4.5" />
    <path d="M5.5 8.5c-1 2-1.5 4.5-1 6.5" />
    <path d="M18.5 8.5c1 2 1.5 4.5 1 6.5" />
    <path d="M8 18c1 1.5 2.5 2.5 4 2.5s3-1 4-2.5" />
    <path d="M9 12c.5-1 1.5-1.5 3-1.5s2.5.5 3 1.5" />
  </svg>
);

const WalnutIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="14" r="6" />
    <path d="M12 8c-1-2-2.5-3.5-4-3.5" />
    <path d="M12 8c1-2 2.5-3.5 4-3.5" />
    <path d="M8 11c.5-1 1.5-1.5 4-1.5s3.5.5 4 1.5" />
    <path d="M8 17c.5 1 1.5 1.5 4 1.5s3.5-.5 4-1.5" />
  </svg>
);

const PistachioIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4c-2 0-4 1-5 2.5S6 9.5 7 11s2 2 3.5 1.5 2.5-2 3-3.5.5-3-1-4.5S14 4 12 4z" />
    <path d="M12 4c2 0 4 1 5 2.5S18 9.5 17 11s-2 2-3.5 1.5-2.5-2-3-3.5-.5-3 1-4.5S10 4 12 4z" />
    <path d="M7 11c-1.5 1-2.5 3-1.5 4.5s3 2 4.5.5" />
    <path d="M17 11c1.5 1 2.5 3 1.5 4.5s-3 2-4.5.5" />
  </svg>
);

const DatesIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4c-2 0-4 1-5.5 2.5" />
    <path d="M12 4c2 0 4 1 5.5 2.5" />
    <path d="M6.5 6.5c-1.5 1.5-2.5 3.5-2.5 5.5s1 4 2.5 5.5" />
    <path d="M17.5 6.5c1.5 1.5 2.5 3.5 2.5 5.5s-1 4-2.5 5.5" />
    <path d="M12 12v4" />
    <path d="M10 14h4" />
  </svg>
);

const SpicesAndDryFruits = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [wishlist, setWishlist] = useState([]);
  const [bannerIndex, setBannerIndex] = useState(0);
  
  // Cart states
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [justAddedProductId, setJustAddedProductId] = useState(null);
  
  // Modal states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [modalJustAdded, setModalJustAdded] = useState(false);
  
  // Image gallery states
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoSlideTimerRef = useRef(null);

  // Ref for scroll restoration
  const scrollPositionRef = useRef(0);
  const mainContainerRef = useRef(null);

  // Banner Data
  const BANNERS = [
    {
      id: "spices-blend",
      title1: "Pure",
      title2: "Spices & Blends",
      copy: "Authentic spices and masala blends to elevate your cooking. Freshly ground for maximum flavor.",
      image: "/spices-dryfruits/sbanner1.png",
      tags: [
        { icon: Leaf, label: "Pure & Natural", sub: "No Additives" },
        { icon: Truck, label: "Free Delivery", sub: "On orders above ₹499" },
        { icon: BadgePercent, label: "Best Quality", sub: "Quality You Can Trust" },
      ],
    },
    {
      id: "dry-fruits",
      title1: "Premium",
      title2: "Dry Fruits & Nuts",
      copy: "Premium quality dry fruits and nuts sourced from the finest farms. Packed with nutrition.",
      image: "/spices-dryfruits/sbanner2.png",
      tags: [
        { icon: Leaf, label: "Premium Quality", sub: "100% Natural" },
        { icon: Truck, label: "Free Delivery", sub: "On orders above ₹499" },
        { icon: BadgePercent, label: "Great Prices", sub: "Up to 25% Off" },
      ],
    },
    {
      id: "seeds-cloves",
      title1: "Organic",
      title2: "Seeds & Cloves",
      copy: "Premium seeds, cloves, and cardamom for your kitchen. Aromatic and flavorful.",
      image: "/spices-dryfruits/sbanner3.png",
      tags: [
        { icon: Leaf, label: "Organic", sub: "Chemical Free" },
        { icon: Truck, label: "Free Delivery", sub: "On orders above ₹499" },
        { icon: BadgePercent, label: "Special Price", sub: "Limited Time Offer" },
      ],
    },
  ];

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          setCart(parsedCart);
        }
      } catch (e) {
        console.error('Error loading cart:', e);
      }
    }
  }, []);

  // Auto slide banners
  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % BANNERS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Update cart totals
  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
    const count = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    setCartTotal(total);
    setCartCount(count);
  }, [cart]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart]);

  // ===== SCROLL RESTORATION =====
  useEffect(() => {
    const handleBeforeUnload = () => {
      scrollPositionRef.current = window.scrollY;
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        scrollPositionRef.current = window.scrollY;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const restoreScroll = () => {
      if (scrollPositionRef.current > 0) {
        window.scrollTo({
          top: scrollPositionRef.current,
          behavior: 'instant'
        });
        scrollPositionRef.current = 0;
      }
    };

    restoreScroll();
    const timer = setTimeout(restoreScroll, 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleNavigate = (path) => {
    scrollPositionRef.current = window.scrollY;
    navigate(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!isModalOpen) {
        scrollPositionRef.current = window.scrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isModalOpen]);

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

  // Cart functions
  const addToCart = (product, qty = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      let newCart;
      if (existingItem) {
        newCart = prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      } else {
        newCart = [...prevCart, { ...product, quantity: qty }];
      }
      return newCart;
    });
    setJustAddedProductId(product.id);
    setModalJustAdded(true);
  };

  // Get product images
  const getProductImages = (product) => {
    if (!product) return [];
    if (Array.isArray(product.image)) {
      return product.image;
    }
    return [product.image];
  };

  // Modal functions
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setModalJustAdded(false);
    setCurrentImageIndex(0);
    setIsAutoSliding(true);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    setIsFullScreen(false);
    document.body.style.overflow = 'unset';
    if (autoSlideTimerRef.current) {
      clearInterval(autoSlideTimerRef.current);
      autoSlideTimerRef.current = null;
    }
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const handleQuantityChange = (change) => {
    setQuantity(prev => {
      const newQty = prev + change;
      if (newQty < 1) return 1;
      return newQty;
    });
  };

  const handleAddToCart = () => {
    if (selectedProduct && selectedProduct.inStock) {
      addToCart(selectedProduct, quantity);
    }
  };

  const handleBuyNow = () => {
    if (selectedProduct && selectedProduct.inStock) {
      addToCart(selectedProduct, quantity);
      handleNavigate('/checkout');
    }
  };

  // Image gallery functions
  const nextImage = () => {
    if (!selectedProduct) return;
    const images = getProductImages(selectedProduct);
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevImage = () => {
    if (!selectedProduct) return;
    const images = getProductImages(selectedProduct);
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToImage = (index) => {
    setIsTransitioning(true);
    setCurrentImageIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const toggleAutoSlide = () => {
    setIsAutoSliding(!isAutoSliding);
    if (autoSlideTimerRef.current) {
      clearInterval(autoSlideTimerRef.current);
      autoSlideTimerRef.current = null;
    }
  };

  useEffect(() => {
    if (isModalOpen && selectedProduct && isAutoSliding) {
      const images = getProductImages(selectedProduct);
      if (images.length > 1) {
        autoSlideTimerRef.current = setInterval(() => {
          setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 3000);
      }
    }
    return () => {
      if (autoSlideTimerRef.current) {
        clearInterval(autoSlideTimerRef.current);
        autoSlideTimerRef.current = null;
      }
    };
  }, [isModalOpen, selectedProduct, isAutoSliding]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProduct]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      if (e.key === 'Escape') {
        if (isFullScreen) {
          setIsFullScreen(false);
        } else {
          closeProductModal();
        }
      }
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, isFullScreen]);

  const handleImageDoubleClick = () => {
    toggleFullScreen();
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

// Product Modal Component
const ProductModal = () => {
  if (!selectedProduct) return null;

  const images = getProductImages(selectedProduct);
  const currentImage = images[currentImageIndex] || images[0];

  return (
    <div 
      className={`fixed inset-0 z-50 mt-25 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm transition-all duration-300 ${
        isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={closeProductModal}
    >
      <div 
        className={`relative  bg-white rounded-2xl sm:rounded-3xl  max-w-[85vw] md: max-w-4xl lg:max-w-5xl  max-h-[78vh] sm:max-h-[80vh] overflow-y-auto   ${
          isModalOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        } ${isFullScreen ? '!max-w-full !max-h-full !rounded-none' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeProductModal}
          className={`absolute top-2 right-2 sm:top-4 sm:right-4 z-20 p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-all duration-300 hover:rotate-90 group ${
            isFullScreen ? 'bg-black/50 text-white hover:bg-black/70' : ''
          }`}
        >
          <X className={`w-4 h-4 sm:w-5 sm:h-5 ${isFullScreen ? 'text-white' : 'text-gray-600 group-hover:text-red-500'} transition-colors`} />
        </button>

        <button
          onClick={toggleFullScreen}
          className={`absolute top-2 right-12 sm:top-4 sm:right-16 z-20 p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-all duration-300 group ${
            isFullScreen ? 'bg-black/50 text-white hover:bg-black/70' : ''
          }`}
        >
          {isFullScreen ? (
            <Minimize2 className={`w-4 h-4 sm:w-5 sm:h-5 ${isFullScreen ? 'text-white' : 'text-gray-600 group-hover:text-emerald-500'} transition-colors`} />
          ) : (
            <Maximize2 className={`w-4 h-4 sm:w-5 sm:h-5 ${isFullScreen ? 'text-white' : 'text-gray-600 group-hover:text-emerald-500'} transition-colors`} />
          )}
        </button>

        <div className={`flex flex-col ${isFullScreen ? 'h-screen' : 'md:flex-row'}`}>
          <div className={`${isFullScreen ? 'w-full h-full' : 'md:w-1/2'} relative bg-gradient-to-br from-emerald-50/50 to-orange-50/50 ${
            isFullScreen ? '' : 'rounded-t-2xl sm:rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none'
          } p-3 sm:p-4 md:p-6`}>
            
            <div 
              className={`relative ${isFullScreen ? 'h-full' : 'h-48 sm:h-64 md:h-96'} flex items-center justify-center cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl bg-white/50`}
              onDoubleClick={handleImageDoubleClick}
            >
              <img 
                src={currentImage} 
                alt={selectedProduct.name}
                className={`w-full h-full object-contain transition-all duration-500 ${
                  isTransitioning ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
                }`}
              />
              
              <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex flex-col gap-1.5 sm:gap-2 z-10">
                {selectedProduct.discount > 0 && (
                  <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg animate-pulse-slow">
                    {selectedProduct.discount}% OFF
                  </span>
                )}
              </div>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(selectedProduct.id);
                }}
                c className="absolute top-1 right-2 sm:top-4 sm:right-4 z-10 p-1.5 sm:p-2 mt-5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-xl"
              >
                <Heart className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                  wishlist.includes(selectedProduct.id) ? "fill-red-500 text-red-500 animate-pulse-slow" : "text-gray-600 hover:text-red-500"
                }`} />
              </button>

              {images.length > 1 && (
                <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full z-10">
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}

              {images.length > 1 && (
                <div className="absolute top-1 right-10 sm:top-4 sm:right-16  lg:top-10 flex items-center gap-2 z-10">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleAutoSlide(); }}
                    className="bg-black/50 backdrop-blur-sm text-white p-1 sm:p-1.5 rounded-full hover:bg-black/70 transition-colors"
                  >
                    {isAutoSliding ? <Pause className="w-3 h-3 sm:w-4 sm:h-4" /> : <Play className="w-3 h-3 sm:w-4 sm:h-4" />}
                  </button>
                </div>
              )}

              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-lg hover:scale-110 transition-all duration-300 hover:bg-white z-10"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-lg hover:scale-110 transition-all duration-300 hover:bg-white z-10"
                  >
                    <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                  </button>
                </>
              )}

              {!selectedProduct.inStock && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-2xl sm:rounded-3xl z-10">
                  <span className="text-lg sm:text-2xl font-bold text-red-500 animate-pulse-slow">Out of Stock</span>
                </div>
              )}

              <div className="hidden sm:block absolute bottom-16 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm text-white/80 text-xs px-3 py-1 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 z-10">
                Double click to {isFullScreen ? 'exit' : 'enter'} full screen
              </div>
            </div>

            {images.length > 1 && (
              <div className="mt-3 sm:mt-4 flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`relative flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
                      currentImageIndex === index 
                        ? 'border-emerald-500 shadow-lg scale-105' 
                        : 'border-transparent hover:border-gray-300 hover:scale-105'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${selectedProduct.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {currentImageIndex === index && (
                      <div className="absolute inset-0 bg-emerald-500/20 border-2 border-emerald-500 rounded-lg sm:rounded-xl"></div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-3 sm:mt-4">
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/70 backdrop-blur-sm p-1.5 sm:p-2 rounded-lg sm:rounded-xl border border-gray-100">
                <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                <span className="text-[10px] sm:text-xs text-gray-600">{selectedProduct.unit}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/70 backdrop-blur-sm p-1.5 sm:p-2 rounded-lg sm:rounded-xl border border-gray-100">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                <span className="text-[10px] sm:text-xs text-gray-600">{selectedProduct.origin}</span>
              </div>
              {selectedProduct.stockQuantity && (
                <div className="flex items-center gap-1.5 sm:gap-2 bg-white/70 backdrop-blur-sm p-1.5 sm:p-2 rounded-lg sm:rounded-xl border border-gray-100 col-span-2">
                  <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                  <span className="text-[10px] sm:text-xs text-gray-600">In Stock: {selectedProduct.stockQuantity} units</span>
                </div>
              )}
            </div>
          </div>

          {!isFullScreen && (
            <div className=" md:w-1/2 p-4 sm:p-6 md:p-8 overflow-y-auto md:overflow-visible max-h-[92vh] md:max-h-none pb-28 md:pb-0">
              <div className="space-y-3 sm:space-y-4 pb-28 md:pb-0">
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <span className="text-[10px] sm:text-xs bg-emerald-50 text-emerald-700 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-emerald-200">
                    {selectedProduct.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {renderStars(selectedProduct.rating)}
                    </div>
                    <span className="text-[10px] sm:text-xs text-gray-400">({selectedProduct.reviews} reviews)</span>
                  </div>
                </div>

                <h2 className="text-lg sm:text-2xl font-bold text-gray-800 leading-tight">
                  {selectedProduct.name}
                </h2>

                {selectedProduct.description && (
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                )}

                {/* CREATIVE PRICE DISPLAY */}
                <div className="bg-gradient-to-r from-emerald-50 to-orange-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-emerald-100/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-bold text-emerald-700">
                        ₹{selectedProduct.price}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-500 font-medium">/{selectedProduct.unit}</span>
                    </div>
                    {selectedProduct.discount > 0 && (
                      <div className="flex items-center gap-1 bg-red-500/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-red-200">
                        <span className="text-[10px] sm:text-xs font-bold text-red-500">{selectedProduct.discount}% OFF</span>
                        <span className="text-[10px] sm:text-xs text-red-400">🔥</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-3 mt-1">
                    {selectedProduct.originalPrice && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm text-gray-400 line-through decoration-red-400 decoration-2">
                          ₹{selectedProduct.originalPrice}
                        </span>
                        <span className="text-[10px] sm:text-xs text-gray-400">/{selectedProduct.unit}</span>
                      </div>
                    )}
                    {selectedProduct.discount > 0 && selectedProduct.originalPrice && (
                      <div className="flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-green-500 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-sm">
                        <span className="text-[10px] sm:text-xs font-bold text-white">Save ₹{selectedProduct.originalPrice - selectedProduct.price}</span>
                      </div>
                    )}
                  </div>
                  
                  {selectedProduct.discount > 0 && selectedProduct.originalPrice && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-[10px] sm:text-xs">
                        <span className="text-emerald-600 font-medium">You Save</span>
                        <span className="text-emerald-700 font-bold">₹{selectedProduct.originalPrice - selectedProduct.price}</span>
                      </div>
                      <div className="mt-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
                          style={{ width: `${Math.round((selectedProduct.discount / 100) * 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[9px] sm:text-[10px] text-gray-400 mt-0.5">
                        <span>MRP: ₹{selectedProduct.originalPrice}</span>
                        <span>Discount: {selectedProduct.discount}%</span>
                        <span>You Pay: ₹{selectedProduct.price}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-xs sm:text-sm font-medium text-gray-600">Quantity:</span>
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-gray-50 rounded-xl p-1 border border-gray-200">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-200 transition-all duration-200 hover:scale-110"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                    </button>
                    <span className="w-8 sm:w-10 text-center font-semibold text-gray-800 text-sm sm:text-base">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-200 transition-all duration-200 hover:scale-110"
                    >
                      <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-emerald-50/50 p-2.5 sm:p-3 rounded-xl">
                  <span className="text-xs sm:text-sm font-medium text-gray-600">Total:</span>
                  <span className="text-lg sm:text-xl font-bold text-emerald-700">
                    ₹{selectedProduct.price * quantity}
                  </span>
                </div>

                {/* ====== UPDATED ACTION BUTTONS ====== */}
               <div className={`fixed bottom-0 left-0 right-0 md:static bg-white border-t border-gray-200 p-3 sm:p-4 flex gap-3 z-50 `}>
                  {modalJustAdded ? (
                    <button
                      onClick={() => navigate('/cart')}
                      className="flex-1 py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-red-400 text-white shadow-lg shadow-orange-200 hover:shadow-xl hover:scale-105 active:scale-95 hover:from-orange-600 hover:to-red-600"
                    >
                      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                      Go to Cart 🛒
                    </button>
                  ) : (
                    <button
                      onClick={handleAddToCart}
                      disabled={!selectedProduct.inStock}
                      className={`flex-1 py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                        selectedProduct.inStock
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-200 hover:shadow-xl hover:scale-105 active:scale-95 hover:from-orange-600 hover:to-red-600 group'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart className={`w-4 h-4 sm:w-5 sm:h-5 ${selectedProduct.inStock ? 'group-hover:scale-110 group-hover:rotate-12 transition-all duration-300' : ''}`} />
                      <span>Add to Cart</span>
                    </button>
                  )}
                  
                  <button
                    onClick={handleBuyNow}
                    disabled={!selectedProduct.inStock}
                    className={`flex-1 py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                      selectedProduct.inStock
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-200 hover:shadow-xl hover:scale-105 active:scale-95 hover:from-emerald-600 hover:to-emerald-800 animate-pulse-slow group'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Zap className={`w-4 h-4 sm:w-5 sm:h-5 ${selectedProduct.inStock ? 'group-hover:scale-110 group-hover:rotate-12 transition-all duration-300' : ''}`} />
                    <span>Buy Now</span>
                  </button>
                </div>

                {modalJustAdded && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-2.5 sm:p-3 flex items-center gap-2 animate-fade-in">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    <span className="text-xs sm:text-sm text-green-700 font-medium">
                      ✓ Added to cart! Click "Go to Cart" to checkout.
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-500">
                    <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                    <span>Free delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-500">
                    <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                    <span>Quality guaranteed</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                    <span>Same day delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-500">
                    <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                    <span>Premium quality</span>
                  </div>
                </div>

                <div className="bg-gray-50/50 p-3 sm:p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                    <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                    <span className="font-medium">{selectedProduct.reviews}</span>
                    <span>customers have rated this product</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                        style={{ width: `${(selectedProduct.rating / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-600">{selectedProduct.rating}/5</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

  return (
    <div className="min-h-screen w-full bg-[#fdfcf9]" ref={mainContainerRef}>
     
      {/* Floating Cart Button */}
      <button
        onClick={() => handleNavigate('/cart')}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-4 rounded-full shadow-2xl hover:shadow-xl hover:scale-110 transition-all duration-300 group"
      >
        <div className="relative">
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse-slow">
              {cartCount}
            </span>
          )}
        </div>
      </button>

      {/* Banner Section */}
     <section className="w-full px-3 sm:px-6 lg:px-8 pt-2 mt-29 sm:mt-32 md:mt-34 lg:mt-34 ">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-60 via-[#fdf6f0] to-green-80/50 transition-colors duration-700 w-full h-[160px] sm:h-[300px] md:h-[340px] lg:h-[380px]">
          <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-orange-100/20 via-transparent to-green-100/20 animate-gradient-shift"></div>
          <div className="hidden md:block absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-800/30 via-green-600/10 to-transparent pointer-events-none z-0"></div>
          <div className="hidden md:block absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-900/20 to-transparent pointer-events-none z-0"></div>
          <div className=" absolute -top-10 -right-10 w-28 h-28 md:w-36 md:h-36 bg-green-300/50 rounded-full pointer-events-none z-0 animate-blob-pulse" />
          <div className="absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 bg-green-400/30 rounded-bl-[3rem] pointer-events-none z-0 animate-blob-pulse" style={{ animationDelay: "1s" }} />
          <div className=" absolute -bottom-10 -left-8 w-24 h-24 md:w-32 md:h-32 bg-orange-300/40 rounded-full pointer-events-none z-0 animate-blob-pulse" style={{ animationDelay: "2s" }} />
          <div className=" absolute bottom-0 left-0 w-16 h-16 md:w-20 md:h-20 bg-orange-200/40 rounded-tr-[2.5rem] pointer-events-none z-0 animate-blob-pulse" style={{ animationDelay: "1.5s" }} />
          <div className="hidden md:block absolute top-6 left-6 w-24 h-16 opacity-60 pointer-events-none z-0 animate-float-slow" style={{ backgroundImage: "radial-gradient(circle, #22c55e 1.5px, transparent 1.5px)", backgroundSize: "10px 10px" }} />
          <div className=" hidden md:block absolute bottom-8 left-10 w-20 h-14 opacity-50 pointer-events-none z-0 animate-float-slow" style={{ animationDelay: "1s", backgroundImage: "radial-gradient(circle, #22c55e 1.5px, transparent 1.5px)", backgroundSize: "10px 10px" }} />
          <div className="hidden md:block absolute top-8 right-28 w-20 h-14 opacity-40 pointer-events-none z-0 animate-float-slow hidden md:block" style={{ animationDelay: "2s", backgroundImage: "radial-gradient(circle, #22c55e 1.5px, transparent 1.5px)", backgroundSize: "10px 10px" }} />

          <ChilliIcon className="absolute top-8 left-[36%] w-5 h-5 text-orange-600/40 pointer-events-none z-0 hidden sm:block animate-float-leaf-1" style={{ transform: 'scale(1.2)', transformOrigin: 'center' }} />
          <TurmericIcon className="absolute top-1/2 left-[40%] w-6 h-6 text-orange-600/30 pointer-events-none z-0 hidden md:block animate-float-leaf-2" style={{ transform: 'scale(1.1)', transformOrigin: 'center' }} />
          <CuminIcon className="absolute bottom-10 left-[46%] w-5 h-5 text-orange-600/30 pointer-events-none z-0 hidden md:block animate-float-leaf-3" style={{ transform: 'scale(1.3)', transformOrigin: 'center' }} />
          <CorianderIcon className="absolute top-6 right-[38%] w-6 h-6 text-orange-600/30 pointer-events-none z-0 hidden md:block animate-float-leaf-4" style={{ transform: 'scale(1.2)', transformOrigin: 'center' }} />
          <ClovesIcon className="absolute bottom-12 right-[20%] w-5 h-5 text-green-400/30 pointer-events-none z-0 hidden lg:block animate-float-leaf-5" style={{ transform: 'scale(1.1)', transformOrigin: 'center' }} />
          <CardamomIcon className="absolute top-1/3 left-[15%] w-7 h-7 text-orange-500/20 pointer-events-none z-0 hidden lg:block animate-float-leaf-6" style={{ transform: 'scale(1.1)', transformOrigin: 'center' }} />
          <AlmondIcon className="hidden md:block absolute top-5 right-[35%] w-6 h-6 text-green-400/25 pointer-events-none z-0 animate-float-leaf-7" style={{ transform: 'scale(1.2)', transformOrigin: 'center' }} />
          <CashewIcon className="absolute bottom-20 left-[30%] w-7 h-7 text-green-400/20 pointer-events-none z-0 animate-float-leaf-8" style={{ transform: 'scale(1.1)', transformOrigin: 'center' }} />
          <WalnutIcon className="absolute top-2/3 left-[45%] w-5 h-5 text-green-300/30 pointer-events-none z-0 animate-float-leaf-9" style={{ transform: 'scale(1.2)', transformOrigin: 'center' }} />
          <PistachioIcon className="hidden md:block absolute top-1/4 right-[40%] w-7 h-7 text-orange-500/15 pointer-events-none z-0 animate-float-leaf-10" style={{ transform: 'scale(1.1)', transformOrigin: 'center' }} />
          <DatesIcon className="absolute bottom-1/3 right-[30%] w-6 h-6 text-green-400/20 pointer-events-none z-0 animate-float-leaf-11" style={{ transform: 'scale(1.2)', transformOrigin: 'center' }} />

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer pointer-events-none z-0"></div>

          <div className="absolute pt-3 left-4 sm:left-8 md:left-16 lg:left-40 top-1/2 -translate-y-1/2 z-10 max-w-[45%] sm:max-w-[42%] md:max-w-[38%]">
            <p className=" banner-script text-2xl sm:text-4xl md:text-5xl text-green-600 leading-none mb-1 animate-slide-up">
              {banner.title1}
            </p>
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-orange-700 leading-tight mb-2 sm:mb-3 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              {banner.title2}
            </h1>
            <p className="hidden md:block  text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 max-w-md animate-slide-up" style={{ animationDelay: "0.2s" }}>
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

          <div className="absolute right-0 sm:right-1 md:right-6 lg:right-15 top-1/2 -translate-y-1/2 z-10 w-[58%] sm:w-[55%] md:w-[52%] lg:w-[50%] flex items-center justify-center h-full">
            <div className="animate-scale-in w-full h-full flex items-center justify-center">
              <img
                src={banner.image}
                alt={banner.title1}
                className="w-[120%] h-[120%] sm:w-[130%] sm:h-[130%] md:w-[140%] md:h-[140%] lg:w-[140%] lg:h-[100%] object-contain hover-scale "
              />
            </div>
          </div>

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

      {/* Features Section */}
      <section className="w-full sm:px-6 lg:px-8 mt-6 mb-2">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
          {[
            { icon: Truck, title: "Free Delivery", sub: "Above ₹499", bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-100" },
            { icon: Shield, title: "100% Pure", sub: "Quality Guaranteed", bg: "bg-green-50", text: "text-green-600", border: "border-green-100" },
            { icon: Clock, title: "Same Day", sub: "Delivery Available", bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-100" },
            { icon: Leaf, title: "Premium", sub: "Certified Quality", bg: "bg-green-50", text: "text-green-600", border: "border-green-100" },
          ].map((f, index) => (
            <div 
              key={f.title} 
              className={`group relative overflow-hidden bg-white px-4 py-4 rounded-2xl shadow-sm border ${f.border} hover:shadow-lg transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] animate-slide-up cursor-pointer`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative z-10 flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${f.bg} group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <f.icon className={`w-5 h-5 ${f.text} group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <div>
                  <p className={`text-sm font-semibold text-gray-800 group-hover:${f.text} transition-colors duration-300`}>{f.title}</p>
                  <p className="text-xs text-gray-400 group-hover:text-gray-500 transition-colors duration-300">{f.sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-auto mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm py-4 animate-slide-up">
          <span className="text-orange-400 hover:text-emerald-500 cursor-pointer transition-all duration-300 hover:translate-x-1 hover:scale-105">Home</span>
          <span className="text-gray-600 animate-pulse-slow">/</span>
          <span className="text-emerald-500 font-medium bg-emerald-50 px-3 py-1 rounded-full hover:scale-105 transition-transform duration-300">Spices & Dry Fruits</span>
          <span className="ml-auto text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full animate-pulse-slow hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-300">
            {products.length} Products Available
          </span>
        </div>
      </div>

      {/* Products Section */}
      <div className="w-auto  px-2 sm:px-6 lg:px-8 py-6 bg-gradient-to-b from-orange-50 to-orange-100">
        
        {/* Categories */}
<div className="mb-8">
  {/* Mobile: all pills fit in one line, no scroll */}
  <div className="flex sm:hidden items-center gap-1 w-full">
    {categories.map((cat) => (
      <button
        key={cat.id}
        onClick={() => setSelectedCategory(cat.id)}
        className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 px-0.5 rounded-xl transition-all duration-300 min-w-0 ${
          selectedCategory === cat.id
            ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md shadow-emerald-200/50"
            : "bg-white text-gray-600 border border-gray-100"
        }`}
      >
        <span className="text-base leading-none">{cat.icon}</span>
        <span className="text-[10px] pb-1 font-semibold leading-none truncate w-full text-center">
          {cat.name}
        </span>
        {cat.id !== "all" && (
          <span className={`text-[7px] leading-none ${
            selectedCategory === cat.id ? "text-white/80" : "text-gray-400"
          }`}>
            {products.filter(p => p.category === cat.id).length}
          </span>
        )}
      </button>
    ))}
  </div>

  {/* Desktop: original scrollable pill row */}
  <div className="relative hidden sm:block">
    <div className="flex items-center gap-3 overflow-x-auto pb-4 pr-10 scrollbar-hide">
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
    <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-orange-100 via-orange-100/70 to-transparent pointer-events-none z-10"></div>
  </div>
</div>
        {/* Sort & Filter */}
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

  {/* Products Grid/List */}
        <div className={`grid ${
          viewMode === "grid" 
            ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" 
            : "grid-cols-1"
        } gap-5 md:gap-7`}>
          {sortedProducts.map((product, index) => (
            <div
              key={product.id}
              className={`group relative bg-gradient-to-br from-emerald-50/80 via-white to-orange-50/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 animate-scale-in border border-white/50 hover:border-emerald-200 cursor-pointer ${
                viewMode === "grid" ? "" : "flex flex-col sm:flex-row items-stretch sm:items-center gap-0 sm:gap-6 p-0 sm:p-5"
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => openProductModal(product)}
            >
              {viewMode === "grid" ? (
                <>
                  <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-emerald-100/30 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-200/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-150 group-hover:animate-spin-slow"></div>
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-200/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-150"></div>
                    
                    <div className="relative p-2 overflow-hidden">
                      {product.discount > 0 && (
                        <span className="absolute top-3 left-3 bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-lg shadow-orange-200 animate-pulse-slow hover:animate-bounce-slow">
                          {product.discount}% OFF
                        </span>
                      )}

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-xl"
                      >
                        <Heart className={`w-4 h-4 transition-colors ${
                          wishlist.includes(product.id) ? "fill-red-500 text-red-500 animate-pulse-slow" : "text-gray-600 hover:text-red-500"
                        }`} />
                      </button>

                      <div className="relative overflow-hidden rounded-xl">
                        <img 
                          src={Array.isArray(product.image) ? product.image[0] : product.image} 
                          alt={product.name}
                          className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -skew-x-12 group-hover:translate-x-full"></div>

                      <div className="absolute bottom-3 right-3 flex flex-col gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            openProductModal(product);
                          }}
                          className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:-rotate-12"
                        >
                          <Eye className="w-4 h-4 text-gray-600 group-hover:text-emerald-600" />
                        </button>
                      </div>
                    </div>

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

                      {/* ====== GRID VIEW PRICE DISPLAY ====== */}
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xl font-bold text-emerald-700 group-hover:scale-110 transition-transform duration-300 inline-block">
                              ₹{product.price}
                            </span>
                            <span className="text-xs text-gray-400">/{product.unit}</span>
                          </div>
                          {product.originalPrice && (
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs text-gray-400 line-through decoration-red-400">
                                ₹{product.originalPrice}
                              </span>
                              {product.discount > 0 && (
                                <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded-full">
                                  {product.discount}% OFF
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        
                        {justAddedProductId === product.id ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNavigate('/cart');
                            }}
                            className="p-2.5 rounded-xl transition-all duration-300 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-200 hover:shadow-xl hover:scale-110 group"
                          >
                            <ShoppingCart className="w-4 h-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (product.inStock) {
                                addToCart(product, 1);
                              }
                            }}
                            className={`p-2.5 rounded-xl transition-all duration-300 ${
                              product.inStock 
                                ? "bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white shadow-lg shadow-emerald-200 hover:shadow-xl hover:scale-110 hover:rotate-3 group" 
                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            }`}
                            disabled={!product.inStock}
                          >
                            <ShoppingCart className={`w-4 h-4 ${product.inStock ? 'group-hover:scale-110 group-hover:rotate-12 transition-all duration-300' : ''}`} />
                          </button>
                        )}
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
                <>
                  {/* ===== LIST VIEW: image as full-width banner on mobile, small square on desktop ===== */}
                  <div className="relative flex-shrink-0 w-full sm:w-36">
                    <div className="w-full h-44 sm:w-36 sm:h-36 rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <img 
                        src={Array.isArray(product.image) ? product.image[0] : product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      {product.discount > 0 && (
                        <span className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg animate-pulse-slow">
                          {product.discount}% OFF
                        </span>
                      )}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        className="absolute top-2 right-2 z-10 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-all duration-300"
                      >
                        <Heart className={`w-4 h-4 transition-colors ${
                          wishlist.includes(product.id) ? "fill-red-500 text-red-500 animate-pulse-slow" : "text-gray-600 hover:text-red-500"
                        }`} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex-1 w-full p-4 sm:p-0 sm:relative">
                    {/* Title / description / rating - always stacks first */}
                    <div className="w-full">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                        {product.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-300">{product.description}</p>
                      <div className="flex items-center gap-2 sm:gap-3 mt-2 flex-wrap">
                        <div className="flex items-center gap-1">
                          {renderStars(product.rating)}
                          <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
                        </div>
                        <span className="text-xs text-gray-300">|</span>
                        <span className="text-xs text-gray-500">📍 {product.origin}</span>
                      </div>
                    </div>

                    {/* Price block - below on mobile, top-right on desktop */}
                    <div className="w-full mt-3 sm:mt-0 sm:absolute sm:top-0 sm:right-0 text-left sm:text-right">
                      <div className="flex items-baseline gap-2 sm:justify-end">
                        <span className="text-xl sm:text-2xl font-bold text-emerald-700">
                          ₹{product.price}
                        </span>
                        <span className="text-sm text-gray-400">/{product.unit}</span>
                      </div>
                      {product.originalPrice && (
                        <div className="flex items-center gap-2 sm:justify-end">
                          <span className="text-xs text-gray-400 line-through decoration-red-400">
                            ₹{product.originalPrice}
                          </span>
                          {product.discount > 0 && (
                            <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                              🔥 {product.discount}% OFF
                            </span>
                          )}
                        </div>
                      )}
                      {product.discount > 0 && product.originalPrice && (
                        <div className="text-[10px] text-emerald-600 font-medium mt-0.5">
                          Save ₹{product.originalPrice - product.price}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3">
                      {product.discount > 0 && (
                        <span className="text-xs bg-orange-50 text-orange-700 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-orange-200">
                          🔥 {product.discount}% OFF
                        </span>
                      )}
                      <span className={`text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border ${
                        product.inStock 
                          ? "bg-green-50 text-green-700 border-green-200" 
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}>
                        {product.inStock ? "✅ In Stock" : "❌ Out of Stock"}
                      </span>
                      
                      {/* ====== LIST VIEW BUTTONS ====== */}
                      <div className="flex gap-2 w-full sm:w-auto sm:ml-auto mt-2 sm:mt-0">
                        {justAddedProductId === product.id ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNavigate('/cart');
                            }}
                            className="flex-1 sm:flex-none px-4 py-2 rounded-xl transition-all duration-300 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-200 hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Go to Cart
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (product.inStock) {
                                addToCart(product, 1);
                              }
                            }}
                            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                              product.inStock 
                                ? "bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white shadow-lg shadow-emerald-200 hover:shadow-xl hover:scale-105" 
                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            }`}
                            disabled={!product.inStock}
                          >
                            <ShoppingCart className="w-4 h-4" />
                            <span>Add</span>
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (product.inStock) {
                              addToCart(product, 1);
                              handleNavigate('/cart');
                            }
                          }}
                          className={`flex-1 sm:flex-none px-4 py-2 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                            product.inStock 
                              ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-200 hover:shadow-xl hover:scale-105" 
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                          disabled={!product.inStock}
                        >
                          <Zap className="w-4 h-4" />
                          <span>Buy</span>
                          {product.discount > 0 && product.inStock && (
                            <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded-full font-bold shrink-0">
                              {product.discount}%
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
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

      <ProductModal />

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

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }

        .backdrop-blur-sm {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }

        .max-h-\[90vh\]::-webkit-scrollbar {
          width: 4px;
        }
        .max-h-\[90vh\]::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .max-h-\[90vh\]::-webkit-scrollbar-thumb {
          background: #10b981;
          border-radius: 10px;
        }
        .max-h-\[90vh\]::-webkit-scrollbar-thumb:hover {
          background: #059669;
        }
      `}</style>
    </div>
  );
};

export default SpicesAndDryFruits;