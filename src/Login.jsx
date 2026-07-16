// src/Login.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Mail, Lock, User, Eye, EyeOff, ArrowRight, 
  CheckCircle, AlertCircle, Shield, Sparkles,
  Leaf, Heart, ShoppingBag, Truck, Star
} from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  
  // Tab State: 'signin' or 'signup'
  const [activeTab, setActiveTab] = useState('signin');
  
  // Sign In Form
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  // Sign Up Form
  const [signUpData, setSignUpData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Load saved email if remember me was checked
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setSignInData(prev => ({ ...prev, email: savedEmail, rememberMe: true }));
    }
  }, []);

  // ==================== VALIDATION ====================
  const validateSignIn = () => {
    const newErrors = {};
    
    if (!signInData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signInData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!signInData.password) {
      newErrors.password = 'Password is required';
    } else if (signInData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignUp = () => {
    const newErrors = {};
    
    if (!signUpData.fullName) {
      newErrors.fullName = 'Full name is required';
    } else if (signUpData.fullName.length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }
    
    if (!signUpData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signUpData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!signUpData.password) {
      newErrors.password = 'Password is required';
    } else if (signUpData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!signUpData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (signUpData.password !== signUpData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!signUpData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ==================== HANDLERS ====================
  const handleSignIn = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    
    if (!validateSignIn()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => 
        u.email === signInData.email && u.password === signInData.password
      );
      
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        if (signInData.rememberMe) {
          localStorage.setItem('rememberedEmail', signInData.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        
        setSuccessMessage('Welcome back! Redirecting...');
        setShowSuccess(true);
        
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setErrors({ ...errors, general: 'Invalid email or password' });
        setShowSuccess(false);
      }
    }, 1500);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setTouched({ 
      fullName: true, 
      email: true, 
      password: true, 
      confirmPassword: true,
      agreeTerms: true 
    });
    
    if (!validateSignUp()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find(u => u.email === signUpData.email);
      
      if (existingUser) {
        setErrors({ ...errors, email: 'This email is already registered' });
        setShowSuccess(false);
        return;
      }
      
      const newUser = {
        id: Date.now(),
        name: signUpData.fullName,
        email: signUpData.email,
        password: signUpData.password,
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      setSuccessMessage('Account created successfully! 🎉');
      setShowSuccess(true);
      
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }, 1500);
  };

  // ==================== SOCIAL LOGIN ====================
  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(`Signed in with ${provider}!`);
      setShowSuccess(true);
      setTimeout(() => navigate('/'), 1500);
    }, 1500);
  };

  // ==================== RENDER ====================
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 flex items-center justify-center p-4 pt-24">
      
      {/* Main Container */}
      <div className="w-full max-w-5xl  bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/50 flex flex-col md:flex-row">
        
        {/* ============================================ */}
        {/* LEFT SIDE - MIXED COLOR GRADIENT */}
        {/* ============================================ */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-emerald-600 via-emerald-700 to-orange-700 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
          
          {/* Background Decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl"></div>
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-300/10 rounded-full blur-2xl"></div>
            
            {/* Floating Particles */}
            <div className="absolute top-10 left-10 animate-float-slow">
              <Leaf className="w-8 h-8 text-emerald-300/30" />
            </div>
            <div className="absolute bottom-20 right-10 animate-float-slow" style={{ animationDelay: '1.5s' }}>
              <Heart className="w-6 h-6 text-orange-300/30" />
            </div>
            <div className="absolute top-1/2 left-5 animate-float-slow" style={{ animationDelay: '2.5s' }}>
              <Star className="w-5 h-5 text-yellow-300/30" />
            </div>
            <div className="absolute top-1/3 right-5 animate-float-slow" style={{ animationDelay: '1s' }}>
              <Shield className="w-6 h-6 text-blue-300/30" />
            </div>
          </div>

          {/* Brand */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8 mt-8">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-orange-400 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Grocery Items</h2>
                <p className="text-emerald-200 text-xs">Fresh & Organic Store</p>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                {activeTab === 'signin' ? (
                  <>Welcome Back! 👋</>
                ) : (
                  <>Create Account 🚀</>
                )}
              </h1>
              <p className="text-white/80 text-sm md:text-base leading-relaxed">
                {activeTab === 'signin' ? (
                  'Sign in to access your orders, wishlist, and personalized recommendations.'
                ) : (
                  'Join our community and enjoy fresh groceries delivered to your doorstep.'
                )}
              </p>
            </div>

            {/* Features - Mixed Colors */}
            <div className="mt-8 space-y-3">
              {[
                { icon: <Truck className="w-4 h-4" />, text: 'Free delivery on orders above ₹499', color: 'emerald' },
                { icon: <Shield className="w-4 h-4" />, text: '100% fresh & quality guaranteed', color: 'blue' },
                { icon: <Heart className="w-4 h-4" />, text: 'Save favorites to your wishlist', color: 'rose' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-white/80 text-sm">
                  <div className={`w-6 h-6 bg-${item.color}-400/20 rounded-full flex items-center justify-center flex-shrink-0`}>
                    {item.icon}
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 mt-8">
            <div className="flex items-center gap-4 text-white/50 text-xs">
              <span>© 2026 Grocery Items</span>
              <span className="w-px h-4 bg-white/20"></span>
              <span>Secure Checkout</span>
              <span className="w-px h-4 bg-white/20"></span>
              <span>🔒 SSL Encrypted</span>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* RIGHT SIDE - FORM */}
        {/* ============================================ */}
        <div className="w-full md:w-1/2 p-6 md:p-10">
          
          {/* Tabs - Mixed Colors */}
          <div className="flex bg-gray-100/50 rounded-xl p-1 mb-6">
            <button
              onClick={() => {
                setActiveTab('signin');
                setErrors({});
                setSuccessMessage('');
                setShowSuccess(false);
              }}
              className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
                activeTab === 'signin'
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-200'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setActiveTab('signup');
                setErrors({});
                setSuccessMessage('');
                setShowSuccess(false);
              }}
              className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
                activeTab === 'signup'
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-200'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 animate-slide-down">
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <p className="text-sm text-emerald-700">{successMessage}</p>
            </div>
          )}

          {/* Error Message */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 animate-slide-down">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-700">{errors.general}</p>
            </div>
          )}

          {/* ============================================ */}
          {/* SIGN IN FORM */}
          {/* ============================================ */}
          {activeTab === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4">
              
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                    touched.email && errors.email ? 'text-red-400' : 'text-emerald-500'
                  }`} />
                  <input
                    type="email"
                    value={signInData.email}
                    onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                    onFocus={() => setTouched({ ...touched, email: true })}
                    placeholder="you@example.com"
                    className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                      touched.email && errors.email
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-100/50'
                        : 'border-gray-200 focus:border-emerald-400 focus:ring-emerald-100/50'
                    }`}
                  />
                  {touched.email && errors.email && (
                    <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400" />
                  )}
                </div>
                {touched.email && errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                    touched.password && errors.password ? 'text-red-400' : 'text-emerald-500'
                  }`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signInData.password}
                    onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                    onFocus={() => setTouched({ ...touched, password: true })}
                    placeholder="••••••••"
                    className={`w-full pl-11 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                      touched.password && errors.password
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-100/50'
                        : 'border-gray-200 focus:border-emerald-400 focus:ring-emerald-100/50'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {touched.password && errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={signInData.rememberMe}
                    onChange={(e) => setSignInData({ ...signInData, rememberMe: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button - Mixed Gradient */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-500 flex items-center justify-center gap-2 ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-orange-500 hover:from-emerald-700 hover:via-emerald-600 hover:to-orange-600 hover:scale-[1.02] shadow-lg shadow-emerald-200'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* OR Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-400">Or continue with</span>
                </div>
              </div>

              {/* Social Login - Mixed Colors */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  className="py-2.5 border border-gray-200 rounded-xl hover:bg-emerald-50 hover:border-emerald-300 transition-all flex items-center justify-center gap-2 text-sm font-medium text-gray-700 hover:text-emerald-700"
                >
                  <span className="text-lg">🔵</span>
                  Google
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Facebook')}
                  className="py-2.5 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all flex items-center justify-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-700"
                >
                  <span className="text-lg">🔷</span>
                  Facebook
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Apple')}
                  className="py-2.5 border border-gray-200 rounded-xl hover:bg-purple-50 hover:border-purple-300 transition-all flex items-center justify-center gap-2 text-sm font-medium text-gray-700 hover:text-purple-700"
                >
                  <span className="text-lg">🍎</span>
                  Apple
                </button>
              </div>
            </form>
          )}

          {/* ============================================ */}
          {/* SIGN UP FORM */}
          {/* ============================================ */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-3">
              
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                    touched.fullName && errors.fullName ? 'text-red-400' : 'text-orange-500'
                  }`} />
                  <input
                    type="text"
                    value={signUpData.fullName}
                    onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                    onFocus={() => setTouched({ ...touched, fullName: true })}
                    placeholder="John Doe"
                    className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                      touched.fullName && errors.fullName
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-100/50'
                        : 'border-gray-200 focus:border-orange-400 focus:ring-orange-100/50'
                    }`}
                  />
                  {touched.fullName && errors.fullName && (
                    <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400" />
                  )}
                </div>
                {touched.fullName && errors.fullName && (
                  <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                    touched.email && errors.email ? 'text-red-400' : 'text-orange-500'
                  }`} />
                  <input
                    type="email"
                    value={signUpData.email}
                    onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                    onFocus={() => setTouched({ ...touched, email: true })}
                    placeholder="you@example.com"
                    className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                      touched.email && errors.email
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-100/50'
                        : 'border-gray-200 focus:border-orange-400 focus:ring-orange-100/50'
                    }`}
                  />
                  {touched.email && errors.email && (
                    <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400" />
                  )}
                </div>
                {touched.email && errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                    touched.password && errors.password ? 'text-red-400' : 'text-orange-500'
                  }`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signUpData.password}
                    onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                    onFocus={() => setTouched({ ...touched, password: true })}
                    placeholder="••••••••"
                    className={`w-full pl-11 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                      touched.password && errors.password
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-100/50'
                        : 'border-gray-200 focus:border-orange-400 focus:ring-orange-100/50'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {touched.password && errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                    touched.confirmPassword && errors.confirmPassword ? 'text-red-400' : 'text-orange-500'
                  }`} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={signUpData.confirmPassword}
                    onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                    onFocus={() => setTouched({ ...touched, confirmPassword: true })}
                    placeholder="••••••••"
                    className={`w-full pl-11 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                      touched.confirmPassword && errors.confirmPassword
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-100/50'
                        : 'border-gray-200 focus:border-orange-400 focus:ring-orange-100/50'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={signUpData.agreeTerms}
                  onChange={(e) => setSignUpData({ ...signUpData, agreeTerms: e.target.checked })}
                  className="w-4 h-4 mt-1 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                />
                <label className="text-sm text-gray-600">
                  I agree to the{' '}
                  <button type="button" className="text-emerald-600 hover:underline font-medium">
                    Terms of Service
                  </button>
                  {' '}and{' '}
                  <button type="button" className="text-orange-600 hover:underline font-medium">
                    Privacy Policy
                  </button>
                </label>
              </div>
              {touched.agreeTerms && errors.agreeTerms && (
                <p className="text-xs text-red-500">{errors.agreeTerms}</p>
              )}

              {/* Submit Button - Mixed Gradient */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-500 flex items-center justify-center gap-2 ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-500 via-orange-400 to-emerald-500 hover:from-orange-600 hover:via-orange-500 hover:to-emerald-600 hover:scale-[1.02] shadow-lg shadow-orange-200'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Already have account */}
              <p className="text-center text-sm text-gray-500">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('signin');
                    setErrors({});
                    setSuccessMessage('');
                    setShowSuccess(false);
                  }}
                  className="text-orange-600 font-medium hover:underline"
                >
                  Sign In
                </button>
              </p>
            </form>
          )}
        </div>
      </div>

      {/* ============================================ */}
      {/* STYLES */}
      {/* ============================================ */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(10deg); }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;