// src/components/CheckoutButton.tsx
'use client'; // This directive marks it as a Client Component

import React, { useState } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { FiArrowRight } from 'react-icons/fi';

// Load Stripe outside of the component render to avoid recreating the Stripe object on every render.
// Use your Stripe Publishable Key from .env.local
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Define props if you want to make the product dynamic (optional for single product)
interface CheckoutButtonProps {
  sessionId: string;
}

export default function CheckoutButton({
    sessionId,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Make a request to your backend API route
        const response = await fetch('/api/checkout-sessions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                sessionId,
            })
        });
    
      const { stripeSessionId } = await response.json(); // Rename to stripeSessionId


      if (!sessionId) {
         throw new Error('Failed to retrieve session ID from the server.');
      }

      // 2. Get Stripe.js instance
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe.js has not loaded yet.');
      }

      // 3. Redirect to Stripe Checkout
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: stripeSessionId
      });

      // This point will only be reached if there is an immediate error when
      // redirecting to Checkout. Otherwise, the user is redirected to Stripe.
      if (stripeError) {
        console.error('Stripe redirection error:', stripeError);
        setError(stripeError.message || 'An unknown error occurred during redirection.');
      }

    } catch (err) {
      console.error('Checkout failed:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
        >Purchase Now <FiArrowRight className="ml-2" />
      </button>
    </div>
  );
}