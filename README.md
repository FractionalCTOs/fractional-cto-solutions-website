# Fractional CTO Solutions Website

Static website for Fractional CTO Services built with Eleventy (11ty), Tailwind CSS, and Alpine.js.

## Technology Stack

- **Static Site Generator**: Eleventy (11ty) v3.1.2
- **CSS Framework**: Tailwind CSS (via CDN)
- **JavaScript**: Alpine.js (via CDN)
- **Analytics**: Google Analytics 4 (GA4)
- **Template Engine**: Liquid

## Project Structure

```
fractional-cto-solutions-website/
├── _includes/              # Reusable template partials
│   ├── header.liquid       # Navigation component
│   └── footer.liquid       # Footer component
├── _site/                  # Built output (generated, not committed)
├── blog/                   # Blog posts
├── *.html                  # Page templates
├── *.svg, *.png            # Static assets
├── .eleventy.js            # Eleventy configuration
├── package.json            # Node dependencies
└── README.md               # This file
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server with live reload
npm start

# Or use the serve command
npm run serve
```

The site will be available at `http://localhost:8080` with hot reload enabled.

### Build

```bash
# Build for production
npm run build
```

Output will be in the `_site/` directory.

## Using Eleventy Templates

### Page Structure with Includes

Each HTML page can use the header and footer includes:

```html
---
activePage: pageName
---
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Your meta tags, title, etc. -->
</head>
<body>

{% include "header.liquid" %}

  <!-- Your page content here -->

{% include "footer.liquid" %}

</body>
</html>
```

### Active Page Highlighting

Set the `activePage` variable in the frontmatter to highlight the correct navigation menu item:

- `home` - Highlights "Home"
- `fractional-cto` - Highlights "Fractional CTO"
- `about` - Highlights "About Jeff"
- `developers` - Highlights "For Developers"

**Example:**

```html
---
activePage: developers
---
<!DOCTYPE html>
...
```

### Updating Navigation or Footer

To update the navigation or footer across all pages:

1. Edit `_includes/header.liquid` for navigation changes
2. Edit `_includes/footer.liquid` for footer changes
3. Run `npm run build` to rebuild all pages

## Deployment

### GitHub Pages

1. Build the site: `npm run build`
2. The `_site/` directory contains the static files
3. Deploy `_site/` to GitHub Pages or your hosting provider

**Important:** Make sure to copy these files from the root to `_site/`:
- `CNAME` (for custom domain)
- `sitemap.xml`
- All image/logo files (`.svg`, `.png`, `.jpg`)

These are automatically copied via the `.eleventy.js` configuration.

## File Naming Conventions

- **Logo for light backgrounds**: `FRACTIONALCTOLOGO-pmg.png` (darker logo)
- **Logo for dark backgrounds**: `FRACTIONALCTOLOGO-blk.svg` (lighter logo)

The navigation uses the pmg.png logo (dark), and the footer uses the blk.svg logo (light).

## Google Analytics Tracking

GA4 tracking ID: `G-ZF11844YR0`

### Standard Page Views

All pages include the GA4 tag in the `<head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ZF11844YR0"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-ZF11844YR0');
</script>
```

### Interactive Tool Tracking

Calculator and assessment pages track:
- `calculator_loaded` - Tool initialization
- `calculator_interaction` - User interactions
- `high_intent_signal` - Qualified lead signals
- `assessment_completed` - Assessment completions

See individual tool pages for specific event tracking implementation.

## Content Pages

### Main Pages
- `index.html` - Homepage
- `fractional-cto.html` - Services page
- `about-jeff.html` - About page
- `for-development-teams.html` - Developer-facing information

### Interactive Tools
- `true-cost-calculator.html` - Hidden technology cost calculator
- `developer-accountability-score.html` - Code ownership assessment
- `mythical-man-month-explained.html` - Communication overhead calculator (embedded)
- `how-to-choose-fractional-cto.html` - Pricing comparison calculator (embedded)

### Resources
- `developer-accountability-checklist.html` - Checklist for evaluating developers
- `blog/` - Blog articles

## SEO

- **Sitemap**: `sitemap.xml` (manually maintained)
- **Schema.org**: Implemented on all pages
- **Open Graph & Twitter Cards**: Configured on all pages
- **Canonical URLs**: Set on all pages

## Scripts

- `npm run build` - Build production site to `_site/`
- `npm run serve` - Start development server with live reload
- `npm start` - Alias for `npm run serve`

## Notes

- The site uses CDN-loaded Tailwind and Alpine.js (no build process for CSS/JS)
- All pages are static HTML processed by Eleventy
- Eleventy ignores `node_modules/`, `package.json`, and `.backup` files
- The `_site/` directory is generated and should not be edited directly

## Migration Status

### Completed
- ✅ Eleventy installed and configured
- ✅ Header and footer partials created
- ✅ Example page (`for-development-teams-new.html`) converted to use includes

### Pending
- [ ] Migrate remaining pages to use header/footer includes
- [ ] Update build/deploy process to use Eleventy output
- [ ] Add automated sitemap generation

## Support

For questions or issues, contact Jeff Wray or refer to:
- [Eleventy Documentation](https://www.11ty.dev/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Alpine.js Documentation](https://alpinejs.dev/)
