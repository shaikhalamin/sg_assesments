import { useEffect, useState, type ReactNode } from 'react'
import logoSrc from '../supporting_files/REMOTE RECRUIT sign color background blue.svg'
import globalBoardSrc from '../supporting_files/Group 136@3x.svg'
import membershipSrc from '../supporting_files/Group 136@3x-1.svg'
import profileSrc from '../supporting_files/Group 136-1.png'
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
      "RemoteRecruit connects candidates with opportunities around the world. With today's remote-first workforce, you need to be able to find the best jobs and the best people for them, wherever they may be.",
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
      "Actually beard single-origin coffee, twee 90's PBR Echo Park sartorial try-hard freegan Portland ennui. Selvage jean shorts 90's, Vice American Apparel try-hard food truck Shoreditch fap lomo Wes Anderson. Art party",
  },
  {
    question: 'Can I pay for a whole year?',
    answer:
      "Actually beard single-origin coffee, twee 90's PBR Echo Park sartorial try-hard freegan Portland ennui. Selvage",
  },
  {
    question: 'What if I need help?',
    answer:
      "Actually beard single-origin coffee, twee 90's PBR Echo Park sartorial try-hard freegan Portland ennui. Selvage jean shorts 90's, Vice American Apparel try-hard food truck Shoreditch fap lomo Wes Anderson. Art party",
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
      <a className="brand-link" href="#page-top" onClick={(event) => event.preventDefault()} aria-label="RemoteRecruit">
        <img src={logoSrc} width="42" height="35" alt="" />
        <span>
          <strong>Remote</strong>
          <strong>Recruit</strong>
        </span>
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
        <h1 id="hero-title">RemoteRecruit&apos;s Difference</h1>
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
            <span aria-hidden="true">-&gt;</span>
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
        <div className="footer-brand" aria-label="RemoteRecruit">
          <img src={logoSrc} width="52" height="43" alt="" />
          <span>
            <strong>Remote</strong>
            <strong>Recruit</strong>
          </span>
        </div>
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
