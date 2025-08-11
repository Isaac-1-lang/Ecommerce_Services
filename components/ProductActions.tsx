"use client";

import { Product } from "../types/product";
import { useCartStore } from "../features/cart/store";
import { useWishlistStore } from "../features/wishlist/store";

export default function ProductActions({ product }: { product: Product }) {
  const addToCart = useCartStore((s) => s.addItem);
  const wishlistHas = useWishlistStore((s) => s.isInWishlist);
  const wishlistAdd = useWishlistStore((s) => s.addItem);
  const wishlistRemove = useWishlistStore((s) => s.removeItem);
  const isFav = wishlistHas(product.id);

  return (
    <div className="mt-4 flex items-center gap-3">
      <button
        onClick={() =>
          addToCart({
            ...product,
            quantity: 1,
            image: product.image ?? "",
            name: product.name ?? "",
          })
        }
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white"
      >
        Add to cart
      </button>

      {isFav ? (
        <button
          onClick={() => wishlistRemove(product.id)}
          className="rounded-md border px-4 py-2 text-sm"
        >
          Remove from wishlist
        </button>
      ) : (
        <button
          onClick={() => wishlistAdd(product)}
          className="rounded-md border px-4 py-2 text-sm"
        >
          Add to wishlist
        </button>
      )}
    </div>
  );
}
