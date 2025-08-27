"use client";

import { useState } from 'react';
import { FiSearch, FiBell, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';
import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';

export default function AdminHeader() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const notifications = [
    { id: 1, message: 'New order received', time: '2 min ago', type: 'order' },
    { id: 2, message: 'Product stock low', time: '1 hour ago', type: 'warning' },
    { id: 3, message: 'Customer review posted', time: '3 hours ago', type: 'info' },
  ];

  return (
    <header className="bg-light-surface-elevated dark:bg-neutral-900 border-b border-light-border-subtle dark:border-neutral-700 shadow-light-soft h-20 flex items-center justify-between px-8 ml-64">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-light-text-muted dark:text-neutral-400" />
          <input
            type="text"
            placeholder="Search products, orders, customers..."
            className="w-full pl-12 pr-6 py-3 border border-light-border-subtle dark:border-neutral-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-base bg-light-surface-primary dark:bg-neutral-800 text-light-text-primary dark:text-neutral-200 placeholder-light-text-muted dark:placeholder-neutral-400 shadow-light-sm transition-all duration-200 hover:shadow-light-md focus:shadow-light-lg"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {/* Dark Mode Toggle */}
        <DarkModeToggle />
        
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-3 rounded-xl hover:bg-light-interactive-hover dark:hover:bg-neutral-700 transition-all duration-200 hover:shadow-light-sm"
          >
            <FiBell className="h-6 w-6 text-light-text-secondary dark:text-neutral-400" />
            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-error text-white text-xs rounded-full flex items-center justify-center font-bold shadow-light-md">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {isNotificationsOpen && (
            <div className="absolute right-0 top-full mt-3 w-96 bg-light-surface-elevated dark:bg-neutral-800 border border-light-border-subtle dark:border-neutral-700 rounded-2xl shadow-light-xl z-50">
              <div className="p-6 border-b border-light-border-subtle dark:border-neutral-700">
                <h3 className="text-lg font-semibold text-light-text-primary dark:text-neutral-200">Notifications</h3>
                <p className="text-sm text-light-text-muted dark:text-neutral-400 mt-1">You have {notifications.length} new notifications</p>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-4 border-b border-light-border-tertiary dark:border-neutral-700 last:border-b-0 hover:bg-light-interactive-hover dark:hover:bg-neutral-700 transition-colors duration-200">
                    <div className="flex items-start gap-4">
                      <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${
                        notification.type === 'order' ? 'bg-primary' :
                        notification.type === 'warning' ? 'bg-warning' :
                        'bg-light-text-accent'
                      }`}></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-light-text-primary dark:text-neutral-200">{notification.message}</p>
                        <p className="text-xs text-light-text-muted dark:text-neutral-400 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-light-border-subtle dark:border-neutral-700">
                <Link href="/admin/notifications" className="text-sm text-primary hover:text-primary-600 font-medium transition-colors duration-200">
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-light-interactive-hover dark:hover:bg-neutral-700 transition-all duration-200 hover:shadow-light-sm"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-600 rounded-xl flex items-center justify-center shadow-light-sm">
              <FiUser className="h-5 w-5 text-white" />
            </div>
            <div className="text-left">
              <span className="text-sm font-semibold text-light-text-primary dark:text-neutral-200 block">Admin User</span>
              <span className="text-xs text-light-text-muted dark:text-neutral-400">admin@store.com</span>
            </div>
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-3 w-56 bg-light-surface-elevated dark:bg-neutral-800 border border-light-border-subtle dark:border-neutral-700 rounded-2xl shadow-light-xl z-50">
              <div className="p-4 border-b border-light-border-subtle dark:border-neutral-700">
                <p className="text-sm font-medium text-light-text-primary dark:text-neutral-200">Admin User</p>
                <p className="text-xs text-light-text-muted dark:text-neutral-400">admin@store.com</p>
              </div>
              <div className="p-2">
                <Link
                  href="/admin/profile"
                  className="flex items-center gap-3 w-full px-3 py-2 text-sm text-light-text-secondary dark:text-neutral-300 hover:text-light-text-primary dark:hover:text-neutral-200 hover:bg-light-interactive-hover dark:hover:bg-neutral-700 rounded-lg transition-colors duration-200"
                >
                  <FiUser className="h-4 w-4" />
                  Profile Settings
                </Link>
                <Link
                  href="/admin/settings"
                  className="flex items-center gap-3 w-full px-3 py-2 text-sm text-light-text-secondary dark:text-neutral-300 hover:text-light-text-primary dark:hover:text-neutral-200 hover:bg-light-interactive-hover dark:hover:bg-neutral-700 rounded-lg transition-colors duration-200"
                >
                  <FiSettings className="h-4 w-4" />
                  System Settings
                </Link>
              </div>
              <div className="p-2 border-t border-light-border-subtle dark:border-neutral-700">
                <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-error hover:text-error-600 hover:bg-light-border-error/10 rounded-lg transition-colors duration-200">
                  <FiLogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
