"use client";

import { useEffect, useState } from 'react';
import { FiPackage, FiUsers, FiDollarSign, FiTrendingUp, FiAlertCircle, FiActivity, FiShield, FiCheckCircle } from 'react-icons/fi';
import Link from 'next/link';
import AdminTokenGenerator from '../../components/AdminTokenGenerator';
import { productService } from '../../services/productService';
import { orderService } from '../../services/orderService';

type DashboardStats = {
  totalProducts: number;
  totalRevenue: number;
  totalCustomers: number;
  lowStockProducts: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    lowStockProducts: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [productsResult, ordersResult] = await Promise.allSettled([
          productService.list(),
          orderService.getOrders(),
        ]);

        const products = productsResult.status === 'fulfilled' ? productsResult.value : [];
        const orders = ordersResult.status === 'fulfilled' ? ordersResult.value : [];

        const totalProducts = products.length;
        const lowStockProducts = products.filter((p: any) => (p?.stockQuantity ?? 0) < 10).length;
        const totalRevenue = orders.reduce((sum: number, o: any) => sum + (Number(o?.total) || 0), 0);
        // Customers endpoint not implemented yet; fallback to unique buyers inferred from orders
        const uniqueCustomers = new Set<string>(
          orders.map((o: any) => String(o?.userId || ''))
        );

        if (isMounted) {
          setStats({
            totalProducts,
            totalRevenue,
            totalCustomers: uniqueCustomers.has('') ? uniqueCustomers.size - 1 : uniqueCustomers.size,
            lowStockProducts,
          });
        }
      } catch (e: any) {
        if (isMounted) setError(e?.message || 'Failed to load dashboard stats');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const quickActions = [
    { title: 'Add New Product', href: '/admin/products/new', icon: FiPackage, color: 'bg-gradient-to-br from-primary to-primary-600', description: 'Create new product listings' },
    { title: 'Manage Customers', href: '/admin/customers', icon: FiUsers, color: 'bg-gradient-to-br from-success to-success-600', description: 'View and manage customer data' },
    { title: 'Analytics', href: '/admin/analytics', icon: FiTrendingUp, color: 'bg-gradient-to-br from-warning to-warning-600', description: 'View store performance metrics' },
    { title: 'Inventory', href: '/admin/inventory', icon: FiShield, color: 'bg-gradient-to-br from-secondary to-secondary-600', description: 'Monitor stock levels' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-light-text-primary dark:text-neutral-200">Admin Dashboard</h1>
          <p className="text-lg text-light-text-secondary dark:text-neutral-400 mt-2">Welcome back! Here's what's happening with your store today.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-light-surface-secondary dark:bg-neutral-800 rounded-xl border border-light-border-subtle dark:border-neutral-700">
            <FiActivity className="h-4 w-4 text-primary" />
            <span className="text-sm text-light-text-secondary dark:text-neutral-400">Last updated: {new Date().toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-light-surface-elevated dark:bg-neutral-800 p-8 rounded-2xl shadow-light-soft border border-light-border-subtle dark:border-neutral-700 hover:shadow-light-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-light-text-secondary dark:text-neutral-400 mb-2">Total Products</p>
              <p className="text-3xl font-bold text-light-text-primary dark:text-neutral-200">{loading ? '—' : stats.totalProducts}</p>
              <p className="text-xs text-light-text-muted dark:text-neutral-400 mt-1">Active listings</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <FiPackage className="h-8 w-8 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-light-surface-elevated dark:bg-neutral-800 p-8 rounded-2xl shadow-light-soft border border-light-border-subtle dark:border-neutral-700 hover:shadow-light-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-light-text-secondary dark:text-neutral-400 mb-2">Total Revenue</p>
              <p className="text-3xl font-bold text-light-text-primary dark:text-neutral-200">{loading ? '—' : `$${stats.totalRevenue.toLocaleString()}`}</p>
              <p className="text-xs text-light-text-muted dark:text-neutral-400 mt-1">This month</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-success/10 to-success/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <FiDollarSign className="h-8 w-8 text-success" />
            </div>
          </div>
        </div>

        <div className="bg-light-surface-elevated dark:bg-neutral-800 p-8 rounded-2xl shadow-light-soft border border-light-border-subtle dark:border-neutral-700 hover:shadow-light-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-light-text-secondary dark:text-neutral-400 mb-2">Total Customers</p>
              <p className="text-3xl font-bold text-light-text-primary dark:text-neutral-200">{loading ? '—' : stats.totalCustomers}</p>
              <p className="text-xs text-light-text-muted dark:text-neutral-400 mt-1">Registered users</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-warning/10 to-warning/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <FiUsers className="h-8 w-8 text-warning" />
            </div>
          </div>
        </div>

        <div className="bg-light-surface-elevated dark:bg-neutral-800 p-8 rounded-2xl shadow-light-soft border border-light-border-subtle dark:border-neutral-700 hover:shadow-light-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-light-text-secondary dark:text-neutral-400 mb-2">Store Status</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-lg font-bold text-success">Online</span>
              </div>
              <p className="text-xs text-light-text-muted dark:text-neutral-400 mt-1">{loading ? 'Loading stats…' : 'All systems operational'}</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-success/10 to-success/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <FiCheckCircle className="h-8 w-8 text-success" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-light-surface-elevated dark:bg-neutral-800 p-8 rounded-2xl shadow-light-soft border border-light-border-subtle dark:border-neutral-700">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-light-text-primary dark:text-neutral-200">Quick Actions</h2>
          <div className="w-1 h-8 bg-gradient-to-b from-primary to-transparent rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="group p-6 border border-light-border-subtle dark:border-neutral-600 rounded-xl hover:border-primary hover:shadow-light-lg transition-all duration-300 bg-light-surface-primary dark:bg-neutral-700 hover:bg-light-interactive-hover dark:hover:bg-neutral-600"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className={`p-4 rounded-2xl ${action.color} group-hover:scale-110 transition-transform duration-300 shadow-light-md`}>
                  <action.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-light-text-primary dark:text-neutral-200 group-hover:text-primary transition-colors duration-200 block mb-1">
                    {action.title}
                  </span>
                  <p className="text-xs text-light-text-muted dark:text-neutral-400">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Employee Management */}
      <div className="bg-light-surface-elevated dark:bg-neutral-800 p-8 rounded-2xl shadow-light-soft border border-light-border-subtle dark:border-neutral-700">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-light-text-primary dark:text-neutral-200">Employee Management</h2>
          <div className="w-1 h-8 bg-gradient-to-b from-secondary to-transparent rounded-full"></div>
        </div>
        <AdminTokenGenerator />
      </div>

      {/* Alerts & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Alerts */}
        <div className="bg-light-surface-elevated dark:bg-neutral-800 p-8 rounded-2xl shadow-light-soft border border-light-border-subtle dark:border-neutral-700">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-light-text-primary dark:text-neutral-200">System Alerts</h2>
            <div className="w-1 h-8 bg-gradient-to-b from-warning to-transparent rounded-full"></div>
          </div>
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-12 text-light-text-muted dark:text-neutral-400">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FiActivity className="h-8 w-8 text-primary animate-pulse" />
                </div>
                <p className="font-semibold text-lg text-light-text-primary dark:text-neutral-200 mb-2">Loading system stats…</p>
                <p className="text-sm">Fetching latest metrics</p>
              </div>
            ) : stats.lowStockProducts > 0 ? (
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-warning/10 to-warning/5 border border-warning/20 rounded-xl">
                <div className="p-3 bg-warning/20 rounded-xl">
                  <FiAlertCircle className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="font-semibold text-warning-800 dark:text-warning-200">{stats.lowStockProducts} products low on stock</p>
                  <p className="text-sm text-warning-600 dark:text-warning-300">Check inventory levels immediately</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-light-text-muted dark:text-neutral-400">
                <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FiTrendingUp className="h-8 w-8 text-success" />
                </div>
                <p className="font-semibold text-lg text-light-text-primary dark:text-neutral-200 mb-2">All Systems Operational</p>
                <p className="text-sm">No urgent actions needed at this time.</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-light-surface-elevated dark:bg-neutral-800 p-8 rounded-2xl shadow-light-soft border border-light-border-subtle dark:border-neutral-700">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-light-text-primary dark:text-neutral-200">Recent Activity</h2>
            <div className="w-1 h-8 bg-gradient-to-b from-primary to-transparent rounded-full"></div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-light-interactive-selected dark:bg-neutral-700 rounded-xl">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FiPackage className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-light-text-primary dark:text-neutral-200">New product added</p>
                <p className="text-sm text-light-text-muted dark:text-neutral-400">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-light-interactive-selected dark:bg-neutral-700 rounded-xl">
              <div className="p-2 bg-success/10 rounded-lg">
                <FiUsers className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="font-medium text-light-text-primary dark:text-neutral-200">Customer registered</p>
                <p className="text-sm text-light-text-muted dark:text-neutral-400">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-light-interactive-selected dark:bg-neutral-700 rounded-xl">
              <div className="p-2 bg-warning/10 rounded-lg">
                <FiTrendingUp className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="font-medium text-light-text-primary dark:text-neutral-200">Analytics updated</p>
                <p className="text-sm text-light-text-muted dark:text-neutral-400">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


