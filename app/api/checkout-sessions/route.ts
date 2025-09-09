// src/app/api/checkout-sessions/route.ts
import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

// Use existing product ID from your Stripe dashboard
const STRIPE_PRODUCT_ID = 'prod_T1MUoXEW5piNi0'; // Replace with your actual product ID

export async function POST(req: NextRequest) {
  const { sessionId } = await req.json();

  const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const successUrl = `${origin}/finish?sessionId=${sessionId}&session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${origin}/checkout?sessionId=${sessionId}`;

  try {
    // Get the product details from Stripe
    const product = await stripe.products.retrieve(STRIPE_PRODUCT_ID);
    
    // Get the default price for the product
    const { data, error } = await supabase
      .from('analysis_sessions')
      .select('snapshot_price')
      .eq('session_id', sessionId)
      .single();

    if (error || !data) {
      throw new Error('Session not found or price missing');
    }

    // 2. Create Stripe Price dynamically
    const stripePrice = await stripe.prices.create({
      unit_amount: Math.round(data.snapshot_price * 100), // Convert to cents
      currency: 'aud',
      product: STRIPE_PRODUCT_ID!,
    });
    
    const paymentMethods = await stripe.paymentMethods.list({
        limit: 100 // Get all available payment methods
    });
  
    // Extract unique payment method types
    const paymentMethodTypes = Array.from(
    new Set(paymentMethods.data.map(pm => pm.type))
    ) as Stripe.Checkout.SessionCreateParams.PaymentMethodType[];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: paymentMethodTypes,
      line_items: [
        {
          price: stripePrice.id,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true, // Add this line to enable the coupon field
      metadata: {
        product_id: STRIPE_PRODUCT_ID,
      },
    });

    return NextResponse.json({ 
        stripeSessionId: session.id // Return Stripe's session ID
    });

  } catch (error) {
    console.error('Error creating Stripe Checkout session:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return new NextResponse(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}