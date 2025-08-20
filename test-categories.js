// Test script to check categories availability
const testCategories = async () => {
  console.log('🔍 Testing Categories Availability...');
  
  try {
    // Test 1: Check if backend is running
    const response = await fetch('http://localhost:8081/api/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const data = await response.json();
      console.log('Categories response:', data);
      
      if (data.content && Array.isArray(data.content)) {
        console.log('✅ Categories found:', data.content.length);
        data.content.forEach(cat => {
          console.log(`  - ${cat.name} (ID: ${cat.id}, Slug: ${cat.slug})`);
        });
      } else if (Array.isArray(data)) {
        console.log('✅ Categories found:', data.length);
        data.forEach(cat => {
          console.log(`  - ${cat.name} (ID: ${cat.id}, Slug: ${cat.slug})`);
        });
      } else {
        console.log('❌ No categories found in response');
      }
    } else {
      console.log('❌ Failed to fetch categories:', response.status, response.statusText);
    }
    
  } catch (error) {
    console.error('❌ Error testing categories:', error.message);
  }
};

// Run the test
testCategories();
