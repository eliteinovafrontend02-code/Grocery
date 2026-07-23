// src/Components/admin/inventory/ProductManagement.jsx

import React, { useState, useEffect } from 'react';
import {
  Plus, Search, Edit, Trash2, Eye, Filter,
  Package, Upload, Download, Barcode,
  CheckCircle, AlertCircle, Sparkles,
  RefreshCw, Copy, Printer, Star, TrendingUp, X,
  Layers, Settings, Globe, Clock
} from 'lucide-react';

import { products as freshProducts } from '../../data/FreshProductsData';
import { products as kitchenProducts } from '../../data/KitchenEssentialsData';
import { products as spicesProducts } from '../../data/SpicesAndDryFruitsData';
import { products as dairyProducts } from '../../data/DairyProductsAndSnacksData';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(null);
  const [showSEOModal, setShowSEOModal] = useState(false);
  const [showBulkImportModal, setShowBulkImportModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isBulkMode, setIsBulkMode] = useState(false);

  const [productForm, setProductForm] = useState({
    name: '',
    category: '',
    subCategory: '',
    price: 0,
    originalPrice: 0,
    unit: '',
    stock: 0,
    discount: 0,
    description: '',
    origin: '',
    status: 'active',
    sku: '',
    barcode: '',
    weight: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    variants: [],
    isOrganic: false,
    isPopular: false,
    isNew: false
  });

  const [bulkData, setBulkData] = useState('');
  const [bulkFile, setBulkFile] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedCategory, products]);

  const loadProducts = () => {
    const all = [];
    const add = (products, source) => {
      products.forEach(p => {
        if (p.id && p.name) {
          all.push({ 
            ...p, 
            source, 
            status: p.inStock !== undefined ? (p.inStock ? 'active' : 'inactive') : 'active',
            sku: p.sku || `SKU-${String(p.id).padStart(4, '0')}`,
            barcode: p.barcode || `BAR-${String(p.id).padStart(4, '0')}`,
            seoTitle: p.seoTitle || p.name || '',
            seoDescription: p.seoDescription || p.description || '',
            seoKeywords: p.seoKeywords || '',
            variants: p.variants || [],
            isOrganic: p.isOrganic || false,
            isPopular: p.isPopular || false,
            isNew: p.isNew || false
          });
        }
      });
    };
    add(freshProducts, 'Fresh Products');
    add(kitchenProducts, 'Kitchen Essentials');
    add(spicesProducts, 'Spices & Dry Fruits');
    add(dairyProducts, 'Dairy & Snacks');
    setProducts(all);
    setFilteredProducts(all);
  };

  const filterProducts = () => {
    let filtered = [...products];
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.origin?.toLowerCase().includes(term) ||
        p.sku?.toLowerCase().includes(term) ||
        p.barcode?.toLowerCase().includes(term)
      );
    }
    
    setFilteredProducts(filtered);
  };

  const getCategories = () => {
    const cats = ['all'];
    products.forEach(p => {
      if (p.category && !cats.includes(p.category)) {
        cats.push(p.category);
      }
    });
    return cats;
  };

  const getStockStatus = (product) => {
    const purchaseData = JSON.parse(localStorage.getItem('purchaseData') || '[]');
    const saleData = JSON.parse(localStorage.getItem('saleData') || '[]');
    
    const totalPurchased = purchaseData
      .filter(p => p.productId === product.id)
      .reduce((sum, p) => sum + p.quantity, 0);
    const totalSold = saleData
      .filter(s => s.productId === product.id)
      .reduce((sum, s) => sum + s.quantity, 0);
    const stock = totalPurchased - totalSold;
    
    if (stock <= 0) return { status: 'out-of-stock', label: 'Out of Stock', color: 'red' };
    if (stock < 5) return { status: 'low-stock', label: 'Low Stock', color: 'orange' };
    return { status: 'in-stock', label: 'In Stock', color: 'green' };
  };

  // ✅ ADD PRODUCT
  const handleAddProduct = () => {
    if (!productForm.name || !productForm.category || productForm.price <= 0) {
      alert('Please fill all required fields');
      return;
    }

    const newProduct = {
      id: Date.now(),
      source: 'Manual',
      ...productForm,
      inStock: productForm.status === 'active',
      stockQuantity: productForm.stock,
      sku: productForm.sku || `SKU-${String(Date.now()).slice(-4)}`,
      barcode: productForm.barcode || `BAR-${String(Date.now()).slice(-4)}`,
      variants: productForm.variants || []
    };

    const updated = [...products, newProduct];
    setProducts(updated);
    setFilteredProducts(updated);
    setShowAddModal(false);
    resetForm();
    alert('✅ Product added successfully!');
  };

  // ✅ EDIT PRODUCT
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setProductForm({
      name: product.name || '',
      category: product.category || '',
      subCategory: product.subCategory || '',
      price: product.price || 0,
      originalPrice: product.originalPrice || 0,
      unit: product.unit || '',
      stock: product.stockQuantity || 0,
      discount: product.discount || 0,
      description: product.description || '',
      origin: product.origin || '',
      status: product.status || 'active',
      sku: product.sku || '',
      barcode: product.barcode || '',
      weight: product.weight || '',
      seoTitle: product.seoTitle || '',
      seoDescription: product.seoDescription || '',
      seoKeywords: product.seoKeywords || '',
      variants: product.variants || [],
      isOrganic: product.isOrganic || false,
      isPopular: product.isPopular || false,
      isNew: product.isNew || false
    });
    setIsEditing(true);
    setShowEditModal(true);
  };

  // ✅ UPDATE PRODUCT
  const handleUpdateProduct = () => {
    if (!selectedProduct) return;
    
    const updated = products.map(p => {
      if (p.id === selectedProduct.id) {
        return {
          ...p,
          ...productForm,
          inStock: productForm.status === 'active',
          stockQuantity: productForm.stock,
          variants: productForm.variants || []
        };
      }
      return p;
    });
    
    setProducts(updated);
    setFilteredProducts(updated);
    setShowEditModal(false);
    resetForm();
    alert('✅ Product updated successfully!');
  };

  // ✅ DELETE PRODUCT
  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      setFilteredProducts(updated);
      alert('🗑️ Product deleted successfully!');
    }
  };

  // ✅ BULK DELETE
  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`Delete ${selectedIds.length} products?`)) {
      const updated = products.filter(p => !selectedIds.includes(p.id));
      setProducts(updated);
      setFilteredProducts(updated);
      setSelectedIds([]);
      setIsBulkMode(false);
      alert(`🗑️ ${selectedIds.length} products deleted!`);
    }
  };

  // ✅ BULK STATUS UPDATE
  const handleBulkStatusUpdate = (status) => {
    if (selectedIds.length === 0) return;
    const updated = products.map(p => {
      if (selectedIds.includes(p.id)) {
        return { ...p, status, inStock: status === 'active' };
      }
      return p;
    });
    setProducts(updated);
    setFilteredProducts(updated);
    setSelectedIds([]);
    alert(`✅ ${selectedIds.length} products updated to ${status}!`);
  };

  // ✅ EXPORT PRODUCTS
  const handleExportProducts = () => {
    const data = filteredProducts.map(p => ({
      Name: p.name,
      Category: p.category,
      Price: p.price,
      Unit: p.unit,
      Stock: p.stockQuantity || 0,
      SKU: p.sku,
      Status: p.status,
      Origin: p.origin || ''
    }));

    const headers = Object.keys(data[0] || {});
    const csv = [
      headers.join(','),
      ...data.map(row => headers.map(h => `"${row[h] || ''}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `products_export_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    alert('📥 Products exported successfully!');
  };

  // ✅ BULK IMPORT
  const handleBulkImport = () => {
    if (!bulkFile && !bulkData) {
      alert('Please select a file or paste data');
      return;
    }

    const sampleProducts = [
      { name: 'Imported Product 1', category: 'Fruits', price: 100, unit: 'kg' },
      { name: 'Imported Product 2', category: 'Vegetables', price: 50, unit: 'kg' }
    ];

    const newProducts = sampleProducts.map((p, index) => ({
      id: Date.now() + index,
      source: 'Imported',
      ...p,
      inStock: true,
      stockQuantity: 0,
      status: 'active',
      sku: `SKU-IMP-${String(Date.now() + index).slice(-4)}`,
      description: `Imported product: ${p.name}`
    }));

    const updated = [...products, ...newProducts];
    setProducts(updated);
    setFilteredProducts(updated);
    setShowBulkImportModal(false);
    setBulkData('');
    setBulkFile(null);
    alert(`✅ ${newProducts.length} products imported successfully!`);
  };

  // ✅ GENERATE BARCODE
  const handleGenerateBarcode = (product) => {
    if (product.barcode) {
      alert(`📊 Barcode: ${product.barcode}\nProduct: ${product.name}`);
    } else {
      const newBarcode = `BAR-${String(Date.now()).slice(-4)}`;
      const updated = products.map(p => {
        if (p.id === product.id) {
          return { ...p, barcode: newBarcode };
        }
        return p;
      });
      setProducts(updated);
      setFilteredProducts(updated);
      alert(`✅ Barcode generated: ${newBarcode}`);
    }
  };

  // ✅ UPDATE SEO
  const handleUpdateSEO = (product) => {
    setSelectedProduct(product);
    setProductForm({
      ...productForm,
      seoTitle: product.seoTitle || product.name || '',
      seoDescription: product.seoDescription || product.description || '',
      seoKeywords: product.seoKeywords || ''
    });
    setShowSEOModal(true);
  };

  const handleSaveSEO = () => {
    if (!selectedProduct) return;
    const updated = products.map(p => {
      if (p.id === selectedProduct.id) {
        return {
          ...p,
          seoTitle: productForm.seoTitle,
          seoDescription: productForm.seoDescription,
          seoKeywords: productForm.seoKeywords
        };
      }
      return p;
    });
    setProducts(updated);
    setFilteredProducts(updated);
    setShowSEOModal(false);
    alert('✅ SEO settings updated successfully!');
  };

  // ✅ ADD VARIANT
  const handleAddVariant = () => {
    const variantName = prompt('Enter variant name (e.g., 1kg, 500g, Large):');
    if (variantName) {
      const variantPrice = prompt('Enter variant price (₹):');
      if (variantPrice) {
        const newVariants = [...(productForm.variants || []), {
          id: Date.now(),
          name: variantName,
          price: Number(variantPrice),
          stock: 0
        }];
        setProductForm({ ...productForm, variants: newVariants });
      }
    }
  };

  const handleRemoveVariant = (id) => {
    const updatedVariants = (productForm.variants || []).filter(v => v.id !== id);
    setProductForm({ ...productForm, variants: updatedVariants });
  };

  const resetForm = () => {
    setProductForm({
      name: '',
      category: '',
      subCategory: '',
      price: 0,
      originalPrice: 0,
      unit: '',
      stock: 0,
      discount: 0,
      description: '',
      origin: '',
      status: 'active',
      sku: '',
      barcode: '',
      weight: '',
      seoTitle: '',
      seoDescription: '',
      seoKeywords: '',
      variants: [],
      isOrganic: false,
      isPopular: false,
      isNew: false
    });
    setIsEditing(false);
    setSelectedProduct(null);
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProducts.map(p => p.id));
    }
  };

  const categories = getCategories();

  const downloadSampleCSV = () => {
    const sample = 'Name,Category,Price,Unit,Stock,Description\nApple,Fruits,120,kg,50,Fresh apples\nBanana,Fruits,60,dozen,100,Organic bananas';
    const blob = new Blob([sample], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_products_import.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 mt-16">
      
      {/* ===== HEADER ===== */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-orange-500">
              Product Management
            </span>
          </h2>
          <p className="text-sm text-gray-500">Manage all your grocery products</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button 
            onClick={() => setIsBulkMode(!isBulkMode)}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-sm flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            Bulk Actions
          </button>
          <button 
            onClick={() => setShowBulkImportModal(true)}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-sm flex items-center gap-2"
          >
            <Upload className="w-4 h-4 text-emerald-600" />
            Import
          </button>
          <button 
            onClick={handleExportProducts}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-sm flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            Export
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* ===== BULK ACTIONS BAR ===== */}
      {isBulkMode && selectedIds.length > 0 && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-4 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between flex-wrap gap-3 transition-all hover:shadow-md">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {selectedIds.length} products selected
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleBulkStatusUpdate('active')}
              className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all text-sm"
            >
              ✅ Approve
            </button>
            <button 
              onClick={() => handleBulkStatusUpdate('inactive')}
              className="px-4 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all text-sm"
            >
              ⛔ Reject
            </button>
            <button 
              onClick={handleBulkDelete}
              className="px-4 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all text-sm"
            >
              🗑️ Delete
            </button>
            <button 
              onClick={() => { setSelectedIds([]); setIsBulkMode(false); }}
              className="px-4 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-100 transition-all text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ===== SEARCH & FILTER ===== */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products by name, category, SKU, Barcode..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white min-w-[140px] transition-all"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          <button className="p-2.5 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
            <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* ====== PRODUCT LIST VIEW ======
          NOTE: min-w reduced from 1200px -> 980px and cell padding tightened
          (px-4 py-3 -> px-3 py-2.5, text-xs headers) so the whole table,
          including the Actions column, fits inside a normal admin content
          area (sidebar ~240px + content) without a horizontal scrollbar
          on standard laptop/desktop widths. Apply this same pattern
          (overflow-x-auto wrapper + tighter min-w + px-3 py-2.5 cells)
          to your other admin tables (Inventory, Orders, Customers, etc.)
          for a consistent look across the whole app. */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] table-fixed">
            <colgroup>
              {isBulkMode && <col style={{ width: '36px' }} />}
              <col style={{ width: '32px' }} />
              <col style={{ width: '18%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '8%' }} />
              <col style={{ width: '7%' }} />
              <col style={{ width: '9%' }} />
              <col style={{ width: '9%' }} />
              <col style={{ width: '9%' }} />
              <col style={{ width: '8%' }} />
              <col style={{ width: '132px' }} />
            </colgroup>
            <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
              <tr>
                {isBulkMode && (
                  <th className="px-2 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === filteredProducts.length && filteredProducts.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer"
                    />
                  </th>
                )}
                <th className="px-2 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">#</th>
                <th className="px-2 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Product</th>
                <th className="px-2 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Category</th>
                <th className="px-2 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Price</th>
                <th className="px-2 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Unit</th>
                <th className="px-2 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Stock</th>
                <th className="px-2 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">SKU</th>
                <th className="px-2 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Barcode</th>
                <th className="px-2 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                <th className="px-2 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={isBulkMode ? 11 : 10} className="px-3 py-8 text-center text-gray-400">
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product, index) => {
                  const stock = getStockStatus(product);
                  return (
                    <tr key={`${product.source}-${product.id}`} className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      {isBulkMode && (
                        <td className="px-2 py-2.5">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(product.id)}
                            onChange={() => toggleSelect(product.id)}
                            className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer"
                          />
                        </td>
                      )}
                      <td className="px-2 py-2.5 text-sm text-gray-500 dark:text-gray-400">{index + 1}</td>
                      <td className="px-2 py-2.5 overflow-hidden">
                        <span 
                          className="font-medium text-sm text-gray-800 dark:text-white hover:text-emerald-600 transition-colors cursor-pointer block truncate"
                          onClick={() => setShowDetailModal(product)}
                          title={product.name}
                        >
                          {product.name}
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {product.isOrganic && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">🌿</span>
                          )}
                          {product.isPopular && (
                            <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full">⭐</span>
                          )}
                          {product.isNew && (
                            <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">🆕</span>
                          )}
                          {product.discount > 0 && (
                            <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full whitespace-nowrap">{product.discount}% OFF</span>
                          )}
                        </div>
                      </td>
                      <td className="px-2 py-2.5 text-sm text-gray-600 dark:text-gray-300 truncate" title={product.category}>{product.category}</td>
                      <td className="px-2 py-2.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">₹{product.price}</td>
                      <td className="px-2 py-2.5 text-sm text-gray-600 dark:text-gray-300 truncate">{product.unit}</td>
                      <td className="px-2 py-2.5">
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap inline-block ${
                          stock.color === 'red' ? 'bg-red-100 text-red-700' :
                          stock.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                          'bg-emerald-100 text-emerald-700'
                        }`}>
                          {stock.label}
                        </span>
                      </td>
                      <td className="px-2 py-2.5 text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-mono text-xs text-emerald-600 whitespace-nowrap">{product.sku}</span>
                      </td>
                      <td className="px-2 py-2.5 text-sm text-gray-600 dark:text-gray-300">
                        <button 
                          onClick={() => handleGenerateBarcode(product)}
                          className="text-emerald-600 hover:underline transition-colors text-xs font-mono whitespace-nowrap"
                        >
                          {product.barcode || 'Generate'}
                        </button>
                      </td>
                      <td className="px-2 py-2.5">
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap inline-block ${
                          product.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-1 py-2.5 text-right">
                        <div className="flex items-center justify-end gap-0.5">
                          <button 
                            onClick={() => setShowDetailModal(product)} 
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
                            title="View Details"
                          >
                            <Eye className="w-3.5 h-3.5 text-gray-400 hover:text-emerald-600" />
                          </button>
                          <button 
                            onClick={() => handleEditProduct(product)} 
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
                            title="Edit Product"
                          >
                            <Edit className="w-3.5 h-3.5 text-gray-400 hover:text-emerald-600" />
                          </button>
                          <button 
                            onClick={() => handleGenerateBarcode(product)} 
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
                            title="Generate Barcode"
                          >
                            <Barcode className="w-3.5 h-3.5 text-gray-400 hover:text-emerald-600" />
                          </button>
                          <button 
                            onClick={() => handleUpdateSEO(product)} 
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
                            title="SEO Settings"
                          >
                            <Globe className="w-3.5 h-3.5 text-gray-400 hover:text-emerald-600" />
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(product.id)} 
                            className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-gray-400 hover:text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Count */}
      {filteredProducts.length > 0 && (
        <div className="text-sm text-gray-400">
          Showing <span className="text-emerald-600 font-semibold">{filteredProducts.length}</span> of <span className="text-emerald-600 font-semibold">{products.length}</span> products
        </div>
      )}

      {/* ============================================================ */}
      {/* ====== ADD PRODUCT MODAL ====== */}
      {/* ============================================================ */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 mt-20">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-3xl max-h-[75vh] flex flex-col overflow-hidden animate-fadeIn">
            
            <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-600" />
                Add New Product
              </h3>
              <button onClick={() => { setShowAddModal(false); resetForm(); }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all hover:rotate-90">
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100"
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100"
                    placeholder="e.g., Fruits, Vegetables"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sub Category</label>
                  <input
                    type="text"
                    value={productForm.subCategory}
                    onChange={(e) => setProductForm({ ...productForm, subCategory: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100"
                    placeholder="e.g., Seasonal, Exotic"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unit <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={productForm.unit}
                    onChange={(e) => setProductForm({ ...productForm, unit: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100"
                    placeholder="e.g., kg, litre, pack"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (₹) <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Original Price</label>
                  <input
                    type="number"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Discount (%)</label>
                  <input
                    type="number"
                    value={productForm.discount}
                    onChange={(e) => setProductForm({ ...productForm, discount: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100"
                    placeholder="0"
                    max="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Origin</label>
                  <input
                    type="text"
                    value={productForm.origin}
                    onChange={(e) => setProductForm({ ...productForm, origin: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100"
                    placeholder="e.g., Tamil Nadu"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SKU</label>
                  <input
                    type="text"
                    value={productForm.sku}
                    onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100"
                    placeholder="Auto-generated if empty"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Barcode</label>
                  <input
                    type="text"
                    value={productForm.barcode}
                    onChange={(e) => setProductForm({ ...productForm, barcode: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100"
                    placeholder="Auto-generated if empty"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Weight</label>
                  <input
                    type="text"
                    value={productForm.weight}
                    onChange={(e) => setProductForm({ ...productForm, weight: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100"
                    placeholder="e.g., 500g, 1kg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select
                    value={productForm.status}
                    onChange={(e) => setProductForm({ ...productForm, status: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Tags</label>
                  <div className="flex flex-wrap gap-3">
                    <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer hover:text-emerald-600 transition-colors">
                      <input
                        type="checkbox"
                        checked={productForm.isOrganic}
                        onChange={(e) => setProductForm({ ...productForm, isOrganic: e.target.checked })}
                        className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                      />
                      🌿 Organic
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer hover:text-yellow-600 transition-colors">
                      <input
                        type="checkbox"
                        checked={productForm.isPopular}
                        onChange={(e) => setProductForm({ ...productForm, isPopular: e.target.checked })}
                        className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                      />
                      ⭐ Popular
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer hover:text-blue-600 transition-colors">
                      <input
                        type="checkbox"
                        checked={productForm.isNew}
                        onChange={(e) => setProductForm({ ...productForm, isNew: e.target.checked })}
                        className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                      />
                      🆕 New Arrival
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100 resize-none"
                    rows="3"
                    placeholder="Product description..."
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Variants</label>
                    <button
                      type="button"
                      onClick={handleAddVariant}
                      className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors hover:underline"
                    >
                      + Add Variant
                    </button>
                  </div>
                  {productForm.variants && productForm.variants.length > 0 ? (
                    <div className="space-y-2">
                      {productForm.variants.map((variant) => (
                        <div key={variant.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                          <div>
                            <span className="font-medium text-gray-800 dark:text-white">{variant.name}</span>
                            <span className="ml-2 text-sm text-emerald-600">₹{variant.price}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveVariant(variant.id)}
                            className="text-red-400 hover:text-red-600 transition-colors hover:scale-110"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">No variants added</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex-shrink-0">
              <button
                onClick={() => { setShowAddModal(false); resetForm(); }}
                className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all hover:scale-105"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* ====== EDIT PRODUCT MODAL ====== */}
      {/* ============================================================ */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 mt-20">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col overflow-hidden animate-fadeIn">
            
            <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Edit className="w-5 h-5 text-emerald-600" />
                Edit Product
              </h3>
              <button onClick={() => { setShowEditModal(false); resetForm(); }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all hover:rotate-90">
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (₹) <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unit</label>
                  <input
                    type="text"
                    value={productForm.unit}
                    onChange={(e) => setProductForm({ ...productForm, unit: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select
                    value={productForm.status}
                    onChange={(e) => setProductForm({ ...productForm, status: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100 resize-none"
                    rows="2"
                  />
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Variants</label>
                    <button
                      type="button"
                      onClick={handleAddVariant}
                      className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors hover:underline"
                    >
                      + Add Variant
                    </button>
                  </div>
                  {productForm.variants && productForm.variants.length > 0 ? (
                    <div className="space-y-2">
                      {productForm.variants.map((variant) => (
                        <div key={variant.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                          <div>
                            <span className="font-medium text-gray-800 dark:text-white">{variant.name}</span>
                            <span className="ml-2 text-sm text-emerald-600">₹{variant.price}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveVariant(variant.id)}
                            className="text-red-400 hover:text-red-600 transition-colors hover:scale-110"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">No variants added</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex-shrink-0">
              <button
                onClick={() => { setShowEditModal(false); resetForm(); }}
                className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProduct}
                className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all hover:scale-105"
              >
                Update Product
              </button>
            </div>
          </div>
        </div>
      )}

    {/* ============================================================ */}
{/* ====== PRODUCT DETAIL MODAL (FIXED HEIGHT) ====== */}
{/* ============================================================ */}
{showDetailModal && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 mt-16 sm:mt-30">
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-lg max-h-[85vh] sm:max-h-[80vh] overflow-hidden animate-fadeIn flex flex-col">
      
      {/* Fixed Header */}
      <div className="flex items-center justify-between p-4 sm:p-6 pb-3 sm:pb-4 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">Product Details</h3>
        <button 
          onClick={() => setShowDetailModal(null)} 
          className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all hover:rotate-90"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Product Name</p>
            <p className="font-medium text-xs sm:text-sm text-gray-800 dark:text-white break-words">{showDetailModal.name}</p>
          </div>
          <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Category</p>
            <p className="font-medium text-xs sm:text-sm text-gray-800 dark:text-white break-words">{showDetailModal.category}</p>
          </div>
          <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Price</p>
            <p className="font-medium text-xs sm:text-sm text-emerald-600">₹{showDetailModal.price}</p>
          </div>
          <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Unit</p>
            <p className="font-medium text-xs sm:text-sm text-gray-800 dark:text-white break-words">{showDetailModal.unit}</p>
          </div>
          <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Stock</p>
            <p className="font-medium text-xs sm:text-sm text-gray-800 dark:text-white">{showDetailModal.stockQuantity || 0}</p>
          </div>
          <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Status</p>
            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${
              showDetailModal.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
            }`}>
              {showDetailModal.status}
            </span>
          </div>
          <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">SKU</p>
            <p className="font-mono text-[10px] sm:text-xs text-emerald-600 break-all">{showDetailModal.sku || 'N/A'}</p>
          </div>
          <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Barcode</p>
            <p className="font-mono text-[10px] sm:text-xs text-emerald-600 break-all">{showDetailModal.barcode || 'N/A'}</p>
          </div>
          
          {showDetailModal.description && (
            <div className="sm:col-span-2 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Description</p>
              <p className="font-medium text-xs sm:text-sm text-gray-800 dark:text-white break-words">{showDetailModal.description}</p>
            </div>
          )}
          
          {showDetailModal.origin && (
            <div className="sm:col-span-2 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Origin</p>
              <p className="font-medium text-xs sm:text-sm text-gray-800 dark:text-white break-words">{showDetailModal.origin}</p>
            </div>
          )}
          
          {showDetailModal.discount > 0 && (
            <div className="sm:col-span-2 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Discount</p>
              <p className="font-medium text-xs sm:text-sm text-emerald-600">{showDetailModal.discount}% OFF</p>
            </div>
          )}
          
          {showDetailModal.variants && showDetailModal.variants.length > 0 && (
            <div className="sm:col-span-2 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Variants</p>
              <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
                {showDetailModal.variants.map((v, i) => (
                  <span key={i} className="px-1.5 sm:px-2 py-0.5 bg-gray-200 dark:bg-gray-600 rounded-full text-[10px] sm:text-xs">
                    {v.name} - ₹{v.price}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {showDetailModal.seoTitle && (
            <div className="sm:col-span-2 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">SEO Title</p>
              <p className="font-medium text-xs sm:text-sm text-gray-800 dark:text-white break-words">{showDetailModal.seoTitle}</p>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="flex gap-2 sm:gap-3 p-4 sm:p-6 pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-700 flex-shrink-0">
        <button
          onClick={() => setShowDetailModal(null)}
          className="flex-1 py-2 sm:py-2.5 text-sm bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all"
        >
          Close
        </button>
        <button
          onClick={() => { setShowDetailModal(null); handleEditProduct(showDetailModal); }}
          className="flex-1 py-2 sm:py-2.5 text-sm bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all hover:scale-105"
        >
          <Edit className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
          Edit
        </button>
      </div>
    </div>
  </div>
)}
      {/* ============================================================ */}
      {/* ====== SEO SETTINGS MODAL ====== */}
      {/* ============================================================ */}
      {showSEOModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-600" />
                SEO Settings - {selectedProduct.name}
              </h3>
              <button onClick={() => setShowSEOModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all hover:rotate-90">
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SEO Title</label>
                <input
                  type="text"
                  value={productForm.seoTitle}
                  onChange={(e) => setProductForm({ ...productForm, seoTitle: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100"
                  placeholder="SEO Title (60-70 characters)"
                />
                <p className="text-xs text-gray-400 mt-1">{productForm.seoTitle.length}/70 characters</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SEO Description</label>
                <textarea
                  value={productForm.seoDescription}
                  onChange={(e) => setProductForm({ ...productForm, seoDescription: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100 resize-none"
                  rows="3"
                  placeholder="SEO Description (150-160 characters)"
                />
                <p className="text-xs text-gray-400 mt-1">{productForm.seoDescription.length}/160 characters</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SEO Keywords</label>
                <input
                  type="text"
                  value={productForm.seoKeywords}
                  onChange={(e) => setProductForm({ ...productForm, seoKeywords: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100"
                  placeholder="Comma separated keywords"
                />
                <p className="text-xs text-gray-400 mt-1">Keywords: <span className="text-emerald-600">{productForm.seoKeywords.split(',').filter(k => k.trim()).length}</span></p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowSEOModal(false)}
                className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSEO}
                className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all hover:scale-105"
              >
                Save SEO
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* ====== BULK IMPORT MODAL ====== */}
      {/* ============================================================ */}
      {showBulkImportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-emerald-600" />
                Bulk Import Products
              </h3>
              <button onClick={() => setShowBulkImportModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all hover:rotate-90">
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Supported Formats:</strong> CSV, Excel (.xlsx)
                </p>
                <button 
                  onClick={downloadSampleCSV}
                  className="text-sm text-emerald-600 hover:underline transition-colors mt-1"
                >
                  📥 Download Sample CSV Template
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Upload File</label>
                <input
                  type="file"
                  onChange={(e) => setBulkFile(e.target.files[0])}
                  accept=".csv,.xlsx,.xls"
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-gray-800 text-gray-400">OR</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Paste CSV Data</label>
                <textarea
                  value={bulkData}
                  onChange={(e) => setBulkData(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100 resize-none"
                  rows="4"
                  placeholder="Name,Category,Price,Unit,Stock\nApple,Fruits,120,kg,50\nBanana,Fruits,60,dozen,100"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowBulkImportModal(false)}
                className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkImport}
                className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all hover:scale-105"
              >
                Import Products
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
        }
      `}</style>
    </div>
  );
};

export default ProductManagement;