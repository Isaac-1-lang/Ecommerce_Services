"use client";

import { useCheckoutStore } from "../features/checkout/store";
import { useState } from "react";

export default function AddressForm() {
  const setShippingInfo = useCheckoutStore((s) => s.setShippingInfo);
  const shippingInfo = useCheckoutStore((s) => s.shippingInfo);
  const [local, setLocal] = useState(shippingInfo);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setShippingInfo(local);
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <input placeholder="Full name" className="rounded-md border bg-white px-3 py-2 dark:bg-gray-900" value={local.name} onChange={(e)=> setLocal({...local, name: e.target.value})} />
      <input placeholder="Phone" className="rounded-md border bg-white px-3 py-2 dark:bg-gray-900" value={local.phone} onChange={(e)=> setLocal({...local, phone: e.target.value})} />
      <input placeholder="Address line 1" className="sm:col-span-2 rounded-md border bg-white px-3 py-2 dark:bg-gray-900" value={local.address1} onChange={(e)=> setLocal({...local, address1: e.target.value})} />
      <input placeholder="Address line 2" className="sm:col-span-2 rounded-md border bg-white px-3 py-2 dark:bg-gray-900" value={local.address2} onChange={(e)=> setLocal({...local, address2: e.target.value})} />
      <input placeholder="City" className="rounded-md border bg-white px-3 py-2 dark:bg-gray-900" value={local.city} onChange={(e)=> setLocal({...local, city: e.target.value})} />
      <input placeholder="Postal code" className="rounded-md border bg-white px-3 py-2 dark:bg-gray-900" value={local.postalCode} onChange={(e)=> setLocal({...local, postalCode: e.target.value})} />
      <button type="submit" className="sm:col-span-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-white">Save address</button>
    </form>
  );
}
