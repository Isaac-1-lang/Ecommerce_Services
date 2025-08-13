import { Product } from "../types/product";
import api from "../lib/api";

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  itemId: string;
  quantity: number;
}

export interface JavaCartResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface JavaCartItem {
  id: string;
  productId: string;
  product: {
    productId: string;
    name: string;
    description: string;
    price: number;
    images?: string[];
    stockQuantity: number;
  };
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface JavaCart {
  id: string;
  userId: string;
  items: JavaCartItem[];
  totalItems: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

// Transform Java cart item to frontend cart item format
const transformJavaCartItem = (javaCartItem: JavaCartItem): CartItem => {
  return {
    id: javaCartItem.id,
    productId: javaCartItem.productId,
    product: {
      id: javaCartItem.product.productId,
      slug: `product-${javaCartItem.product.productId}`,
      name: javaCartItem.product.name,
      description: javaCartItem.product.description,
      shortDescription: javaCartItem.product.description.substring(0, 100) + "...",
      brand: "Generic Brand",
      tags: [],
      price: javaCartItem.product.price,
      category: "Uncategorized",
      image: javaCartItem.product.images?.[0] || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center",
      rating: 0,
      reviewCount: 0,
      stockQuantity: javaCartItem.product.stockQuantity,
      isNew: false,
      isOnSale: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    quantity: javaCartItem.quantity,
    price: javaCartItem.price,
    totalPrice: javaCartItem.totalPrice,
  };
};

// Transform Java cart to frontend cart format
const transformJavaCart = (javaCart: JavaCart): Cart => {
  return {
    id: javaCart.id,
    userId: javaCart.userId,
    items: javaCart.items.map(transformJavaCartItem),
    totalItems: javaCart.totalItems,
    totalPrice: javaCart.totalPrice,
    createdAt: javaCart.createdAt,
    updatedAt: javaCart.updatedAt,
  };
};

export const cartService = {
  async getCart(): Promise<Cart | null> {
    try {
      const response = await api.get<JavaCartResponse<JavaCart>>('/v1/cart');

      if (response.data.success && response.data.data) {
        return transformJavaCart(response.data.data);
      }
      
      return null;
    } catch (error: any) {
      console.error('Error fetching cart:', error);
      return null;
    }
  },

  async addToCart({ productId, quantity }: AddToCartRequest): Promise<Cart> {
    try {
      const response = await api.post<JavaCartResponse<JavaCart>>('/v1/cart/add', {
        productId,
        quantity
      });

      if (response.data.success && response.data.data) {
        return transformJavaCart(response.data.data);
      }
      
      throw new Error(response.data.message || 'Failed to add item to cart');
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to add item to cart');
    }
  },

  async updateCartItem({ itemId, quantity }: UpdateCartItemRequest): Promise<Cart> {
    try {
      const response = await api.put<JavaCartResponse<JavaCart>>(`/v1/cart/items/${itemId}`, {
        quantity
      });

      if (response.data.success && response.data.data) {
        return transformJavaCart(response.data.data);
      }
      
      throw new Error(response.data.message || 'Failed to update cart item');
    } catch (error: any) {
      console.error('Error updating cart item:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to update cart item');
    }
  },

  async removeFromCart(itemId: string): Promise<Cart> {
    try {
      const response = await api.delete<JavaCartResponse<JavaCart>>(`/v1/cart/items/${itemId}`);

      if (response.data.success && response.data.data) {
        return transformJavaCart(response.data.data);
      }
      
      throw new Error(response.data.message || 'Failed to remove item from cart');
    } catch (error: any) {
      console.error('Error removing from cart:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to remove item from cart');
    }
  },

  async clearCart(): Promise<Cart> {
    try {
      const response = await api.delete<JavaCartResponse<JavaCart>>('/v1/cart/clear');

      if (response.data.success && response.data.data) {
        return transformJavaCart(response.data.data);
      }
      
      throw new Error(response.data.message || 'Failed to clear cart');
    } catch (error: any) {
      console.error('Error clearing cart:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to clear cart');
    }
  },

  async validateItem(product: Product, quantity: number): Promise<boolean> {
    try {
      const response = await api.post<JavaCartResponse<{ valid: boolean }>>('/v1/cart/validate', {
        productId: product.id,
        quantity
      });

      if (response.data.success && response.data.data) {
        return response.data.data.valid;
      }
      
      return false;
    } catch (error: any) {
      console.error('Error validating cart item:', error);
      return false;
    }
  },

  async getCartItemCount(): Promise<number> {
    try {
      const cart = await this.getCart();
      return cart?.totalItems || 0;
    } catch (error: any) {
      console.error('Error getting cart item count:', error);
      return 0;
    }
  }
};
