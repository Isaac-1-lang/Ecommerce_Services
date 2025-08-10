"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiStar, FiShoppingCart, FiHeart, FiImage } from "react-icons/fi";
import { getProducts } from "../services/productService";
import { useCartStore } from "../features/cart/store";
import { useWishlistStore } from "../features/wishlist/store";
import { formatPrice } from "../lib/formatPrice";
import { Product } from "../types/product";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const addToCart = useCartStore((s) => s.addItem);
  const addToWishlist = useWishlistStore((s) => s.addItem);
  const removeFromWishlist = useWishlistStore((s) => s.removeItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      setLoading(true);
      try {
        const products = await getProducts();
        // Take first 8 products as featured
        setFeaturedProducts(products.slice(0, 8));
      } catch (error) {
        console.error("Failed to load featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || "",
      quantity: 1,
    });
  };

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Welcome to Now
            </h1>
            <p className="mt-6 text-xl max-w-3xl mx-auto">
              Discover amazing products at unbeatable prices. Shop the latest trends 
              and find everything you need in one place.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/products"
                className="bg-white text-primary px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                Shop Now
                <FiArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/auth/register"
                className="border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white hover:text-primary transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <FiShoppingCart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Fast Shipping
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Free shipping on orders over $50. Get your items delivered quickly and securely.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <FiStar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Quality Products
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Curated selection of high-quality products from trusted brands and sellers.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <FiHeart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Customer Satisfaction
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                30-day return policy and excellent customer support to ensure your satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Featured Products
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Discover our most popular items
              </p>
            </div>
            <Link
              href="/products"
              className="text-primary hover:text-primary/80 font-medium flex items-center gap-2"
            >
              View All
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <div key={product.id} className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                  <div className="aspect-square overflow-hidden rounded-t-lg bg-gray-100 relative">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        priority={false}
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    {/* Fallback placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400" style={{ display: product.image ? 'none' : 'flex' }}>
                      <FiImage className="w-16 h-16" />
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`h-4 w-4 ${
                            i < (product.rating || 0)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                        ({product.reviewCount})
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        {formatPrice(product.price)}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleWishlistToggle(product)}
                          className={`p-2 rounded-full transition-colors ${
                            isInWishlist(product.id)
                              ? "text-primary bg-primary/10"
                              : "text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          <FiHeart className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="p-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                        >
                          <FiShoppingCart className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our wide range of categories and find exactly what you&apos;re looking for
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: "Shoes", 
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop&crop=center", 
                href: "/products?category=Shoes" 
              },
              { 
                name: "Bags", 
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center", 
                href: "/products?category=Bags" 
              },
              { 
                name: "Accessories", 
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&crop=center", 
                href: "/products?category=Accessories" 
              },
            ].map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={400}
                    height={300}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest products, exclusive offers, and updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
