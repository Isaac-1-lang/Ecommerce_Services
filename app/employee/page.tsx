import { FiBell, FiList, FiFileText, FiHelpCircle, FiBookOpen, FiCalendar } from 'react-icons/fi';
import Link from 'next/link';

export default function EmployeeDashboard() {
  // Mock data - replace with real data from your backend
  const announcements = [
    { id: 'AN-001', title: 'Quarterly Town Hall', date: '2025-08-10' },
    { id: 'AN-002', title: 'Office Maintenance Schedule', date: '2025-08-12' },
  ];

  const myTasks = [
    { id: 'TSK-101', title: 'Update onboarding checklist', due: '2025-08-15', status: 'In Progress' },
    { id: 'TSK-102', title: 'Prepare weekly report', due: '2025-08-16', status: 'Pending' },
  ];

  const quickActions = [
    { title: 'Submit Leave Request', href: '/employee/requests?type=leave', icon: FiCalendar, color: 'bg-primary' },
    { title: 'Open Helpdesk Ticket', href: '/employee/requests?type=helpdesk', icon: FiFileText, color: 'bg-secondary-500' },
    { title: 'View Announcements', href: '/employee/announcements', icon: FiBell, color: 'bg-warning-500' },
    { title: 'Browse Catalog', href: '/employee/catalog', icon: FiBookOpen, color: 'bg-success-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">Employee Dashboard</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">Welcome back! Here are your updates and actions.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">Last updated: {new Date().toLocaleString()}</span>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Announcements</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{announcements.length}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <FiBell className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">My Tasks</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{myTasks.length}</p>
            </div>
            <div className="p-3 bg-warning/10 rounded-lg">
              <FiList className="h-6 w-6 text-warning-600" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Pending Requests</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">2</p>
            </div>
            <div className="p-3 bg-success/10 rounded-lg">
              <FiFileText className="h-6 w-6 text-success-600" />
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

      {/* Latest Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Announcements */}
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Recent Announcements</h2>
            <Link href="/employee/announcements" className="text-sm text-primary hover:text-primary-600 font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {announcements.map((a) => (
              <div key={a.id} className="flex items-center justify-between p-3 border border-neutral-100 dark:border-neutral-700 rounded-lg">
                <div>
                  <p className="font-medium text-neutral-800 dark:text-neutral-200">{a.title}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">{a.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Tasks */}
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">My Tasks</h2>
            <Link href="/employee/tasks" className="text-sm text-primary hover:text-primary-600 font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {myTasks.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-3 border border-neutral-100 dark:border-neutral-700 rounded-lg">
                <div>
                  <p className="font-medium text-neutral-800 dark:text-neutral-200">{t.title}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Due {t.due}</p>
                </div>
                <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">{t.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
