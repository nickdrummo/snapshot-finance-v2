'use server'

import { GoogleGenAI, Type } from '@google/genai';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import { createSupabaseClient } from '@/lib/supabase';

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

const PRICING = {
  basePrice: 7.99,
  bundles: [
    { quantity: 1, price: 7.99 },
    { quantity: 2, price: 12.99 },
    { quantity: 3, price: 15.99 },
  ],
  extraPricePerAccount: 2.00
};

export async function analyseStatement(files: File[]) {
  const calculatePrice = (qty: number) => {
    if (qty <= 3) return PRICING.bundles.find(b => b.quantity === qty)?.price || PRICING.basePrice;
    return PRICING.bundles[2].price + (qty - 3) * PRICING.extraPricePerAccount;
  };

  try {
    console.log("Starting multi-account analysis with Gemini...");
    
    if (!files?.length) throw new Error('No files uploaded');
    
    const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
    const allSubscriptions: Subscription[] = [];
    let globalId = 0;

    const sessionId = uuidv4();

    for (const [index, file] of files.entries()) {
      console.log(`Processing statement ${index + 1}/${files.length}`);
      
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const base64Data = buffer.toString('base64');
      const mimeType = file.type; 

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

      // Define the strict schema for the model to follow
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

      const result = await genAI.models.generateContent({
        model: "gemini-3.1-pro-preview", 
        contents: [{
          role: 'user',
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Data,
              },
            },
          ],
        }],
        config: {
          responseMimeType: "application/json", 
          responseSchema: bankAnalysisSchema, // Enforces the structure
        }
      });

      const responseText = result.text;
      if (!responseText) throw new Error('No Gemini response');

      try {
        const analysis: BankAnalysis = JSON.parse(responseText);

        const processed = analysis.subscriptions.map(sub => ({
          ...sub,
          id: globalId++,
          accountTitle: analysis.accountTitle || `Account ${index + 1}`
        }));

        allSubscriptions.push(...processed);
      } catch (parseError) {
        console.error('Parsing failed:', parseError, responseText);
        throw new Error('Failed to parse bank account details');
      }
    }

    console.log(allSubscriptions);

    const supabase = createSupabaseClient();

    const { error } = await supabase
      .from('analysis_sessions')
      .insert({
        session_id: sessionId,
        data: allSubscriptions,
        snapshot_price: calculatePrice(files.length),
        expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) 
      });

    if (error) throw error;

    return { 
      success: true,
      sessionId,
      subscriptions: allSubscriptions
    };
  } catch (error: any) {
    console.error('Analysis error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}