import { Product } from "../types/product";
import api from "../lib/api";
import { JavaPaginationResponse, formatJavaDate } from "../lib/javaIntegration";
import { ManyProductsDto } from "../types/product"; // Added import for ManyProductsDto

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

export interface CreateProductData {
  name: string;
  description: string;
  sku: string;
  basePrice: number;
  salePrice?: number;
  stockQuantity: number;
  categoryId: number;
  brandId?: string;
  slug?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isOnSale?: boolean;
  productImages?: File[];
  imageMetadata?: Array<{
    altText?: string;
    isPrimary?: boolean;
    sortOrder?: number;
  }>;
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

// Transform ManyProductsDto to Product format
const transformManyProductsDtoToProduct = (dto: ManyProductsDto): Product => {
  return {
    id: dto.productId,
    slug: `product-${dto.productId}`,
    name: dto.productName,
    description: dto.shortDescription || '',
    shortDescription: dto.shortDescription || '',
    brand: dto.brand?.brandName || 'Generic Brand',
    tags: [],
    price: dto.price,
    originalPrice: dto.compareAtPrice || dto.price,
    category: dto.category?.name || 'Uncategorized',
    image: dto.primaryImage?.imageUrl || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center',
    images: dto.primaryImage ? [dto.primaryImage.imageUrl] : [],
    rating: 0,
    reviewCount: 0,
    stockQuantity: dto.stockQuantity,
    isNew: false,
    isOnSale: dto.compareAtPrice ? dto.compareAtPrice > dto.price : false,
    isFeatured: dto.isFeatured || false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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

      // The backend returns Page<ManyProductsDto> directly, not wrapped in a success response
      const response = await api.get<JavaPaginationResponse<ManyProductsDto> | ManyProductsDto[]>(`/api/v1/products?${queryParams.toString()}`);

      // Transform ManyProductsDto to Product format
      // Handle both Page wrapper and direct array response
      let productsData: ManyProductsDto[];
      if (response.data && typeof response.data === 'object' && 'content' in response.data) {
        // Page wrapper response
        productsData = response.data.content;
      } else if (Array.isArray(response.data)) {
        // Direct array response
        productsData = response.data;
      } else {
        return [];
      }
      
      return productsData.map(transformManyProductsDtoToProduct);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch products');
    }
  },

