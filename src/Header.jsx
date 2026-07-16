// src/Header.jsx

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  MapPin,
  User,
  ShoppingCart,
  Tag,
  Menu,
  Leaf,
  X,
  ChevronLeft,
  ArrowLeft,
  Info,
  Phone,
  Package,
  Shield, 

} from "lucide-react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";

// Import all product data from Components/data/
import { products as freshProducts } from "./Components/data/FreshProductsData";
import { products as kitchenProducts } from "./Components/data/KitchenEssentialsData";
import { products as spicesProducts } from "./Components/data/SpicesAndDryFruitsData";
import { products as dairyProducts } from "./Components/data/DairyProductsAndSnacksData";

const SOURCES = [
  { tag: "fresh", path: "/fresh-products", list: freshProducts },
  { tag: "kitchen", path: "/kitchen-essentials", list: kitchenProducts },
  { tag: "spices", path: "/spices-dry-fruits", list: spicesProducts },
  { tag: "dairy", path: "/dairy-snacks", list: dairyProducts },
];

const allProducts = SOURCES.flatMap(({ tag, path, list }) =>
  list.map((product) => ({
    ...product,
    _uid: `${tag}-${product.id}`,
    _routePath: path,
  }))
);

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Load cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          const cart = JSON.parse(savedCart);
          if (Array.isArray(cart)) {
            const total = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
            setCartCount(total);
          } else {
            setCartCount(0);
          }
        } else {
          setCartCount(0);
        }
      } catch (e) {
        console.error("Error loading cart count:", e);
        setCartCount(0);
      }
    };

    updateCartCount();

    const handleStorageChange = (e) => {
      if (e.key === "cart") {
        updateCartCount();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    const handleCartUpdate = () => {
      updateCartCount();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  // Score a product against the search term.
  const scoreProduct = (product, searchTerm) => {
    const name = (product.name || "").toLowerCase();
    const category = (product.category || "").toLowerCase();
    const subCategory = (product.subCategory || "").toLowerCase();

    const escaped = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const wordBoundaryMatch = (text) => new RegExp(`\\b${escaped}`, "i").test(text);

    if (name === searchTerm) return 100;
    if (name.startsWith(searchTerm)) return 85;
    if (wordBoundaryMatch(name)) return 70;
    if (name.includes(searchTerm)) return 55;
    if (category === searchTerm || subCategory === searchTerm) return 45;
    if (wordBoundaryMatch(category) || wordBoundaryMatch(subCategory)) return 35;

    return 0;
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.trim().length > 0) {
      const searchTerm = query.toLowerCase().trim();

      const scored = allProducts
        .map((product) => ({ product, score: scoreProduct(product, searchTerm) }))
        .filter(({ score }) => score > 0);

      scored.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        const aName = (a.product.name || "").toLowerCase();
        const bName = (b.product.name || "").toLowerCase();
        return aName.length - bName.length;
      });

      setSearchResults(scored.slice(0, 10).map(({ product }) => product));
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleSearchSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (searchQuery.trim().length > 0) {
      setShowSearchResults(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleProductClick = (product) => {
    setShowSearchResults(false);
    setSearchQuery("");
    navigate(product._routePath || "/fresh-products");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedDesktop =
        desktopSearchRef.current && desktopSearchRef.current.contains(event.target);
      const clickedMobile =
        mobileSearchRef.current && mobileSearchRef.current.contains(event.target);
      if (!clickedDesktop && !clickedMobile) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const goBack = () => {
    navigate(-1);
  };

  const triggerCartUpdate = () => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        if (Array.isArray(cart)) {
          const total = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
          setCartCount(total);
        } else {
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    } catch (e) {
      console.error("Error updating cart count:", e);
      setCartCount(0);
    }
  };

  const renderSearchDropdown = () => {
    if (showSearchResults && searchResults.length > 0) {
      return (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-2xl border border-gray-100 max-h-96 overflow-y-auto z-50">
          <div className="p-2">
            <div className="text-xs text-gray-400 px-3 py-2 font-medium border-b border-gray-100 flex items-center justify-between">
              <span>
                {searchResults.length} results found for "{searchQuery}"
              </span>
              <span className="text-[10px] text-gray-300">
                Showing top {Math.min(searchResults.length, 10)}
              </span>
            </div>
            {searchResults.map((product) => {
              const productName = product.name || "";
              const searchTerm = searchQuery.toLowerCase();
              const lowerName = productName.toLowerCase();
              const index = lowerName.indexOf(searchTerm);
              let displayName = productName;
              if (index !== -1) {
                const before = productName.substring(0, index);
                const match = productName.substring(index, index + searchQuery.length);
                const after = productName.substring(index + searchQuery.length);
                displayName = (
                  <>
                    {before}
                    <span className="bg-yellow-200 px-0.5 rounded font-semibold">{match}</span>
                    {after}
                  </>
                );
              }

              return (
                <button
                  key={product._uid}
                  onClick={() => handleProductClick(product)}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-emerald-50 rounded-lg transition-colors duration-200 text-left group"
                >
                  <img
                    src={
                      Array.isArray(product.image)
                        ? product.image[0]
                        : product.image || "/default-product.jpg"
                    }
                    alt={product.name}
                    className="w-10 h-10 rounded-lg object-cover bg-gray-100 group-hover:scale-105 transition-transform duration-200"
                    onError={(e) => {
                      e.target.src = "/default-product.jpg";
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate group-hover:text-emerald-600 transition-colors duration-200">
                      {displayName}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-emerald-600">
                        ₹{product.price}/{product.unit}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="capitalize bg-gray-100 px-1.5 py-0.5 rounded text-[10px]">
                        {product.category}
                      </span>
                      {product.discount > 0 && (
                        <span className="text-orange-500 font-medium bg-orange-50 px-1.5 py-0.5 rounded text-[10px]">
                          {product.discount}% OFF
                        </span>
                      )}
                    </p>
                  </div>
                  {product.inStock ? (
                    <span className="text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                      In Stock
                    </span>
                  ) : (
                    <span className="text-[10px] text-red-500 bg-red-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                      Out of Stock
                    </span>
                  )}
                </button>
              );
            })}
            {searchResults.length >= 10 && (
              <button
                onClick={handleSearchSubmit}
                className="w-full text-center text-sm text-emerald-600 font-medium px-3 py-2 hover:bg-emerald-50 rounded-lg transition-colors duration-200 border-t border-gray-100 mt-1"
              >
                View all results for "{searchQuery}" →
              </button>
            )}
          </div>
        </div>
      );
    }

    if (showSearchResults && searchQuery.trim().length > 0 && searchResults.length === 0) {
      return (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-2xl border border-gray-100 z-50">
          <div className="p-8 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-gray-600 font-medium">
              No products found for "{searchQuery}"
            </p>
            <p className="text-xs text-gray-400 mt-1">Try searching with different keywords</p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {["milk", "rice", "spices", "organic"].map((term) => (
                <button
                  key={term}
                  onClick={() => handleSearch(term)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-100 z-[9999] shadow-sm">
      {/* Top section - full width with max-width container */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mr-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-green-100 to-orange-100 flex items-center justify-center">
              <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            </div>
            <div className="leading-tight hidden sm:block">
              <p className="text-lg sm:text-xl font-bold text-green-700">Grocery Items</p>
              <p className="text-[10px] sm:text-[11px] text-gray-400 -mt-1">Fresh Items to You</p>
            </div>
            <div className="leading-tight sm:hidden">
              <p className="text-base font-bold text-green-700">Grocery Items</p>
            </div>
          </Link>

          {/* Deliver to */}
          <div className="hidden lg:flex items-center gap-1 text-sm text-gray-600 border-l border-gray-200 pl-4">
            <MapPin className="w-4 h-4 text-orange-500" />
            <div className="leading-tight">
              <p className="text-[11px] text-gray-400">Deliver to</p>
              <p className="font-medium text-gray-700">chennai 600026</p>
            </div>
          </div>

          {/* Search Desktop */}
          <div
            className="hidden sm:flex flex-1 min-w-[150px] sm:min-w-[200px] relative"
            ref={desktopSearchRef}
          >
            <form
              onSubmit={handleSearchSubmit}
              className="w-full flex items-center border border-gray-200 rounded-full overflow-hidden"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search for groceries, fruits, spices, snacks & more..."
                className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm outline-none"
                onFocus={() => {
                  if (searchQuery.trim().length > 0 && searchResults.length > 0) {
                    setShowSearchResults(true);
                  }
                }}
              />
              <button
                type="submit"
                aria-label="Search"
                className="bg-green-700 hover:bg-green-800 transition-colors text-white px-3 sm:px-4 py-1.5 sm:py-2.5"
              >
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </form>
            {renderSearchDropdown()}
          </div>

          {/* Right icons - Added About, Contact and Admin/Stock Management */}
          <div className="flex items-center gap-3 sm:gap-5 ml-auto">
            {/* Desktop: About, Contact and Admin/Stock Management Links */}
            <div className="hidden lg:flex items-center gap-4 border-r border-gray-200 pr-4">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? "text-green-700" : "text-gray-600 hover:text-green-700"
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? "text-green-700" : "text-gray-600 hover:text-green-700"
                  }`
                }
              >
                Contact
              </NavLink>
              {/* 👇 Admin/Stock Management Link with Shield icon */}
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 text-sm font-medium transition-colors ${
                    isActive 
                      ? "text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full" 
                      : "text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 px-3 py-1 rounded-full"
                  }`
                }
              >
                <Shield className="w-4 h-4" />
                <span>Admin</span>
                <span className="text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full ml-0.5">
                  Stock
                </span>
              </NavLink>
            </div>

            <NavLink
              to="/login"
              className={({ isActive }) =>
                `flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer ${
                  isActive ? "text-green-700" : ""
                }`
              }
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              <div className="leading-tight hidden lg:block">
                <p className="text-[11px] text-gray-400">My Account</p>
                <p className="font-medium">Sign in / Register</p>
              </div>
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer ${
                  isActive ? "text-green-700" : ""
                }`
              }
              onClick={triggerCartUpdate}
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-orange-200">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
              <div className="leading-tight hidden sm:block">
                <p className="text-[11px] text-gray-400">My Cart</p>
                <p className="font-medium">
                  {cartCount} {cartCount === 1 ? "item" : "items"}
                </p>
              </div>
            </NavLink>

            <button
              onClick={toggleSidebar}
              className="sm:hidden flex items-center justify-center p-1 hover:bg-green-50 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6 text-green-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="sm:hidden w-full px-4 pb-3">
        <div className="flex items-center gap-2 relative" ref={mobileSearchRef}>
          <button
            onClick={goBack}
            className="flex items-center justify-center w-10 h-10 bg-green-700 hover:bg-green-800 rounded-full transition-colors flex-shrink-0"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1 relative">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center border border-gray-200 rounded-full overflow-hidden bg-white"
            >
              <input
                type="text"
                placeholder="Search groceries, fruits & more..."
                className="flex-1 min-w-0 px-4 py-2 text-sm outline-none"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => {
                  if (searchQuery.trim().length > 0 && searchResults.length > 0) {
                    setShowSearchResults(true);
                  }
                }}
              />
              <button
                type="submit"
                aria-label="Search"
                className="bg-green-700 hover:bg-green-800 transition-colors text-white px-4 py-2.5"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
            {renderSearchDropdown()}
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <nav className="block w-full border-t border-gray-100 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
          <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
            <button
              onClick={goBack}
              className="hidden sm:flex items-center gap-2 bg-green-50 text-orange-400 font-medium px-3 py-2 rounded-lg transition-all duration-300 whitespace-nowrap border border-green-200 hover:bg-orange-50 hover:text-green-600 hover:border-orange-200 hover:shadow-md"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden lg:inline">Back</span>
            </button>

            <NavLink
              to="/"
              className={({ isActive }) =>
                `hidden sm:flex items-center gap-2 bg-green-700 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-green-800 transition-colors whitespace-nowrap ${
                  isActive ? "bg-green-800" : ""
                }`
              }
            >
              <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>All Categories</span>
            </NavLink>

            {/* Category links - Added Admin/Stock Management */}
            <div className="flex flex-nowrap items-center gap-3 sm:gap-6 overflow-x-auto scrollbar-hide flex-1 min-w-0">
              {[
                { name: "Home", path: "/" },
                { name: "Fresh Products", path: "/fresh-products" },
                { name: "Kitchen Essentials", path: "/kitchen-essentials" },
                { name: "Spices & Dry Fruits", path: "/spices-dry-fruits" },
                { name: "Dairy & Snacks", path: "/dairy-snacks" },
                // 👇 Admin/Stock Management in category nav with label
                { name: "🔒 Admin", path: "/admin" },
              ].map((cat) => (
                <NavLink
                  key={cat.name}
                  to={cat.path}
                  className={({ isActive }) =>
                    `inline-block whitespace-nowrap shrink-0 text-[10px] sm:text-sm font-medium transition-colors pb-1 ${
                      isActive
                        ? "text-green-700 font-semibold border-b-2 border-orange-300"
                        : "text-gray-600 hover:text-green-700"
                    } ${
                      cat.name.includes("Admin") ? "bg-orange-50 px-2 py-0.5 rounded-full" : ""
                    }`
                  }
                >
                  {cat.name}
                </NavLink>
              ))}
            </div>

            <span className="hidden lg:inline-block text-xs sm:text-sm font-medium text-green-700 bg-green-50 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
              🌿 Organic Store
            </span>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar - Added Admin/Stock Management */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 sm:hidden animate-in fade-in duration-300"
            onClick={closeSidebar}
          />

          <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 sm:hidden transform transition-transform duration-300 ease-in-out animate-in slide-in-from-left">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <button
                  onClick={closeSidebar}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close sidebar"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <div className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-green-700">Grocery Items</span>
                </div>
              </div>
              <button
                onClick={closeSidebar}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto h-[calc(100%-80px)]">
              {/* User Info */}
              <div className="mb-6 p-3 bg-gradient-to-r from-green-50 to-orange-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Guest User</p>
                    <Link
                      to="/account"
                      className="text-xs text-green-700 hover:underline"
                      onClick={closeSidebar}
                    >
                      Sign in / Register
                    </Link>
                  </div>
                </div>
              </div>

              {/* All Categories Section - Added Admin/Stock Management */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  All Categories
                </h3>
                <div className="space-y-1">
                  {[
                    { name: "Home", path: "/", icon: "🏠" },
                    { name: "Fresh Products", path: "/fresh-products", icon: "🥬" },
                    { name: "Kitchen Essentials", path: "/kitchen-essentials", icon: "🍳" },
                    { name: "Spices & Dry Fruits", path: "/spices-dry-fruits", icon: "🌶️" },
                    { name: "Dairy & Snacks", path: "/dairy-snacks", icon: "🧀" },
                    // 👇 Admin/Stock Management in sidebar
                    { name: "🔒 Admin (Stock)", path: "/stock-management", icon: "📦" },
                  ].map((cat) => (
                    <NavLink
                      key={cat.name}
                      to={cat.path}
                      onClick={closeSidebar}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                          isActive
                            ? "bg-green-50 text-green-700 font-semibold"
                            : "hover:bg-gray-50 text-gray-700"
                        } ${cat.name.includes("Admin") ? "bg-orange-50/50" : ""}`
                      }
                    >
                      <span className="text-lg">{cat.icon}</span>
                      <span className="text-sm">{cat.name}</span>
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Quick Links - Added Admin/Stock Management */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Quick Links
                </h3>
                <div className="space-y-1">
                  <Link
                    to="/offers"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                    onClick={closeSidebar}
                  >
                    <Tag className="w-5 h-5 text-orange-500" />
                    <span className="text-sm">Offers & Deals</span>
                  </Link>
                  
                  <Link
                    to="/about"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                    onClick={closeSidebar}
                  >
                    <Info className="w-5 h-5 text-blue-500" />
                    <span className="text-sm">About Us</span>
                  </Link>
                  
                  <Link
                    to="/contact"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                    onClick={closeSidebar}
                  >
                    <Phone className="w-5 h-5 text-purple-500" />
                    <span className="text-sm">Contact Us</span>
                  </Link>
                  
                  {/* 👇 Admin/Stock Management in Quick Links */}
                  <Link
                    to="/stock-management"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors bg-orange-50/30"
                    onClick={closeSidebar}
                  >
                    <Shield className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm font-medium">🔒 Admin - Stock Management</span>
                    <span className="text-[10px] bg-orange-200 text-orange-700 px-1.5 py-0.5 rounded-full ml-auto">
                      Staff Only
                    </span>
                  </Link>
                  
                  <Link
                    to="/cart"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                    onClick={() => {
                      closeSidebar();
                      triggerCartUpdate();
                    }}
                  >
                    <ShoppingCart className="w-5 h-5 text-green-600" />
                    <span className="text-sm">
                      My Cart ({cartCount} {cartCount === 1 ? "item" : "items"})
                    </span>
                  </Link>
                  <Link
                    to="/account"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                    onClick={closeSidebar}
                  >
                    <User className="w-5 h-5 text-blue-500" />
                    <span className="text-sm">My Account</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes slide-in-from-left {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .slide-in-from-left {
          animation: slide-in-from-left 0.3s ease-out forwards;
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </header>
  );
}