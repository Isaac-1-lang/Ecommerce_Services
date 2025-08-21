import api from "../lib/api";
import { DUMMY_DISCOUNTS } from "../data/dummyDiscounts";

export interface DiscountDTO {
  discountId: string;
  name: string;
  description?: string;
  percentage: number;
  discountCode?: string;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  usageLimit?: number;
  usedCount?: number;
  minimumAmount?: number;
  maximumAmount?: number;
  discountType: string;
  createdAt?: string;
  updatedAt?: string;
  isValid: boolean;
  canBeUsed: boolean;
}

export interface CreateDiscountDTO {
  name: string;
  description?: string;
  percentage: number;
  discountCode?: string;
  startDate: string;
  endDate?: string;
  isActive?: boolean;
  usageLimit?: number;
  minimumAmount?: number;
  maximumAmount?: number;
  discountType?: string;
}

export interface UpdateDiscountDTO {
  name?: string;
  description?: string;
  percentage?: number;
  discountCode?: string;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
  usageLimit?: number;
  minimumAmount?: number;
  maximumAmount?: number;
  discountType?: string;
}

export interface DiscountValidationResult {
  isValid: boolean;
  discount?: DiscountDTO;
  error?: string;
  discountAmount?: number;
  finalPrice?: number;
}

export const discountService = {
  async create(discount: CreateDiscountDTO): Promise<DiscountDTO> {
    try {
      const resp = await api.post(`/api/v1/discounts`, discount);
      return resp.data as DiscountDTO;
    } catch (error) {
      console.error('Failed to create discount via API, using dummy data:', error);
      // Return a mock created discount
      const newDiscount: DiscountDTO = {
        discountId: Date.now().toString(),
        name: discount.name,
        description: discount.description,
        percentage: discount.percentage,
        discountCode: discount.discountCode,
        startDate: discount.startDate,
        endDate: discount.endDate,
        isActive: discount.isActive ?? true,
        usageLimit: discount.usageLimit,
        minimumAmount: discount.minimumAmount,
        maximumAmount: discount.maximumAmount,
        discountType: discount.discountType || 'PERCENTAGE',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isValid: true,
        canBeUsed: true,
        usedCount: 0
      };
      return newDiscount;
    }
  },

  async update(discountId: string, discount: UpdateDiscountDTO): Promise<DiscountDTO> {
    try {
      const resp = await api.put(`/api/v1/discounts/${discountId}`, discount);
      return resp.data as DiscountDTO;
    } catch (error) {
      console.error('Failed to update discount via API:', error);
      throw new Error('Failed to update discount');
    }
  },

  async remove(discountId: string): Promise<void> {
    try {
      await api.delete(`/api/v1/discounts/${discountId}`);
    } catch (error) {
      console.error('Failed to remove discount via API:', error);
      throw new Error('Failed to remove discount');
    }
  },

  async get(discountId: string): Promise<DiscountDTO> {
    try {
      const resp = await api.get(`/api/v1/discounts/${discountId}`);
      return resp.data as DiscountDTO;
    } catch (error) {
      console.error('Failed to get discount via API, using dummy data:', error);
      const dummyDiscount = DUMMY_DISCOUNTS.find(d => d.discountId === discountId);
      if (dummyDiscount) {
        return dummyDiscount;
      }
      throw new Error('Discount not found');
    }
  },

  async list(page = 0, size = 10, sortBy = 'createdAt', sortDirection = 'desc', activeOnly = false) {
    try {
      const resp = await api.get(`/api/v1/discounts`, { 
        params: { page, size, sortBy, sortDirection, activeOnly } 
      });
      return resp.data;
    } catch (error) {
      console.error('Failed to list discounts via API, using dummy data:', error);
      // Return dummy data in the expected format
      const filteredDiscounts = activeOnly 
        ? DUMMY_DISCOUNTS.filter(d => d.isValid && d.canBeUsed)
        : DUMMY_DISCOUNTS;
      
      const startIndex = page * size;
      const endIndex = startIndex + size;
      const paginatedDiscounts = filteredDiscounts.slice(startIndex, endIndex);
      
      return {
        content: paginatedDiscounts,
        totalPages: Math.ceil(filteredDiscounts.length / size),
        totalElements: filteredDiscounts.length,
        size,
        number: page
      };
    }
  },

  async byCode(code: string): Promise<DiscountDTO> {
    try {
      const resp = await api.get(`/api/v1/discounts/code/${code}`);
      return resp.data as DiscountDTO;
    } catch (error) {
      console.error('Failed to get discount by code via API, using dummy data:', error);
      const dummyDiscount = DUMMY_DISCOUNTS.find(d => d.discountCode === code);
      if (dummyDiscount) {
        return dummyDiscount;
      }
      throw new Error('Discount not found');
    }
  },

  async isValid(discountId: string): Promise<boolean> {
    try {
      const resp = await api.get(`/api/v1/discounts/${discountId}/valid`);
      return !!resp.data?.isValid;
    } catch (error) {
      console.error('Failed to validate discount via API, using dummy data:', error);
      const dummyDiscount = DUMMY_DISCOUNTS.find(d => d.discountId === discountId);
      return dummyDiscount ? dummyDiscount.isValid : false;
    }
  },

  async isCodeValid(code: string): Promise<boolean> {
    try {
      const resp = await api.get(`/api/v1/discounts/code/${code}/valid`);
      return !!resp.data?.isValid;
    } catch (error) {
      console.error('Failed to validate discount code via API, using dummy data:', error);
      const dummyDiscount = DUMMY_DISCOUNTS.find(d => d.discountCode === code);
      return dummyDiscount ? dummyDiscount.isValid : false;
    }
  },

  async validateDiscountCode(code: string, subtotal: number): Promise<DiscountValidationResult> {
    try {
      const discount = await this.byCode(code);
      
      if (!discount.isValid || !discount.canBeUsed) {
        return {
          isValid: false,
          error: 'Discount code is not valid or has expired'
        };
      }

      // Check minimum amount requirement
      if (discount.minimumAmount && subtotal < discount.minimumAmount) {
        return {
          isValid: false,
          error: `Minimum order amount of $${discount.minimumAmount} required`
        };
      }

      // Check maximum amount limit
      if (discount.maximumAmount && subtotal > discount.maximumAmount) {
        return {
          isValid: false,
          error: `Order amount exceeds maximum limit of $${discount.maximumAmount}`
        };
      }

      // Calculate discount amount
      let discountAmount = 0;
      let finalPrice = subtotal;

      switch (discount.discountType) {
        case 'PERCENTAGE':
          discountAmount = subtotal * (discount.percentage / 100);
          finalPrice = subtotal - discountAmount;
          break;
        case 'FIXED_AMOUNT':
          discountAmount = discount.percentage;
          finalPrice = subtotal - discountAmount;
          break;
        case 'FREE_SHIPPING':
          // This would be handled separately in shipping calculation
          discountAmount = 0;
          finalPrice = subtotal;
          break;
        default:
          discountAmount = subtotal * (discount.percentage / 100);
          finalPrice = subtotal - discountAmount;
      }

      // Ensure discount doesn't make price negative
      if (finalPrice < 0) {
        finalPrice = 0;
        discountAmount = subtotal;
      }

      return {
        isValid: true,
        discount,
        discountAmount,
        finalPrice
      };
    } catch (error: any) {
      return {
        isValid: false,
        error: error.response?.data?.message || 'Invalid discount code'
      };
    }
  },

  async getActiveDiscounts(): Promise<DiscountDTO[]> {
    try {
      const resp = await this.list(0, 100, 'createdAt', 'desc', true);
      return resp.content || [];
    } catch (error) {
      console.error('Error fetching active discounts:', error);
      return DUMMY_DISCOUNTS.filter(d => d.isValid && d.canBeUsed);
    }
  }
};


