"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiCreditCard, FiTruck } from 'react-icons/fi';
import { useCartStore } from '../../features/cart/store';
import DiscountCodeInput from '../../components/DiscountCodeInput';
import { DiscountValidationResult } from '../../services/discountService';
import { formatPrice } from '../../lib/formatPrice';

export default function CartPage() {
  const { 
    items, 
    totalPrice: subtotal,
    removeItem, 
    updateQuantity, 
    clearCart,
    increase,
    decrease
  } = useCartStore();

  const [shipping, setShipping] = useState(0);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountCode, setDiscountCode] = useState('');
  const [total, setTotal] = useState(0);
  const [currentDiscount, setCurrentDiscount] = useState<DiscountValidationResult | undefined>(undefined);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleApplyDiscount = (discountResult: DiscountValidationResult) => {
    setCurrentDiscount(discountResult);
    if (discountResult.isValid && discountResult.discountAmount) {
      setDiscount(discountResult.discountAmount);
      setDiscountCode(discountResult.discount?.discountCode || '');
    }
  };

  const handleRemoveDiscount = () => {
    setCurrentDiscount(undefined);
    setDiscount(0);
    setDiscountCode('');
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

  // Calculate shipping, tax, and total when subtotal changes
  useEffect(() => {
    calculateShipping();
    calculateTax();
  }, [subtotal]);

  // Calculate total whenever subtotal, shipping, tax, or discount changes
  useEffect(() => {
    const newTotal = subtotal + shipping + tax - discount;
    setTotal(newTotal);
  }, [subtotal, shipping, tax, discount]);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="mx-auto w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
              <FiShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              <FiArrowLeft className="h-5 w-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 mb-8">
          <Link
            href="/products"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <FiArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Shopping Cart
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <FiShoppingBag className="h-5 w-5 text-blue-600" />
                Cart Items ({items.length})
              </h2>
              
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatPrice(item.price)} each
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decrease(item.id)}
                        className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                      >
                        <FiMinus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center font-semibold text-gray-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increase(item.id)}
                        className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                      >
                        <FiPlus className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors p-2"
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Discount Code */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <DiscountCodeInput
                subtotal={subtotal}
                onDiscountApplied={handleApplyDiscount}
                onDiscountRemoved={handleRemoveDiscount}
                currentDiscount={currentDiscount}
              />
            </div>
          </div>

          {/* Order Summary & Checkout */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <FiCreditCard className="h-5 w-5 text-blue-600" />
                Order Summary
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <FiTruck className="h-4 w-4" />
                    Shipping
                  </span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600 font-semibold">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Tax</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {formatPrice(tax)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Discount</span>
                    <span className="text-green-600 font-semibold">
                      -{formatPrice(discount)}
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span className="text-gray-900 dark:text-white">Total</span>
                    <span className="text-blue-600">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <Link
                href="/checkout"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <FiCreditCard className="h-5 w-5" />
                Proceed to Checkout
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 text-center">
                Complete your shipping information and payment securely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
