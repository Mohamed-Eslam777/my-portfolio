import { motion } from "framer-motion";

export function AccessibilitySkipLink() {
  return (
    <motion.a
      href="#main-content"
      className="sr-only focus:not-sr-only fixed top-4 left-4 z-[100] px-4 py-2 bg-primary text-primary-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      data-testid="skip-to-main-content"
    >
      Skip to main content
    </motion.a>
  );
}
