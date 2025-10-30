import React from 'react';
import { ChatHeader } from './components/chat/ChatHeader';
import { ChatMessages } from './components/chat/ChatMessages';
import { ChatInput } from './components/chat/ChatInput';
import { useChat } from './hooks/useChat';
import { useTheme } from './hooks/useTheme';

function App() {
  const { messages, isLoading, error, sendMessage, editMessage, clearMessages } = useChat();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear all messages?')) {
      clearMessages();
    }
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="flex flex-col h-screen bg-gray-50 dark:bg-[#191919] transition-colors">
        <ChatHeader
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
          onClearChat={handleClearChat}
          hasMessages={messages.length > 0}
        />

        <ChatMessages 
          messages={messages} 
          isLoading={isLoading} 
          onEditMessage={editMessage}
          isDarkMode={isDarkMode}
        />

        <ChatInput
          isLoading={isLoading}
          error={error}
          onSendMessage={sendMessage}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
}

export default App;
