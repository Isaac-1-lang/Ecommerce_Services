"use client";

import { useState, useEffect } from 'react';
import { FiTag, FiClock, FiPercent, FiGift } from 'react-icons/fi';
import { discountService, DiscountDTO } from '../services/discountService';
import Link from 'next/link';

export default function DiscountBanner() {
  const [discounts, setDiscounts] = useState<DiscountDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDiscountIndex, setCurrentDiscountIndex] = useState(0);

  useEffect(() => {
    const loadDiscounts = async () => {
      try {
        const activeDiscounts = await discountService.getActiveDiscounts();
        setDiscounts(activeDiscounts);
      } catch (error) {
        console.error('Failed to load discounts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDiscounts();
  }, []);

  useEffect(() => {
    if (discounts.length > 1) {
      const interval = setInterval(() => {
        setCurrentDiscountIndex((prev) => (prev + 1) % discounts.length);
      }, 5000); // Change discount every 5 seconds

      return () => clearInterval(interval);
    }
  }, [discounts.length]);

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-primary to-primary/90 text-white py-3">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-4 bg-primary/60 rounded w-1/3 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (discounts.length === 0) {
    return null; // Don't show banner if no discounts
  }

  const currentDiscount = discounts[currentDiscountIndex];

  const getDiscountIcon = (type: string) => {
    switch (type) {
      case 'PERCENTAGE':
        return <FiPercent className="h-4 w-4" />;
      case 'FIXED_AMOUNT':
        return <FiTag className="h-4 w-4" />;
      case 'FREE_SHIPPING':
        return <FiGift className="h-4 w-4" />;
      default:
        return <FiTag className="h-4 w-4" />;
    }
  };

  const getDiscountText = (discount: DiscountDTO) => {
    switch (discount.discountType) {
      case 'PERCENTAGE':
        return `${discount.percentage}% OFF`;
      case 'FIXED_AMOUNT':
        return `$${discount.percentage} OFF`;
      case 'FREE_SHIPPING':
        return 'FREE SHIPPING';
      default:
        return `${discount.percentage}% OFF`;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-gradient-to-r from-primary to-primary/90 text-white py-3 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center gap-3">
          {/* Discount Icon */}
          <div className="flex items-center gap-2">
            {getDiscountIcon(currentDiscount.discountType)}
            <span className="font-semibold text-sm">
              {getDiscountText(currentDiscount)}
            </span>
          </div>

          {/* Discount Description */}
          <div className="hidden sm:block text-center flex-1">
            <p className="text-sm font-medium">
              {currentDiscount.description || currentDiscount.name}
            </p>
            {currentDiscount.minimumAmount && (
              <p className="text-xs opacity-90">
                Min. order: ${currentDiscount.minimumAmount}
              </p>
            )}
          </div>

          {/* Expiry Info */}
          {currentDiscount.endDate && (
            <div className="flex items-center gap-1 text-xs opacity-90">
              <FiClock className="h-3 w-3" />
              <span>Expires {formatDate(currentDiscount.endDate)}</span>
            </div>
          )}

          {/* CTA Button */}
          <Link
            href="/products"
            className="bg-white text-primary px-4 py-1 rounded-full text-xs font-semibold hover:bg-neutral-100 transition-colors whitespace-nowrap"
          >
            Shop Now
          </Link>
        </div>

        {/* Multiple Discounts Indicator */}
        {discounts.length > 1 && (
          <div className="flex justify-center mt-2">
            <div className="flex gap-1">
              {discounts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentDiscountIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentDiscountIndex 
                      ? 'bg-white' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`View discount ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
