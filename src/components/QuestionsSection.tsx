import questionsArtSrc from '../assets/optimized/common_questions_node.webp'
import { commonQuestions } from './landingData'
import { scrollToId } from './navigation'
import { SectionReveal } from './shared'

export default function QuestionsSection() {
  return (
    <section className="figma-section figma-section--questions questions-section" id="faq" aria-labelledby="questions-title">
      <SectionReveal className="figma-section__frame">
        <img
          className="figma-section__art"
          src={questionsArtSrc}
          width="1040"
          height="637"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
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
