import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, Download } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PERSONAL_INFO } from "@/lib/data";
import confetti from "canvas-confetti";

const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Experience", path: "/experience" },
  { label: "Skills", path: "/skills" },
  { label: "Services", path: "/services" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2"
          onClick={(e) => {
            e.preventDefault();
            confetti({ spread: 180, particleCount: 200, origin: { y: 0.6 } });
            setTimeout(() => window.location.href = '/', 500);
          }}
        >
          {/* Logo */}
          <div className="relative h-8 w-8 overflow-hidden rounded-md bg-primary/20">
            <img
              src={PERSONAL_INFO.assets.logo}
              alt="Logo"
              className="h-full w-full object-cover"
              onError={(e) => {
                // Fallback if image fails
                (e.target as HTMLImageElement).style.display = 'none';
                ((e.target as HTMLImageElement).nextSibling as HTMLElement).style.display = 'flex';
              }}
            />
            <div className="hidden absolute inset-0 items-center justify-center font-bold text-primary">
              M
            </div>
          </div>
          <span className="font-heading font-bold text-lg tracking-tight">Mohamed.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive(item.path)
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="h-6 w-px bg-border mx-2" />
          <Link href="/contact">
            <Button variant="default" size="sm" className="font-semibold">
              Contact Me
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t bg-background animate-in slide-in-from-top-5">
          <div className="container mx-auto py-4">
            <div className="flex flex-col space-y-3">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "text-base font-medium transition-colors hover:text-primary p-3 rounded-md hover:bg-muted",
                    isActive(item.path) ? "text-primary bg-primary/10" : "text-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <Button className="w-full mt-2">Contact Me</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
