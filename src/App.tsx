import { useEffect, useState, type ReactNode } from 'react'
import candidateAvatarSrc from './assets/candidate-avatar-gru.png'
import brandNameSrc from './screens_svg/brand_name.svg'
import headerBackgroundSrc from './screens_svg/01_header/01_header_background.svg'
import globalReachVisualSrc from './screens_svg/02_global_reach/lets_find_work_right_node.svg'
import customProfileCopySrc from './screens_svg/04_custom_profiles_best_developer_ever/custom_profile_show_case_talent_left_node.svg'
import bestDeveloperArtSrc from './screens_svg/04_custom_profiles_best_developer_ever/best_developer_ever_right_node.svg'
import readyArtSrc from './screens_svg/05_are_you_readyy/are_you_ready_help_is_only_a_few_clicks_away_full_node.svg'
import questionsArtSrc from './screens_svg/06_common_questions/common_questions_node.svg'
import footerArtSrc from './screens_svg/08_footer/footer_full_node.svg'
import './App.css'

const socialLinks = [
  { label: 'Facebook', className: 'footer-social-hit footer-social-hit--facebook' },
  { label: 'Instagram', className: 'footer-social-hit footer-social-hit--instagram' },
  { label: 'X', className: 'footer-social-hit footer-social-hit--x' },
  { label: 'Twitter', className: 'footer-social-hit footer-social-hit--twitter' },
  { label: 'LinkedIn', className: 'footer-social-hit footer-social-hit--linkedin' },
  { label: 'Snapchat', className: 'footer-social-hit footer-social-hit--snapchat' },
]

const globalReachCards = [
  {
    className: 'global-reach-card--python',
    role: 'Python Developer',
    name: 'Felonious Gru',
    avatarSrc: candidateAvatarSrc,
  },
  {
    className: 'global-reach-card--frontend',
    role: 'Front End Wizard',
    name: 'Mel Muselphiem',
    avatarSrc: candidateAvatarSrc,
  },
]

const membershipFeatures = [
  'Up to 25 active job posts',
  'Premium Placement & Visibility',
  'Messaging anyone, unlimited',
  'Unlimited invites',
  'View all applicants',
  'Unlimited invites to jobseekers',
]

type PricingFeature = {
  label: string
  unavailable?: boolean
}

type PricingPlan = {
  id: 'free' | 'premium'
  name: string
  subtitle?: string
  price?: string
  cadence?: string
  ariaLabel: string
  features: PricingFeature[]
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    subtitle: 'Basic',
    ariaLabel: 'Get started with the Free basic plan',
    features: [
      { label: '1 Active Job' },
      { label: 'Basic List Placement' },
      { label: 'Unlimited Job Applicants', unavailable: true },
      { label: 'Invite Anyone to Apply to Your Jobs', unavailable: true },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$79.99',
    cadence: 'Per Month',
    ariaLabel: 'Get started with the Premium plan',
    features: [
      { label: 'Unlimited Job Posts' },
      { label: 'Instant Job Post Approval' },
      { label: 'Premium List Placement' },
      { label: 'Unlimited Job Applicants' },
    ],
  },
]

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
  variant?: 'primary' | 'ghost'
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
      <a className="brand-link" href="#page-top" onClick={(event) => event.preventDefault()} aria-label="RemoteRecruit">
        <img className="brand-art" src={brandNameSrc} width="124" height="50" alt="" />
      </a>
      <nav className="header-actions" aria-label="Account actions">
        <Button variant="ghost" className="header-sign-in" onClick={() => scrollToId('page-top')}>
          Sign in
        </Button>
        <Button className="header-sign-up" onClick={() => scrollToId('pricing')}>
          Sign up
        </Button>
      </nav>
    </header>
  )
}

function HeroSection() {
  return (
    <section className="figma-hero" id="page-top" aria-labelledby="hero-title">
      <img className="figma-hero__background" src={headerBackgroundSrc} alt="" aria-hidden="true" decoding="sync" />
      <Header />
      <div className="hero-copy">
        <h1 id="hero-title">RemoteRecruit&apos;s Difference</h1>
        <p className="hero-subtitle">
          RemoteRecruit is connecting the world with an easy-to-use platform that lets full-time,
          part-time, and freelance workers showcase their talents to businesses that need them.
          With no paywalls, no fees, and no barriers, there is nothing but you, your talents, and
          the next step in your career.
        </p>
      </div>
    </section>
  )
}

