import { useEffect, useState, type ReactNode } from 'react'
import brandNameSrc from './assets/optimized/brand_name.webp'
import headerBackgroundSrc from './assets/optimized/01_header_background.webp'
import GlobalReachSection from './components/GlobalReachSection'
import FreeForeverSection from './components/FreeForeverSection'
import CustomProfileSection from './components/CustomProfileSection'
import ReadySection from './components/ReadySection'
import QuestionsSection from './components/QuestionsSection'
import Footer from './components/Footer'
import { scrollToId } from './components/navigation'
import './App.css'

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
      <img
        className="figma-hero__background"
        src={headerBackgroundSrc}
        width="1440"
        height="704"
        alt=""
        aria-hidden="true"
        decoding="sync"
      />
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
