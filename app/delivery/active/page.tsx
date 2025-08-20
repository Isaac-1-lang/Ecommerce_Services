"use client";

import { useState } from 'react';
import { FiSearch, FiMapPin, FiClock, FiPackage, FiCheckCircle, FiAlertCircle, FiNavigation } from 'react-icons/fi';

export default function ActiveDeliveriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data - replace with real data from your backend
  const activeDeliveries = [
    {
      id: '#DEL-001',
      orderId: '#ORD-001',
      customer: 'NIYONKURU',
      address: '123 Main St, Downtown, City, State 12345',
      phone: '+1-555-0123',
      items: [
        { name: 'Wireless Headphones', quantity: 1, price: 99.99 },
        { name: 'Phone Case', quantity: 2, price: 19.99 }
      ],
      total: 139.97,
      status: 'In Transit',
      priority: 'High',
      eta: '2:30 PM',
      distance: '2.3 km',
      assignedAt: '1:45 PM',
      notes: 'Customer prefers delivery between 2-4 PM'
    },
    {
      id: '#DEL-002',
      orderId: '#ORD-002',
      customer: 'UWASE',
      address: '456 Oak Ave, Midtown, City, State 12345',
      phone: '+1-555-0124',
      items: [
        { name: 'Laptop Stand', quantity: 1, price: 49.99 }
      ],
      total: 49.99,
      status: 'Out for Delivery',
      priority: 'Medium',
      eta: '3:15 PM',
      distance: '4.1 km',
      assignedAt: '2:00 PM',
      notes: 'Leave at front door if no answer'
    },
    {
      id: '#DEL-003',
      orderId: '#ORD-003',
      customer: 'KABUGA',
      address: '789 Pine Rd, Uptown, City, State 12345',
      phone: '+1-555-0125',
      items: [
        { name: 'Bluetooth Speaker', quantity: 1, price: 89.99 }
      ],
      total: 89.99,
      status: 'At Location',
      priority: 'Low',
      eta: '3:45 PM',
      distance: '1.8 km',
      assignedAt: '2:15 PM',
      notes: 'Customer will meet at lobby'
    },
  ];

  const filteredDeliveries = activeDeliveries.filter(delivery => {
    const matchesSearch = delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || delivery.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Transit': return 'bg-primary/10 text-primary-600';
      case 'Out for Delivery': return 'bg-warning/10 text-warning-600';
      case 'At Location': return 'bg-success/10 text-success-600';
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

  const updateDeliveryStatus = (deliveryId: string, newStatus: string) => {
    // This would update the delivery status in your backend
    console.log(`Updating delivery ${deliveryId} to status: ${newStatus}`);
    // You would typically make an API call here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">Active Deliveries</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">Manage your current delivery assignments</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            Active: {filteredDeliveries.length}
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
                placeholder="Search deliveries by ID, customer, or address..."
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
              <option value="In Transit">In Transit</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="At Location">At Location</option>
            </select>
          </div>
        </div>
      </div>

      {/* Deliveries Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDeliveries.map((delivery) => (
          <div key={delivery.id} className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                  {delivery.id}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Order: {delivery.orderId}
                </p>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(delivery.priority)}`}>
                  {delivery.priority}
                </span>
              </div>
            </div>

            {/* Customer Info */}
            <div className="mb-4">
              <h4 className="font-medium text-neutral-800 dark:text-neutral-200 mb-2">
                {delivery.customer}
              </h4>
              <div className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                <FiMapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-2">{delivery.address}</span>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                📞 {delivery.phone}
              </p>
            </div>

            {/* Items */}
            <div className="mb-4">
              <h5 className="font-medium text-neutral-800 dark:text-neutral-200 mb-2">Items ({delivery.items.length})</h5>
              <div className="space-y-1">
                {delivery.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="text-neutral-800 dark:text-neutral-200">
                      ${item.price}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-1 mt-2">
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>${delivery.total}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Status and Actions */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <FiClock className="h-4 w-4 text-neutral-400" />
                  <span className="text-neutral-600 dark:text-neutral-400">ETA: {delivery.eta}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiNavigation className="h-4 w-4 text-neutral-400" />
                  <span className="text-neutral-600 dark:text-neutral-400">{delivery.distance}</span>
                </div>
              </div>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(delivery.status)}`}>
                {delivery.status}
              </span>
            </div>

            {/* Notes */}
            {delivery.notes && (
              <div className="mb-4 p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  <span className="font-medium">Notes:</span> {delivery.notes}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateDeliveryStatus(delivery.id, 'Out for Delivery')}
                className="flex-1 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors"
              >
                Start Delivery
              </button>
              <button
                onClick={() => updateDeliveryStatus(delivery.id, 'At Location')}
                className="flex-1 px-4 py-2 bg-warning text-white text-sm font-medium rounded-lg hover:bg-warning-600 transition-colors"
              >
                Arrived
              </button>
              <button
                onClick={() => updateDeliveryStatus(delivery.id, 'Delivered')}
                className="px-4 py-2 bg-success text-white text-sm font-medium rounded-lg hover:bg-success-600 transition-colors"
              >
                <FiCheckCircle className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDeliveries.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mb-6">
            <FiPackage className="h-8 w-8 text-neutral-400" />
          </div>
          <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-2">
            No active deliveries
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            You're all caught up! Check back later for new assignments.
          </p>
        </div>
      )}
    </div>
  );
}
