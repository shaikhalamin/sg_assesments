import { useEffect, useState, type ReactNode } from 'react'
import remoteRecruitMarkSrc from './assets/logo_base.svg'
import candidateAvatarSrc from './assets/candidate-avatar-gru.png'
import brandNameSrc from './screens_svg/brand_name.svg'
import headerBackgroundSrc from './screens_svg/01_header/01_header_background.svg'
import globalReachVisualSrc from './screens_svg/02_global_reach/lets_find_work_right_node.svg'
import bestDeveloperArtSrc from './screens_svg/04_custom_profiles_best_developer_ever/best_developer_ever_right_node.svg'
import readyLeftArtSrc from './screens_svg/05_are_you_readyy/lets_find_work_left.svg'
import questionsArtSrc from './screens_svg/06_common_questions/common_questions_node.svg'
import footerArtSrc from './screens_svg/08_footer/footer_full_node.svg'
import './App.css'

const socialLinks = [
  { label: 'Facebook', icon: 'facebook', href: '#page-top', className: 'footer-social-hit footer-social-hit--facebook' },
  { label: 'Instagram', icon: 'instagram', href: '#page-top', className: 'footer-social-hit footer-social-hit--instagram' },
  { label: 'X', icon: 'x', href: '#page-top', className: 'footer-social-hit footer-social-hit--x' },
  { label: 'Twitter', icon: 'twitter', href: '#page-top', className: 'footer-social-hit footer-social-hit--twitter' },
  { label: 'LinkedIn', icon: 'linkedin', href: '#page-top', className: 'footer-social-hit footer-social-hit--linkedin' },
  { label: 'Snapchat', icon: 'snapchat', href: '#page-top', className: 'footer-social-hit footer-social-hit--snapchat' },
] as const

type SocialIconName = (typeof socialLinks)[number]['icon']

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

const customProfileSkills = ['Python Dev', 'Javascript', 'Front End', 'Back End', 'IOS Development', '+12']
const customProfileFeedback = {
  eyebrow: 'Past Client Feedback',
  title: 'Best Developer Ever!',
}

const commonQuestions = [
  {
    question: 'Do I have to sign a long-term contract?',
    answer:
      "Actually beard single-origin coffee, twee 90's PBR Echo Park sartorial try-hard freegan Portland ennui. Selvage jean shorts 90's, Vice American Apparel try-hard food truck Shoreditch fap lomo Wes Anderson. Art party.",
  },
  {
    question: 'Can I pay for a whole year?',
    answer: "Actually beard single-origin coffee, twee 90's PBR Echo Park sartorial try-hard freegan Portland ennui.",
  },
  {
    question: 'What if I need help?',
    answer:
      "Actually beard single-origin coffee, twee 90's PBR Echo Park sartorial try-hard freegan Portland ennui. Selvage jean shorts 90's, Vice American Apparel try-hard food truck Shoreditch fap lomo Wes Anderson. Art party.",
  },
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
  return (
    <span className={`status-icon ${unavailable ? 'status-icon--muted' : ''}`} aria-hidden="true">
      {unavailable ? (
        <svg className="status-icon__glyph" viewBox="0 0 12 12" focusable="false">
          <path d="M3.1 3.1L8.9 8.9M8.9 3.1L3.1 8.9" />
        </svg>
      ) : (
        <svg className="status-icon__glyph" viewBox="0 0 12 12" focusable="false">
          <path d="M3 6.1L5.1 8.2L9.2 3.9" />
        </svg>
      )}
    </span>
  )
}

