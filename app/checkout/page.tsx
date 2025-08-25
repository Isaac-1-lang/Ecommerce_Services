"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../../features/cart/store';
import { useCheckoutStore } from '../../features/checkout/store';
import AddressForm from '../../components/AddressForm';
import { ShippingInfo } from '../../features/checkout/store';

export default function CheckoutPage() {
  const router = useRouter();
  const cartItems = useCartStore((state) => state.items);
  const { shippingInfo, setShippingInfo } = useCheckoutStore();
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    router.push('/cart');
    return null;
  }

  const handleShippingSubmit = async () => {
    setIsProcessing(true);
    
    try {
      // Create Stripe checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems,
          successUrl: `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/cart`,
          customerEmail: shippingInfo.email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      
      // Redirect to Stripe checkout
      window.location.href = url;
    } catch (error) {
      console.error('Checkout error:', error);
      setIsProcessing(false);
      // You could show an error toast here
    }
  };

  const handleAddressChange = (info: ShippingInfo) => {
    setShippingInfo(info);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = total > 50 ? 0 : 5.99; // Free shipping over $50
  const tax = total * 0.08; // 8% tax
  const finalTotal = total + shippingCost + tax;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          {/* Left Column - Shipping Form */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Shipping Information
              </h2>
              
              <AddressForm
                data={shippingInfo}
                onChange={handleAddressChange}
                onSubmit={handleShippingSubmit}
              />
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="text-gray-900 dark:text-white">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="text-gray-900 dark:text-white">
                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tax</span>
                  <span className="text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 dark:border-gray-700 pt-2">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-gray-900 dark:text-white">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Proceed to Payment Button */}
              <button
                onClick={handleShippingSubmit}
                disabled={isProcessing || !shippingInfo.address.trim() || !shippingInfo.city.trim() || !shippingInfo.state.trim() || !shippingInfo.zipCode.trim() || !shippingInfo.phone.trim()}
                className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? 'Processing...' : 'Proceed to Payment'}
              </button>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
                You'll be redirected to Stripe to complete your payment securely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
