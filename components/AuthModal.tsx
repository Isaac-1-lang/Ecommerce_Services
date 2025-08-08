"use client";

import { ReactNode } from "react";

export default function AuthModal({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
        <button className="float-right text-sm" onClick={onClose}>Close</button>
        <div className="clear-both">
          {children}
        </div>
      </div>
    </div>
  );
}
