import { PageHeader } from "@/components/PageHeader";
import { PERSONAL_INFO } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Linkedin, Github, Send, Phone, MessageCircle } from "lucide-react";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { PageReveal } from "@/components/PageReveal";

// EmailJS Configuration - Replace these with your actual EmailJS credentials
// Get these from: https://dashboard.emailjs.com/
const EMAILJS_SERVICE_ID = "service_3ll5x6v";
const EMAILJS_TEMPLATE_ID = "template_xqzvgkq";
const EMAILJS_PUBLIC_KEY = "jV9nLVFOumOttPBFv";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | null;
    text: string;
  }>({ type: null, text: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    setIsLoading(true);
    setStatusMessage({ type: null, text: "" });

    try {
      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );

      setStatusMessage({
        type: "success",
        text: "Message sent successfully! I'll get back to you soon.",
      });

      // Clear form after successful submission
      formRef.current.reset();
    } catch (error) {
      setStatusMessage({
        type: "error",
        text: "Failed to send message. Please try again or email me directly.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageReveal>
      <div>
        <PageHeader
          title="Contact Me"
          description="Let's discuss your project or just say hello."
        />

        <div className="container mx-auto py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold font-heading mb-6">Get in Touch</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  I'm currently open to new opportunities and freelance projects. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <a href="mailto:2ngmo7amed2slam@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                      2ngmo7amed2slam@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Phone</div>
                    <div className="text-muted-foreground">{PERSONAL_INFO.phone}</div>
                  </div>
                  <a
                    href="https://wa.me/201050586075"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-muted-foreground">{PERSONAL_INFO.location}</div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t">
                <h3 className="font-semibold mb-4">Connect on Social Media</h3>
                <div className="flex gap-4">
                  <a
                    href={PERSONAL_INFO.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="h-10 w-10 rounded-full bg-background border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={PERSONAL_INFO.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="h-10 w-10 rounded-full bg-background border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            <Card className="border-border/50 shadow-lg">
              <CardContent className="p-8">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      required
                      disabled={isLoading}
                      className="h-12 bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      disabled={isLoading}
                      className="h-12 bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project..."
                      required
                      disabled={isLoading}
                      className="min-h-[150px] bg-background/50 resize-none"
                    />
                  </div>

                  {statusMessage.type && (
                    <div
                      className={`p-4 rounded-lg text-sm ${statusMessage.type === "success"
                        ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                        : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
                        }`}
                    >
                      {statusMessage.text}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-12 text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="animate-pulse">Sending...</span>
                      </>
                    ) : (
                      <>
                        Send Message <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageReveal>
  );
}
