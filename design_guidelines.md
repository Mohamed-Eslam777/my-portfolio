# Design Guidelines: Personal Portfolio Website

## Design Approach
**Reference-Based Strategy**: Drawing inspiration from premium developer portfolios (Brittany Chiang, Bruno Simon) and creative platforms (Dribbble, Awwwards) - emphasizing visual storytelling and project showcase over traditional corporate layouts.

## Layout System
**Spacing**: Use Tailwind units of 4, 8, 12, 16, 24 consistently. Hero: py-24 to py-32. Content sections: py-16 to py-24. Component spacing: gap-8 to gap-12.

## Typography Hierarchy
- **Display**: Large, bold headlines (text-5xl to text-7xl) for hero name/title
- **Headings**: Section titles (text-3xl to text-4xl), medium weight
- **Body**: Project descriptions and about text (text-lg to text-xl), regular weight
- **Labels**: Skills tags and metadata (text-sm to text-base), slightly lighter weight
- **Font Stack**: Google Fonts - one modern sans-serif (Inter/Plus Jakarta Sans) for headings, same or complementary for body

## Page Structure

### Hero Section (Full viewport ~90vh)
**Layout**: Asymmetric split with large profile photo occupying 40% right side, intro content left-aligned on remaining space. Not centered - creates dynamic tension.

**Images**: Professional headshot or creative portrait (800x800px minimum), high-quality with subtle blur/gradient overlay behind text areas. Portrait should have depth/personality - not corporate mugshot style.

**Content**: Name (text-6xl), role/tagline (text-2xl), brief value prop (text-lg), dual CTAs (View Projects + Contact).

### Projects Gallery (Primary Focus)
**Layout**: Masonry grid on desktop (2-column uneven heights), single column mobile. Each project card includes:
- Full-width project screenshot/mockup image (16:9 aspect ratio)
- Technology badges row (flex-wrap with gap-2)
- Project title (text-2xl)
- Description paragraph (3-4 lines, text-base)
- Links row: Live Demo + GitHub (if applicable)

**Images**: 6-8 project screenshots - diverse mix showing web apps, designs, or code interfaces. High-quality, showing actual work in context (browser mockups, device frames).

Avoid generic three-column grids. Stagger cards with varying heights based on content.

### About/Skills Section
**Layout**: Two-column desktop (60/40 split) - About narrative left, Skills taxonomy right.

**About**: Personal story, background, what drives you (max-width prose for readability).

**Skills**: Grouped by category (Frontend, Backend, Tools) with visual badges/pills. Not a boring list - use varying sizes based on proficiency, clustered organically.

### Contact Section
**Layout**: Clean, centered design with primary email CTA, social links row (GitHub, LinkedIn, Twitter), optional contact form alternative.

Not a massive footer - keep focused and purposeful. Include "Currently available for opportunities" or similar status indicator.

## Component Library

**Project Cards**: Elevated cards with subtle shadow, hover lift effect, image fills card top, content padded below. Technology badges use rounded-full pills.

**Navigation**: Sticky header with logo/name left, navigation links right (About, Projects, Skills, Contact). Smooth scroll to sections. Mobile: Hamburger menu.

**Buttons**: Primary CTA (solid, larger), Secondary (outline/ghost). On hero image: background blur/glass morphism effect (backdrop-blur-md bg-white/10).

**Badges**: Rounded pills for technologies, minimal padding, no icons (keep clean).

## Images Reference
1. **Hero**: Personal portrait/headshot - professional but approachable, good lighting
2. **Project Gallery (6-8 images)**: Screenshots of actual projects - web interfaces, mobile apps, design mockups. Show variety of work types.

Critical: All images should be authentic work examples, not stock photos or placeholders.

## Animations
Minimal and purposeful only:
- Scroll-triggered fade-in for project cards (stagger effect)
- Smooth scroll navigation
- Subtle hover states on cards/buttons

## Key Differentiators
- Asymmetric hero breaks traditional centered pattern
- Masonry project grid instead of uniform cards
- Organic skill badge clustering vs. boring lists
- Focus on large, quality project images
- Personal narrative over corporate speak

**Mobile Strategy**: Stack all multi-column layouts to single column, maintain generous spacing (py-12), hero at 70vh mobile.