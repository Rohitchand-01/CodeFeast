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

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };

    console.log('Sending user message:', userMessage);

    // ✅ Force UI update immediately before async logic
    setMessages(prev => {
      const updated = [...prev, userMessage];
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
      return updated;
    });

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

      setMessages(prev => {
        const updated = [...prev, assistantMessage];
        localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      const errorMessage = err.message || 'Something went wrong. Please try again.';
      setError(errorMessage);

      const errorResponseMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `**Error**: ${errorMessage}`,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => {
        const updated = [...prev, errorResponseMessage];
        localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  }, [setMessages, currentModel]);

  const editMessage = useCallback(async (messageId, newContent) => {
    console.log('editMessage called with:', messageId, newContent);
    
    setMessages(prevMessages => {
      const messageIndex = prevMessages.findIndex(msg => msg.id === messageId);
      if (messageIndex === -1) {
        console.log('Message not found');
        return prevMessages;
      }

      const updatedMessage = {
        ...prevMessages[messageIndex],
        content: newContent,
      };

      const messagesToKeep = [...prevMessages.slice(0, messageIndex), updatedMessage];
      
      console.log('Messages to keep:', messagesToKeep);
      return messagesToKeep;
    });

    setIsLoading(true);
    setError(null);

    try {
      const aiResponse = await callGeminiAPI(newContent, currentModel);

      const assistantMessage = {
        id: Date.now(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString(),
        model: currentModel,
      };

      console.log('Received AI message after edit:', assistantMessage);

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = err.message || 'Something went wrong. Please try again.';
      setError(errorMessage);

      const errorResponseMessage = {
        id: Date.now(),
        role: 'assistant',
        content: `**Error**: ${errorMessage}`,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, errorResponseMessage]);
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
    editMessage,
    clearMessages,
    changeModel,
  };
};
