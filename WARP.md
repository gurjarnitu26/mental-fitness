# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a static HTML/CSS website focused on mental health awareness. The site provides educational content, crisis resources, and support guidance to help break the stigma around mental health issues.

## Architecture

**Simple Static Site Structure:**
- `index.html` - Single-page application with semantic sections (hero, about, resources, support)
- `styles.css` - Comprehensive stylesheet with responsive grid layouts and modern CSS features
- No build process, bundler, or JavaScript framework - pure HTML/CSS

**Design Architecture:**
- Mobile-first responsive design using CSS Grid and Flexbox
- Fixed header navigation with smooth scrolling to sections
- Component-based CSS organization (hero, about, resources, support sections)
- Consistent color scheme with primary colors: `#2c3e50` (dark blue), `#3498db` (blue), `#27ae60` (green)

## Development Commands

### Running the Site
```bash
# Open directly in browser (no server required)
start index.html
# OR for cross-platform
open index.html
```

### Development Server (Optional)
```bash
# If you need a local server for testing
python -m http.server 8000
# OR
npx serve .
```

### Validation and Testing
```bash
# HTML validation (requires html5validator)
html5validator index.html

# CSS validation (requires csstree-validator)
csstree-validator styles.css

# Lighthouse audit for accessibility/performance
lighthouse index.html --output html --output-path ./lighthouse-report.html
```

## Content Guidelines

**Critical Resource Information:**
- National Suicide Prevention Lifeline: 988
- Crisis Text Line: Text HOME to 741741  
- SAMHSA Helpline: 1-800-662-4357

When updating content, ensure:
- Crisis contact information remains current and accurate
- Supportive, non-judgmental tone is maintained throughout
- Accessibility standards are preserved (semantic HTML, sufficient color contrast)
- Responsive design works across all device sizes (320px+)

## Key Code Patterns

**CSS Architecture:**
- Uses CSS Grid for responsive layouts (`repeat(auto-fit, minmax())`)
- Consistent hover effects with `transform: translateY()` for interactive elements  
- CSS custom properties for consistent spacing and colors would improve maintainability
- BEM naming convention not used - consider implementing for larger changes

**HTML Structure:**
- Semantic sectioning (`<main>`, `<section>`, `<header>`, `<footer>`)
- Accessibility-focused with proper heading hierarchy
- Single-page navigation using anchor links

## Deployment

This is a static site that can be deployed to:
- GitHub Pages
- Netlify (drag-and-drop)
- Vercel
- Any static hosting service
- Local file system (file:// protocol)

No build step required - upload files directly.