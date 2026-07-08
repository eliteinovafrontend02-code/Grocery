// src/Components/pages/Cart.jsx

import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  CreditCard,
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
  MapPin,
  Calendar,
  Users,
  Package,
  ChevronRight,
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

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (e) {
        console.error('Error loading cart:', e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Update delivery fee based on cart total
  useEffect(() => {
    const subtotal = getSubtotal();
    if (subtotal >= 499) {
      setDeliveryFee(0);
    } else {
      setDeliveryFee(49);
    }
  }, [cartItems, selectedDelivery]);

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const updateQuantity = (productId, change) => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + change;
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
      // If cart is empty, clear localStorage
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

    // Sample promo codes
    const validPromoCodes = {
      "FRESH10": { discount: 10, type: "percentage" },
      "FRESH20": { discount: 20, type: "percentage" },
      "WELCOME": { discount: 50, type: "fixed" },
      "SAVE15": { discount: 15, type: "percentage" },
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
    // Simulate checkout process
    setTimeout(() => {
      setLoading(false);
      navigate('/checkout', { state: { cartItems, total, deliveryFee, discount } });
    }, 1500);
  };

  // Empty Cart Component
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center animate-float">
                  <ShoppingCart className="w-16 h-16 text-emerald-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center animate-pulse-slow">
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

          {/* Featured Categories */}
          <div className="mt-16">
            <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center">
              🍎 Fresh Picks For You
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { icon: "🍎", label: "Fresh Fruits", bg: "bg-red-50", hover: "hover:bg-red-100" },
                { icon: "🥬", label: "Vegetables", bg: "bg-green-50", hover: "hover:bg-green-100" },
                { icon: "🍊", label: "Exotic Fruits", bg: "bg-orange-50", hover: "hover:bg-orange-100" },
                { icon: "🥑", label: "Organic Picks", bg: "bg-emerald-50", hover: "hover:bg-emerald-100" },
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-110"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6 text-emerald-600" />
                  Your Cart
                </h1>
                <p className="text-sm text-gray-500">{totalItems} items in your cart</p>
              </div>
            </div>
            <button
              onClick={clearCart}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">Clear Cart</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-emerald-200 animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center gap-4 p-4">
                  {/* Product Image */}
                  <div className="relative flex-shrink-0">
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-50">
                      <img
                        src={Array.isArray(item.image) ? item.image[0] : item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    {item.discount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
                        {item.discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-400">{item.unit}</p>
                        {item.isOrganic && (
                          <span className="inline-flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
                            <Leaf className="w-3 h-3" />
                            Organic
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all duration-300 hover:scale-110"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-emerald-700">
                          ₹{item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            ₹{item.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1 border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1.5 rounded-lg hover:bg-gray-200 transition-all duration-200 hover:scale-110"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="w-8 text-center font-semibold text-gray-800 text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1.5 rounded-lg hover:bg-gray-200 transition-all duration-200 hover:scale-110"
                          disabled={item.quantity >= 10}
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>

                      <span className="text-sm font-semibold text-gray-800">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stock Status */}
                {!item.inStock && (
                  <div className="px-4 pb-3">
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-2 rounded-xl text-xs">
                      <AlertCircle className="w-4 h-4" />
                      <span>Out of stock! Please remove this item.</span>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Continue Shopping Button */}
            <button
              onClick={() => navigate('/fresh-products')}
              className="w-full py-4 text-emerald-600 font-semibold hover:bg-emerald-50 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              Continue Shopping
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-6">Order Summary</h3>

                {/* Items Count */}
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Items ({totalItems})</span>
                  <span className="font-medium text-gray-800">₹{subtotal}</span>
                </div>

                {/* Delivery Fee */}
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    <span className="text-gray-600">Delivery Fee</span>
                  </div>
                  <span className={deliveryFee === 0 ? "text-emerald-600 font-medium" : "text-gray-800"}>
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                  </span>
                </div>

                {/* Delivery Options */}
                <div className="py-3 border-b border-gray-100">
                  <p className="text-xs text-gray-500 mb-2">Delivery Options</p>
                  <div className="space-y-2">
                    {[
                      { id: "standard", label: "Standard", time: "3-5 days", fee: 0, min: 0 },
                      { id: "express", label: "Express", time: "1-2 days", fee: 99, min: 0 },
                      { id: "same-day", label: "Same Day", time: "Today", fee: 149, min: 499 },
                    ].map((option) => (
                      <label
                        key={option.id}
                        className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all duration-300 ${
                          selectedDelivery === option.id
                            ? "bg-emerald-50 border-2 border-emerald-400"
                            : "hover:bg-gray-50 border-2 border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="delivery"
                            value={option.id}
                            checked={selectedDelivery === option.id}
                            onChange={() => setSelectedDelivery(option.id)}
                            className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                            disabled={subtotal < option.min}
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-700">{option.label}</p>
                            <p className="text-xs text-gray-400">{option.time}</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium">
                          {option.fee === 0 ? "FREE" : `₹${option.fee}`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Promo Code */}
                <div className="py-3 border-b border-gray-100">
                  {!promoApplied ? (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter promo code"
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                        />
                        <button
                          onClick={applyPromoCode}
                          className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl text-sm font-medium hover:scale-105 transition-all duration-300"
                        >
                          Apply
                        </button>
                      </div>
                      {promoError && (
                        <p className="text-xs text-red-500">{promoError}</p>
                      )}
                      <p className="text-xs text-gray-400">
                        Try: FRESH10, FRESH20, WELCOME
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-2 bg-emerald-50 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Gift className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-medium text-emerald-700">
                          Promo Applied!
                        </span>
                      </div>
                      <button
                        onClick={removePromoCode}
                        className="text-sm text-red-500 hover:text-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Discount */}
                {discount > 0 && (
                  <div className="flex items-center justify-between py-2 border-b border-gray-100 text-emerald-600">
                    <span className="flex items-center gap-2">
                      <Percent className="w-4 h-4" />
                      Discount
                    </span>
                    <span className="font-medium">-₹{discount}</span>
                  </div>
                )}

                {/* Total */}
                <div className="flex items-center justify-between py-4">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-emerald-700">
                      ₹{total}
                    </span>
                    {deliveryFee === 0 && subtotal >= 499 && (
                      <p className="text-xs text-emerald-600 flex items-center gap-1 justify-end">
                        <CheckCircle className="w-3 h-3" />
                        Free Delivery
                      </p>
                    )}
                  </div>
                </div>

                {/* Free Delivery Message */}
                {subtotal < 499 && (
                  <div className="mb-4 p-3 bg-orange-50 rounded-xl border border-orange-200">
                    <div className="flex items-center gap-2 text-sm text-orange-700">
                      <Truck className="w-4 h-4" />
                      <span>
                        Add ₹{499 - subtotal} more for FREE delivery
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 bg-orange-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((subtotal / 499) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Checkout Button */}
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
                    { icon: Shield, label: "Secure", sub: "Payments" },
                    { icon: Clock, label: "Fresh", sub: "Guarantee" },
                    { icon: Users, label: "Support", sub: "24/7" },
                  ].map((badge, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center p-2 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-all duration-300 group cursor-pointer"
                    >
                      <badge.icon className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-xs font-medium text-gray-700 mt-1">{badge.label}</span>
                      <span className="text-[10px] text-gray-400">{badge.sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slideUp 0.5s ease-out forwards; opacity: 0; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }

        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
};

export default Cart;