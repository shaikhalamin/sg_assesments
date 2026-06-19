import { existsSync, readFileSync, statSync } from 'node:fs'

function read(path) {
  return existsSync(path) ? readFileSync(path, 'utf8') : ''
}

function hasRuleLikeCss(source) {
  return /(^|\n)\s*[.#\w:@*][^{\n]*\{\s*[\s\S]*?:\s*[^}]+;[\s\S]*?\}/.test(source)
}

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
const dependencies = {
  ...packageJson.dependencies,
  ...packageJson.devDependencies,
}
const appSource = read('src/App.tsx')
const componentSource = [
  read('src/components/GlobalReachSection.tsx'),
  read('src/components/FreeForeverSection.tsx'),
  read('src/components/CustomProfileSection.tsx'),
  read('src/components/ReadySection.tsx'),
  read('src/components/QuestionsSection.tsx'),
  read('src/components/Footer.tsx'),
  read('src/components/PricingCard.tsx'),
  read('src/components/shared.tsx'),
].join('\n')
const appCss = read('src/App.css')
const componentsConfig = read('components.json')
const viteConfig = read('vite.config.ts')
const tsconfig = read('tsconfig.json')
const tsconfigApp = read('tsconfig.app.json')
const uiButton = read('src/components/ui/button.tsx')
const uiButtonVariants = read('src/components/ui/button-variants.ts')
const utils = read('src/lib/utils.ts')

const checks = [
  {
    name: 'shadcn dependencies are installed',
    pass: ['class-variance-authority', 'clsx', 'tailwind-merge', 'radix-ui'].every(
      (name) => dependencies[name],
    ),
  },
  {
    name: 'shadcn registry config exists for this Vite app',
    pass:
      componentsConfig.includes('"tsx": true') &&
      componentsConfig.includes('"tailwind"') &&
      componentsConfig.includes('"components": "@/components"') &&
      componentsConfig.includes('"utils": "@/lib/utils"'),
  },
  {
    name: 'Vite and TypeScript expose the @ alias required by shadcn imports',
    pass:
      /["@']@["@']\s*:\s*path\.resolve\(__dirname,\s*['"]\.\/src['"]\)/.test(viteConfig) &&
      tsconfig.includes('"@/*": ["./src/*"]') &&
      tsconfigApp.includes('"@/*": ["./src/*"]'),
  },
  {
    name: 'shadcn button and cn helper are present',
    pass:
      uiButton.includes('buttonVariants') &&
      uiButtonVariants.includes('class-variance-authority') &&
      uiButtonVariants.includes('buttonVariants') &&
      uiButton.includes('@/lib/utils') &&
      utils.includes('twMerge') &&
      utils.includes('clsx'),
  },
  {
    name: 'app no longer imports or depends on raw App.css rules',
    pass:
      !appSource.includes("import './App.css'") &&
      (!existsSync('src/App.css') || statSync('src/App.css').size === 0 || !hasRuleLikeCss(appCss)),
  },
  {
    name: 'app uses shadcn Button instead of the previous raw CSS button class',
    pass:
      appSource.includes("from '@/components/ui/button'") &&
      !appSource.includes('function Button(') &&
      !/className=\{?["'`][^"'`]*\bbutton\b/.test(appSource + componentSource),
  },
]

const failures = checks.filter((check) => !check.pass)

if (failures.length) {
  console.error('shadcn contract failed:')
  for (const failure of failures) {
    console.error(`- ${failure.name}`)
  }
  process.exit(1)
}

console.log(`shadcn contract passed (${checks.length} checks).`)
