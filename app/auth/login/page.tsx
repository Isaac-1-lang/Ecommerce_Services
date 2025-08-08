"use client";

import LoginForm from "../../../components/LoginForm";
import { useAuthStore } from "../../../features/auth/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/account");
  }, [user, router]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold">Sign in</h1>
      <LoginForm />
    </div>
  );
}
