import { ReactNode } from 'react';
import DeliverySidebar from '../../components/delivery/DeliverySidebar';
import DeliveryHeader from '../../components/delivery/DeliveryHeader';
import { DeliveryProtected } from '../../components/ProtectedRoute';

export default function DeliveryLayout({ children }: { children: ReactNode }) {
  return (
    <DeliveryProtected>
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex flex-col">
        <DeliveryHeader />
        <div className="flex flex-1">
          <DeliverySidebar />
          <main className="flex-1 p-6 ml-64 bg-neutral-50 dark:bg-neutral-900">
            {children}
          </main>
        </div>
      </div>
    </DeliveryProtected>
  );
}
