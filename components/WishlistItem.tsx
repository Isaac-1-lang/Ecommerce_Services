"use client";

import { Product } from "../types/product";
import { formatPrice } from "../lib/formatPrice";

interface WishlistItemProps {
  product: Product;
  onRemove: () => void;
  onAddToCart: () => void; // ✅ added
  disabled: boolean;       // ✅ added
}

export default function WishlistItem({
  product,
  onRemove,
  onAddToCart,
  disabled
}: WishlistItemProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border p-3">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded bg-gray-100" />
        <div>
          <p className="font-medium">{product.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <a
          href={`/products/${product.slug}`}
          className="rounded-md border px-3 py-2 text-sm"
        >
          View
        </a>
        <button
          onClick={onRemove}
          className="rounded-md border px-3 py-2 text-sm text-red-600"
          disabled={disabled}
        >
          Remove
        </button>
        <button
          onClick={onAddToCart}
          className="rounded-md border px-3 py-2 text-sm text-green-600"
          disabled={disabled}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
