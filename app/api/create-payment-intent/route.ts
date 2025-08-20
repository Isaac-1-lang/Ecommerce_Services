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

    // Validate amount is a reasonable value
    if (amount > 1000000) { // $10,000 limit
      return NextResponse.json(
        { error: 'Amount too high' },
        { status: 400 }
      );
    }

    const paymentIntent = await createPaymentIntent(amount, currency);

    // Return the response in the format expected by Stripe
    return NextResponse.json({
      clientSecret: paymentIntent.clientSecret || paymentIntent.client_secret,
      id: paymentIntent.id,
    });
  } catch (error: any) {
    console.error('Error creating payment intent:', error);
    
    // Return more specific error messages
    const errorMessage = error.message || 'Failed to create payment intent';
    const statusCode = error.message?.includes('401') ? 401 : 
                      error.message?.includes('403') ? 403 : 
                      error.message?.includes('400') ? 400 : 500;
    
    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
}
