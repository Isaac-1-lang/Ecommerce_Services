"use client";

import { useSearchParams, useRouter } from "next/navigation";

const options = [
  { value: "relevance", label: "Relevance" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating_desc", label: "Rating" },
];

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Use prop if provided, otherwise fall back to URL search params
  const current = value !== undefined ? value : (searchParams.get("sort") || "relevance");

  function handleChange(newValue: string) {
    if (onChange) {
      // Use callback if provided
      onChange(newValue);
    } else {
      // Fall back to URL-based navigation
      const params = new URLSearchParams(searchParams.toString());
      if (newValue) params.set("sort", newValue);
      else params.delete("sort");
      router.push(`/products?${params.toString()}`);
    }
  }

  return (
    <select
      className="rounded-md border bg-white px-3 py-2 text-sm dark:bg-gray-900"
      value={current}
      onChange={(e) => handleChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
