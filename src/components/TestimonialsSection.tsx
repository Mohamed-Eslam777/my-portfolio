import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image?: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ahmed Hassan",
    role: "Project Manager",
    company: "Tech Solutions",
    content: "Mohammed delivered exceptional work on our AI integration project. His attention to detail and technical expertise exceeded our expectations. Highly recommended!",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    role: "Startup Founder",
    company: "DataViz Pro",
    content: "Working with Mohammed was a great experience. He built our data dashboard from scratch and the results were amazing. Professional and responsive throughout.",
  },
  {
    id: "3",
    name: "Omar Khaled",
    role: "Marketing Director",
    company: "Campaign Hub",
    content: "Mohammed created a beautiful campaign website for us with all the features we needed. His understanding of both Arabic RTL design and modern web standards is impressive.",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 sm:py-20 lg:py-24 bg-card/50 relative z-10" data-testid="section-testimonials">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="space-y-2 sm:space-y-4 mb-8 sm:mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground" 
            data-testid="text-testimonials-title"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            What People Say
          </motion.h2>
          <motion.p 
            className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto" 
            data-testid="text-testimonials-subtitle"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Feedback from clients and colleagues I've had the pleasure of working with.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full overflow-visible" data-testid={`card-testimonial-${testimonial.id}`}>
                  <CardContent className="p-6 space-y-4">
                    <Quote className="w-8 h-8 text-primary/30" />
                    
                    <p className="text-muted-foreground leading-relaxed" data-testid={`text-testimonial-content-${testimonial.id}`}>
                      "{testimonial.content}"
                    </p>

                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <Avatar className="w-10 h-10">
                        {testimonial.image ? (
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        ) : null}
                        <AvatarFallback className="text-sm">
                          {testimonial.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground text-sm" data-testid={`text-testimonial-name-${testimonial.id}`}>
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}