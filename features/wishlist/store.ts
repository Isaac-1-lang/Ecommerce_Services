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
      },
      removeItem: (productId) => set({ items: get().items.filter((p) => p.id !== productId) }),
      isInWishlist: (productId) => get().items.some((p) => p.id === productId),
      clearWishlist: () => set({ items: [] }),
    }),
    { name: "now_wishlist" }
  )
);
