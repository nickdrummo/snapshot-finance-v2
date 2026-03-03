import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/lib/supabase';
import { GoogleGenAI, Type } from '@google/genai';

interface Subscription {
  id: number;
  name: string;
  cost: number;
  frequency: string;
  yearly: string;
  accountTitle: string;
}

interface BankAnalysis {
  accountTitle: string;
  subscriptions: Omit<Subscription, 'id' | 'accountTitle'>[];
}

const MODEL_FALLBACKS = [
  "gemini-3.1-pro-preview",
  "gemini-2.5-pro-preview"
];

export const dynamic = 'force-dynamic';

export async function POST(
  request: Request,
  context: { params: { sessionId: string } }
) {
  try {
    const supabase = createSupabaseClient();
    const { sessionId } = context.params;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing session ID" },
        { status: 400 }
      );
    }

    const { data: sessionData, error: sessionError } = await supabase
      .from('analysis_sessions')
      .select('file_paths, pro_generated')
      .eq('session_id', sessionId)
      .single();

    if (sessionError) throw sessionError;
    if (!sessionData) return NextResponse.json({ error: "Session not found" }, { status: 404 });
    if (sessionData.pro_generated) return NextResponse.json({ message: "Pro analysis already complete." });
    if (!sessionData.file_paths || sessionData.file_paths.length === 0) {
      return NextResponse.json({ error: "No files found for this session" }, { status: 400 });
    }

    const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
    const allSubscriptions: Subscription[] = [];
    let globalId = 0;

    for (const [index, filePath] of sessionData.file_paths.entries()) {
      const { data: fileData, error: fileError } = await supabase.storage
        .from('statement-files')
        .download(filePath);

      if (fileError) throw new Error(`Failed to download file ${filePath}: ${fileError.message}`);

      const arrayBuffer = await fileData.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Data = buffer.toString('base64');
      const mimeType = fileData.type;

      const prompt = `Act as a financial data analyst with expertise in banking transactions and subscription identification. Your task is to review the attached bank statement and extract all recurring subscription payments. Maintain a precise and technical tone appropriate for financial reporting. The response should be structured, detailed, and accurate.

1. **Introduction**
   - Begin by identifying the official bank name and account title from the statement header, using the exact naming conventions as found in official bank documentation (e.g., "CommBank Smart Access", "ANZ Progress Saver").
   - Define what constitutes a subscription payment, including recurring charges for services such as streaming, software, memberships, or other automated payments.

2. **Main Content Breakdown**
   (a) Core Analysis:
      - Examine all transaction entries to detect recurring payments that indicate active subscriptions.
      - For each subscription, determine the service name, the cost per payment, and the payment frequency (e.g., monthly, yearly, weekly).
      - If the frequency cannot be determined from the statement alone (such as when only a single payment appears), research the subscription provider’s standard pricing and billing cycles to make an informed estimate.
   (b) Key Considerations:
      - Ensure that only genuine subscriptions are included, excluding one-off purchases or irregular payments.
      - Address any ambiguities by cross-referencing with publicly available information from the subscription provider.
      - Leave the "yearly" field as "-" for each subscription, as instructed.`;

      const bankAnalysisSchema = {
        type: Type.OBJECT,
        properties: {
          accountTitle: {
            type: Type.STRING,
            description: "The official bank name and account type from the statement header.",
          },
          subscriptions: {
            type: Type.ARRAY,
            description: "A list of identified recurring subscription payments.",
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "Name of the subscription service" },
                cost: { type: Type.NUMBER, description: "Cost per payment" },
                frequency: { type: Type.STRING, description: "Payment frequency (e.g., monthly, yearly, weekly)" },
                yearly: { type: Type.STRING, description: "Always set to '-'" },
              },
              required: ["name", "cost", "frequency", "yearly"],
            },
          },
        },
        required: ["accountTitle", "subscriptions"],
      };

      let responseText = null;

      for (const model of MODEL_FALLBACKS) {
        try {
          console.log(`Attempting pro analysis with model: ${model}`);
          const result = await genAI.models.generateContent({
            model,
            contents: [{
              role: 'user',
              parts: [
                { text: prompt },
                { inlineData: { mimeType, data: base64Data } },
              ],
            }],
            config: {
              responseMimeType: "application/json",
              responseSchema: bankAnalysisSchema,
            }
          });
          responseText = result.text;
          break;
        } catch (error: any) {
          console.warn(`Pro model ${model} failed: ${error.message}`);
          if (model === MODEL_FALLBACKS[MODEL_FALLBACKS.length - 1]) {
            throw new Error(`Pro analysis failed after trying all models. Last error: ${error.message}`);
          }
        }
      }
      
      if (!responseText) throw new Error('No valid response from pro models.');

      const analysis: BankAnalysis = JSON.parse(responseText);
      const processed = analysis.subscriptions.map(sub => ({
        ...sub,
        id: globalId++,
        accountTitle: analysis.accountTitle || `Account ${index + 1}`
      }));
      allSubscriptions.push(...processed);
    }

    const { error: updateError } = await supabase
      .from('analysis_sessions')
      .update({ data: allSubscriptions, pro_generated: true })
      .eq('session_id', sessionId);

    if (updateError) throw updateError;

    return NextResponse.json({ success: true, message: "Pro analysis complete." });

  } catch (error) {
    console.error("Error in pro-analysis route:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { error: 'Failed to complete pro analysis', details: errorMessage },
      { status: 500 }
    );
  }
}
