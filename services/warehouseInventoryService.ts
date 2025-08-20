import api from "../lib/api";

export interface WarehouseInventoryItem {
  stockId: number;
  warehouseId: number;
  warehouseName: string;
  productId: string;
  productName: string;
  productSku: string;
  variantId?: string;
  variantSku?: string;
  quantity: number;
  lowStockThreshold: number;
  reorderPoint?: number;
  productPrice: number;
  warehousePrice?: number;
  warehouseCostPrice?: number;
  isAvailable?: boolean;
  productImage?: string;
  category?: string;
  brand?: string;
  lastUpdated: string;
  
  // Stock status indicators
  isInStock: boolean;
  isLowStock: boolean;
  isOutOfStock: boolean;
  needsReorder: boolean;
}

export const warehouseInventoryService = {
  async getWarehouseInventory(warehouseId: number): Promise<WarehouseInventoryItem[]> {
    const resp = await api.get(`/api/warehouses/${warehouseId}/inventory`);
    return resp.data as WarehouseInventoryItem[];
  },

  async getAllWarehouseInventory(): Promise<WarehouseInventoryItem[]> {
    const resp = await api.get(`/api/warehouses/inventory/all`);
    return resp.data as WarehouseInventoryItem[];
  },

  async getInventoryStats(): Promise<{
    totalItems: number;
    inStockItems: number;
    lowStockItems: number;
    outOfStockItems: number;
    totalValue: number;
    lowStockValue: number;
  }> {
    const inventory = await this.getAllWarehouseInventory();
    
    const totalItems = inventory.length;
    const inStockItems = inventory.filter(item => item.isInStock).length;
    const lowStockItems = inventory.filter(item => item.isLowStock).length;
    const outOfStockItems = inventory.filter(item => item.isOutOfStock).length;
    
    const totalValue = inventory.reduce((sum, item) => sum + (item.quantity * item.productPrice), 0);
    const lowStockValue = inventory
      .filter(item => item.isLowStock)
      .reduce((sum, item) => sum + (item.quantity * item.productPrice), 0);

    return {
      totalItems,
      inStockItems,
      lowStockItems,
      outOfStockItems,
      totalValue,
      lowStockValue
    };
  }
};
