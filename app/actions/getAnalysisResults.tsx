'use server'

import { cookies } from 'next/headers'

export async function getAnalysisResults() {
  const resultsCookie = (await cookies()).get('analysis_results')
  if (resultsCookie) {
    return JSON.parse(resultsCookie.value)
  }
  return null
}
