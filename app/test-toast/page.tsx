"use client";

import { FiCheck, FiAlertCircle, FiInfo, FiAlertTriangle, FiShoppingCart, FiHeart } from 'react-icons/fi';

export default function TestToastPage() {
  const showToast = (type: 'success' | 'error' | 'warning' | 'info', title: string, message?: string) => {
    if (typeof window !== 'undefined' && (window as any).showToast) {
      (window as any).showToast(type, title, message, 4000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Enhanced Popup & Toast Test
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Test Different Toast Types
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <button
              onClick={() => showToast('success', 'Success!', 'Operation completed successfully')}
              className="flex items-center gap-3 px-6 py-4 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl hover:shadow-md transition-all duration-200 border border-green-200 dark:border-green-800"
            >
              <FiCheck className="h-5 w-5" />
              <span className="font-medium">Success</span>
            </button>
            
            <button
              onClick={() => showToast('error', 'Error!', 'Something went wrong. Please try again.')}
              className="flex items-center gap-3 px-6 py-4 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl hover:shadow-md transition-all duration-200 border border-red-200 dark:border-red-800"
            >
              <FiAlertCircle className="h-5 w-5" />
              <span className="font-medium">Error</span>
            </button>
            
            <button
              onClick={() => showToast('warning', 'Warning!', 'Please check your input before proceeding.')}
              className="flex items-center gap-3 px-6 py-4 bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:hover:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-xl hover:shadow-md transition-all duration-200 border border-yellow-200 dark:border-yellow-800"
            >
              <FiAlertTriangle className="h-5 w-5" />
              <span className="font-medium">Warning</span>
            </button>
            
            <button
              onClick={() => showToast('info', 'Info', 'Here is some helpful information for you.')}
              className="flex items-center gap-3 px-6 py-4 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl hover:shadow-md transition-all duration-200 border border-blue-200 dark:border-blue-800"
            >
              <FiInfo className="h-5 w-5" />
              <span className="font-medium">Info</span>
            </button>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            E-commerce Specific Examples
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => showToast('success', 'Added to Cart!', 'iPhone 14 Pro has been added to your cart successfully.')}
              className="flex items-center gap-3 px-6 py-4 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl hover:shadow-md transition-all duration-200 border border-green-200 dark:border-green-800"
            >
              <FiShoppingCart className="h-5 w-5" />
              <span className="font-medium">Add to Cart</span>
            </button>
            
            <button
              onClick={() => showToast('info', 'Added to Wishlist', 'Nike Air Max has been added to your wishlist.')}
              className="flex items-center gap-3 px-6 py-4 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl hover:shadow-md transition-all duration-200 border border-blue-200 dark:border-blue-800"
            >
              <FiHeart className="h-5 w-5" />
              <span className="font-medium">Add to Wishlist</span>
            </button>
            
            <button
              onClick={() => showToast('warning', 'Low Stock Alert', 'Only 3 items left in stock. Order soon!')}
              className="flex items-center gap-3 px-6 py-4 bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:hover:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-xl hover:shadow-md transition-all duration-200 border border-yellow-200 dark:border-yellow-800"
            >
              <FiAlertTriangle className="h-5 w-5" />
              <span className="font-medium">Low Stock</span>
            </button>
            
            <button
              onClick={() => showToast('error', 'Payment Failed', 'Your payment could not be processed. Please try again.')}
              className="flex items-center gap-3 px-6 py-4 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl hover:shadow-md transition-all duration-200 border border-red-200 dark:border-red-800"
            >
              <FiAlertCircle className="h-5 w-5" />
              <span className="font-medium">Payment Error</span>
            </button>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Long Message Examples
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => showToast('success', 'Order Confirmed!', 'Your order #12345 has been successfully placed. You will receive a confirmation email shortly. Estimated delivery: 3-5 business days.')}
              className="flex items-center gap-3 px-6 py-4 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl hover:shadow-md transition-all duration-200 border border-green-200 dark:border-green-800"
            >
              <FiCheck className="h-5 w-5" />
              <span className="font-medium">Order Confirmation</span>
            </button>
            
            <button
              onClick={() => showToast('info', 'Discount Applied!', 'Your 20% discount code "SUMMER20" has been successfully applied to your order. You saved $45.60 on this purchase.')}
              className="flex items-center gap-3 px-6 py-4 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl hover:shadow-md transition-all duration-200 border border-blue-200 dark:border-blue-800"
            >
              <FiInfo className="h-5 w-5" />
              <span className="font-medium">Discount Applied</span>
            </button>
          </div>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Popup Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Modern Design</h3>
              <p className="text-gray-600 dark:text-gray-300">Clean, modern styling with rounded corners and subtle shadows</p>
            </div>
            
            <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Dark Mode Support</h3>
              <p className="text-gray-600 dark:text-gray-300">Fully responsive design that works in both light and dark themes</p>
            </div>
            
            <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Smooth Animations</h3>
              <p className="text-gray-600 dark:text-gray-300">Elegant slide-in and fade animations for better UX</p>
            </div>
            
            <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Auto-dismiss</h3>
              <p className="text-gray-600 dark:text-gray-300">Toasts automatically disappear after a set duration</p>
            </div>
            
            <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Manual Close</h3>
              <p className="text-gray-600 dark:text-gray-300">Users can manually close toasts by clicking the X button</p>
            </div>
            
            <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Type-specific Colors</h3>
              <p className="text-gray-600 dark:text-gray-300">Different colors for success, error, warning, and info types</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
