"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiPlus, FiEdit, FiTrash2, FiMapPin, FiPackage, FiUsers, FiTruck, FiActivity } from 'react-icons/fi';
import { warehouseService } from '../../../services/warehouseService';

interface Warehouse {
  id: number;
  name: string;
  location: string;
  contactNumber: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  stocks?: Array<{
    productId: string;
    productName: string;
    quantity: number;
    lowStockThreshold: number;
  }>;
}

interface WarehouseStats {
  totalWarehouses: number;
  activeWarehouses: number;
  totalProducts: number;
  lowStockItems: number;
  outOfStockItems: number;
}

export default function WarehousesPage() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [stats, setStats] = useState<WarehouseStats>({
    totalWarehouses: 0,
    activeWarehouses: 0,
    totalProducts: 0,
    lowStockItems: 0,
    outOfStockItems: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Load warehouses and stats
  useEffect(() => {
    const loadWarehouses = async () => {
      try {
        setLoading(true);
        const warehousesData = await warehouseService.getAll();
        setWarehouses(warehousesData);
        
        // Calculate stats
        const activeWarehouses = warehousesData.filter(w => w.isActive).length;
        setStats({
          totalWarehouses: warehousesData.length,
          activeWarehouses,
          totalProducts: warehousesData.reduce((sum, w) => sum + (w.stocks?.length || 0), 0),
          lowStockItems: 0, // This would come from a separate API call
          outOfStockItems: 0 // This would come from a separate API call
        });
      } catch (error) {
        console.error('Failed to load warehouses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWarehouses();
  }, []);

  const handleDeleteWarehouse = async (warehouse: Warehouse) => {
    setSelectedWarehouse(warehouse);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedWarehouse) return;
    
    try {
      // This would call the delete API
      // await productService.deleteWarehouse(selectedWarehouse.id);
      
      // Remove from local state for now
      setWarehouses(prev => prev.filter(w => w.id !== selectedWarehouse.id));
      setShowDeleteModal(false);
      setSelectedWarehouse(null);
    } catch (error) {
      console.error('Failed to delete warehouse:', error);
    }
  };

  const getUtilizationColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Warehouse Management</h1>
            <p className="text-gray-600 mt-2">Manage your warehouse network and inventory distribution</p>
          </div>
          <Link
            href="/admin/warehouses/new"
            className="bg-primary hover:bg-primary-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <FiPlus className="h-5 w-5" />
            Add Warehouse
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiPackage className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Warehouses</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalWarehouses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <FiActivity className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Warehouses</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeWarehouses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiTruck className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <FiUsers className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-gray-900">{stats.lowStockItems}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Warehouses List */}
        <div className="bg-white rounded-xl shadow-soft border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Warehouse Locations</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {warehouses.map((warehouse) => (
              <div key={warehouse.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{warehouse.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        warehouse.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {warehouse.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <FiMapPin className="h-4 w-4" />
                        <span>{warehouse.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <FiUsers className="h-4 w-4" />
                        <span>{warehouse.contactNumber}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <FiPackage className="h-4 w-4" />
                        <span>{warehouse.stocks?.length || 0} products</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/warehouses/${warehouse.id}/edit`}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit warehouse"
                    >
                      <FiEdit className="h-5 w-5" />
                    </Link>
                    
                    <button
                      onClick={() => handleDeleteWarehouse(warehouse)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete warehouse"
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                {/* Warehouse Products Preview */}
                {warehouse.stocks && warehouse.stocks.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Products:</h4>
                    <div className="flex flex-wrap gap-2">
                      {warehouse.stocks.slice(0, 5).map((stock, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          {stock.productName} ({stock.quantity})
                        </span>
                      ))}
                      {warehouse.stocks.length > 5 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          +{warehouse.stocks.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {warehouses.length === 0 && (
            <div className="p-12 text-center">
              <FiPackage className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No warehouses found</h3>
              <p className="text-gray-600 mb-6">Get started by creating your first warehouse</p>
              <Link
                href="/admin/warehouses/new"
                className="bg-primary hover:bg-primary-600 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors"
              >
                <FiPlus className="h-5 w-5" />
                Create Warehouse
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedWarehouse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Warehouse</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{selectedWarehouse.name}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
