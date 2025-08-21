import { Product, ProductCategory } from '../types/product';

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest gadgets and electronic devices',
    icon: '📱',
    featured: true,
    productCount: 8,
    subcategories: ['Smartphones', 'Laptops', 'Audio', 'Accessories']
  },
  {
    id: 'fashion',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Trendy clothing and accessories',
    icon: '👕',
    featured: true,
    productCount: 7,
    subcategories: ['Men', 'Women', 'Kids', 'Accessories']
  },
  {
    id: 'home-garden',
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Everything for your home and outdoor space',
    icon: '🏠',
    featured: true,
    productCount: 6,
    subcategories: ['Furniture', 'Decor', 'Kitchen', 'Garden']
  },
  {
    id: 'sports-outdoors',
    name: 'Sports & Outdoors',
    slug: 'sports-outdoors',
    description: 'Equipment and gear for active lifestyles',
    icon: '⚽',
    featured: true,
    productCount: 5,
    subcategories: ['Fitness', 'Outdoor', 'Team Sports', 'Camping']
  },
  {
    id: 'beauty-health',
    name: 'Beauty & Health',
    slug: 'beauty-health',
    description: 'Personal care and wellness products',
    icon: '💄',
    featured: false,
    productCount: 4,
    subcategories: ['Skincare', 'Makeup', 'Haircare', 'Wellness']
  }
];

