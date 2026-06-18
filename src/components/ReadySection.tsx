import readyLeftArtSrc from '../screens_svg/05_are_you_readyy/lets_find_work_left.svg'
import { scrollToId } from './navigation'
import { SectionReveal } from './shared'

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

export default function ReadySection() {
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
