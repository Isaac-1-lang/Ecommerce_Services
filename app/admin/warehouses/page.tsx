"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiPlus, FiEdit, FiTrash2, FiMapPin, FiPackage, FiUsers, FiTruck, FiActivity, FiMail } from 'react-icons/fi';
import { warehouseService } from '../../../services/warehouseService';

interface Warehouse {
  id: number;
  name: string;
  location: string;
  contactNumber: string;
  email: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
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
          totalProducts: 0, // This would come from a separate API call
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">Warehouse Management</h1>
            <p className="text-neutral-600 dark:text-neutral-400 mt-1">Loading warehouses...</p>
          </div>
          <Link
            href="/admin/warehouses/new"
            className="bg-primary hover:bg-primary-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <FiPlus className="h-5 w-5" />
            Add Warehouse
          </Link>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-1/4 mb-6 mx-auto"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                ))}
              </div>
              <div className="h-96 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">Warehouse Management</h1>
            <p className="text-neutral-600 dark:text-neutral-400 mt-1">Manage your warehouse network and inventory distribution</p>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <FiPackage className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Warehouses</p>
                <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.totalWarehouses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <FiActivity className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Active Warehouses</p>
                <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.activeWarehouses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <FiTruck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Products</p>
                <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.totalProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <FiUsers className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Low Stock Items</p>
                <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.lowStockItems}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Warehouses List */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Warehouse Locations</h2>
          </div>
          
          <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
            {warehouses.map((warehouse) => (
              <div key={warehouse.id} className="p-6 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">{warehouse.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        warehouse.isActive 
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                          : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      }`}>
                        {warehouse.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
                      <div className="flex items-center gap-2">
                        <FiMapPin className="h-4 w-4" />
                        <span>{warehouse.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <FiUsers className="h-4 w-4" />
                        <span>{warehouse.contactNumber}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <FiMail className="h-4 w-4" />
                        <span>{warehouse.email}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/warehouses/${warehouse.id}/edit`}
                      className="p-2 text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      title="Edit warehouse"
                    >
                      <FiEdit className="h-5 w-5" />
                    </Link>
                    
                    <button
                      onClick={() => handleDeleteWarehouse(warehouse)}
                      className="p-2 text-neutral-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      title="Delete warehouse"
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                

              </div>
            ))}
          </div>
          
          {warehouses.length === 0 && (
            <div className="p-12 text-center">
              <FiPackage className="h-12 w-12 text-neutral-400 dark:text-neutral-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-2">No warehouses found</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">Get started by creating your first warehouse</p>
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedWarehouse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">Delete Warehouse</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Are you sure you want to delete "{selectedWarehouse.name}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
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
