import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

function read(path) {
  return existsSync(path) ? readFileSync(path, 'utf8') : ''
}

function readComponentSourceFiles(dir) {
  if (!existsSync(dir)) {
    return []
  }

  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = join(dir, entry.name)

    if (entry.isDirectory()) {
      return readComponentSourceFiles(entryPath)
    }

    return entry.isFile() && /\.(ts|tsx)$/.test(entry.name) ? [entryPath] : []
  })
}

const appEntry = read('src/App.tsx')
const mainEntry = read('src/main.tsx')
const viteConfig = read('vite.config.ts')
const tsconfigApp = read('tsconfig.app.json')
const rootRouteSource = read('src/routes/__root.tsx')
const indexRouteSource = read('src/routes/index.tsx')
const indexCss = read('src/index.css')
const componentsConfig = read('components.json')
const componentFiles = readComponentSourceFiles('src/components')
const componentSource = componentFiles.map((file) => read(file)).join('\n')
const landingData = read('src/components/landingData.ts')
const stylesSource = read('src/components/styles.ts')
const globalReachSectionSource = read('src/components/GlobalReachSection.tsx')
const freeForeverSectionSource = read('src/components/FreeForeverSection.tsx')
const customProfileSectionSource = read('src/components/CustomProfileSection.tsx')
const shadcnButton = read('src/components/ui/button.tsx')
const shadcnButtonVariants = read('src/components/ui/button-variants.ts')
const utilsSource = read('src/lib/utils.ts')
const questionsSectionSource = read('src/components/QuestionsSection.tsx')
const footerSource = read('src/components/Footer.tsx')
const app = [appEntry, componentSource, landingData, stylesSource]
  .join('\n')
  .replaceAll("from '../assets/", "from './assets/")
const hasRemoteFontReference = /https:\/\/fonts\.(?:googleapis|gstatic)\.com/i.test(indexCss)
const imageTags = [...app.matchAll(/<img\b[\s\S]*?(?:\/>|>)/g)].map((match) => match[0])
const belowFoldImageTags = [...componentSource.matchAll(/<img\b[\s\S]*?(?:\/>|>)/g)].map((match) => match[0])
const globalReachImageTags = belowFoldImageTags.filter((tag) => tag.includes('src={globalReachVisualSrc}'))
const bestDeveloperArtTag = belowFoldImageTags.find((tag) => tag.includes('src={bestDeveloperArtSrc}')) ?? ''
const readyLeftArtTag = belowFoldImageTags.find((tag) => tag.includes('src={readyLeftArtSrc}')) ?? ''
const footerArtTag = belowFoldImageTags.find((tag) => tag.includes('src={footerArtSrc}')) ?? ''
const decorativeBelowFoldArtTags = [
  ...globalReachImageTags,
  bestDeveloperArtTag,
  readyLeftArtTag,
  footerArtTag,
].filter(Boolean)
const nonCriticalBelowFoldImageTags = belowFoldImageTags.filter((tag) => !decorativeBelowFoldArtTags.includes(tag))
const optimizedSectionAssets = [
  { path: 'src/assets/optimized/candidate-avatar-gru.webp', maxBytes: 25_000 },
  { path: 'src/assets/optimized/lets_find_work_right_node_mobile.webp', maxBytes: 35_000 },
  { path: 'src/assets/optimized/lets_find_work_right_node.webp', maxBytes: 120_000 },
  { path: 'src/assets/optimized/best_developer_ever_right_node.webp', maxBytes: 120_000 },
  { path: 'src/assets/optimized/lets_find_work_left.webp', maxBytes: 80_000 },
]
const lazySectionNames = [
  'GlobalReachSection',
  'FreeForeverSection',
  'CustomProfileSection',
  'ReadySection',
  'QuestionsSection',
  'Footer',
]
const lazySectionImports = lazySectionNames.map(
  (name) => `const ${name} = lazy(() => import('./components/${name}'))`,
)

