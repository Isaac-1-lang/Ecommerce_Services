"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiCheck, FiX, FiMail } from "react-icons/fi";
import { useAuthStore } from "../../../../features/auth/store";

export default function VerifyEmailPage({ params }: { params: { token: string } }) {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  
  const { verifyEmail, error, clearError } = useAuthStore();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        clearError();
        const result = await verifyEmail(params.token);
        setMessage(result.message);
        setStatus("success");
      } catch (error) {
        setStatus("error");
      }
    };

    verifyToken();
  }, [params.token, verifyEmail, clearError]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          {status === "loading" && (
            <>
              <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Verifying Email
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Please wait while we verify your email address...
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6">
                <FiCheck className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Email Verified!
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {message}
              </p>
              <Link
                href="/auth/login"
                className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary/90 transition-colors text-center block font-medium"
              >
                Sign In
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
                <FiX className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Verification Failed
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {error || "The verification link is invalid or has expired. Please try again."}
              </p>
              <div className="space-y-3">
                <Link
                  href="/auth/login"
                  className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary/90 transition-colors text-center block font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/forgot-password"
                  className="w-full border border-gray-300 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center block font-medium"
                >
                  Forgot Password
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Need help?{" "}
            <Link href="/contact" className="text-primary hover:text-primary/80 font-medium">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
