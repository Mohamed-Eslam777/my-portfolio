import { PageHeader } from "@/components/PageHeader";
import { REVIEWS, PERSONAL_INFO } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Reviews() {
  return (
    <div>
      <PageHeader
        title="Client Reviews"
        description="Feedback from clients and collaborators I've worked with."
      />

      <div className="container mx-auto py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {REVIEWS.map((review) => (
            <Card key={review.id} className="relative bg-card/50 backdrop-blur border-border/50">
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/20" />
              <CardContent className="pt-8 px-8 pb-8">
                <div className="flex gap-1 mb-4 text-primary">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-lg text-muted-foreground italic mb-6 leading-relaxed">
                  "{review.text}"
                </p>
                <div>
                  <div className="font-bold text-foreground">{review.name}</div>
                  <div className="text-sm text-primary">{review.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-4">View verified reviews on my freelancing profile</p>
          <a href={PERSONAL_INFO.socials.mostaql} target="_blank" rel="noreferrer">
            <Button variant="outline" className="gap-2">
              Visit Mostaql Profile <Star className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
