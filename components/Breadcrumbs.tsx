import Link from "next/link";

type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-neutral-600 mb-6">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-1">
            {item.href ? (
              <Link 
                href={item.href} 
                className="hover:text-primary transition-colors text-neutral-500 hover:text-neutral-700"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-neutral-800">{item.label}</span>
            )}
            {idx < items.length - 1 && <span className="text-neutral-300 mx-2">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
