import React, { useState } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Phone,
  Truck,
  Menu,
  X,
} from "lucide-react";

const Header = ({ cartCount = 0, cartTotal = 0 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top bar - updated to emerald theme */}
      <div className="hidden md:flex items-center justify-between bg-emerald-900 text-emerald-100 text-xs px-8 py-2">
        <div className="flex items-center gap-1">
          <Truck size={14} />
          <span>Free Delivery on Orders Over ₹499</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="cursor-pointer hover:text-white transition-colors">Track Order</span>
          <span className="cursor-pointer hover:text-white transition-colors">Help Center</span>
          <span className="flex items-center gap-1">
            <Phone size={14} /> +91 98765 43210
          </span>
        </div>
      </div>

      {/* Navbar - updated to emerald theme */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm shadow-emerald-100/20">
        <div className="flex items-center justify-between px-5 md:px-8 py-3 gap-4">
          {/* Logo - updated to emerald theme */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="bg-gradient-to-br from-emerald-600 to-amber-500 text-white rounded-xl p-2 shadow-lg shadow-emerald-500/30">
              <ShoppingCart size={22} />
            </div>
            <div>
              <p className="text-xl font-extrabold text-emerald-800 leading-tight">
                Grocery
              </p>
              <p className="text-[10px] text-gray-400 tracking-wide -mt-0.5">
                Freshness Delivered
              </p>
            </div>
          </div>

          {/* Navigation - updated to emerald theme */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-gray-600">
            <a className="text-emerald-700 border-b-2 border-emerald-500 pb-1 hover:border-emerald-700 transition-colors" href="#">
              Home
            </a>

            <a className="hover:text-emerald-700 transition-colors" href="#">
              Categories
            </a>
 
            <a className="hover:text-emerald-700 transition-colors" href="#">
              About Us
            </a>
            <a className="hover:text-emerald-700 transition-colors" href="#">
              Contact
            </a>
          </nav>

          {/* Search bar - updated to emerald theme */}
          <div className="hidden md:flex items-center flex-1 max-w-xs">
            <div className="flex items-center w-full bg-gray-50 border-2 border-emerald-200 focus-within:border-emerald-500 rounded-full pl-4 pr-1 py-1.5 transition-all focus-within:shadow-lg focus-within:shadow-emerald-100/50">
              <input
                type="text"
                placeholder="Search for products..."
                className="bg-transparent outline-none text-sm flex-1 placeholder:text-gray-400"
              />
              <button className="bg-gradient-to-r from-emerald-600 to-amber-500 hover:from-emerald-700 hover:to-amber-600 text-white rounded-full p-2 transition-all hover:shadow-lg hover:shadow-emerald-500/30">
                <Search size={16} />
              </button>
            </div>
          </div>

          {/* User actions - updated to emerald theme */}
          <div className="flex items-center gap-5">
            <div className="hidden md:flex flex-col items-center text-gray-600 cursor-pointer hover:text-emerald-700 transition-colors">
              <User size={20} />
              <span className="text-[11px]">Account</span>
            </div>
            <div className="relative flex flex-col items-center text-gray-600 cursor-pointer hover:text-emerald-700 transition-colors">
              <ShoppingCart size={20} />
              <span className="text-[11px]">₹{cartTotal}</span>
              <span className="absolute -top-1.5 -right-2 bg-gradient-to-r from-emerald-600 to-amber-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                {cartCount}
              </span>
            </div>
            <button
              className="lg:hidden text-gray-700 hover:text-emerald-700 transition-colors"
              onClick={() => setMobileMenuOpen((v) => !v)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu - updated to emerald theme */}
        {mobileMenuOpen && (
          <div className="lg:hidden flex flex-col gap-3 px-5 pb-4 text-sm font-medium text-gray-600 border-t border-emerald-100 pt-3 bg-white/95 backdrop-blur-sm">
            <a href="#" className="text-emerald-700 font-semibold">
              Home
            </a>
            
            <a href="#" className="hover:text-emerald-700 transition-colors">Categories</a>
          
            <a href="#" className="hover:text-emerald-700 transition-colors">About Us</a>
            <a href="#" className="hover:text-emerald-700 transition-colors">Contact</a>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;