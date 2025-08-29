"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiUpload, FiX, FiSave, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { productService, CreateProductData } from '../../../../services/productService';
import { mediaService } from '../../../../services/mediaService';

export default function NewProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [creationStartTime, setCreationStartTime] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [categories, setCategories] = useState<Array<{id: number, name: string, slug: string}>>([]);
  const [warehouses, setWarehouses] = useState<Array<{id: number, name: string, location: string}>>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    fullDescription: '',
    sku: '',
    basePrice: '',
    salePrice: '',
    costPrice: '',
    stockQuantity: '',
    lowStockThreshold: '',
    category: '',
    brandId: '',
    barcode: '',
    discountId: '',
    model: '',
    slug: '',
    isActive: true,
    isFeatured: false,
    isBestseller: false,
    isNewArrival: false,
    isOnSale: false,
    salePercentage: '',
    
    // Physical dimensions and weight
    heightCm: '',
    widthCm: '',
    lengthCm: '',
    weightKg: '',
    
    // Product specifications
    material: '',
    careInstructions: '',
    warrantyInfo: '',
    shippingInfo: '',
    returnPolicy: '',
    
    // SEO and meta information
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    searchKeywords: '',
    
    // Warehouse stock
    warehouseStock: [] as Array<{
      warehouseId: string;
      stockQuantity: string;
      lowStockThreshold: string;
      reorderPoint: string;
    }>,
    
    // Variants
    variants: [] as Array<{
      variantSku: string;
      price: string;
      stockQuantity: string;
      attributes: Record<string, string>;
      heightCm: string;
      widthCm: string;
      lengthCm: string;
      weightKg: string;
      material: string;
      color: string;
      size: string;
    }>,

    // Product Videos
    productVideos: '',
    videoMetadata: ''
  });



  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Load categories on component mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoadingData(true);
      setDataError(null);
      
      try {
        console.log('Loading categories and warehouses...');
        
        const [categoriesData, warehousesData] = await Promise.all([
          productService.getCategories(),
          productService.getWarehouses()
        ]);
        
        console.log('Categories loaded:', categoriesData);
        console.log('Warehouses loaded:', warehousesData);
        
        setCategories(categoriesData);
        setWarehouses(warehousesData);
        
        // If no categories loaded, set some defaults
        if (!categoriesData || categoriesData.length === 0) {
          console.warn('No categories loaded from API, setting defaults');
          setCategories([
            { id: 1, name: 'Electronics', slug: 'electronics' },
            { id: 2, name: 'Fashion', slug: 'fashion' },
            { id: 3, name: 'Home & Garden', slug: 'home-garden' },
            { id: 4, name: 'Sports & Outdoors', slug: 'sports-outdoors' },
            { id: 5, name: 'Beauty & Health', slug: 'beauty-health' }
          ]);
        }
        
      } catch (error) {
        console.error('Failed to load data:', error);
        setDataError('Failed to load categories and warehouses from server');
        
        // Set default categories on error
        console.warn('Setting default categories due to API error');
        setCategories([
          { id: 1, name: 'Electronics', slug: 'electronics' },
          { id: 2, name: 'Fashion', slug: 'fashion' },
          { id: 3, name: 'Home & Garden', slug: 'home-garden' },
          { id: 4, name: 'Sports & Outdoors', slug: 'sports-outdoors' },
          { id: 5, name: 'Beauty & Health', slug: 'beauty-health' }
        ]);
      } finally {
        setIsLoadingData(false);
      }
    };
    
    loadData();
  }, []);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        return !value || value.trim() === '' ? 'Product name is required' : '';
      case 'sku':
        if (!value || value.trim() === '') return 'SKU is required';
        if (value.trim().length < 3) return 'SKU must be at least 3 characters long';
        return '';
      case 'basePrice':
        if (!value || value.trim() === '') return 'Base price is required';
        if (parseFloat(value) <= 0) return 'Base price must be greater than 0';
        return '';
      case 'category':
        return !value || value.trim() === '' ? 'Category is required' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Validate field and update errors
      const error = validateField(name, value);
      setFieldErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files]);
    
    // Create preview URLs
    files.forEach(file => {
      const url = URL.createObjectURL(file);
      setImageUrls(prev => [...prev, url]);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  // Generate SKU from product name
  const generateSKU = (name: string): string => {
    const timestamp = Date.now().toString().slice(-6);
    const namePart = name.replace(/[^A-Z0-9]/gi, '').toUpperCase().slice(0, 6);
    return `${namePart}-${timestamp}`;
  };

        // Get category ID from selected category
      const getCategoryId = (categorySlug: string): number => {
        if (!categorySlug || categorySlug.trim() === '') {
          throw new Error('Category is required');
        }
        
        const category = categories.find(cat => cat.slug === categorySlug);
        if (!category) {
          console.error('Category not found for slug:', categorySlug);
          console.log('Available categories:', categories);
          throw new Error(`Category not found: ${categorySlug}`);
        }
        return category.id;
      };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setMessage(null);

    try {
      // Validate required fields using helper function
      const validationErrors = validateFormData();
      if (validationErrors.length > 0) {
        throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
      }

      // Set default values for optional fields
      const defaultStockQuantity = formData.stockQuantity ? parseInt(formData.stockQuantity) : 0;
      const defaultDescription = formData.description || `${formData.name} - Product description coming soon`;

      // Note: productData will be created after images are processed

      // 1) Upload media first to get URLs
      let uploadedImages: any[] = [];
      try {
        uploadedImages = images.length > 0 ? await mediaService.uploadImages(images) : [];
      } catch (e) {
        console.error('Bulk upload failed:', e);
        uploadedImages = [];
      }

      // Process uploaded images for multipart endpoint
      const processedImages = uploadedImages
        .map((resp, index) => ({
          url: (resp?.secureUrl || resp?.url || ''),
          altText: `${formData.name} - Image ${index + 1}`,
          isPrimary: index === 0,
          sortOrder: index
        }))
        .filter(img => !!img.url);

      // Prepare product data after images are processed
      const productData: CreateProductData = {
        name: formData.name,
        description: defaultDescription,
        sku: formData.sku.trim(), // Ensure SKU is a string and trimmed
        basePrice: parseFloat(formData.basePrice),
        salePrice: formData.salePrice ? parseFloat(formData.salePrice) : undefined,
        costPrice: formData.costPrice ? parseFloat(formData.costPrice) : undefined,
        stockQuantity: defaultStockQuantity,
        lowStockThreshold: formData.lowStockThreshold ? parseInt(formData.lowStockThreshold) : undefined,
        categoryId: getCategoryId(formData.category),
        brandId: formData.brandId || undefined,
        slug: formData.slug || undefined,
        isActive: formData.isActive,
        isFeatured: formData.isFeatured,
        isBestseller: formData.isBestseller,
        isNewArrival: formData.isNewArrival,
        isOnSale: formData.isOnSale,
        salePercentage: formData.salePercentage ? parseInt(formData.salePercentage) : undefined,
        fullDescription: formData.fullDescription || undefined,
        metaTitle: formData.metaTitle || undefined,
        metaDescription: formData.metaDescription || undefined,
        metaKeywords: formData.metaKeywords || undefined,
        searchKeywords: formData.searchKeywords || undefined,
        heightCm: formData.heightCm ? parseFloat(formData.heightCm) : undefined,
        widthCm: formData.widthCm ? parseFloat(formData.widthCm) : undefined,
        lengthCm: formData.lengthCm ? parseFloat(formData.lengthCm) : undefined,
        weightKg: formData.weightKg ? parseFloat(formData.weightKg) : undefined,
        material: formData.material || undefined,
        careInstructions: formData.careInstructions || undefined,
        warrantyInfo: formData.warrantyInfo || undefined,
        shippingInfo: formData.shippingInfo || undefined,
        returnPolicy: formData.returnPolicy || undefined,
        barcode: formData.barcode || undefined,
        discountId: formData.discountId || undefined,
        model: formData.model || undefined,
        variants: formData.variants.length > 0 ? formData.variants.map((variant, index) => ({
          variantSku: variant.variantSku || `${formData.sku || generateSKU(formData.name)}-VAR-${index + 1}`,
          price: variant.price ? parseFloat(variant.price) : parseFloat(formData.basePrice),
          stockQuantity: variant.stockQuantity ? parseInt(variant.stockQuantity) : 0,
          lowStockThreshold: 5,
          isActive: true,
          sortOrder: index + 1,
          attributes: {
            color: variant.color || 'Default',
            size: variant.size || 'Standard',
            material: variant.material || formData.material || 'Standard'
          },
          heightCm: variant.heightCm ? parseFloat(variant.heightCm) : formData.heightCm ? parseFloat(formData.heightCm) : undefined,
          widthCm: variant.widthCm ? parseFloat(variant.widthCm) : formData.widthCm ? parseFloat(formData.widthCm) : undefined,
          lengthCm: variant.lengthCm ? parseFloat(variant.lengthCm) : formData.lengthCm ? parseFloat(formData.lengthCm) : undefined,
          weightKg: variant.weightKg ? parseFloat(variant.weightKg) : formData.weightKg ? parseFloat(formData.weightKg) : undefined,
          material: variant.material || formData.material || undefined,
          color: variant.color || undefined,
          size: variant.size || undefined,
          isInStock: true,
          isBackorderable: false
        })) : undefined,
        // Add images as File objects for multipart endpoint
        productImages: images,
        imageMetadata: processedImages.map(img => ({
          altText: img.altText,
          isPrimary: img.isPrimary,
          sortOrder: img.sortOrder
        })),
        // videos and video metadata handled by separate upload flow
        productVideos: formData.productVideos ? [formData.productVideos] : undefined,
        videoMetadata: formData.productVideos || undefined
      };

      // Validate critical data types before sending
      console.log('Validating product data types...');
      if (typeof productData.categoryId !== 'number' || isNaN(productData.categoryId)) {
        throw new Error(`Invalid categoryId: ${productData.categoryId} (expected number)`);
      }
      if (typeof productData.basePrice !== 'number' || isNaN(productData.basePrice)) {
        throw new Error(`Invalid basePrice: ${productData.basePrice} (expected number)`);
      }
      if (typeof productData.stockQuantity !== 'number' || isNaN(productData.stockQuantity)) {
        throw new Error(`Invalid stockQuantity: ${productData.stockQuantity} (expected number)`);
      }
      if (typeof productData.sku !== 'string' || productData.sku.trim() === '') {
        throw new Error(`Invalid SKU: ${productData.sku} (expected non-empty string)`);
      }
      console.log('✅ Product data validation passed');

      // Debug logging - show exactly what we're sending
      console.log('=== PRODUCT CREATION DEBUG ===');
      console.log('Form Data:', formData);
      console.log('Processed Product Data:', productData);
      console.log('Images:', images);
      console.log('Uploaded Images:', uploadedImages);
      console.log('Processed Images:', processedImages);
      console.log('Warehouse Stock:', formData.warehouseStock);
      console.log('Variants:', formData.variants);
      console.log('=== END DEBUG ===');

      // Note: We're now using the multipart endpoint which handles the data structure automatically

      // 3) Create product via multipart endpoint (correct for backend API)
      const created = await productService.createProduct(productData);

      // Show success message
      setMessage({
        type: 'success',
        text: `Product "${formData.name}" created successfully! Redirecting to products list...`
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/admin/products');
      }, 2000);

    } catch (error: any) {
      console.error('Error creating product:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to create product. Please try again.'
      });
    } finally {
      setIsCreating(false);
    }
  };

  // Helper function to validate form data
  const validateFormData = () => {
    const errors: string[] = [];
    
    if (!formData.name || formData.name.trim() === '') {
      errors.push('Product name is required');
    }
    
    if (!formData.basePrice || parseFloat(formData.basePrice) <= 0) {
      errors.push('Base price is required and must be greater than 0');
    }
    
    if (!formData.category || formData.category.trim() === '') {
      errors.push('Category is required');
    }
    
    if (!formData.sku || formData.sku.trim() === '') {
      errors.push('SKU is required');
    } else if (formData.sku.trim().length < 3) {
      errors.push('SKU must be at least 3 characters long');
    }
    
    return errors;
  };

  // Check if form is valid for submission
  const isFormValid = () => {
    return validateFormData().length === 0;
  };

  const selectedCategory = categories.find(cat => cat.slug === formData.category);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="p-2 text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <FiArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">Add New Product</h1>
            <p className="text-neutral-600 dark:text-neutral-400 mt-1">Create a new product for your catalog</p>
          </div>
        </div>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div className={`p-4 rounded-lg flex items-center gap-2 ${
          message.type === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {message.type === 'success' ? (
            <FiCheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <FiAlertCircle className="h-5 w-5 text-red-600" />
          )}
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      {/* Progress Message */}
      {isCreating && (
        <div className="p-4 rounded-lg bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="font-medium">Creating product... This may take a few moments. Please don't close this page.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-xl shadow-soft border border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  fieldErrors.name ? 'border-red-500 focus:border-red-500' : 'border-neutral-300 focus:border-primary'
                }`}
                placeholder="Enter product name"
              />
              {fieldErrors.name && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Brand ID(Optional)
              </label>
              <input
                type="text"
                name="brandId"
                value={formData.brandId}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter brand ID "
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Barcode (Optional)
              </label>
              <input
                type="text"
                name="barcode"
                value={formData.barcode || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter barcode"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Discount ID (Optional)
              </label>
              <input
                type="text"
                name="discountId"
                value={formData.discountId || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter discount ID"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Model (Optional)
              </label>
              <input
                type="text"
                name="model"
                value={formData.model || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter model name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                disabled={isLoadingData}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  fieldErrors.category ? 'border-red-500 focus:border-red-500' : 'border-neutral-300 focus:border-primary'
                } ${isLoadingData ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <option value="">
                  {isLoadingData ? 'Loading categories...' : 'Select category'}
                </option>
                {categories.map(category => (
                  <option key={category.id} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
              {fieldErrors.category && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.category}</p>
              )}
              {dataError && (
                <div className="mt-2">
                  <p className="text-amber-600 text-sm mb-2">
                    ⚠️ {dataError} - Using default categories
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsLoadingData(true);
                      setDataError(null);
                      // Reload data
                      const loadData = async () => {
                        try {
                          const [categoriesData, warehousesData] = await Promise.all([
                            productService.getCategories(),
                            productService.getWarehouses()
                          ]);
                          setCategories(categoriesData);
                          setWarehouses(warehousesData);
                        } catch (error) {
                          console.error('Retry failed:', error);
                          setDataError('Retry failed - still using default categories');
                        } finally {
                          setIsLoadingData(false);
                        }
                      };
                      loadData();
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                    disabled={isLoadingData}
                  >
                    {isLoadingData ? 'Retrying...' : 'Retry loading categories'}
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                SKU *
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  fieldErrors.sku ? 'border-red-500 focus:border-red-500' : 'border-neutral-300 focus:border-primary'
                }`}
                placeholder="Enter unique product SKU"
              />
              {fieldErrors.sku && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.sku}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Base Price *
              </label>
              <input
                type="number"
                name="basePrice"
                value={formData.basePrice}
                onChange={handleInputChange}
                required
                step="0.01"
                min="0"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  fieldErrors.basePrice ? 'border-red-500 focus:border-red-500' : 'border-neutral-300 focus:border-primary'
                }`}
                placeholder="0.00"
              />
              {fieldErrors.basePrice && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.basePrice}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Sale Price
              </label>
              <input
                type="number"
                name="salePrice"
                value={formData.salePrice}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Cost Price
              </label>
              <input
                type="number"
                name="costPrice"
                value={formData.costPrice}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleInputChange}
                min="0"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="0 (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Low Stock Threshold
              </label>
              <input
                type="number"
                name="lowStockThreshold"
                value={formData.lowStockThreshold}
                onChange={handleInputChange}
                min="0"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="5 (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Sale Percentage
              </label>
              <input
                type="number"
                name="salePercentage"
                value={formData.salePercentage}
                onChange={handleInputChange}
                min="0"
                max="100"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="0 (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Slug
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="product-url-slug"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white p-6 rounded-xl shadow-soft border border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Description</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Product Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Detailed product description (optional)"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Full Description (SEO)
              </label>
              <textarea
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Extended product description for SEO (optional)"
              />
            </div>
          </div>
        </div>

        {/* Physical Specifications */}
        <div className="bg-white p-6 rounded-xl shadow-soft border border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Physical Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Height (cm)
              </label>
              <input
                type="number"
                name="heightCm"
                value={formData.heightCm}
                onChange={handleInputChange}
                step="0.1"
                min="0"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="0.0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Width (cm)
              </label>
              <input
                type="number"
                name="widthCm"
                value={formData.widthCm}
                onChange={handleInputChange}
                step="0.1"
                min="0"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="0.0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Length (cm)
              </label>
              <input
                type="number"
                name="lengthCm"
                value={formData.lengthCm}
                onChange={handleInputChange}
                step="0.1"
                min="0"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="0.0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                name="weightKg"
                value={formData.weightKg}
                onChange={handleInputChange}
                step="0.001"
                min="0"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="0.000"
              />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white p-6 rounded-xl shadow-soft border border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Product Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Material
              </label>
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="e.g., Aluminum, Plastic, Wood"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Care Instructions
              </label>
              <textarea
                name="careInstructions"
                value={formData.careInstructions}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Care and maintenance instructions"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Warranty Information
              </label>
              <textarea
                name="warrantyInfo"
                value={formData.warrantyInfo}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Warranty details and terms"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Shipping Information
              </label>
              <textarea
                name="shippingInfo"
                value={formData.shippingInfo}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Shipping details and restrictions"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Return Policy
              </label>
              <textarea
                name="returnPolicy"
                value={formData.returnPolicy}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Return policy and conditions"
              />
            </div>
          </div>
        </div>

        {/* SEO and Meta Information */}
        <div className="bg-white p-6 rounded-xl shadow-soft border border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">SEO & Meta Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Meta Title
              </label>
              <input
                type="text"
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleInputChange}
                maxLength={255}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="SEO meta title (optional)"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Meta Description
              </label>
              <textarea
                name="metaDescription"
                value={formData.metaDescription}
                onChange={handleInputChange}
                rows={3}
                maxLength={500}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="SEO meta description (optional)"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Meta Keywords
              </label>
              <input
                type="text"
                name="metaKeywords"
                value={formData.metaKeywords}
                onChange={handleInputChange}
                maxLength={500}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="SEO meta keywords (optional)"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Search Keywords
              </label>
              <input
                type="text"
                name="searchKeywords"
                value={formData.searchKeywords}
                onChange={handleInputChange}
                maxLength={500}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Search optimization keywords (optional)"
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white p-6 rounded-xl shadow-soft border border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Product Images</h2>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center">
              <FiUpload className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
              <p className="text-neutral-600 mb-2">Upload product images</p>
              <p className="text-sm text-neutral-500 mb-4">PNG, JPG up to 10MB each</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
              >
                Choose Files
              </label>
            </div>

            {/* Image Previews */}
            {imageUrls.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-error text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiX className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Warehouse Management */}
        <div className="bg-white p-6 rounded-xl shadow-soft border border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Warehouse Management</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-600">Assign stock to warehouses</p>
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    warehouseStock: [...prev.warehouseStock, {
                      warehouseId: '',
                      stockQuantity: '',
                      lowStockThreshold: '',
                      reorderPoint: ''
                    }]
                  }));
                }}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors text-sm"
              >
                Add Warehouse
              </button>
            </div>
            
            {formData.warehouseStock.map((warehouse, index) => (
              <div key={index} className="border border-neutral-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-neutral-800">Warehouse {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        warehouseStock: prev.warehouseStock.filter((_, i) => i !== index)
                      }));
                    }}
                    className="text-error hover:text-error-600 text-sm"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Warehouse
                    </label>
                    <select
                      value={warehouse.warehouseId}
                      onChange={(e) => {
                        const newWarehouseStock = [...formData.warehouseStock];
                        newWarehouseStock[index].warehouseId = e.target.value;
                        setFormData(prev => ({ ...prev, warehouseStock: newWarehouseStock }));
                      }}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="">Select warehouse</option>
                      {warehouses.map(w => (
                        <option key={w.id} value={w.id}>
                          {w.name} - {w.location}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      value={warehouse.stockQuantity}
                      onChange={(e) => {
                        const newWarehouseStock = [...formData.warehouseStock];
                        newWarehouseStock[index].stockQuantity = e.target.value;
                        setFormData(prev => ({ ...prev, warehouseStock: newWarehouseStock }));
                      }}
                      min="0"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Low Stock Threshold
                    </label>
                    <input
                      type="number"
                      value={warehouse.lowStockThreshold}
                      onChange={(e) => {
                        const newWarehouseStock = [...formData.warehouseStock];
                        newWarehouseStock[index].lowStockThreshold = e.target.value;
                        setFormData(prev => ({ ...prev, warehouseStock: newWarehouseStock }));
                      }}
                      min="0"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="10"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Reorder Point
                    </label>
                    <input
                      type="number"
                      value={warehouse.reorderPoint}
                      onChange={(e) => {
                        const newWarehouseStock = [...formData.warehouseStock];
                        newWarehouseStock[index].reorderPoint = e.target.value;
                        setFormData(prev => ({ ...prev, warehouseStock: newWarehouseStock }));
                      }}
                      min="0"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="20"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            {formData.warehouseStock.length === 0 && (
              <p className="text-sm text-neutral-500 text-center py-4">
                No warehouses assigned. Click "Add Warehouse" to assign stock.
              </p>
            )}
          </div>
        </div>

        {/* Product Variants */}
        <div className="bg-white p-6 rounded-xl shadow-soft border border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Product Variants</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-600">Create product variants with different attributes</p>
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    variants: [...prev.variants, {
                      variantSku: '',
                      price: '',
                      stockQuantity: '',
                      attributes: {},
                      heightCm: '',
                      widthCm: '',
                      lengthCm: '',
                      weightKg: '',
                      material: '',
                      color: '',
                      size: ''
                    }]
                  }));
                }}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors text-sm"
              >
                Add Variant
              </button>
            </div>
            
            {formData.variants.map((variant, index) => (
              <div key={index} className="border border-neutral-200 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-neutral-800">Variant {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        variants: prev.variants.filter((_, i) => i !== index)
                      }));
                    }}
                    className="text-error hover:text-error-600 text-sm"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Variant SKU
                    </label>
                    <input
                      type="text"
                      value={variant.variantSku}
                      onChange={(e) => {
                        const newVariants = [...formData.variants];
                        newVariants[index].variantSku = e.target.value;
                        setFormData(prev => ({ ...prev, variants: newVariants }));
                      }}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="VARIANT-SKU-001"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      value={variant.price}
                      onChange={(e) => {
                        const newVariants = [...formData.variants];
                        newVariants[index].price = e.target.value;
                        setFormData(prev => ({ ...prev, variants: newVariants }));
                      }}
                      step="0.01"
                      min="0"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      value={variant.stockQuantity}
                      onChange={(e) => {
                        const newVariants = [...formData.variants];
                        newVariants[index].stockQuantity = e.target.value;
                        setFormData(prev => ({ ...prev, variants: newVariants }));
                      }}
                      min="0"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Color
                    </label>
                    <input
                      type="text"
                      value={variant.color}
                      onChange={(e) => {
                        const newVariants = [...formData.variants];
                        newVariants[index].color = e.target.value;
                        setFormData(prev => ({ ...prev, variants: newVariants }));
                      }}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Red, Blue, Black"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Size
                    </label>
                    <input
                      type="text"
                      value={variant.size}
                      onChange={(e) => {
                        const newVariants = [...formData.variants];
                        newVariants[index].size = e.target.value;
                        setFormData(prev => ({ ...prev, variants: newVariants }));
                      }}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="S, M, L, XL"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Material
                    </label>
                    <input
                      type="text"
                      value={variant.material}
                      onChange={(e) => {
                        const newVariants = [...formData.variants];
                        newVariants[index].material = e.target.value;
                        setFormData(prev => ({ ...prev, variants: newVariants }));
                      }}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Cotton, Polyester"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      value={variant.heightCm}
                      onChange={(e) => {
                        const newVariants = [...formData.variants];
                        newVariants[index].heightCm = e.target.value;
                        setFormData(prev => ({ ...prev, variants: newVariants }));
                      }}
                      step="0.1"
                      min="0"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="0.0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Width (cm)
                    </label>
                    <input
                      type="number"
                      value={variant.widthCm}
                      onChange={(e) => {
                        const newVariants = [...formData.variants];
                        newVariants[index].widthCm = e.target.value;
                        setFormData(prev => ({ ...prev, variants: newVariants }));
                      }}
                      step="0.1"
                      min="0"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="0.0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Length (cm)
                    </label>
                    <input
                      type="number"
                      value={variant.lengthCm}
                      onChange={(e) => {
                        const newVariants = [...formData.variants];
                        newVariants[index].lengthCm = e.target.value;
                        setFormData(prev => ({ ...prev, variants: newVariants }));
                      }}
                      step="0.1"
                      min="0"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="0.0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      value={variant.weightKg}
                      onChange={(e) => {
                        const newVariants = [...formData.variants];
                        newVariants[index].weightKg = e.target.value;
                        setFormData(prev => ({ ...prev, variants: newVariants }));
                      }}
                      step="0.001"
                      min="0"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="0.000"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            {formData.variants.length === 0 && (
              <p className="text-sm text-neutral-500 text-center py-4">
                No variants created. Click "Add Variant" to create product variations.
              </p>
            )}
          </div>
        </div>

        {/* Product Status */}
        <div className="bg-white p-6 rounded-xl shadow-soft border border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Product Status</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isNewArrival"
                checked={formData.isNewArrival}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary"
              />
              <span className="text-sm font-medium text-neutral-700">Mark as New Arrival</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isOnSale"
                checked={formData.isOnSale}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary"
              />
              <span className="text-sm font-medium text-neutral-700">Mark as On Sale</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary"
              />
              <span className="text-sm font-medium text-neutral-700">Mark as Featured</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isBestseller"
                checked={formData.isBestseller || false}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary"
              />
              <span className="text-sm font-medium text-neutral-700">Mark as Bestseller</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary"
              />
              <span className="text-sm font-medium text-neutral-700">Product is Active</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-neutral-600">
            {!isFormValid() && (
              <div className="flex items-center gap-2 text-amber-600">
                <FiAlertCircle className="h-4 w-4" />
                <span>Please fill in all required fields to continue</span>
              </div>
            )}
            {isFormValid() && (
              <div className="flex items-center gap-2 text-green-600">
                <FiCheckCircle className="h-4 w-4" />
                <span>All required fields are filled</span>
              </div>
            )}
            {isFormValid() && (
              <div className="flex items-center gap-2 text-blue-600 mt-2">
                <FiAlertCircle className="h-4 w-4" />
                <span>Note: Product creation may take up to 60 seconds</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <Link
              href="/admin/products"
              className="px-6 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              Cancel
            </Link>
          <button
            type="submit"
            disabled={isCreating || !isFormValid()}
            className="bg-primary hover:bg-primary-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            {isCreating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating Product...
              </>
            ) : (
              <>
                <FiSave className="h-4 w-4" />
                Create Product
              </>
            )}
          </button>
        </div>
      </div>
      </form>
    </div>
  );
}
