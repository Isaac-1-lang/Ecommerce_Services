"use client";

import Image from "next/image";
import Link from "next/link";
import { FiHeart, FiTrash2, FiShoppingCart, FiEye } from "react-icons/fi";
import { Product } from "../types/product";
import { formatPrice } from "../lib/formatPrice";

interface WishlistItemProps {
  product: Product;
  onRemove: () => void;
  onAddToCart: () => void; 
  disabled: boolean;       
}

export default function WishlistItem({
  product,
  onRemove,
  onAddToCart,
  disabled
}: WishlistItemProps) {
  return (
    <div className="group relative bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-700">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FiHeart className="h-8 w-8 text-neutral-400" />
          </div>
        )}
        
        {/* Remove Button - Top Right */}
        <button
          onClick={onRemove}
          disabled={disabled}
          className="absolute top-2 right-2 p-2 bg-white/90 dark:bg-neutral-800/90 rounded-full shadow-md hover:bg-red-50 dark:hover:bg-red-900/20 text-neutral-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
        >
          <FiTrash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-medium text-neutral-800 dark:text-neutral-200 text-sm line-clamp-2 mb-2">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-neutral-500 dark:text-neutral-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/products/${product.slug || product.id}`}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-700 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
          >
            <FiEye className="h-4 w-4" />
            <span className="hidden sm:inline">View</span>
          </Link>
          
          <button
            onClick={onAddToCart}
            disabled={disabled}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
