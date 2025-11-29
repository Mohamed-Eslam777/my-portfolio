import { ProjectCard, type Project } from "./ProjectCard";
import { motion } from "framer-motion";
import nexusImage from "@assets/project1.png";
import dashboardImage from "@assets/project2.png";
import campaignImage from "@assets/project3.png";

const projects: Project[] = [
  {
    id: "nexus-ai",
    title: "Nexus AI Platform",
    description:
      "AI-powered web platform built with Next.js, React, and APIs. Features user authentication, AI integration, and modern responsive design. Deployed on Vercel for optimal performance and scalability.",
    image: nexusImage,
    technologies: ["Next.js", "React", "APIs", "Vercel", "Tailwind CSS"],
    liveUrl: "https://nexus-ai-platform-two.vercel.app/",
    githubUrl: "https://github.com/Mohamed-Eslam777",
  },
  {
    id: "data-dashboard",
    title: "Interactive Data Dashboard",
    description:
      "A web-based analytics tool that allows users to upload any CSV file, select data columns, and instantly visualize the analysis in dynamic, interactive charts (Bar and Pie). Perfect for quick data exploration and analysis.",
    image: dashboardImage,
    technologies: ["React", "Chart.js", "PapaParse", "JavaScript", "CSS"],
    liveUrl: "https://Mohamed-Eslam777.github.io/data-dashboard",
    githubUrl: "https://github.com/Mohamed-Eslam777",
  },
  {
    id: "election-campaign",
    title: "Election Campaign Website",
    description:
      "A professional Arabic RTL political campaign website featuring a hero section with countdown timer, candidate biography, campaign program, news/updates gallery, and testimonials section. Built with modern web technologies.",
    image: campaignImage,
    technologies: ["HTML", "CSS", "JavaScript", "Netlify", "Responsive Design"],
    liveUrl: "https://sage-croquembouche-f5ac40.netlify.app/",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24 relative z-10" data-testid="section-projects">
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
            data-testid="text-projects-title"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl" 
            data-testid="text-projects-subtitle"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            A selection of projects showcasing my skills in AI integration, full-stack development, and data visualization.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-muted-foreground">
            More projects available on my{" "}
            <a
              href="https://github.com/Mohamed-Eslam777"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
              data-testid="link-more-projects"
            >
              GitHub
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}