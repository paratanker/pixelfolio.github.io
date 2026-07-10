export const PAD_BTN = 'select-none touch-none flex items-center justify-center font-pixel text-parchment bg-[linear-gradient(180deg,rgba(74,67,83,0.92),rgba(15,10,31,0.92))] border-[3px] border-parchment/25 shadow-[0_4px_0_rgba(0,0,0,0.4)] transition-transform duration-75 active:translate-y-[3px] active:shadow-[0_1px_0_rgba(0,0,0,0.4)] [-webkit-touch-callout:none]'

// Sized off viewport height (not just a fixed rem) so a short landscape phone
// gets a smaller pad — it's a fixed overlay on top of the stage, not budgeted
// into the stage's own scale, so a smaller pad directly uncovers more of the
// ground-tier platforms/buttons instead of shrinking them. Floors keep both
// buttons at a comfortable touch-target size on tall screens.

function preventContextMenu(e) {
  e.preventDefault()
}

// A held direction button starts moving on press and stops on release — pointer
// events (not touch/mouse) so this also works with a mouse for testing, and
// setPointerCapture keeps the release paired with this button even if the
// finger drifts off it mid-press.
function DirectionButton({ dir, glyph, label, onMoveStart, onMoveEnd }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`${PAD_BTN} w-[clamp(2.75rem,8vh,3.6rem)] h-[clamp(2.75rem,8vh,3.6rem)] rounded-[12px] text-[clamp(0.9rem,3vh,1.2rem)]`}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        onMoveStart(dir)
      }}
      onPointerUp={() => onMoveEnd(dir)}
      onPointerCancel={() => onMoveEnd(dir)}
      onContextMenu={preventContextMenu}
    >
      {glyph}
    </button>
  )
}

export default function ControlPad({ onMoveStart, onMoveEnd, onJump }) {
  return (
    <div
      className="fixed inset-x-0 bottom-[clamp(1.2rem,4vh,2.4rem)] z-40 flex items-end justify-between px-[clamp(1rem,4vw,2.6rem)] pointer-events-none"
      aria-hidden="true"
    >
      <div className="flex gap-[0.7rem] pointer-events-auto">
        <DirectionButton dir={-1} glyph="◀" label="Move left" onMoveStart={onMoveStart} onMoveEnd={onMoveEnd} />
        <DirectionButton dir={1} glyph="▶" label="Move right" onMoveStart={onMoveStart} onMoveEnd={onMoveEnd} />
      </div>

      <button
        type="button"
        aria-label="Jump"
        className={`${PAD_BTN} w-[clamp(3.2rem,10vh,4.4rem)] h-[clamp(3.2rem,10vh,4.4rem)] rounded-full text-[clamp(0.44rem,1.7vh,0.6rem)] pointer-events-auto`}
        onPointerDown={(e) => {
          e.preventDefault()
          onJump()
        }}
        onContextMenu={preventContextMenu}
      >
        JUMP
      </button>
    </div>
  )
}
