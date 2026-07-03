import React from "react";
import {
  Truck,
  ShieldCheck,
  Leaf,
  RotateCcw,
  Star,
  Plus,
  ShoppingCart,
  Phone,
} from "lucide-react";

// Data with local image paths - NO BRAND NAMES
const categories = [
  { name: "Fresh Products", img: "/images/categories/fresh-products.jpg" },
  { name: "Kitchen Essentials", img: "/images/categories/kitchen-essentials.jpg" },
  { name: "Spices & Dry Fruits", img: "/images/categories/spices-dryfruits.jpg" },
  { name: "Dairy & Snacks", img: "/images/categories/dairy-snacks.jpg" },
];

const bestSelling = [
  { name: "Fresh Red Apples", unit: "1 kg", price: 139, mrp: 169, img: "/images/products/red-apples.jpg" },
  { name: "Premium Basmati Rice", unit: "1 kg", price: 112, mrp: 125, img: "/images/products/basmati-rice.jpg" },
  { name: "Pure Sunflower Oil", unit: "1 L", price: 125, mrp: 148, img: "/images/products/sunflower-oil.jpg" },
  { name: "Fresh Full Cream Milk", unit: "1 L", price: 56, mrp: 62, img: "/images/products/fresh-milk.jpg" },
  { name: "Whole Wheat Atta", unit: "1 kg", price: 45, mrp: 52, img: "/images/products/wheat-atta.jpg" },
  { name: "Premium Toor Dal", unit: "1 kg", price: 98, mrp: 118, img: "/images/products/toor-dal.jpg" },
];

// Helper Component
const Rupee = ({ value }) => <>&#8377;{value}</>;

