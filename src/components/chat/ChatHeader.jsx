import { Moon, Sun, Trash2 } from "lucide-react";

export const ChatHeader = ({ isDarkMode, onToggleTheme, onClearChat, hasMessages }) => {
  return (
    <header className={`transition-colors px-4 py-3 sm:px-6 sm:py-4 border-b ${
      isDarkMode 
        ? 'bg-[#191919] border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-3">
          <div>
            <h1 className={`text-lg sm:text-xl font-bold ${
              isDarkMode 
                ? 'text-white' 
                : 'text-gray-800'
            }`}>
              CodeFeast <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}> Assistant</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {hasMessages && (
            <button
              onClick={onClearChat}
              className={`p-2 sm:p-2.5 rounded-lg transition-colors ${
                isDarkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Clear chat"
              aria-label="Clear chat history"
            >
              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
          <button
            onClick={onToggleTheme}
            className={`p-2 sm:p-2.5 rounded-lg transition-colors ${
              isDarkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
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
