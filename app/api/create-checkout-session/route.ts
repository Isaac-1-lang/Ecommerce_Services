import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export const runtime = 'nodejs';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: '2025-07-30.basil' })
  : null as unknown as Stripe;

export async function POST(request: NextRequest) {
  try {
    if (!stripeSecretKey || !stripe) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Missing STRIPE_SECRET_KEY.' },
        { status: 500 }
      );
    }

    let body: any = null;
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      body = await request.json().catch(() => null);
    } else {
      const text = await request.text().catch(() => '');
      try {
        body = text ? JSON.parse(text) : null;
      } catch {
        body = null;
      }
    }

    if (!body) {
      return NextResponse.json(
        { error: 'Invalid request body. Expected JSON.' },
        { status: 400 }
      );
    }

    const { items, successUrl, cancelUrl, customerEmail } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Items are required and must be an array' },
        { status: 400 }
      );
    }

    const lineItems = items.map((item: any) => {
      const productData: any = {
        name: item.name,
        images: item.image ? [item.image] : [],
      };
      if (typeof item.description === 'string' && item.description.trim().length > 0) {
        productData.description = item.description.trim();
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: productData,
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      metadata: {
        order_id: `order_${Date.now()}`,
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'FR', 'DE', 'IT', 'ES', 'NL', 'BE', 'CH', 'AT', 'SE', 'NO', 'DK', 'FI']
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 599, currency: 'usd' },
            display_name: 'Standard shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 7 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'usd' },
            display_name: 'Free shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 10 },
            },
          },
        },
      ],
      allow_promotion_codes: true,
    };

    if (typeof customerEmail === 'string' && customerEmail.trim().length > 0) {
      sessionParams.customer_email = customerEmail.trim();
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    const message = error?.message || 'Failed to create checkout session';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
