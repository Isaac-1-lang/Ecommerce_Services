"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, 
  FiPackage, 
  FiUsers, 
  FiBarChart, 
  FiSettings,
  FiGrid,
  FiTag,
  FiTruck,
  FiFileText,
  FiMapPin,
  FiPercent
} from 'react-icons/fi';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: FiHome },
  { name: 'Products', href: '/admin/products', icon: FiPackage },
  { name: 'Categories', href: '/admin/categories', icon: FiGrid },
  { name: 'Discounts', href: '/admin/discounts', icon: FiPercent },
  { name: 'Customers', href: '/admin/customers', icon: FiUsers },
  { name: 'Warehouses', href: '/admin/warehouses', icon: FiMapPin },
  { name: 'Inventory', href: '/admin/inventory', icon: FiTruck },
  { name: 'Analytics', href: '/admin/analytics', icon: FiBarChart },
  { name: 'Reports', href: '/admin/reports', icon: FiFileText },
  { name: 'Settings', href: '/admin/settings', icon: FiSettings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-light-surface-sidebar dark:bg-neutral-900 border-r border-light-border-subtle dark:border-neutral-700 shadow-light-soft z-40">
      {/* Logo */}
      <div className="p-8 border-b border-light-border-subtle dark:border-neutral-700">
        <Link href="/admin" className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-600 rounded-2xl flex items-center justify-center shadow-light-md">
            <FiPackage className="h-6 w-6 text-white" />
          </div>
          <div>
            <span className="text-2xl font-bold text-light-text-primary dark:text-neutral-200 block">Admin Panel</span>
            <span className="text-xs text-light-text-muted dark:text-neutral-400">Management Console</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-6 space-y-3">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-primary to-primary-600 text-white shadow-light-lg transform scale-105'
                  : 'text-light-text-secondary dark:text-neutral-400 hover:bg-light-interactive-hover dark:hover:bg-neutral-800 hover:text-light-text-primary dark:hover:text-neutral-200 hover:shadow-light-sm'
              }`}
            >
              <div className={`p-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-white/20' 
                  : 'group-hover:bg-light-interactive-selected dark:group-hover:bg-neutral-700'
              }`}>
                <item.icon className={`h-5 w-5 ${
                  isActive ? 'text-white' : 'text-light-text-tertiary dark:text-neutral-500'
                }`} />
              </div>
              <span className="font-medium text-base">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Quick Stats */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-light-border-subtle dark:border-neutral-700 bg-light-surface-secondary dark:bg-neutral-800">
        <div className="text-center">
          <p className="text-xs text-light-text-muted dark:text-neutral-400 mb-2 font-medium">Store Status</p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-3 h-3 bg-success rounded-full shadow-light-sm"></div>
            <span className="text-sm font-semibold text-light-text-primary dark:text-neutral-300">Online</span>
          </div>
          <div className="mt-2 text-xs text-light-text-muted dark:text-neutral-400">
            Last updated: Just now
          </div>
        </div>
      </div>
    </div>
  );
}
