"use client";

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import DiscountBanner from './DiscountBanner';

interface PortalLayoutProps {
  children: ReactNode;
}

export default function PortalLayout({ children }: PortalLayoutProps) {
  const pathname = usePathname();
  
  // Define portal paths that should hide the footer and navbar
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

  // For regular pages, render with navbar and footer
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <DiscountBanner />
      <main className="flex-1">
        {children}
      </main>
      <Footer variant="default" />
    </div>
  );
}
