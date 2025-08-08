"use client";

import { useAuthStore } from "../../features/auth/store";
import Link from "next/link";

export default function AccountPage() {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <p>Please <Link className="text-primary underline" href="/auth/login">sign in</Link> to view your account.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold">Hello, {user.name}</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link href="/account/orders" className="rounded-md border p-4 hover:bg-gray-50 dark:hover:bg-gray-900">Orders</Link>
        <Link href="/account/addresses" className="rounded-md border p-4 hover:bg-gray-50 dark:hover:bg-gray-900">Addresses</Link>
        <Link href="/wishlist" className="rounded-md border p-4 hover:bg-gray-50 dark:hover:bg-gray-900">Wishlist</Link>
      </div>
    </div>
  );
}
