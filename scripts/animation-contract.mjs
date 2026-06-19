import { existsSync, readFileSync } from 'node:fs'

function read(path) {
  return existsSync(path) ? readFileSync(path, 'utf8') : ''
}

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
const dependencies = {
  ...packageJson.dependencies,
  ...packageJson.devDependencies,
}
const scripts = packageJson.scripts ?? {}

const animationSource = read('src/components/animation.ts')
const sharedSource = read('src/components/shared.tsx')
const stylesSource = read('src/components/styles.ts')
const buttonSource = read('src/components/ui/button.tsx')
const buttonVariantsSource = read('src/components/ui/button-variants.ts')
const appSource = read('src/App.tsx')
const globalReachSource = read('src/components/GlobalReachSection.tsx')
const readySource = read('src/components/ReadySection.tsx')
const footerSource = read('src/components/Footer.tsx')

const appBeforeHero = appSource.slice(0, appSource.indexOf('function HeroSection()'))
const heroSource = appSource.slice(
  appSource.indexOf('function HeroSection()'),
  appSource.indexOf('function ScrollToTopButton'),
)

const checks = [
  {
    name: 'animejs is installed as a runtime dependency and exposed through a contract script',
    pass: Boolean(packageJson.dependencies?.animejs) && Boolean(dependencies.animejs) && scripts['test:animation'] === 'node scripts/animation-contract.mjs',
  },
  {
    name: 'animation helper centralizes animejs animate calls and reduced-motion checks',
    pass:
      animationSource.includes("import { animate } from 'animejs'") &&
      animationSource.includes('export function prefersReducedMotion()') &&
      animationSource.includes('export function useSectionReveal') &&
      animationSource.includes('export function useAnimeHoverMotion') &&
      animationSource.includes('IntersectionObserver') &&
      animationSource.includes("matchMedia('(prefers-reduced-motion: reduce)'") &&
      animationSource.includes('animationRef.current?.cancel()') &&
      animationSource.includes("ease: 'outCubic'") &&
      animationSource.includes('duration: 720') &&
      animationSource.includes('y: { from: 28, to: 0 }') &&
      animationSource.includes('scale: activeScale'),
  },
  {
    name: 'SectionReveal starts hidden, reveals through the helper, and exposes a DOM marker',
    pass:
      stylesSource.includes("export const sectionReveal =") &&
      stylesSource.includes('opacity-0') &&
      stylesSource.includes('translate-y-7') &&
      stylesSource.includes('motion-reduce:opacity-100') &&
      stylesSource.includes('motion-reduce:translate-y-0') &&
      sharedSource.includes("import { composeEventHandlers, useAnimeHoverMotion, useSectionReveal } from './animation'") &&
      sharedSource.includes('const revealRef = useSectionReveal<HTMLDivElement>()') &&
      sharedSource.includes('data-section-reveal=""') &&
      sharedSource.includes('ref={revealRef}'),
  },
  {
    name: 'Button applies animejs hover/focus motion without dropping caller handlers',
    pass:
      buttonSource.includes('useAnimeHoverMotion<HTMLButtonElement>') &&
      buttonSource.includes('composeEventHandlers(onPointerEnter, motionHandlers.onPointerEnter)') &&
      buttonSource.includes('composeEventHandlers(onPointerLeave, motionHandlers.onPointerLeave)') &&
      buttonSource.includes('composeEventHandlers(onFocus, motionHandlers.onFocus)') &&
      buttonSource.includes('composeEventHandlers(onBlur, motionHandlers.onBlur)') &&
      !buttonVariantsSource.includes('active:not-aria-[haspopup]:translate-y-px'),
  },
  {
    name: 'non-Button anchors opt into shared animejs hover/focus motion',
    pass:
      sharedSource.includes('export function AnimatedAnchor') &&
      appSource.includes("import { AnimatedAnchor } from './components/shared'") &&
      appSource.includes('<AnimatedAnchor') &&
      footerSource.includes('import { AnimatedAnchor, SectionReveal } from') &&
      footerSource.includes('<AnimatedAnchor') &&
      !footerSource.includes('<a\n              className={cn('),
  },
  {
    name: 'all below-hero major sections are reveal-wrapped without animating the hero on load',
    pass:
      !appBeforeHero.includes('SectionReveal') &&
      !heroSource.includes('SectionReveal') &&
      (globalReachSource.match(/<SectionReveal/g)?.length ?? 0) >= 2 &&
      read('src/components/FreeForeverSection.tsx').includes('<SectionReveal') &&
      read('src/components/CustomProfileSection.tsx').includes('<SectionReveal') &&
      read('src/components/ReadySection.tsx').includes('<SectionReveal') &&
      read('src/components/QuestionsSection.tsx').includes('<SectionReveal') &&
      read('src/components/Footer.tsx').includes('<SectionReveal'),
  },
  {
    name: 'local CSS transform hovers that conflict with animejs button motion are removed',
    pass:
      !appSource.includes('hover:-translate-y-0.5') &&
      !readySource.includes('hover:-translate-y-0.5') &&
      !appSource.includes('translate-y-[14px]') &&
      !appSource.includes("visible && 'opacity-100 pointer-events-auto translate-y-0'"),
  },
]

const failures = checks.filter((check) => !check.pass)

if (failures.length) {
  console.error('Animation contract failed:')
  for (const failure of failures) {
    console.error(`- ${failure.name}`)
  }
  process.exit(1)
}

console.log(`Animation contract passed (${checks.length} checks).`)
