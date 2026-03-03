import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(
  request: Request,
  { params }: { params: { sessionId: string } }
) {
  try {
    const supabase = createSupabaseClient();
    const { sessionId } = params;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing session ID" },
        { status: 400 }
      );
    }

    // In a real application, you would trigger the pro model analysis here.
    // For this example, we'll just simulate a delay and then update the database.
    
    // Simulate a 5 second delay for the pro model analysis
    await new Promise(resolve => setTimeout(resolve, 5000));

    const { error } = await supabase
      .from('analysis_sessions')
      .update({ pro_generated: true })
      .eq('session_id', sessionId);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in pro-analysis route:", error);
    return NextResponse.json(
      { error: 'Failed to trigger pro analysis' },
      { status: 500 }
    );
  }
}
