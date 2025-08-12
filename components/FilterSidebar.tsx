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
        <h3 className="mb-2 text-sm font-semibold text-neutral-800">Categories</h3>
        <CategoryFilter 
          categories={categories}
          selectedCategory={filters.category}
          onCategoryChange={(category) => onFilterChange({ ...filters, category })}
        />
      </div>
      
      <div>
        <h3 className="mb-2 text-sm font-semibold text-neutral-800">Price</h3>
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <input 
            type="number" 
            placeholder="Min" 
            value={filters.priceRange[0] || ''}
            onChange={(e) => handlePriceChange(Number(e.target.value) || 0, filters.priceRange[1])}
            className="w-24 rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
          />
          <input 
            type="number" 
            placeholder="Max" 
            value={filters.priceRange[1] || ''}
            onChange={(e) => handlePriceChange(filters.priceRange[0], Number(e.target.value) || 1000)}
            className="w-24 rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
          />
        </div>
      </div>
      
      <div>
        <h3 className="mb-2 text-sm font-semibold text-neutral-800">Rating</h3>
        <div className="flex gap-2">
          {[4, 3, 2, 1].map((r) => (
            <label key={r} className="text-sm text-neutral-700 cursor-pointer">
              <input 
                type="checkbox" 
                checked={filters.rating === r}
                onChange={() => handleRatingChange(filters.rating === r ? 0 : r)}
                className="mr-2 text-primary focus:ring-primary"
              /> 
              {r}+
            </label>
          ))}
        </div>
      </div>

      <div>
        <button
          onClick={onClearFilters}
          className="w-full px-4 py-2 text-sm text-neutral-600 hover:text-neutral-800 border border-neutral-300 rounded-md hover:bg-neutral-50 transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </aside>
  );
}
