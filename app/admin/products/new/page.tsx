"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiUpload, FiX, FiSave } from 'react-icons/fi';

export default function NewProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    subcategory: '',
    brand: '',
    stockQuantity: '',
    rating: '',
    reviewCount: '',
    tags: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    isNew: false,
    isOnSale: false,
    isFeatured: false,
  });

  const [variants, setVariants] = useState<Array<{
    id: string;
    sku: string;
    price: string;
    originalPrice: string;
    stockQuantity: string;
    attributes: Array<{ type: string; name: string; value: string }>;
    warehouseAssignments: Array<{ warehouseId: string; quantity: string }>;
  }>>([]);

  const [warehouses, setWarehouses] = useState<Array<{
    id: string;
    name: string;
    code: string;
    location: string;
  }>>([
    { id: '1', name: 'Main Warehouse', code: 'WH-MAIN-001', location: 'New York, NY' },
    { id: '2', name: 'West Coast Hub', code: 'WH-WEST-002', location: 'Los Angeles, CA' },
    { id: '3', name: 'Central Distribution', code: 'WH-CENT-003', location: 'Chicago, IL' },
  ]);

  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const categories = [
    { value: 'electronics', label: 'Electronics', subcategories: ['Smartphones', 'Laptops', 'Audio', 'Tablets', 'Accessories'] },
    { value: 'fashion', label: 'Fashion', subcategories: ['Men', 'Women', 'Kids', 'Accessories'] },
    { value: 'home-garden', label: 'Home & Garden', subcategories: ['Furniture', 'Decor', 'Kitchen', 'Garden'] },
    { value: 'sports-outdoors', label: 'Sports & Outdoors', subcategories: ['Fitness', 'Outdoor', 'Team Sports', 'Camping'] },
    { value: 'beauty-health', label: 'Beauty & Health', subcategories: ['Skincare', 'Makeup', 'Haircare', 'Wellness'] },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
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

  // Variant management functions
  const addVariant = () => {
    const newVariant = {
      id: Date.now().toString(),
      sku: '',
      price: '',
      originalPrice: '',
      stockQuantity: '',
      attributes: [],
      warehouseAssignments: []
    };
    setVariants(prev => [...prev, newVariant]);
  };

  const removeVariant = (index: number) => {
    setVariants(prev => prev.filter((_, i) => i !== index));
  };

  const updateVariant = (index: number, field: string, value: string) => {
    setVariants(prev => prev.map((variant, i) => 
      i === index ? { ...variant, [field]: value } : variant
    ));
  };

  const addVariantAttribute = (variantIndex: number) => {
    setVariants(prev => prev.map((variant, i) => 
      i === variantIndex 
        ? { ...variant, attributes: [...variant.attributes, { type: '', name: '', value: '' }] }
        : variant
    ));
  };

  const removeVariantAttribute = (variantIndex: number, attrIndex: number) => {
    setVariants(prev => prev.map((variant, i) => 
      i === variantIndex 
        ? { ...variant, attributes: variant.attributes.filter((_, j) => j !== attrIndex) }
        : variant
    ));
  };

  const updateVariantAttribute = (variantIndex: number, attrIndex: number, field: string, value: string) => {
    setVariants(prev => prev.map((variant, i) => 
      i === variantIndex 
        ? {
            ...variant,
            attributes: variant.attributes.map((attr, j) => 
              j === attrIndex ? { ...attr, [field]: value } : attr
            )
          }
        : variant
    ));
  };

  const addWarehouseAssignment = (variantIndex: number) => {
    setVariants(prev => prev.map((variant, i) => 
      i === variantIndex 
        ? { ...variant, warehouseAssignments: [...variant.warehouseAssignments, { warehouseId: '', quantity: '' }] }
        : variant
    ));
  };

  const removeWarehouseAssignment = (variantIndex: number, assignmentIndex: number) => {
    setVariants(prev => prev.map((variant, i) => 
      i === variantIndex 
        ? { ...variant, warehouseAssignments: variant.warehouseAssignments.filter((_, j) => j !== assignmentIndex) }
        : variant
    ));
  };

  const updateWarehouseAssignment = (variantIndex: number, assignmentIndex: number, field: string, value: string) => {
    setVariants(prev => prev.map((variant, i) => 
      i === variantIndex 
        ? {
            ...variant,
            warehouseAssignments: variant.warehouseAssignments.map((assignment, j) => 
              j === assignmentIndex ? { ...assignment, [field]: value } : assignment
            )
          }
        : variant
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would typically upload images to your storage service
      // and then create the product in your database
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to products list
      router.push('/admin/products');
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedCategory = categories.find(cat => cat.value === formData.category);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <FiArrowLeft className="h-5 w-5 text-neutral-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-neutral-800">Add New Product</h1>
            <p className="text-neutral-600 mt-1">Create a new product for your store</p>
          </div>
        </div>
      </div>

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
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Brand *
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter brand name"
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
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">Select category</option>
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Subcategory
              </label>
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">Select subcategory</option>
                {selectedCategory?.subcategories.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Price *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                step="0.01"
                min="0"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Original Price
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Stock Quantity *
              </label>
              <input
                type="number"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="tag1, tag2, tag3"
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
                Short Description *
              </label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Brief product description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Full Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Detailed product description"
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

        {/* Product Variants */}
        <div className="bg-white p-6 rounded-xl shadow-soft border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-neutral-800">Product Variants</h2>
            <button
              type="button"
              onClick={() => addVariant()}
              className="bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Add Variant
            </button>
          </div>
          
          {variants.length === 0 ? (
            <p className="text-neutral-500 text-center py-8">No variants added yet. Click "Add Variant" to create product variations.</p>
          ) : (
            <div className="space-y-4">
              {variants.map((variant, index) => (
                <div key={variant.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-neutral-800">Variant {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeVariant(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">SKU</label>
                      <input
                        type="text"
                        value={variant.sku}
                        onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Variant SKU"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Price</label>
                      <input
                        type="number"
                        step="0.01"
                        value={variant.price}
                        onChange={(e) => updateVariant(index, 'price', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Original Price</label>
                      <input
                        type="number"
                        step="0.01"
                        value={variant.originalPrice}
                        onChange={(e) => updateVariant(index, 'originalPrice', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  {/* Variant Attributes */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Attributes</label>
                    <div className="space-y-2">
                      {variant.attributes.map((attr, attrIndex) => (
                        <div key={attrIndex} className="flex gap-2">
                          <input
                            type="text"
                            value={attr.type}
                            onChange={(e) => updateVariantAttribute(index, attrIndex, 'type', e.target.value)}
                            className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Type (e.g., Color, Size)"
                          />
                          <input
                            type="text"
                            value={attr.name}
                            onChange={(e) => updateVariantAttribute(index, attrIndex, 'name', e.target.value)}
                            className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Name (e.g., Red, Large)"
                          />
                          <input
                            type="text"
                            value={attr.value}
                            onChange={(e) => updateVariantAttribute(index, attrIndex, 'value', e.target.value)}
                            className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Value"
                          />
                          <button
                            type="button"
                            onClick={() => removeVariantAttribute(index, attrIndex)}
                            className="px-3 py-2 text-red-600 hover:text-red-800 border border-red-300 rounded-lg"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addVariantAttribute(index)}
                        className="text-primary hover:text-primary-600 text-sm"
                      >
                        + Add Attribute
                      </button>
                    </div>
                  </div>

                  {/* Warehouse Assignments */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Warehouse Stock</label>
                    <div className="space-y-2">
                      {variant.warehouseAssignments.map((assignment, assignmentIndex) => (
                        <div key={assignmentIndex} className="flex gap-2">
                          <select
                            value={assignment.warehouseId}
                            onChange={(e) => updateWarehouseAssignment(index, assignmentIndex, 'warehouseId', e.target.value)}
                            className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="">Select Warehouse</option>
                            {warehouses.map(warehouse => (
                              <option key={warehouse.id} value={warehouse.id}>
                                {warehouse.name} - {warehouse.location}
                              </option>
                            ))}
                          </select>
                          <input
                            type="number"
                            value={assignment.quantity}
                            onChange={(e) => updateWarehouseAssignment(index, assignmentIndex, 'quantity', e.target.value)}
                            className="w-32 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Quantity"
                          />
                          <button
                            type="button"
                            onClick={() => removeWarehouseAssignment(index, assignmentIndex)}
                            className="px-3 py-2 text-red-600 hover:text-red-800 border border-red-300 rounded-lg"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addWarehouseAssignment(index)}
                        className="text-primary hover:text-primary-600 text-sm"
                      >
                        + Add Warehouse
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Status */}
        <div className="bg-white p-6 rounded-xl shadow-soft border border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Product Status</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isNew"
                checked={formData.isNew}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary"
              />
              <span className="text-sm font-medium text-neutral-700">Mark as New Product</span>
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
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/admin/products"
            className="px-6 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary hover:bg-primary-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating...
              </>
            ) : (
              <>
                <FiSave className="h-4 w-4" />
                Create Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
