// src/StockManagement.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp, TrendingDown, Package, Plus, Search, Truck, DollarSign,
  AlertCircle, CheckCircle, X, Trash2, Eye, Calendar, User,
  ShoppingBag, Grid, List, Minus, ArrowUpRight, ArrowDownRight,
  BarChart3, PieChart, Zap, Sparkles
} from 'lucide-react';

// Import all product data
import { products as freshProducts } from './Components/data/FreshProductsData';
import { products as kitchenProducts } from './Components/data/KitchenEssentialsData';
import { products as spicesProducts } from './Components/data/SpicesAndDryFruitsData';
import { products as dairyProducts } from './Components/data/DairyProductsAndSnacksData';

const StockManagement = () => {
  const navigate = useNavigate();
  
  // Tab State
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard | purchase | sale | stock
  
  // Common States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(null);
  const [modalType, setModalType] = useState('purchase'); // purchase | sale
  
  // Purchase States
  const [purchases, setPurchases] = useState([]);
  const [purchaseForm, setPurchaseForm] = useState({
    productId: '',
    quantity: 1,
    cost: 0,
    supplier: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [purchaseStats, setPurchaseStats] = useState({
    totalPurchases: 0,
    totalItems: 0,
    totalCost: 0,
    totalSuppliers: 0
  });

  // Sale States
  const [sales, setSales] = useState([]);
  const [saleForm, setSaleForm] = useState({
    productId: '',
    quantity: 1,
    amount: 0,
    customer: '',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'cash',
    notes: ''
  });
  const [saleStats, setSaleStats] = useState({
    totalSales: 0,
    totalItems: 0,
    totalRevenue: 0,
    totalCustomers: 0
  });

  // Stock States
  const [stockData, setStockData] = useState([]);
  const [filteredStock, setFilteredStock] = useState([]);
  const [stockStats, setStockStats] = useState({
    totalItems: 0,
    totalStock: 0,
    totalValue: 0,
    lowStock: 0,
    outOfStock: 0
  });

  // Load all data on mount
  useEffect(() => {
    loadPurchases();
    loadSales();
    loadStockData();
  }, []);

  // ==================== PURCHASE FUNCTIONS ====================
  const loadPurchases = () => {
    const saved = localStorage.getItem('purchaseData');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setPurchases(data);
        calculatePurchaseStats(data);
      } catch (e) {
        console.error('Error loading purchases:', e);
      }
    } else {
      const sample = getSamplePurchases();
      setPurchases(sample);
      calculatePurchaseStats(sample);
      localStorage.setItem('purchaseData', JSON.stringify(sample));
    }
  };

  const getSamplePurchases = () => {
    const allProducts = getAllProducts();
    return [
      {
        id: 1,
        productId: allProducts[0]?.id || 1,
        productName: allProducts[0]?.name || 'Fresh Red Apples',
        category: allProducts[0]?.category || 'fruits',
        quantity: 100,
        unit: allProducts[0]?.unit || 'kg',
        cost: 80,
        totalCost: 8000,
        supplier: 'Himachal Farms',
        date: '2026-01-15',
        notes: 'Seasonal purchase',
        status: 'completed'
      },
      {
        id: 2,
        productId: allProducts[3]?.id || 4,
        productName: allProducts[3]?.name || 'Fresh Strawberries',
        category: allProducts[3]?.category || 'fruits',
        quantity: 50,
        unit: allProducts[3]?.unit || 'box',
        cost: 200,
        totalCost: 10000,
        supplier: 'Maharashtra Organic',
        date: '2026-01-05',
        notes: 'Premium quality',
        status: 'completed'
      },
      {
        id: 3,
        productId: allProducts[5]?.id || 6,
        productName: allProducts[5]?.name || 'Premium Basmati Rice',
        category: allProducts[5]?.category || 'rice',
        quantity: 200,
        unit: allProducts[5]?.unit || 'kg',
        cost: 140,
        totalCost: 28000,
        supplier: 'Punjab Mills',
        date: '2026-01-01',
        notes: 'Bulk order',
        status: 'completed'
      }
    ];
  };

  const calculatePurchaseStats = (data) => {
    setPurchaseStats({
      totalPurchases: data.length,
      totalItems: data.reduce((sum, p) => sum + p.quantity, 0),
      totalCost: data.reduce((sum, p) => sum + p.totalCost, 0),
      totalSuppliers: [...new Set(data.map(p => p.supplier))].length
    });
  };

  const handleAddPurchase = () => {
    const { productId, quantity, cost, supplier, date, notes } = purchaseForm;
    if (!productId || quantity <= 0 || cost <= 0 || !supplier) {
      alert('Please fill all required fields');
      return;
    }

    const product = getAllProducts().find(p => p.id === Number(productId));
    if (!product) return;

    const newPurchase = {
      id: Date.now(),
      productId: Number(productId),
      productName: product.name,
      category: product.category,
      quantity: quantity,
      unit: product.unit || 'unit',
      cost: cost,
      totalCost: quantity * cost,
      supplier,
      date,
      notes: notes || '',
      status: 'completed'
    };

    const updated = [...purchases, newPurchase];
    setPurchases(updated);
    localStorage.setItem('purchaseData', JSON.stringify(updated));
    calculatePurchaseStats(updated);
    setShowAddModal(false);
    loadStockData();
    resetPurchaseForm();
  };

  const handleDeletePurchase = (id) => {
    if (window.confirm('Are you sure you want to delete this purchase?')) {
      const updated = purchases.filter(p => p.id !== id);
      setPurchases(updated);
      localStorage.setItem('purchaseData', JSON.stringify(updated));
      calculatePurchaseStats(updated);
      loadStockData();
    }
  };

  const resetPurchaseForm = () => {
    setPurchaseForm({
      productId: '',
      quantity: 1,
      cost: 0,
      supplier: '',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
  };

  // ==================== SALE FUNCTIONS ====================
  const loadSales = () => {
    const saved = localStorage.getItem('saleData');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setSales(data);
        calculateSaleStats(data);
      } catch (e) {
        console.error('Error loading sales:', e);
      }
    } else {
      const sample = getSampleSales();
      setSales(sample);
      calculateSaleStats(sample);
      localStorage.setItem('saleData', JSON.stringify(sample));
    }
  };

  const getSampleSales = () => {
    const allProducts = getAllProducts();
    return [
      {
        id: 1,
        productId: allProducts[0]?.id || 1,
        productName: allProducts[0]?.name || 'Fresh Red Apples',
        category: allProducts[0]?.category || 'fruits',
        quantity: 10,
        unit: allProducts[0]?.unit || 'kg',
        amount: 120,
        totalAmount: 1200,
        customer: 'Local Store',
        date: '2026-01-16',
        paymentMethod: 'cash',
        notes: 'Bulk order',
        status: 'completed'
      },
      {
        id: 2,
        productId: allProducts[1]?.id || 2,
        productName: allProducts[1]?.name || 'Organic Bananas',
        category: allProducts[1]?.category || 'fruits',
        quantity: 30,
        unit: allProducts[1]?.unit || 'dozen',
        amount: 60,
        totalAmount: 1800,
        customer: 'Retail Customer',
        date: '2026-01-11',
        paymentMethod: 'upi',
        notes: 'Regular customer',
        status: 'completed'
      }
    ];
  };

  const calculateSaleStats = (data) => {
    setSaleStats({
      totalSales: data.length,
      totalItems: data.reduce((sum, s) => sum + s.quantity, 0),
      totalRevenue: data.reduce((sum, s) => sum + s.totalAmount, 0),
      totalCustomers: [...new Set(data.map(s => s.customer))].length
    });
  };

  const handleAddSale = () => {
    const { productId, quantity, amount, customer, date, paymentMethod, notes } = saleForm;
    if (!productId || quantity <= 0 || amount <= 0 || !customer) {
      alert('Please fill all required fields');
      return;
    }

    const product = getAllProducts().find(p => p.id === Number(productId));
    if (!product) return;

    // Check stock
    const purchaseData = JSON.parse(localStorage.getItem('purchaseData') || '[]');
    const totalPurchased = purchaseData
      .filter(p => p.productId === Number(productId))
      .reduce((sum, p) => sum + p.quantity, 0);
    
    const totalSold = sales
      .filter(s => s.productId === Number(productId))
      .reduce((sum, s) => sum + s.quantity, 0);
    
    const currentStock = totalPurchased - totalSold;
    
    if (quantity > currentStock) {
      alert(`Insufficient stock! Available: ${currentStock} ${product.unit}`);
      return;
    }

    const newSale = {
      id: Date.now(),
      productId: Number(productId),
      productName: product.name,
      category: product.category,
      quantity: quantity,
      unit: product.unit || 'unit',
      amount: amount,
      totalAmount: quantity * amount,
      customer,
      date,
      paymentMethod,
      notes: notes || '',
      status: 'completed'
    };

    const updated = [...sales, newSale];
    setSales(updated);
    localStorage.setItem('saleData', JSON.stringify(updated));
    calculateSaleStats(updated);
    setShowAddModal(false);
    loadStockData();
    resetSaleForm();
  };

  const handleDeleteSale = (id) => {
    if (window.confirm('Are you sure you want to delete this sale?')) {
      const updated = sales.filter(s => s.id !== id);
      setSales(updated);
      localStorage.setItem('saleData', JSON.stringify(updated));
      calculateSaleStats(updated);
      loadStockData();
    }
  };

  const resetSaleForm = () => {
    setSaleForm({
      productId: '',
      quantity: 1,
      amount: 0,
      customer: '',
      date: new Date().toISOString().split('T')[0],
      paymentMethod: 'cash',
      notes: ''
    });
  };

  // ==================== STOCK FUNCTIONS ====================
  const loadStockData = () => {
    const allProducts = getAllProducts();
    const purchaseData = JSON.parse(localStorage.getItem('purchaseData') || '[]');
    const saleData = JSON.parse(localStorage.getItem('saleData') || '[]');

    const stock = allProducts.map(product => {
      const purchases = purchaseData.filter(p => p.productId === product.id);
      const sales = saleData.filter(s => s.productId === product.id);
      
      const totalPurchased = purchases.reduce((sum, p) => sum + p.quantity, 0);
      const totalSold = sales.reduce((sum, s) => sum + s.quantity, 0);
      const currentStock = totalPurchased - totalSold;
      
      return {
        ...product,
        totalPurchased,
        totalSold,
        currentStock: Math.max(0, currentStock),
        stockValue: Math.max(0, currentStock) * (product.price || 0),
        purchases: purchases,
        sales: sales,
        status: currentStock <= 0 ? 'out-of-stock' : 
                currentStock < 5 ? 'low-stock' : 'in-stock'
      };
    });

    setStockData(stock);
    setFilteredStock(stock);
    calculateStockStats(stock);
  };

  const calculateStockStats = (data) => {
    setStockStats({
      totalItems: data.length,
      totalStock: data.reduce((sum, item) => sum + item.currentStock, 0),
      totalValue: data.reduce((sum, item) => sum + item.stockValue, 0),
      lowStock: data.filter(item => item.status === 'low-stock').length,
      outOfStock: data.filter(item => item.status === 'out-of-stock').length
    });
  };

  // ==================== COMMON FUNCTIONS ====================
  const getAllProducts = () => {
    const all = [];
    const add = (products, source) => {
      products.forEach(p => {
        if (p.id && p.name) {
          all.push({ ...p, source });
        }
      });
    };
    add(freshProducts, 'Fresh Products');
    add(kitchenProducts, 'Kitchen Essentials');
    add(spicesProducts, 'Spices & Dry Fruits');
    add(dairyProducts, 'Dairy & Snacks');
    return all;
  };

  const getCategories = () => {
    const products = getAllProducts();
    const cats = ['all'];
    products.forEach(p => {
      if (p.category && !cats.includes(p.category)) {
        cats.push(p.category);
      }
    });
    return cats;
  };

  const getFilteredItems = (items) => {
    let filtered = [...items];
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.productName?.toLowerCase().includes(term) ||
        item.name?.toLowerCase().includes(term) ||
        item.supplier?.toLowerCase().includes(term) ||
        item.customer?.toLowerCase().includes(term) ||
        item.category?.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'in-stock': return 'bg-emerald-100 text-emerald-600';
      case 'low-stock': return 'bg-orange-100 text-orange-600';
      case 'out-of-stock': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'in-stock': return '✅ In Stock';
      case 'low-stock': return '⚠️ Low Stock';
      case 'out-of-stock': return '❌ Out of Stock';
      default: return status;
    }
  };

  const categories = getCategories();
  const products = getAllProducts();
  const filteredPurchases = getFilteredItems(purchases);
  const filteredSales = getFilteredItems(sales);
  const filteredStockItems = getFilteredItems(stockData);

  // ==================== RENDER FUNCTIONS ====================
  
  // Dashboard View
  const renderDashboard = () => {
    return (
      <div className="space-y-6">
        {/* Main Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-emerald-100">
            <p className="text-sm text-gray-500">Total Products</p>
            <p className="text-2xl font-bold text-gray-800">{stockStats.totalItems}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-blue-100">
            <p className="text-sm text-gray-500">Total Stock</p>
            <p className="text-2xl font-bold text-gray-800">{stockStats.totalStock} units</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-emerald-100">
            <p className="text-sm text-gray-500">Stock Value</p>
            <p className="text-2xl font-bold text-emerald-600">₹{stockStats.totalValue.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-purple-100">
            <p className="text-sm text-gray-500">Total Purchases</p>
            <p className="text-2xl font-bold text-purple-600">{purchaseStats.totalPurchases}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-orange-100">
            <p className="text-sm text-gray-500">Total Sales</p>
            <p className="text-2xl font-bold text-orange-600">{saleStats.totalSales}</p>
          </div>
        </div>

        {/* Alerts */}
        {(stockStats.lowStock > 0 || stockStats.outOfStock > 0) && (
          <div className="space-y-3">
            {stockStats.lowStock > 0 && (
              <div className="bg-orange-50 rounded-2xl p-4 border border-orange-200 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                  <div>
                    <p className="font-semibold text-orange-800">Low Stock Alert</p>
                    <p className="text-sm text-orange-600">{stockStats.lowStock} products are running low on stock</p>
                  </div>
                </div>
                <button
                  onClick={() => { setActiveTab('purchase'); setShowAddModal(true); setModalType('purchase'); }}
                  className="px-4 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all text-sm"
                >
                  Restock Now
                </button>
              </div>
            )}
            
            {stockStats.outOfStock > 0 && (
              <div className="bg-red-50 rounded-2xl p-4 border border-red-200 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <div>
                    <p className="font-semibold text-red-800">Out of Stock</p>
                    <p className="text-sm text-red-600">{stockStats.outOfStock} products are currently out of stock</p>
                  </div>
                </div>
                <button
                  onClick={() => { setActiveTab('purchase'); setShowAddModal(true); setModalType('purchase'); }}
                  className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all text-sm"
                >
                  Restock Now
                </button>
              </div>
            )}
          </div>
        )}

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-700">Purchase Cost</p>
                <p className="text-2xl font-bold text-emerald-800">₹{purchaseStats.totalCost.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-200 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-700" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700">Sales Revenue</p>
                <p className="text-2xl font-bold text-orange-800">₹{saleStats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-orange-700" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700">Suppliers</p>
                <p className="text-2xl font-bold text-purple-800">{purchaseStats.totalSuppliers}</p>
              </div>
              <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-purple-700" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700">Customers</p>
                <p className="text-2xl font-bold text-blue-800">{saleStats.totalCustomers}</p>
              </div>
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Stock Overview */}
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600" />
            Stock Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-emerald-50 rounded-xl text-center">
              <p className="text-sm text-gray-500">In Stock</p>
              <p className="text-2xl font-bold text-emerald-600">
                {stockData.filter(item => item.status === 'in-stock').length}
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl text-center">
              <p className="text-sm text-gray-500">Low Stock</p>
              <p className="text-2xl font-bold text-orange-600">{stockStats.lowStock}</p>
            </div>
            <div className="p-4 bg-red-50 rounded-xl text-center">
              <p className="text-sm text-gray-500">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">{stockStats.outOfStock}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Purchase View
  const renderPurchaseView = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
              Purchase History
            </h2>
            <span className="text-sm text-gray-400">({filteredPurchases.length} records)</span>
          </div>
          <button
            onClick={() => { setShowAddModal(true); setModalType('purchase'); }}
            className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Purchase
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Qty</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Cost</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Supplier</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPurchases.length === 0 ? (
                  <tr><td colSpan="7" className="px-6 py-8 text-center text-gray-400">No purchases found</td></tr>
                ) : (
                  filteredPurchases.map(p => (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-emerald-50/30 transition-colors">
                      <td className="px-6 py-3">
                        <p className="font-medium text-gray-800">{p.productName}</p>
                        <p className="text-xs text-gray-400">{p.category}</p>
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-600">{new Date(p.date).toLocaleDateString()}</td>
                      <td className="px-6 py-3 text-sm font-medium text-gray-700">{p.quantity} {p.unit}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">₹{p.cost}</td>
                      <td className="px-6 py-3 text-sm font-semibold text-emerald-600">₹{p.totalCost}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{p.supplier}</td>
                      <td className="px-6 py-3 text-right">
                        <button onClick={() => setShowDetailModal(p)} className="p-1.5 hover:bg-emerald-50 rounded-lg transition-all">
                          <Eye className="w-4 h-4 text-gray-400 hover:text-emerald-600" />
                        </button>
                        <button onClick={() => handleDeletePurchase(p.id)} className="p-1.5 hover:bg-red-50 rounded-lg transition-all">
                          <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-600" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Sale View
  const renderSaleView = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <TrendingDown className="w-6 h-6 text-orange-600" />
              Sales History
            </h2>
            <span className="text-sm text-gray-400">({filteredSales.length} records)</span>
          </div>
          <button
            onClick={() => { setShowAddModal(true); setModalType('sale'); }}
            className="px-4 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Sale
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Qty</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.length === 0 ? (
                  <tr><td colSpan="7" className="px-6 py-8 text-center text-gray-400">No sales found</td></tr>
                ) : (
                  filteredSales.map(s => (
                    <tr key={s.id} className="border-b border-gray-50 hover:bg-orange-50/30 transition-colors">
                      <td className="px-6 py-3">
                        <p className="font-medium text-gray-800">{s.productName}</p>
                        <p className="text-xs text-gray-400">{s.category}</p>
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-600">{new Date(s.date).toLocaleDateString()}</td>
                      <td className="px-6 py-3 text-sm font-medium text-gray-700">{s.quantity} {s.unit}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">₹{s.amount}</td>
                      <td className="px-6 py-3 text-sm font-semibold text-orange-600">₹{s.totalAmount}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{s.customer}</td>
                      <td className="px-6 py-3 text-right">
                        <button onClick={() => setShowDetailModal(s)} className="p-1.5 hover:bg-orange-50 rounded-lg transition-all">
                          <Eye className="w-4 h-4 text-gray-400 hover:text-orange-600" />
                        </button>
                        <button onClick={() => handleDeleteSale(s.id)} className="p-1.5 hover:bg-red-50 rounded-lg transition-all">
                          <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-600" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Stock View
  const renderStockView = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Package className="w-6 h-6 text-blue-600" />
            Current Stock
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredStockItems.length === 0 ? (
              <div className="col-span-full text-center py-8 text-gray-400">No products found</div>
            ) : (
              filteredStockItems.map(item => (
                <div 
                  key={item.id}
                  className={`bg-white rounded-2xl shadow-xl border-2 p-5 hover:shadow-2xl transition-all hover:-translate-y-1 ${
                    item.status === 'out-of-stock' ? 'border-red-200' :
                    item.status === 'low-stock' ? 'border-orange-200' : 'border-emerald-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-xs text-gray-400">{item.category}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${getStatusColor(item.status)}`}>
                      {getStatusLabel(item.status)}
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Stock Level</span>
                      <span className="text-sm font-medium text-gray-700">{item.currentStock} {item.unit}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          item.status === 'out-of-stock' ? 'bg-red-500' :
                          item.status === 'low-stock' ? 'bg-orange-500' : 'bg-emerald-500'
                        }`}
                        style={{ 
                          width: `${Math.min(100, (item.currentStock / Math.max(1, item.totalPurchased)) * 100)}%` 
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-1 mt-3 pt-3 border-t border-gray-100">
                    <div className="text-center">
                      <p className="text-[10px] text-gray-400">Purchased</p>
                      <p className="font-medium text-gray-700 text-sm">{item.totalPurchased || 0}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-gray-400">Sold</p>
                      <p className="font-medium text-gray-700 text-sm">{item.totalSold || 0}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-gray-400">Value</p>
                      <p className="font-medium text-emerald-600 text-sm">₹{item.stockValue || 0}</p>
                    </div>
                  </div>

                  <div className="flex gap-1.5 mt-3">
                    <button
                      onClick={() => { setActiveTab('purchase'); setShowAddModal(true); setModalType('purchase'); setPurchaseForm({...purchaseForm, productId: item.id}); }}
                      className="flex-1 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-all text-xs font-medium flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Restock
                    </button>
                    <button
                      onClick={() => { setActiveTab('sale'); setShowAddModal(true); setModalType('sale'); setSaleForm({...saleForm, productId: item.id}); }}
                      disabled={item.currentStock === 0}
                      className={`flex-1 py-1.5 rounded-lg transition-all text-xs font-medium flex items-center justify-center gap-1 ${
                        item.currentStock === 0 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                      }`}
                    >
                      <Minus className="w-3 h-3" />
                      Sell
                    </button>
                    <button
                      onClick={() => setShowDetailModal(item)}
                      className="p-1.5 bg-gray-50 text-gray-400 rounded-lg hover:bg-gray-100 transition-all"
                    >
                      <Eye className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Purchased</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Sold</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Value</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStockItems.length === 0 ? (
                    <tr><td colSpan="7" className="px-6 py-8 text-center text-gray-400">No products found</td></tr>
                  ) : (
                    filteredStockItems.map(item => (
                      <tr key={item.id} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                        <td className="px-6 py-3 font-medium text-gray-800">{item.name}</td>
                        <td className="px-6 py-3 text-sm text-gray-600">{item.category}</td>
                        <td className="px-6 py-3 text-sm font-medium text-gray-700">{item.currentStock} {item.unit}</td>
                        <td className="px-6 py-3 text-sm text-gray-600">{item.totalPurchased || 0}</td>
                        <td className="px-6 py-3 text-sm text-gray-600">{item.totalSold || 0}</td>
                        <td className="px-6 py-3 text-sm font-semibold text-emerald-600">₹{item.stockValue || 0}</td>
                        <td className="px-6 py-3">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${getStatusColor(item.status)}`}>
                            {getStatusLabel(item.status)}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ==================== MODAL ====================
  const renderAddModal = () => {
    if (!showAddModal) return null;
    
    const isPurchase = modalType === 'purchase';
    const form = isPurchase ? purchaseForm : saleForm;
    const setForm = isPurchase ? setPurchaseForm : setSaleForm;
    const handleSubmit = isPurchase ? handleAddPurchase : handleAddSale;
    const title = isPurchase ? 'New Purchase' : 'New Sale';
    const icon = isPurchase ? <Truck className="w-5 h-5 text-emerald-600" /> : <ShoppingBag className="w-5 h-5 text-orange-600" />;
    const bgColor = isPurchase ? 'from-emerald-600 to-emerald-700' : 'from-orange-600 to-orange-700';

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl animate-scale-in  max-h-[79vh] lg:max-h-[80vh] overflow-y-auto mt-35 lg:mt-25">
          <div className="flex items-center justify-between mb-3 ">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 ">
              {icon}
              {title}
            </h3>
            <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-all">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product *</label>
              <select
                value={form.productId}
                onChange={(e) => setForm({ ...form, productId: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400"
              >
                <option value="">Select Product</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.category})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
              <input
                type="number"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isPurchase ? 'Unit Cost (₹) *' : 'Unit Price (₹) *'}
              </label>
              <input
                type="number"
                value={isPurchase ? form.cost : form.amount}
                onChange={(e) => setForm({ ...form, [isPurchase ? 'cost' : 'amount']: Number(e.target.value) })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isPurchase ? 'Supplier *' : 'Customer *'}
              </label>
              <input
                type="text"
                value={isPurchase ? form.supplier : form.customer}
                onChange={(e) => setForm({ ...form, [isPurchase ? 'supplier' : 'customer']: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400"
                placeholder={isPurchase ? 'Supplier name' : 'Customer name'}
              />
            </div>

            {!isPurchase && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  value={form.paymentMethod}
                  onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400"
                >
                  <option value="cash">Cash</option>
                  <option value="credit">Credit Card</option>
                  <option value="upi">UPI</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 resize-none"
                rows="2"
                placeholder="Additional notes..."
              />
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setShowAddModal(false)}
              className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className={`flex-1 py-2.5 bg-gradient-to-r ${bgColor} text-white rounded-xl font-medium hover:scale-105 transition-all`}
            >
              {isPurchase ? 'Add Purchase' : 'Add Sale'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Detail Modal
  const renderDetailModal = () => {
    if (!showDetailModal) return null;
    const item = showDetailModal;
    const isPurchase = item.totalCost !== undefined;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl animate-scale-in mt-20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              {isPurchase ? 'Purchase Details' : 'Sale Details'}
            </h3>
            <button onClick={() => setShowDetailModal(null)} className="p-2 hover:bg-gray-100 rounded-xl transition-all">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Product</span>
              <span className="font-medium text-gray-800">{item.productName || item.name}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Category</span>
              <span className="font-medium text-gray-800">{item.category}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Quantity</span>
              <span className="font-medium text-gray-800">{item.quantity} {item.unit}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">{isPurchase ? 'Unit Cost' : 'Unit Price'}</span>
              <span className="font-medium text-gray-800">₹{isPurchase ? item.cost : item.amount}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Total</span>
              <span className={`font-semibold ${isPurchase ? 'text-emerald-600' : 'text-orange-600'}`}>
                ₹{isPurchase ? item.totalCost : item.totalAmount}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">{isPurchase ? 'Supplier' : 'Customer'}</span>
              <span className="font-medium text-gray-800">{isPurchase ? item.supplier : item.customer}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Date</span>
              <span className="font-medium text-gray-800">{new Date(item.date).toLocaleDateString()}</span>
            </div>
            {item.notes && (
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Notes</span>
                <span className="font-medium text-gray-800">{item.notes}</span>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowDetailModal(null)}
            className={`w-full mt-6 py-2.5 ${isPurchase ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-orange-600 hover:bg-orange-700'} text-white rounded-xl font-medium transition-all`}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  // ==================== MAIN RENDER ====================
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 mt-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-emerald-600" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-orange-500">
                Stock Management
              </span>
            </h1>
            <p className="text-gray-500 mt-1">Manage purchases, sales, and inventory</p>
          </div>
          
          {/* Search & Filter */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 bg-white/50 text-sm"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 bg-white/50 text-sm min-w-[120px]"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/80 backdrop-blur-sm rounded-2xl p-1 shadow-lg border border-gray-100 mb-6">
          {[
            { id: 'dashboard', label: '📊 Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'purchase', label: '📦 Purchase', icon: <TrendingUp className="w-4 h-4" /> },
            { id: 'sale', label: '💰 Sale', icon: <TrendingDown className="w-4 h-4" /> },
            { id: 'stock', label: '📦 Stock', icon: <Package className="w-4 h-4" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-200'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'purchase' && renderPurchaseView()}
        {activeTab === 'sale' && renderSaleView()}
        {activeTab === 'stock' && renderStockView()}

        {/* Modals */}
        {renderAddModal()}
        {renderDetailModal()}

        <style>{`
          @keyframes scale-in {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-scale-in {
            animation: scale-in 0.3s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
};

export default StockManagement;