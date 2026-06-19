import remoteRecruitMarkSrc from '../assets/optimized/logo_base.webp'
import { membershipFeatures } from './landingData'
import { SectionReveal, StatusIcon } from './shared'

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
        <img src={remoteRecruitMarkSrc} width="144" height="120" alt="" loading="lazy" decoding="async" />
      </span>
    </div>
  )
}

export default function FreeForeverSection() {
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
