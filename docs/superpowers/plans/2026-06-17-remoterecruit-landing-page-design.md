# RemoteRecruit Landing Page Design Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Vite starter screen with a responsive, accessible RemoteRecruit landing page that closely follows `supporting_files/RemoteRecruit - Features.png`.

**Architecture:** Keep this small static page in `src/App.tsx` and `src/App.css`, with data arrays and local reusable components for buttons, reveals, feature rows, pricing cards, and scroll-to-top behavior. Use the provided exported RemoteRecruit assets for logo and product mockups while keeping all layout, headings, CTA buttons, FAQ text, pricing text, and responsive behavior as real HTML/CSS.

**Tech Stack:** Vite 8, React 19, TypeScript 6, CSS, existing Tailwind import only for the framework baseline.

---

## File Structure

- Modify: `src/App.tsx`
  - Owns all RemoteRecruit page data, semantic page sections, reusable local components, smooth-scroll behavior, reveal registration, and scroll-to-top state.
- Modify: `src/App.css`
  - Owns all page-specific layout, colors, responsive styling, decorative shapes, feature visuals, reveal animation, hover/focus states, and reduced-motion overrides.
- Modify: `src/index.css`
  - Keeps the Tailwind import and adds global document sizing, font smoothing, and scroll behavior.
- Read-only assets:
  - `supporting_files/REMOTE RECRUIT sign color background blue.svg`
  - `supporting_files/Group 136@3x.svg`
  - `supporting_files/Group 136@3x-1.svg`
  - `supporting_files/Group 136-2.png`
  - `supporting_files/Background.svg`
  - `supporting_files/RemoteRecruit - Features.png`

---

### Task 1: Replace Starter JSX With Page Components

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Confirm the starter app builds before editing**

Run:

```bash
npm run build
```

Expected: PASS with TypeScript and Vite build output. If this fails before edits, record the existing failure and continue only after confirming it is unrelated to the landing page plan.

- [ ] **Step 2: Replace `src/App.tsx` with the complete RemoteRecruit component tree**

Use this exact file content:

