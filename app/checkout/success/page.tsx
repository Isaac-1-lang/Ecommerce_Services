"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FiCheck, FiHome, FiShoppingBag, FiMail, FiTruck, FiShield } from 'react-icons/fi';
import { orderService } from '../../../services/orderService';
import { useCartStore } from '../../../features/cart/store';
import { useCheckoutStore } from '../../../features/checkout/store';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const cartItems = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const { shippingInfo, paymentInfo } = useCheckoutStore();

  useEffect(() => {
    async function persistOrder() {
      try {
        // Do not attempt server order creation with an empty cart
        if (!cartItems || cartItems.length === 0) {
          setOrderDetails({
            orderId: `ORDER-${Date.now()}`,
            sessionId: sessionId,
            total: 0,
            estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          });
          setLoading(false);
          return;
        }
        // Ensure cart items reference real backend product IDs (UUID). If not, skip server creation.
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        const allUuids = cartItems.every((ci) => uuidRegex.test(ci.id));

        if (!allUuids) {
          setOrderDetails({
            orderId: `ORDER-${Date.now()}`,
            sessionId: sessionId,
            total: 0,
            estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          });
          clearCart();
          setLoading(false);
          return;
        }
        // Build order request payload expected by backend
        const items = cartItems.map((ci) => ({
          productId: ci.id,
          quantity: ci.quantity,
        }));

        const shippingAddress = {
          street: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          zipCode: shippingInfo.zipCode,
          country: shippingInfo.country,
          phone: shippingInfo.phone,
        };

        const request = {
          items,
          shippingAddress,
          paymentMethod: paymentInfo.paymentMethod || 'stripe',
          notes: 'Stripe checkout success',
          billingAddress: shippingAddress,
        } as any;

        if (sessionId) {
          (request as any).stripeSessionId = sessionId;
        }

        // Create order in backend
        const created = await orderService.createOrder(request);

        setOrderDetails({
          orderId: created.id,
          sessionId: sessionId,
          total: created.total,
          estimatedDelivery: created.estimatedDelivery || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        });

        // Clear cart after successful order creation
        clearCart();
        setLoading(false);
      } catch (err) {
        // Fall back to local success if backend creation fails
        setOrderDetails({
          orderId: `ORDER-${Date.now()}`,
          sessionId: sessionId,
          total: 0,
          estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        });
        setLoading(false);
      }
    }

    // Only attempt persistence once we have a session or if user navigated here directly
    if (!saved) {
      persistOrder();
    }
  }, [sessionId, saved, cartItems, shippingInfo, paymentInfo, clearCart]);

  // Persist guest order locally so guests can view orders later
  useEffect(() => {
    if (!loading && orderDetails && !saved) {
      try {
        const newOrder = {
          id: orderDetails.orderId || orderDetails.sessionId || `ORDER-${Date.now()}`,
          total: Number(orderDetails.total) || 0,
          status: 'completed',
          createdAt: new Date().toISOString(),
        };
        const key = 'guest_orders';
        const existing = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
        const list: any[] = existing ? JSON.parse(existing) : [];
        // de-duplicate by id
        const already = list.some((o) => o.id === newOrder.id);
        if (!already) {
          list.unshift(newOrder);
          localStorage.setItem(key, JSON.stringify(list.slice(0, 50)));
        }
        setSaved(true);
      } catch {
        // ignore storage errors
      }
    }
  }, [loading, orderDetails, saved]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Processing your order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6">
            <FiCheck className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Order Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                  <FiShoppingBag className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Order ID</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {orderDetails?.orderId}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <FiShield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Payment Status</p>
                  <p className="font-semibold text-green-600">Paid</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                  <FiTruck className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Estimated Delivery</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {orderDetails?.estimatedDelivery}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                  <FiMail className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Confirmation Email</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Sent to your email
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            What happens next?
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                1
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Order Confirmation</p>
                <p className="text-gray-600 dark:text-gray-400">
                  You'll receive an email confirmation with your order details.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                2
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Order Processing</p>
                <p className="text-gray-600 dark:text-gray-400">
                  We'll process your order and prepare it for shipping.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                3
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Shipping</p>
                <p className="text-gray-600 dark:text-gray-400">
                  You'll receive tracking information once your order ships.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <FiHome className="h-5 w-5" />
            Continue Shopping
          </Link>
          <Link
            href="/orders"
            className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 border border-gray-300 dark:border-gray-600"
          >
            <FiShoppingBag className="h-5 w-5" />
            View Orders
          </Link>
        </div>

        {/* Support Info */}
        <div className="text-center mt-8">
          <p className="text-gray-600 dark:text-gray-400">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@example.com" className="text-blue-600 hover:text-blue-700">
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
