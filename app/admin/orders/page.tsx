"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FiEye, FiTruck, FiCheckCircle, FiClock, FiSearch } from 'react-icons/fi';

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock orders data - replace with real data from your backend
  const orders = [
    {
      id: 'ORD-001',
      customer: {
        name: 'NIYONKURU',
        email: 'niyonkuru@gmail.com'
      },
      items: [
        { name: 'Apple iPhone 15 Pro', quantity: 1, price: 1199.99 }
      ],
      total: 1199.99,
      status: 'Processing',
      date: '2024-01-25',
      paymentStatus: 'Paid'
    },
    {
      id: 'ORD-002',
      customer: {
        name: 'UWASE',
        email: 'atukunda@gmail.com'
      },
      items: [
        { name: 'Nike Air Max 270', quantity: 1, price: 129.99 },
        { name: 'Levi\'s 501 Jeans', quantity: 1, price: 89.99 }
      ],
      total: 219.98,
      status: 'Shipped',
      date: '2024-01-24',
      paymentStatus: 'Paid'
    },
    {
      id: 'ORD-003',
      customer: {
        name: 'KABUGA',
        email: 'kabuga@gmail.com'
      },
      items: [
        { name: 'Sony WH-1000XM5 Headphones', quantity: 1, price: 399.99 }
      ],
      total: 399.99,
      status: 'Delivered',
      date: '2024-01-23',
      paymentStatus: 'Paid'
    },
    {
      id: 'ORD-004',
      customer: {
        name: 'KABUGA',
        email: 'kabuga@gmail.com'
      },
      items: [
        { name: 'MacBook Pro 16"', quantity: 1, price: 2499.99 }
      ],
      total: 2499.99,
      status: 'Pending',
      date: '2024-01-22',
      paymentStatus: 'Pending'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Processing':
        return <FiClock className="h-4 w-4 text-warning" />;
      case 'Shipped':
        return <FiTruck className="h-4 w-4 text-primary" />;
      case 'Delivered':
        return <FiCheckCircle className="h-4 w-4 text-success" />;
      case 'Pending':
        return <FiClock className="h-4 w-4 text-neutral-400" />;
      default:
        return <FiClock className="h-4 w-4 text-neutral-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing':
        return 'bg-warning/10 text-warning-800 border-warning/20';
      case 'Shipped':
        return 'bg-primary/10 text-primary-800 border-primary/20';
      case 'Delivered':
        return 'bg-success/10 text-success-800 border-success/20';
      case 'Pending':
        return 'bg-neutral-100 text-neutral-600 border-neutral-200';
      default:
        return 'bg-neutral-100 text-neutral-600 border-neutral-200';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    return status === 'Paid' 
      ? 'bg-success/10 text-success-800 border-success/20'
      : 'bg-warning/10 text-warning-800 border-warning/20';
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statuses = ['all', 'Pending', 'Processing', 'Shipped', 'Delivered'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Orders</h1>
          <p className="text-neutral-600 mt-1">Manage customer orders and track shipments</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl shadow-soft border border-neutral-200">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search orders by ID, customer name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Statuses' : status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-soft border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-neutral-900">{order.id}</div>
                      <div className="text-sm text-neutral-500">{order.date}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-neutral-900">{order.customer.name}</div>
                      <div className="text-sm text-neutral-500">{order.customer.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-900">
                      {order.items.map((item, index) => (
                        <div key={index} className="mb-1">
                          {item.quantity}x {item.name}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-neutral-900">${order.total.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-primary hover:text-primary-600 p-1 rounded hover:bg-primary/10 transition-colors"
                        title="View Order"
                      >
                        <FiEye className="h-4 w-4" />
                      </Link>
                      {order.status === 'Processing' && (
                        <button
                          className="text-primary hover:text-primary-600 p-1 rounded hover:bg-primary/10 transition-colors"
                          title="Mark as Shipped"
                        >
                          <FiTruck className="h-4 w-4" />
                        </button>
                      )}
                      {order.status === 'Shipped' && (
                        <button
                          className="text-success hover:text-success-600 p-1 rounded hover:bg-success/10 transition-colors"
                          title="Mark as Delivered"
                        >
                          <FiCheckCircle className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Stats */}
        <div className="bg-neutral-50 px-6 py-4 border-t border-neutral-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-neutral-600">Total Orders:</span>
              <span className="ml-2 font-medium text-neutral-900">{filteredOrders.length}</span>
            </div>
            <div>
              <span className="text-neutral-600">Total Revenue:</span>
              <span className="ml-2 font-medium text-neutral-900">
                ${filteredOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
              </span>
            </div>
            <div>
              <span className="text-neutral-600">Pending:</span>
              <span className="ml-2 font-medium text-neutral-900">
                {filteredOrders.filter(order => order.status === 'Pending').length}
              </span>
            </div>
            <div>
              <span className="text-neutral-600">Processing:</span>
              <span className="ml-2 font-medium text-neutral-900">
                {filteredOrders.filter(order => order.status === 'Processing').length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
