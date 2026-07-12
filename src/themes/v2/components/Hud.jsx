import { useState } from 'react'
import content from '../../../data/content.json'
import { missionsShippedCount } from '../../../data/stats'
import { getVolume, isMuted, playSfx, setVolume, toggleMuted } from '../utils/sound'

const yearsMatch = content.hero.stats[0]?.value.match(/\d+/)
const YEARS = yearsMatch ? yearsMatch[0] : ''

const RESOURCE = 'inline-flex items-center gap-[0.5em] rounded-full border-[3px] border-black/45 bg-[linear-gradient(180deg,var(--color-basalt),var(--color-dungeon-dk))] shadow-[inset_0_2px_0_rgba(255,255,255,0.12),inset_0_-4px_0_rgba(0,0,0,0.35),0_4px_0_rgba(0,0,0,0.4)] px-[0.85em] py-[0.4em] font-pixel text-[0.62rem] text-parchment'

const BAR_TRACK = 'relative h-[clamp(1.4rem,2vw,1.9rem)] rounded-full bg-dungeon-dk/70 border-[3px] border-black/60 overflow-hidden shadow-[inset_0_2px_0_rgba(255,255,255,0.12)]'

export default function Hud({ visitedCount, totalCount }) {
  const { hp, hpMax, level } = content.hud
  const hpPct = hpMax > 0 ? Math.round((hp / hpMax) * 100) : 0
  const xpPct = totalCount > 0 ? Math.round((visitedCount / totalCount) * 100) : 0
  const [muted, setMuted] = useState(isMuted)
  const [volume, setVolumeState] = useState(getVolume)
  const volumeBars = Math.round(volume * 5)

  function nudgeVolume(delta, e) {
    const next = Math.min(1, Math.max(0, Math.round((volume + delta) * 5) / 5))
    setVolumeState(setVolume(next))
    playSfx('move') // blip at the new level so the change is audible immediately
    if (e.detail > 0) e.currentTarget.blur()
  }

  return (
    <div className="fixed top-0 inset-x-0 z-50 pointer-events-none flex flex-wrap items-center justify-between gap-3 px-[clamp(0.9rem,3vw,2.4rem)] py-[clamp(0.6rem,1.4vw,1rem)]">
      <div className={`${BAR_TRACK} flex-1 min-w-[150px] max-w-[260px]`} aria-hidden="true">
        <div className="absolute inset-[3px] rounded-full bg-gradient-to-r from-red-dk to-red transition-[width] duration-300" style={{ width: `${hpPct}%` }} />
        <span className="relative z-[1] flex items-center justify-center h-full font-pixel text-[0.54rem] text-white [text-shadow:0_2px_0_rgba(0,0,0,0.5)]">HP {hp}/{hpMax}</span>
      </div>

      <div className="flex items-center gap-[0.5rem]">
        <span className={RESOURCE} aria-hidden="true">
          <span className="inline-block w-[7px] h-[7px] rotate-45 bg-current [filter:drop-shadow(0_0_1px_rgba(0,0,0,0.9))]" aria-hidden="true" /> {missionsShippedCount}
        </span>
        <span className={RESOURCE} aria-hidden="true">
          <span className="inline-flex flex-col items-center w-[11px] h-[16px] [filter:drop-shadow(0_0_1px_rgba(0,0,0,0.9))]" aria-hidden="true">
            <span className="hg-bulb--top w-[11px] h-[8px] bg-gradient-to-b from-torch to-torch-dk" />
            <span className="hg-bulb--bottom w-[11px] h-[8px] bg-gradient-to-b from-torch-dk to-torch" />
          </span>
          {YEARS}
        </span>
        {/* Sound pill: mute toggle + volume down/up around a 5-bar level meter.
            Pointer clicks blur the buttons so the player's next Space jumps
            instead of re-triggering them (buttons handle Space natively and
            the platformer defers to focused controls); keyboard activation
            (detail 0) keeps focus for tab users. */}
        <span className={`${RESOURCE} pointer-events-auto gap-[0.6em] ${muted ? 'opacity-55' : ''}`}>
          <button
            type="button"
            onClick={(e) => {
              setMuted(toggleMuted())
              if (e.detail > 0) e.currentTarget.blur()
            }}
            className="cursor-pointer transition-colors hover:text-gold"
            aria-pressed={!muted}
            aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
          >
            {/* Pixel-art speaker on an 8×8 grid, same crispEdges technique as the platform check. */}
            <svg viewBox="0 0 8 8" className="pixel-icon w-[1em] h-[1em]" fill="currentColor" aria-hidden="true">
              <rect x="0" y="2" width="2" height="4" />
              <rect x="2" y="1" width="1" height="6" />
              <rect x="3" y="0" width="1" height="8" />
              {muted ? (
                <>
                  <rect x="5" y="2" width="1" height="1" />
                  <rect x="7" y="2" width="1" height="1" />
                  <rect x="6" y="3" width="1" height="2" />
                  <rect x="5" y="5" width="1" height="1" />
                  <rect x="7" y="5" width="1" height="1" />
                </>
              ) : (
                <>
                  <rect x="5" y="3" width="1" height="2" />
                  <rect x="6" y="1" width="1" height="1" />
                  <rect x="7" y="2" width="1" height="4" />
                  <rect x="6" y="6" width="1" height="1" />
                </>
              )}
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => nudgeVolume(-0.2, e)}
            className="cursor-pointer transition-colors hover:text-gold"
            aria-label="Volume down"
          >
            -
          </button>
          <span className="flex items-end gap-[2px]" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`w-[3px] bg-current ${i < volumeBars ? '' : 'opacity-25'}`}
                style={{ height: `${5 + i * 2}px` }}
              />
            ))}
          </span>
          <button
            type="button"
            onClick={(e) => nudgeVolume(0.2, e)}
            className="cursor-pointer transition-colors hover:text-gold"
            aria-label="Volume up"
          >
            +
          </button>
        </span>
      </div>

      <div className="flex items-center gap-[0.5rem] flex-1 min-w-[170px] max-w-[280px] justify-end" aria-hidden="true">
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
