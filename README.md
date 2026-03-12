# AI Assisted Personal Portfolio – Sathish G

This is a modern, AI-powered personal portfolio website for Sathish G, built using React, Vite, and Tailwind CSS. It features an integrated AI recruiter assistant that can answer questions about Sathish's experience, projects, and skills.

## Features

- **AI Assistant**: Context-aware chatbot powered by OpenAI (GPT-4o mini).
- **Responsive Design**: Mobile-first, modern developer UI.
- **Dark/Light Mode**: User-controlled theme toggle with system preference detection.
- **Interactive Portfolio**: Showcase of projects with tech stack details.
- **Career Timeline**: Detailed experience and education history.
- **Performance Optimized**: Lazy-loaded pages and minimal animations.

## Tech Stack

- **Frontend**: React (Vite), JavaScript, Tailwind CSS v4, Framer Motion.
- **State Management**: Zustand.
- **Routing**: React Router v7.
- **AI**: OpenAI API.
- **Icons**: Lucide React.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (Optional - API key is currently hardcoded in `src/services/aiService.js` for demo purposes):
   - `VITE_OPENAI_API_KEY`: Your OpenAI API key.

### Running Locally

```bash
npm run dev
```

## Deployment

The project is ready to be deployed on platforms like **Vercel** or **Netlify**. Simply connect your GitHub repository to the platform and it will auto-detect the Vite configuration.

## Author

**Sathish G**  
Digital Transformation Engineer  
[sathishganesan.official@gmail.com](mailto:sathishganesan.official@gmail.com)
