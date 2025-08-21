"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FiX, FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = { ...notification, id };
    
    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove notification after duration (default: 5000ms)
    const duration = notification.duration || 5000;
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const value: NotificationContextType = {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

function NotificationContainer() {
  const { notifications, removeNotification } = useNotifications();

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="h-5 w-5 text-green-600" />;
      case 'error':
        return <FiAlertCircle className="h-5 w-5 text-red-600" />;
      case 'warning':
        return <FiAlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'info':
        return <FiInfo className="h-5 w-5 text-blue-600" />;
      default:
        return <FiInfo className="h-5 w-5 text-blue-600" />;
    }
  };

  const getBackgroundColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800';
      default:
        return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800';
    }
  };

  const getTextColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'text-green-800 dark:text-green-200';
      case 'error':
        return 'text-red-800 dark:text-red-200';
      case 'warning':
        return 'text-yellow-800 dark:text-yellow-200';
      case 'info':
        return 'text-blue-800 dark:text-blue-200';
      default:
        return 'text-blue-800 dark:text-blue-200';
    }
  };

  const getMessageColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'text-green-600 dark:text-green-300';
      case 'error':
        return 'text-red-600 dark:text-red-300';
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-300';
      case 'info':
        return 'text-blue-600 dark:text-blue-300';
      default:
        return 'text-blue-600 dark:text-blue-300';
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm pointer-events-none">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${getBackgroundColor(notification.type)} border rounded-xl p-4 shadow-lg backdrop-blur-sm animate-in slide-in-from-right-2 duration-300 pointer-events-auto`}
          style={{ minWidth: '320px', maxWidth: '400px' }}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              {getIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={`text-sm font-semibold ${getTextColor(notification.type)}`}>
                {notification.title}
              </h4>
              <p className={`text-sm ${getMessageColor(notification.type)} mt-1 leading-relaxed`}>
                {notification.message}
              </p>
              {notification.action && (
                <button
                  onClick={notification.action.onClick}
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium mt-2 transition-colors"
                >
                  {notification.action.label}
                </button>
              )}
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <FiX className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Notification Bell Component for Header
export function NotificationBell() {
  const { notifications } = useNotifications();

  return (
    <div className="relative">
      <button className="relative p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10 17h5l-5 5v-5zM5 17h5l-5 5v-5z" />
        </svg>
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>
    </div>
  );
}

// Utility functions for common notifications
export const notificationUtils = {
  success: (title: string, message: string, options?: Partial<Notification>) => {
    const { addNotification } = useNotifications();
    addNotification({ type: 'success', title, message, ...options });
  },
  
  error: (title: string, message: string, options?: Partial<Notification>) => {
    const { addNotification } = useNotifications();
    addNotification({ type: 'error', title, message, ...options });
  },
  
  warning: (title: string, message: string, options?: Partial<Notification>) => {
    const { addNotification } = useNotifications();
    addNotification({ type: 'warning', title, message, ...options });
  },
  
  info: (title: string, message: string, options?: Partial<Notification>) => {
    const { addNotification } = useNotifications();
    addNotification({ type: 'info', title, message, ...options });
  },
};
