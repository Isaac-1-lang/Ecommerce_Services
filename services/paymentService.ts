import { createPaymentIntent, createCheckoutSession, confirmPaymentIntent } from '../lib/stripe';

export type PaymentMethod = {
  id: string;
  type: 'card';
  card?: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };
};

export type PaymentIntent = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret: string;
};

export type CheckoutSession = {
  id: string;
  url: string;
  amount: number;
  currency: string;
};

export const paymentService = {
  // Create a payment intent for card payments
  async createPaymentIntent(amount: number, currency: string = 'usd'): Promise<PaymentIntent> {
    try {
      const paymentIntent = await createPaymentIntent(amount, currency);
      return {
        id: paymentIntent.id,
        amount: paymentIntent.amount / 100, // Convert from cents
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        clientSecret: paymentIntent.client_secret!,
      };
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw new Error('Failed to create payment intent');
    }
  },

  // Create a checkout session for redirect-based payments
  async createCheckoutSession(params: {
    amount: number;
    currency?: string;
    successUrl: string;
    cancelUrl: string;
    metadata?: Record<string, string>;
  }): Promise<CheckoutSession> {
    try {
      const session = await createCheckoutSession(params);
      return {
        id: session.id,
        url: session.url!,
        amount: params.amount,
        currency: params.currency || 'usd',
      };
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw new Error('Failed to create checkout session');
    }
  },

  // Confirm a payment intent
  async confirmPayment(paymentIntentId: string): Promise<{ success: boolean; status: string }> {
    try {
      const paymentIntent = await confirmPaymentIntent(paymentIntentId);
      return {
        success: paymentIntent.status === 'succeeded',
        status: paymentIntent.status,
      };
    } catch (error) {
      console.error('Error confirming payment:', error);
      throw new Error('Failed to confirm payment');
    }
  },

  // Mock method for testing (fallback)
  async createMockPaymentIntent(amount: number): Promise<PaymentIntent> {
    return {
      id: `mock_pi_${Date.now()}`,
      amount,
      currency: 'usd',
      status: 'requires_payment_method',
      clientSecret: `mock_secret_${Date.now()}`,
    };
  },
};
