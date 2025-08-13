"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ShippingInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  countryCode: string;
};

export type PaymentInfo = {
  paymentMethod: 'stripe' | 'paypal' | 'cash';
  stripePaymentIntentId?: string;
  cardType?: string;
  cardNumber?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cvv?: string;
  cardholderName?: string;
};

export type OrderSummary = {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
};

type CheckoutState = {
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
  orderSummary: OrderSummary;
  setShippingInfo: (info: ShippingInfo) => void;
  setPaymentInfo: (info: PaymentInfo) => void;
  setOrderSummary: (summary: OrderSummary) => void;
  clearCheckout: () => void;
  updateShippingCost: (cost: number) => void;
  calculateTax: (subtotal: number) => void;
};

const initialShippingInfo: ShippingInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: "United States",
  countryCode: "+1",
};

const initialPaymentInfo: PaymentInfo = {
  paymentMethod: 'stripe',
  cardType: "",
  cardNumber: "",
  expiryMonth: "",
  expiryYear: "",
  cvv: "",
  cardholderName: "",
};

const initialOrderSummary: OrderSummary = {
  subtotal: 0,
  shipping: 0,
  tax: 0,
  total: 0,
  currency: 'USD',
};

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set, get) => ({
      shippingInfo: initialShippingInfo,
      paymentInfo: initialPaymentInfo,
      orderSummary: initialOrderSummary,
      
      setShippingInfo: (info) => set({ shippingInfo: info }),
      
      setPaymentInfo: (info) => set({ paymentInfo: info }),
      
      setOrderSummary: (summary) => set({ orderSummary: summary }),
      
      clearCheckout: () => set({ 
        shippingInfo: initialShippingInfo, 
        paymentInfo: initialPaymentInfo,
        orderSummary: initialOrderSummary,
      }),
      
      updateShippingCost: (cost) => {
        const { orderSummary } = get();
        const newTotal = orderSummary.subtotal + cost + orderSummary.tax;
        set({
          orderSummary: {
            ...orderSummary,
            shipping: cost,
            total: newTotal,
          }
        });
      },
      
      calculateTax: (subtotal) => {
        const { orderSummary } = get();
        const taxRate = 0.08; // 8% tax rate - adjust as needed
        const tax = subtotal * taxRate;
        const newTotal = subtotal + orderSummary.shipping + tax;
        set({
          orderSummary: {
            ...orderSummary,
            subtotal,
            tax,
            total: newTotal,
          }
        });
      },
    }),
    { 
      name: "now_checkout",
      partialize: (state) => ({ 
        shippingInfo: state.shippingInfo, 
        paymentInfo: state.paymentInfo,
        orderSummary: state.orderSummary,
      })
    }
  )
);
