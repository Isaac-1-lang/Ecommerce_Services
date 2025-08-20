'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';

export const RoleBasedNav: React.FC = () => {
  const { user, hasPermission, logout } = useAuth();

  if (!user) return null;

  const renderAdminNav = () => (
    <>
      <Link href="/admin/dashboard" className="nav-link">
        Dashboard
      </Link>
      <Link href="/admin/users" className="nav-link">
        User Management
      </Link>
      <Link href="/admin/products" className="nav-link">
        Product Management
      </Link>
      <Link href="/admin/orders" className="nav-link">
        Order Management
      </Link>
      <Link href="/admin/inventory" className="nav-link">
        Inventory
      </Link>
      <Link href="/admin/analytics" className="nav-link">
        Analytics
      </Link>
      <Link href="/admin/settings" className="nav-link">
        Settings
      </Link>
    </>
  );

  const renderEmployeeNav = () => (
    <>
      <Link href="/employee/dashboard" className="nav-link">
        Dashboard
      </Link>
      <Link href="/employee/products" className="nav-link">
        Products
      </Link>
      <Link href="/employee/orders" className="nav-link">
        Orders
      </Link>
      <Link href="/employee/inventory" className="nav-link">
        Inventory
      </Link>
    </>
  );

  const renderDeliveryNav = () => (
    <>
      <Link href="/delivery/dashboard" className="nav-link">
        Dashboard
      </Link>
      <Link href="/delivery/orders" className="nav-link">
        Orders
      </Link>
      <Link href="/delivery/routes" className="nav-link">
        Routes
      </Link>
      <Link href="/delivery/history" className="nav-link">
        History
      </Link>
    </>
  );

  const renderCustomerNav = () => (
    <>
      <Link href="/products" className="nav-link">
        Products
      </Link>
      <Link href="/cart" className="nav-link">
        Cart
      </Link>
      <Link href="/orders" className="nav-link">
        My Orders
      </Link>
      <Link href="/profile" className="nav-link">
        Profile
      </Link>
    </>
  );

  const renderNavItems = () => {
    switch (user.role) {
      case UserRole.ADMIN:
        return renderAdminNav();
      case UserRole.EMPLOYEE:
        return renderEmployeeNav();
      case UserRole.DELIVERY_PARTNER:
        return renderDeliveryNav();
      case UserRole.CUSTOMER:
        return renderCustomerNav();
      default:
        return null;
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Ecommerce
            </Link>
            {renderNavItems()}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Welcome, {user.firstName} ({user.role})
            </div>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
