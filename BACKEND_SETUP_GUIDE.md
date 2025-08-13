# 🚀 Backend Setup Guide

This guide will help you set up and run the Java Spring Boot backend to work with your Next.js frontend.

## 📋 Prerequisites

Before starting, ensure you have the following installed:

### Required Software:
- **Java 17 or higher** (OpenJDK or Oracle JDK)
- **Maven 3.6+** (or use the included Maven wrapper)
- **PostgreSQL 12+** (for database)
- **Git** (for version control)

### Verify Installations:
```bash
# Check Java version
java -version

# Check Maven version
mvn -version

# Check PostgreSQL
psql --version
```

## 🗄️ Database Setup

### 1. Install PostgreSQL
- **Windows**: Download from [PostgreSQL Official Site](https://www.postgresql.org/download/windows/)
- **macOS**: `brew install postgresql`
- **Linux**: `sudo apt-get install postgresql postgresql-contrib`

### 2. Create Database
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE ecommerce;

# Create user (optional)
CREATE USER ecommerce_user WITH PASSWORD 'your_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE ecommerce TO ecommerce_user;

# Exit PostgreSQL
\q
```

## ⚙️ Backend Configuration

### 1. Navigate to Backend Directory
```bash
cd Ecommerce_Backend_Services
```

### 2. Update Database Configuration
Edit `src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.show-sql=true

# Server Configuration
server.port=8080

# JWT Configuration
jwt.secret=your-super-secret-jwt-key-here-make-it-long-and-secure
jwt.expiration=86400000

# Email Configuration (for password reset)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

# Cloudinary Configuration (for file uploads)
cloudinary.cloud-name=your_cloud_name
cloudinary.api-key=your_api_key
cloudinary.api-secret=your_api_secret

# File Upload Configuration
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=50MB
```

### 3. Environment Variables (Optional)
Create a `.env` file in the backend root:
```env
# Database
DB_URL=jdbc:postgresql://localhost:5432/ecommerce
DB_USERNAME=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRATION=86400000

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 🚀 Running the Backend

### Method 1: Using Maven Wrapper (Recommended)
```bash
# Navigate to backend directory
cd Ecommerce_Backend_Services

# Run the application
./mvnw spring-boot:run
```

### Method 2: Using Maven
```bash
# Navigate to backend directory
cd Ecommerce_Backend_Services

# Clean and compile
mvn clean compile

# Run the application
mvn spring-boot:run
```

### Method 3: Using IDE (IntelliJ IDEA/Eclipse)
1. Open the project in your IDE
2. Find `EcomAppApplication.java`
3. Right-click and select "Run"

## ✅ Verification

### 1. Check if Backend is Running
```bash
# Test the health endpoint
curl http://localhost:8080/api/v1/health

# Or visit in browser
http://localhost:8080/api/v1/health
```

### 2. Check Swagger Documentation
Visit: `http://localhost:8080/swagger-ui/index.html`

### 3. Test Database Connection
The application will automatically create tables on startup if `ddl-auto=update` is set.

## 🔧 Frontend Configuration

### 1. Update Frontend Environment
Create `.env.local` in your frontend directory (`Ecommerce_Services/`):

```env
# Backend API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
NEXT_PUBLIC_JAVA_BACKEND_URL=http://localhost:8080
NEXT_PUBLIC_JAVA_API_VERSION=v1
NEXT_PUBLIC_JAVA_TIMEOUT=10000

# Development Settings
NODE_ENV=development
NEXT_PUBLIC_DEBUG_MODE=true

# Stripe Configuration (if using payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret

# Cloudinary Configuration (for file uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### 2. Start Frontend
```bash
# Navigate to frontend directory
cd Ecommerce_Services

# Install dependencies (if not done)
npm install

# Start development server
npm run dev
```

## 🧪 Testing the Integration

### 1. Test Authentication
```bash
# Test registration
curl -X POST http://localhost:8080/api/v1/auth/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'

# Test login
curl -X POST http://localhost:8080/api/v1/auth/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 2. Test Products API
```bash
# Get all products
curl http://localhost:8080/api/v1/products

# Get product by ID
curl http://localhost:8080/api/v1/products/{productId}
```

### 3. Test Frontend-Backend Connection
1. Open `http://localhost:3000` in your browser
2. Try to register/login
3. Browse products
4. Check browser console for API calls

## 🐛 Troubleshooting

### Common Issues:

#### 1. Database Connection Error
```
Error: Could not create connection to database server
```
**Solution:**
- Ensure PostgreSQL is running
- Check database credentials
- Verify database exists

#### 2. Port Already in Use
```
Error: Web server failed to start. Port 8080 was already in use.
```
**Solution:**
```bash
# Find process using port 8080
lsof -i :8080

# Kill the process
kill -9 <PID>

# Or change port in application.properties
server.port=8081
```

#### 3. CORS Errors in Frontend
```
Access to fetch at 'http://localhost:8080/api/v1/...' from origin 'http://localhost:3000' has been blocked by CORS policy
```
**Solution:**
- CORS is already configured in `SecurityConfig.java`
- Ensure backend is running on port 8080
- Check frontend API base URL

#### 4. JWT Token Issues
```
Error: JWT token is invalid
```
**Solution:**
- Check JWT secret in `application.properties`
- Ensure token is being sent in Authorization header
- Verify token expiration time

#### 5. File Upload Issues
```
Error: File upload failed
```
**Solution:**
- Configure Cloudinary credentials
- Check file size limits
- Ensure multipart configuration is correct

## 📊 Monitoring

### 1. Application Logs
Monitor logs in your terminal where you started the backend.

### 2. Database Monitoring
```bash
# Connect to PostgreSQL
psql -U postgres -d ecommerce

# Check tables
\dt

# Check data
SELECT * FROM users LIMIT 5;
```

### 3. API Monitoring
- Use Swagger UI: `http://localhost:8080/swagger-ui/index.html`
- Check browser Network tab for API calls
- Monitor backend logs for errors

## 🔄 Development Workflow

### 1. Start Development Environment
```bash
# Terminal 1: Start Backend
cd Ecommerce_Backend_Services
./mvnw spring-boot:run

# Terminal 2: Start Frontend
cd Ecommerce_Services
npm run dev
```

### 2. Hot Reload
- Backend: Maven will automatically restart on code changes
- Frontend: Next.js provides hot reload by default

### 3. Database Changes
- JPA will automatically update schema with `ddl-auto=update`
- For major changes, consider using Flyway or Liquibase

## 🚀 Production Deployment

### 1. Build Backend
```bash
cd Ecommerce_Backend_Services
./mvnw clean package
```

### 2. Run Production
```bash
java -jar target/ecom-app-0.0.1-SNAPSHOT.jar
```

### 3. Environment Variables
Set production environment variables:
```bash
export SPRING_PROFILES_ACTIVE=prod
export DB_URL=your_production_db_url
export JWT_SECRET=your_production_jwt_secret
```

## 📚 Additional Resources

- [Java Backend README](../Ecommerce_Backend_Services/README.md)
- [Missing Backend Implementations](./MISSING_BACKEND_IMPLEMENTATIONS.md)
- [Java Integration Guide](./JAVA_INTEGRATION_GUIDE.md)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)

## 🆘 Support

If you encounter issues:

1. **Check Logs**: Review backend console output
2. **Verify Configuration**: Ensure all settings are correct
3. **Test Endpoints**: Use curl or Postman to test APIs
4. **Check Database**: Verify database connection and data
5. **Review Documentation**: Check the integration guides

---

**Happy Coding! 🚀**
