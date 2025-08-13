"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiCheck, FiArrowRight, FiUser, FiUserPlus, FiCreditCard, FiShield } from "react-icons/fi";
import CheckoutSteps, { CheckoutStep } from "../../components/CheckoutSteps";
import AddressForm from "../../components/AddressForm";
import StripePaymentForm from "../../components/StripePaymentForm";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useCartStore } from "../../features/cart/store";
import { useCheckoutStore } from "../../features/checkout/store";
import { useAuthStore } from "../../features/auth/store";
import { formatPrice } from "../../lib/formatPrice";

export default function CheckoutPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("address");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showGuestOptions, setShowGuestOptions] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  
  const { items, totalPrice, totalQuantity, clearCart } = useCartStore();
  const { 
    shippingInfo, 
    paymentInfo, 
    orderSummary,
    setShippingInfo, 
    setPaymentInfo,
    setOrderSummary,
    clearCheckout,
    calculateTax,
    updateShippingCost
  } = useCheckoutStore();
  
  const { user } = useAuthStore();

  // Calculate order summary when items change
  useEffect(() => {
    const subtotal = totalPrice;
    const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
    calculateTax(subtotal);
    updateShippingCost(shipping);
  }, [totalPrice, calculateTax, updateShippingCost]);

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  const handleNext = () => {
    if (currentStep === "address") {
      setCurrentStep("payment");
    } else if (currentStep === "payment") {
      setCurrentStep("review");
    }
  };

  const handleBack = () => {
    if (currentStep === "payment") {
      setCurrentStep("address");
    } else if (currentStep === "review") {
      setCurrentStep("payment");
    }
  };

  const handlePaymentSuccess = (paymentIntentId: string) => {
    setPaymentInfo({ ...paymentInfo, stripePaymentIntentId: paymentIntentId });
    setPaymentError(null);
    handleNext();
  };

  const handlePaymentError = (error: string) => {
    setPaymentError(error);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and checkout data
      clearCart();
      clearCheckout();
      
      // Redirect to success page
      router.push("/checkout/success");
    } catch (error) {
      console.error("Order placement failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Cart", href: "/cart" },
    { name: "Checkout", href: "/checkout" },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="mt-8">
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
            Checkout
          </h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Complete your purchase securely
          </p>
        </div>

        {/* Guest Checkout Options */}
        {!user && !showGuestOptions && (
          <div className="mt-8 bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
                How would you like to checkout?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push("/auth/login?redirect=/checkout")}
                  className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
                >
                  <FiUser className="h-5 w-5" />
                  Sign In to Checkout
                </button>
                <button
                  onClick={() => setShowGuestOptions(true)}
                  className="flex items-center justify-center gap-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 px-6 py-3 rounded-lg font-medium hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                >
                  <FiUserPlus className="h-5 w-5" />
                  Continue as Guest
                </button>
              </div>
            </div>
          </div>
        )}

        {(!user && !showGuestOptions) ? null : (
          <>
            <CheckoutSteps step={currentStep} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700">
                  {currentStep === "address" && (
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-6">
                        Shipping Information
                      </h2>
                      <AddressForm
                        data={shippingInfo}
                        onChange={setShippingInfo}
                        onSubmit={handleNext}
                      />
                    </div>
                  )}

                  {currentStep === "payment" && (
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-6">
                        Payment Details
                      </h2>
                      <StripePaymentForm
                        amount={orderSummary.total}
                        currency="usd"
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                      />
                      {paymentError && (
                        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                          <p className="text-red-700 dark:text-red-300">{paymentError}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {currentStep === "review" && (
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-6">
                        Order Review
                      </h2>
                      
                      {/* Shipping Information */}
                      <div className="mb-6">
                        <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-3">
                          Shipping Address
                        </h3>
                        <div className="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-4">
                          <p className="text-neutral-800 dark:text-neutral-200">
                            {shippingInfo.firstName} {shippingInfo.lastName}
                          </p>
                          <p className="text-neutral-600 dark:text-neutral-400">
                            {shippingInfo.address}
                          </p>
                          <p className="text-neutral-600 dark:text-neutral-400">
                            {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                          </p>
                          <p className="text-neutral-600 dark:text-neutral-400">
                            {shippingInfo.country}
                          </p>
                          <p className="text-neutral-600 dark:text-neutral-400">
                            {shippingInfo.phone}
                          </p>
                        </div>
                      </div>

                      {/* Payment Information */}
                      <div className="mb-6">
                        <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-3">
                          Payment Method
                        </h3>
                        <div className="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-4">
                          <div className="flex items-center gap-2">
                            <FiCreditCard className="h-5 w-5 text-primary" />
                            <span className="text-neutral-800 dark:text-neutral-200">
                              Stripe Payment
                            </span>
                          </div>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                            Payment ID: {paymentInfo.stripePaymentIntentId}
                          </p>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="mb-6">
                        <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-3">
                          Order Items
                        </h3>
                        <div className="space-y-3">
                          {items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                              <div className="flex items-center gap-3">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-12 object-cover rounded"
                                />
                                <div>
                                  <p className="font-medium text-neutral-800 dark:text-neutral-200">
                                    {item.name}
                                  </p>
                                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Qty: {item.quantity}
                                  </p>
                                </div>
                              </div>
                              <p className="font-medium text-neutral-800 dark:text-neutral-200">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Place Order Button */}
                      <button
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                        className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                      >
                        {isProcessing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Processing Order...
                          </>
                        ) : (
                          <>
                            <FiCheck className="h-5 w-5" />
                            Place Order
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6 sticky top-8">
                  <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
                    Order Summary
                  </h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600 dark:text-neutral-400">Subtotal</span>
                      <span className="text-neutral-800 dark:text-neutral-200">
                        {formatPrice(orderSummary.subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600 dark:text-neutral-400">Shipping</span>
                      <span className="text-neutral-800 dark:text-neutral-200">
                        {orderSummary.shipping === 0 ? "Free" : formatPrice(orderSummary.shipping)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600 dark:text-neutral-400">Tax</span>
                      <span className="text-neutral-800 dark:text-neutral-200">
                        {formatPrice(orderSummary.tax)}
                      </span>
                    </div>
                    <div className="border-t border-neutral-200 dark:border-neutral-700 pt-3">
                      <div className="flex justify-between font-semibold">
                        <span className="text-neutral-800 dark:text-neutral-200">Total</span>
                        <span className="text-primary text-lg">
                          {formatPrice(orderSummary.total)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <FiShield className="h-4 w-4" />
                    <span>Secure checkout powered by Stripe</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
