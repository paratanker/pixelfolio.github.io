import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../utils/motion'

export function useRunCycle(frames, intervalMs = 220) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % frames.length)
    }, intervalMs)
    return () => clearInterval(id)
  }, [frames, intervalMs])

  return frames[index]
}
