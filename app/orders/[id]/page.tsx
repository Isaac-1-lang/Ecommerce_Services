import { orderService } from "../../../services/orderService";
import { notFound } from "next/navigation";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  const order = await orderService.getOrder(id);
  if (!order) return notFound();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold">Order #{order.id}</h1>
      <div className="rounded-md border p-4">
        <p>Status: <span className="capitalize">{order.status}</span></p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Placed on: {new Date(order.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
}
