// src/Components/admin/inventory/InventoryManagement.jsx

import React, { useState, useEffect } from 'react';
import {
  Package, Search, Plus, Edit, Trash2, Eye, Download, Upload,
  Filter, RefreshCw, AlertCircle, CheckCircle, XCircle,
  TrendingUp, TrendingDown, BarChart3, Layers, Box,
  Warehouse, Truck, Clock, Calendar, DollarSign,
  Archive, X, ChevronDown, MoreVertical, Printer,
  FileSpreadsheet, FileJson, Hash, Tag, Copy,
  Move, Split, Merge, Scissors, GitBranch,
  TrendingUp as TrendUp, TrendingDown as TrendDown,
  Activity, Zap, Bell, BellRing, ShoppingBag,
  ArrowUpCircle, ArrowDownCircle, Repeat, Settings,
  Eye as ViewIcon, Pencil, Trash, Grid, List,
  ArrowUpRight, ArrowDownRight, Minus, Plus as PlusIcon,
  AlertTriangle, Shield, ShieldAlert, ShieldCheck,
  Building2, MapPin, Layers as LayersIcon, Boxes,
  PackageOpen, PackageCheck, PackageX, PackageSearch
} from 'lucide-react';

// Import product data
import { products as freshProducts } from '../../data/FreshProductsData';
import { products as kitchenProducts } from '../../data/KitchenEssentialsData';
import { products as spicesProducts } from '../../data/SpicesAndDryFruitsData';
import { products as dairyProducts } from '../../data/DairyProductsAndSnacksData';

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedWarehouse, setSelectedWarehouse] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [showStockInModal, setShowStockInModal] = useState(false);
  const [showStockOutModal, setShowStockOutModal] = useState(false);
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [showExpiryModal, setShowExpiryModal] = useState(false);
  const [showValuationModal, setShowValuationModal] = useState(false);
  const [showAlertsModal, setShowAlertsModal] = useState(false);
  const [showWarehouseModal, setShowWarehouseModal] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [stockHistory, setStockHistory] = useState([]);
  const [batches, setBatches] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [warehouses, setWarehouses] = useState([
    { id: 'WH-001', name: 'Warehouse A - Main', location: 'Mumbai', capacity: 10000, used: 6500 },
    { id: 'WH-002', name: 'Warehouse B - North', location: 'Delhi', capacity: 8000, used: 4200 },
    { id: 'WH-003', name: 'Warehouse C - South', location: 'Chennai', capacity: 6000, used: 3800 },
    { id: 'WH-004', name: 'Warehouse D - East', location: 'Kolkata', capacity: 5000, used: 2900 },
    { id: 'WH-005', name: 'Warehouse E - West', location: 'Ahmedabad', capacity: 4000, used: 2100 }
  ]);
  const [valuation, setValuation] = useState({
    totalValue: 0,
    totalCost: 0,
    totalRetail: 0,
    potentialProfit: 0,
    byCategory: {},
    byWarehouse: {}
  });

  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    category: '',
    quantity: 0,
    minStock: 10,
    maxStock: 100,
    location: 'Warehouse A - Main',
    aisle: 'A1',
    shelf: 'S1',
    unit: 'kg',
    status: 'in-stock',
    batchNumber: '',
    expiryDate: '',
    supplier: '',
    costPrice: 0,
    sellingPrice: 0,
    notes: '',
    reorderLevel: 10,
    reorderQuantity: 50,
    lastStockIn: '',
    lastStockOut: '',
    totalStockIn: 0,
    totalStockOut: 0
  });

  const locations = ['Aisle A', 'Aisle B', 'Aisle C', 'Aisle D', 'Aisle E'];
  const statuses = ['in-stock', 'low-stock', 'out-of-stock', 'overstock', 'discontinued'];
  const units = ['kg', 'g', 'lb', 'oz', 'piece', 'packet', 'box', 'bottle', 'litre', 'ml'];

  useEffect(() => {
    loadInventory();
    generateAlerts();
  }, []);

  const loadInventory = () => {
    const allProducts = getAllProducts();
    const purchaseData = JSON.parse(localStorage.getItem('purchaseData') || '[]');
    const saleData = JSON.parse(localStorage.getItem('saleData') || '[]');

    const inventoryData = allProducts.map(product => {
      const totalPurchased = purchaseData
        .filter(p => p.productId === product.id)
        .reduce((sum, p) => sum + p.quantity, 0);
      const totalSold = saleData
        .filter(s => s.productId === product.id)
        .reduce((sum, s) => sum + s.quantity, 0);
      const currentStock = totalPurchased - totalSold;

      let status = 'in-stock';
      if (currentStock <= 0) status = 'out-of-stock';
      else if (currentStock < 10) status = 'low-stock';
      else if (currentStock > 100) status = 'overstock';

      return {
        id: `INV-${product.id}`,
        productId: product.id,
        productName: product.name,
        category: product.category,
        quantity: Math.max(0, currentStock),
        minStock: 10,
        maxStock: 100,
        location: warehouses[Math.floor(Math.random() * warehouses.length)].name,
        aisle: locations[Math.floor(Math.random() * locations.length)],
        shelf: `S${Math.floor(Math.random() * 5) + 1}`,
        unit: product.unit || 'kg',
        status: status,
        batchNumber: `BATCH-${Date.now()}`,
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        supplier: product.supplier || 'Local Supplier',
        costPrice: product.costPrice || Math.round(product.price * 0.6),
        sellingPrice: product.price || 0,
        notes: '',
        reorderLevel: 10,
        reorderQuantity: 50,
        lastStockIn: new Date().toISOString(),
        lastStockOut: new Date().toISOString(),
        totalStockIn: totalPurchased,
        totalStockOut: totalSold,
        lastUpdated: new Date().toISOString()
      };
    });

    setInventory(inventoryData);
    setFilteredInventory(inventoryData);
    calculateValuation(inventoryData);
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

  const calculateValuation = (data) => {
    let totalValue = 0;
    let totalCost = 0;
    let totalRetail = 0;
    const byCategory = {};
    const byWarehouse = {};

    data.forEach(item => {
      const value = item.quantity * item.costPrice;
      const retail = item.quantity * item.sellingPrice;
      
      totalValue += value;
      totalCost += item.quantity * item.costPrice;
      totalRetail += retail;

      if (!byCategory[item.category]) {
        byCategory[item.category] = { value: 0, quantity: 0 };
      }
      byCategory[item.category].value += value;
      byCategory[item.category].quantity += item.quantity;

      if (!byWarehouse[item.location]) {
        byWarehouse[item.location] = { value: 0, quantity: 0 };
      }
      byWarehouse[item.location].value += value;
      byWarehouse[item.location].quantity += item.quantity;
    });

    setValuation({
      totalValue,
      totalCost,
      totalRetail,
      potentialProfit: totalRetail - totalCost,
      byCategory,
      byWarehouse
    });
  };

  const generateAlerts = () => {
    const newAlerts = [];
    
    inventory.forEach(item => {
      // Low Stock Alert
      if (item.status === 'low-stock') {
        newAlerts.push({
          id: `alert-low-${item.id}`,
          type: 'low-stock',
          severity: 'warning',
          title: 'Low Stock Alert',
          message: `${item.productName} is running low (${item.quantity} ${item.unit} remaining)`,
          product: item.productName,
          timestamp: new Date().toISOString(),
          read: false,
          icon: <AlertCircle className="w-5 h-5 text-yellow-500" />
        });
      }
      
      // Out of Stock Alert
      if (item.status === 'out-of-stock') {
        newAlerts.push({
          id: `alert-out-${item.id}`,
          type: 'out-of-stock',
          severity: 'critical',
          title: 'Out of Stock Alert',
          message: `${item.productName} is completely out of stock`,
          product: item.productName,
          timestamp: new Date().toISOString(),
          read: false,
          icon: <XCircle className="w-5 h-5 text-red-500" />
        });
      }
      
      // Overstock Alert
      if (item.status === 'overstock') {
        newAlerts.push({
          id: `alert-over-${item.id}`,
          type: 'overstock',
          severity: 'info',
          title: 'Overstock Alert',
          message: `${item.productName} has excess stock (${item.quantity} ${item.unit})`,
          product: item.productName,
          timestamp: new Date().toISOString(),
          read: false,
          icon: <TrendingUp className="w-5 h-5 text-blue-500" />
        });
      }

      // Expiry Alert
      if (item.expiryDate) {
        const daysUntilExpiry = Math.ceil((new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
        if (daysUntilExpiry <= 7 && daysUntilExpiry > 0) {
          newAlerts.push({
            id: `alert-expiry-${item.id}`,
            type: 'expiry',
            severity: 'warning',
            title: 'Expiry Alert',
            message: `${item.productName} expires in ${daysUntilExpiry} days`,
            product: item.productName,
            timestamp: new Date().toISOString(),
            read: false,
            icon: <Calendar className="w-5 h-5 text-orange-500" />
          });
        }
      }
    });

    setAlerts(newAlerts);
  };

  useEffect(() => {
    let filtered = inventory;
    
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(item => item.status === selectedStatus);
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    if (selectedWarehouse !== 'all') {
      filtered = filtered.filter(item => item.location === selectedWarehouse);
    }
    
    setFilteredInventory(filtered);
  }, [searchTerm, selectedStatus, selectedCategory, selectedWarehouse, inventory]);

  const getStatusColor = (status) => {
    const colors = {
      'in-stock': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      'low-stock': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      'out-of-stock': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      'overstock': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      'discontinued': 'bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-400'
    };
    return colors[status] || colors['in-stock'];
  };

  const getStatusIcon = (status) => {
    const icons = {
      'in-stock': <CheckCircle className="w-4 h-4 text-emerald-500" />,
      'low-stock': <AlertCircle className="w-4 h-4 text-yellow-500" />,
      'out-of-stock': <XCircle className="w-4 h-4 text-red-500" />,
      'overstock': <TrendingUp className="w-4 h-4 text-blue-500" />,
      'discontinued': <Archive className="w-4 h-4 text-gray-500" />
    };
    return icons[status] || icons['in-stock'];
  };

  const handleStockIn = (itemId, quantity, batchNumber, expiryDate) => {
    setInventory(inventory.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + quantity;
        let newStatus = 'in-stock';
        if (newQuantity <= 0) newStatus = 'out-of-stock';
        else if (newQuantity < item.minStock) newStatus = 'low-stock';
        else if (newQuantity > item.maxStock) newStatus = 'overstock';

        const historyEntry = {
          id: `history-${Date.now()}`,
          productId: item.productId,
          productName: item.productName,
          type: 'stock-in',
          quantity: quantity,
          batchNumber: batchNumber || item.batchNumber,
          expiryDate: expiryDate || item.expiryDate,
          timestamp: new Date().toISOString(),
          note: `Stock in - ${quantity} ${item.unit}`
        };
        setStockHistory([historyEntry, ...stockHistory]);

        if (batchNumber) {
          const newBatch = {
            id: `batch-${Date.now()}`,
            productId: item.productId,
            productName: item.productName,
            batchNumber: batchNumber,
            quantity: quantity,
            remaining: quantity,
            expiryDate: expiryDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            created: new Date().toISOString(),
            status: 'active'
          };
          setBatches([newBatch, ...batches]);
        }

        return {
          ...item,
          quantity: newQuantity,
          status: newStatus,
          totalStockIn: item.totalStockIn + quantity,
          lastStockIn: new Date().toISOString(),
          lastUpdated: new Date().toISOString()
        };
      }
      return item;
    }));
    setShowStockInModal(false);
    generateAlerts();
    calculateValuation(inventory);
  };

  const handleStockOut = (itemId, quantity) => {
    setInventory(inventory.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(0, item.quantity - quantity);
        let newStatus = 'in-stock';
        if (newQuantity <= 0) newStatus = 'out-of-stock';
        else if (newQuantity < item.minStock) newStatus = 'low-stock';
        else if (newQuantity > item.maxStock) newStatus = 'overstock';

        const historyEntry = {
          id: `history-${Date.now()}`,
          productId: item.productId,
          productName: item.productName,
          type: 'stock-out',
          quantity: quantity,
          timestamp: new Date().toISOString(),
          note: `Stock out - ${quantity} ${item.unit}`
        };
        setStockHistory([historyEntry, ...stockHistory]);

        setBatches(batches.map(batch => {
          if (batch.productId === item.productId && batch.remaining > 0) {
            const used = Math.min(quantity, batch.remaining);
            return {
              ...batch,
              remaining: batch.remaining - used,
              status: batch.remaining - used <= 0 ? 'exhausted' : 'active'
            };
          }
          return batch;
        }));

        return {
          ...item,
          quantity: newQuantity,
          status: newStatus,
          totalStockOut: item.totalStockOut + quantity,
          lastStockOut: new Date().toISOString(),
          lastUpdated: new Date().toISOString()
        };
      }
      return item;
    }));
    setShowStockOutModal(false);
    generateAlerts();
    calculateValuation(inventory);
  };

  const handleAdjustStock = (itemId, adjustment, reason) => {
    setInventory(inventory.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(0, item.quantity + adjustment);
        let newStatus = 'in-stock';
        if (newQuantity <= 0) newStatus = 'out-of-stock';
        else if (newQuantity < item.minStock) newStatus = 'low-stock';
        else if (newQuantity > item.maxStock) newStatus = 'overstock';

        const historyEntry = {
          id: `history-${Date.now()}`,
          productId: item.productId,
          productName: item.productName,
          type: 'adjustment',
          quantity: adjustment,
          timestamp: new Date().toISOString(),
          note: reason || `Adjustment - ${adjustment > 0 ? '+' : ''}${adjustment} ${item.unit}`
        };
        setStockHistory([historyEntry, ...stockHistory]);

        return {
          ...item,
          quantity: newQuantity,
          status: newStatus,
          lastUpdated: new Date().toISOString()
        };
      }
      return item;
    }));
    setShowAdjustModal(false);
    generateAlerts();
    calculateValuation(inventory);
  };

  const handleTransfer = (productId, fromWarehouse, toWarehouse, quantity) => {
    const fromItem = inventory.find(item => 
      item.productId === productId && item.location === fromWarehouse
    );
    if (!fromItem) return;

    handleStockOut(fromItem.id, quantity);

    const existingInTarget = inventory.find(item => 
      item.productId === productId && item.location === toWarehouse
    );

    if (existingInTarget) {
      handleStockIn(existingInTarget.id, quantity);
    } else {
      const newItem = {
        ...fromItem,
        id: `INV-${Date.now()}`,
        location: toWarehouse,
        quantity: quantity,
        status: 'in-stock',
        lastUpdated: new Date().toISOString()
      };
      setInventory([newItem, ...inventory]);
    }

    setShowTransferModal(false);
  };

  const handleAddItem = () => {
    const newItem = {
      id: `INV-${Date.now()}`,
      ...formData,
      totalStockIn: formData.quantity,
      totalStockOut: 0,
      lastStockIn: new Date().toISOString(),
      lastStockOut: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };
    setInventory([newItem, ...inventory]);
    setShowAddModal(false);
    resetForm();
    calculateValuation([newItem, ...inventory]);
  };

  const handleEditItem = () => {
    setInventory(inventory.map(item =>
      item.id === selectedItem.id ? { ...item, ...formData, lastUpdated: new Date().toISOString() } : item
    ));
    setShowEditModal(false);
    resetForm();
    calculateValuation(inventory);
  };

  const handleDeleteItem = () => {
    setInventory(inventory.filter(item => item.id !== selectedItem.id));
    setShowDeleteModal(false);
    setSelectedItem(null);
    calculateValuation(inventory);
  };

  const resetForm = () => {
    setFormData({
      productId: '',
      productName: '',
      category: '',
      quantity: 0,
      minStock: 10,
      maxStock: 100,
      location: 'Warehouse A - Main',
      aisle: 'A1',
      shelf: 'S1',
      unit: 'kg',
      status: 'in-stock',
      batchNumber: '',
      expiryDate: '',
      supplier: '',
      costPrice: 0,
      sellingPrice: 0,
      notes: '',
      reorderLevel: 10,
      reorderQuantity: 50,
      lastStockIn: '',
      lastStockOut: '',
      totalStockIn: 0,
      totalStockOut: 0
    });
  };

  const exportInventory = (format) => {
    const data = filteredInventory.map(item => ({
      'ID': item.id,
      'Product': item.productName,
      'Category': item.category,
      'Quantity': item.quantity,
      'Min Stock': item.minStock,
      'Max Stock': item.maxStock,
      'Status': item.status,
      'Location': item.location,
      'Aisle': item.aisle,
      'Shelf': item.shelf,
      'Unit': item.unit,
      'Batch': item.batchNumber,
      'Expiry': item.expiryDate,
      'Supplier': item.supplier,
      'Cost Price': item.costPrice,
      'Selling Price': item.sellingPrice,
      'Total Stock In': item.totalStockIn,
      'Total Stock Out': item.totalStockOut
    }));

    console.log(`Exporting to ${format}:`, data);
    setShowBulkImport(false);
  };

  const importInventory = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    console.log('Importing file:', file.name);
    setShowBulkImport(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Inventory Management</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Track every product in real time</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowAlertsModal(true)}
            className="relative px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-all flex items-center gap-2 text-sm font-medium"
          >
            <Bell className="w-4 h-4" />
            Alerts
            {alerts.filter(a => !a.read).length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {alerts.filter(a => !a.read).length}
              </span>
            )}
          </button>
          <button
            onClick={() => setShowValuationModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all flex items-center gap-2 text-sm font-medium"
          >
            <DollarSign className="w-4 h-4" />
            Valuation
          </button>
          <button
            onClick={() => setShowWarehouseModal(true)}
            className="px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-all flex items-center gap-2 text-sm font-medium"
          >
            <Building2 className="w-4 h-4" />
            Warehouses
          </button>
          <button
            onClick={() => setShowAvailabilityModal(true)}
            className="px-4 py-2 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-all flex items-center gap-2 text-sm font-medium"
          >
            <PackageSearch className="w-4 h-4" />
            Availability
          </button>
          <button
            onClick={() => setShowBulkImport(true)}
            className="px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-all flex items-center gap-2 text-sm font-medium"
          >
            <Upload className="w-4 h-4" />
            Import
          </button>
          <button
            onClick={() => exportInventory('excel')}
            className="px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all flex items-center gap-2 text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={() => { setShowAddModal(true); resetForm(); }}
            className="px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all flex items-center gap-2 text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Stock
          </button>
        </div>
      </div>

      {/* Stats Summary - Current Stock */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-400">Total Items</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{inventory.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-400">Total Stock</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            {inventory.reduce((sum, item) => sum + item.quantity, 0)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-400">Inventory Value</p>
          <p className="text-2xl font-bold text-emerald-600">₹{valuation.totalValue.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-400">Potential Revenue</p>
          <p className="text-2xl font-bold text-blue-600">₹{valuation.totalRetail.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-400">Profit Margin</p>
          <p className="text-2xl font-bold text-purple-600">
            {valuation.totalRetail > 0 ? Math.round((valuation.potentialProfit / valuation.totalRetail) * 100) : 0}%
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <AlertCircle className="w-3 h-3 text-yellow-500" />
            Low Stock
          </p>
          <p className="text-2xl font-bold text-yellow-600">{inventory.filter(i => i.status === 'low-stock').length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <XCircle className="w-3 h-3 text-red-500" />
            Out of Stock
          </p>
          <p className="text-2xl font-bold text-red-600">{inventory.filter(i => i.status === 'out-of-stock').length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-blue-500" />
            Overstock
          </p>
          <p className="text-2xl font-bold text-blue-600">{inventory.filter(i => i.status === 'overstock').length}</p>
        </div>
      </div>

      {/* Quick Actions - Stock In/Out/Transfer/Adjust */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => { setSelectedItem(null); setShowStockInModal(true); }}
            className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl hover:bg-emerald-100 transition-all flex items-center gap-2 text-sm font-medium"
          >
            <ArrowUpCircle className="w-4 h-4" />
            Stock In
          </button>
          <button
            onClick={() => { setSelectedItem(null); setShowStockOutModal(true); }}
            className="px-4 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 transition-all flex items-center gap-2 text-sm font-medium"
          >
            <ArrowDownCircle className="w-4 h-4" />
            Stock Out
          </button>
          <button
            onClick={() => { setSelectedItem(null); setShowTransferModal(true); }}
            className="px-4 py-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl hover:bg-purple-100 transition-all flex items-center gap-2 text-sm font-medium"
          >
            <Move className="w-4 h-4" />
            Transfer
          </button>
          <button
            onClick={() => { setSelectedItem(null); setShowAdjustModal(true); }}
            className="px-4 py-2 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-xl hover:bg-yellow-100 transition-all flex items-center gap-2 text-sm font-medium"
          >
            <Settings className="w-4 h-4" />
            Adjust
          </button>
          <button
            onClick={() => setShowBatchModal(true)}
            className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl hover:bg-indigo-100 transition-all flex items-center gap-2 text-sm font-medium"
          >
            <Hash className="w-4 h-4" />
            Batches
          </button>
          <button
            onClick={() => setShowExpiryModal(true)}
            className="px-4 py-2 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-xl hover:bg-orange-100 transition-all flex items-center gap-2 text-sm font-medium"
          >
            <Calendar className="w-4 h-4" />
            Expiry Tracking
          </button>
          <button
            onClick={() => setShowAvailabilityModal(true)}
            className="px-4 py-2 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-xl hover:bg-cyan-100 transition-all flex items-center gap-2 text-sm font-medium"
          >
            <PackageSearch className="w-4 h-4" />
            Availability
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search inventory by product name, category, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-700/30 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-700/30 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            >
              <option value="all">All Status</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
              <option value="overstock">Overstock</option>
            </select>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-700/30 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            >
              <option value="all">All Categories</option>
              <option value="Fresh Vegetables">Fresh Vegetables</option>
              <option value="Fresh Fruits">Fresh Fruits</option>
              <option value="Dairy & Eggs">Dairy & Eggs</option>
              <option value="Spices & Dry Fruits">Spices & Dry Fruits</option>
            </select>

            <select
              value={selectedWarehouse}
              onChange={(e) => setSelectedWarehouse(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-700/30 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            >
              <option value="all">All Warehouses</option>
              {warehouses.map(wh => (
                <option key={wh.id} value={wh.name}>{wh.name}</option>
              ))}
            </select>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' : 'text-gray-400 hover:bg-gray-100'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' : 'text-gray-400 hover:bg-gray-100'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={loadInventory}
              className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            >
              <RefreshCw className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Inventory Grid/List View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredInventory.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                      <Package className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white text-sm truncate max-w-[150px]">
                        {item.productName}
                      </h3>
                      <p className="text-xs text-gray-400">{item.id}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(item.status)}`}>
                    {getStatusIcon(item.status)}
                    {item.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-gray-400">Quantity</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-white">{item.quantity} {item.unit}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Value</p>
                    <p className="text-lg font-bold text-emerald-600">₹{(item.quantity * item.costPrice).toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-2 flex flex-wrap gap-1">
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">{item.category}</span>
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">{item.location}</span>
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">Batch: {item.batchNumber}</span>
                </div>

                <div className="mt-3 flex items-center gap-1">
                  <button
                    onClick={() => { setSelectedItem(item); setShowStockInModal(true); }}
                    className="flex-1 px-2 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-lg text-xs hover:bg-emerald-100 transition-all"
                  >
                    <ArrowUpCircle className="w-3 h-3 inline mr-1" />
                    In
                  </button>
                  <button
                    onClick={() => { setSelectedItem(item); setShowStockOutModal(true); }}
                    className="flex-1 px-2 py-1 bg-red-50 dark:bg-red-900/30 text-red-600 rounded-lg text-xs hover:bg-red-100 transition-all"
                  >
                    <ArrowDownCircle className="w-3 h-3 inline mr-1" />
                    Out
                  </button>
                  <button
                    onClick={() => { setSelectedItem(item); setShowTransferModal(true); }}
                    className="flex-1 px-2 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-600 rounded-lg text-xs hover:bg-purple-100 transition-all"
                  >
                    <Move className="w-3 h-3 inline mr-1" />
                    Transfer
                  </button>
                  <button
                    onClick={() => { setSelectedItem(item); setShowAdjustModal(true); }}
                    className="flex-1 px-2 py-1 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 rounded-lg text-xs hover:bg-yellow-100 transition-all"
                  >
                    <Settings className="w-3 h-3 inline mr-1" />
                    Adjust
                  </button>
                </div>

                <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                  <div>
                    <span>In: {item.totalStockIn}</span>
                    <span className="mx-1">|</span>
                    <span>Out: {item.totalStockOut}</span>
                  </div>
                  <span>{new Date(item.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Product</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Quantity</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Value</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white text-sm">{item.productName}</p>
                        <p className="text-xs text-gray-400">{item.id}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{item.category}</td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-800 dark:text-white">{item.quantity} {item.unit}</p>
                      <p className="text-xs text-gray-400">Min: {item.minStock}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(item.status)}`}>
                        {getStatusIcon(item.status)}
                        {item.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-gray-600 dark:text-gray-300">{item.location}</p>
                      <p className="text-xs text-gray-400">{item.aisle} · {item.shelf}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-emerald-600">₹{(item.quantity * item.costPrice).toLocaleString()}</p>
                      <p className="text-xs text-gray-400">Cost: ₹{item.costPrice}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => { setSelectedItem(item); setShowStockInModal(true); }}
                          className="p-1 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg text-emerald-600"
                          title="Stock In"
                        >
                          <ArrowUpCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => { setSelectedItem(item); setShowStockOutModal(true); }}
                          className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-600"
                          title="Stock Out"
                        >
                          <ArrowDownCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => { setSelectedItem(item); setShowTransferModal(true); }}
                          className="p-1 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg text-purple-600"
                          title="Transfer"
                        >
                          <Move className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => { setSelectedItem(item); setShowAdjustModal(true); }}
                          className="p-1 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg text-yellow-600"
                          title="Adjust"
                        >
                          <Settings className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => { setSelectedItem(item); setShowEditModal(true); setFormData(item); }}
                          className="p-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg text-blue-600"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredInventory.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
          <Package className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">No inventory items found</p>
          <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
        </div>
      )}

      {/* ============================================ */}
      {/* ALL MODALS */}
      {/* ============================================ */}

      {/* Stock In Modal */}
      {showStockInModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <ArrowUpCircle className="w-5 h-5 text-emerald-500" />
                Stock In
              </h3>
              <button onClick={() => setShowStockInModal(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Product *
                </label>
                <select id="stockInProduct" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                  <option value="">Select product</option>
                  {inventory.map(item => (
                    <option key={item.id} value={item.id}>{item.productName} ({item.quantity} {item.unit})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Quantity *
                </label>
                <input
                  id="stockInQuantity"
                  type="number"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-700/30"
                  placeholder="Enter quantity"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Batch Number
                </label>
                <input
                  id="stockInBatch"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-700/30"
                  placeholder="Enter batch number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Expiry Date
                </label>
                <input
                  id="stockInExpiry"
                  type="date"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-700/30"
                />
              </div>
              <button
                onClick={() => {
                  const productSelect = document.getElementById('stockInProduct');
                  const quantityInput = document.getElementById('stockInQuantity');
                  const batchInput = document.getElementById('stockInBatch');
                  const expiryInput = document.getElementById('stockInExpiry');
                  
                  if (productSelect && quantityInput) {
                    const productId = productSelect.value;
                    const qty = parseInt(quantityInput.value);
                    const batch = batchInput?.value || `BATCH-${Date.now()}`;
                    const expiry = expiryInput?.value || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                    
                    if (productId && qty > 0) {
                      handleStockIn(productId, qty, batch, expiry);
                    }
                  }
                }}
                className="w-full px-6 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all font-medium"
              >
                Add Stock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stock Out Modal */}
      {showStockOutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <ArrowDownCircle className="w-5 h-5 text-red-500" />
                Stock Out
              </h3>
              <button onClick={() => setShowStockOutModal(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Product *
                </label>
                <select id="stockOutProduct" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                  <option value="">Select product</option>
                  {inventory.filter(i => i.quantity > 0).map(item => (
                    <option key={item.id} value={item.id}>{item.productName} ({item.quantity} {item.unit})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Quantity *
                </label>
                <input
                  id="stockOutQuantity"
                  type="number"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-700/30"
                  placeholder="Enter quantity"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Reason
                </label>
                <select id="stockOutReason" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                  <option value="sale">Sale</option>
                  <option value="damage">Damage</option>
                  <option value="return">Return</option>
                  <option value="transfer">Transfer</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <button
                onClick={() => {
                  const productSelect = document.getElementById('stockOutProduct');
                  const quantityInput = document.getElementById('stockOutQuantity');
                  
                  if (productSelect && quantityInput) {
                    const productId = productSelect.value;
                    const qty = parseInt(quantityInput.value);
                    
                    if (productId && qty > 0) {
                      handleStockOut(productId, qty);
                    }
                  }
                }}
                className="w-full px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all font-medium"
              >
                Remove Stock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transfer Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Move className="w-5 h-5 text-purple-500" />
                Stock Transfer
              </h3>
              <button onClick={() => setShowTransferModal(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Product *
                </label>
                <select id="transferProduct" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                  <option value="">Select product</option>
                  {inventory.filter(i => i.quantity > 0).map(item => (
                    <option key={item.id} value={item.id}>{item.productName} ({item.quantity} {item.unit})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  From Warehouse
                </label>
                <select id="transferFrom" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                  {warehouses.map(wh => (
                    <option key={wh.id} value={wh.name}>{wh.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  To Warehouse
                </label>
                <select id="transferTo" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                  {warehouses.map(wh => (
                    <option key={wh.id} value={wh.name}>{wh.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Quantity *
                </label>
                <input
                  id="transferQuantity"
                  type="number"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-700/30"
                  placeholder="Enter quantity"
                />
              </div>
              <button
                onClick={() => {
                  const productSelect = document.getElementById('transferProduct');
                  const fromSelect = document.getElementById('transferFrom');
                  const toSelect = document.getElementById('transferTo');
                  const quantityInput = document.getElementById('transferQuantity');
                  
                  if (productSelect && fromSelect && toSelect && quantityInput) {
                    const productId = productSelect.value;
                    const fromWarehouse = fromSelect.value;
                    const toWarehouse = toSelect.value;
                    const qty = parseInt(quantityInput.value);
                    
                    if (productId && qty > 0 && fromWarehouse !== toWarehouse) {
                      const item = inventory.find(i => i.productId === productId && i.location === fromWarehouse);
                      if (item) {
                        handleTransfer(productId, fromWarehouse, toWarehouse, qty);
                      }
                    }
                  }
                }}
                className="w-full px-6 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-all font-medium"
              >
                Transfer Stock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stock Adjustment Modal */}
      {showAdjustModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-yellow-500" />
                Stock Adjustment
              </h3>
              <button onClick={() => setShowAdjustModal(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Product *
                </label>
                <select id="adjustProduct" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                  <option value="">Select product</option>
                  {inventory.map(item => (
                    <option key={item.id} value={item.id}>{item.productName} ({item.quantity} {item.unit})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Adjustment Amount (+ add, - remove) *
                </label>
                <input
                  id="adjustAmount"
                  type="number"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-700/30"
                  placeholder="Enter adjustment amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Reason
                </label>
                <input
                  id="adjustReason"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-700/30"
                  placeholder="Reason for adjustment"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const productSelect = document.getElementById('adjustProduct');
                    const reasonInput = document.getElementById('adjustReason');
                    if (productSelect) {
                      const productId = productSelect.value;
                      if (productId) {
                        handleAdjustStock(productId, 1, reasonInput?.value || 'Quick +1 adjustment');
                      }
                    }
                  }}
                  className="flex-1 px-3 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-xl hover:bg-emerald-200 transition-all text-sm"
                >
                  +1
                </button>
                <button
                  onClick={() => {
                    const productSelect = document.getElementById('adjustProduct');
                    const reasonInput = document.getElementById('adjustReason');
                    if (productSelect) {
                      const productId = productSelect.value;
                      if (productId) {
                        handleAdjustStock(productId, 5, reasonInput?.value || 'Quick +5 adjustment');
                      }
                    }
                  }}
                  className="flex-1 px-3 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-xl hover:bg-emerald-200 transition-all text-sm"
                >
                  +5
                </button>
                <button
                  onClick={() => {
                    const productSelect = document.getElementById('adjustProduct');
                    const reasonInput = document.getElementById('adjustReason');
                    if (productSelect) {
                      const productId = productSelect.value;
                      if (productId) {
                        handleAdjustStock(productId, 10, reasonInput?.value || 'Quick +10 adjustment');
                      }
                    }
                  }}
                  className="flex-1 px-3 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-xl hover:bg-emerald-200 transition-all text-sm"
                >
                  +10
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const productSelect = document.getElementById('adjustProduct');
                    const reasonInput = document.getElementById('adjustReason');
                    if (productSelect) {
                      const productId = productSelect.value;
                      if (productId) {
                        handleAdjustStock(productId, -1, reasonInput?.value || 'Quick -1 adjustment');
                      }
                    }
                  }}
                  className="flex-1 px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-xl hover:bg-red-200 transition-all text-sm"
                >
                  -1
                </button>
                <button
                  onClick={() => {
                    const productSelect = document.getElementById('adjustProduct');
                    const reasonInput = document.getElementById('adjustReason');
                    if (productSelect) {
                      const productId = productSelect.value;
                      if (productId) {
                        handleAdjustStock(productId, -5, reasonInput?.value || 'Quick -5 adjustment');
                      }
                    }
                  }}
                  className="flex-1 px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-xl hover:bg-red-200 transition-all text-sm"
                >
                  -5
                </button>
                <button
                  onClick={() => {
                    const productSelect = document.getElementById('adjustProduct');
                    const reasonInput = document.getElementById('adjustReason');
                    if (productSelect) {
                      const productId = productSelect.value;
                      if (productId) {
                        handleAdjustStock(productId, -10, reasonInput?.value || 'Quick -10 adjustment');
                      }
                    }
                  }}
                  className="flex-1 px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-xl hover:bg-red-200 transition-all text-sm"
                >
                  -10
                </button>
              </div>
              <button
                onClick={() => {
                  const productSelect = document.getElementById('adjustProduct');
                  const amountInput = document.getElementById('adjustAmount');
                  const reasonInput = document.getElementById('adjustReason');
                  
                  if (productSelect && amountInput) {
                    const productId = productSelect.value;
                    const adj = parseInt(amountInput.value);
                    if (productId && !isNaN(adj) && adj !== 0) {
                      handleAdjustStock(productId, adj, reasonInput?.value || 'Manual adjustment');
                    }
                  }
                }}
                className="w-full px-6 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-all font-medium"
              >
                Apply Adjustment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Batch Management Modal */}
      {showBatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Hash className="w-5 h-5 text-indigo-500" />
                Batch Management
              </h3>
              <button onClick={() => setShowBatchModal(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4">
                <p className="text-sm text-indigo-600 dark:text-indigo-400">
                  Track products by batch number for better traceability and quality control.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700/50">
                      <th className="px-3 py-2 text-left font-medium">Batch #</th>
                      <th className="px-3 py-2 text-left font-medium">Product</th>
                      <th className="px-3 py-2 text-left font-medium">Quantity</th>
                      <th className="px-3 py-2 text-left font-medium">Remaining</th>
                      <th className="px-3 py-2 text-left font-medium">Expiry</th>
                      <th className="px-3 py-2 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {batches.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-4 text-gray-400">No batches found</td>
                      </tr>
                    ) : (
                      batches.map(batch => (
                        <tr key={batch.id} className="border-b border-gray-100 dark:border-gray-700">
                          <td className="px-3 py-2 font-medium">{batch.batchNumber}</td>
                          <td className="px-3 py-2">{batch.productName}</td>
                          <td className="px-3 py-2">{batch.quantity}</td>
                          <td className="px-3 py-2">{batch.remaining}</td>
                          <td className="px-3 py-2">{new Date(batch.expiryDate).toLocaleDateString()}</td>
                          <td className="px-3 py-2">
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              batch.status === 'active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                              batch.status === 'exhausted' ? 'bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-400' :
                              'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            }`}>
                              {batch.status.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expiry Tracking Modal */}
      {showExpiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-500" />
                Expiry Date Tracking
              </h3>
              <button onClick={() => setShowExpiryModal(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-emerald-600">
                    {inventory.filter(i => {
                      const days = Math.ceil((new Date(i.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
                      return days > 30;
                    }).length}
                  </p>
                  <p className="text-xs text-gray-500">Safe (&gt;30 days)</p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-yellow-600">
                    {inventory.filter(i => {
                      const days = Math.ceil((new Date(i.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
                      return days <= 30 && days > 7;
                    }).length}
                  </p>
                  <p className="text-xs text-gray-500">Valid (7-30 days)</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-orange-600">
                    {inventory.filter(i => {
                      const days = Math.ceil((new Date(i.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
                      return days <= 7 && days > 0;
                    }).length}
                  </p>
                  <p className="text-xs text-gray-500">Expiring Soon (&lt;7 days)</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-red-600">
                    {inventory.filter(i => {
                      const days = Math.ceil((new Date(i.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
                      return days <= 0;
                    }).length}
                  </p>
                  <p className="text-xs text-gray-500">Expired</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700/50">
                      <th className="px-3 py-2 text-left font-medium">Product</th>
                      <th className="px-3 py-2 text-left font-medium">Batch #</th>
                      <th className="px-3 py-2 text-left font-medium">Expiry Date</th>
                      <th className="px-3 py-2 text-left font-medium">Days Left</th>
                      <th className="px-3 py-2 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.filter(i => i.expiryDate).map(item => {
                      const daysLeft = Math.ceil((new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
                      let statusColor = 'text-emerald-600 dark:text-emerald-400';
                      let statusText = 'Safe';
                      if (daysLeft <= 0) { statusColor = 'text-red-600 dark:text-red-400'; statusText = 'Expired'; }
                      else if (daysLeft <= 7) { statusColor = 'text-orange-600 dark:text-orange-400'; statusText = 'Expiring Soon'; }
                      else if (daysLeft <= 30) { statusColor = 'text-yellow-600 dark:text-yellow-400'; statusText = 'Valid'; }

                      return (
                        <tr key={item.id} className="border-b border-gray-100 dark:border-gray-700">
                          <td className="px-3 py-2">{item.productName}</td>
                          <td className="px-3 py-2">{item.batchNumber}</td>
                          <td className="px-3 py-2">{new Date(item.expiryDate).toLocaleDateString()}</td>
                          <td className="px-3 py-2">{daysLeft} days</td>
                          <td className={`px-3 py-2 font-medium ${statusColor}`}>{statusText}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Valuation Modal */}
      {showValuationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-500" />
                Inventory Valuation
              </h3>
              <button onClick={() => setShowValuationModal(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500">Total Cost Value</p>
                  <p className="text-xl font-bold text-blue-600">₹{valuation.totalCost.toLocaleString()}</p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500">Total Retail Value</p>
                  <p className="text-xl font-bold text-emerald-600">₹{valuation.totalRetail.toLocaleString()}</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500">Potential Profit</p>
                  <p className="text-xl font-bold text-purple-600">₹{valuation.potentialProfit.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500">Total Items</p>
                  <p className="text-xl font-bold text-gray-600">{inventory.length}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">By Category</h4>
                <div className="space-y-2">
                  {Object.entries(valuation.byCategory).map(([category, data]) => (
                    <div key={category} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                      <span className="font-medium">{category}</span>
                      <span className="text-sm text-gray-500">{data.quantity} units</span>
                      <span className="font-semibold text-emerald-600">₹{data.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">By Warehouse</h4>
                <div className="space-y-2">
                  {Object.entries(valuation.byWarehouse).map(([warehouse, data]) => (
                    <div key={warehouse} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                      <span className="font-medium">{warehouse}</span>
                      <span className="text-sm text-gray-500">{data.quantity} units</span>
                      <span className="font-semibold text-emerald-600">₹{data.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alerts Modal */}
      {showAlertsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-yellow-500" />
                Inventory Alerts
              </h3>
              <button onClick={() => setShowAlertsModal(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-3">
              {alerts.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400">All clear! No alerts at this time.</p>
                </div>
              ) : (
                alerts.map(alert => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-xl border ${
                      alert.severity === 'critical' ? 'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800' :
                      alert.severity === 'warning' ? 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800' :
                      'border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">{alert.icon}</div>
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white">{alert.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{alert.message}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(alert.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        alert.type === 'low-stock' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        alert.type === 'out-of-stock' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        alert.type === 'overstock' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                      }`}>
                        {alert.type.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))
              )}
              <button
                onClick={() => {
                  setAlerts(alerts.map(a => ({ ...a, read: true })));
                  setShowAlertsModal(false);
                }}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-sm"
              >
                Mark All as Read
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Warehouse Management Modal */}
      {showWarehouseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-500" />
                Warehouse Management
              </h3>
              <button onClick={() => setShowWarehouseModal(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {warehouses.map(wh => {
                  const usage = Math.round((wh.used / wh.capacity) * 100);
                  return (
                    <div key={wh.id} className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white">{wh.name}</p>
                          <p className="text-xs text-gray-400">{wh.location}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          usage > 90 ? 'bg-red-100 text-red-700' :
                          usage > 70 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-emerald-100 text-emerald-700'
                        }`}>
                          {usage}% Used
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all ${
                              usage > 90 ? 'bg-red-500' :
                              usage > 70 ? 'bg-yellow-500' :
                              'bg-emerald-500'
                            }`}
                            style={{ width: `${usage}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>{wh.used} units used</span>
                          <span>{wh.capacity} capacity</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="w-full px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-all">
                <Plus className="w-4 h-4 inline mr-2" />
                Add New Warehouse
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Availability Modal */}
      {showAvailabilityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <PackageSearch className="w-5 h-5 text-cyan-500" />
                Product Availability
              </h3>
              <button onClick={() => setShowAvailabilityModal(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-emerald-600">
                    {inventory.filter(i => i.status === 'in-stock').length}
                  </p>
                  <p className="text-xs text-gray-500">In Stock</p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-yellow-600">
                    {inventory.filter(i => i.status === 'low-stock').length}
                  </p>
                  <p className="text-xs text-gray-500">Low Stock</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-red-600">
                    {inventory.filter(i => i.status === 'out-of-stock').length}
                  </p>
                  <p className="text-xs text-gray-500">Out of Stock</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700/50">
                      <th className="px-3 py-2 text-left font-medium">Product</th>
                      <th className="px-3 py-2 text-left font-medium">Category</th>
                      <th className="px-3 py-2 text-left font-medium">Available</th>
                      <th className="px-3 py-2 text-left font-medium">Location</th>
                      <th className="px-3 py-2 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.slice(0, 10).map(item => (
                      <tr key={item.id} className="border-b border-gray-100 dark:border-gray-700">
                        <td className="px-3 py-2 font-medium">{item.productName}</td>
                        <td className="px-3 py-2 text-gray-600 dark:text-gray-300">{item.category}</td>
                        <td className="px-3 py-2">{item.quantity} {item.unit}</td>
                        <td className="px-3 py-2">{item.location}</td>
                        <td className="px-3 py-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(item.status)}`}>
                            {item.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {inventory.length > 10 && (
                  <p className="text-center text-xs text-gray-400 mt-4">
                    Showing 10 of {inventory.length} products
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;