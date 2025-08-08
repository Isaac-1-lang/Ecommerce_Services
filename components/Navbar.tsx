"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiMoon, FiSun, FiShoppingCart, FiHeart, FiUser } from "react-icons/fi";
import SearchBar from "./SearchBar";
import { useCartStore } from "../features/cart/store";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const cartItemCount = useCartStore((s) => s.totalQuantity);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/80 dark:supports-[backdrop-filter]:bg-gray-900/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold">Now</Link>
            <nav className="hidden md:flex items-center gap-4 text-sm">
              <Link href="/products" className="hover:text-primary">Products</Link>
              <Link href="/wishlist" className="hover:text-primary">Wishlist</Link>
              <Link href="/account" className="hover:text-primary">Account</Link>
            </nav>
          </div>

          <div className="flex-1 hidden md:block">
            <SearchBar />
          </div>

          <div className="flex items-center gap-3">
            <Link href="/wishlist" aria-label="Wishlist" className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              <FiHeart className="h-5 w-5" />
            </Link>
            <Link href="/cart" aria-label="Cart" className="relative p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              <FiShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary px-1 text-xs font-semibold text-white">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <Link href="/auth/login" aria-label="Account" className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              <FiUser className="h-5 w-5" />
            </Link>
            <button
              aria-label="Toggle Theme"
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => theme && setTheme(theme === "dark" ? "light" : "dark")}
            >
              {mounted && theme === "dark" ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="md:hidden py-2">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
