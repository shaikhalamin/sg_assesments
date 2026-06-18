import { lazy, Suspense, useEffect, useState, type ReactNode } from 'react'
import brandNameSrc from './screens_svg/brand_name.svg'
import headerBackgroundSrc from './screens_svg/01_header/01_header_background.svg'
import { scrollToId } from './components/navigation'
import './App.css'

const GlobalReachSection = lazy(() => import('./components/GlobalReachSection'))
const FreeForeverSection = lazy(() => import('./components/FreeForeverSection'))
const CustomProfileSection = lazy(() => import('./components/CustomProfileSection'))
const ReadySection = lazy(() => import('./components/ReadySection'))
const QuestionsSection = lazy(() => import('./components/QuestionsSection'))
const Footer = lazy(() => import('./components/Footer'))

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

function Header() {
  return (
    <header className="site-header" aria-label="RemoteRecruit navigation">
      <a className="brand-link" href="#page-top" onClick={(event) => event.preventDefault()} aria-label="RemoteRecruit">
        <img className="brand-art" src={brandNameSrc} width="124" height="50" alt="" loading="eager" decoding="sync" />
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
          <Suspense fallback={null}>
            <GlobalReachSection />
          </Suspense>
          <Suspense fallback={null}>
            <FreeForeverSection />
          </Suspense>
          <Suspense fallback={null}>
            <CustomProfileSection />
          </Suspense>
        </div>
        <Suspense fallback={null}>
          <ReadySection />
        </Suspense>
        <Suspense fallback={null}>
          <QuestionsSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <ScrollToTopButton visible={showScrollTop} />
    </>
  )
}

export default App
