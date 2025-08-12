"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FiPlus, FiEdit, FiTrash2, FiEye, FiSearch, FiFilter } from 'react-icons/fi';
import { ALL_PRODUCTS } from '../../../data/dummyProducts';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Filter and sort products
  const filteredProducts = ALL_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.price - b.price;
      case 'stock':
        return a.stockQuantity - b.stockQuantity;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const categories = ['all', 'electronics', 'fashion', 'home-garden', 'sports-outdoors', 'beauty-health'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">Products</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">Manage your product catalog</p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FiPlus className="h-4 w-4" />
          Add Product
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 placeholder-neutral-500 dark:placeholder-neutral-400"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="stock">Sort by Stock</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-lg bg-neutral-200 flex items-center justify-center overflow-hidden">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-neutral-400 text-xs">No Image</span>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-neutral-900">{product.name}</div>
                        <div className="text-sm text-neutral-500">{product.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary-800">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-900">${product.price}</div>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <div className="text-sm text-neutral-500 line-through">${product.originalPrice}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-900">{product.stockQuantity}</div>
                    {product.stockQuantity < 10 && (
                      <div className="text-xs text-warning-600">Low Stock</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-1">
                      {product.isNew && (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-success/10 text-success-800">
                          New
                        </span>
                      )}
                      {product.isOnSale && (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-warning/10 text-warning-800">
                          Sale
                        </span>
                      )}
                      {product.isFeatured && (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary-800">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="text-primary hover:text-primary-600 p-1 rounded hover:bg-primary/10 transition-colors"
                        title="View"
                      >
                        <FiEye className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="text-warning hover:text-warning-600 p-1 rounded hover:bg-warning/10 transition-colors"
                        title="Edit"
                      >
                        <FiEdit className="h-4 w-4" />
                      </Link>
                      <button
                        className="text-error hover:text-error-600 p-1 rounded hover:bg-error/10 transition-colors"
                        title="Delete"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-neutral-50 px-6 py-3 border-t border-neutral-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-neutral-700">
              Showing {filteredProducts.length} of {ALL_PRODUCTS.length} products
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm border border-neutral-300 rounded hover:bg-white transition-colors">
                Previous
              </button>
              <span className="px-3 py-1 text-sm bg-primary text-white rounded">1</span>
              <button className="px-3 py-1 text-sm border border-neutral-300 rounded hover:bg-white transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
