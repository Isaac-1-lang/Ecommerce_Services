import api from "../lib/api";

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'requires_capture' | 'canceled' | 'succeeded';
  clientSecret: string;
  paymentMethod?: string;
  created: number;
}

export interface PaymentMethod {
  id: string;
  type: string;
  card?: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };
  billingDetails?: {
    name: string;
    email: string;
    address: {
      line1: string;
      line2?: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  };
}

export interface CreatePaymentIntentRequest {
  amount: number;
  currency: string;
  orderId: string;
  paymentMethodId?: string;
  description?: string;
  metadata?: Record<string, string>;
}

export interface ConfirmPaymentRequest {
  paymentIntentId: string;
  paymentMethodId?: string;
  returnUrl?: string;
}

export interface JavaPaymentResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface JavaPaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret: string;
  paymentMethod?: string;
  created: number;
}

export const paymentService = {
  async createPaymentIntent(paymentData: CreatePaymentIntentRequest): Promise<PaymentIntent> {
    try {
      const response = await api.post<JavaPaymentResponse<JavaPaymentIntent>>('/v1/payments/create-intent', paymentData);

      if (response.data.success && response.data.data) {
        const javaPaymentIntent = response.data.data;
        return {
          id: javaPaymentIntent.id,
          amount: javaPaymentIntent.amount,
          currency: javaPaymentIntent.currency,
          status: javaPaymentIntent.status as PaymentIntent['status'],
          clientSecret: javaPaymentIntent.clientSecret,
          paymentMethod: javaPaymentIntent.paymentMethod,
          created: javaPaymentIntent.created,
        };
      }
      
      throw new Error(response.data.message || 'Failed to create payment intent');
    } catch (error: any) {
      console.error('Error creating payment intent:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to create payment intent');
    }
  },

  async confirmPayment(paymentData: ConfirmPaymentRequest): Promise<PaymentIntent> {
    try {
      const response = await api.post<JavaPaymentResponse<JavaPaymentIntent>>('/v1/payments/confirm', paymentData);

      if (response.data.success && response.data.data) {
        const javaPaymentIntent = response.data.data;
        return {
          id: javaPaymentIntent.id,
          amount: javaPaymentIntent.amount,
          currency: javaPaymentIntent.currency,
          status: javaPaymentIntent.status as PaymentIntent['status'],
          clientSecret: javaPaymentIntent.clientSecret,
          paymentMethod: javaPaymentIntent.paymentMethod,
          created: javaPaymentIntent.created,
        };
      }
      
      throw new Error(response.data.message || 'Failed to confirm payment');
    } catch (error: any) {
      console.error('Error confirming payment:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to confirm payment');
    }
  },

  async getPaymentIntent(paymentIntentId: string): Promise<PaymentIntent | null> {
    try {
      const response = await api.get<JavaPaymentResponse<JavaPaymentIntent>>(`/v1/payments/intent/${paymentIntentId}`);

      if (response.data.success && response.data.data) {
        const javaPaymentIntent = response.data.data;
        return {
          id: javaPaymentIntent.id,
          amount: javaPaymentIntent.amount,
          currency: javaPaymentIntent.currency,
          status: javaPaymentIntent.status as PaymentIntent['status'],
          clientSecret: javaPaymentIntent.clientSecret,
          paymentMethod: javaPaymentIntent.paymentMethod,
          created: javaPaymentIntent.created,
        };
      }
      
      return null;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      console.error('Error fetching payment intent:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch payment intent');
    }
  },

  async cancelPaymentIntent(paymentIntentId: string): Promise<PaymentIntent> {
    try {
      const response = await api.post<JavaPaymentResponse<JavaPaymentIntent>>(`/v1/payments/intent/${paymentIntentId}/cancel`);

      if (response.data.success && response.data.data) {
        const javaPaymentIntent = response.data.data;
        return {
          id: javaPaymentIntent.id,
          amount: javaPaymentIntent.amount,
          currency: javaPaymentIntent.currency,
          status: javaPaymentIntent.status as PaymentIntent['status'],
          clientSecret: javaPaymentIntent.clientSecret,
          paymentMethod: javaPaymentIntent.paymentMethod,
          created: javaPaymentIntent.created,
        };
      }
      
      throw new Error(response.data.message || 'Failed to cancel payment intent');
    } catch (error: any) {
      console.error('Error canceling payment intent:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to cancel payment intent');
    }
  },

  async getPaymentMethods(): Promise<PaymentMethod[]> {
    try {
      const response = await api.get<JavaPaymentResponse<PaymentMethod[]>>('/v1/payments/methods');

      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      
      return [];
    } catch (error: any) {
      console.error('Error fetching payment methods:', error);
      return [];
    }
  },

  async addPaymentMethod(paymentMethodData: any): Promise<PaymentMethod> {
    try {
      const response = await api.post<JavaPaymentResponse<PaymentMethod>>('/v1/payments/methods', paymentMethodData);

      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to add payment method');
    } catch (error: any) {
      console.error('Error adding payment method:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to add payment method');
    }
  },

  async removePaymentMethod(paymentMethodId: string): Promise<void> {
    try {
      const response = await api.delete<JavaPaymentResponse<void>>(`/v1/payments/methods/${paymentMethodId}`);

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to remove payment method');
      }
    } catch (error: any) {
      console.error('Error removing payment method:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to remove payment method');
    }
  },

  async processRefund(paymentIntentId: string, amount?: number, reason?: string): Promise<{ id: string; amount: number; status: string }> {
    try {
      const response = await api.post<JavaPaymentResponse<{ id: string; amount: number; status: string }>>(`/v1/payments/intent/${paymentIntentId}/refund`, {
        amount,
        reason
      });

      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to process refund');
    } catch (error: any) {
      console.error('Error processing refund:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to process refund');
    }
  }
};
