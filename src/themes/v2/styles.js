export const CARD = 'bg-black/30 border-[3px] border-parchment/20 rounded-[10px] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_3px_0_rgba(0,0,0,0.35)] px-[1.85rem] py-[1.6rem]'

export const EYEBROW = 'font-pixel text-[0.6rem] leading-[1.8] tracking-[0.03em] text-gold [text-shadow:0_2px_0_rgba(0,0,0,0.25)]'

export const HEADING = 'font-display font-semibold text-white [text-shadow:0_3px_0_rgba(0,0,0,0.2)] tracking-[0.01em]'

// Card-level heading size (Screen.jsx's top-level h2 title sets its own larger clamp() instead).
export const HEADING_SIZE = 'text-[1.1rem]'

// Shared body-copy scale so paragraph/list text reads at one consistent,
// readable size across every screen instead of each one picking its own rem value.
export const BODY = 'text-[1rem] leading-[1.6] text-white/90'

// Shared scale for secondary/meta text (dates, footnotes, labels) — smaller than
// BODY but kept above 0.95rem so it stays readable rather than illegibly tiny.
export const META = 'font-mono text-[0.95rem] text-white/70'

export const CHIP_BASE = 'border-2 rounded-full px-[0.9em] py-[0.4em] text-[0.95rem]'

export const GROUP_LABEL = 'font-pixel text-[0.56rem] text-gold mb-[0.9rem] leading-[1.7]'

export const BTN_SHAPE = 'font-pixel tracking-[0.02em] rounded-[8px] border-[3px] border-black/20 shadow-[0_5px_0_rgba(0,0,0,0.28)] transition-[transform,box-shadow] duration-[120ms] ease hover:shadow-[0_2px_0_rgba(0,0,0,0.28)]'

export const BTN_BASE = `inline-flex items-center gap-[0.5em] ${BTN_SHAPE} text-[0.62rem] no-underline px-[1.7em] py-[1em] hover:translate-y-[3px]`
