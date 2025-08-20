# 🔐 Authentication Persistence Issue - Complete Fix Guide

## 🚨 Problem Identified

**Issue**: Users can register and login successfully, but after server restart or in different browsers, they get "user not found" errors.

**Root Cause**: The application was using **H2 in-memory database** with `create-drop` mode, which:
- ✅ Allows registration and login during the session
- ❌ **Completely wipes all data when server restarts**
- ❌ **Data is not persistent between sessions**

## 🛠️ Solutions Applied

### **Solution 1: Switch to Persistent H2 Database (Recommended)**

**Changes Made:**
1. **Database URL**: Changed from `jdbc:h2:mem:testdb` to `jdbc:h2:file:./data/ecommerce`
2. **DDL Mode**: Changed from `create-drop` to `update`
3. **Data Persistence**: Data now persists between server restarts

**Files Modified:**
- `Backend-service/src/main/resources/application.properties`
- `Backend-service/src/main/resources/application-dev.properties`

### **Solution 2: Alternative - Use PostgreSQL (Production Ready)**

If you prefer a more robust database, uncomment the PostgreSQL configuration in `application.properties`.

## 🔄 Implementation Steps

### **Step 1: Stop the Backend Server**
```bash
# If running in terminal, press Ctrl+C
# Or kill the process if running in background
```

### **Step 2: Clear Old Data (Optional)**
```bash
cd Backend-service
# Remove old database files if they exist
rm -rf data/
```

### **Step 3: Restart Backend with New Configuration**
```bash
cd Backend-service
./mvnw spring-boot:run
```

### **Step 4: Test the Fix**
1. **Register a new user** at `http://localhost:3000/auth/register`
2. **Login with the user** at `http://localhost:3000/auth/login`
3. **Restart the backend server** (Ctrl+C, then `./mvnw spring-boot:run`)
4. **Try logging in again** - should work now!

## 🧪 Testing Checklist

### **Test 1: Registration Persistence**
- [ ] Register new user
- [ ] Restart server
- [ ] Try to login with same credentials
- [ ] **Expected**: Login should work

### **Test 2: Cross-Browser Persistence**
- [ ] Register in Chrome
- [ ] Try to login in Firefox/Safari
- [ ] **Expected**: Login should work

### **Test 3: Server Restart Persistence**
- [ ] Register and login
- [ ] Stop server completely
- [ ] Start server again
- [ ] Try to login
- [ ] **Expected**: Login should work

### **Test 4: Database Verification**
- [ ] Access H2 Console: `http://localhost:8081/h2-console`
- [ ] Login with: 
  - JDBC URL: `jdbc:h2:file:./data/ecommerce`
  - Username: `sa`
  - Password: (leave empty)
- [ ] Check `USERS` table for your registered users

## 🔧 Database Configuration Details

### **Before (Problematic)**
```properties
# In-memory database - data lost on restart
spring.datasource.url=jdbc:h2:mem:testdb
spring.jpa.hibernate.ddl-auto=create-drop
```

### **After (Fixed)**
```properties
# File-based database - data persists
spring.datasource.url=jdbc:h2:file:./data/ecommerce
spring.jpa.hibernate.ddl-auto=update
```

## 📁 Database File Location

After the fix, your database will be stored in:
```
Backend-service/
└── data/
    ├── ecommerce.mv.db     # Main database file
    ├── ecommerce.trace.db  # Trace file
    └── ecommerce.lock.db   # Lock file
```

## 🚀 Production Recommendations

### **For Production Deployment:**
1. **Use PostgreSQL** instead of H2
2. **Set up proper database backups**
3. **Use environment variables** for database credentials
4. **Implement database migrations** for schema changes

### **PostgreSQL Configuration:**
```properties
spring.datasource.driver-class-name=org.postgresql.Driver
spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
```

## 🔍 Troubleshooting

### **If Users Still Can't Login After Fix:**

1. **Check Database File Exists:**
   ```bash
   ls -la Backend-service/data/
   ```

2. **Verify Database Content:**
   - Go to `http://localhost:8081/h2-console`
   - Check if users exist in the `USERS` table

3. **Check Application Logs:**
   ```bash
   # Look for database connection errors
   tail -f Backend-service/logs/application.log
   ```

4. **Reset Database (Last Resort):**
   ```bash
   cd Backend-service
   rm -rf data/
   ./mvnw spring-boot:run
   ```

### **Common Error Messages:**

| Error | Cause | Solution |
|-------|-------|----------|
| "User not found" | Database reset/not persistent | Apply the fix above |
| "Database locked" | Multiple instances running | Stop all instances |
| "Connection refused" | Database not started | Restart backend |

## ✅ Verification Commands

### **Check if Database is Persistent:**
```bash
# After registering a user, check if file exists
ls -la Backend-service/data/ecommerce.mv.db

# File should exist and have size > 0
```

### **Check Database Content:**
```sql
-- In H2 Console
SELECT * FROM USERS;
```

### **Check Application Status:**
```bash
# Should show database connection success
curl http://localhost:8081/actuator/health
```

## 🎯 Expected Results

After applying the fix:
- ✅ **User registration persists** between server restarts
- ✅ **Login works** in different browsers
- ✅ **User data survives** server crashes/restarts
- ✅ **Database file exists** in `Backend-service/data/`
- ✅ **H2 Console shows** registered users

## 📞 Support

If issues persist after applying the fix:
1. Check the backend logs for errors
2. Verify database file permissions
3. Ensure no multiple instances are running
4. Try the PostgreSQL configuration instead
