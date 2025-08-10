"use client";

import { create } from "zustand";
import { Product } from "../../types/product";

export interface ProductFilters {
  category: string;
  priceRange: [number, number];
  rating: number;
  query: string;
}

interface ProductsState {
  products: Product[];
  filters: ProductFilters;
  sortBy: string;
  loading: boolean;
  setProducts: (products: Product[]) => void;
  setFilters: (filters: ProductFilters) => void;
  setSortBy: (sortBy: string) => void;
  setLoading: (loading: boolean) => void;
  clearFilters: () => void;
}

const defaultFilters: ProductFilters = {
  category: "",
  priceRange: [0, 1000],
  rating: 0,
  query: "",
};

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  filters: defaultFilters,
  sortBy: "relevance",
  loading: false,
  setProducts: (products) => set({ products }),
  setFilters: (filters) => set({ filters }),
  setSortBy: (sortBy) => set({ sortBy }),
  setLoading: (loading) => set({ loading }),
  clearFilters: () => set({ filters: defaultFilters }),
}));
