#!/usr/bin/env node

/**
 * Layout Behavior Test Script
 * 
 * This script helps verify that the footer is properly hidden on portal pages
 * and shown on regular pages.
 * 
 * Usage: node test-layout-behavior.js
 */

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

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

// Test cases for different page types
const testCases = [
  {
    path: '/',
    name: 'Home Page',
    shouldHaveFooter: true,
    shouldHaveNavbar: true
  },
  {
    path: '/products',
    name: 'Products Page',
    shouldHaveFooter: true,
    shouldHaveNavbar: true
  },
  {
    path: '/cart',
    name: 'Cart Page',
    shouldHaveFooter: true,
    shouldHaveNavbar: true
  },
  {
    path: '/admin',
    name: 'Admin Portal',
    shouldHaveFooter: false,
    shouldHaveNavbar: false
  },
  {
    path: '/admin/analytics',
    name: 'Admin Analytics',
    shouldHaveFooter: false,
    shouldHaveNavbar: false
  },
  {
    path: '/employee',
    name: 'Employee Portal',
    shouldHaveFooter: false,
    shouldHaveNavbar: false
  },
  {
    path: '/employee/orders',
    name: 'Employee Orders',
    shouldHaveFooter: false,
    shouldHaveNavbar: false
  },
  {
    path: '/delivery',
    name: 'Delivery Portal',
    shouldHaveFooter: false,
    shouldHaveNavbar: false
  },
  {
    path: '/delivery/active',
    name: 'Delivery Active',
    shouldHaveFooter: false,
    shouldHaveNavbar: false
  }
];

function testPathDetection(path) {
  const portalPaths = ["/admin", "/employee", "/delivery"];
  return portalPaths.some(portalPath => path.startsWith(portalPath));
}

function runLayoutTests() {
  log('🚀 Testing Layout Behavior...', 'blue');
  log('================================', 'blue');
  
  let passedTests = 0;
  let totalTests = testCases.length;
  
  testCases.forEach((testCase, index) => {
    log(`\n📋 Test ${index + 1}: ${testCase.name}`, 'blue');
    log(`   Path: ${testCase.path}`, 'reset');
    
    const isPortal = testPathDetection(testCase.path);
    const expectedFooter = !isPortal;
    const expectedNavbar = !isPortal;
    
    // Test footer behavior
    if (expectedFooter === testCase.shouldHaveFooter) {
      logSuccess(`Footer behavior correct: ${expectedFooter ? 'SHOWN' : 'HIDDEN'}`);
    } else {
      logError(`Footer behavior incorrect: expected ${expectedFooter ? 'SHOWN' : 'HIDDEN'}, got ${testCase.shouldHaveFooter ? 'SHOWN' : 'HIDDEN'}`);
    }
    
    // Test navbar behavior
    if (expectedNavbar === testCase.shouldHaveNavbar) {
      logSuccess(`Navbar behavior correct: ${expectedNavbar ? 'SHOWN' : 'HIDDEN'}`);
    } else {
      logError(`Navbar behavior incorrect: expected ${expectedNavbar ? 'SHOWN' : 'HIDDEN'}, got ${testCase.shouldHaveNavbar ? 'SHOWN' : 'HIDDEN'}`);
    }
    
    if (expectedFooter === testCase.shouldHaveFooter && expectedNavbar === testCase.shouldHaveNavbar) {
      passedTests++;
    }
  });
  
  // Summary
  log('\n================================', 'blue');
  log('📊 Layout Test Results:', 'blue');
  log(`✅ Passed: ${passedTests}/${totalTests}`, passedTests === totalTests ? 'green' : 'yellow');
  
  if (passedTests === totalTests) {
    log('🎉 All layout tests passed! Footer and navbar behavior is correct.', 'green');
  } else {
    log('⚠️  Some layout tests failed. Please check the PortalLayout component.', 'yellow');
  }
  
  log('\n🔧 Manual Testing Instructions:', 'blue');
  log('1. Start your development server: npm run dev', 'reset');
  log('2. Visit http://localhost:3000/admin - should NOT have footer', 'reset');
  log('3. Visit http://localhost:3000/employee - should NOT have footer', 'reset');
  log('4. Visit http://localhost:3000/delivery - should NOT have footer', 'reset');
  log('5. Visit http://localhost:3000/ - should HAVE footer', 'reset');
  log('6. Visit http://localhost:3000/products - should HAVE footer', 'reset');
  
  log('\n🔍 Debugging Tips:', 'blue');
  log('• Check browser developer tools Network tab for any errors', 'reset');
  log('• Verify PortalLayout component is working correctly', 'reset');
  log('• Check if any CSS is hiding the footer unexpectedly', 'reset');
  log('• Ensure portal layouts don\'t include footer components', 'reset');
}

// Run the tests
runLayoutTests();
