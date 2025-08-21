"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiStar, FiShoppingCart, FiHeart, FiImage, FiChevronLeft, FiChevronRight, FiTruck, FiShield, FiRefreshCw, FiClock, FiEye, FiShare2, FiMinus, FiPlus } from "react-icons/fi";
import { getProducts } from "../services/productService";
import { useCartStore } from "../features/cart/store";
import { useWishlistStore } from "../features/wishlist/store";
import { formatPrice } from "../lib/formatPrice";
import { Product } from "../types/product";
import { ALL_PRODUCTS } from "../data/dummyProducts";

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
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Tech Reviewer",
    content: "Best prices for electronics and excellent customer service. Highly recommended!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Home Decor Blogger",
    content: "Found perfect items for my home renovation. The quality exceeded my expectations.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  }
];

// Brands data
const brands = [
  { name: "Nike", logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=100&fit=crop" },
  { name: "Apple", logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=200&h=100&fit=crop" },
  { name: "Samsung", logo: "https://images.unsplash.com/photo-1610945265064-0ea8d51c8c3b?w=200&h=100&fit=crop" },
  { name: "Adidas", logo: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=200&h=100&fit=crop" },
  { name: "Sony", logo: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&h=100&fit=crop" },
  { name: "LG", logo: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=200&h=100&fit=crop" }
];

// Product Card Component
function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  const addToCart = useCartStore((s) => s.addItem);
  const removeFromCart = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const cartItems = useCartStore((s) => s.items);
  const addToWishlist = useWishlistStore((s) => s.addItem);
  const removeFromWishlist = useWishlistStore((s) => s.removeItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist);

  // Check if item is in cart and get current quantity
  const cartItem = cartItems.find(item => item.id === product.id);
  const isInCart = !!cartItem;
  const currentQuantity = cartItem?.quantity || 0;

  // Fallback images for different categories
  const getFallbackImage = (category: string) => {
    switch (category.toLowerCase()) {
      case 'electronics':
        return 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop&crop=center';
      case 'fashion':
        return 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop&crop=center';
      case 'home-garden':
        return 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center';
      case 'sports-outdoors':
        return 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center';
      case 'audio':
        return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center';
      default:
        return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center';
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || "",
      quantity: quantity,
    });
  };

  const handleRemoveFromCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromCart(product.id);
    setQuantity(1);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > 99) return; // Limit to 99 items
    
    setQuantity(newQuantity);
    
    // If item is already in cart, update the cart quantity
    if (isInCart) {
      updateQuantity(product.id, newQuantity);
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement quick view modal
    console.log('Quick view:', product.name);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this amazing product: ${product.name}`,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const renderRating = () => {
    const rating = product.rating || 4.5; // Default rating if none
    const reviewCount = product.reviewCount || Math.floor(Math.random() * 100) + 10; // Default review count
    
    return (
      <div className="flex items-center gap-1 mb-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              className={`h-3 w-3 ${
                i < Math.floor(rating)
                  ? "text-yellow-400 fill-current"
                  : i < rating
                  ? "text-yellow-400 fill-current opacity-50"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-gray-500 ml-1">
          ({reviewCount})
        </span>
      </div>
    );
  };

  const renderPrice = () => {
    const hasDiscount = product.originalPrice && product.originalPrice > product.price;
    
    return (
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg font-bold text-gray-900 dark:text-white">
          {formatPrice(product.price)}
        </span>
        {hasDiscount && (
          <>
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice!)}
            </span>
            <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full font-medium">
              {Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}% OFF
            </span>
          </>
        )}
      </div>
    );
  };

  // Ensure we have a valid product image
  const productImage = product.image && !imageError ? product.image : getFallbackImage(product.category);
  const productCategory = product.category || 'General';
  const stockQuantity = product.stockQuantity || 10;

  return (
    <div 
      className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={productImage}
            alt={product.name}
            width={400}
            height={400}
            className={`h-full w-full object-cover transition-transform duration-300 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
            onError={() => setImageError(true)}
          />
        </Link>
        
        {/* Quick Actions Overlay */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}>
          <button
            onClick={handleWishlistToggle}
            className={`p-2 rounded-full shadow-lg transition-all cursor-pointer ${
              isInWishlist(product.id)
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
            title={isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <FiHeart className="h-4 w-4" />
          </button>
          
          <button
            onClick={handleQuickView}
            className="p-2 rounded-full bg-white text-gray-600 shadow-lg hover:bg-blue-500 hover:text-white transition-colors cursor-pointer"
            title="Quick View"
          >
            <FiEye className="h-4 w-4" />
          </button>
          
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white text-gray-600 shadow-lg hover:bg-green-500 hover:text-white transition-colors cursor-pointer"
            title="Share Product"
          >
            <FiShare2 className="h-4 w-4" />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              NEW
            </span>
          )}
          {product.isOnSale && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              SALE
            </span>
          )}
          {stockQuantity === 0 && (
            <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              OUT OF STOCK
            </span>
          )}
        </div>

        {/* Cart Status Badge */}
        {isInCart && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              In Cart ({currentQuantity})
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Category */}
        <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide">
          {productCategory}
        </div>

        {/* Product Name */}
        <Link href={`/products/${product.slug}`} className="cursor-pointer">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {renderRating()}

        {/* Price */}
        {renderPrice()}

        {/* Stock Status */}
        {stockQuantity > 0 && (
          <div className="text-xs text-gray-500 mb-3">
            {stockQuantity < 10 ? (
              <span className="text-yellow-600">Only {stockQuantity} left!</span>
            ) : (
              <span className="text-green-600">In Stock</span>
            )}
          </div>
        )}

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FiMinus className="h-3 w-3" />
            </button>
            <span className="px-3 py-2 text-sm font-medium min-w-[2rem] text-center">
              {isInCart ? currentQuantity : quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= 99 || (stockQuantity > 0 && quantity >= stockQuantity)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FiPlus className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-auto">
          {isInCart ? (
            <button
              onClick={handleRemoveFromCart}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <FiShoppingCart className="h-4 w-4" />
              Remove from Cart
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={stockQuantity === 0}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <FiShoppingCart className="h-4 w-4" />
              {stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      setLoading(true);
      try {
        const products = await getProducts();
        if (products && products.length > 0) {
          // Take first 8 products as featured
          setFeaturedProducts(products.slice(0, 8));
        } else {
          // Fallback to dummy products if API returns empty
          const fallbackProducts = ALL_PRODUCTS.filter(p => p.isFeatured || p.isNew || p.isOnSale).slice(0, 8);
          setFeaturedProducts(fallbackProducts);
        }
      } catch (error) {
        console.error("Failed to load featured products:", error);
        // Fallback to dummy products on error
        const fallbackProducts = ALL_PRODUCTS.filter(p => p.isFeatured || p.isNew || p.isOnSale).slice(0, 8);
        setFeaturedProducts(fallbackProducts);
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
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-in text-white drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 animate-fade-in-delay text-white drop-shadow-md">
                    {slide.subtitle}
                  </p>
                  <div className="animate-fade-in-delay-2">
                    <Link
                      href={slide.link}
                      className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 text-lg shadow-2xl border-2 border-white/20 backdrop-blur-sm"
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
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 mb-4">No featured products available</p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Browse All Products
                <FiArrowRight className="h-5 w-5" />
              </Link>
            </div>
          )}
          
          {featuredProducts.length > 0 && (
            <div className="text-center mt-12">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                View All Products
                <FiArrowRight className="h-5 w-5" />
              </Link>
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
                image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=400&fit=crop", 
                href: "/products?category=electronics" 
              },
              { 
                name: "Fashion", 
                image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop", 
                href: "/products?category=fashion" 
              },
              { 
                name: "Home & Garden", 
                image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop", 
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
                    width={600}
                    height={400}
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
              <button className="bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-neutral-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
