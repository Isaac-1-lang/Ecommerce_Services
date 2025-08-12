"use client";

import { Product } from "../types/product";
import { formatPrice } from "../lib/formatPrice";

interface WishlistItemProps {
  product: Product;
  onRemove: () => void;
  onAddToCart: () => void; 
  disabled: boolean;       
}

export default function WishlistItem({
  product,
  onRemove,
  onAddToCart,
  disabled
}: WishlistItemProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-neutral-200 p-4 bg-white shadow-soft">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-lg bg-neutral-100" />
        <div>
          <p className="font-medium text-neutral-800">{product.name}</p>
          <p className="text-sm text-primary font-semibold">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <a
          href={`/products/${product.slug}`}
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
        >
          View
        </a>
        <button
          onClick={onRemove}
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm text-error hover:bg-error-50 transition-colors"
          disabled={disabled}
        >
          Remove
        </button>
        <button
          onClick={onAddToCart}
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm text-primary hover:bg-highlight transition-colors"
          disabled={disabled}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
