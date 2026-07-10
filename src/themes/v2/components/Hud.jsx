import content from '../../../data/content.json'
import { missionsShippedCount } from '../../../data/stats'

const yearsMatch = content.hero.stats[0]?.value.match(/\d+/)
const YEARS = yearsMatch ? yearsMatch[0] : ''

const RESOURCE = 'inline-flex items-center gap-[0.5em] rounded-full border-[3px] border-black/45 bg-[linear-gradient(180deg,var(--color-basalt),var(--color-dungeon-dk))] shadow-[inset_0_2px_0_rgba(255,255,255,0.12),inset_0_-4px_0_rgba(0,0,0,0.35),0_4px_0_rgba(0,0,0,0.4)] px-[0.85em] py-[0.4em] font-pixel text-[0.62rem] text-parchment'

const BAR_TRACK = 'relative h-[clamp(1.4rem,2vw,1.9rem)] rounded-full bg-dungeon-dk/70 border-[3px] border-black/60 overflow-hidden shadow-[inset_0_2px_0_rgba(255,255,255,0.12)]'

export default function Hud({ visitedCount, totalCount }) {
  const { hp, hpMax, level } = content.hud
  const hpPct = hpMax > 0 ? Math.round((hp / hpMax) * 100) : 0
  const xpPct = totalCount > 0 ? Math.round((visitedCount / totalCount) * 100) : 0

  return (
    <div
      className="fixed top-0 inset-x-0 z-50 pointer-events-none flex flex-wrap items-center justify-between gap-3 px-[clamp(0.9rem,3vw,2.4rem)] py-[clamp(0.6rem,1.4vw,1rem)]"
      aria-hidden="true"
    >
      <div className={`${BAR_TRACK} flex-1 min-w-[150px] max-w-[260px]`}>
        <div className="absolute inset-[3px] rounded-full bg-gradient-to-r from-red-dk to-red transition-[width] duration-300" style={{ width: `${hpPct}%` }} />
        <span className="relative z-[1] flex items-center justify-center h-full font-pixel text-[0.54rem] text-white [text-shadow:0_2px_0_rgba(0,0,0,0.5)]">HP {hp}/{hpMax}</span>
      </div>

      <div className="flex items-center gap-[0.5rem]">
        <span className={RESOURCE}>
          <span className="inline-block w-[7px] h-[7px] rotate-45 bg-current [filter:drop-shadow(0_0_1px_rgba(0,0,0,0.9))]" aria-hidden="true" /> {missionsShippedCount}
        </span>
        <span className={RESOURCE}>
          <span className="inline-flex flex-col items-center w-[11px] h-[16px] [filter:drop-shadow(0_0_1px_rgba(0,0,0,0.9))]" aria-hidden="true">
            <span className="hg-bulb--top w-[11px] h-[8px] bg-gradient-to-b from-torch to-torch-dk" />
            <span className="hg-bulb--bottom w-[11px] h-[8px] bg-gradient-to-b from-torch-dk to-torch" />
          </span>
          {YEARS}
        </span>
      </div>

      <div className="flex items-center gap-[0.5rem] flex-1 min-w-[170px] max-w-[280px] justify-end">
        <span className="shrink-0 grid place-items-center w-[clamp(2.1rem,2.8vw,2.6rem)] aspect-square rounded-full bg-[radial-gradient(circle_at_35%_30%,#FFE9A8,var(--color-gold-dk))] border-[3px] border-black/45 font-pixel text-[0.58rem] text-ink shadow-[0_3px_0_rgba(0,0,0,0.4)]">
          {level}
        </span>
        <div className={`${BAR_TRACK} flex-1`}>
          <div className="absolute inset-[3px] rounded-full bg-gradient-to-r from-jade-dk to-jade transition-[width] duration-300" style={{ width: `${xpPct}%` }} />
          <span className="relative z-[1] flex items-center justify-center h-full font-pixel text-[0.5rem] text-white [text-shadow:0_2px_0_rgba(0,0,0,0.5)]">XP {visitedCount}/{totalCount}</span>
        </div>
      </div>
    </div>
  )
}
