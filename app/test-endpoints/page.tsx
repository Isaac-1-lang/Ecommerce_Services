"use client";

import { useState, useEffect } from 'react';
import { productService } from '../../services/productService';

export default function TestEndpointsPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testEndpoints = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Testing endpoints...');
        
        // Test categories
        console.log('Fetching categories...');
        const categoriesData = await productService.getCategories();
        console.log('Categories response:', categoriesData);
        setCategories(categoriesData);
        
        // Test warehouses
        console.log('Fetching warehouses...');
        const warehousesData = await productService.getWarehouses();
        console.log('Warehouses response:', warehousesData);
        setWarehouses(warehousesData);
        
      } catch (err: any) {
        console.error('Error testing endpoints:', err);
        setError(err.message || 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    testEndpoints();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Testing Endpoints</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Testing Endpoints</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Endpoint Test Results</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Categories */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          {categories.length > 0 ? (
            <div>
              <p className="text-green-600 mb-2">✅ Successfully fetched {categories.length} categories</p>
              <ul className="space-y-2">
                {categories.slice(0, 5).map((category, index) => (
                  <li key={index} className="text-sm">
                    <strong>{category.name}</strong> (ID: {category.id}, Slug: {category.slug})
                  </li>
                ))}
                {categories.length > 5 && (
                  <li className="text-gray-500 text-sm">... and {categories.length - 5} more</li>
                )}
              </ul>
            </div>
          ) : (
            <p className="text-yellow-600">No categories found</p>
          )}
        </div>

        {/* Warehouses */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4">Warehouses</h2>
          {warehouses.length > 0 ? (
            <div>
              <p className="text-green-600 mb-2">✅ Successfully fetched {warehouses.length} warehouses</p>
              <ul className="space-y-2">
                {warehouses.slice(0, 5).map((warehouse, index) => (
                  <li key={index} className="text-sm">
                    <strong>{warehouse.name}</strong> (ID: {warehouse.id}, Location: {warehouse.location})
                  </li>
                ))}
                {warehouses.length > 5 && (
                  <li className="text-gray-500 text-sm">... and {warehouses.length - 5} more</li>
                )}
              </ul>
            </div>
          ) : (
            <p className="text-yellow-600">No warehouses found</p>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Debug Information:</h3>
        <p className="text-sm text-gray-600">
          API Base URL: {process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8095'}<br/>
          Categories Count: {categories.length}<br/>
          Warehouses Count: {warehouses.length}
        </p>
      </div>
    </div>
  );
}