function PaypalMark() {
  return (
    <svg className="payment-card__logo" viewBox="132 1443 71 84" aria-hidden="true" focusable="false">
      <path d="M152.227 1524.14L153.697 1514.9H150.421H134.965L145.717 1446.61C145.746 1446.4 145.85 1446.21 146.011 1446.07C146.18 1445.94 146.386 1445.86 146.599 1445.86H172.681C181.375 1445.86 187.339 1447.66 190.489 1451.23C191.883 1452.73 192.854 1454.57 193.303 1456.57C193.793 1458.99 193.793 1461.49 193.303 1463.92V1466.02L194.773 1466.86C195.892 1467.41 196.902 1468.17 197.755 1469.08C199.039 1470.63 199.868 1472.51 200.149 1474.5C200.464 1477.1 200.35 1479.74 199.813 1482.31C199.259 1485.43 198.165 1488.43 196.579 1491.17C195.298 1493.37 193.566 1495.28 191.497 1496.76C189.415 1498.18 187.097 1499.22 184.651 1499.83C181.905 1500.52 179.083 1500.86 176.251 1500.83H174.193C172.751 1500.83 171.354 1501.34 170.245 1502.26C169.131 1503.2 168.398 1504.52 168.187 1505.96V1506.8L165.625 1523.09V1523.72C165.655 1523.83 165.655 1523.95 165.625 1524.06H165.373L152.227 1524.14Z" fill="#253D80" />
      <path d="M196.159 1464.34L195.907 1465.89C192.463 1483.53 180.661 1489.66 165.625 1489.66H157.981C156.142 1489.66 154.574 1491 154.285 1492.81L150.379 1517.68L149.245 1524.73C149.16 1525.3 149.324 1525.87 149.694 1526.31C150.065 1526.74 150.606 1526.99 151.177 1527H164.785C166.399 1527 167.771 1525.82 168.019 1524.23V1523.56L170.581 1507.3V1506.42C170.81 1504.83 172.169 1503.65 173.773 1503.65H175.999C189.145 1503.65 199.477 1498.31 202.459 1482.65C204.073 1477.29 203.077 1471.49 199.771 1466.98C198.722 1465.91 197.501 1465.01 196.159 1464.34Z" fill="#189BD7" />
      <path d="M192.547 1462.91L190.951 1462.49L189.187 1462.15C186.963 1461.82 184.716 1461.66 182.467 1461.69H161.971C161.492 1461.68 161.017 1461.78 160.585 1461.98C159.611 1462.44 158.932 1463.36 158.779 1464.42L154.579 1492.01V1492.81C154.868 1491 156.436 1489.66 158.275 1489.66H165.919C180.955 1489.66 192.757 1483.53 196.201 1465.89L196.453 1464.34C195.548 1463.87 194.607 1463.48 193.639 1463.16L192.547 1462.91Z" fill="#242E65" />
      <path d="M158.779 1464.42C158.932 1463.36 159.611 1462.44 160.585 1461.98C161.017 1461.78 161.492 1461.68 161.971 1461.69H182.467C184.716 1461.66 186.963 1461.82 189.187 1462.15L190.951 1462.49L192.547 1462.91L193.345 1463.16C194.313 1463.48 195.254 1463.87 196.159 1464.34C197.524 1459.09 196.273 1453.5 192.799 1449.34C188.599 1444.89 181.711 1443 172.723 1443H146.599C144.76 1443 143.192 1444.33 142.903 1446.15L132.025 1515.07C131.928 1515.72 132.117 1516.38 132.544 1516.88C132.971 1517.38 133.594 1517.67 134.251 1517.68H150.379L154.579 1492.01L158.779 1464.42Z" fill="#253D80" />
    </svg>
  )
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
        <span className="payment-card__icon" aria-hidden="true">
          <PaypalMark />
        </span>
        <p className="payment-card__text">
          <span className="payment-card__eyebrow">Upcoming Payment In...</span>
          <strong className="payment-card__value">14 Days - $79.99</strong>
        </p>
      </aside>
      <span className="free-forever-brand-mark" aria-hidden="true">
        <img src={remoteRecruitMarkSrc} alt="" />
      </span>
    </div>
  )
}

function FreeForeverSection() {
  return (
    <section className="figma-section figma-section--free free-forever-section" aria-labelledby="free-forever-title">
      <SectionReveal className="figma-section__frame free-forever-section__inner">
        <div className="free-forever-section__desktop-content">
          <FreeForeverVisual />
          <article className="free-forever-copy">
            <span>Actually Fee Free</span>
            <h2 id="free-forever-title">Fee-Free Forever</h2>
            <p className="free-forever-copy__body">
              We don&apos;t charge you fees and we don&apos;t put up paywalls. We&apos;re the bridge
              that connects job opportunities with the best candidates, with no middleman involved.
            </p>
          </article>
        </div>
      </SectionReveal>
    </section>
  )
}

