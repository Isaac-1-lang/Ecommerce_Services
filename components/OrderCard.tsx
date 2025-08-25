import Link from "next/link";
import { Order, OrderItem } from "../types/order";

export default function OrderCard({
  order,
}: {
  order: Order;
}) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'processing':
        return 'text-blue-600 bg-blue-50';
      case 'shipped':
        return 'text-orange-600 bg-orange-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      case 'refunded':
        return 'text-purple-600 bg-purple-50';
      case 'confirmed':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-neutral-600 bg-neutral-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'Pending';
      case 'processing':
        return 'Processing';
      case 'confirmed':
        return 'Confirmed';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      case 'refunded':
        return 'Refunded';
      default:
        return status;
    }
  };

  return (
    <div className="rounded-lg border border-neutral-200 p-6 bg-white shadow-soft hover:shadow-soft-lg transition-all">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-neutral-500">Order</p>
          <p className="font-semibold text-neutral-800">#{order.orderNumber || order.id}</p>
        </div>
        <div className="text-right">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
            {getStatusText(order.status)}
          </span>
          <p className="text-sm text-neutral-500 mt-1">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      
      {/* Order Items Preview */}
      {order.items && order.items.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-neutral-500 mb-2">Items:</p>
          <div className="space-y-2">
            {order.items.slice(0, 2).map((item: OrderItem, index: number) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-neutral-700">
                  {item.product?.name || `Product ${item.productId}`} × {item.quantity}
                </span>
                <span className="text-neutral-600">${item.totalPrice.toFixed(2)}</span>
              </div>
            ))}
            {order.items.length > 2 && (
              <p className="text-xs text-neutral-500 text-center">
                +{order.items.length - 2} more items
              </p>
            )}
          </div>
        </div>
      )}

      {/* Shipping Address Preview */}
      {order.shippingAddress && (
        <div className="mb-4 text-sm text-neutral-600">
          <p className="text-neutral-500 mb-1">Shipping to:</p>
          <p>{order.shippingAddress.street}</p>
          <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
        </div>
      )}

      {/* Order Summary */}
      <div className="border-t border-neutral-100 pt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-neutral-600">Subtotal:</span>
          <span className="text-sm text-neutral-700">${order.subtotal.toFixed(2)}</span>
        </div>
        {order.tax > 0 && (
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-neutral-600">Tax:</span>
            <span className="text-sm text-neutral-700">${order.tax.toFixed(2)}</span>
          </div>
        )}
        {order.shipping > 0 && (
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-neutral-600">Shipping:</span>
            <span className="text-sm text-neutral-700">${order.shipping.toFixed(2)}</span>
          </div>
        )}
        {order.discount > 0 && (
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-neutral-600">Discount:</span>
            <span className="text-sm text-neutral-700">-${order.discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
          <span className="font-semibold text-neutral-800">Total:</span>
          <span className="text-lg font-bold text-primary">${order.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center justify-between pt-3 border-t border-neutral-100">
        <Link 
          href={`/orders/${order.id}`} 
          className="text-primary hover:text-primary-600 text-sm font-medium transition-colors"
        >
          View details
        </Link>
        
        {/* Cancel button for pending/processing orders */}
        {(order.status === 'PENDING' || order.status === 'PROCESSING') && (
          <button 
            className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
            onClick={() => {
              // This will be handled by the parent component
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('cancelOrder', { detail: order.id }));
              }
            }}
          >
            Cancel Order
          </button>
        )}
      </div>
    </div>
  );
}
