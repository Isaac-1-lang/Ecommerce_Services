"use client";

import { ReactNode } from "react";

export default function AuthModal({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-soft-lg border border-neutral-200">
        <button 
          className="float-right text-sm text-neutral-500 hover:text-neutral-700 transition-colors" 
          onClick={onClose}
        >
          Close
        </button>
        <div className="clear-both">
          {children}
        </div>
      </div>
    </div>
  );
}
