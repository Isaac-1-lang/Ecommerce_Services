# 🔧 H2 Database Driver Missing - Fix Guide

## 🚨 Error Identified

**Error**: `Cannot load driver class: org.h2.Driver`

**Root Cause**: The H2 database dependency was missing from the `pom.xml` file.

## ✅ Fix Applied

### **Added H2 Database Dependency**

Added the following dependency to `Backend-service/pom.xml`:

```xml
<!-- H2 Database for development and testing -->
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>
```

## 🔄 Implementation Steps

### **Step 1: Clean and Rebuild**
```bash
cd Backend-service
./mvnw clean install
```

### **Step 2: Start the Application**
```bash
./mvnw spring-boot:run
```

### **Step 3: Verify H2 Console**
- Go to: `http://localhost:8081/h2-console`
- Login with:
  - JDBC URL: `jdbc:h2:file:./data/ecommerce`
  - Username: `sa`
  - Password: (leave empty)

## 🧪 Testing

After the fix:
1. **Application should start** without the driver error
2. **H2 Console should be accessible** at `/h2-console`
3. **Database operations should work** normally

## 🔍 Alternative Solutions

### **If you prefer PostgreSQL instead:**

1. **Update application.properties:**
```properties
# Comment out H2 configuration
# spring.datasource.driver-class-name=org.h2.Driver
# spring.datasource.url=jdbc:h2:file:./data/ecommerce

# Uncomment PostgreSQL configuration
spring.datasource.driver-class-name=org.postgresql.Driver
spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

2. **Start PostgreSQL service** before running the application

## 📋 Dependencies Summary

Your project now includes:
- ✅ **H2 Database** - For development/testing
- ✅ **PostgreSQL** - For production (optional)
- ✅ **JPA/Hibernate** - For database operations
- ✅ **Spring Boot** - For application framework

## 🎯 Expected Results

After applying the fix:
- ✅ **No more driver errors**
- ✅ **Application starts successfully**
- ✅ **Database operations work**
- ✅ **H2 Console accessible**
- ✅ **User registration persists**

## 📞 Support

If you still get errors:
1. Run `./mvnw clean install` to rebuild
2. Check if Maven downloaded the H2 dependency
3. Verify the dependency is in the classpath
4. Try using PostgreSQL instead
