# CodeFeast AI Chat Interface

A modern, interactive AI Chat Interface built with React, Tailwind CSS, and Google's Gemini API. This project demonstrates advanced frontend development skills, API integration, and thoughtful UI/UX design.

![AI Chat Interface](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.16-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=flat&logo=vite&logoColor=white)

## 🎯 Overview

This project is a fully functional AI chat assistant interface that allows users to have conversations with Google's Gemini AI. The application features a clean, modern design with support for rich text formatting, code highlighting, and a seamless user experience.

## ✨ Features Implemented

### Core Requirements ✅

- **Interactive Chat Interface**: Distinct visual styling for user and AI messages with professional design
- **AI Integration**: Uses Google Gemini API (gemini-2.5-flash model) for intelligent responses
- **Typing Indicator**: Animated "typing..." indicator while waiting for AI responses
- **Rich Text Formatting**: Full support for:
  - Headings (H1, H2, H3)
  - Bold, italic, and inline code
  - Bullet points and numbered lists
  - Links (open in new tab)
  - Code blocks with syntax highlighting
  - Blockquotes
- **User Input**: Message input with Enter-to-send and Send button support
- **Auto-scroll**: Smooth auto-scrolling to the latest message
- **Local Storage Persistence**: Chat history persists across page refreshes
- **Error Handling**: Clean error messages for API failures

### Bonus Features Implemented 🌟

- ✅ **Copy Code Button**: One-click code copying with visual feedback
- ✅ **Dark/Light Mode Toggle**: Smooth theme switching with Tailwind's dark mode
- ✅ **Editable Last User Message**: Edit and re-fetch AI response functionality
- ✅ **Animated Typing Effect**: Smooth animations for typing indicators
- ✅ **Responsive Design**: Fully responsive on desktop, tablet, and mobile devices
- ✅ **Clear Chat**: Option to clear entire conversation history

## 🛠️ Tech Stack

- **React 19.1.1** - Latest React with modern hooks and features
- **Tailwind CSS 4.1.16** - Utility-first CSS framework for styling
- **Vite 7.1.7** - Fast build tool and development server
- **Google Gemini API** - AI model for generating responses
- **Additional Libraries**:
  - `react-markdown` - Markdown rendering
  - `remark-gfm` - GitHub Flavored Markdown support
  - `rehype-highlight` - Code syntax highlighting
  - `lucide-react` - Modern icon library
  - `axios` - HTTP client for API requests

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rohitchand-01/bnmzcvnsadkj-.git
   cd bnmzcvnsadkj-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

   **To get a Gemini API key:**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy and paste the key into your `.env` file

4. **Run the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```

   The optimized build will be in the `dist` folder.

## 🎨 Usage

1. **Starting a Conversation**: Type your message in the input box at the bottom and press Enter or click the Send button
2. **Theme Toggle**: Click the moon/sun icon in the header to switch between dark and light modes
3. **Edit Message**: Click the "Edit" button below any user message to modify it and get a new AI response
4. **Copy Code**: Click the "Copy" button on any code block to copy it to clipboard
5. **Clear Chat**: Click the trash icon to clear all messages (requires confirmation)

## 📁 Project Structure

```
src/
├── components/
│   ├── chat/
│   │   ├── ChatHeader.jsx       # Header with theme toggle and clear button
│   │   ├── ChatMessages.jsx     # Message list container
│   │   ├── ChatInput.jsx        # User input component
│   │   ├── Message.jsx          # Individual message with formatting
│   │   └── TypingIndicator.jsx  # Animated typing indicator
│   └── ui/
│       └── EmptyState.jsx       # Empty chat placeholder
├── hooks/
│   ├── useChat.js               # Chat logic and state management
│   ├── useLocalStorage.js       # Local storage persistence
│   └── useTheme.js              # Theme switching logic
├── services/
│   └── geminiApi.js             # Gemini API integration
├── utils/
│   └── constants.js             # App constants and configuration
├── App.jsx                      # Main application component
└── main.jsx                     # Application entry point
```

## 🧩 Key Challenges Faced & Solutions

### 1. **Rich Text Formatting**
- **Challenge**: Rendering markdown with proper code highlighting and custom styling
- **Solution**: Implemented `react-markdown` with custom component renderers and `rehype-highlight` for syntax highlighting

### 2. **State Management with Persistence**
- **Challenge**: Maintaining chat history across page refreshes while keeping state reactive
- **Solution**: Created custom `useLocalStorage` hook that syncs React state with localStorage

### 3. **Edit Message Functionality**
- **Challenge**: Allowing users to edit previous messages and re-fetch AI responses
- **Solution**: Implemented message editing with inline textarea and API re-call with updated history

### 4. **Responsive Design**
- **Challenge**: Ensuring consistent UX across different screen sizes
- **Solution**: Used Tailwind's responsive utilities with custom breakpoints and adaptive layouts

### 5. **Theme Switching**
- **Challenge**: Smooth transition between dark and light modes with proper color contrasts
- **Solution**: Leveraged Tailwind's dark mode with custom color scheme and CSS transitions

### 6. **Auto-scroll Behavior**
- **Challenge**: Automatically scrolling to new messages while preserving scroll position when user scrolls up
- **Solution**: Implemented scroll-to-bottom logic that triggers only on new messages

### 7. **Code Copy Functionality**
- **Challenge**: Extracting plain text from nested React components for copying
- **Solution**: Created recursive `getCodeString` function to extract text from component tree

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variable: `VITE_GEMINI_API_KEY`
5. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Visit [Netlify](https://netlify.com)
3. Connect your repository
4. Add build command: `npm run build`
5. Add publish directory: `dist`
6. Add environment variable: `VITE_GEMINI_API_KEY`
7. Deploy!

## 📝 API Information

**API Used**: Google Gemini API (gemini-2.5-flash model)

**Why Gemini?**
- Free API key with generous quota
- Fast response times
- High-quality conversational AI
- Support for various content types

**API Configuration**:
- Temperature: 0.7 (balanced creativity)
- Top K: 40
- Top P: 0.95
- Max Output Tokens: 2048

## 🎓 What I Learned

This project helped me strengthen skills in:
- Advanced React hooks patterns (`useState`, `useEffect`, `useCallback`, `useRef`)
- Custom hook development for reusable logic
- Complex component composition and prop drilling management
- Tailwind CSS utility-first styling and dark mode implementation
- Markdown rendering and syntax highlighting
- API integration with error handling
- Local storage state persistence
- Responsive design principles
- User experience optimization

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created as part of the AI Chat Interface assignment to demonstrate frontend development expertise.

---

**Note**: This is a demonstration project showcasing React, Tailwind CSS, and AI API integration skills. The Gemini API key should be kept secure and not committed to version control.
