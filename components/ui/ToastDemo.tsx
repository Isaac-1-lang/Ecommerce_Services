"use client";

import { FiCheck, FiAlertCircle, FiInfo } from 'react-icons/fi';

export default function ToastDemo() {
  const showToast = (type: 'success' | 'error' | 'warning' | 'info', title: string, message?: string) => {
    if (typeof window !== 'undefined' && (window as any).showToast) {
      (window as any).showToast(type, title, message, 4000);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
      <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
        Toast Notification Demo
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={() => showToast('success', 'Success!', 'Operation completed successfully')}
          className="flex items-center gap-2 px-4 py-2 bg-success/10 text-success-700 dark:text-success-400 rounded-lg hover:bg-success/20 transition-colors"
        >
          <FiCheck className="h-4 w-4" />
          Success
        </button>
        
        <button
          onClick={() => showToast('error', 'Error!', 'Something went wrong')}
          className="flex items-center gap-2 px-4 py-2 bg-error/10 text-error-700 dark:text-error-400 rounded-lg hover:bg-error/20 transition-colors"
        >
          <FiAlertCircle className="h-4 w-4" />
          Error
        </button>
        
        <button
          onClick={() => showToast('warning', 'Warning!', 'Please check your input')}
          className="flex items-center gap-2 px-4 py-2 bg-warning/10 text-warning-700 dark:text-warning-400 rounded-lg hover:bg-warning/20 transition-colors"
        >
          <FiAlertCircle className="h-4 w-4" />
          Warning
        </button>
        
        <button
          onClick={() => showToast('info', 'Info', 'Here is some information')}
          className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary-700 dark:text-primary-400 rounded-lg hover:bg-primary/20 transition-colors"
        >
          <FiInfo className="h-4 w-4" />
          Info
        </button>
      </div>
      
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4">
        Click any button above to see toast notifications in action. These will appear in the top-right corner.
      </p>
    </div>
  );
}
