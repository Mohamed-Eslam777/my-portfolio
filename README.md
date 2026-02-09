# Mohamed Eslam | Full-Stack AI Engineer Portfolio

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-Assistants_v2-412991?style=for-the-badge&logo=openai&logoColor=white)

A high-performance, production-ready portfolio showcasing AI engineering expertise with interactive animations, multi-agent system projects, and seamless user experience.

## 🚀 Features

- **Modern UI/UX**: Smooth page transitions with Framer Motion animations
- **AI Project Showcase**: Detailed project pages featuring Pyramid Agent, Nexus AI, and more
- **Contact Integration**: EmailJS-powered contact form with real-time validation
- **PDF Resume Viewer**: In-browser CV preview with download functionality
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Proper meta tags and semantic HTML for search engines
- **Dark Mode Support**: Beautiful gold and slate color scheme

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - Modern component-based architecture
- **TypeScript 5.8** - Type-safe development
- **Vite 7.0** - Lightning-fast build tool and dev server
- **Tailwind CSS 3.4** - Utility-first styling
- **Framer Motion 11.0** - Smooth animations and transitions
- **Wouter** - Lightweight routing

### Integrations
- **EmailJS** - Contact form email delivery
- **Lucide React** - Beautiful icon system
- **React Query** - Server state management
- **Shadcn/ui** - Accessible component library

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git

# Navigate to project directory
cd Portfolio-Builder

# Install dependencies
npm install
```

## 🔧 Development

### Local Development Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   # Copy the template
   cp .env.example .env.local
   
   # Edit .env.local and add your Gemini API key
   # Get your key from: https://aistudio.google.com/app/apikey
   ```

3. **Start development servers**:
   ```bash
   # Runs both Vite (frontend) and Express API server concurrently
   npm run dev
   ```

   This will start:
   - **Frontend**: http://localhost:5173 (Vite dev server)
   - **API**: http://localhost:3001 (Express server, proxied to `/api`)

   > **Note**: The local dev server uses Express + tsx (TypeScript execution). No authentication required for local development.

4. **Alternative: Run servers separately**:
   ```bash
   # Terminal 1: Frontend only
   npm run dev:web
   
   # Terminal 2: API server only
   npm run dev:api
   ```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
Portfolio-Builder/
├── client/
│   ├── public/
│   │   └── assets/          # Static assets (CV, images, logo)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── lib/             # Data, types, utilities
│   │   ├── pages/           # Page components
│   │   ├── index.css        # Global styles
│   │   └── main.tsx         # App entry point
│   └── index.html
├── dist/                    # Production build output
└── vite.config.ts          # Vite configuration
```

## 🎨 Key Projects Featured

1. **Pyramid Agent** - Multi-agent AI system for sci-fi series production
2. **Nexus AI Platform** - Data annotation platform with AI quality scoring
3. **Election Campaign Website** - AI-powered brand analysis and RTL support
4. **Legal Document Simplifier** - Google Gemini integration for legal analysis
5. **Interactive Data Dashboard** - CSV visualization with Chart.js

## 🌐 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel
```

### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy to Netlify
netlify deploy --prod
```

### Manual Deployment
1. Run `npm run build`
2. Upload the `dist` folder to your hosting provider
3. Configure server to serve `index.html` for all routes

## 📝 Environment Variables

### Local Development

Create a `.env.local` file in the root directory (Git-ignored, never commit):

```env
# Gemini API Key (REQUIRED for AI Chat Widget)
# Get your key from: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_api_key_here

# EmailJS Configuration (optional - already configured)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Vercel Deployment

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard) → Select Project → Settings → Environment Variables
2. Add the following variable:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
   - **Target**: Production, Preview, Development
3. Redeploy your application for changes to take effect

### Testing the AI Chat

1. **Local**: Run `npm run dev`, open `http://localhost:5173`, click the floating gold chat button, and ask: "What projects has Mohamed worked on?"
2. **Production**: After deploying with environment variables configured, test the same way on your live site
3. **Troubleshooting**: If chat doesn't work, check:
   - Browser DevTools → Console for errors
   - Vercel Dashboard → Functions → Check `/api/chat` logs
   - Ensure `GEMINI_API_KEY` is set in Vercel environment variables


## 🔐 Security

- ✅ `.env` files excluded from git
- ✅ No sensitive data in client-side code
- ✅ CORS properly configured
- ✅ Content Security Policy friendly

## 📊 Build Optimization

- **Bundle Size**: ~436KB (gzipped: ~141KB)
- **Build Time**: ~5.5 seconds
- **Code Splitting**: Automatic chunk optimization
- **Tree Shaking**: Dead code elimination enabled
- **Minification**: Terser for JavaScript, cssnano for CSS

## 🤝 Contributing

This is a personal portfolio project, but feedback and suggestions are welcome!

## 📄 License

© 2026 Mohamed Eslam Maklad. All rights reserved.

## 📞 Contact

- **Email**: 2ngmo7amed2slam@gmail.com
- **LinkedIn**: [Mohammed Maklad](https://www.linkedin.com/in/mohammed-maklad-469557381/)
- **GitHub**: [@mohamed-eslam](https://github.com/mohamed-eslam)
- **Mostaql**: [Portfolio Reviews](https://mostaql.com/u/Mohammed_Maklad/reviews/9428484)

---

**Built with ❤️ using React, TypeScript, and cutting-edge AI technologies**
