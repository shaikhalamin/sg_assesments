# TanStack Router Code Splitting Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the existing single-page Vite React app to TanStack Router file-based routing with automatic route code splitting.

**Architecture:** The existing landing page remains in `src/App.tsx` and becomes the component for the only file route at `/`. TanStack Router owns the app shell through `RouterProvider`, with the Vite router plugin generating `src/routeTree.gen.ts` and splitting the route component.

**Tech Stack:** Vite, React 19, TypeScript, TanStack Router, TanStack Router Vite plugin, existing Node visual contract script.

---

### Task 1: Add A Router Conversion Contract

**Files:**
- Modify: `scripts/visual-contract.mjs`

- [ ] **Step 1: Write the failing contract check**

Add these reads near the existing source reads:

```js
const mainEntry = readFileSync('src/main.tsx', 'utf8')
const viteConfig = readFileSync('vite.config.ts', 'utf8')
const rootRouteSource = existsSync('src/routes/__root.tsx')
  ? readFileSync('src/routes/__root.tsx', 'utf8')
  : ''
const indexRouteSource = existsSync('src/routes/index.tsx')
  ? readFileSync('src/routes/index.tsx', 'utf8')
  : ''
```

Add this check to the `checks` array:

```js
{
  name: 'app uses TanStack Router file routing with automatic code splitting',
  pass:
    viteConfig.includes("from '@tanstack/router-plugin/vite'") &&
    viteConfig.includes('tanstackRouter({') &&
    viteConfig.includes("target: 'react'") &&
    viteConfig.includes('autoCodeSplitting: true') &&
    viteConfig.indexOf('tanstackRouter({') < viteConfig.indexOf('react()') &&
    mainEntry.includes("from '@tanstack/react-router'") &&
    mainEntry.includes("from './routeTree.gen'") &&
    mainEntry.includes('createRouter({') &&
    mainEntry.includes('<RouterProvider router={router} />') &&
    rootRouteSource.includes('createRootRoute') &&
    rootRouteSource.includes('<Outlet />') &&
    indexRouteSource.includes("createFileRoute('/')") &&
    indexRouteSource.includes('<App />'),
}
```

- [ ] **Step 2: Run the contract and verify it fails**

Run: `npm run test:visual`

Expected: FAIL with `app uses TanStack Router file routing with automatic code splitting`.

- [ ] **Step 3: Commit**

```bash
git add scripts/visual-contract.mjs
git commit -m "test: add tanstack router conversion contract"
```

### Task 2: Install TanStack Router Dependencies

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Install packages**

Run:

```bash
npm install @tanstack/react-router
npm install -D @tanstack/router-plugin
```

- [ ] **Step 2: Verify package metadata changed**

Run: `git diff -- package.json package-lock.json`

Expected: `@tanstack/react-router` appears in dependencies and `@tanstack/router-plugin` appears in devDependencies.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install tanstack router"
```

### Task 3: Add File-Based Routes And Router Provider

**Files:**
- Create: `src/routes/__root.tsx`
- Create: `src/routes/index.tsx`
- Modify: `src/main.tsx`
- Generated: `src/routeTree.gen.ts`

- [ ] **Step 1: Add the root route**

Create `src/routes/__root.tsx`:

```tsx
import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => <Outlet />,
})
```

- [ ] **Step 2: Add the home route**

Create `src/routes/index.tsx`:

```tsx
import { createFileRoute } from '@tanstack/react-router'
import App from '../App'

export const Route = createFileRoute('/')({
  component: () => <App />,
})
```

- [ ] **Step 3: Render through TanStack Router**

Replace `src/main.tsx` with:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import './index.css'
import { routeTree } from './routeTree.gen'

const router = createRouter({
  routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
```

- [ ] **Step 4: Commit**

```bash
git add src/main.tsx src/routes/__root.tsx src/routes/index.tsx src/routeTree.gen.ts
git commit -m "feat: render landing page through tanstack router"
```

### Task 4: Configure Vite Code Splitting And Generated File Linting

**Files:**
- Modify: `vite.config.ts`
- Modify: `eslint.config.js`
- Generated: `src/routeTree.gen.ts`

- [ ] **Step 1: Configure the TanStack Router Vite plugin**

Update `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
})
```

- [ ] **Step 2: Ignore the generated route tree in ESLint**

Update `eslint.config.js`:

```js
export default defineConfig([
  globalIgnores(['dist', 'src/routeTree.gen.ts']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
])
```

- [ ] **Step 3: Run build to generate the route tree**

Run: `npm run build`

Expected: PASS and `src/routeTree.gen.ts` exists.

- [ ] **Step 4: Commit**

```bash
git add vite.config.ts eslint.config.js src/routeTree.gen.ts
git commit -m "build: enable tanstack router code splitting"
```

### Task 5: Verify The Conversion

**Files:**
- Read: build output in terminal

- [ ] **Step 1: Run the visual contract**

Run: `npm run test:visual`

Expected: PASS with the TanStack Router conversion contract included in the check count.

- [ ] **Step 2: Run lint**

Run: `npm run lint`

Expected: PASS with no generated route tree lint errors.

- [ ] **Step 3: Run production build**

Run: `npm run build`

Expected: PASS and the Vite output includes route-related chunks generated from the TanStack Router setup.

- [ ] **Step 4: Inspect final diff**

Run: `git status --short`

Expected: clean working tree after commits, or only intentional uncommitted verification artifacts.
