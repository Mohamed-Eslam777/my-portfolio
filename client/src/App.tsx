import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ChatWidget } from "@/components/ChatWidget";
import confetti from "canvas-confetti";
import { useEffect, useState, lazy, Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";

// Lazy load all page components for code splitting
const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Projects = lazy(() => import("@/pages/Projects"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const Experience = lazy(() => import("@/pages/Experience"));
const Skills = lazy(() => import("@/pages/Skills"));
const Services = lazy(() => import("@/pages/Services"));
const Reviews = lazy(() => import("@/pages/Reviews"));
const Resume = lazy(() => import("@/pages/Resume"));
const Contact = lazy(() => import("@/pages/Contact"));
const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-primary">Loading...</div></div>}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/projects" component={Projects} />
          <Route path="/projects/:slug" component={ProjectDetail} />
          <Route path="/experience" component={Experience} />
          <Route path="/skills" component={Skills} />
          <Route path="/services" component={Services} />
          <Route path="/reviews" component={Reviews} />
          <Route path="/resume" component={Resume} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Easter Egg - Type "123" for confetti!
  useEffect(() => {
    const sequence = ['1', '2', '3'];
    let cursor = 0;
    const listener = (e: KeyboardEvent) => {
      cursor = (e.key === sequence[cursor]) ? cursor + 1 : 0;
      if (cursor === sequence.length) {
        confetti({ spread: 180, particleCount: 200, origin: { y: 0.6 } });
        cursor = 0;
      }
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {isLoading ? (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        ) : (
          <>
            <div className="flex flex-col min-h-screen font-sans bg-background text-foreground">
              {/* Skip to Content Link for Accessibility */}
              <a
                href="#main"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
              >
                Skip to main content
              </a>

              <Navbar />
              <main id="main" className="flex-grow">
                <Router />
              </main>
              <Footer />
            </div>

            {/* AI-Powered Chat Widget */}
            <ChatWidget />

            <Toaster />
            <Analytics />
          </>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
