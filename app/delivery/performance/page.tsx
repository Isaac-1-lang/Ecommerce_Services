import { FiBarChart, FiTrendingUp, FiTrendingDown, FiClock, FiMapPin, FiPackage, FiStar, FiCheckCircle } from 'react-icons/fi';

export default function DeliveryPerformancePage() {
  // Mock performance data - replace with real data from backend
  const performanceStats = {
    totalDeliveries: 156,
    completedDeliveries: 148,
    onTimeDeliveries: 142,
    averageRating: 4.7,
    totalDistance: '342.5 km',
    totalTime: '28h 45m',
    efficiency: 87,
    customerSatisfaction: 94
  };

  const weeklyStats = [
    { day: 'Mon', deliveries: 12, rating: 4.8, distance: '28.5 km' },
    { day: 'Tue', deliveries: 15, rating: 4.6, distance: '32.1 km' },
    { day: 'Wed', deliveries: 18, rating: 4.9, distance: '35.2 km' },
    { day: 'Thu', deliveries: 14, rating: 4.7, distance: '29.8 km' },
    { day: 'Fri', deliveries: 20, rating: 4.5, distance: '38.4 km' },
    { day: 'Sat', deliveries: 16, rating: 4.8, distance: '31.2 km' },
    { day: 'Sun', deliveries: 8, rating: 4.9, distance: '15.3 km' }
  ];

  const monthlyTrends = [
    { month: 'Jan', deliveries: 145, rating: 4.6, efficiency: 85 },
    { month: 'Feb', deliveries: 152, rating: 4.7, efficiency: 87 },
    { month: 'Mar', deliveries: 148, rating: 4.8, efficiency: 89 },
    { month: 'Apr', deliveries: 156, rating: 4.7, efficiency: 87 },
    { month: 'May', deliveries: 162, rating: 4.9, efficiency: 91 },
    { month: 'Jun', deliveries: 158, rating: 4.8, efficiency: 88 }
  ];

  const topAreas = [
    { area: 'Downtown', deliveries: 45, rating: 4.8, efficiency: 92 },
    { area: 'Midtown', deliveries: 38, rating: 4.7, efficiency: 89 },
    { area: 'Uptown', deliveries: 32, rating: 4.6, efficiency: 85 },
    { area: 'Westside', deliveries: 28, rating: 4.9, efficiency: 94 },
    { area: 'Eastside', deliveries: 25, rating: 4.5, efficiency: 82 }
  ];

  const recentAchievements = [
    { title: 'Perfect Week', description: 'Completed all deliveries on time for 7 consecutive days', date: '2024-01-15' },
    { title: 'High Rating', description: 'Achieved 5.0 rating for 10 consecutive deliveries', date: '2024-01-12' },
    { title: 'Distance Master', description: 'Covered 50+ km in a single day efficiently', date: '2024-01-10' },
    { title: 'Customer Favorite', description: 'Received 5 positive feedbacks in one day', date: '2024-01-08' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">Performance Analytics</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">Track your delivery performance and metrics.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
            Export Report
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors">
            View Details
          </button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Deliveries</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{performanceStats.totalDeliveries}</p>
              <div className="flex items-center gap-1 mt-1">
                <FiTrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm text-success">+8%</span>
              </div>
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
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{performanceStats.averageRating}</p>
              <div className="flex items-center gap-1 mt-1">
                <FiTrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm text-success">+0.2</span>
              </div>
            </div>
            <div className="p-3 bg-warning/10 rounded-lg">
              <FiStar className="h-6 w-6 text-warning" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Efficiency</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{performanceStats.efficiency}%</p>
              <div className="flex items-center gap-1 mt-1">
                <FiTrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm text-success">+3%</span>
              </div>
            </div>
            <div className="p-3 bg-success/10 rounded-lg">
              <FiCheckCircle className="h-6 w-6 text-success" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Satisfaction</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{performanceStats.customerSatisfaction}%</p>
              <div className="flex items-center gap-1 mt-1">
                <FiTrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm text-success">+2%</span>
              </div>
            </div>
            <div className="p-3 bg-info/10 rounded-lg">
              <FiBarChart className="h-6 w-6 text-info" />
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Performance Chart */}
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-6">Weekly Performance</h2>
        
        <div className="grid grid-cols-7 gap-4">
          {weeklyStats.map((day, index) => (
            <div key={index} className="text-center">
              <div className="mb-2">
                <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-32 relative">
                  <div 
                    className="absolute bottom-0 w-full bg-primary rounded-b-full transition-all duration-300"
                    style={{ height: `${(day.deliveries / 20) * 100}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{day.day}</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">{day.deliveries} deliveries</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <FiStar className="h-3 w-3 text-warning" />
                <span className="text-xs text-neutral-600 dark:text-neutral-400">{day.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">Monthly Trends</h2>
          
          <div className="space-y-4">
            {monthlyTrends.map((month, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">{month.month}</span>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-800 dark:text-neutral-200">{month.deliveries} deliveries</p>
                    <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <FiStar className="h-3 w-3 text-warning" />
                      <span>{month.rating}</span>
                      <span>•</span>
                      <span>{month.efficiency}% efficiency</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`flex items-center gap-1 text-sm ${
                    index > 0 && month.deliveries > monthlyTrends[index - 1].deliveries 
                      ? 'text-success' 
                      : 'text-error'
                  }`}>
                    {index > 0 && month.deliveries > monthlyTrends[index - 1].deliveries ? (
                      <FiTrendingUp className="h-3 w-3" />
                    ) : (
                      <FiTrendingDown className="h-3 w-3" />
                    )}
                    <span>{index > 0 ? Math.abs(month.deliveries - monthlyTrends[index - 1].deliveries) : 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Delivery Areas */}
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">Top Delivery Areas</h2>
          
          <div className="space-y-4">
            {topAreas.map((area, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-medium ${
                    index === 0 ? 'bg-warning' :
                    index === 1 ? 'bg-neutral-600' :
                    index === 2 ? 'bg-orange-500' : 'bg-neutral-400'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-neutral-800 dark:text-neutral-200">{area.area}</p>
                    <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <FiPackage className="h-3 w-3" />
                      <span>{area.deliveries} deliveries</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm">
                    <FiStar className="h-3 w-3 text-warning" />
                    <span className="text-neutral-800 dark:text-neutral-200">{area.rating}</span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">{area.efficiency}% efficiency</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">Recent Achievements</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentAchievements.map((achievement, index) => (
            <div key={index} className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <FiCheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-800 dark:text-neutral-200">{achievement.title}</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">{achievement.date}</p>
                </div>
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">Performance Insights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiTrendingUp className="h-8 w-8 text-success" />
            </div>
            <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Improving Efficiency</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Your delivery efficiency has improved by 3% this month. Keep up the great work!
            </p>
          </div>
          
          <div className="text-center p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
            <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiStar className="h-8 w-8 text-warning" />
            </div>
            <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">High Customer Ratings</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              You've maintained excellent customer ratings. Consider this your strength area.
            </p>
          </div>
          
          <div className="text-center p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
            <div className="w-16 h-16 bg-info/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiMapPin className="h-8 w-8 text-info" />
            </div>
            <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Area Optimization</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Downtown area shows highest efficiency. Consider focusing more deliveries there.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
