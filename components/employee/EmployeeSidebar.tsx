"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, 
  FiPackage, 
  FiShoppingCart, 
  FiUsers, 
  FiMessageSquare, 
  FiSettings,
  FiTruck,
  FiRefreshCw,
  FiFileText,
  FiHelpCircle
} from 'react-icons/fi';

const navigation = [
  { name: 'Dashboard', href: '/employee', icon: FiHome },
  { name: 'Orders', href: '/employee/orders', icon: FiShoppingCart },
  { name: 'Customers', href: '/employee/customers', icon: FiUsers },
  { name: 'Products', href: '/employee/products', icon: FiPackage },
  { name: 'Support', href: '/employee/support', icon: FiMessageSquare },
  { name: 'Returns', href: '/employee/returns', icon: FiRefreshCw },
  { name: 'Reports', href: '/employee/reports', icon: FiFileText },
  { name: 'Help', href: '/employee/help', icon: FiHelpCircle },
  { name: 'Settings', href: '/employee/settings', icon: FiSettings },
];

export default function EmployeeSidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-700 shadow-soft z-40">
      {/* Logo */}
      <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
        <Link href="/employee" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
            <FiUsers className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Employee Portal</span>
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
                  ? 'bg-secondary text-white shadow-soft'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Quick Stats */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800">
        <div className="text-center">
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Employee Status</p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
