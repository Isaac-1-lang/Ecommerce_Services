"use client";

import { create } from "zustand";
import { orderService } from "../../services/orderService";
import { Order, CreateOrderRequest } from "../../types/order";

type OrdersState = {
  orders: Order[];
  loading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  fetchOrderById: (id: string) => Promise<Order | null>;
  createOrder: (orderData: CreateOrderRequest) => Promise<Order>;
  cancelOrder: (id: string, reason: string) => Promise<void>;
  updateOrderStatus: (id: string, status: Order['status']) => Promise<void>;
  clearError: () => void;
};

export const useOrdersStore = create<OrdersState>((set, get) => ({
  orders: [],
  loading: false,
  error: null,

  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const orders = await orderService.getOrders();
      set({ orders, loading: false });
    } catch (error: any) {
      console.error('Failed to fetch orders', error);
      set({ 
        error: error.message || 'Failed to fetch orders', 
        loading: false 
      });
    }
  },

  fetchOrderById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const order = await orderService.getOrderById(id);
      set({ loading: false });
      return order;
    } catch (error: any) {
      console.error('Failed to fetch order', error);
      set({ 
        error: error.message || 'Failed to fetch order', 
        loading: false 
      });
      return null;
    }
  },

  createOrder: async (orderData: CreateOrderRequest) => {
    set({ loading: true, error: null });
    try {
      const newOrder = await orderService.createOrder(orderData);
      set(state => ({
        orders: [newOrder, ...state.orders],
        loading: false
      }));
      return newOrder;
    } catch (error: any) {
      console.error('Failed to create order', error);
      set({ 
        error: error.message || 'Failed to create order', 
        loading: false 
      });
      throw error;
    }
  },

  cancelOrder: async (id: string, reason: string) => {
    set({ loading: true, error: null });
    try {
      await orderService.cancelOrder(id);
      set(state => ({
        orders: state.orders.map(order => 
          order.id === id 
            ? { ...order, status: 'CANCELLED' as const }
            : order
        ),
        loading: false
      }));
    } catch (error: any) {
      console.error('Failed to cancel order', error);
      set({ 
        error: error.message || 'Failed to cancel order', 
        loading: false 
      });
      throw error;
    }
  },

  updateOrderStatus: async (id: string, status: Order['status']) => {
    set({ loading: true, error: null });
    try {
      await orderService.updateOrderStatus(id, status);
      set(state => ({
        orders: state.orders.map(order => 
          order.id === id 
            ? { ...order, status }
            : order
        ),
        loading: false
      }));
    } catch (error: any) {
      console.error('Failed to update order status', error);
      set({ 
        error: error.message || 'Failed to update order status', 
        loading: false 
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
