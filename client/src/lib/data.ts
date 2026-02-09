// Centralized data file for the portfolio
import { Project, Experience, Skill, Service, Review, Education } from "./types";
import { SiOpenai } from "react-icons/si";

export const PERSONAL_INFO = {
  name: "Mohamed Eslam Maklad",
  role: "Full-Stack AI Engineer",
  email: "2ngmo7amed2slam@gmail.com",
  phone: "+20 1050586075",
  location: "Kafr El-Sheikh, Desouk",
  about: `I am a passionate Full-Stack AI Engineer with a strong foundation in building scalable web applications and integrating cutting-edge AI solutions. With expertise ranging from React and Node.js to Python and Machine Learning, I bridge the gap between complex algorithms and intuitive user experiences. I thrive on solving challenging problems and delivering high-impact solutions.`,
  socials: {
    linkedin: "https://www.linkedin.com/in/mohammed-maklad-469557381/",
    github: "https://github.com/Mohamed-Eslam777",
    mostaql: "https://mostaql.com/u/Mohammed_Maklad/reviews/9428484",
  },
  assets: {
    cv: "/assets/Mohamed_CV.pdf",
    profile: "/assets/profile.png",
    aboutImage: "/assets/about-photo.png",
    logo: "/assets/logo.png",
  },
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Pyramid Agent",
    slug: "pyramid-agent",
    description: "Production-grade AI agent system for Sci-Fi series production management. Orchestrates multi-agent workflows, maintains story canon consistency, generates multimedia assets (images, video, audio), and provides RAG-powered knowledge base with 31 story bible files ingested via OpenAI Vector Stores.",
    techTags: ["Python 3.11", "FastAPI", "MongoDB", "OpenAI Assistants v2", "Streamlit", "Docker", "Redis Queue", "Pydantic v2", "Motor", "ElevenLabs", "Prometheus", "Sentry"],
    role: "Lead AI Engineer & System Architect",
    repoLink: null,
    demoLink: "https://mostaql.com/u/Mohammed_Maklad/reviews/9428484",
    screenshots: [
      "/assets/projects/pyramid-agent.png",
    ],
    features: [
      "Structured AI Orchestration: Analyze → Plan → Execute → Report pipeline with OpenAI Assistants v2 function calling",
      "N8N Bi-directional Integration: Dedicated endpoints (/integrations/n8n/*) with webhook tools for external workflow automation",
      "Canon Validation Rules Engine: Automated story consistency checking with rules ingested from bible documents",
      "15-Tab Streamlit Dashboard: Console, Agent Run, Runs, KB, Episodes, Factions, Characters, Tasks, Seasons, Events, Nodes, Versions, Memory, Projects, Canon Index",
      "Long-term Semantic Memory: Vector embeddings (sentence-transformers) stored in MongoDB with cosine similarity search",
      "Multi-Model Generation Pipeline: DALL-E 3, Stable Diffusion, Midjourney (images), RunwayML (video), ElevenLabs (TTS), batch storyboard generator",
      "RAG Knowledge Base: 31 .docx story bibles (narrative/visual) ingested into OpenAI Vector Stores with auto-extraction (DOCX/PDF → text)",
      "RBAC Security & API Keys: Scoped API keys (READ/WRITE permissions), rate limiting (100 req/min), request ID tracking, structured JSON logging",
    ],
    problem: "Sci-Fi series production requires coordinating complex workflows across storytelling (episodes, factions, characters), visual design (storyboards, concept art), and technical production (VFX specs, audio). No unified system existed for knowledge management, canon consistency validation, and automated content generation at scale.",
    solution: "Built an autonomous AI agent system that orchestrates production workflows using a structured analyze-plan-execute-report pipeline. The system maintains story canon consistency via a rules engine, generates multimedia assets (images, video, audio) through integrated tools, provides a RAG-powered knowledge base with 31 ingested story bibles, and offers a centralized 15-tab Streamlit dashboard for complete project management. Architecture: FastAPI backend → Redis Queue (RQ) → Background Worker → OpenAI Assistants v2 with function calling.",
    architecture: ["FastAPI REST API (25+ route modules)", "Redis Queue (RQ) → Worker", "OpenAI Assistants v2 (file_search + function calling)", "MongoDB (Motor async driver, 13 indexed collections)", "OpenAI Vector Stores (RAG)", "Docker Compose (mongo, redis, backend, worker, ui)", "Prometheus + Sentry monitoring"],
  },
  {
    id: 2,
    title: "Nexus AI Platform",
    slug: "nexus-ai",
    description: "Production-ready data annotation platform with AI-powered quality scoring, real-time WebSocket notifications, tiered gamification system, and comprehensive admin tools. Built for the modern AI economy with intelligent task management and performance tracking.",
    techTags: ["React 18.2", "Node.js 22", "Express.js", "MongoDB 8.0", "Mongoose", "Socket.io 4.8", "JWT", "Google Generative AI", "i18next", "Framer Motion", "Chart.js", "bcryptjs"],
    role: "Full Stack Developer & System Architect",
    repoLink: "https://github.com/Mohamed-Eslam777/Nexus-AI-Platform",
    demoLink: "https://nexus-ai-platform-two.vercel.app/",
    screenshots: [
      "/assets/projects/nexus-ai.png",
    ],
    features: [
      "AI Auto-Triage Logic: Automated quality scoring (50-100%) with smart status assignment (auto-approve ≥98%, auto-reject <70%, human review 70-97%), scheduled auto-approval for high-quality pending (≥90%) after 3 days",
      "Socket.io Personalized Rooms: Real-time WebSocket notifications with per-user private rooms, instant toast feedback for submission approval/rejection/payout completion",
      "Tiered Gamification Engine: Four-tier ranking system (Bronze → Silver → Gold → Elite) with automatic tier upgrades based on approval rate, visual tier badges on Profile and Dashboard",
      "JWT Authentication & Role-Based Access: Secure token-based auth, Admin/User/Freelancer role separation, protected routes with middleware, bcryptjs password hashing, forgot/reset password flow",
      "Bulk Review Actions: Admin can approve/reject multiple submissions simultaneously, real-time dashboard with comprehensive statistics, paginated user management with search/filtering",
      "Bilingual i18n Architecture: Full RTL/LTR support (Arabic RTL + English LTR), language context with localStorage persistence, dynamic text direction, professional translations for all admin content",
      "Advanced Analytics Dashboard: Role-based views (Admin: project performance + top 10 freelancers by earnings, Freelancer: personal performance), KPI cards, Chart.js visualizations (bar charts for projects, doughnut charts for submissions)",
      "Task Repetition & Submission Limits: User repetition control (isRepeatable: one-time vs infinitely repeatable), aggregate submission cap (maxTotalSubmissions) with automatic project hiding when limit reached",
    ],
    problem: "Data annotation workflows suffer from bottlenecks in manual review, inconsistent quality control, lack of real-time feedback for contributors, and poor performance management. Traditional platforms don't provide intelligent automation, instant notifications, or motivational systems to maintain contributor engagement and quality standards.",
    solution: "Developed a full-stack platform that automates quality assessment using Google Generative AI (simulates 50-100% scores), provides instant feedback via Socket.io WebSockets with personalized notification rooms, and motivates contributors through a performance-based four-tier gamification system (Bronze to Elite). Admin tools include bulk review operations, real-time dashboards, role-based analytics (Chart.js charts), and comprehensive user management. Architecture: React SPA → Express.js REST API → MongoDB (Mongoose ODM with aggregation pipelines) → Socket.io real-time layer. Node.js event loop handles concurrent requests, JWT tokens secure authentication, and i18next provides full bilingual support (Arabic RTL + English LTR).",
    architecture: ["React 18 SPA (React Router DOM 6.20)", "Express.js 4.19 REST API", "MongoDB 8.0 + Mongoose ODM (aggregation pipelines)", "Socket.io 4.8 (WebSocket layer with personalized rooms)", "JWT 9.0 (token-based auth)", "Google Generative AI 0.24 (quality scoring)", "Node.js 22 event loop (async I/O)", "Jest + Supertest + MongoDB Memory Server (testing)"],
  },
  {
    id: 3,
    title: "Election Campaign Website",
    slug: "election-campaign",
    description: "Modern Arabic (RTL) single-page application with AI-powered brand analysis, dynamic content management, and interactive campaign features. Built with React, TypeScript, and Vite for high performance and professional campaign presence.",
    techTags: ["React 18.3", "TypeScript 5.8", "Vite 7.0", "Tailwind CSS 3.4", "Zustand 4.4", "Framer Motion 11.0", "Vercel AI SDK", "Lucide React", "Headless UI", "Formspree"],
    role: "Frontend Engineer, UI/UX Designer & AI Integration Specialist",
    repoLink: null,
    demoLink: "https://sage-croquembouche-f5ac40.netlify.app/",
    screenshots: [
      "/assets/projects/election-campaign.png",
    ],
    features: [
      "Real-time Video Frame Analysis: AI-powered brand extraction from video frames using Youware AI API (Gemini 2.5 Flash), automatically extracts brand colors, candidate name, and campaign slogan, dynamically updates UI based on analyzed content",
      "Zustand State Management: Lightweight centralized state for brand data (colors, candidate info, slogan), reactive UI updates on AI analysis completion, persisted state across component tree",
      "Formspree Integration: Contact form with form ID (xvglljdq), success/error handling with user feedback toasts, client-side validation before submission",
      "Dark Mode Persistence: Toggle between light and dark themes with smooth transitions, preference saved in localStorage, theme context provider for global state",
      "Dynamic News Ticker & Interactive Carousels: Auto-scrolling news ticker with marquee animation, drag-to-scroll news section carousel, tabbed photo/video gallery with navigation, auto-rotating testimonial carousel",
      "Optimized Vite Build: Fast development server with HMR (Hot Module Replacement), production build with code splitting and asset optimization, TypeScript compilation with strict mode, Tailwind CSS purging for minimal bundle size",
    ],
    problem: "Election campaigns need visually compelling, culturally appropriate websites that can dynamically adapt branding and content while maintaining professional design standards. Traditional static sites lack AI-powered customization, real-time brand analysis, and proper RTL (Right-to-Left) support for Arabic content. Manual branding updates are time-consuming and error-prone.",
    solution: "Built a modern React SPA with AI-powered brand analysis using Youware AI API (extracts colors, candidate name, slogan from video frames), complete RTL support for Arabic content, and smooth animations via Framer Motion. Zustand manages global state for brand data, enabling dynamic UI updates. Interactive features include drag-to-scroll carousels, auto-rotating testimonials, and a dynamic news ticker. Formspree handles form submissions without backend infrastructure. Vite provides lightning-fast development with HMR and optimized production builds (code splitting, asset optimization, CSS purging). Architecture: Vite SPA → Zustand state → Youware AI API (brand analysis) → Formspre integration (contact form).",
    architecture: ["Vite 7.0 (build tool + dev server with HMR)", "Zustand 4.4 (state management)", "Youware AI API (Gemini 2.5 Flash for brand extraction)", "Formspree (form submission service)", "Tailwind CSS 3.4 (utility-first styling with custom Cairo font)", "Framer Motion 11.0 (GPU-accelerated animations)", "TypeScript 5.8 (strict type safety)"],
  },
  {
    id: 4,
    title: "Legal Document Simplifier",
    slug: "legal-document-simplifier",
    description: "AI-powered Flask web application that analyzes and simplifies complex legal documents using Google Gemini 2.5 Flash. Extracts key obligations and risks, compares documents, and provides bilingual output (Arabic/English) with structured JSON responses.",
    techTags: ["Python 3.9", "Flask", "Google Gemini 2.5 Flash", "google-genai SDK", "HTML5", "Vanilla JavaScript ES6+", "AOS Animations", "Font Awesome", "python-dotenv"],
    role: "Full Stack Developer & AI Integration Engineer",
    repoLink: "https://github.com/Mohamed-Eslam777/AI-Legal-Document-Analyzer",
    demoLink: null,
    screenshots: [
      "/assets/projects/legal-simplifier.png",
    ],
    features: [
      "Document Simplification Mode: Analyzes single legal documents to extract top 3 user obligations and top 2 risk clauses favoring service providers/landlords, all output in clear Arabic language",
      "Document Comparison Mode: Compares two legal documents to identify 3 most crucial differences and 1 major missing clause (present in Doc 2 but absent in Doc 1)",
      "Real-time Document Assessment: Automatic document type detection as you type with debounced API calls (1 second delay), validates document legitimacy and categorizes type",
      "Google Gemini 2.5 Flash Integration: AI-powered analysis with structured JSON output validation, schema-based response format ensures consistent parsing",
      "Bilingual Support: Results displayed in Arabic for accessibility, English labels for technical clarity, responsive design with modern gradients and smooth animations",
      "Export/Print Functionality: Save or print analysis reports as PDF for offline reference and documentation",
    ],
    problem: "Legal documents are notoriously complex, filled with jargon that makes it difficult for non-experts to understand their obligations and risks. Comparing multiple contracts manually is time-consuming and error-prone. Users need a fast, accessible way to extract critical information from legal texts and identify differences between documents without legal expertise.",
    solution: "Developed a Flask web application that leverages Google Gemini 2.5 Flash AI to analyze legal documents and extract actionable insights. The system provides two modes: (1) Simplification - extracts key obligations and risks from a single document, and (2) Comparison - identifies crucial differences and missing clauses between two documents. Real-time document assessment with debounced API calls provides instant feedback as users type. All results are presented in clear Arabic language with structured JSON output for consistency. Architecture: Flask backend (routes: /, /simplify, /assess) → Google Gemini API → Frontend (Vanilla JS with AOS animations) → PDF export capability.",
    architecture: ["Flask Python web framework", "Google Gemini 2.5 Flash (structured JSON output)", "google-genai SDK", "Vanilla JavaScript ES6+ (no framework)", "Text preprocessing pipeline (whitespace normalization)", "Debounced real-time assessment (1s delay)", "AOS 2.3.1 (scroll animations)", "python-dotenv (environment management)"],
  },
  {
    id: 5,
    title: "Interactive Data Dashboard",
    slug: "interactive-data-dashboard",
    description: "Modern client-side React 19 application for visualizing CSV data through interactive bar and pie charts. Features PapaParse CSV parsing, Chart.js rendering, real-time dynamic column selection, custom cursor interface, and smooth AOS animations.",
    techTags: ["React 19.2", "React DOM 19.2", "PapaParse 5.5.3", "Chart.js 4.5.1", "react-chartjs-2", "React Testing Library", "AOS Animations", "CSS3", "Create React App", "gh-pages"],
    role: "Frontend Developer & Data Visualization Specialist",
    repoLink: "https://github.com/Mohamed-Eslam777/data-dashboard",
    demoLink: "https://Mohamed-Eslam777.github.io/data-dashboard",
    screenshots: [
      "/assets/projects/data-dashboard.png",
    ],
    features: [
      "Client-Side CSV Processing: All data processing happens in the browser using PapaParse 5.5.3 (no backend required), supports comma-separated files with automatic header detection and empty line skipping",
      "Real-Time Dynamic Visualization: Instant chart updates when column selections change, dual visualization (bar + pie charts simultaneously), aggregated data grouping by dimension with measure summation",
      "Interactive Column Selection: Dropdown menus for dimension (categorical) and measure (numerical) selection, dynamic data aggregation with Chart.js 4.5.1 rendering engine, react-chartjs-2 5.3.1 wrapper for React integration",
      "Custom Cursor Interface: Unique interactive cursor experience with custom CSS animations, smooth transitions and hover effects throughout the UI",
      "Smooth Animations & Responsive Design: AOS (Animate On Scroll) library for elegant transitions, fully responsive layout for desktop and mobile, rotating animated logo component",
      "GitHub Pages Deployment: Configured with gh-pages 6.3.0 for automated deployment, PWA-ready with manifest.json and service worker support, offline-capable (no API calls)",
    ],
    problem: "Data analysts and business users often need quick, visual insights from CSV files without setting up complex backend infrastructure or installing heavy desktop software. Existing solutions either require cloud uploads (privacy concerns), lack real-time interactivity, or have steep learning curves. Users need an instant, browser-based tool for CSV visualization that works offline and provides dual chart views.",
    solution: "Built a fully client-side React 19 application that parses and visualizes CSV data entirely in the browser using PapaParse. Users upload CSV files, dynamically select dimension (categorical) and measure (numerical) columns via dropdown menus, and instantly see aggregated data in both bar and pie charts (Chart.js). All processing is local—no backend, no API calls, fully functional offline. Custom cursor interface and AOS animations provide premium UX. Architecture: React 19 SPA → PapaParse CSV parser → Data aggregation (reduce) → Chart.js rendering (Bar + Pie) → GitHub Pages deployment. Testing suite includes React Testing Library, Jest DOM matchers, and user-event simulation.",
    architecture: ["React 19.2 (functional components + hooks)", "PapaParse 5.5.3 (CSV parsing engine)", "Chart.js 4.5.1 + react-chartjs-2 5.3.1 (visualization)", "Create React App 5.0.1 (build tooling)", "gh-pages 6.3.0 (deployment)", "React Testing Library 16.3.0 + Jest", "AOS (Animate On Scroll) via CDN", "Custom cursor.js (mousemove tracking)"],
  },
];

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    title: "AI Trainer & Data Annotation Specialist (Freelance)",
    company: "DataAnnotation.tech · Outlier · OneForma",
    period: "Mar 2024 - Present",
    description: "Collaborating with top-tier AI labs (via DataAnnotation & Outlier) to enhance LLM reasoning and code generation capabilities through RLHF and rigorous technical auditing. Evaluating model outputs for hallucinations, bias, and logic inconsistencies to improve AI response quality.",
  },
  {
    id: 2,
    title: "Freelance Full-Stack AI Engineer",
    company: "Self-Employed",
    period: "Jan 2024 - Present",
    description: "Architecting and deploying custom AI agents and scalable web applications. Successfully delivered high-impact projects on platforms like Mostaql. Key Achievement: Built 'Pyramid Agent', a specialized multi-agent system analyzing 30+ script documents to automate sci-fi series production planning.",
  },
];

