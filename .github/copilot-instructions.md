# GitHub Copilot Coding Agent Instructions

## Purpose

These instructions onboard GitHub Copilot Coding Agent to the Personal Portfolio repository.
Follow this document as the single source of truth for understanding the codebase, architecture, and development practices. Only search the repository if information here is missing or incorrect.

---

## Repository Summary

**Personal Portfolio** is a modern, responsive web application built with Astro, showcasing professional experience, skills, projects, and achievements. It serves as a digital resume and portfolio for Narain Karthik Vellingiri, a Full-Stack Developer.

Key features:

- Interactive sections for Hero, About, Experience, Skills, Projects, Certifications, Education, and Languages
- Dark/Light theme support with smooth transitions
- Custom cursor interactions and hover effects
- Responsive design optimized for all devices
- Keyboard navigation and accessibility features
- Static site generation for optimal performance
- Deployable to multiple platforms (Vercel, Netlify, Cloudflare)

The project is a single-page application using Astro's static site generation, with React components for interactivity.

---

## High-Level Repository Information

- **Repository Size**: Small to Medium (frontend-only, component-based architecture)
- **Primary Language**: TypeScript/JavaScript
- **Framework**: Astro 5.x with React integration
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite (via Astro)
- **Deployment**: Static site (Vercel, Netlify, Cloudflare Pages)
- **Key Libraries**:
  - Astro Icon for icon management
  - Framer Motion for animations
  - GSAP for advanced animations
  - Tailwind Typography for rich text
  - Custom contextCursor for interactive effects

---

## Environment Requirements

### Runtime Versions

- **Node.js**: 18.x or newer
- **npm**: 9.x or newer (or pnpm/yarn)
- **Astro**: 5.x

### Development Setup

No complex environment setup required. The project uses static data from `cv.json`.

### Environment Files

- No environment variables required for basic development
- Optional: Configure deployment-specific variables for different platforms

---

## Build & Validation Instructions

### Development Server

```bash
npm run dev
```

- Runs on `http://localhost:4321`
- Hot reload enabled
- Includes all interactive features

### Production Build

```bash
npm run build
```

- Generates static files in `dist/`
- Includes TypeScript checking with `astro check`
- Optimized for production deployment

### Preview Production Build

```bash
npm run preview
```

- Serves the built site locally for testing

### Type Checking

```bash
npx astro check
```

- Validates TypeScript and Astro components
- Run before commits

### Linting & Formatting

- Uses Prettier with Astro and Tailwind plugins
- Configured in `prettier.config.mjs`
- Run formatting on save in your editor

---

## Project Architecture & Layout

### Repository Root

```
/
├── src/
│   ├── components/
│   │   ├── sections/          # Page sections (Hero, About, Experience, etc.)
│   │   ├── Section.astro      # Base section wrapper
│   │   ├── SEO.astro          # SEO meta tags
│   │   ├── ThemeSwitch.astro  # Theme toggle
│   │   └── ...                # Other UI components
│   ├── layouts/
│   │   └── Layout.astro       # Main page layout
│   ├── lib/
│   │   └── contextCursor/     # Custom cursor interaction system
│   ├── pages/
│   │   ├── index.astro        # Homepage
│   │   ├── blog.astro         # Blog page (if enabled)
│   │   └── ...                # Other pages
│   ├── scripts/               # Client-side scripts
│   ├── styles/                # Global styles
│   └── types/                 # TypeScript definitions
├── public/                    # Static assets
├── cv.json                    # Portfolio data
├── astro.config.mjs           # Astro configuration
├── tailwind.config.mjs        # Tailwind configuration
└── package.json
```

### Component Architecture

- **Astro Components**: Server-side rendered, used for layout and static content
- **React Components**: Client-side interactive elements (rarely used)
- **Hybrid Approach**: Astro handles most rendering, React for complex interactions

### Data Flow

- Static data from `cv.json` imported via `@cv` alias
- No state management library (simple static site)
- Theme state managed via CSS custom properties and localStorage

---

## Coding Standards

### General

- **Language**: TypeScript preferred, JavaScript acceptable for simple scripts
- **Formatting**: Prettier with 2-space indentation
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Imports**: Use `@/` aliases for src directory
- **File Extensions**: `.astro` for components, `.ts` for scripts

