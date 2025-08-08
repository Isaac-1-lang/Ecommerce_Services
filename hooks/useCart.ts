"use client";

import { useCartStore } from "../features/cart/store";

export function useCart() {
  const items = useCartStore((s) => s.items);
  const totalQuantity = useCartStore((s) => s.totalQuantity);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const addItem = useCartStore((s) => s.addItem);
  const increase = useCartStore((s) => s.increase);
  const decrease = useCartStore((s) => s.decrease);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);

  return { items, totalQuantity, totalPrice, addItem, increase, decrease, removeItem, clear };
}
