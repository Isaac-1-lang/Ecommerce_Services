# 🔐 Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for your e-commerce application.

## ✅ **What's Been Updated**

### **Frontend Changes:**
1. **Removed GitHub Login** - GitHub authentication has been completely removed
2. **Enhanced Google Login** - Improved Google OAuth button with proper styling
3. **Google Auth Service** - Created dedicated Google authentication service
4. **Type Safety** - Added proper TypeScript types for Google API

### **Files Modified:**
- `components/LoginForm.tsx` - Removed GitHub button, enhanced Google button
- `services/authService.ts` - Added Google OAuth login functionality
- `features/auth/store.ts` - Updated social login to handle Google only
- `lib/googleAuth.ts` - New Google authentication service

## 🚀 **Setup Instructions**

### **1. Google Cloud Console Setup**

#### **Step 1: Create Google Cloud Project**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing project
3. Enable the Google+ API and Google OAuth2 API

#### **Step 2: Configure OAuth Consent Screen**
1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in required information:
   - App name: Your app name
   - User support email: Your email
   - Developer contact information: Your email
4. Add scopes: `email`, `profile`
5. Add test users (your email)

#### **Step 3: Create OAuth 2.0 Credentials**
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)
5. Add authorized redirect URIs:
   - `http://localhost:3000/auth/callback` (for development)
   - `https://yourdomain.com/auth/callback` (for production)
6. Copy the Client ID

### **2. Environment Configuration**

#### **Create `.env.local` file:**
```bash
# Google OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id-here

# Backend API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api

# Other Configuration
NEXT_PUBLIC_APP_NAME=Ecommerce Services
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### **3. Backend Integration**

#### **Java Backend OAuth Endpoint:**
You'll need to create a Google OAuth endpoint in your Java backend:

```java
@RestController
@RequestMapping("/v1/auth")
public class GoogleAuthController {
    
    @PostMapping("/google/login")
    public ResponseEntity<?> googleLogin(@RequestBody GoogleLoginRequest request) {
        try {
            // Verify Google ID token
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                .setAudience(Collections.singletonList(googleClientId))
                .build();
            
            GoogleIdToken idToken = verifier.verify(request.getIdToken());
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                
                // Extract user information
                String email = payload.getEmail();
                String name = (String) payload.get("name");
                String picture = (String) payload.get("picture");
                
                // Find or create user in your database
                User user = userService.findByEmailOrCreate(email, name, picture);
                
                // Generate JWT token
                String token = jwtService.generateToken(user);
                
                return ResponseEntity.ok(new ApiResponse<>(true, {
                    token: token,
                    userId: user.getId(),
                    userName: user.getName(),
                    userEmail: user.getEmail(),
                    userPhone: user.getPhone(),
                    role: user.getRole()
                }, "Google login successful"));
            } else {
                return ResponseEntity.badRequest().body(new ApiResponse<>(false, null, "Invalid Google token"));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, null, e.getMessage()));
        }
    }
}
```

#### **Required Dependencies:**
Add to your `pom.xml`:
```xml
<dependency>
    <groupId>com.google.api-client</groupId>
    <artifactId>google-api-client</artifactId>
    <version>2.0.0</version>
</dependency>
<dependency>
    <groupId>com.google.oauth-client</groupId>
    <artifactId>google-oauth-client</artifactId>
    <version>1.34.1</version>
</dependency>
```

## 🧪 **Testing the Implementation**

### **Test Google Login:**
1. **Start your development server**
2. **Navigate to login page** (`/auth/login`)
3. **Click "Continue with Google"**
4. **Complete Google OAuth flow**
5. **Verify successful login and redirect**

### **Expected Flow:**
1. User clicks "Continue with Google"
2. Google OAuth popup opens
3. User signs in with Google
4. Google returns ID token
5. Frontend sends token to backend
6. Backend verifies token and creates/updates user
7. Backend returns JWT token
8. Frontend stores token and redirects to dashboard

## 🔧 **Troubleshooting**

### **Common Issues:**

#### Issue 1: "Google API not available"
**Solution**: Check if Google API script is loading properly

#### Issue 2: "Invalid client ID"
**Solution**: Verify your Google Client ID in environment variables

#### Issue 3: "Origin not allowed"
**Solution**: Add your domain to authorized origins in Google Console

#### Issue 4: "Backend endpoint not found"
**Solution**: Ensure your Java backend has the `/v1/auth/google/login` endpoint

#### Issue 5: "Token verification failed"
**Solution**: Check Google Client ID configuration in backend

### **Debug Steps:**
1. **Check browser console** for JavaScript errors
2. **Verify environment variables** are loaded correctly
3. **Test Google OAuth** in Google Console
4. **Check backend logs** for authentication errors
5. **Verify CORS** configuration

## 📱 **Mobile Considerations**

### **Mobile OAuth:**
- Google OAuth works on mobile browsers
- Consider implementing native Google Sign-In for mobile apps
- Test on different mobile devices and browsers

## 🔒 **Security Best Practices**

### **Security Measures:**
1. **Always verify tokens** on the backend
2. **Use HTTPS** in production
3. **Validate user data** from Google
4. **Implement proper session management**
5. **Add rate limiting** to OAuth endpoints
6. **Log authentication events** for security monitoring

## 🎯 **Success Criteria**

### ✅ **Google Login Working When:**
- Google OAuth popup opens correctly
- User can sign in with Google account
- Backend receives and verifies Google token
- User is created/updated in database
- JWT token is generated and returned
- User is redirected to dashboard
- User session persists across page reloads

## 📞 **Next Steps**

1. **Set up Google Cloud Console** with your project
2. **Configure environment variables** with your Google Client ID
3. **Implement backend OAuth endpoint** in your Java application
4. **Test the complete flow** from frontend to backend
5. **Deploy to production** with proper HTTPS configuration
6. **Monitor authentication logs** for any issues

---

**🎉 Your Google OAuth authentication is now properly configured!** Follow the setup guide and test the implementation. Let me know if you need help with any specific part of the setup.
