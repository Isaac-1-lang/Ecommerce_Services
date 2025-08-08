"use client";

import { Product } from "../types/product";
import { formatPrice } from "../lib/formatPrice";

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: {
  item: { product: Product; quantity: number };
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-4 rounded-md border p-3">
      <div className="h-16 w-16 rounded bg-gray-100" />
      <div className="flex-1">
        <p className="font-medium">{item.product.name}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{formatPrice(item.product.price)}</p>
        <div className="mt-2 flex items-center gap-2 text-sm">
          <button onClick={onDecrease} className="rounded border px-2">-</button>
          <span>{item.quantity}</span>
          <button onClick={onIncrease} className="rounded border px-2">+</button>
          <button onClick={onRemove} className="ml-4 text-red-600">Remove</button>
        </div>
      </div>
    </div>
  );
}
