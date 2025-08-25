// Test script to check backend connectivity
const axios = require('axios');

async function testBackendConnection() {
  try {
    console.log('Testing backend connection...');
    
    // Test 1: Basic connectivity
    const response = await axios.get('http://localhost:8081/api/v1/health', {
      timeout: 5000
    });
    console.log('✅ Backend is accessible:', response.status);
    
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.error('❌ Backend is not running on port 8081');
      console.error('Please start the backend with: cd Backend-service && mvn spring-boot:run');
    } else if (error.code === 'ENOTFOUND') {
      console.error('❌ Cannot resolve localhost');
    } else if (error.response) {
      console.log('✅ Backend responded with status:', error.response.status);
      console.log('Response:', error.response.data);
    } else {
      console.error('❌ Connection error:', error.message);
    }
  }
}

testBackendConnection();


