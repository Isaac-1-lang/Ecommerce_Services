import { Product } from "../types/product";

// Real product images from Unsplash (free, reliable)
const productImages = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=400&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
];

const productNames = [
  "Wireless Bluetooth Headphones",
  "Smart Watch Series 5",
  "Premium Sunglasses",
  "Leather Crossbody Bag",
  "Running Shoes Pro",
  "Designer Handbag",
  "Sports Water Bottle",
  "Fashion Watch",
  "Canvas Backpack",
  "Leather Wallet",
  "Wireless Earbuds",
  "Fitness Tracker",
  "Travel Duffel Bag",
  "Casual Sneakers",
  "Laptop Sleeve",
  "Phone Case Premium"
];

const mockProducts: Product[] = Array.from({ length: 16 }).map((_, i) => ({
  id: String(i + 1),
  slug: `product-${i + 1}`,
  name: productNames[i],
  price: 29.99 + (i * 15.50),
  category: ["Shoes", "Bags", "Accessories"][i % 3],
  image: productImages[i],
  rating: 3 + (i % 3),
  reviewCount: 10 + (i * 3),
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
