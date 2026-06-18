import remoteRecruitMarkSrc from '../assets/logo_base.svg'
import type { PricingPlan } from './landingData'
import { scrollToId } from './navigation'
import { StatusIcon } from './shared'

export default function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <article className={`pricing-card pricing-card--${plan.id}`}>
      <div className="pricing-card__summary">
        {plan.id === 'premium' ? (
          <span className="pricing-card__badge">
            <span className="pricing-card__badge-icon" aria-hidden="true">
              <img src={remoteRecruitMarkSrc} alt="" loading="lazy" decoding="async" />
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
