/**
 * Comprehensive AI Assistant Knowledge Base for Mohamed Eslam Maklad
 * Merges personal data (Arabic) with portfolio content from data.ts
 * Used to generate RAG context for the AI chat assistant
 */

export interface AssistantProfile {
    identity: {
        nameArabic: string;
        nameEnglish: string;
        age: number;
        currentLocation: string;
        originLocation: string;
        role: string;
    };
    contact: {
        emailPrimary: string;
        whatsapp: string;
        phone: string;
        linkedin: string;
        github: string;
        facebook: string;
        instagram: string;
        mostaql: string;
    };
    education: {
        institution: string;
        institutionArabic: string;
        degree: string;
        field: string;
        expectedGraduation: string;
        focusAreas: string[];
    };
    experience: Array<{
        title: string;
        company: string;
        period: string;
        keyOutcomes: string[];
    }>;
    skills: {
        languages: string[];
        spokenLanguages: string[];
        ai: string[];
        frontend: string[];
        backend: string[];
        databases: string[];
        cloudDevOps: string[];
    };
    projects: Array<{
        name: string;
        problem: string;
        solution: string;
        techStack: string[];
        outcome: string;
        links?: {
            demo?: string;
            repo?: string;
        };
    }>;
    services: Array<{
        title: string;
        summary: string;
    }>;
    rules: {
        grounding: string[];
        language: string[];
        formatting: string[];
        contactPolicy: string[];
    };
}

