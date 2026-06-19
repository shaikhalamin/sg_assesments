import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import brandNameSrc from './assets/optimized/brand_name.webp'
import headerBackgroundSrc from './assets/optimized/01_header_background.webp'
import GlobalReachSection from './components/GlobalReachSection'
import FreeForeverSection from './components/FreeForeverSection'
import CustomProfileSection from './components/CustomProfileSection'
import ReadySection from './components/ReadySection'
import QuestionsSection from './components/QuestionsSection'
import Footer from './components/Footer'
import { scrollToId } from './components/navigation'
import { focusRing, rrFont } from './components/styles'

const headerButtonClass = cn(
  rrFont,
  focusRing,
  'h-11 min-h-11 rounded-full border-0 p-0 text-center text-sm font-semibold leading-[18px] tracking-[0.4px] text-[#F5F7FE] shadow-none transition-[transform,box-shadow,background-color,color] duration-[180ms] hover:-translate-y-0.5 hover:bg-transparent hover:text-[#F5F7FE] max-[720px]:min-h-[38px]',
)

function Header() {
  return (
    <header
      className="relative z-[2] mx-auto flex w-[calc(100%_-_102px)] items-center justify-between pt-[29px] max-[980px]:w-[min(calc(100%_-_40px),920px)] max-[720px]:w-[calc(100%_-_32px)] max-[720px]:pt-[22px]"
      aria-label="RemoteRecruit navigation"
    >
      <a
        className={cn(focusRing, 'inline-flex h-[50px] w-[124px] flex-[0_0_124px] items-center text-white no-underline max-[720px]:h-10 max-[720px]:w-[100px] max-[720px]:flex-[0_0_100px]')}
        href="#page-top"
        onClick={(event) => event.preventDefault()}
        aria-label="RemoteRecruit"
      >
        <img
          className="h-[50px] w-[124px] max-[720px]:h-auto max-[720px]:w-[100px]"
          src={brandNameSrc}
          width="124"
          height="50"
          alt=""
          loading="eager"
          decoding="sync"
        />
      </a>
      <nav className="flex items-center gap-9 max-[720px]:gap-1" aria-label="Account actions">
        <Button
          type="button"
          variant="ghost"
          className={cn(headerButtonClass, 'w-[58px] bg-transparent max-[720px]:w-[54px]')}
          onClick={() => scrollToId('page-top')}
        >
          Sign in
        </Button>
        <Button
          type="button"
          className={cn(headerButtonClass, 'w-[92px] rounded-2xl bg-[rgba(77,168,204,0.9)] text-white hover:bg-[rgba(77,168,204,0.9)] max-[720px]:w-[78px] max-[720px]:rounded-[14px]')}
          onClick={() => scrollToId('pricing')}
        >
          Sign up
        </Button>
      </nav>
    </header>
  )
}

function HeroSection() {
  return (
    <section
      className="relative h-[704px] overflow-hidden bg-white text-white max-[980px]:h-[600px] max-[720px]:h-[800px] max-[720px]:bg-[radial-gradient(circle_at_74%_68%,rgba(255,255,255,0.08)_0_34%,transparent_35%),linear-gradient(135deg,#1e3e85_0%,#336da6_100%)] max-[720px]:after:absolute max-[720px]:after:right-[-32%] max-[720px]:after:bottom-[-1px] max-[720px]:after:left-[-12%] max-[720px]:after:z-0 max-[720px]:after:h-[132px] max-[720px]:after:rounded-t-[50%] max-[720px]:after:bg-white max-[720px]:after:content-['']"
      id="page-top"
      aria-labelledby="hero-title"
    >
      <img
        className="absolute inset-0 z-0 h-full w-full max-w-none object-fill object-top pointer-events-none max-[720px]:hidden"
        src={headerBackgroundSrc}
        width="1440"
        height="704"
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="sync"
        fetchPriority="high"
      />
      <Header />
      <div
        className={cn(
          rrFont,
          'absolute left-1/2 top-[237px] z-[2] w-[min(820px,calc(100%_-_48px))] -translate-x-1/2 select-text text-center text-white max-[980px]:top-[206px] max-[980px]:w-[min(720px,calc(100%_-_44px))] max-[720px]:relative max-[720px]:left-auto max-[720px]:top-auto max-[720px]:z-[1] max-[720px]:mx-auto max-[720px]:mt-14 max-[720px]:block max-[720px]:h-auto max-[720px]:w-[min(342px,calc(100%_-_48px))] max-[720px]:translate-x-0 max-[720px]:overflow-visible max-[720px]:border-0 max-[720px]:whitespace-normal',
        )}
      >
        <h1
          id="hero-title"
          className="m-0 flex items-center justify-center text-center text-[53px] font-bold leading-[68px] tracking-normal text-white [text-wrap:balance] max-[980px]:text-[42px] max-[980px]:leading-[52px] max-[720px]:mb-[18px] max-[720px]:text-[32px] max-[720px]:leading-10"
        >
          RemoteRecruit&apos;s Difference
        </h1>
        <p className="mx-auto mt-6 max-w-[778px] text-center text-xl font-medium leading-8 tracking-normal text-white opacity-80 mix-blend-normal max-[980px]:max-w-[650px] max-[720px]:m-0 max-[720px]:max-w-[342px]">
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
    <Button
      type="button"
      size="icon"
      className={cn(
        focusRing,
        'fixed right-6 bottom-6 z-10 grid size-10 rounded-full border-0 bg-[#244f90] text-white opacity-0 shadow-[0_16px_32px_rgba(30,62,133,0.24)] transition-[opacity,transform] duration-[180ms] pointer-events-none translate-y-[14px] hover:bg-[#244f90] max-[720px]:right-4 max-[720px]:bottom-4',
        visible && 'opacity-100 pointer-events-auto translate-y-0',
      )}
      onClick={() => scrollToId('page-top')}
      aria-label="Scroll to top"
    >
      ↑
    </Button>
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
    <div className="min-h-screen bg-white">
      <HeroSection />
      <main>
        <div
          className="mx-auto w-[min(1152px,calc(100%_-_48px))] pt-11 max-[980px]:w-[calc(100%_-_36px)] max-[980px]:pt-[34px] max-[720px]:w-[calc(100%_-_24px)] max-[720px]:pt-7"
          aria-label="RemoteRecruit features"
        >
          <GlobalReachSection />
          <FreeForeverSection />
          <CustomProfileSection />
        </div>
        <ReadySection />
        <QuestionsSection />
      </main>
      <Footer />
      <ScrollToTopButton visible={showScrollTop} />
    </div>
  )
}

export default App
