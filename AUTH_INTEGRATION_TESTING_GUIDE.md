# 🔐 Authentication Integration Testing Guide

This guide helps you test the authentication integration between your Next.js frontend and Java Spring Boot backend to ensure proper error handling and response formats.

## ✅ **Fixed Issues**

### Backend Improvements:
1. **Consistent Response Format**: All auth endpoints now return `ApiResponse<T>` format
2. **Proper Error Handling**: All endpoints have try-catch blocks
3. **Fixed LoginResponseDto**: Added missing `userPhone` parameter
4. **Enhanced GlobalExceptionHandler**: Better error handling

### Frontend Improvements:
1. **Updated Response Interfaces**: Match backend response format
2. **Fixed Login Data Mapping**: Properly maps backend response to frontend format
3. **Enhanced Error Handling**: Better error message extraction

## 🧪 **Testing Checklist**

### 1. **Backend API Testing**

#### Test User Registration:
```bash
# Test successful registration
curl -X POST http://localhost:8080/api/v1/auth/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "phoneNumber": "+1234567890"
  }'

# Expected Response:
{
  "success": true,
  "data": "User registered successfully with ID: [uuid]",
  "message": "User registered successfully"
}

# Test duplicate email error
curl -X POST http://localhost:8080/api/v1/auth/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "phoneNumber": "+1234567890"
  }'

# Expected Response:
{
  "success": false,
  "data": null,
  "message": "Email already exists"
}
```

#### Test User Login:
```bash
# Test successful login
curl -X POST http://localhost:8080/api/v1/auth/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }'

# Expected Response:
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userName": "John Doe",
    "userEmail": "john.doe@example.com",
    "message": "Login s",
    "userId": "uuid-here",
    "userPhone": "+1234567890",
    "role": "CUSTOMER"
  },
  "message": "Login s"
}

# Test invalid credentials
curl -X POST http://localhost:8080/api/v1/auth/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "wrongpassword"
  }'

# Expected Response:
{
  "success": false,
  "data": null,
  "message": "Invalid username or password"
}
```

#### Test Password Reset:
```bash
# Test password reset request
curl -X POST http://localhost:8080/api/v1/auth/users/request-password-reset \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com"
  }'

# Expected Response:
{
  "success": true,
  "data": null,
  "message": "Password reset request sent"
}

# Test verify reset code
curl -X POST http://localhost:8080/api/v1/auth/users/verify-reset-code \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "code": "12345"
  }'

# Expected Response:
{
  "success": true,
  "data": true,
  "message": "Valid code"
}
```

#### Test Logout:
```bash
# Test logout with valid token
curl -X POST http://localhost:8080/api/v1/auth/users/logout \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Expected Response:
{
  "success": true,
  "data": null,
  "message": "User logged out successfully"
}
```

### 2. **Frontend Integration Testing**

#### Test Login Flow:
1. **Open your frontend** at `http://localhost:3000`
2. **Navigate to login page**
3. **Test with valid credentials**:
   - Email: `john.doe@example.com`
   - Password: `password123`
4. **Expected behavior**:
   - Should redirect to dashboard/home
   - User data should be stored in localStorage
   - JWT token should be stored

#### Test Error Handling:
1. **Test with invalid credentials**:
   - Email: `john.doe@example.com`
   - Password: `wrongpassword`
2. **Expected behavior**:
   - Should show error message: "Invalid username or password"
   - Should not redirect
   - Should not store any data

#### Test Registration Flow:
1. **Navigate to registration page**
2. **Test with new email**:
   - First Name: `Jane`
   - Last Name: `Smith`
   - Email: `jane.smith@example.com`
   - Password: `password123`
   - Phone: `+1234567890`
3. **Expected behavior**:
   - Should show success message
   - Should redirect to login or verification page

#### Test Duplicate Registration:
1. **Try registering with existing email**:
   - Email: `john.doe@example.com`
2. **Expected behavior**:
   - Should show error: "Email already exists"
   - Should not create new user

### 3. **JWT Token Testing**

#### Test Token Validation:
```bash
# Test /me endpoint with valid token
curl -X GET http://localhost:8080/api/v1/auth/users/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Expected Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "username": "john",
    "email": "john.doe@example.com",
    "profilePicture": "url",
    "role": "CUSTOMER"
  },
  "message": "User profile retrieved successfully"
}

# Test with invalid token
curl -X GET http://localhost:8080/api/v1/auth/users/me \
  -H "Authorization: Bearer invalid_token"

# Expected Response: 401 Unauthorized
```

### 4. **Frontend Token Management**

#### Test Token Persistence:
1. **Login successfully**
2. **Refresh the page**
3. **Expected behavior**:
   - Should remain logged in
   - User data should persist
   - Token should be valid

#### Test Token Expiration:
1. **Login successfully**
2. **Wait for token to expire** (or manually delete from localStorage)
3. **Try to access protected route**
4. **Expected behavior**:
   - Should redirect to login
   - Should clear invalid token

## 🚨 **Common Issues & Solutions**

### Issue 1: CORS Errors
**Symptoms**: Browser shows CORS errors in console
**Solution**: Ensure backend CORS configuration allows frontend origin

### Issue 2: JWT Token Not Working
**Symptoms**: 401 errors on protected endpoints
**Solution**: Check JWT secret configuration and token format

### Issue 3: Response Format Mismatch
**Symptoms**: Frontend can't parse backend responses
**Solution**: Ensure all endpoints return consistent `ApiResponse<T>` format

### Issue 4: Email Service Not Working
**Symptoms**: Registration works but no email sent
**Solution**: Check email service configuration in `application.properties`

## 📋 **Testing Tools**

### 1. **Postman Collection**
Create a Postman collection with these requests:
- User Registration
- User Login
- Password Reset Request
- Verify Reset Code
- Reset Password
- Logout
- Get Current User

### 2. **Browser Developer Tools**
- **Network Tab**: Monitor API requests/responses
- **Console**: Check for JavaScript errors
- **Application Tab**: Verify localStorage data

### 3. **Backend Logs**
Monitor Spring Boot logs for:
- Authentication attempts
- JWT token generation
- Error messages
- Email sending status

## 🎯 **Success Criteria**

### ✅ **Backend Tests Pass When:**
- All endpoints return consistent response format
- Error messages are user-friendly
- JWT tokens are properly generated and validated
- Password reset emails are sent
- User data is properly stored and retrieved

### ✅ **Frontend Tests Pass When:**
- Login/registration forms work correctly
- Error messages are displayed properly
- User data persists across page refreshes
- Protected routes are properly guarded
- Logout clears all user data

### ✅ **Integration Tests Pass When:**
- Frontend can successfully communicate with backend
- JWT tokens are properly handled
- Error states are gracefully handled
- User experience is smooth and intuitive

## 🔧 **Debugging Tips**

### 1. **Enable Debug Mode**
Set in frontend `.env.local`:
```env
NEXT_PUBLIC_DEBUG_MODE=true
```

### 2. **Check Backend Logs**
Look for authentication-related logs in Spring Boot console

### 3. **Verify Database**
Check if users are being created in the database

### 4. **Test Email Service**
Verify email configuration and test email sending

---

**Ready to test?** Start with the backend API tests using curl or Postman, then move to frontend integration testing. Let me know if you encounter any issues!
