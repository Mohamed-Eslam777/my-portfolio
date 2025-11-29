import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Github, Linkedin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { MagneticWrapper } from "@/components/MagneticWrapper";

export function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 relative z-10" data-testid="section-contact">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" className="px-3 py-1 text-xs sm:text-sm" data-testid="badge-availability">
            Open to new opportunities
          </Badge>
        </motion.div>

        <motion.div
          className="space-y-3 sm:space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground" 
            data-testid="text-contact-title"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.h2>
          <motion.p 
            className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto" 
            data-testid="text-contact-subtitle"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            I'm open to new opportunities. Whether you have a project in mind, need AI/data annotation expertise, or just want to connect - feel free to reach out!
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="overflow-visible" data-testid="card-contact">
            <CardContent className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
              <MagneticWrapper strength={0.25}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <a 
                    href="mailto:mo7amed2slam77@gmail.com"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 bg-primary text-primary-foreground border border-primary-border min-h-10 rounded-md px-8 w-full sm:w-auto text-sm sm:text-base"
                    data-testid="button-email-me"
                  >
                    <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    mo7amed2slam77@gmail.com
                  </a>
                </motion.div>
              </MagneticWrapper>

              <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button size="sm" variant="outline" asChild className="text-xs sm:text-sm" data-testid="link-contact-linkedin">
                    <a href="https://www.linkedin.com/in/mohammed-maklad-469557381/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      LinkedIn
                    </a>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button size="sm" variant="outline" asChild className="text-xs sm:text-sm" data-testid="link-contact-github">
                    <a href="https://github.com/Mohamed-Eslam777" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      GitHub
                    </a>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button size="sm" variant="outline" asChild className="text-xs sm:text-sm" data-testid="link-contact-whatsapp">
                    <a href="https://wa.me/201050586075" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      WhatsApp
                    </a>
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}