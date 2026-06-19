import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import readyLeftArtSrc from '../assets/optimized/lets_find_work_left.webp'
import { scrollToId } from './navigation'
import { SectionReveal } from './shared'
import { figmaFrame, figmaSection, focusRing, rrFont } from './styles'

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
    <section
      className={cn(figmaSection, 'overflow-hidden bg-[#e8edff] [--section-width:1440px] [--section-ratio:1440/610]')}
      aria-labelledby="ready-title"
    >
      <SectionReveal
        className={cn(
          figmaFrame,
          rrFont,
          'w-full max-w-none overflow-hidden select-text text-[#11142d] max-[1025px]:min-h-[560px] max-[1025px]:aspect-auto max-[720px]:min-h-[clamp(620px,calc(520px_+_28vw),720px)] max-[720px]:max-w-full max-[720px]:aspect-auto max-[720px]:transform-none',
        )}
      >
        <span
          className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(206,232,253,0.42)_0%,rgba(244,236,255,0.55)_100%),#e8edff]"
          aria-hidden="true"
        />
        <span
          className="absolute top-[-15.08%] left-[-5.9%] z-[1] block aspect-square w-[22.29%] rounded-full bg-white/30 max-[720px]:top-[-68px] max-[720px]:left-[-130px] max-[720px]:w-[260px]"
          aria-hidden="true"
        />
        <span
          className="absolute top-[-22.62%] right-[-7.64%] z-[1] block aspect-square w-[26.39%] rounded-full bg-white/30 max-[720px]:top-[-94px] max-[720px]:right-[-142px] max-[720px]:w-[290px]"
          aria-hidden="true"
        />
        <span
          className="absolute right-[45.14%] bottom-[-31.48%] z-[1] block aspect-square w-[34.24%] rounded-full bg-white/30 max-[720px]:right-auto max-[720px]:bottom-[-122px] max-[720px]:left-[-134px] max-[720px]:w-[312px]"
          aria-hidden="true"
        />
        <span
          className="absolute top-[5.08%] left-[18.26%] z-[2] aspect-square w-[3.68%] min-w-[34px] max-w-[53px] rounded-full bg-[linear-gradient(135deg,#ffdf4c_0%,#f8b232_100%)] max-[720px]:top-[34px] max-[720px]:right-[42px] max-[720px]:left-auto max-[720px]:w-[42px]"
          aria-hidden="true"
        />
        <span
          className="absolute top-[87.21%] left-[77.78%] z-[2] aspect-square w-[2.01%] min-w-[18px] max-w-[29px] rounded-full bg-[linear-gradient(135deg,#52b4da_0%,#1e3e85_100%)] max-[720px]:top-auto max-[720px]:right-9 max-[720px]:bottom-[42px] max-[720px]:left-auto max-[720px]:w-[22px]"
          aria-hidden="true"
        />
        <img
          className="absolute top-[6.23%] left-[-0.36%] z-[2] h-auto w-[56.46%] pointer-events-none select-none max-[720px]:top-[clamp(340px,48vw,356px)] max-[720px]:left-1/2 max-[720px]:w-[min(calc(100%_-_24px),520px)] max-[720px]:max-w-none max-[720px]:-translate-x-1/2"
          src={readyLeftArtSrc}
          width="813"
          height="573"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
        <article className="absolute top-[24.59%] left-[52.99%] z-[3] w-[min(500px,40%)] max-w-[500px] select-text max-[980px]:w-[min(350px,38%)] max-[720px]:top-[68px] max-[720px]:right-6 max-[720px]:left-6 max-[720px]:w-auto max-[720px]:max-w-[342px]">
          <p className="m-0 select-text text-base font-semibold leading-[30px] tracking-[1px] text-[#1E3E85]">Are you ready?</p>
          <h2
            id="ready-title"
            className="mt-[21px] max-w-[390px] select-text text-[44px] font-semibold leading-[57px] tracking-normal text-[#11142D] [text-wrap:normal] max-[980px]:text-4xl max-[720px]:mt-[18px] max-[720px]:text-[clamp(28px,9vw,32px)] max-[720px]:leading-[1.18] max-[720px]:[overflow-wrap:break-word] max-[720px]:[text-wrap:balance]"
          >
            Help is only a few clicks away!
          </h2>
          <p className="mt-[30px] max-w-[330px] select-text text-lg font-normal leading-[33px] tracking-normal text-[#767784] max-[720px]:mt-[18px]">
            Click Below to get set up super quickly and find help now!
          </p>
          <Button
            type="button"
            variant="ghost"
            className={cn(
              focusRing,
              'relative mt-[29px] inline-flex h-auto min-h-[61px] w-[180px] justify-start items-center rounded-full border-0 bg-[rgba(82,180,218,0.16)] py-0 pr-[22px] pl-2.5 text-[#1e3e85] select-text transition-[transform,background-color] duration-[180ms] hover:-translate-y-0.5 hover:bg-[rgba(82,180,218,0.23)] hover:text-[#1e3e85] max-[980px]:min-h-[58px] max-[980px]:w-[170px] max-[720px]:mt-6 max-[720px]:w-44',
            )}
            onClick={() => scrollToId('pricing')}
            aria-label="Get started"
          >
            <span className="grid size-[46px] flex-[0_0_46px] place-items-center rounded-full bg-[#52b4da] text-white pointer-events-none max-[980px]:size-[43px] max-[980px]:flex-[0_0_43px] max-[720px]:size-[42px] max-[720px]:flex-[0_0_42px] [&_svg]:h-[18px] [&_svg]:w-6">
              <ReadyArrowIcon />
            </span>
            <span className="absolute top-[calc(50%_-_24px_/_2_-_1.5px)] left-[calc(50%_-_92px_/_2_+_21.5px)] block h-6 w-[92px] whitespace-nowrap text-center text-base font-medium leading-6 text-[#1E3E85] select-text">
              Get Started
            </span>
          </Button>
        </article>
      </SectionReveal>
    </section>
  )
}
