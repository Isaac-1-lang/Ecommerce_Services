"use client";

import { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiEye, FiCalendar, FiPercent, FiTag, FiUsers } from 'react-icons/fi';
import { discountService, DiscountDTO, CreateDiscountDTO } from '../../../services/discountService';
import { toast } from 'react-hot-toast';

export default function DiscountsPage() {
  const [discounts, setDiscounts] = useState<DiscountDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState<DiscountDTO | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadDiscounts();
  }, [currentPage]);

  const loadDiscounts = async () => {
    try {
      setLoading(true);
      const response = await discountService.list(currentPage, 10, 'createdAt', 'desc', false);
      setDiscounts(response.content || []);
      setTotalPages(response.totalPages || 0);
    } catch (error) {
      console.error('Failed to load discounts:', error);
      toast.error('Failed to load discounts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDiscount = async (discountData: CreateDiscountDTO) => {
    try {
      await discountService.create(discountData);
      toast.success('Discount created successfully');
      setShowCreateModal(false);
      loadDiscounts();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create discount');
    }
  };

  const handleUpdateDiscount = async (id: string, discountData: Partial<DiscountDTO>) => {
    try {
      await discountService.update(id, discountData);
      toast.success('Discount updated successfully');
      setEditingDiscount(null);
      loadDiscounts();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update discount');
    }
  };

  const handleDeleteDiscount = async (id: string) => {
    if (!confirm('Are you sure you want to delete this discount?')) return;
    
    try {
      await discountService.remove(id);
      toast.success('Discount deleted successfully');
      loadDiscounts();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete discount');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDiscountTypeIcon = (type: string) => {
    switch (type) {
      case 'PERCENTAGE':
        return <FiPercent className="h-4 w-4 text-blue-600" />;
      case 'FIXED_AMOUNT':
        return <FiTag className="h-4 w-4 text-green-600" />;
      case 'FREE_SHIPPING':
        return <FiUsers className="h-4 w-4 text-purple-600" />;
      default:
        return <FiTag className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (discount: DiscountDTO) => {
    if (!discount.isActive) {
      return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">Inactive</span>;
    }
    
    if (!discount.isValid) {
      return <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Expired</span>;
    }
    
    if (!discount.canBeUsed) {
      return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Usage Limit Reached</span>;
    }
    
    return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Active</span>;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Discount Management</h1>
          <p className="text-gray-600 mt-2">Create and manage discount codes and promotional offers</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <FiPlus className="h-4 w-4" />
          Create Discount
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Discounts</p>
              <p className="text-2xl font-bold text-gray-900">{discounts.length}</p>
            </div>
            <FiTag className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Discounts</p>
              <p className="text-2xl font-bold text-gray-900">
                {discounts.filter(d => d.isValid && d.canBeUsed).length}
              </p>
            </div>
            <FiPercent className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Expired</p>
              <p className="text-2xl font-bold text-gray-900">
                {discounts.filter(d => !d.isValid).length}
              </p>
            </div>
            <FiCalendar className="h-8 w-8 text-red-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Usage Limit Reached</p>
              <p className="text-2xl font-bold text-gray-900">
                {discounts.filter(d => !d.canBeUsed).length}
              </p>
            </div>
            <FiUsers className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Discounts Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Discount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Validity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {discounts.map((discount) => (
                <tr key={discount.discountId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{discount.name}</div>
                      {discount.description && (
                        <div className="text-sm text-gray-500">{discount.description}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getDiscountTypeIcon(discount.discountType)}
                      <span className="text-sm text-gray-900">
                        {discount.discountType === 'PERCENTAGE' ? `${discount.percentage}%` : `$${discount.percentage}`}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-mono">
                      {discount.discountCode || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>From: {formatDate(discount.startDate || '')}</div>
                      {discount.endDate && (
                        <div>To: {formatDate(discount.endDate)}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {discount.usedCount || 0}
                      {discount.usageLimit && ` / ${discount.usageLimit}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(discount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingDiscount(discount)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        title="Edit"
                      >
                        <FiEdit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteDiscount(discount.discountId)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        title="Delete"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700">
            Page {currentPage + 1} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {(showCreateModal || editingDiscount) && (
        <DiscountModal
          discount={editingDiscount}
          onClose={() => {
            setShowCreateModal(false);
            setEditingDiscount(null);
          }}
          onSubmit={editingDiscount ? handleUpdateDiscount : handleCreateDiscount}
        />
      )}
    </div>
  );
}

// Discount Modal Component
interface DiscountModalProps {
  discount?: DiscountDTO | null;
  onClose: () => void;
  onSubmit: (data: CreateDiscountDTO | Partial<DiscountDTO>) => Promise<void>;
}

function DiscountModal({ discount, onClose, onSubmit }: DiscountModalProps) {
  const [formData, setFormData] = useState({
    name: discount?.name || '',
    description: discount?.description || '',
    percentage: discount?.percentage || 0,
    discountCode: discount?.discountCode || '',
    startDate: discount?.startDate ? new Date(discount.startDate).toISOString().slice(0, 16) : '',
    endDate: discount?.endDate ? new Date(discount.endDate).toISOString().slice(0, 16) : '',
    isActive: discount?.isActive ?? true,
    usageLimit: discount?.usageLimit || '',
    minimumAmount: discount?.minimumAmount || '',
    maximumAmount: discount?.maximumAmount || '',
    discountType: discount?.discountType || 'PERCENTAGE'
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const submitData = {
        ...formData,
        percentage: Number(formData.percentage),
        usageLimit: formData.usageLimit ? Number(formData.usageLimit) : undefined,
        minimumAmount: formData.minimumAmount ? Number(formData.minimumAmount) : undefined,
        maximumAmount: formData.maximumAmount ? Number(formData.maximumAmount) : undefined,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : undefined
      };

      if (discount) {
        await onSubmit(discount.discountId, submitData);
      } else {
        await onSubmit(submitData as CreateDiscountDTO);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {discount ? 'Edit Discount' : 'Create New Discount'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount Type *
              </label>
              <select
                value={formData.discountType}
                onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="PERCENTAGE">Percentage</option>
                <option value="FIXED_AMOUNT">Fixed Amount</option>
                <option value="FREE_SHIPPING">Free Shipping</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {formData.discountType === 'PERCENTAGE' ? 'Percentage *' : 'Amount *'}
              </label>
              <input
                type="number"
                required
                min="0"
                max={formData.discountType === 'PERCENTAGE' ? "100" : undefined}
                step="0.01"
                value={formData.percentage}
                onChange={(e) => setFormData({ ...formData, percentage: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount Code
              </label>
              <input
                type="text"
                value={formData.discountCode}
                onChange={(e) => setFormData({ ...formData, discountCode: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., SAVE20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date *
              </label>
              <input
                type="datetime-local"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="datetime-local"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Usage Limit
              </label>
              <input
                type="number"
                min="1"
                value={formData.usageLimit}
                onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Unlimited if empty"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Order Amount
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.minimumAmount}
                onChange={(e) => setFormData({ ...formData, minimumAmount: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="No minimum"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Order Amount
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.maximumAmount}
                onChange={(e) => setFormData({ ...formData, maximumAmount: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="No maximum"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Optional description of the discount"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
              Active
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Saving...' : (discount ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
