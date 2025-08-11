"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useProductsStore } from "../features/products/store";

export function useProductFilters() {
  const params = useSearchParams();
 
  const state = useProductsStore();

  useEffect(() => {
   
  }, [params]);

  return state;
}
