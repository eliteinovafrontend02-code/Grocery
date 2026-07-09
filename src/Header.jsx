import React, { useState } from "react";
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
} from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
   <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-100 z-[9999] shadow-sm">
      {/* Top section - full width with max-width container */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Logo - Make it clickable to home */}
          <Link to="/" className="flex items-center gap-2 mr-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-green-100 to-orange-100 flex items-center justify-center">
              <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            </div>
            <div className="leading-tight hidden sm:block">
              <p className="text-lg sm:text-xl font-bold text-green-700">Grocery Items</p>
              <p className="text-[10px] sm:text-[11px] text-gray-400 -mt-1">Fresh Items to You</p>
            </div>
            {/* Mobile logo text */}
            <div className="leading-tight sm:hidden">
              <p className="text-base font-bold text-green-700">Grocery</p>
            </div>
          </Link>

          {/* Deliver to - hidden on mobile */}
          <div className="hidden lg:flex items-center gap-1 text-sm text-gray-600 border-l border-gray-200 pl-4">
            <MapPin className="w-4 h-4 text-orange-500" />
            <div className="leading-tight">
              <p className="text-[11px] text-gray-400">Deliver to</p>
              <p className="font-medium text-gray-700">chennai 600026</p>
            </div>
          </div>

          {/* Search - hidden on mobile, visible on larger screens */}
          <div className="hidden sm:flex flex-1 min-w-[150px] sm:min-w-[200px] items-center border border-gray-200 rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Search for groceries, fruits, spices, snacks & more..."
              className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm outline-none"
            />
            <button
              aria-label="Search"
              className="bg-green-700 hover:bg-green-800 transition-colors text-white px-3 sm:px-4 py-1.5 sm:py-2.5"
            >
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Right icons - responsive */}
          <div className="flex items-center gap-3 sm:gap-5 ml-auto">
            {/* Account - Now visible on mobile too */}
            <NavLink 
              to="/account" 
              className={({ isActive }) => 
                `flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer ${
                  isActive ? 'text-green-700' : ''
                }`
              }
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              <div className="leading-tight hidden lg:block">
                <p className="text-[11px] text-gray-400">My Account</p>
                <p className="font-medium">Sign in / Register</p>
              </div>
            </NavLink>

            {/* Cart - Navigate to cart page */}
            <NavLink 
              to="/cart" 
              className={({ isActive }) => 
                `relative flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer ${
                  isActive ? 'text-green-700' : ''
                }`
              }
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
              <div className="leading-tight hidden sm:block">
                <p className="text-[11px] text-gray-400">My Cart</p>
                <p className="font-medium">3 items</p>
              </div>
            </NavLink>

            {/* Hamburger Menu - Mobile only - Theme color */}
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

      {/* Mobile Search Bar - Full width below header with Back Button on LEFT side */}
      <div className="sm:hidden w-full px-4 pb-3">
        <div className="flex items-center gap-2">
          {/* Back Button - LEFT side of search bar with theme color */}
          <button
            onClick={goBack}
            className="flex items-center justify-center w-10 h-10 bg-green-700 hover:bg-green-800 rounded-full transition-colors flex-shrink-0"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1 flex items-center border border-gray-200 rounded-full overflow-hidden bg-white">
            <input
              type="text"
              placeholder="Search groceries, fruits & more..."
              className="flex-1 px-4 py-2 text-sm outline-none"
            />
            <button
              aria-label="Search"
              className="bg-green-700 hover:bg-green-800 transition-colors text-white px-4 py-2.5"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category navigation - Hidden on mobile, visible on larger screens */}
      <nav className="hidden sm:block w-full border-t border-gray-100 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
          <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
            {/* Back Button - LEFT side of categories on Desktop with box style */}
            <button
              onClick={goBack}
              className="flex items-center gap-2 bg-green-50 text-orange-400 font-medium px-3 py-2 rounded-lg transition-all duration-300 whitespace-nowrap border border-green-200 hover:bg-orange-50 hover:text-green-600 hover:border-orange-200 hover:shadow-md"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden lg:inline">Back</span>
            </button>

            {/* Menu button - Navigate to categories */}
            <NavLink 
              to="/categories" 
              className={({ isActive }) => 
                `flex items-center gap-2 bg-green-700 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-green-800 transition-colors whitespace-nowrap ${
                  isActive ? 'bg-green-800' : ''
                }`
              }
            >
              <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">All Categories</span>
              <span className="sm:hidden">Menu</span>
            </NavLink>

            {/* Category links */}
            <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto scrollbar-hide flex-1">
              {[
                { name: "Home", path: "/" },
                { name: "Fresh Products", path: "/fresh-products" },
                { name: "Kitchen Essentials", path: "/kitchen-essentials" },
                { name: "Spices & Dry Fruits", path: "/spices-dry-fruits" },
                { name: "Dairy & Snacks", path: "/dairy-snacks" },
              ].map((cat) => (
                <NavLink
                  key={cat.name}
                  to={cat.path}
                  className={({ isActive }) => 
                    `text-xs sm:text-sm font-medium transition-colors whitespace-nowrap pb-1 ${
                      isActive 
                        ? 'text-green-700 font-semibold border-b-2 border-orange-300' 
                        : 'text-gray-600 hover:text-green-700'
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

      {/* Mobile Sidebar with Blur Background */}
      {isSidebarOpen && (
        <>
          {/* Overlay with blur effect */}
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 sm:hidden animate-in fade-in duration-300"
            onClick={closeSidebar}
          />
          
          {/* Sidebar */}
          <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 sm:hidden transform transition-transform duration-300 ease-in-out animate-in slide-in-from-left">
            {/* Sidebar Header with Back Button */}
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

            {/* Sidebar Content */}
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

              {/* All Categories Section */}
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
                    { name: "Fruits", path: "/fruits", icon: "🍎" },
                    { name: "Vegetables", path: "/vegetables", icon: "🥕" },
                    { name: "Beverages", path: "/beverages", icon: "🥤" },
                    { name: "Organic Store", path: "/organic", icon: "🌿" },
                  ].map((cat) => (
                    <NavLink
                      key={cat.name}
                      to={cat.path}
                      onClick={closeSidebar}
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                          isActive 
                            ? 'bg-green-50 text-green-700 font-semibold' 
                            : 'hover:bg-gray-50 text-gray-700'
                        }`
                      }
                    >
                      <span className="text-lg">{cat.icon}</span>
                      <span className="text-sm">{cat.name}</span>
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
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
                    to="/cart" 
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                    onClick={closeSidebar}
                  >
                    <ShoppingCart className="w-5 h-5 text-green-600" />
                    <span className="text-sm">My Cart (3 items)</span>
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
    </header>
  );
}