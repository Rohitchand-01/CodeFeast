import { useState, useCallback } from 'react';
import { callGeminiAPI } from '../services/geminiApi';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '../utils/constants';

export const useChat = () => {
  const [messages, setMessages] = useLocalStorage(STORAGE_KEYS.MESSAGES, []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentModel, setCurrentModel] = useLocalStorage('ai_chat_model', 'gemini-2.5-flash');

  const sendMessage = useCallback(async (content) => {
    if (!content.trim()) return;
    const _messages = [...messages];

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };

    console.log('Sending user message:', userMessage);

    setMessages(prev => [...prev, userMessage]);
    _messages.push(userMessage);
    setIsLoading(true);
    setError(null);

    try {
      const aiResponse = await callGeminiAPI(content, currentModel);

      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString(),
        model: currentModel,
      };

      console.log('Received AI message:', assistantMessage);

      
      _messages.push(assistantMessage);
      setMessages(_messages);
    } catch (err) {
      const errorMessage = err.message || 'Something went wrong. Please try again.';
      setError(errorMessage);

      const errorResponseMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `**Error**: ${errorMessage}`,
        timestamp: new Date().toISOString(),
      };

      _messages.push(errorResponseMessage);
      setMessages(_messages);
    } finally {
      setIsLoading(false);
    }
  }, [setMessages, currentModel]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEYS.MESSAGES);
  }, [setMessages]);

  const changeModel = useCallback((modelId) => {
    setCurrentModel(modelId);
  }, [setCurrentModel]);

  return {
    messages,
    isLoading,
    error,
    currentModel,
    sendMessage,
    clearMessages,
    changeModel,
  };
};
