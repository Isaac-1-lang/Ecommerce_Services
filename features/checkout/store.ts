"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ShippingInfo = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
};

export type PaymentInfo = {
  cardType: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardholderName: string;
};

type CheckoutState = {
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
  setShippingInfo: (info: ShippingInfo) => void;
  setPaymentInfo: (info: PaymentInfo) => void;
  clearCheckout: () => void;
};

const initialShippingInfo: ShippingInfo = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  phone: "",
};

const initialPaymentInfo: PaymentInfo = {
  cardType: "",
  cardNumber: "",
  expiryMonth: "",
  expiryYear: "",
  cvv: "",
  cardholderName: "",
};

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      shippingInfo: initialShippingInfo,
      paymentInfo: initialPaymentInfo,
      setShippingInfo: (info) => set({ shippingInfo: info }),
      setPaymentInfo: (info) => set({ paymentInfo: info }),
      clearCheckout: () => set({ 
        shippingInfo: initialShippingInfo, 
        paymentInfo: initialPaymentInfo 
      }),
    }),
    { name: "now_checkout" }
  )
);