export const SKILLS: Skill[] = [
  {
    id: 1,
    category: "Programming Languages",
    items: ["Python", "JavaScript", "TypeScript", "Java", "C#", "PHP", "SQL", "C++"],
  },
  {
    id: 2,
    category: "AI & Data",
    items: ["OpenAI Assistants v2", "Google Gemini 2.5 Flash", "RAG Systems", "LangChain", "Vector Embeddings", "Computer Vision", "NLP", "Pandas", "NumPy"],
  },
  {
    id: 3,
    category: "Frontend",
    items: ["React 19", "Tailwind CSS", "Framer Motion", "Next.js", "Vite", "TypeScript 5.8", "Three.js", "HTML5/CSS3"],
  },
  {
    id: 4,
    category: "Backend",
    items: ["Node.js", "FastAPI", "Flask", "Express.js", "Django", ".NET Core", "WebSockets"],
  },
  {
    id: 5,
    category: "Database & Storage",
    items: ["MongoDB", "PostgreSQL", "Redis", "Vector Databases (Pinecone/Chroma)", "Supabase"],
  },
  {
    id: 6,
    category: "DevOps & Tools",
    items: ["Kubernetes", "Docker", "Git", "GitHub", "Vercel", "N8N Automation", "Linux", "Postman", "CI/CD"],
  },
];

