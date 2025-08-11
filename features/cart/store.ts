"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  increase: (itemId: string) => void;
  decrease: (itemId: string) => void;
};

function calculateTotals(items: CartItem[]) {
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return { totalQuantity, totalPrice };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
      addItem: (newItem) => {
        const items = [...get().items];
        const index = items.findIndex((item) => item.id === newItem.id);
        if (index >= 0) {
          items[index].quantity += newItem.quantity;
        } else {
          items.push(newItem);
        }
        set({ items, ...calculateTotals(items) });
      },
      removeItem: (itemId) => {
        const items = get().items.filter((item) => item.id !== itemId);
        set({ items, ...calculateTotals(items) });
      },
      updateQuantity: (itemId, quantity) => {
        const items = get().items.map((item) => 
          item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
        );
        set({ items, ...calculateTotals(items) });
      },
      increase: (itemId) => {
        const items = get().items;
        const index = items.findIndex((item) => item.id === itemId);
        if (index >= 0) {
          items[index].quantity += 1;
        }
        set({ items, ...calculateTotals(items) });
      },
      decrease: (itemId) => {
        const items = get().items;
        const index = items.findIndex((item) => item.id === itemId);
        if (index >= 0 && items[index].quantity > 1) {
          items[index].quantity -= 1;
        }
        set({ items, ...calculateTotals(items) });
      },
      clearCart: () => set({ items: [], totalQuantity: 0, totalPrice: 0 }),
    }),
    { name: "now_cart" }
  )
);
