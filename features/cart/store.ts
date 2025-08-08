"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../../types/product";

export type CartItem = { product: Product; quantity: number };

type CartState = {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  increase: (productId: string) => void;
  decrease: (productId: string) => void;
  clear: () => void;
};

function calculateTotals(items: CartItem[]) {
  const totalQuantity = items.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  return { totalQuantity, totalPrice };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
      addItem: (product, quantity = 1) => {
        const items = [...get().items];
        const index = items.findIndex((i) => i.product.id === product.id);
        if (index >= 0) items[index].quantity += quantity;
        else items.push({ product, quantity });
        set({ items, ...calculateTotals(items) });
      },
      removeItem: (productId) => {
        const items = get().items.filter((i) => i.product.id !== productId);
        set({ items, ...calculateTotals(items) });
      },
      increase: (productId) => {
        const items = get().items.map((i) => i.product.id === productId ? { ...i, quantity: i.quantity + 1 } : i);
        set({ items, ...calculateTotals(items) });
      },
      decrease: (productId) => {
        const items = get().items
          .map((i) => i.product.id === productId ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i)
          .filter((i) => i.quantity > 0);
        set({ items, ...calculateTotals(items) });
      },
      clear: () => set({ items: [], totalQuantity: 0, totalPrice: 0 }),
    }),
    { name: "now_cart" }
  )
);
