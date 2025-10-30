export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-8 sm:py-12">
      <div className="text-center max-w-md">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2 sm:mb-3">
            Welcome to AI Chat
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Start a conversation and experience intelligent responses
          </p>
        </div>

        <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500 dark:text-gray-500">
          Type your message below to get started
        </p>
      </div>
    </div>
  );
};
