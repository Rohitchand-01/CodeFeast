export const EmptyState = ({ isDarkMode }) => {
  return (
    <div className="flex items-center justify-center h-full px-4 py-8 sm:py-12">
      <div className={`text-center items-center max-w-md ${
        isDarkMode ? 'text-gray-100' : 'text-gray-900'
      }`}>
        <div className="mb-6 sm:mb-8">
          <h2 className={`text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 ${
            isDarkMode
              ? 'text-white'
              : 'text-gray-800'
          }`}>
            Welcome to AI Chat
          </h2>
          <p className={`text-sm sm:text-base ${
            isDarkMode
              ? 'text-gray-400'
              : 'text-gray-600'
          }`}>
            Start a conversation and experience intelligent responses
          </p>
        </div>

        <p className={`mt-6 sm:mt-8 text-xs sm:text-sm ${
          isDarkMode
            ? 'text-gray-500'
            : 'text-gray-500'
        }`}>
          Type your message below to get started
        </p>
      </div>
    </div>
  );
};
