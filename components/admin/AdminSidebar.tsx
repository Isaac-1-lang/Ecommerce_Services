"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, 
  FiPackage, 
  FiShoppingCart, 
  FiUsers, 
  FiBarChart, 
  FiSettings,
  FiGrid,
  FiTag,
  FiTruck,
  FiFileText,
  FiMapPin
} from 'react-icons/fi';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: FiHome },
  { name: 'Products', href: '/admin/products', icon: FiPackage },
  { name: 'Categories', href: '/admin/categories', icon: FiGrid },
  { name: 'Orders', href: '/admin/orders', icon: FiShoppingCart },
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
    <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-700 shadow-soft z-40">
      {/* Logo */}
      <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <FiPackage className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Admin Panel</span>
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
                  ? 'bg-primary text-white shadow-soft'
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
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Store Status</p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Online</span>
          </div>
        </div>
      </div>
    </div>
  );
}
