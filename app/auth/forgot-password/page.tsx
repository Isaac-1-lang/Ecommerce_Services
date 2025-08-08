"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold">Forgot password</h1>
      {sent ? (
        <p>We sent a reset link to {email} if it exists.</p>
      ) : (
        <form onSubmit={submit} className="mx-auto w-full max-w-sm space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm dark:bg-gray-900"
            />
          </div>
          <button type="submit" className="w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-white">Send reset link</button>
        </form>
      )}
    </div>
  );
}
