// Test script to check customer orders endpoint
const axios = require('axios');

async function testCustomerOrders() {
  try {
    console.log('Testing customer orders endpoint...');
    
    // Get token from localStorage (simulate browser environment)
    const token = process.env.AUTH_TOKEN || 'your-token-here';
    
    if (!token || token === 'your-token-here') {
      console.error('❌ No valid token provided. Please set AUTH_TOKEN environment variable or update the script.');
      return;
    }
    
    const response = await axios.get('http://localhost:8081/api/v1/customer/orders', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      timeout: 5000
    });
    
    console.log('✅ Customer orders endpoint is accessible');
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(response.data, null, 2));
    
    if (response.data.success && response.data.data) {
      console.log(`✅ Found ${response.data.data.length} orders`);
    } else {
      console.log('⚠️  No orders found or response format incorrect');
    }
    
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.error('❌ Backend is not running on port 8081');
    } else if (error.response?.status === 401) {
      console.error('❌ Authentication failed - invalid or expired token');
    } else if (error.response?.status === 403) {
      console.error('❌ Access forbidden - user may not have CUSTOMER role');
    } else if (error.response) {
      console.error('❌ API Error:', error.response.status, error.response.data);
    } else {
      console.error('❌ Connection error:', error.message);
    }
  }
}

testCustomerOrders();
