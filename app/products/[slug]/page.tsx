"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { FiStar, FiTruck, FiShield, FiRefreshCw } from "react-icons/fi";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { getProductBySlug } from "../../../services/productService";
import { useCartStore } from "../../../features/cart/store";
import { useWishlistStore } from "../../../features/wishlist/store";
import { Product } from "../../../types/product";
import { formatPrice } from "../../../lib/formatPrice";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const addToCart = useCartStore((s) => s.addItem);
  const addToWishlist = useWishlistStore((s) => s.addItem);
  const removeFromWishlist = useWishlistStore((s) => s.removeItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const productData = await getProductBySlug(slug);
        if (!productData) {
          notFound();
        }
        setProduct(productData);
      } catch (error) {
        console.error("Failed to load product:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || "",
        quantity,
      });
    }
  };

  const handleWishlistToggle = () => {
    if (product) {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-200 rounded-lg h-96"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return notFound();
  }

  const mockImages = [
    product.image || "https://via.placeholder.com/600x600?text=Product+Image",
    "https://via.placeholder.com/600x600?text=Product+Image+2",
    "https://via.placeholder.com/600x600?text=Product+Image+3",
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumbs 
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.name, href: `/products/${product.slug}` }
        ]} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={mockImages[selectedImage]}
              alt={product.name}
              className="h-full w-full object-cover"
              width={100}
              height={100}
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {mockImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded-lg border-2 ${
                  selectedImage === index ? "border-primary" : "border-gray-200"
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="h-full w-full object-cover"
                  width={100}
                  height={100}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {product.name}
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`h-4 w-4 ${
                      i < (product.rating || 0)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {formatPrice(product.price)}
          </div>

          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              This is a high-quality product that offers excellent value for money. 
              Perfect for everyday use with durable construction and modern design.
            </p>

            {/* Product Features */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <FiTruck className="h-4 w-4" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <FiShield className="h-4 w-4" />
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <FiRefreshCw className="h-4 w-4" />
                <span>Easy returns and exchanges</span>
              </div>
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Quantity:
              </label>
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  -
                </button>
                <span className="px-3 py-1 border-x">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-white py-3 px-6 rounded-md hover:bg-primary/90 transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`p-3 rounded-md border transition-colors ${
                  isInWishlist(product.id)
                    ? "border-primary text-primary"
                    : "border-gray-300 text-gray-600 hover:border-gray-400"
                }`}
              >
                <FiStar className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Product Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Product Variants
              </h3>
              <div className="space-y-3">
                {product.variants.map((variant) => (
                  <div key={variant.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {variant.attributes.map(attr => `${attr.name}: ${attr.value}`).join(' - ')}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">SKU: {variant.sku}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {variant.originalPrice && variant.originalPrice > variant.price ? (
                            <>
                              <span className="line-through text-gray-500 mr-2">
                                ${variant.originalPrice.toFixed(2)}
                              </span>
                              ${variant.price.toFixed(2)}
                            </>
                          ) : (
                            `$${variant.price.toFixed(2)}`
                          )}
                        </p>
                        <p className={`text-sm ${variant.availableQuantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {variant.availableQuantity > 0 ? `${variant.availableQuantity} in stock` : 'Out of stock'}
                        </p>
                      </div>
                    </div>
                    {variant.images && variant.images.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {variant.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Variant ${index + 1}`}
                            className="w-12 h-12 object-cover rounded border"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warehouse Information */}
          {product.warehouseInfo && product.warehouseInfo.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Warehouse Locations
              </h3>
              <div className="space-y-3">
                {product.warehouseInfo.map((warehouse) => (
                  <div key={warehouse.warehouseId} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {warehouse.warehouseName}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {warehouse.location} • Code: {warehouse.warehouseCode}
                        </p>
                        {warehouse.lastRestocked && (
                          <p className="text-xs text-gray-500">
                            Last restocked: {new Date(warehouse.lastRestocked).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${warehouse.availableQuantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {warehouse.availableQuantity} available
                        </p>
                        <p className="text-xs text-gray-500">
                          Total: {warehouse.stockQuantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Product Details */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Product Details
            </h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex justify-between">
                <span>Category:</span>
                <span>{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span>Brand:</span>
                <span>{product.brand}</span>
              </div>
              <div className="flex justify-between">
                <span>Availability:</span>
                <span className={`${product.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
