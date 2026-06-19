import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import remoteRecruitMarkSrc from '../assets/optimized/logo_base.webp'
import type { PricingPlan } from './landingData'
import { scrollToId } from './navigation'
import { StatusIcon } from './shared'
import { cardSurface, focusRing, rrFont } from './styles'

export default function PricingCard({ plan }: { plan: PricingPlan }) {
  const isPremium = plan.id === 'premium'

  return (
    <article
      className={cn(
        cardSurface,
        rrFont,
        'relative grid min-h-[250px] min-w-0 grid-cols-[minmax(160px,0.42fr)_minmax(0,1fr)] grid-rows-[1fr_auto] gap-y-[22px] gap-x-7 rounded-[26px] p-7 text-left shadow-[0_28px_72px_rgba(49,89,211,0.12),0_12px_28px_rgba(20,45,92,0.05)] transition-[transform,box-shadow] duration-[180ms] hover:-translate-y-0.5 hover:shadow-[0_34px_84px_rgba(49,89,211,0.15),0_16px_34px_rgba(20,45,92,0.06)] max-[980px]:gap-[18px] max-[980px]:p-[22px] max-[720px]:mx-auto max-[720px]:w-[min(100%,520px)] max-[720px]:grid-cols-1 max-[720px]:gap-y-[18px] max-[720px]:gap-x-4 max-[720px]:p-5 max-[440px]:grid-cols-1',
        isPremium && 'border-transparent shadow-[0_22px_58px_rgba(49,89,211,0.13),0_10px_24px_rgba(20,45,92,0.05)]',
      )}
    >
      <div
        className={cn(
          'grid min-h-[148px] content-center justify-center justify-items-center rounded-2xl bg-[#ecf2ff] px-3 py-4 text-center max-[720px]:min-h-[126px] max-[440px]:min-h-28',
          isPremium && 'bg-[linear-gradient(180deg,#eef4ff_0%,#eaf0ff_100%)]',
        )}
      >
        {isPremium ? (
          <span className="absolute top-2.5 left-[35px] z-[1] inline-flex h-11 w-[146px] max-w-[calc(100%_-_70px)] items-center justify-center gap-3 rounded-full bg-[#c2eeff] px-3 py-0 text-base font-bold leading-none text-[#1e3e85] shadow-[0_6px_14px_rgba(82,180,218,0.28)] max-[980px]:left-[29px] max-[720px]:left-1/2 max-[720px]:-translate-x-1/2">
            <span
              className="grid size-9 place-items-center overflow-hidden rounded-full bg-white shadow-[0_2px_7px_rgba(30,62,133,0.14)]"
              aria-hidden="true"
            >
              <img
                className="block h-auto w-[21px] object-contain"
                src={remoteRecruitMarkSrc}
                width="144"
                height="120"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </span>
            <span>Premium</span>
          </span>
        ) : null}
        <h3
          className={cn(
            'm-0 text-[32px] font-black leading-[1.1] tracking-normal text-[#52b4da] max-[720px]:text-[26px]',
            isPremium && 'absolute m-[-1px] h-px w-px overflow-hidden whitespace-nowrap border-0 [clip:rect(0,0,0,0)]',
          )}
        >
          {plan.name}
        </h3>
        {plan.subtitle ? <p className="mt-2 mb-0 text-base font-bold leading-[1.25] text-[rgba(17,20,45,0.39554)]">{plan.subtitle}</p> : null}
        {plan.price ? (
          <p className={cn('grid justify-items-center', isPremium && 'mt-[19px]')}>
            <strong
              className={cn(
                'text-[28px] font-black leading-[1.15] text-[#52b4da] max-[720px]:text-2xl',
                isPremium && 'text-2xl font-semibold leading-[1.18]',
              )}
            >
              {plan.price}
            </strong>
            <span className={cn('mt-2 text-[13px] font-bold text-[rgba(17,20,45,0.39554)]', isPremium && 'mt-1.5 font-semibold')}>
              {plan.cadence}
            </span>
          </p>
        ) : null}
      </div>
      <ul className="m-0 grid min-w-0 list-none content-center gap-[17px] p-0 max-[720px]:gap-[13px]">
        {plan.features.map((feature) => (
          <li
            className={cn(
              'grid grid-cols-[18px_minmax(0,1fr)] items-center text-[13px] font-semibold leading-[1.35] tracking-normal text-[rgba(17,20,45,0.86)] max-[720px]:text-xs',
              feature.unavailable && 'text-[rgba(17,20,45,0.4)]',
            )}
            key={feature.label}
          >
            <StatusIcon unavailable={feature.unavailable} />
            <span>{feature.label}</span>
          </li>
        ))}
      </ul>
      <Button
        type="button"
        variant={isPremium ? 'default' : 'outline'}
        className={cn(
          focusRing,
          rrFont,
          'col-[1/-1] inline-flex h-auto min-h-14 w-full items-center justify-center rounded-[15px] border-2 border-[#1e3e85] bg-white text-sm font-black leading-none tracking-normal text-[#1e3e85] select-text transition-[background-color,box-shadow,color] duration-[180ms] hover:bg-[#edf7ff] hover:text-[#1e3e85]',
          isPremium && 'border-[#1e3e85] bg-[#1e3e85] text-white shadow-[0_14px_28px_rgba(30,62,133,0.2)] hover:bg-[#244f90] hover:text-white',
        )}
        onClick={() => scrollToId('pricing')}
        aria-label={plan.ariaLabel}
      >
        Get Started
      </Button>
    </article>
  )
}
