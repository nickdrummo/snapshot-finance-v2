// app/api/get-session/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id');
  
  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session ID' }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  return NextResponse.json(session);
}