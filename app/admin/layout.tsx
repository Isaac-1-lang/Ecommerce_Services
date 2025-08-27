import { ReactNode } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { AdminProtected } from '../../components/ProtectedRoute';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminProtected>
      <div className="min-h-screen bg-light-bg-subtle dark:bg-neutral-900 flex flex-col">
        <AdminHeader />
        <div className="flex flex-1">
          <AdminSidebar />
          <main className="flex-1 p-8 ml-64 bg-light-bg-subtle dark:bg-neutral-900">
            {children}
          </main>
        </div>
      </div>
    </AdminProtected>
  );
}