export const ASSISTANT_PROFILE: AssistantProfile = {
    identity: {
        nameArabic: "محمد إسلام مقلد",
        nameEnglish: "Mohamed Eslam Maklad",
        age: 20,
        currentLocation: "Gamasa (for studies)",
        originLocation: "Desouk, Kafr El-Sheikh",
        role: "Full-Stack AI Engineer",
    },

    contact: {
        emailPrimary: "2ngmo7amed2slam@gmail.com",
        whatsapp: "+20 1050586075",
        phone: "+20 1055162964",
        linkedin: "https://www.linkedin.com/in/mohammed-maklad-469557381/",
        github: "https://github.com/Mohamed-Eslam777",
        facebook: "https://www.facebook.com/mohamed.makled.9231",
        instagram: "https://www.instagram.com/mv7amed_maklad",
        mostaql: "https://mostaql.com/u/Mohammed_Maklad/reviews/9428484",
    },

    education: {
        institution: "Delta University for Science and Technology",
        institutionArabic: "جامعة الدلتا للعلوم والتكنولوجيا",
        degree: "Bachelor of Science in Artificial Intelligence",
        field: "Machine Learning, Data Science, Software Engineering",
        expectedGraduation: "2028",
        focusAreas: ["Machine Learning", "Data Science", "Software Engineering"],
    },

    experience: [
        {
            title: "AI Trainer & Data Annotation Specialist",
            company: "DataAnnotation.tech · Outlier · OneForma",
            period: "Mar 2024 - Present (2 years experience)",
            keyOutcomes: [
                "Enhanced LLM reasoning via RLHF",
                "Reduced code generation hallucinations through rigorous auditing",
                "Evaluated model outputs for bias and logic inconsistencies",
            ],
        },
        {
            title: "Freelance Full-Stack AI Engineer",
            company: "Self-Employed",
            period: "Jan 2024 - Present (2 years experience)",
            keyOutcomes: [
                "Designed and deployed autonomous AI agents",
                "Built scalable SaaS platforms with Socket.io real-time features",
                "Delivered 'Pyramid Agent' multi-agent system analyzing 31 story documents",
            ],
        },
    ],

    skills: {
        languages: ["Python", "TypeScript", "JavaScript ES6+", "SQL"],
        spokenLanguages: ["Arabic (Native)", "English (Professional)"],
        ai: [
            "OpenAI Assistants v2",
            "Google Gemini 2.5 Flash",
            "RAG Systems",
            "LangChain",
            "Vector Embeddings",
            "Prompt Engineering",
            "RLHF",
            "NLP",
            "Computer Vision",
        ],
        frontend: [
            "React 19",
            "React 18",
            "TypeScript 5.8",
            "Tailwind CSS",
            "Framer Motion",
            "Vite 7.0",
            "Zustand",
            "Chart.js",
            "Socket.io Client",
        ],
        backend: [
            "Node.js 22",
            "FastAPI",
            "Flask",
            "Express.js",
            "Python 3.11",
            "Socket.io 4.8",
            "JWT Auth",
            "REST API Design",
        ],
        databases: ["MongoDB 8.0", "PostgreSQL", "Redis Queue", "OpenAI Vector Stores"],
        cloudDevOps: [
            "Docker Compose",
            "N8N Automation",
            "Prometheus",
            "Sentry",
            "Vercel",
            "GitHub Pages",
        ],
    },

    projects: [
        {
            name: "Pyramid Agent",
            problem: "Sci-Fi production needed unified system for story consistency + multimedia generation",
            solution: "Multi-agent orchestration with RAG (31 bible docs), automated canon validation, image/video/audio generation pipeline",
            techStack: ["FastAPI", "MongoDB", "OpenAI Assistants v2", "Redis Queue", "Streamlit", "Docker"],
            outcome: "15-tab dashboard managing complete production workflow with automated content generation",
            links: {
                demo: "https://mostaql.com/u/Mohammed_Maklad/reviews/9428484",
            },
        },
        {
            name: "Nexus AI Platform",
            problem: "Data annotation platforms lacked intelligent automation + real-time feedback + gamification",
            solution: "AI-powered quality scoring (Gemini), Socket.io instant notifications, 4-tier gamification system (Bronze→Elite)",
            techStack: ["React 18", "Node.js 22", "MongoDB 8.0", "Socket.io 4.8", "Google Gemini", "JWT"],
            outcome: "Production SaaS with bulk admin actions, real-time charts, bilingual RTL/LTR support",
            links: {
                demo: "https://nexus-ai-platform-two.vercel.app/",
                repo: "https://github.com/Mohamed-Eslam777/Nexus-AI-Platform",
            },
        },
        {
            name: "Election Campaign Website",
            problem: "Campaign sites needed AI brand extraction + Arabic RTL support + dynamic customization",
            solution: "AI-powered video frame analysis (Gemini) extracts brand colors/slogan, Zustand state management, complete RTL design",
            techStack: ["React 18", "TypeScript 5.8", "Vite 7.0", "Tailwind CSS", "Gemini 2.5 Flash"],
            outcome: "Modern Arabic-first SPA with AI-driven branding and smooth animations",
            links: {
                demo: "https://sage-croquembouche-f5ac40.netlify.app/",
            },
        },
        {
            name: "Legal Document Simplifier",
            problem: "Non-experts struggle to understand legal obligations and risks in contracts",
            solution: "Gemini 2.5 Flash extracts top obligations + risks, compares documents, bilingual output (Arabic/English)",
            techStack: ["Python", "Flask", "Google Gemini 2.5 Flash"],
            outcome: "Fast web app with real-time assessment + PDF export capability",
            links: {
                repo: "https://github.com/Mohamed-Eslam777/AI-Legal-Document-Analyzer",
            },
        },
        {
            name: "Interactive Data Dashboard",
            problem: "Analysts needed browser-based CSV visualization without backend/cloud uploads",
            solution: "Client-side React app with PapaParse CSV parsing + Chart.js (bar/pie) + offline-capable",
            techStack: ["React 19", "PapaParse", "Chart.js", "GitHub Pages"],
            outcome: "Fully offline tool with dynamic column selection + custom cursor UI",
            links: {
                demo: "https://Mohamed-Eslam777.github.io/data-dashboard",
                repo: "https://github.com/Mohamed-Eslam777/data-dashboard",
            },
        },
    ],

    services: [
        {
            title: "Autonomous AI Agents",
            summary: "Multi-agent systems with RAG, vector DBs, OpenAI Assistants for content generation + knowledge mgmt",
        },
        {
            title: "Full-Stack SaaS Development",
            summary: "React/Node.js platforms with Socket.io real-time, RBAC, admin dashboards, MongoDB, JWT",
        },
        {
            title: "Interactive Data Visualization",
            summary: "Custom Chart.js dashboards, CSV parsing, real-time analytics with responsive design",
        },
        {
            title: "AI Integration & Automation",
            summary: "Integrate Google Gemini, OpenAI into workflows: legal analysis, brand extraction, bilingual support",
        },
    ],

    rules: {
        grounding: [
            "ONLY use facts from this knowledge base (identity, education, experience, skills, projects, services)",
            "Do NOT invent tools, versions, projects, clients, or experiences not explicitly listed",
            "If information is missing, say: 'I don't have that specific detail in Mohamed's portfolio data. What I can share is...' then provide related info",
            "Never claim skills or tools Mohamed hasn't used (check skills lists carefully)",
            "Project tech stacks are definitive - don't add unlisted technologies",
        ],
        language: [
            "If user writes in Arabic → respond in Egyptian Arabic (Masri): 'أهلاً بيك', 'تمام', 'حابب أعرف', 'ممكن', 'عايز', 'ده', etc.",
            "Masri responses should be professional but conversational (not overly formal MSA)",
            "If user writes in English → respond in English",
            "Keep the same language as user throughout conversation unless they switch",
            "Bilingual users: match their language preference",
        ],
        formatting: [
            "Default: concise answers (~120 words max unless user asks for details)",
            "Use headings (##) and bullet points (-) for lists",
            "Structure: brief intro + organized sections + optional short CTA",
            "No emojis unless user uses them first",
            "For skills/projects questions: use categorized bullets",
            "For contact questions: follow contact policy (see below)",
        ],
        contactPolicy: [
            "Default contact: Email (2ngmo7amed2slam@gmail.com) + LinkedIn + GitHub",
            "ONLY share phone (+20 1055162964) or WhatsApp (+20 1050586075) if user EXPLICITLY asks for phone/WhatsApp number",
            "If user says 'contact' or 'reach out': provide email + LinkedIn + GitHub",
            "If user says 'phone' or 'call' or 'WhatsApp': then share WhatsApp (+20 1050586075)",
            "End with CTA only when relevant: 'Feel free to reach out via email at 2ngmo7amed2slam@gmail.com if you're interested in collaborating!'",
        ],
    },
};
