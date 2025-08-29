"use client";

import { useState } from 'react';
import { 
  FiDownload, 
  FiCalendar, 
  FiDollarSign, 
  FiShoppingCart, 
  FiUsers, 
  FiPackage,
  FiTrendingUp,
  FiTrendingDown,
  FiBarChart,
  FiPieChart,
  FiFileText,
  FiFilter,
  FiAlertCircle,
  FiX
} from 'react-icons/fi';

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState('sales');
  const [dateRange, setDateRange] = useState('30d');
  const [exportFormat, setExportFormat] = useState('pdf');

  // Mock report data - replace with real data from your backend
  const salesData = {
    totalRevenue: 45230.50,
    totalOrders: 156,
    averageOrderValue: 289.94,
    growthRate: 16.1,
    topProducts: [
      { name: 'Apple iPhone 15 Pro', sales: 45, revenue: 53999.55 },
      { name: 'Sony WH-1000XM5 Headphones', sales: 32, revenue: 12799.68 },
      { name: 'Nike Air Max 270', sales: 28, revenue: 3639.72 },
      { name: 'MacBook Pro 16"', sales: 12, revenue: 29999.88 },
      { name: 'Levi\'s 501 Jeans', sales: 25, revenue: 2249.75 }
    ],
    monthlyData: [
      { month: 'Jan', revenue: 35000, orders: 120 },
      { month: 'Feb', revenue: 42000, orders: 145 },
      { month: 'Mar', revenue: 38000, orders: 130 },
      { month: 'Apr', revenue: 45000, orders: 155 },
      { month: 'May', revenue: 48000, orders: 165 },
      { month: 'Jun', revenue: 45230, orders: 156 }
    ]
  };

  const customerData = {
    totalCustomers: 89,
    newCustomers: 23,
    repeatCustomers: 66,
    averageLifetimeValue: 508.21,
    topCustomers: [
      { name: 'NIYONKURU', email: 'niyonkuru@gmail.com', totalSpent: 2899.99, orders: 8 },
      { name: 'UWASE', email: 'atukunda@gmail.com', totalSpent: 1899.99, orders: 6 },
      { name: 'KABUGA', email: 'kabuga@gmail.com', totalSpent: 1599.99, orders: 5 },
      { name: 'KABUGA', email: 'kabuga@gmail.com', totalSpent: 1299.99, orders: 4 },
      { name: 'KABUGA', email: 'kabuga@gmail.com', totalSpent: 999.99, orders: 3 }
    ]
  };

  const inventoryData = {
    totalProducts: 30,
    lowStockProducts: 3,
    outOfStockProducts: 1,
    totalValue: 125000,
    categoryBreakdown: [
      { category: 'Electronics', count: 12, value: 75000 },
      { category: 'Fashion', count: 8, value: 25000 },
      { category: 'Home & Garden', count: 6, value: 15000 },
      { category: 'Sports & Outdoors', count: 4, value: 10000 }
    ]
  };

  const reportTypes = [
    { id: 'sales', name: 'Sales Report', icon: FiDollarSign, description: 'Revenue, orders, and sales performance' },
    { id: 'customers', name: 'Customer Report', icon: FiUsers, description: 'Customer behavior and demographics' },
    { id: 'inventory', name: 'Inventory Report', icon: FiPackage, description: 'Stock levels and product performance' },
    { id: 'analytics', name: 'Analytics Report', icon: FiBarChart, description: 'Comprehensive business analytics' }
  ];

  const getReportData = () => {
    switch (selectedReport) {
      case 'sales':
        return salesData;
      case 'customers':
        return customerData;
      case 'inventory':
        return inventoryData;
      default:
        return salesData;
    }
  };

  const handleExport = () => {
    // Mock export functionality
    console.log(`Exporting ${selectedReport} report in ${exportFormat} format for ${dateRange}`);
    // In real app, this would call an API to generate and download the report
  };

  const currentData = getReportData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">Reports</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">Generate and export detailed business reports</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
            <option value="csv">CSV</option>
          </select>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            <FiDownload className="h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportTypes.map((report) => (
          <button
            key={report.id}
            onClick={() => setSelectedReport(report.id)}
            className={`p-4 rounded-lg border transition-all ${
              selectedReport === report.id
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-neutral-200 dark:border-neutral-700 hover:border-primary/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <report.icon className="h-6 w-6" />
              <div className="text-left">
                <h3 className="font-semibold">{report.name}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{report.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Report Content */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-soft border border-neutral-200 dark:border-neutral-700 p-6">
        {selectedReport === 'sales' && (
          <div className="space-y-6">
            {/* Sales Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Total Revenue</p>
                    <p className="text-2xl font-bold">${'totalRevenue' in currentData ? currentData.totalRevenue.toLocaleString() : 'N/A'}</p>
                  </div>
                  <FiDollarSign className="h-8 w-8 text-blue-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Total Orders</p>
                    <p className="text-2xl font-bold">{'totalOrders' in currentData ? currentData.totalOrders : 'N/A'}</p>
                  </div>
                  <FiShoppingCart className="h-8 w-8 text-green-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">Avg Order Value</p>
                    <p className="text-2xl font-bold">${'averageOrderValue' in currentData ? currentData.averageOrderValue : 'N/A'}</p>
                  </div>
                  <FiTrendingUp className="h-8 w-8 text-purple-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  
                  <FiTrendingUp className="h-8 w-8 text-orange-200" />
                </div>
              </div>
            </div>

            {/* Top Products */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-700">
                      <th className="text-left py-3 px-4">Product</th>
                      <th className="text-right py-3 px-4">Units Sold</th>
                      <th className="text-right py-3 px-4">Revenue</th>
                    </tr>
                  </thead>
                  {/* <tbody>
                      {currentData.topProducts.map((product, index) => (
                      <tr key={index} className="border-b border-neutral-100 dark:border-neutral-800">
                        <td className="py-3 px-4">{product.name}</td>
                        <td className="text-right py-3 px-4">{product.sales}</td>
                        <td className="text-right py-3 px-4">${product.revenue.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody> */}
                </table>
              </div>
            </div>
          </div>
        )}

        {selectedReport === 'customers' && (
          <div className="space-y-6">
            {/* Customer Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  {/* <div>
                    <p className="text-blue-100">Total Customers</p>
                    <p className="text-2xl font-bold">{currentData.totalCustomers}</p>
                  </div> */}
                  <FiUsers className="h-8 w-8 text-blue-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">New Customers</p>
                    {/* <p className="text-2xl font-bold">{currentData.newCustomers}</p> */}
                  </div>
                  {/* <FiUser className="h-8 w-8 text-green-200" /> */}
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">Repeat Customers</p>
                    {/* <p className="text-2xl font-bold">{currentData.repeatCustomers}</p> */}
                  </div>
                  <FiUsers className="h-8 w-8 text-purple-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100">Avg LTV</p>
                    {/* <p className="text-2xl font-bold">${currentData.averageLifetimeValue}</p> */}
                  </div>
                  <FiDollarSign className="h-8 w-8 text-orange-200" />
                </div>
              </div>
            </div>

            {/* Top Customers */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Top Customers</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-700">
                      <th className="text-left py-3 px-4">Customer</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-right py-3 px-4">Total Spent</th>
                      <th className="text-right py-3 px-4">Orders</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {currentData.topCustomers.map((customer, index) => (
                      <tr key={index} className="border-b border-neutral-100 dark:border-neutral-800">
                        <td className="py-3 px-4">{customer.name}</td>
                        <td className="py-3 px-4">{customer.email}</td>
                        <td className="text-right py-3 px-4">${customer.totalSpent.toLocaleString()}</td>
                        <td className="text-right py-3 px-4">{customer.orders}</td>
                      </tr>
                    ))} */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {selectedReport === 'inventory' && (
          <div className="space-y-6">
            {/* Inventory Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Total Products</p>
                    {/* <p className="text-2xl font-bold">{currentData.totalProducts}</p> */}
                  </div>
                  <FiPackage className="h-8 w-8 text-blue-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100">Low Stock</p>
                    {/* <p className="text-2xl font-bold">{currentData.lowStockProducts}</p> */}
                  </div>
                  <FiAlertCircle className="h-8 w-8 text-yellow-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100">Out of Stock</p>
                    {/* <p className="text-2xl font-bold">{currentData.outOfStockProducts}</p> */}
                  </div>
                  <FiX className="h-8 w-8 text-red-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Total Value</p>
                    {/* <p className="text-2xl font-bold">${currentData.totalValue.toLocaleString()}</p> */}
                  </div>
                  <FiDollarSign className="h-8 w-8 text-green-200" />
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Inventory by Category</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-700">
                      <th className="text-left py-3 px-4">Category</th>
                      <th className="text-right py-3 px-4">Products</th>
                      <th className="text-right py-3 px-4">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {currentData.categoryBreakdown.map((category, index) => (
                      <tr key={index} className="border-b border-neutral-100 dark:border-neutral-800">
                        <td className="py-3 px-4">{category.category}</td>
                        <td className="text-right py-3 px-4">{category.count}</td>
                        <td className="text-right py-3 px-4">${category.value.toLocaleString()}</td>
                      </tr>
                    ))} */} 
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
