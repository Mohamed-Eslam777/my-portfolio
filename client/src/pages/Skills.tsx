import { PageHeader } from "@/components/PageHeader";
import { SKILLS } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageReveal } from "@/components/PageReveal";
import { SkillsMarquee } from "@/components/SkillsMarquee";

export default function Skills() {
  return (
    <PageReveal>
      <div>
        <PageHeader
          title="Skills & Expertise"
          description="A comprehensive list of technologies and tools I work with."
        />

        {/* Infinite Scrolling Tech Marquee */}
        <SkillsMarquee />

        <div className="container mx-auto py-16 md:py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS.map((skillGroup) => (
              <Card key={skillGroup.id} className="hover:border-primary/50 transition-colors">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-heading text-primary">
                    {skillGroup.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((item: string) => (
                      <div
                        key={item}
                        className="px-3 py-1.5 rounded-md bg-muted text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageReveal>
  );
}
