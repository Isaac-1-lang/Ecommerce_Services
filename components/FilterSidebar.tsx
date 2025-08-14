"use client";

import { useState } from 'react';
import { FiFilter, FiX, FiStar, FiTag, FiTruck, FiPackage, FiTrendingUp } from 'react-icons/fi';
import CategoryFilter from "./CategoryFilter";

interface ProductFilters {
  category: string;
  priceRange: [number, number];
  rating: number;
  brand: string[];
  availability: string[];
  discount: boolean;
  newArrivals: boolean;
  featured: boolean;
  sortBy: string;
  searchKeyword: string;
}

interface FilterSidebarProps {
  categories?: string[];
  filters?: Partial<ProductFilters>;
  onFilterChange?: (newFilters: ProductFilters) => void;
  onClearFilters?: () => void;
  className?: string;
}

const defaultFilters: ProductFilters = {
  category: '',
  priceRange: [0, 1000],
  rating: 0,
  brand: [],
  availability: [],
  discount: false,
  newArrivals: false,
  featured: false,
  sortBy: 'relevance',
  searchKeyword: '',
};

const mockCategories = [
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Sports & Outdoors',
  'Beauty & Health',
  'Automotive',
  'Toys & Games',
  'Books & Media'
];

const mockBrands = [
  'Apple',
  'Samsung',
  'Nike',
  'Adidas',
  'Sony',
  'Canon',
  'Dyson',
  'Levi\'s'
];

export default function FilterSidebar({ 
  categories = mockCategories,
  filters = defaultFilters,
  onFilterChange,
  onClearFilters,
  className = ''
}: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState<ProductFilters>({
    ...defaultFilters,
    ...filters
  });

  const handleFilterChange = (updates: Partial<ProductFilters>) => {
    const newFilters = { ...localFilters, ...updates };
    setLocalFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleClearFilters = () => {
    setLocalFilters(defaultFilters);
    onClearFilters?.();
  };

  const handleBrandToggle = (brand: string) => {
    const newBrands = localFilters.brand.includes(brand)
      ? localFilters.brand.filter(b => b !== brand)
      : [...localFilters.brand, brand];
    handleFilterChange({ brand: newBrands });
  };

  const handleAvailabilityToggle = (availability: string) => {
    const newAvailability = localFilters.availability.includes(availability)
      ? localFilters.availability.filter(a => a !== availability)
      : [...localFilters.availability, availability];
    handleFilterChange({ availability: newAvailability });
  };

  return (
    <aside className={`w-full md:w-64 shrink-0 space-y-6 bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
          <FiFilter className="h-5 w-5" />
          Filters
        </h3>
        <button
          onClick={handleClearFilters}
          className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Search */}
      <div>
        <h4 className="mb-3 text-sm font-medium text-neutral-700 dark:text-neutral-300">Search</h4>
        <input
          type="text"
          placeholder="Search products..."
          value={localFilters.searchKeyword}
          onChange={(e) => handleFilterChange({ searchKeyword: e.target.value })}
          className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 placeholder-neutral-500 dark:placeholder-neutral-400"
        />
      </div>

      {/* Categories */}
      <div>
        <h4 className="mb-3 text-sm font-medium text-neutral-700 dark:text-neutral-300">Categories</h4>
        <CategoryFilter 
          categories={categories}
          selectedCategory={localFilters.category}
          onCategoryChange={(category) => handleFilterChange({ category })}
        />
      </div>

      {/* Price Range */}
      <div>
        <h4 className="mb-3 text-sm font-medium text-neutral-700 dark:text-neutral-300">Price Range</h4>
        <div className="flex items-center gap-2">
          <input 
            type="number" 
            placeholder="Min" 
            value={localFilters.priceRange[0] || ''}
            onChange={(e) => handleFilterChange({ 
              priceRange: [Number(e.target.value) || 0, localFilters.priceRange[1]] 
            })}
            className="w-20 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200" 
          />
          <span className="text-neutral-500">-</span>
          <input 
            type="number" 
            placeholder="Max" 
            value={localFilters.priceRange[1] || ''}
            onChange={(e) => handleFilterChange({ 
              priceRange: [localFilters.priceRange[0], Number(e.target.value) || 1000] 
            })}
            className="w-20 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200" 
          />
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="mb-3 text-sm font-medium text-neutral-700 dark:text-neutral-300">Rating</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="rating"
                checked={localFilters.rating === rating}
                onChange={() => handleFilterChange({ rating: localFilters.rating === rating ? 0 : rating })}
                className="text-primary focus:ring-primary" 
              />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar 
                    key={i} 
                    className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-neutral-300'}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">{rating}+</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h4 className="mb-3 text-sm font-medium text-neutral-700 dark:text-neutral-300">Brands</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {mockBrands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={localFilters.brand.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
                className="text-primary focus:ring-primary" 
              />
              <span className="text-sm text-neutral-600 dark:text-neutral-400">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h4 className="mb-3 text-sm font-medium text-neutral-700 dark:text-neutral-300">Availability</h4>
        <div className="space-y-2">
          {['In Stock', 'Out of Stock', 'Pre-order'].map((availability) => (
            <label key={availability} className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={localFilters.availability.includes(availability)}
                onChange={() => handleAvailabilityToggle(availability)}
                className="text-primary focus:ring-primary" 
              />
              <span className="text-sm text-neutral-600 dark:text-neutral-400">{availability}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Special Filters */}
      <div>
        <h4 className="mb-3 text-sm font-medium text-neutral-700 dark:text-neutral-300">Special</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={localFilters.discount}
              onChange={(e) => handleFilterChange({ discount: e.target.checked })}
              className="text-primary focus:ring-primary" 
            />
            <FiTag className="h-4 w-4 text-warning" />
            <span className="text-sm text-neutral-600 dark:text-neutral-400">On Sale</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={localFilters.newArrivals}
              onChange={(e) => handleFilterChange({ newArrivals: e.target.checked })}
              className="text-primary focus:ring-primary" 
            />
            <FiPackage className="h-4 w-4 text-primary" />
            <span className="text-sm text-neutral-600 dark:text-neutral-400">New Arrivals</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={localFilters.featured}
              onChange={(e) => handleFilterChange({ featured: e.target.checked })}
              className="text-primary focus:ring-primary" 
            />
            <FiTrendingUp className="h-4 w-4 text-success" />
            <span className="text-sm text-neutral-600 dark:text-neutral-400">Featured</span>
          </label>
        </div>
      </div>

      {/* Sort By */}
      <div>
        <h4 className="mb-3 text-sm font-medium text-neutral-700 dark:text-neutral-300">Sort By</h4>
        <select
          value={localFilters.sortBy}
          onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
          className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
        >
          <option value="relevance">Relevance</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="newest">Newest First</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>
    </aside>
  );
}
