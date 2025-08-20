# 🛠️ Admin Dashboard - Complete Product Creation Guide

## 📋 Overview

This guide covers the admin dashboard functionality, specifically focusing on product creation and category management. The admin dashboard allows you to create, manage, and organize products in your e-commerce system.

## 🗂️ Database Tables Structure

### **Product Table Fields**

Based on the `Product` entity, here are all available fields for creating products:

#### **Required Fields (Must be filled)**
- `productName` - Product name (2-255 characters)
- `sku` - Stock Keeping Unit (unique identifier)
- `price` - Base price (positive number)
- `stockQuantity` - Available stock (integer)
- `category` - Product category (reference to Category table)

#### **Optional Fields**
- `shortDescription` - Brief product description
- `barcode` - Product barcode
- `compareAtPrice` - Original/compare price
- `costPrice` - Cost price for profit calculation
- `lowStockThreshold` - Low stock alert threshold (default: 5)
- `brand` - Product brand (reference to Brand table)
- `model` - Product model number
- `slug` - URL-friendly identifier (auto-generated if not provided)
- `isActive` - Product visibility (default: true)
- `isFeatured` - Featured product flag (default: false)
- `isBestseller` - Bestseller flag (default: false)
- `isNewArrival` - New arrival flag (default: false)
- `isOnSale` - Sale flag (default: false)
- `salePercentage` - Sale discount percentage
- `discount` - Associated discount (reference to Discount table)

#### **Related Data**
- `productDetail` - Detailed product information (one-to-one)
- `images` - Product images (one-to-many)
- `variants` - Product variants (one-to-many)
- `videos` - Product videos (one-to-many)
- `reviews` - Product reviews (one-to-many)

### **Category Table Fields**

#### **Required Fields**
- `name` - Category name (2-100 characters, unique)
- `slug` - URL-friendly identifier (auto-generated)

#### **Optional Fields**
- `description` - Category description (max 500 characters)
- `imageUrl` - Category image
- `parent` - Parent category (for hierarchical structure)
- `sortOrder` - Display order (default: 0)
- `isActive` - Category visibility (default: true)
- `isFeatured` - Featured category flag (default: false)
- `metaTitle` - SEO meta title
- `metaDescription` - SEO meta description
- `metaKeywords` - SEO meta keywords

## 🔧 Current Issues & Solutions

### **Issue 1: Categories Not Loading**

**Problem**: The admin dashboard cannot fetch categories from the backend.

**Root Cause**: 
1. Database seeder is disabled (no categories in database)
2. API endpoint mismatch
3. Authentication issues

**Solutions**:

#### **Solution A: Re-enable Database Seeder**
```bash
# 1. Edit DatabaseSeeder.java
cd Backend-service/src/main/java/com/ecommerce/config/

# 2. Uncomment the seeding code in the run() method
# 3. Restart the backend
cd Backend-service
./mvnw spring-boot:run
```

#### **Solution B: Create Categories Manually**
```sql
-- Connect to H2 Console: http://localhost:8081/h2-console
-- JDBC URL: jdbc:h2:file:./data/ecommerce
-- Username: sa
-- Password: (leave empty)

-- Insert sample categories
INSERT INTO categories (name, description, slug, is_active, is_featured, sort_order, created_at, updated_at) VALUES
('Electronics', 'Electronic devices and accessories', 'electronics', true, true, 1, NOW(), NOW()),
('Fashion', 'Clothing and fashion accessories', 'fashion', true, true, 2, NOW(), NOW()),
('Home & Garden', 'Home improvement and garden products', 'home-garden', true, false, 3, NOW(), NOW()),
('Sports & Outdoors', 'Sports equipment and outdoor gear', 'sports-outdoors', true, false, 4, NOW(), NOW()),
('Beauty & Health', 'Beauty products and health supplements', 'beauty-health', true, false, 5, NOW(), NOW());
```

#### **Solution C: Fix API Endpoint**
The current code uses `/api/categories` but the backend might expect `/api/v1/categories`. Update the productService:

```typescript
// In webfrontend/services/productService.ts
async getCategories(): Promise<Array<{id: number, name: string, slug: string}>> {
  try {
    // Try the correct endpoint
    const response = await api.get('/api/v1/categories');
    // ... rest of the code
  } catch (error) {
    // ... error handling
  }
}
```

## 🎯 Step-by-Step Product Creation Process

### **Step 1: Access Admin Dashboard**
1. Navigate to `http://localhost:3000/admin`
2. Login with admin credentials
3. Go to "Products" → "New Product"

### **Step 2: Fill Required Fields**
- **Product Name**: Enter a descriptive name (2-255 characters)
- **Base Price**: Enter the selling price (positive number)
- **Category**: Select from available categories (if none, create them first)

### **Step 3: Fill Optional Fields**
- **Description**: Detailed product description
- **SKU**: Stock Keeping Unit (auto-generated if not provided)
- **Sale Price**: Discounted price (optional)
- **Stock Quantity**: Available inventory (default: 0)
- **Brand**: Product brand (if available)
- **Slug**: URL-friendly identifier (auto-generated)

### **Step 4: Set Product Flags**
- **Active**: Make product visible to customers
- **Featured**: Highlight on homepage
- **New Arrival**: Mark as new product
- **On Sale**: Enable sale pricing

### **Step 5: Upload Images**
- Click "Choose Files" to select product images
- First image becomes the primary image
- Add alt text for accessibility

### **Step 6: Submit**
- Click "Create Product" to save
- Product will be created and you'll be redirected to products list

## 🧪 Testing Commands

### **Test Categories Availability**
```bash
cd webfrontend
node test-categories.js
```

### **Test Product Creation API**
```bash
# Test the product creation endpoint
curl -X POST http://localhost:8081/api/v1/products \
  -H "Content-Type: multipart/form-data" \
  -F "name=Test Product" \
  -F "description=Test description" \
  -F "basePrice=99.99" \
  -F "categoryId=1" \
  -F "stockQuantity=10"
```

## 🔍 Troubleshooting

### **Common Issues**

| Issue | Cause | Solution |
|-------|-------|----------|
| "Categories not found" | No categories in database | Re-enable seeder or create manually |
| "Category not found" | Invalid category ID | Check category exists in database |
| "Product creation failed" | Missing required fields | Fill all required fields |
| "Image upload failed" | File size/format issue | Check file size and format |
| "Authentication required" | Not logged in as admin | Login with admin credentials |

### **Debug Steps**

1. **Check Database Tables**:
   ```sql
   -- In H2 Console
   SELECT * FROM categories;
   SELECT * FROM products;
   ```

2. **Check API Endpoints**:
   ```bash
   # Test categories endpoint
   curl http://localhost:8081/api/categories
   
   # Test products endpoint
   curl http://localhost:8081/api/v1/products
   ```

3. **Check Browser Console**:
   - Open Developer Tools (F12)
   - Check Network tab for API calls
   - Check Console for error messages

## 📊 Expected Database State

### **After Successful Setup**

**Categories Table**:
```sql
SELECT id, name, slug, is_active FROM categories;
-- Should return 5+ categories
```

**Products Table**:
```sql
SELECT product_id, product_name, sku, price, category_id FROM products;
-- Should return created products
```

## 🚀 Next Steps

1. **Create Categories**: Use the seeder or manual SQL
2. **Test Product Creation**: Create a test product
3. **Add Images**: Test image upload functionality
4. **Create Variants**: Add product variants if needed
5. **Test Frontend**: Verify products appear on customer-facing pages

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify database connectivity
3. Check application logs
4. Test API endpoints directly
5. Ensure proper authentication

The admin dashboard should now be fully functional for product creation!
