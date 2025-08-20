"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FiEye, FiMail, FiPhone, FiCalendar, FiSearch, FiFilter, FiDownload, FiUserPlus } from 'react-icons/fi';

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const customers = [
    {
      id: 'CUST-001',
      name: 'John D',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      joinDate: '2024-01-15',
      totalOrders: 8,
      totalSpent: 2899.99,
      status: 'Active',
      lastOrder: '2024-01-25',
      location: 'New York, NY'
    },
    {
      id: 'CUST-002',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 (555) 234-5678',
      joinDate: '2024-01-10',
      totalOrders: 6,
      totalSpent: 1899.99,
      status: 'Active',
      lastOrder: '2024-01-24',
      location: 'Los Angeles, CA'
    },
    {
      id: 'CUST-003',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1 (555) 345-6789',
      joinDate: '2024-01-05',
      totalOrders: 5,
      totalSpent: 1599.99,
      status: 'Active',
      lastOrder: '2024-01-23',
      location: 'Chicago, IL'
    },
    {
      id: 'CUST-004',
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      phone: '+1 (555) 456-7890',
      joinDate: '2024-01-20',
      totalOrders: 4,
      totalSpent: 1299.99,
      status: 'Inactive',
      lastOrder: '2024-01-18',
      location: 'Houston, TX'
    },
    {
      id: 'CUST-005',
      name: 'David Brown',
      email: 'david@example.com',
      phone: '+1 (555) 567-8901',
      joinDate: '2024-01-12',
      totalOrders: 3,
      totalSpent: 999.99,
      status: 'Active',
      lastOrder: '2024-01-22',
      location: 'Phoenix, AZ'
    }
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'joinDate':
        return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
      case 'totalSpent':
        return b.totalSpent - a.totalSpent;
      case 'totalOrders':
        return b.totalOrders - a.totalOrders;
      default:
        return 0;
    }
  });

  const stats = {
    totalCustomers: customers.length,
    activeCustomers: customers.filter(c => c.status === 'Active').length,
    newCustomersThisMonth: customers.filter(c => {
      const joinDate = new Date(c.joinDate);
      const now = new Date();
      return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear();
    }).length,
    averageOrderValue: customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.reduce((sum, c) => sum + c.totalOrders, 0)
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-neutral-800 dark:text-neutral-200">Customers</h1>
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">Manage your customer base</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <button className="flex items-center justify-center gap-2 px-3 lg:px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors mobile-touch-target">
            <FiDownload className="h-4 w-4" />
            <span className="text-sm">Export</span>
          </button>
          <Link href="/admin/customers/new" className="flex items-center justify-center gap-2 px-3 lg:px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors mobile-touch-target">
            <FiUserPlus className="h-4 w-4" />
            <span className="text-sm">Add Customer</span>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        <div className="bg-white dark:bg-neutral-800 p-4 lg:p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Customers</p>
              <p className="text-lg lg:text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.totalCustomers}</p>
            </div>
            <div className="p-2 lg:p-3 bg-primary/10 rounded-lg">
              <FiUserPlus className="h-4 w-4 lg:h-6 lg:w-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-4 lg:p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-neutral-600 dark:text-neutral-400">Active Customers</p>
              <p className="text-lg lg:text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.activeCustomers}</p>
            </div>
            <div className="p-2 lg:p-3 bg-success/10 rounded-lg">
              <FiEye className="h-4 w-4 lg:h-6 lg:w-6 text-success" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-4 lg:p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-neutral-600 dark:text-neutral-400">New This Month</p>
              <p className="text-lg lg:text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.newCustomersThisMonth}</p>
            </div>
            <div className="p-2 lg:p-3 bg-warning/10 rounded-lg">
              <FiCalendar className="h-4 w-4 lg:h-6 lg:w-6 text-warning" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-4 lg:p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-neutral-600 dark:text-neutral-400">Avg Order Value</p>
              <p className="text-lg lg:text-2xl font-bold text-neutral-800 dark:text-neutral-200">${stats.averageOrderValue.toFixed(2)}</p>
            </div>
            <div className="p-2 lg:p-3 bg-info/10 rounded-lg">
              <FiMail className="h-4 w-4 lg:h-6 lg:w-6 text-info" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-neutral-800 p-4 lg:p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search customers by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 lg:py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 placeholder-neutral-500 dark:placeholder-neutral-400 mobile-touch-target"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 lg:gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 lg:px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 mobile-touch-target"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 lg:px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 mobile-touch-target"
            >
              <option value="name">Sort by Name</option>
              <option value="joinDate">Sort by Join Date</option>
              <option value="totalSpent">Sort by Total Spent</option>
              <option value="totalOrders">Sort by Orders</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        <div className="overflow-x-auto mobile-table">
          <table className="w-full">
            <thead className="bg-neutral-50 dark:bg-neutral-700">
              <tr>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Customer</th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider hidden sm:table-cell">Contact</th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider hidden md:table-cell">Orders</th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider hidden lg:table-cell">Total Spent</th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Status</th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {sortedCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                  <td className="px-3 lg:px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-neutral-800 dark:text-neutral-200 mobile-text-truncate">{customer.name}</div>
                      <div className="text-xs lg:text-sm text-neutral-500 dark:text-neutral-400">{customer.id}</div>
                      <div className="text-xs lg:text-sm text-neutral-500 dark:text-neutral-400 hidden sm:block">{customer.location}</div>
                    </div>
                  </td>
                  <td className="px-3 lg:px-6 py-4 hidden sm:table-cell">
                    <div>
                      <div className="text-sm text-neutral-800 dark:text-neutral-200 mobile-text-truncate">{customer.email}</div>
                      <div className="text-xs lg:text-sm text-neutral-500 dark:text-neutral-400">{customer.phone}</div>
                    </div>
                  </td>
                  <td className="px-3 lg:px-6 py-4 hidden md:table-cell">
                    <div>
                      <div className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{customer.totalOrders} orders</div>
                      <div className="text-xs lg:text-sm text-neutral-500 dark:text-neutral-400">Last: {customer.lastOrder}</div>
                    </div>
                  </td>
                  <td className="px-3 lg:px-6 py-4 hidden lg:table-cell">
                    <div className="text-sm font-medium text-neutral-800 dark:text-neutral-200">${customer.totalSpent.toFixed(2)}</div>
                  </td>
                  <td className="px-3 lg:px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      customer.status === 'Active' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-3 lg:px-6 py-4 text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/customers/${customer.id}`} className="text-primary hover:text-primary/80 transition-colors mobile-touch-target">
                        <FiEye className="h-4 w-4" />
                      </Link>
                      <button className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors mobile-touch-target">
                        <FiMail className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
