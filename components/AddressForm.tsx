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
        className="rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
        value={data.firstName} 
        onChange={(e) => handleChange('firstName', e.target.value)} 
      />
      <input 
        placeholder="Last name" 
        className="rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
        value={data.lastName} 
        onChange={(e) => handleChange('lastName', e.target.value)} 
      />
      <input 
        placeholder="Phone" 
        className="rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
        value={data.phone} 
        onChange={(e) => handleChange('phone', e.target.value)} 
      />
      <input 
        placeholder="Address" 
        className="sm:col-span-2 rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
        value={data.address} 
        onChange={(e) => handleChange('address', e.target.value)} 
      />
      <input 
        placeholder="City" 
        className="rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
        value={data.city} 
        onChange={(e) => handleChange('city', e.target.value)} 
      />
      <input 
        placeholder="State" 
        className="rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
        value={data.state} 
        onChange={(e) => handleChange('state', e.target.value)} 
      />
      <input 
        placeholder="ZIP Code" 
        className="rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
        value={data.zipCode} 
        onChange={(e) => handleChange('zipCode', e.target.value)} 
      />
      <button 
        type="submit" 
        className="sm:col-span-2 rounded-lg bg-primary hover:bg-primary-600 px-4 py-3 text-sm font-medium text-white transition-colors shadow-soft"
      >
        Continue to Payment
      </button>
    </form>
  );
}
