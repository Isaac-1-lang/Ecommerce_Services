"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiCreditCard, FiTruck } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import DiscountCodeInput from '../../components/DiscountCodeInput';
import { DiscountValidationResult } from '../../services/discountService';

export default function CartPage() {
  const { 
    items, 
    subtotal, 
    shipping, 
    tax, 
    discount, 
    discountCode, 
    total,
    removeItem, 
    updateQuantity, 
    clearCart,
    setShipping,
    setTax
  } = useCart();

  const [currentDiscount, setCurrentDiscount] = useState<DiscountValidationResult | undefined>(
    discount > 0 ? {
      isValid: true,
      discount: { discountCode: discountCode || '', name: 'Applied Discount' } as any,
      discountAmount: discount,
      finalPrice: total
    } : undefined
  );

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleApplyDiscount = (discountResult: DiscountValidationResult) => {
    setCurrentDiscount(discountResult);
  };

  const handleRemoveDiscount = () => {
    setCurrentDiscount(undefined);
  };

  const calculateShipping = () => {
    // Simple shipping calculation
    if (subtotal >= 50) {
      setShipping(0); // Free shipping over $50
    } else {
      setShipping(5.99); // Standard shipping
    }
  };

  const calculateTax = () => {
    // Simple tax calculation (8% rate)
    const taxAmount = subtotal * 0.08;
    setTax(taxAmount);
  };

  // Calculate shipping and tax when subtotal changes
  useState(() => {
    calculateShipping();
    calculateTax();
  });

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <FiShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <FiArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Cart Items ({items.length})
              </h2>
              
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    {/* Product Image */}
                    <div className="w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <FiMinus className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </button>
                      <span className="w-12 text-center text-sm font-medium text-gray-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <FiPlus className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Clear Cart Button */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Order Summary
            </h2>

            {/* Discount Code Input */}
            <div className="mb-6">
              <DiscountCodeInput
                subtotal={subtotal}
                onDiscountApplied={handleApplyDiscount}
                onDiscountRemoved={handleRemoveDiscount}
                currentDiscount={currentDiscount}
              />
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                <span className="text-gray-900 dark:text-white">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Tax</span>
                <span className="text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-gray-900 dark:text-white">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium flex items-center justify-center gap-2"
            >
              <FiCreditCard className="h-4 w-4" />
              Proceed to Checkout
            </Link>

            {/* Shipping Info */}
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <FiTruck className="h-4 w-4" />
                <span>
                  {subtotal >= 50 ? 'Free shipping on orders over $50' : 'Standard shipping $5.99'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
