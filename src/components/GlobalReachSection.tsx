import { cn } from '@/lib/utils'
import globalReachVisualSrc from '../assets/optimized/lets_find_work_right_node.webp'
import globalReachVisualMobileSrc from '../assets/optimized/lets_find_work_right_node_mobile.webp'
import { globalReachCards } from './landingData'
import { SectionReveal } from './shared'
import { blueLabel, cardSurface, figmaFrame, figmaSection, rrFont } from './styles'

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
    <div
      className={cn(
        cardSurface,
        'absolute z-[2] box-border h-[11.21%] w-[63.42%] rounded-[36.5px] shadow-[14px_13px_20px_rgba(135,129,245,0.11),14px_10px_30px_rgba(49,89,211,0.12)]',
        className,
      )}
    >
      <div className="absolute top-1/2 left-[1.7%] h-[83.56%] w-[17.33%] -translate-y-1/2 overflow-hidden rounded-full border-[3px] border-[#f7b728] shadow-[14px_10px_30px_rgba(49,89,211,0.12)] pointer-events-none select-none max-[720px]:border-2">
        <img
          className="block h-full w-full object-cover object-[56%_center]"
          src={avatarSrc}
          width="696"
          height="430"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="absolute top-1/2 right-[5%] left-[22.67%] min-w-0 -translate-y-1/2">
        <p
          className={cn(
            'm-0 text-xs font-black leading-[1.18] tracking-normal text-[#1E3E85] max-[720px]:text-[10px]',
            role === 'Front End Wizard' && 'text-[#52b4da]',
          )}
        >
          {role}
        </p>
        <p className="m-0 mt-1.5 text-[17px] font-normal leading-[1.18] tracking-normal text-[#11142d] max-[720px]:mt-1 max-[720px]:text-[15px]">{name}</p>
      </div>
    </div>
  )
}

export default function GlobalReachSection() {
  return (
    <section
      className={cn(figmaSection, '[--section-width:1152px] [--section-ratio:1152/651]')}
      aria-labelledby="global-reach-title"
    >
      <SectionReveal
        className={cn(
          figmaFrame,
          'left-[clamp(0px,calc((100vw_-_980px)*0.1065),49px)] overflow-visible max-[720px]:hidden',
        )}
      >
        <article className={cn(rrFont, 'absolute top-[15.82%] left-0 z-[2] w-[min(520px,46%)] select-text text-[#11142d]')}>
          <span className={cn(blueLabel, 'h-[39px] w-[137px] rounded-[18px] p-0 text-xs font-semibold leading-[15px] tracking-[0.4px]')}>
            Global Reach
          </span>
          <h2
            id="global-reach-title"
            className="mt-[35px] max-w-[520px] text-[40px] font-medium leading-[52px] tracking-normal text-[#11142D]"
          >
            The First Fully Global Job Board, Anywhere, Ever
          </h2>
          <p className="mt-[39px] max-w-[440px] text-lg font-normal leading-[1.95] tracking-normal text-[rgba(17,20,45,0.642764)]">
            RemoteRecruit connects candidates with opportunities around the world. With today&apos;s
            remote-first workforce, you need to be able to find the best jobs and the best people
            for them, wherever they may be.
          </p>
        </article>
        <div className={cn(rrFont, 'absolute top-0 right-0 z-[1] h-full w-[48.177%] select-text text-[#11142d]')}>
          <img
            className="absolute inset-0 z-[1] h-full w-full object-contain pointer-events-none select-none"
            src={globalReachVisualSrc}
            srcSet={`${globalReachVisualMobileSrc} 620w, ${globalReachVisualSrc} 1665w`}
            sizes="(max-width: 720px) min(100vw - 24px, 360px), 555px"
            width="1665"
            height="1953"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
          {globalReachCards.map((card) => (
            <GlobalReachCard {...card} key={card.role} />
          ))}
        </div>
      </SectionReveal>
      <SectionReveal className="mx-auto hidden w-[min(310px,100%)] gap-[26px] max-[720px]:grid">
        <article className={cn(rrFont, 'min-w-0 max-w-full [overflow-wrap:anywhere]')}>
          <span className={cn(blueLabel, 'h-[39px] w-[137px] rounded-[18px] p-0 text-xs font-semibold leading-[15px] tracking-[0.4px]')}>
            Global Reach
          </span>
          <h2 className="mt-[22px] mb-[18px] text-[40px] font-medium leading-[52px] tracking-normal text-[#11142D] [text-wrap:balance] [overflow-wrap:anywhere] max-[720px]:max-w-full">
            The First Fully Global Job Board, Anywhere, Ever
          </h2>
          <p className="m-0 text-sm font-normal leading-[1.65] text-[rgba(17,20,45,0.642764)]">
            RemoteRecruit connects candidates with opportunities around the world. With today&apos;s
            remote-first workforce, you need to be able to find the best jobs and the best people
            for them, wherever they may be.
          </p>
        </article>
        <div className={cn(rrFont, 'relative mx-auto w-[min(100%,360px)] select-text text-[#11142d]')}>
          <img
            className="relative z-[1] block h-auto w-full pointer-events-none select-none"
            src={globalReachVisualSrc}
            srcSet={`${globalReachVisualMobileSrc} 620w, ${globalReachVisualSrc} 1665w`}
            sizes="(max-width: 720px) min(100vw - 24px, 360px), 555px"
            width="1665"
            height="1953"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
          {globalReachCards.map((card) => (
            <GlobalReachCard {...card} key={card.role} />
          ))}
        </div>
      </SectionReveal>
    </section>
  )
}
