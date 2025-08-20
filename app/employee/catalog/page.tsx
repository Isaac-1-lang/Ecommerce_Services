"use client";

import { useEffect, useState } from 'react';
import { productService } from '../../../services/productService';

interface CatalogItem {
  id: string;
  name: string;
  image?: string;
  category?: string;
}

export default function EmployeeCatalogPage() {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const products = await productService.list({ size: 20 });
        // Map to limited, non-sensitive fields
        setItems(products.map(p => ({ id: p.id, name: p.name, image: p.image, category: p.category })));
      } catch (e: any) {
        setError(e.message || 'Failed to load catalog');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">Catalog</h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">View general product info. Prices and stock are hidden.</p>

      {loading && <div className="text-sm text-neutral-500">Loading...</div>}
      {error && <div className="text-sm text-error-600">{error}</div>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item.id} className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden bg-white dark:bg-neutral-800">
            {item.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
            )}
            <div className="p-3">
              <div className="font-medium text-neutral-800 dark:text-neutral-200 truncate">{item.name}</div>
              <div className="text-xs text-neutral-500">{item.category}</div>
            </div>
          </div>
        ))}
        {!loading && !error && items.length === 0 && (
          <div className="text-sm text-neutral-500">No items to display.</div>
        )}
      </div>
    </div>
  );
}


