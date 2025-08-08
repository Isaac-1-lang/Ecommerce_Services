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
    const orders = await orderService.listOrders();
    set({ orders, loading: false });
  },
  cancelOrder: async (id: string) => {
    await orderService.cancelOrder(id);
    set({ orders: get().orders.map((o) => (o.id === id ? { ...o, status: "cancelled" } : o)) });
  },
}));
