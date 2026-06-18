import { readFileSync } from 'node:fs'

const app = readFileSync('src/App.tsx', 'utf8')
const css = readFileSync('src/App.css', 'utf8')
const indexCss = readFileSync('src/index.css', 'utf8')
const headerBackgroundSvg = readFileSync('src/screens_svg/01_header/01_header_background.svg', 'utf8')
const globalReachDesktopParagraph =
  app.match(/<article className="global-reach-section__copy">[\s\S]*?<p>([\s\S]*?)<\/p>/)?.[1] ?? ''
const normalizedGlobalReachDesktopParagraph = globalReachDesktopParagraph
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()

const checks = [
  {
    name: 'homepage imports the reorganized high-fidelity Figma section assets',
    pass:
      app.includes("headerBackgroundSrc from './screens_svg/01_header/01_header_background.svg'") &&
      app.includes("globalReachVisualSrc from './screens_svg/02_global_reach/lets_find_work_right_node.svg'") &&
      app.includes("customProfileCopySrc from './screens_svg/04_custom_profiles_best_developer_ever/custom_profile_show_case_talent_left_node.svg'") &&
      app.includes("bestDeveloperArtSrc from './screens_svg/04_custom_profiles_best_developer_ever/best_developer_ever_right_node.svg'") &&
      app.includes("readyArtSrc from './screens_svg/05_are_you_readyy/are_you_ready_help_is_only_a_few_clicks_away_full_node.svg'") &&
      app.includes("questionsArtSrc from './screens_svg/06_common_questions/common_questions_node.svg'") &&
      app.includes("footerArtSrc from './screens_svg/08_footer/footer_full_node.svg'"),
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
      app.includes('src={customProfileCopySrc}') &&
      app.includes('src={bestDeveloperArtSrc}') &&
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
      app.includes("remoteRecruitMarkSrc from '../supporting_files/REMOTE RECRUIT sign color background blue.svg'") &&
      app.includes('function PaypalMark()') &&
      app.includes('className="payment-card__logo"') &&
      app.includes('src={remoteRecruitMarkSrc}') &&
      css.includes('.payment-card__logo') &&
      css.includes('.free-forever-brand-mark img'),
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
    name: 'cta, faq, pricing, and footer keep interactive targets with live pricing cards',
    pass:
      app.includes('src={readyArtSrc}') &&
      app.includes('src={questionsArtSrc}') &&
      app.includes('src={footerArtSrc}') &&
      app.includes('className="art-hit-area ready-section__action"') &&
      app.includes('className="art-hit-area questions-section__action"') &&
      app.includes('className="pricing-card-grid"') &&
      app.includes('className="pricing-card__button"'),
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
      indexCss.includes('family=Poppins:wght@400;700;900') &&
      css.includes('font-size: 52px;') &&
      css.includes('line-height: 1.05;') &&
      css.includes('max-width: 778px;') &&
      css.includes('color: rgba(255, 255, 255, 0.802926);') &&
      css.includes('font-size: 20px;') &&
      css.includes('font-weight: 400;') &&
      css.includes('line-height: 1.6;') &&
      css.includes('font-weight: 700;'),
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
    pass:
      indexCss.includes('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap') &&
      css.includes('font-family: Poppins, Inter, ui-sans-serif'),
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