export const DUMMY_PRODUCTS: Product[] = [
  // Electronics - Smartphones
  {
    id: 'iphone-15-pro',
    name: 'Apple iPhone 15 Pro - 256GB',
    slug: 'apple-iphone-15-pro-256gb',
    description: 'Experience the future with the iPhone 15 Pro featuring A17 Pro chip, titanium design, and advanced camera system with 48MP main camera.',
    shortDescription: 'Latest iPhone with A17 Pro chip and titanium design',
    price: 1199.99,
    originalPrice: 1299.99,
    category: 'electronics',
    subcategory: 'Smartphones',
    brand: 'Apple',
    image: '/1.jpg',
    images: ['/2.jpg', '/3.jpg'],
    rating: 4.8,
    reviewCount: 1247,
    stockQuantity: 45,
    isNew: true,
    isOnSale: true,
    isFeatured: true,
    tags: ['smartphone', 'apple', '5G', 'camera', 'titanium'],
    specifications: {
      'Storage': '256GB',
      'Color': 'Natural Titanium',
      'Screen': '6.1" Super Retina XDR',
      'Chip': 'A17 Pro'
    },
    weight: 187,
    dimensions: { length: 146.7, width: 71.5, height: 8.25 },
    colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'samsung-galaxy-s24',
    name: 'Samsung Galaxy S24 Ultra - 512GB',
    slug: 'samsung-galaxy-s24-ultra-512gb',
    description: 'Unleash your creativity with the Galaxy S24 Ultra featuring S Pen, 200MP camera, and AI-powered features for the ultimate mobile experience.',
    shortDescription: 'Premium Android flagship with S Pen and 200MP camera',
    price: 1299.99,
    originalPrice: 1399.99,
    category: 'electronics',
    subcategory: 'Smartphones',
    brand: 'Samsung',
    image: '/2.jpg',
    rating: 4.7,
    reviewCount: 892,
    stockQuantity: 32,
    isNew: true,
    isOnSale: true,
    isFeatured: true,
    tags: ['smartphone', 'samsung', '5G', 'camera', 's-pen'],
    specifications: {
      'Storage': '512GB',
      'Color': 'Titanium Gray',
      'Screen': '6.8" Dynamic AMOLED 2X',
      'Chip': 'Snapdragon 8 Gen 3'
    },
    weight: 232,
    dimensions: { length: 163.4, width: 79.0, height: 8.6 },
    colors: ['Titanium Gray', 'Titanium Black', 'Titanium Violet', 'Titanium Yellow'],
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z'
  },

  // Electronics - Laptops
  {
    id: 'macbook-pro-16',
    name: 'MacBook Pro 16" - M3 Pro Chip',
    slug: 'macbook-pro-16-m3-pro-chip',
    description: 'Power through your most demanding projects with the 16-inch MacBook Pro featuring M3 Pro chip, up to 22 hours battery life, and Liquid Retina XDR display.',
    shortDescription: 'Professional laptop with M3 Pro chip and 16" display',
    price: 2499.99,
    originalPrice: 2699.99,
    category: 'electronics',
    subcategory: 'Laptops',
    brand: 'Apple',
    image: '/3.jpg',
    rating: 4.9,
    reviewCount: 567,
    stockQuantity: 28,
    isNew: true,
    isOnSale: true,
    isFeatured: true,
    tags: ['laptop', 'macbook', 'apple', 'm3-pro', 'professional'],
    specifications: {
      'Processor': 'M3 Pro',
      'Memory': '18GB Unified Memory',
      'Storage': '512GB SSD',
      'Display': '16" Liquid Retina XDR'
    },
    weight: 2200,
    dimensions: { length: 355.7, width: 248.1, height: 16.8 },
    colors: ['Space Black', 'Silver'],
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  },
  {
    id: 'dell-xps-15',
    name: 'Dell XPS 15 9530 - Intel i7',
    slug: 'dell-xps-15-9530-intel-i7',
    description: 'Premium Windows laptop with Intel Core i7-13700H, NVIDIA RTX 4060, 32GB RAM, and stunning 15.6" 4K OLED display for creators and professionals.',
    shortDescription: 'Premium Windows laptop with RTX 4060 and 4K OLED',
    price: 1899.99,
    originalPrice: 2099.99,
    category: 'electronics',
    subcategory: 'Laptops',
    brand: 'Dell',
    image: '/1.jpg',
    rating: 4.6,
    reviewCount: 423,
    stockQuantity: 19,
    isOnSale: true,
    isFeatured: false,
    tags: ['laptop', 'dell', 'windows', 'rtx-4060', '4k-oled'],
    specifications: {
      'Processor': 'Intel Core i7-13700H',
      'Graphics': 'NVIDIA RTX 4060',
      'Memory': '32GB DDR5',
      'Storage': '1TB SSD'
    },
    weight: 1900,
    dimensions: { length: 344.4, width: 230.1, height: 18.99 },
    colors: ['Platinum Silver', 'Frost'],
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z'
  },

  // Electronics - Audio
  {
    id: 'sony-wh-1000xm5',
    name: 'Sony WH-1000XM5 Wireless Headphones',
    slug: 'sony-wh-1000xm5-wireless-headphones',
    description: 'Industry-leading noise cancellation with 30-hour battery life, exceptional sound quality, and comfortable design for the ultimate listening experience.',
    shortDescription: 'Premium noise-cancelling wireless headphones',
    price: 399.99,
    originalPrice: 449.99,
    category: 'electronics',
    subcategory: 'Audio',
    brand: 'Sony',
    image: '/2.jpg',
    rating: 4.8,
    reviewCount: 2156,
    stockQuantity: 67,
    isOnSale: true,
    isFeatured: false,
    tags: ['headphones', 'wireless', 'noise-cancelling', 'bluetooth', 'sony'],
    specifications: {
      'Battery Life': '30 hours',
      'Noise Cancellation': 'Yes',
      'Connectivity': 'Bluetooth 5.2',
      'Weight': '250g'
    },
    weight: 250,
    dimensions: { length: 20.5, width: 16.5, height: 8.5 },
    colors: ['Black', 'Silver'],
    createdAt: '2023-12-15T00:00:00Z',
    updatedAt: '2023-12-15T00:00:00Z'
  },

  // Fashion - Men's Clothing
  {
    id: 'nike-air-max-270',
    name: 'Nike Air Max 270 - Men\'s Running Shoes',
    slug: 'nike-air-max-270-mens-running-shoes',
    description: 'Maximum comfort and style with the iconic Air Max 270 featuring the tallest Air unit yet for all-day comfort and a bold design statement.',
    shortDescription: 'Iconic running shoes with maximum Air cushioning',
    price: 129.99,
    originalPrice: 149.99,
    category: 'fashion',
    subcategory: 'Men',
    brand: 'Nike',
    image: '/3.jpg',
    rating: 4.5,
    reviewCount: 3421,
    stockQuantity: 89,
    isOnSale: true,
    isFeatured: false,
    tags: ['shoes', 'running', 'nike', 'air-max', 'athletic'],
    specifications: {
      'Type': 'Running Shoes',
      'Upper': 'Mesh and Synthetic',
      'Sole': 'Rubber',
      'Closure': 'Lace-up'
    },
    weight: 320,
    dimensions: { length: 30, width: 12, height: 8 },
    colors: ['Black/White', 'Gray/Blue', 'Red/Black'],
    sizes: ['7', '8', '9', '10', '11', '12', '13'],
    createdAt: '2023-11-20T00:00:00Z',
    updatedAt: '2023-11-20T00:00:00Z'
  },
  {
    id: 'levis-501-jeans',
    name: 'Levi\'s 501 Original Fit Jeans - Men',
    slug: 'levis-501-original-fit-jeans-men',
    description: 'The original straight-leg jeans that started it all. Classic 501 fit with authentic button fly and timeless style that never goes out of fashion.',
    shortDescription: 'Classic straight-leg jeans with button fly',
    price: 89.99,
    originalPrice: 109.99,
    category: 'fashion',
    subcategory: 'Men',
    brand: 'Levi\'s',
    image: '/1.jpg',
    rating: 4.7,
    reviewCount: 1892,
    stockQuantity: 156,
    isOnSale: true,
    isFeatured: false,
    tags: ['jeans', 'levis', 'classic', 'straight-leg', 'denim'],
    specifications: {
      'Fit': 'Original',
      'Rise': 'Mid-rise',
      'Leg Opening': '16"',
      'Fabric': '100% Cotton Denim'
    },
    weight: 450,
    dimensions: { length: 32, width: 16, height: 0.5 },
    colors: ['Blue', 'Black', 'Gray'],
    sizes: ['28x30', '30x30', '32x30', '34x30', '36x30', '38x30'],
    createdAt: '2023-10-15T00:00:00Z',
    updatedAt: '2023-10-15T00:00:00Z'
  },

  // Fashion - Women's Clothing
  {
    id: 'zara-trench-coat',
    name: 'Zara Classic Trench Coat - Women',
    slug: 'zara-classic-trench-coat-women',
    description: 'Timeless elegance meets modern style with this classic trench coat featuring a belted waist, double-breasted design, and water-resistant fabric.',
    shortDescription: 'Classic belted trench coat for women',
    price: 159.99,
    originalPrice: 199.99,
    category: 'fashion',
    subcategory: 'Women',
    brand: 'Zara',
    image: '/2.jpg',
    rating: 4.4,
    reviewCount: 567,
    stockQuantity: 43,
    isOnSale: true,
    isFeatured: false,
    tags: ['coat', 'trench', 'zara', 'classic', 'outerwear'],
    specifications: {
      'Style': 'Trench Coat',
      'Closure': 'Double-breasted',
      'Length': 'Knee-length',
      'Material': 'Cotton Blend'
    },
    weight: 800,
    dimensions: { length: 100, width: 50, height: 5 },
    colors: ['Beige', 'Black', 'Navy'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },

  // Home & Garden - Furniture
  {
    id: 'ikea-malm-bed-frame',
    name: 'IKEA Malm Bed Frame - Queen Size',
    slug: 'ikea-malm-bed-frame-queen-size',
    description: 'Clean, modern design with a low profile that works in any bedroom. Features a headboard and footboard with a sleek, minimalist aesthetic.',
    shortDescription: 'Modern queen-size bed frame with headboard',
    price: 199.99,
    originalPrice: 249.99,
    category: 'home-garden',
    subcategory: 'Furniture',
    brand: 'IKEA',
    image: '/3.jpg',
    rating: 4.3,
    reviewCount: 892,
    stockQuantity: 34,
    isOnSale: true,
    isFeatured: false,
    tags: ['bed', 'furniture', 'ikea', 'queen', 'modern'],
    specifications: {
      'Size': 'Queen (60" x 80")',
      'Material': 'Particleboard, Fiberboard',
      'Color': 'White',
      'Weight Capacity': '400 lbs'
    },
    weight: 45000,
    dimensions: { length: 203, width: 152, height: 89 },
    colors: ['White', 'Black-Brown', 'Oak Veneer'],
    createdAt: '2023-09-10T00:00:00Z',
    updatedAt: '2023-09-10T00:00:00Z'
  },

  // Sports & Outdoors - Fitness
  {
    id: 'bowflex-selecttech-dumbbells',
    name: 'Bowflex SelectTech 552 Adjustable Dumbbells',
    slug: 'bowflex-selecttech-552-adjustable-dumbbells',
    description: 'Revolutionary adjustable dumbbells that let you change weight from 5 to 52.5 pounds with a simple turn of the dial. Perfect for home gyms.',
    shortDescription: 'Adjustable dumbbells from 5-52.5 lbs',
    price: 399.99,
    originalPrice: 499.99,
    category: 'sports-outdoors',
    subcategory: 'Fitness',
    brand: 'Bowflex',
    image: '/1.jpg',
    rating: 4.8,
    reviewCount: 1247,
    stockQuantity: 23,
    isOnSale: true,
    isFeatured: true,
    tags: ['dumbbells', 'fitness', 'adjustable', 'home-gym', 'strength'],
    specifications: {
      'Weight Range': '5-52.5 lbs',
      'Weight Increments': '2.5 lbs',
      'Material': 'Steel and Plastic',
      'Warranty': '1 Year'
    },
    weight: 15000,
    dimensions: { length: 15, width: 8, height: 8 },
    colors: ['Black/Red'],
    createdAt: '2023-08-20T00:00:00Z',
    updatedAt: '2023-08-20T00:00:00Z'
  },

  // Beauty & Health - Skincare
  {
    id: 'cerave-moisturizing-cream',
    name: 'CeraVe Moisturizing Cream - 19oz',
    slug: 'cerave-moisturizing-cream-19oz',
    description: 'Developed with dermatologists, this rich, non-greasy cream provides 24-hour hydration and helps restore the protective skin barrier with ceramides.',
    shortDescription: 'Dermatologist-developed 24-hour moisturizing cream',
    price: 24.99,
    originalPrice: 29.99,
    category: 'beauty-health',
    subcategory: 'Skincare',
    brand: 'CeraVe',
    image: '/2.jpg',
    rating: 4.6,
    reviewCount: 4567,
    stockQuantity: 234,
    isOnSale: true,
    isFeatured: false,
    tags: ['moisturizer', 'skincare', 'cerave', 'dermatologist', 'ceramides'],
    specifications: {
      'Size': '19 oz',
      'Type': 'Moisturizing Cream',
      'Skin Type': 'All Skin Types',
      'Fragrance': 'Fragrance-Free'
    },
    weight: 540,
    dimensions: { length: 8, width: 8, height: 12 },
    colors: ['White'],
    createdAt: '2023-07-15T00:00:00Z',
    updatedAt: '2023-07-15T00:00:00Z'
  }
];

// Add more products to reach 30 total
export const ADDITIONAL_PRODUCTS: Product[] = [
  // More Electronics
  {
    id: 'airpods-pro-2',
    name: 'Apple AirPods Pro (2nd Generation)',
    slug: 'apple-airpods-pro-2nd-generation',
    description: 'Active noise cancellation, spatial audio, and sweat and water resistance. Experience immersive sound with the latest AirPods Pro.',
    shortDescription: 'Premium wireless earbuds with noise cancellation',
    price: 249.99,
    category: 'electronics',
    subcategory: 'Audio',
    brand: 'Apple',
    image: '/3.jpg',
    rating: 4.7,
    reviewCount: 1892,
    stockQuantity: 78,
    isNew: true,
    tags: ['earbuds', 'wireless', 'noise-cancelling', 'apple', 'bluetooth'],
    specifications: { 'Battery Life': '6 hours', 'Noise Cancellation': 'Yes' },
    weight: 5.4,
    createdAt: '2024-01-25T00:00:00Z',
    updatedAt: '2024-01-25T00:00:00Z'
  },
  {
    id: 'ipad-air-5',
    name: 'iPad Air (5th Generation) - 64GB',
    slug: 'ipad-air-5th-generation-64gb',
    description: 'Powerful M1 chip, 10.9-inch Liquid Retina display, and all-day battery life. Perfect for work, creativity, and entertainment.',
    shortDescription: '10.9" iPad with M1 chip and all-day battery',
    price: 599.99,
    category: 'electronics',
    subcategory: 'Tablets',
    brand: 'Apple',
    image: '/1.jpg',
    rating: 4.8,
    reviewCount: 945,
    stockQuantity: 56,
    isFeatured: true,
    tags: ['tablet', 'ipad', 'apple', 'm1-chip', '10.9-inch'],
    specifications: { 'Storage': '64GB', 'Display': '10.9" Liquid Retina', 'Chip': 'M1' },
    weight: 461,
    createdAt: '2024-01-18T00:00:00Z',
    updatedAt: '2024-01-18T00:00:00Z'
  },

  // More Fashion
  {
    id: 'adidas-ultraboost-22',
    name: 'Adidas Ultraboost 22 Running Shoes',
    slug: 'adidas-ultraboost-22-running-shoes',
    description: 'Revolutionary energy return with Boost midsole technology. Lightweight and responsive for the ultimate running experience.',
    shortDescription: 'Premium running shoes with Boost technology',
    price: 189.99,
    category: 'fashion',
    subcategory: 'Men',
    brand: 'Adidas',
    image: '/2.jpg',
    rating: 4.6,
    reviewCount: 1234,
    stockQuantity: 67,
    tags: ['shoes', 'running', 'adidas', 'ultraboost', 'athletic'],
    specifications: { 'Type': 'Running Shoes', 'Technology': 'Boost Midsole' },
    weight: 310,
    createdAt: '2023-11-10T00:00:00Z',
    updatedAt: '2023-11-10T00:00:00Z'
  },
  {
    id: 'h-m-basic-tee',
    name: 'H&M Basic Cotton T-Shirt - Women',
    slug: 'hm-basic-cotton-tshirt-women',
    description: 'Soft, comfortable cotton t-shirt perfect for everyday wear. Classic fit with a modern silhouette.',
    shortDescription: 'Soft cotton t-shirt for everyday wear',
    price: 19.99,
    category: 'fashion',
    subcategory: 'Women',
    brand: 'H&M',
    image: '/3.jpg',
    rating: 4.3,
    reviewCount: 2341,
    stockQuantity: 189,
    tags: ['t-shirt', 'cotton', 'basic', 'casual', 'everyday'],
    specifications: { 'Material': '100% Cotton', 'Fit': 'Classic' },
    weight: 150,
    createdAt: '2023-10-05T00:00:00Z',
    updatedAt: '2023-10-05T00:00:00Z'
  },

  // More Home & Garden
  {
    id: 'target-threshold-lamp',
    name: 'Target Threshold Table Lamp',
    slug: 'target-threshold-table-lamp',
    description: 'Modern table lamp with clean lines and adjustable brightness. Perfect for bedside tables or home office desks.',
    shortDescription: 'Modern table lamp with adjustable brightness',
    price: 49.99,
    category: 'home-garden',
    subcategory: 'Decor',
    brand: 'Target',
    image: '/1.jpg',
    rating: 4.4,
    reviewCount: 678,
    stockQuantity: 45,
    tags: ['lamp', 'table-lamp', 'decor', 'modern', 'adjustable'],
    specifications: { 'Type': 'Table Lamp', 'Bulb': 'LED Compatible' },
    weight: 1200,
    createdAt: '2023-12-10T00:00:00Z',
    updatedAt: '2023-12-10T00:00:00Z'
  },

  // More Sports & Outdoors
  {
    id: 'patagonia-down-jacket',
    name: 'Patagonia Down Sweater Jacket',
    slug: 'patagonia-down-sweater-jacket',
    description: 'Lightweight, warm, and packable down jacket perfect for outdoor adventures. Made with responsibly sourced down.',
    shortDescription: 'Lightweight down jacket for outdoor adventures',
    price: 199.99,
    category: 'sports-outdoors',
    subcategory: 'Outdoor',
    brand: 'Patagonia',
    image: '/2.jpg',
    rating: 4.8,
    reviewCount: 892,
    stockQuantity: 34,
    isFeatured: true,
    tags: ['jacket', 'down', 'outdoor', 'lightweight', 'warm'],
    specifications: { 'Fill': '800-fill Down', 'Weight': 'Lightweight' },
    weight: 400,
    createdAt: '2023-09-15T00:00:00Z',
    updatedAt: '2023-09-15T00:00:00Z'
  }
];

export const ALL_PRODUCTS = [...DUMMY_PRODUCTS, ...ADDITIONAL_PRODUCTS];

// Helper function to get products by category
export const getProductsByCategory = (category: string) => {
  return ALL_PRODUCTS.filter(product => product.category === category);
};

// Helper function to get featured products
export const getFeaturedProducts = () => {
  return ALL_PRODUCTS.filter(product => product.isFeatured);
};

// Helper function to get new products
export const getNewProducts = () => {
  return ALL_PRODUCTS.filter(product => product.isNew);
};

// Helper function to get products on sale
export const getProductsOnSale = () => {
  return ALL_PRODUCTS.filter(product => product.isOnSale);
};
