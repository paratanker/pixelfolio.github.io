import { useEffect, useRef, useState } from 'react'

const SPEED = 260 // px per second
export const SPRITE_WIDTH = 68
const IDLE_FRAME = '/characters/5.png'
const WALK_FRAMES = ['/characters/1.png', '/characters/4.png']
const FRAME_INTERVAL = 140 // ms

const PRINCESS_WIDTH = 64
const COLLIDE_GAP = 6 // px left between the hero and the princess when stopped

// The wall margin and "meet" trigger zone scale with viewport width instead
// of using a fixed px offset: at narrow (phone) widths a fixed 100px offset
// left no room for the hero to walk at all, so the princess never ran.
const EDGE_STAND_RATIO = 0.08 // ~8% of viewport width from the wall
const EDGE_STAND_MIN = 24
const EDGE_STAND_MAX = 100
const MEET_DISTANCE_RATIO = 0.3 // fraction of the walkable range that counts as "meeting"
const MEET_DISTANCE_MIN = 20
const MEET_DISTANCE_MAX = 90

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function getBounds() {
  // Use clientWidth, not window.innerWidth: the .player-hud container is
  // `position:fixed; right:0`, which is laid out against the viewport minus
  // the scrollbar. innerWidth includes the scrollbar, so using it here made
  // the right-side stopping point drift past where the princess actually sits.
  const width = document.documentElement.clientWidth
  const edgeOffset = clamp(width * EDGE_STAND_RATIO, EDGE_STAND_MIN, EDGE_STAND_MAX)
  const min = edgeOffset + PRINCESS_WIDTH + COLLIDE_GAP
  const max = Math.max(width - edgeOffset - PRINCESS_WIDTH - COLLIDE_GAP - SPRITE_WIDTH, min)
  const meetDistance = clamp((max - min) * MEET_DISTANCE_RATIO, MEET_DISTANCE_MIN, MEET_DISTANCE_MAX)
  return { min, max, meetDistance, edgeOffset }
}

export function useCharacterControls() {
  const boundsRef = useRef(getBounds())
  const [x, setX] = useState(() => {
    const { min, max } = boundsRef.current
    return Math.min(Math.max((document.documentElement.clientWidth - SPRITE_WIDTH) / 2, min), max)
  })
  const [facing, setFacing] = useState('right')
  const [frame, setFrame] = useState(IDLE_FRAME)
  const [hasMoved, setHasMoved] = useState(false)

  const directionRef = useRef(0) // -1 left, 0 idle, 1 right
  const xRef = useRef(x)
  const rafRef = useRef(null)
  const lastTimeRef = useRef(null)
  const frameTimerRef = useRef(null)
  const frameIndexRef = useRef(0)

  const setDirection = (dir) => {
    directionRef.current = dir
    if (dir !== 0) {
      setFacing(dir < 0 ? 'left' : 'right')
      setHasMoved(true)
    }
  }

  useEffect(() => {
    function tick(time) {
      if (lastTimeRef.current == null) lastTimeRef.current = time
      const dt = (time - lastTimeRef.current) / 1000
      lastTimeRef.current = time

      if (directionRef.current !== 0) {
        const { min, max } = boundsRef.current
        xRef.current = clamp(xRef.current + directionRef.current * SPEED * dt, min, max)
        setX(xRef.current)
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    function onKeyDown(e) {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') setDirection(-1)
      else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') setDirection(1)
    }
    function onKeyUp(e) {
      if (
        (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') && directionRef.current === -1
      ) setDirection(0)
      else if (
        (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') && directionRef.current === 1
      ) setDirection(0)
    }
    function onResize() {
      boundsRef.current = getBounds()
      const { min, max } = boundsRef.current
      xRef.current = clamp(xRef.current, min, max)
      setX(xRef.current)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    const isWalking = () => directionRef.current !== 0
    frameTimerRef.current = setInterval(() => {
      if (isWalking()) {
        frameIndexRef.current = (frameIndexRef.current + 1) % WALK_FRAMES.length
        setFrame(WALK_FRAMES[frameIndexRef.current])
      } else {
        setFrame(IDLE_FRAME)
      }
    }, FRAME_INTERVAL)
    return () => clearInterval(frameTimerRef.current)
  }, [])

  const { min, max, meetDistance, edgeOffset } = boundsRef.current
  const meetSide = x >= max - meetDistance ? 'right' : x <= min + meetDistance ? 'left' : null

  const startMove = (dir) => setDirection(dir)
  const stopMove = (dir) => {
    if (directionRef.current === dir) setDirection(0)
  }

  return { x, facing, frame, startMove, stopMove, meetSide, standOffset: edgeOffset, hasMoved }
}
