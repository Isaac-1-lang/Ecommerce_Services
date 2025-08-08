import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful</h1>
      <p className="mt-3 text-gray-700 dark:text-gray-300">Thank you for your purchase.</p>
      <Link href="/orders/1001" className="mt-6 inline-block rounded-md bg-primary px-4 py-2 text-white">View Order</Link>
    </div>
  );
}
