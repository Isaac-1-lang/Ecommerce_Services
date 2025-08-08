import Link from "next/link";

export default function OrderCard({
  order,
}: {
  order: { id: string; total: number; status: string; createdAt: string };
}) {
  return (
    <div className="rounded-md border p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Order</p>
          <p className="font-semibold">#{order.id}</p>
        </div>
        <div className="text-right">
          <p className="text-sm capitalize">{order.status}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <Link href={`/orders/${order.id}`} className="text-primary hover:underline text-sm">View details</Link>
        <span className="text-sm font-semibold">${order.total.toFixed(2)}</span>
      </div>
    </div>
  );
}
