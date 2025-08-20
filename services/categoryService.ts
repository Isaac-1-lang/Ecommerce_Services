import api from "../lib/api";

export interface CategoryDTO {
  id: number;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  parentId?: number;
  isActive?: boolean;
  isFeatured?: boolean;
  sortOrder?: number;
}

export const categoryService = {
  async getAll(page = 0, size = 100, sortBy = "name", sortDir: "asc" | "desc" = "asc"): Promise<CategoryDTO[]> {
    const resp = await api.get(`/api/categories`, { params: { page, size, sortBy, sortDir } });
    if (resp.data && typeof resp.data === "object" && "content" in resp.data) {
      return resp.data.content as CategoryDTO[];
    }
    return Array.isArray(resp.data) ? (resp.data as CategoryDTO[]) : [];
  },

  async getTopLevel(): Promise<CategoryDTO[]> {
    const resp = await api.get(`/api/categories/top-level`);
    return resp.data as CategoryDTO[];
  },

  async getSubCategories(parentId: number): Promise<CategoryDTO[]> {
    const resp = await api.get(`/api/categories/sub-categories/${parentId}`);
    return resp.data as CategoryDTO[];
  },

  async create(category: Partial<CategoryDTO>): Promise<CategoryDTO> {
    const resp = await api.post(`/api/categories`, category);
    return resp.data as CategoryDTO;
  },

  async update(id: number, category: Partial<CategoryDTO>): Promise<CategoryDTO> {
    const resp = await api.put(`/api/categories/${id}`, category);
    return resp.data as CategoryDTO;
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/api/categories/${id}`);
  },
};


