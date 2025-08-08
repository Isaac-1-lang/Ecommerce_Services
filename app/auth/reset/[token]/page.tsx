"use client";

import { useState } from "react";

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setDone(true);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold">Reset password</h1>
      {done ? (
        <p>Password updated. You can now sign in.</p>
      ) : (
        <form onSubmit={submit} className="mx-auto w-full max-w-sm space-y-4">
          <div>
            <label className="block text-sm font-medium">New password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm dark:bg-gray-900"
            />
          </div>
          <button type="submit" className="w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-white">Update password</button>
        </form>
      )}
    </div>
  );
}
