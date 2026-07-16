// src/Components/admin/inventory/DashboardOverview.jsx

import React, { useState, useEffect } from 'react';
import {
  Package, TrendingUp, TrendingDown, DollarSign, ShoppingBag,
  Users, Truck, AlertCircle, CheckCircle, Clock, Calendar,
  ArrowUpRight, ArrowDownRight, BarChart3, PieChart, Star,
  ShoppingCart, UserCheck, UserX, Award, Zap, Sparkles,
  CircleX, Layers, Store
} from 'lucide-react';

// Import product data
import { products as freshProducts } from '../../data/FreshProductsData';
import { products as kitchenProducts } from '../../data/KitchenEssentialsData';
import { products as spicesProducts } from '../../data/SpicesAndDryFruitsData';
import { products as dairyProducts } from '../../data/DairyProductsAndSnacksData';

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    todayOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    totalCustomers: 0,
    totalSuppliers: 0,
    totalRevenue: 0,
    dailySales: 0,
    monthlySales: 0,
    lowStock: 0,
    outOfStock: 0,
    overstock: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [outOfStockItems, setOutOfStockItems] = useState([]);
  const [selectedTime, setSelectedTime] = useState('week');

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = () => {
    const allProducts = getAllProducts();
    const categories = [...new Set(allProducts.map(p => p.category))];
    
    const purchaseData = JSON.parse(localStorage.getItem('purchaseData') || '[]');
    const saleData = JSON.parse(localStorage.getItem('saleData') || '[]');

    let lowStock = 0;
    let outOfStock = 0;
    let overstock = 0;
    const lowStockItemsList = [];
    const outOfStockItemsList = [];

    allProducts.forEach(product => {
      const totalPurchased = purchaseData
        .filter(p => p.productId === product.id)
        .reduce((sum, p) => sum + p.quantity, 0);
      const totalSold = saleData
        .filter(s => s.productId === product.id)
        .reduce((sum, s) => sum + s.quantity, 0);
      const currentStock = totalPurchased - totalSold;
      
      if (currentStock <= 0) {
        outOfStock++;
        outOfStockItemsList.push({ ...product, stock: currentStock });
      } else if (currentStock < 5) {
        lowStock++;
        lowStockItemsList.push({ ...product, stock: currentStock });
      } else if (currentStock > 50) {
        overstock++;
      }
    });

    setStats({
      totalProducts: allProducts.length,
      totalCategories: categories.length,
      totalOrders: saleData.length,
      todayOrders: saleData.filter(s => new Date(s.date).toDateString() === new Date().toDateString()).length,
      pendingOrders: 4,
      completedOrders: saleData.length - 4,
      cancelledOrders: 2,
      totalCustomers: [...new Set(saleData.map(s => s.customer))].length,
      totalSuppliers: [...new Set(purchaseData.map(p => p.supplier))].length,
      totalRevenue: saleData.reduce((sum, s) => sum + s.totalAmount, 0),
      dailySales: 12500,
      monthlySales: 342000,
      lowStock,
      outOfStock,
      overstock
    });

    setLowStockItems(lowStockItemsList);
    setOutOfStockItems(outOfStockItemsList);

    // Recent Orders
    setRecentOrders([
      { id: 'ORD-001', customer: 'Priya Sharma', amount: 450, status: 'delivered', date: '2026-07-16', items: 3 },
      { id: 'ORD-002', customer: 'Rajesh Kumar', amount: 780, status: 'processing', date: '2026-07-16', items: 5 },
      { id: 'ORD-003', customer: 'Ananya Reddy', amount: 320, status: 'pending', date: '2026-07-15', items: 2 },
      { id: 'ORD-004', customer: 'Vikram Singh', amount: 1250, status: 'shipped', date: '2026-07-15', items: 7 },
      { id: 'ORD-005', customer: 'Meena Kumari', amount: 560, status: 'delivered', date: '2026-07-14', items: 4 },
    ]);

    // Best Sellers
    setBestSellers([
      { name: 'Fresh Red Apples', sales: 245, revenue: 29400, growth: '+12%' },
      { name: 'Premium Basmati Rice', sales: 180, revenue: 32400, growth: '+8%' },
      { name: 'Organic Bananas', sales: 156, revenue: 9360, growth: '+5%' },
      { name: 'Fresh Strawberries', sales: 120, revenue: 30000, growth: '+15%' },
      { name: 'Pure Turmeric Powder', sales: 98, revenue: 11760, growth: '+3%' },
    ]);
  };

  const getAllProducts = () => {
    const all = [];
    const add = (products) => {
      products.forEach(p => {
        if (p.id && p.name) {
          all.push(p);
        }
      });
    };
    add(freshProducts);
    add(kitchenProducts);
    add(spicesProducts);
    add(dairyProducts);
    return all;
  };

  const getStatusColor = (status) => {
    const colors = {
      delivered: 'bg-emerald-100 text-emerald-700',
      processing: 'bg-blue-100 text-blue-700',
      pending: 'bg-yellow-100 text-yellow-700',
      shipped: 'bg-purple-100 text-purple-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  // Main Stat Cards - Using only existing icons
  const statCards = [
    { icon: <Package className="w-6 h-6" />, label: 'Total Products', value: stats.totalProducts, change: '+12%', color: 'emerald' },
    { icon: <Layers className="w-6 h-6" />, label: 'Total Categories', value: stats.totalCategories, change: '+2', color: 'blue' },
    { icon: <ShoppingBag className="w-6 h-6" />, label: 'Total Orders', value: stats.totalOrders, change: '+8%', color: 'purple' },
    { icon: <Clock className="w-6 h-6" />, label: "Today's Orders", value: stats.todayOrders, change: '+5', color: 'orange' },
    { icon: <Clock className="w-6 h-6" />, label: 'Pending Orders', value: stats.pendingOrders, change: '3', color: 'yellow' },
    { icon: <CheckCircle className="w-6 h-6" />, label: 'Completed Orders', value: stats.completedOrders, change: '+12%', color: 'emerald' },
    { icon: <CircleX className="w-6 h-6" />, label: 'Cancelled Orders', value: stats.cancelledOrders, change: '-2', color: 'red' },
    { icon: <Users className="w-6 h-6" />, label: 'Total Customers', value: stats.totalCustomers, change: '+5%', color: 'blue' },
    { icon: <Truck className="w-6 h-6" />, label: 'Total Suppliers', value: stats.totalSuppliers, change: '+1', color: 'teal' },
    { icon: <DollarSign className="w-6 h-6" />, label: 'Total Revenue', value: `₹${(stats.totalRevenue / 1000).toFixed(1)}K`, change: '+15%', color: 'emerald' },
    { icon: <TrendingUp className="w-6 h-6" />, label: 'Daily Sales', value: `₹${stats.dailySales.toLocaleString()}`, change: '+8%', color: 'purple' },
    { icon: <Calendar className="w-6 h-6" />, label: 'Monthly Sales', value: `₹${stats.monthlySales.toLocaleString()}`, change: '+12%', color: 'blue' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Stats Grid - All 12 Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 ">
        {statCards.map((card, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className={`w-9 h-9 bg-${card.color}-100 dark:bg-${card.color}-900/30 rounded-xl flex items-center justify-center text-${card.color}-600 dark:text-${card.color}-400`}>
                {card.icon}
              </div>
              <span className={`text-[10px] font-medium ${card.change.startsWith('+') ? 'text-emerald-600' : card.change.startsWith('-') ? 'text-red-600' : 'text-orange-600'}`}>
                {card.change}
              </span>
            </div>
            <div className="mt-2">
              <p className="text-[10px] text-gray-400 dark:text-gray-500 truncate">{card.label}</p>
              <p className="text-lg font-bold text-gray-800 dark:text-white">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Inventory Alerts - Low Stock & Out of Stock */}
      {(stats.lowStock > 0 || stats.outOfStock > 0 || stats.overstock > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.outOfStock > 0 && (
            <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-4 border border-red-200 dark:border-red-800">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                <h4 className="font-semibold text-red-800 dark:text-red-300">Out of Stock</h4>
              </div>
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">{stats.outOfStock} products</p>
              {outOfStockItems.slice(0, 3).map(item => (
                <div key={item.id} className="flex justify-between text-xs text-red-600 dark:text-red-400 mt-1">
                  <span>{item.name}</span>
                  <span>Stock: {item.stock}</span>
                </div>
              ))}
            </div>
          )}

          {stats.lowStock > 0 && (
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-4 border border-orange-200 dark:border-orange-800">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <h4 className="font-semibold text-orange-800 dark:text-orange-300">Low Stock</h4>
              </div>
              <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">{stats.lowStock} products</p>
              {lowStockItems.slice(0, 3).map(item => (
                <div key={item.id} className="flex justify-between text-xs text-orange-600 dark:text-orange-400 mt-1">
                  <span>{item.name}</span>
                  <span>Stock: {item.stock}</span>
                </div>
              ))}
            </div>
          )}

          {stats.overstock > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h4 className="font-semibold text-blue-800 dark:text-blue-300">Overstock</h4>
              </div>
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">{stats.overstock} products</p>
              <p className="text-xs text-blue-500 dark:text-blue-400 mt-1">Consider running promotions</p>
            </div>
          )}
        </div>
      )}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 dark:text-white">Revenue Overview</h3>
            <div className="flex items-center gap-1 text-xs">
              <button 
                onClick={() => setSelectedTime('week')}
                className={`px-3 py-1 rounded-lg transition-all ${selectedTime === 'week' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                Week
              </button>
              <button 
                onClick={() => setSelectedTime('month')}
                className={`px-3 py-1 rounded-lg transition-all ${selectedTime === 'month' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                Month
              </button>
              <button 
                onClick={() => setSelectedTime('year')}
                className={`px-3 py-1 rounded-lg transition-all ${selectedTime === 'year' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                Year
              </button>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700/30 rounded-xl">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto" />
              <p className="text-sm text-gray-400 mt-2">Revenue Chart</p>
              <p className="text-xs text-gray-400">Daily | Monthly | Yearly</p>
              <div className="flex gap-4 mt-2 text-xs">
                <span className="text-emerald-600">↑ ₹12,500 Today</span>
                <span className="text-blue-600">↑ ₹3,42,000 Month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Status Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-purple-500" />
            Order Status
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-center">
              <p className="text-2xl font-bold text-emerald-600">{stats.completedOrders}</p>
              <p className="text-xs text-gray-500">Completed</p>
              <div className="w-full h-1 bg-emerald-200 rounded-full mt-2">
                <div className="w-3/4 h-full bg-emerald-500 rounded-full"></div>
              </div>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl text-center">
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</p>
              <p className="text-xs text-gray-500">Pending</p>
              <div className="w-full h-1 bg-yellow-200 rounded-full mt-2">
                <div className="w-1/4 h-full bg-yellow-500 rounded-full"></div>
              </div>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center">
              <p className="text-2xl font-bold text-blue-600">8</p>
              <p className="text-xs text-gray-500">Processing</p>
              <div className="w-full h-1 bg-blue-200 rounded-full mt-2">
                <div className="w-1/5 h-full bg-blue-500 rounded-full"></div>
              </div>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl text-center">
              <p className="text-2xl font-bold text-red-600">{stats.cancelledOrders}</p>
              <p className="text-xs text-gray-500">Cancelled</p>
              <div className="w-full h-1 bg-red-200 rounded-full mt-2">
                <div className="w-1/6 h-full bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Best Selling Products & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Best Selling Products */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Best Selling Products
          </h3>
          <div className="space-y-2">
            {bestSellers.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-400 w-6">{index + 1}</span>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white text-sm">{product.name}</p>
                    <p className="text-xs text-gray-400">{product.sales} sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">₹{product.revenue.toLocaleString()}</span>
                  <p className="text-xs text-emerald-500">{product.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              Recent Orders
            </h3>
            <button className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700">
                  <th className="pb-2 font-medium">Order</th>
                  <th className="pb-2 font-medium">Customer</th>
                  <th className="pb-2 font-medium">Amount</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 dark:border-gray-700/50 last:border-0">
                    <td className="py-2 text-xs font-medium text-gray-800 dark:text-white">{order.id}</td>
                    <td className="py-2 text-xs text-gray-600 dark:text-gray-300">{order.customer}</td>
                    <td className="py-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">₹{order.amount}</td>
                    <td className="py-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Supplier Performance & Customer Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <Truck className="w-5 h-5 text-teal-500" />
            Supplier Performance
          </h3>
          <div className="space-y-2">
            {[
              { name: 'Himachal Farms', orders: 45, rating: 4.9, delivery: '98%' },
              { name: 'Punjab Mills', orders: 38, rating: 4.7, delivery: '95%' },
              { name: 'Tamil Nadu Spices', orders: 32, rating: 4.8, delivery: '97%' },
              { name: 'Maharashtra Organic', orders: 28, rating: 4.5, delivery: '92%' },
            ].map((supplier, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white text-sm">{supplier.name}</p>
                  <p className="text-xs text-gray-400">{supplier.orders} orders</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-emerald-600">{supplier.rating} ★</p>
                  <p className="text-xs text-gray-400">Delivery: {supplier.delivery}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            Customer Growth
          </h3>
          <div className="h-48 flex items-center justify-center bg-gray-50 dark:bg-gray-700/30 rounded-xl">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-emerald-500 mx-auto" />
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.totalCustomers}</p>
              <p className="text-sm text-gray-400">Total Customers</p>
              <p className="text-xs text-emerald-500">↑ 15% growth this month</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="text-center p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
              <p className="text-sm font-bold text-emerald-600">+12</p>
              <p className="text-[10px] text-gray-500">New Today</p>
            </div>
            <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <p className="text-sm font-bold text-blue-600">+89</p>
              <p className="text-[10px] text-gray-500">This Week</p>
            </div>
            <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <p className="text-sm font-bold text-purple-600">+345</p>
              <p className="text-[10px] text-gray-500">This Month</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardOverview;