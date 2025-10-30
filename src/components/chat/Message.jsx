import React, { useState, useRef, useEffect } from 'react';
import { Copy, Check, Edit2, X, Check as CheckIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';

export const Message = ({ message, onEditMessage }) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);
  const textareaRef = useRef(null);
  
  const isUser = message.role === 'user';

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [isEditing]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(message.content);
  };

  const handleSaveEdit = () => {
    const trimmedContent = editedContent.trim();
    if (trimmedContent && trimmedContent !== message.content && onEditMessage) {
      console.log('Calling onEditMessage with:', message.id, trimmedContent);
      onEditMessage(message.id, trimmedContent);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(message.content);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSaveEdit();
    }
    if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const handleTextareaChange = (e) => {
    setEditedContent(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

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
          <>
            {isEditing ? (
              <div className="space-y-2">
                <textarea
                  ref={textareaRef}
                  value={editedContent}
                  onChange={handleTextareaChange}
                  onKeyDown={handleKeyDown}
                  className="w-full px-3 py-2 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows="1"
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center gap-1 px-2 py-1 text-xs text-white bg-gray-500 hover:bg-gray-600 rounded transition-colors"
                  >
                    <X size={14} />
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="flex items-center gap-1 px-2 py-1 text-xs text-white bg-green-500 hover:bg-green-600 rounded transition-colors"
                  >
                    <CheckIcon size={14} />
                    Save & Regenerate
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-sm sm:text-base whitespace-pre-wrap break-words leading-relaxed">
                  {message.content}
                </p>
                {onEditMessage && (
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-1 mt-2 px-2 py-1 text-xs text-white bg-white/20 hover:bg-white/30 rounded transition-colors"
                  >
                    <Edit2 size={12} />
                    Edit
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none prose-pre:p-0 prose-pre:bg-transparent prose-p:my-2 prose-p:leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  
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
