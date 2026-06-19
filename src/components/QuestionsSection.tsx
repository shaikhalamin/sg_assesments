import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import questionsArtSrc from '../assets/optimized/common_questions_node.webp'
import { commonQuestions } from './landingData'
import { scrollToId } from './navigation'
import { SectionReveal } from './shared'
import { figmaArt, figmaFrame, figmaSection, focusRing, rrFont } from './styles'

export default function QuestionsSection() {
  return (
    <section
      className={cn(figmaSection, 'py-[122px] pb-[70px] [--section-width:1040px] [--section-ratio:1040/637] max-[1025px]:py-[86px] max-[1025px]:pb-14 max-[720px]:py-[70px] max-[720px]:pb-12')}
      id="faq"
      aria-labelledby="questions-title"
    >
      <SectionReveal
        className={cn(
          figmaFrame,
          'max-[1025px]:w-[min(760px,calc(100%_-_36px))] max-[1025px]:min-h-0 max-[1025px]:aspect-auto max-[720px]:w-[min(560px,calc(100%_-_24px))]',
        )}
      >
        <img
          className={cn(figmaArt, 'hidden min-[1026px]:block')}
          src={questionsArtSrc}
          width="1040"
          height="637"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
        <span className="hidden absolute inset-0 z-[1] bg-white pointer-events-none min-[1026px]:block" aria-hidden="true" />
        <h2
          id="questions-title"
          className={cn(
            rrFont,
            'absolute top-0 left-0 z-[3] m-0 w-[min(420px,100%)] select-text bg-white text-[40px] font-medium leading-[52px] tracking-normal text-[#11142D] [text-wrap:balance] max-[1025px]:relative max-[1025px]:top-auto max-[1025px]:left-auto max-[1025px]:w-full',
          )}
        >
          Common Questions
        </h2>
        <div
          className={cn(
            rrFont,
            'absolute inset-0 z-[2] select-text text-[#11142d] pointer-events-auto max-[1025px]:relative max-[1025px]:inset-auto max-[1025px]:mt-[34px] max-[1025px]:grid max-[1025px]:gap-[30px]',
          )}
        >
          {commonQuestions.map((item) => (
            <article
              className="static m-0 w-full select-text pt-0 min-[1026px]:absolute min-[1026px]:left-0 min-[1026px]:pt-2.5 min-[1026px]:first:top-[17.58242%] min-[1026px]:first:min-h-[18.36735%] min-[1026px]:[&:nth-child(2)]:top-[42.2292%] min-[1026px]:[&:nth-child(2)]:min-h-[13.81476%] min-[1026px]:[&:nth-child(3)]:top-[61.38148%] min-[1026px]:[&:nth-child(3)]:min-h-[18.68132%] max-[1025px]:static max-[1025px]:min-h-0"
              key={item.question}
            >
              <h3 className="m-0 select-text text-[19px] font-medium leading-[26px] tracking-normal text-[#11142D]">
                {item.question}
              </h3>
              <p className="mt-[21px] max-w-[1040px] select-text text-[15px] font-normal leading-7 tracking-normal text-[rgba(17,20,45,0.637229)] max-[1025px]:mt-3.5 max-[1025px]:max-w-full">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
        <Button
          asChild
          variant="outline"
          className={cn(
            focusRing,
            rrFont,
            'absolute top-[89.6%] left-0 z-[2] inline-flex h-[10.4%] w-[17.8%] box-border items-center justify-center rounded-[15px] border-2 border-[rgba(83,180,218,0.695577)] bg-white text-[#1E3E85] no-underline select-text hover:bg-white hover:text-[#1E3E85] max-[1025px]:relative max-[1025px]:top-auto max-[1025px]:left-auto max-[1025px]:mt-[38px] max-[1025px]:h-[66px] max-[1025px]:w-[184px]',
          )}
        >
          <a
            href="#faq"
            onClick={(event) => {
              event.preventDefault()
              scrollToId('faq')
            }}
            aria-label="More questions"
          >
            <span className="select-text text-center text-base font-semibold leading-none tracking-normal text-[#1E3E85]">
              More Questions
            </span>
          </a>
        </Button>
      </SectionReveal>
    </section>
  )
}
