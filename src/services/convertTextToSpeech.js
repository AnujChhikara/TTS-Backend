import axios from 'axios'

const generateSpeechAudio = async (text, options = {}) => {
  try {
    const apiKey = process.env.GOOGLE_TTS_KEY
    if (!apiKey) {
      console.error('GOOGLE_TTS_KEY environment variable is not set.')
      return null
    }
    const endpoint = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`

    const defaultVoice = {
      languageCode: 'hi-IN',
      name: 'hi-IN-Chirp3-HD-Charon',
    }
    const defaultAudioConfig = {
      audioEncoding: 'LINEAR16',
    }

    const voice = { ...defaultVoice, ...options.voice }
    const audioConfig = { ...defaultAudioConfig, ...options.audioConfig }

    const payload = {
      input: { text },
      voice: voice,
      audioConfig: audioConfig,
    }

    const response = await axios.post(endpoint, payload)

    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      console.error('Google TTS API error:', response.status, response.statusText, response.data)
      return null
    }
  } catch (error) {
    console.error('Error during Google TTS API call:', error)
    return null
  }
}

export { generateSpeechAudio }
