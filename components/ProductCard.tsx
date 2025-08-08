"use client";

import Link from "next/link";
import { Product } from "../types/product";
import { formatPrice } from "../lib/formatPrice";
import { useCartStore } from "../features/cart/store";

export default function ProductCard({ product }: { product: Product }) {
  const add = useCartStore((s) => s.addItem);

  return (
    <div className="group rounded-lg border bg-white p-3 shadow-sm transition hover:shadow-md dark:bg-gray-900">
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-100">
          {/* image placeholder */}
          <div className="flex h-full items-center justify-center text-gray-400">Image</div>
        </div>
        <h3 className="mt-3 line-clamp-1 text-sm font-medium">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{product.category}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-base font-semibold">{formatPrice(product.price)}</span>
          {product.rating && <span className="text-xs">⭐ {product.rating.toFixed(1)}</span>}
        </div>
      </Link>
      <button
        className="mt-3 w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:opacity-90"
        onClick={() => add(product, 1)}
      >
        Add to cart
      </button>
    </div>
  );
}
