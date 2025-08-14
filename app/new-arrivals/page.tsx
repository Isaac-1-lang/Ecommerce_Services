"use client";

import { useState, useEffect } from 'react';
import { FiStar, FiHeart, FiShoppingCart, FiFilter, FiGrid, FiList, FiClock } from 'react-icons/fi';
import ProductCard from '../../components/ProductCard';
import FilterSidebar from '../../components/FilterSidebar';

interface NewArrivalProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  arrivalDate: string;
  discount?: number;
}

const mockNewArrivals: NewArrivalProduct[] = [
  {
    id: '1',
    name: 'Apple iPhone 15 Pro Max',
    price: 1199.99,
    originalPrice: 1299.99,
    image: '/api/placeholder/300/300',
    category: 'Electronics',
    rating: 4.8,
    reviewCount: 156,
    isNew: true,
    arrivalDate: '2024-01-25',
    discount: 8
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    price: 1299.99,
    image: '/api/placeholder/300/300',
    category: 'Electronics',
    rating: 4.7,
    reviewCount: 89,
    isNew: true,
    arrivalDate: '2024-01-24'
  },
  {
    id: '3',
    name: 'Nike Air Jordan 1 Retro High',
    price: 179.99,
    originalPrice: 199.99,
    image: '/api/placeholder/300/300',
    category: 'Fashion',
    rating: 4.6,
    reviewCount: 234,
    isNew: true,
    arrivalDate: '2024-01-23',
    discount: 10
  },
  {
    id: '4',
    name: 'Sony WH-1000XM6 Headphones',
    price: 449.99,
    image: '/api/placeholder/300/300',
    category: 'Electronics',
    rating: 4.9,
    reviewCount: 67,
    isNew: true,
    arrivalDate: '2024-01-22'
  },
  {
    id: '5',
    name: 'MacBook Pro 14" M3 Pro',
    price: 1999.99,
    image: '/api/placeholder/300/300',
    category: 'Electronics',
    rating: 4.8,
    reviewCount: 45,
    isNew: true,
    arrivalDate: '2024-01-21'
  },
  {
    id: '6',
    name: 'Adidas Ultraboost 22',
    price: 189.99,
    originalPrice: 219.99,
    image: '/api/placeholder/300/300',
    category: 'Fashion',
    rating: 4.5,
    reviewCount: 178,
    isNew: true,
    arrivalDate: '2024-01-20',
    discount: 14
  },
  {
    id: '7',
    name: 'Dyson V15 Detect Absolute',
    price: 699.99,
    image: '/api/placeholder/300/300',
    category: 'Home & Garden',
    rating: 4.7,
    reviewCount: 92,
    isNew: true,
    arrivalDate: '2024-01-19'
  },
  {
    id: '8',
    name: 'Canon EOS R6 Mark II',
    price: 2499.99,
    image: '/api/placeholder/300/300',
    category: 'Electronics',
    rating: 4.8,
    reviewCount: 34,
    isNew: true,
    arrivalDate: '2024-01-18'
  }
];

export default function NewArrivalsPage() {
  const [products, setProducts] = useState<NewArrivalProduct[]>(mockNewArrivals);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.arrivalDate).getTime() - new Date(a.arrivalDate).getTime();
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const formatArrivalDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Just arrived';
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FiClock className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">New Arrivals</h1>
          </div>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Discover the latest products that just arrived in our store
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
                {products.length} new products
              </span>
            </div>

            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name A-Z</option>
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
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-64 flex-shrink-0">
              <FilterSidebar />
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <div key={product.id} className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700 overflow-hidden group">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-primary text-white px-2 py-1 text-xs font-semibold rounded-full">
                          NEW
                        </span>
                      </div>
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
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                          {formatArrivalDate(product.arrivalDate)}
                        </span>
                      </div>
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
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedProducts.map((product) => (
                  <div key={product.id} className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700 p-4">
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute top-1 left-1">
                          <span className="bg-primary text-white px-1 py-0.5 text-xs font-semibold rounded">
                            NEW
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                              {product.name}
                            </h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                              {product.category} • {formatArrivalDate(product.arrivalDate)}
                            </p>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center">
                                <FiStar className="h-3 w-3 text-yellow-400 fill-current" />
                                <span className="text-sm text-neutral-600 dark:text-neutral-400 ml-1">
                                  {product.rating} ({product.reviewCount})
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
                                ${product.price.toFixed(2)}
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-neutral-500 dark:text-neutral-400 line-through">
                                  ${product.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors">
                                <FiHeart className="h-4 w-4" />
                              </button>
                              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm">
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
