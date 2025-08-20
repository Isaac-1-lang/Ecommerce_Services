import api from "../lib/api";

export interface WarehouseDTO {
  id: number;
  name: string;
  location: string;
  contactNumber: string;
  email: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const warehouseService = {
  async getAll(): Promise<WarehouseDTO[]> {
    const resp = await api.get(`/api/warehouses`);
    return resp.data as WarehouseDTO[];
  },

  async getById(id: number): Promise<WarehouseDTO> {
    const resp = await api.get(`/api/warehouses/${id}`);
    return resp.data as WarehouseDTO;
  },

  async create(warehouse: Partial<WarehouseDTO>): Promise<WarehouseDTO> {
    const resp = await api.post(`/api/warehouses`, warehouse);
    return resp.data as WarehouseDTO;
  },

  async update(id: number, warehouse: Partial<WarehouseDTO>): Promise<WarehouseDTO> {
    const resp = await api.put(`/api/warehouses/${id}`, warehouse);
    return resp.data as WarehouseDTO;
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/api/warehouses/${id}`);
  },
};