// Skills with icons for the marquee component
export const MARQUEE_SKILLS = [
  { name: "React", category: "Frontend", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" },
  { name: "TypeScript", category: "Frontend", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" },
  { name: "Tailwind CSS", category: "Frontend", icon: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" },
  { name: "Framer Motion", category: "Frontend", icon: "https://www.vectorlogo.zone/logos/framer/framer-icon.svg" },
  { name: "Python", category: "AI & Backend", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
  { name: "Node.js", category: "AI & Backend", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" },
  { name: "FastAPI", category: "AI & Backend", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg" },
  { name: "OpenAI", category: "AI & Backend", icon: SiOpenai },
  { name: "PostgreSQL", category: "Database & DevOps", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB", category: "Database & DevOps", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" },
  { name: "Docker", category: "Database & DevOps", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" },
  { name: "AWS", category: "Database & DevOps", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Git", category: "Database & DevOps", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg" },
  { name: "Redis", category: "Database & DevOps", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original.svg" },
];

export const SERVICES: Service[] = [
  {
    id: 1,
    title: "Custom AI Workforce & Agents",
    description: "Don't just automate tasks; create digital employees. I build intelligent AI Agents capable of handling customer support, data entry, and complex reasoning using OpenAI & Gemini, reducing your operational costs by up to 60%.",
  },
  {
    id: 2,
    title: "Scalable SaaS Architecture",
    description: "Transform your idea into a market-ready product. Specializing in high-performance React/Next.js applications with secure authentication, subscription payments (Stripe/LemonSqueezy), and distinct Admin/User dashboards.",
  },
  {
    id: 3,
    title: "Interactive Business Dashboards",
    description: "Turn raw data into actionable insights. I design intuitive, real-time dashboards using Chart.js and React to help you track KPIs, visualize trends, and make informed decisions faster.",
  },
  {
    id: 4,
    title: "Enterprise AI Integration",
    description: "Upgrade your existing software with Intelligence. I integrate LLMs (ChatGPT/Gemini) into your legacy systems to analyze documents, summarize meetings, or generate content dynamically via secure API endpoints.",
  },
];

export const REVIEWS: Review[] = [
  {
    id: 1,
    name: "John D.",
    role: "Startup Founder",
    text: "Mohamed is an exceptional engineer. He delivered our MVP ahead of schedule and the AI integration works flawlessly.",
  },
  {
    id: 2,
    name: "Sarah M.",
    role: "Project Manager",
    text: "Great communication and technical skills. He solved complex backend issues that our previous team couldn't handle.",
  },
];

export const EDUCATION: Education[] = [
  {
    id: 1,
    institution: "Delta University for Science and Technology",
    degree: "Bachelor's in Artificial Intelligence",
    year: "Expected Graduation 2028",
    description: "Focusing on Machine Learning, Data Science, and Software Engineering principles.",
  },
];
