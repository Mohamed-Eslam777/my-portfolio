// Update CV Link Fix
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowDown, Github, Linkedin, Mail, MessageCircle, Download } from "lucide-react";
import { motion } from "framer-motion";
import { TypewriterText } from "./TypewriterText";
import { MagneticWrapper } from "./MagneticWrapper";
import myNewPhoto from "../../../attached_assets/profile.png";

interface HeroSectionProps {
  name: string;
  title: string;
  tagline: string;
  description: string;
  profileImage: string;
  links: {
    github?: string;
    linkedin?: string;
    email?: string;
    whatsapp?: string;
  };
}

const roles = [
  "AI Specialist",
  "LLM Trainer",
  "Full Stack Developer",
  "Data Annotation Expert",
];

export function HeroSection({ name, title, tagline, description, profileImage, links }: HeroSectionProps) {
  const scrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      className="min-h-screen sm:min-h-[90vh] flex items-center py-16 sm:py-20 lg:py-32 relative z-10"
      data-testid="section-hero"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 items-center">
          <motion.div
            className="md:col-span-1 lg:col-span-3 space-y-6 order-2 md:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            <motion.div className="space-y-2" variants={itemVariants}>
              <motion.p 
                className="text-sm sm:text-base text-primary font-medium" 
                data-testid="text-greeting"
                variants={itemVariants}
              >
                {tagline}
              </motion.p>
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight"
                data-testid="text-name"
                variants={itemVariants}
              >
                {name}
              </motion.h1>
              <motion.h2
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-primary font-medium h-[1.5em]"
                data-testid="text-title"
                variants={itemVariants}
              >
                <TypewriterText texts={roles} typingSpeed={80} deletingSpeed={40} pauseDuration={2000} />
              </motion.h2>
            </motion.div>

            <motion.p
              className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed"
              variants={itemVariants}
              data-testid="text-description"
            >
              {description}
            </motion.p>

            <motion.div className="flex flex-wrap gap-2 sm:gap-4 pt-4" variants={itemVariants}>
              <MagneticWrapper strength={0.25}>
                <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" onClick={scrollToProjects} data-testid="button-view-projects">
                    View Projects
                    <ArrowDown className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </MagneticWrapper>
              <MagneticWrapper strength={0.25}>
                <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={scrollToContact}
                    data-testid="button-contact"
                  >
                    Get in Touch
                  </Button>
                </motion.div>
              </MagneticWrapper>
              <MagneticWrapper strength={0.25}>
                <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="secondary" asChild data-testid="button-download-cv">
                    <a href="/my-cv.pdf" download="my-cv.pdf" target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      Download CV
                    </a>
                  </Button>
                </motion.div>
              </MagneticWrapper>
            </motion.div>

            <motion.div className="flex items-center gap-1 sm:gap-2 pt-4 flex-wrap" variants={itemVariants}>
              {links.github && (
                <motion.div variants={itemVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button size="icon" variant="ghost" asChild className="h-9 w-9 sm:h-10 sm:w-10" data-testid="link-github">
                    <a href={links.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                    </a>
                  </Button>
                </motion.div>
              )}
              {links.linkedin && (
                <motion.div variants={itemVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button size="icon" variant="ghost" asChild className="h-9 w-9 sm:h-10 sm:w-10" data-testid="link-linkedin">
                    <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                    </a>
                  </Button>
                </motion.div>
              )}
              {links.email && (
                <motion.div variants={itemVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button size="icon" variant="ghost" asChild className="h-9 w-9 sm:h-10 sm:w-10" data-testid="link-email">
                    <a href={`mailto:${links.email}`}>
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                    </a>
                  </Button>
                </motion.div>
              )}
              {links.whatsapp && (
                <motion.div variants={itemVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button size="icon" variant="ghost" asChild className="h-9 w-9 sm:h-10 sm:w-10" data-testid="link-whatsapp">
                    <a href={links.whatsapp} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                    </a>
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            className="md:col-span-1 lg:col-span-2 flex justify-center order-1 md:order-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={imageVariants}
          >
            <div className="relative w-full flex justify-center">
              <motion.div
                className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Avatar className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-80 lg:h-80 border-2 sm:border-3 lg:border-4 border-background shadow-xl relative flex-shrink-0">
                  <AvatarImage src={myNewPhoto} alt="Mohamed Eslam" className="object-cover" />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}