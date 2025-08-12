import { FiPackage, FiMapPin, FiClock, FiCheckCircle, FiAlertCircle, FiTrendingUp, FiNavigation } from 'react-icons/fi';
import Link from 'next/link';

export default function DeliveryDashboard() {
  // Mock data - replace with real data from your backend
  const stats = {
    activeDeliveries: 4,
    completedToday: 8,
    totalDeliveries: 12,
    onTimeRate: 92,
    currentLocation: 'Downtown Area',
    estimatedETA: '2:30 PM'
  };

  const activeDeliveries = [
    { 
      id: '#DEL-001', 
      customer: 'John Doe', 
      address: '123 Main St, Downtown', 
      status: 'In Transit', 
      eta: '2:30 PM',
      priority: 'High',
      items: 3
    },
    { 
      id: '#DEL-002', 
      customer: 'Jane Smith', 
      address: '456 Oak Ave, Midtown', 
      status: 'Out for Delivery', 
      eta: '3:15 PM',
      priority: 'Medium',
      items: 2
    },
    { 
      id: '#DEL-003', 
      customer: 'Mike Johnson', 
      address: '789 Pine Rd, Uptown', 
      status: 'At Location', 
      eta: '3:45 PM',
      priority: 'Low',
      items: 1
    },
  ];

  const recentCompleted = [
    { id: '#DEL-004', customer: 'Sarah Wilson', time: '1:45 PM', rating: 5 },
    { id: '#DEL-005', customer: 'David Brown', time: '1:20 PM', rating: 4 },
    { id: '#DEL-006', customer: 'Lisa Davis', time: '12:55 PM', rating: 5 },
  ];

  const quickActions = [
    { title: 'Start Route', href: '/delivery/route', icon: FiNavigation, color: 'bg-primary' },
    { title: 'Mark Delivered', href: '/delivery/active', icon: FiCheckCircle, color: 'bg-success' },
    { title: 'Report Issue', href: '/delivery/issues', icon: FiAlertCircle, color: 'bg-error' },
    { title: 'Update Status', href: '/delivery/active', icon: FiClock, color: 'bg-warning' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">Delivery Dashboard</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">Manage your deliveries and track your route efficiently.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Current Location</p>
            <p className="font-medium text-neutral-800 dark:text-neutral-200">{stats.currentLocation}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Next ETA</p>
            <p className="font-medium text-neutral-800 dark:text-neutral-200">{stats.estimatedETA}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Active Deliveries</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.activeDeliveries}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <FiPackage className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Completed Today</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.completedToday}</p>
            </div>
            <div className="p-3 bg-success/10 rounded-lg">
              <FiCheckCircle className="h-6 w-6 text-success" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">On-Time Rate</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.onTimeRate}%</p>
            </div>
            <div className="p-3 bg-warning/10 rounded-lg">
              <FiClock className="h-6 w-6 text-warning" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Today</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.totalDeliveries}</p>
            </div>
            <div className="p-3 bg-info/10 rounded-lg">
              <FiTrendingUp className="h-6 w-6 text-info" />
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
              className="p-4 border border-neutral-200 dark:border-neutral-600 rounded-lg hover:border-warning hover:shadow-soft transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${action.color} group-hover:scale-110 transition-transform`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-warning transition-colors">
                  {action.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Active Deliveries and Recent Completed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Deliveries */}
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Active Deliveries</h2>
            <Link href="/delivery/active" className="text-sm text-primary hover:text-primary-600 font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {activeDeliveries.map((delivery) => (
              <div key={delivery.id} className="p-4 border border-neutral-100 dark:border-neutral-700 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-neutral-800 dark:text-neutral-200">{delivery.id}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{delivery.customer}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      delivery.priority === 'High' ? 'bg-error/10 text-error-600' :
                      delivery.priority === 'Medium' ? 'bg-warning/10 text-warning-600' :
                      'bg-success/10 text-success-600'
                    }`}>
                      {delivery.priority}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                  <FiMapPin className="h-3 w-3" />
                  <span className="truncate">{delivery.address}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">{delivery.items} items</span>
                    <span className="text-neutral-600 dark:text-neutral-400">ETA: {delivery.eta}</span>
                  </div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    delivery.status === 'In Transit' ? 'bg-primary/10 text-primary-600' :
                    delivery.status === 'Out for Delivery' ? 'bg-warning/10 text-warning-600' :
                    'bg-success/10 text-success-600'
                  }`}>
                    {delivery.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Completed */}
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Recent Completed</h2>
            <Link href="/delivery/completed" className="text-sm text-primary hover:text-primary-600 font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentCompleted.map((delivery) => (
              <div key={delivery.id} className="flex items-center justify-between p-3 border border-neutral-100 dark:border-neutral-700 rounded-lg">
                <div>
                  <p className="font-medium text-neutral-800 dark:text-neutral-200">{delivery.id}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{delivery.customer}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Completed at {delivery.time}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          i < delivery.rating ? 'bg-yellow-400' : 'bg-neutral-200 dark:bg-neutral-600'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{delivery.rating}/5</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Route Summary */}
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">Route Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiNavigation className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">Total Distance</h3>
            <p className="text-2xl font-bold text-primary">24.5 km</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiClock className="h-8 w-8 text-warning" />
            </div>
            <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">Estimated Time</h3>
            <p className="text-2xl font-bold text-warning">3h 15m</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiCheckCircle className="h-8 w-8 text-success" />
            </div>
            <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">Efficiency</h3>
            <p className="text-2xl font-bold text-success">87%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
