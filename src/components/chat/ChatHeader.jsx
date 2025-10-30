import React from 'react';
import { Moon, Sun, Trash2, Bot } from 'lucide-react';

export const ChatHeader = ({ isDarkMode, onToggleTheme, onClearChat, hasMessages }) => {
  return (
    <header className="bg-white dark:bg-[#191919]  border-b border-gray-200 dark:border-gray-700 px-4 py-3 sm:px-6 sm:py-4 transition-colors">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-3">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
              CodeFeast <span className="text-gray-600 dark:text-gray-400"> Assistant</span>
            </h1>
           
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {hasMessages && (
            <button
              onClick={onClearChat}
              className="p-2 sm:p-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              title="Clear chat"
              aria-label="Clear chat history"
            >
              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
          <button
            onClick={onToggleTheme}
            className="p-2 sm:p-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
