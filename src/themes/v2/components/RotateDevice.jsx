import { BTN_GHOST } from '../styles'

// Shown by default whenever a touchscreen is held in portrait — the
// platformer is laid out for a landscape aspect ratio, so this steers players
// toward rotating. It's advisory, not a hard gate: "Continue Anyway" hands
// off to GameShell's flat MainMenu, which is portrait-safe on its own.
export default function RotateDevice({ onProceed }) {
  return (
    <div className="absolute inset-0 level-dungeon flex flex-col items-center justify-center gap-[clamp(1.2rem,4vh,2rem)] px-[clamp(1.5rem,6vw,3rem)] text-center">
      <svg
        viewBox="0 0 24 24"
        className="rotate-hint w-[clamp(3rem,12vw,4.5rem)] h-[clamp(3rem,12vw,4.5rem)] text-gold"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <rect x="6" y="2" width="12" height="20" rx="2" />
        <line x1="6" y1="18" x2="18" y2="18" />
      </svg>
      <p className="font-pixel text-[0.72rem] tracking-[0.03em] text-gold [text-shadow:0_2px_0_rgba(0,0,0,0.35)]">
        » ROTATE YOUR DEVICE «
      </p>
      <p className="font-mono text-[1rem] text-white/70 leading-[1.6] max-w-[22rem]">
        This dungeon is built for landscape. Turn your phone sideways to explore the level.
      </p>
      <button
        type="button"
        onClick={onProceed}
        className={`${BTN_GHOST} text-[0.58rem] px-[1.4em] py-[0.85em]`}
      >
        Continue Anyway
      </button>
    </div>
  )
}
