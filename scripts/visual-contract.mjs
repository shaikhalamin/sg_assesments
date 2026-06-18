import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

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

const appEntry = readFileSync('src/App.tsx', 'utf8')
const componentFiles = readComponentSourceFiles('src/components')
const componentSource = componentFiles.map((file) => readFileSync(file, 'utf8')).join('\n')
const app = [appEntry, componentSource]
  .join('\n')
  .replaceAll("from '../screens_svg/", "from './screens_svg/")
  .replaceAll("from '../assets/", "from './assets/")
const css = readFileSync('src/App.css', 'utf8')
const indexCss = readFileSync('src/index.css', 'utf8')
const hasRemoteFontImport = /@import\s+url\(["']?https:\/\/fonts\.(?:googleapis|gstatic)\.com/i.test(indexCss)
const hasRemoteFontReference = /https:\/\/fonts\.(?:googleapis|gstatic)\.com/i.test(indexCss)
const headerBackgroundSvg = readFileSync('src/screens_svg/01_header/01_header_background.svg', 'utf8')
const globalReachDesktopParagraph =
  app.match(/<article className="global-reach-section__copy">[\s\S]*?<p>([\s\S]*?)<\/p>/)?.[1] ?? ''
const normalizedGlobalReachDesktopParagraph = globalReachDesktopParagraph
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()

function getCustomProfileSkillRule(index) {
  const match = css.match(new RegExp(`\\.custom-profile-overlay__skill:nth-child\\(${index}\\)\\s*\\{([\\s\\S]*?)\\}`))
  return match?.[1] ?? ''
}

function getCssRule(selector) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = css.match(new RegExp(`${escapedSelector}\\s*\\{([\\s\\S]*?)\\n\\}`))
  return match?.[1] ?? ''
}

function getCssRuleInMedia(mediaQuery, selector) {
  const escapedMediaQuery = mediaQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = css.match(new RegExp(`@media \\(${escapedMediaQuery}\\) \\{[\\s\\S]*?\\n  ${escapedSelector}\\s*\\{([\\s\\S]*?)\\n  \\}`))
  return match?.[1] ?? ''
}

function getPercentDeclaration(rule, property) {
  const match = rule.match(new RegExp(`${property}:\\s*([0-9.]+)%;`))
  return match ? Number(match[1]) : Number.NaN
}

const iosDevelopmentSkillRule = getCustomProfileSkillRule(5)
const moreSkillsRule = getCustomProfileSkillRule(6)
const iosDevelopmentRight =
  getPercentDeclaration(iosDevelopmentSkillRule, 'left') +
  getPercentDeclaration(iosDevelopmentSkillRule, 'width')
const moreSkillsLeft = getPercentDeclaration(moreSkillsRule, 'left')
const customProfileSkillBaseRule = css.match(/\.custom-profile-overlay__skill\s*\{([\s\S]*?)\n\}/)?.[1] ?? ''
const customProfileFeedbackTitleRule = css.match(/\.custom-profile-overlay__feedback-title\s*\{([\s\S]*?)\n\}/)?.[1] ?? ''
const customProfileLabelRule = getCssRule('.custom-profile-copy > span')
const customProfileTitleRule = getCssRule('.custom-profile-copy h2')
const tabletCustomProfileSkillRule = getCssRuleInMedia('max-width: 980px', '.custom-profile-overlay__skill')
const mobileCustomProfileSkillRule = getCssRuleInMedia('max-width: 720px', '.custom-profile-overlay__skill')
const tabletCustomProfileTitleRule = getCssRuleInMedia('max-width: 980px', '.custom-profile-copy h2')
const mobileCustomProfileTitleRule = getCssRuleInMedia('max-width: 720px', '.custom-profile-copy h2')
const heroSubtitleRule = getCssRule('.hero-subtitle')
const tabletHeroSubtitleRule = getCssRuleInMedia('max-width: 980px', '.hero-subtitle')
const mobileHeroSubtitleRule = getCssRuleInMedia('max-width: 720px', '.hero-subtitle')
const authButtonRule =
  css.match(/\.site-header \.header-sign-in,\n\.site-header \.header-sign-up\s*\{([\s\S]*?)\n\}/)?.[1] ?? ''
const mobileAuthButtonRule =
  css.match(
    /@media \(max-width: 720px\) \{[\s\S]*?\.site-header \.header-sign-in,\n  \.site-header \.header-sign-up\s*\{([\s\S]*?)\n  \}/,
  )?.[1] ?? ''
const readyEyebrowRule = getCssRule('.ready-section__eyebrow')
const readyTitleRule = getCssRule('.ready-section__copy h2')
const readyFrameRule = getCssRule('.ready-section__frame')
const readyActionRule = getCssRule('.ready-section__action')
const readyActionLabelRule = getCssRule('.ready-section__action-label')
const mobileReadyFrameRule = getCssRuleInMedia('max-width: 720px', '.figma-section--ready .figma-section__frame')
const mobileReadyLeftArtRule = getCssRuleInMedia('max-width: 720px', '.ready-section__left-art')
const mobileReadyTitleRule = getCssRuleInMedia('max-width: 720px', '.ready-section__copy h2')
const questionsTitleRule = getCssRule('.questions-section__title')
const questionsContentRule = getCssRule('.questions-section__content')
const questionsItemRule = getCssRule('.questions-section__item')
const questionsQuestionRule = getCssRule('.questions-section__question')
const questionsAnswerRule = getCssRule('.questions-section__answer')
const questionsActionRule = getCssRule('.questions-section__action')
const pricingTitleRule = getCssRule('.pricing-inner h2')
const pricingCardRule = getCssRule('.pricing-card')
const pricingPremiumCardRule = getCssRule('.pricing-card--premium')
const pricingSummaryRule = getCssRule('.pricing-card__summary')
const pricingPremiumSummaryRule = getCssRule('.pricing-card--premium .pricing-card__summary')
const pricingPremiumBadgeRule = getCssRule('.pricing-card__badge')
const pricingPremiumBadgeIconRule = getCssRule('.pricing-card__badge-icon')
const pricingCardFeatureRule = getCssRule('.pricing-card__features li')
const pricingPremiumButtonRule = getCssRule('.pricing-card--premium .pricing-card__button')
const tabletPricingCardRule = getCssRuleInMedia('max-width: 720px', '.pricing-card')
const tabletPricingBadgeRule = getCssRuleInMedia('max-width: 720px', '.pricing-card__badge')
const globalReachDesktopLabelRule = getCssRule('.global-reach-section__copy span')
const globalReachMobileLabelRule = getCssRule('.figma-section--global .mobile-feature__copy span')
const globalReachDesktopTitleRule = getCssRule('.global-reach-section__copy h2')
const globalReachMobileTitleRule = getCssRule('.figma-section--global .mobile-feature__copy h2')
const freeForeverLabelRule = getCssRule('.free-forever-copy > span')
const freeForeverTitleRule = getCssRule('.free-forever-copy h2')
const freeForeverBodyRule = getCssRule('.free-forever-copy__body')
const mobileFreeForeverCopyRule = getCssRuleInMedia('max-width: 720px', '.free-forever-copy')
const mobileFreeForeverTitleRule = getCssRuleInMedia('max-width: 720px', '.free-forever-copy h2')
const mobileFreeForeverBodyRule = getCssRuleInMedia('max-width: 720px', '.free-forever-copy__body')
const paymentCardTextRule = getCssRule('.payment-card__text')
const paymentCardEyebrowRule = getCssRule('.payment-card__eyebrow')
const paymentCardValueRule = getCssRule('.payment-card__value')
const footerSectionRule = getCssRule('.figma-section--footer')
const siteFooterRule = getCssRule('.site-footer')
const footerPricingLayerRule = getCssRule('.footer-pricing-layer')
const footerSocialHitRule = getCssRule('.footer-social-hit')
const footerSocialIconRule = getCssRule('.footer-social-hit__icon')
const freeForeverTitleRules = [...css.matchAll(/^(\s*)\.free-forever-copy h2\s*\{([\s\S]*?)^\1\}/gm)].map(
  (match) => match[2],
)
const freeForeverTitleHasConflictingOverride = freeForeverTitleRules
  .slice(1)
  .some((rule) => /font-family|font-style|font-weight|color/.test(rule))
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
const belowFoldImageTags = [...componentSource.matchAll(/<img\b[\s\S]*?(?:\/>|>)/g)].map((match) => match[0])
const imageTags = [...app.matchAll(/<img\b[\s\S]*?(?:\/>|>)/g)].map((match) => match[0])
const globalReachImageTags = belowFoldImageTags.filter((tag) => tag.includes('src={globalReachVisualSrc}'))
const bestDeveloperArtTag = belowFoldImageTags.find((tag) => tag.includes('src={bestDeveloperArtSrc}')) ?? ''
const readyLeftArtTag = belowFoldImageTags.find((tag) => tag.includes('src={readyLeftArtSrc}')) ?? ''
const footerArtTag = belowFoldImageTags.find((tag) => tag.includes('src={footerArtSrc}')) ?? ''
const decorativeBelowFoldArtTags = [...globalReachImageTags, bestDeveloperArtTag, readyLeftArtTag, footerArtTag].filter(Boolean)
const nonCriticalBelowFoldImageTags = belowFoldImageTags.filter((tag) => !decorativeBelowFoldArtTags.includes(tag))
const optimizedSectionAssets = [
  { path: 'src/assets/optimized/candidate-avatar-gru.webp', maxBytes: 25_000 },
  { path: 'src/assets/optimized/lets_find_work_right_node_mobile.webp', maxBytes: 35_000 },
  { path: 'src/assets/optimized/lets_find_work_right_node.webp', maxBytes: 120_000 },
  { path: 'src/assets/optimized/best_developer_ever_right_node.webp', maxBytes: 120_000 },
  { path: 'src/assets/optimized/lets_find_work_left.webp', maxBytes: 80_000 },
]

function hasRequestedCustomProfileSkillTextStyles(rule) {
  return (
    rule.includes("font-family: 'Poppins';") &&
    rule.includes('font-style: normal;') &&
    rule.includes('font-weight: 500;') &&
    rule.includes('font-size: 12px;') &&
    rule.includes('line-height: 21px;') &&
    rule.includes('display: flex;') &&
    rule.includes('align-items: center;') &&
    rule.includes('background: linear-gradient(131.63deg, #336DA6 6.87%, #1E3E85 106.04%);') &&
    rule.includes('-webkit-background-clip: text;') &&
    rule.includes('-webkit-text-fill-color: transparent;') &&
    rule.includes('background-clip: text;') &&
    rule.includes('text-fill-color: transparent;')
  )
}

const checks = [
  {
    name: 'homepage imports optimized artwork for slow section backgrounds',
    pass:
      app.includes("headerBackgroundSrc from './screens_svg/01_header/01_header_background.svg'") &&
      app.includes("globalReachVisualSrc from './assets/optimized/lets_find_work_right_node.webp'") &&
      app.includes("globalReachVisualMobileSrc from './assets/optimized/lets_find_work_right_node_mobile.webp'") &&
      app.includes("bestDeveloperArtSrc from './assets/optimized/best_developer_ever_right_node.webp'") &&
      app.includes("readyLeftArtSrc from './assets/optimized/lets_find_work_left.webp'") &&
      app.includes("questionsArtSrc from './screens_svg/06_common_questions/common_questions_node.svg'") &&
      app.includes("footerArtSrc from './screens_svg/08_footer/footer_full_node.svg'") &&
      !app.includes("customProfileCopySrc from './screens_svg/04_custom_profiles_best_developer_ever/custom_profile_show_case_talent_left_node.svg'"),
  },
  {
    name: 'global stylesheet avoids render-blocking remote font imports',
    pass: !hasRemoteFontImport && !hasRemoteFontReference,
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
      componentFiles.some((file) => file.endsWith('GlobalReachSection.tsx')) &&
      componentFiles.some((file) => file.endsWith('FreeForeverSection.tsx')) &&
      componentFiles.some((file) => file.endsWith('CustomProfileSection.tsx')) &&
      componentFiles.some((file) => file.endsWith('ReadySection.tsx')) &&
      componentFiles.some((file) => file.endsWith('QuestionsSection.tsx')) &&
      componentFiles.some((file) => file.endsWith('Footer.tsx')) &&
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
      appEntry.includes('className="figma-hero__background"') &&
      !/<img\b[^>]*className="figma-hero__background"[^>]*loading="lazy"/.test(appEntry),
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
    name: 'non-critical below-the-fold image assets keep native lazy loading',
    pass:
      nonCriticalBelowFoldImageTags.length > 0 &&
      nonCriticalBelowFoldImageTags.every((tag) => tag.includes('loading="lazy"') && tag.includes('decoding="async"')),
  },
  {
    name: 'homepage no longer depends on earlier ad hoc feature artwork imports',
    pass:
      !app.includes("globalBoardSrc from '../supporting_files/Group 136@3x.svg'") &&
      !app.includes("membershipSrc from '../supporting_files/Group 136@3x-1.svg'") &&
      !app.includes("profileSrc from '../supporting_files/Group 136-1.png'") &&
      !app.includes("globalReachSrc from './screens_svg/global_reach.svg'"),
  },
  {
    name: 'hero uses background-only Figma curve art with live selectable copy and navigation overlay',
    pass:
      app.includes('src={headerBackgroundSrc}') &&
      app.includes('className="figma-hero__background"') &&
      app.includes('className="hero-copy"') &&
      app.includes('className="hero-subtitle"') &&
      app.includes('function Header()') &&
      app.includes('className="site-header"') &&
      css.includes('.figma-hero__background') &&
      css.includes('.hero-copy') &&
      css.includes('user-select: text;') &&
      css.includes('background: #ffffff;') &&
      css.includes('aspect-ratio: 1440 / 704;') &&
      css.includes('height: 704px;'),
  },
  {
    name: 'header background SVG stretches to viewport without transparent side gutters',
    pass:
      headerBackgroundSvg.includes('viewBox="0 0 1440 704"') &&
      headerBackgroundSvg.includes('preserveAspectRatio="none"') &&
      css.includes('max-width: none;') &&
      css.includes('object-fit: fill;'),
  },
  {
    name: 'feature stack uses Figma art wrappers plus live copyable feature sections',
    pass:
      app.includes('figma-section--global') &&
      app.includes('function GlobalReachSection()') &&
      app.includes('src={globalReachVisualSrc}') &&
      app.includes('function FreeForeverSection()') &&
      app.includes('function FreeForeverVisual()') &&
      app.includes('figma-section--free free-forever-section') &&
      app.includes('className="custom-profile-section"') &&
      app.includes('className="custom-profile-copy"') &&
      app.includes('src={bestDeveloperArtSrc}') &&
      app.includes('className="custom-profile-overlay"') &&
      css.includes('.figma-section__art') &&
      css.includes('.custom-profile-section'),
  },
  {
    name: 'global reach desktop section uses live copyable HTML for visible text',
    pass:
      app.includes('className="global-reach-section__copy"') &&
      app.includes('<span>Global Reach</span>') &&
      app.includes('<h2 id="global-reach-title">The First Fully Global Job Board, Anywhere, Ever</h2>') &&
      app.includes('className="global-reach-card__role"') &&
      app.includes('Python Developer') &&
      app.includes('Felonious Gru') &&
      app.includes('Front End Wizard') &&
      app.includes('Mel Muselphiem') &&
      css.includes('.global-reach-section__copy') &&
      css.includes('.global-reach-card__role') &&
      css.includes('user-select: text;'),
  },
  {
    name: 'global reach headline uses requested Poppins typography on desktop and mobile layouts',
    pass:
      globalReachDesktopTitleRule.includes("font-family: 'Poppins';") &&
      globalReachDesktopTitleRule.includes('font-style: normal;') &&
      globalReachDesktopTitleRule.includes('font-weight: 500;') &&
      globalReachDesktopTitleRule.includes('font-size: 40px;') &&
      globalReachDesktopTitleRule.includes('line-height: 52px;') &&
      globalReachDesktopTitleRule.includes('color: #11142D;') &&
      globalReachMobileTitleRule.includes("font-family: 'Poppins';") &&
      globalReachMobileTitleRule.includes('font-style: normal;') &&
      globalReachMobileTitleRule.includes('font-weight: 500;') &&
      globalReachMobileTitleRule.includes('font-size: 40px;') &&
      globalReachMobileTitleRule.includes('line-height: 52px;') &&
      globalReachMobileTitleRule.includes('color: #11142D;'),
  },
  {
    name: 'global reach label uses requested Poppins typography on desktop and mobile layouts',
    pass:
      globalReachDesktopLabelRule.includes("font-family: 'Poppins';") &&
      globalReachDesktopLabelRule.includes('font-style: normal;') &&
      globalReachDesktopLabelRule.includes('font-weight: 600;') &&
      globalReachDesktopLabelRule.includes('font-size: 12px;') &&
      globalReachDesktopLabelRule.includes('line-height: 15px;') &&
      globalReachDesktopLabelRule.includes('display: flex;') &&
      globalReachDesktopLabelRule.includes('align-items: center;') &&
      globalReachDesktopLabelRule.includes('letter-spacing: 0.4px;') &&
      globalReachDesktopLabelRule.includes('color: #11142D;') &&
      globalReachDesktopLabelRule.includes('mix-blend-mode: normal;') &&
      globalReachDesktopLabelRule.includes('opacity: 0.8;') &&
      globalReachMobileLabelRule.includes("font-family: 'Poppins';") &&
      globalReachMobileLabelRule.includes('font-style: normal;') &&
      globalReachMobileLabelRule.includes('font-weight: 600;') &&
      globalReachMobileLabelRule.includes('font-size: 12px;') &&
      globalReachMobileLabelRule.includes('line-height: 15px;') &&
      globalReachMobileLabelRule.includes('display: flex;') &&
      globalReachMobileLabelRule.includes('align-items: center;') &&
      globalReachMobileLabelRule.includes('letter-spacing: 0.4px;') &&
      globalReachMobileLabelRule.includes('color: #11142D;') &&
      globalReachMobileLabelRule.includes('mix-blend-mode: normal;') &&
      globalReachMobileLabelRule.includes('opacity: 0.8;'),
  },
  {
    name: 'global reach desktop paragraph relies on responsive wrapping instead of manual breaks',
    pass:
      !/<br\s*\/?>/.test(globalReachDesktopParagraph) &&
      normalizedGlobalReachDesktopParagraph ===
        'RemoteRecruit connects candidates with opportunities around the world. With today&apos;s remote-first workforce, you need to be able to find the best jobs and the best people for them, wherever they may be.',
  },
  {
    name: 'global reach candidate cards expose left-side configurable avatar images',
    pass:
      app.includes('function GlobalReachCard') &&
      app.includes('avatarSrc') &&
      app.includes('className="global-reach-card__avatar"') &&
      app.includes('src={avatarSrc}') &&
      app.includes("candidateAvatarSrc from './assets/optimized/candidate-avatar-gru.webp'") &&
      !app.includes("candidateAvatarSrc from './assets/candidate-avatar-gru.png'") &&
      css.includes('grid-template-columns: var(--avatar-size) minmax(0, 1fr);') &&
      css.includes('object-fit: cover;'),
  },
  {
    name: 'free forever section renders desktop membership and right-side copy as selectable HTML',
    pass:
      app.includes('function FreeForeverVisual()') &&
      app.includes('className="free-forever-copy"') &&
      app.includes('className="membership-card"') &&
      app.includes('className="payment-card"') &&
      app.includes('<h2 id="free-forever-title">Fee-Free Forever</h2>') &&
      app.includes('Your Membership Tier') &&
      app.includes('Upcoming Payment In') &&
      app.includes('14 Days - $79.99') &&
      css.includes('.free-forever-copy') &&
      css.includes('.membership-card') &&
      css.includes('.payment-card') &&
      css.includes('user-select: text;'),
  },
  {
    name: 'free forever desktop and tablet render visible selectable HTML, not image-only text',
    pass:
      !app.includes("freeForeverFullSrc from './screens_svg/03_member_ship_free_for_ever/free_for_ever_full_node.svg'") &&
      !app.includes('className="free-forever-section__art"') &&
      app.includes('className="figma-section__frame free-forever-section__inner"') &&
      app.includes('className="free-forever-section__desktop-content"') &&
      app.includes('<h2 id="free-forever-title">Fee-Free Forever</h2>') &&
      !app.includes('<div className="visually-hidden">\n          <h2 id="free-forever-title">Fee-Free Forever</h2>') &&
      css.includes('.free-forever-section__desktop-content') &&
      css.includes('.free-forever-copy {\n  position: absolute;') &&
      css.includes('left: 53.9595%;') &&
      css.includes('top: 22.7143%;'),
  },
  {
    name: 'free forever title uses requested absolute Figma positioning and typography',
    pass:
      freeForeverTitleRule.includes('position: absolute;') &&
      freeForeverTitleRule.includes('left: 0%;') &&
      freeForeverTitleRule.includes('right: 0%;') &&
      freeForeverTitleRule.includes('top: 24%;') &&
      freeForeverTitleRule.includes('bottom: 57.33%;') &&
      freeForeverTitleRule.includes('margin: 0;') &&
      freeForeverTitleRule.includes("font-family: 'Poppins';") &&
      freeForeverTitleRule.includes('font-style: normal;') &&
      freeForeverTitleRule.includes('font-weight: 500;') &&
      freeForeverTitleRule.includes('font-size: 40px;') &&
      freeForeverTitleRule.includes('line-height: 52px;') &&
      freeForeverTitleRule.includes('color: #11142D;') &&
      !freeForeverTitleHasConflictingOverride,
  },
  {
    name: 'actually fee free label uses requested Poppins typography across responsive layouts',
    pass:
      app.includes('<span>Actually Fee Free</span>') &&
      freeForeverLabelRule.includes("font-family: 'Poppins';") &&
      freeForeverLabelRule.includes('font-style: normal;') &&
      freeForeverLabelRule.includes('font-weight: 600;') &&
      freeForeverLabelRule.includes('font-size: 12px;') &&
      freeForeverLabelRule.includes('line-height: 15px;') &&
      freeForeverLabelRule.includes('display: flex;') &&
      freeForeverLabelRule.includes('align-items: center;') &&
      freeForeverLabelRule.includes('color: #11142D;') &&
      freeForeverLabelRule.includes('mix-blend-mode: normal;') &&
      freeForeverLabelRule.includes('opacity: 0.8;') &&
      css.includes('@media (max-width: 980px)') &&
      css.includes('@media (max-width: 720px)') &&
      !css.includes('.free-forever-copy > span {\n    font-size:') &&
      !css.includes('.free-forever-copy > span {\n    line-height:'),
  },
  {
    name: 'free forever body copy uses requested absolute Figma positioning and typography',
    pass:
      app.includes('className="free-forever-copy__body"') &&
      freeForeverBodyRule.includes('position: absolute;') &&
      freeForeverBodyRule.includes('height: 140px;') &&
      freeForeverBodyRule.includes('left: 0%;') &&
      freeForeverBodyRule.includes('right: 0%;') &&
      freeForeverBodyRule.includes('top: calc(50% - 140px / 2 + 64px);') &&
      freeForeverBodyRule.includes("font-family: 'Poppins';") &&
      freeForeverBodyRule.includes('font-style: normal;') &&
      freeForeverBodyRule.includes('font-weight: 400;') &&
      freeForeverBodyRule.includes('font-size: 19px;') &&
      freeForeverBodyRule.includes('line-height: 35px;') &&
      freeForeverBodyRule.includes('color: rgba(17, 20, 45, 0.637229);') &&
      css.includes('@media (max-width: 980px)') &&
      css.includes('@media (max-width: 720px)') &&
      css.includes('min-height: 400px;'),
  },
  {
    name: 'free forever mobile copy uses normal flow and readable text spacing',
    pass:
      mobileFreeForeverCopyRule.includes('min-height: 0;') &&
      mobileFreeForeverTitleRule.includes('position: static;') &&
      mobileFreeForeverTitleRule.includes('inset: auto;') &&
      mobileFreeForeverTitleRule.includes('font-size: 32px;') &&
      mobileFreeForeverTitleRule.includes('line-height: 40px;') &&
      mobileFreeForeverBodyRule.includes('position: static;') &&
      mobileFreeForeverBodyRule.includes('height: auto;') &&
      mobileFreeForeverBodyRule.includes('max-width: 100%;') &&
      mobileFreeForeverBodyRule.includes('font-size: 16px;') &&
      mobileFreeForeverBodyRule.includes('line-height: 28px;'),
  },
  {
    name: 'upcoming payment text uses requested absolute Figma typography without breakpoint overrides',
    pass:
      app.includes('className="payment-card__text"') &&
      app.includes('className="payment-card__eyebrow"') &&
      app.includes('className="payment-card__value"') &&
      /position:\s*relative;/.test(paymentCardTextRule) &&
      /min-height:\s*45px;/.test(paymentCardTextRule) &&
      /position:\s*absolute;/.test(paymentCardEyebrowRule) &&
      /width:\s*144px;/.test(paymentCardEyebrowRule) &&
      /height:\s*21px;/.test(paymentCardEyebrowRule) &&
      /left:\s*0;/.test(paymentCardEyebrowRule) &&
      /top:\s*0;/.test(paymentCardEyebrowRule) &&
      /font-family:\s*'Poppins';/.test(paymentCardEyebrowRule) &&
      /font-style:\s*normal;/.test(paymentCardEyebrowRule) &&
      /font-weight:\s*600;/.test(paymentCardEyebrowRule) &&
      /font-size:\s*12px;/.test(paymentCardEyebrowRule) &&
      /line-height:\s*21px;/.test(paymentCardEyebrowRule) &&
      /color:\s*#1E3E85;/.test(paymentCardEyebrowRule) &&
      /position:\s*absolute;/.test(paymentCardValueRule) &&
      /width:\s*140px;/.test(paymentCardValueRule) &&
      /height:\s*24px;/.test(paymentCardValueRule) &&
      /left:\s*0;/.test(paymentCardValueRule) &&
      /top:\s*21px;/.test(paymentCardValueRule) &&
      /font-family:\s*'Poppins';/.test(paymentCardValueRule) &&
      /font-style:\s*normal;/.test(paymentCardValueRule) &&
      /font-weight:\s*500;/.test(paymentCardValueRule) &&
      /font-size:\s*17px;/.test(paymentCardValueRule) &&
      /line-height:\s*24px;/.test(paymentCardValueRule) &&
      /color:\s*#11142D;/.test(paymentCardValueRule) &&
      !css.includes('.payment-card span:not(.payment-card__icon)') &&
      !css.includes('.payment-card strong'),
  },
  {
    name: 'free forever live desktop card geometry matches the Figma artboard coordinates',
    pass:
      css.includes('left: 7.91897%;') &&
      css.includes('top: 8.42857%;') &&
      css.includes('width: 32.68877%;') &&
      css.includes('min-height: 71.42857%;') &&
      css.includes('left: 1.74954%;') &&
      css.includes('top: 65.42857%;') &&
      css.includes('width: 32.41252%;') &&
      css.includes('left: 34.89871%;') &&
      css.includes('top: 23.57143%;') &&
      css.includes('width: 8.37937%;'),
  },
  {
    name: 'free forever mobile fallback uses reference payment and RemoteRecruit marks',
    pass:
      app.includes("remoteRecruitMarkSrc from './assets/logo_base.svg'") &&
      app.includes('function PaypalMark()') &&
      app.includes('className="payment-card__logo"') &&
      app.includes('src={remoteRecruitMarkSrc}') &&
      css.includes('.payment-card__logo') &&
      css.includes('.free-forever-brand-mark img'),
  },
  {
    name: 'custom profile right side uses optimized raster art with only requested editable overlays',
    pass:
      app.includes('const customProfileSkills') &&
      app.includes('const customProfileFeedback') &&
      app.includes('className="custom-profile-copy"') &&
      app.includes('<span>Custom Profile</span>') &&
      app.includes('<h2 id="custom-profile-title">Showcase Your Talents</h2>') &&
      app.includes('className="custom-profile-section__visual"') &&
      app.includes('className="custom-profile-art"') &&
      app.includes('src={bestDeveloperArtSrc}') &&
      app.includes('className="custom-profile-overlay"') &&
      app.includes('className="custom-profile-overlay__feedback"') &&
      app.includes('className="custom-profile-overlay__skill"') &&
      app.includes('Past Client Feedback') &&
      app.includes('Best Developer Ever!') &&
      app.includes('customProfileSkills.map') &&
      app.includes('Python Dev') &&
      app.includes('Javascript') &&
      app.includes('Front End') &&
      app.includes('Back End') &&
      app.includes('IOS Development') &&
      app.includes('+12') &&
      app.includes("bestDeveloperArtSrc from './assets/optimized/best_developer_ever_right_node.webp'") &&
      !app.includes("bestDeveloperArtSrc from './screens_svg/04_custom_profiles_best_developer_ever/best_developer_ever_right_node.svg'") &&
      !app.includes("customProfileCopySrc from './screens_svg/04_custom_profiles_best_developer_ever/custom_profile_show_case_talent_left_node.svg'") &&
      !app.includes('function CustomProfileVisual') &&
      css.includes('.custom-profile-copy') &&
      css.includes('.custom-profile-art') &&
      css.includes('.custom-profile-overlay') &&
      css.includes('.custom-profile-overlay__feedback') &&
      css.includes('.custom-profile-overlay__skill') &&
      !css.includes('.profile-video-card') &&
      !css.includes('.profile-floating-avatar') &&
      css.includes('user-select: text;'),
  },
  {
    name: 'custom profile label keeps rounded blue badge while using requested text styles',
    pass:
      customProfileLabelRule.includes('display: flex;') &&
      customProfileLabelRule.includes('min-width: 130px;') &&
      customProfileLabelRule.includes('min-height: 36px;') &&
      customProfileLabelRule.includes('align-items: center;') &&
      customProfileLabelRule.includes('justify-content: center;') &&
      customProfileLabelRule.includes('border-radius: 999px;') &&
      customProfileLabelRule.includes('padding: 0 20px;') &&
      customProfileLabelRule.includes('background: #c2eeff;') &&
      customProfileLabelRule.includes("font-family: 'Poppins';") &&
      customProfileLabelRule.includes('font-style: normal;') &&
      customProfileLabelRule.includes('font-weight: 600;') &&
      customProfileLabelRule.includes('font-size: 12px;') &&
      customProfileLabelRule.includes('line-height: 15px;') &&
      customProfileLabelRule.includes('color: #11142D;') &&
      customProfileLabelRule.includes('mix-blend-mode: normal;') &&
      customProfileLabelRule.includes('opacity: 0.8;') &&
      !css.includes('.custom-profile-copy > span {\n    font-size:') &&
      !css.includes('.custom-profile-copy > span {\n    font-weight:'),
  },
  {
    name: 'custom profile title keeps desktop typography on tablet and mobile',
    pass:
      customProfileTitleRule.includes("font-family: 'Poppins';") &&
      customProfileTitleRule.includes('font-style: normal;') &&
      customProfileTitleRule.includes('font-size: 40px;') &&
      customProfileTitleRule.includes('font-weight: 500;') &&
      customProfileTitleRule.includes('line-height: 52px;') &&
      customProfileTitleRule.includes('color: #11142D;') &&
      tabletCustomProfileTitleRule.includes('position: static;') &&
      tabletCustomProfileTitleRule.includes('inset: auto;') &&
      !tabletCustomProfileTitleRule.includes('font-size: 24px;') &&
      !tabletCustomProfileTitleRule.includes('font-weight: 900;') &&
      mobileCustomProfileTitleRule.includes('font-size: 40px;') &&
      mobileCustomProfileTitleRule.includes('font-weight: 500;') &&
      mobileCustomProfileTitleRule.includes('line-height: 52px;') &&
      !mobileCustomProfileTitleRule.includes('font-size: 24px;') &&
      !mobileCustomProfileTitleRule.includes('font-weight: 900;') &&
      !css.includes('.mobile-feature__copy h2,\n  .custom-profile-copy h2 {\n    max-width: 100%;\n    font-size: 24px;'),
  },
  {
    name: 'custom profile overlay typography and tag boxes match the SVG artboard',
    pass:
      css.includes('container-type: inline-size;') &&
      css.includes('top: 47.24916%;') &&
      css.includes('left: 17.61712%;') &&
      css.includes(':where(.custom-profile-overlay p),') &&
      /\.custom-profile-overlay__feedback-eyebrow\s*\{[^}]*font-family: 'Poppins';[^}]*font-style: normal;[^}]*font-weight: 600;[^}]*font-size: 12px;[^}]*line-height: 21px;[^}]*color: #1E3E85;/s.test(css) &&
      /\.custom-profile-overlay__feedback-title\s*\{[^}]*font-family: 'Poppins';[^}]*font-style: normal;[^}]*font-weight: 500;[^}]*font-size: 17px;[^}]*line-height: 24px;[^}]*color: #11142D;/s.test(css) &&
      /\.custom-profile-overlay__feedback-title\s*\{[^}]*white-space: nowrap;/.test(css) &&
      css.includes('color: #11142d;') &&
      hasRequestedCustomProfileSkillTextStyles(customProfileSkillBaseRule) &&
      tabletCustomProfileSkillRule === '' &&
      mobileCustomProfileSkillRule === '' &&
      !customProfileSkillBaseRule.includes('rgba(87, 153, 235, 0.1)') &&
      !customProfileSkillBaseRule.includes('rgba(159, 116, 251, 0.1)') &&
      css.includes('top: 61.44393%;') &&
      css.includes('top: 68.8172%;') &&
      css.includes('left: 38.73874%;') &&
      css.includes('left: 57.47748%;') &&
      css.includes('left: 62.34234%;') &&
      css.includes('width: 23.24324%;') &&
      css.includes('width: 7.56757%;'),
  },
  {
    name: 'custom profile skills keep +12 aligned to the compact SVG row gap',
    pass:
      Number.isFinite(iosDevelopmentRight) &&
      Number.isFinite(moreSkillsLeft) &&
      moreSkillsLeft - iosDevelopmentRight >= 2.5 &&
      moreSkillsLeft - iosDevelopmentRight <= 3.25,
  },
  {
    name: 'pricing cards render visible selectable plan text instead of image-only card text',
    pass:
      app.includes('const pricingPlans') &&
      app.includes('function PricingCard') &&
      app.includes('pricing-card pricing-card--') &&
      app.includes('$79.99') &&
      app.includes('Per Month') &&
      app.includes('Unlimited Job Posts') &&
      app.includes('Instant Job Post Approval') &&
      css.includes('.pricing-card') &&
      css.includes('.pricing-card__button') &&
      css.includes('user-select: text;'),
  },
  {
    name: 'pricing plan status icons are replaceable inline SVG components',
    pass:
      app.includes('function StatusIcon') &&
      app.includes('className="status-icon__glyph"') &&
      app.includes('viewBox="0 0 12 12"') &&
      css.includes('.status-icon__glyph') &&
      !css.includes('.status-icon::after') &&
      !css.includes('.status-icon--muted::before'),
  },
  {
    name: 'premium footer pricing card shares base card width with a correctly scaled logo badge',
    pass:
      app.includes('className="pricing-card__badge-icon"') &&
      app.includes('src={remoteRecruitMarkSrc}') &&
      pricingCardRule.includes('position: relative;') &&
      pricingCardRule.includes('grid-template-columns: minmax(160px, 0.42fr) minmax(0, 1fr);') &&
      !pricingPremiumCardRule.includes('max-width: 333px;') &&
      !pricingPremiumCardRule.includes('grid-template-columns: 107px minmax(0, 1fr);') &&
      !pricingPremiumCardRule.includes('grid-template-rows: 135px 47px;') &&
      pricingPremiumSummaryRule.includes('background: #eef4ff;') &&
      pricingSummaryRule.includes('justify-content: center;') &&
      pricingPremiumBadgeRule.includes('gap: 12px;') &&
      pricingPremiumBadgeRule.includes('position: absolute;') &&
      pricingPremiumBadgeRule.includes('top: 10px;') &&
      pricingPremiumBadgeRule.includes('left: 35px;') &&
      pricingPremiumBadgeRule.includes('width: 146px;') &&
      pricingPremiumBadgeRule.includes('max-width: calc(100% - 70px);') &&
      pricingPremiumBadgeRule.includes('height: 44px;') &&
      pricingPremiumBadgeRule.includes('padding: 0 12px;') &&
      pricingPremiumBadgeRule.includes('font-size: 16px;') &&
      pricingPremiumBadgeRule.includes('font-weight: 700;') &&
      pricingPremiumBadgeIconRule.includes('width: 36px;') &&
      pricingPremiumBadgeIconRule.includes('height: 36px;') &&
      pricingCardFeatureRule.includes('font-weight: 600;') &&
      pricingCardFeatureRule.includes('color: rgba(17, 20, 45, 0.86);') &&
      !pricingPremiumButtonRule.includes('min-height: 47px;') &&
      !pricingPremiumButtonRule.includes('border-radius: 14px;') &&
      !css.includes('  .pricing-card--premium {\n    max-width: 333px;'),
  },
  {
    name: 'pricing cards use centered single-column premium layout at tablet and mobile widths',
    pass:
      tabletPricingCardRule.includes('grid-template-columns: 1fr;') &&
      tabletPricingBadgeRule.includes('left: 50%;') &&
      tabletPricingBadgeRule.includes('transform: translateX(-50%);') &&
      !tabletPricingBadgeRule.includes('left: 27px;'),
  },
  {
    name: 'pricing title uses requested Poppins typography across responsive layouts',
    pass:
      app.includes('<h2 id="pricing-title">Help Is One Click Away</h2>') &&
      pricingTitleRule.includes("font-family: 'Poppins';") &&
      pricingTitleRule.includes('font-style: normal;') &&
      pricingTitleRule.includes('font-weight: 600;') &&
      pricingTitleRule.includes('font-size: 40px;') &&
      pricingTitleRule.includes('line-height: 52px;') &&
      pricingTitleRule.includes('display: flex;') &&
      pricingTitleRule.includes('align-items: center;') &&
      pricingTitleRule.includes('justify-content: center;') &&
      pricingTitleRule.includes('text-align: center;') &&
      pricingTitleRule.includes('color: #11142D;') &&
      css.includes('@media (max-width: 980px)') &&
      css.includes('@media (max-width: 720px)') &&
      !css.includes('.pricing-inner h2 {\n    font-size:') &&
      !css.includes('.pricing-inner h2 {\n    line-height:'),
  },
  {
    name: 'common questions title is live text with requested Poppins typography across breakpoints',
    pass:
      app.includes('<h2 id="questions-title" className="questions-section__title">Common Questions</h2>') &&
      !app.includes('<div className="visually-hidden">\n          <h2 id="questions-title">Common Questions</h2>') &&
      questionsTitleRule.includes("font-family: 'Poppins';") &&
      questionsTitleRule.includes('font-style: normal;') &&
      questionsTitleRule.includes('font-weight: 500;') &&
      questionsTitleRule.includes('font-size: 40px;') &&
      questionsTitleRule.includes('line-height: 52px;') &&
      questionsTitleRule.includes('color: #11142D;') &&
      questionsTitleRule.includes('text-wrap: balance;') &&
      css.includes('@media (max-width: 980px)') &&
      css.includes('@media (max-width: 720px)') &&
      !css.includes('.questions-section__title {\n    font-size:'),
  },
  {
    name: 'common questions title remains above the FAQ overlay for text selection',
    pass:
      questionsTitleRule.includes('z-index: 3;') &&
      questionsTitleRule.includes('user-select: text;') &&
      questionsContentRule.includes('z-index: 2;') &&
      questionsContentRule.includes('pointer-events: auto;'),
  },
  {
    name: 'common questions FAQ copy and CTA label render as visible selectable HTML',
    pass:
      app.includes('const commonQuestions = [') &&
      app.includes('className="questions-section__content"') &&
      app.includes('className="questions-section__item"') &&
      app.includes('className="questions-section__question"') &&
      app.includes('className="questions-section__answer"') &&
      app.includes('Do I have to sign a long-term contract?') &&
      app.includes('Can I pay for a whole year?') &&
      app.includes('What if I need help?') &&
      app.includes('className="questions-section__action-label"') &&
      app.includes('More Questions') &&
      !app.includes('<div className="visually-hidden">\n          <h3>Do I have to sign a long-term contract?</h3>') &&
      /position:\s*absolute;/.test(questionsContentRule) &&
      /user-select:\s*text;/.test(questionsContentRule) &&
      /pointer-events:\s*auto;/.test(questionsContentRule) &&
      /user-select:\s*text;/.test(questionsItemRule) &&
      /font-family:\s*'Poppins';/.test(questionsQuestionRule) &&
      /font-weight:\s*500;/.test(questionsQuestionRule) &&
      /font-size:\s*19px;/.test(questionsQuestionRule) &&
      /line-height:\s*26px;/.test(questionsQuestionRule) &&
      /color:\s*#11142D;/.test(questionsQuestionRule) &&
      /font-family:\s*'Poppins';/.test(questionsAnswerRule) &&
      /font-weight:\s*400;/.test(questionsAnswerRule) &&
      /font-size:\s*15px;/.test(questionsAnswerRule) &&
      /line-height:\s*28px;/.test(questionsAnswerRule) &&
      /color:\s*rgba\(17,\s*20,\s*45,\s*0\.637229\);/.test(questionsAnswerRule) &&
      /position:\s*absolute;/.test(questionsActionRule) &&
      /user-select:\s*text;/.test(questionsActionRule) &&
      css.includes('.questions-section__vector-text-mask') &&
      css.includes('@media (max-width: 980px)') &&
      css.includes('@media (max-width: 720px)'),
  },
  {
    name: 'ready section renders right-side copy and CTA as selectable HTML',
    pass:
      app.includes("readyLeftArtSrc from './assets/optimized/lets_find_work_left.webp'") &&
      app.includes('function ReadyArrowIcon()') &&
      app.includes('className="ready-section__left-art"') &&
      app.includes('className="ready-section__copy"') &&
      app.includes('className="ready-section__eyebrow"') &&
      app.includes('<p className="ready-section__eyebrow">Are you ready?</p>') &&
      app.includes('<h2 id="ready-title">Help is only a few clicks away!</h2>') &&
      app.includes('className="ready-section__body"') &&
      app.includes('Click Below to get set up super quickly and find help now!') &&
      app.includes('className="ready-section__action-label"') &&
      app.includes('Get Started') &&
      app.includes('<ReadyArrowIcon />') &&
      !app.includes('className="art-hit-area ready-section__action"') &&
      !app.includes('src={readyArtSrc}') &&
      css.includes('.ready-section__copy') &&
      css.includes('.ready-section__action-label') &&
      css.includes('user-select: text;'),
  },
  {
    name: 'ready section right-side typography matches the expected screenshot',
    pass:
      /color:\s*#1e3e85;/i.test(readyEyebrowRule) &&
      /font-family:\s*'Poppins';/.test(readyEyebrowRule) &&
      /font-style:\s*normal;/.test(readyEyebrowRule) &&
      /font-size:\s*16px;/.test(readyEyebrowRule) &&
      /font-weight:\s*600;/.test(readyEyebrowRule) &&
      /line-height:\s*30px;/.test(readyEyebrowRule) &&
      /letter-spacing:\s*1px;/.test(readyEyebrowRule) &&
      /color:\s*#11142d;/i.test(readyTitleRule) &&
      /max-width:\s*390px;/.test(readyTitleRule) &&
      /font-family:\s*'Poppins';/.test(readyTitleRule) &&
      /font-style:\s*normal;/.test(readyTitleRule) &&
      /font-size:\s*44px;/.test(readyTitleRule) &&
      /font-weight:\s*600;/.test(readyTitleRule) &&
      /line-height:\s*57px;/.test(readyTitleRule),
  },
  {
    name: 'ready section frame stays full-bleed on wide desktop viewports',
    pass:
      /width:\s*100%;/.test(readyFrameRule) &&
      /max-width:\s*none;/.test(readyFrameRule),
  },
  {
    name: 'ready section mobile keeps left-side artwork fully visible',
    pass:
      /min-height:\s*clamp\(620px,\s*calc\(520px\s*\+\s*28vw\),\s*720px\);/.test(mobileReadyFrameRule) &&
      /left:\s*50%;/.test(mobileReadyLeftArtRule) &&
      /width:\s*min\(calc\(100%\s*-\s*24px\),\s*520px\);/.test(mobileReadyLeftArtRule) &&
      /transform:\s*translateX\(-50%\);/.test(mobileReadyLeftArtRule) &&
      /font-size:\s*clamp\(28px,\s*9vw,\s*32px\);/.test(mobileReadyTitleRule) &&
      /overflow-wrap:\s*break-word;/.test(mobileReadyTitleRule) &&
      /text-wrap:\s*balance;/.test(mobileReadyTitleRule) &&
      !/left:\s*-\d+px;/.test(mobileReadyLeftArtRule) &&
      !/width:\s*760px;/.test(mobileReadyLeftArtRule),
  },
  {
    name: 'ready section CTA label uses fixed Figma typography and responsive absolute alignment',
    pass:
      /position:\s*relative;/.test(readyActionRule) &&
      /position:\s*absolute;/.test(readyActionLabelRule) &&
      /width:\s*92px;/.test(readyActionLabelRule) &&
      /height:\s*24px;/.test(readyActionLabelRule) &&
      /left:\s*calc\(50%\s*-\s*92px\s*\/\s*2\s*\+\s*21\.5px\);/.test(readyActionLabelRule) &&
      /top:\s*calc\(50%\s*-\s*24px\s*\/\s*2\s*-\s*1\.5px\);/.test(readyActionLabelRule) &&
      /font-family:\s*'Poppins';/.test(readyActionLabelRule) &&
      /font-style:\s*normal;/.test(readyActionLabelRule) &&
      /font-weight:\s*500;/.test(readyActionLabelRule) &&
      /font-size:\s*16px;/.test(readyActionLabelRule) &&
      /line-height:\s*24px;/.test(readyActionLabelRule) &&
      /text-align:\s*center;/.test(readyActionLabelRule) &&
      /color:\s*#1e3e85;/i.test(readyActionLabelRule) &&
      !css.includes('.ready-section__action-label {\n    font-size: 15px;'),
  },
  {
    name: 'cta, faq, pricing, and footer keep interactive targets with live pricing cards',
    pass:
      app.includes('className="ready-section__action"') &&
      app.includes('src={questionsArtSrc}') &&
      app.includes('src={footerArtSrc}') &&
      app.includes('className="art-hit-area questions-section__action"') &&
      app.includes('className="pricing-card-grid"') &&
      app.includes('className="pricing-card__button"'),
  },
  {
    name: 'footer social links remain visible and individually clickable on mobile',
    pass:
      app.includes('function SocialIcon') &&
      app.includes('icon:') &&
      app.includes('href:') &&
      app.includes('<SocialIcon icon={link.icon} />') &&
      app.includes('className="footer-social-hit__icon"') &&
      /<a className=\{link\.className\} href=\{link\.href\}/.test(app) &&
      footerSocialHitRule.includes('display: inline-flex;') &&
      footerSocialHitRule.includes('align-items: center;') &&
      footerSocialHitRule.includes('justify-content: center;') &&
      footerSocialIconRule.includes('display: block;') &&
      footerSocialIconRule.includes('width: 100%;') &&
      footerSocialIconRule.includes('height: 100%;'),
  },
  {
    name: 'help pricing cards are layered over the footer SVG instead of before a blue footer block',
    pass:
      app.includes('className="footer-pricing-layer"') &&
      app.includes('className="figma-section figma-section--footer site-footer"') &&
      !app.includes('        <PricingSection />\n') &&
      footerPricingLayerRule.includes('position: relative;') &&
      footerPricingLayerRule.includes('z-index: 2;') &&
      footerSectionRule.includes('background: #ffffff;') &&
      !footerSectionRule.includes('background: #244f90;') &&
      !/margin-top:\s*-/.test(siteFooterRule),
  },
  {
    name: 'high-fidelity Figma sections use stable responsive image geometry',
    pass:
      css.includes('.figma-section__frame') &&
      css.includes('aspect-ratio: var(--section-ratio);') &&
      css.includes('--section-ratio: 1152 / 651;') &&
      css.includes('--section-ratio: 1086 / 700;') &&
      css.includes('--section-ratio: 1440 / 610;') &&
      css.includes('--section-ratio: 1040 / 637;') &&
      css.includes('--section-ratio: 1440 / 569;'),
  },
  {
    name: 'desktop header uses the reference artboard gutters and navbar artwork',
    pass:
      app.includes("brandNameSrc from './screens_svg/brand_name.svg'") &&
      app.includes('className="brand-art"') &&
      css.includes('width: calc(100% - 102px);') &&
      css.includes('padding: 29px 0 0;') &&
      css.includes('width: 124px;') &&
      css.includes('height: 50px;') &&
      css.includes('gap: 36px;') &&
      css.includes('width: 92px;') &&
      css.includes('border-radius: 16px;'),
  },
  {
    name: 'desktop hero and auth typography match the reference SVG',
    pass:
      !hasRemoteFontReference &&
      css.includes('font-size: 53px;') &&
      css.includes('line-height: 68px;') &&
      css.includes('display: flex;') &&
      css.includes('align-items: center;') &&
      css.includes('max-width: 778px;') &&
      css.includes('color: #FFFFFF;') &&
      css.includes('font-size: 20px;') &&
      css.includes('font-weight: 500;') &&
      css.includes('line-height: 32px;') &&
      css.includes('font-weight: 700;'),
  },
  {
    name: 'header sign in and sign up use requested Poppins typography across desktop tablet and mobile',
    pass:
      authButtonRule.includes("font-family: 'Poppins';") &&
      authButtonRule.includes('font-style: normal;') &&
      authButtonRule.includes('font-weight: 600;') &&
      authButtonRule.includes('font-size: 14px;') &&
      authButtonRule.includes('line-height: 18px;') &&
      authButtonRule.includes('display: flex;') &&
      authButtonRule.includes('align-items: center;') &&
      authButtonRule.includes('text-align: center;') &&
      authButtonRule.includes('letter-spacing: 0.4px;') &&
      authButtonRule.includes('color: #F5F7FE;') &&
      !/font-family|font-style|font-weight|font-size|line-height|letter-spacing|color|text-align/.test(mobileAuthButtonRule),
  },
  {
    name: 'hero subtitle uses requested Poppins typography across desktop tablet and mobile layouts',
    pass: [heroSubtitleRule, tabletHeroSubtitleRule, mobileHeroSubtitleRule].every(
      (rule) =>
        rule.includes("font-family: 'Poppins';") &&
        rule.includes('font-style: normal;') &&
        rule.includes('font-weight: 500;') &&
        rule.includes('font-size: 20px;') &&
        rule.includes('line-height: 32px;') &&
        rule.includes('text-align: center;') &&
        rule.includes('color: #FFFFFF;') &&
        rule.includes('mix-blend-mode: normal;') &&
        rule.includes('opacity: 0.8;'),
    ),
  },
  {
    name: 'semantic accessibility is preserved behind vectorized visible copy',
    pass:
      app.includes('aria-labelledby="hero-title"') &&
      app.includes('id="global-reach-title"') &&
      app.includes('id="free-forever-title"') &&
      app.includes('id="custom-profile-title"') &&
      app.includes('id="ready-title"') &&
      app.includes('id="questions-title"') &&
      app.includes('id="pricing-title"') &&
      css.includes('.visually-hidden'),
  },
  {
    name: 'interactive overlay controls remain keyboard focusable',
    pass:
      app.includes('aria-label="Get started"') &&
      app.includes('aria-label="More questions"') &&
      app.includes("ariaLabel: 'Get started with the Free basic plan'") &&
      app.includes("ariaLabel: 'Get started with the Premium plan'") &&
      css.includes('.art-hit-area:focus-visible') &&
      css.includes('.pricing-card__button:focus-visible'),
  },
  {
    name: 'responsive layout keeps split art and pricing cards from overflowing mobile viewports',
    pass:
      css.includes('@media (max-width: 720px)') &&
      css.includes('grid-template-columns: 1fr;') &&
      css.includes('width: calc(100% - 24px);') &&
      css.includes('width: min(100%, 520px);') &&
      css.includes('min-height: 350px;'),
  },
  {
    name: 'global typography baseline keeps the Figma font family available',
    pass: !hasRemoteFontReference && css.includes('font-family: Poppins, Inter, ui-sans-serif'),
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
