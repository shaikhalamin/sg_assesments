import type { ReactNode } from 'react'

export function SectionReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`section-reveal ${className}`.trim()}>
      {children}
    </div>
  )
}

export function StatusIcon({ unavailable = false }: { unavailable?: boolean }) {
  return (
    <span className={`status-icon ${unavailable ? 'status-icon--muted' : ''}`} aria-hidden="true">
      {unavailable ? (
        <svg className="status-icon__glyph" viewBox="0 0 12 12" focusable="false">
          <path d="M3.1 3.1L8.9 8.9M8.9 3.1L3.1 8.9" />
        </svg>
      ) : (
        <svg className="status-icon__glyph" viewBox="0 0 12 12" focusable="false">
          <path d="M3 6.1L5.1 8.2L9.2 3.9" />
        </svg>
      )}
    </span>
  )
}
