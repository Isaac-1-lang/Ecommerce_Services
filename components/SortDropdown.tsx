"use client";

import { useSearchParams, useRouter } from "next/navigation";

const options = [
  { value: "relevance", label: "Relevance" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating_desc", label: "Rating" },
];

export default function SortDropdown() {
  const searchParams = useSearchParams();
  const router = useRouter();

  function onChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("sort", value);
    else params.delete("sort");
    router.push(`/products?${params.toString()}`);
  }

  const current = searchParams.get("sort") || "relevance";

  return (
    <select
      className="rounded-md border bg-white px-3 py-2 text-sm dark:bg-gray-900"
      value={current}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
