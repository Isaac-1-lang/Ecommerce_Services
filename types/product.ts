export type Variant = {
  id: string;
  name: string;
  options: string[];
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: string;
  images?: string[];
  variants?: Variant[];
  rating?: number;
  reviewCount?: number;
};
