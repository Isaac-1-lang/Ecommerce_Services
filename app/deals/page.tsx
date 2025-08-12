"use client";

import { useState, useEffect } from 'react';
import { FiClock, FiTag, FiStar, FiHeart, FiShoppingCart, FiSmartphone, FiShoppingBag, FiHome, FiActivity, FiHeart as FiHeartIcon, FiTruck, FiSmile, FiBook, FiBriefcase } from 'react-icons/fi';
import Link from 'next/link';

// Updated categories with proper icons
const DEAL_CATEGORIES = [
  {
    id: 'all',
    name: 'All Categories',
    icon: FiTag,
    description: 'Browse all deals'
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: FiSmartphone,
    description: 'Gadgets & devices',
    featured: true
  },
  {
    id: 'fashion',
    name: 'Fashion & Apparel',
    icon: FiShoppingBag,
    description: 'Clothing & accessories',
    featured: true
  },
  {
    id: 'home-garden',
    name: 'Home & Garden',
    icon: FiHome,
    description: 'Home essentials',
    featured: true
  },
  {
    id: 'sports-outdoors',
    name: 'Sports & Outdoors',
    icon: FiActivity,
    description: 'Fitness & outdoor gear',
    featured: true
  },
  {
    id: 'beauty-health',
    name: 'Beauty & Health',
    icon: FiHeartIcon,
    description: 'Personal care',
    featured: true
  },
  {
    id: 'automotive',
    name: 'Automotive',
    icon: FiTruck,
    description: 'Car accessories',
    featured: false
  },
  {
    id: 'toys-games',
    name: 'Toys & Games',
    icon: FiSmile,
    description: 'Fun for all ages',
    featured: false
  },
  {
    id: 'books-media',
    name: 'Books & Media',
    icon: FiBook,
    description: 'Reading & entertainment',
    featured: false
  },
  {
    id: 'office-supplies',
    name: 'Office & Business',
    icon: FiBriefcase,
    description: 'Professional essentials',
    featured: false
  }
];

interface Deal {
  id: string;
  name: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  endTime: string;
  isNew?: boolean;
  isHot?: boolean;
}

const mockDeals: Deal[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    originalPrice: 299.99,
    salePrice: 199.99,
    discount: 33,
    image: '/api/placeholder/300/300',
    category: 'electronics',
    rating: 4.8,
    reviewCount: 1247,
    endTime: '2024-12-31T23:59:59',
    isHot: true
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    originalPrice: 199.99,
    salePrice: 149.99,
    discount: 25,
    image: '/api/placeholder/300/300',
    category: 'electronics',
    rating: 4.6,
    reviewCount: 892,
    endTime: '2024-12-25T23:59:59'
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    originalPrice: 49.99,
    salePrice: 29.99,
    discount: 40,
    image: '/api/placeholder/300/300',
    category: 'fashion',
    rating: 4.7,
    reviewCount: 456,
    endTime: '2024-12-20T23:59:59',
    isNew: true
  },
  {
    id: '4',
    name: 'Kitchen Blender Set',
    originalPrice: 89.99,
    salePrice: 59.99,
    discount: 33,
    image: '/api/placeholder/300/300',
    category: 'home-garden',
    rating: 4.5,
    reviewCount: 234,
    endTime: '2024-12-28T23:59:59'
  },
  {
    id: '5',
    name: 'Gaming Mouse',
    originalPrice: 79.99,
    salePrice: 49.99,
    discount: 38,
    image: '/api/placeholder/300/300',
    category: 'electronics',
    rating: 4.9,
    reviewCount: 1567,
    endTime: '2024-12-22T23:59:59',
    isHot: true
  },
  {
    id: '6',
    name: 'Yoga Mat Premium',
    originalPrice: 39.99,
    salePrice: 24.99,
    discount: 38,
    image: '/api/placeholder/300/300',
    category: 'sports-outdoors',
    rating: 4.4,
    reviewCount: 189,
    endTime: '2024-12-26T23:59:59'
  },
  {
    id: '7',
    name: 'Skincare Set',
    originalPrice: 89.99,
    salePrice: 59.99,
    discount: 33,
    image: '/api/placeholder/300/300',
    category: 'beauty-health',
    rating: 4.6,
    reviewCount: 312,
    endTime: '2024-12-24T23:59:59'
  },
  {
    id: '8',
    name: 'Car Phone Mount',
    originalPrice: 29.99,
    salePrice: 19.99,
    discount: 33,
    image: '/api/placeholder/300/300',
    category: 'automotive',
    rating: 4.3,
    reviewCount: 156,
    endTime: '2024-12-27T23:59:59'
  }
];

