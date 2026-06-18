import globalReachVisualSrc from '../assets/optimized/lets_find_work_right_node.webp'
import { globalReachCards } from './landingData'
import { SectionReveal } from './shared'

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
      <img className="global-reach-card__avatar" src={avatarSrc} alt="" aria-hidden="true" loading="lazy" decoding="async" />
      <div className="global-reach-card__copy">
        <p className="global-reach-card__role">{role}</p>
        <p className="global-reach-card__name">{name}</p>
      </div>
    </div>
  )
}

export default function GlobalReachSection() {
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
          <img src={globalReachVisualSrc} alt="" aria-hidden="true" loading="eager" decoding="async" fetchPriority="high" />
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
          <img src={globalReachVisualSrc} alt="" aria-hidden="true" loading="eager" decoding="async" fetchPriority="high" />
        </div>
      </div>
    </section>
  )
}
