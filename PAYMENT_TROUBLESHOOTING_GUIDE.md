# 🔧 Payment Intent Creation Troubleshooting Guide

## Issue: "Failed to create payment intent" in Checkout

### 🔍 Root Cause Analysis

The payment intent creation can fail due to several reasons:

1. **Backend Connection Issues**
2. **Authentication Problems**
3. **Invalid Request Data**
4. **Environment Configuration Issues**

### 🛠️ Fixes Applied

#### 1. Fixed Double API Path Issue
**Problem**: URL had `/api/api/v1/payments/create-intent` (double "api")
**Solution**: Changed to `/api/v1/payments/create-intent`

#### 2. Fixed Authentication Token Key
**Problem**: Token was stored as `"now_token"` but accessed as `"token"`
**Solution**: Updated to use correct token key `"now_token"`

#### 3. Fixed Role-Based Authorization
**Problem**: Backend expected `'USER'` role but user had `'CUSTOMER'` role
**Solution**: Updated all payment endpoints to accept both `'USER'` and `'CUSTOMER'` roles

#### 4. Enhanced Error Handling
**Problem**: Generic error messages
**Solution**: Added specific error handling for different HTTP status codes

#### 5. Improved Request Structure
**Problem**: Missing required fields for backend
**Solution**: Added `orderId` and `description` fields

### 🧪 Testing Steps

#### Step 1: Check Backend Status
```bash
# Run the test script
node test-payment-backend.js
```

#### Step 2: Verify Authentication
1. Open browser developer tools
2. Go to Application > Local Storage
3. Check if `now_token` exists and has a valid value

#### Step 3: Test Payment Flow
1. Add items to cart
2. Proceed to checkout
3. Fill shipping information
4. Try payment with test card: `4242 4242 4242 4242`

### 🔧 Manual Debugging

#### Check Browser Console
Look for these error messages:
- `Authentication required. Please log in to continue.` → Login issue
- `Access denied. Please check your permissions.` → Authorization issue
- `Invalid amount` → Amount validation issue
- `Backend connection failed` → Backend not running

#### Check Network Tab
1. Open Developer Tools > Network
2. Look for request to `/api/create-payment-intent`
3. Check request payload and response

### 🚀 Quick Fixes

#### If Backend is Not Running:
```bash
cd Backend-service
./mvnw spring-boot:run
```

#### If Authentication is Missing:
1. Log out and log back in
2. Check if JWT token is properly stored
3. Verify token hasn't expired

#### If Environment Variables are Missing:
1. Copy `env.example` to `.env.local`
2. Update the backend URL if needed
3. Restart the development server

### 📋 Common Error Messages & Solutions

| Error Message | Cause | Solution |
|---------------|-------|----------|
| "Authentication required" | Missing or invalid JWT token | Log in again |
| "Access denied" | User doesn't have payment permissions | Check user role (should be 'USER' or 'CUSTOMER') |
| "Invalid amount" | Amount is 0 or negative | Check cart total |
| "Backend connection failed" | Java backend not running | Start backend service |
| "Invalid response format" | Backend response structure changed | Check backend logs |

### 🔄 Alternative Payment Flow

If the Java backend payment service continues to have issues, you can:

1. **Use Direct Stripe Integration** (Temporary)
   - Modify `lib/stripe.ts` to use Stripe directly
   - Bypass the Java backend for payment processing

2. **Implement Fallback Payment**
   - Add a mock payment option for testing
   - Use a different payment provider

### 📞 Support

If issues persist:
1. Check backend logs for detailed error messages
2. Verify all environment variables are set correctly
3. Ensure the Java backend is running on port 8081
4. Test with a fresh browser session

### 🔒 Security Notes

- Never expose Stripe secret keys in frontend code
- Always validate payment amounts on the backend
- Implement proper error handling to avoid exposing sensitive information
- Use HTTPS in production environments
