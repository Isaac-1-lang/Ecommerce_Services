// Test script to check backend payment service connectivity
const testBackendConnection = async () => {
  console.log('Testing backend payment service connection...');
  
  try {
    // Test 1: Check if backend is running
    const healthCheck = await fetch('http://localhost:8081/api/v1/payments/create-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 1000,
        currency: 'usd',
        orderId: 'test_order_123',
        description: 'Test payment'
      })
    });
    
    console.log('Response status:', healthCheck.status);
    console.log('Response headers:', Object.fromEntries(healthCheck.headers.entries()));
    
    if (healthCheck.status === 401) {
      console.log('✅ Backend is running but requires authentication');
      console.log('This is expected - the payment endpoint requires a valid JWT token');
    } else if (healthCheck.status === 200) {
      const response = await healthCheck.json();
      console.log('✅ Backend is running and payment intent created:', response);
    } else {
      console.log('❌ Backend connection issue:', healthCheck.status, healthCheck.statusText);
    }
    
  } catch (error) {
    console.log('❌ Backend connection failed:', error.message);
    console.log('Make sure the Java backend is running on port 8081');
  }
};

// Test 2: Check environment variables
console.log('Environment check:');
console.log('NEXT_PUBLIC_API_BASE_URL:', process.env.NEXT_PUBLIC_API_BASE_URL);
console.log('NEXT_PUBLIC_JAVA_BACKEND_URL:', process.env.NEXT_PUBLIC_JAVA_BACKEND_URL);

testBackendConnection();
