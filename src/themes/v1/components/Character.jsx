import { useCharacterControls, SPRITE_WIDTH } from '../hooks/useCharacterControls'
import { usePrincessRun } from '../hooks/usePrincessRun'

const PRINCESS_BASE = 'pixel-img absolute bottom-0 w-[68px] drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)] transition-transform duration-[1100ms] ease-[cubic-bezier(.22,.9,.36,1)] motion-reduce:transition-none motion-reduce:animate-none'
const BTN_BASE = 'absolute bottom-[10px] w-[2.6rem] h-[2.6rem] rounded-full bg-black/40 border-2 border-gold/55 text-gold text-[1.1rem] flex items-center justify-center pointer-events-auto select-none [touch-action:none] transition-[background-color,transform] duration-[120ms] ease active:bg-gold/35 active:scale-[0.94]'
const STATUS_TEXT_BASE = 'absolute left-1/2 -translate-x-1/2 font-mono text-[0.62rem] tracking-[0.02em] whitespace-nowrap transition-opacity duration-[400ms] ease max-[700px]:hidden'

const HEART_SIZE = { width: 20, height: 15 }
// 8x6 pixel-grid heart, drawn once as a stable element so the per-frame
// re-render while walking doesn't recreate these on every tick.
const HEART_PIXELS = (
  <>
    <rect x="1" y="0" width="2" height="1" fill="currentColor" />
    <rect x="5" y="0" width="2" height="1" fill="currentColor" />
    <rect x="0" y="1" width="8" height="1" fill="currentColor" />
    <rect x="0" y="2" width="8" height="1" fill="currentColor" />
    <rect x="1" y="3" width="6" height="1" fill="currentColor" />
    <rect x="2" y="4" width="4" height="1" fill="currentColor" />
    <rect x="3" y="5" width="2" height="1" fill="currentColor" />
  </>
)

function MeetingEffects({ x, isMeeting }) {
  return (
    <>
      <svg
        className={`absolute bottom-[78px] -translate-x-1/2 text-red drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)] transition-opacity duration-300 ease ${isMeeting ? 'animate-float' : ''}`}
        aria-hidden="true"
        style={{ left: x + SPRITE_WIDTH / 2, opacity: isMeeting ? 1 : 0, ...HEART_SIZE }}
        viewBox="0 0 8 6"
        shapeRendering="crispEdges"
      >
        {HEART_PIXELS}
      </svg>
      <p
        className={`${STATUS_TEXT_BASE} bottom-5 text-gold font-semibold`}
        aria-hidden="true"
        style={{ opacity: isMeeting ? 1 : 0 }}
      >
        ♥ You found the Princess!
      </p>
    </>
  )
}

export default function Character() {
  const { x, facing, frame, startMove, stopMove, meetSide, standOffset, hasMoved } = useCharacterControls()
  const leftPrincess = usePrincessRun(meetSide === 'left')
  const rightPrincess = usePrincessRun(meetSide === 'right')
  const isMeeting = Boolean(meetSide)

  return (
    <div className="fixed left-0 right-0 bottom-0 h-[74px] z-40 pointer-events-none">
      <div className="player-hud__ground absolute left-0 right-0 bottom-0 h-[14px] border-t-[3px] border-gold/35" aria-hidden="true" />

      <img
        className={`${PRINCESS_BASE} left-0`}
        style={{ transform: meetSide === 'left' ? `translateX(${standOffset}px)` : 'translateX(-100%)' }}
        src={leftPrincess.frame}
        alt=""
        aria-hidden="true"
      />
      <img
        className={`${PRINCESS_BASE} right-0`}
        style={{ transform: meetSide === 'right' ? `translateX(-${standOffset}px) scaleX(-1)` : 'translateX(100%) scaleX(-1)' }}
        src={rightPrincess.frame}
        alt=""
        aria-hidden="true"
      />

      <img
        className="pixel-img absolute bottom-0 w-[68px] h-auto drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)] [will-change:transform,left]"
        src={frame}
        alt=""
        aria-hidden="true"
        style={{
          left: x,
          transform: facing === 'left' ? 'scaleX(-1)' : 'none',
        }}
      />

      <MeetingEffects x={x} isMeeting={isMeeting} />

      <p
        className={`${STATUS_TEXT_BASE} bottom-0 text-white/55`}
        aria-hidden="true"
        style={{ opacity: hasMoved || isMeeting ? 0 : 1 }}
      >
        ← → or A / D to walk
      </p>

      <button
        type="button"
        className={`${BTN_BASE} left-4`}
        aria-label="Move left"
        onPointerDown={() => startMove(-1)}
        onPointerUp={() => stopMove(-1)}
        onPointerLeave={() => stopMove(-1)}
        onPointerCancel={() => stopMove(-1)}
      >
        ◀
      </button>
      <button
        type="button"
        className={`${BTN_BASE} right-4`}
        aria-label="Move right"
        onPointerDown={() => startMove(1)}
        onPointerUp={() => stopMove(1)}
        onPointerLeave={() => stopMove(1)}
        onPointerCancel={() => stopMove(1)}
      >
        ▶
      </button>
    </div>
  )
}
