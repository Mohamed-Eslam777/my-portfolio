import { PageHeader } from "@/components/PageHeader";
import { EXPERIENCE } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";
import { PageReveal } from "@/components/PageReveal";

export default function Experience() {
  return (
    <PageReveal>
      <div>
        <PageHeader
          title="Experience"
          description="My professional journey and career milestones."
        />

        <div className="container mx-auto py-16 md:py-20 max-w-4xl">
          <div className="relative border-l-2 border-primary/20 ml-3 md:ml-6 space-y-12">
            {EXPERIENCE.map((exp, index) => (
              <div key={exp.id} className="relative pl-8 md:pl-12">
                {/* Timeline dot */}
                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-background border-2 border-primary ring-4 ring-background" />

                <Card className="border-none shadow-none bg-transparent">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                      <h2 className="text-2xl font-bold font-heading text-foreground">{exp.title}</h2>
                      <Badge variant="secondary" className="w-fit">{exp.period}</Badge>
                    </div>

                    <div className="flex items-center gap-2 text-primary font-medium mb-4">
                      <Briefcase className="h-4 w-4" />
                      {exp.company}
                    </div>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}

            {/* End of timeline decorator */}
            <div className="relative pl-8 md:pl-12 pt-4">
              <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-muted-foreground/30" />
              <p className="text-muted-foreground italic">Prior academic and project experience...</p>
            </div>
          </div>
        </div>
      </div>
    </PageReveal>
  );
}
