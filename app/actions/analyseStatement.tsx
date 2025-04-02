'use server'

import { GoogleGenAI } from '@google/genai';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function analyseStatement(file: File) {
  try {
    console.log("Starting Gemini analysis...");

    if (!file) {
      console.log("No file uploaded.");
      throw new Error('No file uploaded');
    }

    console.log('File received:', file.name);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Initialize Gemini API
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      throw new Error('Gemini API key is not set in environment variables.');
    }
    const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const base64Data = buffer.toString('base64');
    const mimeType = file.type; // e.g., 'application/pdf'

    const prompt = `Analyse the content of the attached bank statement to find all subscriptions present. Find the cost of each subscription and the frequency. Output the results as a JSON object, with each subscription listed with an id (starting at 0) and its associated name, cost, and frequency. Include a column named yearly but do not fill any data in this column, leaving it as -. If it is not clear the frequency of a subscription (ie only one payment showing in a monthly statement), use information available from the actual subscriptions company about the usual pricing + frequency plans available. Make sure you only output the JSON object and nothing else.
          follow this example:

          [
            {
              "id": 0,
              "name": "Anytime Fitness",
              "cost": 17.95,
              "frequency": "fortnightly",
              "yearly": "-"
            },
            {
              "id": 1,
              "name": "Spotify",
              "cost": 12.99,
              "frequency": "monthly",
              "yearly": "-"
            },
            {
              "id": 2,
              "name": "Vodafone",
              "cost": 35.00,
              "frequency": "monthly",
              "yearly": "-"
            },
            {
              "id": 3,
              "name": "Apple.com",
              "cost": 2.99,
              "frequency": "monthly",
              "yearly": "-"
            },
            {
              "id": 4,
              "name": "DoorDash DashPass",
              "cost": 9.99,
              "frequency": "monthly",
              "yearly": "-"
            }
          ]
          `;

    console.log('Sending request to Gemini...');
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-pro-exp-03-25",
      contents: [
        {
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
        },
      ],
    });
    console.log('Response received from Gemini.');

    const responseText = result.text;

    if (!responseText) {
      throw new Error('No analysis was generated by Gemini.');
    }

    // Attempt to parse the JSON response
    let analysis: any;
    try {
      // Gemini might include extra text around the JSON, so we need to be careful
      const jsonStartIndex = responseText.indexOf('[');
      const jsonEndIndex = responseText.lastIndexOf(']');
      const jsonString = responseText.substring(jsonStartIndex, jsonEndIndex + 1);
      analysis = JSON.parse(jsonString);
    } catch (error) {
      console.error('Error parsing Gemini response as JSON:', error, responseText);
      throw new Error('Could not parse Gemini response as JSON.');
    }

    console.log('Saving analysis results to cookies...');
    (await cookies()).set('analysis_results', JSON.stringify(analysis));

    return { message: 'Analysis complete', analysis };
  } catch (error: any) {
    console.error('Error during Gemini analysis:', error);
    throw new Error('Gemini analysis failed: ' + (error instanceof Error ? error.message : String(error)));
  }
}