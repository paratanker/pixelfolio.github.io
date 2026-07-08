import Level from './Level'
import LevelNav from './LevelNav'
import SectionHead from './SectionHead'
import { CARD, HEADING } from '../styles'
import content from '../data/content.json'

const { quests } = content
const { eyebrow, title } = content.questLog

const STATUS_BASE = 'inline-block font-pixel text-[0.56rem] px-[0.8em] py-[0.4em] rounded-full mb-[0.9rem]'

export default function QuestLog() {
  return (
    <Level id="experience" className="bg-lvl-quests" walkerSrc="/characters/3.png">
      <SectionHead eyebrow={eyebrow} title={title} />

      <div className="flex flex-col gap-[1.3rem]">
        {quests.map((quest) => (
          <article
            className={`${CARD} reveal`}
            key={quest.title + quest.duration}
          >
            <p className={quest.status === 'active' ? `${STATUS_BASE} bg-gold text-ink animate-pulse-tag` : `${STATUS_BASE} bg-white/18 text-white`}>
              {quest.status === 'active' ? '◆ ACTIVE QUEST' : '✓ QUEST COMPLETE'}
            </p>
            <h3 className={`${HEADING} text-[1.05rem] leading-[1.5]`}>{quest.title}</h3>
            <p className="font-mono text-[0.82rem] text-gold mt-2">QUEST GIVER: {quest.giver}</p>
            <p className="font-mono text-[0.72rem] text-white/70 mt-2">{quest.duration}</p>
            <ul className="quest__objectives list-none mt-4 text-white/90">
              {quest.objectives.map((objective) => (
                <li className="reveal mb-2 flex items-start gap-[0.6em]" key={objective}>
                  <svg
                    className="w-[0.7em] h-[0.7em] mt-[0.4em] shrink-0 text-gold"
                    viewBox="0 0 10 10"
                    aria-hidden="true"
                  >
                    <path d="M2 1L8.5 5L2 9Z" fill="currentColor" />
                  </svg>
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <LevelNav
        prev={{ href: '#profile', label: 'Previous: About Me' }}
        next={{ href: '#projects', label: 'Next: Missions' }}
      />
    </Level>
  )
}
