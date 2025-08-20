const axios = require('axios');

const API_BASE_URL = 'http://localhost:8081';

async function testCategories() {
  console.log('Testing categories endpoint...\n');

  try {
    console.log('1. Testing categories endpoint...');
    const categoriesResponse = await axios.get(`${API_BASE_URL}/api/v1/categories`);
    console.log('✅ Categories endpoint working!');
    console.log(`   Found ${categoriesResponse.data.content?.length || categoriesResponse.data.length} categories`);
    
    if (categoriesResponse.data.content) {
      console.log('   Categories:', categoriesResponse.data.content.map(c => `${c.name} (${c.slug})`));
    } else if (Array.isArray(categoriesResponse.data)) {
      console.log('   Categories:', categoriesResponse.data.map(c => `${c.name} (${c.slug})`));
    }
    
    // Check if our expected categories exist
    const expectedCategories = ['Electronics', 'Fashion', 'Home & Garden', 'Sports & Outdoors', 'Beauty & Health'];
    const foundCategories = categoriesResponse.data.content || categoriesResponse.data || [];
    const foundNames = foundCategories.map(c => c.name);
    
    console.log('\n2. Checking for expected categories...');
    expectedCategories.forEach(expected => {
      if (foundNames.includes(expected)) {
        console.log(`   ✅ Found: ${expected}`);
      } else {
        console.log(`   ❌ Missing: ${expected}`);
      }
    });
    
  } catch (error) {
    console.log('❌ Categories endpoint failed:', error.response?.status, error.response?.statusText);
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
testCategories().catch(console.error);
