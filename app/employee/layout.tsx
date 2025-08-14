import { ReactNode } from 'react';
import EmployeeSidebar from '../../components/employee/EmployeeSidebar';
import EmployeeHeader from '../../components/employee/EmployeeHeader';
import { EmployeeProtected } from '../../components/ProtectedRoute';

export default function EmployeeLayout({ children }: { children: ReactNode }) {
  return (
    <EmployeeProtected>
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex flex-col">
        <EmployeeHeader />
        <div className="flex flex-1">
          <EmployeeSidebar />
          <main className="flex-1 p-6 ml-64 bg-neutral-50 dark:bg-neutral-900">
            {children}
          </main>
        </div>
      </div>
    </EmployeeProtected>
  );
}
