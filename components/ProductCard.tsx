"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FiHeart, FiShoppingCart, FiStar, FiEye, FiShare2, FiPlus, FiMinus } from "react-icons/fi";
import { Product } from "../types/product";
import { formatPrice } from "../lib/formatPrice";
import { useCartStore } from "../features/cart/store";
import { useWishlistStore } from "../features/wishlist/store";

export default function ProductCard({ product }: { product: Product }) {
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
    // Extract image URL from primaryImage or fallback to image field
    const imageUrl = product.primaryImage?.imageUrl || 
      (typeof product.image === 'string' ? product.image : product.image?.imageUrl) || "";
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: imageUrl,
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
  const getProductImage = () => {
    if (imageError) return getFallbackImage(product.category);
    if (product.primaryImage?.imageUrl) return product.primaryImage.imageUrl;
    if (typeof product.image === 'string') return product.image;
    if (product.image && typeof product.image === 'object' && product.image.imageUrl) return product.image.imageUrl;
    return getFallbackImage(product.category);
  };
  
  const productImage = getProductImage();
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
        <Link href={`/products/${product.slug || product.id}`}>
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
        <Link href={`/products/${product.slug || product.id}`} className="cursor-pointer">
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
