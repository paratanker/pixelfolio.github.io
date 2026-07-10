import { CARD, HEADING, HEADING_SIZE, BODY, META } from '../../styles'
import content from '../../../../data/content.json'
import Typewriter from '../Typewriter'

const { quests } = content

const STATUS_BASE = 'inline-block font-pixel text-[0.56rem] px-[0.8em] py-[0.4em] rounded-full mb-[0.9rem]'

export default function ExperienceScreen() {
  return (
    <div className="flex flex-col gap-[1.3rem]">
      {quests.map((quest) => (
        <article className={CARD} key={quest.title + quest.duration}>
          <p className={quest.status === 'active' ? `${STATUS_BASE} bg-gold text-ink animate-pulse-tag` : `${STATUS_BASE} bg-white/18 text-white`}>
            {quest.status === 'active' ? '◆ ACTIVE QUEST' : '✓ QUEST COMPLETE'}
          </p>
          <h3 className={`${HEADING} ${HEADING_SIZE} leading-[1.5]`}>{quest.title}</h3>
          <Typewriter as="p" text={`QUEST GIVER: ${quest.giver}`} speed={12} className="font-mono text-[0.95rem] text-gold uppercase mt-2" />
          <Typewriter as="p" text={quest.duration} speed={12} className={`${META} mt-2`} />
          <ul className={`quest__objectives list-none mt-4 ${BODY}`}>
            {quest.objectives.map((objective) => (
              <li className="mb-2 flex items-start gap-[0.6em]" key={objective}>
                <svg className="w-[0.7em] h-[0.7em] mt-[0.4em] shrink-0 text-gold" viewBox="0 0 10 10" aria-hidden="true">
                  <path d="M2 1L8.5 5L2 9Z" fill="currentColor" />
                </svg>
                <Typewriter as="span" text={objective} speed={12} />
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}
