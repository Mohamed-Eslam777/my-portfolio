import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/Mohamed-Eslam777", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/mohammed-maklad-469557381/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:mo7amed2slam77@gmail.com", label: "Email" },
    { icon: MessageCircle, href: "https://wa.me/201050586075", label: "WhatsApp" },
  ];

  return (
    <footer className="py-8 sm:py-12 border-t border-border bg-card/30 relative z-10" data-testid="footer">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="space-y-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <motion.h3 
                className="text-lg font-bold text-foreground" 
                data-testid="text-footer-brand"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Mohammed Maklad
              </motion.h3>
              <p className="text-sm text-muted-foreground">
                AI Specialist & Full-Stack Developer
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <motion.h4 
                className="text-sm font-semibold text-foreground" 
                data-testid="text-footer-links"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Quick Links
              </motion.h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#about" className="hover:text-primary transition-colors" data-testid="link-footer-about">
                    About
                  </a>
                </li>
                <li>
                  <a href="#projects" className="hover:text-primary transition-colors" data-testid="link-footer-projects">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#skills" className="hover:text-primary transition-colors" data-testid="link-footer-skills">
                    Skills
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-primary transition-colors" data-testid="link-footer-contact">
                    Contact
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.h4 
                className="text-sm font-semibold text-foreground" 
                data-testid="text-footer-social"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Follow Me
              </motion.h4>
              <div className="flex gap-3">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-background transition-colors"
                    data-testid={`link-footer-social-${link.label.toLowerCase()}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <link.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Bottom Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-muted-foreground">
            <p data-testid="text-copyright">
              © {currentYear} Mohammed Maklad. All rights reserved.
            </p>
            <p className="flex items-center gap-1" data-testid="text-built-with">
              Designed by <span className="font-bold text-primary">Mohammed Eslam Maklad</span> 
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}