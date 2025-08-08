"use client";

import { useEffect } from "react";
import { useOrdersStore } from "../../features/orders/store";
import OrderCard from "../../components/OrderCard";

export default function OrdersPage() {
  const orders = useOrdersStore((s) => s.orders);
  const loading = useOrdersStore((s) => s.loading);
  const fetchOrders = useOrdersStore((s) => s.fetchOrders);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold">Orders</h1>
      {loading && <p>Loading...</p>}
      <div className="space-y-3">
        {orders.map((o) => (
          <OrderCard key={o.id} order={o} />
        ))}
      </div>
    </div>
  );
}
