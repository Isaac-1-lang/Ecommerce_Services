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
  image: string;
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
  createdAt: string;
  updatedAt: string;
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
