"use client";

import { ShippingInfo } from "../features/checkout/store";

interface AddressFormProps {
  data: ShippingInfo;
  onChange: (info: ShippingInfo) => void;
  onSubmit: () => void;
}

export default function AddressForm({ data, onChange, onSubmit }: AddressFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleChange = (field: keyof ShippingInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <input 
        placeholder="First name" 
        className="rounded-md border bg-white px-3 py-2 dark:bg-green-900" 
        value={data.firstName} 
        onChange={(e) => handleChange('firstName', e.target.value)} 
      />
      <input 
        placeholder="Last name" 
        className="rounded-md border bg-white px-3 py-2 dark:bg-green-900" 
        value={data.lastName} 
        onChange={(e) => handleChange('lastName', e.target.value)} 
      />
      <input 
        placeholder="Phone" 
        className="rounded-md border bg-white px-3 py-2 dark:bg-green-900" 
        value={data.phone} 
        onChange={(e) => handleChange('phone', e.target.value)} 
      />
      <input 
        placeholder="Address" 
        className="sm:col-span-2 rounded-md border bg-white px-3 py-2 dark:bg-green-900" 
        value={data.address} 
        onChange={(e) => handleChange('address', e.target.value)} 
      />
      <input 
        placeholder="City" 
        className="rounded-md border bg-white px-3 py-2 dark:bg-green-900" 
        value={data.city} 
        onChange={(e) => handleChange('city', e.target.value)} 
      />
      <input 
        placeholder="State" 
        className="rounded-md border bg-white px-3 py-2 dark:bg-green-900" 
        value={data.state} 
        onChange={(e) => handleChange('state', e.target.value)} 
      />
      <input 
        placeholder="ZIP Code" 
        className="rounded-md border bg-white px-3 py-2 dark:bg-green-900" 
        value={data.zipCode} 
        onChange={(e) => handleChange('zipCode', e.target.value)} 
      />
      <button 
        type="submit" 
        className="sm:col-span-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
      >
        Continue to Payment
      </button>
    </form>
  );
}
