import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: { sessionId: string } }
) {
  try {
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
    if (!data) return NextResponse.json({ error: 'Session not found' }, { status: 404 });

    return NextResponse.json({
        subscriptions: data.data,
        snapshot_price: data.snapshot_price
      });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve analysis' },
      { status: 500 }
    );
  }
}