"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../../types/product";

type WishlistState = {
  items: Product[];
  add: (product: Product) => void;
  remove: (productId: string) => void;
  has: (productId: string) => boolean;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (product) => {
        if (get().items.some((p) => p.id === product.id)) return;
        set({ items: [...get().items, product] });
      },
      remove: (productId) => set({ items: get().items.filter((p) => p.id !== productId) }),
      has: (productId) => get().items.some((p) => p.id === productId),
    }),
    { name: "now_wishlist" }
  )
);
