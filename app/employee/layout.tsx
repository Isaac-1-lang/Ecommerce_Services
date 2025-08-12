import { ReactNode } from 'react';
import EmployeeSidebar from '../../components/employee/EmployeeSidebar';
import EmployeeHeader from '../../components/employee/EmployeeHeader';

export default function EmployeeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <EmployeeHeader />
      <div className="flex">
        <EmployeeSidebar />
        <main className="flex-1 p-6 ml-64 bg-neutral-50 dark:bg-neutral-900">
          {children}
        </main>
      </div>
    </div>
  );
}
