import { Product } from "../types/product";
import api from "../lib/api";

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  addedAt: string;
}

export interface Wishlist {
  id: string;
  userId: string;
  items: WishlistItem[];
  totalItems: number;
  createdAt: string;
  updatedAt: string;
}

export interface AddToWishlistRequest {
  productId: string;
}

export interface JavaWishlistResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface JavaWishlistItem {
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
  addedAt: string;
}

export interface JavaWishlist {
  id: string;
  userId: string;
  items: JavaWishlistItem[];
  totalItems: number;
  createdAt: string;
  updatedAt: string;
}

// Transform Java wishlist item to frontend wishlist item format
const transformJavaWishlistItem = (javaWishlistItem: JavaWishlistItem): WishlistItem => {
  return {
    id: javaWishlistItem.id,
    productId: javaWishlistItem.productId,
    product: {
      id: javaWishlistItem.product.productId,
      slug: `product-${javaWishlistItem.product.productId}`,
      name: javaWishlistItem.product.name,
      description: javaWishlistItem.product.description,
      shortDescription: javaWishlistItem.product.description.substring(0, 100) + "...",
      brand: "Generic Brand",
      tags: [],
      price: javaWishlistItem.product.price,
      category: "Uncategorized",
      image: javaWishlistItem.product.images?.[0] || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center",
      rating: 0,
      reviewCount: 0,
      stockQuantity: javaWishlistItem.product.stockQuantity,
      isNew: false,
      isOnSale: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    addedAt: javaWishlistItem.addedAt,
  };
};

// Transform Java wishlist to frontend wishlist format
const transformJavaWishlist = (javaWishlist: JavaWishlist): Wishlist => {
  return {
    id: javaWishlist.id,
    userId: javaWishlist.userId,
    items: javaWishlist.items.map(transformJavaWishlistItem),
    totalItems: javaWishlist.totalItems,
    createdAt: javaWishlist.createdAt,
    updatedAt: javaWishlist.updatedAt,
  };
};

export const wishlistService = {
  async getWishlist(): Promise<Wishlist | null> {
    try {
      const response = await api.get<JavaWishlistResponse<JavaWishlist>>('/v1/wishlist');

      if (response.data.success && response.data.data) {
        return transformJavaWishlist(response.data.data);
      }
      
      return null;
    } catch (error: any) {
      console.error('Error fetching wishlist:', error);
      return null;
    }
  },

  async addToWishlist({ productId }: AddToWishlistRequest): Promise<Wishlist> {
    try {
      const response = await api.post<JavaWishlistResponse<JavaWishlist>>('/v1/wishlist/add', {
        productId
      });

      if (response.data.success && response.data.data) {
        return transformJavaWishlist(response.data.data);
      }
      
      throw new Error(response.data.message || 'Failed to add item to wishlist');
    } catch (error: any) {
      console.error('Error adding to wishlist:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to add item to wishlist');
    }
  },

  async removeFromWishlist(itemId: string): Promise<Wishlist> {
    try {
      const response = await api.delete<JavaWishlistResponse<JavaWishlist>>(`/v1/wishlist/items/${itemId}`);

      if (response.data.success && response.data.data) {
        return transformJavaWishlist(response.data.data);
      }
      
      throw new Error(response.data.message || 'Failed to remove item from wishlist');
    } catch (error: any) {
      console.error('Error removing from wishlist:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to remove item from wishlist');
    }
  },

  async clearWishlist(): Promise<Wishlist> {
    try {
      const response = await api.delete<JavaWishlistResponse<JavaWishlist>>('/v1/wishlist/clear');

      if (response.data.success && response.data.data) {
        return transformJavaWishlist(response.data.data);
      }
      
      throw new Error(response.data.message || 'Failed to clear wishlist');
    } catch (error: any) {
      console.error('Error clearing wishlist:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to clear wishlist');
    }
  },

  async isInWishlist(productId: string): Promise<boolean> {
    try {
      const wishlist = await this.getWishlist();
      return wishlist?.items.some(item => item.productId === productId) || false;
    } catch (error: any) {
      console.error('Error checking if product is in wishlist:', error);
      return false;
    }
  },

  async getWishlistItemCount(): Promise<number> {
    try {
      const wishlist = await this.getWishlist();
      return wishlist?.totalItems || 0;
    } catch (error: any) {
      console.error('Error getting wishlist item count:', error);
      return 0;
    }
  }
};
