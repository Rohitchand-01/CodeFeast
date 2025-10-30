export const TypingIndicator = ({ isDarkMode }) => {
  return (
    <div className="flex justify-start mb-3 sm:mb-4 animate-fadeIn">
      <div className={`rounded-2xl px-4 py-3 shadow-sm border ${
        isDarkMode
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full animate-bounce ${
                isDarkMode
                  ? 'bg-gray-500'
                  : 'bg-gray-400'
              }`}
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
