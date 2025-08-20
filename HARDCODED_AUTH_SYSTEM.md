# Hardcoded Authentication System

## Overview

The system now uses hardcoded credentials for admin, employee, and delivery agent access, while allowing customer registration and login through the normal backend flow.

## Hardcoded Credentials

### Admin Access
- **Email**: `xyz@gmail.com`
- **Password**: `12345678`
- **Redirect**: `/admin`
- **Role**: `admin`

### Employee Access
- **Email**: `zxy@gmail.com`
- **Password**: `12345678`
- **Redirect**: `/employee`
- **Role**: `employee`

### Delivery Agent Access
- **Email**: `yzx@gmail.com`
- **Password**: `12345678`
- **Redirect**: `/delivery`
- **Role**: `delivery`

## Customer Access

All other email addresses are treated as customer accounts and will:
- Use the normal backend registration/login flow
- Redirect to `/dashboard` after successful authentication
- Have role: `customer`

## How It Works

### Login Flow
1. User enters email and password
2. System checks if the email matches any hardcoded credentials
3. If match found:
   - Creates a mock user object with the appropriate role
   - Stores user data and token in localStorage
   - Redirects to the appropriate dashboard
4. If no match:
   - Attempts normal backend login for customer accounts
   - Redirects to customer dashboard on success

### Registration Flow
- Only customer registration is allowed
- Admin, employee, and delivery agent accounts cannot be created through registration
- Registration form shows a notice about hardcoded credentials for other roles

## Role-Based Access Control

### Admin Portal (`/admin`)
- Protected by `AdminProtected` component
- Requires role: `admin`
- Access to admin dashboard, product management, order management, etc.

### Employee Portal (`/employee`)
- Protected by `EmployeeProtected` component
- Requires role: `employee`
- Access to employee-specific features

### Delivery Portal (`/delivery`)
- Protected by delivery protection (if implemented)
- Requires role: `delivery`
- Access to delivery-specific features

### Customer Portal (`/dashboard`)
- Available to all authenticated users
- Default landing page for customers

## Security Notes

- Hardcoded credentials are stored in the frontend code
- This is suitable for development/demo purposes
- For production, consider implementing proper admin user management
- Tokens are stored in localStorage for session persistence

## Testing

To test the system:

1. **Admin Login**:
   - Email: `xyz@gmail.com`
   - Password: `12345678`
   - Should redirect to `/admin`

2. **Employee Login**:
   - Email: `zxy@gmail.com`
   - Password: `12345678`
   - Should redirect to `/employee`

3. **Delivery Login**:
   - Email: `yzx@gmail.com`
   - Password: `12345678`
   - Should redirect to `/delivery`

4. **Customer Registration/Login**:
   - Use any other email address
   - Register as a new customer or login with existing credentials
   - Should redirect to `/dashboard`

## Implementation Details

### Login Form Changes
- Added hardcoded credential checking
- Role detection based on email
- Proper role assignment for authentication guards
- Clear visual indicators for detected role

### Registration Form Changes
- Removed admin/employee registration options
- Only customer registration allowed
- Clear messaging about hardcoded credentials

### Authentication Guards
- All portals use role-based protection
- Roles must match exactly (lowercase: `admin`, `employee`, `delivery`, `customer`)
- Automatic redirection to appropriate portal based on role
