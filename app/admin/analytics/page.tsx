"use client";

import { useState } from 'react';
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiShoppingCart, FiUsers, FiPackage } from 'react-icons/fi';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');

  // Mock analytics data - replace with real data from your backend
  const metrics = {
    revenue: {
      current: 45230.50,
      previous: 38950.25,
      change: 16.1,
      trend: 'up'
    },
    orders: {
      current: 156,
      previous: 142,
      change: 9.9,
      trend: 'up'
    },
    customers: {
      current: 89,
      previous: 76,
      change: 17.1,
      trend: 'up'
    },
    products: {
      current: 30,
      previous: 28,
      change: 7.1,
      trend: 'up'
    }
  };

  const topProducts = [
    { name: 'Apple iPhone 15 Pro', sales: 45, revenue: 53999.55 },
    { name: 'Sony WH-1000XM5 Headphones', sales: 32, revenue: 12799.68 },
    { name: 'Nike Air Max 270', sales: 28, revenue: 3639.72 },
    { name: 'MacBook Pro 16"', sales: 12, revenue: 29999.88 },
    { name: 'Levi\'s 501 Jeans', sales: 25, revenue: 2249.75 }
  ];

  const categoryPerformance = [
    { category: 'Electronics', revenue: 85000, percentage: 45 },
    { category: 'Fashion', revenue: 65000, percentage: 35 },
    { category: 'Home & Garden', revenue: 25000, percentage: 13 },
    { category: 'Sports & Outdoors', revenue: 15000, percentage: 7 }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <FiTrendingUp className="h-4 w-4 text-success" />
    ) : (
      <FiTrendingDown className="h-4 w-4 text-error" />
    );
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-success' : 'text-error';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Analytics</h1>
          <p className="text-neutral-600 mt-1">Track your store's performance and insights</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-soft border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Revenue</p>
              <p className="text-2xl font-bold text-neutral-800">${metrics.revenue.current.toLocaleString()}</p>
              <div className="flex items-center gap-2 mt-2">
                {getTrendIcon(metrics.revenue.trend)}
                <span className={`text-sm font-medium ${getTrendColor(metrics.revenue.trend)}`}>
                  +{metrics.revenue.change}%
                </span>
                <span className="text-sm text-neutral-500">vs last period</span>
              </div>
            </div>
            <div className="p-3 bg-success/10 rounded-lg">
              <FiDollarSign className="h-6 w-6 text-success" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-soft border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Orders</p>
              <p className="text-2xl font-bold text-neutral-800">{metrics.orders.current}</p>
              <div className="flex items-center gap-2 mt-2">
                {getTrendIcon(metrics.orders.trend)}
                <span className={`text-sm font-medium ${getTrendColor(metrics.orders.trend)}`}>
                  +{metrics.orders.change}%
                </span>
                <span className="text-sm text-neutral-500">vs last period</span>
              </div>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <FiShoppingCart className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-soft border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">New Customers</p>
              <p className="text-2xl font-bold text-neutral-800">{metrics.customers.current}</p>
              <div className="flex items-center gap-2 mt-2">
                {getTrendIcon(metrics.customers.trend)}
                <span className={`text-sm font-medium ${getTrendColor(metrics.customers.trend)}`}>
                  +{metrics.customers.change}%
                </span>
                <span className="text-sm text-neutral-500">vs last period</span>
              </div>
            </div>
            <div className="p-3 bg-warning/10 rounded-lg">
              <FiUsers className="h-6 w-6 text-warning" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-soft border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Active Products</p>
              <p className="text-2xl font-bold text-neutral-800">{metrics.products.current}</p>
              <div className="flex items-center gap-2 mt-2">
                {getTrendIcon(metrics.products.trend)}
                <span className={`text-sm font-medium ${getTrendColor(metrics.products.trend)}`}>
                  +{metrics.products.change}%
                </span>
                <span className="text-sm text-neutral-500">vs last period</span>
              </div>
            </div>
            <div className="p-3 bg-secondary/10 rounded-lg">
              <FiPackage className="h-6 w-6 text-secondary" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white p-6 rounded-xl shadow-soft border border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Top Performing Products</h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-neutral-800">{product.name}</p>
                    <p className="text-sm text-neutral-500">{product.sales} sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-neutral-800">${product.revenue.toLocaleString()}</p>
                  <p className="text-sm text-neutral-500">{((product.revenue / metrics.revenue.current) * 100).toFixed(1)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white p-6 rounded-xl shadow-soft border border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Category Performance</h2>
          <div className="space-y-4">
            {categoryPerformance.map((category) => (
              <div key={category.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-700">{category.category}</span>
                  <span className="text-sm text-neutral-600">${category.revenue.toLocaleString()}</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-neutral-500">{category.percentage}% of total revenue</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow-soft border border-neutral-200">
        <h2 className="text-xl font-semibold text-neutral-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 bg-success/5 border border-success/20 rounded-lg">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-800">New order received</p>
              <p className="text-xs text-neutral-500">Order #ORD-005 for $299.99</p>
            </div>
            <span className="text-xs text-neutral-500">2 min ago</span>
          </div>

          <div className="flex items-center gap-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-800">Product stock updated</p>
              <p className="text-xs text-neutral-500">iPhone 15 Pro stock increased to 50 units</p>
            </div>
            <span className="text-xs text-neutral-500">1 hour ago</span>
          </div>

          <div className="flex items-center gap-4 p-3 bg-warning/5 border border-warning/20 rounded-lg">
            <div className="w-2 h-2 bg-warning rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-800">Low stock alert</p>
              <p className="text-xs text-neutral-500">Sony headphones running low (5 units left)</p>
            </div>
            <span className="text-xs text-neutral-500">3 hours ago</span>
          </div>

          <div className="flex items-center gap-4 p-3 bg-info/5 border border-info/20 rounded-lg">
            <div className="w-2 h-2 bg-info rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-800">New customer registered</p>
              <p className="text-xs text-neutral-500">Customer ID: CUST-090</p>
            </div>
            <span className="text-xs text-neutral-500">5 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
