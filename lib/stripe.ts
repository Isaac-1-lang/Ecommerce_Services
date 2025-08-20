import Stripe from 'stripe';

// Initialize Stripe with your publishable key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_...', {
  apiVersion: '2025-07-30.basil',
});

// Client-side Stripe instance
export const getStripe = () => {
  if (typeof window !== 'undefined') {
    return require('@stripe/stripe-js').loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_...'
    );
  }
  return null;
};

// Create a payment intent
export const createPaymentIntent = async (amount: number, currency: string = 'usd') => {
  try {
    // Get token from localStorage (client-side only)
    let token = '';
    if (typeof window !== 'undefined') {
      token = localStorage.getItem("now_token") || '';
    }

    // Try backend first
    try {
      const response = await fetch("http://localhost:8081/api/v1/payments/create-intent", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ 
          amount, 
          currency,
          // Add required fields for the backend
          orderId: `order_${Date.now()}`, // Generate a temporary order ID
          description: `Payment for order ${Date.now()}`
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: Failed to create payment intent`);
      }

      const result = await response.json();
      
      // Check if the response has the expected structure
      if (result.success && result.data) {
        return result.data;
      } else if (result.client_secret) {
        // Fallback for direct Stripe response
        return result;
      } else {
        throw new Error("Invalid response format from payment service");
      }
    } catch (backendError: any) {
      console.warn("Backend payment service failed, trying direct Stripe integration:", backendError.message);
      
      // Fallback to direct Stripe integration for testing
      if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'sk_test_...') {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
          apiVersion: '2025-07-30.basil',
        });
        
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(amount * 100), // Convert to cents
          currency: currency,
          automatic_payment_methods: {
            enabled: true,
          },
        });
        
        return {
          id: paymentIntent.id,
          clientSecret: paymentIntent.client_secret,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency,
          status: paymentIntent.status,
        };
      } else {
        // If no Stripe key, create a mock payment intent for testing
        console.warn("No Stripe key configured, creating mock payment intent");
        return {
          id: `pi_mock_${Date.now()}`,
          clientSecret: `pi_mock_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
          amount: amount,
          currency: currency,
          status: 'requires_payment_method',
        };
      }
    }
  } catch (error) {
    console.error("Payment intent creation error:", error);
    throw error;
  }
};

// Confirm payment intent
export const confirmPaymentIntent = async (paymentIntentId: string) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    console.error('Error confirming payment intent:', error);
    throw error;
  }
};

// Create a checkout session
export const createCheckoutSession = async (params: {
  amount: number;
  currency?: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: params.currency || 'usd',
            product_data: {
              name: 'Order Payment',
            },
            unit_amount: Math.round(params.amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      metadata: params.metadata,
    });
    return session;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};
