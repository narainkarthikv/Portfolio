# Changelog

All notable changes to this portfolio are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

---

## [1.2.1] - 2026-08-29

### Changed

- Updated SEO metadata to use Associate Software Developer while preserving the software developer and full-stack hero animation.

[1.2.1]: https://github.com/narainkarthikv/Portfolio/releases/tag/v1.2.1

## [1.2.0] - 2026-08-27

### Added

- Added previous and next arrow controls for project case-study tabs, with keyboard-accessible tab navigation.
- Added contextual cursor interactions across links, cards, education, languages, certifications, project controls, and social links.
- Added interactive Luffy FAB pointer movement, rubber-like stretching, jelly-style hover bouncing, click feedback, and launch effects.

### Changed

- Restored the custom animated cursor for desktop fine-pointer devices while preserving native cursors on touch and smaller-screen devices.
- Updated social icons to use their individual brand colors from the profile data.
- Updated the About summary with clearer portfolio and SEO-oriented wording.
- Updated the scrollbar to follow the selected theme and use the theme accent color on hover.
- Restored the compact display name in the hero while retaining `fullName` for SEO metadata.
- Removed NodeJS from the main Skills section and kept HTML5, CSS3, JavaScript, and MongoDB out of Experience skills.

### Fixed

- Prevented the profile image from shrinking when the hero name wraps.
- Removed cursor effects from dense Skills and project technology-chip areas where they reduced clarity.
- Added cursor feedback to certification entries without verification links, including JLPT N5.

[1.2.0]: https://github.com/narainkarthikv/Portfolio/releases/tag/v1.2.0

## [1.1.0] - 2026-08-22

### Added

- Added shared page metadata for descriptive titles, canonical URLs, Open Graph previews, Twitter Cards, and JSON-LD Person/WebSite structured data.
- Added a branded 1200×630 social preview image for link sharing.
- Added Vercel-compatible `/robots.txt` and `/sitemap.xml` routes, including the portfolio, blog, and CV.
- Added a custom noindex `/404` page with links back to the portfolio and blog.

### Changed

- Updated the homepage identity and SEO copy to use “Full Stack Developer | Cloud & DevOps Enthusiast”.
- Updated the homepage E2E smoke test to match the intentional full-name heading and SEO title.

### Fixed

- Removed project-specific fallback description wording so shared metadata stays relevant to the portfolio as projects change.

[1.1.0]: https://github.com/narainkarthikv/Portfolio/releases/tag/v1.1.0

## [1.0.5] - 2026-08-11

### Fixed

- TypeScript: resolved implicit any and indexing errors in src/components/sections/Skills.astro by adding a Skill type, typing grouped collections and map callbacks, and guarding optional keywords. Validated with `npx astro check`.

---

## [1.0.4] - 2026-08-11

### Added

- Comprehensive favicons (SVG, PNG, ICO), mask-icon and Apple touch icon for improved browser/device support.
- Updated site.webmanifest with 192x192 and 512x512 app icons for PWA compatibility.
- Added msapplication tile metadata for Windows tiles.
- Certificate: "Building with the Claude API" (Anthropic) added to CV data with verification link.
- Certificate links: added Azure AZ-900 verification URL and Skilljar verification URL; JLPT N5 set to null (no link).
- Certifications component updated to make entries clickable when a URL is provided.

### Changed

- Layout and legacy index updated to reference new favicon assets and PWA metadata.
- Minor SEO/metadata improvements related to favicons and manifest integration.

---

## [1.0.2] - 2026-06-22

### Added

- Added a Chromium Playwright suite covering homepage smoke, theme switching, links, projects, and responsive layout.

### Fixed

- Fixed the homepage theme initializer so the active theme is applied safely at runtime.

### Changed

- Added `lint`, `test:e2e`, and `test:e2e:ui` package scripts for local validation.

[1.0.2]: https://github.com/narainkarthikv/Portfolio/releases/tag/v1.0.2

## [1.0.0] - 2026-03-05

Initial stable release of the personal portfolio, covering the evolution from the first commit to a production-ready Astro experience.

### Added

- Migrated from a static HTML/JS portfolio to an Astro-based architecture.
- Added Medium blog integration and a dedicated `/blog` page.
- Added Spotify integration and expanded profile content with certifications.
- Added Docker support for consistent local setup.
- Added domain/CNAME support and improved deployment readiness.
- Added stronger OSS/project documentation (contributing guides, templates, and repository governance docs).

### Changed

- Refined project cards, spacing, case-study tabs, and keyboard-based navigation.
- Improved typography and visual design language across the portfolio.
- Enhanced SEO practices, meta tags, and discoverability setup.
- Modernized legacy code paths and directory organization.
- Reworked CV/resume presentation and profile sections over multiple updates.

### Fixed

- Multiple UI/UX regressions across desktop/mobile layouts and section-level rendering.
- Build/package issues (`pnpm` and Astro-related config adjustments).
- RSS/JSON and content update issues.
- Theme and animation fixes, including dark mode and custom visual effects.
- Broken links and assorted content consistency fixes.

### Notes

- This release also restores a dedicated changelog after prior removal and aligns release history with current repository state.

[1.0.0]: https://github.com/narainkarthikv/Portfolio/releases/tag/v1.0.0

## [1.0.1] - 2026-06-04

### Fixed

- Prevent horizontal overflow for the Projects card back header on small screens by allowing the case study title to wrap. This fixes an issue where long titles (e.g. "Contribution Cards Case Study") caused the card to exceed the viewport width on mobile devices. ([src/components/sections/Projects.astro](src/components/sections/Projects.astro#L1))

[1.0.1]: https://github.com/narainkarthikv/Portfolio/releases/tag/v1.0.1
