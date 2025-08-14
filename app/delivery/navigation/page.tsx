import { FiNavigation, FiMapPin, FiClock, FiPackage, FiTruck, FiSettings, FiPlay, FiPause, FiRotateCcw } from 'react-icons/fi';

export default function DeliveryNavigationPage() {
  // Mock navigation data - replace with real data from backend
  const currentDelivery = {
    id: '#DEL-003',
    orderId: '#ORD-003',
    customer: 'Mike Johnson',
    address: '789 Pine Rd, Uptown',
    eta: '2:45 PM',
    distance: '1.8 km',
    items: 1,
    priority: 'Low'
  };

  const nextDeliveries = [
    {
      id: '#DEL-004',
      customer: 'Sarah Wilson',
      address: '321 Elm St, Downtown',
      eta: '3:30 PM',
      distance: '2.3 km'
    },
    {
      id: '#DEL-005',
      customer: 'David Brown',
      address: '654 Maple Dr, Midtown',
      eta: '4:00 PM',
      distance: '1.5 km'
    },
    {
      id: '#DEL-006',
      customer: 'Lisa Davis',
      address: '987 Cedar Ln, Uptown',
      eta: '4:30 PM',
      distance: '2.1 km'
    }
  ];

  const navigationStats = {
    currentSpeed: '35 km/h',
    averageSpeed: '28 km/h',
    totalDistance: '24.5 km',
    timeRemaining: '2h 15m',
    fuelLevel: '75%',
    trafficCondition: 'Moderate'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">Navigation</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">GPS navigation and route guidance for deliveries.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
            <FiSettings className="h-4 w-4 inline mr-2" />
            Settings
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors">
            <FiPlay className="h-4 w-4 inline mr-2" />
            Start Navigation
          </button>
        </div>
      </div>

      {/* Navigation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Current Speed</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{navigationStats.currentSpeed}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <FiTruck className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Avg Speed</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{navigationStats.averageSpeed}</p>
            </div>
            <div className="p-3 bg-warning/10 rounded-lg">
              <FiClock className="h-6 w-6 text-warning" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Distance</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{navigationStats.totalDistance}</p>
            </div>
            <div className="p-3 bg-success/10 rounded-lg">
              <FiMapPin className="h-6 w-6 text-success" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Time Remaining</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{navigationStats.timeRemaining}</p>
            </div>
            <div className="p-3 bg-info/10 rounded-lg">
              <FiClock className="h-6 w-6 text-info" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Fuel Level</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{navigationStats.fuelLevel}</p>
            </div>
            <div className="p-3 bg-warning/10 rounded-lg">
              <div className="w-6 h-6 bg-warning rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Traffic</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{navigationStats.trafficCondition}</p>
            </div>
            <div className="p-3 bg-warning/10 rounded-lg">
              <FiNavigation className="h-6 w-6 text-warning" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Map */}
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Live Navigation</h2>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
              <FiPause className="h-4 w-4" />
            </button>
            <button className="p-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
              <FiRotateCcw className="h-4 w-4" />
            </button>
            <button className="p-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors">
              <FiPlay className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="h-96 bg-neutral-100 dark:bg-neutral-700 rounded-lg flex items-center justify-center relative">
          <div className="text-center">
            <FiNavigation className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-600 dark:text-neutral-400">Interactive GPS navigation will be displayed here</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-2">Integration with Google Maps or similar navigation service</p>
          </div>
          
          {/* Navigation Controls Overlay */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <button className="p-3 bg-white dark:bg-neutral-800 rounded-lg shadow-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
              <FiMapPin className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
            </button>
            <button className="p-3 bg-white dark:bg-neutral-800 rounded-lg shadow-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
              <FiPackage className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
            </button>
            <button className="p-3 bg-white dark:bg-neutral-800 rounded-lg shadow-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
              <FiTruck className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Current Delivery Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Current Delivery</h2>
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-warning/10 text-warning-600">
              In Progress
            </span>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-neutral-800 dark:text-neutral-200 mb-1">{currentDelivery.customer}</h3>
              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <FiMapPin className="h-3 w-3" />
                <span>{currentDelivery.address}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Order ID</p>
                <p className="font-medium text-neutral-800 dark:text-neutral-200">{currentDelivery.orderId}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Items</p>
                <p className="font-medium text-neutral-800 dark:text-neutral-200">{currentDelivery.items} items</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">ETA</p>
                <p className="font-medium text-neutral-800 dark:text-neutral-200">{currentDelivery.eta}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Distance</p>
                <p className="font-medium text-neutral-800 dark:text-neutral-200">{currentDelivery.distance}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <button className="flex-1 px-4 py-2 bg-success text-white rounded-lg hover:bg-success-600 transition-colors">
                Mark Delivered
              </button>
              <button className="flex-1 px-4 py-2 bg-error text-white rounded-lg hover:bg-error-600 transition-colors">
                Report Issue
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">Next Deliveries</h2>
          
          <div className="space-y-4">
            {nextDeliveries.map((delivery, index) => (
              <div key={delivery.id} className="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-neutral-800 dark:text-neutral-200">{delivery.customer}</p>
                    <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <FiMapPin className="h-3 w-3" />
                      <span className="truncate max-w-xs">{delivery.address}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{delivery.eta}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">{delivery.distance}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors">
              View Full Route
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Settings */}
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">Navigation Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Route Type
            </label>
            <select className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200">
              <option value="fastest">Fastest Route</option>
              <option value="shortest">Shortest Route</option>
              <option value="avoid-tolls">Avoid Tolls</option>
              <option value="avoid-highways">Avoid Highways</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Voice Guidance
            </label>
            <select className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200">
              <option value="enabled">Enabled</option>
              <option value="disabled">Disabled</option>
              <option value="alerts-only">Alerts Only</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Traffic Updates
            </label>
            <select className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200">
              <option value="real-time">Real-time</option>
              <option value="every-5min">Every 5 minutes</option>
              <option value="every-15min">Every 15 minutes</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