```tsx
import { useEffect, useState, type ReactNode } from 'react'
import logoSrc from '../supporting_files/REMOTE RECRUIT sign color background blue.svg'
import globalBoardSrc from '../supporting_files/Group 136@3x.svg'
import membershipSrc from '../supporting_files/Group 136@3x-1.svg'
import profileSrc from '../supporting_files/Group 136-2.png'
import './App.css'

type Feature = {
  eyebrow: string
  title: string
  body: string
  image: string
  alt: string
  reverse?: boolean
}

type PricingPlan = {
  name: string
  tier: string
  price: string
  cadence: string
  features: string[]
  featured?: boolean
}

const features: Feature[] = [
  {
    eyebrow: 'Global Reach',
    title: 'The First Fully Global Job Board, Anywhere, Ever',
    body:
      'RemoteRecruit connects candidates with opportunities around the world. With today\'s remote-first workforce, you need to be able to find the best jobs and the best people for them, wherever they may be.',
    image: globalBoardSrc,
    alt: 'RemoteRecruit job board preview with candidate recommendation cards',
  },
  {
    eyebrow: 'Actually Fee Free',
    title: 'Fee-Free Forever',
    body:
      'We do not charge you fees and we do not put up paywalls. We are the bridge that connects job opportunities with the best candidates, with no middleman involved.',
    image: membershipSrc,
    alt: 'RemoteRecruit premium membership card showing included placement benefits',
    reverse: true,
  },
  {
    eyebrow: 'Custom Profile',
    title: 'Showcase Your Talents',
    body:
      'Personalize your profile with everything that makes you unique. Add an introductory video and other media for a personal touch that stands out to employers and candidates.',
    image: profileSrc,
    alt: 'RemoteRecruit profile preview with candidate feedback and skill tags',
  },
]

const faqs = [
  {
    question: 'Do I have to sign a long-term contract?',
    answer:
      'Actually beard single-origin coffee, twee 90\'s PBR Echo Park sartorial try-hard freegan Portland ennui. Selvage jean shorts 90\'s, Vice American Apparel try-hard food truck Shoreditch fap lomo Wes Anderson. Art party',
  },
  {
    question: 'Can I pay for a whole year?',
    answer:
      'Actually beard single-origin coffee, twee 90\'s PBR Echo Park sartorial try-hard freegan Portland ennui. Selvage',
  },
  {
    question: 'What if I need help?',
    answer:
      'Actually beard single-origin coffee, twee 90\'s PBR Echo Park sartorial try-hard freegan Portland ennui. Selvage jean shorts 90\'s, Vice American Apparel try-hard food truck Shoreditch fap lomo Wes Anderson. Art party',
  },
]

const pricingPlans: PricingPlan[] = [
  {
    name: 'Free',
    tier: 'Basic',
    price: '$0',
    cadence: 'Forever',
    features: ['1 Active Job', 'Basic List Placement', 'Unlimited Job Applicants', 'Invite Anyone to Apply to Your Jobs'],
  },
  {
    name: 'Premium',
    tier: 'Premium',
    price: '$79.99',
    cadence: 'Per Month',
    features: ['Unlimited Job Posts', 'Instant Job Post Approval', 'Premium List Placement', 'Unlimited Job Applicants'],
    featured: true,
  },
]

const socialLinks = ['f', 'ig', 'x', 'in', 'm']

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function Button({
  children,
  variant = 'primary',
  className = '',
  onClick,
  ariaLabel,
}: {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  onClick?: () => void
  ariaLabel?: string
}) {
  return (
    <button
      type="button"
      className={`button button--${variant} ${className}`.trim()}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}

function Pill({ children }: { children: ReactNode }) {
  return <span className="pill">{children}</span>
}

function SectionReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`section-reveal ${className}`.trim()} data-reveal>
      {children}
    </div>
  )
}

function Header() {
  return (
    <header className="site-header" aria-label="RemoteRecruit navigation">
      <a className="brand-link" href="#page-top" onClick={(event) => event.preventDefault()}>
        <img src={logoSrc} width="72" height="60" alt="RemoteRecruit" />
      </a>
      <nav className="header-actions" aria-label="Account actions">
        <Button variant="ghost" onClick={() => scrollToId('page-top')}>
          Sign in
        </Button>
        <Button onClick={() => scrollToId('pricing')}>Sign up</Button>
      </nav>
    </header>
  )
}

function HeroSection() {
  return (
    <section className="hero-section" id="page-top" aria-labelledby="hero-title">
      <div className="hero-background" aria-hidden="true" />
      <Header />
      <div className="hero-copy">
        <h1 id="hero-title">RemoteRecruit's Difference</h1>
        <p>
          RemoteRecruit is connecting the world with an easy-to-use platform that lets full-time,
          part-time, and freelance workers showcase their talents to businesses that need them.
          With no paywalls, no fees, and no barriers, there is nothing but you, your talents, and
          the next step in your career.
        </p>
      </div>
      <div className="hero-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 260" preserveAspectRatio="none" focusable="false">
          <path d="M0 64C160 196 354 207 548 118C729 35 850 5 1048 44C1198 74 1324 144 1440 212V260H0V64Z" />
        </svg>
      </div>
    </section>
  )
}

function FeatureSection({ feature }: { feature: Feature }) {
  return (
    <SectionReveal className={`feature-row ${feature.reverse ? 'feature-row--reverse' : ''}`}>
      <article className="feature-copy">
        <Pill>{feature.eyebrow}</Pill>
        <h2>{feature.title}</h2>
        <p>{feature.body}</p>
      </article>
      <div className="feature-visual">
        <span className="decorative-dot decorative-dot--top" aria-hidden="true" />
        <img src={feature.image} alt={feature.alt} loading="lazy" decoding="async" />
        <span className="brand-orb" aria-hidden="true">
          <img src={logoSrc} alt="" />
        </span>
      </div>
    </SectionReveal>
  )
}

function HelpCtaSection() {
  return (
    <section className="help-section" aria-labelledby="help-title">
      <SectionReveal className="help-layout">
        <div className="help-preview" aria-hidden="true">
          <img src={globalBoardSrc} alt="" loading="lazy" decoding="async" />
        </div>
        <div className="help-copy">
          <span className="help-kicker">Are you ready?</span>
          <h2 id="help-title">Help is only a few clicks away!</h2>
          <p>Click Below to get set up super quickly and find help now!</p>
          <Button onClick={() => scrollToId('pricing')} className="button--with-arrow">
            <span aria-hidden="true">-></span>
            Get Started
          </Button>
        </div>
      </SectionReveal>
    </section>
  )
}

function FaqSection() {
  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-title">
      <SectionReveal className="faq-inner">
        <h2 id="faq-title">Common Questions</h2>
        <div className="faq-list">
          {faqs.map((item) => (
            <article className="faq-item" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
        <Button variant="secondary" onClick={() => scrollToId('faq')}>
          More Questions
        </Button>
      </SectionReveal>
    </section>
  )
}

function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <article className={`pricing-card ${plan.featured ? 'pricing-card--featured' : ''}`}>
      <div className="pricing-heading">
        <span className="pricing-name">{plan.name}</span>
        <span className="pricing-tier">{plan.tier}</span>
      </div>
      <div className="pricing-body">
        <p className="pricing-price">{plan.price}</p>
        <p className="pricing-cadence">{plan.cadence}</p>
        <ul>
          {plan.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>
      <Button variant={plan.featured ? 'primary' : 'secondary'} onClick={() => scrollToId('pricing')}>
        Get Started
      </Button>
    </article>
  )
}

function PricingSection() {
  return (
    <section className="pricing-section" id="pricing" aria-labelledby="pricing-title">
      <SectionReveal className="pricing-inner">
        <h2 id="pricing-title">Help Is One Click Away</h2>
        <div className="pricing-grid">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </SectionReveal>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 170" preserveAspectRatio="none" focusable="false">
          <path d="M0 64C212 48 334 83 516 98C732 116 824 44 1028 38C1216 32 1322 67 1440 86V170H0V64Z" />
        </svg>
      </div>
      <div className="footer-inner">
        <img src={logoSrc} width="144" height="120" alt="RemoteRecruit" />
        <div className="social-links" aria-label="Social links">
          {socialLinks.map((label) => (
            <a href="#page-top" aria-label={`RemoteRecruit ${label}`} key={label}>
              {label}
            </a>
          ))}
        </div>
      </div>
      <img className="footer-mark" src={logoSrc} alt="" aria-hidden="true" />
    </footer>
  )
}

function ScrollToTopButton({ visible }: { visible: boolean }) {
  return (
    <button
      type="button"
      className={`scroll-top ${visible ? 'scroll-top--visible' : ''}`}
      onClick={() => scrollToId('page-top')}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  )
}

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

    if (!('IntersectionObserver' in window)) {
      revealNodes.forEach((node) => node.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.18 },
    )

    revealNodes.forEach((node) => observer.observe(node))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const updateScrollState = () => setShowScrollTop(window.scrollY > 560)

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })

    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  return (
    <>
      <HeroSection />
      <main>
        <section className="features-section" aria-label="RemoteRecruit features">
          {features.map((feature) => (
            <FeatureSection key={feature.title} feature={feature} />
          ))}
        </section>
        <HelpCtaSection />
        <FaqSection />
        <PricingSection />
      </main>
      <Footer />
      <ScrollToTopButton visible={showScrollTop} />
    </>
  )
}

export default App
```

