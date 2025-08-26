"use client";

import { useEffect, useState } from "react";
import { useOrdersStore } from "../../../features/orders/store";
import OrderCard from "../../../components/OrderCard";
import { Order } from "../../../types/order";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../../features/auth/store";

export default function OrdersPage() {
  const { orders, loading, error, fetchOrders, cancelOrder, clearError } = useOrdersStore();
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);
  const { user, token, isInitialized } = useAuthStore();
  const router = useRouter();

  useEffect(() => {     
    // Wait for auth store initialization
    if (!isInitialized) {
      return;
    }

    // Check if user is authenticated
    if (!user || !token) {
      if (typeof window !== 'undefined' && window.location.pathname !== '/auth/login') {
        router.push('/auth/login');
      }
      return;
    }

    fetchOrders();
  }, [fetchOrders, user, token, isInitialized, router]);

  useEffect(() => {
    const handleCancelOrder = async (event: Event) => {
      const customEvent = event as CustomEvent;
      const orderId = customEvent.detail;
      if (confirm('Are you sure you want to cancel this order?')) {
        setCancellingOrderId(orderId);
        try {
          await cancelOrder(orderId, 'Customer requested cancellation');
        } catch (error) {
          console.error('Failed to cancel order:', error);
        } finally {
          setCancellingOrderId(null);
        }
      }
    };

    window.addEventListener('cancelOrder', handleCancelOrder);
    return () => {
      window.removeEventListener('cancelOrder', handleCancelOrder);
    };
  }, [cancelOrder]);

  // Show loading while auth is initializing
  if (!isInitialized) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2 text-neutral-600">Loading...</span>
        </div>
      </div>
    );
  }

  // Show loading while fetching orders
  if (loading && orders.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2 text-neutral-600">Loading orders...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold">My Orders</h1>
      
      {/* Error Display */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 p-4 bg-red-50">
          <div className="flex items-center justify-between">
            <p className="text-red-700">{error}</p>
            <button 
              onClick={clearError}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* No Orders */}
      {!loading && orders.length === 0 && (
        <div className="rounded-lg border border-neutral-200 p-6 bg-white text-center">
          <p className="text-neutral-700 mb-2">No orders to display.</p>
          <p className="text-sm text-neutral-500">
            No recent orders found.
          </p>
        </div>
      )}

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order: Order) => (
          <OrderCard 
            key={order.id} 
            order={order}
          />
        ))}
      </div>

      {/* Loading More Indicator */}
      {loading && orders.length > 0 && (
        <div className="flex items-center justify-center py-6">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="ml-2 text-neutral-600">Loading...</span>
        </div>
      )}
    </div>
  );
}
