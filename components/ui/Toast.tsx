"use client";

import { useState, useEffect } from 'react';
import { FiCheck, FiX, FiShoppingCart, FiAlertCircle, FiAlertTriangle, FiInfo } from 'react-icons/fi';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

export function Toast({ toast, onRemove }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onRemove(toast.id), 300);
    }, toast.duration || 4000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <FiCheck className="h-5 w-5 text-green-600" />;
      case 'error':
        return <FiAlertCircle className="h-5 w-5 text-red-600" />;
      case 'warning':
        return <FiAlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'info':
        return <FiInfo className="h-5 w-5 text-blue-600" />;
      default:
        return <FiCheck className="h-5 w-5 text-green-600" />;
    }
  };

  const getBgColor = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800';
      default:
        return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800';
    }
  };

  const getTextColor = () => {
    switch (toast.type) {
      case 'success':
        return 'text-green-800 dark:text-green-200';
      case 'error':
        return 'text-red-800 dark:text-red-200';
      case 'warning':
        return 'text-yellow-800 dark:text-yellow-200';
      case 'info':
        return 'text-blue-800 dark:text-blue-200';
      default:
        return 'text-green-800 dark:text-green-200';
    }
  };

  const getMessageColor = () => {
    switch (toast.type) {
      case 'success':
        return 'text-green-600 dark:text-green-300';
      case 'error':
        return 'text-red-600 dark:text-red-300';
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-300';
      case 'info':
        return 'text-blue-600 dark:text-blue-300';
      default:
        return 'text-green-600 dark:text-green-300';
    }
  };

  return (
    <div
      className={`${getBgColor()} border rounded-xl p-4 shadow-lg backdrop-blur-sm transition-all duration-300 ease-out ${
        isVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'
      }`}
      style={{ minWidth: '320px', maxWidth: '400px' }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-semibold ${getTextColor()}`}>
            {toast.title}
          </h4>
          {toast.message && (
            <p className={`text-sm ${getMessageColor()} mt-1 leading-relaxed`}>
              {toast.message}
            </p>
          )}
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onRemove(toast.id), 300);
          }}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <FiX className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
