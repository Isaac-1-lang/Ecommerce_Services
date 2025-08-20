import api from "../lib/api";

export interface AttributeTypeDTO {
  id: number;
  name: string;
  description?: string;
}

export interface AttributeValueDTO {
  id: number;
  value: string;
  attributeTypeId: number;
}

export const attributeTypesService = {
  list: async (page?: number, size?: number) => {
    const resp = await api.get(`/api/v1/product-attribute-types`, { params: page != null && size != null ? { page, size } : {} });
    return resp.data;
  },
  create: async (payload: Partial<AttributeTypeDTO>) => (await api.post(`/api/v1/product-attribute-types`, payload)).data,
  update: async (id: number, payload: Partial<AttributeTypeDTO>) => (await api.put(`/api/v1/product-attribute-types/${id}`, payload)).data,
  remove: async (id: number) => { await api.delete(`/api/v1/product-attribute-types/${id}`); },
  byId: async (id: number) => (await api.get(`/api/v1/product-attribute-types/${id}`)).data,
  byName: async (name: string) => (await api.get(`/api/v1/product-attribute-types/name/${encodeURIComponent(name)}`)).data,
  inUse: async (id: number) => (await api.get(`/api/v1/product-attribute-types/${id}/in-use`)).data as boolean,
};

export const attributeValuesService = {
  list: async (page?: number, size?: number) => {
    const resp = await api.get(`/api/v1/product-attribute-values`, { params: page != null && size != null ? { page, size } : {} });
    return resp.data;
  },
  byTypeId: async (attributeTypeId: number, page?: number, size?: number) => {
    const resp = await api.get(`/api/v1/product-attribute-values/type/${attributeTypeId}`, { params: page != null && size != null ? { page, size } : {} });
    return resp.data;
  },
  create: async (payload: { attributeTypeId: number; value: string; }) => (await api.post(`/api/v1/product-attribute-values`, payload)).data,
  update: async (id: number, payload: { attributeTypeId: number; value: string; }) => (await api.put(`/api/v1/product-attribute-values/${id}`, payload)).data,
  remove: async (id: number) => { await api.delete(`/api/v1/product-attribute-values/${id}`); },
  search: async (value: string, page = 0, size = 10) => (await api.get(`/api/v1/product-attribute-values/search`, { params: { value, page, size } })).data,
  searchByType: async (attributeTypeId: number, value: string, page = 0, size = 10) => (await api.get(`/api/v1/product-attribute-values/search/type/${attributeTypeId}`, { params: { value, page, size } })).data,
  byTypeAndValue: async (attributeTypeId: number, value: string) => (await api.get(`/api/v1/product-attribute-values/type/${attributeTypeId}/value/${encodeURIComponent(value)}`)).data,
  inUse: async (id: number) => (await api.get(`/api/v1/product-attribute-values/${id}/in-use`)).data as boolean,
};


