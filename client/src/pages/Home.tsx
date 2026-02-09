import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ButtonMotion } from "@/components/ui/button-motion";
import { Link } from "wouter";
import { ArrowRight, Download, Terminal, Code2, Database, Award } from "lucide-react";
import { PERSONAL_INFO, PROJECTS, SERVICES } from "@/lib/data";
import { ProjectCard } from "@/components/ProjectCard";
import { PageReveal } from "@/components/PageReveal";
import { Typewriter } from "@/components/Typewriter";

export default function Home() {
  const featuredProjects = PROJECTS.slice(0, 2);

  return (
    <PageReveal>
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 md:pt-24 md:pb-20 overflow-hidden">
          <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary w-fit text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Available for Freelance Work
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading tracking-tight leading-tight">
                Building <span className="text-primary">Intelligent</span> Web Solutions.
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                I'm <span className="font-semibold text-foreground">{PERSONAL_INFO.name}</span>, a{" "}
                <Typewriter
                  texts={[
                    "Full-Stack AI Engineer",
                    "LLM & Agent Architect",
                    "SaaS Platform Builder",
                    "Automation Expert"
                  ]}
                  className="font-semibold text-primary text-base md:text-lg lg:text-xl"
                />
                {" "}crafting scalable applications and integrating cutting-edge AI technologies.
              </p>

              <div className="flex flex-wrap gap-4 mt-2">
                <Link href="/projects">
                  <ButtonMotion variant="primary" className="h-12 px-8 text-base">
                    View My Work <ArrowRight className="ml-2 h-4 w-4" />
                  </ButtonMotion>
                </Link>
                <a href={PERSONAL_INFO.assets.cv} download>
                  <ButtonMotion variant="outline" className="h-12 px-8 text-base bg-background/50 backdrop-blur-sm">
                    Download CV <Download className="ml-2 h-4 w-4" />
                  </ButtonMotion>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex items-center justify-center lg:min-h-[500px]"
            >
              <div className="relative w-full max-w-[500px] aspect-square">
                {/* Abstract decorative shapes */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-[100px] animate-pulse" />
                <div className="relative h-full w-full">
                  <img
                    src={PERSONAL_INFO.assets.profile}
                    alt={PERSONAL_INFO.name}
                    loading="eager"
                    decoding="async"
                    className="h-full w-full object-cover rounded-2xl shadow-xl border-2 border-transparent transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:border-yellow-400"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Snippet */}
        <section className="py-16 md:py-20 bg-muted/30 border-y">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">What I Do</h2>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  Combining technical expertise with creative problem solving to deliver high-quality solutions.
                </p>
              </div>
              <Link href="/services">
                <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-primary/10 shrink-0">
                  View All Services <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-card p-6 md:p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <Code2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Frontend Development</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Responsive, accessible, and performant user interfaces using React, TypeScript, and modern CSS.
                </p>
              </div>
              <div className="bg-card p-6 md:p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <Database className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Backend Architecture</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Scalable APIs and microservices built with Node.js, Python, and robust database design.
                </p>
              </div>
              <div className="bg-card p-6 md:p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <Terminal className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">AI Integration</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Leveraging LLMs and Machine Learning to build intelligent, autonomous features.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">Featured Projects</h2>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  A selection of my recent work and experiments.
                </p>
              </div>
              <Link href="/projects">
                <Button variant="outline" className="shrink-0">View All Projects</Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 text-foreground">
              Have a project in mind?
            </h2>
            <p className="text-base md:text-lg lg:text-xl mb-10 text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              I'm currently available for freelance projects and consulting.
              Let's discuss how we can work together to build something great.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                Let's Talk
              </Button>
            </Link>
          </div>
        </section>

        {/* Resources & Achievements Section */}
        <section className="py-12 md:py-16 lg:py-20 bg-background">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center"
            >
              {/* Achievement Image */}
              <div className="relative order-1 w-full">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-2xl opacity-50" />
                <div className="relative">
                  <img
                    src="/images/alx-acceptance.jpg"
                    alt="ALX Cloud Computing Acceptance"
                    loading="lazy"
                    decoding="async"
                    className="w-full aspect-video md:aspect-auto md:h-auto rounded-xl shadow-lg border-2 border-primary/20 transition-all duration-500 ease-in-out hover:shadow-2xl hover:border-primary/50 hover:-translate-y-1 object-cover"
                  />
                </div>
              </div>

              {/* Achievement Text */}
              <div className="order-2 space-y-3 md:space-y-4 w-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary w-fit text-sm font-medium">
                  <Award className="h-4 w-4" />
                  Latest Milestone
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading">
                  Resources & Achievements
                </h3>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Excited to expand my expertise in scalable cloud architecture and AWS services to build even more robust and resilient solutions for my clients.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageReveal>
  );
}
