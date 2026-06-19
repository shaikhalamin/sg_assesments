import { useEffect, useRef } from 'react'
import type {
  FocusEvent as ReactFocusEvent,
  PointerEvent as ReactPointerEvent,
  SyntheticEvent,
} from 'react'

type HoverMotionOptions = {
  disabled?: boolean
  lift?: number
  scale?: number
  duration?: number
  restDuration?: number
}

const motionEase = 'cubic-bezier(0.33, 1, 0.68, 1)'

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

function revealElement(element: HTMLElement) {
  element.dataset.revealed = 'true'
  element.style.opacity = '1'
  element.style.setProperty('translate', '0 0')
  element.style.willChange = 'auto'
}

function revealWithoutMotion(element: HTMLElement) {
  revealElement(element)
  element.style.transform = 'none'
}

export function useSectionReveal<T extends HTMLElement>() {
  const elementRef = useRef<T | null>(null)

  useEffect(() => {
    const element = elementRef.current

    if (!element) {
      return undefined
    }

    if (prefersReducedMotion()) {
      revealWithoutMotion(element)
      return undefined
    }

    if (!('IntersectionObserver' in window)) {
      revealElement(element)
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          revealElement(element)
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
  const animateTarget = (target: T, y: number, activeScale: number, animationDuration: number) => {
    if (disabled || prefersReducedMotion()) {
      return
    }

    target.style.transition = `transform ${animationDuration}ms ${motionEase}`
    target.style.transform = `translateY(${y}px) scale(${activeScale})`
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
