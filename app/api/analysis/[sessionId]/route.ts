import { NextResponse } from 'next/server';
// 1. Import the new function
import { createSupabaseClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    // 2. Create the client inside the handler
    const supabase = createSupabaseClient();
    
    const { sessionId } = await params;

    if (!sessionId) {
        return NextResponse.json(
          { error: "Missing session ID" },
          { status: 400 }
        );
      }
  
      const { data, error } = await supabase
        .from('analysis_sessions')
        .select('data, snapshot_price')
        .eq('session_id', sessionId) // Use destructured sessionId
        .single();

    if (error) throw error;
    if (!data) {
        // Added a specific return for the !data case
        return NextResponse.json({ error: "Analysis not found" }, { status: 404 });
    }

    return NextResponse.json({
        subscriptions: data.data,
        snapshot_price: data.snapshot_price
      });
  } catch (error) {
    console.error("Error in analysis route:", error); // Added for better debugging
    return NextResponse.json(
      { error: 'Failed to retrieve analysis' },
      { status: 500 }
    );
  }
}