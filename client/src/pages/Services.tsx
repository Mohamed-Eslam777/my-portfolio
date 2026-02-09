import { PageHeader } from "@/components/PageHeader";
import { SERVICES } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import { PageReveal } from "@/components/PageReveal";

export default function Services() {
  return (
    <PageReveal>
      <div>
        <PageHeader
          title="Services"
          description="Specialized technical services for businesses and startups."
        />

        <div className="container mx-auto py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {SERVICES.map((service, index) => (
              <Card key={service.id} className="group relative overflow-hidden border-border/50 hover:border-primary/50 transition-all">
                <div className="absolute top-0 right-0 p-4 opacity-10 font-heading text-8xl font-bold">
                  0{index + 1}
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl font-heading mb-2">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <Link href="/contact">
                    <span className="inline-flex items-center text-primary font-medium hover:underline cursor-pointer group-hover:translate-x-1 transition-transform">
                      Discuss this service <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-primary/5 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto border border-primary/10">
            <h2 className="text-3xl font-heading font-bold mb-4">Why work with me?</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-left mt-8">
              <div className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span className="font-medium">Clear Communication</span>
              </div>
              <div className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span className="font-medium">On-Time Delivery</span>
              </div>
              <div className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span className="font-medium">Post-Launch Support</span>
              </div>
              <div className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span className="font-medium">Scalable Code</span>
              </div>
              <div className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span className="font-medium">Modern Tech Stack</span>
              </div>
              <div className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span className="font-medium">SEO Optimized</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageReveal>
  );
}
