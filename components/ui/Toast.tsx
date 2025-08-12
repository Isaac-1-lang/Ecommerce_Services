"use client";

import { useState, useEffect } from 'react';
import { FiCheck, FiX, FiShoppingCart,FiAlertCircle } from 'react-icons/fi';

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
        return <FiCheck className="h-5 w-5 text-success" />;
      case 'error':
        return <FiAlertCircle className="h-5 w-5 text-error" />;
      case 'warning':
        return <FiAlertCircle className="h-5 w-5 text-warning" />;
      case 'info':
        return <FiShoppingCart className="h-5 w-5 text-primary" />;
      default:
        return <FiCheck className="h-5 w-5 text-success" />;
    }
  };

  const getBgColor = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-success/10 border-success/20';
      case 'error':
        return 'bg-error/10 border-error/20';
      case 'warning':
        return 'bg-warning/10 border-warning/20';
      case 'info':
        return 'bg-primary/10 border-primary/20';
      default:
        return 'bg-success/10 border-success/20';
    }
  };

  return (
    <div
      className={`${getBgColor()} border rounded-lg p-4 shadow-soft-lg transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="flex items-start gap-3">
        {getIcon()}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
            {toast.title}
          </h4>
          {toast.message && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              {toast.message}
            </p>
          )}
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onRemove(toast.id), 300);
          }}
          className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
        >
          <FiX className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
