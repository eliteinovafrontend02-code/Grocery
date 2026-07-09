// src/DeliveryStep.jsx

import React, { useState } from "react";
import { 
  Truck, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  AlertCircle,
  CheckCircle,
  Package,
  Shield,
  Zap
} from "lucide-react";

const DeliveryStep = ({
  deliveryOption,
  deliveryFee,
  estimatedDelivery,
  formData,
  handleInputChange,
  prevStep,
  nextStep
}) => {
  const [touched, setTouched] = useState(false);
  const [errors, setErrors] = useState({});

  const validateInstructions = (value) => {
    if (value && value.length > 200) {
      return "Instructions must be less than 200 characters";
    }
    return "";
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(true);
    const error = validateInstructions(value);
    setErrors({ ...errors, [name]: error });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleInputChange(e);
    if (touched) {
      const error = validateInstructions(value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleSubmit = () => {
    const instructionError = validateInstructions(formData.deliveryInstructions);
    if (instructionError) {
      setTouched(true);
      setErrors({ deliveryInstructions: instructionError });
      return;
    }
    nextStep();
  };

  const deliveryIcons = {
    quick: { icon: <Zap className="w-6 h-6 text-yellow-500" />, emoji: "⚡", color: "from-yellow-50 to-yellow-100", border: "border-yellow-200", text: "text-yellow-700" },
    express: { icon: <Package className="w-6 h-6 text-blue-500" />, emoji: "🚀", color: "from-blue-50 to-blue-100", border: "border-blue-200", text: "text-blue-700" },
    standard: { icon: <Truck className="w-6 h-6 text-emerald-500" />, emoji: "🚚", color: "from-emerald-50 to-emerald-100", border: "border-emerald-200", text: "text-emerald-700" }
  };

  const currentDelivery = deliveryIcons[deliveryOption] || deliveryIcons.standard;

  const deliveryDetails = {
    quick: {
      title: "Quick Delivery",
      description: "Fastest delivery option",
      speed: "30-45 min",
      badge: "⚡ Fastest"
    },
    express: {
      title: "Express Delivery",
      description: "Same day delivery",
      speed: "2-4 hours",
      badge: "🚀 Express"
    },
    standard: {
      title: "Standard Delivery",
      description: "Regular delivery service",
      speed: "24-48 hours",
      badge: "📦 Standard"
    }
  };

  const currentDetails = deliveryDetails[deliveryOption] || deliveryDetails.standard;

  const hasError = touched && errors.deliveryInstructions;

  return (
    <div className="animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl flex items-center justify-center animate-bounce-slow">
          <Truck className="w-5 h-5 text-blue-700" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800 animate-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-500">
            Delivery Options
          </h2>
          <p className="text-sm text-gray-500">
            Your selected delivery from Cart:{" "}
            <span className="font-semibold text-emerald-600 capitalize animate-pulse-slow">
              {deliveryOption} Delivery
            </span>
            {deliveryFee === 0 ? (
              <span className="inline-flex items-center gap-1 ml-1 text-emerald-500 font-semibold">
                <span className="text-xs">✨</span> FREE
              </span>
            ) : (
              ` (₹${deliveryFee})`
            )}
          </p>
        </div>
      </div>

      {/* Delivery Option Card */}
      <div className={`bg-gradient-to-br ${currentDelivery.color} rounded-2xl p-6 border ${currentDelivery.border} relative overflow-hidden animate-fade-up`}>
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 relative z-10">
          <div className={`w-16 h-16 ${currentDelivery.color} rounded-2xl flex items-center justify-center text-4xl shadow-lg border ${currentDelivery.border} animate-float`}>
            <span className="animate-spin-slow">{currentDelivery.emoji}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={`text-xl font-bold ${currentDelivery.text}`}>
                {currentDetails.title}
              </h3>
              <span className={`px-2 py-0.5 text-xs font-semibold rounded-full bg-white/80 backdrop-blur-sm ${currentDelivery.text} border ${currentDelivery.border}`}>
                {currentDetails.badge}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{currentDetails.description}</p>
            <div className="flex items-center gap-4 mt-2 flex-wrap">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{currentDetails.speed}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Doorstep delivery</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className={`px-4 py-1 rounded-full bg-white/80 backdrop-blur-sm ${currentDelivery.text} text-sm font-semibold border ${currentDelivery.border} animate-pulse-slow`}>
              {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
            </div>
            <p className="text-xs text-gray-500">Delivery fee</p>
          </div>
        </div>
      </div>

      {/* Delivery Benefits */}
      <div className="grid grid-cols-3 gap-3 mt-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
        {[
          { icon: <Shield className="w-4 h-4" />, label: "Secure Delivery", color: "text-blue-500" },
          { icon: <Package className="w-4 h-4" />, label: "Fresh Products", color: "text-emerald-500" },
          { icon: <Clock className="w-4 h-4" />, label: "On Time", color: "text-orange-500" }
        ].map((item, index) => (
          <div key={index} className={`flex items-center justify-center gap-1.5 p-2 bg-white/50 rounded-xl border border-gray-100/50 backdrop-blur-sm hover:scale-105 transition-all duration-300 hover:shadow-lg group`}>
            <span className={`${item.color} group-hover:scale-110 transition-transform duration-300`}>
              {item.icon}
            </span>
            <span className="text-xs font-medium text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Delivery Instructions */}
      <div className="mt-6 animate-fade-up" style={{ animationDelay: "0.15s" }}>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Delivery Instructions{" "}
          <span className="text-gray-400 text-xs font-normal">
            (Optional)
          </span>
        </label>
        <div className="relative">
          <textarea
            name="deliveryInstructions"
            value={formData.deliveryInstructions}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Any special instructions for delivery (e.g., gate code, landmark, etc.)"
            rows="3"
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white/50 backdrop-blur-sm resize-none ${
              hasError
                ? "border-red-400 focus:border-red-500 focus:ring-red-100/50 animate-shake"
                : touched && !errors.deliveryInstructions
                ? "border-emerald-400 focus:border-emerald-500 focus:ring-emerald-100/50"
                : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-100/50"
            }`}
          />
          {hasError && (
            <AlertCircle className="absolute right-3 top-3 w-5 h-5 text-red-400 animate-pulse" />
          )}
          {touched && !errors.deliveryInstructions && formData.deliveryInstructions && (
            <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-emerald-400 animate-scale-in" />
          )}
          {/* Character counter */}
          {formData.deliveryInstructions && (
            <div className={`absolute right-3 bottom-3 text-xs ${
              formData.deliveryInstructions.length > 150 
                ? "text-orange-400" 
                : "text-gray-400"
            }`}>
              {formData.deliveryInstructions.length}/200
            </div>
          )}
        </div>
        {hasError && (
          <p className="mt-1.5 text-xs text-red-500 animate-slide-down">
            {errors.deliveryInstructions}
          </p>
        )}
        {!hasError && formData.deliveryInstructions && formData.deliveryInstructions.length > 0 && (
          <p className="mt-1.5 text-xs text-emerald-500 animate-slide-down">
            ✓ Instructions saved
          </p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex items-center justify-between animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <button
          onClick={prevStep}
          className="flex items-center gap-2 px-6 py-3.5 bg-gray-100 text-gray-700 rounded-2xl font-medium hover:bg-gray-200 hover:scale-105 transition-all duration-300 group relative overflow-hidden"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          <ChevronLeft className="w-4 h-4 relative z-10 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="relative z-10">Back</span>
        </button>

        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-2xl font-semibold hover:scale-105 transition-all duration-500 shadow-2xl shadow-emerald-200 group relative overflow-hidden"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          <span className="relative z-10">Continue to Payment</span>
          <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></span>
          <span className="absolute bottom-0 left-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></span>
        </button>
      </div>

      {/* Inline CSS for additional animations */}
      <style>{`
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
          50% { transform: translateY(-5px); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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

        .animate-float-slow {
          animation: float-slow 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
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
      `}</style>
    </div>
  );
};

export default DeliveryStep;