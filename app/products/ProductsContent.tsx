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
        setProducts(productData || []);
      } catch (error) {
        console.error("Failed to load products:", error);
        setProducts([]);
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
      <div className="container-responsive py-8 lg:py-12">
        <div className="animate-pulse">
          <div className="h-10 bg-light-interactive-disabled dark:bg-gray-700 rounded-xl w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-light-interactive-disabled dark:bg-gray-700 rounded-2xl h-80"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-responsive py-8 lg:py-12">
      <Breadcrumbs 
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" }
        ]} 
      />
      
      <div className="mb-6 lg:mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-light-text-primary dark:text-white">All Products</h1>
        <p className="text-base lg:text-lg text-light-text-secondary dark:text-gray-400 mt-2 lg:mt-3">
          Discover our collection of amazing products
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-light-surface-elevated dark:bg-gray-800 border border-light-border-subtle dark:border-gray-700 rounded-xl shadow-light-soft mobile-touch-target hover:shadow-light-md transition-all duration-200"
          >
            <FiFilter className="h-5 w-5 text-light-text-secondary dark:text-gray-400" />
            <span className="text-base font-medium text-light-text-primary dark:text-white">Filters</span>
            <span className="text-sm text-light-text-muted dark:text-gray-500">({getActiveFilterCount()})</span>
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 lg:gap-6 mb-6 lg:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <CategoryFilter 
                categories={categories}
                selectedCategory={filters.category}
                onCategoryChange={handleCategoryChange}
              />
              <div className="flex items-center gap-2 px-3 py-2 bg-light-surface-secondary dark:bg-neutral-800 rounded-lg border border-light-border-subtle dark:border-neutral-700">
                <span className="text-sm lg:text-base text-light-text-secondary dark:text-gray-400">
                  {products.length} products
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-sm lg:text-base text-light-text-secondary dark:text-gray-400 font-medium">Sort by:</span>
              <SortDropdown 
                value={sortBy}
                onChange={handleSortChange}
              />
            </div>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12 lg:py-16">
              <div className="w-20 h-20 bg-light-interactive-disabled dark:bg-gray-700 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <FiFilter className="h-10 w-10 text-light-text-muted dark:text-gray-400" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-light-text-primary dark:text-white mb-3">
                No products found
              </h3>
              <p className="text-base lg:text-lg text-light-text-secondary dark:text-gray-400 mb-6">
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-600 transition-colors duration-200 font-medium mobile-touch-target"
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
