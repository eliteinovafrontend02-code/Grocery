// src/PersonalInfoStep.jsx

import React, { useState } from "react";
import { User, Mail, Phone, ChevronRight, AlertCircle, CheckCircle } from "lucide-react";

const PersonalInfoStep = ({ formData, handleInputChange, nextStep }) => {
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    if (!value || value.trim() === "") {
      error = `${name === "firstName" ? "First name" : name === "lastName" ? "Last name" : name === "email" ? "Email" : "Phone"} is required`;
    } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Please enter a valid email";
    } else if (name === "phone" && !/^[\d\s+()-]{10,15}$/.test(value)) {
      error = "Please enter a valid phone number";
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

  const isFieldRequired = (fieldName) => {
    return fieldName === "firstName" || fieldName === "email" || fieldName === "phone";
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
    // Mark all fields as touched
    const allTouched = {};
    const allErrors = {};
    const requiredFields = ["firstName", "email", "phone"];
    
    requiredFields.forEach(field => {
      allTouched[field] = true;
      const error = validateField(field, formData[field]);
      if (error) allErrors[field] = error;
    });
    
    // Also touch last name if it has value or was interacted with
    if (formData.lastName && formData.lastName.trim() !== "") {
      allTouched.lastName = true;
    }

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
        <div className="w-10 h-10 bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center animate-bounce-slow">
          <User className="w-5 h-5 text-emerald-700" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800 animate-gradient bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-orange-500">
            Personal Information
          </h2>
          <p className="text-sm text-gray-500">Fill in your contact details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="animate-fade-up" style={{ animationDelay: "0.05s" }}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              First Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="John"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white/50 backdrop-blur-sm ${
                  hasError("firstName")
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100/50 animate-shake"
                    : touched.firstName && isFieldValid("firstName")
                    ? "border-emerald-400 focus:border-emerald-500 focus:ring-emerald-100/50"
                    : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-100/50"
                }`}
              />
              {hasError("firstName") && (
                <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400 animate-pulse" />
              )}
              {touched.firstName && isFieldValid("firstName") && (
                <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400 animate-scale-in" />
              )}
            </div>
            {hasError("firstName") && (
              <p className="mt-1.5 text-xs text-red-500 animate-slide-down">
                {errors.firstName}
              </p>
            )}
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Last Name
            </label>
            <div className="relative">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Doe"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white/50 backdrop-blur-sm ${
                  touched.lastName && errors.lastName
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100/50 animate-shake"
                    : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-100/50"
                }`}
              />
            </div>
            {touched.lastName && errors.lastName && (
              <p className="mt-1.5 text-xs text-red-500 animate-slide-down">
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                hasError("email") ? "text-red-400" : "text-gray-400"
              }`} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="john@example.com"
                className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white/50 backdrop-blur-sm ${
                  hasError("email")
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100/50 animate-shake"
                    : touched.email && isFieldValid("email")
                    ? "border-emerald-400 focus:border-emerald-500 focus:ring-emerald-100/50"
                    : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-100/50"
                }`}
              />
              {hasError("email") && (
                <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400 animate-pulse" />
              )}
              {touched.email && isFieldValid("email") && (
                <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400 animate-scale-in" />
              )}
            </div>
            {hasError("email") && (
              <p className="mt-1.5 text-xs text-red-500 animate-slide-down">
                {errors.email}
              </p>
            )}
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                hasError("phone") ? "text-red-400" : "text-gray-400"
              }`} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="+91 98765 43210"
                className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white/50 backdrop-blur-sm ${
                  hasError("phone")
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100/50 animate-shake"
                    : touched.phone && isFieldValid("phone")
                    ? "border-emerald-400 focus:border-emerald-500 focus:ring-emerald-100/50"
                    : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-100/50"
                }`}
              />
              {hasError("phone") && (
                <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400 animate-pulse" />
              )}
              {touched.phone && isFieldValid("phone") && (
                <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400 animate-scale-in" />
              )}
            </div>
            {hasError("phone") && (
              <p className="mt-1.5 text-xs text-red-500 animate-slide-down">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end animate-fade-up" style={{ animationDelay: "0.25s" }}>
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-2xl font-semibold hover:scale-105 transition-all duration-500 shadow-2xl shadow-emerald-200 group relative overflow-hidden"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <span className="relative z-10">Continue to Address</span>
            <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            
            {/* Animated dots */}
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

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
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

        .animate-float-slow {
          animation: float-slow 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
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

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default PersonalInfoStep;