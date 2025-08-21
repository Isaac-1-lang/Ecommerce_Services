"use client";

import { useCartStore } from "../../features/cart/store";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";

export default function TestCartPage() {
  const { items, totalQuantity, totalPrice, addItem, removeItem, increase, decrease, clearCart } = useCartStore();

  const testProduct = {
    id: "test-1",
    name: "Test Product",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center",
    quantity: 1,
  };

  const handleAddTestItem = () => {
    addItem(testProduct);
  };

  const handleAddAnotherTestItem = () => {
    addItem({
      ...testProduct,
      id: `test-${Date.now()}`,
      name: `Test Product ${Date.now()}`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Cart Test Page</h1>
      
      {/* Cart Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Items</p>
            <p className="text-2xl font-bold text-blue-600">{totalQuantity}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Price</p>
            <p className="text-2xl font-bold text-green-600">${totalPrice.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Unique Items</p>
            <p className="text-2xl font-bold text-purple-600">{items.length}</p>
          </div>
        </div>
      </div>

      {/* Test Buttons */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <h2 className="text-xl font-semibold mb-4">Test Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleAddTestItem}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Test Item
          </button>
          <button
            onClick={handleAddAnotherTestItem}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Add Another Test Item
          </button>
          <button
            onClick={clearCart}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Clear Cart
          </button>
        </div>
      </div>

      {/* Cart Items */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Cart Items ({items.length})</h2>
        </div>
        
        {items.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No items in cart</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <div key={item.id} className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decrease(item.id)}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <FiMinus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => increase(item.id)}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <FiPlus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Debug Info */}
      <div className="mt-8 bg-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Debug Info</h3>
        <pre className="text-sm overflow-auto">
          {JSON.stringify({ items, totalQuantity, totalPrice }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
