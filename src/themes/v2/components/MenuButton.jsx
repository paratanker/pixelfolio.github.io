export default function MenuButton({ label, selected, visited, onClick, onMouseEnter }) {
  return (
    <button
      type="button"
      className={`flex items-center gap-[0.75em] w-full text-left font-pixel text-[0.62rem] tracking-[0.02em] px-[1.1em] py-[0.9em] rounded-[10px] border-[3px] transition-[transform,box-shadow,background-color] duration-100 ease ${
        selected
          ? 'bg-gold text-ink border-black/30 shadow-[0_3px_0_rgba(0,0,0,0.4)] translate-y-[2px]'
          : 'bg-basalt/60 text-parchment border-parchment/20 shadow-[0_5px_0_rgba(0,0,0,0.35)] hover:bg-basalt/80'
      }`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      aria-current={selected ? 'true' : undefined}
    >
      <span className="flex-1">{label}</span>
      {visited && <span className="text-[0.9em] text-jade" aria-hidden="true">✓</span>}
    </button>
  )
}