### Astro Components

- Use frontmatter for data fetching and props
- Prefer server-side rendering over client-side JavaScript
- Use `client:load` or `client:idle` sparingly for interactivity
- Keep components focused and reusable

### React Components (if used)

- Functional components with hooks
- No class components
- Use TypeScript for type safety

### Styling

- **Primary**: Tailwind CSS utility classes
- **Custom CSS**: Use `globals.css` for global styles
- **Design Tokens**: Use CSS custom properties for themes
- **Responsive**: Mobile-first approach with `sm:`, `md:`, `lg:` prefixes

### Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance

---

## UI/UX Guidelines

### Design Philosophy

- **Modern & Minimal**: Clean, professional aesthetic
- **Interactive**: Subtle animations and hover effects
- **Responsive**: Seamless experience across devices
- **Performance**: Optimized for fast loading and smooth interactions

### Visual Design

- **Color Scheme**: Blue theme with dark/light mode support
- **Typography**: Roboto Condensed for headings, system fonts for body
- **Spacing**: Consistent use of Tailwind spacing scale
- **Animations**: Smooth transitions, no jarring effects

### Interaction Design

- **Cursor Effects**: Custom contextCursor for enhanced hover states
- **Hover States**: Lift, scale, and color transitions
- **Theme Switching**: Smooth theme transitions with persistence
- **Keyboard Navigation**: Full keyboard accessibility

### Component Patterns

- **Section Components**: Each major section in `src/components/sections/`
- **Base Components**: Reusable elements like buttons, cards
- **Layout Components**: Consistent spacing and structure

### User Experience

- **Loading**: Fast static generation, no loading states needed
- **Navigation**: Smooth scrolling, anchor links
- **Content**: Scannable, well-structured information hierarchy
- **Mobile**: Touch-friendly interactions, readable text sizes

---

## Component Development Guidelines

### Creating New Sections

1. Create component in `src/components/sections/`
2. Import data from `@cv`
3. Use `Section.astro` wrapper for consistent styling
4. Add to `src/pages/index.astro`

### Adding Interactive Elements

1. Use `data-ccursor` attributes for cursor effects
2. Add appropriate ARIA labels
3. Test keyboard navigation
4. Ensure responsive behavior

### Styling New Components

1. Use Tailwind utility classes primarily
2. Add custom classes to `globals.css` if needed
3. Follow existing color and spacing patterns
4. Test in both light and dark themes

### Animation Guidelines

1. Use CSS transitions for simple effects
2. Framer Motion for complex animations
3. GSAP for advanced sequencing
4. Respect `prefers-reduced-motion`

---

## Deployment & CI/CD

### Supported Platforms

- **Vercel**: `npm run deploy:vercel`
- **Netlify**: Standard static site deployment
- **Cloudflare Pages**: `npm run deploy:cloudflare`

### Build Optimization

- Image optimization via Astro
- CSS minification and purging
- JavaScript bundling with Vite
- Compression enabled

### Performance

- Static generation for instant loading
- Optimized images and assets
- Minimal JavaScript footprint
- Core Web Vitals optimized

---

## Common Issues & Solutions

### Build Failures

- Ensure Node.js 18+
- Check TypeScript errors with `astro check`
- Verify all imports are correct

### Styling Issues

- Clear Tailwind cache if needed
- Check for conflicting CSS classes
- Test in both themes

### Interactive Elements

- Ensure `data-ccursor` scripts load properly
- Test cursor effects on different devices
- Verify keyboard accessibility

---

## Agent Guidance

### Development Workflow

- Always run `npm run build` before committing
- Test changes in both light and dark themes
- Verify responsive design on multiple screen sizes
- Check accessibility with keyboard navigation

### Code Quality

- Follow existing patterns and conventions
- Keep components small and focused
- Use TypeScript for new code
- Add comments for complex logic

### Architecture Decisions

- Prefer Astro over React for new components
- Use static data from `cv.json` for content
- Maintain separation between layout and content
- Keep the codebase simple and maintainable

### When to Ask for Help

- Major architectural changes
- Complex animations or interactions
- Integration with new libraries
- Performance optimizations

---

## End of Instructions
