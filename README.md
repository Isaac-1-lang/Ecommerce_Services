# 🛍️ E-Commerce Frontend Application

A modern, responsive e-commerce frontend built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Zustand** for state management. This application is fully integrated with a Java Spring Boot backend.

## ✨ Features

### 🛒 Core E-Commerce Features
- **Product Catalog**: Browse products with advanced filtering and search
- **Shopping Cart**: Persistent cart with real-time updates
- **Wishlist**: Save favorite products for later
- **User Authentication**: Secure login/register with JWT tokens
- **Order Management**: Complete order tracking and history
- **Payment Integration**: Stripe payment processing
- **Reviews & Ratings**: Product reviews and rating system

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on all devices
- **Dark/Light Mode**: Toggle between themes
- **Modern Components**: Built with Tailwind CSS and custom components
- **Smooth Animations**: Enhanced user experience with animations
- **Accessibility**: WCAG compliant design

### 🔧 Technical Features
- **TypeScript**: Full type safety
- **State Management**: Zustand for global state
- **API Integration**: Complete Java backend integration
- **Error Handling**: Comprehensive error handling and user feedback
- **Performance**: Optimized for speed and SEO
- **Security**: JWT authentication and secure API calls

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Java 17+ (for backend)
- PostgreSQL (for backend database)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Ecommerce
```

### 2. Frontend Setup
```bash
cd Ecommerce_Services
npm install
```

### 3. Environment Configuration
Create a `.env.local` file:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
NEXT_PUBLIC_JAVA_BACKEND_URL=http://localhost:8080
NEXT_PUBLIC_JAVA_API_VERSION=v1
NEXT_PUBLIC_JAVA_TIMEOUT=10000
NEXT_PUBLIC_DEBUG_MODE=true
```

### 4. Backend Setup
```bash
cd Ecommerce_Backend_Services
./mvnw spring-boot:run
```

### 5. Start Development
```bash
# In Ecommerce_Services directory
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

```
Ecommerce_Services/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout process
│   ├── products/          # Product pages
│   ├── account/           # User account
│   ├── admin/             # Admin dashboard (no footer)
│   ├── employee/          # Employee portal (no footer)
│   └── delivery/          # Delivery portal (no footer)
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── admin/            # Admin components
│   └── delivery/         # Delivery components
├── services/             # API services
│   ├── authService.ts    # Authentication
│   ├── productService.ts # Products
│   ├── cartService.ts    # Shopping cart
│   ├── orderService.ts   # Orders
│   ├── reviewService.ts  # Reviews
│   ├── wishlistService.ts # Wishlist
│   └── paymentService.ts # Payments
├── lib/                  # Utilities and configurations
│   ├── api.ts           # API client
│   ├── javaIntegration.ts # Java backend helpers
│   └── stripe.ts        # Stripe integration
├── features/            # Zustand stores
├── types/              # TypeScript types
└── styles/             # Global styles
```

### 🎯 Layout Behavior
- **Main Pages**: Include navbar and footer (home, products, cart, checkout, account, auth)
- **Portal Pages**: Include only portal-specific header and sidebar, no footer (/admin, /employee, /delivery)

## 🔗 Backend Integration

This frontend is fully integrated with a Java Spring Boot backend. See the [Java Integration Guide](./JAVA_INTEGRATION_GUIDE.md) for detailed information about:

- API endpoints mapping
- Data transformation
- Authentication flow
- Error handling
- Service integration

### Key Integration Features:
- **Real-time Data**: All data comes from the Java backend
- **JWT Authentication**: Secure token-based authentication
- **File Upload**: Cloudinary integration for images
- **Payment Processing**: Stripe integration through backend
- **Order Management**: Complete order lifecycle
- **User Management**: Full user profile and preferences

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
```

## 🎨 Customization

### Styling
The application uses Tailwind CSS for styling. Customize the design by modifying:
- `tailwind.config.ts` - Tailwind configuration
- `styles/globals.css` - Global styles
- Component-specific styles in individual components

### Theming
The app supports dark/light mode. Customize themes in:
- `components/ui/` - Base UI components
- `context/` - Theme context
- `styles/` - Theme-specific styles

## 🔧 Configuration

### Environment Variables
See `.env.example` for all available environment variables.

### API Configuration
Configure API endpoints in `lib/api.ts` and `lib/javaIntegration.ts`.

### Payment Configuration
Configure Stripe in `lib/stripe.ts` and environment variables.

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured experience
- **Tablet**: Optimized layout
- **Mobile**: Touch-friendly interface

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **CORS Protection**: Backend CORS configuration
- **Input Validation**: Frontend and backend validation
- **XSS Protection**: Built-in Next.js protection
- **CSRF Protection**: Backend CSRF protection

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📚 Documentation

- [Backend Setup Guide](./BACKEND_SETUP_GUIDE.md) 🚀 **START HERE**
- [Java Integration Guide](./JAVA_INTEGRATION_GUIDE.md)
- [Missing Backend Implementations](./MISSING_BACKEND_IMPLEMENTATIONS.md) ⚠️ **CRITICAL**
- [API Documentation](./Ecommerce_Backend_Services/README.md)
- [Component Documentation](./components/README.md)
- [Deployment Guide](./DEPLOYMENT.md)

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Check backend CORS configuration
2. **Authentication Issues**: Verify JWT configuration
3. **API Timeouts**: Increase timeout in environment variables
4. **Build Errors**: Check TypeScript and ESLint errors

### Debug Mode
Enable debug mode by setting `NEXT_PUBLIC_DEBUG_MODE=true` in your environment variables.

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
1. Check the troubleshooting section
2. Review the documentation
3. Check GitHub issues
4. Contact the development team

---

**Built with ❤️ by Dev-Teammm**
