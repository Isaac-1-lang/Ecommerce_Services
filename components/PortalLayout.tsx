"use client";

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface PortalLayoutProps {
  children: ReactNode;
}

export default function PortalLayout({ children }: PortalLayoutProps) {
  const pathname = usePathname();
  
  // Define portal paths that should hide the footer
  const portalPaths = ["/admin", "/employee", "/delivery"];
  const isPortal = portalPaths.some(path => pathname?.startsWith(path));

  if (isPortal) {
    // For portal pages, render without footer and navbar
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          {children}
        </main>
      </div>
    );
  }

  // For regular pages, render normally with footer and navbar
  return <>{children}</>;
}
