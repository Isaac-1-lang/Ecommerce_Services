"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { FiStar, FiTruck, FiShield, FiRefreshCw } from "react-icons/fi";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { getProductBySlug, getProductById } from "../../../services/productService";
import { useCartStore } from "../../../features/cart/store";
import { useWishlistStore } from "../../../features/wishlist/store";
import { Product } from "../../../types/product";
import { formatPrice } from "../../../lib/formatPrice";
import { useParams } from "next/navigation";
import Image from "next/image";
import ProductReviews from "../../../components/ProductReviews";
import ReviewForm from "../../../components/ReviewForm";
import { useAuth } from "../../../hooks/useAuth";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [reviewsRefresh, setReviewsRefresh] = useState(0);
  const { user } = useAuth();

  const addToCart = useCartStore((s) => s.addItem);
  const addToWishlist = useWishlistStore((s) => s.addItem);
  const removeFromWishlist = useWishlistStore((s) => s.removeItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        console.log('Loading product with identifier:', slug);
        
        // Check if the slug looks like a UUID (product ID)
        const cleaned = slug?.startsWith('product-') ? slug.replace(/^product-/, '') : slug;
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cleaned);
        
        let productData;
        if (isUUID) {
          console.log('Identifier looks like UUID, calling getProductById with', cleaned);
          productData = await getProductById(cleaned);
        } else {
          console.log('Identifier looks like slug, calling getProductBySlug');
          productData = await getProductBySlug(cleaned);
        }
        
        if (!productData) {
          console.log('Product not found');
          notFound();
        }
        
        console.log('Product loaded successfully:', productData);
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
      // Extract image URL from primaryImage or fallback to image field
      const imageUrl = product.primaryImage?.imageUrl || 
        (typeof product.image === 'string' ? product.image : product.image?.imageUrl) || "";
      
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: imageUrl,
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
    product.primaryImage?.imageUrl || product.image || "https://via.placeholder.com/600x600?text=Product+Image",
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
            {product.primaryImage && product.primaryImage.imageUrl ? (
              <Image
                src={product.primaryImage.imageUrl}
                alt={product.primaryImage.altText || product.name}
                className="h-full w-full object-cover"
                width={400}
                height={400}
                onError={() => console.error(`Failed to load image for ${product.name}`)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No image available
              </div>
            )}
          </div>
          {/* Product variants or additional images could go here */}
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
                        {variant.images
                          .filter((image) => typeof image === 'string' && image.trim().length > 0)
                          .map((image, index) => (
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

      {/* Reviews Section */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ProductReviews productId={product.id} refreshToken={reviewsRefresh} />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Write a review</h3>
            {user ? (
              <ReviewForm productId={product.id} onSubmitted={() => setReviewsRefresh(Date.now())} />
            ) : (
              <p className="text-sm text-gray-600">Please log in to write a review.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
