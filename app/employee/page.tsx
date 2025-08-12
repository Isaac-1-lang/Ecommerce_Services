import { FiPackage, FiUsers, FiShoppingCart, FiMessageSquare, FiTrendingUp, FiAlertCircle } from 'react-icons/fi';
import Link from 'next/link';

export default function EmployeeDashboard() {
  // Mock data - replace with real data from your backend
  const stats = {
    pendingOrders: 12,
    activeCustomers: 89,
    totalProducts: 30,
    supportTickets: 5,
    returnsPending: 3,
    todayRevenue: 1250.75
  };

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', amount: 299.99, status: 'Processing', priority: 'High' },
    { id: '#ORD-002', customer: 'Jane Smith', amount: 149.99, status: 'Ready to Ship', priority: 'Medium' },
    { id: '#ORD-003', customer: 'Mike Johnson', amount: 89.99, status: 'Shipped', priority: 'Low' },
  ];

  const supportTickets = [
    { id: '#TKT-001', customer: 'Sarah Wilson', issue: 'Order not received', status: 'Open', priority: 'High' },
    { id: '#TKT-002', customer: 'David Brown', issue: 'Product quality concern', status: 'In Progress', priority: 'Medium' },
    { id: '#TKT-003', customer: 'Lisa Davis', issue: 'Return request', status: 'Pending', priority: 'Low' },
  ];

  const quickActions = [
    { title: 'Process Orders', href: '/employee/orders', icon: FiShoppingCart, color: 'bg-primary' },
    { title: 'Customer Support', href: '/employee/support', icon: FiMessageSquare, color: 'bg-secondary' },
    { title: 'Handle Returns', href: '/employee/returns', icon: FiPackage, color: 'bg-warning' },
    { title: 'View Reports', href: '/employee/reports', icon: FiTrendingUp, color: 'bg-success' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">Employee Dashboard</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">Welcome back! Here's what needs your attention today.</p>
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
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Pending Orders</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.pendingOrders}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <FiShoppingCart className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Support Tickets</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.supportTickets}</p>
            </div>
            <div className="p-3 bg-secondary/10 rounded-lg">
              <FiMessageSquare className="h-6 w-6 text-secondary" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Returns Pending</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.returnsPending}</p>
            </div>
            <div className="p-3 bg-warning/10 rounded-lg">
              <FiPackage className="h-6 w-6 text-warning" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Today's Revenue</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">${stats.todayRevenue}</p>
            </div>
            <div className="p-3 bg-success/10 rounded-lg">
              <FiTrendingUp className="h-6 w-6 text-success" />
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

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Recent Orders</h2>
            <Link href="/employee/orders" className="text-sm text-primary hover:text-primary-600 font-medium">
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
                  <div className="flex items-center gap-2">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Processing' ? 'bg-warning/10 text-warning-600' :
                      order.status === 'Ready to Ship' ? 'bg-primary/10 text-primary-600' :
                      'bg-success/10 text-success-600'
                    }`}>
                      {order.status}
                    </span>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      order.priority === 'High' ? 'bg-error/10 text-error-600' :
                      order.priority === 'Medium' ? 'bg-warning/10 text-warning-600' :
                      'bg-success/10 text-success-600'
                    }`}>
                      {order.priority}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Tickets */}
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Support Tickets</h2>
            <Link href="/employee/support" className="text-sm text-primary hover:text-primary-600 font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {supportTickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-3 border border-neutral-100 dark:border-neutral-700 rounded-lg">
                <div>
                  <p className="font-medium text-neutral-800 dark:text-neutral-200">{ticket.id}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{ticket.customer}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">{ticket.issue}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    ticket.status === 'Open' ? 'bg-error/10 text-error-600' :
                    ticket.status === 'In Progress' ? 'bg-warning/10 text-warning-600' :
                    'bg-info/10 text-info-600'
                  }`}>
                    {ticket.status}
                  </span>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                    ticket.priority === 'High' ? 'bg-error/10 text-error-600' :
                    ticket.priority === 'Medium' ? 'bg-warning/10 text-warning-600' :
                    'bg-success/10 text-success-600'
                  }`}>
                    {ticket.priority}
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
