import { FiPackage, FiUsers, FiDollarSign, FiShoppingCart, FiTrendingUp, FiAlertCircle } from 'react-icons/fi';
import Link from 'next/link';

export default function AdminDashboard() {
  // Mock data - replace with real data from your backend
  const stats = {
    totalProducts: 30,
    totalOrders: 156,
    totalRevenue: 45230.50,
    totalCustomers: 89,
    lowStockProducts: 3,
    pendingOrders: 12
  };

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', amount: 299.99, status: 'Processing', date: '2024-01-25' },
    { id: '#ORD-002', customer: 'Jane Smith', amount: 149.99, status: 'Shipped', date: '2024-01-24' },
    { id: '#ORD-003', customer: 'Mike Johnson', amount: 89.99, status: 'Delivered', date: '2024-01-23' },
  ];

  const quickActions = [
    { title: 'Add New Product', href: '/admin/products/new', icon: FiPackage, color: 'bg-primary' },
    { title: 'View Orders', href: '/admin/orders', icon: FiShoppingCart, color: 'bg-secondary' },
    { title: 'Manage Customers', href: '/admin/customers', icon: FiUsers, color: 'bg-success' },
    { title: 'Analytics', href: '/admin/analytics', icon: FiTrendingUp, color: 'bg-warning' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">Admin Dashboard</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">Welcome back! Here's what's happening with your store.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">Last updated: {new Date().toLocaleString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Products</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.totalProducts}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <FiPackage className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Orders</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.totalOrders}</p>
            </div>
            <div className="p-3 bg-secondary/10 rounded-lg">
              <FiShoppingCart className="h-6 w-6 text-secondary" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Revenue</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">${stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-success/10 rounded-lg">
              <FiDollarSign className="h-6 w-6 text-success" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Customers</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.totalCustomers}</p>
            </div>
            <div className="p-3 bg-warning/10 rounded-lg">
              <FiUsers className="h-6 w-6 text-warning" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="p-4 border border-neutral-200 dark:border-neutral-600 rounded-lg hover:border-primary hover:shadow-soft transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${action.color} group-hover:scale-110 transition-transform`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-primary transition-colors">
                  {action.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Alerts & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts */}
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">Alerts</h2>
          <div className="space-y-3">
            {stats.lowStockProducts > 0 && (
              <div className="flex items-center gap-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <FiAlertCircle className="h-5 w-5 text-warning" />
                <div>
                  <p className="font-medium text-warning-800">{stats.lowStockProducts} products low on stock</p>
                  <p className="text-sm text-warning-600">Check inventory levels</p>
                </div>
              </div>
            )}
            {stats.pendingOrders > 0 && (
              <div className="flex items-center gap-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                <FiShoppingCart className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-primary-800">{stats.pendingOrders} orders pending</p>
                  <p className="text-sm text-primary-600">Process customer orders</p>
                </div>
              </div>
            )}
            {stats.lowStockProducts === 0 && stats.pendingOrders === 0 && (
              <div className="text-center py-8 text-neutral-500 dark:text-neutral-400">
                <FiTrendingUp className="h-12 w-12 mx-auto mb-3 text-success" />
                <p className="font-medium">All good! No urgent actions needed.</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm text-primary hover:text-primary-600 font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 border border-neutral-100 dark:border-neutral-700 rounded-lg">
                <div>
                  <p className="font-medium text-neutral-800 dark:text-neutral-200">{order.id}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-neutral-800 dark:text-neutral-200">${order.amount}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Processing' ? 'bg-warning/10 text-warning-600' :
                    order.status === 'Shipped' ? 'bg-primary/10 text-primary-600' :
                    'bg-success/10 text-success-600'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
