"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiCheck, FiArrowRight, FiUser, FiUserPlus } from "react-icons/fi";
import CheckoutSteps from "../../components/CheckoutSteps";
import AddressForm from "../../components/AddressForm";
import PaymentForm from "../../components/PaymentForm";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useCartStore } from "../../features/cart/store";
import { useCheckoutStore } from "../../features/checkout/store";
import { useAuthStore } from "../../features/auth/store";
import { formatPrice } from "../../lib/formatPrice";

const steps = [
  { id: "shipping", name: "Shipping Information" },
  { id: "payment", name: "Payment Details" },
  { id: "review", name: "Order Review" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState("shipping");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showGuestOptions, setShowGuestOptions] = useState(false);
  
  const { items, totalPrice, totalQuantity } = useCartStore();
  const { 
    shippingInfo, 
    paymentInfo, 
    setShippingInfo, 
    setPaymentInfo,
    clearCheckout 
  } = useCheckoutStore();
  
  const { user, loading: authLoading } = useAuthStore();

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  const handleNext = () => {
    if (currentStep === "shipping") {
      setCurrentStep("payment");
    } else if (currentStep === "payment") {
      setCurrentStep("review");
    }
  };

  const handleBack = () => {
    if (currentStep === "payment") {
      setCurrentStep("shipping");
    } else if (currentStep === "review") {
      setCurrentStep("payment");
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and checkout data
      clearCheckout();
      
      // Redirect to success page
      router.push("/checkout/success");
    } catch (error) {
      console.error("Order failed:", error);
      router.push("/checkout/failure");
    } finally {
      setIsProcessing(false);
    }
  };

  const shippingCost = totalPrice >= 50 ? 0 : 5.99;
  const tax = totalPrice * 0.08;
  const total = totalPrice + shippingCost + tax;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumbs 
        items={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout", href: "/checkout" }
        ]} 
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Checkout
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Complete your purchase
        </p>
      </div>

      {/* Guest vs Authenticated User Section */}
      {!user && !showGuestOptions && (
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              How would you like to checkout?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setShowGuestOptions(true)}
                className="p-6 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary dark:hover:border-primary transition-colors text-left"
              >
                <FiUser className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  Continue as Guest
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Checkout without creating an account. You can create an account later to track your orders.
                </p>
              </button>
              <button
                onClick={() => router.push("/auth/login?redirect=/checkout")}
                className="p-6 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary dark:hover:border-primary transition-colors text-left"
              >
                <FiUserPlus className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  Sign In / Create Account
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sign in to your account or create a new one to save your information and track orders.
                </p>
              </button>
            </div>
          </div>
        </div>
      )}

      {(!user && !showGuestOptions) ? null : (
        <>
          <CheckoutSteps steps={steps} currentStep={currentStep} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
                {currentStep === "shipping" && (
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
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
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      Payment Details
                    </h2>
                    <PaymentForm
                      data={paymentInfo}
                      onChange={setPaymentInfo}
                      onSubmit={handleNext}
                    />
                  </div>
                )}

                {currentStep === "review" && (
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      Order Review
                    </h2>
                    
                    {/* User Information */}
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                        {user ? "Account Information" : "Guest Checkout"}
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        {user ? (
                          <div>
                            <p className="text-gray-900 dark:text-white">
                              <strong>Name:</strong> {user.name}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">
                              <strong>Email:</strong> {user.email}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">
                              You&apos;re checking out as a guest. Consider creating an account to track your orders and save your information for future purchases.
                            </p>
                            <button
                              onClick={() => router.push("/auth/register?redirect=/checkout")}
                              className="mt-3 text-primary hover:text-primary/80 font-medium"
                            >
                              Create Account
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Shipping Information Review */}
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                        Shipping Address
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <p className="text-gray-900 dark:text-white">
                          {shippingInfo.firstName} {shippingInfo.lastName}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {shippingInfo.address}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {shippingInfo.phone}
                        </p>
                      </div>
                    </div>

                    {/* Payment Information Review */}
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                        Payment Method
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <p className="text-gray-900 dark:text-white">
                          {paymentInfo.cardType} ending in {paymentInfo.cardNumber.slice(-4)}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          Expires {paymentInfo.expiryMonth}/{paymentInfo.expiryYear}
                        </p>
                      </div>
                    </div>

                    {/* Order Items Review */}
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                        Order Items
                      </h3>
                      <div className="space-y-3">
                        {items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gray-100 rounded-md"></div>
                              <div>
                                <p className="text-gray-900 dark:text-white font-medium">
                                  {item.name}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Qty: {item.quantity}
                                </p>
                              </div>
                            </div>
                            <p className="text-gray-900 dark:text-white font-medium">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={handleBack}
                        className="flex-1 border border-gray-300 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                        className="flex-1 bg-primary text-white py-3 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isProcessing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            Place Order
                            <FiArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                {currentStep !== "review" && (
                  <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between">
                      {currentStep !== "shipping" && (
                        <button
                          onClick={handleBack}
                          className="border border-gray-300 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          Back
                        </button>
                      )}
                      <div className="ml-auto">
                        <button
                          onClick={handleNext}
                          className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
                        >
                          Continue
                          <FiArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6 sticky top-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Subtotal ({totalQuantity} {totalQuantity === 1 ? "item" : "items"})
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="text-gray-900 dark:text-white">
                      {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Tax</span>
                    <span className="text-gray-900 dark:text-white">
                      {formatPrice(tax)}
                    </span>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between text-base font-medium">
                      <span className="text-gray-900 dark:text-white">Total</span>
                      <span className="text-gray-900 dark:text-white">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>

                {shippingCost === 0 && (
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                    <p className="text-sm text-green-700 dark:text-green-300">
                      <FiCheck className="inline h-4 w-4 mr-1" />
                      Free shipping on orders over $50
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
