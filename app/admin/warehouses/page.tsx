"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiPlus, FiEdit, FiTrash2, FiMapPin, FiPackage, FiUsers } from 'react-icons/fi';

interface Warehouse {
  id: string;
  name: string;
  code: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  capacity: number;
  currentUtilization: number;
  isActive: boolean;
}

export default function WarehousesPage() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockWarehouses: Warehouse[] = [
      {
        id: '1',
        name: 'Main Warehouse',
        code: 'WH-MAIN-001',
        description: 'Primary distribution center for the Northeast region',
        address: '123 Industrial Blvd',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        capacity: 10000,
        currentUtilization: 7500,
        isActive: true,
      },
      {
        id: '2',
        name: 'West Coast Hub',
        code: 'WH-WEST-002',
        description: 'Distribution center serving the West Coast',
        address: '456 Commerce Way',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        capacity: 8000,
        currentUtilization: 6000,
        isActive: true,
      },
      {
        id: '3',
        name: 'Central Distribution',
        code: 'WH-CENT-003',
        description: 'Central hub for Midwest distribution',
        address: '789 Logistics Ave',
        city: 'Chicago',
        state: 'IL',
        country: 'USA',
        capacity: 12000,
        currentUtilization: 9000,
        isActive: true,
      },
    ];

    setWarehouses(mockWarehouses);
    setLoading(false);
  }, []);

  const getUtilizationPercentage = (current: number, capacity: number) => {
    return Math.round((current / capacity) * 100);
  };

  const getUtilizationColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-48"></div>
            ))}
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
          <h1 className="text-3xl font-bold text-neutral-800">Warehouses</h1>
          <p className="text-neutral-600 mt-1">Manage your warehouse locations and inventory</p>
        </div>
        <Link
          href="/admin/warehouses/new"
          className="bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FiPlus className="h-4 w-4" />
          Add Warehouse
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-soft border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FiMapPin className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">Total Warehouses</p>
              <p className="text-2xl font-bold text-neutral-800">{warehouses.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-soft border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <FiPackage className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">Total Capacity</p>
              <p className="text-2xl font-bold text-neutral-800">
                {warehouses.reduce((sum, w) => sum + w.capacity, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-soft border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FiUsers className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">Active Warehouses</p>
              <p className="text-2xl font-bold text-neutral-800">
                {warehouses.filter(w => w.isActive).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Warehouses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {warehouses.map((warehouse) => (
          <div key={warehouse.id} className="bg-white rounded-xl shadow-soft border border-neutral-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800">{warehouse.name}</h3>
                  <p className="text-sm text-neutral-600">{warehouse.code}</p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/warehouses/${warehouse.id}/edit`}
                    className="p-2 text-neutral-600 hover:text-primary hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    <FiEdit className="h-4 w-4" />
                  </Link>
                  <button className="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-neutral-600 mb-4">{warehouse.description}</p>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <FiMapPin className="h-4 w-4" />
                  <span>{warehouse.address}, {warehouse.city}, {warehouse.state}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Capacity</span>
                    <span className="font-medium">{warehouse.capacity.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Utilization</span>
                    <span className={`font-medium ${getUtilizationColor(getUtilizationPercentage(warehouse.currentUtilization, warehouse.capacity))}`}>
                      {getUtilizationPercentage(warehouse.currentUtilization, warehouse.capacity)}%
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        getUtilizationPercentage(warehouse.currentUtilization, warehouse.capacity) >= 90
                          ? 'bg-red-500'
                          : getUtilizationPercentage(warehouse.currentUtilization, warehouse.capacity) >= 75
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                      style={{
                        width: `${getUtilizationPercentage(warehouse.currentUtilization, warehouse.capacity)}%`
                      }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    warehouse.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {warehouse.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-6 py-3 bg-neutral-50 border-t border-neutral-200">
              <Link
                href={`/admin/warehouses/${warehouse.id}`}
                className="text-primary hover:text-primary-600 text-sm font-medium"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
