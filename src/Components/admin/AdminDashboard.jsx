// src/Components/admin/AdminDashboard.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingBag, Users, Truck, 
  ShoppingCart, BarChart3, Settings, LogOut, Menu, X,
  TrendingUp, TrendingDown, AlertCircle, CheckCircle,
  DollarSign, Calendar, Clock, Star, UserPlus, Award,
  Zap, Sparkles, Search, Bell, Mail, Sun, Moon, Tag,
  Percent, Warehouse, MapPin, CreditCard, FileText,
  PieChart, Shield, UserCog, Gift, BellRing, Key, Database,
  ClipboardList, ClipboardCheck, Truck as TruckIcon,
  Store, Users as UsersIcon, Heart, Coffee, Package as PackageIcon
} from 'lucide-react';

// Import ALL inventory components
import DashboardOverview from './inventory/DashboardOverview';
import ProductManagement from './inventory/ProductManagement';
import CategoryManagement from './inventory/CategoryManagement';
// import InventoryManagement from './inventory/InventoryManagement';
// import SupplierManagement from './inventory/SupplierManagement';
// import PurchaseManagement from './inventory/PurchaseManagement';
// import OrderManagement from './inventory/OrderManagement';
// import CustomerManagement from './inventory/CustomerManagement';
// import PricingManagement from './inventory/PricingManagement';
// import WarehouseManagement from './inventory/WarehouseManagement';
// import DeliveryManagement from './inventory/DeliveryManagement';
// import PaymentManagement from './inventory/PaymentManagement';
// import ReportsAnalytics from './inventory/ReportsAnalytics';
// import UserRoleManagement from './inventory/UserRoleManagement';
// import NotificationSystem from './inventory/NotificationSystem';
// import SecurityFeatures from './inventory/SecurityFeatures';
// import SettingsPage from './inventory/Settings';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('adminNotifications');
    if (saved) {
      try {
        setNotifications(JSON.parse(saved));
      } catch (e) {
        setNotifications(getSampleNotifications());
      }
    } else {
      setNotifications(getSampleNotifications());
    }
  }, []);

  const getSampleNotifications = () => [
    { id: 1, title: 'New Order #ORD-001', time: '5 min ago', type: 'order', read: false },
    { id: 2, title: 'Low Stock: Fresh Apples', time: '15 min ago', type: 'inventory', read: false },
    { id: 3, title: 'Payment Received ₹1,200', time: '1 hour ago', type: 'payment', read: false },
    { id: 4, title: 'Supplier Payment Due', time: '2 hours ago', type: 'supplier', read: false },
  ];

  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
    { id: 'products', icon: <Package className="w-5 h-5" />, label: 'Products' },
    { id: 'categories', icon: <Tag className="w-5 h-5" />, label: 'Categories' },
    { id: 'inventory', icon: <ClipboardList className="w-5 h-5" />, label: 'Inventory' },
    { id: 'suppliers', icon: <Truck className="w-5 h-5" />, label: 'Suppliers' },
    { id: 'purchase', icon: <ShoppingCart className="w-5 h-5" />, label: 'Purchase' },
    { id: 'orders', icon: <ShoppingBag className="w-5 h-5" />, label: 'Orders' },
    { id: 'customers', icon: <Users className="w-5 h-5" />, label: 'Customers' },
    { id: 'pricing', icon: <Percent className="w-5 h-5" />, label: 'Pricing & Discount' },
    { id: 'warehouse', icon: <Warehouse className="w-5 h-5" />, label: 'Warehouse' },
    { id: 'delivery', icon: <TruckIcon className="w-5 h-5" />, label: 'Delivery' },
    { id: 'payments', icon: <CreditCard className="w-5 h-5" />, label: 'Payments' },
    { id: 'reports', icon: <BarChart3 className="w-5 h-5" />, label: 'Reports' },
    { id: 'users', icon: <UserCog className="w-5 h-5" />, label: 'User & Role' },
    { id: 'notifications', icon: <BellRing className="w-5 h-5" />, label: 'Notifications' },
    { id: 'security', icon: <Shield className="w-5 h-5" />, label: 'Security' },
    { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  ];

  const renderContent = () => {
    switch(activeMenu) {
      case 'dashboard': return <DashboardOverview />;
      case 'products': return <ProductManagement />;
      case 'categories': return <CategoryManagement />;
    //   case 'inventory': return <InventoryManagement />;
    //   case 'suppliers': return <SupplierManagement />;
    //   case 'purchase': return <PurchaseManagement />;
    //   case 'orders': return <OrderManagement />;
    //   case 'customers': return <CustomerManagement />;
    //   case 'pricing': return <PricingManagement />;
    //   case 'warehouse': return <WarehouseManagement />;
    //   case 'delivery': return <DeliveryManagement />;
    //   case 'payments': return <PaymentManagement />;
    //   case 'reports': return <ReportsAnalytics />;
    //   case 'users': return <UserRoleManagement />;
    //   case 'notifications': return <NotificationSystem />;
    //   case 'security': return <SecurityFeatures />;
    //   case 'settings': return <SettingsPage />;
      default: return <DashboardOverview />;
    }
  };

  const getMenuLabel = () => {
    const found = menuItems.find(m => m.id === activeMenu);
    return found ? found.label : 'Dashboard';
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* ============================================================ */}
      {/* FIXED LAYOUT: Sidebar + Main Content WITH MARGIN TOP */}
      {/* ============================================================ */}
      <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 pt-16 lg:pt-16">
        
        {/* ===== SIDEBAR - FIXED (Never Scrolls) ===== */}
        <div 
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-2xl transition-transform duration-300 mt-16 lg:mt-16 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 lg:static lg:flex-shrink-0`}
        >
          {/* Sidebar Content - Scrollable inside */}
          <div className="flex flex-col h-full">
            
            {/* Logo - Fixed at top */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center">
                  <Store className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-800 dark:text-white">Admin Panel</h1>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500">Grocery Items</p>
                </div>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            {/* Menu - Scrollable */}
            <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 text-sm ${
                    activeMenu === item.id
                      ? 'bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 text-emerald-700 dark:text-emerald-400 shadow-lg shadow-emerald-100/50'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                  {activeMenu === item.id && (
                    <div className="ml-auto w-1 h-6 bg-emerald-500 rounded-full"></div>
                  )}
                </button>
              ))}

              {/* Logout - Fixed at bottom */}
              <div className="pt-1 mt-2 border-t border-gray-100 dark:border-gray-700">
                <button
                  onClick={() => navigate('/login')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 text-sm"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </nav>
          </div>
        </div>

        {/* ===== OVERLAY FOR MOBILE ===== */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden mt-16"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ===== MAIN CONTENT ===== */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          
          {/* Header - FIXED at top */}
          <header className="sticky top-0 z-40 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b border-gray-100 dark:border-gray-700 px-4 py-3 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                <div>
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                    {getMenuLabel()}
                  </h2>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
                <div className="relative">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    {notifications.filter(n => !n.read).length > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[8px] rounded-full flex items-center justify-center">
                        {notifications.filter(n => !n.read).length}
                      </span>
                    )}
                  </button>
                </div>
                <button onClick={() => setDarkMode(!darkMode)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-500" />}
                </button>
                <button className="flex items-center gap-2 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    A
                  </div>
                </button>
              </div>
            </div>
          </header>

          {/* Content - Scrollable */}
          <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;