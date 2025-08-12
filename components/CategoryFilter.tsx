"use client";

import { useSearchParams, useRouter } from "next/navigation";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Use prop if provided, otherwise fall back to URL search params
  const current = selectedCategory !== undefined ? selectedCategory : (searchParams.get("category") || "");

  function setCategory(cat: string) {
    if (onCategoryChange) {
      // Use callback if provided
      onCategoryChange(cat);
    } else {
      // Fall back to URL-based navigation
      const params = new URLSearchParams(searchParams.toString());
      if (cat) params.set("category", cat); else params.delete("category");
      router.push(`/products?${params.toString()}`);
    }
  }

  return (
    <ul className="space-y-2 text-sm">
      <li>
        <button 
          onClick={() => setCategory("")} 
          className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
            current === "" 
              ? "bg-primary text-white font-semibold" 
              : "text-neutral-700 hover:bg-highlight hover:text-neutral-800"
          }`}
        >
          All Categories
        </button>
      </li>
      {categories.map((c) => (
        <li key={c}>
          <button 
            onClick={() => setCategory(c)} 
            className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
              current === c 
                ? "bg-primary text-white font-semibold" 
                : "text-neutral-700 hover:bg-highlight hover:text-neutral-800"
            }`}
          >
            {c}
          </button>
        </li>
      ))}
    </ul>
  );
}