function CustomProfileSection() {
  return (
    <section className="custom-profile-section" aria-labelledby="custom-profile-title">
      <SectionReveal className="custom-profile-section__inner">
        <article className="custom-profile-copy">
          <span>Custom Profile</span>
          <h2 id="custom-profile-title">Showcase Your Talents</h2>
          <p>
            Personalize your profile with everything that makes you unique. Add an introductory
            video and other media for a personal touch that stands out to employers and candidates.
          </p>
        </article>
        <div className="custom-profile-section__visual">
          <img className="custom-profile-art" src={bestDeveloperArtSrc} alt="" aria-hidden="true" loading="eager" decoding="sync" />
          <div className="custom-profile-overlay" aria-label="Editable profile preview text">
            <article className="custom-profile-overlay__feedback" aria-label="Past client feedback">
              <p className="custom-profile-overlay__feedback-eyebrow">{customProfileFeedback.eyebrow}</p>
              <p className="custom-profile-overlay__feedback-title">{customProfileFeedback.title}</p>
            </article>
            <ul className="custom-profile-overlay__skills" aria-label="Profile skills">
              {customProfileSkills.map((skill) => (
                <li className="custom-profile-overlay__skill" key={skill}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}

function ReadyArrowIcon() {
  return (
    <svg viewBox="0 0 24 18" aria-hidden="true" focusable="false">
      <path
        d="M14.58 0.92C15.07 0.49 15.81 0.51 16.28 0.94L16.37 1.04L23.63 9.05L16.37 16.96C15.9 17.48 15.11 17.51 14.59 17.04C14.11 16.6 14.05 15.88 14.43 15.38L14.52 15.28L18.74 10.67H1.25C0.56 10.67 0 10.11 0 9.42C0 8.77 0.49 8.24 1.12 8.18L1.25 8.17H18.77L14.51 3.46C14.08 2.98 14.09 2.25 14.51 1.78L14.58 0.92Z"
        fill="currentColor"
      />
    </svg>
  )
}

function ReadySection() {
  return (
    <section className="figma-section figma-section--ready ready-section" aria-labelledby="ready-title">
      <SectionReveal className="figma-section__frame ready-section__frame">
        <span className="ready-section__wash" aria-hidden="true" />
        <span className="ready-section__orb ready-section__orb--top-left" aria-hidden="true" />
        <span className="ready-section__orb ready-section__orb--top-right" aria-hidden="true" />
        <span className="ready-section__orb ready-section__orb--lower" aria-hidden="true" />
        <span className="ready-section__sun" aria-hidden="true" />
        <span className="ready-section__dot" aria-hidden="true" />
        <img className="ready-section__left-art" src={readyLeftArtSrc} alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <article className="ready-section__copy">
          <p className="ready-section__eyebrow">Are you ready?</p>
          <h2 id="ready-title">Help is only a few clicks away!</h2>
          <p className="ready-section__body">Click Below to get set up super quickly and find help now!</p>
          <button
            type="button"
            className="ready-section__action"
            onClick={() => scrollToId('pricing')}
            aria-label="Get started"
          >
            <span className="ready-section__action-icon">
              <ReadyArrowIcon />
            </span>
            <span className="ready-section__action-label">Get Started</span>
          </button>
        </article>
      </SectionReveal>
    </section>
  )
}

function QuestionsSection() {
  return (
    <section className="figma-section figma-section--questions questions-section" id="faq" aria-labelledby="questions-title">
      <SectionReveal className="figma-section__frame">
        <img className="figma-section__art" src={questionsArtSrc} alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <span className="questions-section__vector-text-mask" aria-hidden="true" />
        <h2 id="questions-title" className="questions-section__title">Common Questions</h2>
        <div className="questions-section__content">
          {commonQuestions.map((item) => (
            <article className="questions-section__item" key={item.question}>
              <h3 className="questions-section__question">{item.question}</h3>
              <p className="questions-section__answer">{item.answer}</p>
            </article>
          ))}
        </div>
        <a
          href="#faq"
          className="art-hit-area questions-section__action"
          onClick={(event) => {
            event.preventDefault()
            scrollToId('faq')
          }}
          aria-label="More questions"
        >
          <span className="questions-section__action-label">More Questions</span>
        </a>
      </SectionReveal>
    </section>
  )
}

function PricingCard({ plan }: { plan: (typeof pricingPlans)[number] }) {
  return (
    <article className={`pricing-card pricing-card--${plan.id}`}>
      <div className="pricing-card__summary">
        {plan.id === 'premium' ? (
          <span className="pricing-card__badge">
            <span className="pricing-card__badge-icon" aria-hidden="true">
              <img src={remoteRecruitMarkSrc} alt="" />
            </span>
            <span>Premium</span>
          </span>
        ) : null}
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

function FooterPricingLayer() {
  return (
    <section className="footer-pricing-layer" id="pricing" aria-labelledby="pricing-title">
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

function SocialIcon({ icon }: { icon: SocialIconName }) {
  return (
    <svg className="footer-social-hit__icon" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      {icon === 'facebook' && (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.9648 23.3346V17.624H11.3335V14.3606H12.9648V12.7466C12.9648 10.494 14.7908 8.66797 17.0442 8.66797H19.4915V11.9313H17.8602C16.9582 11.9313 16.2282 12.6613 16.2282 13.5626V14.3606H19.4915L18.6755 17.624H16.2282V23.3346H12.9648Z"
        />
      )}
      {icon === 'instagram' && (
        <g transform="translate(-42 0)">
          <path d="M57.9524 12.3018C55.7302 12.3018 53.8889 14.1113 53.8889 16.3652C53.8889 18.6192 55.6984 20.4287 57.9524 20.4287C60.2064 20.4287 62.0159 18.5875 62.0159 16.3652C62.0159 14.143 60.1746 12.3018 57.9524 12.3018ZM57.9524 18.9684C56.5238 18.9684 55.3492 17.7938 55.3492 16.3652C55.3492 14.9367 56.5238 13.7621 57.9524 13.7621C59.381 13.7621 60.5556 14.9367 60.5556 16.3652C60.5556 17.7938 59.381 18.9684 57.9524 18.9684Z" />
          <path d="M62.1745 13.1269C62.683 13.1269 63.0952 12.7147 63.0952 12.2063C63.0952 11.6978 62.683 11.2856 62.1745 11.2856C61.6661 11.2856 61.2539 11.6978 61.2539 12.2063C61.2539 12.7147 61.6661 13.1269 62.1745 13.1269Z" />
          <path d="M64.5555 9.82551C63.7301 8.96837 62.5555 8.52393 61.2222 8.52393H54.6825C51.9206 8.52393 50.0793 10.3652 50.0793 13.1271V19.635C50.0793 21.0001 50.5238 22.1747 51.4127 23.0319C52.2698 23.8573 53.4127 24.27 54.7143 24.27H61.1905C62.5555 24.27 63.6984 23.8255 64.5238 23.0319C65.3809 22.2065 65.8254 21.0319 65.8254 19.6668V13.1271C65.8254 11.7938 65.3809 10.6509 64.5555 9.82551ZM64.4285 19.6668C64.4285 20.6509 64.0793 21.4446 63.5079 21.9842C62.9365 22.5239 62.1428 22.8096 61.1905 22.8096H54.7143C53.7619 22.8096 52.9682 22.5239 52.3968 21.9842C51.8254 21.4128 51.5397 20.6192 51.5397 19.635V13.1271C51.5397 12.1747 51.8254 11.3811 52.3968 10.8096C52.9365 10.27 53.7619 9.98424 54.7143 9.98424H61.2539C62.2063 9.98424 63 10.27 63.5714 10.8414C64.1111 11.4128 64.4285 12.2065 64.4285 13.1271V19.6668Z" />
        </g>
      )}
      {icon === 'x' && (
        <g transform="translate(-84 0)">
          <path d="M101.222 15.0181L106 9.5835H104.868L100.718 14.3013L97.405 9.5835H93.5834L98.5939 16.7183L93.5834 22.4168H94.7155L99.0959 17.4335L102.595 22.4168H106.417L101.222 15.0181ZM99.6713 16.7809L99.1629 16.07L95.1237 10.4186H96.8628L100.124 14.9812L100.63 15.6921L104.868 21.6224H103.129L99.6713 16.7809Z" />
        </g>
      )}
      {icon === 'twitter' && (
        <g transform="translate(-126 0)">
          <path d="M148.198 11.2682L149.199 10.8272C149.419 10.7301 149.667 10.8915 149.667 11.1322C149.667 11.5126 149.513 12.2556 149.066 13.3935C148.965 15.3022 148.065 18.1353 146.456 20.089C143.99 23.0837 140.206 23.8843 134.992 21.7051C134.657 21.5652 134.755 21.0667 135.118 21.0642C136.436 21.0553 137.708 20.7457 138.861 20.1715C137.727 19.8877 136.829 19.0471 136.407 17.8765C136.401 17.859 136.396 17.8414 136.393 17.8238L136.263 17.7481C135.111 17.0421 134.349 15.6693 134.404 14.1401L134.639 14.0135C134.065 12.8534 134.289 11.3909 135.135 10.6693C135.253 10.5684 135.426 10.5626 135.551 10.6555C137.452 12.0716 138.723 12.7029 141.018 13.3073C141.322 9.78289 145.39 8.31817 148.198 11.2682Z" />
        </g>
      )}
      {icon === 'linkedin' && (
        <g transform="translate(-168 0)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M183.663 13.534V14.6654C184.651 12.6993 188.534 12.6659 188.665 15.5154L188.669 15.6654V20.6654L186.664 20.6667V16.666C186.664 13.8894 183.773 14.6444 183.666 16.5627L183.663 16.6647V20.6667H181.668V13.534H183.663V14.6654V13.534ZM180.662 13.6641V20.6654H178.667V13.6641H180.662ZM179.667 11.334C180.218 11.334 180.665 11.7807 180.665 12.332C180.665 12.8827 180.218 13.3293 179.667 13.3293C179.116 13.3293 178.67 12.8827 178.67 12.332C178.67 11.7807 179.116 11.334 179.667 11.334Z"
          />
        </g>
      )}
      {icon === 'snapchat' && (
        <g transform="translate(-210 0)">
          <path d="M234.325 19.7499C234.25 19.7499 234.25 19.7499 234.325 19.7499C234.1 19.5999 233.95 19.5999 233.8 19.5249H233.725C232.975 19.2999 232.3 18.7749 231.775 18.0999C231.475 17.7249 231.25 17.2749 231.1 16.8999C231.025 16.7499 231.1 16.6749 231.025 16.6749C231.025 16.6749 231.025 16.6749 231.1 16.5999C231.25 16.4499 231.475 16.2999 231.7 16.2249C232.075 16.0749 232.45 15.9249 232.825 15.6249C232.9 15.5499 232.975 15.4749 233.05 15.3249C233.125 15.0999 233.125 14.8749 233.05 14.6499C232.75 14.4999 232.525 14.3499 232.45 14.2749C232.225 14.1249 231.85 14.1249 231.55 14.1999C231.475 14.1999 231.4 14.2749 231.325 14.2749C231.25 14.2749 231.175 14.3499 231.1 14.3499H231.025C230.95 14.3499 230.875 14.3499 230.8 14.3499C230.8 14.1999 230.8 14.0499 230.8 13.8249C230.8 13.6749 230.8 13.5249 230.8 13.3749V13.2999C230.8 12.6999 230.8 12.0999 230.725 11.5749V11.4999C230.5 10.4499 229.825 9.4749 228.85 8.7249C228.175 8.2749 227.425 7.9749 226.6 7.8999C226.375 7.8999 226.15 7.8999 225.925 7.8999H225.775C224.95 7.8999 223.75 8.0499 222.7 8.8749C222.025 9.3999 221.5 10.0749 221.2 10.8249C221.05 11.7249 221.05 12.5499 221.125 13.2249V13.5999C221.125 13.8999 221.125 14.1249 221.125 14.3499C221.05 14.3499 220.9 14.3499 220.825 14.2749C220.75 14.2749 220.675 14.2749 220.525 14.2749C220.45 14.2749 220.375 14.1999 220.375 14.1999H220.3C220 14.1249 219.7 14.1999 219.55 14.3499C219.55 14.3499 219.55 14.3499 219.475 14.3499C219.175 14.5749 219.025 14.7999 219.025 15.0999C219.025 15.0999 219.025 15.1749 219.025 15.2499C219.025 15.4749 219.175 15.6249 219.325 15.7749C219.4 15.8499 219.475 15.8499 219.475 15.9249L219.55 15.9999C219.85 16.2249 220.225 16.2999 220.525 16.4499L220.75 16.3749C220.975 16.4499 221.05 16.5999 221.05 16.5999C221.125 16.8249 220.9 17.1249 220.9 17.1999C220.525 17.9499 220 18.5499 219.325 18.9999C218.95 19.2249 218.575 19.3749 218.2 19.5249H218.125C217.975 19.5249 217.75 19.5999 217.525 19.8999C217.525 19.8999 217.45 19.9749 217.45 20.0499C217.375 20.3499 217.45 20.5749 217.6 20.7249C217.675 20.8749 217.825 20.9499 217.9 20.9499C218.275 21.1749 218.725 21.2499 219.1 21.3999H219.175C219.175 21.3999 219.175 21.3999 219.25 21.3999L219.475 21.4749C219.55 21.4749 219.7 21.5499 219.775 21.5499C219.775 21.6249 219.85 21.7749 219.85 21.8499C219.85 21.9999 219.925 22.0749 219.925 22.2249C219.85 22.5249 220 22.6749 220.225 22.7499C220.45 22.8249 220.6 22.7499 220.675 22.7499C221.275 22.6749 221.875 22.5999 222.325 22.6749C222.7 22.7499 223.075 23.0499 223.525 23.2749C223.675 23.3499 223.825 23.4249 223.975 23.5749C224.425 23.8749 224.875 24.0999 225.55 24.0999C225.7 24.0999 225.775 24.0999 225.925 24.0999C226.225 24.0999 226.525 24.0999 226.825 24.0249C227.2 24.0249 227.575 23.8749 227.875 23.6499C228.1 23.4999 228.325 23.3499 228.55 23.1999C228.925 22.9749 229.225 22.7499 229.6 22.5999C229.675 22.5999 229.825 22.5249 230.05 22.5249H230.2C230.65 22.5249 231.175 22.5249 231.625 22.5999H231.775C231.925 22.5999 232.075 22.5249 232.15 22.3749C232.225 22.2999 232.225 22.2249 232.3 22.1499L232.375 21.9249C232.45 21.7749 232.45 21.5499 232.525 21.5499H232.6H232.675C233.125 21.4749 233.5 21.3999 233.8 21.2499L233.95 21.1749H234.025C234.175 21.0999 234.4 21.0249 234.625 20.7249C234.7 20.5749 234.775 20.3499 234.775 20.1999C234.55 20.0499 234.475 19.8999 234.325 19.7499Z" />
        </g>
      )}
    </svg>
  )
}

function Footer() {
  return (
    <footer className="figma-section figma-section--footer site-footer" aria-label="RemoteRecruit footer">
      <div className="figma-section__frame footer-frame">
        <img className="figma-section__art" src={footerArtSrc} alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <FooterPricingLayer />
        <nav className="footer-social-links" aria-label="Social links">
          {socialLinks.map((link) => (
            <a className={link.className} href={link.href} aria-label={`RemoteRecruit ${link.label}`} key={link.label}>
              <SocialIcon icon={link.icon} />
            </a>
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
      </main>
      <Footer />
      <ScrollToTopButton visible={showScrollTop} />
    </>
  )
}

export default App
