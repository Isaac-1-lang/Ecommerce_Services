import { FiMapPin, FiNavigation, FiClock, FiPackage, FiTruck, FiCheckCircle } from 'react-icons/fi';

export default function DeliveryRoutePage() {
  // Mock route data - replace with real data from backend
  const routeData = {
    totalStops: 8,
    totalDistance: '24.5 km',
    estimatedTime: '3h 15m',
    currentStop: 3,
    efficiency: 87
  };

  const routeStops = [
    {
      id: 1,
      orderId: '#ORD-001',
      customer: 'John Doe',
      address: '123 Main St, Downtown',
      status: 'completed',
      time: '1:30 PM',
      items: 3,
      priority: 'High'
    },
    {
      id: 2,
      orderId: '#ORD-002',
      customer: 'Jane Smith',
      address: '456 Oak Ave, Midtown',
      status: 'completed',
      time: '2:15 PM',
      items: 2,
      priority: 'Medium'
    },
    {
      id: 3,
      orderId: '#ORD-003',
      customer: 'Mike Johnson',
      address: '789 Pine Rd, Uptown',
      status: 'current',
      time: '2:45 PM',
      items: 1,
      priority: 'Low'
    },
    {
      id: 4,
      orderId: '#ORD-004',
      customer: 'Sarah Wilson',
      address: '321 Elm St, Downtown',
      status: 'pending',
      time: '3:30 PM',
      items: 4,
      priority: 'High'
    },
    {
      id: 5,
      orderId: '#ORD-005',
      customer: 'David Brown',
      address: '654 Maple Dr, Midtown',
      status: 'pending',
      time: '4:00 PM',
      items: 2,
      priority: 'Medium'
    },
    {
      id: 6,
      orderId: '#ORD-006',
      customer: 'Lisa Davis',
      address: '987 Cedar Ln, Uptown',
      status: 'pending',
      time: '4:30 PM',
      items: 1,
      priority: 'Low'
    },
    {
      id: 7,
      orderId: '#ORD-007',
      customer: 'Tom Wilson',
      address: '147 Birch Ave, Downtown',
      status: 'pending',
      time: '5:00 PM',
      items: 3,
      priority: 'High'
    },
    {
      id: 8,
      orderId: '#ORD-008',
      customer: 'Emma Taylor',
      address: '258 Spruce St, Midtown',
      status: 'pending',
      time: '5:30 PM',
      items: 2,
      priority: 'Medium'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <FiCheckCircle className="h-5 w-5 text-success" />;
      case 'current':
        return <FiTruck className="h-5 w-5 text-warning animate-pulse" />;
      case 'pending':
        return <FiClock className="h-5 w-5 text-neutral-400" />;
      default:
        return <FiPackage className="h-5 w-5 text-neutral-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success-600 border-success/20';
      case 'current':
        return 'bg-warning/10 text-warning-600 border-warning/20';
      case 'pending':
        return 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-600';
      default:
        return 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-error/10 text-error-600';
      case 'Medium':
        return 'bg-warning/10 text-warning-600';
      case 'Low':
        return 'bg-success/10 text-success-600';
      default:
        return 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">Route Map</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">View and manage your delivery route for today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors">
            <FiNavigation className="h-4 w-4 inline mr-2" />
            Start Navigation
          </button>
        </div>
      </div>

      {/* Route Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Stops</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{routeData.totalStops}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <FiMapPin className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Distance</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{routeData.totalDistance}</p>
            </div>
            <div className="p-3 bg-warning/10 rounded-lg">
              <FiNavigation className="h-6 w-6 text-warning" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Estimated Time</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{routeData.estimatedTime}</p>
            </div>
            <div className="p-3 bg-success/10 rounded-lg">
              <FiClock className="h-6 w-6 text-success" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Efficiency</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{routeData.efficiency}%</p>
            </div>
            <div className="p-3 bg-info/10 rounded-lg">
              <FiCheckCircle className="h-6 w-6 text-info" />
            </div>
          </div>
        </div>
      </div>

      {/* Route Map Placeholder */}
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Route Map</h2>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-lg">
              Satellite
            </button>
            <button className="px-3 py-1 text-sm bg-primary text-white rounded-lg">
              Traffic
            </button>
          </div>
        </div>
        <div className="h-96 bg-neutral-100 dark:bg-neutral-700 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <FiMap className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-600 dark:text-neutral-400">Interactive map will be displayed here</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-2">Integration with Google Maps or similar service</p>
          </div>
        </div>
      </div>

      {/* Route Stops */}
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Route Stops</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              Progress: {routeData.currentStop}/{routeData.totalStops}
            </span>
            <div className="w-32 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
              <div 
                className="bg-warning h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(routeData.currentStop / routeData.totalStops) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {routeStops.map((stop, index) => (
            <div 
              key={stop.id}
              className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                stop.status === 'current' 
                  ? 'border-warning bg-warning/5' 
                  : 'border-neutral-200 dark:border-neutral-700'
              }`}
            >
              {/* Stop Number */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                stop.status === 'completed' 
                  ? 'bg-success text-white' 
                  : stop.status === 'current'
                  ? 'bg-warning text-white'
                  : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
              }`}>
                {index + 1}
              </div>

              {/* Status Icon */}
              <div className="flex-shrink-0">
                {getStatusIcon(stop.status)}
              </div>

              {/* Stop Details */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">{stop.orderId}</span>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(stop.priority)}`}>
                      {stop.priority}
                    </span>
                  </div>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">{stop.time}</span>
                </div>
                <p className="font-medium text-neutral-800 dark:text-neutral-200 mb-1">{stop.customer}</p>
                <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                  <span className="flex items-center gap-1">
                    <FiMapPin className="h-3 w-3" />
                    {stop.address}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiPackage className="h-3 w-3" />
                    {stop.items} items
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {stop.status === 'current' && (
                  <>
                    <button className="px-3 py-1 text-sm bg-success text-white rounded-lg hover:bg-success-600 transition-colors">
                      Mark Delivered
                    </button>
                    <button className="px-3 py-1 text-sm bg-error text-white rounded-lg hover:bg-error-600 transition-colors">
                      Report Issue
                    </button>
                  </>
                )}
                {stop.status === 'pending' && (
                  <button className="px-3 py-1 text-sm bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors">
                    Start
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
