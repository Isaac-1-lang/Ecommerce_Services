"use client";

import { useState, useEffect } from 'react';
import { productService } from '../../services/productService';

export default function TestProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [testId, setTestId] = useState('d5d47f7e-4956-8a16-b50578b71dab');
  const [testResult, setTestResult] = useState<any>(null);

  useEffect(() => {
    testProductList();
  }, []);

  const testProductList = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔍 Testing product list API...');
      
      const result = await productService.list({ size: 10 });
      console.log('✅ Product list result:', result);
      setProducts(result);
    } catch (err: any) {
      console.error('❌ Product list error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testProductById = async () => {
    try {
      setError(null);
      setTestResult(null);
      console.log('🔍 Testing getProductById with:', testId);
      
      const result = await productService.getById(testId);
      console.log('✅ GetProductById result:', result);
      setTestResult(result);
    } catch (err: any) {
      console.error('❌ GetProductById error:', err);
      setError(err.message);
    }
  };

  const testProductBySlug = async () => {
    try {
      setError(null);
      setTestResult(null);
      console.log('🔍 Testing getProductBySlug with:', testId);
      
      const result = await productService.getBySlug(testId);
      console.log('✅ GetProductBySlug result:', result);
      setTestResult(result);
    } catch (err: any) {
      console.error('❌ GetProductBySlug error:', err);
      setError(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Product API Test Page</h1>
      
      {/* Test Product List */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-xl font-semibold mb-4">Test Product List API</h2>
        <button 
          onClick={testProductList}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Test Product List'}
        </button>
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            Error: {error}
          </div>
        )}
        
        {products.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Available Products ({products.length}):</h3>
            <div className="space-y-2">
              {products.map((product) => (
                <div key={product.id} className="p-3 bg-gray-50 rounded border">
                  <div className="font-medium">ID: {product.id}</div>
                  <div>Name: {product.name}</div>
                  <div>Slug: {product.slug}</div>
                  <div>Price: ${product.price}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Test Individual Product */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-xl font-semibold mb-4">Test Individual Product API</h2>
        
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={testId}
            onChange={(e) => setTestId(e.target.value)}
            placeholder="Enter product ID or slug"
            className="flex-1 px-3 py-2 border border-gray-300 rounded"
          />
          <button 
            onClick={testProductById}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Test by ID
          </button>
          <button 
            onClick={testProductBySlug}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Test by Slug
          </button>
        </div>

        {testResult && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
            <h3 className="font-semibold text-green-800">Success!</h3>
            <pre className="mt-2 text-sm text-green-700 overflow-auto">
              {JSON.stringify(testResult, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Backend Status */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-xl font-semibold mb-4">Backend Status</h2>
        <div className="space-y-2">
          <div><strong>API Base URL:</strong> http://44.201.144.244:8081</div>
          <div><strong>Product List Endpoint:</strong> /api/v1/products</div>
          <div><strong>Product by ID Endpoint:</strong> /api/v1/products/{'{id}'}</div>
          <div><strong>Product by Slug Endpoint:</strong> /api/v1/products/slug/{'{slug}'}</div>
        </div>
      </div>
    </div>
  );
}
