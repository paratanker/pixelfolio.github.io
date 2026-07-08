import { useMemo } from 'react'
import Level from './Level'
import LevelNav from './LevelNav'
import { useRunCycle } from '../hooks/useRunCycle'
import { useCountUp } from '../hooks/useCountUp'
import { EYEBROW, HEADING, BTN_BASE, CHIP_BASE } from '../styles'
import content from '../data/content.json'

const RUN_FRAMES = ['/characters/1.png', '/characters/4.png']

const { eyebrow: HERO_EYEBROW, name: HERO_NAME, subtitle: HERO_SUBTITLE, description: HERO_DESCRIPTION, location: HERO_LOCATION, stack: STACK } = content.hero

const missionsShippedCount = content.missionGroups.reduce((total, group) => total + group.projects.length, 0)

const STATS = content.hero.stats.map((stat) => ({
  ...stat,
  value: stat.value.replace('{{missionsShipped}}', missionsShippedCount),
}))

const CHIP = `${CHIP_BASE} border-white/35 text-white bg-black/50`
const CHIP_ACCENT = `${CHIP_BASE} border-gold text-gold bg-black/50`

const DECO_BASE = 'absolute hidden min-[700px]:block'

const decorations = (
  <>
    <div className={`cloud ${DECO_BASE} w-[70px] h-[26px] bg-white rounded-[50px] opacity-[0.92] animate-float`} style={{ top: 92, left: '8%' }} aria-hidden="true" />
    <div className={`cloud ${DECO_BASE} w-[70px] h-[26px] bg-white rounded-[50px] opacity-[0.92] animate-float`} style={{ top: 95, left: '70%', animationDelay: '2s' }} aria-hidden="true" />
    <div className={`${DECO_BASE} w-[60px] h-[60px] rounded-full bg-[radial-gradient(circle_at_35%_35%,#FFE9A8,var(--color-gold))] shadow-[0_0_44px_12px_rgba(232,163,61,0.5)]`} style={{ top: 64, right: '8%' }} aria-hidden="true" />
    <picture className={`${DECO_BASE} bottom-0 left-0 pointer-events-none`}>
      <source media="(min-width: 700px)" srcSet="/assets/castle.png" />
      <img className="pixel-img w-[300px] h-auto opacity-80" alt="" aria-hidden="true" />
    </picture>
  </>
)

function StatValue({ value }) {
  const match = useMemo(() => value.match(/^(\d+)(.*)$/), [value])
  const target = match ? parseInt(match[1], 10) : 0
  const suffix = match ? match[2] : value
  const count = useCountUp(target)
  return <>{count}{suffix}</>
}

// Isolated so the 220ms frame-cycle interval only re-renders this sprite,
// not the whole Hero section.
function HeroSprite() {
  const frame = useRunCycle(RUN_FRAMES, 220)
  return <img className="pixel-img relative z-[2] w-[180px] h-auto mb-[22px] drop-shadow-[0_8px_12px_rgba(0,0,0,0.55)]" src={frame} alt="" aria-hidden="true" />
}

export default function Hero() {
  return (
    <Level id="top" className="bg-lvl-hero" decorations={decorations}>
      <div className="grid gap-10 items-center grid-cols-1 min-[900px]:grid-cols-[1.15fr_0.85fr] min-[900px]:gap-12">
        <div>
          <p className={`reveal ${EYEBROW}`}>{HERO_EYEBROW}</p>
          <h1 className={`reveal ${HEADING} text-[clamp(1.7rem,5.4vw,3rem)] leading-[1.5] mt-[0.9rem]`}>{HERO_NAME}</h1>
          <p className="reveal font-mono text-[0.92rem] text-white/85 mt-4">{HERO_SUBTITLE}</p>
          <p className="reveal text-[1.04rem] text-white/[0.88] max-w-[36em] mt-[1.1rem]">{HERO_DESCRIPTION}</p>

          <div className="reveal flex flex-wrap gap-x-[2.2rem] gap-y-6 mt-[1.8rem]">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <b className="block font-pixel text-[1.15rem] text-gold"><StatValue value={stat.value} /></b>
                <span className="font-mono text-[0.7rem] tracking-[0.02em] text-white/75">{stat.label}</span>
              </div>
            ))}
          </div>

          <p className="reveal font-mono text-[0.72rem] text-white/70 mt-[1.6rem] mb-[0.7rem]">Core stack:</p>
          <div className="reveal flex flex-wrap gap-2 font-mono text-[0.78rem]" aria-label="Core stack">
            {STACK.map((item) => (
              <span className={item.accent ? CHIP_ACCENT : CHIP} key={item.label}>{item.label}</span>
            ))}
          </div>

          <div className="reveal mt-[1.9rem] flex flex-wrap gap-4">
            <a className={`${BTN_BASE} bg-red text-white`} href="#experience">Press Start
              <svg className="w-[0.9rem] h-[0.9rem]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" aria-hidden="true">
                <path d="M4 12h16M14 6l6 6-6 6" />
              </svg></a>
            <a className={`${BTN_BASE} bg-gold text-ink`} href="#contact">Contact Me</a>
          </div>
        </div>

        <div className="reveal relative justify-self-center w-[min(320px,78vw)] text-center mt-6" style={{ transitionDelay: '360ms' }}>
          <div className="relative rounded-[20px] border-4 border-gold overflow-hidden min-h-[380px] bg-[linear-gradient(180deg,#2E2246_0%,#150F24_100%)] flex items-end justify-center" role="img" aria-label="Pixel-art illustration of a Prince-of-Persia-style adventurer standing in a torch-lit palace archway">
            <img className="pixel-img absolute bottom-[14px] left-1/2 -translate-x-1/2 w-[250px] h-[340px] object-contain" src="/assets/dome.png" alt="" aria-hidden="true" />
            <div className="torch bottom-[112px] left-[28px]" aria-hidden="true" />
            <div className="torch bottom-[112px] right-[28px]" aria-hidden="true" />
            <HeroSprite />
            <div className="hero__scene-ground absolute left-0 right-0 bottom-0 h-[14px] border-t-2 border-white/[0.12]" aria-hidden="true" />
          </div>
          <p className="font-mono text-[0.72rem] text-white/75 mt-[0.8rem]"><span className="inline-flex items-center justify-center w-[1.6em] h-[1.6em] rounded-full bg-[radial-gradient(circle_at_35%_30%,#FFE9A8,var(--color-gold-dk))] text-ink font-pixel text-[0.6em] border-2 border-black/25 align-middle" aria-hidden="true">◆</span>&nbsp; {HERO_LOCATION}</p>
        </div>
      </div>

      <LevelNav next={{ href: '#profile', label: 'Next: About Me' }} />
    </Level>
  )
}
