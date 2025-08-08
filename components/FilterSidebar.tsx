import CategoryFilter from "./CategoryFilter";

export default function FilterSidebar({ categories }: { categories: string[] }) {
  return (
    <aside className="w-full md:w-64 shrink-0 space-y-6">
      <div>
        <h3 className="mb-2 text-sm font-semibold">Categories</h3>
        <CategoryFilter categories={categories} />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Price</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <input type="number" placeholder="Min" className="w-24 rounded-md border bg-white px-2 py-1 dark:bg-gray-900" />
          <input type="number" placeholder="Max" className="w-24 rounded-md border bg-white px-2 py-1 dark:bg-gray-900" />
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Rating</h3>
        <div className="flex gap-2">
          {[4,3,2,1].map((r)=> (
            <label key={r} className="text-sm">
              <input type="checkbox" className="mr-1"/> {r}+
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
