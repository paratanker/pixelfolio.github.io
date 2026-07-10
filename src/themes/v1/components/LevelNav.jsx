const ARROW_BASE = 'inline-flex items-center justify-center w-[2.6rem] h-[2.6rem] rounded-full bg-black/32 border-2 border-white/40 text-white no-underline text-[1.1rem] transition-colors duration-150 hover:bg-black/50'

export default function LevelNav({ prev, next, loop }) {
  return (
    <div className="sticky bottom-[1.4rem] z-[3] flex justify-center items-center gap-[1.2rem] mt-10">
      {prev && (
        <a className={ARROW_BASE} href={prev.href} aria-label={prev.label}>↑</a>
      )}
      {next && (
        <a className={`${ARROW_BASE} nav-arrow--next`} href={next.href} aria-label={next.label}>↓</a>
      )}
      {loop && (
        <a className={`${ARROW_BASE} w-auto rounded-full px-[1.1rem] font-pixel text-[0.56rem] gap-[0.5em]`} href={loop.href}>
          <svg className="w-[1.1rem] h-[1.1rem]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v5h-5" />
          </svg> Play Again
        </a>
      )}
    </div>
  )
}
