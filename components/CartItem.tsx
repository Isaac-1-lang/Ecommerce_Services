"use client";

import { formatPrice } from "../lib/formatPrice";

export default function CartItem({
  item,
  onQuantityChange,
  onRemove,
  disabled = false,
}: {
  item: { id: string; name: string; price: number; image: string; quantity: number };
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 rounded-md border p-3">
      <div className="h-16 w-16 rounded bg-gray-100">
        {item.image && (
          <img 
            src={item.image} 
            alt={item.name} 
            className="h-full w-full object-cover rounded"
          />
        )}
      </div>
      <div className="flex-1">
        <p className="font-medium">{item.name}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{formatPrice(item.price)}</p>
        <div className="mt-2 flex items-center gap-2 text-sm">
          <button 
            onClick={() => onQuantityChange(Math.max(1, item.quantity - 1))} 
            disabled={disabled}
            className="rounded border px-2 py-1 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button 
            onClick={() => onQuantityChange(item.quantity + 1)} 
            disabled={disabled}
            className="rounded border px-2 py-1 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            +
          </button>
          <button 
            onClick={onRemove} 
            disabled={disabled}
            className="ml-4 text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
