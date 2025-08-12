// Ecommerce Platform Constants

// Product Categories
export const PRODUCT_CATEGORIES = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Latest gadgets and electronic devices',
    icon: 'FiSmartphone',
    featured: true,
    subcategories: ['Smartphones', 'Laptops', 'Tablets', 'Audio & Headphones', 'Cameras', 'Gaming', 'Smart Home', 'Wearables']
  },
  {
    id: 'fashion',
    name: 'Fashion & Apparel',
    description: 'Trendy clothing and accessories',
    icon: 'FiShoppingBag',
    featured: true,
    subcategories: ['Men\'s Clothing', 'Women\'s Clothing', 'Kids & Baby', 'Shoes & Sneakers', 'Bags & Wallets', 'Jewelry & Watches', 'Accessories', 'Sportswear']
  },
  {
    id: 'home-garden',
    name: 'Home & Garden',
    description: 'Everything for your home and outdoor space',
    icon: 'FiHome',
    featured: true,
    subcategories: ['Furniture', 'Home Decor', 'Kitchen & Dining', 'Garden & Outdoor', 'Tools & Hardware', 'Lighting', 'Bedding', 'Bath']
  },
  {
    id: 'sports-outdoors',
    name: 'Sports & Outdoors',
    description: 'Equipment and gear for active lifestyles',
    icon: 'FiActivity',
    featured: true,
    subcategories: ['Fitness & Exercise', 'Running & Walking', 'Cycling', 'Camping & Hiking', 'Swimming', 'Team Sports', 'Yoga & Pilates', 'Fishing & Hunting']
  },
  {
    id: 'beauty-health',
    name: 'Beauty & Health',
    description: 'Personal care and wellness products',
    icon: 'FiHeart',
    featured: true,
    subcategories: ['Skincare', 'Makeup', 'Haircare', 'Fragrances', 'Vitamins & Supplements', 'Personal Care', 'Health & Wellness', 'Men\'s Grooming']
  },
  {
    id: 'automotive',
    name: 'Automotive',
    description: 'Car accessories and maintenance',
    icon: 'FiTruck',
    featured: false,
    subcategories: ['Car Accessories', 'Car Care', 'Motorcycle Gear', 'Truck Parts', 'RV & Camping', 'Tools & Equipment']
  },
  {
    id: 'toys-games',
    name: 'Toys & Games',
    description: 'Fun for all ages',
    icon: 'FiSmile',
    featured: false,
    subcategories: ['Action Figures', 'Board Games', 'Building Sets', 'Educational Toys', 'Outdoor Toys', 'Video Games', 'Arts & Crafts', 'Collectibles']
  },
  {
    id: 'books-media',
    name: 'Books & Media',
    description: 'Books, movies, music and more',
    icon: 'FiBook',
    featured: false,
    subcategories: ['Fiction', 'Non-Fiction', 'Academic & Textbooks', 'Children\'s Books', 'Audio Books', 'E-books', 'Movies & TV', 'Music & Vinyl']
  },
  {
    id: 'pet-supplies',
    name: 'Pet Supplies',
    description: 'Everything for your furry friends',
    icon: 'FiHeart',
    featured: false,
    subcategories: ['Dog Supplies', 'Cat Supplies', 'Fish & Aquarium', 'Bird Supplies', 'Small Pets', 'Pet Health', 'Pet Toys', 'Pet Food']
  },
  {
    id: 'office-supplies',
    name: 'Office & Business',
    description: 'Professional and office essentials',
    icon: 'FiBriefcase',
    featured: false,
    subcategories: ['Office Furniture', 'Paper & Notebooks', 'Writing Supplies', 'Technology', 'Organization', 'Business Cards', 'Printing', 'Shipping Supplies']
  }
];

// Shipping Options
export const SHIPPING_OPTIONS = [
  {
    id: 'free',
    name: 'Free Shipping',
    price: 0,
    description: '5-7 business days',
    minOrder: 50,
    popular: true
  },
  {
    id: 'standard',
    name: 'Standard Shipping',
    price: 5.99,
    description: '3-5 business days',
    minOrder: 0,
    popular: false
  },
  {
    id: 'express',
    name: 'Express Shipping',
    price: 12.99,
    description: '1-2 business days',
    minOrder: 0,
    popular: false
  },
  {
    id: 'overnight',
    name: 'Overnight Shipping',
    price: 24.99,
    description: 'Next business day',
    minOrder: 0,
    popular: false
  }
];

// Payment Methods
export const PAYMENT_METHODS = [
  {
    id: 'credit-card',
    name: 'Credit Card',
    description: 'Visa, Mastercard, American Express',
    icon: '💳',
    popular: true
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Fast and secure online payments',
    icon: '🔒',
    popular: true
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    description: 'Quick and easy mobile payments',
    icon: '🍎',
    popular: false
  },
  {
    id: 'google-pay',
    name: 'Google Pay',
    description: 'Contactless payments',
    icon: '🤖',
    popular: false
  }
];

