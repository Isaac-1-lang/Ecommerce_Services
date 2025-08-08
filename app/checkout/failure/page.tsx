import Link from "next/link";

export default function FailurePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-red-600">Payment Failed</h1>
      <p className="mt-3 text-gray-700 dark:text-gray-300">Something went wrong with your payment. Please try again.</p>
      <Link href="/checkout" className="mt-6 inline-block rounded-md bg-primary px-4 py-2 text-white">Back to Checkout</Link>
    </div>
  );
}
