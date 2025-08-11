import CategoryFilter from "./CategoryFilter";
import type { ProductFilters } from "../features/products/store";

interface FilterSidebarProps {
  categories: string[];
  filters: ProductFilters;
  onFilterChange: (newFilters: ProductFilters) => void;
  onClearFilters: () => void;
}

export default function FilterSidebar({ 
  categories, 
  filters, 
  onFilterChange, 
  onClearFilters 
}: FilterSidebarProps) {
  
  const handlePriceChange = (min: number, max: number) => {
    onFilterChange({
      ...filters,
      priceRange: [min, max]
    });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({
      ...filters,
      rating
    });
  };

  return (
    <aside className="w-full md:w-64 shrink-0 space-y-6">
      <div>
        <h3 className="mb-2 text-sm font-semibold">Categories</h3>
        <CategoryFilter 
          categories={categories}
          selectedCategory={filters.category}
          onCategoryChange={(category) => onFilterChange({ ...filters, category })}
        />
      </div>
      
      <div>
        <h3 className="mb-2 text-sm font-semibold">Price</h3>
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
          <input 
            type="number" 
            placeholder="Min" 
            value={filters.priceRange[0] || ''}
            onChange={(e) => handlePriceChange(Number(e.target.value) || 0, filters.priceRange[1])}
            className="w-24 rounded-md border bg-white px-2 py-1 dark:bg-green-900" 
          />
          <input 
            type="number" 
            placeholder="Max" 
            value={filters.priceRange[1] || ''}
            onChange={(e) => handlePriceChange(filters.priceRange[0], Number(e.target.value) || 1000)}
            className="w-24 rounded-md border bg-white px-2 py-1 dark:bg-green-900" 
          />
        </div>
      </div>
      
      <div>
        <h3 className="mb-2 text-sm font-semibold">Rating</h3>
        <div className="flex gap-2">
          {[4, 3, 2, 1].map((r) => (
            <label key={r} className="text-sm">
              <input 
                type="checkbox" 
                checked={filters.rating === r}
                onChange={() => handleRatingChange(filters.rating === r ? 0 : r)}
                className="mr-1"
              /> 
              {r}+
            </label>
          ))}
        </div>
      </div>

      <div>
        <button
          onClick={onClearFilters}
          className="w-full px-4 py-2 text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 border border-green-300 dark:border-green-600 rounded-md hover:bg-green-50 dark:hover:bg-green-800 transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </aside>
  );
}
