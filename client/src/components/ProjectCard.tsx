import { Project } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { useRef, MouseEvent, useState, useEffect } from "react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch devices on mount
  useEffect(() => {
    const hasTouchScreen = window.matchMedia('(hover: none)').matches;
    setIsTouchDevice(hasTouchScreen);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    // Skip spotlight on touch devices
    if (!cardRef.current || isTouchDevice) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update CSS variables for spotlight position
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <Card
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group overflow-hidden border-border/50 bg-card hover:border-primary/50 transition-all duration-300 h-full flex flex-col relative spotlight-card"
      style={{
        "--mouse-x": "0px",
        "--mouse-y": "0px",
      } as React.CSSProperties}
    >
      {/* Spotlight effect overlay - only on non-touch devices */}
      {!isTouchDevice && (
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div
            className="absolute rounded-full blur-xl"
            style={{
              width: "300px",
              height: "300px",
              left: "var(--mouse-x)",
              top: "var(--mouse-y)",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(250, 204, 21, 0.15) 0%, transparent 70%)",
            }}
          />
        </div>
      )}

      <div className="relative aspect-video overflow-hidden bg-muted">
        {project.screenshots && project.screenshots.length > 0 ? (
          <img
            src={project.screenshots[0]}
            alt={`${project.title} project screenshot`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
            No Image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <Link href={`/projects/${project.slug}`} className="w-full">
            <Button variant="secondary" className="w-full font-semibold">
              View Case Study <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="font-heading text-xl">{project.title}</CardTitle>
          <div className="flex gap-2">
            {project.repoLink && (
              <a href={project.repoLink} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
            )}
            {project.demoLink && (
              <a href={project.demoLink} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3 mb-4 text-sm leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.techTags.slice(0, 3).map((tag: string) => (
            <Badge key={tag} variant="secondary" className="bg-secondary/50 font-normal">
              {tag}
            </Badge>
          ))}
          {project.techTags.length > 3 && (
            <Badge variant="outline" className="font-normal text-muted-foreground">
              +{project.techTags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

