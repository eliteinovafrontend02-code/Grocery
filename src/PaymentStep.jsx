// src/PaymentStep.jsx

import React, { useState, useEffect } from "react";
import {
  CreditCard, Smartphone, Landmark, DollarSign, Lock, Zap,
  ChevronLeft, CreditCard as CreditCardIcon, QrCode, AlertCircle,
  CheckCircle, Shield, Banknote, Clock, Sparkles
} from "lucide-react";

const PaymentStep = ({
  formData,
  setFormData,
  handleInputChange,
  selectedBank,
  setSelectedBank,
  showBankError,
  setShowBankError,
  total,
  isProcessing,
  prevStep,
  placeOrder
}) => {
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [cardType, setCardType] = useState("");

  const banks = [
    { name: "State Bank of India", code: "sbi", icon: "🏦", color: "blue" },
    { name: "HDFC Bank", code: "hdfc", icon: "🏛️", color: "blue" },
    { name: "ICICI Bank", code: "icici", icon: "🏛️", color: "red" },
    { name: "Axis Bank", code: "axis", icon: "🏛️", color: "orange" },
    { name: "Kotak Mahindra Bank", code: "kotak", icon: "🏛️", color: "blue" },
    { name: "Yes Bank", code: "yes", icon: "🏛️", color: "red" },
    { name: "Punjab National Bank", code: "pnb", icon: "🏛️", color: "red" },
    { name: "Bank of Baroda", code: "bob", icon: "🏛️", color: "blue" },
    { name: "Canara Bank", code: "canara", icon: "🏛️", color: "blue" },
    { name: "Union Bank of India", code: "ubi", icon: "🏛️", color: "red" },
    { name: "IDBI Bank", code: "idbi", icon: "🏛️", color: "blue" },
    { name: "IndusInd Bank", code: "indusind", icon: "🏛️", color: "blue" },
  ];

  const paymentMethods = [
    { id: "card", label: "Card", icon: CreditCardIcon, color: "purple", bg: "from-purple-50 to-purple-100" },
    { id: "upi", label: "UPI", icon: Smartphone, color: "emerald", bg: "from-emerald-50 to-emerald-100" },
    { id: "netbanking", label: "Net Banking", icon: Landmark, color: "blue", bg: "from-blue-50 to-blue-100" },
    { id: "cod", label: "Cash on Delivery", icon: DollarSign, color: "orange", bg: "from-orange-50 to-orange-100" },
  ];

  // Detect card type
  useEffect(() => {
    const cardNum = formData.cardNumber.replace(/\s/g, '');
    if (cardNum.startsWith('4')) setCardType('Visa');
    else if (cardNum.startsWith('5')) setCardType('Mastercard');
    else if (cardNum.startsWith('3')) setCardType('Amex');
    else if (cardNum.startsWith('6')) setCardType('Discover');
    else setCardType('');
  }, [formData.cardNumber]);

  const validateField = (name, value) => {
    let error = "";
    
    if (name === "cardNumber" && value) {
      const clean = value.replace(/\s/g, '');
      if (!/^[0-9]{16}$/.test(clean) && !/^[0-9]{15}$/.test(clean) && !/^[0-9]{14}$/.test(clean)) {
        error = "Please enter a valid card number (14-16 digits)";
      }
    }
    
    if (name === "cardName" && value && value.length < 2) {
      error = "Please enter the full name on card";
    }
    
    if (name === "cardExpiry" && value) {
      if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(value)) {
        error = "Please enter valid expiry date (MM/YY)";
      } else {
        const [month, year] = value.split('/');
        const now = new Date();
        const currentYear = now.getFullYear() % 100;
        const currentMonth = now.getMonth() + 1;
        if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
          error = "Card has expired";
        }
      }
    }
    
    if (name === "cardCvv" && value) {
      if (!/^[0-9]{3,4}$/.test(value)) {
        error = "Please enter valid CVV (3-4 digits)";
      }
    }
    
    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    if (name === "cardNumber") {
      // Format card number with spaces
      const clean = value.replace(/\s/g, '');
      const groups = clean.match(/.{1,4}/g);
      formattedValue = groups ? groups.join(' ') : clean;
      if (formattedValue.length > 19) return;
    }
    
    if (name === "cardExpiry") {
      // Auto-format expiry date
      const clean = value.replace(/\D/g, '');
      if (clean.length >= 2) {
        formattedValue = clean.slice(0, 2) + '/' + clean.slice(2, 4);
      } else {
        formattedValue = clean;
      }
    }
    
    // Create synthetic event
    const syntheticEvent = {
      target: {
        name: name,
        value: formattedValue
      }
    };
    handleInputChange(syntheticEvent);
    
    if (touched[name]) {
      const error = validateField(name, formattedValue);
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    // For checkbox
    if (e.target.type === 'checkbox') {
      const syntheticEvent = {
        target: {
          name: name,
          checked: e.target.checked,
          type: 'checkbox'
        }
      };
      handleInputChange(syntheticEvent);
      return;
    }
    
    // For text inputs with formatting
    handleCardChange(e);
  };

  const isFieldValid = (fieldName) => {
    const value = formData[fieldName];
    if (!touched[fieldName]) return true;
    return value && value.trim() !== "" && !errors[fieldName];
  };

  const hasError = (fieldName) => {
    return touched[fieldName] && errors[fieldName];
  };

  const isFormValid = () => {
    if (formData.paymentMethod === "card") {
      const requiredFields = ["cardNumber", "cardName", "cardExpiry", "cardCvv"];
      const allTouched = {};
      const allErrors = {};
      let isValid = true;
      
      requiredFields.forEach(field => {
        allTouched[field] = true;
        const error = validateField(field, formData[field]);
        if (error) {
          allErrors[field] = error;
          isValid = false;
        }
      });
      
      setTouched(prev => ({ ...prev, ...allTouched }));
      setErrors(prev => ({ ...prev, ...allErrors }));
      return isValid;
    }
    
    if (formData.paymentMethod === "netbanking") {
      if (!selectedBank) {
        setShowBankError(true);
        return false;
      }
      return true;
    }
    
    return true;
  };

  const handlePlaceOrder = () => {
    if (isFormValid()) {
      placeOrder();
    }
  };

  const getPaymentMethodIcon = () => {
    const method = paymentMethods.find(m => m.id === formData.paymentMethod);
    if (!method) return null;
    const Icon = method.icon;
    return <Icon className={`w-5 h-5 text-${method.color}-600`} />;
  };

  return (
    <div className="animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl flex items-center justify-center animate-bounce-slow">
          <CreditCard className="w-5 h-5 text-purple-700" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800 animate-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-emerald-500">
            Payment Method
          </h2>
          <p className="text-sm text-gray-500">Choose how you want to pay</p>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="overflow-x-auto pb-2 mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 min-w-[280px]">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => {
                setFormData(prev => ({ ...prev, paymentMethod: method.id }));
                if (method.id !== 'netbanking') {
                  setSelectedBank("");
                  setShowBankError(false);
                }
                // Reset touched state for card fields when switching
                if (method.id !== 'card') {
                  setTouched({});
                  setErrors({});
                }
              }}
              className={`p-4 rounded-2xl border-2 transition-all duration-500 flex flex-col items-center gap-2 relative overflow-hidden group ${
                formData.paymentMethod === method.id
                  ? `border-${method.color}-400 bg-gradient-to-br ${method.bg} shadow-xl scale-105`
                  : "border-gray-200 hover:border-gray-300 hover:scale-105 bg-white/50"
              }`}
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${method.bg} blur-xl`}></div>
              
              <method.icon className={`w-6 h-6 relative z-10 transition-all duration-300 ${
                formData.paymentMethod === method.id ? `text-${method.color}-600 animate-float` : "text-gray-400"
              }`} />
              <span className={`text-xs font-medium relative z-10 ${
                formData.paymentMethod === method.id ? `text-${method.color}-700` : "text-gray-600"
              }`}>
                {method.label}
              </span>
              
              {formData.paymentMethod === method.id && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center animate-scale-in">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gradient-to-r from-emerald-50/50 to-teal-50/50 rounded-2xl p-4 border border-emerald-200/50 mb-4 animate-fade-up">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total Amount</span>
          <span className="text-xl font-bold text-emerald-700">₹{total}</span>
        </div>
        {formData.paymentMethod === "cod" && (
          <div className="flex justify-between items-center mt-1 text-sm text-gray-500">
            <span>COD Convenience Fee</span>
            <span>+₹20</span>
          </div>
        )}
        {formData.paymentMethod === "cod" && (
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-emerald-200/50">
            <span className="font-medium text-gray-700">Total to Pay</span>
            <span className="text-lg font-bold text-orange-600">₹{total + 20}</span>
          </div>
        )}
      </div>

      {/* COD Extra Fee Notice */}
      {formData.paymentMethod === "cod" && (
        <div className="bg-gradient-to-r from-orange-50/90 to-yellow-50/90 rounded-2xl p-6 border border-orange-200/50 mb-6 animate-fade-up">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 animate-float">
              <Banknote className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Cash on Delivery</h4>
              <p className="text-sm text-gray-600">
                Pay ₹{total + 20} when you receive your order
              </p>
              <div className="mt-3 p-3 bg-orange-100/50 rounded-xl border border-orange-200/50">
                <p className="text-sm text-orange-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 animate-pulse" />
                  <span>
                    <strong>Note:</strong> A COD convenience fee of ₹20 will be added to your total.
                  </span>
                </p>
                <p className="text-xs text-orange-600 mt-1">
                  Total amount to pay on delivery: <strong className="text-orange-700">₹{total + 20}</strong>
                </p>
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>Pay with cash or card at delivery</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Card Details */}
      {formData.paymentMethod === "card" && (
        <div className="bg-gradient-to-r from-purple-50/50 to-blue-50/50 rounded-2xl p-6 border border-purple-100/50 animate-fade-up">
          <div className="flex items-center gap-2 mb-4">
            <CreditCardIcon className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-700">Card Details</h3>
            {cardType && (
              <span className="ml-auto text-xs font-medium text-purple-600 bg-purple-100/50 px-3 py-1 rounded-full">
                {cardType}
              </span>
            )}
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Card Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <CreditCardIcon className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                  hasError("cardNumber") ? "text-red-400" : "text-gray-400"
                }`} />
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleCardInputChange}
                  onBlur={handleBlur}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white/70 backdrop-blur-sm ${
                    hasError("cardNumber")
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100/50 animate-shake"
                      : touched.cardNumber && isFieldValid("cardNumber")
                      ? "border-emerald-400 focus:border-emerald-500 focus:ring-emerald-100/50"
                      : "border-gray-200 focus:border-purple-400 focus:ring-purple-100/50"
                  }`}
                />
                {hasError("cardNumber") && (
                  <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400 animate-pulse" />
                )}
                {touched.cardNumber && isFieldValid("cardNumber") && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400 animate-scale-in" />
                )}
              </div>
              {hasError("cardNumber") && (
                <p className="mt-1.5 text-xs text-red-500 animate-slide-down">{errors.cardNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Name on Card <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white/70 backdrop-blur-sm ${
                    hasError("cardName")
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100/50 animate-shake"
                      : touched.cardName && isFieldValid("cardName")
                      ? "border-emerald-400 focus:border-emerald-500 focus:ring-emerald-100/50"
                      : "border-gray-200 focus:border-purple-400 focus:ring-purple-100/50"
                  }`}
                />
                {hasError("cardName") && (
                  <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400 animate-pulse" />
                )}
                {touched.cardName && isFieldValid("cardName") && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400 animate-scale-in" />
                )}
              </div>
              {hasError("cardName") && (
                <p className="mt-1.5 text-xs text-red-500 animate-slide-down">{errors.cardName}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Expiry Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="cardExpiry"
                    value={formData.cardExpiry}
                    onChange={handleCardInputChange}
                    onBlur={handleBlur}
                    placeholder="MM/YY"
                    maxLength="5"
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white/70 backdrop-blur-sm ${
                      hasError("cardExpiry")
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100/50 animate-shake"
                        : touched.cardExpiry && isFieldValid("cardExpiry")
                        ? "border-emerald-400 focus:border-emerald-500 focus:ring-emerald-100/50"
                        : "border-gray-200 focus:border-purple-400 focus:ring-purple-100/50"
                    }`}
                  />
                  {hasError("cardExpiry") && (
                    <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400 animate-pulse" />
                  )}
                  {touched.cardExpiry && isFieldValid("cardExpiry") && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400 animate-scale-in" />
                  )}
                </div>
                {hasError("cardExpiry") && (
                  <p className="mt-1.5 text-xs text-red-500 animate-slide-down">{errors.cardExpiry}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  CVV <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Shield className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                    hasError("cardCvv") ? "text-red-400" : "text-gray-400"
                  }`} />
                  <input
                    type="password"
                    name="cardCvv"
                    value={formData.cardCvv}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="123"
                    maxLength="4"
                    className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white/70 backdrop-blur-sm ${
                      hasError("cardCvv")
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100/50 animate-shake"
                        : touched.cardCvv && isFieldValid("cardCvv")
                        ? "border-emerald-400 focus:border-emerald-500 focus:ring-emerald-100/50"
                        : "border-gray-200 focus:border-purple-400 focus:ring-purple-100/50"
                    }`}
                  />
                  {hasError("cardCvv") && (
                    <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400 animate-pulse" />
                  )}
                  {touched.cardCvv && isFieldValid("cardCvv") && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400 animate-scale-in" />
                  )}
                </div>
                {hasError("cardCvv") && (
                  <p className="mt-1.5 text-xs text-red-500 animate-slide-down">{errors.cardCvv}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="saveCard"
                checked={formData.saveCard}
                onChange={handleCardInputChange}
                className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 transition-all duration-300"
              />
              <label className="text-sm text-gray-600 hover:text-gray-700 transition-colors duration-300">
                Save card for future purchases
              </label>
            </div>
          </div>
        </div>
      )}

      {/* UPI */}
      {formData.paymentMethod === "upi" && (
        <div className="bg-gradient-to-r from-emerald-50/50 to-teal-50/50 rounded-2xl p-6 border border-emerald-100/50 animate-fade-up">
          <div className="text-center">
            <div className="w-24 h-24 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float">
              <QrCode className="w-12 h-12 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Pay with UPI</h3>
            <p className="text-sm text-gray-600 mb-4">Pay using any UPI app</p>
            
            <div className="flex items-center justify-center gap-3 flex-wrap mb-4">
              {["Google Pay", "PhonePe", "Paytm", "Amazon Pay"].map((app) => (
                <span key={app} className="text-xs bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-gray-200 hover:shadow-md hover:scale-105 transition-all duration-300">
                  {app}
                </span>
              ))}
            </div>
            
            <div className="p-4 bg-emerald-100/30 rounded-xl border border-emerald-200/50">
              <p className="text-sm text-gray-600">
                UPI ID: <span className="font-mono font-semibold text-emerald-700 animate-pulse">grocery@pay</span>
              </p>
            </div>
            
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
              <Lock className="w-3 h-3" />
              <span>Secure UPI payment</span>
            </div>
          </div>
        </div>
      )}

      {/* Net Banking */}
      {formData.paymentMethod === "netbanking" && (
        <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-2xl p-6 border border-blue-100/50 animate-fade-up">
          <div className="flex items-center gap-2 mb-4">
            <Landmark className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-700">Select Your Bank</h3>
          </div>
          
          <p className="text-sm text-gray-600 mb-4 text-center font-medium">
            Choose your bank for Net Banking
          </p>
          
          {showBankError && (
            <div className="mb-4 p-3 bg-red-50 rounded-xl border border-red-200 flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-500 animate-pulse" />
              <p className="text-xs text-red-600 font-medium">Please select a bank to continue</p>
            </div>
          )}
          
          {/* Bank Grid */}
          <div className="max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {banks.map((bank) => (
                <button
                  key={bank.code}
                  onClick={() => {
                    setSelectedBank(bank.name);
                    setShowBankError(false);
                  }}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 text-sm font-medium text-gray-700 flex flex-col items-center gap-1 relative group ${
                    selectedBank === bank.name
                      ? "border-blue-500 bg-blue-100/70 shadow-xl scale-105"
                      : "border-gray-200 bg-white/70 hover:border-blue-400 hover:bg-blue-50/50 hover:shadow-lg hover:scale-105"
                  }`}
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{bank.icon}</span>
                  <span className="text-xs text-center">{bank.name}</span>
                  {selectedBank === bank.name && (
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-1 animate-scale-in" />
                  )}
                  {selectedBank === bank.name && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {selectedBank && (
            <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-200 flex items-center gap-2 animate-slide-up">
              <CheckCircle className="w-4 h-4 text-green-600 animate-scale-in" />
              <p className="text-sm text-green-700">
                Selected: <strong>{selectedBank}</strong>
              </p>
            </div>
          )}
          
          <p className="text-xs text-gray-500 mt-4 text-center flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" />
            You will be redirected to your bank's secure payment page.
          </p>
        </div>
      )}

      {/* Security notice */}
      <div className="mt-6 p-4 bg-emerald-50/80 rounded-2xl border border-emerald-100/50 flex items-center gap-3 animate-fade-up">
        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Lock className="w-4 h-4 text-emerald-600 animate-pulse" />
        </div>
        <p className="text-xs text-gray-600">
          Your payment information is secured with <strong>256-bit encryption</strong>. We do not store your card details.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 px-6 py-3.5 bg-gray-100 text-gray-700 rounded-2xl font-medium hover:bg-gray-200 hover:scale-105 transition-all duration-300 group relative overflow-hidden"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <ChevronLeft className="w-4 h-4 relative z-10 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="relative z-10">Back</span>
        </button>

        <button
          onClick={handlePlaceOrder}
          disabled={isProcessing}
          className={`flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-2xl font-semibold transition-all duration-500 shadow-2xl shadow-emerald-200 group relative overflow-hidden ${
            isProcessing ? "opacity-70 cursor-not-allowed" : "hover:scale-105"
          }`}
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin relative z-10" />
              <span className="relative z-10">Processing...</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 relative z-10" />
              <span className="relative z-10">
                {formData.paymentMethod === 'cod' ? 'Place Order (Pay on Delivery)' : 
                 formData.paymentMethod === 'netbanking' ? 'Pay with Net Banking' :
                 'Pay & Place Order'}
              </span>
              <Sparkles className="w-4 h-4 relative z-10 group-hover:rotate-180 transition-all duration-300" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></span>
              <span className="absolute bottom-0 left-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></span>
            </>
          )}
        </button>
      </div>

      {/* Inline CSS for additional animations */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(241, 245, 249, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #6366f1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #4f46e5);
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }

        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scale-in {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-fade-up {
          animation: fade-up 0.6s ease-out both;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .overflow-x-auto {
          scrollbar-width: thin;
          scrollbar-color: #10b981 #e5e7eb;
        }
        .overflow-x-auto::-webkit-scrollbar {
          height: 4px;
        }
        .overflow-x-auto::-webkit-scrollbar-track {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(to right, #10b981, #059669);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default PaymentStep;