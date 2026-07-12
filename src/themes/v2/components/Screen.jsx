import { useEffect, useRef } from 'react'
import { EYEBROW, HEADING } from '../styles'
import { useFocusTrap, useScreenKeyNav } from '../hooks/useFocusTrap'
import Typewriter from './Typewriter'

export default function Screen({ title, eyebrow, accent = 'contact', onClose, children }) {
  const dialogRef = useRef(null)
  const scrollRef = useRef(null)

  useFocusTrap(dialogRef)
  useScreenKeyNav(dialogRef, scrollRef)

  useEffect(() => {
    // A screen (e.g. Terminal) may already have auto-focused one of its own
    // inputs by the time this runs (child effects fire before parent effects).
    // Only steal focus to the scroll region if nothing more specific claimed it,
    // so arrow/Page keys can scroll immediately without a mouse.
    const dialog = dialogRef.current
    if (document.activeElement === document.body || !dialog?.contains(document.activeElement)) {
      scrollRef.current?.focus()
    }
  }, [])

  return (
    <div
      ref={dialogRef}
      className="screen-enter screen-shell fixed inset-0 z-30 flex flex-col overflow-hidden outline-none"
      style={{ '--screen-accent': `var(--color-lvl-${accent})` }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="level__bg-dots absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* var(--hud-clear) below the sm breakpoint clears the Hud, which can
          wrap onto up to 3 rows there — see its definition in theme.css. */}
      <header className="relative z-[2] flex items-start justify-between gap-4 px-[clamp(1.1rem,4vw,3rem)] pt-[var(--hud-clear)] sm:pt-[clamp(3rem,9vh,6.2rem)] pb-4">
        <div>
          <p className={EYEBROW}>{eyebrow}</p>
          <Typewriter as="h2" text={title} speed={22} className={`${HEADING} text-[clamp(1.2rem,min(3.2vw,3.8vh),2.1rem)] mt-2`} />
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 inline-flex items-center gap-[0.5em] font-pixel text-[0.56rem] text-white/85 bg-black/35 border-2 border-parchment/30 rounded-[8px] px-[1em] py-[0.7em] transition-colors hover:bg-black/55 hover:text-gold"
        >
          ESC
        </button>
      </header>

      <div
        ref={scrollRef}
        tabIndex={0}
        className="screen-scroll scrollbar-hide relative z-[2] flex-1 overflow-y-auto px-[clamp(1.1rem,4vw,3rem)] pb-[clamp(4rem,8vh,5rem)] outline-none"
      >
        {children}
      </div>
    </div>
  )
}
