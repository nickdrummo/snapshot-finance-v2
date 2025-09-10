'use server'

import { GoogleGenAI } from '@google/genai';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/lib/supabase';

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

    //intialise session id for each analysis.
    const sessionId = uuidv4();


    for (const [index, file] of files.entries()) {
      console.log(`Processing statement ${index + 1}/${files.length}`);
      
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const base64Data = buffer.toString('base64');
      const mimeType = file.type; // e.g., 'application/pdf'

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
      - Leave the "yearly" field as "-" for each subscription, as instructed.

3. **Conclusion & Recommendations**
   - Summarize the findings by presenting a JSON object containing:
     - "accountTitle": The official bank name and account type.
     - "subscriptions": An array where each entry includes an id (starting at 0), name, cost, frequency, and yearly (set as "-").
   - Ensure the output contains only the JSON object, with no additional commentary or explanation.
   - Double-check for accuracy in naming conventions and data extraction, as this information may be used for financial planning or auditing purposes.`;

      const result = await genAI.models.generateContent({
        model: "gemini-2.5-pro",
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
      });

      const responseText = result.text;
      if (!responseText) throw new Error('No Gemini response');

      try {
        const jsonStart = responseText.indexOf('{');
        const jsonEnd = responseText.lastIndexOf('}');
        const jsonString = responseText.slice(jsonStart, jsonEnd + 1);
        const analysis: BankAnalysis = JSON.parse(jsonString);

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


    // Save to cookies (consider database storage for production)
    // (await cookies()).set('analysis_results', JSON.stringify(allSubscriptions));

    //store in supabase 
    const { error } = await supabase
      .from('analysis_sessions')
      .insert({
        session_id: sessionId,
        data: allSubscriptions,
        snapshot_price: calculatePrice(files.length),
        expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 1 week

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