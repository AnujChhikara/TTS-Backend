// models/tts.model.js
import axios from 'axios'

const synthesizeSpeech = async (text) => {
  const apiKey = process.env.GOOGLE_TTS_KEY
  const endpoint = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`

  const payload = {
    input: { text },
    voice: {
      languageCode: 'hi-IN',
      name: 'hi-IN-Chirp3-HD-Charon',
    },
    audioConfig: {
      audioEncoding: 'LINEAR16',
    },
  }

  const response = await axios.post(endpoint, payload)
  return response.data
}

export { synthesizeSpeech }
