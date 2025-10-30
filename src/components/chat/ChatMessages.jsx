import React, { useRef, useEffect } from 'react';
import { Message } from './Message';
import { TypingIndicator } from './TypingIndicator';
import { EmptyState } from '../ui/EmptyState';

export const ChatMessages = ({ messages, isLoading, onEditMessage, isDarkMode }) => {
  const messagesEndRef = useRef(null);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className={`flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 scrollbar-hide transition-colors ${
      isDarkMode
        ? 'bg-[#191919]'
        : 'bg-gray-50'
    }`}>
      <div className="max-w-6xl mx-auto">
        {messages.length === 0 && !isLoading ? (
          <EmptyState isDarkMode={isDarkMode} />
        ) : (
          <>
            {messages.map((message) => (
              <Message 
                key={message.id} 
                message={message} 
                onEditMessage={onEditMessage}
                isDarkMode={isDarkMode}
              />
            ))}
            {isLoading && <TypingIndicator isDarkMode={isDarkMode} />}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
