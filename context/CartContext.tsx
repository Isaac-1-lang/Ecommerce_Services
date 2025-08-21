"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { discountService, DiscountValidationResult } from '../services/discountService';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  discountCode: string | null;
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_DISCOUNT'; payload: DiscountValidationResult }
  | { type: 'REMOVE_DISCOUNT' }
  | { type: 'SET_SHIPPING'; payload: number }
  | { type: 'SET_TAX'; payload: number };

const initialState: CartState = {
  items: [],
  subtotal: 0,
  shipping: 0,
  tax: 0,
  discount: 0,
  discountCode: null,
  total: 0,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      let newItems;
      
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newItems = [...state.items, action.payload];
      }
      
      const newSubtotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const newTotal = newSubtotal + state.shipping + state.tax - state.discount;
      
      return {
        ...state,
        items: newItems,
        subtotal: newSubtotal,
        total: newTotal,
      };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const newSubtotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const newTotal = newSubtotal + state.shipping + state.tax - state.discount;
      
      return {
        ...state,
        items: newItems,
        subtotal: newSubtotal,
        total: newTotal,
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      );
      const newSubtotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const newTotal = newSubtotal + state.shipping + state.tax - state.discount;
      
      return {
        ...state,
        items: newItems,
        subtotal: newSubtotal,
        total: newTotal,
      };
    }
    
    case 'CLEAR_CART': {
      return {
        ...initialState,
        shipping: state.shipping,
        tax: state.tax,
      };
    }
    
    case 'SET_DISCOUNT': {
      const discountAmount = action.payload.discountAmount || 0;
      const newTotal = state.subtotal + state.shipping + state.tax - discountAmount;
      
      return {
        ...state,
        discount: discountAmount,
        discountCode: action.payload.discount?.discountCode || null,
        total: newTotal,
      };
    }
    
    case 'REMOVE_DISCOUNT': {
      const newTotal = state.subtotal + state.shipping + state.tax;
      
      return {
        ...state,
        discount: 0,
        discountCode: null,
        total: newTotal,
      };
    }
    
    case 'SET_SHIPPING': {
      const newTotal = state.subtotal + action.payload + state.tax - state.discount;
      
      return {
        ...state,
        shipping: action.payload,
        total: newTotal,
      };
    }
    
    case 'SET_TAX': {
      const newTotal = state.subtotal + state.shipping + action.payload - state.discount;
      
      return {
        ...state,
        tax: action.payload,
        total: newTotal,
      };
    }
    
    default:
      return state;
  }
};

interface CartContextType {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  discountCode: string | null;
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyDiscount: (code: string) => Promise<void>;
  removeDiscount: () => void;
  setShipping: (amount: number) => void;
  setTax: (amount: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (parsedCart.items && Array.isArray(parsedCart.items)) {
          parsedCart.items.forEach((item: CartItem) => {
            dispatch({ type: 'ADD_ITEM', payload: item });
          });
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const addItem = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const applyDiscount = async (code: string) => {
    try {
      const result = await discountService.validateDiscountCode(code, state.subtotal);
      
      if (result.isValid && result.discount) {
        dispatch({ type: 'SET_DISCOUNT', payload: result });
      } else {
        throw new Error(result.error || 'Invalid discount code');
      }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to apply discount');
    }
  };

  const removeDiscount = () => {
    dispatch({ type: 'REMOVE_DISCOUNT' });
  };

  const setShipping = (amount: number) => {
    dispatch({ type: 'SET_SHIPPING', payload: amount });
  };

  const setTax = (amount: number) => {
    dispatch({ type: 'SET_TAX', payload: amount });
  };

  const value: CartContextType = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyDiscount,
    removeDiscount,
    setShipping,
    setTax,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

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
