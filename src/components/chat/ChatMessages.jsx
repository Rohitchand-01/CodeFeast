import React, { useRef, useEffect } from 'react';
import { Message } from './Message';
import { TypingIndicator } from './TypingIndicator';
import { EmptyState } from '../ui/EmptyState';

export const ChatMessages = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null);

  console.log('ChatMessages - messages:', messages);
  console.log('ChatMessages - isLoading:', isLoading);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 scrollbar-hide">
      <div className="max-w-6xl mx-auto">
        {messages.length === 0 && !isLoading ? (
          <EmptyState />
        ) : (
          <>
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            {isLoading && <TypingIndicator />}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
