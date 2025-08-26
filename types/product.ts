export type Variant = {
  id: string;
  name: string;
  options: string[];
};

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  brand: string;
  image?: string | {
    imageUrl: string;
    altText?: string;
    sortOrder?: number;
    primary?: boolean;
  };
  primaryImage?: {
    id: number;
    imageUrl: string;
    altText?: string;
    sortOrder?: number;
    primary?: boolean;
  };
  images?: string[];
  rating: number;
  reviewCount: number;
  stockQuantity: number;
  isNew?: boolean;
  isOnSale?: boolean;
  isFeatured?: boolean;
  tags: string[];
  specifications?: Record<string, string>;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  colors?: string[];
  sizes?: string[];
  variants?: ProductVariant[];
  warehouseInfo?: WarehouseInfo[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  originalPrice?: number;
  stockQuantity: number;
  availableQuantity: number;
  attributes: VariantAttribute[];
  images?: string[];
  isActive: boolean;
}

export interface VariantAttribute {
  type: string;
  name: string;
  value: string;
}

export interface WarehouseInfo {
  warehouseId: string;
  warehouseName: string;
  warehouseCode: string;
  stockQuantity: number;
  availableQuantity: number;
  location: string;
  lastRestocked?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  featured: boolean;
  image?: string;
  productCount: number;
  subcategories?: string[];
}

export interface ProductFilters {
  category: string;
  priceRange: [number, number];
  rating: number;
  brand: string[];
  tags: string[];
  inStock: boolean;
  onSale: boolean;
  isNew: boolean;
}

export interface ManyProductsDto {
  productId: string;
  productName: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  stockQuantity: number;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  brand?: {
    brandId: string;
    brandName: string;
  };
  isBestSeller?: boolean;
  isFeatured?: boolean;
  discountInfo?: any;
  primaryImage?: {
    id: number;
    imageUrl: string;
    altText?: string;
    isPrimary: boolean;
    sortOrder?: number;
  };
}
