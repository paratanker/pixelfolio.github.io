import { useCountUp } from '../../../../hooks/useCountUp'
import { CARD, HEADING, HEADING_SIZE, BODY, META } from '../../styles'
import content from '../../../../data/content.json'
import { missionsShippedCount } from '../../../../data/stats'
import Typewriter from '../Typewriter'

const { description: HERO_DESCRIPTION, location: HERO_LOCATION, stack: STACK } = content.hero
const { story, care } = content.about

const STATS = content.hero.stats.map((stat) => ({
  ...stat,
  value: stat.value.replace('{{missionsShipped}}', missionsShippedCount),
}))

// GROUP_LABEL with the size bumped up — this line introduces the whole about
// section, so it reads a step larger than the in-card group labels.
const ABOUT_TITLE = 'font-pixel text-[0.7rem] text-gold mb-[0.9rem] leading-[1.7]'

const H3 = `${HEADING} ${HEADING_SIZE} mb-4`
const P = `${BODY} mb-[1em]`

// Stack section reads larger than the shared META scale — it's the most
// scanned part of the profile, so it gets its own bump.
const STACK_LABEL = 'font-mono text-[1.1rem] text-white/70'
const STACK_CHIP_BASE = 'border-2 rounded-full px-[0.9em] py-[0.4em] text-[1.1rem]'
const STACK_CHIP = `${STACK_CHIP_BASE} border-white/35 text-white bg-black/50`
const STACK_CHIP_ACCENT = `${STACK_CHIP_BASE} border-gold text-gold bg-black/50`

function StatValue({ value }) {
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1], 10) : 0
  const suffix = match ? match[2] : value
  const count = useCountUp(target)
  return <>{count}{suffix}</>
}

export default function ProfileScreen() {
  return (
    <>
      <Typewriter as="p" text={HERO_DESCRIPTION} speed={18} className={`${BODY} max-w-[36em]`} />

      <div className="flex flex-wrap gap-x-[2.2rem] gap-y-6 mt-[1.8rem]">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <b className="block font-pixel text-[1.15rem] text-gold"><StatValue value={stat.value} /></b>
            <Typewriter as="span" text={stat.label} speed={12} className={`${META} tracking-[0.02em]`} />
          </div>
        ))}
      </div>

      <Typewriter as="p" text="Core stack:" speed={12} className={`${STACK_LABEL} mt-[1.6rem] mb-[0.7rem]`} />
      <div className={`flex flex-wrap gap-2 ${STACK_LABEL}`} aria-label="Core stack">
        {STACK.map((item) => (
          <Typewriter as="span" text={item.label} speed={12} className={item.accent ? STACK_CHIP_ACCENT : STACK_CHIP} key={item.label} />
        ))}
      </div>

      <p className={`${META} mt-[1.6rem]`}>
        <span className="inline-flex items-center justify-center w-[1.6em] h-[1.6em] rounded-full bg-[radial-gradient(circle_at_35%_30%,#FFE9A8,var(--color-gold-dk))] text-ink font-pixel text-[0.6em] border-2 border-black/25 align-middle" aria-hidden="true">◆</span>
        &nbsp; <Typewriter as="span" text={HERO_LOCATION} speed={12} />
      </p>

      <p className={`${ABOUT_TITLE} mt-[2.2rem]`}>{content.about.title}</p>
      <div className="grid gap-[1.6rem] grid-cols-1 min-[760px]:grid-cols-2">
        <div className={CARD}>
          <h3 className={H3}>{story.heading}</h3>
          {story.paragraphs.map((p) => (
            <Typewriter as="p" text={p} speed={12} className={P} key={p} />
          ))}
        </div>
        <div className={CARD}>
          <h3 className={H3}>{care.heading}</h3>
          {care.paragraphs.map((p) => (
            <Typewriter as="p" text={p} speed={12} className={P} key={p} />
          ))}
        </div>
      </div>
    </>
  )
}
