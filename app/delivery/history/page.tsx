import { FiCalendar, FiClock, FiMapPin, FiPackage, FiStar, FiFilter } from 'react-icons/fi';

export default function DeliveryHistoryPage() {
  // Mock history data - replace with real data from backend
  const deliveryHistory = [
    {
      id: '#DEL-001',
      orderId: '#ORD-001',
      customer: 'John Doe',
      address: '123 Main St, Downtown',
      date: '2024-01-15',
      time: '2:30 PM',
      status: 'Delivered',
      rating: 5,
      items: 3,
      distance: '2.5 km',
      duration: '15 min'
    },
    {
      id: '#DEL-002',
      orderId: '#ORD-002',
      customer: 'Jane Smith',
      address: '456 Oak Ave, Midtown',
      date: '2024-01-15',
      time: '3:15 PM',
      status: 'Delivered',
      rating: 4,
      items: 2,
      distance: '3.2 km',
      duration: '20 min'
    },
    {
      id: '#DEL-003',
      orderId: '#ORD-003',
      customer: 'Mike Johnson',
      address: '789 Pine Rd, Uptown',
      date: '2024-01-15',
      time: '3:45 PM',
      status: 'Delivered',
      rating: 5,
      items: 1,
      distance: '1.8 km',
      duration: '12 min'
    },
    {
      id: '#DEL-004',
      orderId: '#ORD-004',
      customer: 'Sarah Wilson',
      address: '321 Elm St, Downtown',
      date: '2024-01-14',
      time: '1:45 PM',
      status: 'Delivered',
      rating: 5,
      items: 4,
      distance: '4.1 km',
      duration: '25 min'
    },
    {
      id: '#DEL-005',
      orderId: '#ORD-005',
      customer: 'David Brown',
      address: '654 Maple Dr, Midtown',
      date: '2024-01-14',
      time: '2:20 PM',
      status: 'Delivered',
      rating: 4,
      items: 2,
      distance: '2.9 km',
      duration: '18 min'
    },
    {
      id: '#DEL-006',
      orderId: '#ORD-006',
      customer: 'Lisa Davis',
      address: '987 Cedar Ln, Uptown',
      date: '2024-01-14',
      time: '3:00 PM',
      status: 'Delivered',
      rating: 5,
      items: 1,
      distance: '2.1 km',
      duration: '14 min'
    },
    {
      id: '#DEL-007',
      orderId: '#ORD-007',
      customer: 'Tom Wilson',
      address: '147 Birch Ave, Downtown',
      date: '2024-01-13',
      time: '2:15 PM',
      status: 'Delivered',
      rating: 4,
      items: 3,
      distance: '3.5 km',
      duration: '22 min'
    },
    {
      id: '#DEL-008',
      orderId: '#ORD-008',
      customer: 'Emma Taylor',
      address: '258 Spruce St, Midtown',
      date: '2024-01-13',
      time: '3:30 PM',
      status: 'Delivered',
      rating: 5,
      items: 2,
      distance: '2.8 km',
      duration: '17 min'
    }
  ];

  const stats = {
    totalDeliveries: 156,
    averageRating: 4.7,
    totalDistance: '342.5 km',
    totalTime: '28h 45m',
    onTimeRate: 94
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`h-3 w-3 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-neutral-300'
            }`}
          />
        ))}
        <span className="text-xs text-neutral-600 dark:text-neutral-400 ml-1">
          {rating}/5
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">Delivery History</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">View your past deliveries and performance metrics.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
            <FiFilter className="h-4 w-4 inline mr-2" />
            Filter
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors">
            Export
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Deliveries</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.totalDeliveries}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <FiPackage className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Average Rating</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.averageRating}</p>
            </div>
            <div className="p-3 bg-warning/10 rounded-lg">
              <FiStar className="h-6 w-6 text-warning" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Distance</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.totalDistance}</p>
            </div>
            <div className="p-3 bg-success/10 rounded-lg">
              <FiMapPin className="h-6 w-6 text-success" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Time</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.totalTime}</p>
            </div>
            <div className="p-3 bg-info/10 rounded-lg">
              <FiClock className="h-6 w-6 text-info" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">On-Time Rate</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.onTimeRate}%</p>
            </div>
            <div className="p-3 bg-success/10 rounded-lg">
              <FiClock className="h-6 w-6 text-success" />
            </div>
          </div>
        </div>
      </div>

      {/* Delivery History Table */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Recent Deliveries</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 dark:bg-neutral-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Delivery ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700">
              {deliveryHistory.map((delivery) => (
                <tr key={delivery.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                        {delivery.id}
                      </div>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        {delivery.orderId}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                      {delivery.customer}
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                      {delivery.items} items
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-800 dark:text-neutral-200 max-w-xs truncate">
                      {delivery.address}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                        {formatDate(delivery.date)}
                      </div>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        {delivery.time}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-success/10 text-success-600">
                      {delivery.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderStars(delivery.rating)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <FiMapPin className="h-3 w-3" />
                        {delivery.distance}
                      </div>
                      <div className="flex items-center gap-1">
                        <FiClock className="h-3 w-3" />
                        {delivery.duration}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              Showing 1 to 8 of {deliveryHistory.length} results
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-primary text-white rounded-lg">1</button>
              <button className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
                2
              </button>
              <button className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
                3
              </button>
              <button className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
