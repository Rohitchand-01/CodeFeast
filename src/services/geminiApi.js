import { API_CONFIG } from '../utils/constants'

export const callGeminiAPI = async (chatHistory) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  if (!apiKey) throw new Error('API key not found. Please add VITE_GEMINI_API_KEY to your .env file')

  const contents = chatHistory.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }))

  try {
    const response = await fetch(`${API_CONFIG.GEMINI_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048
        }
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || 'Failed to get response from AI')
    }

    const data = await response.json()
    console.log(data)
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from AI'
  } catch (error) {
    throw error
  }
}
