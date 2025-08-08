import { Product } from "../types/product";

export const cartService = {
  async validateItem(product: Product, quantity: number): Promise<boolean> {
    // pretend to validate stock
    return true;
  },
};
