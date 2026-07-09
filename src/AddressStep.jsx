// src/AddressStep.jsx

import React, { useState } from "react";
import { 
  MapPin, 
  Home, 
  ChevronLeft, 
  ChevronRight, 
  Building, 
  Map,
  Navigation,
  AlertCircle,
  CheckCircle,
  Landmark
} from "lucide-react";

const AddressStep = ({ formData, handleInputChange, prevStep, nextStep }) => {
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    const requiredFields = ["addressLine1", "city", "state", "pincode"];

    if (requiredFields.includes(name)) {
      if (!value || value.trim() === "") {
        const fieldNames = {
          addressLine1: "Address Line 1",
          city: "City",
          state: "State",
          pincode: "Pincode"
        };
        error = `${fieldNames[name]} is required`;
      }
    }

    if (name === "pincode" && value) {
      if (!/^[1-9][0-9]{5}$/.test(value)) {
        error = "Please enter a valid 6-digit pincode";
      }
    }

    if (name === "city" && value && value.length < 2) {
      error = "City name must be at least 2 characters";
    }

    if (name === "state" && value && value.length < 2) {
      error = "State name must be at least 2 characters";
    }

    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleInputChange(e);
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const isFieldValid = (fieldName) => {
    const value = formData[fieldName];
    if (!touched[fieldName]) return true;
    return value && value.trim() !== "" && !errors[fieldName];
  };

  const hasError = (fieldName) => {
    return touched[fieldName] && errors[fieldName];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mark all required fields as touched
    const allTouched = {};
    const allErrors = {};
    const requiredFields = ["addressLine1", "city", "state", "pincode"];
    
    requiredFields.forEach(field => {
      allTouched[field] = true;
      const error = validateField(field, formData[field]);
      if (error) allErrors[field] = error;
    });

    setTouched(allTouched);
    setErrors(allErrors);

    // Check if all required fields are valid
    const isValid = requiredFields.every(field => {
      return formData[field] && formData[field].trim() !== "" && !allErrors[field];
    });

    if (isValid) {
      nextStep();
    }
  };

  return (
    <div className="animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl flex items-center justify-center animate-bounce-slow">
          <MapPin className="w-5 h-5 text-orange-700" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800 animate-gradient bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-emerald-500">
            Delivery Address
          </h2>
          <p className="text-sm text-gray-500">Where should we deliver your order?</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Address Line 1 */}
          <div className="animate-fade-up" style={{ animationDelay: "0.05s" }}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Address Line 1 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Home className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                hasError("addressLine1") ? "text-red-400" : "text-gray-400"
              }`} />
              <input
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="House number, street name"
                className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white/50 backdrop-blur-sm ${
                  hasError("addressLine1")
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100/50 animate-shake"
                    : touched.addressLine1 && isFieldValid("addressLine1")
                    ? "border-emerald-400 focus:border-emerald-500 focus:ring-emerald-100/50"
                    : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-100/50"
                }`}
              />
              {hasError("addressLine1") && (
                <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400 animate-pulse" />
              )}
              {touched.addressLine1 && isFieldValid("addressLine1") && (
                <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400 animate-scale-in" />
              )}
            </div>
            {hasError("addressLine1") && (
              <p className="mt-1.5 text-xs text-red-500 animate-slide-down">
                {errors.addressLine1}
              </p>
            )}
          </div>

          {/* Address Line 2 */}
          <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Address Line 2 <span className="text-gray-400 text-xs font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                placeholder="Apartment, suite, building"
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100/50 transition-all duration-300 bg-white/50 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* City and State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="animate-fade-up" style={{ animationDelay: "0.15s" }}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                City <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Map className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                  hasError("city") ? "text-red-400" : "text-gray-400"
                }`} />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Mumbai"
                  className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white/50 backdrop-blur-sm ${
                    hasError("city")
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100/50 animate-shake"
                      : touched.city && isFieldValid("city")
                      ? "border-emerald-400 focus:border-emerald-500 focus:ring-emerald-100/50"
                      : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-100/50"
                  }`}
                />
                {hasError("city") && (
                  <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400 animate-pulse" />
                )}
                {touched.city && isFieldValid("city") && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400 animate-scale-in" />
                )}
              </div>
              {hasError("city") && (
                <p className="mt-1.5 text-xs text-red-500 animate-slide-down">
                  {errors.city}
                </p>
              )}
            </div>

            <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                State <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Map className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                  hasError("state") ? "text-red-400" : "text-gray-400"
                }`} />
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Maharashtra"
                  className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white/50 backdrop-blur-sm ${
                    hasError("state")
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100/50 animate-shake"
                      : touched.state && isFieldValid("state")
                      ? "border-emerald-400 focus:border-emerald-500 focus:ring-emerald-100/50"
                      : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-100/50"
                  }`}
                />
                {hasError("state") && (
                  <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400 animate-pulse" />
                )}
                {touched.state && isFieldValid("state") && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400 animate-scale-in" />
                )}
              </div>
              {hasError("state") && (
                <p className="mt-1.5 text-xs text-red-500 animate-slide-down">
                  {errors.state}
                </p>
              )}
            </div>
          </div>

          {/* Pincode and Landmark */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="animate-fade-up" style={{ animationDelay: "0.25s" }}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Pincode <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Navigation className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                  hasError("pincode") ? "text-red-400" : "text-gray-400"
                }`} />
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="400001"
                  maxLength="6"
                  className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white/50 backdrop-blur-sm ${
                    hasError("pincode")
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100/50 animate-shake"
                      : touched.pincode && isFieldValid("pincode")
                      ? "border-emerald-400 focus:border-emerald-500 focus:ring-emerald-100/50"
                      : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-100/50"
                  }`}
                />
                {hasError("pincode") && (
                  <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400 animate-pulse" />
                )}
                {touched.pincode && isFieldValid("pincode") && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400 animate-scale-in" />
                )}
              </div>
              {hasError("pincode") && (
                <p className="mt-1.5 text-xs text-red-500 animate-slide-down">
                  {errors.pincode}
                </p>
              )}
            </div>

            <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Landmark <span className="text-gray-400 text-xs font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <Landmark className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  placeholder="Near park, landmark"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100/50 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Address Summary */}
        {formData.addressLine1 && formData.city && formData.state && formData.pincode && (
          <div className="mt-6 p-4 bg-emerald-50/80 rounded-xl border border-emerald-200/50 animate-fade-up" style={{ animationDelay: "0.35s" }}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">Address Preview</p>
                <p className="text-sm text-gray-600 mt-1">
                  {formData.addressLine1}
                  {formData.addressLine2 && `, ${formData.addressLine2}`}
                  <br />
                  {formData.city}, {formData.state} - {formData.pincode}
                  {formData.landmark && `, ${formData.landmark}`}
                </p>
                <p className="text-xs text-emerald-600 mt-1 animate-pulse-slow">
                  ✓ Ready for delivery
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex items-center justify-between animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <button
            onClick={prevStep}
            type="button"
            className="flex items-center gap-2 px-6 py-3.5 bg-gray-100 text-gray-700 rounded-2xl font-medium hover:bg-gray-200 hover:scale-105 transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <ChevronLeft className="w-4 h-4 relative z-10 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="relative z-10">Back</span>
          </button>

          <button
            onClick={handleSubmit}
            type="submit"
            className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-2xl font-semibold hover:scale-105 transition-all duration-500 shadow-2xl shadow-emerald-200 group relative overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <span className="relative z-10">Continue to Delivery</span>
            <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></span>
            <span className="absolute bottom-0 left-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></span>
          </button>
        </div>
      </form>

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

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
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

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
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

export default AddressStep;