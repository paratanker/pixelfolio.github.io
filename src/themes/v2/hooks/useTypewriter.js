import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../../../utils/motion'

export function useTypewriter(text, speed = 28) {
  const [length, setLength] = useState(() => (prefersReducedMotion() ? text.length : 0))

  useEffect(() => {
    if (prefersReducedMotion()) {
      setLength(text.length)
      return
    }

    setLength(0)
    let raf
    const start = performance.now()
    const tick = (now) => {
      const next = Math.min(text.length, Math.floor((now - start) / speed))
      setLength(next)
      if (next < text.length) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, speed])

  return { shown: text.slice(0, length), done: length >= text.length }
}
