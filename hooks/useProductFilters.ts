"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useProductFiltersStore } from "../features/products/store";

export function useProductFilters() {
  const params = useSearchParams();
  const setQuery = useProductFiltersStore((s) => s.setQuery);
  const setCategory = useProductFiltersStore((s) => s.setCategory);
  const setSort = useProductFiltersStore((s) => s.setSort);
  const state = useProductFiltersStore();

  useEffect(() => {
    const q = params.get("q") || "";
    const category = params.get("category") || "";
    const sort = params.get("sort") || "relevance";
    setQuery(q);
    setCategory(category);
    setSort(sort);
  }, [params, setQuery, setCategory, setSort]);

  return state;
}
