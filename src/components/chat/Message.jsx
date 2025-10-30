import React, { useState, useRef, useEffect } from 'react'
import { Copy, Check, Edit2, X, Check as CheckIcon } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'

export const Message = ({ message, onEditMessage, isDarkMode }) => {
  const [copied, setCopied] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(message.content)
  const textareaRef = useRef(null)

  const isUser = message.role === 'user'

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [isEditing])

  const handleCopy = text => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditedContent(message.content)
  }

  const handleSaveEdit = () => {
    const trimmedContent = editedContent.trim()
    if (trimmedContent && trimmedContent !== message.content && onEditMessage) {
      onEditMessage(message.id, trimmedContent)
    }
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditedContent(message.content)
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSaveEdit()
    }
    if (e.key === 'Escape') {
      handleCancelEdit()
    }
  }

  const handleTextareaChange = e => {
    setEditedContent(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px'
  }

  const getCodeString = children => {
    if (typeof children === 'string') {
      return children
    }
    if (Array.isArray(children)) {
      return children
        .map(child => {
          if (typeof child === 'string') return child
          if (child?.props?.children) return getCodeString(child.props.children)
          return ''
        })
        .join('')
    }
    if (children?.props?.children) {
      return getCodeString(children.props.children)
    }
    return String(children)
  }

  return (
    <div className='mb-4 sm:mb-5 animate-fadeIn'>
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`max-w-[85%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-[70%] rounded-2xl px-4 py-3 sm:px-5 sm:py-4 shadow-sm ${
            isUser
              ? isDarkMode
                ? 'bg-gray-100 text-gray-700 border border-gray-600'
                : 'bg-gray-100 text-gray-900 border border-gray-200'
              : 'text-white'
          }`}
          style={
            !isUser
              ? {
                  background:
                    'linear-gradient(112deg, rgba(43, 165, 255, 0.08) 9.14%, rgba(6, 142, 241, 0.08) 48.42%, rgba(37, 158, 181, 0.08) 76.55%, rgba(59, 169, 140, 0.08) 119.54%)'
                }
              : {}
          }
        >
          {isUser ? (
            <>
              {isEditing ? (
                <div className='space-y-2'>
                  <textarea
                    ref={textareaRef}
                    value={editedContent}
                    onChange={handleTextareaChange}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-3 py-2 text-sm sm:text-base border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      isDarkMode
                        ? 'bg-gray-600 text-gray-100 border-gray-500'
                        : 'bg-white text-gray-900 border-gray-300'
                    }`}
                    rows='1'
                    style={{
                      minHeight: '44px',
                      maxHeight: '200px',
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none'
                    }}
                  />
                  <div className='flex items-center justify-end gap-2'>
                    <button
                      onClick={handleCancelEdit}
                      className={`flex items-center gap-1 px-3 py-1.5 text-xs text-white rounded-lg transition-colors ${
                        isDarkMode
                          ? 'bg-gray-500 hover:bg-gray-600'
                          : 'bg-gray-600 hover:bg-gray-700'
                      }`}
                    >
                      <X size={14} />
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className='flex items-center gap-1 px-3 py-1.5 text-xs text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors'
                    >
                      <CheckIcon size={14} />
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p className='text-sm sm:text-base whitespace-pre-wrap break-words leading-relaxed'>
                  {message.content}
                </p>
              )}
            </>
          ) : (
            <div
              className={`prose prose-sm sm:prose-base max-w-none prose-pre:p-0 prose-pre:bg-transparent prose-p:my-2 prose-p:leading-relaxed ${
                isDarkMode ? 'prose-invert' : ''
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
                components={{
                  code ({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '')
                    const codeString = getCodeString(children).replace(
                      /\n$/,
                      ''
                    )
                    return !inline && match ? (
                      <div
                        className={`my-3 sm:my-4 rounded-lg overflow-hidden border shadow-sm ${
                          isDarkMode ? 'border-gray-600' : 'border-gray-300'
                        }`}
                      >
                        <div
                          className={`flex items-center justify-between px-3 py-2 sm:px-4 sm:py-2.5 ${
                            isDarkMode ? 'bg-gray-900' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`text-xs font-mono uppercase font-semibold ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-700'
                            }`}
                          >
                            {match[1]}
                          </span>
                          <button
                            onClick={() => handleCopy(codeString)}
                            className={`flex items-center gap-1.5 text-xs rounded px-2 py-1 transition-colors ${
                              isDarkMode
                                ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-300'
                            }`}
                            aria-label='Copy code'
                          >
                            {copied ? (
                              <>
                                <Check size={14} />
                                <span className='hidden sm:inline'>
                                  Copied!
                                </span>
                              </>
                            ) : (
                              <>
                                <Copy size={14} />
                                <span className='hidden sm:inline'>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre
                          className={`p-3 sm:p-4 overflow-x-auto m-0 text-xs sm:text-sm ${
                            isDarkMode
                              ? 'bg-gray-900/50 text-gray-100'
                              : 'bg-gray-50 text-gray-900'
                          }`}
                        >
                          <code className={className} {...props}>
                            {children}
                          </code>
                        </pre>
                      </div>
                    ) : (
                      <code
                        className={`px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono ${
                          isDarkMode
                            ? 'bg-gray-700 text-gray-100'
                            : 'bg-gray-200 text-gray-900'
                        }`}
                        {...props}
                      >
                        {children}
                      </code>
                    )
                  },
                  a ({ children, href, ...props }) {
                    return (
                      <a
                        href={href}
                        target='_blank'
                        rel='noopener noreferrer'
                        className={`underline transition-colors ${
                          isDarkMode
                            ? 'text-blue-400 hover:text-blue-300'
                            : 'text-blue-600 hover:text-blue-500'
                        }`}
                        {...props}
                      >
                        {children}
                      </a>
                    )
                  },
                  p ({ children }) {
                    return (
                      <p
                        className={`mb-2 last:mb-0 leading-relaxed ${
                          isDarkMode ? 'text-gray-100' : 'text-gray-900'
                        }`}
                      >
                        {children}
                      </p>
                    )
                  },
                  ul ({ children }) {
                    return (
                      <ul
                        className={`list-disc ml-4 sm:ml-5 mb-2 space-y-1 ${
                          isDarkMode ? 'text-gray-100' : 'text-gray-900'
                        }`}
                      >
                        {children}
                      </ul>
                    )
                  },
                  ol ({ children }) {
                    return (
                      <ol
                        className={`list-decimal ml-4 sm:ml-5 mb-2 space-y-1 ${
                          isDarkMode ? 'text-gray-100' : 'text-gray-900'
                        }`}
                      >
                        {children}
                      </ol>
                    )
                  },
                  li ({ children }) {
                    return (
                      <li
                        className={`${
                          isDarkMode ? 'text-gray-100' : 'text-gray-900'
                        }`}
                      >
                        {children}
                      </li>
                    )
                  },
                  h1 ({ children }) {
                    return (
                      <h1
                        className={`text-xl sm:text-2xl font-bold mt-4 mb-2 first:mt-0 ${
                          isDarkMode ? 'text-gray-100' : 'text-gray-900'
                        }`}
                      >
                        {children}
                      </h1>
                    )
                  },
                  h2 ({ children }) {
                    return (
                      <h2
                        className={`text-lg sm:text-xl font-bold mt-3 mb-2 first:mt-0 ${
                          isDarkMode ? 'text-gray-100' : 'text-gray-900'
                        }`}
                      >
                        {children}
                      </h2>
                    )
                  },
                  h3 ({ children }) {
                    return (
                      <h3
                        className={`text-base sm:text-lg font-semibold mt-3 mb-2 first:mt-0 ${
                          isDarkMode ? 'text-gray-100' : 'text-gray-900'
                        }`}
                      >
                        {children}
                      </h3>
                    )
                  },
                  blockquote ({ children }) {
                    return (
                      <blockquote
                        className={`border-l-4 pl-3 sm:pl-4 italic my-2 ${
                          isDarkMode
                            ? 'border-gray-600 text-gray-300'
                            : 'border-gray-400 text-gray-700'
                        }`}
                      >
                        {children}
                      </blockquote>
                    )
                  }
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>

      {isUser && !isEditing && onEditMessage && (
        <div className='flex justify-end mt-2'>
          <button
            onClick={handleEdit}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg transition-colors border ${
              isDarkMode
                ? 'text-gray-400 bg-gray-800 border-gray-700 hover:bg-gray-700 hover:text-gray-200'
                : 'text-gray-600 bg-gray-100 border-gray-200 hover:bg-gray-200 hover:text-blue-600'
            }`}
          >
            <Edit2 size={12} />
            Edit
          </button>
        </div>
      )}
    </div>
  )
}
