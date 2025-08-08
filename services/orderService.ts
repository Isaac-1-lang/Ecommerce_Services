export type Order = { id: string; total: number; status: string; createdAt: string };

async function wait(ms = 300) { return new Promise((res) => setTimeout(res, ms)); }

const mockOrders: Order[] = [
  { id: "1001", total: 123.45, status: "processing", createdAt: new Date().toISOString() },
  { id: "1002", total: 89.0, status: "shipped", createdAt: new Date().toISOString() },
];

export const orderService = {
  async listOrders(): Promise<Order[]> {
    await wait();
    return mockOrders;
  },
  async getOrder(id: string): Promise<Order | null> {
    await wait();
    return mockOrders.find((o) => o.id === id) || null;
  },
  async cancelOrder(id: string): Promise<void> {
    await wait();
    // noop
  },
};
