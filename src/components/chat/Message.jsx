import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';

export const Message = ({ message }) => {
  const [copied, setCopied] = useState(false);
  
  const isUser = message.role === 'user';

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper function to extract text from children (handles React elements)
  const getCodeString = (children) => {
    if (typeof children === 'string') {
      return children;
    }
    if (Array.isArray(children)) {
      return children
        .map(child => {
          if (typeof child === 'string') return child;
          if (child?.props?.children) return getCodeString(child.props.children);
          return '';
        })
        .join('');
    }
    if (children?.props?.children) {
      return getCodeString(children.props.children);
    }
    return String(children);
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3 sm:mb-4 animate-fadeIn`}>
      <div
        className={`max-w-[85%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-[70%] rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3 shadow-sm ${
          isUser
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
            : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
        }`}
      >
        {isUser ? (
          <p className="text-sm sm:text-base whitespace-pre-wrap break-words leading-relaxed">
            {message.content}
          </p>
        ) : (
          <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none prose-pre:p-0 prose-pre:bg-transparent prose-p:my-2 prose-p:leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  
                  // Fixed: Use helper function to properly extract code string
                  const codeString = getCodeString(children).replace(/\n$/, '');

                  return !inline && match ? (
                    <div className="my-3 sm:my-4 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 shadow-sm">
                      <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-900 px-3 py-2 sm:px-4 sm:py-2.5">
                        <span className="text-xs font-mono text-gray-600 dark:text-gray-400 uppercase">
                          {match[1]}
                        </span>
                        <button
                          onClick={() => handleCopy(codeString)}
                          className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
                          aria-label="Copy code"
                        >
                          {copied ? (
                            <>
                              <Check size={14} />
                              <span className="hidden sm:inline">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={14} />
                              <span className="hidden sm:inline">Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="bg-gray-50 dark:bg-gray-900/50 p-3 sm:p-4 overflow-x-auto m-0 text-xs sm:text-sm">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    </div>
                  ) : (
                    <code className="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono" {...props}>
                      {children}
                    </code>
                  );
                },
                a({ node, children, href, ...props }) {
                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline transition-colors"
                      {...props}
                    >
                      {children}
                    </a>
                  );
                },
                p({ children }) {
                  return <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>;
                },
                ul({ children }) {
                  return <ul className="list-disc ml-4 sm:ml-5 mb-2 space-y-1">{children}</ul>;
                },
                ol({ children }) {
                  return <ol className="list-decimal ml-4 sm:ml-5 mb-2 space-y-1">{children}</ol>;
                },
                li({ children }) {
                  return <li className="leading-relaxed">{children}</li>;
                },
                h1({ children }) {
                  return <h1 className="text-xl sm:text-2xl font-bold mt-4 mb-2 first:mt-0">{children}</h1>;
                },
                h2({ children }) {
                  return <h2 className="text-lg sm:text-xl font-bold mt-3 mb-2 first:mt-0">{children}</h2>;
                },
                h3({ children }) {
                  return <h3 className="text-base sm:text-lg font-semibold mt-3 mb-2 first:mt-0">{children}</h3>;
                },
                blockquote({ children }) {
                  return (
                    <blockquote className="border-l-4 border-gray-400 dark:border-gray-600 pl-3 sm:pl-4 italic my-2 text-gray-700 dark:text-gray-300">
                      {children}
                    </blockquote>
                  );
                },
                table({ children }) {
                  return (
                    <div className="overflow-x-auto my-3 sm:my-4">
                      <table className="min-w-full border border-gray-300 dark:border-gray-700 text-xs sm:text-sm">
                        {children}
                      </table>
                    </div>
                  );
                },
                th({ children }) {
                  return (
                    <th className="border border-gray-300 dark:border-gray-700 px-2 py-1.5 sm:px-3 sm:py-2 bg-gray-100 dark:bg-gray-800 font-semibold">
                      {children}
                    </th>
                  );
                },
                td({ children }) {
                  return (
                    <td className="border border-gray-300 dark:border-gray-700 px-2 py-1.5 sm:px-3 sm:py-2">
                      {children}
                    </td>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};
