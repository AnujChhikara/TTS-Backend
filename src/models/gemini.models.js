import dotenv from 'dotenv'
dotenv.config()

import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API)

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

async function generateResponse(userResponse) {
  const prompt = `You are an AI interviewer conducting a professional interview session. Respond to the candidate's answers with appropriate follow-up questions or feedback.

Candidate's answer: "${userResponse}"`
  const result = await model.generateContent(prompt)
  const response = result.response

  return response.text()
}

export { generateResponse }
