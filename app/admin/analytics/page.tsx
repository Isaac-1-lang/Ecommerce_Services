"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "../../../features/auth/store";

interface AnalyticsData {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  ordersByStatus: Record<string, number>;
}

interface CustomerStats {
  totalCustomers: number;
  customersWithOrders: number;
  averageOrdersPerCustomer: number;
  topCustomers: Array<{
    customerId: string;
    orderCount: number;
  }>;
}

interface ProductAnalytics {
  productId: string;
  totalSold: number;
  productName?: string;
  productSlug?: string;
}

interface DeliveryMetrics {
  deliverySuccessRate: number;
  totalDelivered: number;
  totalCompleted: number;
  averageDeliveryTimeHours: number;
}

interface RevenueTrend {
  date: string;
  revenue: number;
  orderCount: number;
}

export default function AdminAnalyticsPage() {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [customerStats, setCustomerStats] = useState<CustomerStats | null>(null);
  const [topProducts, setTopProducts] = useState<ProductAnalytics[]>([]);
  const [deliveryMetrics, setDeliveryMetrics] = useState<DeliveryMetrics | null>(null);
  const [revenueTrend, setRevenueTrend] = useState<RevenueTrend[]>([]);

  useEffect(() => {
    if (user) {
      fetchAnalytics();
    }
  }, [user]);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const baseUrl = "http://44.201.144.244:8081";
      const token = localStorage.getItem('token');

      // Fetch dashboard analytics
      const dashboardResponse = await fetch(`${baseUrl}/api/v1/admin/analytics/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (dashboardResponse.ok) {
        const dashboardData = await dashboardResponse.json();
        if (dashboardData.success && dashboardData.data) {
          setAnalyticsData(dashboardData.data);
        }
      }

      // Fetch customer analytics
      const customerResponse = await fetch(`${baseUrl}/api/v1/admin/analytics/customers`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (customerResponse.ok) {
        const customerData = await customerResponse.json();
        if (customerData.success && customerData.data) {
          setCustomerStats(customerData.data);
        }
      }

      // Fetch product analytics
      const productResponse = await fetch(`${baseUrl}/api/v1/admin/analytics/products?limit=5`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (productResponse.ok) {
        const productData = await productResponse.json();
        if (productData.success && productData.data) {
          setTopProducts(productData.data);
        }
      }

      // Fetch delivery analytics
      const deliveryResponse = await fetch(`${baseUrl}/api/v1/admin/analytics/delivery`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (deliveryResponse.ok) {
        const deliveryData = await deliveryResponse.json();
        if (deliveryData.success && deliveryData.data) {
          setDeliveryMetrics(deliveryData.data);
        }
      }

      // Fetch revenue trends
      const trendResponse = await fetch(`${baseUrl}/api/v1/admin/analytics/trends?days=7`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (trendResponse.ok) {
        const trendData = await trendResponse.json();
        if (trendData.success && trendData.data) {
          setRevenueTrend(trendData.data);
        }
      }

    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2 text-neutral-600">Loading analytics...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="text-center py-20">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchAnalytics}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">Analytics Dashboard</h1>
        <p className="mt-2 text-neutral-600">Comprehensive insights into your e-commerce performance</p>
      </div>

      {/* Key Metrics */}
      {analyticsData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-neutral-500">Total Orders</h3>
            <p className="text-3xl font-bold text-neutral-900">{analyticsData.totalOrders}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-neutral-500">Total Revenue</h3>
            <p className="text-3xl font-bold text-primary">${analyticsData.totalRevenue.toFixed(2)}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-neutral-500">Average Order Value</h3>
            <p className="text-3xl font-bold text-neutral-900">${analyticsData.averageOrderValue.toFixed(2)}</p>
          </div>
        </div>
      )}

      {/* Orders by Status */}
      {analyticsData?.ordersByStatus && (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-medium text-neutral-900 mb-4">Orders by Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(analyticsData.ordersByStatus).map(([status, count]) => (
              <div key={status} className="text-center">
                <p className="text-2xl font-bold text-primary">{count}</p>
                <p className="text-sm text-neutral-600 capitalize">{status}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Customer Analytics */}
      {customerStats && (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-medium text-neutral-900 mb-4">Customer Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-neutral-500">Total Customers</p>
              <p className="text-2xl font-bold text-neutral-900">{customerStats.totalCustomers}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Customers with Orders</p>
              <p className="text-2xl font-bold text-neutral-900">{customerStats.customersWithOrders}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Avg Orders per Customer</p>
              <p className="text-2xl font-bold text-neutral-900">{customerStats.averageOrdersPerCustomer.toFixed(1)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Top Products */}
      {topProducts.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-medium text-neutral-900 mb-4">Top Selling Products</h3>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={product.productId} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-primary">#{index + 1}</span>
                  <div>
                    <p className="font-medium text-neutral-900">
                      {product.productName || `Product ${product.productId}`}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {product.productSlug || 'No slug'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-neutral-900">{product.totalSold}</p>
                  <p className="text-sm text-neutral-500">units sold</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delivery Performance */}
      {deliveryMetrics && (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-medium text-neutral-900 mb-4">Delivery Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-neutral-500">Delivery Success Rate</p>
              <p className="text-2xl font-bold text-green-600">{deliveryMetrics.deliverySuccessRate.toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Total Delivered</p>
              <p className="text-2xl font-bold text-neutral-900">{deliveryMetrics.totalDelivered}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Avg Delivery Time</p>
              <p className="text-2xl font-bold text-neutral-900">{deliveryMetrics.averageDeliveryTimeHours.toFixed(1)}h</p>
            </div>
          </div>
        </div>
      )}

      {/* Revenue Trends */}
      {revenueTrend.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-neutral-900 mb-4">Revenue Trends (Last 7 Days)</h3>
          <div className="space-y-3">
            {revenueTrend.map((day) => (
              <div key={day.date} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                <div>
                  <p className="font-medium text-neutral-900">{day.date}</p>
                  <p className="text-sm text-neutral-500">{day.orderCount} orders</p>
                </div>
                <p className="text-lg font-bold text-primary">${day.revenue.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Refresh Button */}
      <div className="mt-8 text-center">
        <button
          onClick={fetchAnalytics}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          Refresh Analytics
        </button>
      </div>
    </div>
  );
}
