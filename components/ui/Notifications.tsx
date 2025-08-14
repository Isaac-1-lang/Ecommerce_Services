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
        return <FiCheckCircle className="h-5 w-5 text-success" />;
      case 'error':
        return <FiAlertCircle className="h-5 w-5 text-danger" />;
      case 'warning':
        return <FiAlertTriangle className="h-5 w-5 text-warning" />;
      case 'info':
        return <FiInfo className="h-5 w-5 text-info" />;
      default:
        return <FiInfo className="h-5 w-5 text-info" />;
    }
  };

  const getBackgroundColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-success/10 border-success/20';
      case 'error':
        return 'bg-danger/10 border-danger/20';
      case 'warning':
        return 'bg-warning/10 border-warning/20';
      case 'info':
        return 'bg-info/10 border-info/20';
      default:
        return 'bg-info/10 border-info/20';
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${getBackgroundColor(notification.type)} border rounded-lg p-4 shadow-lg backdrop-blur-sm animate-in slide-in-from-right-2 duration-300`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              {getIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                {notification.title}
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                {notification.message}
              </p>
              {notification.action && (
                <button
                  onClick={notification.action.onClick}
                  className="text-sm text-primary hover:text-primary/80 font-medium mt-2"
                >
                  {notification.action.label}
                </button>
              )}
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="flex-shrink-0 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
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
  const unreadCount = notifications.length;

  return (
    <div className="relative">
      <button className="relative p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">
        <FiAlertCircle className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-danger text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
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
