import { Product } from "../types/product";
import api, { productApi } from "../lib/api";
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
  productName?: string; // For individual product responses
  name?: string; // Fallback for older format
  description?: string;
  shortDescription?: string;
  brand?: {
    brandId: string;
    brandName: string;
  } | string; // Can be object or string
  tags?: string[];
  price: number;
  originalPrice?: number;
  compareAtPrice?: number; // For sale pricing
  category?: {
    id: number;
    name: string;
    slug: string;
  } | string; // Can be object or string
  images?: string[];
  primaryImage?: {
    id: number;
    imageUrl: string;
    altText?: string;
    sortOrder: number;
    primary: boolean;
  };
  rating?: number;
  reviewCount?: number;
  stockQuantity: number;
  isNew?: boolean;
  isOnSale?: boolean;
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
  slug?: string;
}

export interface CreateProductData {
  name: string;
  description: string;
  sku: string;
  barcode?: string;
  basePrice: number;
  salePrice?: number;
  costPrice?: number;
  stockQuantity: number;
  lowStockThreshold?: number;
  categoryId: number;
  brandId?: string;
  discountId?: string;
  model?: string;
  slug?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isOnSale?: boolean;
  salePercentage?: number;
  fullDescription?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  searchKeywords?: string;
  heightCm?: number;
  widthCm?: number;
  lengthCm?: number;
  weightKg?: number;
  material?: string;
  careInstructions?: string;
  warrantyInfo?: string;
  shippingInfo?: string;
  returnPolicy?: string;
  warehouseStock?: Array<{
    warehouseId: number;
    stockQuantity: number;
    lowStockThreshold: number;
    reorderPoint: number;
    warehousePrice?: number;
    warehouseCostPrice?: number;
    isAvailable?: boolean;
    notes?: string;
  }>;
  productImages?: File[];
  imageMetadata?: Array<{
    altText?: string;
    isPrimary?: boolean;
    sortOrder?: number;
  }>;
  productVideos?: string[];
  videoMetadata?: string;
  variants?: Array<{
    variantSku: string;
    variantBarcode?: string;
    price: number;
    compareAtPrice?: number;
    costPrice?: number;
    stockQuantity: number;
    lowStockThreshold?: number;
    isActive?: boolean;
    sortOrder?: number;
    attributes: Record<string, string>;
    variantImages?: string[];
    imageMetadata?: string;
    salePrice?: number;
    heightCm?: number;
    widthCm?: number;
    lengthCm?: number;
    weightKg?: number;
    material?: string;
    color?: string;
    size?: string;
    shape?: string;
    style?: string;
    isInStock?: boolean;
    isBackorderable?: boolean;
    backorderQuantity?: number;
    backorderMessage?: string;
    requiresSpecialShipping?: boolean;
    shippingNotes?: string;
    additionalShippingCost?: number;
    warehouseStock?: Array<{
      warehouseId: number;
      stockQuantity: number;
      lowStockThreshold: number;
      reorderPoint: number;
      warehousePrice?: number;
      warehouseCostPrice?: number;
      isAvailable?: boolean;
      notes?: string;
    }>;
  }>;
  dimensionsCm?: string;
}

// JSON payload schema for backend product creation
export interface BackendProductImage {
  imageId?: number;
  url: string;
  altText?: string;
  isPrimary?: boolean;
  sortOrder?: number;
}

export interface BackendProductVideo {
  videoId?: number;
  url: string;
  title?: string;
  description?: string;
  sortOrder?: number;
  durationSeconds?: number;
}

export interface BackendVariantAttribute {
  attributeValueId?: number;
  attributeValue: string;
  attributeTypeId?: number;
  attributeType: string;
}

export interface BackendProductVariant {
  variantId?: number;
  variantSku: string;
  variantName?: string;
  variantBarcode?: string;
  price: number;
  salePrice?: number;
  costPrice?: number;
  stockQuantity: number;
  isActive?: boolean;
  isInStock?: boolean;
  isLowStock?: boolean;
  createdAt?: string;
  updatedAt?: string;
  images?: BackendProductImage[];
  attributes?: BackendVariantAttribute[];
}

