"use client";

import { useState } from 'react';
import { FiSearch, FiBell, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';
import Link from 'next/link';
import DarkModeToggle from '../admin/DarkModeToggle';

export default function EmployeeHeader() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const notifications = [
    { id: 1, message: 'New company announcement posted', time: '5 min ago', type: 'announcement' },
    { id: 2, message: 'Task assigned: Prepare weekly report', time: '1 hour ago', type: 'task' },
    { id: 3, message: 'Your leave request is being reviewed', time: '2 hours ago', type: 'request' },
  ];

  return (
    <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 shadow-soft h-16 flex items-center justify-between px-6 ml-64">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search announcements, tasks, or catalog..."
            className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 placeholder-neutral-500 dark:placeholder-neutral-400"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <DarkModeToggle />
        
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          >
            <FiBell className="h-5 w-5 text-neutral-600" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-white text-xs rounded-full flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {isNotificationsOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-soft-lg z-50">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
                <h3 className="font-semibold text-neutral-800 dark:text-neutral-200">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-4 border-b border-neutral-100 dark:border-neutral-700 last:border-b-0 hover:bg-neutral-50 dark:hover:bg-neutral-700">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        notification.type === 'announcement' ? 'bg-primary' :
                        notification.type === 'task' ? 'bg-success' :
                        'bg-warning'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{notification.message}</p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-neutral-200 dark:border-neutral-700">
                <Link href="/employee/notifications" className="text-sm text-primary hover:text-primary-600 font-medium">
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
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <FiUser className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Employee</span>
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-soft-lg z-50">
              <div className="p-3 border-b border-neutral-200 dark:border-neutral-700">
                <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">Employee User</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">employee@store.com</p>
              </div>
              <div className="p-2">
                <Link
                  href="/employee/profile"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md transition-colors"
                >
                  <FiUser className="h-4 w-4" />
                  Profile
                </Link>
                <Link
                  href="/employee/settings"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md transition-colors"
                >
                  <FiSettings className="h-4 w-4" />
                  Settings
                </Link>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-error hover:bg-error-50 dark:hover:bg-error-900 rounded-md transition-colors text-left">
                  <FiLogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(isProfileOpen || isNotificationsOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsProfileOpen(false);
            setIsNotificationsOpen(false);
          }}
        />
      )}
    </header>
  );
}
