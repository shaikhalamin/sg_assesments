# RemoteRecruit - Home Page

Responsive React implementation of the RemoteRecruit assessment landing page based on the provided Figma design. The page recreates the RemoteRecruit home/features experience with a desktop and mobile layout, reusable React components, Tailwind CSS styling, optimized image assets, section reveal animations, hover transitions, and scroll-to-top behavior.

## Links

- Live site: https://jade-nasturtium-320737.netlify.app/
- GitHub repository: https://github.com/shaikhalamin/sg_assesments

## Features

- Responsive desktop, tablet, and mobile layouts
- Figma-matched hero, feature, pricing, FAQ, CTA, and footer sections
- Component-based structure for sections, cards, buttons, navigation, and shared UI
- Smooth section reveal animations with reduced-motion support
- Interactive hover/focus transitions for buttons, cards, and links
- Scroll-to-top button
- Optimized WebP image assets with lazy loading where appropriate
- Accessibility-minded markup, labels, focus states, and semantic sections

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- TanStack Router
- shadcn/ui button primitives
- anime.js for UI motion
- Netlify deployment

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm

### Installation

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

The Vite development server will print the local URL, usually:

```bash
http://localhost:5173/
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Deployment

The project is deployed on Netlify. The current production build is available at:

https://jade-nasturtium-320737.netlify.app/

Netlify uses the following build configuration:

```bash
npm run build
```

Publish directory:

```bash
dist
```

## Project Structure

```text
src/
  assets/              Optimized image assets
  components/          Reusable page sections and UI components
  components/ui/       Shared UI primitives
  routes/              TanStack Router route files
  App.tsx              Page composition
  index.css            Tailwind imports and global styles
```

## Known Issues and Limitations

- Authentication, sign-up, social links, and pricing actions are visual/demo interactions only.
- FAQ and profile data use mock content as requested for the assessment.
- The implementation focuses on the supplied page scope and does not include backend integration.
