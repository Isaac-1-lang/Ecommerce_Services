"use client";

import LoginForm from "../../../components/LoginForm";
import { useAuthStore } from "../../../features/auth/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

export default function LoginPage() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/account");
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>

        {/* Form */}
        <LoginForm />

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Having trouble?{" "}
            <Link href="/contact" className="text-primary hover:text-primary/80">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
