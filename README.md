# Notion-Style Note Editor with AI Chat

A modern note-taking application built with Next.js, TypeScript, and Tailwind CSS, featuring a TipTap-based rich text editor and an embedded AI chat interface. This project implements a Notion-like interface with ChatGPT-style AI assistance for each note.

## 🚀 Features

### Notes System

- Rich text editing with TipTap v2
- Support for multiple note formats:
  - Text formatting
  - Headings (H1, H2, H3)
  - Bullet lists
  - Numbered lists
- Sidebar navigation for easy note switching
- Title and content management for each note

### AI Chat Integration

- Floating AI chat button for each note
- ChatGPT-style interface embedded within notes
- Note-specific chat history
- Real-time chat interaction with mock API responses

### Technical Features

- Modern React patterns with TypeScript
- Responsive design with Tailwind CSS
- State management using React hooks
- Clean and modular component architecture

## 🛠️ Tech Stack

- **Frontend Framework:** Next.js (Latest)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Text Editor:** TipTap v2
- **State Management:** React Hooks

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
├── app/                    # Next.js app directory
│   ├── (main)/            # Main application routes
│   ├── (public)/          # Public routes
│   └── api/               # API routes
├── components/            # React components
│   ├── ai-chat/          # AI chat interface components
│   ├── ui/               # UI components
│   └── providers/        # Context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
└── public/              # Static assets
```

## 🎯 Key Components

- **Editor**: TipTap-based rich text editor with formatting options
- **AI Chat**: Floating chat interface with mock AI responses
- **Sidebar**: Navigation and note management
- **Toolbar**: Text formatting and styling controls

## 🔧 Configuration

The project uses various configuration files:

- `next.config.js` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Based on the TipTap editor template
- Inspired by Notion's interface design
- Built with modern web technologies

---

Made with ❤️ using Next.js, TypeScript, and Tailwind CSS