const Home = () => {
  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50/50">
      {/* Hero section - reduced top padding */}
      <section className="px-5 md:px-8 max-w-full mx-auto pt-2">
        <div className="grid md:grid-cols-3 gap-5">
          {/* Main hero - border radius 50px on all sides */}
          <div className="md:col-span-2 bg-gradient-to-br from-emerald-100/80 via-green-50 to-amber-100/60 rounded-[50px] overflow-hidden relative px-6 md:px-10 py-10 md:py-14 shadow-lg shadow-emerald-100/30 border border-emerald-200/50">
            <div className="max-w-md">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                Fresh Groceries,
                <br />
                <span className="text-emerald-700">Great Prices!</span>
              </h1>
              <p className="text-gray-600 mt-4 text-sm md:text-base">
                Get the freshest fruits, vegetables, groceries and daily
                essentials delivered to your doorstep.
              </p>
              <div className="flex items-center gap-3 mt-6">
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-500/30 transform hover:scale-105">
                  Shop Now
                </button>
                <button className="border-2 border-amber-300 text-amber-700 font-semibold px-6 py-3 rounded-xl hover:bg-amber-50 transition-all hover:shadow-md hover:border-amber-400">
                  Explore Offers
                </button>
              </div>
            </div>

            {/* Image - positioned at bottom right */}
            <div className="absolute right-10 md:right-20 top-5 hidden sm:block">
              <img
                src="/images/hero/groceries-basket.jpg"
                alt="Fresh groceries basket"
                className="w-66 md:w-102 h-56 md:h-72 object-cover rounded-[50px] shadow-2xl border-4 border-white ring-4 ring-emerald-200/50"
              />
              <div className="absolute -bottom-2 -left-6 bg-white/90 backdrop-blur-sm rounded-full shadow-lg px-4 py-3 flex flex-col items-center justify-center w-20 h-20 text-center border-2 border-amber-200">
                <span className="text-[10px] font-bold text-amber-600 leading-tight">
                  100% Fresh & Quality
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-6 border-t-2 border-emerald-200/40">
              {[
                { icon: Truck, title: "Free Delivery", sub: "On orders above ₹499" },
                { icon: ShieldCheck, title: "Secure Payment", sub: "100% safe & secure" },
                { icon: Leaf, title: "Fresh & Quality", sub: "Handpicked with care" },
                { icon: RotateCcw, title: "Easy Returns", sub: "Hassle free returns" },
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-full p-2 shadow-md shadow-emerald-500/30 shrink-0">
                    <f.icon size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800 leading-tight">
                      {f.title}
                    </p>
                    <p className="text-[10px] text-gray-500 leading-tight">
                      {f.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side promo - border radius 50px */}
          <div className="bg-gradient-to-br from-emerald-600 via-emerald-600 to-amber-700 rounded-[50px] relative overflow-hidden px-7 py-8 text-white flex flex-col justify-between min-h-[280px] md:min-h-0 shadow-xl shadow-emerald-900/30 border border-emerald-600/30">
            <div>
              <h3 className="text-xl font-bold leading-snug">
                Big Savings on
                <br />
                <span className="text-amber-200">Daily Essentials</span>
              </h3>
              <p className="text-emerald-100 text-xs mt-2">
                Save more on top brands and everyday products.
              </p>
              <button className="bg-white/95 backdrop-blur text-emerald-700 font-semibold text-sm px-5 py-2.5 rounded-xl mt-5 hover:bg-white transition-all hover:shadow-lg hover:scale-105 transform">
                Shop Now
              </button>
            </div>
            <img
              src="/images/hero/daily-essentials.jpg"
              alt="Daily essentials basket"
              className="absolute -bottom-4 -right-4 w-44 h-44 object-cover rounded-[50px] opacity-90 rotate-3 shadow-2xl border-2 border-white/20"
            />
            <div className="absolute top-6 right-6 bg-amber-500/90 backdrop-blur rounded-full w-16 h-16 flex flex-col items-center justify-center text-center leading-none shadow-lg shadow-amber-500/40 border-2 border-amber-400/50">
              <span className="text-[9px] font-semibold">UP TO</span>
              <span className="text-lg font-extrabold">30%</span>
              <span className="text-[9px] font-semibold">OFF</span>
            </div>
          </div>
        </div>
      </section>

     {/* Shop by Category */}
<section className="px-5 md:px-8 max-w-full mx-auto mt-12 bg-emerald-50">
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
      <span className="bg-gradient-to-r from-emerald-500 to-amber-500 w-1 h-6 rounded-full"></span>
      Shop by Category
    </h2>
    <a href="#" className="text-amber-600 text-sm font-medium hover:text-amber-700 hover:underline transition-colors">
      View All Categories →
    </a>
  </div>
  
  <div className="flex flex-wrap justify-center gap-12 md:gap-50">
    {categories.map((c, i) => (
      <div
        key={i}
        className="flex flex-col items-center gap-2 md:gap-5 cursor-pointer w-28 group"
      >
        {/* Animated border container */}
        <div className="relative p-[3px] rounded-full bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-400 bg-[length:200%_200%] animate-gradient-shift">
          {/* Glow effect */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-400/20 to-amber-400/20 blur-xl group-hover:blur-2xl transition-all duration-700 opacity-0 group-hover:opacity-100"></div>
          
          {/* Image container */}
          <div className="w-24 md:h-54 h-24 md:w-54 rounded-full bg-gradient-to-br from-emerald-50 via-green-50 to-amber-50 overflow-hidden flex items-center justify-center relative">
            {/* Inner shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-200/20 via-transparent to-amber-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* Rotating shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>
            
            <img
              src={c.img}
              alt={c.name}
              className="w-full h-full object-cover relative z-10 group-hover:scale-110 transition-transform duration-500 ease-out"
            />
            
            {/* Hover ring pulse */}
            <div className="absolute inset-0 rounded-full ring-2 ring-emerald-400/0 group-hover:ring-emerald-400/50 ring-offset-2 ring-offset-transparent transition-all duration-500"></div>
          </div>
        </div>
        
        {/* Category name with underline animation */}
        <p className="text-xs text-center text-gray-700 font-semibold leading-tight relative group-hover:text-emerald-700 transition-colors duration-300">
          {c.name}
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-emerald-500 to-amber-500 group-hover:w-full transition-all duration-500 ease-out"></span>
        </p>
        
        {/* Decorative dot indicator */}
        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100"></div>
      </div>
    ))}
  </div>
</section>


      {/* Best Selling Products */}
      <section className="px-5 md:px-8 max-w-full mx-auto mt-12 pb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="bg-gradient-to-r from-amber-500 to-emerald-500 w-1 h-6 rounded-full"></span>
            Best Selling Products
          </h2>
          <a href="#" className="text-amber-600 text-sm font-medium hover:text-amber-700 hover:underline transition-colors">
            View All →
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {bestSelling.map((p, i) => (
            <div
              key={i}
              className="border border-emerald-100 rounded-2xl p-3 hover:shadow-xl hover:shadow-emerald-100/50 transition-all group bg-white/80 backdrop-blur-sm hover:bg-white hover:border-amber-200"
            >
              <div className="relative mb-3">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-24 object-cover rounded-xl group-hover:scale-105 transition-transform"
                />
                <span className="absolute top-1.5 left-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-lg shadow-amber-500/30">
                  {Math.round(100 - (p.price / p.mrp) * 100)}% OFF
                </span>
                <button className="absolute bottom-1.5 right-1.5 bg-white/90 backdrop-blur rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-emerald-500 hover:text-white group-hover:scale-110">
                  <Plus size={14} />
                </button>
              </div>
              <p className="text-xs font-semibold text-gray-800 leading-tight line-clamp-2 h-8 group-hover:text-emerald-700 transition-colors">
                {p.name}
              </p>
              <p className="text-[10px] text-gray-400 mb-1">{p.unit}</p>
              <div className="flex items-center gap-1.5 mb-2">
                <span className="font-bold text-emerald-700 text-sm">
                  <Rupee value={p.price} />
                </span>
                <span className="text-[11px] text-gray-400 line-through">
                  <Rupee value={p.mrp} />
                </span>
              </div>
              <button className="w-full bg-gradient-to-r from-emerald-600 to-amber-500 hover:from-emerald-700 hover:to-amber-600 text-white text-[11px] font-semibold py-2 rounded-lg transition-all hover:shadow-lg hover:shadow-emerald-500/30 transform hover:scale-105">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .animate-gradient-shift {
    animation: gradient-shift 3s ease-in-out infinite;
  }
  
  /* Optional: Add floating animation for each category */
  .group:nth-child(1) { animation-delay: 0s; }
  .group:nth-child(2) { animation-delay: 0.2s; }
  .group:nth-child(3) { animation-delay: 0.4s; }
  .group:nth-child(4) { animation-delay: 0.6s; }
  .group:nth-child(5) { animation-delay: 0.8s; }
  
  /* Smooth floating effect */
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  
  .group {
    animation: float 4s ease-in-out infinite;
  }
`}</style>
    </main>
  );
};

export default Home;