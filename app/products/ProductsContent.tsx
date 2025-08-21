"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductGrid from "../../components/ProductGrid";
import FilterSidebar from "../../components/FilterSidebar";
import SortDropdown from "../../components/SortDropdown";
import CategoryFilter from "../../components/CategoryFilter";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useProductsStore } from "../../features/products/store";
import { getProducts } from "../../services/productService";
import { ALL_PRODUCTS } from "../../data/dummyProducts";
import type { ProductFilters } from "../../features/products/store";
import type { Product } from "../../types/product";
import { FiFilter } from "react-icons/fi";

export default function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  const {
    products,
    filters,
    sortBy,
    setProducts,
    setFilters,
    setSortBy,
    clearFilters
  } = useProductsStore();

  // Extract unique categories from products
  const categories = [...new Set(products.map((product: Product) => product.category))].filter(Boolean);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const productData = await getProducts();
        if (productData && productData.length > 0) {
          setProducts(productData);
        } else {
          // Fallback to dummy products if API returns empty
          setProducts(ALL_PRODUCTS);
        }
      } catch (error) {
        console.error("Failed to load products:", error);
        // Fallback to dummy products on error
        setProducts(ALL_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [setProducts]);

  const handleFilterChange = (newFilters: any) => {
    // Convert FilterSidebar filters to store filters
    const storeFilters: ProductFilters = {
      category: newFilters.category || '',
      priceRange: newFilters.priceRange || [0, 1000],
      rating: newFilters.rating || 0,
      query: newFilters.searchKeyword || ''
    };
    setFilters(storeFilters);
    // Update URL params
    const params = new URLSearchParams(searchParams);
    Object.entries(storeFilters).forEach(([key, value]) => {
      if (value && value !== '' && value !== 0) {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    });
    router.push(`/products?${params.toString()}`);
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    const params = new URLSearchParams(searchParams);
    params.set("sort", newSortBy);
    router.push(`/products?${params.toString()}`);
  };

  const handleCategoryChange = (category: string) => {
    const newFilters = { ...filters, category };
    setFilters(newFilters);
  };

  // Calculate active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.category) count++;
    if (filters.query) count++;
    if (filters.rating > 0) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) count++;
    return count;
  };

  if (loading) {
    return (
      <div className="container-responsive py-6 lg:py-10">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-80"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-responsive py-6 lg:py-10">
      <Breadcrumbs 
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" }
        ]} 
      />
      
      <div className="mb-4 lg:mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">All Products</h1>
        <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 mt-1 lg:mt-2">
          Discover our collection of amazing products
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm mobile-touch-target"
          >
            <FiFilter className="h-4 w-4" />
            <span className="text-sm font-medium">Filters</span>
            <span className="text-xs text-gray-500">({getActiveFilterCount()})</span>
          </button>
        </div>

        {/* Filter Sidebar */}
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-64 lg:flex-shrink-0`}>
          <FilterSidebar 
            categories={categories}
            filters={{
              category: filters.category,
              priceRange: filters.priceRange,
              rating: filters.rating,
              searchKeyword: filters.query,
              brand: [],
              availability: [],
              discount: false,
              newArrivals: false,
              featured: false,
              sortBy: sortBy
            }}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
            className="lg:sticky lg:top-4"
          />
        </div>

        <main className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 lg:gap-4 mb-4 lg:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <CategoryFilter 
                categories={categories}
                selectedCategory={filters.category}
                onCategoryChange={handleCategoryChange}
              />
              <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                {products.length} products
              </span>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
              <SortDropdown 
                value={sortBy}
                onChange={handleSortChange}
              />
            </div>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-8 lg:py-12">
              <h3 className="text-base lg:text-lg font-medium text-gray-900 dark:text-white mb-2">
                No products found
              </h3>
              <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 mb-4">
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:underline text-sm lg:text-base mobile-touch-target"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </main>
      </div>
    </div>
  );
}
