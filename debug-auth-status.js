// Debug script to check authentication status
console.log('🔍 Checking Authentication Status...');

// Check if we're in a browser environment
if (typeof window !== 'undefined') {
  // Check localStorage for token
  const token = localStorage.getItem('now_token');
  console.log('Token found:', !!token);
  
  if (token) {
    console.log('Token length:', token.length);
    console.log('Token starts with:', token.substring(0, 20) + '...');
    
    // Try to decode JWT token (basic check)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Token payload:', payload);
      console.log('Token expires at:', new Date(payload.exp * 1000));
      console.log('Token is expired:', Date.now() > payload.exp * 1000);
      console.log('User roles:', payload.roles || payload.authorities || 'No roles found');
    } catch (error) {
      console.log('Could not decode token:', error.message);
    }
  } else {
    console.log('❌ No token found in localStorage');
  }
  
  // Check other auth-related items
  const authItems = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.includes('token') || key && key.includes('auth') || key && key.includes('user')) {
      authItems[key] = localStorage.getItem(key);
    }
  }
  console.log('All auth-related localStorage items:', authItems);
  
} else {
  console.log('❌ Not in browser environment');
}
