import { ReactNode } from "react";

export default function Sidebar({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <aside className={`w-full md:w-64 shrink-0 ${className}`}>{children}</aside>
  );
}
