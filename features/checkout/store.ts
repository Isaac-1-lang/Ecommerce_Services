"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ShippingInfo = {
  name: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  postalCode: string;
};

export type PaymentMethod = "card" | "cod";

type CheckoutState = {
  step: "cart" | "address" | "payment" | "review" | "complete";
  shippingInfo: ShippingInfo;
  paymentMethod: PaymentMethod;
  setStep: (s: CheckoutState["step"]) => void;
  setShippingInfo: (info: ShippingInfo) => void;
  setPaymentMethod: (m: PaymentMethod) => void;
  reset: () => void;
};

const initialInfo: ShippingInfo = {
  name: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  postalCode: "",
};

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      step: "cart",
      shippingInfo: initialInfo,
      paymentMethod: "card",
      setStep: (s) => set({ step: s }),
      setShippingInfo: (info) => set({ shippingInfo: info }),
      setPaymentMethod: (m) => set({ paymentMethod: m }),
      reset: () => set({ step: "cart", shippingInfo: initialInfo, paymentMethod: "card" }),
    }),
    { name: "now_checkout" }
  )
);
