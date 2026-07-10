import { useEffect } from 'react'
import { prefersReducedMotion } from '../../../utils/motion'

const STEP_MS = 60
const MAX_STEPS = 6

export function useRevealOnScroll() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'))

    if (prefersReducedMotion()) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const timers = []
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const el = entry.target
        observer.unobserve(el)

        const siblings = el.parentElement
          ? Array.from(el.parentElement.children).filter((child) => child.classList.contains('reveal'))
          : [el]
        const index = Math.min(siblings.indexOf(el), MAX_STEPS)
        timers.push(setTimeout(() => el.classList.add('is-visible'), index * STEP_MS))
      })
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' })

    els.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [])
}
