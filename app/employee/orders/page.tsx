"use client";

import { useState } from 'react';
import { FiSearch, FiFilter, FiEye, FiEdit, FiCheck, FiX } from 'react-icons/fi';

export default function EmployeeOrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Mock data - replace with real data from your backend
  const orders = [
    {
      id: '#ORD-001',
      customer: 'John Doe',
      email: 'john@example.com',
      phone: '+1-555-0123',
      items: 3,
      total: 299.99,
      status: 'Processing',
      priority: 'High',
      orderDate: '2024-01-15',
      assignedTo: 'Employee 1'
    },
    {
      id: '#ORD-002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1-555-0124',
      items: 2,
      total: 149.99,
      status: 'Ready to Ship',
      priority: 'Medium',
      orderDate: '2024-01-15',
      assignedTo: 'Employee 2'
    },
    {
      id: '#ORD-003',
      customer: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1-555-0125',
      items: 1,
      total: 89.99,
      status: 'Shipped',
      priority: 'Low',
      orderDate: '2024-01-14',
      assignedTo: 'Employee 1'
    },
    {
      id: '#ORD-004',
      customer: 'Sarah Wilson',
      email: 'sarah@example.com',
      phone: '+1-555-0126',
      items: 4,
      total: 399.99,
      status: 'Processing',
      priority: 'High',
      orderDate: '2024-01-15',
      assignedTo: 'Employee 3'
    },
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || order.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing': return 'bg-warning/10 text-warning-600';
      case 'Ready to Ship': return 'bg-primary/10 text-primary-600';
      case 'Shipped': return 'bg-success/10 text-success-600';
      case 'Delivered': return 'bg-success/10 text-success-600';
      case 'Cancelled': return 'bg-error/10 text-error-600';
      default: return 'bg-neutral-100 text-neutral-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-error/10 text-error-600';
      case 'Medium': return 'bg-warning/10 text-warning-600';
      case 'Low': return 'bg-success/10 text-success-600';
      default: return 'bg-neutral-100 text-neutral-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">Order Management</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">Process and manage customer orders efficiently</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            Total Orders: {filteredOrders.length}
          </span>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search orders by ID, customer, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 placeholder-neutral-500 dark:placeholder-neutral-400"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="w-full md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
            >
              <option value="all">All Statuses</option>
              <option value="Processing">Processing</option>
              <option value="Ready to Ship">Ready to Ship</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div className="w-full md:w-48">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
            >
              <option value="all">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 dark:bg-neutral-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Order Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                        {order.id}
                      </div>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        {order.items} items • ${order.total}
                      </div>
                      <div className="text-xs text-neutral-400 dark:text-neutral-500">
                        {order.orderDate}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                        {order.customer}
                      </div>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        {order.email}
                      </div>
                      <div className="text-xs text-neutral-400 dark:text-neutral-500">
                        {order.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}>
                      {order.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      {order.assignedTo}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-neutral-400 hover:text-primary transition-colors" title="View Details">
                        <FiEye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-neutral-400 hover:text-warning transition-colors" title="Edit Order">
                        <FiEdit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-neutral-400 hover:text-success transition-colors" title="Mark Complete">
                        <FiCheck className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-neutral-400 hover:text-error transition-colors" title="Cancel Order">
                        <FiX className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mb-6">
            <FiSearch className="h-8 w-8 text-neutral-400" />
          </div>
          <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-2">
            No orders found
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Try adjusting your search criteria or filters.
          </p>
        </div>
      )}
    </div>
  );
}
