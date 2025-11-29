# Personal Portfolio Website - Mohammed Maklad

## Overview

This is a modern, animated personal portfolio website showcasing Mohammed Maklad's work as an AI Specialist, LLM Trainer, and Full-Stack Developer. The application is a single-page website built with React and TypeScript, featuring smooth animations, responsive design, and a comprehensive display of projects, skills, and professional experience.

The portfolio includes sections for hero introduction, statistics, about/experience, projects gallery, skills taxonomy, testimonials, and contact information. The site emphasizes visual storytelling with animated backgrounds, typewriter effects, scroll progress indicators, and interactive project cards.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18+ with TypeScript, using Vite as the build tool and development server.

**Routing**: Wouter for lightweight client-side routing (single-page application with minimal routes).

**State Management**: TanStack Query (React Query) for server state management and data fetching. No complex global state management is needed since this is primarily a static portfolio site.

**UI Component Library**: Shadcn/ui components based on Radix UI primitives, providing accessible, customizable components following the "new-york" style variant.

**Styling**: Tailwind CSS with custom design tokens and CSS variables for theming. The design system uses a neutral base color scheme with support for dark mode via class-based theme switching.

**Animation Library**: Framer Motion for declarative animations including scroll-triggered animations, page transitions, typewriter effects, and interactive hover states.

**Design Philosophy**: Reference-based design drawing inspiration from premium developer portfolios (Brittany Chiang, Bruno Simon). Features asymmetric layouts, masonry grids, organic spacing, and dynamic visual hierarchy rather than generic grid-based layouts.

### Backend Architecture

**Server Framework**: Express.js with TypeScript running on Node.js.

**Server Architecture**: Simple REST API structure with modular route registration. The server primarily serves the built static frontend with a catch-all route for SPA support.

**Development Setup**: Hot module replacement (HMR) via Vite middleware in development mode. Separate build processes for client (Vite) and server (esbuild).

**Storage Interface**: Abstract storage interface (IStorage) with in-memory implementation (MemStorage). The interface supports CRUD operations for users but is not actively used in the current portfolio implementation.

**Session Management**: Configuration present for express-session with connect-pg-simple for PostgreSQL session storage, though not currently implemented in the portfolio.

### Data Storage

**Database**: Drizzle ORM configured for PostgreSQL with Neon serverless driver. Schema defines a users table with id, username, and password fields.

**Schema Management**: Drizzle Kit for schema migrations with push-based deployment strategy.

**Current Usage**: Database infrastructure is configured but not actively used in the portfolio site. The application currently displays static content embedded in React components.

**Future Considerations**: Database can be used to store dynamic portfolio content (projects, testimonials, skills) or implement user authentication for an admin panel.

### Design System

**Typography**: Google Fonts integration with modern sans-serif fonts (Inter, DM Sans, Geist Mono, Fira Code). Hierarchical type scale from text-sm to text-7xl.

**Spacing System**: Tailwind spacing units (4, 8, 12, 16, 24) used consistently throughout the application.

**Color System**: HSL-based color tokens with CSS variables for theme switching. Separate tokens for backgrounds, foregrounds, borders, and semantic colors (primary, secondary, muted, accent, destructive).

**Component Variants**: Class Variance Authority (CVA) for type-safe component variant management in UI components.

### External Dependencies

**UI Components**:
- @radix-ui/* - Comprehensive set of accessible, unstyled UI primitives (30+ component packages)
- cmdk - Command palette component
- embla-carousel-react - Carousel/slider functionality
- vaul - Drawer component

**Animation & Interaction**:
- framer-motion - Animation library for React
- class-variance-authority - Variant-based component styling
- clsx & tailwind-merge - Utility for conditional className construction

**Forms & Validation**:
- react-hook-form - Form state management
- @hookform/resolvers - Form validation resolvers
- zod - Schema validation
- drizzle-zod - Zod schema generation from Drizzle schemas

**Date Handling**:
- date-fns - Modern date utility library

**Icons**:
- lucide-react - Icon library with consistent styling

**Development Tools**:
- @replit/vite-plugin-* - Replit-specific development plugins for error overlays, cartographer, and dev banner

**Build Tools**:
- vite - Frontend build tool and dev server
- esbuild - Fast JavaScript bundler for server build
- tsx - TypeScript execution for build scripts
- tailwindcss & autoprefixer - CSS processing

### Deployment Architecture

**Build Process**: 
1. Client built with Vite to `dist/public`
2. Server bundled with esbuild to `dist/index.cjs` with selective dependency bundling
3. Static assets served from built public directory

**Environment Variables**: DATABASE_URL expected for PostgreSQL connection (required even though database is not actively used).

**Asset Management**: Static assets stored in `attached_assets` directory, aliased as `@assets` in Vite configuration. Includes CV/resume PDFs and generated project images.

**Production Server**: Express serves pre-built static files with fallback to index.html for SPA routing.