"use client";

import { useState } from 'react';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
// Dummy categories removed; start with empty list or fetch from backend when available

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '📱',
    featured: false,
    subcategories: ''
  });

  const icons = ['📱', '👕', '🏠', '⚽', '💄', '🖥️', '📚', '🎮', '🚗', '🍽️'];

  const handleAddCategory = () => {
    if (formData.name.trim()) {
      const newCategory = {
        id: formData.name.toLowerCase().replace(/\s+/g, '-'),
        name: formData.name,
        slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
        description: formData.description,
        icon: formData.icon,
        featured: formData.featured,
        productCount: 0,
        subcategories: formData.subcategories ? formData.subcategories.split(',').map(s => s.trim()) : []
      };
      
      setCategories(prev => [...prev, newCategory]);
      setIsAddModalOpen(false);
      setFormData({ name: '', description: '', icon: '📱', featured: false, subcategories: '' });
    }
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      icon: category.icon,
      featured: category.featured,
      subcategories: category.subcategories?.join(', ') || ''
    });
    setIsAddModalOpen(true);
  };

  const handleUpdateCategory = () => {
    if (editingCategory && formData.name.trim()) {
      setCategories(prev => prev.map(cat => 
        cat.id === editingCategory.id 
          ? {
              ...cat,
              name: formData.name,
              slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
              description: formData.description,
              icon: formData.icon,
              featured: formData.featured,
              subcategories: formData.subcategories ? formData.subcategories.split(',').map(s => s.trim()) : []
            }
          : cat
      ));
      
      setIsAddModalOpen(false);
      setEditingCategory(null);
      setFormData({ name: '', description: '', icon: '📱', featured: false, subcategories: '' });
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', icon: '📱', featured: false, subcategories: '' });
    setEditingCategory(null);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Categories</h1>
          <p className="text-neutral-600 mt-1">Organize your products into categories</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FiPlus className="h-4 w-4" />
          Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white p-6 rounded-xl shadow-soft border border-neutral-200 hover:shadow-soft-lg transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{category.icon}</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditCategory(category)}
                  className="text-warning hover:text-warning-600 p-1 rounded hover:bg-warning/10 transition-colors"
                  title="Edit"
                >
                  <FiEdit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-error hover:text-error-600 p-1 rounded hover:bg-error/10 transition-colors"
                  title="Delete"
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-neutral-800 mb-2">{category.name}</h3>
            <p className="text-neutral-600 text-sm mb-4">{category.description}</p>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-500">
                {category.productCount} products
              </span>
              {category.featured && (
                <span className="bg-primary/10 text-primary-800 px-2 py-1 rounded-full text-xs font-medium">
                  Featured
                </span>
              )}
            </div>

            {category.subcategories && category.subcategories.length > 0 && (
              <div className="mt-4 pt-4 border-t border-neutral-100">
                <p className="text-xs text-neutral-500 mb-2">Subcategories:</p>
                <div className="flex flex-wrap gap-1">
                  {category.subcategories.slice(0, 3).map((sub: string, index: number) => (
                    <span key={index} className="bg-neutral-100 text-neutral-600 px-2 py-1 rounded text-xs">
                      {sub}
                    </span>
                  ))}
                  {category.subcategories.length > 3 && (
                    <span className="bg-neutral-100 text-neutral-600 px-2 py-1 rounded text-xs">
                      +{category.subcategories.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add/Edit Category Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-soft-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-neutral-800 mb-4">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Enter category name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Enter category description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Icon
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {icons.map((icon) => (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, icon }))}
                        className={`p-2 text-2xl rounded-lg border-2 transition-all ${
                          formData.icon === icon
                            ? 'border-primary bg-primary/10'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Subcategories
                  </label>
                  <input
                    type="text"
                    value={formData.subcategories}
                    onChange={(e) => setFormData(prev => ({ ...prev, subcategories: e.target.value }))}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Subcategory1, Subcategory2, Subcategory3"
                  />
                  <p className="text-xs text-neutral-500 mt-1">Separate with commas</p>
                </div>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-neutral-700">Featured Category</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={resetForm}
                  className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
                  className="bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {editingCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
