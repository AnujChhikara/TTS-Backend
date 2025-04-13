import { generateResponse } from '../models/gemini.models.js'
import { synthesizeSpeech } from '../models/tts.models.js'

const AnalysisUserAnswer = async (req, res) => {
  const message = req.body.message

  try {
    const answer = await generateResponse(message)
    const responseVoice = await synthesizeSpeech(answer)
    return res.status(200).json({ data: responseVoice })
  } catch (err) {
    console.log(err)

    return res.status(400).json({ msg: 'Server is down!' })
  }
}

export { AnalysisUserAnswer }
