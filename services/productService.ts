import { Product } from "../types/product";

const mockProducts: Product[] = Array.from({ length: 16 }).map((_, i) => ({
  id: String(i + 1),
  slug: `product-${i + 1}`,
  name: `Product ${i + 1}`,
  price: 10 + i,
  category: ["Shoes", "Bags", "Accessories"][i % 3],
  image: `https://via.placeholder.com/400x400?text=Product+${i + 1}`,
  rating: 3 + (i % 3),
  reviewCount: 10 + i,
}));

async function wait(ms = 300) {
  return new Promise((res) => setTimeout(res, ms));
}

export const productService = {
  async list(params?: { q?: string; category?: string; sort?: string }): Promise<Product[]> {
    await wait();
    let list = [...mockProducts];
    if (params?.q) list = list.filter((p) => p.name.toLowerCase().includes(params.q!.toLowerCase()));
    if (params?.category) list = list.filter((p) => p.category === params.category);
    if (params?.sort === "price_asc") list.sort((a, b) => a.price - b.price);
    if (params?.sort === "price_desc") list.sort((a, b) => b.price - a.price);
    if (params?.sort === "rating_desc") list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return list;
  },
  async getBySlug(slug: string): Promise<Product | null> {
    await wait();
    return mockProducts.find((p) => p.slug === slug) || null;
  },
  async categories(): Promise<string[]> {
    await wait();
    return ["Shoes", "Bags", "Accessories"];
  },
};

// Export individual functions for easier imports
export const getProducts = async (): Promise<Product[]> => {
  return productService.list();
};

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  return productService.getBySlug(slug);
};

export const getCategories = async (): Promise<string[]> => {
  return productService.categories();
};
