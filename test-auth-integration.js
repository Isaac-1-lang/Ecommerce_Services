#!/usr/bin/env node

/**
 * Authentication Integration Test Script
 * 
 * This script tests the authentication endpoints to ensure proper integration
 * between the Next.js frontend and Java Spring Boot backend.
 * 
 * Usage: node test-auth-integration.js
 */

const axios = require('axios');

// Configuration
const BASE_URL = 'http://localhost:8080/api/v1/auth/users';
const TEST_EMAIL = 'test.user@example.com';
const TEST_PASSWORD = 'password123';
const TEST_FIRST_NAME = 'Test';
const TEST_LAST_NAME = 'User';
const TEST_PHONE = '+1234567890';

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

let authToken = null;

// Helper functions
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

// Test functions
async function testUserRegistration() {
  logInfo('Testing User Registration...');
  
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      firstName: TEST_FIRST_NAME,
      lastName: TEST_LAST_NAME,
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      phoneNumber: TEST_PHONE
    });

    if (response.data.success) {
      logSuccess('User registration successful');
      return true;
    } else {
      logError(`Registration failed: ${response.data.message}`);
      return false;
    }
  } catch (error) {
    if (error.response?.data?.message === 'Email already exists') {
      logWarning('User already exists, continuing with login test');
      return true;
    } else {
      logError(`Registration error: ${error.response?.data?.message || error.message}`);
      return false;
    }
  }
}

async function testUserLogin() {
  logInfo('Testing User Login...');
  
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email: TEST_EMAIL,
      password: TEST_PASSWORD
    });

    if (response.data.success && response.data.data) {
      authToken = response.data.data.token;
      logSuccess('User login successful');
      logInfo(`Token received: ${authToken.substring(0, 20)}...`);
      return true;
    } else {
      logError(`Login failed: ${response.data.message}`);
      return false;
    }
  } catch (error) {
    logError(`Login error: ${error.response?.data?.message || error.message}`);
    return false;
  }
}

async function testInvalidLogin() {
  logInfo('Testing Invalid Login...');
  
  try {
    await axios.post(`${BASE_URL}/login`, {
      email: TEST_EMAIL,
      password: 'wrongpassword'
    });
    
    logError('Invalid login should have failed');
    return false;
  } catch (error) {
    if (error.response?.data?.message === 'Invalid username or password') {
      logSuccess('Invalid login properly rejected');
      return true;
    } else {
      logError(`Unexpected error: ${error.response?.data?.message || error.message}`);
      return false;
    }
  }
}

async function testGetCurrentUser() {
  logInfo('Testing Get Current User...');
  
  if (!authToken) {
    logError('No auth token available');
    return false;
  }
  
  try {
    const response = await axios.get(`${BASE_URL}/me`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    if (response.data.success && response.data.data) {
      logSuccess('Get current user successful');
      logInfo(`User: ${response.data.data.name} (${response.data.data.email})`);
      return true;
    } else {
      logError(`Get current user failed: ${response.data.message}`);
      return false;
    }
  } catch (error) {
    logError(`Get current user error: ${error.response?.data?.message || error.message}`);
    return false;
  }
}

async function testInvalidToken() {
  logInfo('Testing Invalid Token...');
  
  try {
    await axios.get(`${BASE_URL}/me`, {
      headers: {
        'Authorization': 'Bearer invalid_token'
      }
    });
    
    logError('Invalid token should have been rejected');
    return false;
  } catch (error) {
    if (error.response?.status === 401) {
      logSuccess('Invalid token properly rejected');
      return true;
    } else {
      logError(`Unexpected error: ${error.response?.data?.message || error.message}`);
      return false;
    }
  }
}

async function testPasswordReset() {
  logInfo('Testing Password Reset Request...');
  
  try {
    const response = await axios.post(`${BASE_URL}/request-password-reset`, {
      email: TEST_EMAIL
    });

    if (response.data.success) {
      logSuccess('Password reset request successful');
      return true;
    } else {
      logError(`Password reset failed: ${response.data.message}`);
      return false;
    }
  } catch (error) {
    logError(`Password reset error: ${error.response?.data?.message || error.message}`);
    return false;
  }
}

async function testLogout() {
  logInfo('Testing User Logout...');
  
  if (!authToken) {
    logError('No auth token available');
    return false;
  }
  
  try {
    const response = await axios.post(`${BASE_URL}/logout`, {}, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    if (response.data.success) {
      logSuccess('User logout successful');
      authToken = null;
      return true;
    } else {
      logError(`Logout failed: ${response.data.message}`);
      return false;
    }
  } catch (error) {
    logError(`Logout error: ${error.response?.data?.message || error.message}`);
    return false;
  }
}

async function testResponseFormat() {
  logInfo('Testing Response Format Consistency...');
  
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email: TEST_EMAIL,
      password: TEST_PASSWORD
    });

    const data = response.data;
    
    // Check if response has the expected format
    if (data.hasOwnProperty('success') && 
        data.hasOwnProperty('data') && 
        data.hasOwnProperty('message')) {
      logSuccess('Response format is consistent');
      return true;
    } else {
      logError('Response format is inconsistent');
      return false;
    }
  } catch (error) {
    logError(`Response format test error: ${error.message}`);
    return false;
  }
}

// Main test runner
async function runTests() {
  log('🚀 Starting Authentication Integration Tests...', 'blue');
  log('================================================', 'blue');
  
  const tests = [
    { name: 'Response Format', fn: testResponseFormat },
    { name: 'User Registration', fn: testUserRegistration },
    { name: 'User Login', fn: testUserLogin },
    { name: 'Invalid Login', fn: testInvalidLogin },
    { name: 'Get Current User', fn: testGetCurrentUser },
    { name: 'Invalid Token', fn: testInvalidToken },
    { name: 'Password Reset', fn: testPasswordReset },
    { name: 'User Logout', fn: testLogout }
  ];
  
  let passedTests = 0;
  let totalTests = tests.length;
  
  for (const test of tests) {
    log(`\n📋 Running: ${test.name}`, 'blue');
    try {
      const result = await test.fn();
      if (result) {
        passedTests++;
      }
    } catch (error) {
      logError(`Test ${test.name} threw an error: ${error.message}`);
    }
  }
  
  // Summary
  log('\n================================================', 'blue');
  log('📊 Test Results Summary:', 'blue');
  log(`✅ Passed: ${passedTests}/${totalTests}`, passedTests === totalTests ? 'green' : 'yellow');
  
  if (passedTests === totalTests) {
    log('🎉 All tests passed! Authentication integration is working correctly.', 'green');
  } else {
    log('⚠️  Some tests failed. Please check the errors above.', 'yellow');
  }
  
  log('\n🔧 Next Steps:', 'blue');
  log('1. Test the frontend integration manually', 'reset');
  log('2. Check browser console for any errors', 'reset');
  log('3. Verify JWT token storage in localStorage', 'reset');
  log('4. Test protected routes in the frontend', 'reset');
}

// Check if axios is available
try {
  require('axios');
} catch (error) {
  logError('Axios is not installed. Please install it first:');
  log('npm install axios', 'yellow');
  process.exit(1);
}

// Run the tests
runTests().catch(error => {
  logError(`Test runner error: ${error.message}`);
  process.exit(1);
});
