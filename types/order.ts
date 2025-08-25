export interface OrderItem {
  id: string;
  productId: string;
  product?: {
    productId: string;
    name: string;
    description: string;
    price: number;
    images?: string[];
  };
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface OrderAddress {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  status: 'PENDING' | 'PROCESSING' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED' | 'CONFIRMED' | 'SHIPPED';
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  shippingAddress: OrderAddress;
  billingAddress?: OrderAddress;
  paymentMethod: string;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  notes?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

export interface CreateOrderRequest {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
  paymentMethod: string;
  notes?: string;
}

export interface OrderStatusUpdate {
  status: Order['status'];
}

export interface OrderTrackingUpdate {
  trackingNumber: string;
  carrier: string;
}

export interface OrderCancellationRequest {
  reason: string;
}
