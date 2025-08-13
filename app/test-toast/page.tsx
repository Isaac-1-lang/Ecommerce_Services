"use client";

import { FiCheck, FiAlertCircle, FiInfo } from 'react-icons/fi';

export default function TestToastPage() {
  const showToast = (type: 'success' | 'error' | 'warning' | 'info', title: string, message?: string) => {
    if (typeof window !== 'undefined' && (window as any).showToast) {
      (window as any).showToast(type, title, message, 4000);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-8">
          Toast Notification Test
        </h1>
        
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
            Test Different Toast Types
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <button
              onClick={() => showToast('success', 'Success!', 'Operation completed successfully')}
              className="flex items-center gap-2 px-4 py-3 bg-success/10 text-success-700 dark:text-success-400 rounded-lg hover:bg-success/20 transition-colors"
            >
              <FiCheck className="h-4 w-4" />
              Success
            </button>
            
            <button
              onClick={() => showToast('error', 'Error!', 'Something went wrong')}
              className="flex items-center gap-2 px-4 py-3 bg-error/10 text-error-700 dark:text-error-400 rounded-lg hover:bg-error/20 transition-colors"
            >
              <FiAlertCircle className="h-4 w-4" />
              Error
            </button>
            
            <button
              onClick={() => showToast('warning', 'Warning!', 'Please check your input')}
              className="flex items-center gap-2 px-4 py-3 bg-warning/10 text-warning-700 dark:text-warning-400 rounded-lg hover:bg-warning/20 transition-colors"
            >
              <FiAlertCircle className="h-4 w-4" />
              Warning
            </button>
            
            <button
              onClick={() => showToast('info', 'Info', 'Here is some information')}
              className="flex items-center gap-2 px-4 py-3 bg-primary/10 text-primary-700 dark:text-primary-400 rounded-lg hover:bg-primary/20 transition-colors"
            >
              <FiInfo className="h-4 w-4" />
              Info
            </button>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
              Test Cart Actions
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => showToast('success', 'Added to Cart', 'Product has been added to your cart')}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Add to Cart
              </button>
              
              <button
                onClick={() => showToast('info', 'Removed from Cart', 'Product has been removed from your cart')}
                className="px-4 py-2 bg-neutral-500 text-white rounded-lg hover:bg-neutral-600 transition-colors"
              >
                Remove from Cart
              </button>
              
              <button
                onClick={() => showToast('warning', 'Cart Cleared', 'All items have been removed from your cart')}
                className="px-4 py-2 bg-warning text-white rounded-lg hover:bg-warning/90 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-neutral-100 dark:bg-neutral-700 rounded-lg">
            <h3 className="text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-2">
              Debug Information
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              • Toasts should appear in the top-right corner<br/>
              • Each toast should show an icon, title, and message<br/>
              • Toasts auto-dismiss after 4 seconds<br/>
              • You can manually close toasts by clicking the X button
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
