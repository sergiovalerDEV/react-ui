# Changelog

## [0.1.0] - 2026-XX-XX

### Added
- Button component with dark/light theme support
- Theme system based on CSS custom properties
  (.theme-dark and .theme-light classes)
- Global SCSS design tokens (_variables.scss)
- Media query mixins (_breakpoints.scss)
- Global styles entry point (styles/index.scss)
- Responsive styles at 768px and 480px breakpoints

### Architecture
- Theme is controlled by the consumer via className on the root element
- Components consume var(--color-accent) — no theme prop needed
- Fonts stack uses system fallbacks (SF Pro Display + -apple-system)

## [0.0.1] - 2025-XX-XX

### Added
- Initial project setup
- Vite configured in library mode
- TypeScript configured
- Base folder structure
- SCSS architecture ready for component development