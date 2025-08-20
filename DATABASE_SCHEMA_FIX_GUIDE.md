# 🔧 Database Schema Creation Fix Guide

## 🚨 Error Identified

**Error**: `Table "PRODUCT_ATTRIBUTE_VALUES" not found`

**Root Cause**: The `DatabaseSeeder` is trying to insert data before all database tables are properly created, causing a schema creation order issue.

## ✅ Fixes Applied

### **Fix 1: Temporarily Disable Database Seeder**

Disabled the database seeder to prevent schema conflicts during development.

### **Fix 2: Ensure Proper Database Schema Creation**

The issue occurs because:
1. **Hibernate tries to create tables** based on entity classes
2. **DatabaseSeeder runs immediately** after application startup
3. **Tables might not be fully created** when seeder tries to insert data

## 🔄 Implementation Steps

### **Step 1: Clean Database and Restart**
```bash
cd Backend-service
# Remove existing database files
rm -rf data/
# Clean and rebuild
./mvnw clean install
# Start application
./mvnw spring-boot:run
```

### **Step 2: Verify Database Creation**
1. **Access H2 Console**: `http://localhost:8081/h2-console`
2. **Login with**:
   - JDBC URL: `jdbc:h2:file:./data/ecommerce`
   - Username: `sa`
   - Password: (leave empty)
3. **Check if tables exist**: Look for `PRODUCT_ATTRIBUTE_VALUES` table

### **Step 3: Test Application**
1. **Application should start** without errors
2. **User registration should work**
3. **Login should work**
4. **Payment should work**

## 🧪 Alternative Solutions

### **Option 1: Enable Seeder with Proper Order**
If you want to re-enable the seeder later, modify `DatabaseSeeder.java`:

```java
@Override
@Transactional
public void run(String... args) throws Exception {
    // Add delay to ensure tables are created
    Thread.sleep(2000);
    
    if (shouldSeedData()) {
        log.info("Starting database seeding...");
        
        try {
            // Seed in order of dependencies
            seedUsers();
            seedCategories();
            seedBrands();
            seedDiscounts();
            seedProductAttributes();
            seedProducts();
            
            log.info("Database seeding completed successfully!");
        } catch (Exception e) {
            log.error("Database seeding failed: {}", e.getMessage());
            // Don't fail the application if seeding fails
        }
    } else {
        log.info("Database already contains data. Skipping seeding.");
    }
}
```

### **Option 2: Use PostgreSQL Instead**
If you continue having issues with H2, switch to PostgreSQL:

1. **Update application.properties**:
```properties
# Comment out H2
# spring.datasource.driver-class-name=org.h2.Driver
# spring.datasource.url=jdbc:h2:file:./data/ecommerce

# Enable PostgreSQL
spring.datasource.driver-class-name=org.postgresql.Driver
spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

2. **Start PostgreSQL service**

### **Option 3: Manual Database Setup**
Create tables manually in H2 Console:

```sql
-- Create tables manually if needed
CREATE TABLE IF NOT EXISTS product_attribute_types (
    attribute_type_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    is_required BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS product_attribute_values (
    attribute_value_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    value VARCHAR(255) NOT NULL,
    attribute_type_id BIGINT NOT NULL,
    FOREIGN KEY (attribute_type_id) REFERENCES product_attribute_types(attribute_type_id)
);
```

## 🔍 Troubleshooting

### **If Tables Still Don't Exist:**

1. **Check Entity Scanning**:
   - Ensure all entity classes are in the correct package
   - Verify `@Entity` annotations are present
   - Check for compilation errors

2. **Check JPA Configuration**:
   ```properties
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   spring.jpa.properties.hibernate.format_sql=true
   ```

3. **Check Package Structure**:
   - All entities should be in `com.ecommerce.entity`
   - Main application class should be able to scan the entity package

### **Common Error Messages:**

| Error | Cause | Solution |
|-------|-------|----------|
| "Table not found" | Schema not created | Disable seeder, restart app |
| "Column not found" | Entity mismatch | Check entity annotations |
| "Foreign key constraint" | Table order issue | Add delay to seeder |

## ✅ Verification Commands

### **Check Database Tables:**
```sql
-- In H2 Console
SHOW TABLES;
SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'PUBLIC';
```

### **Check Entity Classes:**
```bash
# Verify all entity classes exist
find Backend-service/src/main/java/com/ecommerce/entity -name "*.java"
```

### **Check Application Logs:**
```bash
# Look for table creation logs
grep -i "create table" Backend-service/logs/application.log
```

## 🎯 Expected Results

After applying the fix:
- ✅ **Application starts** without schema errors
- ✅ **All tables created** properly
- ✅ **User registration works**
- ✅ **Authentication works**
- ✅ **Payment processing works**
- ✅ **H2 Console accessible**

## 📞 Support

If issues persist:
1. **Check application logs** for detailed error messages
2. **Verify entity package scanning** is working
3. **Try PostgreSQL** instead of H2
4. **Manually create tables** in H2 Console
5. **Check for compilation errors** in entity classes

## 🔄 Re-enabling Seeder (When Ready)

When you want to re-enable the database seeder:

1. **Uncomment the seeder code** in `DatabaseSeeder.java`
2. **Add proper error handling** and delays
3. **Test with a fresh database**
4. **Monitor logs** for any issues

The application should now start successfully without the schema creation errors!
