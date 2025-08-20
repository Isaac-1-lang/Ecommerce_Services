const axios = require('axios');

const API_BASE_URL = 'http://localhost:8095';

async function testInventoryEndpoints() {
  console.log('🧪 Testing Warehouse Inventory Endpoints...\n');

  try {
    // Test 1: Get all warehouses
    console.log('1️⃣ Testing GET /api/warehouses');
    const warehousesResponse = await axios.get(`${API_BASE_URL}/api/warehouses`);
    console.log(`✅ Success: Found ${warehousesResponse.data.length} warehouses`);
    
    if (warehousesResponse.data.length > 0) {
      const firstWarehouse = warehousesResponse.data[0];
      console.log(`   First warehouse: ${firstWarehouse.name} (ID: ${firstWarehouse.id})`);
      
      // Test 2: Get inventory for specific warehouse
      console.log('\n2️⃣ Testing GET /api/warehouses/{id}/inventory');
      try {
        const inventoryResponse = await axios.get(`${API_BASE_URL}/api/warehouses/${firstWarehouse.id}/inventory`);
        console.log(`✅ Success: Found ${inventoryResponse.data.length} inventory items for warehouse ${firstWarehouse.name}`);
        
        if (inventoryResponse.data.length > 0) {
          const firstItem = inventoryResponse.data[0];
          console.log(`   Sample item: ${firstItem.productName} - Qty: ${firstItem.quantity} - Status: ${firstItem.isInStock ? 'In Stock' : 'Out of Stock'}`);
        }
      } catch (error) {
        console.log(`❌ Failed to get warehouse inventory: ${error.response?.data?.message || error.message}`);
      }
    }

    // Test 3: Get all warehouse inventory
    console.log('\n3️⃣ Testing GET /api/warehouses/inventory/all');
    try {
      const allInventoryResponse = await axios.get(`${API_BASE_URL}/api/warehouses/inventory/all`);
      console.log(`✅ Success: Found ${allInventoryResponse.data.length} total inventory items across all warehouses`);
      
      if (allInventoryResponse.data.length > 0) {
        const totalValue = allInventoryResponse.data.reduce((sum, item) => sum + (item.quantity * item.productPrice), 0);
        const lowStockItems = allInventoryResponse.data.filter(item => item.isLowStock).length;
        const outOfStockItems = allInventoryResponse.data.filter(item => item.isOutOfStock).length;
        
        console.log(`   Total inventory value: $${totalValue.toFixed(2)}`);
        console.log(`   Low stock items: ${lowStockItems}`);
        console.log(`   Out of stock items: ${outOfStockItems}`);
      }
    } catch (error) {
      console.log(`❌ Failed to get all warehouse inventory: ${error.response?.data?.message || error.message}`);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data?.message || error.message);
  }
}

// Run the tests
testInventoryEndpoints();
