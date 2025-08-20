import { FiCheckCircle, FiStar, FiCalendar, FiClock, FiMapPin, FiPackage } from 'react-icons/fi';

export default function CompletedDeliveriesPage() {
  // Mock completed deliveries data - replace with real data from backend
  const completedDeliveries = [
    {
      id: '#DEL-001',
      orderId: '#ORD-001',
      customer: 'NIYONKURU',
      address: '123 Main St, Downtown',
      completedAt: '2024-01-15T14:30:00',
      rating: 5,
      items: 3,
      distance: '2.5 km',
      duration: '15 min',
      feedback: 'Great service, very fast delivery!'
    },
    {
      id: '#DEL-002',
      orderId: '#ORD-002',
      customer: 'UWASE',
      address: '456 Oak Ave, Midtown',
      completedAt: '2024-01-15T15:15:00',
      rating: 4,
      items: 2,
      distance: '3.2 km',
      duration: '20 min',
      feedback: 'Good delivery, items in perfect condition.'
    },
    {
      id: '#DEL-003',
      orderId: '#ORD-003',
      customer: 'KABUGA',
      address: '789 Pine Rd, Uptown',
      completedAt: '2024-01-15T15:45:00',
      rating: 5,
      items: 1,
      distance: '1.8 km',
      duration: '12 min',
      feedback: 'Excellent service, highly recommended!'
    },
    {
      id: '#DEL-004',
      orderId: '#ORD-004',
      customer: 'KABUGA',
      address: '321 Elm St, Downtown',
      completedAt: '2024-01-14T13:45:00',
      rating: 5,
      items: 4,
      distance: '4.1 km',
      duration: '25 min',
      feedback: 'Very professional and courteous delivery agent.'
    },
    {
      id: '#DEL-005',
      orderId: '#ORD-005',
      customer: 'KABUGA',
      address: '654 Maple Dr, Midtown',
      completedAt: '2024-01-14T14:20:00',
      rating: 4,
      items: 2,
      distance: '2.9 km',
      duration: '18 min',
      feedback: 'Good delivery experience.'
    },
    {
      id: '#DEL-006',
      orderId: '#ORD-006',
      customer: 'KABUGA',
      address: '987 Cedar Ln, Uptown',
      completedAt: '2024-01-14T15:00:00',
      rating: 5,
      items: 1,
      distance: '2.1 km',
      duration: '14 min',
      feedback: 'Fast and efficient delivery service.'
    },
    {
      id: '#DEL-007',
      orderId: '#ORD-007',
      customer: 'KABUGA',
      address: '147 Birch Ave, Downtown',
      completedAt: '2024-01-13T14:15:00',
      rating: 4,
      items: 3,
      distance: '3.5 km',
      duration: '22 min',
      feedback: 'Good service, will use again.'
    },
    {
      id: '#DEL-008',
      orderId: '#ORD-008',
      customer: 'KABUGA',
      address: '258 Spruce St, Midtown',
      completedAt: '2024-01-13T15:30:00',
      rating: 5,
      items: 2,
      distance: '2.8 km',
      duration: '17 min',
      feedback: 'Excellent delivery experience!'
    }
  ];

  const stats = {
    totalCompleted: 156,
    averageRating: 4.7,
    totalDistance: '342.5 km',
    totalTime: '28h 45m',
    fiveStarDeliveries: 89
  };

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return {
      date: date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
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
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">Completed Deliveries</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">View all your successfully completed deliveries.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Completed</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.totalCompleted}</p>
            </div>
            <div className="p-3 bg-success/10 rounded-lg">
              <FiCheckCircle className="h-6 w-6 text-success" />
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
            <div className="p-3 bg-primary/10 rounded-lg">
              <FiMapPin className="h-6 w-6 text-primary" />
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
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">5-Star Deliveries</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.fiveStarDeliveries}</p>
            </div>
            <div className="p-3 bg-warning/10 rounded-lg">
              <FiStar className="h-6 w-6 text-warning" />
            </div>
          </div>
        </div>
      </div>

      {/* Completed Deliveries Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {completedDeliveries.map((delivery) => {
          const { date, time } = formatDateTime(delivery.completedAt);
          return (
            <div key={delivery.id} className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">{delivery.id}</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{delivery.orderId}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    {renderStars(delivery.rating)}
                  </div>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-success/10 text-success-600">
                    Completed
                  </span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="mb-4">
                <p className="font-medium text-neutral-800 dark:text-neutral-200 mb-1">{delivery.customer}</p>
                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <FiMapPin className="h-3 w-3" />
                  <span className="truncate">{delivery.address}</span>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-sm">
                  <p className="text-neutral-500 dark:text-neutral-400">Completed</p>
                  <p className="font-medium text-neutral-800 dark:text-neutral-200">{date}</p>
                  <p className="text-neutral-600 dark:text-neutral-400">{time}</p>
                </div>
                <div className="text-sm">
                  <p className="text-neutral-500 dark:text-neutral-400">Items</p>
                  <p className="font-medium text-neutral-800 dark:text-neutral-200">{delivery.items} items</p>
                </div>
                <div className="text-sm">
                  <p className="text-neutral-500 dark:text-neutral-400">Distance</p>
                  <p className="font-medium text-neutral-800 dark:text-neutral-200">{delivery.distance}</p>
                </div>
                <div className="text-sm">
                  <p className="text-neutral-500 dark:text-neutral-400">Duration</p>
                  <p className="font-medium text-neutral-800 dark:text-neutral-200">{delivery.duration}</p>
                </div>
              </div>

              {/* Customer Feedback */}
              {delivery.feedback && (
                <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">Customer Feedback</p>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 italic">
                    "{delivery.feedback}"
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center">
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
  );
}
