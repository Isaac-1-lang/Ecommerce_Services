"use client";

import { useState } from "react";
import Link from "next/link";
import { FiTrash2, FiArrowLeft } from "react-icons/fi";
import CartItem from "../../components/CartItem";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useCartStore } from "../../features/cart/store";
import { formatPrice } from "../../lib/formatPrice";

export default function CartPage() {
  const [isUpdating, setIsUpdating] = useState(false);
  
  const {
    items,
    totalQuantity,
    totalPrice,
    removeItem,
    updateQuantity,
    clearCart
  } = useCartStore();

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    setIsUpdating(true);
    try {
      updateQuantity(itemId, newQuantity);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    setIsUpdating(true);
    try {
      removeItem(itemId);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleClearCart = () => {
    if (confirm("Are you sure you want to clear your cart?")) {
      clearCart();
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <Breadcrumbs 
          items={[
            { label: "Home", href: "/" },
            { label: "Cart", href: "/cart" }
          ]} 
        />
        
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <FiArrowLeft className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Looks like you haven&apos;t added any items to your cart yet.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumbs 
        items={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" }
        ]} 
      />

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Shopping Cart
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {totalQuantity} {totalQuantity === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Cart Items
                </h2>
                <button
                  onClick={handleClearCart}
                  className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1"
                >
                  <FiTrash2 className="h-4 w-4" />
                  Clear Cart
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onQuantityChange={(quantity) => handleQuantityChange(item.id, quantity)}
                  onRemove={() => handleRemoveItem(item.id)}
                  disabled={isUpdating}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6 sticky top-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Order Summary
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Subtotal ({totalQuantity} {totalQuantity === 1 ? "item" : "items"})
                </span>
                <span className="text-gray-900 dark:text-white">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                <span className="text-gray-900 dark:text-white">
                  {totalPrice >= 50 ? "Free" : formatPrice(5.99)}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Tax</span>
                <span className="text-gray-900 dark:text-white">
                  {formatPrice(totalPrice * 0.08)}
                </span>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between text-base font-medium">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-gray-900 dark:text-white">
                    {formatPrice(totalPrice + (totalPrice >= 50 ? 0 : 5.99) + (totalPrice * 0.08))}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Including shipping and tax
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Link
                href="/checkout"
                className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary/90 transition-colors text-center block font-medium"
              >
                Proceed to Checkout
              </Link>
              
              <Link
                href="/products"
                className="w-full border border-gray-300 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center block font-medium"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Promo Code */}
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Have a promo code?
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <button 
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).showToast) {
                      (window as any).showToast(
                        'success',
                        'Promo Code Applied',
                        'Your discount has been applied successfully!',
                        3000
                      );
                    }
                  }}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
