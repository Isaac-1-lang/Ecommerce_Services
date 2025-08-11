"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import { useAuthStore } from "../../../features/auth/store";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");
  
  const { forgotPassword, loading, error, clearError } = useAuthStore();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    clearError();
    
    try {
      const result = await forgotPassword(email);
      setMessage(result.message);
      setSent(true);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-md">
        <div className="text-center mb-8">
          <Link 
            href="/auth/login" 
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary mb-4"
          >
            <FiArrowLeft className="h-4 w-4 mr-2" />
            Back to login
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Forgot Password
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
          </div>
        )}

        {sent ? (
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6">
              <FiMail className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Check your email
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {message}
            </p>
            <div className="space-y-3">
              <Link
                href="/auth/login"
                className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary/90 transition-colors text-center block font-medium"
              >
                Back to Login
              </Link>
              <button
                onClick={() => {
                  setSent(false);
                  setEmail("");
                  clearError();
                }}
                className="w-full border border-gray-300 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center block font-medium"
              >
                Try another email
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>
          </form>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Remember your password?{" "}
            <Link href="/auth/login" className="text-primary hover:text-primary/80 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
