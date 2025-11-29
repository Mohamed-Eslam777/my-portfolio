import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { BackToTop } from "@/components/BackToTop";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <div className="min-h-screen bg-background relative">
        <AnimatedBackground />
        <Navigation />
        
        <main>
          <HeroSection
            name="Mohammed Maklad"
            title="AI Specialist | LLM Trainer | Full Stack Developer"
            tagline="Hello, I'm"
            description="AI Specialist and Full-Stack Developer with hands-on experience in LLM training, data annotation, search relevance evaluation, and AI model evaluation. Building modern web applications with React, Node.js, and cutting-edge technologies."
            profileImage="https://mohamed-eslam777.github.io/profile.jpg"
            links={{
              github: "https://github.com/Mohamed-Eslam777",
              linkedin: "https://www.linkedin.com/in/mohammed-maklad-469557381/",
              email: "mo7amed2slam77@gmail.com",
              whatsapp: "https://wa.me/201050586075",
            }}
          />
          
          <StatsSection />
          
          <AboutSection />
          
          <ProjectsSection />
          
          <SkillsSection />
          
          <TestimonialsSection />
          
          <ContactSection />
        </main>
        
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}