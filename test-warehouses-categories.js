const axios = require('axios');

const API_BASE_URL = 'http://localhost:8081';

async function testEndpoints() {
  console.log('Testing backend endpoints...\n');

  // Test categories endpoint
  try {
    console.log('1. Testing categories endpoint...');
    const categoriesResponse = await axios.get(`${API_BASE_URL}/api/v1/categories`);
    console.log('✅ Categories endpoint working!');
    console.log(`   Found ${categoriesResponse.data.content?.length || categoriesResponse.data.length} categories`);
    if (categoriesResponse.data.content) {
      console.log('   Sample categories:', categoriesResponse.data.content.slice(0, 3).map(c => c.name));
    } else if (Array.isArray(categoriesResponse.data)) {
      console.log('   Sample categories:', categoriesResponse.data.slice(0, 3).map(c => c.name));
    }
  } catch (error) {
    console.log('❌ Categories endpoint failed:', error.response?.status, error.response?.statusText);
    if (error.response?.data) {
      console.log('   Error details:', error.response.data);
    }
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test warehouses endpoint
  try {
    console.log('2. Testing warehouses endpoint...');
    const warehousesResponse = await axios.get(`${API_BASE_URL}/api/warehouses`);
    console.log('✅ Warehouses endpoint working!');
    console.log(`   Found ${warehousesResponse.data.length} warehouses`);
    console.log('   Sample warehouses:', warehousesResponse.data.slice(0, 3).map(w => w.name));
  } catch (error) {
    console.log('❌ Warehouses endpoint failed:', error.response?.status, error.response?.statusText);
    if (error.response?.data) {
      console.log('   Error details:', error.response.data);
    }
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test if backend is running
  try {
    console.log('3. Testing backend connectivity...');
    const healthResponse = await axios.get(`${API_BASE_URL}/v3/api-docs`, { timeout: 5000 });
    console.log('✅ Backend is running and accessible!');
  } catch (error) {
    console.log('❌ Backend connectivity failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('   Backend is not running. Please start the Spring Boot application.');
    }
  }
}

// Run the test
testEndpoints().catch(console.error);
