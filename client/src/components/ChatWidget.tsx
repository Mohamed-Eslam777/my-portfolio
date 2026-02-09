import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Maximize2, Minimize2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ASSISTANT_PROFILE } from "@/lib/assistantProfile";
import { CV_SUMMARY_HINTS } from "@/lib/cvKnowledge";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Hi! I'm Mohamed's AI Assistant. Ask me anything about his skills, projects, or experience!",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Detect if text contains Arabic characters for RTL support
    const detectRTL = (text: string): boolean => {
        const arabicRegex = /[\u0600-\u06FF]/;
        return arabicRegex.test(text);
    };

    const buildContext = () => {
        const profile = ASSISTANT_PROFILE;

        // Compact project summaries (1-2 lines each)
        const projectsList = profile.projects.map(
            (p) => `- ${p.name}: ${p.solution} (${p.techStack.slice(0, 4).join(", ")})`
        ).join("\n");

        // Compact experience
        const experienceList = profile.experience.map(
            (e) => `- ${e.title} at ${e.company} (${e.period}): ${e.keyOutcomes[0]}`
        ).join("\n");

        // Skills grouped
        const skillsSummary = `
AI: ${profile.skills.ai.slice(0, 6).join(", ")}
Frontend: ${profile.skills.frontend.slice(0, 6).join(", ")}
Backend: ${profile.skills.backend.slice(0, 5).join(", ")}
Databases: ${profile.skills.databases.join(", ")}
Cloud/DevOps: ${profile.skills.cloudDevOps.slice(0, 4).join(", ")}
Languages: ${profile.skills.languages.join(", ")}
Spoken: ${profile.skills.spokenLanguages.join(", ")}`;

        return `
You are the AI Assistant for ${profile.identity.nameEnglish} (${profile.identity.nameArabic}).

===== FACTS =====

IDENTITY:
- Name: ${profile.identity.nameEnglish} (Arabic: ${profile.identity.nameArabic})
- Age: ${profile.identity.age}
- Role: ${profile.identity.role}
- Location: Currently ${profile.identity.currentLocation}, Originally from ${profile.identity.originLocation}

EDUCATION:
- Institution: ${profile.education.institution} (${profile.education.institutionArabic})
- Degree: ${profile.education.degree}
- Field: ${profile.education.field}
- Expected Graduation: ${profile.education.expectedGraduation}

EXPERIENCE:
${experienceList}

SKILLS (GROUPED):
${skillsSummary}

PROJECTS (COMPACT):
${projectsList}

SERVICES:
${profile.services.map(s => `- ${s.title}: ${s.summary}`).join("\n")}

CV SUMMARY:
${CV_SUMMARY_HINTS.join("\n")}

===== CONTACT POLICY =====

${profile.rules.contactPolicy.join("\n")}

PRIMARY CONTACT (default):
- Email: ${profile.contact.emailPrimary}
- LinkedIn: ${profile.contact.linkedin}
- GitHub: ${profile.contact.github}

PHONE/WHATSAPP (only if user explicitly asks):
- WhatsApp: ${profile.contact.whatsapp}
- Phone: ${profile.contact.phone}

OTHER SOCIALS:
- Mostaql: ${profile.contact.mostaql}
- Facebook: ${profile.contact.facebook}
- Instagram: ${profile.contact.instagram}

===== LANGUAGE POLICY =====

${profile.rules.language.join("\n")}

IMPORTANT FOR EGYPTIAN ARABIC (MASRI):
- Use conversational Masri when user writes in Arabic
- Examples: "أهلاً بيك" (welcome), "تمام" (okay), "حابب أعرف" (I'd like to know), "ممكن" (can), "عايز" (want), "ده" (this)
- Stay professional but natural (not overly formal MSA)
- Use Egyptian pronunciation/grammar naturally

===== RESPONSE STYLE GUIDE =====

${profile.rules.formatting.join("\n")}

STRUCTURE EXAMPLE:
Brief intro (1-2 sentences)
## Section Heading
- Bullet point
- Bullet point

Optional CTA (1 sentence when relevant)

===== GROUNDING RULES (CRITICAL) =====

${profile.rules.grounding.join("\n")}

NEVER INVENT:
- Tools/versions not in the skills lists
- Projects not in the projects list
- Clients or companies not mentioned
- Experiences or achievements not listed

IF MISSING INFO:
Say: "I don't have that specific detail in Mohamed's portfolio data. What I can share is..." then provide related available info.

===== INSTRUCTIONS =====

1. Read user message carefully - detect if Arabic or English
2. If Arabic → respond in Egyptian Arabic (Masri) as instructed
3. If English → respond in English
4. Use ONLY the FACTS above
5. Keep responses concise (~120 words max unless user asks for details)
6. Use headings + bullets for organized answers
7. For contact: follow CONTACT POLICY strictly
8. No emojis unless user uses them first
9. End with optional CTA when relevant

You MUST strictly follow these rules. Never deviate from the facts provided.
`;
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            // Call secure serverless API endpoint
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    context: buildContext(),
                    history: messages.slice(1).map((msg) => ({
                        role: msg.role === "user" ? "user" : "model",
                        parts: [{ text: msg.content }],
                    })),
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP ${response.status}`);
            }

            const data = await response.json();
            setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
        } catch (error) {
            console.error("Chat API Error:", error);
            const errorMessage = error instanceof Error ? error.message : "Unknown error";

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: `⚠️ System Error: ${errorMessage}. Please try again later.`,
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Launcher Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 touch-target w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-xl hover:scale-110 transition-all duration-300 animate-pulse hover:animate-none"
                    aria-label="Open AI Chat"
                >
                    <Bot className="h-7 w-7" />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className={`fixed bottom-6 right-6 z-50 bg-zinc-900 border border-primary/30 rounded-lg shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${isExpanded
                        ? "w-[95vw] sm:w-[480px] h-[calc(100vh-100px)] sm:h-[700px]"
                        : "w-[350px] h-[500px]"
                    }`}>
                    {/* Header */}
                    <div className="bg-gradient-to-r from-zinc-800 to-zinc-900 border-b border-primary/30 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="touch-target w-10 h-10 bg-primary rounded-full">
                                <Bot className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <div>
                                <h3 className="text-primary font-semibold text-sm">Mohamed's AI Assistant</h3>
                                <p className="text-gray-400 text-xs">Ask me anything!</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="touch-target text-gray-400 hover:text-primary transition-colors"
                                aria-label={isExpanded ? "Minimize chat" : "Maximize chat"}
                            >
                                {isExpanded ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="touch-target text-gray-400 hover:text-white transition-colors"
                                aria-label="Close chat"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-lg p-3 ${message.role === "user"
                                        ? "bg-gray-700 text-white"
                                        : "bg-primary/10 text-gray-100 border border-primary/20"
                                        }`}
                                    dir={detectRTL(message.content) ? "rtl" : "ltr"}
                                >
                                    {message.role === "assistant" ? (
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            className="text-sm prose prose-invert max-w-full"
                                            components={{
                                                // Headings
                                                h1: ({ node, ...props }: any) => <h1 className="text-base font-bold text-primary mt-3 mb-2 first:mt-0" {...props} />,
                                                h2: ({ node, ...props }: any) => <h2 className="text-sm font-bold text-primary/90 mt-2 mb-1 first:mt-0" {...props} />,
                                                h3: ({ node, ...props }: any) => <h3 className="text-sm font-semibold text-gray-200 mt-2 mb-1 first:mt-0" {...props} />,
                                                // Paragraphs
                                                p: ({ node, ...props }: any) => <p className="text-sm leading-relaxed mb-2 last:mb-0 whitespace-pre-wrap break-words" style={{ overflowWrap: 'anywhere' }} {...props} />,
                                                // Lists
                                                ul: ({ node, ...props }: any) => <ul className="text-sm list-disc list-inside space-y-1 my-2" {...props} />,
                                                ol: ({ node, ...props }: any) => <ol className="text-sm list-decimal list-inside space-y-1 my-2" {...props} />,
                                                li: ({ node, ...props }: any) => <li className="text-sm leading-relaxed break-words" style={{ overflowWrap: 'anywhere' }} {...props} />,
                                                // Links
                                                a: ({ node, ...props }: any) => (
                                                    <a
                                                        className="text-primary hover:text-primary/80 underline break-words transition-colors focus:ring-2 focus:ring-primary focus:outline-none"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{ overflowWrap: 'anywhere' }}
                                                        {...props}
                                                    />
                                                ),
                                                // Strong/Bold
                                                strong: ({ node, ...props }: any) => <strong className="font-bold text-primary" {...props} />,
                                                // Emphasis/Italic
                                                em: ({ node, ...props }: any) => <em className="italic text-gray-200" {...props} />,
                                                // Code
                                                code: ({ node, ...props }: any) => <code className="bg-zinc-800 text-primary px-1 py-0.5 rounded text-xs break-words" style={{ overflowWrap: 'anywhere' }} {...props} />,
                                            }}
                                        >
                                            {message.content}
                                        </ReactMarkdown>
                                    ) : (
                                        <p className="text-sm whitespace-pre-wrap break-words leading-relaxed" style={{ overflowWrap: 'anywhere' }}>{message.content}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-primary/10 text-gray-100 border border-primary/20 rounded-lg p-3">
                                    <p className="text-sm">Thinking...</p>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="border-t border-primary/30 p-4 bg-zinc-800">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message..."
                                className="flex-1 bg-zinc-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleSend}
                                disabled={isLoading || !input.trim()}
                                className="touch-target bg-primary hover:bg-primary/90 disabled:bg-gray-600 disabled:cursor-not-allowed text-primary-foreground rounded-lg px-4 py-2 transition-colors"
                            >
                                <Send className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
