"use client";

import { useState } from "react";
import Link from "next/link";
import { FiHeart, FiTrash2 } from "react-icons/fi";
import WishlistItem from "../../components/WishlistItem";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useWishlistStore } from "../../features/wishlist/store";
import { useCartStore } from "../../features/cart/store";

export default function WishlistPage() {
  const [isUpdating, setIsUpdating] = useState(false);
  
  const {
    items,
    removeItem,
    clearWishlist
  } = useWishlistStore();

  const {
    addItem
  } = useCartStore();

  const handleRemoveItem = async (itemId: string) => {
    setIsUpdating(true);
    try {
      removeItem(itemId);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddToCart = async (item: Product) => {
    setIsUpdating(true);
    try {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleClearWishlist = () => {
    if (confirm("Are you sure you want to clear your wishlist?")) {
      clearWishlist();
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <Breadcrumbs 
          items={[
            { label: "Home", href: "/" },
            { label: "Wishlist", href: "/wishlist" }
          ]} 
        />
        
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <FiHeart className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start adding items to your wishlist to save them for later.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumbs 
        items={[
          { label: "Home", href: "/" },
          { label: "Wishlist", href: "/wishlist" }
        ]} 
      />

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Wishlist
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {items.length} {items.length === 1 ? "item" : "items"} in your wishlist
            </p>
          </div>
          <button
            onClick={handleClearWishlist}
            className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1"
          >
            <FiTrash2 className="h-4 w-4" />
            Clear All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <WishlistItem
            key={item.id}
            item={item}
            onRemove={() => handleRemoveItem(item.id)}
            onAddToCart={() => handleAddToCart(item)}
            disabled={isUpdating}
          />
        ))}
      </div>

      {items.length > 0 && (
        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
