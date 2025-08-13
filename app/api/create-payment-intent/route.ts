import { NextRequest, NextResponse } from 'next/server';
import { createPaymentIntent } from '../../../lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'usd' } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    const paymentIntent = await createPaymentIntent(amount, currency);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