// Trust Indicators
export const TRUST_INDICATORS = [
  {
    id: 'secure',
    name: 'Secure Shopping',
    description: '256-bit SSL encryption',
    icon: '🔒'
  },
  {
    id: 'returns',
    name: '30-Day Returns',
    description: 'Hassle-free returns',
    icon: '↩️'
  },
  {
    id: 'support',
    name: '24/7 Support',
    description: 'Always here to help',
    icon: '💬'
  },
  {
    id: 'quality',
    name: 'Quality Guarantee',
    description: '100% satisfaction',
    icon: '✅'
  }
];

// Social Media Links
export const SOCIAL_LINKS = [
  { name: 'Facebook', url: '#', icon: '📘' },
  { name: 'Twitter', url: '#', icon: '🐦' },
  { name: 'Instagram', url: '#', icon: '📷' },
  { name: 'YouTube', url: '#', icon: '📺' },
  { name: 'LinkedIn', url: '#', icon: '💼' }
];

// Footer Links
export const FOOTER_LINKS = {
  company: [
    { name: 'About Us', url: '/about' },
    { name: 'Careers', url: '/careers' },
    { name: 'Press', url: '/press' },
    { name: 'Blog', url: '/blog' }
  ],
  support: [
    { name: 'Help Center', url: '/help' },
    { name: 'Contact Us', url: '/contact' },
    { name: 'Returns', url: '/returns' },
    { name: 'Size Guide', url: '/size-guide' }
  ],
  legal: [
    { name: 'Privacy Policy', url: '/privacy' },
    { name: 'Terms of Service', url: '/terms' },
    { name: 'Cookie Policy', url: '/cookies' },
    { name: 'Accessibility', url: '/accessibility' }
  ],
  business: [
    { name: 'Sell on Now Store', url: '/sell' },
    { name: 'Become an Affiliate', url: '/affiliate' },
    { name: 'Advertise Your Products', url: '/advertise' },
    { name: 'Bulk Orders', url: '/bulk-orders' }
  ]
};

// Site Configuration
export const SITE_CONFIG = {
  name: 'Now Store',
  tagline: 'Premium E-commerce Experience',
  domain: 'nowstore.com',
  email: 'support@nowstore.com',
  phone: '+1 (555) 123-4567',
  address: '123 Commerce St, Business City, BC 12345',
  businessHours: 'Monday - Friday: 9:00 AM - 6:00 PM EST',
  currency: 'USD',
  currencySymbol: '$',
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'es', 'fr'],
  maxWishlistItems: 100,
  maxCartItems: 50,
  minOrderAmount: 10,
  freeShippingThreshold: 50
};

// Product Filters
export const PRODUCT_FILTERS = {
  priceRanges: [
    { label: 'Under $25', value: '0-25' },
    { label: '$25 - $50', value: '25-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: '$100 - $200', value: '100-200' },
    { label: 'Over $200', value: '200+' }
  ],
  ratings: [
    { label: '4★ & up', value: '4' },
    { label: '3★ & up', value: '3' },
    { label: '2★ & up', value: '2' },
    { label: '1★ & up', value: '1' }
  ],
  availability: [
    { label: 'In Stock', value: 'in-stock' },
    { label: 'Out of Stock', value: 'out-of-stock' },
    { label: 'Pre-order', value: 'pre-order' }
  ],
  condition: [
    { label: 'New', value: 'new' },
    { label: 'Used - Like New', value: 'used-like-new' },
    { label: 'Used - Good', value: 'used-good' },
    { label: 'Used - Acceptable', value: 'used-acceptable' }
  ]
};

// Sort Options
export const SORT_OPTIONS = [
  { label: 'Best Match', value: 'best-match' },
  { label: 'Price: Low to High', value: 'price-low-high' },
  { label: 'Price: High to Low', value: 'price-high-low' },
  { label: 'Customer Rating', value: 'rating' },
  { label: 'Newest Arrivals', value: 'newest' },
  { label: 'Best Sellers', value: 'best-sellers' },
  { label: 'Most Popular', value: 'most-popular' }
];

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  RETURNED: 'returned'
};

// Order Status Labels
export const ORDER_STATUS_LABELS = {
  pending: 'Order Pending',
  confirmed: 'Order Confirmed',
  processing: 'Processing Order',
  shipped: 'Order Shipped',
  delivered: 'Order Delivered',
  cancelled: 'Order Cancelled',
  returned: 'Order Returned'
};

// Order Status Colors
export const ORDER_STATUS_COLORS = {
  pending: 'warning',
  confirmed: 'primary',
  processing: 'primary',
  shipped: 'shipping',
  delivered: 'success',
  cancelled: 'error',
  returned: 'error'
};
