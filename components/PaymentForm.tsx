"use client";

import { useCheckoutStore } from "../features/checkout/store";

export default function PaymentForm() {
  const paymentMethod = useCheckoutStore((s) => s.paymentMethod);
  const setPaymentMethod = useCheckoutStore((s) => s.setPaymentMethod);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input
          id="card"
          type="radio"
          checked={paymentMethod === "card"}
          onChange={() => setPaymentMethod("card")}
        />
        <label htmlFor="card">Credit/Debit Card</label>
      </div>
      <div className="flex items-center gap-2">
        <input
          id="cod"
          type="radio"
          checked={paymentMethod === "cod"}
          onChange={() => setPaymentMethod("cod")}
        />
        <label htmlFor="cod">Cash on Delivery</label>
      </div>
    </div>
  );
}
