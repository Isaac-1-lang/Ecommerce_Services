# Stripe Integration Setup Guide

## Environment Variables

Add these to your `.env.local` file:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# App Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Getting Your Stripe Keys

1. **Sign up for Stripe**: Go to [stripe.com](https://stripe.com) and create an account
2. **Get your API keys**: 
   - Go to Dashboard → Developers → API keys
   - Copy your **Publishable key** (starts with `pk_test_`)
   - Copy your **Secret key** (starts with `sk_test_`)

## Installation

```bash
npm install stripe @stripe/stripe-js
```

## How It Works

1. **Cart Page**: Users see the "Proceed to Secure Checkout" button
2. **Stripe Checkout**: Clicking redirects to Stripe's hosted payment page
3. **Payment**: Users enter payment details on Stripe's secure page
4. **Success**: Users are redirected back to your success page
5. **Order Processing**: You can handle the order in your backend

## Benefits of Stripe Checkout

✅ **Security**: PCI DSS compliant, hosted by Stripe
✅ **Simplicity**: No need to handle payment forms
✅ **Mobile Optimized**: Works perfectly on all devices
✅ **Multiple Payment Methods**: Cards, digital wallets, etc.
✅ **Built-in Validation**: Stripe handles all payment validation
✅ **Less Code**: Much simpler than custom payment forms

## Testing

Use Stripe's test card numbers:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Expiry**: Any future date
- **CVC**: Any 3 digits
