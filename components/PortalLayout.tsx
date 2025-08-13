"use client";

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface PortalLayoutProps {
  children: ReactNode;
}

export default function PortalLayout({ children }: PortalLayoutProps) {
  const pathname = usePathname();
  const isPortal = pathname?.startsWith("/admin") || pathname?.startsWith("/employee") || pathname?.startsWith("/delivery");

  if (isPortal) {
    // For portal pages, render without footer
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          {children}
        </main>
      </div>
    );
  }

  // For regular pages, render normally with footer
  return <>{children}</>;
}
