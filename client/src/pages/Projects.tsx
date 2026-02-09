import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectCardSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { PROJECTS } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FolderX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PageReveal } from "@/components/PageReveal";

export default function Projects() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Extract all unique tags
  const allTags = Array.from(new Set(PROJECTS.flatMap(p => p.techTags)));

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter ? project.techTags.includes(filter) : true;

    return matchesSearch && matchesFilter;
  });

  return (
    <PageReveal>
      <div>
        <PageHeader
          title="Projects"
          description="A showcase of my technical projects, experiments, and case studies."
        />

        <div className="container mx-auto py-16 md:py-20">
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="pl-10 h-12 rounded-xl"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              <Button
                variant={filter === null ? "default" : "outline"}
                onClick={() => setFilter(null)}
                className="rounded-full"
                size="sm"
              >
                All
              </Button>
              {allTags.slice(0, 5).map(tag => (
                <Button
                  key={tag}
                  variant={filter === tag ? "default" : "outline"}
                  onClick={() => setFilter(filter === tag ? null : tag)}
                  className="rounded-full"
                  size="sm"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Show skeletons while loading
              <>
                {[1, 2, 3].map((i) => (
                  <ProjectCardSkeleton key={i} />
                ))}
              </>
            ) : (
              <AnimatePresence>
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {!isLoading && filteredProjects.length === 0 && (
            <EmptyState
              icon={FolderX}
              title="No Projects Found"
              description="We couldn't find any projects matching your search criteria. Try adjusting your filters or search term."
            >
              <Button
                variant="ghost"
                onClick={() => { setSearch(""); setFilter(null); }}
                className="text-primary"
              >
                Clear all filters
              </Button>
            </EmptyState>
          )}
        </div>
      </div>
    </PageReveal>
  );
}
