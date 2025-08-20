import { FiPackage, FiUsers, FiDollarSign, FiTrendingUp, FiAlertCircle } from 'react-icons/fi';
import Link from 'next/link';
import AdminTokenGenerator from '../../components/AdminTokenGenerator';

export default function AdminDashboard() {
  // Mock data - replace with real data from your backend
  const stats = {
    totalProducts: 5,
    totalRevenue: 0,
    totalCustomers: 0,
    lowStockProducts: 0
  };



  const quickActions = [
    { title: 'Add New Product', href: '/admin/products/new', icon: FiPackage, color: 'bg-primary' },
    { title: 'Manage Customers', href: '/admin/customers', icon: FiUsers, color: 'bg-success' },
    { title: 'Analytics', href: '/admin/analytics', icon: FiTrendingUp, color: 'bg-warning' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">Admin Dashboard</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">Welcome back! Here is what is happening with your store.</p>
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

      {/* Employee Management */}
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">Employee Management</h2>
        <AdminTokenGenerator />
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
            {stats.lowStockProducts === 0 && (
              <div className="text-center py-8 text-neutral-500 dark:text-neutral-400">
                <FiTrendingUp className="h-12 w-12 mx-auto mb-3 text-success" />
                <p className="font-medium">All good! No urgent actions needed.</p>
              </div>
            )}
          </div>
        </div>


      </div>
    </div>
  );
}
