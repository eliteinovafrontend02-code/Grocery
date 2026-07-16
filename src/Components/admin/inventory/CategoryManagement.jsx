// src/Components/admin/inventory/CategoryManagement.jsx

import React, { useState, useEffect } from 'react';
import {
  Plus, Search, Edit, Trash2, Eye, Filter, Grid, List,
  FolderOpen, Tag, Image, CheckCircle, XCircle, AlertCircle,
  X, Upload, Download, ChevronDown, ChevronRight, 
  ArrowUp, ArrowDown, Sparkles, Package, Layers,
  Settings, Globe, Clock, Move, Copy, RefreshCw
} from 'lucide-react';

// Import ONLY your existing product data
import { products as freshProducts } from '../../data/FreshProductsData';
import { products as kitchenProducts } from '../../data/KitchenEssentialsData';
import { products as spicesProducts } from '../../data/SpicesAndDryFruitsData';
import { products as dairyProducts } from '../../data/DairyProductsAndSnacksData';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(null);
  const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);
  const [notification, setNotification] = useState(null);

  // Form state
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    icon: '📁',
    description: '',
    status: 'active',
    parentCategory: '',
    displayOrder: 0,
    image: '',
    seoTitle: '',
    seoDescription: '',
    subCategories: []
  });

  // Sub Category Form
  const [subCategoryForm, setSubCategoryForm] = useState({
    name: '',
    icon: '📄',
    status: 'active',
    parentId: ''
  });

  // Image upload state
  const [imageForm, setImageForm] = useState({
    categoryId: '',
    imageUrl: '',
    imageFile: null
  });

  // 🎯 Get ALL categories from your existing products
  const getCategoriesFromProducts = () => {
    const allProducts = [...freshProducts, ...kitchenProducts, ...spicesProducts, ...dairyProducts];
    const categoryMap = new Map();

    allProducts.forEach(product => {
      if (product.category) {
        if (!categoryMap.has(product.category)) {
          let icon = '📁';
          const iconMap = {
            'fruits': '🍎',
            'vegetables': '🥬',
            'rice': '🍚',
            'wheat': '🌾',
            'oats': '🥣',
            'dal': '🫘',
            'oil': '🫒',
            'pulses': '🧆',
            'sugar': '🍬',
            'salt': '🧂',
            'masala': '🌶️',
            'cloves': '🪵',
            'dryfruits': '🥜',
            'seeds': '🌱',
            'dairy': '🥛',
            'snacks': '🍿',
            'savory': '🥨',
            'sweets': '🍬',
            'organic': '🌿',
            'leafy': '🥗'
          };
          icon = iconMap[product.category] || '📁';

          categoryMap.set(product.category, {
            id: product.category,
            name: product.category.charAt(0).toUpperCase() + product.category.slice(1),
            icon: icon,
            description: `${product.category} products`,
            status: 'active',
            productCount: 0,
            products: [],
            subCategories: [],
            displayOrder: categoryMap.size + 1,
            image: '',
            seoTitle: '',
            seoDescription: ''
          });
        }
        
        const categoryData = categoryMap.get(product.category);
        categoryData.productCount += 1;
        categoryData.products.push(product);
      }
    });

    return Array.from(categoryMap.values());
  };

  // Load categories on mount
  useEffect(() => {
    loadCategories();
  }, []);

  // Filter categories
  useEffect(() => {
    applyFilters();
  }, [searchTerm, categories]);

  const loadCategories = () => {
    const saved = localStorage.getItem('categoriesData');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data && data.length > 0) {
          setCategories(data);
          setFilteredCategories(data);
          updateParentCategories(data);
          return;
        }
      } catch (e) {
        console.error('Error loading categories:', e);
      }
    }
    
    const generatedCategories = getCategoriesFromProducts();
    setCategories(generatedCategories);
    setFilteredCategories(generatedCategories);
    updateParentCategories(generatedCategories);
    localStorage.setItem('categoriesData', JSON.stringify(generatedCategories));
  };

  const updateParentCategories = (cats) => {
    const parents = cats.map(c => ({ id: c.id, name: c.name }));
    setParentCategories([{ id: '', name: 'None (Top Level)' }, ...parents]);
  };

  const applyFilters = () => {
    let filtered = [...categories];
    
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(cat =>
        cat.name.toLowerCase().includes(term) ||
        cat.description?.toLowerCase().includes(term) ||
        cat.subCategories?.some(sub => sub.name.toLowerCase().includes(term))
      );
    }
    
    setFilteredCategories(filtered);
  };

  const toggleSubCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Show notification with animation
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // ✅ ADD CATEGORY
  const handleAddCategory = () => {
    if (!categoryForm.name) {
      showNotification('Please enter category name', 'error');
      return;
    }

    const newCategory = {
      id: categoryForm.name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
      name: categoryForm.name.charAt(0).toUpperCase() + categoryForm.name.slice(1),
      icon: categoryForm.icon || '📁',
      description: categoryForm.description || '',
      status: categoryForm.status || 'active',
      productCount: 0,
      products: [],
      subCategories: [],
      parentCategory: categoryForm.parentCategory || '',
      displayOrder: categories.length + 1,
      image: categoryForm.image || '',
      seoTitle: categoryForm.seoTitle || '',
      seoDescription: categoryForm.seoDescription || ''
    };

    const updated = [...categories, newCategory];
    setCategories(updated);
    setFilteredCategories(updated);
    updateParentCategories(updated);
    localStorage.setItem('categoriesData', JSON.stringify(updated));
    setShowAddModal(false);
    resetForm();
    showNotification('✅ Category added successfully!', 'success');
  };

  // ✅ EDIT CATEGORY
  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setCategoryForm({
      name: category.name || '',
      icon: category.icon || '📁',
      description: category.description || '',
      status: category.status || 'active',
      parentCategory: category.parentCategory || '',
      displayOrder: category.displayOrder || 0,
      image: category.image || '',
      seoTitle: category.seoTitle || '',
      seoDescription: category.seoDescription || '',
      subCategories: category.subCategories || []
    });
    setShowEditModal(true);
  };

  // ✅ UPDATE CATEGORY
  const handleUpdateCategory = () => {
    if (!selectedCategory) return;
    if (!categoryForm.name) {
      showNotification('Please enter category name', 'error');
      return;
    }

    const updated = categories.map(cat => {
      if (cat.id === selectedCategory.id) {
        return {
          ...cat,
          name: categoryForm.name.charAt(0).toUpperCase() + categoryForm.name.slice(1),
          icon: categoryForm.icon,
          description: categoryForm.description,
          status: categoryForm.status,
          parentCategory: categoryForm.parentCategory,
          displayOrder: categoryForm.displayOrder,
          image: categoryForm.image,
          seoTitle: categoryForm.seoTitle,
          seoDescription: categoryForm.seoDescription
        };
      }
      return cat;
    });

    setCategories(updated);
    setFilteredCategories(updated);
    updateParentCategories(updated);
    localStorage.setItem('categoriesData', JSON.stringify(updated));
    setShowEditModal(false);
    resetForm();
    showNotification('✅ Category updated successfully!', 'success');
  };

  // ✅ DELETE CATEGORY
  const handleDeleteCategory = (id) => {
    const category = categories.find(c => c.id === id);
    if (category && category.productCount > 0) {
      if (!window.confirm(`This category has ${category.productCount} products. Are you sure you want to delete it?`)) {
        return;
      }
    } else {
      if (!window.confirm('Are you sure you want to delete this category?')) {
        return;
      }
    }

    setCategories(prev => prev.filter(cat => cat.id !== id));
    setFilteredCategories(prev => prev.filter(cat => cat.id !== id));
    updateParentCategories(categories.filter(cat => cat.id !== id));
    localStorage.setItem('categoriesData', JSON.stringify(categories.filter(cat => cat.id !== id)));
    showNotification('🗑️ Category deleted successfully!', 'success');
  };

  // ✅ ADD SUB CATEGORY
  const handleAddSubCategory = () => {
    if (!subCategoryForm.name || !subCategoryForm.parentId) {
      showNotification('Please enter sub-category name and select parent', 'error');
      return;
    }

    const newSub = {
      id: Date.now(),
      name: subCategoryForm.name.charAt(0).toUpperCase() + subCategoryForm.name.slice(1),
      icon: subCategoryForm.icon || '📄',
      status: subCategoryForm.status || 'active',
      productCount: 0
    };

    const updated = categories.map(cat => {
      if (cat.id === subCategoryForm.parentId) {
        return {
          ...cat,
          subCategories: [...(cat.subCategories || []), newSub]
        };
      }
      return cat;
    });

    setCategories(updated);
    setFilteredCategories(updated);
    localStorage.setItem('categoriesData', JSON.stringify(updated));
    setShowSubCategoryModal(false);
    resetSubForm();
    showNotification('✅ Sub-category added successfully!', 'success');
  };

  // ✅ DELETE SUB CATEGORY
  const handleDeleteSubCategory = (categoryId, subId) => {
    if (window.confirm('Are you sure you want to delete this sub-category?')) {
      const updated = categories.map(cat => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            subCategories: cat.subCategories.filter(sub => sub.id !== subId)
          };
        }
        return cat;
      });
      setCategories(updated);
      setFilteredCategories(updated);
      localStorage.setItem('categoriesData', JSON.stringify(updated));
      showNotification('🗑️ Sub-category deleted successfully!', 'success');
    }
  };

  // ✅ UPDATE SUB CATEGORY STATUS
  const handleUpdateSubStatus = (categoryId, subId, status) => {
    const updated = categories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          subCategories: cat.subCategories.map(sub => {
            if (sub.id === subId) {
              return { ...sub, status };
            }
            return sub;
          })
        };
      }
      return cat;
    });
    setCategories(updated);
    setFilteredCategories(updated);
    localStorage.setItem('categoriesData', JSON.stringify(updated));
    showNotification(`✅ Sub-category status updated to ${status}!`, 'success');
  };

  // ✅ REORDER CATEGORIES (Display Order)
  const handleReorder = (id, direction) => {
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= categories.length) return;
    
    const newCategories = [...categories];
    [newCategories[index], newCategories[newIndex]] = [newCategories[newIndex], newCategories[index]];
    
    // Update display order
    newCategories.forEach((cat, i) => {
      cat.displayOrder = i + 1;
    });
    
    setCategories(newCategories);
    setFilteredCategories(newCategories);
    localStorage.setItem('categoriesData', JSON.stringify(newCategories));
    showNotification(`↕️ Category moved ${direction === 'up' ? 'up' : 'down'}!`, 'success');
  };

  // ✅ UPDATE CATEGORY IMAGE
  const handleUpdateImage = () => {
    if (!imageForm.categoryId || !imageForm.imageUrl) {
      showNotification('Please select a category and enter image URL', 'error');
      return;
    }

    const updated = categories.map(cat => {
      if (cat.id === imageForm.categoryId) {
        return { ...cat, image: imageForm.imageUrl };
      }
      return cat;
    });

    setCategories(updated);
    setFilteredCategories(updated);
    localStorage.setItem('categoriesData', JSON.stringify(updated));
    setShowImageModal(false);
    setImageForm({ categoryId: '', imageUrl: '', imageFile: null });
    showNotification('✅ Category image updated successfully!', 'success');
  };

  // ✅ BULK DELETE
  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`Delete ${selectedIds.length} categories?`)) {
      const updated = categories.filter(cat => !selectedIds.includes(cat.id));
      setCategories(updated);
      setFilteredCategories(updated);
      updateParentCategories(updated);
      localStorage.setItem('categoriesData', JSON.stringify(updated));
      setSelectedIds([]);
      setIsBulkMode(false);
      showNotification(`🗑️ ${selectedIds.length} categories deleted!`, 'success');
    }
  };

  // ✅ BULK STATUS UPDATE
  const handleBulkStatusUpdate = (status) => {
    if (selectedIds.length === 0) return;
    const updated = categories.map(cat => {
      if (selectedIds.includes(cat.id)) {
        return { ...cat, status };
      }
      return cat;
    });
    setCategories(updated);
    setFilteredCategories(updated);
    localStorage.setItem('categoriesData', JSON.stringify(updated));
    setSelectedIds([]);
    showNotification(`✅ ${selectedIds.length} categories updated to ${status}!`, 'success');
  };

  const resetForm = () => {
    setCategoryForm({
      name: '',
      icon: '📁',
      description: '',
      status: 'active',
      parentCategory: '',
      displayOrder: 0,
      image: '',
      seoTitle: '',
      seoDescription: '',
      subCategories: []
    });
    setSelectedCategory(null);
  };

  const resetSubForm = () => {
    setSubCategoryForm({
      name: '',
      icon: '📄',
      status: 'active',
      parentId: ''
    });
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredCategories.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredCategories.map(cat => cat.id));
    }
  };

  // Get product list for a category
  const getProductsForCategory = (categoryName) => {
    const allProducts = [...freshProducts, ...kitchenProducts, ...spicesProducts, ...dairyProducts];
    return allProducts.filter(p => p.category === categoryName.toLowerCase());
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <div className="space-y-6 mt-16">
      
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-20 right-4 z-50 px-6 py-3 rounded-2xl shadow-2xl animate-slideInRight flex items-center gap-3 ${
          notification.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' :
          notification.type === 'error' ? 'bg-red-50 border border-red-200 text-red-800' :
          'bg-blue-50 border border-blue-200 text-blue-800'
        }`}>
          <span className="text-2xl">
            {notification.type === 'success' ? '✅' : notification.type === 'error' ? '❌' : 'ℹ️'}
          </span>
          <span className="font-medium">{notification.message}</span>
          <button 
            onClick={() => setNotification(null)}
            className="ml-2 p-1 hover:bg-white/50 rounded-lg transition-all hover:rotate-90"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fadeIn">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-emerald-500 animate-pulse" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-orange-500">
               Category Management
            </span>
          </h2>
          <p className="text-sm text-gray-400">Organize products into categories and subcategories</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button 
            onClick={() => setIsBulkMode(!isBulkMode)}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 text-sm flex items-center gap-2 hover:scale-105 hover:shadow-md"
          >
            <CheckCircle className="w-4 h-4 transition-transform group-hover:rotate-12" />
            Bulk Actions
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-300 flex items-center gap-2 text-sm hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30"
          >
            <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
            Add Category
          </button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {isBulkMode && selectedIds.length > 0 && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-4 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between flex-wrap gap-3 transition-all duration-500 animate-slideDown hover:shadow-md">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 animate-bounce" />
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {selectedIds.length} categories selected
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleBulkStatusUpdate('active')}
              className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-300 text-sm hover:scale-105 hover:shadow-lg"
            >
              ✅ Activate
            </button>
            <button 
              onClick={() => handleBulkStatusUpdate('inactive')}
              className="px-4 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 text-sm hover:scale-105 hover:shadow-lg"
            >
              ⛔ Deactivate
            </button>
            <button 
              onClick={handleBulkDelete}
              className="px-4 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 text-sm hover:scale-105 hover:shadow-lg"
            >
              🗑️ Delete
            </button>
            <button 
              onClick={() => { setSelectedIds([]); setIsBulkMode(false); }}
              className="px-4 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-100 transition-all duration-300 text-sm hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn animation-delay-100">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-all duration-300 group-focus-within:text-emerald-500" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 focus:ring-2 focus:ring-emerald-100 hover:shadow-md focus:shadow-lg"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2.5 border border-gray-200 dark:border-gray-700 rounded-xl transition-all duration-300 hover:scale-110 ${
              viewMode === 'grid' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 shadow-md' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Grid className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2.5 border border-gray-200 dark:border-gray-700 rounded-xl transition-all duration-300 hover:scale-110 ${
              viewMode === 'list' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 shadow-md' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <List className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
          </button>
        </div>
      </div>

      {/* ====== CATEGORY GRID VIEW ====== */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCategories.length === 0 ? (
            <div className="col-span-full text-center py-12 animate-fadeIn">
              <FolderOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto animate-float" />
              <p className="text-gray-400 mt-2">No categories found</p>
            </div>
          ) : (
            filteredCategories.map((category, index) => {
              const products = getProductsForCategory(category.name);
              return (
                <div 
                  key={category.id} 
                  className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group animate-scaleIn"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  
                  {isBulkMode && (
                    <div className="absolute top-2 left-2 z-10 animate-fadeIn">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(category.id)}
                        onChange={() => toggleSelect(category.id)}
                        className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer transition-all duration-300 hover:scale-110"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  )}
                  
                  {/* Category Image */}
                  {category.image && (
                    <div className="relative h-32 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => { e.target.src = '/default-category.jpg'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <button 
                        onClick={() => {
                          setImageForm({ categoryId: category.id, imageUrl: category.image || '', imageFile: null });
                          setShowImageModal(true);
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-white/90 dark:bg-gray-800/90 rounded-lg hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                        title="Change Image"
                      >
                        <Image className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300 transition-transform duration-300 group-hover:rotate-12" />
                      </button>
                    </div>
                  )}
                  
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg">
                          {category.icon || '📁'}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 dark:text-white transition-colors duration-300 group-hover:text-emerald-600">{category.name}</h3>
                          <p className="text-xs text-gray-400">{products.length} products</p>
                          <p className="text-xs text-gray-400">Order: #{category.displayOrder || 0}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium transition-all duration-300 ${
                        category.status === 'active' 
                          ? 'bg-emerald-100 text-emerald-700 animate-pulse' 
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {category.status}
                      </span>
                    </div>

                    {category.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 transition-all duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300">{category.description}</p>
                    )}

                    {/* Parent Category */}
                    {category.parentCategory && (
                      <div className="mt-2 text-xs text-gray-400 flex items-center gap-1 animate-fadeIn">
                        <span>Parent:</span>
                        <span className="text-emerald-600 font-medium">{category.parentCategory}</span>
                      </div>
                    )}

                    {/* Sub Categories */}
                    {category.subCategories && category.subCategories.length > 0 && (
                      <div className="mt-3">
                        <button 
                          onClick={() => toggleSubCategory(category.id)}
                          className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 hover:underline transition-all duration-300 hover:scale-105"
                        >
                          {expandedCategories[category.id] ? 
                            <ChevronDown className="w-3 h-3 transition-transform duration-300 rotate-0" /> : 
                            <ChevronRight className="w-3 h-3 transition-transform duration-300" />
                          }
                          {category.subCategories.length} Sub-categories
                        </button>
                        
                        {expandedCategories[category.id] && (
                          <div className="mt-2 space-y-1 pl-4 border-l-2 border-emerald-200 dark:border-emerald-800 max-h-40 overflow-y-auto animate-slideDown">
                            {category.subCategories.map(sub => (
                              <div key={sub.id} className="flex items-center justify-between py-1 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-lg px-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-sm">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm transition-transform duration-300 hover:scale-125">{sub.icon || '📄'}</span>
                                  <span className="text-sm text-gray-700 dark:text-gray-300">{sub.name}</span>
                                  <span className="text-xs text-gray-400">({sub.productCount || 0})</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-medium transition-all duration-300 ${
                                    sub.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                                  }`}>
                                    {sub.status}
                                  </span>
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); handleUpdateSubStatus(category.id, sub.id, sub.status === 'active' ? 'inactive' : 'active'); }}
                                    className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-all duration-300 hover:rotate-180 hover:scale-110"
                                    title="Toggle Status"
                                  >
                                    <RefreshCw className="w-3 h-3 text-gray-400 hover:text-emerald-600" />
                                  </button>
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); handleDeleteSubCategory(category.id, sub.id); }}
                                    className="p-0.5 hover:bg-red-50 rounded transition-all duration-300 hover:scale-110 hover:rotate-90"
                                  >
                                    <X className="w-3 h-3 text-gray-400 hover:text-red-600" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center gap-2 flex-wrap">
                      <button 
                        onClick={() => handleReorder(category.id, 'up')}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-md"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5 text-gray-400 hover:text-emerald-600 transition-colors duration-300" />
                      </button>
                      <button 
                        onClick={() => handleReorder(category.id, 'down')}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-md"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5 text-gray-400 hover:text-emerald-600 transition-colors duration-300" />
                      </button>
                      <button 
                        onClick={() => {
                          setImageForm({ categoryId: category.id, imageUrl: category.image || '', imageFile: null });
                          setShowImageModal(true);
                        }}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-md"
                        title="Update Image"
                      >
                        <Image className="w-3.5 h-3.5 text-gray-400 hover:text-emerald-600 transition-colors duration-300" />
                      </button>
                      <button 
                        onClick={() => {
                          setSubCategoryForm({ ...subCategoryForm, parentId: category.id });
                          setShowSubCategoryModal(true);
                        }}
                        className="flex-1 py-1.5 text-center text-sm text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md"
                      >
                        <Plus className="w-3.5 h-3.5 inline mr-1 transition-transform duration-300 group-hover:rotate-90" />
                        Sub
                      </button>
                      <button 
                        onClick={() => handleEditCategory(category)}
                        className="flex-1 py-1.5 text-center text-sm text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md"
                      >
                        <Edit className="w-3.5 h-3.5 inline mr-1 transition-transform duration-300 group-hover:rotate-12" />
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteCategory(category.id)}
                        className="flex-1 py-1.5 text-center text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md"
                      >
                        <Trash2 className="w-3.5 h-3.5 inline mr-1 transition-transform duration-300 group-hover:rotate-12" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        /* ====== CATEGORY LIST VIEW ====== */
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden animate-fadeIn">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                <tr>
                  {isBulkMode && (
                    <th className="px-4 py-3 text-left w-12">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === filteredCategories.length && filteredCategories.length > 0}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer transition-all duration-300 hover:scale-110"
                      />
                    </th>
                  )}
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Image</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Products</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sub</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Parent</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={isBulkMode ? 9 : 8} className="px-4 py-8 text-center text-gray-400 animate-pulse">
                      No categories found
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((category, index) => {
                    const products = getProductsForCategory(category.name);
                    return (
                      <tr 
                        key={category.id} 
                        className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-all duration-300 group animate-slideIn"
                        style={{ animationDelay: `${index * 30}ms` }}
                      >
                        {isBulkMode && (
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(category.id)}
                              onChange={() => toggleSelect(category.id)}
                              className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer transition-all duration-300 hover:scale-110"
                            />
                          </td>
                        )}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <span className="text-xl transition-transform duration-300 group-hover:scale-125">{category.icon || '📁'}</span>
                            <span className="font-medium text-gray-800 dark:text-white transition-colors duration-300 group-hover:text-emerald-600">{category.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {category.image ? (
                            <img src={category.image} alt={category.name} className="w-10 h-10 rounded-lg object-cover transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md" />
                          ) : (
                            <span className="text-gray-400 text-xs">No image</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{products.length}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{category.subCategories?.length || 0}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{category.parentCategory || 'None'}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{category.displayOrder || 0}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium transition-all duration-300 ${
                            category.status === 'active' 
                              ? 'bg-emerald-100 text-emerald-700 animate-pulse' 
                              : 'bg-gray-100 text-gray-500'
                          }`}>
                            {category.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1 flex-wrap">
                            <button 
                              onClick={() => handleEditCategory(category)} 
                              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-md group"
                              title="Edit Category"
                            >
                              <Edit className="w-4 h-4 text-gray-400 transition-colors duration-300 group-hover:text-emerald-600" />
                            </button>
                            <button 
                              onClick={() => {
                                setImageForm({ categoryId: category.id, imageUrl: category.image || '', imageFile: null });
                                setShowImageModal(true);
                              }}
                              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-md group"
                              title="Update Image"
                            >
                              <Image className="w-4 h-4 text-gray-400 transition-colors duration-300 group-hover:text-emerald-600" />
                            </button>
                            <button 
                              onClick={() => {
                                setSubCategoryForm({ ...subCategoryForm, parentId: category.id });
                                setShowSubCategoryModal(true);
                              }}
                              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-md group"
                              title="Add Sub-Category"
                            >
                              <Plus className="w-4 h-4 text-gray-400 transition-colors duration-300 group-hover:text-emerald-600" />
                            </button>
                            <button 
                              onClick={() => handleReorder(category.id, 'up')}
                              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-md group"
                              title="Move Up"
                            >
                              <ArrowUp className="w-4 h-4 text-gray-400 transition-colors duration-300 group-hover:text-emerald-600" />
                            </button>
                            <button 
                              onClick={() => handleReorder(category.id, 'down')}
                              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-md group"
                              title="Move Down"
                            >
                              <ArrowDown className="w-4 h-4 text-gray-400 transition-colors duration-300 group-hover:text-emerald-600" />
                            </button>
                            <button 
                              onClick={() => handleDeleteCategory(category.id)} 
                              className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-md group"
                              title="Delete Category"
                            >
                              <Trash2 className="w-4 h-4 text-gray-400 transition-colors duration-300 group-hover:text-red-600" />
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
      )}

      {/* Product Count */}
      {filteredCategories.length > 0 && (
        <div className="text-sm text-gray-400 animate-fadeIn">
          Showing <span className="text-emerald-600 font-semibold">{filteredCategories.length}</span> of <span className="text-emerald-600 font-semibold">{categories.length}</span> categories
        </div>
      )}

      {/* ===== ADD CATEGORY MODAL ===== */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn mt-30">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col overflow-hidden animate-scaleIn">
            
            <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-600 animate-bounce" />
                Add New Category
              </h3>
              <button onClick={() => { setShowAddModal(false); resetForm(); }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 hover:rotate-90 hover:scale-110">
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-4">
                <div className="animate-slideIn" style={{ animationDelay: '50ms' }}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 focus:ring-2 focus:ring-emerald-100 hover:shadow-md"
                    placeholder="Enter category name"
                  />
                </div>
                <div className="animate-slideIn" style={{ animationDelay: '100ms' }}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Icon (emoji)</label>
                  <input
                    type="text"
                    value={categoryForm.icon}
                    onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 focus:ring-2 focus:ring-emerald-100 hover:shadow-md"
                    placeholder="📁"
                    maxLength="2"
                  />
                </div>
                <div className="animate-slideIn" style={{ animationDelay: '150ms' }}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parent Category</label>
                  <select
                    value={categoryForm.parentCategory}
                    onChange={(e) => setCategoryForm({ ...categoryForm, parentCategory: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 focus:ring-2 focus:ring-emerald-100 hover:shadow-md"
                  >
                    {parentCategories.map(p => (
                      <option key={p.id || 'none'} value={p.id}>
                        {p.name || 'None (Top Level)'}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="animate-slideIn" style={{ animationDelay: '200ms' }}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={categoryForm.displayOrder}
                    onChange={(e) => setCategoryForm({ ...categoryForm, displayOrder: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 focus:ring-2 focus:ring-emerald-100 hover:shadow-md"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div className="animate-slideIn" style={{ animationDelay: '250ms' }}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category Image URL</label>
                  <input
                    type="text"
                    value={categoryForm.image}
                    onChange={(e) => setCategoryForm({ ...categoryForm, image: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 focus:ring-2 focus:ring-emerald-100 hover:shadow-md"
                    placeholder="/category-image.jpg"
                  />
                </div>
                <div className="animate-slideIn" style={{ animationDelay: '300ms' }}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <textarea
                    value={categoryForm.description}
                    onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 focus:ring-2 focus:ring-emerald-100 hover:shadow-md resize-none"
                    rows="2"
                    placeholder="Category description..."
                  />
                </div>
                <div className="animate-slideIn" style={{ animationDelay: '350ms' }}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SEO Title</label>
                  <input
                    type="text"
                    value={categoryForm.seoTitle}
                    onChange={(e) => setCategoryForm({ ...categoryForm, seoTitle: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 focus:ring-2 focus:ring-emerald-100 hover:shadow-md"
                    placeholder="SEO Title"
                  />
                </div>
                <div className="animate-slideIn" style={{ animationDelay: '400ms' }}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SEO Description</label>
                  <textarea
                    value={categoryForm.seoDescription}
                    onChange={(e) => setCategoryForm({ ...categoryForm, seoDescription: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 focus:ring-2 focus:ring-emerald-100 hover:shadow-md resize-none"
                    rows="2"
                    placeholder="SEO Description"
                  />
                </div>
                <div className="animate-slideIn" style={{ animationDelay: '450ms' }}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select
                    value={categoryForm.status}
                    onChange={(e) => setCategoryForm({ ...categoryForm, status: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 focus:ring-2 focus:ring-emerald-100 hover:shadow-md"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex-shrink-0">
              <button
                onClick={() => { setShowAddModal(false); resetForm(); }}
                className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== EDIT CATEGORY MODAL ===== */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn mt-30">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col overflow-hidden animate-scaleIn">
            
            <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Edit className="w-5 h-5 text-emerald-600 animate-spin-slow" />
                Edit Category
              </h3>
              <button onClick={() => { setShowEditModal(false); resetForm(); }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 hover:rotate-90 hover:scale-110">
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-4">
                <div className="animate-slideIn" style={{ animationDelay: '50ms' }}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 focus:ring-2 focus:ring-emerald-100 hover:shadow-md"
                  />
                </div>
                <div className="animate-slideIn" style={{ animationDelay: '100ms' }}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Icon (emoji)</label>
                  <input
                    type="text"
                    value={categoryForm.icon}
                    onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 focus:ring-2 focus:ring-emerald-100 hover:shadow-md"
                    maxLength="2"
                  />
                </div>
                <div className="animate-slideIn" style={{ animationDelay: '150ms' }}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parent Category</label>
                  <select
                    value={categoryForm.parentCategory}
                    onChange={(e) => setCategoryForm({ ...categoryForm, parentCategory: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 focus:ring-2 focus:ring-emerald-100 hover:shadow-md"
                  >
                    {parentCategories.map(p => (
                      <option key={p.id || 'none'} value={p.id}>
                        {p.name || 'None (Top Level)'}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="animate-slideIn" style={{ animationDelay: '200ms' }}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={categoryForm.displayOrder}
                    onChange={(e) => setCategoryForm({ ...categoryForm, displayOrder: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 focus:ring-2 focus:ring-emerald-100 hover:shadow-md"
                    min="0"
                  />
                </div>
                <div className="animate-slideIn" style={{ animationDelay: '250ms' }}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category Image URL</label>
                  <input
                    type="text"
                    value={categoryForm.image}
                    onChange={(e) => setCategoryForm({ ...categoryForm, image: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 focus:ring-2 focus:ring-emerald-100 hover:shadow-md"
                    placeholder="/category-image.jpg"
                  />
                </div>
                <div className="animate-slideIn" style={{ animationDelay: '300ms' }}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <textarea
                    value={categoryForm.description}
                    onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 focus:ring-2 focus:ring-emerald-100 hover:shadow-md resize-none"
                    rows="2"
                  />
                </div>
                <div className="animate-slideIn" style={{ animationDelay: '350ms' }}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SEO Title</label>
                  <input
                    type="text"
                    value={categoryForm.seoTitle}
                    onChange={(e) => setCategoryForm({ ...categoryForm, seoTitle: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 focus:ring-2 focus:ring-emerald-100 hover:shadow-md"
                  />
                </div>
                <div className="animate-slideIn" style={{ animationDelay: '400ms' }}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SEO Description</label>
                  <textarea
                    value={categoryForm.seoDescription}
                    onChange={(e) => setCategoryForm({ ...categoryForm, seoDescription: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 focus:ring-2 focus:ring-emerald-100 hover:shadow-md resize-none"
                    rows="2"
                  />
                </div>
                <div className="animate-slideIn" style={{ animationDelay: '450ms' }}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select
                    value={categoryForm.status}
                    onChange={(e) => setCategoryForm({ ...categoryForm, status: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 focus:ring-2 focus:ring-emerald-100 hover:shadow-md"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex-shrink-0">
              <button
                onClick={() => { setShowEditModal(false); resetForm(); }}
                className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateCategory}
                className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30"
              >
                Update Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== SUB CATEGORY MODAL ===== */}
      {showSubCategoryModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col overflow-hidden animate-scaleIn">
            
            <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-600 animate-bounce" />
                Add Sub-Category
              </h3>
              <button onClick={() => { setShowSubCategoryModal(false); resetSubForm(); }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 hover:rotate-90 hover:scale-110">
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-4">
                <div className="animate-slideIn" style={{ animationDelay: '50ms' }}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parent Category</label>
                  <select
                    value={subCategoryForm.parentId}
                    onChange={(e) => setSubCategoryForm({ ...subCategoryForm, parentId: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 focus:ring-2 focus:ring-emerald-100 hover:shadow-md"
                  >
                    <option value="">Select Parent Category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="animate-slideIn" style={{ animationDelay: '100ms' }}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sub-Category Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={subCategoryForm.name}
                    onChange={(e) => setSubCategoryForm({ ...subCategoryForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 focus:ring-2 focus:ring-emerald-100 hover:shadow-md"
                    placeholder="Enter sub-category name"
                  />
                </div>
                <div className="animate-slideIn" style={{ animationDelay: '150ms' }}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Icon (emoji)</label>
                  <input
                    type="text"
                    value={subCategoryForm.icon}
                    onChange={(e) => setSubCategoryForm({ ...subCategoryForm, icon: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 focus:ring-2 focus:ring-emerald-100 hover:shadow-md"
                    placeholder="📄"
                    maxLength="2"
                  />
                </div>
                <div className="animate-slideIn" style={{ animationDelay: '200ms' }}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select
                    value={subCategoryForm.status}
                    onChange={(e) => setSubCategoryForm({ ...subCategoryForm, status: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 focus:ring-2 focus:ring-emerald-100 hover:shadow-md"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex-shrink-0">
              <button
                onClick={() => { setShowSubCategoryModal(false); resetSubForm(); }}
                className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSubCategory}
                className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30"
              >
                Add Sub-Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== UPDATE IMAGE MODAL ===== */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col overflow-hidden animate-scaleIn">
            
            <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Image className="w-5 h-5 text-emerald-600 animate-pulse" />
                Update Category Image
              </h3>
              <button onClick={() => { setShowImageModal(false); setImageForm({ categoryId: '', imageUrl: '', imageFile: null }); }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 hover:rotate-90 hover:scale-110">
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-4">
                <div className="animate-slideIn" style={{ animationDelay: '50ms' }}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Category</label>
                  <select
                    value={imageForm.categoryId}
                    onChange={(e) => setImageForm({ ...imageForm, categoryId: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 focus:ring-2 focus:ring-emerald-100 hover:shadow-md"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="animate-slideIn" style={{ animationDelay: '100ms' }}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={imageForm.imageUrl}
                    onChange={(e) => setImageForm({ ...imageForm, imageUrl: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 focus:ring-2 focus:ring-emerald-100 hover:shadow-md"
                    placeholder="/category-image.jpg"
                  />
                </div>
                <div className="text-center text-sm text-gray-400 animate-pulse">
                  <p>OR</p>
                </div>
                <div className="animate-slideIn" style={{ animationDelay: '150ms' }}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Upload Image File</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setImageForm({ ...imageForm, imageUrl: reader.result, imageFile: file });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 hover:shadow-md"
                  />
                </div>
                {imageForm.imageUrl && (
                  <div className="mt-2 animate-scaleIn">
                    <img src={imageForm.imageUrl} alt="Preview" className="w-32 h-32 rounded-lg object-cover mx-auto transition-all duration-300 hover:scale-110 hover:shadow-xl" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 p-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex-shrink-0">
              <button
                onClick={() => { setShowImageModal(false); setImageForm({ categoryId: '', imageUrl: '', imageFile: null }); }}
                className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateImage}
                className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30"
              >
                Update Image
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.4s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animation-delay-100 {
          animation-delay: 100ms;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .max-h-40 {
          max-height: 10rem;
        }
        
        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
        }
      `}</style>
    </div>
  );
};

export default CategoryManagement;