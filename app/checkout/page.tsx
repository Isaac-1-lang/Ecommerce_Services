"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../../features/cart/store';
import { useCheckoutStore } from '../../features/checkout/store';
import AddressForm from '../../components/AddressForm';
import { ShippingInfo } from '../../features/checkout/store';
import { FiShoppingBag, FiTruck, FiShield, FiCreditCard, FiLock } from 'react-icons/fi';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Complete Your Order
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Secure checkout powered by Stripe
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-x-8">
          {/* Left Column - Shipping Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                  <FiTruck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Shipping Information
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Where should we deliver your order?
                  </p>
                </div>
              </div>
              
              <AddressForm
                data={shippingInfo}
                onChange={handleAddressChange}
                onSubmit={handleShippingSubmit}
              />
            </div>

            {/* Security & Trust Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4">
                  <FiShield className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Secure Checkout
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your information is protected with bank-level security
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <FiLock className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    SSL Encrypted
                  </span>
                </div>
                <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <FiShield className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    PCI Compliant
                  </span>
                </div>
                <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <FiCreditCard className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Stripe Powered
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 sticky top-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-4">
                  <FiShoppingBag className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Order Summary
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                        {item.name}
                      </h4>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="space-y-3 border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-gray-900 dark:text-white">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className="text-gray-900 dark:text-white">
                    {shippingCost === 0 ? (
                      <span className="text-green-600 dark:text-green-400 font-semibold">Free</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax</span>
                  <span className="text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
                </div>
                
                {/* Free Shipping Progress */}
                {total < 50 && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-blue-700 dark:text-blue-300">Free shipping on orders over $50</span>
                      <span className="text-blue-700 dark:text-blue-300">${(50 - total).toFixed(2)} more</span>
                    </div>
                    <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((total / 50) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between text-xl font-bold border-t border-gray-200 dark:border-gray-700 pt-4">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-gray-900 dark:text-white">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Proceed to Payment Button */}
              <button
                onClick={handleShippingSubmit}
                disabled={isProcessing || !shippingInfo.address.trim() || !shippingInfo.city.trim() || !shippingInfo.state.trim() || !shippingInfo.zipCode.trim() || !shippingInfo.phone.trim()}
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <FiCreditCard className="w-5 h-5 mr-2" />
                    Proceed to Payment
                  </div>
                )}
              </button>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  🔒 Secure payment powered by Stripe
                </p>
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
                  <span>Visa</span>
                  <span>•</span>
                  <span>Mastercard</span>
                  <span>•</span>
                  <span>American Express</span>
                  <span>•</span>
                  <span>Discover</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