  async getBySlug(slug: string): Promise<Product | null> {
    try {
      const response = await api.get<JavaProductResponse<JavaProduct>>(`/api/v1/products/slug/${slug}`);

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
      const response = await api.get<JavaProductResponse<JavaProduct>>(`/api/v1/products/${id}`);

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

  async getCategories(): Promise<Array<{id: number, name: string, slug: string}>> {
    try {
      const response = await api.get('/api/v1/categories');
      
      // Handle both paginated response (with content) and direct array response
      let categoriesData: any[];
      if (response.data && typeof response.data === 'object' && 'content' in response.data) {
        categoriesData = response.data.content;
      } else if (Array.isArray(response.data)) {
        categoriesData = response.data;
      } else {
        console.warn('Unexpected categories response format:', response.data);
        return [];
      }
      
      return categoriesData.map((category: any) => ({
        id: category.id,
        name: category.name,
        slug: category.slug
      }));
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  async getWarehouses(): Promise<Array<{id: number, name: string, location: string}>> {
    try {
      const response = await api.get('/api/warehouses');
      
      // Handle both paginated response (with content) and direct array response
      let warehousesData: any[];
      if (response.data && typeof response.data === 'object' && 'content' in response.data) {
        warehousesData = response.data.content;
      } else if (Array.isArray(response.data)) {
        warehousesData = response.data;
      } else {
        console.warn('Unexpected warehouses response format:', response.data);
        return [];
      }
      
      return warehousesData.map((warehouse: any) => ({
        id: warehouse.id,
        name: warehouse.name,
        location: warehouse.location
      }));
    } catch (error) {
      console.error('Error fetching warehouses:', error);
      return [];
    }
  },

  async search(query: string): Promise<Product[]> {
    return this.list({ q: query });
  },

  async getFeatured(): Promise<Product[]> {
    try {
      const response = await api.post<JavaPaginationResponse<ManyProductsDto> | ManyProductsDto[]>(
        `/api/v1/products/search`,
        { isFeatured: true, size: 20, sortBy: 'createdAt', sortDirection: 'desc' }
      );

      let productsData: ManyProductsDto[];
      if (response.data && typeof response.data === 'object' && 'content' in response.data) {
        productsData = (response.data as any).content;
      } else if (Array.isArray(response.data)) {
        productsData = response.data as ManyProductsDto[];
      } else {
        return [];
      }

      return productsData.map(transformManyProductsDtoToProduct);
    } catch (error: any) {
      console.error('Error fetching featured products:', error);
      return [];
    }
  },

  async getNewArrivals(): Promise<Product[]> {
    try {
      const response = await api.post<JavaPaginationResponse<ManyProductsDto> | ManyProductsDto[]>(
        `/api/v1/products/search`,
        { isNewArrival: true, size: 20, sortBy: 'createdAt', sortDirection: 'desc' }
      );

      let productsData: ManyProductsDto[];
      if (response.data && typeof response.data === 'object' && 'content' in response.data) {
        productsData = (response.data as any).content;
      } else if (Array.isArray(response.data)) {
        productsData = response.data as ManyProductsDto[];
      } else {
        return [];
      }

      return productsData.map(transformManyProductsDtoToProduct);
    } catch (error: any) {
      console.error('Error fetching new arrivals:', error);
      return [];
    }
  },

  async getOnSale(): Promise<Product[]> {
    try {
      const response = await api.post<JavaPaginationResponse<ManyProductsDto> | ManyProductsDto[]>(
        `/api/v1/products/search`,
        { isOnSale: true, size: 20, sortBy: 'createdAt', sortDirection: 'desc' }
      );

      let productsData: ManyProductsDto[];
      if (response.data && typeof response.data === 'object' && 'content' in response.data) {
        productsData = (response.data as any).content;
      } else if (Array.isArray(response.data)) {
        productsData = response.data as ManyProductsDto[];
      } else {
        return [];
      }

      return productsData.map(transformManyProductsDtoToProduct);
    } catch (error: any) {
      console.error('Error fetching on-sale products:', error);
      return [];
    }
  },

  async createProduct(productData: CreateProductData): Promise<Product> {
    try {
      const formData = new FormData();
      
      // Add basic product data
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('sku', productData.sku);
      formData.append('basePrice', productData.basePrice.toString());
      if (productData.salePrice) formData.append('salePrice', productData.salePrice.toString());
      formData.append('stockQuantity', productData.stockQuantity.toString());
      formData.append('categoryId', productData.categoryId.toString());
      if (productData.brandId) formData.append('brandId', productData.brandId);
      if (productData.slug) formData.append('slug', productData.slug);
      if (productData.isActive !== undefined) formData.append('isActive', productData.isActive.toString());
      if (productData.isFeatured !== undefined) formData.append('isFeatured', productData.isFeatured.toString());
      if (productData.isNewArrival !== undefined) formData.append('isNewArrival', productData.isNewArrival.toString());
      if (productData.isOnSale !== undefined) formData.append('isOnSale', productData.isOnSale.toString());

      // Debug logging
      console.log('Creating product with data:', {
        name: productData.name,
        description: productData.description,
        sku: productData.sku,
        basePrice: productData.basePrice,
        stockQuantity: productData.stockQuantity,
        categoryId: productData.categoryId,
        imagesCount: productData.productImages?.length || 0
      });

      // Add images
      if (productData.productImages && productData.productImages.length > 0) {
        productData.productImages.forEach((image, index) => {
          formData.append('productImages', image);
        });
      }

      // Add image metadata
      if (productData.imageMetadata && productData.imageMetadata.length > 0) {
        productData.imageMetadata.forEach((metadata, index) => {
          if (metadata.altText) formData.append(`imageMetadata[${index}].altText`, metadata.altText);
          if (metadata.isPrimary !== undefined) formData.append(`imageMetadata[${index}].isPrimary`, metadata.isPrimary.toString());
          if (metadata.sortOrder !== undefined) formData.append(`imageMetadata[${index}].sortOrder`, metadata.sortOrder.toString());
        });
      }



      // Add authentication token if available
      const token = localStorage.getItem('authToken');
      const headers: any = {
        'Content-Type': 'multipart/form-data',
      };
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await api.post<JavaProductResponse<JavaProduct> | JavaProduct>('/api/v1/products', formData, {
        headers,
        // Prevent axios from setting Content-Type automatically for FormData
        transformRequest: (data) => data,
      });

      // Handle different response formats
      if (response.data && typeof response.data === 'object') {
        // Check if it's an error response (has success: false)
        if ('success' in response.data && !response.data.success) {
          throw new Error(response.data.message || 'Failed to create product');
        }
        
        // Check if it's a success response with data wrapper
        if ('success' in response.data && response.data.success && 'data' in response.data && response.data.data) {
          return transformJavaProduct(response.data.data);
        }
        
        // Direct ProductDTO response (most likely case)
        if ('productId' in response.data) {
          return transformJavaProduct(response.data as JavaProduct);
        }
      }
      
      throw new Error('Invalid response format from server');
    } catch (error: any) {
      console.error('Error creating product:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to create product');
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

export const getFeaturedProducts = async (): Promise<Product[]> => {
  return productService.getFeatured();
};

export const getNewArrivals = async (): Promise<Product[]> => {
  return productService.getNewArrivals();
};

export const getOnSaleProducts = async (): Promise<Product[]> => {
  return productService.getOnSale();
};
