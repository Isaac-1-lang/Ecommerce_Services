import { Product } from "../types/product";
import api from "../lib/api";
import { JavaPaginationResponse, formatJavaDate } from "../lib/javaIntegration";

export interface ProductSearchParams {
  q?: string;
  category?: string;
  sort?: string;
  page?: number;
  size?: number;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  tags?: string[];
}

export interface JavaProductResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface JavaProduct {
  productId: string;
  name: string;
  description: string;
  shortDescription?: string;
  brand?: string;
  tags?: string[];
  price: number;
  originalPrice?: number;
  category?: string;
  images?: string[];
  rating?: number;
  reviewCount?: number;
  stockQuantity: number;
  isNew?: boolean;
  isOnSale?: boolean;
  createdAt: string;
  updatedAt: string;
  slug?: string;
}

// Transform Java product to frontend product format
const transformJavaProduct = (javaProduct: JavaProduct): Product => {
  return {
    id: javaProduct.productId,
    slug: javaProduct.slug || `product-${javaProduct.productId}`,
    name: javaProduct.name,
    description: javaProduct.description,
    shortDescription: javaProduct.shortDescription || javaProduct.description.substring(0, 100) + "...",
    brand: javaProduct.brand || "Generic Brand",
    tags: javaProduct.tags || [],
    price: javaProduct.price,
    originalPrice: javaProduct.originalPrice,
    category: javaProduct.category || "Uncategorized",
    image: javaProduct.images?.[0] || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center",
    rating: javaProduct.rating || 0,
    reviewCount: javaProduct.reviewCount || 0,
    stockQuantity: javaProduct.stockQuantity,
    isNew: javaProduct.isNew || false,
    isOnSale: javaProduct.isOnSale || false,
    createdAt: formatJavaDate(javaProduct.createdAt).toISOString(),
    updatedAt: formatJavaDate(javaProduct.updatedAt).toISOString(),
  };
};

export const productService = {
  async list(params?: ProductSearchParams): Promise<Product[]> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params?.q) queryParams.append('search', params.q);
      if (params?.category) queryParams.append('category', params.category);
      if (params?.sort) queryParams.append('sort', params.sort);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.size) queryParams.append('size', params.size.toString());
      if (params?.minPrice) queryParams.append('minPrice', params.minPrice.toString());
      if (params?.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());
      if (params?.brand) queryParams.append('brand', params.brand);
      if (params?.tags) params.tags.forEach(tag => queryParams.append('tags', tag));

      const response = await api.get<JavaProductResponse<JavaProduct[] | JavaPaginationResponse<JavaProduct> | JavaProduct>>(`/v1/products?${queryParams.toString()}`);

      if (response.data.success && response.data.data) {
        if (Array.isArray(response.data.data)) {
          return (response.data.data as JavaProduct[]).map(transformJavaProduct);
        } else if ('content' in response.data.data) {
          // Paginated response
          const paginatedData = response.data.data as JavaPaginationResponse<JavaProduct>;
          return paginatedData.content.map(transformJavaProduct);
        } else {
          // Single product
          return [transformJavaProduct(response.data.data as JavaProduct)];
        }
      }
      
      return [];
    } catch (error: any) {
      console.error('Error fetching products:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch products');
    }
  },

  async getBySlug(slug: string): Promise<Product | null> {
    try {
      const response = await api.get<JavaProductResponse<JavaProduct>>(`/v1/products/slug/${slug}`);

      if (response.data.success && response.data.data) {
        return transformJavaProduct(response.data.data);
      }
      
      return null;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      console.error('Error fetching product by slug:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch product');
    }
  },

  async getById(id: string): Promise<Product | null> {
    try {
      const response = await api.get<JavaProductResponse<JavaProduct>>(`/v1/products/${id}`);

      if (response.data.success && response.data.data) {
        return transformJavaProduct(response.data.data);
      }
      
      return null;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      console.error('Error fetching product by ID:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch product');
    }
  },

  async categories(): Promise<string[]> {
    try {
      const response = await api.get<JavaProductResponse<string[]>>(`/v1/categories`);

      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      
      return [];
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      // Return default categories if API fails
      return ["Shoes", "Bags", "Accessories", "Electronics", "Clothing"];
    }
  },

  async search(query: string): Promise<Product[]> {
    return this.list({ q: query });
  },

  async getFeatured(): Promise<Product[]> {
    try {
      const response = await api.get<JavaProductResponse<JavaProduct[]>>(`/v1/products/featured`);

      if (response.data.success && response.data.data) {
        return response.data.data.map(transformJavaProduct);
      }
      
      return [];
    } catch (error: any) {
      console.error('Error fetching featured products:', error);
      return [];
    }
  },

  async getNewArrivals(): Promise<Product[]> {
    try {
      const response = await api.get<JavaProductResponse<JavaProduct[]>>(`/v1/products/new-arrivals`);

      if (response.data.success && response.data.data) {
        return response.data.data.map(transformJavaProduct);
      }
      
      return [];
    } catch (error: any) {
      console.error('Error fetching new arrivals:', error);
      return [];
    }
  },

  async getOnSale(): Promise<Product[]> {
    try {
      const response = await api.get<JavaProductResponse<JavaProduct[]>>(`/v1/products/on-sale`);

      if (response.data.success && response.data.data) {
        return response.data.data.map(transformJavaProduct);
      }
      
      return [];
    } catch (error: any) {
      console.error('Error fetching on-sale products:', error);
      return [];
    }
  }
};

// Export individual functions for easier imports
export const getProducts = async (params?: ProductSearchParams): Promise<Product[]> => {
  return productService.list(params);
};

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  return productService.getBySlug(slug);
};

export const getProductById = async (id: string): Promise<Product | null> => {
  return productService.getById(id);
};

export const getCategories = async (): Promise<string[]> => {
  return productService.categories();
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  return productService.search(query);
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  return productService.getFeatured();
};

export const getNewArrivals = async (): Promise<Product[]> => {
  return productService.getNewArrivals();
};

export const getOnSaleProducts = async (): Promise<Product[]> => {
  return productService.getOnSale();
};
