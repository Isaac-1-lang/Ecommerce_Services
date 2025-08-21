"use client";

import { useState } from 'react';
import { FiCreditCard, FiShield, FiArrowRight, FiLock } from 'react-icons/fi';

interface StripeCheckoutProps {
  items: any[];
  customerEmail?: string;
  onSuccess?: (sessionId: string) => void;
  onError?: (error: string) => void;
  className?: string;
}

export default function StripeCheckout({ 
  items, 
  customerEmail, 
  onSuccess, 
  onError, 
  className = '' 
}: StripeCheckoutProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (!items || items.length === 0) {
      onError?.('No items to checkout');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          customerEmail,
          successUrl: `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/cart`,
        }),
      });

      const contentType = response.headers.get('content-type') || '';
      let payload: any = null;

      if (contentType.includes('application/json')) {
        payload = await response.json().catch(() => null);
      } else {
        const text = await response.text().catch(() => '');
        if (!response.ok) {
          throw new Error(text?.slice(0, 300) || `HTTP ${response.status}`);
        }
        throw new Error('Unexpected non-JSON response from server');
      }

      if (!response.ok) {
        const message = payload?.error || payload?.message || `HTTP ${response.status}: Failed to create checkout session`;
        throw new Error(message);
      }

      const { url } = payload || {};
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      onError?.(error instanceof Error ? error.message : 'Checkout failed');
    } finally {
      setIsLoading(false);
    }
  };

  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Checkout Summary */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 rounded-xl p-6 border border-primary/10 dark:border-primary/20">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              Total Amount
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Secure checkout via Stripe
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">
              ${totalAmount.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 uppercase">
              USD
            </p>
          </div>
        </div>
      </div>

      {/* Security Information */}
      <div className="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
            <FiShield className="h-4 w-4 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-green-800 dark:text-green-200">
              Secure Checkout
            </p>
            <p className="text-xs text-green-600 dark:text-green-300">
              Powered by Stripe's secure payment system
            </p>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        disabled={isLoading || !items.length}
        className="w-full bg-gradient-to-r from-primary to-primary/90 text-white py-4 px-6 rounded-xl font-bold hover:from-primary/90 hover:to-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Redirecting to Stripe...
          </>
        ) : (
          <>
            <FiCreditCard className="h-5 w-5" />
            <span>Proceed to Secure Checkout</span>
            <FiArrowRight className="h-5 w-5" />
          </>
        )}
      </button>

      {/* Additional Security Info */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <FiLock className="h-4 w-4" />
          <span>256-bit SSL encryption • PCI DSS compliant</span>
        </div>
      </div>

      {/* What happens next */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
          What happens next?
        </h4>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>• You'll be redirected to Stripe's secure payment page</li>
          <li>• Enter your payment details and shipping information</li>
          <li>• Complete your purchase securely</li>
          <li>• You'll be redirected back to our site with confirmation</li>
        </ul>
      </div>
    </div>
  );
}
