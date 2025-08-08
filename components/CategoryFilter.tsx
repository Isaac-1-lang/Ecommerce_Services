"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function CategoryFilter({ categories }: { categories: string[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const current = searchParams.get("category") || "";

  function setCategory(cat: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (cat) params.set("category", cat); else params.delete("category");
    router.push(`/products?${params.toString()}`);
  }

  return (
    <ul className="space-y-2 text-sm">
      <li>
        <button onClick={() => setCategory("")} className={`hover:underline ${current === "" ? "font-semibold" : ""}`}>All</button>
      </li>
      {categories.map((c) => (
        <li key={c}>
          <button onClick={() => setCategory(c)} className={`hover:underline ${current === c ? "font-semibold" : ""}`}>{c}</button>
        </li>
      ))}
    </ul>
  );
}
