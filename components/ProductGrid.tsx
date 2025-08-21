import { Product } from "../types/product";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