export interface BackendProductPayload {
  productId?: string;
  name: string;
  description: string;
  sku: string;
  barcode?: string;
  basePrice: number;
  salePrice?: number;
  discountedPrice?: number;
  stockQuantity: number;
  categoryId: number;
  categoryName?: string;
  brandId?: string;
  brandName?: string;
  model?: string;
  slug?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isOnSale?: boolean;
  averageRating?: number;
  reviewCount?: number;
  createdAt?: string;
  updatedAt?: string;
  images?: BackendProductImage[];
  videos?: BackendProductVideo[];
  variants?: BackendProductVariant[];
  fullDescription?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  dimensionsCm?: string;
  weightKg?: number;
}

// Transform Java product to frontend product format
const transformJavaProduct = (javaProduct: JavaProduct): Product => {
  return {
    id: javaProduct.productId,
    // Prefer backend-provided slug; otherwise fall back to product ID for stable routing
    slug: javaProduct.slug || javaProduct.productId,
    name: javaProduct.productName || javaProduct.name || 'Unknown Product',
    description: javaProduct.description || javaProduct.shortDescription || 'No description available',
    shortDescription: javaProduct.shortDescription || javaProduct.description?.substring(0, 100) + "..." || 'No description available',
    brand: typeof javaProduct.brand === 'object' ? javaProduct.brand.brandName : javaProduct.brand || "Generic Brand",
    tags: javaProduct.tags || [],
    price: javaProduct.price || 0,
    originalPrice: javaProduct.compareAtPrice || javaProduct.originalPrice,
    category: typeof javaProduct.category === 'object' ? javaProduct.category.name : javaProduct.category || "Uncategorized",
    image: javaProduct.primaryImage?.imageUrl || javaProduct.images?.[0] || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center",
    rating: javaProduct.rating || 0,
    reviewCount: javaProduct.reviewCount || 0,
    stockQuantity: javaProduct.stockQuantity || 0,
    isNew: javaProduct.isNew || false,
    isOnSale: javaProduct.isOnSale || (javaProduct.compareAtPrice ? javaProduct.compareAtPrice > javaProduct.price : false),
    isFeatured: javaProduct.isFeatured || false,
    createdAt: javaProduct.createdAt ? formatJavaDate(javaProduct.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: javaProduct.updatedAt ? formatJavaDate(javaProduct.updatedAt).toISOString() : new Date().toISOString(),
  };
};

// Transform ManyProductsDto to Product format
const transformManyProductsDtoToProduct = (dto: ManyProductsDto): Product => {
  return {
    id: dto.productId,
    // Use ID as slug when no dedicated slug is available
    slug: dto.productId,
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
      console.log('Fetching product by ID:', id);
      const response = await api.get<JavaProductResponse<JavaProduct> | JavaProduct>(`/api/v1/products/${id}`);
      console.log('Raw API response:', response.data);

      // Handle both response formats:
      // 1. Wrapped response: { success: true, data: {...} }
      // 2. Direct response: { productId: "...", name: "...", ... }
      
      let productData: JavaProduct | undefined;
      
      if (response.data && typeof response.data === 'object') {
        if ('success' in response.data && response.data.success && 'data' in response.data) {
          // Wrapped response format
          console.log('Wrapped response format detected');
          productData = response.data.data;
        } else if ('productId' in response.data) {
          // Direct response format (your backend)
          console.log('Direct response format detected');
          productData = response.data as JavaProduct;
        } else {
          console.log('Unknown response format');
          return null;
        }
      } else {
        console.log('Invalid response data');
        return null;
      }

      if (productData && productData.productId) {
        console.log('Transforming product data:', productData);
        const transformed = transformJavaProduct(productData);
        console.log('Transformed product:', transformed);
        return transformed;
      }
      
      console.log('No valid product data found');
      return null;
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.log('Product not found (404)');
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
      
      // Add basic product data - ensure correct data types for backend
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('sku', productData.sku);
      if (productData.barcode) formData.append('barcode', productData.barcode);
      
      // Numbers should be sent as strings but ensure they're valid numbers
      formData.append('basePrice', productData.basePrice.toString());
      if (productData.salePrice) formData.append('salePrice', productData.salePrice.toString());
      if (productData.costPrice) formData.append('costPrice', productData.costPrice.toString());
      formData.append('stockQuantity', productData.stockQuantity.toString());
      if (productData.lowStockThreshold) formData.append('lowStockThreshold', productData.lowStockThreshold.toString());
      
      // Integer should be sent as string
      formData.append('categoryId', productData.categoryId.toString());
      
      if (productData.brandId) formData.append('brandId', productData.brandId);
      if (productData.discountId) formData.append('discountId', productData.discountId);
      if (productData.model) formData.append('model', productData.model);
      if (productData.slug) formData.append('slug', productData.slug);
      
      // Booleans should be sent as strings "true"/"false" for backend parsing
      if (productData.isActive !== undefined) formData.append('isActive', productData.isActive.toString());
      if (productData.isFeatured !== undefined) formData.append('isFeatured', productData.isFeatured.toString());
      if (productData.isBestseller !== undefined) formData.append('isBestseller', productData.isBestseller.toString());
      if (productData.isNewArrival !== undefined) formData.append('isNewArrival', productData.isNewArrival.toString());
      if (productData.isOnSale !== undefined) formData.append('isOnSale', productData.isOnSale.toString());
      
      if (productData.salePercentage) formData.append('salePercentage', productData.salePercentage.toString());
      if (productData.fullDescription) formData.append('fullDescription', productData.fullDescription);
      if (productData.metaTitle) formData.append('metaTitle', productData.metaTitle);
      if (productData.metaDescription) formData.append('metaDescription', productData.metaDescription);
      if (productData.metaKeywords) formData.append('metaKeywords', productData.metaKeywords);
      if (productData.searchKeywords) formData.append('searchKeywords', productData.searchKeywords);
      
      // Numbers should be sent as strings
      if (productData.heightCm) formData.append('heightCm', productData.heightCm.toString());
      if (productData.widthCm) formData.append('widthCm', productData.widthCm.toString());
      if (productData.lengthCm) formData.append('lengthCm', productData.lengthCm.toString());
      if (productData.weightKg) formData.append('weightKg', productData.weightKg.toString());
      
      if (productData.material) formData.append('material', productData.material);
      if (productData.careInstructions) formData.append('careInstructions', productData.careInstructions);
      if (productData.warrantyInfo) formData.append('warrantyInfo', productData.warrantyInfo);
      if (productData.shippingInfo) formData.append('shippingInfo', productData.shippingInfo);
      if (productData.returnPolicy) formData.append('returnPolicy', productData.returnPolicy);

      // Add warehouse stock data
      if (productData.warehouseStock && productData.warehouseStock.length > 0) {
        productData.warehouseStock.forEach((warehouse, index) => {
          formData.append(`warehouseStock[${index}].warehouseId`, warehouse.warehouseId.toString());
          formData.append(`warehouseStock[${index}].stockQuantity`, warehouse.stockQuantity.toString());
          formData.append(`warehouseStock[${index}].lowStockThreshold`, warehouse.lowStockThreshold.toString());
          formData.append(`warehouseStock[${index}].reorderPoint`, warehouse.reorderPoint.toString());
          if (warehouse.warehousePrice) formData.append(`warehouseStock[${index}].warehousePrice`, warehouse.warehousePrice.toString());
          if (warehouse.warehouseCostPrice) formData.append(`warehouseStock[${index}].warehouseCostPrice`, warehouse.warehouseCostPrice.toString());
          if (warehouse.isAvailable !== undefined) formData.append(`warehouseStock[${index}].isAvailable`, warehouse.isAvailable.toString());
          if (warehouse.notes) formData.append(`warehouseStock[${index}].notes`, warehouse.notes);
        });
      }

      // Add variants data
      if (productData.variants && productData.variants.length > 0) {
        productData.variants.forEach((variant, index) => {
          formData.append(`variants[${index}].variantSku`, variant.variantSku);
          if (variant.variantBarcode) formData.append(`variants[${index}].variantBarcode`, variant.variantBarcode);
          formData.append(`variants[${index}].price`, variant.price.toString());
          if (variant.compareAtPrice) formData.append(`variants[${index}].compareAtPrice`, variant.compareAtPrice.toString());
          if (variant.costPrice) formData.append(`variants[${index}].costPrice`, variant.costPrice.toString());
          formData.append(`variants[${index}].stockQuantity`, variant.stockQuantity.toString());
          if (variant.lowStockThreshold) formData.append(`variants[${index}].lowStockThreshold`, variant.lowStockThreshold.toString());
          if (variant.isActive !== undefined) formData.append(`variants[${index}].isActive`, variant.isActive.toString());
          if (variant.sortOrder) formData.append(`variants[${index}].sortOrder`, variant.sortOrder.toString());
          
          // Add variant attributes
          Object.entries(variant.attributes).forEach(([key, value]) => {
            formData.append(`variants[${index}].attributes.${key}`, value);
          });
          
          if (variant.variantImages) {
            variant.variantImages.forEach((image, imgIndex) => {
              formData.append(`variants[${index}].variantImages[${imgIndex}]`, image);
            });
          }
          
          if (variant.imageMetadata) formData.append(`variants[${index}].imageMetadata`, variant.imageMetadata);
          if (variant.salePrice) formData.append(`variants[${index}].salePrice`, variant.salePrice.toString());
          if (variant.heightCm) formData.append(`variants[${index}].heightCm`, variant.heightCm.toString());
          if (variant.widthCm) formData.append(`variants[${index}].widthCm`, variant.widthCm.toString());
          if (variant.lengthCm) formData.append(`variants[${index}].lengthCm`, variant.lengthCm.toString());
          if (variant.weightKg) formData.append(`variants[${index}].weightKg`, variant.weightKg.toString());
          if (variant.material) formData.append(`variants[${index}].material`, variant.material);
          if (variant.color) formData.append(`variants[${index}].color`, variant.color);
          if (variant.size) formData.append(`variants[${index}].size`, variant.size);
          if (variant.shape) formData.append(`variants[${index}].shape`, variant.shape);
          if (variant.style) formData.append(`variants[${index}].style`, variant.style);
          if (variant.isInStock !== undefined) formData.append(`variants[${index}].isInStock`, variant.isInStock.toString());
          if (variant.isBackorderable !== undefined) formData.append(`variants[${index}].isBackorderable`, variant.isBackorderable.toString());
          if (variant.backorderQuantity) formData.append(`variants[${index}].backorderQuantity`, variant.backorderQuantity.toString());
          if (variant.backorderMessage) formData.append(`variants[${index}].backorderMessage`, variant.backorderMessage);
          if (variant.requiresSpecialShipping !== undefined) formData.append(`variants[${index}].requiresSpecialShipping`, variant.requiresSpecialShipping.toString());
          if (variant.shippingNotes) formData.append(`variants[${index}].shippingNotes`, variant.shippingNotes);
          if (variant.additionalShippingCost) formData.append(`variants[${index}].additionalShippingCost`, variant.additionalShippingCost.toString());
          
          // Add variant warehouse stock
          if (variant.warehouseStock && variant.warehouseStock.length > 0) {
            variant.warehouseStock.forEach((warehouse, wIndex) => {
              formData.append(`variants[${index}].warehouseStock[${wIndex}].warehouseId`, warehouse.warehouseId.toString());
              formData.append(`variants[${index}].warehouseStock[${wIndex}].stockQuantity`, warehouse.stockQuantity.toString());
              formData.append(`variants[${index}].warehouseStock[${wIndex}].lowStockThreshold`, warehouse.lowStockThreshold.toString());
              formData.append(`variants[${index}].warehouseStock[${wIndex}].reorderPoint`, warehouse.reorderPoint.toString());
              if (warehouse.warehousePrice) formData.append(`variants[${index}].warehouseStock[${wIndex}].warehousePrice`, warehouse.warehousePrice.toString());
              if (warehouse.warehouseCostPrice) formData.append(`variants[${index}].warehouseStock[${wIndex}].warehouseCostPrice`, warehouse.warehouseCostPrice.toString());
              if (warehouse.isAvailable !== undefined) formData.append(`variants[${index}].warehouseStock[${wIndex}].isAvailable`, warehouse.isAvailable.toString());
              if (warehouse.notes) formData.append(`variants[${index}].warehouseStock[${wIndex}].notes`, warehouse.notes);
            });
          }
        });
      }

      // Add dimensions string
      if (productData.heightCm && productData.widthCm && productData.lengthCm) {
        const dimensions = `${productData.heightCm} x ${productData.widthCm} x ${productData.lengthCm}`;
        formData.append('dimensionsCm', dimensions);
      }

      // Debug logging
      console.log('Creating product with data:', {
        name: productData.name,
        description: productData.description,
        sku: productData.sku,
        basePrice: productData.basePrice,
        stockQuantity: productData.stockQuantity,
        categoryId: productData.categoryId,
        imagesCount: productData.productImages?.length || 0,
        warehouseStockCount: productData.warehouseStock?.length || 0,
        variantsCount: productData.variants?.length || 0
      });

      // Log the actual FormData contents
      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(`  ${key}: ${value} (type: ${typeof value})`);
      }
      
      // NEW: Enhanced FormData logging with detailed breakdown
      console.log('🔍 === FORM DATA BREAKDOWN ===');
      console.log('📋 BASIC PRODUCT FIELDS:');
      const basicFields = ['name', 'description', 'sku', 'barcode', 'basePrice', 'salePrice', 'costPrice', 'stockQuantity', 'lowStockThreshold', 'categoryId', 'brandId', 'discountId', 'model', 'slug'];
      basicFields.forEach(field => {
        const value = formData.get(field);
        if (value !== null) {
          console.log(`  ✅ ${field}: ${value} (${typeof value})`);
        }
      });
      
      console.log('📋 BOOLEAN FIELDS:');
      const booleanFields = ['isActive', 'isFeatured', 'isBestseller', 'isNewArrival', 'isOnSale'];
      booleanFields.forEach(field => {
        const value = formData.get(field);
        if (value !== null) {
          console.log(`  ✅ ${field}: ${value} (${typeof value})`);
        }
      });
      
      console.log('📋 NUMERIC FIELDS:');
      const numericFields = ['salePercentage', 'heightCm', 'widthCm', 'lengthCm', 'weightKg'];
      numericFields.forEach(field => {
        const value = formData.get(field);
        if (value !== null) {
          console.log(`  ✅ ${field}: ${value} (${typeof value})`);
        }
      });
      
      console.log('📋 TEXT FIELDS:');
      const textFields = ['fullDescription', 'metaTitle', 'metaDescription', 'metaKeywords', 'searchKeywords', 'material', 'careInstructions', 'warrantyInfo', 'shippingInfo', 'returnPolicy'];
      textFields.forEach(field => {
        const value = formData.get(field);
        if (value !== null) {
          console.log(`  ✅ ${field}: ${value} (${typeof value})`);
        }
      });
      
      console.log('📋 WAREHOUSE STOCK FIELDS:');
      const warehouseStockEntries = Array.from(formData.entries()).filter(([key]) => key.startsWith('warehouseStock'));
      if (warehouseStockEntries.length > 0) {
        warehouseStockEntries.forEach(([key, value]) => {
          console.log(`  🔸 ${key}: ${value} (${typeof value})`);
        });
      } else {
        console.log('  🔸 No warehouse stock data');
      }
      
      console.log('📋 VARIANT FIELDS:');
      const variantEntries = Array.from(formData.entries()).filter(([key]) => key.startsWith('variants'));
      if (variantEntries.length > 0) {
        variantEntries.forEach(([key, value]) => {
          console.log(`  🔸 ${key}: ${value} (${typeof value})`);
        });
      } else {
        console.log('  🔸 No variant data');
      }
      
      console.log('📋 IMAGE FIELDS:');
      const imageEntries = Array.from(formData.entries()).filter(([key]) => key.startsWith('productImages') || key.startsWith('imageMetadata'));
      if (imageEntries.length > 0) {
        imageEntries.forEach(([key, value]) => {
          if (value instanceof File) {
            console.log(`  🔸 ${key}: File - ${value.name} (${(value.size / 1024 / 1024).toFixed(2)}MB, ${value.type})`);
          } else {
            console.log(`  🔸 ${key}: ${value} (${typeof value})`);
          }
        });
      } else {
        console.log('  🔸 No image data');
      }
      
      console.log('📋 TOTAL FORM DATA ENTRIES:', Array.from(formData.entries()).length);
      console.log('🔍 === END FORM DATA BREAKDOWN ===');
      
      // Also log the expected backend fields for comparison
      console.log('Expected backend fields:');
      console.log('  - name (string)');
      console.log('  - description (string)');
      console.log('  - sku (string)');
      console.log('  - basePrice (number)');
      console.log('  - stockQuantity (integer)');
      console.log('  - categoryId (integer)');
      console.log('  - isActive (boolean)');
      console.log('  - isFeatured (boolean)');
      console.log('  - isBestseller (boolean)');
      console.log('  - isNewArrival (boolean)');
      console.log('  - isOnSale (boolean)');

      // NEW: Backend field comparison and validation
      console.log('🔍 === BACKEND FIELD COMPARISON ===');
      console.log('📋 REQUIRED FIELDS CHECK:');
      const requiredFields = ['name', 'description', 'sku', 'basePrice', 'stockQuantity', 'categoryId'];
      const missingFields = requiredFields.filter(field => !formData.get(field));
      if (missingFields.length === 0) {
        console.log('  ✅ All required fields are present');
      } else {
        console.log('  ❌ Missing required fields:', missingFields);
      }
      
      console.log('📋 FIELD TYPE VALIDATION:');
      const fieldValidations = [
        { field: 'name', expected: 'string', actual: typeof formData.get('name') },
        { field: 'description', expected: 'string', actual: typeof formData.get('description') },
        { field: 'sku', expected: 'string', actual: typeof formData.get('sku') },
        { field: 'basePrice', expected: 'string (number)', actual: typeof formData.get('basePrice') },
        { field: 'stockQuantity', expected: 'string (number)', actual: typeof formData.get('stockQuantity') },
        { field: 'categoryId', expected: 'string (number)', actual: typeof formData.get('categoryId') }
      ];
      
      fieldValidations.forEach(validation => {
        const isValid = validation.expected.includes(validation.actual);
        console.log(`  ${isValid ? '✅' : '❌'} ${validation.field}: expected ${validation.expected}, got ${validation.actual}`);
      });
      
      console.log('📋 COMPLEX DATA STRUCTURE CHECK:');
      console.log('  🔸 Warehouse Stock Format:');
      const warehouseFields = Array.from(formData.entries()).filter(([key]) => key.startsWith('warehouseStock'));
      if (warehouseFields.length > 0) {
        console.log('    - Format: warehouseStock[index].fieldName');
        console.log('    - Example keys:', warehouseFields.slice(0, 3).map(([key]) => key));
      }
      
      console.log('  🔸 Variants Format:');
      const variantFields = Array.from(formData.entries()).filter(([key]) => key.startsWith('variants'));
      if (variantFields.length > 0) {
        console.log('    - Format: variants[index].fieldName');
        console.log('    - Example keys:', variantFields.slice(0, 3).map(([key]) => key));
      }
      
      console.log('  🔸 Images Format:');
      const imageFields = Array.from(formData.entries()).filter(([key]) => key.startsWith('productImages'));
      if (imageFields.length > 0) {
        console.log('    - Format: productImages (File objects)');
        console.log('    - Count:', imageFields.length);
      }
      
      console.log('🔍 === END BACKEND FIELD COMPARISON ===');
      
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

      // Add request progress tracking
      console.log('🚀 Starting product creation request...');
      const startTime = Date.now();
      
      const response = await productApi.post<JavaProductResponse<JavaProduct> | JavaProduct>('/api/v1/products', formData, {
        headers,
        // Prevent axios from setting Content-Type automatically for FormData
        transformRequest: (data) => data,
        // Add progress tracking
        onUploadProgress: (progressEvent) => {
          const elapsed = Date.now() - startTime;
          console.log(`📤 Upload progress: ${Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))}% (${elapsed}ms elapsed)`);
        },
        onDownloadProgress: (progressEvent) => {
          const elapsed = Date.now() - startTime;
          console.log(`📥 Download progress: ${Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))}% (${elapsed}ms elapsed)`);
        },
      });
      
      const totalTime = Date.now() - startTime;
      console.log(`✅ Product creation completed in ${totalTime}ms`);

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
      
      // Handle specific error types
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        throw new Error('Request timed out. The server is taking too long to respond. Please try again or contact support if the issue persists.');
      }
      
      if (error.response?.status === 500) {
        throw new Error('Server error (500). The backend encountered an error processing your request. Please check the data and try again.');
      }
      
      if (error.response?.status === 413) {
        throw new Error('Request too large. The product data or images are too big. Please reduce image sizes and try again.');
      }
      
      if (error.response?.status === 400) {
        throw new Error(`Bad request: ${error.response?.data?.message || 'Invalid data format'}. Please check all required fields.`);
      }
      
      throw new Error(error.response?.data?.message || error.message || 'Failed to create product');
    }
  }
  ,
  async createProductJson(payload: BackendProductPayload): Promise<any> {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
      const headers: any = { 'Content-Type': 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;
      const response = await api.post('/api/v1/products', payload, { headers });
      return response.data;
    } catch (error: any) {
      console.error('Error creating product (JSON):', error);
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