const checks = [
  {
    name: 'homepage no longer imports or depends on raw App.css',
    pass: !existsSync('src/App.css') && !appEntry.includes("import './App.css'"),
  },
  {
    name: 'shadcn is configured for this Vite app',
    pass:
      componentsConfig.includes('"style": "radix-nova"') &&
      componentsConfig.includes('"components": "@/components"') &&
      componentsConfig.includes('"utils": "@/lib/utils"') &&
      shadcnButton.includes('buttonVariants') &&
      shadcnButtonVariants.includes('buttonVariants') &&
      shadcnButtonVariants.includes('class-variance-authority') &&
      utilsSource.includes('twMerge') &&
      utilsSource.includes('clsx'),
  },
  {
    name: 'app uses shadcn Button for primary interactive controls',
    pass:
      appEntry.includes("from '@/components/ui/button'") &&
      read('src/components/ReadySection.tsx').includes("from '@/components/ui/button'") &&
      read('src/components/QuestionsSection.tsx').includes("from '@/components/ui/button'") &&
      read('src/components/PricingCard.tsx').includes("from '@/components/ui/button'") &&
      !appEntry.includes('function Button('),
  },
  {
    name: 'Tailwind utilities carry the high-fidelity responsive section geometry',
    pass:
      stylesSource.includes('aspect-[var(--section-ratio)]') &&
      app.includes('[--section-ratio:1152/651]') &&
      app.includes('[--section-ratio:1086/700]') &&
      app.includes('[--section-ratio:1440/610]') &&
      app.includes('[--section-ratio:1040/637]') &&
      app.includes('[--section-ratio:1440/569]') &&
      app.includes('max-[980px]:') &&
      app.includes('max-[720px]:') &&
      app.includes('[font-family:Poppins'),
  },
  {
    name: 'global stylesheet avoids render-blocking remote font imports',
    pass: !hasRemoteFontReference,
  },
  {
    name: 'global element resets stay in Tailwind base layer so utilities can win',
    pass:
      !/^button,\s*\na\s*\{\s*\n\s*font:\s*inherit;/m.test(indexCss) &&
      !/^img,\s*\nsvg\s*\{\s*\n\s*display:\s*block;/m.test(indexCss) &&
      indexCss.includes('@layer base') &&
      indexCss.includes('  img,\n  svg {\n    display: block;\n  }'),
  },
  {
    name: 'homepage imports optimized artwork for the rendered sections',
    pass:
      app.includes("headerBackgroundSrc from './assets/optimized/01_header_background.webp'") &&
      app.includes("globalReachVisualSrc from './assets/optimized/lets_find_work_right_node.webp'") &&
      app.includes("globalReachVisualMobileSrc from './assets/optimized/lets_find_work_right_node_mobile.webp'") &&
      app.includes("bestDeveloperArtSrc from './assets/optimized/best_developer_ever_right_node.webp'") &&
      app.includes("readyLeftArtSrc from './assets/optimized/lets_find_work_left.webp'") &&
      app.includes("questionsArtSrc from './assets/optimized/common_questions_node.webp'") &&
      app.includes("footerArtSrc from './assets/optimized/footer_full_node.webp'") &&
      !app.includes('customProfileCopySrc'),
  },
  {
    name: 'image elements declare intrinsic dimensions',
    pass: imageTags.every((tag) => /\bwidth=/.test(tag) && /\bheight=/.test(tag)),
  },
  {
    name: 'optimized section artwork stays small enough for deferred loading',
    pass: optimizedSectionAssets.every(({ path, maxBytes }) => existsSync(path) && statSync(path).size <= maxBytes),
  },
  {
    name: 'landing page renders core sections without React lazy waterfalls',
    pass:
      lazySectionImports.every((dynamicImport) => !appEntry.includes(dynamicImport)) &&
      !/\blazy\s*\(/.test(app) &&
      !appEntry.includes('<Suspense fallback={null}>') &&
      !componentSource.includes('<Suspense fallback={null}>') &&
      lazySectionNames.every((name) => componentFiles.some((file) => file.endsWith(`${name}.tsx`))) &&
      componentFiles.some((file) => file.endsWith('PricingCard.tsx')),
  },
  {
    name: 'decorative below-the-fold art avoids eager high-priority loading',
    pass:
      globalReachImageTags.length === 2 &&
      decorativeBelowFoldArtTags.length === 5 &&
      decorativeBelowFoldArtTags.every(
        (tag) =>
          tag.includes('loading="lazy"') &&
          tag.includes('decoding="async"') &&
          tag.includes('fetchPriority="low"') &&
          !tag.includes('fetchPriority="high"'),
      ) &&
      appEntry.includes('src={headerBackgroundSrc}') &&
      !/<img\b[^>]*src=\{headerBackgroundSrc\}[^>]*loading="lazy"/.test(appEntry),
  },
  {
    name: 'global reach art exposes responsive sources for the mobile Lighthouse viewport',
    pass:
      globalReachImageTags.length === 2 &&
      globalReachImageTags.every(
        (tag) =>
          tag.includes('srcSet={`') &&
          tag.includes('${globalReachVisualMobileSrc} 620w') &&
          tag.includes('${globalReachVisualSrc} 1665w') &&
          tag.includes('sizes="(max-width: 720px) min(100vw - 24px, 360px), 555px"'),
      ),
  },
  {
    name: 'global reach floating cards use SVG artboard card geometry',
    pass:
      globalReachSectionSource.includes('h-[11.21%]') &&
      globalReachSectionSource.includes('w-[63.42%]') &&
      globalReachSectionSource.includes('left-[1.7%]') &&
      globalReachSectionSource.includes('h-[83.56%]') &&
      globalReachSectionSource.includes('left-[22.67%]') &&
      globalReachSectionSource.includes('rounded-[36.5px]') &&
      (globalReachSectionSource.match(/rounded-full/g)?.length ?? 0) >= 1 &&
      !globalReachSectionSource.includes('min-h-[11.21%]') &&
      !globalReachSectionSource.includes('grid-cols-[61px_minmax(0,1fr)]') &&
      !globalReachSectionSource.includes('grid-cols-[46px_minmax(0,1fr)]'),
  },
  {
    name: 'global reach live cards match SVG placement and shadow on desktop and mobile',
    pass:
      (globalReachSectionSource.match(/globalReachCards\.map/g)?.length ?? 0) === 2 &&
      globalReachSectionSource.includes('z-[1]') &&
      globalReachSectionSource.includes('shadow-[14px_13px_20px_rgba(135,129,245,0.11),14px_10px_30px_rgba(49,89,211,0.12)]') &&
      !globalReachSectionSource.includes('GlobalReachBakedCardMask') &&
      !globalReachSectionSource.includes('[clip-path:') &&
      !globalReachSectionSource.includes('left-[31.17%]') &&
      !globalReachSectionSource.includes('w-[70.1%]') &&
      landingData.includes("className: 'top-[44.70%] left-[3.43%]'") &&
      landingData.includes("className: 'top-[61.44%] left-[18.92%]'") &&
      !landingData.includes("left-[18.3%]") &&
      !landingData.includes("left-[31.2%]"),
  },
  {
    name: 'free forever tablet copy uses in-flow text layout before mobile breakpoint',
    pass:
      freeForeverSectionSource.includes('max-[1025px]:flex max-[1025px]:flex-col') &&
      freeForeverSectionSource.includes('max-[1025px]:static max-[1025px]:mt-5') &&
      freeForeverSectionSource.includes('max-[1025px]:text-[32px] max-[1025px]:leading-10') &&
      freeForeverSectionSource.includes('max-[1025px]:static max-[1025px]:h-auto max-[1025px]:max-w-full'),
  },
  {
    name: 'custom profile client feedback uses rounded live card geometry',
    pass:
      customProfileSectionSource.includes('candidateAvatarSrc') &&
      customProfileSectionSource.includes('h-[13.36406%]') &&
      customProfileSectionSource.includes('w-[77.2973%]') &&
      customProfileSectionSource.includes('rounded-[43.5px]') &&
      customProfileSectionSource.includes('left-[22.67%]') &&
      customProfileSectionSource.includes('h-[83.56%]') &&
      customProfileSectionSource.includes(
        'shadow-[14px_13px_20px_rgba(135,129,245,0.11),14px_10px_30px_rgba(49,89,211,0.12)]',
      ) &&
      !customProfileSectionSource.includes('min-h-[5.6404%] w-[max(30.72865%,172px)] bg-white'),
  },
  {
    name: 'non-critical below-the-fold image assets keep native lazy loading',
    pass:
      nonCriticalBelowFoldImageTags.length > 0 &&
      nonCriticalBelowFoldImageTags.every((tag) => tag.includes('loading="lazy"') && tag.includes('decoding="async"')),
  },
  {
    name: 'visible live HTML copy is preserved for all sections',
    pass:
      app.includes('RemoteRecruit&apos;s Difference') &&
      app.includes('The First Fully Global Job Board, Anywhere, Ever') &&
      app.includes('Python Developer') &&
      app.includes('Front End Wizard') &&
      app.includes('Fee-Free Forever') &&
      app.includes('Your Membership Tier') &&
      app.includes('14 Days - $79.99') &&
      app.includes('Showcase Your Talents') &&
      app.includes('Best Developer Ever!') &&
      app.includes('Help is only a few clicks away!') &&
      app.includes('Common Questions') &&
      app.includes('Help Is One Click Away') &&
      app.includes('Unlimited Job Posts'),
  },
  {
    name: 'pricing and status icon components remain selectable live UI',
    pass:
      app.includes('const pricingPlans') &&
      app.includes('function PricingCard') &&
      app.includes('function StatusIcon') &&
      app.includes('viewBox="0 0 12 12"') &&
      app.includes('$79.99') &&
      app.includes('Per Month') &&
      app.includes('Instant Job Post Approval') &&
      app.includes('select-text') &&
      !app.includes('pricingFullSrc'),
  },
  {
    name: 'ready section has a dedicated tablet height before mobile stacking',
    pass:
      read('src/components/ReadySection.tsx').includes('max-[1025px]:min-h-[560px]') &&
      read('src/components/ReadySection.tsx').includes('max-[1025px]:aspect-auto') &&
      read('src/components/ReadySection.tsx').includes('max-[720px]:min-h-[clamp(620px,calc(520px_+_28vw),720px)]'),
  },
  {
    name: 'pricing layer uses compact tablet spacing before mobile stacking',
    pass:
      footerSource.includes('max-[1025px]:pt-[38px]') &&
      footerSource.includes('max-[1025px]:gap-2.5') &&
      footerSource.includes('max-[720px]:grid-cols-1'),
  },
  {
    name: 'footer social links remain visible and individually clickable on mobile and tablet',
    pass:
      app.includes('function SocialIcon') &&
      app.includes('icon:') &&
      app.includes('href:') &&
      app.includes('<SocialIcon icon={link.icon} />') &&
      app.includes('max-[1025px]:static') &&
      app.includes('max-[1025px]:size-8') &&
      app.includes('aria-label={`RemoteRecruit ${link.label}`}'),
  },
  {
    name: 'footer brand logo uses live mobile layout through the tablet breakpoint',
    pass:
      footerSource.includes("brandNameSrc from '../assets/optimized/brand_name.webp'") &&
      footerSource.includes('src={brandNameSrc}') &&
      footerSource.includes('max-[1025px]:min-h-[350px] max-[1025px]:aspect-auto') &&
      footerSource.includes('object-fill max-[1025px]:hidden') &&
      footerSource.includes('max-[1025px]:right-0 max-[1025px]:bottom-[86px]') &&
      footerSource.includes('max-[1025px]:static max-[1025px]:size-8') &&
      footerSource.includes('max-[1025px]:flex'),
  },
  {
    name: 'semantic accessibility is preserved behind visible copy',
    pass:
      app.includes('aria-labelledby="hero-title"') &&
      app.includes('id="global-reach-title"') &&
      app.includes('id="free-forever-title"') &&
      app.includes('id="custom-profile-title"') &&
      app.includes('id="ready-title"') &&
      app.includes('id="questions-title"') &&
      app.includes('id="pricing-title"') &&
      app.includes('aria-label="Get started"') &&
      app.includes('aria-label="More questions"') &&
      app.includes("ariaLabel: 'Get started with the Free basic plan'") &&
      app.includes("ariaLabel: 'Get started with the Premium plan'"),
  },
  {
    name: 'mobile common questions layout does not inherit desktop absolute offsets',
    pass:
      questionsSectionSource.includes('max-[1025px]:static') &&
      questionsSectionSource.includes('min-[1026px]:absolute') &&
      questionsSectionSource.includes('min-[1026px]:first:top-[17.58242%]') &&
      questionsSectionSource.includes('min-[1026px]:[&:nth-child(2)]:top-[42.2292%]') &&
      questionsSectionSource.includes('min-[1026px]:[&:nth-child(3)]:top-[61.38148%]') &&
      !questionsSectionSource.includes(' first:top-[17.58242%]') &&
      !questionsSectionSource.includes(' [&:nth-child(2)]:top-[42.2292%]') &&
      !questionsSectionSource.includes(' [&:nth-child(3)]:top-[61.38148%]'),
  },
  {
    name: 'mobile common questions hides desktop vector artwork by default',
    pass:
      questionsSectionSource.includes("cn(figmaArt, 'hidden min-[1026px]:block')") &&
      questionsSectionSource.includes('hidden absolute inset-0 z-[1] bg-white pointer-events-none min-[1026px]:block') &&
      !questionsSectionSource.includes("cn(figmaArt, 'max-[980px]:hidden')") &&
      !questionsSectionSource.includes('max-[980px]:hidden" aria-hidden="true"'),
  },
  {
    name: 'app uses TanStack Router file routing with automatic code splitting',
    pass:
      viteConfig.includes("from '@tanstack/router-plugin/vite'") &&
      viteConfig.includes('tanstackRouter({') &&
      viteConfig.includes("target: 'react'") &&
      viteConfig.includes('autoCodeSplitting: true') &&
      viteConfig.indexOf('tanstackRouter({') < viteConfig.indexOf('react()') &&
      /from ['"]@tanstack\/react-router['"]/.test(mainEntry) &&
      /from ['"]\.\/routeTree\.gen['"]/.test(mainEntry) &&
      mainEntry.includes('createRouter({') &&
      mainEntry.includes('<RouterProvider router={router} />') &&
      rootRouteSource.includes('createRootRoute') &&
      rootRouteSource.includes('<Outlet />') &&
      indexRouteSource.includes("createFileRoute('/')") &&
      indexRouteSource.includes('<App />'),
  },
  {
    name: 'TypeScript app config enables strict null checks for TanStack Router types',
    pass: tsconfigApp.includes('"strictNullChecks": true'),
  },
]

const failures = checks.filter((check) => !check.pass)

if (failures.length) {
  console.error('Visual contract failed:')
  for (const failure of failures) {
    console.error(`- ${failure.name}`)
  }
  process.exit(1)
}

console.log(`Visual contract passed (${checks.length} checks).`)
