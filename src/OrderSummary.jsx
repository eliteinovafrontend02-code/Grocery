// src/OrderSummary.jsx

import React from "react";
import {
  Diamond, Truck, Gift, Percent, AlertCircle, CheckCircle, X,
  Shield, Clock, RefreshCw
} from "lucide-react";

const OrderSummary = ({
  cartItems,
  subtotal,
  deliveryFee,
  discount,
  total,
  deliveryOption,
  formData,
  promoCode,
  setPromoCode,
  promoApplied,
  promoError,
  showPromoInput,
  setShowPromoInput,
  applyPromoCode,
  removePromoCode,
  getItemImage,
  selectedBank
}) => {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-emerald-100/30 hover:shadow-3xl transition-all duration-500">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Diamond className="w-5 h-5 text-emerald-600" />
          Order Summary
        </h3>
        <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
          {cartItems.length} items
        </span>
      </div>

      {/* Items List */}
      <div className="max-h-48 overflow-y-auto space-y-3 mb-4 pr-2 custom-scrollbar">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-3 py-2 border-b border-gray-100/50 last:border-0">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
              <img
                src={getItemImage(item)}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = '/default-product.jpg'; }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 truncate">{item.name}</p>
              <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
            </div>
            <span className="text-sm font-semibold text-gray-700">
              ₹{(item.price || 0) * (item.quantity || 0)}
            </span>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-800">₹{subtotal}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-gray-600">Delivery Fee</span>
          </div>
          <span className={deliveryFee === 0 ? "text-emerald-600 font-semibold" : "font-medium text-gray-800"}>
            {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
          </span>
        </div>
        
        {/* Promo Code Section */}
        <div>
          {!promoApplied ? (
            <div>
              {showPromoInput ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100/50 bg-white/50"
                    onKeyPress={(e) => e.key === 'Enter' && applyPromoCode()}
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl text-sm font-medium hover:scale-105 transition-all duration-500"
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => setShowPromoInput(false)}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-300"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowPromoInput(true)}
                  className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 transition-colors duration-300"
                >
                  <Gift className="w-4 h-4" />
                  Apply Promo Code
                </button>
              )}
              {promoError && <p className="text-xs text-red-500 mt-1">{promoError}</p>}
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50/90 to-emerald-100/90 backdrop-blur-sm rounded-xl border border-emerald-200/50 shadow-md">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">Promo Applied! 🎉</span>
              </div>
              <button
                onClick={removePromoCode}
                className="text-xs text-red-500 hover:text-red-700 transition-all duration-300 hover:scale-105"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between text-sm text-emerald-600 animate-slide-up">
            <span className="flex items-center gap-1.5">
              <Percent className="w-3.5 h-3.5" />
              Discount
            </span>
            <span className="font-semibold">-₹{discount}</span>
          </div>
        )}

        {/* COD Extra Fee */}
        {formData.paymentMethod === 'cod' && (
          <div className="flex items-center justify-between text-sm text-orange-600">
            <span className="flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              COD Convenience Fee
            </span>
            <span className="font-semibold">+₹20</span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="flex items-center justify-between py-4 mt-3 border-t-2 border-emerald-100/50">
        <span className="text-lg font-bold text-gray-800">Total</span>
        <div className="text-right">
          <span className="text-2xl font-bold text-emerald-700">
            ₹{formData.paymentMethod === 'cod' ? total + 20 : total}
          </span>
          {deliveryFee === 0 && subtotal >= 499 && (
            <p className="text-xs text-emerald-600 flex items-center gap-1 justify-end">
              <CheckCircle className="w-3 h-3" />
              Free Delivery
            </p>
          )}
          {formData.paymentMethod === 'cod' && (
            <p className="text-xs text-orange-600 flex items-center gap-1 justify-end">
              <AlertCircle className="w-3 h-3" />
              Pay on delivery
            </p>
          )}
          {formData.paymentMethod === 'netbanking' && selectedBank && (
            <p className="text-xs text-blue-600 flex items-center gap-1 justify-end">
              <span className="w-3 h-3">🏦</span>
              {selectedBank}
            </p>
          )}
        </div>
      </div>

      {/* Progress to free delivery */}
      {subtotal < 499 && (
        <div className="mb-4 p-3 bg-gradient-to-r from-orange-50/90 to-yellow-50/90 backdrop-blur-sm rounded-xl border border-orange-200/50 animate-slide-up">
          <div className="flex items-center gap-2 text-xs text-orange-700">
            <Truck className="w-3.5 h-3.5" />
            <span>Add ₹{499 - subtotal} more for FREE delivery</span>
          </div>
          <div className="mt-1.5 h-1.5 bg-orange-200/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-700"
              style={{ width: `${Math.min((subtotal / 499) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        {[
          { icon: Shield, label: "Secure", color: "emerald" },
          { icon: Clock, label: "Fresh", color: "orange" },
          { icon: RefreshCw, label: "Returns", color: "blue" },
        ].map((badge, index) => (
          <div key={index} className={`flex flex-col items-center p-2 bg-${badge.color}-50/80 rounded-xl`}>
            <badge.icon className={`w-4 h-4 text-${badge.color}-600`} />
            <span className="text-[10px] text-gray-600 mt-0.5">{badge.label}</span>
          </div>
        ))}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #10b981;
        }
      `}</style>
    </div>
  );
};

export default OrderSummary;