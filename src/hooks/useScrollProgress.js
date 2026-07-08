import { useEffect, useRef } from 'react'

export function useScrollProgress() {
  const fillRef = useRef(null)
  const hgTopRef = useRef(null)
  const hgBottomRef = useRef(null)

  useEffect(() => {
    let ticking = false
    function update() {
      const doc = document.documentElement
      const scrollTop = window.scrollY || doc.scrollTop
      const scrollable = doc.scrollHeight - doc.clientHeight
      const pct = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0
      if (fillRef.current) fillRef.current.style.width = pct + '%'
      if (hgTopRef.current) hgTopRef.current.style.height = (100 - pct) + '%'
      if (hgBottomRef.current) hgBottomRef.current.style.height = pct + '%'
      ticking = false
    }
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }
    document.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      document.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [])

  return { fillRef, hgTopRef, hgBottomRef }
}
