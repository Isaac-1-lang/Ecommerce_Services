"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FiHeart, FiShoppingCart, FiStar, FiEye, FiShare2, FiImage } from "react-icons/fi";
import { Product } from "../types/product";
import { formatPrice } from "../lib/formatPrice";
import { useCartStore } from "../features/cart/store";
import { useWishlistStore } from "../features/wishlist/store";

export default function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  
  const addToCart = useCartStore((s) => s.addItem);
  const addToWishlist = useWishlistStore((s) => s.addItem);
  const removeFromWishlist = useWishlistStore((s) => s.removeItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || "",
      quantity: 1,
    });
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
    const rating = product.rating || 0;
    const reviewCount = product.reviewCount || 0;
    
    return (
      <div className="flex items-center gap-1 mb-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              className={`h-3 w-3 ${
                i < Math.floor(rating)
                  ? "text-rating fill-current"
                  : i < rating
                  ? "text-rating fill-current opacity-50"
                  : "text-neutral-400"
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-neutral-500 ml-1">
          ({reviewCount})
        </span>
      </div>
    );
  };

  const renderPrice = () => {
    const hasDiscount = product.originalPrice && product.originalPrice > product.price;
    
    return (
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg font-bold text-price">
          {formatPrice(product.price)}
        </span>
        {hasDiscount && (
          <>
            <span className="text-sm text-neutral-500 line-through">
              {formatPrice(product.originalPrice!)}
            </span>
            <span className="text-xs bg-sale text-white px-2 py-1 rounded-full font-medium">
              {Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}% OFF
            </span>
          </>
        )}
      </div>
    );
  };

  return (
    <div 
      className="group relative bg-white border border-neutral-200 rounded-xl shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <Link href={`/products/${product.slug}`}>
          {product.image && !imageError ? (
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className={`h-full w-full object-cover transition-transform duration-300 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
              onLoad={() => setIsImageLoading(false)}
              onError={() => {
                setIsImageLoading(false);
                setImageError(true);
              }}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-neutral-200 text-neutral-400">
              <FiImage className="w-16 h-16" />
            </div>
          )}
        </Link>
        
        {/* Loading State */}
        {isImageLoading && !imageError && (
          <div className="absolute inset-0 bg-neutral-200 animate-pulse-gentle" />
        )}

        {/* Quick Actions Overlay */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}>
          <button
            onClick={handleWishlistToggle}
            className={`p-2 rounded-full shadow-soft transition-all cursor-pointer ${
              isInWishlist(product.id)
                ? 'bg-primary text-white'
                : 'bg-white text-neutral-600 hover:bg-primary hover:text-white'
            }`}
          >
            <FiHeart className="h-4 w-4" />
          </button>
          
          <button
            onClick={handleQuickView}
            className="p-2 rounded-full bg-white text-neutral-600 shadow-soft hover:bg-primary hover:text-white transition-colors cursor-pointer"
          >
            <FiEye className="h-4 w-4" />
          </button>
          
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white text-neutral-600 shadow-soft hover:bg-primary hover:text-white transition-colors cursor-pointer"
          >
            <FiShare2 className="h-4 w-4" />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-new text-white text-xs px-2 py-1 rounded-full font-medium">
              NEW
            </span>
          )}
          {product.isOnSale && (
            <span className="bg-sale text-white text-xs px-2 py-1 rounded-full font-medium">
              SALE
            </span>
          )}
          {product.stockQuantity === 0 && (
            <span className="bg-neutral-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              OUT OF STOCK
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <div className="text-xs text-neutral-500 mb-2 uppercase tracking-wide">
          {product.category}
        </div>

        {/* Product Name */}
        <Link href={`/products/${product.slug}`} className="cursor-pointer">
          <h3 className="text-sm font-medium text-neutral-800 mb-2 line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {renderRating()}

        {/* Price */}
        {renderPrice()}

        {/* Stock Status */}
        {product.stockQuantity !== undefined && product.stockQuantity > 0 && (
          <div className="text-xs text-neutral-500 mb-3">
            {product.stockQuantity < 10 ? (
              <span className="text-warning">Only {product.stockQuantity} left!</span>
            ) : (
              <span className="text-success">In Stock</span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            disabled={product.stockQuantity === 0}
            className="flex-1 bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-600 disabled:bg-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <FiShoppingCart className="h-4 w-4" />
            {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
