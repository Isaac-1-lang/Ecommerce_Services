import api from "../lib/api";

export interface DeliveryAreaDTO {
  id: number;
  name: string;
  parentId?: number;
  description?: string;
}

export const deliveryAreaService = {
  async create(area: Partial<DeliveryAreaDTO>): Promise<DeliveryAreaDTO> {
    const resp = await api.post(`/api/delivery-areas`, area);
    return resp.data as DeliveryAreaDTO;
  },
  async update(id: number, area: Partial<DeliveryAreaDTO>): Promise<DeliveryAreaDTO> {
    const resp = await api.put(`/api/delivery-areas/${id}`, area);
    return resp.data as DeliveryAreaDTO;
  },
  async remove(id: number): Promise<void> {
    await api.delete(`/api/delivery-areas/${id}`);
  },
  async get(id: number): Promise<DeliveryAreaDTO> {
    const resp = await api.get(`/api/delivery-areas/${id}`);
    return resp.data as DeliveryAreaDTO;
  },
  async list(): Promise<DeliveryAreaDTO[]> {
    const resp = await api.get(`/api/delivery-areas`);
    return resp.data as DeliveryAreaDTO[];
  },
  async topLevel(): Promise<DeliveryAreaDTO[]> {
    const resp = await api.get(`/api/delivery-areas/top-level`);
    return resp.data as DeliveryAreaDTO[];
  },
  async subAreas(parentId: number): Promise<DeliveryAreaDTO[]> {
    const resp = await api.get(`/api/delivery-areas/sub-areas/${parentId}`);
    return resp.data as DeliveryAreaDTO[];
  },
};


