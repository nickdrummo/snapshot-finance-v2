'use server'

import OpenAI from 'openai';
import { cookies } from 'next/headers'
import pdfParse from 'pdf-parse';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function analyseStatement(file: File) {
  try {
    console.log("fuc u")


    if (!file) {
        console.log("fuc u")
      throw new Error('No file uploaded')
    }

    console.log('File received:', file.name);
    

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(new Uint8Array(arrayBuffer));


    // Parse the PDF
    //const pdfParse = require("pdf-parse");
    const data = await pdfParse(buffer);
    const extractedText = data.text

    console.log("text 2: ", extractedText);

    console.log('Creating OpenAI instance...');
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    console.log('OpenAI instance created');

    if (!openai.apiKey) {
      throw new Error('OpenAI API key is not set');
    }

    console.log('Sending request to OpenAI');
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a financial analyst specializing in identifying subscription-based spending from bank statements."
        },
        {
          role: "user",
          content: `Analyze the following bank statement and identify subscription-based spending. I want you to produce a JSON object as the answer which has each subscription listed with an id (starting at 0) and its associated name, cost, and frequency. I want you to include a column named yearly but NO DO NOT FILL ANY DATA IN THIS COLUMN. IT SHOULD REMAIN AS - . DO NOT MAKE UP ANY DATA. If a subscription has not been billed in the last cycle, treat this as cancelled and do not report it. DO NOT PRODUCE ANY OTHER OUTPUT. ONLY OUTPUT THE JSON OBJECT. REMOVE LEADING AND TRAILING JSON MARKERS!!! DO NOT INCLUDE THREE QUOTES AT THE BEGINNING AND END
          make the output strictly follow this example: 
          
          [
            {
              "id": 0,
              "name": "Anytime Fitness",
              "cost": 17.95,
              "frequency": "fortnightly"
              "yearly": "-"
            },
            {
              "id": 1,
              "name": "Spotify",
              "cost": 12.99,
              "frequency": "monthly"
              "yearly": "-"
            },
            {
              "id": 2,
              "name": "Vodafone",
              "cost": 35.00,
              "frequency": "monthly"
              "yearly": "-"
            },
            {
              "id": 3,
              "name": "Apple.com",
              "cost": 2.99,
              "frequency": "monthly"
              "yearly": "-"
            },
            {
              "id": 4,
              "name": "DoorDash DashPass",
              "cost": 9.99,
              "frequency": "monthly"
              "yearly": "-"
            }
          ]
            .

          ${extractedText}`
        }
      ],
    });
    console.log('Response received from OpenAI');

    const analysis = response.choices[0].message.content;

    if (!analysis) {
      throw new Error('No analysis was generated');
    }

    //save the analysis results to the database
    console.log('Saving analysis results to database');

    //get the client
    


    

    (await cookies()).set('analysis_results', JSON.stringify(analysis))

    return { message: 'Analysis complete', analysis }
  } catch (error) {
    console.error('Error during analysis:', error);
    if (error instanceof OpenAI.APIError) {
      throw new Error(`OpenAI API error: ${error.message}`);
    }
    throw new Error('Analysis failed: ' + (error instanceof Error ? error.message : String(error)));
  }
}
