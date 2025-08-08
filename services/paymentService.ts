export const paymentService = {
  async createCheckoutSession(_: { amount: number }) {
    return { sessionId: "mock-session" };
  },
  async confirmPayment(_: { sessionId: string }) {
    return { success: true };
  },
};
