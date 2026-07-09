// src/Checkout.jsx

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Truck,
  Shield,
  ShoppingBag,
  User,
  MapPin,
  CreditCard,
  Check,
  Sparkles,
  Diamond,
} from "lucide-react";
import PersonalInfoStep from "./PersonalInfoStep";
import AddressStep from "./AddressStep";
import DeliveryStep from "./DeliveryStep";
import PaymentStep from "./PaymentStep";
import OrderSuccess from "./OrderSuccess";
import OrderSummary from "./OrderSummary";
import LoadingState from "./LoadingState";
import EmptyCart from "./EmptyCart";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const checkoutData = location.state || {};

  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    deliveryInstructions: "",
    paymentMethod: "card",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
    saveCard: false,
  });

  // Cart items and totals
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [showBankError, setShowBankError] = useState(false);

  const mainContainerRef = useRef(null);

  // Load cart data
  useEffect(() => {
    const loadCartData = () => {
      try {
        if (checkoutData.cartItems && checkoutData.cartItems.length > 0) {
          setCartItems(checkoutData.cartItems);
          const deliveryFeeFromCart = checkoutData.deliveryFee !== undefined ? checkoutData.deliveryFee : 0;
          const selectedDeliveryFromCart = checkoutData.selectedDelivery || 'standard';
          setDeliveryFee(deliveryFeeFromCart);
          setDeliveryOption(selectedDeliveryFromCart);
          if (checkoutData.discount !== undefined) {
            setDiscount(checkoutData.discount);
          }
          const sub = checkoutData.cartItems.reduce(
            (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
            0
          );
          setSubtotal(sub);
          const totalAmount = sub + deliveryFeeFromCart - (checkoutData.discount || 0);
          setTotal(totalAmount);
          setIsInitialized(true);
          return;
        }

        const savedDeliveryInfo = localStorage.getItem("deliveryInfo");
        if (savedDeliveryInfo) {
          const deliveryInfo = JSON.parse(savedDeliveryInfo);
          setDeliveryFee(deliveryInfo.deliveryFee || 0);
          setDeliveryOption(deliveryInfo.selectedDelivery || "standard");
        }

        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          if (Array.isArray(parsedCart) && parsedCart.length > 0) {
            setCartItems(parsedCart);
            const sub = parsedCart.reduce(
              (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
              0
            );
            setSubtotal(sub);
          }
        }
        setIsInitialized(true);
      } catch (e) {
        console.error("Checkout: Error loading cart:", e);
        setCartItems([]);
        setIsInitialized(true);
      }
    };
    loadCartData();
  }, [checkoutData]);

  // Update total
  useEffect(() => {
    const totalAmount = subtotal + deliveryFee - discount;
    setTotal(totalAmount);
    const now = new Date();
    const deliveryDate = new Date(now);
    deliveryDate.setDate(deliveryDate.getDate() + 1);
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    setEstimatedDelivery(deliveryDate.toLocaleDateString('en-US', options));
  }, [subtotal, deliveryFee, discount]);

  // Save delivery info
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("deliveryInfo", JSON.stringify({
        deliveryFee: deliveryFee,
        selectedDelivery: deliveryOption
      }));
    }
  }, [deliveryFee, deliveryOption, isInitialized]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Validate current step
  const validateStep = (step) => {
    switch(step) {
      case 1:
        return formData.firstName.trim() && formData.email.trim() && formData.phone.trim();
      case 2:
        return formData.addressLine1.trim() && formData.city.trim() && 
               formData.state.trim() && formData.pincode.trim();
      case 3:
        return true;
      case 4:
        if (formData.paymentMethod === 'card') {
          return formData.cardNumber.trim() && formData.cardName.trim() && 
                 formData.cardExpiry.trim() && formData.cardCvv.trim();
        }
        if (formData.paymentMethod === 'netbanking') {
          return selectedBank !== "";
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const stepName = ['', 'Personal Information', 'Delivery Address', 'Delivery Options', 'Payment'][currentStep];
      if (currentStep === 4 && formData.paymentMethod === 'netbanking' && !selectedBank) {
        setShowBankError(true);
        alert("Please select a bank for Net Banking");
        return;
      }
      alert(`Please fill in all required fields in ${stepName}`);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Apply promo code
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
      let discountAmount = 0;
      if (promo.type === "percentage") {
        discountAmount = (subtotal * promo.discount) / 100;
      } else {
        discountAmount = promo.discount;
      }
      setDiscount(Math.min(discountAmount, subtotal));
      setPromoApplied(true);
      setPromoError("");
      setShowPromoInput(false);
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

  // Place order
  const placeOrder = () => {
    if (currentStep < 4) {
      nextStep();
      return;
    }

    if (formData.paymentMethod === 'netbanking' && !selectedBank) {
      setShowBankError(true);
      alert("Please select a bank for Net Banking");
      return;
    }

    setIsProcessing(true);
    
    const orderInfo = {
      orderNumber: `ORD-${Date.now().toString().slice(-8)}-${Math.floor(Math.random() * 1000)}`,
      items: cartItems,
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      discount: discount,
      total: total,
      paymentMethod: formData.paymentMethod,
      paymentStatus: formData.paymentMethod === 'cod' ? 'Pending' : 'Paid',
      bankName: formData.paymentMethod === 'netbanking' ? selectedBank : null,
      customer: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
      },
      address: {
        line1: formData.addressLine1,
        line2: formData.addressLine2,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        landmark: formData.landmark,
      },
      delivery: {
        method: deliveryOption,
        instructions: formData.deliveryInstructions,
        estimatedDate: estimatedDelivery,
      },
      orderDate: new Date().toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'short'
      }),
    };

    setOrderNumber(orderInfo.orderNumber);
    setOrderData(orderInfo);
    setOrderComplete(true);
    setShowThankYou(true);
    setIsProcessing(false);
    
    localStorage.setItem('lastOrder', JSON.stringify(orderInfo));
    localStorage.removeItem('cart');
    localStorage.removeItem('deliveryInfo');
  };

  // Get item image
  const getItemImage = (item) => {
    if (item.image) {
      if (Array.isArray(item.image) && item.image.length > 0) {
        return item.image[0];
      }
      if (typeof item.image === 'string') {
        return item.image;
      }
    }
    return '/default-product.jpg';
  };

  // Print invoice
  const printInvoice = () => {
    const printContent = document.getElementById('invoice-content');
    if (!printContent) return;
    
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) {
      alert('Please allow pop-ups to print the invoice');
      return;
    }
    
    const isCOD = orderData?.paymentMethod === 'cod';
    const totalWithCOD = isCOD ? orderData.total + 20 : orderData.total;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice #${orderNumber}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Segoe UI', Arial, sans-serif; padding: 30px; color: #1a1a2e; background: #f8fafc; }
            .invoice { max-width: 800px; margin: 0 auto; background: white; border-radius: 16px; padding: 40px; box-shadow: 0 10px 40px rgba(0,0,0,0.08); }
            .header { display: flex; align-items: center; gap: 20px; padding-bottom: 20px; border-bottom: 2px solid #e8f5e9; margin-bottom: 20px; }
            .logo-section { display: flex; align-items: center; gap: 12px; }
            .logo-icon { width: 50px; height: 50px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 28px; color: white; flex-shrink: 0; }
            .logo-text h1 { font-size: 24px; color: #065f46; font-weight: 800; margin: 0; }
            .logo-text p { font-size: 12px; color: #6b7280; margin: 0; }
            .header-right { margin-left: auto; text-align: right; }
            .header-right h2 { font-size: 18px; color: #10b981; font-weight: 700; }
            .order-info { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 20px 0; padding: 16px; background: #f8fafc; border-radius: 12px; }
            .order-info .field { display: flex; flex-direction: column; }
            .order-info .field label { font-weight: 600; color: #6b7280; font-size: 10px; text-transform: uppercase; margin-bottom: 2px; }
            .order-info .field span { font-size: 13px; font-weight: 500; color: #1a1a2e; }
            .status-badge { display: inline-block; padding: 3px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; }
            .status-paid { background: #d1fae5; color: #065f46; }
            .status-pending { background: #fef3c7; color: #92400e; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th { background: #f1f5f9; padding: 10px 12px; text-align: left; font-size: 11px; text-transform: uppercase; font-weight: 600; }
            td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-size: 13px; }
            .item-image { width: 40px; height: 40px; border-radius: 8px; object-fit: cover; border: 1px solid #e5e7eb; }
            .item-info { display: flex; align-items: center; gap: 10px; }
            .item-name { font-weight: 500; }
            .totals { margin-top: 20px; text-align: right; padding-top: 16px; border-top: 2px solid #e8f5e9; }
            .totals .row { display: flex; justify-content: flex-end; gap: 40px; padding: 4px 0; }
            .totals .row .label { color: #6b7280; font-size: 13px; }
            .totals .row .value { font-weight: 500; font-size: 13px; min-width: 80px; text-align: right; }
            .totals .grand-total { display: flex; justify-content: flex-end; gap: 40px; padding: 12px 0 4px 0; border-top: 2px solid #10b981; margin-top: 8px; }
            .totals .grand-total .label { font-size: 18px; font-weight: 700; color: #1a1a2e; }
            .totals .grand-total .value { font-size: 22px; font-weight: 800; color: #10b981; min-width: 80px; text-align: right; }
            .delivery-info { background: #f0fdf4; padding: 14px 16px; border-radius: 12px; margin: 16px 0; border-left: 4px solid #10b981; }
            .delivery-info p { font-size: 13px; color: #1a1a2e; margin: 2px 0; }
            .footer { margin-top: 30px; padding-top: 16px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 11px; }
            .footer strong { color: #065f46; }
            .cod-notice { background: #fffbeb; padding: 12px 16px; border-radius: 10px; border: 1px solid #fde68a; margin-top: 12px; display: flex; align-items: center; gap: 10px; font-size: 13px; color: #92400e; }
          </style>
        </head>
        <body>
          <div class="invoice">
            <div class="header">
              <div class="logo-section">
                <div class="logo-icon">🌿</div>
                <div class="logo-text">
                  <h1>GroceryItems</h1>
                  <p>Fresh & Organic Grocery Store</p>
                </div>
              </div>
              <div class="header-right">
                <h2>INVOICE</h2>
                <p>#${orderNumber}</p>
              </div>
            </div>
            <div class="order-info">
              <div class="field"><label>Order Date</label><span>${orderData.orderDate}</span></div>
              <div class="field"><label>Payment Method</label><span>${orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : orderData.paymentMethod}</span></div>
              <div class="field"><label>Payment Status</label><span><span class="status-badge ${isCOD ? 'status-pending' : 'status-paid'}">${isCOD ? 'Pending' : 'Paid'}</span></span></div>
              <div class="field"><label>Delivery</label><span>${orderData.delivery.method}</span></div>
            </div>
            <div class="delivery-info">
              <p><span class="label">📦 Delivery Address:</span> ${orderData.address.line1}${orderData.address.line2 ? ', ' + orderData.address.line2 : ''}, ${orderData.address.city}, ${orderData.address.state} - ${orderData.address.pincode}</p>
              <p><span class="label">👤 Customer:</span> ${orderData.customer.name} (${orderData.customer.email} | ${orderData.customer.phone})</p>
            </div>
            <table>
              <thead><tr><th style="width:50%;">Item</th><th style="text-align:center;">Qty</th><th style="text-align:right;">Price</th><th style="text-align:right;">Total</th></tr></thead>
              <tbody>
                ${orderData.items.map(item => `
                  <tr>
                    <td><div class="item-info"><img src="${getItemImage(item)}" class="item-image" /><span class="item-name">${item.name}</span></div></td>
                    <td style="text-align:center;">${item.quantity}</td>
                    <td style="text-align:right;">₹${item.price}</td>
                    <td style="text-align:right;font-weight:500;">₹${item.price * item.quantity}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <div class="totals">
              <div class="row"><span class="label">Subtotal</span><span class="value">₹${orderData.subtotal}</span></div>
              <div class="row"><span class="label">Delivery Fee</span><span class="value">${orderData.deliveryFee === 0 ? 'FREE' : '₹' + orderData.deliveryFee}</span></div>
              ${orderData.discount > 0 ? `<div class="row"><span class="label">Discount</span><span class="value" style="color:#10b981;">-₹${orderData.discount}</span></div>` : ''}
              ${isCOD ? `<div class="row"><span class="label">COD Convenience Fee</span><span class="value" style="color:#f59e0b;">+₹20</span></div>` : ''}
              <div class="grand-total"><span class="label">Grand Total</span><span class="value">₹${totalWithCOD}</span></div>
            </div>
            ${isCOD ? `<div class="cod-notice"><span>💰</span><span>Please keep ₹${totalWithCOD} ready for cash on delivery.</span></div>` : ''}
            <div class="footer"><p>Thank you for shopping with <strong>GroceryItems</strong>! 🌿</p><p>For queries: support@groceryitems.com</p></div>
          </div>
          <script>window.onload = function() { window.print(); setTimeout(function() { window.close(); }, 1500); }<\/script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Loading state
  if (!isInitialized) {
    return <LoadingState />;
  }

  // Empty cart
  if (cartItems.length === 0 && !orderComplete) {
    return <EmptyCart navigate={navigate} />;
  }

  // Order complete
  if (orderComplete && showThankYou && orderData) {
    return (
      <OrderSuccess 
        orderData={orderData}
        orderNumber={orderNumber}
        navigate={navigate}
        getItemImage={getItemImage}
        printInvoice={printInvoice}
      />
    );
  }

  // Main Checkout
  return (
    <div ref={mainContainerRef} className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 pt-32 pb-12">
      <div className="w-auto mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-3 hover:bg-emerald-50 rounded-2xl transition-all duration-500 hover:scale-110 group"
            >
              <ArrowLeft className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <div className="relative">
                  <ShoppingBag className="w-8 h-8 text-emerald-600" />
                </div>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-orange-500">Checkout</span>
              </h1>
              <p className="text-sm text-gray-500 mt-1">Complete your order in 3 easy steps</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-emerald-600" />
              Secure Checkout
            </span>
          </div>
        </div>

        {/* Steps Progress */}
        <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-emerald-100/30 shadow-lg">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {[
              { step: 1, label: "Personal", icon: User },
              { step: 2, label: "Address", icon: MapPin },
              { step: 3, label: "Delivery", icon: Truck },
              { step: 4, label: "Payment", icon: CreditCard },
            ].map((s) => (
              <div key={s.step} className="flex items-center flex-1">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                      currentStep === s.step
                        ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-200 scale-110"
                        : currentStep > s.step
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {currentStep > s.step ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <s.icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <p className={`text-xs font-medium ${currentStep >= s.step ? "text-gray-700" : "text-gray-400"}`}>
                      {s.label}
                    </p>
                  </div>
                </div>
                {s.step < 4 && (
                  <div className="flex-1 h-0.5 mx-3 bg-gray-200 relative">
                    <div className={`h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-700 ${
                      currentStep > s.step ? "w-full" : "w-0"
                    }`} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 border border-emerald-100/30">
              {currentStep === 1 && (
                <PersonalInfoStep
                  formData={formData}
                  handleInputChange={handleInputChange}
                  nextStep={nextStep}
                />
              )}

              {currentStep === 2 && (
                <AddressStep
                  formData={formData}
                  handleInputChange={handleInputChange}
                  prevStep={prevStep}
                  nextStep={nextStep}
                />
              )}

              {currentStep === 3 && (
                <DeliveryStep
                  deliveryOption={deliveryOption}
                  deliveryFee={deliveryFee}
                  estimatedDelivery={estimatedDelivery}
                  formData={formData}
                  handleInputChange={handleInputChange}
                  prevStep={prevStep}
                  nextStep={nextStep}
                />
              )}

              {currentStep === 4 && (
                <PaymentStep
                  formData={formData}
                  setFormData={setFormData}
                  handleInputChange={handleInputChange}
                  selectedBank={selectedBank}
                  setSelectedBank={setSelectedBank}
                  showBankError={showBankError}
                  setShowBankError={setShowBankError}
                  total={total}
                  isProcessing={isProcessing}
                  prevStep={prevStep}
                  placeOrder={placeOrder}
                />
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 self-start">
            <div className="sticky top-[145px]">
              <OrderSummary
                cartItems={cartItems}
                subtotal={subtotal}
                deliveryFee={deliveryFee}
                discount={discount}
                total={total}
                deliveryOption={deliveryOption}
                formData={formData}
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                promoApplied={promoApplied}
                promoError={promoError}
                showPromoInput={showPromoInput}
                setShowPromoInput={setShowPromoInput}
                applyPromoCode={applyPromoCode}
                removePromoCode={removePromoCode}
                getItemImage={getItemImage}
                selectedBank={selectedBank}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-slide-up { animation: slide-up 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .backdrop-blur-sm { backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
        .backdrop-blur-md { backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
        .shadow-3xl { box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.15), 0 15px 25px -6px rgba(0, 0, 0, 0.05); }
      `}</style>
    </div>
  );
};

export default Checkout;