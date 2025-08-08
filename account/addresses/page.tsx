"use client";

import AddressForm from "../../components/AddressForm";
import { useCheckoutStore } from "../../features/checkout/store";

export default function AddressesPage() {
  const shippingInfo = useCheckoutStore((s) => s.shippingInfo);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold">Addresses</h1>
      <AddressForm />
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Current</h2>
        <pre className="mt-2 rounded-md bg-gray-100 p-3 text-sm dark:bg-gray-800">{JSON.stringify(shippingInfo, null, 2)}</pre>
      </div>
    </div>
  );
}
