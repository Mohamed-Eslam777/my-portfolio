/**
 * CV Knowledge for AI Assistant
 * TODO: Paste actual CV text content here for richer context
 */

/**
 * Full CV text (placeholder - update with actual content)
 * Keep this concise to avoid token limits in prompts
 */
export const CV_TEXT = `
TODO: Paste CV text content here.

For now, the assistant uses the comprehensive knowledge from assistantProfile.ts which includes:
- Education: Delta University, BSc in Artificial Intelligence (Expected 2028)
- Experience: 2 years in AI Training/Annotation + Full-Stack AI Engineering
- Skills: Python, TypeScript, React, FastAPI, MongoDB, OpenAI, Gemini, RAG systems
- Projects: Pyramid Agent, Nexus AI, Election Campaign, Legal Simplifier, Data Dashboard
- Services: AI Agents, Full-Stack SaaS, Data Visualization, AI Integration

Once CV content is available, paste it here to enrich assistant responses.
`;

/**
 * High-level CV summary hints for compact prompt contexts
 * Use these when full CV_TEXT would exceed token limits
 */
export const CV_SUMMARY_HINTS = [
    "20-year-old Full-Stack AI Engineer based in Egypt (Gamasa/Desouk)",
    "Delta University BSc in AI, graduating 2028",
    "2 years experience: AI Training (DataAnnotation, Outlier), Full-Stack Development",
    "Specializes in: Autonomous AI agents, RAG systems, SaaS platforms, real-time features",
    "Key achievements: Pyramid Agent (31-doc RAG system), Nexus AI (Socket.io SaaS), Election Campaign (Gemini brand extraction)",
    "Tech stack: Python, TypeScript, React, FastAPI, Node.js, MongoDB, OpenAI Assistants, Google Gemini",
    "Languages: Arabic (native), English (professional)",
    "Contact: 2ngmo7amed2slam@gmail.com (primary), LinkedIn, GitHub, WhatsApp/Phone on request",
];

/**
 * Extract specific CV sections for targeted questions
 * Use these for focused responses without full CV dump
 */
export const CV_SECTIONS = {
    education: "Delta University for Science and Technology | BSc in Artificial Intelligence | Expected 2028 | Focus: Machine Learning, Data Science, Software Engineering",

    experience: [
        "AI Trainer & Data Annotation Specialist | DataAnnotation.tech, Outlier, OneForma | Mar 2024 - Present | Enhanced LLM reasoning via RLHF, reduced hallucinations, evaluated model bias",
        "Freelance Full-Stack AI Engineer | Self-Employed | Jan 2024 - Present | Designed AI agents, built SaaS platforms, delivered Pyramid Agent (multi-agent system with 31 documents)",
    ],

    technicalSkills: "AI: OpenAI Assistants v2, Google Gemini, RAG, LangChain, RLHF, NLP | Frontend: React 19, TypeScript, Tailwind, Framer Motion, Socket.io | Backend: Node.js, FastAPI, Flask, Python 3.11 | Databases: MongoDB, PostgreSQL, Redis | DevOps: Docker, Vercel, GitHub Pages",

    keyProjects: [
        "Pyramid Agent: Multi-agent RAG system (31 story bible docs), automated canon validation, multimedia generation (DALL-E, RunwayML, ElevenLabs), 15-tab Streamlit dashboard",
        "Nexus AI Platform: SaaS with AI quality scoring (Gemini), Socket.io real-time, 4-tier gamification, bilingual RTL/LTR, bulk admin actions",
        "Election Campaign: AI brand extraction from video (Gemini 2.5 Flash), Arabic RTL design, Zustand state, dynamic theming",
    ],
};
