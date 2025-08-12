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
          // Show toast for quantity update
          if (typeof window !== 'undefined' && (window as any).showToast) {
            (window as any).showToast(
              'success',
              'Cart Updated',
              `${newItem.name} quantity increased to ${items[index].quantity}`,
              3000
            );
          }
        } else {
          items.push(newItem);
          // Show toast for new item added
          if (typeof window !== 'undefined' && (window as any).showToast) {
            (window as any).showToast(
              'success',
              'Added to Cart',
              `${newItem.name} has been added to your cart`,
              3000
            );
          }
        }
        set({ items, ...calculateTotals(items) });
      },
      removeItem: (itemId) => {
        const items = get().items;
        const removedItem = items.find(item => item.id === itemId);
        const filteredItems = items.filter((item) => item.id !== itemId);
        
        // Show toast for item removal
        if (removedItem && typeof window !== 'undefined' && (window as any).showToast) {
          (window as any).showToast(
            'info',
            'Removed from Cart',
            `${removedItem.name} has been removed from your cart`,
            3000
          );
        }
        
        set({ items: filteredItems, ...calculateTotals(filteredItems) });
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
          // Show toast for quantity increase
          if (typeof window !== 'undefined' && (window as any).showToast) {
            (window as any).showToast(
              'success',
              'Quantity Updated',
              `${items[index].name} quantity increased to ${items[index].quantity}`,
              2000
            );
          }
        }
        set({ items, ...calculateTotals(items) });
      },
      decrease: (itemId) => {
        const items = get().items;
        const index = items.findIndex((item) => item.id === itemId);
        if (index >= 0 && items[index].quantity > 1) {
          items[index].quantity -= 1;
          // Show toast for quantity decrease
          if (typeof window !== 'undefined' && (window as any).showToast) {
            (window as any).showToast(
              'info',
              'Quantity Updated',
              `${items[index].name} quantity decreased to ${items[index].quantity}`,
              2000
            );
          }
        }
        set({ items, ...calculateTotals(items) });
      },
      clearCart: () => {
        // Show toast for cart cleared
        if (typeof window !== 'undefined' && (window as any).showToast) {
          (window as any).showToast(
            'warning',
            'Cart Cleared',
            'All items have been removed from your cart',
            3000
          );
        }
        set({ items: [], totalQuantity: 0, totalPrice: 0 });
      },
    }),
    { name: "now_cart" }
  )
);
