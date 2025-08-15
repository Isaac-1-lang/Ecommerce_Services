# Java Backend Integration Guide

This guide explains how to integrate your Next.js frontend with the Java Spring Boot backend.

## 🚀 Quick Setup

### 1. Environment Configuration

Create a `.env.local` file in your frontend root directory with the following variables:

```env
# Java Backend API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8081/api
NEXT_PUBLIC_JAVA_BACKEND_URL=http://localhost:8081

# Java Backend Specific Settings
NEXT_PUBLIC_JAVA_API_VERSION=v1
NEXT_PUBLIC_JAVA_TIMEOUT=10000

# Authentication (JWT Token)
NEXT_PUBLIC_JWT_SECRET=your-jwt-secret-here
NEXT_PUBLIC_JWT_EXPIRY=86400

# CORS Settings for Java Backend
NEXT_PUBLIC_CORS_ORIGIN=http://localhost:3000

# File Upload Settings
NEXT_PUBLIC_MAX_FILE_SIZE=10485760

# Development Settings
NODE_ENV=development
NEXT_PUBLIC_DEBUG_MODE=true

# Stripe Configuration (if using Stripe payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here

# Cloudinary Configuration (for file uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### 2. Backend Configuration

Update your Java backend `application.properties`:

```properties
# Server Configuration
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce
spring.datasource.username=your_username
spring.datasource.password=your_password

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# JWT Configuration
jwt.secret=your-jwt-secret-here
jwt.expiration=86400000

