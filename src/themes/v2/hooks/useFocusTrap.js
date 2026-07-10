import { useEffect } from 'react'
import { cycleIndex, LEFT_KEYS, matchesKey, RIGHT_KEYS } from '../utils/keyboard'

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
const EDITABLE_SELECTOR = 'input, textarea, [contenteditable="true"]'

function getFocusable(container) {
  return [...container.querySelectorAll(FOCUSABLE_SELECTOR)]
}

// Keeps Tab/Shift+Tab cycling within a dialog's own focusable elements
// instead of escaping to whatever is rendered behind it.
export function useFocusTrap(containerRef, active = true) {
  useEffect(() => {
    if (!active) return

    function onKeyDown(e) {
      if (e.key !== 'Tab') return
      const container = containerRef.current
      if (!container) return

      const focusable = getFocusable(container)
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [containerRef, active])
}

// A/D and Left/Right Arrow keys step focus between a screen's own buttons/links;
// W/S scroll a screen's content area, mirroring what Up/Down already do natively
// once the scroll region is focused (browsers give arrow keys default scroll
// behavior on a focused scrollable element, but plain letter keys get none).
// Both are skipped while a text input has focus (e.g. the Terminal's command
// line) so typing "ad"/"ws" and cursor-key editing there still work as expected.
export function useScreenKeyNav(containerRef, scrollRef, active = true) {
  useEffect(() => {
    if (!active) return

    function onKeyDown(e) {
      const activeEl = document.activeElement
      if (activeEl?.matches(EDITABLE_SELECTOR)) return

      const isNext = matchesKey(e, RIGHT_KEYS)
      const isPrev = matchesKey(e, LEFT_KEYS)
      if (isNext || isPrev) {
        const container = containerRef.current
        if (!container) return
        const focusable = getFocusable(container)
        if (focusable.length === 0) return

        const currentIndex = focusable.indexOf(activeEl)
        const delta = isNext ? 1 : -1
        const nextIndex = currentIndex === -1 ? 0 : cycleIndex(currentIndex, delta, focusable.length)

        e.preventDefault()
        focusable[nextIndex].focus()
        return
      }

      const isDown = e.key === 's' || e.key === 'S'
      const isUp = e.key === 'w' || e.key === 'W'
      if (isDown || isUp) {
        const scrollEl = scrollRef.current
        if (!scrollEl) return

        e.preventDefault()
        scrollEl.scrollBy({ top: isDown ? 80 : -80 })
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [containerRef, scrollRef, active])
}
