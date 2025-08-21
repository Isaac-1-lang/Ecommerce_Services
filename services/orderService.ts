import { Product } from "../types/product";
import api from "../lib/api";

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
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
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  shippingAddress: OrderAddress;
  billingAddress: OrderAddress;
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

export interface JavaOrderResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface JavaOrderItem {
  id: string;
  productId: string;
  product: {
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

export interface JavaOrderAddress {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface JavaOrder {
  id: string;
  userId: string;
  orderNumber: string;
  status: string;
  items: JavaOrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  shippingAddress: JavaOrderAddress;
  billingAddress: JavaOrderAddress;
  paymentMethod: string;
  paymentStatus: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

// Transform Java order item to frontend order item format
const transformJavaOrderItem = (javaOrderItem: JavaOrderItem): OrderItem => {
  return {
    id: javaOrderItem.id,
    productId: javaOrderItem.productId,
    product: {
      id: javaOrderItem.product.productId,
      slug: `product-${javaOrderItem.product.productId}`,
      name: javaOrderItem.product.name,
      description: javaOrderItem.product.description,
      shortDescription: javaOrderItem.product.description.substring(0, 100) + "...",
      brand: "Generic Brand",
      tags: [],
      price: javaOrderItem.product.price,
      category: "Uncategorized",
      image: javaOrderItem.product.images?.[0] || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center",
      rating: 0,
      reviewCount: 0,
      stockQuantity: 0,
      isNew: false,
      isOnSale: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    quantity: javaOrderItem.quantity,
    price: javaOrderItem.price,
    totalPrice: javaOrderItem.totalPrice,
  };
};

// Transform Java order address to frontend order address format
const transformJavaOrderAddress = (javaOrderAddress: JavaOrderAddress): OrderAddress => {
  return {
    id: javaOrderAddress.id,
    street: javaOrderAddress.street,
    city: javaOrderAddress.city,
    state: javaOrderAddress.state,
    zipCode: javaOrderAddress.zipCode,
    country: javaOrderAddress.country,
    phone: javaOrderAddress.phone,
  };
};

// Transform Java order to frontend order format
const transformJavaOrder = (javaOrder: JavaOrder): Order => {
  return {
    id: javaOrder.id,
    userId: javaOrder.userId,
    orderNumber: javaOrder.orderNumber,
    status: javaOrder.status as Order['status'],
    items: javaOrder.items.map(transformJavaOrderItem),
    subtotal: javaOrder.subtotal,
    tax: javaOrder.tax,
    shipping: javaOrder.shipping,
    discount: javaOrder.discount,
    total: javaOrder.total,
    shippingAddress: transformJavaOrderAddress(javaOrder.shippingAddress),
    billingAddress: transformJavaOrderAddress(javaOrder.billingAddress),
    paymentMethod: javaOrder.paymentMethod,
    paymentStatus: javaOrder.paymentStatus as Order['paymentStatus'],
    notes: javaOrder.notes,
    createdAt: javaOrder.createdAt,
    updatedAt: javaOrder.updatedAt,
    estimatedDelivery: javaOrder.estimatedDelivery,
    trackingNumber: javaOrder.trackingNumber,
  };
};

export const orderService = {
  async getOrders(): Promise<Order[]> {
    try {
      const userId = typeof window !== 'undefined' ? (JSON.parse(localStorage.getItem('user') || '{}')?.id) : undefined;
      const response = await api.get<JavaOrderResponse<JavaOrder[]>>('/api/v1/orders', {
        params: userId ? { userId } : undefined,
      });

      if (response.data.success && response.data.data) {
        return response.data.data.map(transformJavaOrder);
      }
      
      return [];
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      return [];
    }
  },

  async getOrderById(orderId: string): Promise<Order | null> {
    try {
      const userId = typeof window !== 'undefined' ? (JSON.parse(localStorage.getItem('user') || '{}')?.id) : undefined;
      const response = await api.get<JavaOrderResponse<JavaOrder>>(`/api/v1/orders/${orderId}` , {
        params: userId ? { userId } : undefined,
      });

      if (response.data.success && response.data.data) {
        return transformJavaOrder(response.data.data);
      }
      
      return null;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      console.error('Error fetching order:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch order');
    }
  },

  async getOrderByNumber(orderNumber: string): Promise<Order | null> {
    try {
      const response = await api.get<JavaOrderResponse<JavaOrder>>(`/api/v1/orders/number/${orderNumber}`);

      if (response.data.success && response.data.data) {
        return transformJavaOrder(response.data.data);
      }
      
      return null;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      console.error('Error fetching order by number:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch order');
    }
  },

  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    try {
      const response = await api.post<JavaOrderResponse<JavaOrder>>('/api/v1/orders', orderData);

      if (response.data.success && response.data.data) {
        return transformJavaOrder(response.data.data);
      }
      
      throw new Error(response.data.message || 'Failed to create order');
    } catch (error: any) {
      console.error('Error creating order:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to create order');
    }
  },

  async cancelOrder(orderId: string): Promise<Order> {
    try {
      const response = await api.put<JavaOrderResponse<JavaOrder>>(`/api/v1/orders/${orderId}/cancel`);

      if (response.data.success && response.data.data) {
        return transformJavaOrder(response.data.data);
      }
      
      throw new Error(response.data.message || 'Failed to cancel order');
    } catch (error: any) {
      console.error('Error cancelling order:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to cancel order');
    }
  },

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<Order> {
    try {
      const response = await api.put<JavaOrderResponse<JavaOrder>>(`/api/v1/orders/${orderId}/status`, {
        status
      });

      if (response.data.success && response.data.data) {
        return transformJavaOrder(response.data.data);
      }
      
      throw new Error(response.data.message || 'Failed to update order status');
    } catch (error: any) {
      console.error('Error updating order status:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to update order status');
    }
  },

  async getOrderTracking(orderId: string): Promise<{ trackingNumber?: string; status: string; estimatedDelivery?: string }> {
    try {
      const response = await api.get<JavaOrderResponse<{ trackingNumber?: string; status: string; estimatedDelivery?: string }>>(`/api/v1/orders/${orderId}/tracking`);

      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to get order tracking');
    } catch (error: any) {
      console.error('Error getting order tracking:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to get order tracking');
    }
  }
};
