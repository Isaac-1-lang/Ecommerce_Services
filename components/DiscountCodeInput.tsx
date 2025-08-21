"use client";

import { useState } from 'react';
import { FiTag, FiCheck, FiX, FiInfo } from 'react-icons/fi';
import { discountService, DiscountValidationResult } from '../services/discountService';

interface DiscountCodeInputProps {
  subtotal: number;
  onDiscountApplied: (discount: DiscountValidationResult) => void;
  onDiscountRemoved: () => void;
  currentDiscount?: DiscountValidationResult;
  className?: string;
}

export default function DiscountCodeInput({
  subtotal,
  onDiscountApplied,
  onDiscountRemoved,
  currentDiscount,
  className = ''
}: DiscountCodeInputProps) {
  const [discountCode, setDiscountCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) {
      setError('Please enter a discount code');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await discountService.validateDiscountCode(discountCode.trim(), subtotal);
      
      if (result.isValid && result.discount) {
        setSuccess(`Discount applied! You saved $${result.discountAmount?.toFixed(2)}`);
        onDiscountApplied(result);
        setDiscountCode('');
      } else {
        setError(result.error || 'Invalid discount code');
      }
    } catch (err) {
      setError('Failed to validate discount code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveDiscount = () => {
    onDiscountRemoved();
    setSuccess(null);
    setError(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApplyDiscount();
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Discount Code Input */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Enter discount code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading || !!currentDiscount}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
          />
        </div>
        {!currentDiscount ? (
          <button
            onClick={handleApplyDiscount}
            disabled={isLoading || !discountCode.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            {isLoading ? 'Applying...' : 'Apply'}
          </button>
        ) : (
          <button
            onClick={handleRemoveDiscount}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <FiX className="h-4 w-4" />
            Remove
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <FiX className="h-4 w-4" />
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="flex items-center gap-2 text-green-600 text-sm">
          <FiCheck className="h-4 w-4" />
          {success}
        </div>
      )}

      {/* Current Discount Info */}
      {currentDiscount && currentDiscount.discount && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiInfo className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800 dark:text-green-200">
                {currentDiscount.discount.name}
              </span>
            </div>
            <span className="text-sm text-green-600 font-medium">
              -${currentDiscount.discountAmount?.toFixed(2)}
            </span>
          </div>
          {currentDiscount.discount.description && (
            <p className="text-xs text-green-600 mt-1">
              {currentDiscount.discount.description}
            </p>
          )}
        </div>
      )}

      {/* Help Text */}
      <div className="text-xs text-gray-500 dark:text-gray-400">
        <p>Enter your discount code above to save on your order.</p>
        {currentDiscount?.discount?.minimumAmount && (
          <p className="mt-1">
            Minimum order amount: ${currentDiscount.discount.minimumAmount}
          </p>
        )}
      </div>
    </div>
  );
}
