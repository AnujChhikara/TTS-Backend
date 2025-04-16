import { generateResponse } from '../services/generateTextResponse.js'
import { generateSpeechAudio } from '../services/convertTextToSpeech.js'

const AnalysisUserAnswer = async (req, res) => {
  const { userResponse, sessionId, preferences } = req.body

  try {
    const answer = await generateResponse(userResponse, sessionId, preferences)
    const responseVoice = await generateSpeechAudio(answer)
    return res.status(200).json({ data: responseVoice })
  } catch (err) {
    console.log(err)

    return res.status(500).json({ msg: 'Server is down!' })
  }
}

export { AnalysisUserAnswer }
