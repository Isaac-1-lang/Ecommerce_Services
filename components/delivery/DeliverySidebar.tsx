"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, 
  FiPackage, 
  FiMap, 
  FiTruck, 
  FiClock, 
  FiSettings,
  FiNavigation,
  FiCheckCircle,
  FiAlertCircle,
  FiBarChart
} from 'react-icons/fi';

const navigation = [
  { name: 'Dashboard', href: '/delivery', icon: FiHome },
  { name: 'Active Deliveries', href: '/delivery/active', icon: FiTruck },
  { name: 'Route Map', href: '/delivery/route', icon: FiMap },
  { name: 'Delivery History', href: '/delivery/history', icon: FiClock },
  { name: 'Completed', href: '/delivery/completed', icon: FiCheckCircle },
  { name: 'Issues', href: '/delivery/issues', icon: FiAlertCircle },
  { name: 'Navigation', href: '/delivery/navigation', icon: FiNavigation },
  { name: 'Performance', href: '/delivery/performance', icon: FiBarChart },
  { name: 'Settings', href: '/delivery/settings', icon: FiSettings },
];

export default function DeliverySidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-700 shadow-soft z-40">
      {/* Logo */}
      <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
        <Link href="/delivery" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-warning rounded-lg flex items-center justify-center">
            <FiTruck className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Delivery Portal</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-warning text-white shadow-soft'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Delivery Stats */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-500 dark:text-neutral-400">Today's Deliveries</span>
            <span className="font-medium text-neutral-700 dark:text-neutral-300">8/12</span>
          </div>
          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
            <div className="bg-warning h-2 rounded-full" style={{ width: '66%' }}></div>
          </div>
          <div className="text-center">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Status</p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">On Track</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
