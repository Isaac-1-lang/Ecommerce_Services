import api from "../lib/api";

export interface DiscountDTO {
  discountId: string;
  name: string;
  percentage: number;
  startDate?: string;
  endDate?: string;
  active?: boolean;
}

export const discountService = {
  async create(discount: Partial<DiscountDTO>): Promise<DiscountDTO> {
    const resp = await api.post(`/api/v1/discounts`, discount);
    return resp.data as DiscountDTO;
  },
  async update(discountId: string, discount: Partial<DiscountDTO>): Promise<DiscountDTO> {
    const resp = await api.put(`/api/v1/discounts/${discountId}`, discount);
    return resp.data as DiscountDTO;
  },
  async remove(discountId: string): Promise<void> {
    await api.delete(`/api/v1/discounts/${discountId}`);
  },
  async get(discountId: string): Promise<DiscountDTO> {
    const resp = await api.get(`/api/v1/discounts/${discountId}`);
    return resp.data as DiscountDTO;
  },
  async list(page = 0, size = 10, sortBy = 'createdAt', sortDirection: 'desc', activeOnly = false) {
    const resp = await api.get(`/api/v1/discounts`, { params: { page, size, sortBy, sortDirection, activeOnly } });
    return resp.data;
  },
  async byCode(code: string): Promise<DiscountDTO> {
    const resp = await api.get(`/api/v1/discounts/code/${code}`);
    return resp.data as DiscountDTO;
  },
  async isValid(discountId: string): Promise<boolean> {
    const resp = await api.get(`/api/v1/discounts/${discountId}/valid`);
    return !!resp.data?.isValid;
  },
  async isCodeValid(code: string): Promise<boolean> {
    const resp = await api.get(`/api/v1/discounts/code/${code}/valid`);
    return !!resp.data?.isValid;
  },
};