# CORS Configuration (already updated in SecurityConfig.java)
```

## 🔧 Services Overview

### Authentication Service (`services/authService.ts`)
- **Login**: `authService.login({ email, password })`
- **Register**: `authService.register({ name, username, email, password, profilePicture })`
- **Password Reset**: `authService.forgotPassword({ email })`
- **Logout**: `authService.logout()`
- **Get Current User**: `authService.me()`

### Product Service (`services/productService.ts`)
- **Get Products**: `productService.list(params)`
- **Get Product by Slug**: `productService.getBySlug(slug)`
- **Get Product by ID**: `productService.getById(id)`
- **Get Categories**: `productService.categories()`
- **Search Products**: `productService.search(query)`
- **Get Featured Products**: `productService.getFeatured()`
- **Get New Arrivals**: `productService.getNewArrivals()`
- **Get On-Sale Products**: `productService.getOnSale()`

### Cart Service (`services/cartService.ts`)
- **Get Cart**: `cartService.getCart()`
- **Add to Cart**: `cartService.addToCart({ productId, quantity })`
- **Update Cart Item**: `cartService.updateCartItem({ itemId, quantity })`
- **Remove from Cart**: `cartService.removeFromCart(itemId)`
- **Clear Cart**: `cartService.clearCart()`
- **Validate Item**: `cartService.validateItem(product, quantity)`

### Wishlist Service (`services/wishlistService.ts`)
- **Get Wishlist**: `wishlistService.getWishlist()`
- **Add to Wishlist**: `wishlistService.addToWishlist({ productId })`
- **Remove from Wishlist**: `wishlistService.removeFromWishlist(itemId)`
- **Clear Wishlist**: `wishlistService.clearWishlist()`
- **Check if in Wishlist**: `wishlistService.isInWishlist(productId)`

### Order Service (`services/orderService.ts`)
- **Get Orders**: `orderService.getOrders()`
- **Get Order by ID**: `orderService.getOrderById(orderId)`
- **Get Order by Number**: `orderService.getOrderByNumber(orderNumber)`
- **Create Order**: `orderService.createOrder(orderData)`
- **Cancel Order**: `orderService.cancelOrder(orderId)`
- **Update Order Status**: `orderService.updateOrderStatus(orderId, status)`
- **Get Order Tracking**: `orderService.getOrderTracking(orderId)`

### Review Service (`services/reviewService.ts`)
- **Get Reviews**: `reviewService.getReviews(params)`
- **Get Product Reviews**: `reviewService.getProductReviews(productId)`
- **Create Review**: `reviewService.createReview(reviewData)`
- **Update Review**: `reviewService.updateReview(reviewId, reviewData)`
- **Delete Review**: `reviewService.deleteReview(reviewId)`
- **Mark Review Helpful**: `reviewService.markReviewHelpful(reviewId, helpful)`
- **Get Average Rating**: `reviewService.getAverageRating(productId)`

### Payment Service (`services/paymentService.ts`)
- **Create Payment Intent**: `paymentService.createPaymentIntent(paymentData)`
- **Confirm Payment**: `paymentService.confirmPayment(paymentData)`
- **Get Payment Intent**: `paymentService.getPaymentIntent(paymentIntentId)`
- **Cancel Payment Intent**: `paymentService.cancelPaymentIntent(paymentIntentId)`
- **Get Payment Methods**: `paymentService.getPaymentMethods()`
- **Add Payment Method**: `paymentService.addPaymentMethod(paymentMethodData)`
- **Remove Payment Method**: `paymentService.removePaymentMethod(paymentMethodId)`
- **Process Refund**: `paymentService.processRefund(paymentIntentId, amount, reason)`

## 🔄 Data Transformation

All services include data transformation functions that convert Java backend data structures to frontend-compatible formats:

- **Java Product** → **Frontend Product**
- **Java Cart** → **Frontend Cart**
- **Java Order** → **Frontend Order**
- **Java Review** → **Frontend Review**
- **Java User** → **Frontend User**

## 🛡️ Error Handling

The integration includes comprehensive error handling:

- **Network Errors**: Automatic retry and fallback
- **Authentication Errors**: Automatic logout and redirect
- **Validation Errors**: User-friendly error messages
- **Server Errors**: Graceful degradation

## 🔐 Authentication Flow

1. **Login**: User submits credentials → Backend validates → Returns JWT token
2. **Token Storage**: Token stored in localStorage
3. **API Requests**: Token automatically included in Authorization header
4. **Token Validation**: Automatic token validation on each request
5. **Logout**: Token removed from localStorage and backend

## 📡 API Endpoints Mapping

| Frontend Service | Backend Endpoint | Method | Description |
|------------------|------------------|--------|-------------|
| Auth | `/api/v1/auth/users/login` | POST | User login |
| Auth | `/api/v1/auth/users/register` | POST | User registration |
| Auth | `/api/v1/auth/users/request-password-reset` | POST | Password reset request |
| Products | `/api/v1/products` | GET | Get products list |
| Products | `/api/v1/products/{id}` | GET | Get product by ID |
| Products | `/api/v1/products/slug/{slug}` | GET | Get product by slug |
| Cart | `/api/v1/cart` | GET | Get user cart |
| Cart | `/api/v1/cart/add` | POST | Add item to cart |
| Cart | `/api/v1/cart/items/{id}` | PUT | Update cart item |
| Cart | `/api/v1/cart/items/{id}` | DELETE | Remove cart item |
| Wishlist | `/api/v1/wishlist` | GET | Get user wishlist |
| Wishlist | `/api/v1/wishlist/add` | POST | Add to wishlist |
| Wishlist | `/api/v1/wishlist/items/{id}` | DELETE | Remove from wishlist |
| Orders | `/api/v1/orders` | GET | Get user orders |
| Orders | `/api/v1/orders` | POST | Create new order |
| Orders | `/api/v1/orders/{id}` | GET | Get order by ID |
| Reviews | `/api/v1/reviews` | GET | Get reviews |
| Reviews | `/api/v1/reviews` | POST | Create review |
| Reviews | `/api/v1/reviews/{id}` | PUT | Update review |
| Reviews | `/api/v1/reviews/{id}` | DELETE | Delete review |
| Payments | `/api/v1/payments/create-intent` | POST | Create payment intent |
| Payments | `/api/v1/payments/confirm` | POST | Confirm payment |

## 🚀 Getting Started

1. **Start the Java Backend**:
   ```bash
   cd Ecommerce_Backend_Services
   ./mvnw spring-boot:run
   ```

2. **Start the Next.js Frontend**:
   ```bash
   cd Ecommerce_Services
   npm run dev
   ```

3. **Test the Integration**:
   - Open http://localhost:3000
   - Try logging in/registering
   - Browse products
   - Add items to cart
   - Test checkout flow

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure backend CORS configuration allows frontend origin
2. **Authentication Errors**: Check JWT token configuration
3. **API Timeout**: Increase `NEXT_PUBLIC_JAVA_TIMEOUT` value
4. **Database Connection**: Verify database credentials and connection
5. **File Upload Issues**: Check Cloudinary configuration

### Debug Mode:

Set `NEXT_PUBLIC_DEBUG_MODE=true` to enable detailed logging of API requests and responses.

## 📚 Additional Resources

- [Java Backend Documentation](./Ecommerce_Backend_Services/README.md)
- [API Testing Guide](./Ecommerce_Backend_Services/POSTMAN_TESTING_GUIDE.md)
- [Frontend Documentation](./README.md)

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the backend logs
3. Check the browser console for frontend errors
4. Verify environment configuration
