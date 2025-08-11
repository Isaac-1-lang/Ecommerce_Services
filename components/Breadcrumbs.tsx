import Link from "next/link";

type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-600 dark:text-gray-400">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-1">
            {item.href ? (
              <Link href={item.href} className="hover:text-primary">{item.label}</Link>
            ) : (
              <span className="font-medium text-green-900 dark:text-green-100">{item.label}</span>
            )}
            {idx < items.length - 1 && <span className="opacity-50">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
