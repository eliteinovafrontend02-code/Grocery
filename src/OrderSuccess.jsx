// src/OrderSuccess.jsx

import React, { useState, useEffect } from "react";
import {
  CheckCircle, DollarSign, Landmark, Sparkles, Truck, AlertCircle,
  ShoppingBag, Printer, Eye, X, MapPin, Calendar, Clock, CreditCard,
  Package, User, Mail, Phone, Home, ArrowRight, Star, Heart,
  Shield, Award, Gift, ThumbsUp, Share2, Download, Zap
} from "lucide-react";

const OrderSuccess = ({ orderData, orderNumber, navigate, getItemImage, printInvoice }) => {
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [confetti, setConfetti] = useState([]);

  const isCOD = orderData?.paymentMethod === 'cod';
  const isNetBanking = orderData?.paymentMethod === 'netbanking';
  const totalWithCOD = isCOD ? orderData.total + 20 : orderData.total;

  // Generate confetti on mount
  useEffect(() => {
    const colors = ['#10b981', '#34d399', '#f59e0b', '#ef4444', '#8b5cf6', '#3b82f6'];
    const items = [];
    for (let i = 0; i < 30; i++) {
      items.push({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 6 + Math.random() * 8,
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 2,
        rotation: Math.random() * 360
      });
    }
    setConfetti(items);
  }, []);

  const handleShare = () => {
    setShowShare(!showShare);
  };

  const copyOrderLink = () => {
    navigator.clipboard.writeText(`Order #${orderData.orderNumber} - Grocery Items`);
    alert('Order link copied to clipboard!');
    setShowShare(false);
  };

  const handleRating = (value) => {
    setRating(value);
    if (value > 3) {
      setIsLiked(true);
    }
  };

  const getRatingMessage = () => {
    if (rating === 0) return "Tap a star to rate your experience";
    if (rating === 1) return "😞 We're sorry to hear that. We'll improve!";
    if (rating === 2) return "🙁 We appreciate your feedback. We'll do better!";
    if (rating === 3) return "😊 Good! We'll work to make it even better!";
    if (rating === 4) return "😄 Great! Thank you for your feedback!";
    if (rating === 5) return "🌟 Excellent! Thank you for loving our service!";
    return "";
  };

  const getRatingColor = () => {
    if (rating <= 2) return "text-red-500";
    if (rating === 3) return "text-yellow-500";
    if (rating >= 4) return "text-emerald-500";
    return "text-gray-300";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 py-8 px-4 mt-20 relative overflow-hidden">
      {/* Confetti Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {confetti.map((item) => (
          <div
            key={item.id}
            className="absolute animate-float-slow"
            style={{
              left: `${item.x}%`,
              top: '-10%',
              width: `${item.size}px`,
              height: `${item.size}px`,
              backgroundColor: item.color,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              animationDuration: `${item.duration}s`,
              animationDelay: `${item.delay}s`,
              transform: `rotate(${item.rotation}deg)`,
              opacity: 0.7
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Success Banner */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-3xl p-8 mb-8 text-white shadow-3xl shadow-emerald-200/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-float">
                {isCOD ? (
                  <DollarSign className="w-8 h-8 text-white" />
                ) : isNetBanking ? (
                  <Landmark className="w-8 h-8 text-white" />
                ) : (
                  <CheckCircle className="w-8 h-8 text-white" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {isCOD ? 'Order Placed! 🎉' : 'Payment Successful! ✅'}
                </h2>
                <p className="text-emerald-100 text-sm">
                  {isCOD 
                    ? 'Your order has been confirmed and will be delivered soon!'
                    : isNetBanking
                    ? `Payment via ${orderData.bankName || 'Net Banking'} was successful!`
                    : 'Your payment was successful and order is confirmed!'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm border border-white/20">
                #{orderData.orderNumber}
              </span>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-3xl p-8 border border-emerald-100/30 animate-scale-in" id="invoice-content">
          {/* Order Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { icon: <Package className="w-4 h-4" />, label: "Order Number", value: orderData.orderNumber, color: "emerald" },
              { icon: <Calendar className="w-4 h-4" />, label: "Order Date", value: orderData.orderDate, color: "blue" },
              { icon: <CreditCard className="w-4 h-4" />, label: "Payment Method", value: orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : orderData.paymentMethod === 'netbanking' ? `Net Banking` : orderData.paymentMethod, color: "purple" },
              { icon: <Clock className="w-4 h-4" />, label: "Status", value: isCOD ? 'Pending' : 'Paid', color: isCOD ? "yellow" : "green" },
            ].map((item, index) => (
              <div key={index} className={`bg-gradient-to-br from-${item.color}-50 to-${item.color}-100/50 rounded-xl p-4 border border-${item.color}-100/30 animate-fade-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-${item.color}-600`}>{item.icon}</span>
                  <span className="text-xs text-gray-500">{item.label}</span>
                </div>
                <p className={`text-sm font-semibold text-gray-800`}>{item.value}</p>
              </div>
            ))}
          </div>

          {/* Delivery Info */}
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 mb-6 border border-emerald-100/50 animate-fade-up">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0 animate-float">
                <Truck className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">Delivery Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  <div>
                    <p className="text-xs text-gray-500">Estimated Delivery</p>
                    <p className="text-sm font-medium text-emerald-700">{orderData.delivery.estimatedDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Delivery Method</p>
                    <p className="text-sm font-medium text-gray-700 capitalize">{orderData.delivery.method} Delivery</p>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-white/70 rounded-xl">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      {orderData.address.line1}
                      {orderData.address.line2 && `, ${orderData.address.line2}`}
                      <br />
                      {orderData.address.city}, {orderData.address.state} - {orderData.address.pincode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6 animate-fade-up">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-800">Order Items</h4>
              <span className="text-xs text-gray-500">{orderData.items.length} items</span>
            </div>
            <div className="bg-gray-50/50 rounded-xl overflow-hidden">
              <div className="divide-y divide-gray-100">
                {orderData.items.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 hover:bg-gray-100/50 transition-colors duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={getItemImage(item)}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = '/default-product.jpg'; }}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">{item.name}</p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">₹{item.price * item.quantity}</span>
                  </div>
                ))}
                {orderData.items.length > 3 && (
                  <div className="p-3 text-center text-sm text-gray-500 bg-gray-100/50">
                    +{orderData.items.length - 3} more items
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Totals */}
          <div className="border-t border-gray-200 pt-4 animate-fade-up">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-700">₹{orderData.subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery Fee</span>
                <span className={orderData.deliveryFee === 0 ? "text-emerald-600 font-medium" : "text-gray-700"}>
                  {orderData.deliveryFee === 0 ? "FREE" : `₹${orderData.deliveryFee}`}
                </span>
              </div>
              {orderData.discount > 0 && (
                <div className="flex justify-between text-sm text-emerald-600">
                  <span>Discount</span>
                  <span className="font-medium">-₹{orderData.discount}</span>
                </div>
              )}
              {isCOD && (
                <div className="flex justify-between text-sm text-orange-600">
                  <span>COD Convenience Fee</span>
                  <span className="font-medium">+₹20</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold py-3 border-t-2 border-emerald-100 mt-2">
                <span className="text-gray-800">Total</span>
                <div className="text-right">
                  <span className="text-emerald-700">₹{totalWithCOD}</span>
                  <p className="text-xs font-normal text-gray-400">
                    {isCOD ? 'Pay on delivery' : isNetBanking ? `Paid via ${orderData.bankName || 'Net Banking'}` : `Paid via ${orderData.paymentMethod}`}
                  </p>
                </div>
              </div>
            </div>

            {isCOD && (
              <div className="mt-3 p-3 bg-yellow-50/80 rounded-xl border border-yellow-200/50 flex items-center gap-3 animate-pulse-slow">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                <p className="text-sm text-yellow-700">
                  Please keep ₹{totalWithCOD} ready for cash on delivery.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Secure Transaction
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Award className="w-3 h-3" />
                Quality Guaranteed
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Gift className="w-3 h-3" />
                Happy Shopping!
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-3">Thank you for shopping with Grocery Items! 🌿</p>
            <p className="text-xs text-gray-400 mt-1">For queries, contact support@groceryitems.com</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-2xl font-semibold hover:scale-105 transition-all duration-500 shadow-2xl shadow-emerald-200 group relative overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <ShoppingBag className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Continue Shopping</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          
          <button
            onClick={() => setShowOrderDetails(true)}
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-semibold hover:scale-105 transition-all duration-500 shadow-2xl shadow-blue-200 group relative overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <Eye className="w-5 h-5 relative z-10" />
            <span className="relative z-10">View Details</span>
          </button>

          <button
            onClick={printInvoice}
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-semibold hover:scale-105 transition-all duration-500 shadow-2xl shadow-orange-200 group relative overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <Printer className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Print Invoice</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-semibold hover:scale-105 transition-all duration-500 shadow-2xl shadow-purple-200 group relative overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <Share2 className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Share Order</span>
          </button>
        </div>

        {/* Share Popup */}
        {showShare && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full mx-4 shadow-3xl animate-scale-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Share Order</h3>
                <button onClick={() => setShowShare(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-300">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-4">Share your order confirmation</p>
              <div className="flex gap-3">
                <button className="flex-1 p-3 bg-blue-500 text-white rounded-xl font-medium hover:scale-105 transition-all duration-300">
                  WhatsApp
                </button>
                <button className="flex-1 p-3 bg-emerald-500 text-white rounded-xl font-medium hover:scale-105 transition-all duration-300">
                  Email
                </button>
                <button onClick={copyOrderLink} className="flex-1 p-3 bg-gray-500 text-white rounded-xl font-medium hover:scale-105 transition-all duration-300">
                  Copy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in p-4 ">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-3xl animate-scale-in border border-white/20 mt-35">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 border-b border-gray-200 px-6 py-4 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center animate-float">
                    <Package className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Order Details</h3>
                    <p className="text-xs text-gray-500">#{orderData.orderNumber}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="p-2.5 hover:bg-gray-100 rounded-2xl transition-all duration-300 hover:scale-110"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="bg-gradient-to-r from-emerald-50/50 to-blue-50/50 rounded-2xl p-4 border border-emerald-100/30 animate-fade-up">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-600" />
                  Customer Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>{orderData.customer.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{orderData.customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{orderData.customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{orderData.orderDate}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-gradient-to-r from-orange-50/50 to-yellow-50/50 rounded-2xl p-4 border border-orange-100/30 animate-fade-up">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-600" />
                  Delivery Address
                </h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p className="flex items-start gap-2">
                    <Home className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span>{orderData.address.line1}</span>
                  </p>
                  {orderData.address.line2 && <p className="pl-6">{orderData.address.line2}</p>}
                  <p className="pl-6">{orderData.address.city}, {orderData.address.state}</p>
                  <p className="pl-6">Pincode: {orderData.address.pincode}</p>
                  {orderData.address.landmark && <p className="pl-6">Landmark: {orderData.address.landmark}</p>}
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 rounded-2xl p-4 border border-purple-100/30 animate-fade-up">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-purple-600" />
                  Payment Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-400">Payment Method</p>
                    <p className="text-sm font-medium text-gray-700 capitalize">
                      {orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : 
                       orderData.paymentMethod === 'netbanking' ? `Net Banking (${orderData.bankName || 'N/A'})` : 
                       orderData.paymentMethod}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Payment Status</p>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                      isCOD ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${isCOD ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
                      {isCOD ? 'Pending' : 'Paid'}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Delivery Method</p>
                    <p className="text-sm font-medium text-gray-700 capitalize">{orderData.delivery.method} Delivery</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Estimated Delivery</p>
                    <p className="text-sm font-medium text-gray-700">{orderData.delivery.estimatedDate}</p>
                  </div>
                </div>
              </div>

              {/* Order Items Summary */}
              <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-200/50 animate-fade-up">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Package className="w-4 h-4 text-emerald-600" />
                  Order Items
                </h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {orderData.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 hover:bg-white/50 rounded-lg px-2 transition-colors duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={getItemImage(item)}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = '/default-product.jpg'; }}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">{item.name}</p>
                          <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-gray-700">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Breakdown */}
              <div className="bg-gradient-to-r from-emerald-50/50 to-teal-50/50 rounded-2xl p-4 border border-emerald-100/30 animate-fade-up">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  Order Summary
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-800">₹{orderData.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className={orderData.deliveryFee === 0 ? "text-emerald-600 font-medium" : "font-medium text-gray-800"}>
                      {orderData.deliveryFee === 0 ? "FREE" : `₹${orderData.deliveryFee}`}
                    </span>
                  </div>
                  {orderData.discount > 0 && (
                    <div className="flex justify-between text-sm text-emerald-600">
                      <span>Discount</span>
                      <span className="font-medium">-₹{orderData.discount}</span>
                    </div>
                  )}
                  {isCOD && (
                    <div className="flex justify-between text-sm text-orange-600">
                      <span>COD Convenience Fee</span>
                      <span className="font-medium">+₹20</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold pt-2 border-t-2 border-emerald-200">
                    <span className="text-gray-800">Total</span>
                    <span className="text-emerald-700">₹{totalWithCOD}</span>
                  </div>
                  {isCOD && (
                    <p className="text-xs text-orange-600 text-center mt-2 animate-pulse">
                      Pay ₹{totalWithCOD} on delivery
                    </p>
                  )}
                </div>
              </div>

              {/* Rating Section - Enhanced with 5 Stars */}
              <div className="bg-gradient-to-r from-pink-50/50 to-rose-50/50 rounded-2xl p-1 border border-pink-100/30 animate-fade-up">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-pink-600" />
                  Rate Your Experience
                </h4>
                
                {/* 5 Star Rating */}
                <div className="flex flex-col items-center gap-1">
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-all duration-300 transform hover:scale-125 focus:outline-none"
                      >
                        <Star
                          className={`w-10 h-10 transition-all duration-300 ${
                            star <= (hoverRating || rating)
                              ? 'fill-yellow-400 text-yellow-400 animate-scale-in'
                              : 'text-gray-300 hover:text-yellow-200'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  
                  {/* Rating Message */}
                  <div className={`text-sm font-medium transition-all duration-300 ${getRatingColor()}`}>
                    {getRatingMessage()}
                  </div>
                  
                  {/* Rating Stats */}
                  {rating > 0 && (
                    <div className="flex items-center gap-4 mt-0">
                      <div className="flex items-center gap-1.5">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3 h-3 ${
                                star <= rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-gray-700">{rating}.0</span>
                      </div>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-xs text-gray-500">
                        {rating >= 4 ? '🌟 Excellent!' : rating >= 3 ? '👍 Good!' : '💪 Keep improving!'}
                      </span>
                      {rating >= 4 && (
                        <span className="text-xs text-emerald-500 animate-bounce-slow">
                          Thank you! 🎉
                        </span>
                      )}
                    </div>
                  )}
                  
                  {/* Like Button */}
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 shadow-md ${
                      isLiked
                        ? 'bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-700 border border-emerald-300'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {isLiked ? (
                      <>
                        <ThumbsUp className="w-4 h-4 text-emerald-600 animate-bounce-slow" />
                        <span className="text-emerald-600 font-semibold">Liked!</span>
                      </>
                    ) : (
                      <>
                        <Heart className="w-4 h-4 text-red-400" />
                        <span>Love it!</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-gray-200 px-6 py-4 rounded-b-3xl flex gap-3 justify-end">
              <button
                onClick={() => setShowOrderDetails(false)}
                className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 hover:scale-105 transition-all duration-300"
              >
                Close
              </button>
              <button
                onClick={printInvoice}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-medium hover:scale-105 transition-all duration-500 shadow-lg group"
              >
                <Printer className="w-4 h-4 group-hover:animate-bounce-slow" />
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in { animation: scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-50px) rotate(180deg); }
        }
        .animate-float-slow { animation: float-slow 20s linear infinite; }

        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.02); }
        }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-shimmer { animation: shimmer 2s infinite; }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fade-up 0.5s ease-out both; }

        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        /* Modal scrollbar */
        .max-h-40::-webkit-scrollbar {
          width: 4px;
        }
        .max-h-40::-webkit-scrollbar-track {
          background: transparent;
        }
        .max-h-40::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
        .max-h-40::-webkit-scrollbar-thumb:hover {
          background: #10b981;
        }

        .max-h-90vh::-webkit-scrollbar {
          width: 6px;
        }
        .max-h-90vh::-webkit-scrollbar-track {
          background: rgba(241, 245, 249, 0.5);
          border-radius: 10px;
        }
        .max-h-90vh::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10b981, #059669);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default OrderSuccess;