import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SkillBadge } from "./SkillBadge";
import { Code2, Globe, Languages, Wrench, Brain } from "lucide-react";
import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Programming & AI",
    icon: Code2,
    skills: [
      { name: "Python", level: "expert" as const },
      { name: "Java", level: "advanced" as const },
      { name: "C#", level: "advanced" as const },
      { name: "Node.js", level: "expert" as const },
      { name: "PHP", level: "intermediate" as const },
      { name: "Pandas", level: "advanced" as const },
      { name: "NumPy", level: "advanced" as const },
    ],
  },
  {
    title: "Web Development",
    icon: Globe,
    skills: [
      { name: "HTML", level: "expert" as const },
      { name: "CSS", level: "expert" as const },
      { name: "JavaScript", level: "expert" as const },
      { name: "React", level: "expert" as const },
      { name: "Next.js", level: "advanced" as const },
      { name: "Full-Stack", level: "advanced" as const },
      { name: "APIs", level: "advanced" as const },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: Wrench,
    skills: [
      { name: "Git", level: "expert" as const },
      { name: "GitHub", level: "expert" as const },
      { name: "Docker", level: "intermediate" as const },
      { name: "Vercel", level: "advanced" as const },
      { name: "Agile/Scrum", level: "intermediate" as const },
      { name: "MS Excel", level: "advanced" as const },
      { name: "Google Workspace", level: "advanced" as const },
    ],
  },
  {
    title: "AI & Data",
    icon: Brain,
    skills: [
      { name: "LLM Training", level: "advanced" as const },
      { name: "Data Annotation", level: "expert" as const },
      { name: "Search Relevance", level: "advanced" as const },
      { name: "AI Evaluation", level: "advanced" as const },
      { name: "Data Analysis", level: "advanced" as const },
    ],
  },
  {
    title: "Languages",
    icon: Languages,
    skills: [
      { name: "Arabic (Native)", level: "expert" as const },
      { name: "English (Very Good)", level: "advanced" as const },
    ],
  },
];

export function SkillsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-24 bg-card/50 relative z-10" data-testid="section-skills">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="space-y-2 sm:space-y-4 mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground" 
            data-testid="text-skills-title"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Technical Skills
          </motion.h2>
          <motion.p 
            className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl" 
            data-testid="text-skills-subtitle"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Technologies and tools I use to build AI-powered applications and deliver high-quality solutions.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="overflow-visible h-full" data-testid={`card-skills-${category.title.toLowerCase().replace(/\s/g, "-")}`}>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      <category.icon className="h-5 w-5 text-primary" />
                    </motion.div>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: skillIndex * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <SkillBadge name={skill.name} level={skill.level} />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}