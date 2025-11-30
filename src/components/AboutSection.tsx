import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, GraduationCap, MapPin, Brain } from "lucide-react";
import { motion } from "framer-motion";

const experiences = [
  {
    title: "AI Trainer & Data Annotation Specialist",
    company: "Freelancer",
    period: "May 2025 – Present",
    description: "Training and evaluating AI and LLM models through structured data annotation workflows. Conducting Search Relevance Evaluation and identifying logic gaps in AI responses.",
  },
  {
    title: "Full-Stack Developer",
    company: "Freelance & Personal Projects",
    period: "1+ Year Experience",
    description: "Building AI-powered web platforms, data visualization tools, and responsive websites using modern technologies.",
  },
];

export function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 relative z-10" data-testid="section-about">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-5 gap-8 sm:gap-12">
          <motion.div
            className="lg:col-span-3 space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground"
              variants={itemVariants}
              data-testid="text-about-title"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Professional Summary
            </motion.h2>

            <motion.div className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed" variants={itemVariants}>
              <p data-testid="text-about-paragraph-1">
                AI Specialist and Full-Stack Developer with hands-on experience in <strong className="text-foreground">LLM training, data annotation, search relevance evaluation, and AI model evaluation</strong>.
              </p>
              <p data-testid="text-about-paragraph-2">
                Strong background in web development, data analysis, and DevOps basics. Skilled in <strong className="text-foreground">Python, Java, C#, Node.js</strong>, and modern web technologies.
              </p>
              <p data-testid="text-about-paragraph-3">
                Experienced in delivering high-quality, guideline-compliant annotations with strong attention to detail. Proficient in identifying logic gaps, hallucinations, and bias in AI model responses.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-3 sm:gap-6 pt-4 text-muted-foreground text-sm sm:text-base"
              variants={itemVariants}
            >
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                data-testid="text-location"
              >
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span>Cairo, Egypt</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                data-testid="text-education"
              >
                <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span>B.Sc. AI, Delta University</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                data-testid="text-graduation"
              >
                <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span>Expected Graduation: 2027</span>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h3 
              className="text-xl font-semibold text-foreground flex items-center gap-2"
              data-testid="text-experience-title"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Briefcase className="h-5 w-5 text-primary" />
              Experience
            </motion.h3>

            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ x: 5 }}
                >
                  <Card className="overflow-visible" data-testid={`card-experience-${index}`}>
                    <CardContent className="p-4 space-y-2">
                      <h4 className="font-medium text-foreground">{exp.title}</h4>
                      <p className="text-sm text-muted-foreground">{exp.company}</p>
                      <p className="text-xs text-primary">{exp.period}</p>
                      <p className="text-sm text-muted-foreground">{exp.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}