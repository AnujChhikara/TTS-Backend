// controllers/tts.controller.js
import { synthesizeSpeech } from '../models/tts.models.js'

const synth = async (req, res) => {
  const { text } = req.body

  if (!text) {
    return res.status(400).json({ error: 'Text input is required.' })
  }

  try {
    const data = await synthesizeSpeech(text)
    res.json(data)
  } catch (error) {
    console.error('TTS Error:', error.response?.data || error.message)
    res.status(500).json({ error: 'Failed to synthesize speech' })
  }
}

export { synth }
