"use client";

import { create } from "zustand";
import { orderService } from "../../services/orderService";

type Order = { id: string; total: number; status: string; createdAt: string };

type OrdersState = {
  orders: Order[];
  loading: boolean;
  fetchOrders: () => Promise<void>;
  cancelOrder: (id: string) => Promise<void>;
};

export const useOrdersStore = create<OrdersState>((set, get) => ({
  orders: [],
  loading: false,
  fetchOrders: async () => {
    set({ loading: true });
    try {
      const fullOrders = await orderService.getOrders();
      const minimalOrders = fullOrders.map((o) => ({
        id: o.id,
        total: o.total,
        status: o.status,
        createdAt: o.createdAt,
      }));
      set({ orders: minimalOrders });
    } catch (error) {
      console.error('Failed to fetch orders', error);
    } finally {
      set({ loading: false });
    }
  },
  cancelOrder: async (id: string) => {
    const updated = await orderService.cancelOrder(id);
    set({ orders: get().orders.map((o) => (o.id === id ? { ...o, status: updated.status } : o)) });
  },
}));
