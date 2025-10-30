import { API_CONFIG } from '../utils/constants';

export const callGeminiAPI = async (userMessage) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('API key not found. Please add VITE_GEMINI_API_KEY to your .env file');
  }

  try {
    const response = await fetch(
      `${API_CONFIG.GEMINI_URL}?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: userMessage }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to get response from AI');
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0]?.content?.parts[0]?.text) {
      throw new Error('Invalid response format from AI');
    }
    
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
};
