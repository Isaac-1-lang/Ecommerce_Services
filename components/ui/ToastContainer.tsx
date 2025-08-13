"use client";

import { useState, useCallback } from 'react';
import { Toast, ToastType } from './Toast';

interface ToastContainerProps {
  children: React.ReactNode;
}

export function ToastContainer({ children }: ToastContainerProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Expose addToast function globally
  if (typeof window !== 'undefined') {
    (window as any).showToast = (type: ToastType, title: string, message?: string, duration?: number) => {
      console.log('Toast called with:', { type, title, message, duration });
      addToast({ type, title, message, duration });
    };
  }

  return (
    <>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </>
  );
}

// Utility function to show toasts
export const showToast = (type: ToastType, title: string, message?: string, duration?: number) => {
  if (typeof window !== 'undefined' && (window as any).showToast) {
    (window as any).showToast({ type, title, message, duration });
  }
};
