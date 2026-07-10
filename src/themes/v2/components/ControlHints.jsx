const KEY = 'inline-flex items-center justify-center min-w-[1.8em] font-pixel text-[0.56rem] text-parchment bg-basalt-dk/80 border-2 border-parchment/25 rounded-[4px] px-[0.5em] py-[0.35em]'

function Hint({ keys, label }) {
  return (
    <span className="inline-flex items-center gap-[0.5em] font-mono text-[0.68rem] text-parchment/70">
      <span className="inline-flex gap-[0.25em]">
        {keys.map((k) => <span className={KEY} key={k}>{k}</span>)}
      </span>
      {label}
    </span>
  )
}

export default function ControlHints({ mode, touch }) {
  // Touch users already have on-screen equivalents for every mode (ControlPad
  // for movement/jump, tap targets for section buttons, an ESC button on open
  // screens), so these keyboard-glyph hints would just be noise — there's no
  // physical keyboard to press.
  if (touch) return null

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[45] flex flex-wrap items-center justify-center gap-[1.4rem] px-4 py-[0.6rem] bg-dungeon-dk/70 backdrop-blur-[3px] border-t-2 border-parchment/10"
      aria-hidden="true"
    >
      {mode === 'select' && (
        <>
          <Hint keys={['A', 'D', '←', '→']} label="Choose" />
          <Hint keys={['ENTER']} label="Start" />
        </>
      )}
      {mode === 'menu' && (
        <>
          <Hint keys={['W', 'S']} label="Navigate" />
          <Hint keys={['ENTER']} label="Select" />
          <Hint keys={['ESC']} label="Change character" />
        </>
      )}
      {mode === 'platformer' && (
        <>
          <Hint keys={['←', '→']} label="Run" />
          <Hint keys={['SPACE']} label="Jump" />
          <Hint keys={['ENTER']} label="Select" />
          <Hint keys={['ESC']} label="Change character" />
        </>
      )}
      {mode === 'screen' && (
        <>
          <Hint keys={['W', 'S', '↑', '↓']} label="Scroll" />
          <Hint keys={['A', 'D', '←', '→']} label="Navigate" />
          <Hint keys={['ENTER']} label="Select" />
          <Hint keys={['ESC']} label="Back" />
        </>
      )}
    </div>
  )
}
