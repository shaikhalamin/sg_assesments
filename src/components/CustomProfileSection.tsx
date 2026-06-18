import bestDeveloperArtSrc from '../screens_svg/04_custom_profiles_best_developer_ever/best_developer_ever_right_node.svg'
import { customProfileFeedback, customProfileSkills } from './landingData'
import { SectionReveal } from './shared'

export default function CustomProfileSection() {
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
          <img className="custom-profile-art" src={bestDeveloperArtSrc} alt="" aria-hidden="true" loading="lazy" decoding="async" />
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
