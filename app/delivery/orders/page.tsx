"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "../../../features/auth/store";

interface DeliveryOrder {
  id: string;
  orderNumber: string;
  status: string;
  customerName: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  };
  items: Array<{
    productName: string;
    quantity: number;
  }>;
  total: number;
  createdAt: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

export default function DeliveryOrdersPage() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<DeliveryOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<DeliveryOrder | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchDeliveryOrders();
    }
  }, [user]);

  const fetchDeliveryOrders = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const baseUrl = "http://44.201.144.244:8081";
      const token = localStorage.getItem('token');

      const response = await fetch(`${baseUrl}/api/v1/delivery/orders`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setOrders(data.data);
        }
      } else {
        throw new Error('Failed to fetch delivery orders');
      }
    } catch (error) {
      console.error('Failed to fetch delivery orders:', error);
      setError('Failed to load delivery orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setUpdatingStatus(orderId);
    try {
      const baseUrl = "http://44.201.144.244:8081";
      const token = localStorage.getItem('token');

      const response = await fetch(`${baseUrl}/api/v1/delivery/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        // Refresh orders
        await fetchDeliveryOrders();
      } else {
        throw new Error('Failed to update order status');
      }
    } catch (error) {
      console.error('Failed to update order status:', error);
      alert('Failed to update order status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const updateTracking = async (orderId: string, trackingNumber: string) => {
    try {
      const baseUrl = "http://44.201.144.244:8081";
      const token = localStorage.getItem('token');

      const response = await fetch(`${baseUrl}/api/v1/delivery/orders/${orderId}/tracking`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ trackingNumber })
      });

      if (response.ok) {
        // Refresh orders
        await fetchDeliveryOrders();
        setSelectedOrder(null);
      } else {
        throw new Error('Failed to update tracking');
      }
    } catch (error) {
      console.error('Failed to update tracking:', error);
      alert('Failed to update tracking');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'processing':
        return 'text-blue-600 bg-blue-50';
      case 'out_for_delivery':
        return 'text-orange-600 bg-orange-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-neutral-600 bg-neutral-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'Pending';
      case 'processing':
        return 'Processing';
      case 'out_for_delivery':
        return 'Out for Delivery';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const filteredOrders = orders.filter(order => 
    statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase()
  );

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2 text-neutral-600">Loading delivery orders...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">Delivery Orders</h1>
        <p className="mt-2 text-neutral-600">Manage and track your assigned delivery orders</p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 p-4 bg-red-50">
          <div className="flex items-center justify-between">
            <p className="text-red-700">{error}</p>
            <button 
              onClick={fetchDeliveryOrders}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Status Filter */}
      <div className="mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="out_for_delivery">Out for Delivery</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-neutral-900">#{order.orderNumber}</h3>
                <p className="text-sm text-neutral-500">{order.customerName}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                {getStatusText(order.status)}
              </span>
            </div>

            {/* Address */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-neutral-700 mb-2">Delivery Address</h4>
              <p className="text-sm text-neutral-600">{order.shippingAddress.street}</p>
              <p className="text-sm text-neutral-600">
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </p>
              <p className="text-sm text-neutral-600">{order.shippingAddress.phone}</p>
            </div>

            {/* Items */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-neutral-700 mb-2">Items</h4>
              <div className="space-y-1">
                {order.items.map((item, index) => (
                  <p key={index} className="text-sm text-neutral-600">
                    {item.productName} × {item.quantity}
                  </p>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t border-neutral-100 pt-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-neutral-700">Total:</span>
                <span className="text-lg font-bold text-primary">${order.total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                Created: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={() => setSelectedOrder(order)}
                className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                View Details
              </button>
              
              {/* Status Update */}
              {order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && (
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  disabled={updatingStatus === order.id}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                >
                  <option value="PENDING">Pending</option>
                  <option value="PROCESSING">Processing</option>
                  <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                  <option value="DELIVERED">Delivered</option>
                </select>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-500">No delivery orders found.</p>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Order Details</h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-neutral-400 hover:text-neutral-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-neutral-900">Order Information</h4>
                  <p className="text-sm text-neutral-600">#{selectedOrder.orderNumber}</p>
                  <p className="text-sm text-neutral-600">Status: {getStatusText(selectedOrder.status)}</p>
                  <p className="text-sm text-neutral-600">Created: {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                </div>

                <div>
                  <h4 className="font-medium text-neutral-900">Customer</h4>
                  <p className="text-sm text-neutral-600">{selectedOrder.customerName}</p>
                </div>

                <div>
                  <h4 className="font-medium text-neutral-900">Delivery Address</h4>
                  <p className="text-sm text-neutral-600">{selectedOrder.shippingAddress.street}</p>
                  <p className="text-sm text-neutral-600">
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                  </p>
                  <p className="text-sm text-neutral-600">{selectedOrder.shippingAddress.phone}</p>
                </div>

                <div>
                  <h4 className="font-medium text-neutral-900">Items</h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.productName} × {item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-neutral-900">Order Summary</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between font-medium border-t pt-1">
                      <span>Total:</span>
                      <span>${selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Tracking Update */}
                {selectedOrder.status === 'OUT_FOR_DELIVERY' && (
                  <div>
                    <h4 className="font-medium text-neutral-900 mb-2">Update Tracking</h4>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Enter tracking number"
                        className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                        defaultValue={selectedOrder.trackingNumber || ''}
                        id="trackingNumber"
                      />
                      <button
                        onClick={() => {
                          const trackingNumber = (document.getElementById('trackingNumber') as HTMLInputElement).value;
                          if (trackingNumber) {
                            updateTracking(selectedOrder.id, trackingNumber);
                          }
                        }}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 text-sm"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
