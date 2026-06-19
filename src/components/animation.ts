import { useEffect, useRef } from 'react'
import type {
  FocusEvent as ReactFocusEvent,
  PointerEvent as ReactPointerEvent,
  SyntheticEvent,
} from 'react'
import { animate } from 'animejs'

type AnimeAnimation = ReturnType<typeof animate>

type HoverMotionOptions = {
  disabled?: boolean
  lift?: number
  scale?: number
  duration?: number
  restDuration?: number
}

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function composeEventHandlers<Event extends SyntheticEvent>(
  userHandler: ((event: Event) => void) | undefined,
  motionHandler: (event: Event) => void,
) {
  return (event: Event) => {
    userHandler?.(event)

    if (!event.defaultPrevented) {
      motionHandler(event)
    }
  }
}

function isElementInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect()
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight

  return rect.top < viewportHeight && rect.bottom > 0
}

function revealWithoutMotion(element: HTMLElement) {
  element.dataset.revealed = 'true'
  element.style.opacity = '1'
  element.style.transform = 'none'
  element.style.willChange = 'auto'
}

export function useSectionReveal<T extends HTMLElement>() {
  const elementRef = useRef<T | null>(null)
  const animationRef = useRef<AnimeAnimation | null>(null)
  const hasRevealedRef = useRef(false)
  const hasCompletedRevealRef = useRef(false)

  useEffect(() => {
    const element = elementRef.current

    if (!element) {
      return undefined
    }

    if (prefersReducedMotion()) {
      revealWithoutMotion(element)
      return undefined
    }

    const reveal = () => {
      if (hasRevealedRef.current) {
        return
      }

      hasRevealedRef.current = true
      hasCompletedRevealRef.current = false
      element.dataset.revealed = 'true'
      element.style.willChange = 'opacity, transform'
      animationRef.current?.cancel()
      animationRef.current = animate(element, {
        opacity: { from: 0, to: 1 },
        y: { from: 28, to: 0 },
        duration: 720,
        ease: 'outCubic',
        onComplete: () => {
          hasCompletedRevealRef.current = true
          element.style.willChange = 'auto'
        },
      })
    }

    const cancelAnimation = () => {
      animationRef.current?.cancel()
      animationRef.current = null

      if (!hasCompletedRevealRef.current) {
        hasRevealedRef.current = false
      }
    }

    if (!('IntersectionObserver' in window) || isElementInViewport(element)) {
      reveal()

      return cancelAnimation
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          reveal()
          observer.disconnect()
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.16,
      },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      cancelAnimation()
    }
  }, [])

  return elementRef
}

export function useAnimeHoverMotion<T extends HTMLElement>({
  disabled = false,
  lift = -3,
  scale = 1.015,
  duration = 180,
  restDuration = 220,
}: HoverMotionOptions = {}) {
  const animationRef = useRef<AnimeAnimation | null>(null)

  useEffect(() => {
    return () => {
      animationRef.current?.cancel()
      animationRef.current = null
    }
  }, [])

  const animateTarget = (target: T, y: number, activeScale: number, animationDuration: number) => {
    if (disabled || prefersReducedMotion()) {
      return
    }

    animationRef.current?.cancel()
    animationRef.current = animate(target, {
      y,
      scale: activeScale,
      duration: animationDuration,
      ease: 'outCubic',
    })
  }

  return {
    onPointerEnter: (event: ReactPointerEvent<T>) => {
      animateTarget(event.currentTarget, lift, scale, duration)
    },
    onPointerLeave: (event: ReactPointerEvent<T>) => {
      animateTarget(event.currentTarget, 0, 1, restDuration)
    },
    onFocus: (event: ReactFocusEvent<T>) => {
      animateTarget(event.currentTarget, lift, scale, duration)
    },
    onBlur: (event: ReactFocusEvent<T>) => {
      animateTarget(event.currentTarget, 0, 1, restDuration)
    },
  }
}
