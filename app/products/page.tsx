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

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  
  const {
    products,
    filters,
    sortBy,
    setProducts,
    setFilters,
    setSortBy,
    clearFilters
  } = useProductsStore();

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const productData = await getProducts();
        setProducts(productData);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [setProducts]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    // Update URL params
    const params = new URLSearchParams(searchParams);
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
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
    handleFilterChange(newFilters);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumbs 
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" }
        ]} 
      />
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold">All Products</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Discover our collection of amazing products
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 flex-shrink-0">
          <FilterSidebar 
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
          />
        </aside>

        <main className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <CategoryFilter 
                selectedCategory={filters.category}
                onCategoryChange={handleCategoryChange}
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {products.length} products
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
              <SortDropdown 
                value={sortBy}
                onChange={handleSortChange}
              />
            </div>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No products found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={clearFilters}
                className="text-primary hover:underline"
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