- [ ] **Step 3: Run lint to catch TypeScript and JSX issues**

Run:

```bash
npm run lint
```

Expected: PASS with no unused imports, unused locals, or hook dependency warnings.

- [ ] **Step 4: Run build to catch asset import and type errors**

Run:

```bash
npm run build
```

Expected: PASS and `dist/` output generated by Vite.

- [ ] **Step 5: Commit the JSX replacement**

Run:

```bash
git add src/App.tsx
git commit -m "feat: add remoterecruit landing page structure"
```

Expected: commit succeeds with only `src/App.tsx` staged.

---

### Task 2: Add Page Styling And Responsive Layout

**Files:**
- Modify: `src/index.css`
- Modify: `src/App.css`

- [ ] **Step 1: Replace `src/index.css` with global document styles**

Use this exact file content:

```css
@import "tailwindcss";

:root {
  color: #262a42;
  background: #ffffff;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

html {
  min-width: 320px;
  min-height: 100%;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  overflow-x: hidden;
}

button,
a {
  font: inherit;
}

img,
svg {
  display: block;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

- [ ] **Step 2: Replace `src/App.css` with the complete landing page styles**

Use this exact file content:

```css
#root {
  min-height: 100vh;
  background: #ffffff;
}

.button {
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 0;
  border-radius: 999px;
  padding: 0 24px;
  font-size: 14px;
  font-weight: 800;
  line-height: 1;
  cursor: pointer;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    background-color 180ms ease,
    color 180ms ease;
}

.button:hover {
  transform: translateY(-2px);
}