function GlobalReachCard({
  className,
  role,
  name,
  avatarSrc,
}: {
  className: string
  role: string
  name: string
  avatarSrc: string
}) {
  return (
    <div className={`global-reach-card ${className}`}>
      <img className="global-reach-card__avatar" src={avatarSrc} alt="" aria-hidden="true" loading="eager" decoding="sync" />
      <div className="global-reach-card__copy">
        <p className="global-reach-card__role">{role}</p>
        <p className="global-reach-card__name">{name}</p>
      </div>
    </div>
  )
}

function GlobalReachSection() {
  return (
    <section className="figma-section figma-section--global global-reach-section" aria-labelledby="global-reach-title">
      <SectionReveal className="figma-section__frame global-reach-section__frame">
        <article className="global-reach-section__copy">
          <span>Global Reach</span>
          <h2 id="global-reach-title">The First Fully Global Job Board, Anywhere, Ever</h2>
          <p>
            RemoteRecruit connects candidates with opportunities around the world. With today&apos;s
            remote-first workforce, you need to be able to find the best jobs and the best people
            for them, wherever they may be.
          </p>
        </article>
        <div className="global-reach-section__visual">
          <img src={globalReachVisualSrc} alt="" aria-hidden="true" loading="eager" decoding="sync" />
          {globalReachCards.map((card) => (
            <GlobalReachCard {...card} key={card.role} />
          ))}
        </div>
      </SectionReveal>
      <div className="mobile-feature">
        <article className="mobile-feature__copy">
          <span>Global Reach</span>
          <h2>The First Fully Global Job Board, Anywhere, Ever</h2>
          <p>
            RemoteRecruit connects candidates with opportunities around the world. With today&apos;s
            remote-first workforce, you need to be able to find the best jobs and the best people
            for them, wherever they may be.
          </p>
        </article>
        <div className="mobile-feature__visual">
          <img src={globalReachVisualSrc} alt="" aria-hidden="true" loading="eager" decoding="sync" />
        </div>
      </div>
    </section>
  )
}

function StatusIcon({ unavailable = false }: { unavailable?: boolean }) {
  return <span className={`status-icon ${unavailable ? 'status-icon--muted' : ''}`} aria-hidden="true" />
}

