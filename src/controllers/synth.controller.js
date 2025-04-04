import axios from 'axios'

const synth = async (req, res) => {
  const { text } = req.body

  const apiKey = process.env.GOOGLE_TTS_KEY
  const endpoint = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`

  const payload = {
    input: {
      text,
    },
    voice: {
      languageCode: 'hi-IN',
      name: 'hi-IN-Chirp3-HD-Charon',
    },
    audioConfig: {
      audioEncoding: 'LINEAR16',
    },
  }

  try {
    const response = await axios.post(endpoint, payload)
    const data = response.data
    res.json(data)
  } catch (error) {
    console.error(error.response?.data || error.message)
    res.status(500).json({ error: 'Failed to synthesize speech' })
  }
}

export { synth }
