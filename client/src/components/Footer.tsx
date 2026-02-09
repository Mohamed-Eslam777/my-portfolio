import { Link } from "wouter";
import { PERSONAL_INFO } from "@/lib/data";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="font-heading font-bold text-xl tracking-tight mb-4 inline-block">
              Mohamed Eslam Maklad
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6 leading-relaxed">
              Full-Stack AI Engineer building the bridge between complex algorithms and intuitive user experiences.
            </p>
            <div className="flex gap-4">
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                className="h-10 w-10 rounded-full bg-background border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="h-10 w-10 rounded-full bg-background border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <Link href="/contact">
                <a className="h-10 w-10 rounded-full bg-background border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Navigation</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/projects" className="hover:text-primary transition-colors">Projects</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/resume" className="hover:text-primary transition-colors">Resume</Link></li>
              <li><Link href="/reviews" className="hover:text-primary transition-colors">Client Reviews</Link></li>
              <li><a href={PERSONAL_INFO.socials.mostaql} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Mostaql Profile</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {year} Mohamed Eslam Maklad. All rights reserved.</p>
          <p>Designed & Built with React & Tailwind</p>
        </div>
      </div>
    </footer>
  );
}