export default function DealsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('discount');
  const [deals, setDeals] = useState<Deal[]>(mockDeals);

  const filteredDeals = deals.filter(deal => 
    selectedCategory === 'all' || deal.category === selectedCategory
  );

  const sortedDeals = [...filteredDeals].sort((a, b) => {
    switch (sortBy) {
      case 'discount':
        return b.discount - a.discount;
      case 'price':
        return a.salePrice - b.salePrice;
      case 'rating':
        return b.rating - a.rating;
      case 'ending':
        return new Date(a.endTime).getTime() - new Date(b.endTime).getTime();
      default:
        return 0;
    }
  });

  const formatTimeLeft = (endTime: string) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h left`;
    return 'Ending soon';
  };

  const addToCart = (dealId: string) => {
    // TODO: Implement add to cart functionality
    console.log('Adding to cart:', dealId);
  };

  const toggleWishlist = (dealId: string) => {
    // TODO: Implement wishlist functionality
    console.log('Toggling wishlist:', dealId);
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = DEAL_CATEGORIES.find(cat => cat.id === categoryId);
    return category?.icon || FiTag;
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🎉 Amazing Deals
          </h1>
          <p className="text-xl md:text-2xl text-primary-50 mb-8">
            Limited time offers on premium products
          </p>
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <FiClock className="h-5 w-5" />
              <span>Flash Sales</span>
            </div>
            <div className="flex items-center gap-2">
              <FiTag className="h-5 w-5" />
              <span>Up to 70% Off</span>
            </div>
            <div className="flex items-center gap-2">
              <FiStar className="h-5 w-5" />
              <span>Premium Quality</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-4">
            Browse by Category
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {DEAL_CATEGORIES.map((category) => {
              const IconComponent = category.icon;
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-center group ${
                    isSelected
                      ? 'border-primary bg-primary text-white shadow-soft'
                      : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-primary/50 hover:shadow-soft'
                  }`}
                >
                  <IconComponent className={`h-6 w-6 mx-auto mb-2 ${
                    isSelected ? 'text-white' : 'text-neutral-600 dark:text-neutral-400 group-hover:text-primary'
                  }`} />
                  <div className="text-xs font-medium">{category.name}</div>
                  <div className={`text-xs mt-1 ${
                    isSelected ? 'text-primary-100' : 'text-neutral-500 dark:text-neutral-400'
                  }`}>
                    {category.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            {filteredDeals.length} deals found
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-primary focus:border-primary text-sm"
            >
              <option value="discount">Highest Discount</option>
              <option value="price">Lowest Price</option>
              <option value="rating">Highest Rating</option>
              <option value="ending">Ending Soon</option>
            </select>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedDeals.map((deal) => {
            const CategoryIcon = getCategoryIcon(deal.category);
            return (
              <div
                key={deal.id}
                className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft overflow-hidden hover:shadow-soft-lg transition-all duration-300 group"
              >
                {/* Product Image */}
                <div className="relative">
                  <div className="aspect-square bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center">
                    <span className="text-neutral-400 dark:text-neutral-500 text-sm">
                      Product Image
                    </span>
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <div className="bg-error text-white text-xs font-bold px-2 py-1 rounded-full">
                      -{deal.discount}%
                    </div>
                    {deal.isHot && (
                      <div className="bg-secondary text-white text-xs font-bold px-2 py-1 rounded-full">
                        HOT
                      </div>
                    )}
                    {deal.isNew && (
                      <div className="bg-success text-white text-xs font-bold px-2 py-1 rounded-full">
                        NEW
                      </div>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(deal.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-neutral-800/90 rounded-full hover:bg-white dark:hover:bg-neutral-800 transition-colors"
                  >
                    <FiHeart className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <CategoryIcon className="h-3 w-3 text-primary" />
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
                      {DEAL_CATEGORIES.find(cat => cat.id === deal.category)?.name || deal.category}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {deal.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <FiStar className="h-3 w-3 text-rating fill-current" />
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">
                        {deal.rating}
                      </span>
                    </div>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      ({deal.reviewCount} reviews)
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-error">
                      ${deal.salePrice}
                    </span>
                    <span className="text-lg text-neutral-500 dark:text-neutral-400 line-through">
                      ${deal.originalPrice}
                    </span>
                  </div>

                  {/* Time Left */}
                  <div className="flex items-center gap-2 mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                    <FiClock className="h-4 w-4" />
                    <span>{formatTimeLeft(deal.endTime)}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(deal.id)}
                      className="flex-1 bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <FiShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </button>
                    <Link
                      href={`/products/${deal.id}`}
                      className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {sortedDeals.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
              No deals found
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Try adjusting your filters or check back later for new deals.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSortBy('discount');
              }}
              className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 bg-white dark:bg-neutral-800 rounded-xl p-8 text-center border border-neutral-200 dark:border-neutral-700">
          <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
            Don't Miss Out on Amazing Deals!
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about flash sales, 
            exclusive discounts, and limited-time offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
            <button className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