function FreeForeverVisual() {
  return (
    <div className="free-forever-visual" aria-label="Premium membership tier">
      <span className="free-forever-dot free-forever-dot--left" aria-hidden="true" />
      <article className="membership-card">
        <p className="membership-card__eyebrow">Your Membership Tier</p>
        <h3>Premium</h3>
        <p className="membership-card__label">FEATURES</p>
        <ul className="membership-card__features">
          {membershipFeatures.map((feature) => (
            <li key={feature}>
              <StatusIcon />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </article>
      <aside className="payment-card" aria-label="Upcoming payment">
        <span className="payment-card__icon" aria-hidden="true">P</span>
        <p>
          <span>Upcoming Payment In</span>
          <strong>14 Days - $79.99</strong>
        </p>
      </aside>
      <span className="free-forever-brand-mark" aria-hidden="true">R</span>
    </div>
  )
}

function FreeForeverSection() {
  return (
    <section className="figma-section figma-section--free free-forever-section" aria-labelledby="free-forever-title">
      <SectionReveal className="free-forever-section__inner">
        <FreeForeverVisual />
        <article className="free-forever-copy">
          <span>Actually Fee Free</span>
          <h2 id="free-forever-title">Fee-Free Forever</h2>
          <p>
            We don&apos;t charge you fees and we don&apos;t put up paywalls. We&apos;re the bridge
            that connects job opportunities with the best candidates, with no middleman involved.
          </p>
        </article>
      </SectionReveal>
    </section>
  )
}

function CustomProfileSection() {
  return (
    <section className="custom-profile-section" aria-labelledby="custom-profile-title">
      <SectionReveal className="custom-profile-section__inner">
        <div className="custom-profile-section__copy">
          <img src={customProfileCopySrc} alt="" aria-hidden="true" loading="eager" decoding="sync" />
        </div>
        <article className="custom-profile-section__mobile-copy">
          <span>Custom Profile</span>
          <h2>Showcase Your Talents</h2>
          <p>
            Personalize your profile with everything that makes you unique. Add an introductory
            video and other media for a personal touch that stands out to employers and candidates.
          </p>
        </article>
        <div className="custom-profile-section__visual">
          <img src={bestDeveloperArtSrc} alt="" aria-hidden="true" loading="eager" decoding="sync" />
        </div>
        <div className="visually-hidden">
          <h2 id="custom-profile-title">Showcase Your Talents</h2>
          <p>
            Personalize your profile with everything that makes you unique. Add an introductory
            video and other media for a personal touch that stands out to employers and candidates.
          </p>
        </div>
      </SectionReveal>
    </section>
  )
}

function ReadySection() {
  return (
    <section className="figma-section figma-section--ready ready-section" aria-labelledby="ready-title">
      <SectionReveal className="figma-section__frame">
        <img className="figma-section__art" src={readyArtSrc} alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <button
          type="button"
          className="art-hit-area ready-section__action"
          onClick={() => scrollToId('pricing')}
          aria-label="Get started"
        />
        <div className="visually-hidden">
          <p>Are you ready?</p>
          <h2 id="ready-title">Help is only a few clicks away!</h2>
          <p>Click below to get set up super quickly and find help now.</p>
        </div>
      </SectionReveal>
    </section>
  )
}

function QuestionsSection() {
  return (
    <section className="figma-section figma-section--questions questions-section" id="faq" aria-labelledby="questions-title">
      <SectionReveal className="figma-section__frame">
        <img className="figma-section__art" src={questionsArtSrc} alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <button
          type="button"
          className="art-hit-area questions-section__action"
          onClick={() => scrollToId('faq')}
          aria-label="More questions"
        />
        <div className="visually-hidden">
          <h2 id="questions-title">Common Questions</h2>
          <h3>Do I have to sign a long-term contract?</h3>
          <p>
            Actually beard single-origin coffee, twee 90&apos;s PBR Echo Park sartorial try-hard
            freegan Portland ennui. Selvage jean shorts 90&apos;s, Vice American Apparel try-hard
            food truck Shoreditch fap lomo Wes Anderson. Art party.
          </p>
          <h3>Can I pay for a whole year?</h3>
          <p>Actually beard single-origin coffee, twee 90&apos;s PBR Echo Park sartorial try-hard freegan Portland ennui.</p>
          <h3>What if I need help?</h3>
          <p>
            Actually beard single-origin coffee, twee 90&apos;s PBR Echo Park sartorial try-hard
            freegan Portland ennui. Selvage jean shorts 90&apos;s, Vice American Apparel try-hard
            food truck Shoreditch fap lomo Wes Anderson. Art party.
          </p>
        </div>
      </SectionReveal>
    </section>
  )
}

function PricingCard({ plan }: { plan: (typeof pricingPlans)[number] }) {
  return (
    <article className={`pricing-card pricing-card--${plan.id}`}>
      <div className="pricing-card__summary">
        {plan.id === 'premium' ? <span className="pricing-card__badge">Premium</span> : null}
        <h3>{plan.name}</h3>
        {plan.subtitle ? <p>{plan.subtitle}</p> : null}
        {plan.price ? (
          <p className="pricing-card__price">
            <strong>{plan.price}</strong>
            <span>{plan.cadence}</span>
          </p>
        ) : null}
      </div>
      <ul className="pricing-card__features">
        {plan.features.map((feature) => (
          <li className={feature.unavailable ? 'is-muted' : ''} key={feature.label}>
            <StatusIcon unavailable={feature.unavailable} />
            <span>{feature.label}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="pricing-card__button"
        onClick={() => scrollToId('pricing')}
        aria-label={plan.ariaLabel}
      >
        Get Started
      </button>
    </article>
  )
}

function PricingSection() {
  return (
    <section className="pricing-section" id="pricing" aria-labelledby="pricing-title">
      <SectionReveal className="pricing-inner">
        <h2 id="pricing-title">Help Is One Click Away</h2>
        <div className="pricing-card-grid">
          {pricingPlans.map((plan) => (
            <PricingCard plan={plan} key={plan.id} />
          ))}
        </div>
      </SectionReveal>
    </section>
  )
}

function Footer() {
  return (
    <footer className="figma-section figma-section--footer site-footer" aria-label="RemoteRecruit footer">
      <div className="figma-section__frame footer-frame">
        <img className="figma-section__art" src={footerArtSrc} alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <nav className="footer-social-links" aria-label="Social links">
          {socialLinks.map((link) => (
            <a className={link.className} href="#page-top" aria-label={`RemoteRecruit ${link.label}`} key={link.label} />
          ))}
        </nav>
        <div className="footer-mobile-content" aria-hidden="true">
          <img src={brandNameSrc} width="124" height="50" alt="" />
        </div>
      </div>
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
      { rootMargin: '0px 0px -4% 0px', threshold: 0.08 },
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
        <div className="feature-stack" aria-label="RemoteRecruit features">
          <GlobalReachSection />
          <FreeForeverSection />
          <CustomProfileSection />
        </div>
        <ReadySection />
        <QuestionsSection />
        <PricingSection />
      </main>
      <Footer />
      <ScrollToTopButton visible={showScrollTop} />
    </>
  )
}

export default App
