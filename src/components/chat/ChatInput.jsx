import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

export const ChatInput = ({ isLoading, error, onSendMessage, isDarkMode }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  const adjustHeight = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [input]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim());
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    adjustHeight();
  };

  return (
    <div
      className={`transition-colors px-4 py-3 sm:px-6 sm:py-4 border-t ${
        isDarkMode ? 'bg-[#191919] border-gray-700' : 'bg-white border-gray-200'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {error && (
          <div
            className={`mb-3 px-3 py-2 sm:px-4 sm:py-2.5 border rounded-lg ${
              isDarkMode
                ? 'bg-red-900/20 border-red-800'
                : 'bg-red-50 border-red-200'
            }`}
          >
            <p
              className={`text-xs sm:text-sm ${
                isDarkMode ? 'text-red-400' : 'text-red-600'
              }`}
            >
              {error}
            </p>
          </div>
        )}

        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            disabled={isLoading}
            rows={1}
            className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              isDarkMode
                ? 'bg-[#FFFFFF14] text-gray-100 border-gray-600 dark:focus:ring-blue-400'
                : 'bg-gray-100 text-gray-800 border-gray-300'
            }`}
            style={{
              overflow: 'hidden',
              minHeight: '44px',
              lineHeight: '1.5',
            }}
          />

          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="shrink-0 p-2.5 cursor-pointer sm:p-3 rounded-xl text-white transition-all shadow-sm hover:shadow-md disabled:shadow-none bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
