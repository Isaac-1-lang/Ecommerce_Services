"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiStar, FiShoppingCart, FiHeart, FiImage, FiChevronLeft, FiChevronRight, FiTruck, FiShield, FiRefreshCw, FiClock } from "react-icons/fi";
import { getProducts } from "../services/productService";
import { useCartStore } from "../features/cart/store";
import { useWishlistStore } from "../features/wishlist/store";
import { formatPrice } from "../lib/formatPrice";
import { Product } from "../types/product";

// Hero slider data
const heroSlides = [
  {
    id: 1,
    title: "Premium Electronics",
    subtitle: "Discover the latest gadgets and smart devices",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1200&h=600&fit=crop&crop=center",
    cta: "Shop Electronics",
    link: "/products?category=electronics"
  },
  {
    id: 2,
    title: "Fashion & Style",
    subtitle: "Trendy clothing and accessories for every occasion",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop&crop=center",
    cta: "Shop Fashion",
    link: "/products?category=fashion"
  },
  {
    id: 3,
    title: "Home & Garden",
    subtitle: "Transform your living space with quality home essentials",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop&crop=center",
    cta: "Shop Home",
    link: "/products?category=home-garden"
  },
  {
    id: 4,
    title: "Sports & Fitness",
    subtitle: "Equipment and gear for your active lifestyle",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop&crop=center",
    cta: "Shop Sports",
    link: "/products?category=sports-outdoors"
  }
];

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fashion Enthusiast",
    content: "Amazing quality products and fast delivery. I love shopping here!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Tech Reviewer",
    content: "Best prices for electronics and excellent customer service. Highly recommended!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Home Decor Blogger",
    content: "Found perfect items for my home renovation. The quality exceeded my expectations.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  }
];

// Brands data
const brands = [
  { name: "Nike", logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=60&fit=crop&crop=center" },
  { name: "Apple", logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=120&h=60&fit=crop&crop=center" },
  { name: "Samsung", logo: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=120&h=60&fit=crop&crop=center" },
  { name: "Adidas", logo: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=120&h=60&fit=crop&crop=center" },
  { name: "Sony", logo: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=120&h=60&fit=crop&crop=center" },
  { name: "LG", logo: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=120&h=60&fit=crop&crop=center" }
];

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

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
      <section className="relative h-[600px] overflow-hidden">
        <div className="relative h-full">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />
              </div>
              
              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 animate-fade-in-delay">
                    {slide.subtitle}
                  </p>
                  <div className="animate-fade-in-delay-2">
                    <Link
                      href={slide.link}
                      className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
                    >
                      {slide.cta}
                      <FiArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-colors cursor-pointer"
          aria-label="Previous slide"
        >
          <FiChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-colors cursor-pointer"
          aria-label="Next slide"
        >
          <FiChevronRight className="h-4 w-4" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide
                  ? 'bg-white'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <FiTruck className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Fast Shipping
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Free shipping on orders over $50
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <FiShield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Secure Payment
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                100% secure payment processing
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <FiRefreshCw className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Easy Returns
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                30-day return policy
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <FiClock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                24/7 Support
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Round the clock customer service
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover our handpicked selection of premium products
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-80 animate-pulse" />
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
                          className={`p-2 rounded-full transition-colors cursor-pointer ${
                            isInWishlist(product.id)
                              ? "text-primary bg-primary/10"
                              : "text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          <FiHeart className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="p-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors cursor-pointer"
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
                name: "Electronics", 
                image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=300&fit=crop&crop=center", 
                href: "/products?category=electronics" 
              },
              { 
                name: "Fashion", 
                image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=center", 
                href: "/products?category=fashion" 
              },
              { 
                name: "Home & Garden", 
                image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&crop=center", 
                href: "/products?category=home-garden" 
              },
            ].map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
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

      {/* Testimonials Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Don&apos;t just take our word for it - hear from our satisfied customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted Brands
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We partner with the world&apos;s leading brands to bring you quality products
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {brands.map((brand) => (
              <div key={brand.name} className="flex items-center justify-center">
                <div className="w-24 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={80}
                    height={40}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
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
