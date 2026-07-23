// src/Components/admin/inventory/CategoryManagement.jsx

import React, { useState, useEffect, useRef } from 'react';
import {
  Plus, Search, Edit, Trash2, Filter, Grid, List,
  FolderOpen, Tag, CheckCircle,
  X, ChevronDown, ChevronRight, 
  ArrowUp, ArrowDown, Sparkles, Layers,
  Settings, Globe, RefreshCw, Image as ImageIcon,
  Upload, Eye, EyeOff, FileImage, CloudUpload,
  Link
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
  const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);
  const [showImageManager, setShowImageManager] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);
  const fileInputRef = useRef(null);

  // Form state
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    icon: '📁',
    description: '',
    status: 'active',
    parentCategory: '',
    displayOrder: 0,
    seoTitle: '',
    seoDescription: '',
    images: []
  });

  // Image Management State
  const [imageManager, setImageManager] = useState({
    images: [],
    newImageUrl: '',
    newImageAlt: '',
    newImageFile: null,
    newImagePreview: null,
    isUploading: false,
    uploadMethod: 'url'
  });

  // Sub Category Form
  const [subCategoryForm, setSubCategoryForm] = useState({
    name: '',
    icon: '📄',
    status: 'active',
    parentId: ''
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
            seoTitle: '',
            seoDescription: '',
            images: []
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
          const dataWithImages = data.map(cat => ({
            ...cat,
            images: cat.images || []
          }));
          setCategories(dataWithImages);
          setFilteredCategories(dataWithImages);
          updateParentCategories(dataWithImages);
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

  // ✅ ADD CATEGORY
  const handleAddCategory = () => {
    if (!categoryForm.name) {
      alert('Please enter category name');
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
      seoTitle: categoryForm.seoTitle || '',
      seoDescription: categoryForm.seoDescription || '',
      images: categoryForm.images || []
    };

    const updated = [...categories, newCategory];
    setCategories(updated);
    setFilteredCategories(updated);
    updateParentCategories(updated);
    localStorage.setItem('categoriesData', JSON.stringify(updated));
    setShowAddModal(false);
    resetForm();
    alert('✅ Category added successfully!');
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
      seoTitle: category.seoTitle || '',
      seoDescription: category.seoDescription || '',
      images: category.images || []
    });
    setShowEditModal(true);
  };

  // ✅ UPDATE CATEGORY
  const handleUpdateCategory = () => {
    if (!selectedCategory) return;
    if (!categoryForm.name) {
      alert('Please enter category name');
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
          seoTitle: categoryForm.seoTitle,
          seoDescription: categoryForm.seoDescription,
          images: categoryForm.images || cat.images || []
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
    alert('✅ Category updated successfully!');
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

    const updated = categories.filter(cat => cat.id !== id);
    setCategories(updated);
    setFilteredCategories(updated);
    updateParentCategories(updated);
    localStorage.setItem('categoriesData', JSON.stringify(updated));
    alert('🗑️ Category deleted successfully!');
  };

  // ✅ ADD SUB CATEGORY
  const handleAddSubCategory = () => {
    if (!subCategoryForm.name || !subCategoryForm.parentId) {
      alert('Please enter sub-category name and select parent');
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
    alert('✅ Sub-category added successfully!');
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
      alert('🗑️ Sub-category deleted successfully!');
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
    alert(`✅ Sub-category status updated to ${status}!`);
  };

  // ✅ REORDER CATEGORIES (Display Order)
  const handleReorder = (id, direction) => {
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= categories.length) return;
    
    const newCategories = [...categories];
    [newCategories[index], newCategories[newIndex]] = [newCategories[newIndex], newCategories[index]];
    
    newCategories.forEach((cat, i) => {
      cat.displayOrder = i + 1;
    });
    
    setCategories(newCategories);
    setFilteredCategories(newCategories);
    localStorage.setItem('categoriesData', JSON.stringify(newCategories));
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
      alert(`🗑️ ${selectedIds.length} categories deleted!`);
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
    alert(`✅ ${selectedIds.length} categories updated to ${status}!`);
  };

  // ========== IMAGE MANAGEMENT FUNCTIONS ==========
  
  const openImageManager = (category) => {
    setSelectedCategory(category);
    setImageManager({
      images: category.images || [],
      newImageUrl: '',
      newImageAlt: '',
      newImageFile: null,
      newImagePreview: null,
      isUploading: false,
      uploadMethod: 'url'
    });
    setShowImageManager(true);
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    
    setImageManager({
      ...imageManager,
      newImageFile: file,
      newImagePreview: previewUrl,
      newImageUrl: previewUrl
    });
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-emerald-500', 'bg-emerald-50', 'dark:bg-emerald-900/20');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-emerald-500', 'bg-emerald-50', 'dark:bg-emerald-900/20');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-emerald-500', 'bg-emerald-50', 'dark:bg-emerald-900/20');
    
    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please drop an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setImageManager({
      ...imageManager,
      newImageFile: file,
      newImagePreview: previewUrl,
      newImageUrl: previewUrl
    });
  };

  // Add new image to category
  const handleAddImage = () => {
    const imageUrl = imageManager.newImageUrl.trim();
    const imageAlt = imageManager.newImageAlt.trim() || `Category image ${imageManager.images.length + 1}`;

    if (!imageUrl) {
      alert('Please provide an image URL or select a file');
      return;
    }

    const newImage = {
      id: Date.now(),
      url: imageUrl,
      alt: imageAlt,
      isPrimary: imageManager.images.length === 0
    };

    const updatedImages = [...imageManager.images, newImage];
    setImageManager({
      ...imageManager,
      images: updatedImages,
      newImageUrl: '',
      newImageAlt: '',
      newImageFile: null,
      newImagePreview: null,
      uploadMethod: 'url'
    });

    updateCategoryImages(selectedCategory.id, updatedImages);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    alert('✅ Image added successfully!');
  };

  // Delete an image from category
  const handleDeleteImage = (imageId) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    const imageToDelete = imageManager.images.find(img => img.id === imageId);
    let updatedImages = imageManager.images.filter(img => img.id !== imageId);

    if (imageToDelete?.isPrimary && updatedImages.length > 0) {
      updatedImages = updatedImages.map((img, index) => ({
        ...img,
        isPrimary: index === 0
      }));
    }

    setImageManager({
      ...imageManager,
      images: updatedImages
    });

    updateCategoryImages(selectedCategory.id, updatedImages);
    alert('🗑️ Image deleted successfully!');
  };

  // Set image as primary
  const handleSetPrimaryImage = (imageId) => {
    const updatedImages = imageManager.images.map(img => ({
      ...img,
      isPrimary: img.id === imageId
    }));

    setImageManager({
      ...imageManager,
      images: updatedImages
    });

    updateCategoryImages(selectedCategory.id, updatedImages);
    alert('✅ Primary image updated!');
  };

  // Update category images in main state
  const updateCategoryImages = (categoryId, images) => {
    const updated = categories.map(cat => {
      if (cat.id === categoryId) {
        return { ...cat, images };
      }
      return cat;
    });

    setCategories(updated);
    setFilteredCategories(updated);
    localStorage.setItem('categoriesData', JSON.stringify(updated));
  };

  // Get first image URL or placeholder
  const getCategoryImage = (category) => {
    if (category.images && category.images.length > 0) {
      const primaryImage = category.images.find(img => img.isPrimary);
      return primaryImage ? primaryImage.url : category.images[0].url;
    }
    return null;
  };

  // Bulk delete all images
  const handleDeleteAllImages = () => {
    if (!window.confirm('⚠️ Are you sure you want to delete ALL images for this category?')) return;
    
    setImageManager({
      ...imageManager,
      images: []
    });

    updateCategoryImages(selectedCategory.id, []);
    alert('🗑️ All images deleted!');
  };

  // Clear image selection
  const clearImageSelection = () => {
    setImageManager({
      ...imageManager,
      newImageFile: null,
      newImagePreview: null,
      newImageUrl: '',
      uploadMethod: 'url'
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const resetForm = () => {
    setCategoryForm({
      name: '',
      icon: '📁',
      description: '',
      status: 'active',
      parentCategory: '',
      displayOrder: 0,
      seoTitle: '',
      seoDescription: '',
      images: []
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

  return (
    <div className="space-y-6 mt-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-orange-500">
              Category Management
            </span>
          </h2>
          <p className="text-sm text-gray-400">Organize products into categories and subcategories</p>
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
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {isBulkMode && selectedIds.length > 0 && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-4 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {selectedIds.length} categories selected
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleBulkStatusUpdate('active')}
              className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all text-sm"
            >
              ✅ Activate
            </button>
            <button 
              onClick={() => handleBulkStatusUpdate('inactive')}
              className="px-4 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all text-sm"
            >
              ⛔ Deactivate
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

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2.5 border border-gray-200 dark:border-gray-700 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2.5 border border-gray-200 dark:border-gray-700 rounded-xl transition-all ${viewMode === 'list' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ====== CATEGORY GRID VIEW ====== */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCategories.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <FolderOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto" />
              <p className="text-gray-400 mt-2">No categories found</p>
            </div>
          ) : (
            filteredCategories.map((category) => {
              const products = getProductsForCategory(category.name);
              const categoryImage = getCategoryImage(category);
              return (
                <div key={category.id} className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  
                  {isBulkMode && (
                    <div className="absolute top-2 left-2 z-10">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(category.id)}
                        onChange={() => toggleSelect(category.id)}
                        className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  )}

                  {/* Category Image */}
                  {categoryImage ? (
                    <div className="w-full h-32 bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                      <img 
                        src={categoryImage} 
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/400x200/10B981/ffffff?text=${category.name}`;
                        }}
                      />
                      {category.images && category.images.length > 1 && (
                        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full">
                          +{category.images.length - 1} more
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-gray-400 dark:text-gray-600" />
                    </div>
                  )}
                  
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                          {category.icon || '📁'}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-emerald-600 transition-colors">{category.name}</h3>
                          <p className="text-xs text-gray-400">{products.length} products</p>
                          <p className="text-xs text-gray-400">Order: #{category.displayOrder || 0}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        category.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {category.status}
                      </span>
                    </div>

                    {category.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">{category.description}</p>
                    )}

                    {/* Parent Category */}
                    {category.parentCategory && (
                      <div className="mt-2 text-xs text-gray-400">
                        Parent: <span className="text-emerald-600">{category.parentCategory}</span>
                      </div>
                    )}

                    {/* Image Count Badge */}
                    <div className="mt-2 flex items-center gap-2">
                      <ImageIcon className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-400">
                        {category.images?.length || 0} image{(category.images?.length || 0) !== 1 ? 's' : ''}
                      </span>
                      {category.images?.some(img => img.isPrimary) && (
                        <span className="text-[8px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">
                          Primary ✓
                        </span>
                      )}
                    </div>

                    {/* Sub Categories */}
                    {category.subCategories && category.subCategories.length > 0 && (
                      <div className="mt-3">
                        <button 
                          onClick={() => toggleSubCategory(category.id)}
                          className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 hover:underline transition-colors"
                        >
                          {expandedCategories[category.id] ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                          {category.subCategories.length} Sub-categories
                        </button>
                        
                        {expandedCategories[category.id] && (
                          <div className="mt-2 space-y-1 pl-4 border-l-2 border-emerald-200 dark:border-emerald-800 max-h-40 overflow-y-auto">
                            {category.subCategories.map(sub => (
                              <div key={sub.id} className="flex items-center justify-between py-1 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-lg px-2 transition-all">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">{sub.icon || '📄'}</span>
                                  <span className="text-sm text-gray-700 dark:text-gray-300">{sub.name}</span>
                                  <span className="text-xs text-gray-400">({sub.productCount || 0})</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-medium ${
                                    sub.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                                  }`}>
                                    {sub.status}
                                  </span>
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); handleUpdateSubStatus(category.id, sub.id, sub.status === 'active' ? 'inactive' : 'active'); }}
                                    className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-all"
                                    title="Toggle Status"
                                  >
                                    <RefreshCw className="w-3 h-3 text-gray-400 hover:text-emerald-600" />
                                  </button>
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); handleDeleteSubCategory(category.id, sub.id); }}
                                    className="p-0.5 hover:bg-red-50 rounded transition-all"
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
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all hover:scale-110"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5 text-gray-400 hover:text-emerald-600" />
                      </button>
                      <button 
                        onClick={() => handleReorder(category.id, 'down')}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all hover:scale-110"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5 text-gray-400 hover:text-emerald-600" />
                      </button>
                      <button 
                        onClick={() => openImageManager(category)}
                        className="flex-1 py-1.5 text-center text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all"
                        title="Manage Images"
                      >
                        <ImageIcon className="w-3.5 h-3.5 inline mr-1" />
                        Images
                      </button>
                      <button 
                        onClick={() => {
                          setSubCategoryForm({ ...subCategoryForm, parentId: category.id });
                          setShowSubCategoryModal(true);
                        }}
                        className="flex-1 py-1.5 text-center text-sm text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-all"
                      >
                        <Plus className="w-3.5 h-3.5 inline mr-1" />
                        Sub
                      </button>
                      <button 
                        onClick={() => handleEditCategory(category)}
                        className="flex-1 py-1.5 text-center text-sm text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-all"
                      >
                        <Edit className="w-3.5 h-3.5 inline mr-1" />
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteCategory(category.id)}
                        className="flex-1 py-1.5 text-center text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5 inline mr-1" />
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
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
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
                        className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer"
                      />
                    </th>
                  )}
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Image</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Products</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Sub</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Parent</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Order</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={isBulkMode ? 9 : 8} className="px-4 py-8 text-center text-gray-400">
                      No categories found
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((category) => {
                    const products = getProductsForCategory(category.name);
                    const categoryImage = getCategoryImage(category);
                    return (
                      <tr key={category.id} className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                        {isBulkMode && (
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(category.id)}
                              onChange={() => toggleSelect(category.id)}
                              className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer"
                            />
                          </td>
                        )}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{category.icon || '📁'}</span>
                            <span className="font-medium text-gray-800 dark:text-white hover:text-emerald-600 transition-colors">{category.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {categoryImage ? (
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                              <img 
                                src={categoryImage} 
                                alt={category.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = `https://via.placeholder.com/48/10B981/ffffff?text=${category.name.charAt(0)}`;
                                }}
                              />
                              {category.images && category.images.length > 1 && (
                                <div className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center">
                                  {category.images.length}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                              <ImageIcon className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{products.length}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{category.subCategories?.length || 0}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{category.parentCategory || 'None'}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{category.displayOrder || 0}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            category.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {category.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1 flex-wrap">
                            <button 
                              onClick={() => openImageManager(category)}
                              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all hover:scale-110"
                              title="Manage Images"
                            >
                              <ImageIcon className="w-4 h-4 text-blue-400 hover:text-blue-600" />
                            </button>
                            <button 
                              onClick={() => handleEditCategory(category)} 
                              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all hover:scale-110"
                              title="Edit Category"
                            >
                              <Edit className="w-4 h-4 text-gray-400 hover:text-emerald-600" />
                            </button>
                            <button 
                              onClick={() => {
                                setSubCategoryForm({ ...subCategoryForm, parentId: category.id });
                                setShowSubCategoryModal(true);
                              }}
                              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all hover:scale-110"
                              title="Add Sub-Category"
                            >
                              <Plus className="w-4 h-4 text-gray-400 hover:text-emerald-600" />
                            </button>
                            <button 
                              onClick={() => handleReorder(category.id, 'up')}
                              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all hover:scale-110"
                              title="Move Up"
                            >
                              <ArrowUp className="w-4 h-4 text-gray-400 hover:text-emerald-600" />
                            </button>
                            <button 
                              onClick={() => handleReorder(category.id, 'down')}
                              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all hover:scale-110"
                              title="Move Down"
                            >
                              <ArrowDown className="w-4 h-4 text-gray-400 hover:text-emerald-600" />
                            </button>
                            <button 
                              onClick={() => handleDeleteCategory(category.id)} 
                              className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all hover:scale-110"
                              title="Delete Category"
                            >
                              <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-600" />
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
        <div className="text-sm text-gray-400">
          Showing <span className="text-emerald-600 font-semibold">{filteredCategories.length}</span> of <span className="text-emerald-600 font-semibold">{categories.length}</span> categories
        </div>
      )}

      {/* ===== ADD CATEGORY MODAL ===== */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
            
            <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-600" />
                Add New Category
              </h3>
              <button onClick={() => { setShowAddModal(false); resetForm(); }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all hover:rotate-90">
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100"
                    placeholder="Enter category name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Icon (emoji)</label>
                  <input
                    type="text"
                    value={categoryForm.icon}
                    onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100"
                    placeholder="📁"
                    maxLength="2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parent Category</label>
                  <select
                    value={categoryForm.parentCategory}
                    onChange={(e) => setCategoryForm({ ...categoryForm, parentCategory: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all"
                  >
                    {parentCategories.map(p => (
                      <option key={p.id || 'none'} value={p.id}>
                        {p.name || 'None (Top Level)'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={categoryForm.displayOrder}
                    onChange={(e) => setCategoryForm({ ...categoryForm, displayOrder: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <textarea
                    value={categoryForm.description}
                    onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100 resize-none"
                    rows="2"
                    placeholder="Category description..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SEO Title</label>
                  <input
                    type="text"
                    value={categoryForm.seoTitle}
                    onChange={(e) => setCategoryForm({ ...categoryForm, seoTitle: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100"
                    placeholder="SEO Title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SEO Description</label>
                  <textarea
                    value={categoryForm.seoDescription}
                    onChange={(e) => setCategoryForm({ ...categoryForm, seoDescription: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100 resize-none"
                    rows="2"
                    placeholder="SEO Description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select
                    value={categoryForm.status}
                    onChange={(e) => setCategoryForm({ ...categoryForm, status: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all"
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
                className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all hover:scale-105"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== EDIT CATEGORY MODAL ===== */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
            
            <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Edit className="w-5 h-5 text-emerald-600" />
                Edit Category
              </h3>
              <button onClick={() => { setShowEditModal(false); resetForm(); }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all hover:rotate-90">
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Icon (emoji)</label>
                  <input
                    type="text"
                    value={categoryForm.icon}
                    onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100"
                    maxLength="2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parent Category</label>
                  <select
                    value={categoryForm.parentCategory}
                    onChange={(e) => setCategoryForm({ ...categoryForm, parentCategory: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all"
                  >
                    {parentCategories.map(p => (
                      <option key={p.id || 'none'} value={p.id}>
                        {p.name || 'None (Top Level)'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={categoryForm.displayOrder}
                    onChange={(e) => setCategoryForm({ ...categoryForm, displayOrder: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <textarea
                    value={categoryForm.description}
                    onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100 resize-none"
                    rows="2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SEO Title</label>
                  <input
                    type="text"
                    value={categoryForm.seoTitle}
                    onChange={(e) => setCategoryForm({ ...categoryForm, seoTitle: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SEO Description</label>
                  <textarea
                    value={categoryForm.seoDescription}
                    onChange={(e) => setCategoryForm({ ...categoryForm, seoDescription: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100 resize-none"
                    rows="2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select
                    value={categoryForm.status}
                    onChange={(e) => setCategoryForm({ ...categoryForm, status: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all"
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
                className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateCategory}
                className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all hover:scale-105"
              >
                Update Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== IMAGE MANAGER MODAL ===== */}
      {showImageManager && selectedCategory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            
            <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-blue-600" />
                Manage Images - {selectedCategory.name}
              </h3>
              <button onClick={() => { setShowImageManager(false); }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all hover:rotate-90">
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {/* Add Image Form */}
              <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4 mb-6">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-emerald-600" />
                  Add New Image
                </h4>
                
                {/* Upload Method Toggle */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setImageManager({ ...imageManager, uploadMethod: 'url', newImageFile: null, newImagePreview: null })}
                    className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      imageManager.uploadMethod === 'url'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Link className="w-4 h-4 inline mr-1" />
                    URL
                  </button>
                  <button
                    onClick={() => setImageManager({ ...imageManager, uploadMethod: 'file', newImageUrl: '' })}
                    className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      imageManager.uploadMethod === 'file'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    <FileImage className="w-4 h-4 inline mr-1" />
                    File Upload
                  </button>
                </div>

                {imageManager.uploadMethod === 'url' ? (
                  // URL Input Method
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Image URL <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={imageManager.newImageUrl}
                        onChange={(e) => setImageManager({ ...imageManager, newImageUrl: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Image Alt Text</label>
                      <input
                        type="text"
                        value={imageManager.newImageAlt}
                        onChange={(e) => setImageManager({ ...imageManager, newImageAlt: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all"
                        placeholder="Descriptive alt text"
                      />
                    </div>
                  </div>
                ) : (
                  // File Upload Method with Drag & Drop
                  <div className="space-y-3">
                    <div
                      className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-emerald-500 transition-all cursor-pointer"
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      
                      {imageManager.newImagePreview ? (
                        <div className="relative">
                          <img 
                            src={imageManager.newImagePreview} 
                            alt="Preview"
                            className="max-h-48 mx-auto rounded-lg object-contain"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              clearImageSelection();
                            }}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <CloudUpload className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Drag & drop an image here, or click to browse
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Supports JPG, PNG, GIF, SVG (Max 5MB)
                          </p>
                        </>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Image Alt Text</label>
                      <input
                        type="text"
                        value={imageManager.newImageAlt}
                        onChange={(e) => setImageManager({ ...imageManager, newImageAlt: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all"
                        placeholder="Descriptive alt text"
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={handleAddImage}
                  className="w-full mt-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!imageManager.newImageUrl && !imageManager.newImageFile}
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  Add Image
                </button>
              </div>

              {/* Image Gallery */}
              {imageManager.images.length === 0 ? (
                <div className="text-center py-8">
                  <ImageIcon className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                  <p className="text-gray-400">No images added yet</p>
                  <p className="text-xs text-gray-400">Add images using the form above</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {imageManager.images.map((image) => (
                      <div key={image.id} className="relative group bg-gray-50 dark:bg-gray-700/30 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                        <div className="aspect-square relative">
                          <img 
                            src={image.url} 
                            alt={image.alt || 'Category image'}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = `https://via.placeholder.com/200/10B981/ffffff?text=Error`;
                            }}
                          />
                          {image.isPrimary && (
                            <div className="absolute top-2 left-2 bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full font-medium shadow-lg">
                              Primary
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                            {!image.isPrimary && (
                              <button
                                onClick={() => handleSetPrimaryImage(image.id)}
                                className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all hover:scale-110"
                                title="Set as Primary"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteImage(image.id)}
                              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all hover:scale-110"
                              title="Delete Image"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="p-2">
                          <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{image.alt || 'No alt text'}</p>
                          <p className="text-[10px] text-gray-400 truncate">{image.url.substring(0, 30)}...</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex justify-between items-center gap-3 border-t border-gray-100 dark:border-gray-700 pt-4">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Total: <strong>{imageManager.images.length}</strong> images
                      {imageManager.images.some(img => img.isPrimary) && (
                        <span className="ml-2 text-emerald-600">✓ Primary set</span>
                      )}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={handleDeleteAllImages}
                        className="px-4 py-2 bg-red-500/10 text-red-600 rounded-xl hover:bg-red-500/20 transition-all text-sm font-medium"
                      >
                        <Trash2 className="w-4 h-4 inline mr-1" />
                        Delete All
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-3 p-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex-shrink-0">
              <button
                onClick={() => { setShowImageManager(false); }}
                className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                Close
              </button>
              <button
                onClick={() => { 
                  setShowImageManager(false);
                  loadCategories();
                  alert('✅ Images updated successfully!');
                }}
                className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== SUB CATEGORY MODAL ===== */}
      {showSubCategoryModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col overflow-hidden">
            
            <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-600" />
                Add Sub-Category
              </h3>
              <button onClick={() => { setShowSubCategoryModal(false); resetSubForm(); }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all hover:rotate-90">
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parent Category</label>
                  <select
                    value={subCategoryForm.parentId}
                    onChange={(e) => setSubCategoryForm({ ...subCategoryForm, parentId: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all"
                  >
                    <option value="">Select Parent Category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sub-Category Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={subCategoryForm.name}
                    onChange={(e) => setSubCategoryForm({ ...subCategoryForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100"
                    placeholder="Enter sub-category name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Icon (emoji)</label>
                  <input
                    type="text"
                    value={subCategoryForm.icon}
                    onChange={(e) => setSubCategoryForm({ ...subCategoryForm, icon: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all focus:ring-2 focus:ring-emerald-100"
                    placeholder="📄"
                    maxLength="2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select
                    value={subCategoryForm.status}
                    onChange={(e) => setSubCategoryForm({ ...subCategoryForm, status: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all"
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
                className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSubCategory}
                className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all hover:scale-105"
              >
                Add Sub-Category
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
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
        .aspect-square {
          aspect-ratio: 1 / 1;
        }
      `}</style>
    </div>
  );
};

export default CategoryManagement;