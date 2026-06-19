# Animejs Scroll And Hover Animations Design

## Context

The landing page is a Vite React app with TanStack Router. Major page sections below the hero already use a shared `SectionReveal` wrapper from `src/components/shared.tsx`, while interactive controls use the local shadcn-style `Button` component plus ordinary anchors.

The requested change is to add smooth section reveal animations and richer hover transitions using the animejs library.

## Scope

Animate all major sections below the hero:

- Global Reach
- Fee-Free Forever
- Custom Profile
- Ready
- FAQ / Common Questions
- Pricing / Footer pricing layer

The hero and header should not receive an initial load animation as part of this change.

## Approach

Install `animejs` as a runtime dependency and use its `animate()` API for motion. Keep scroll visibility detection in React with `IntersectionObserver`, then trigger animejs when a `SectionReveal` element enters the viewport.

This keeps the page behavior centralized in the existing `SectionReveal` abstraction, avoids duplicating scroll logic across every section component, and gives React a clear cleanup boundary.

## Section Reveal Behavior

Each `SectionReveal` instance starts visually hidden with a small downward offset. When it enters the viewport, animejs animates it to visible:

- opacity: `0` to `1`
- translateY: about `28px` to `0`
- duration: about `720ms`
- easing: `outCubic`

Animations run once per section. Sections that are already in view on page load should reveal immediately. The implementation must avoid layout shifts by using opacity and transform only.

## Hover And Transition Behavior

Buttons and links should get subtle animejs-powered hover/focus motion:

- lift or scale slightly on pointer enter / focus
- return to rest on pointer leave / blur
- preserve existing color and background hover styles where they already exist
- avoid changing element dimensions or layout

This should apply to key interactive elements: header buttons, pricing buttons, Ready CTA, FAQ button, scroll-to-top button, brand link, and social links. The shared Button component is the preferred place for general button hover behavior; anchors that do not go through Button can opt into a small shared hook or helper.

## Reduced Motion

Respect `prefers-reduced-motion: reduce`.

When reduced motion is enabled, section content should render visible without animated movement, and hover behavior should avoid animated transform effects.

## Cleanup

All animejs animations and observers created by React effects must be cleaned up when components unmount. Pointer/focus event listeners added outside React props must also be removed.

## Testing And Verification

Run:

- `npm run build`
- `npm run lint`

If feasible, run the app locally and inspect the landing page in the browser to verify:

- below-hero sections fade/slide in on scroll
- hero/header are not initial-load animated
- buttons and links respond smoothly to hover/focus
- reduced-motion users do not get reveal movement
- no text overlap, layout shifts, or broken responsive behavior
