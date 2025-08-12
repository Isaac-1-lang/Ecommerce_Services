import Link from "next/link";

export default function OrderCard({
  order,
}: {
  order: { id: string; total: number; status: string; createdAt: string };
}) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-success bg-success-50';
      case 'processing':
        return 'text-warning bg-warning-50';
      case 'shipped':
        return 'text-primary bg-highlight';
      case 'cancelled':
        return 'text-error bg-error-50';
      default:
        return 'text-neutral-600 bg-neutral-50';
    }
  };

  return (
    <div className="rounded-lg border border-neutral-200 p-4 bg-white shadow-soft hover:shadow-soft-lg transition-all">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-neutral-500">Order</p>
          <p className="font-semibold text-neutral-800">#{order.id}</p>
        </div>
        <div className="text-right">
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
          <p className="text-sm text-neutral-500 mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between pt-3 border-t border-neutral-100">
        <Link 
          href={`/orders/${order.id}`} 
          className="text-primary hover:text-primary-600 text-sm font-medium transition-colors"
        >
          View details
        </Link>
        <span className="text-lg font-bold text-primary">${order.total.toFixed(2)}</span>
      </div>
    </div>
  );
}
