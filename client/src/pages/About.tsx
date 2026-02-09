import { PageHeader } from "@/components/PageHeader";
import { PERSONAL_INFO, EDUCATION } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Download, GraduationCap } from "lucide-react";
import { PageReveal } from "@/components/PageReveal";

export default function About() {
  return (
    <PageReveal>
      <div>
        <PageHeader
          title="About Me"
          description="I bridge the gap between complex AI algorithms and intuitive user experiences."
        />

        <div className="container mx-auto py-16 md:py-20 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="lead text-xl text-muted-foreground mb-6">
                Hello! I'm {PERSONAL_INFO.name}, a {PERSONAL_INFO.role} based in {PERSONAL_INFO.location}.
              </p>
              <p>
                My journey into technology began with a curiosity about how things work, which quickly evolved into a passion for building software that solves real-world problems. Today, I specialize in full-stack development with a heavy focus on Artificial Intelligence.
              </p>
              <p>
                I don't just write code; I design systems. Whether it's architecting a microservices backend, fine-tuning a language model, or crafting a pixel-perfect frontend, I approach every task with precision and creativity.
              </p>
              <p>
                When I'm not coding, I'm exploring the latest developments in AI research, contributing to open-source projects, or sharing my knowledge with the developer community.
              </p>

              <div className="mt-8 flex gap-4 not-prose">
                <a href={PERSONAL_INFO.assets.cv} download>
                  <Button size="lg" className="gap-2">
                    Download CV <Download className="h-4 w-4" />
                  </Button>
                </a>
                <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noreferrer">
                  <Button variant="outline" size="lg">LinkedIn Profile</Button>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl transform translate-x-4 translate-y-4 -z-10" />
              <img
                src={PERSONAL_INFO.assets.aboutImage}
                alt={PERSONAL_INFO.name}
                loading="lazy"
                decoding="async"
                className="rounded-2xl w-full object-cover shadow-xl border-2 border-transparent transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:border-yellow-400"
              />

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-6 bg-card border rounded-xl">
                  <div className="text-4xl font-bold text-primary mb-2">2+</div>
                  <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Years Experience</div>
                </div>
                <div className="p-6 bg-card border rounded-xl">
                  <div className="text-4xl font-bold text-primary mb-2">10+</div>
                  <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Projects Completed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="mt-20">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8">Education</h2>
            <div className="space-y-6">
              {EDUCATION.map((edu) => (
                <div key={edu.id} className="bg-card p-6 md:p-8 rounded-2xl border shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                      <p className="text-primary font-medium mb-2">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground mb-3">{edu.year}</p>
                      <p className="text-muted-foreground leading-relaxed">{edu.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageReveal>
  );
}
