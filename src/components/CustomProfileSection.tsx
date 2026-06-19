import { cn } from '@/lib/utils'
import candidateAvatarSrc from '../assets/optimized/candidate-avatar-gru.webp'
import bestDeveloperArtSrc from '../assets/optimized/best_developer_ever_right_node.webp'
import { customProfileFeedback, customProfileSkills } from './landingData'
import { SectionReveal } from './shared'
import { blueLabel, cardSurface, rrFont } from './styles'

const skillPositionClasses = [
  'top-[61.44393%] left-[19.0991%] w-[16.75676%] max-[980px]:left-[18.37748%] max-[980px]:w-[18.2%]',
  'top-[61.44393%] left-[38.73874%] w-[15.85586%] max-[980px]:left-[37.86667%] max-[980px]:w-[17.6%]',
  'top-[61.44393%] left-[57.47748%] w-[14.59459%] max-[980px]:left-[57.07478%] max-[980px]:w-[15.4%]',
  'top-[68.8172%] left-[19.0991%] w-[14.23423%] max-[980px]:left-[18.61622%] max-[980px]:w-[15.2%]',
  'top-[68.8172%] left-[36.21622%] w-[23.24324%] max-[980px]:left-[33.83784%] max-[980px]:w-[28%]',
  'top-[68.8172%] left-[62.34234%] w-[7.56757%] rounded-full',
]

export default function CustomProfileSection() {
  return (
    <section className="mt-7 bg-white max-[720px]:mt-[74px]" aria-labelledby="custom-profile-title">
      <SectionReveal
        className={cn(
          rrFont,
          'mx-auto grid min-h-[651px] w-[min(1086px,100%)] grid-cols-[minmax(0,500px)_minmax(0,555px)] items-center gap-[31px] select-text text-[#11142d] max-[980px]:min-h-[540px] max-[980px]:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] max-[980px]:gap-6 max-[720px]:min-h-0 max-[720px]:w-[min(500px,100%)] max-[720px]:grid-cols-1',
        )}
      >
        <article className="relative min-h-[279px] w-[min(500px,100%)] min-w-0 select-text -translate-y-0.5 max-[980px]:min-h-0 max-[720px]:mx-auto max-[720px]:min-h-0 max-[720px]:w-[min(310px,100%)] max-[720px]:translate-y-0">
          <span className={cn(blueLabel, 'min-h-9 min-w-[130px] rounded-full px-5 py-0 text-xs font-semibold leading-[15px] tracking-normal max-[720px]:min-h-[34px] max-[720px]:px-4')}>
            Custom Profile
          </span>
          <h2
            id="custom-profile-title"
            className="absolute top-[24%] right-0 bottom-[57.33%] left-0 m-0 text-[40px] font-medium leading-[52px] tracking-normal text-[#11142D] max-[980px]:static max-[980px]:inset-auto max-[980px]:mt-[35px] max-[720px]:mt-[22px] max-[720px]:mb-[18px] max-[720px]:max-w-full max-[720px]:[overflow-wrap:break-word] max-[720px]:[text-wrap:balance]"
          >
            Showcase Your Talents
          </h2>
          <p className="mt-[122px] max-w-[444px] text-lg font-normal leading-[1.95] tracking-normal text-[rgba(17,20,45,0.642764)] max-[980px]:mt-[39px] max-[720px]:m-0 max-[720px]:text-sm max-[720px]:leading-[1.65]">
            Personalize your profile with everything that makes you unique. Add an introductory
            video and other media for a personal touch that stands out to employers and candidates.
          </p>
        </article>
        <div className="relative min-w-0 w-full select-text [container-type:inline-size] max-[720px]:mx-auto max-[720px]:w-[min(100%,390px)]">
          <img
            className="block h-auto w-full pointer-events-none select-none"
            src={bestDeveloperArtSrc}
            width="555"
            height="651"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
          <div
            className={cn(rrFont, 'absolute inset-0 z-[2] select-text text-[#11142d] pointer-events-none')}
            aria-label="Editable profile preview text"
          >
            <article
              className={cn(
                cardSurface,
                'absolute top-[44.48418%] left-[0.9009%] z-[3] box-border h-[13.36406%] w-[77.2973%] rounded-[43.5px] shadow-[14px_13px_20px_rgba(135,129,245,0.11),14px_10px_30px_rgba(49,89,211,0.12)] pointer-events-auto select-text',
              )}
              aria-label="Past client feedback"
            >
              <div className="absolute top-1/2 left-[1.7%] h-[83.56%] w-[17.33%] -translate-y-1/2 overflow-hidden rounded-full border-[3px] border-[#f7b728] shadow-[14px_10px_30px_rgba(49,89,211,0.12)] pointer-events-none select-none max-[720px]:border-2">
                <img
                  className="block h-full w-full object-cover object-[56%_center]"
                  src={candidateAvatarSrc}
                  width="696"
                  height="430"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="absolute top-1/2 right-[5%] left-[22.67%] min-w-0 -translate-y-1/2">
                <p className="m-0 p-0 text-xs font-semibold leading-[21px] tracking-normal text-[#1E3E85]">
                  {customProfileFeedback.eyebrow}
                </p>
                <p className="m-0 mt-1.5 whitespace-nowrap p-0 text-[17px] font-medium leading-6 tracking-normal text-[#11142D]">
                  {customProfileFeedback.title}
                </p>
              </div>
            </article>
            <ul className="absolute inset-0 m-0 list-none p-0" aria-label="Profile skills">
              {customProfileSkills.map((skill, index) => (
                <li
                  className={cn(
                    'absolute flex h-[4.91551%] items-center justify-center rounded-lg bg-[linear-gradient(131.63deg,#336DA6_6.87%,#1E3E85_106.04%)] bg-clip-text p-0 text-xs font-medium leading-[21px] tracking-normal text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [text-fill-color:transparent] pointer-events-auto whitespace-nowrap select-text',
                    skillPositionClasses[index],
                  )}
                  key={skill}
                >
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
