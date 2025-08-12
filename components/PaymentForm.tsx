"use client";

import { PaymentInfo } from "../features/checkout/store";

interface PaymentFormProps {
  data: PaymentInfo;
  onChange: (info: PaymentInfo) => void;
  onSubmit: () => void;
}

export default function PaymentForm({ data, onChange, onSubmit }: PaymentFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleChange = (field: keyof PaymentInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          placeholder="Cardholder Name"
          className="rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          value={data.cardholderName}
          onChange={(e) => handleChange('cardholderName', e.target.value)}
        />
        <select
          className="rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          value={data.cardType}
          onChange={(e) => handleChange('cardType', e.target.value)}
        >
          <option value="">Select Card Type</option>
          <option value="Visa">Visa</option>
          <option value="Mastercard">Mastercard</option>
          <option value="American Express">American Express</option>
          <option value="Discover">Discover</option>
        </select>
      </div>
      
      <input
        placeholder="Card Number"
        className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
        value={data.cardNumber}
        onChange={(e) => handleChange('cardNumber', e.target.value)}
        maxLength={19}
      />
      
      <div className="grid grid-cols-3 gap-4">
        <select
          className="rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          value={data.expiryMonth}
          onChange={(e) => handleChange('expiryMonth', e.target.value)}
        >
          <option value="">Month</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
            <option key={month} value={month.toString().padStart(2, '0')}>
              {month.toString().padStart(2, '0')}
            </option>
          ))}
        </select>
        
        <select
          className="rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          value={data.expiryYear}
          onChange={(e) => handleChange('expiryYear', e.target.value)}
        >
          <option value="">Year</option>
          {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </select>
        
        <input
          placeholder="CVV"
          className="rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          value={data.cvv}
          onChange={(e) => handleChange('cvv', e.target.value)}
          maxLength={4}
        />
      </div>
      
      <button
        type="submit"
        className="w-full rounded-lg bg-primary hover:bg-primary-600 px-4 py-3 text-sm font-medium text-white transition-colors shadow-soft"
      >
        Continue to Review
      </button>
    </form>
  );
}
