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

      const prompt = `Analyse the content of the attached bank statement to find all 
      subscriptions present. Find the cost of each subscription and the frequency. Output 
      the results as a JSON object, with each subscription listed with an id (starting at 0)
       and its associated name, cost, and frequency. Include a column named yearly but do not 
       fill any data in this column, leaving it as -. If it is not clear the frequency of a 
       subscription (ie only one payment showing in a monthly statement), use information 
       available from the actual subscriptions company about the usual pricing + frequency plans 
       available. Make sure you only output the JSON object and nothing else.
      Identify the bank name and account title from header

        {
          "accountTitle": "Bank Name - Account Type",
          "subscriptions": [
            {
              "name": "Service Name",
              "cost": 12.99,
              "frequency": "monthly",
              "yearly": "-"
            }
          ]
        }
        Use official bank names (e.g., "CommBank Smart Access", "ANZ Progress Saver")`;

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