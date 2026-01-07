# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for BIGDEALIO, an AI-powered micro-SaaS solutions company. The site showcases services, fractional CTO offerings, and professional background of Jeff Wray. It's built as a simple static HTML/CSS/JavaScript website using Tailwind CSS and Alpine.js.

## Architecture

**Technology Stack:**
- Static HTML files (no build process required)
- Tailwind CSS (loaded via CDN)
- Alpine.js for interactive components (loaded via CDN)
- Lottie animations for visual elements
- SVG assets for logos and icons

**File Structure:**
- `index.html` - Main landing page with company overview, expertise, and contact
- `about-jeff.html` - Detailed biography and professional timeline for Jeff Wray
- `fractional-cto.html` - Dedicated page for Fractional CTO services
- Logo files: `logo-for-light-bg.svg`, `logo-for-dark-bg.svg`, `FRACTIONALCTOLOGO-blk.svg`
- Images: `jeff-wray-fractional-cto-florida.jpg` (Jeff's photo), other supporting assets

## Key Features

**Interactive Elements:**
- Alpine.js toggles for collapsible content (family heritage timeline, career milestones)
- Responsive navigation with mobile hamburger menu
- Smooth scrolling navigation between page sections
- Hover effects on cards and interactive elements

**Design System:**
- Primary brand colors: Dark (`#0D2432`) and Red (`#EF4136`)
- Manrope font family for consistent typography
- Card-based layout with hover animations
- Responsive design using Tailwind's grid and flex utilities

## Development Notes

**No Build Process:** This is a purely static site - files can be edited directly and viewed in browser without compilation steps.

**External Dependencies:** All CSS/JS frameworks are loaded via CDN, making the site lightweight and easy to deploy.

**Content Management:** All content is hardcoded in HTML files. Updates require direct file editing.

**Responsive Design:** Uses Tailwind's responsive utilities (`md:`, `lg:`) for mobile-first responsive layouts.

## Brand Guidelines

- Uses professional, technical language appropriate for B2B technology services
- Emphasizes expertise in AI, compliance, and enterprise solutions
- Maintains consistent color scheme throughout all pages
- Focuses on trust, transparency, and technical competency