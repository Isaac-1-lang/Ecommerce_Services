import { orderService } from "../../../services/orderService";
import { notFound } from "next/navigation";

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = await orderService.getOrder(params.id);
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
