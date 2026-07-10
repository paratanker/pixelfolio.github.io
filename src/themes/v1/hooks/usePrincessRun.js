import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../../../utils/motion'
import { asset } from '../../../utils/asset'

const IDLE_FRAME = asset('characters/princess.png')
const RUN_FRAMES = [IDLE_FRAME, asset('characters/princess-run.png')]
const FRAME_INTERVAL = 140 // matches the hero's run-cycle timing
const RUN_DURATION = 1100 // matches the slide-in/out transition length

export function usePrincessRun(isActive) {
  const [frame, setFrame] = useState(IDLE_FRAME)
  const [isRunning, setIsRunning] = useState(false)
  const prevActiveRef = useRef(isActive)

  useEffect(() => {
    if (isActive === prevActiveRef.current) return
    prevActiveRef.current = isActive

    if (prefersReducedMotion()) {
      setFrame(IDLE_FRAME)
      setIsRunning(false)
      return
    }

    setIsRunning(true)
    let i = 0
    const frameId = setInterval(() => {
      i = (i + 1) % RUN_FRAMES.length
      setFrame(RUN_FRAMES[i])
    }, FRAME_INTERVAL)
    const stopId = setTimeout(() => {
      clearInterval(frameId)
      setFrame(IDLE_FRAME)
      setIsRunning(false)
    }, RUN_DURATION)

    return () => {
      clearInterval(frameId)
      clearTimeout(stopId)
    }
  }, [isActive])

  return { frame, isRunning }
}
