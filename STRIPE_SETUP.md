# Stripe Integration Setup

This guide will help you set up Stripe payment processing in your e-commerce application.

## Prerequisites

1. A Stripe account (sign up at [stripe.com](https://stripe.com))
2. Node.js and npm installed
3. The e-commerce application running

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

## Getting Your Stripe Keys

1. **Log in to your Stripe Dashboard**
2. **Navigate to Developers > API keys**
3. **Copy your keys:**
   - **Publishable key** (starts with `pk_test_` for test mode)
   - **Secret key** (starts with `sk_test_` for test mode)

## Test Card Numbers

For testing payments, use these test card numbers:

- **Visa**: `4242424242424242`
- **Visa (debit)**: `4000056655665556`
- **Mastercard**: `5555555555554444`
- **American Express**: `378282246310005`
- **Discover**: `6011111111111117`

**Expiry Date**: Any future date (e.g., `12/25`)
**CVC**: Any 3 digits (e.g., `123`)
**ZIP**: Any 5 digits (e.g., `12345`)

## Features Implemented

### 1. Stripe Payment Integration
- Secure card processing with Stripe Elements
- Payment intent creation and confirmation
- Error handling and validation

### 2. Enhanced Address Form
- Comprehensive country codes for international phone numbers
- Country selection dropdown
- Improved form validation and user experience

### 3. Checkout Flow
- Multi-step checkout process (Address → Payment → Review)
- Real-time order summary calculation
- Tax and shipping calculations
- Guest checkout support

### 4. Order Management
- Order confirmation and success pages
- Payment status tracking
- Order history (to be implemented)

## API Routes

The following API routes are implemented:

- `POST /api/create-payment-intent` - Creates a payment intent for Stripe

## Components

### StripePaymentForm
- Secure card input using Stripe Elements
- Real-time validation
- Error handling and user feedback

### AddressForm
- International address support
- Phone number with country codes
- Form validation

### CheckoutPage
- Multi-step checkout process
- Order summary sidebar
- Payment integration

## Security Features

1. **Server-side payment processing** - Payment intents are created on the server
2. **Client-side security** - Card data never touches your server
3. **PCI compliance** - Stripe handles all sensitive payment data
4. **Environment variable protection** - Keys are stored securely

## Testing

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Add items to cart and proceed to checkout**

3. **Use test card numbers** to complete payments

4. **Check Stripe Dashboard** to see test transactions

## Production Deployment

Before going live:

1. **Switch to live keys** in your environment variables
2. **Update webhook endpoints** in Stripe Dashboard
3. **Test with real cards** in test mode
4. **Enable fraud detection** and other security features

## Troubleshooting

### Common Issues

1. **"Invalid API key" error**
   - Check that your environment variables are set correctly
   - Ensure you're using the correct keys (test vs live)

2. **Payment fails**
   - Verify you're using test card numbers
   - Check browser console for errors
   - Review Stripe Dashboard for failed payments

3. **Form validation errors**
   - Ensure all required fields are filled
   - Check phone number format
   - Verify email format

### Support

- **Stripe Documentation**: [stripe.com/docs](https://stripe.com/docs)
- **Stripe Support**: [support.stripe.com](https://support.stripe.com)
- **Application Issues**: Check the console logs and network tab

## Next Steps

1. **Implement webhooks** for payment status updates
2. **Add order management** system
3. **Implement email notifications**
4. **Add payment method saving** for returning customers
5. **Implement subscription payments** if needed
