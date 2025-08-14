"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useCartStore } from '../features/cart/store';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  variant?: {
    id: string;
    name: string;
    value: string;
  };
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  total: number;
  shipping: number;
  tax: number;
  discount: number;
  discountCode: string | null;
  isLoading: boolean;
  error: string | null;
  addToCart: (item: Omit<CartItem, 'id'>) => Promise<void>;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyDiscount: (code: string) => Promise<void>;
  removeDiscount: () => void;
  calculateShipping: (address: any) => Promise<number>;
  clearError: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const {
    items,
    loading,
    error,
    addToCart: storeAddToCart,
    removeFromCart: storeRemoveFromCart,
    updateQuantity: storeUpdateQuantity,
    clearCart: storeClearCart,
    clearError: storeClearError,
  } = useCartStore();

  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [tax, setTax] = useState(0);

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = subtotal + shipping + tax - discount;

  const addToCart = async (item: Omit<CartItem, 'id'>) => {
    try {
      await storeAddToCart(item);
    } catch (error) {
      throw error;
    }
  };

  const removeFromCart = (itemId: string) => {
    storeRemoveFromCart(itemId);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      storeUpdateQuantity(itemId, quantity);
    }
  };

  const clearCart = () => {
    storeClearCart();
    setDiscountCode(null);
    setDiscount(0);
  };

  const applyDiscount = async (code: string) => {
    try {
      // Mock discount calculation - replace with actual API call
      const discountAmount = subtotal * 0.1; // 10% discount
      setDiscount(discountAmount);
      setDiscountCode(code);
    } catch (error) {
      throw error;
    }
  };

  const removeDiscount = () => {
    setDiscount(0);
    setDiscountCode(null);
  };

  const calculateShipping = async (address: any) => {
    try {
      // Mock shipping calculation - replace with actual API call
      const shippingCost = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
      setShipping(shippingCost);
      return shippingCost;
    } catch (error) {
      throw error;
    }
  };

  const clearError = () => {
    storeClearError();
  };

  // Calculate tax based on subtotal (mock calculation)
  useEffect(() => {
    const taxRate = 0.08; // 8% tax rate
    setTax(subtotal * taxRate);
  }, [subtotal]);

  const value: CartContextType = {
    items,
    totalItems,
    subtotal,
    total,
    shipping,
    tax,
    discount,
    discountCode,
    isLoading: loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyDiscount,
    removeDiscount,
    calculateShipping,
    clearError,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

// Cart Summary Component
interface CartSummaryProps {
  className?: string;
}

export function CartSummary({ className = '' }: CartSummaryProps) {
  const { subtotal, shipping, tax, discount, total } = useCart();

  return (
    <div className={`bg-white dark:bg-neutral-800 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700 p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
        Order Summary
      </h3>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-600 dark:text-neutral-400">Subtotal</span>
          <span className="text-neutral-800 dark:text-neutral-200">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-neutral-600 dark:text-neutral-400">Shipping</span>
          <span className="text-neutral-800 dark:text-neutral-200">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-neutral-600 dark:text-neutral-400">Tax</span>
          <span className="text-neutral-800 dark:text-neutral-200">${tax.toFixed(2)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600 dark:text-neutral-400">Discount</span>
            <span className="text-success">-${discount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="border-t border-neutral-200 dark:border-neutral-700 pt-3">
          <div className="flex justify-between font-semibold">
            <span className="text-neutral-800 dark:text-neutral-200">Total</span>
            <span className="text-neutral-800 dark:text-neutral-200">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
