"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../../types/product";

type WishlistState = {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        if (get().items.some((p) => p.id === product.id)) return;
        set({ items: [...get().items, product] });
        
        // Show toast for wishlist addition
        if (typeof window !== 'undefined' && (window as any).showToast) {
          (window as any).showToast(
            'success',
            'Added to Wishlist',
            `${product.name} has been added to your wishlist`,
            3000
          );
        }
      },
      removeItem: (productId) => {
        const items = get().items;
        const removedProduct = items.find(p => p.id === productId);
        const filteredItems = items.filter((p) => p.id !== productId);
        
        // Show toast for wishlist removal
        if (removedProduct && typeof window !== 'undefined' && (window as any).showToast) {
          (window as any).showToast(
            'info',
            'Removed from Wishlist',
            `${removedProduct.name} has been removed from your wishlist`,
            3000
          );
        }
        
        set({ items: filteredItems });
      },
      isInWishlist: (productId) => get().items.some((p) => p.id === productId),
      clearWishlist: () => {
        // Show toast for wishlist cleared
        if (typeof window !== 'undefined' && (window as any).showToast) {
          (window as any).showToast(
            'warning',
            'Wishlist Cleared',
            'All items have been removed from your wishlist',
            3000
          );
        }
        set({ items: [] });
      },
    }),
    { name: "now_wishlist" }
  )
);
