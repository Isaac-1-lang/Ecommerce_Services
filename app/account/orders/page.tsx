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
  const [debugInfo, setDebugInfo] = useState<string>("");
  const { user, token, isInitialized } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    console.log('Orders Page Auth State (store):', {
      isInitialized,
      user: !!user,
      token: !!token,
      pathname: typeof window !== 'undefined' ? window.location.pathname : ''
    });

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

    // Debug: Check authentication state
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('user');
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8081';

      setDebugInfo(`
        Auth Store - User: ${!!user}, Token: ${!!token}
        LocalStorage - Token: ${!!storedToken}, User: ${!!storedUser}
        Token length: ${storedToken ? storedToken.length : 0}
        API URL: ${apiUrl}
        Current time: ${new Date().toISOString()}
      `);

      console.log('Debug Info:', {
        authStore: { user: !!user, token: !!token },
        localStorage: { token: !!storedToken, user: !!storedUser },
        apiUrl
      });
    }

    // Only fetch orders if authenticated
    console.log('Fetching orders for user:', user?.email, 'with role:', user?.role);
    console.log('User ID:', user?.id);
    console.log('Token exists:', !!token);
    console.log('Token preview:', token ? token.substring(0, 20) + '...' : 'No token');
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

  // Debug: Log orders state
  console.log('Orders state:', { loading, ordersCount: orders.length, error });
  
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
      
      {/* Debug Information */}
      {debugInfo && (
        <div className="mb-6 rounded-lg border border-blue-200 p-4 bg-blue-50">
          <h3 className="font-medium text-blue-900 mb-2">Debug Information</h3>
          <pre className="text-xs text-blue-700 whitespace-pre-wrap">{debugInfo}</pre>
        </div>
      )}
      
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
