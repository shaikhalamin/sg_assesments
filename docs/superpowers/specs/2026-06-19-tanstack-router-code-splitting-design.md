# TanStack Router Code Splitting Design

## Objective

Convert the existing Vite, React, and TypeScript landing page project to TanStack Router while keeping the current landing page as the only route at `/`. The main goal is route-level code splitting through TanStack Router's Vite file-based routing integration.

## Current State

The app currently renders `App` directly from `src/main.tsx`. `src/App.tsx` contains the full RemoteRecruit landing page composition and imports all visible page sections. There is no existing router dependency, route tree, or route directory.

## Selected Approach

Use TanStack Router file-based routing with the Vite router plugin and `autoCodeSplitting: true`.

This keeps the setup aligned with TanStack's recommended Vite integration. The router plugin will generate `src/routeTree.gen.ts` from files in `src/routes`, and automatic code splitting will split non-critical route configuration such as the route component.

## Architecture

- `src/routes/__root.tsx` defines the root route and renders an `Outlet`.
- `src/routes/index.tsx` defines the only application route, `/`, and renders the existing landing page component.
- `src/main.tsx` creates a TanStack Router instance from the generated route tree and renders `RouterProvider`.
- `vite.config.ts` registers `tanstackRouter({ target: 'react', autoCodeSplitting: true })` before the React plugin.
- `src/App.tsx` remains responsible for the landing page UI so visual behavior stays unchanged.

## Dependencies

Add runtime dependency:

- `@tanstack/react-router`

Add development dependency:

- `@tanstack/router-plugin`

Do not add TanStack Router Devtools because the request is focused on production code splitting, and this project has no existing development tooling surface for router debugging.

## Generated Files

The TanStack Router Vite plugin will generate `src/routeTree.gen.ts`. This file is build output from route definitions and should not be edited manually.

ESLint should ignore `src/routeTree.gen.ts` so generated code does not create lint noise. TypeScript should still include it through the existing `src` include pattern so route types are available.

## Behavior

The public user experience remains the same:

- `/` renders the existing landing page.
- Header buttons and CTA buttons keep their current in-page scrolling behavior.
- Assets, CSS, sections, and accessibility markup remain unchanged unless a routing import path requires a mechanical update.

Direct requests for unknown paths are out of scope for this conversion. The project remains a static landing page with one route.

## Verification

Run:

- `npm run build`
- `npm run lint`
- `npm run test:visual`

Also inspect the Vite build output to confirm TanStack Router generated route-based chunks. The build should complete without TypeScript errors, lint errors, or visual contract failures.

## Scope Boundaries

This conversion does not add new pages, authentication, data loaders, route prefetch UI, search params, SSR, TanStack Start, or router devtools. It only introduces TanStack Router as the app shell and enables automatic route-level code splitting for the existing single landing route.
