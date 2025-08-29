import api from "../lib/api";

export interface BrandDto {
  id?: string | number;
  brandId?: string | number;
  name?: string;
  brandName?: string;
  description?: string;
  logo?: string;
  logoUrl?: string;
  imageUrl?: string;
  productCount?: number;
  rating?: number;
  reviewCount?: number;
  featured?: boolean;
  category?: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  productCount: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  category: string;
}

interface JavaPage<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

const transformBrand = (dto: BrandDto): Brand => {
  return {
    id: String(dto.id ?? dto.brandId ?? ""),
    name: String(dto.name ?? dto.brandName ?? "Unknown Brand"),
    description: String(dto.description ?? ""),
    logo: String(
      dto.logoUrl ?? dto.logo ?? dto.imageUrl ??
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=100&fit=crop"
    ),
    productCount: Number(dto.productCount ?? 0),
    rating: Number(dto.rating ?? 0),
    reviewCount: Number(dto.reviewCount ?? 0),
    featured: Boolean(dto.featured ?? false),
    category: String(dto.category ?? "General"),
  };
};

export const brandService = {
  async list(): Promise<Brand[]> {
    try {
      const response = await api.get<JavaPage<BrandDto> | BrandDto[]>("/api/v1/brands");

      let items: BrandDto[] = [];
      if (response.data && typeof response.data === "object" && "content" in response.data) {
        items = (response.data as JavaPage<BrandDto>).content || [];
      } else if (Array.isArray(response.data)) {
        items = response.data as BrandDto[];
      }

      return items.map(transformBrand);
    } catch (error: any) {
      console.error("Error fetching brands:", error);
      return [];
    }
  },
};

export default brandService;


