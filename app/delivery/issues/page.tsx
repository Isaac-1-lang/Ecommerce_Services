import { FiAlertCircle, FiPlus, FiClock, FiCheckCircle, FiXCircle, FiMapPin, FiPackage } from 'react-icons/fi';

export default function DeliveryIssuesPage() {
  // Mock issues data - replace with real data from backend
  const issues = [
    {
      id: '#ISS-001',
      orderId: '#ORD-015',
      customer: 'John Smith',
      address: '123 Main St, Downtown',
      type: 'Customer Not Available',
      status: 'Resolved',
      priority: 'Medium',
      reportedAt: '2024-01-15T10:30:00',
      resolvedAt: '2024-01-15T11:15:00',
      description: 'Customer was not available at the delivery address. Left delivery notice.',
      resolution: 'Rescheduled delivery for next day. Customer confirmed availability.'
    },
    {
      id: '#ISS-002',
      orderId: '#ORD-016',
      customer: 'Jane Doe',
      address: '456 Oak Ave, Midtown',
      type: 'Address Incorrect',
      status: 'Pending',
      priority: 'High',
      reportedAt: '2024-01-15T14:20:00',
      resolvedAt: null,
      description: 'The provided address does not match any existing location. Customer phone number is not responding.',
      resolution: null
    },
    {
      id: '#ISS-003',
      orderId: '#ORD-017',
      customer: 'Mike Wilson',
      address: '789 Pine Rd, Uptown',
      type: 'Package Damaged',
      status: 'In Progress',
      priority: 'High',
      reportedAt: '2024-01-15T16:45:00',
      resolvedAt: null,
      description: 'Package appears to be damaged during transit. Customer refused delivery.',
      resolution: 'Contacted warehouse for replacement. Awaiting response.'
    },
    {
      id: '#ISS-004',
      orderId: '#ORD-018',
      customer: 'Sarah Johnson',
      address: '321 Elm St, Downtown',
      type: 'Access Restricted',
      status: 'Resolved',
      priority: 'Low',
      reportedAt: '2024-01-14T13:10:00',
      resolvedAt: '2024-01-14T13:45:00',
      description: 'Building requires access code. Customer provided code via phone.',
      resolution: 'Successfully delivered after receiving access code.'
    },
    {
      id: '#ISS-005',
      orderId: '#ORD-019',
      customer: 'David Brown',
      address: '654 Maple Dr, Midtown',
      type: 'Weather Delay',
      status: 'Resolved',
      priority: 'Medium',
      reportedAt: '2024-01-14T15:30:00',
      resolvedAt: '2024-01-14T16:00:00',
      description: 'Heavy rain made delivery difficult. Customer agreed to wait.',
      resolution: 'Delivered successfully once weather improved.'
    }
  ];

  const stats = {
    totalIssues: 24,
    resolved: 18,
    pending: 4,
    inProgress: 2,
    averageResolutionTime: '45 min'
  };

  const issueTypes = [
    'Customer Not Available',
    'Address Incorrect',
    'Package Damaged',
    'Access Restricted',
    'Weather Delay',
    'Vehicle Breakdown',
    'Traffic Delay',
    'Other'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'bg-success/10 text-success-600';
      case 'In Progress':
        return 'bg-warning/10 text-warning-600';
      case 'Pending':
        return 'bg-error/10 text-error-600';
      default:
        return 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400';
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

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return {
      date: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">Delivery Issues</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">Report and track delivery issues and incidents.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors">
            <FiPlus className="h-4 w-4 inline mr-2" />
            Report Issue
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Issues</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.totalIssues}</p>
            </div>
            <div className="p-3 bg-neutral-100 dark:bg-neutral-700 rounded-lg">
              <FiAlertCircle className="h-6 w-6 text-neutral-600 dark:text-neutral-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Resolved</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.resolved}</p>
            </div>
            <div className="p-3 bg-success/10 rounded-lg">
              <FiCheckCircle className="h-6 w-6 text-success" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Pending</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.pending}</p>
            </div>
            <div className="p-3 bg-error/10 rounded-lg">
              <FiXCircle className="h-6 w-6 text-error" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">In Progress</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.inProgress}</p>
            </div>
            <div className="p-3 bg-warning/10 rounded-lg">
              <FiClock className="h-6 w-6 text-warning" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Avg Resolution</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.averageResolutionTime}</p>
            </div>
            <div className="p-3 bg-info/10 rounded-lg">
              <FiClock className="h-6 w-6 text-info" />
            </div>
          </div>
        </div>
      </div>

      {/* Issues List */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Recent Issues</h2>
        </div>
        
        <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
          {issues.map((issue) => {
            const reported = formatDateTime(issue.reportedAt);
            const resolved = issue.resolvedAt ? formatDateTime(issue.resolvedAt) : null;
            
            return (
              <div key={issue.id} className="p-6 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">{issue.id}</h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(issue.status)}`}>
                        {issue.status}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(issue.priority)}`}>
                        {issue.priority}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">{issue.orderId}</p>
                    <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                      <span className="font-medium text-neutral-800 dark:text-neutral-200">{issue.customer}</span>
                      <span className="flex items-center gap-1">
                        <FiMapPin className="h-3 w-3" />
                        {issue.address}
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-sm text-neutral-500 dark:text-neutral-400">
                    <p>Reported: {reported.date} {reported.time}</p>
                    {resolved && (
                      <p>Resolved: {resolved.date} {resolved.time}</p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Issue Type: {issue.type}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{issue.description}</p>
                </div>

                {issue.resolution && (
                  <div className="bg-success/5 border border-success/20 rounded-lg p-4">
                    <p className="text-sm font-medium text-success-700 dark:text-success-300 mb-1">Resolution:</p>
                    <p className="text-sm text-success-600 dark:text-success-400">{issue.resolution}</p>
                  </div>
                )}

                {issue.status === 'Pending' && (
                  <div className="mt-4 flex items-center gap-3">
                    <button className="px-3 py-1 text-sm bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors">
                      Update Status
                    </button>
                    <button className="px-3 py-1 text-sm bg-success text-white rounded-lg hover:bg-success-600 transition-colors">
                      Mark Resolved
                    </button>
                    <button className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
                      Contact Support
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Report Issue Modal Placeholder */}
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">Quick Issue Report</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Issue Type
            </label>
            <select className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200">
              <option value="">Select issue type</option>
              {issueTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Description
            </label>
            <textarea 
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
              rows={3}
              placeholder="Describe the issue in detail..."
            ></textarea>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors">
              Submit Report
            </button>
            <button className="px-4 py-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
