import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { composeEventHandlers, useAnimeHoverMotion, useSectionReveal } from './animation'
import { sectionReveal } from './styles'

export function SectionReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const revealRef = useSectionReveal<HTMLDivElement>()

  return (
    <div ref={revealRef} data-section-reveal="" className={cn(sectionReveal, className)}>
      {children}
    </div>
  )
}

export function AnimatedAnchor({
  onBlur,
  onFocus,
  onPointerEnter,
  onPointerLeave,
  ...props
}: ComponentPropsWithoutRef<'a'>) {
  const motionHandlers = useAnimeHoverMotion<HTMLAnchorElement>()

  return (
    <a
      {...props}
      onPointerEnter={composeEventHandlers(onPointerEnter, motionHandlers.onPointerEnter)}
      onPointerLeave={composeEventHandlers(onPointerLeave, motionHandlers.onPointerLeave)}
      onFocus={composeEventHandlers(onFocus, motionHandlers.onFocus)}
      onBlur={composeEventHandlers(onBlur, motionHandlers.onBlur)}
    />
  )
}

export function StatusIcon({
  unavailable = false,
  className,
  glyphClassName,
}: {
  unavailable?: boolean
  className?: string
  glyphClassName?: string
}) {
  const iconGlyphClass = cn(
    'absolute inset-0 size-full overflow-visible fill-none stroke-white stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round] pointer-events-none',
    glyphClassName,
  )

  return (
    <span
      className={cn(
        'relative inline-block size-3 flex-none rounded-full bg-[linear-gradient(135deg,#52b4da_0%,#1e3e85_100%)] shadow-[0_2px_4px_rgba(30,62,133,0.18)]',
        unavailable && 'bg-[linear-gradient(135deg,#a2a3b8_0%,#808191_100%)]',
        className,
      )}
      aria-hidden="true"
    >
      {unavailable ? (
        <svg className={iconGlyphClass} viewBox="0 0 12 12" focusable="false">
          <path d="M3.1 3.1L8.9 8.9M8.9 3.1L3.1 8.9" />
        </svg>
      ) : (
        <svg className={iconGlyphClass} viewBox="0 0 12 12" focusable="false">
          <path d="M3 6.1L5.1 8.2L9.2 3.9" />
        </svg>
      )}
    </span>
  )
}
