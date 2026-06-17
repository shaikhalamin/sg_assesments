# RemoteRecruit Landing Page Design

## Objective

Build a responsive RemoteRecruit landing page in the existing Vite, React, and TypeScript app that closely matches `supporting_files/RemoteRecruit - Features.png` across desktop, tablet, and mobile widths. The page must use reusable components, preserve visual fidelity, provide smooth section reveal animations, support smooth in-page CTA scrolling, include a scroll-to-top button, and remain performant and accessible.

## Source Assets

- Primary visual reference: `supporting_files/RemoteRecruit - Features.png`
- Design source: `supporting_files/Design.fig`
- Reusable logo and illustration assets: SVG and PNG files in `supporting_files/`

Complex dashboard, profile, card, and brand visuals should use the provided exported assets when that produces better fidelity and sharper rendering than manual CSS recreation. Text, layout, navigation, buttons, cards, FAQ content, pricing content, section spacing, and responsive behavior should be real HTML/CSS rather than a single flat screenshot.

## Architecture

The implementation will replace the Vite starter content with a component-based landing page. Components will be scoped by responsibility:

- `Header`: logo, sign-in link, sign-up button, and top navigation layout.
- `HeroSection`: dark blue hero block with title, subtitle, soft circular background forms, and wave transition into the content area.
- `FeatureSection`: reusable alternating layout for feature copy and visual art.
- `HelpCtaSection`: pale blue/lavender band with dashboard visual, CTA heading, supporting text, and `Get Started` button.
- `FaqSection`: Common Questions heading, mock FAQ content matching the screenshot, and `More Questions` button.
- `PricingSection`: final pricing call-to-action with reusable `PricingCard` components.
- `Footer`: dark blue footer, RemoteRecruit logo, social icon buttons, and background decorative forms.
- Shared UI components: `Button`, `Pill`, `SectionReveal`, `DecorativeDot`, `PricingCard`, and `ScrollToTopButton`.

Data-driven arrays should hold repeated feature, FAQ, pricing, and social-link content so the JSX stays readable and reusable.

## Visual Direction

The page should use the screenshot as the visual source of truth:

- Primary dark blue hero/footer background, medium blue accents, light cyan badges, white page background, and pale lavender-blue CTA band.
- Rounded cards with soft blue-tinted shadows and small circular logo overlays.
- Wide desktop composition with generous vertical whitespace and alternating two-column feature rows.
- The large white wave between hero and first feature should be recreated responsively with CSS or SVG.
- Typography should match the screenshot as closely as possible using available web-safe or bundled font choices. If the exact source font is unavailable, use a close geometric sans-serif fallback with matching weight, size, and line-height.
- Decorative circles/dots should be responsive and must never obscure text or controls.

## Responsive Behavior

The page will be designed for three major ranges:

- Desktop: preserve the reference composition closely, with centered content, two-column feature rows, and wide hero/footer treatments.
- Tablet: keep two-column sections where space allows, reduce gutters and illustration scale, and maintain the original visual rhythm.
- Mobile: stack sections vertically, place visuals after their related copy where appropriate, keep CTA and pricing cards readable, avoid overlapping decorative elements, and preserve sharp image rendering through responsive `srcSet` or SVG assets.

Fixed-format UI elements such as cards, badges, buttons, visual containers, and pricing blocks will use stable dimensions, `max-width`, `aspect-ratio`, and responsive constraints to prevent layout shifts.

## Interactions

- All CTA links and buttons should smooth-scroll to relevant in-page anchors.
- `Sign up` and `Get Started` scroll to the pricing section.
- `Sign in` scrolls to the top or hero section because this is a static landing page.
- `More Questions` scrolls to the FAQ section or remains anchored there if already visible.
- Section reveals use Intersection Observer for subtle fade-in and slide-up effects.
- Hover and focus states should be implemented for buttons, links, pricing cards, and social icons.
- Motion must respect `prefers-reduced-motion`.
- The scroll-to-top button appears after the user scrolls down and returns to the hero/top smoothly.

## Accessibility

- Use semantic `header`, `main`, `section`, `article`, `footer`, and heading structure.
- Provide accessible names for buttons and links.
- Mark decorative images and decorative SVGs as hidden from assistive technologies.
- Provide meaningful `alt` text for actual product/interface visuals.
- Maintain visible focus states and sufficient text contrast.
- Avoid animation that is required to understand content.

## Performance

- Lazy-load non-critical images.
- Prefer SVG assets where available for crisp rendering.
- Use responsive image dimensions to avoid cumulative layout shift.
- Avoid heavy animation libraries; use CSS transitions and a small Intersection Observer helper.
- Keep CSS scoped and remove unused starter styles/assets from the rendered app.
- Verify with `npm run build` and `npm run lint`.

## Testing And Verification

Verification should include:

- `npm run lint`
- `npm run build`
- Manual responsive checks at representative mobile, tablet, and desktop widths.
- Browser inspection for no text overlap, no clipped controls, no broken image assets, smooth scrolling, section reveal behavior, and scroll-to-top behavior.

The intended Lighthouse target is at least 90 for Performance and Accessibility. The implementation should be structured to support that target, with final confirmation depending on the local browser audit environment.

## Scope Boundaries

This project is a static landing page only. It will not add authentication, external routing, backend calls, form submission, analytics, or a CMS. All visible body copy, FAQ content, and pricing content should match the screenshot unless the provided assets require small accessibility-only text adjustments such as hidden labels.