.button:focus-visible,
.brand-link:focus-visible,
.social-links a:focus-visible,
.scroll-top:focus-visible {
  outline: 3px solid #f5c843;
  outline-offset: 4px;
}

.button--primary {
  color: #ffffff;
  background: linear-gradient(135deg, #55c4e5, #1f5fa8);
  box-shadow: 0 14px 32px rgba(39, 116, 181, 0.28);
}

.button--secondary {
  color: #215da1;
  background: #ffffff;
  border: 2px solid #48b6df;
  box-shadow: 0 10px 24px rgba(38, 95, 152, 0.12);
}

.button--ghost {
  min-height: 38px;
  padding: 0 18px;
  color: #ffffff;
  background: transparent;
  box-shadow: none;
}

.button--with-arrow span {
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border-radius: 50%;
  color: #55c4e5;
  background: #ffffff;
  font-weight: 900;
}

.pill {
  display: inline-flex;
  width: max-content;
  align-items: center;
  border-radius: 999px;
  padding: 7px 16px;
  color: #3f93bd;
  background: #c9f0fb;
  font-size: 11px;
  font-weight: 900;
}

.hero-section {
  position: relative;
  min-height: 690px;
  overflow: hidden;
  color: #ffffff;
  background: #244f90;
}

.hero-section::before,
.hero-section::after,
.hero-background::before {
  position: absolute;
  content: "";
  border-radius: 50%;
  pointer-events: none;
}

.hero-section::before {
  top: -430px;
  left: -130px;
  width: 780px;
  height: 780px;
  background: rgba(255, 255, 255, 0.035);
}

.hero-section::after {
  right: 24%;
  bottom: 40px;
  width: 620px;
  height: 620px;
  background: rgba(92, 177, 218, 0.18);
}

.hero-background {
  position: absolute;
  inset: 0;
  background-image: url("../supporting_files/Background.svg");
  background-size: cover;
  background-position: center top;
  opacity: 0.42;
}

.hero-background::before {
  bottom: 86px;
  left: -180px;
  width: 520px;
  height: 520px;
  background: rgba(82, 180, 218, 0.55);
}

.site-header {
  position: relative;
  z-index: 2;
  display: flex;
  width: min(1180px, calc(100% - 64px));
  margin: 0 auto;
  padding: 34px 0 0;
  align-items: flex-start;
  justify-content: space-between;
}

.brand-link {
  display: inline-flex;
  width: 88px;
  height: 74px;
  align-items: center;
  overflow: hidden;
}

.brand-link img {
  width: 86px;
  height: auto;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.hero-copy {
  position: relative;
  z-index: 2;
  width: min(760px, calc(100% - 48px));
  margin: 116px auto 0;
  text-align: center;
}

.hero-copy h1 {
  margin: 0 0 24px;
  font-size: clamp(40px, 6vw, 62px);
  font-weight: 900;
  line-height: 1.05;
}

.hero-copy p {
  margin: 0 auto;
  max-width: 690px;
  color: rgba(255, 255, 255, 0.84);
  font-size: 17px;
  font-weight: 700;
  line-height: 1.75;
}

.hero-wave {
  position: absolute;
  right: 0;
  bottom: -1px;
  left: 0;
  height: 260px;
  color: #ffffff;
  z-index: 1;
}

.hero-wave svg {
  width: 100%;
  height: 100%;
}

.hero-wave path,
.footer-wave path {
  fill: currentColor;
}

.features-section {
  width: min(1060px, calc(100% - 48px));
  margin: 0 auto;
  padding: 88px 0 78px;
}

.section-reveal {
  opacity: 0;
  transform: translateY(34px);
  transition:
    opacity 560ms ease,
    transform 560ms ease;
}

.section-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.feature-row {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(320px, 1.05fr);
  gap: 84px;
  align-items: center;
  min-height: 520px;
}

.feature-row + .feature-row {
  margin-top: 62px;
}

.feature-row--reverse .feature-copy {
  order: 2;
}

.feature-row--reverse .feature-visual {
  order: 1;
}

.feature-copy h2 {
  margin: 34px 0 26px;
  color: #22243e;
  font-size: clamp(34px, 4.2vw, 48px);
  font-weight: 900;
  line-height: 1.16;
}

.feature-copy p,
.help-copy p,
.faq-item p {
  color: #7a8397;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.85;
}

.feature-copy p {
  max-width: 410px;
  margin: 0;
}

.feature-visual {
  position: relative;
  display: grid;
  min-height: 420px;
  place-items: center;
}

.feature-visual > img {
  width: min(100%, 380px);
  max-height: 430px;
  object-fit: contain;
  filter: drop-shadow(0 26px 42px rgba(30, 62, 133, 0.12));
}

.feature-row:nth-child(1) .feature-visual > img {
  width: min(100%, 450px);
}

.feature-row:nth-child(3) .feature-visual > img {
  width: min(100%, 405px);
}

.decorative-dot {
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #54c2e4, #1f5fa8);
  box-shadow: 0 10px 20px rgba(31, 95, 168, 0.2);
}

.decorative-dot--top {
  top: 16px;
  left: 18%;
}

.brand-orb {
  position: absolute;
  right: 12%;
  top: 37%;
  display: grid;
  width: 84px;
  height: 84px;
  place-items: center;
  border-radius: 50%;
  background: linear-gradient(135deg, #55c4e5, #245291);
  box-shadow: 0 18px 34px rgba(31, 95, 168, 0.26);
}

.brand-orb img {
  width: 46px;
  height: auto;
}

.help-section {
  position: relative;
  overflow: hidden;
  background: #eaf5ff;
}

.help-section::before,
.help-section::after {
  position: absolute;
  content: "";
  border-radius: 50%;
  pointer-events: none;
}

.help-section::before {
  top: -104px;
  left: -60px;
  width: 220px;
  height: 220px;
  background: rgba(255, 255, 255, 0.58);
}

.help-section::after {
  top: -96px;
  right: -82px;
  width: 310px;
  height: 310px;
  background: rgba(255, 255, 255, 0.34);
}

.help-layout {
  position: relative;
  z-index: 1;
  display: grid;
  width: min(1280px, 100%);
  margin: 0 auto;
  grid-template-columns: minmax(0, 1.03fr) minmax(360px, 0.97fr);
  align-items: center;
}

.help-preview {
  height: 440px;
  overflow: hidden;
  align-self: stretch;
}

.help-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left top;
}

.help-copy {
  padding: 72px clamp(28px, 7vw, 96px);
}

.help-kicker {
  display: block;
  margin-bottom: 22px;
  color: #255fa7;
  font-size: 16px;
  font-weight: 900;
}

.help-copy h2 {
  max-width: 480px;
  margin: 0 0 26px;
  color: #20243c;
  font-size: clamp(40px, 5.6vw, 58px);
  font-weight: 900;
  line-height: 1.1;
}

.help-copy p {
  max-width: 400px;
  margin: 0 0 34px;
}

.faq-section {
  padding: 112px 0 132px;
  background: #ffffff;
}

.faq-inner {
  width: min(1010px, calc(100% - 48px));
  margin: 0 auto;
}

.faq-inner h2,
.pricing-inner h2 {
  margin: 0;
  color: #20243c;
  font-size: clamp(34px, 4.4vw, 46px);
  font-weight: 900;
  line-height: 1.12;
}

.faq-list {
  margin: 54px 0 54px;
}

.faq-item + .faq-item {
  margin-top: 34px;
}

.faq-item h3 {
  margin: 0 0 16px;
  color: #323445;
  font-size: 16px;
  font-weight: 900;
}

.faq-item p {
  margin: 0;
  max-width: 950px;
}

.pricing-section {
  position: relative;
  padding: 0 0 54px;
  overflow: hidden;
  background: #ffffff;
}

.pricing-inner {
  position: relative;
  z-index: 2;
  width: min(1040px, calc(100% - 48px));
  margin: 0 auto;
  text-align: center;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 42px;
  margin-top: 54px;
}

.pricing-card {
  display: grid;
  min-height: 260px;
  grid-template-columns: minmax(130px, 0.8fr) minmax(0, 1.2fr);
  gap: 24px;
  align-items: stretch;
  border-radius: 22px;
  padding: 28px;
  background: #ffffff;
  box-shadow: 0 22px 44px rgba(30, 62, 133, 0.13);
  text-align: left;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.pricing-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 28px 56px rgba(30, 62, 133, 0.18);
}

.pricing-card .button {
  grid-column: 1 / -1;
  width: 100%;
  border-radius: 12px;
}

.pricing-heading {
  display: grid;
  min-height: 130px;
  place-items: center;
  align-self: start;
  border-radius: 14px;
  background: #eef5ff;
  text-align: center;
}

.pricing-card--featured .pricing-heading {
  background: #e9fbff;
}

.pricing-name {
  color: #55c4e5;
  font-size: 28px;
  font-weight: 900;
}

.pricing-tier,
.pricing-cadence {
  color: #8b92a4;
  font-size: 14px;
  font-weight: 800;
}

.pricing-body {
  align-self: start;
}

.pricing-price {
  margin: 0 0 6px;
  color: #55a7d2;
  font-size: 28px;
  font-weight: 900;
}

.pricing-cadence {
  margin: 0 0 22px;
}

.pricing-body ul {
  display: grid;
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.pricing-body li {
  position: relative;
  padding-left: 28px;
  color: #323445;
  font-size: 14px;
  font-weight: 800;
  line-height: 1.35;
}

.pricing-body li::before {
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  width: 16px;
  height: 16px;
  place-items: center;
  border-radius: 50%;
  color: #ffffff;
  background: linear-gradient(135deg, #55c4e5, #255fa7);
  content: "✓";
  font-size: 10px;
}

.site-footer {
  position: relative;
  min-height: 430px;
  overflow: hidden;
  color: #ffffff;
  background: linear-gradient(135deg, #1e3e85, #326ca5);
}

.site-footer::after {
  position: absolute;
  right: -80px;
  bottom: 60px;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.055);
  content: "";
}

.footer-wave {
  position: absolute;
  top: -1px;
  right: 0;
  left: 0;
  height: 168px;
  color: #ffffff;
}

.footer-wave svg {
  width: 100%;
  height: 100%;
}

.footer-inner {
  position: relative;
  z-index: 1;
  display: flex;
  width: min(1040px, calc(100% - 48px));
  margin: 0 auto;
  padding-top: 194px;
  align-items: center;
  justify-content: space-between;
}

.footer-inner > img {
  width: 150px;
  height: auto;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px;
}

.social-links a {
  display: grid;
  width: 32px;
  height: 32px;
  place-items: center;
  border-radius: 50%;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.18);
  font-size: 10px;
  font-weight: 900;
  text-decoration: none;
  text-transform: uppercase;
  transition:
    transform 180ms ease,
    background-color 180ms ease;
}

.social-links a:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.28);
}

.footer-mark {
  position: absolute;
  right: 50%;
  bottom: 34px;
  width: 54px;
  opacity: 0.95;
  transform: translateX(50%);
}

.scroll-top {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 10;
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  border: 0;
  border-radius: 50%;
  color: #ffffff;
  background: #245291;
  box-shadow: 0 18px 36px rgba(30, 62, 133, 0.24);
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transform: translateY(14px);
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.scroll-top--visible {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

@media (max-width: 980px) {
  .hero-section {
    min-height: 620px;
  }

  .site-header {
    width: min(100% - 40px, 920px);
  }

  .hero-copy {
    margin-top: 94px;
  }

  .features-section {
    padding-top: 56px;
  }

  .feature-row,
  .help-layout {
    grid-template-columns: 1fr 1fr;
    gap: 44px;
  }

  .feature-row {
    min-height: 460px;
  }

  .feature-visual > img {
    max-height: 360px;
  }

  .help-preview {
    height: 380px;
  }

  .help-copy {
    padding: 56px 34px;
  }

  .pricing-card {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .button {
    min-height: 40px;
    padding: 0 18px;
    font-size: 13px;
  }

  .hero-section {
    min-height: 600px;
  }

  .site-header {
    width: calc(100% - 32px);
    padding-top: 22px;
    align-items: center;
  }

  .brand-link {
    width: 72px;
    height: 60px;
  }

  .brand-link img {
    width: 70px;
  }

  .header-actions {
    gap: 4px;
  }

  .button--ghost {
    padding: 0 12px;
  }

  .hero-copy {
    width: calc(100% - 36px);
    margin-top: 74px;
  }

  .hero-copy h1 {
    font-size: 40px;
  }

  .hero-copy p {
    font-size: 15px;
    line-height: 1.65;
  }

  .hero-wave {
    height: 190px;
  }

  .features-section {
    width: calc(100% - 36px);
    padding: 42px 0 54px;
  }

  .feature-row,
  .feature-row--reverse {
    grid-template-columns: 1fr;
    gap: 26px;
    min-height: auto;
  }

  .feature-row + .feature-row {
    margin-top: 70px;
  }

  .feature-row--reverse .feature-copy,
  .feature-row--reverse .feature-visual {
    order: initial;
  }

  .feature-copy h2 {
    margin: 22px 0 18px;
    font-size: 32px;
  }

  .feature-copy p {
    max-width: none;
    font-size: 15px;
  }

  .feature-visual {
    min-height: 300px;
  }

  .feature-visual > img,
  .feature-row:nth-child(1) .feature-visual > img,
  .feature-row:nth-child(3) .feature-visual > img {
    width: min(100%, 330px);
    max-height: 340px;
  }

  .brand-orb {
    right: 7%;
    width: 62px;
    height: 62px;
  }

  .brand-orb img {
    width: 34px;
  }

  .help-layout {
    grid-template-columns: 1fr;
  }

  .help-preview {
    height: 300px;
  }

  .help-copy {
    padding: 10px 28px 62px;
  }

  .help-copy h2 {
    font-size: 36px;
  }

  .faq-section {
    padding: 72px 0 92px;
  }

  .faq-inner,
  .pricing-inner {
    width: calc(100% - 36px);
  }

  .faq-list {
    margin: 38px 0;
  }

  .pricing-grid {
    grid-template-columns: 1fr;
    gap: 24px;
    margin-top: 38px;
  }

  .pricing-card {
    padding: 22px;
  }

  .footer-inner {
    width: calc(100% - 36px);
    padding-top: 176px;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
  }

  .social-links {
    justify-content: flex-start;
  }

  .scroll-top {
    right: 16px;
    bottom: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }

  .section-reveal {
    opacity: 1;
    transform: none;
  }
}
```

- [ ] **Step 3: Run lint after CSS and global changes**

Run:

```bash
npm run lint
```

Expected: PASS with no TypeScript or React Hook errors.

- [ ] **Step 4: Run the production build**

Run:

```bash
npm run build
```

Expected: PASS with Vite production assets emitted to `dist/`.

- [ ] **Step 5: Commit styling changes**

Run:

```bash
git add src/index.css src/App.css
git commit -m "style: match remoterecruit landing page reference"
```

Expected: commit succeeds with only `src/index.css` and `src/App.css` staged.

---

### Task 3: Verify Responsive Layout And Interactions

**Files:**
- Modify only if verification finds a concrete issue: `src/App.tsx`, `src/App.css`, `src/index.css`

- [ ] **Step 1: Start the Vite dev server**

Run:

```bash
npm run dev -- --host 127.0.0.1
```

Expected: Vite prints a local URL such as `http://127.0.0.1:5173/`. Keep this process running during browser checks.

- [ ] **Step 2: Check desktop layout at 1440 x 1100**

Open the Vite URL in a browser and set the viewport to `1440 x 1100`.

Expected:
- Hero is dark blue, centered, and shows the RemoteRecruit logo, Sign in, Sign up, headline, body copy, and white wave.
- First feature section starts immediately after the wave and uses a two-column layout.
- Feature visual assets are sharp and not clipped.
- CTA band, FAQ, pricing, and footer appear in the same order as `supporting_files/RemoteRecruit - Features.png`.
- No text overlaps images, decorative circles, buttons, or other text.

- [ ] **Step 3: Check tablet layout at 768 x 1024**

Set the viewport to `768 x 1024`.

Expected:
- Header actions fit on one line.
- Feature sections remain readable, with no horizontal scrolling.
- CTA band keeps the preview and copy aligned without clipped text.
- Pricing cards fit within the viewport.
- Scroll-to-top button appears after scrolling past the first feature.

- [ ] **Step 4: Check mobile layout at 390 x 844**

Set the viewport to `390 x 844`.

Expected:
- Header, hero title, and hero paragraph fit without horizontal overflow.
- Feature rows stack as copy followed by visual.
- CTA copy and Get Started button remain fully visible.
- FAQ text wraps cleanly.
- Pricing cards stack vertically and buttons keep stable height.
- Footer logo and social links do not overlap.

- [ ] **Step 5: Verify smooth in-page controls**

In the browser, click each control:

```text
Sign in
Sign up
Get Started
More Questions
pricing card Get Started buttons
scroll-to-top button
```

Expected:
- Sign in scrolls to the hero/top.
- Sign up and Get Started scroll to `#pricing`.
- More Questions keeps focus near `#faq`.
- Scroll-to-top appears only after scrolling down and returns to the hero/top.
- Buttons and links show visible focus outlines when tabbed to with the keyboard.

- [ ] **Step 6: Verify reduced motion behavior**

Temporarily emulate `prefers-reduced-motion: reduce` in browser devtools.

Expected:
- Smooth scrolling falls back to normal browser behavior.
- Reveal sections are visible without slide-up motion.
- Hover/focus states still work.

- [ ] **Step 7: Apply concrete fixes found during verification**

If any expected result above fails, edit only the relevant selector or component. Use one of these exact patterns:

```css
/* Example for a mobile overflow found in a specific section */
.feature-copy h2 {
  overflow-wrap: anywhere;
}
```

```css
/* Example for a visual clipped at tablet width */
@media (max-width: 980px) {
  .feature-visual > img {
    max-height: 320px;
  }
}
```

```tsx
// Example for a button target wired to the wrong anchor
<Button onClick={() => scrollToId('pricing')}>Get Started</Button>
```

Expected: every edit maps to a failed verification item from Steps 2-6.

- [ ] **Step 8: Run final static checks**

Run:

```bash
npm run lint
npm run build
```

Expected: both commands PASS.

- [ ] **Step 9: Commit verification fixes**

If Step 7 changed files, run:

```bash
git add src/App.tsx src/App.css src/index.css
git commit -m "fix: refine remoterecruit responsive behavior"
```

Expected: commit succeeds with only verification-related changes staged. If Step 7 made no changes, skip this commit.

---

### Task 4: Final Quality Gate

**Files:**
- Read: `docs/superpowers/specs/2026-06-17-remoterecruit-landing-page-design.md`
- Read: `supporting_files/RemoteRecruit - Features.png`
- Verify: `src/App.tsx`, `src/App.css`, `src/index.css`

- [ ] **Step 1: Re-read the spec and compare against implemented sections**

Run:

```bash
sed -n '1,260p' docs/superpowers/specs/2026-06-17-remoterecruit-landing-page-design.md
```

Expected: every section in the spec maps to implemented code:
- `Header` maps to `Header` in `src/App.tsx`.
- `HeroSection` maps to `HeroSection` and `.hero-*`.
- `FeatureSection` maps to `FeatureSection`, `features`, and `.feature-*`.
- `HelpCtaSection` maps to `HelpCtaSection` and `.help-*`.
- `FaqSection` maps to `FaqSection`, `faqs`, and `.faq-*`.
- `PricingSection` and `PricingCard` map to `PricingSection`, `PricingCard`, `pricingPlans`, and `.pricing-*`.
- `Footer` maps to `Footer` and `.site-footer`.
- `ScrollToTopButton` maps to `ScrollToTopButton` and `.scroll-top`.

- [ ] **Step 2: Check rendered accessibility essentials**

Use browser inspection and keyboard navigation.

Expected:
- Page contains one `h1`.
- Sections use semantic `header`, `main`, `section`, `article`, and `footer`.
- Product visuals have meaningful alt text.
- Decorative images have `alt=""` or `aria-hidden="true"`.
- All buttons have clear visible text or `aria-label`.
- Tab focus is visible on header actions, CTA buttons, pricing buttons, social links, and scroll-to-top.

- [ ] **Step 3: Check performance-oriented image behavior**

Inspect rendered image elements.

Expected:
- Non-hero feature images use `loading="lazy"` and `decoding="async"`.
- Image containers have stable dimensions from CSS.
- There are no broken image requests in the browser network panel.
- The production build does not include unused Vite starter imports in `src/App.tsx`.

- [ ] **Step 4: Run final commands**

Run:

```bash
npm run lint
npm run build
git status --short
```

Expected:
- `npm run lint` passes.
- `npm run build` passes.
- `git status --short` shows only intentional files changed or no unstaged changes after commits.

- [ ] **Step 5: Final self-review**

Confirm these results before reporting completion:
- Spec coverage: no missing required section, interaction, accessibility behavior, or performance behavior.
- Placeholder scan: no vague unchecked instructions remain in changed source files.
- Type consistency: all referenced component names, CSS class names, IDs, and data keys match between `src/App.tsx` and `src/App.css`.

---

## Execution Notes

- Do not add routing, authentication, forms, backend calls, analytics, a CMS, or new animation libraries.
- Do not replace the page with a single screenshot. Text, buttons, layout, FAQ, pricing, and responsive behavior must remain real HTML/CSS.
- Keep changes scoped to `src/App.tsx`, `src/App.css`, and `src/index.css` unless a build error proves another file must change.
- If execution happens in an isolated workspace, create it with `superpowers:using-git-worktrees` before implementing.
