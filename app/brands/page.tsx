"use client";

import { useEffect, useState } from 'react';
import { FiStar, FiHeart, FiShoppingCart, FiSearch, FiGrid, FiList, FiFilter } from 'react-icons/fi';
import { brandService, type Brand } from '../../services/brandService';

interface BrandProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string | {
    imageUrl: string;
    altText?: string;
    sortOrder?: number;
    primary?: boolean;
  };
  primaryImage?: {
    id: number;
    imageUrl: string;
    altText?: string;
    sortOrder?: number;
    primary?: boolean;
  };
  rating: number;
  reviewCount: number;
  discount?: number;
}



export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [brandProducts, setBrandProducts] = useState<BrandProduct[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filteredBrands = brands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || brand.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const sortedBrands = [...filteredBrands].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.rating - a.rating;
  });

  const categories = [...new Set(brands.map(brand => brand.category))];

  useEffect(() => {
    let isMounted = true;
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const data = await brandService.list();
        if (isMounted) setBrands(data);
      } catch (e) {
        if (isMounted) setError('Failed to load brands');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchBrands();
    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center text-neutral-600 dark:text-neutral-300">Loading brands...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">Brands</h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Discover products from your favorite brands
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
              >
                <FiFilter className="h-4 w-4" />
                Filters
              </button>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {filteredBrands.length} brands
              </span>
            </div>

            <div className="flex items-center gap-4">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category.toLowerCase()}>{category}</option>
                ))}
              </select>

              <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-neutral-600 text-primary shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
                  }`}
                >
                  <FiGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-neutral-600 text-primary shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
                  }`}
                >
                  <FiList className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mt-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 placeholder-neutral-500 dark:placeholder-neutral-400"
              />
            </div>
          </div>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {sortedBrands.map((brand) => (
            <div
              key={brand.id}
              onClick={() => setSelectedBrand(brand)}
              className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700 p-6 cursor-pointer hover:shadow-lg transition-all duration-300 group"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-700">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2 group-hover:text-primary transition-colors">
                  {brand.name}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
                  {brand.description}
                </p>
                <div className="flex items-center justify-center gap-4 mb-3">
                  <div className="flex items-center">
                    <FiStar className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-400 ml-1">
                      {brand.rating} ({brand.reviewCount})
                    </span>
                  </div>
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                  {brand.productCount} products
                </div>
                {brand.featured && (
                  <div className="mt-2">
                    <span className="bg-primary text-white px-2 py-1 text-xs font-semibold rounded-full">
                      Featured
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Brand Products */}
        {selectedBrand && (
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-700">
                  <img
                    src={selectedBrand.logo}
                    alt={selectedBrand.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                    {selectedBrand.name}
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {selectedBrand.productCount} products
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedBrand(null)}
                className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {brandProducts.length === 0 ? (
                <div className="col-span-full text-center text-neutral-600 dark:text-neutral-300 py-8">
                  No products found for this brand yet.
                </div>
              ) : (
              brandProducts.map((product) => (
                <div key={product.id} className="bg-neutral-50 dark:bg-neutral-700 rounded-lg overflow-hidden group">
                  <div className="relative">
                                         <img
                      src={product.primaryImage?.imageUrl || (typeof product.image === 'string' ? product.image : product.image?.imageUrl) || ''}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.discount && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-danger text-white px-2 py-1 text-xs font-semibold rounded-full">
                          -{product.discount}%
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                        <button className="p-2 bg-white rounded-full shadow-lg hover:bg-neutral-100 transition-colors">
                          <FiHeart className="h-4 w-4 text-neutral-600" />
                        </button>
                        <button className="p-2 bg-white rounded-full shadow-lg hover:bg-neutral-100 transition-colors">
                          <FiShoppingCart className="h-4 w-4 text-neutral-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        <FiStar className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-sm text-neutral-600 dark:text-neutral-400 ml-1">
                          {product.rating} ({product.reviewCount})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-neutral-500 dark:text-neutral-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
