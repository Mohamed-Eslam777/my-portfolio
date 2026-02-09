import { useRoute } from "wouter";
import { PROJECTS } from "@/lib/data";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import NotFound from "./not-found";

export default function ProjectDetail() {
  const [match, params] = useRoute("/projects/:slug");

  if (!match) return <NotFound />;

  const project = PROJECTS.find(p => p.slug === params.slug);

  if (!project) return <NotFound />;

  return (
    <div className="pb-20">
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto py-8 px-4">
          <Link href="/projects">
            <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
            </Button>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-end px-4 sm:px-0">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">{project.title}</h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.techTags.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-4">
                {project.repoLink && (
                  <a href={project.repoLink} target="_blank" rel="noreferrer">
                    <Button variant="outline" className="gap-2">
                      <Github className="h-4 w-4" /> View Source
                    </Button>
                  </a>
                )}
                {project.demoLink && (
                  <a href={project.demoLink} target="_blank" rel="noreferrer">
                    <Button className="gap-2">
                      <ExternalLink className="h-4 w-4" /> Live Demo
                    </Button>
                  </a>
                )}
              </div>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden border shadow-xl">
              {project.screenshots && project.screenshots[0] ? (
                <img
                  src={project.screenshots[0]}
                  alt={`${project.title} project screenshot`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                  No Preview Available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-16 md:py-20 px-4 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
        <div className="lg:col-span-2 space-y-12">
          {project.problem && (
            <section>
              <h2 className="text-2xl font-heading font-bold mb-4">The Problem</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">{project.problem}</p>
            </section>
          )}

          {project.solution && (
            <section>
              <h2 className="text-2xl font-heading font-bold mb-4">The Solution</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">{project.solution}</p>
            </section>
          )}

          {project.features && project.features.length > 0 && (
            <section>
              <h2 className="text-2xl font-heading font-bold mb-6">Key Features</h2>
              <ul className="grid sm:grid-cols-2 gap-4">
                {project.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-card border">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="space-y-8">
          <div className="p-6 rounded-xl bg-muted/30 border">
            <h3 className="font-bold mb-4">Project Details</h3>
            <div className="space-y-4 text-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between border-b pb-3 gap-1">
                <span className="text-muted-foreground mb-1 sm:mb-0">Role</span>
                <span className="font-medium text-right">{project.role}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between border-b pb-3 gap-1">
                <span className="text-muted-foreground mb-1 sm:mb-0">Timeline</span>
                <span className="font-medium text-right">2023 - 2024</span>
              </div>
              {project.architecture && (
                <div className="pt-2">
                  <span className="text-muted-foreground block mb-3">Architecture</span>
                  <div className="flex flex-wrap gap-2">
                    {project.architecture.map((arch: string) => (
                      <Badge key={arch} variant="outline" className="text-xs">{arch}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
