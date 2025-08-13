"use client";

import Link from "next/link";
import { FiCheckCircle, FiHome, FiPackage, FiMail } from "react-icons/fi";
import Breadcrumbs from "../../../components/Breadcrumbs";

export default function CheckoutSuccessPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Checkout", href: "/checkout" },
    { name: "Success", href: "/checkout/success" },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="mt-8 text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6">
            <FiCheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
            Order Confirmed!
          </h1>
          
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
            Thank you for your purchase. Your order has been successfully placed and is being processed.
          </p>

          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6 mb-8">
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
              What's Next?
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FiMail className="h-5 w-5 text-primary mt-0.5" />
                <div className="text-left">
                  <h3 className="font-medium text-neutral-800 dark:text-neutral-200">
                    Order Confirmation Email
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    You'll receive a confirmation email with your order details and tracking information.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <FiPackage className="h-5 w-5 text-primary mt-0.5" />
                <div className="text-left">
                  <h3 className="font-medium text-neutral-800 dark:text-neutral-200">
                    Order Processing
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Your order is being prepared and will be shipped within 1-2 business days.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <FiCheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <div className="text-left">
                  <h3 className="font-medium text-neutral-800 dark:text-neutral-200">
                    Payment Processed
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Your payment has been securely processed through Stripe.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
            >
              <FiHome className="h-5 w-5" />
              Continue Shopping
            </Link>
            
            <Link
              href="/account/orders"
              className="flex items-center justify-center gap-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 px-6 py-3 rounded-lg font-medium hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
            >
              <FiPackage className="h-5 w-5" />
              View Orders
            </Link>
          </div>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Need help?</strong> If you have any questions about your order, please contact our customer support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
