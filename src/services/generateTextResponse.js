import dotenv from 'dotenv'
dotenv.config()

import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

const chatSessions = {}

function getOrCreateChatSession(sessionId, preferences) {
  if (!chatSessions[sessionId]) {
    const initialPrompt = `You are an AI interviewer tasked with evaluating a candidate for a ${preferences.experienceLevel} level role in ${preferences.techStack.join(', ')}. The interview type is ${preferences.interviewType} and the overall interview level is ${preferences.interviewLevel}.

Your goal is to assess the candidate's skills and experience relevant to this role. Start by introducing yourself and clearly stating the purpose of the interview. Then, proceed with asking relevant questions based on the provided context.

Remember to:
- Ask open-ended questions that encourage the candidate to elaborate.
- Listen attentively to the candidate's responses.
- Ask follow-up questions to delve deeper into their understanding and experience.
- Maintain a professional and courteous tone.
- Simulate a realistic interview flow, moving from introductory questions to more technical or behavioral ones as appropriate for the interview type.

Avoid:
- Asking leading questions.
- Providing answers or hints unless absolutely necessary (e.g., if the candidate is completely stuck on a fundamental concept).
- Rushing through the interview.

Start the interview now.`

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [
            {
              text: initialPrompt,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 150,
        temperature: 0.7,
      },
    })
    chatSessions[sessionId] = chat
  }

  return chatSessions[sessionId]
}

async function generateResponse(userResponse, sessionId, preferences) {
  const chat = getOrCreateChatSession(sessionId, preferences)

  const result = await chat.sendMessage(userResponse)
  const response = await result.response

  return response.text()
}

export { generateResponse }
