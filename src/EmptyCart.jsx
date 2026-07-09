// src/EmptyCart.jsx

import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  ArrowLeft,
  Leaf,
  X,
  Sparkles,
  TrendingUp,
  Zap,
  Star,
} from "lucide-react";

const EmptyCart = ({ navigate }) => {
  const [floatingItems, setFloatingItems] = useState([]);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const items = ["🍎", "🥬", "🍊", "🥑", "🍇", "🥕", "🍓", "🍋"];
    const newItems = [];
    for (let i = 0; i < 12; i++) {
      newItems.push({
        id: i,
        emoji: items[i % items.length],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 20 + Math.random() * 20,
        duration: 15 + Math.random() * 20,
        delay: Math.random() * 10,
        rotation: Math.random() * 360,
      });
    }
    setFloatingItems(newItems);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 mt-10 overflow-hidden relative">
        {/* Animated Background Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {floatingItems.map((item) => (
            <div
              key={item.id}
              className="absolute animate-float-slow opacity-30"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                fontSize: `${item.size}px`,
                animationDuration: `${item.duration}s`,
                animationDelay: `${item.delay}s`,
                transform: `rotate(${item.rotation}deg)`,
                filter: "blur(0.5px)",
              }}
            >
              {item.emoji}
            </div>
          ))}
        </div>

        {/* Decorative floating shapes */}
        <div className="absolute top-20 left-10 animate-pulse-slow opacity-20">
          <div className="w-32 h-32 bg-emerald-300 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute bottom-20 right-10 animate-pulse-slow animation-delay-1000 opacity-20">
          <div className="w-40 h-40 bg-orange-300 rounded-full blur-3xl"></div>
        </div>

        <div className="w-auto mx-auto px-4 pt-32 pb-8 relative z-10">
          <div className="text-center">
            {/* Main Icon with Enhanced Animations */}
            <div
              className="flex justify-center mb-8"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="relative group">
                {/* Pulsing ring effect */}
                <div className="absolute inset-0 rounded-full animate-ping-slow bg-emerald-200 opacity-30"></div>
                <div className="absolute inset-0 rounded-full animate-ping-slower bg-orange-200 opacity-20"></div>

                <div
                  className={`w-44 h-44 bg-gradient-to-br from-emerald-100 to-orange-100 rounded-full flex items-center justify-center shadow-2xl transition-all duration-700 ${
                    isHovering
                      ? "scale-110 rotate-6 shadow-3xl"
                      : "group-hover:scale-110"
                  }`}
                >
                  <ShoppingCart
                    className={`w-24 h-24 text-emerald-600 transition-all duration-700 ${
                      isHovering ? "rotate-12 scale-110" : ""
                    }`}
                  />
                </div>

                {/* Animated badges */}
                <div className="absolute -top-4 -right-4 w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-slow">
                  <X className="w-7 h-7 text-white animate-spin-slow" />
                </div>
                <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-emerald-400 rounded-full flex items-center justify-center shadow-lg animate-pulse-slow">
                  <Leaf className="w-5 h-5 text-white animate-float" />
                </div>
                <div className="absolute top-1/2 -right-6 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-float-delayed">
                  <Star className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Text with gradient animation */}
            <h2 className="text-5xl font-bold text-gray-800 mb-4 tracking-tight animate-fade-in">
              Your Cart is{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-orange-500 animate-gradient">
                Empty
              </span>
            </h2>

            <p className="text-gray-500 mb-8 max-w-md mx-auto text-lg font-light animate-slide-up">
              Looks like you haven't added any fresh products yet.
              <span className="block mt-2 text-emerald-600 font-medium">
                Explore our collection and find the freshest produce!
              </span>
            </p>

            {/* Main CTA Button with Enhanced Effects */}
            <button
              onClick={() => navigate("/fresh-products")}
              className="inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-2xl shadow-2xl shadow-emerald-200 hover:shadow-3xl hover:scale-105 transition-all duration-500 group relative overflow-hidden"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform duration-300" />
              <span className="font-medium tracking-wide text-lg">
                Start Shopping
              </span>
              <Sparkles className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-180" />

              {/* Animated dots */}
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></span>
              <span className="absolute bottom-0 left-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></span>
            </button>
          </div>

          {/* Fresh Picks Section with Enhanced Cards */}
          <div className="mt-24">
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-400"></div>
              <h3 className="text-3xl font-semibold text-gray-700 text-center animate-gradient">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-orange-500">
                  ✦ Fresh Picks
                </span>
                <span className="mx-2">For You</span>
              </h3>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-orange-400"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                {
                  icon: "🍎",
                  label: "Fresh Fruits",
                  bg: "from-red-50 to-orange-50",
                  hover: "hover:from-red-100 hover:to-orange-100",
                  color: "text-red-500",
                },
                {
                  icon: "🥬",
                  label: "Vegetables",
                  bg: "from-green-50 to-emerald-50",
                  hover: "hover:from-green-100 hover:to-emerald-100",
                  color: "text-green-500",
                },
                {
                  icon: "🍊",
                  label: "Exotic Fruits",
                  bg: "from-orange-50 to-yellow-50",
                  hover: "hover:from-orange-100 hover:to-yellow-100",
                  color: "text-orange-500",
                },
                {
                  icon: "🥑",
                  label: "Organic Picks",
                  bg: "from-emerald-50 to-teal-50",
                  hover: "hover:from-emerald-100 hover:to-teal-100",
                  color: "text-emerald-500",
                },
              ].map((category, index) => (
                <button
                  key={index}
                  onClick={() => navigate("/fresh-products")}
                  className={`p-6 rounded-2xl bg-gradient-to-br ${category.bg} ${category.hover} transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-white/50 group relative overflow-hidden animate-fade-up`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Hover glow effect */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${category.bg} blur-xl`}
                  ></div>

                  <div className="relative z-10">
                    <div
                      className={`text-6xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ${category.color}`}
                    >
                      {category.icon}
                    </div>
                    <p className="text-sm font-semibold text-gray-700 group-hover:text-emerald-600 transition-colors duration-300">
                      {category.label}
                    </p>

                    {/* Decorative line */}
                    <div
                      className={`w-8 h-0.5 mx-auto mt-2 bg-gradient-to-r from-transparent ${category.color} to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-12`}
                    ></div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Promotional Banner */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-6 shadow-2xl shadow-emerald-200/50 animate-pulse-slow relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer"></div>
              <div className="flex items-center justify-between flex-wrap gap-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-bounce-slow">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">
                      Free Delivery on First Order!
                    </p>
                    <p className="text-emerald-100 text-sm">Use code: FRESH20</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/fresh-products")}
                  className="px-6 py-2 bg-white text-emerald-600 rounded-full font-semibold hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                >
                  Shop Now <TrendingUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        @keyframes ping-slower {
          0% { transform: scale(1); opacity: 0.2; }
          100% { transform: scale(1.8); opacity: 0; }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        /* Utility Classes */
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
          animation-delay: 1.5s;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 3s ease-out infinite;
        }

        .animate-ping-slower {
          animation: ping-slower 4s ease-out infinite;
          animation-delay: 1.5s;
        }

        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animate-fade-up {
          animation: fade-up 0.6s ease-out;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        /* Additional hover effects */
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .hover\\:shadow-3xl:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </>
  );
};

export default EmptyCart;