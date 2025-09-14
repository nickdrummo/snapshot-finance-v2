// app/api/get-session/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function GET(request: Request) {
  try {
    // Move the Stripe instantiation inside the handler
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      throw new Error("STRIPE_SECRET_KEY is not set in environment variables.");
    }
    const stripe = new Stripe(stripeSecretKey, {
        typescript: true,
    });

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');
    
    if (!sessionId) {
      return NextResponse.json({ error: 'Missing session ID' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return NextResponse.json(session);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error retrieving Stripe session:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}