import Level from './Level'
import LevelNav from './LevelNav'
import SectionHead from './SectionHead'
import { CARD, HEADING } from '../styles'
import { asset } from '../utils/asset'
import content from '../data/content.json'

const { eyebrow, title, story, care } = content.about

const H3 = `${HEADING} text-[1.1rem] mb-4`
const P = 'text-white/90 mb-[1em]'

export default function About() {
  return (
    <Level id="profile" className="bg-lvl-about" walkerSrc={asset('characters/1.png')}>
      <SectionHead eyebrow={eyebrow} title={title} />

      <div className="grid gap-[1.6rem] grid-cols-1 min-[760px]:grid-cols-2">
        <div className={`${CARD} reveal`}>
          <h3 className={H3}>{story.heading}</h3>
          {story.paragraphs.map((p) => (
            <p className={P} key={p}>{p}</p>
          ))}
        </div>
        <div className={`${CARD} reveal`}>
          <h3 className={H3}>{care.heading}</h3>
          {care.paragraphs.map((p) => (
            <p className={P} key={p}>{p}</p>
          ))}
        </div>
      </div>

      <LevelNav
        prev={{ href: '#top', label: 'Previous: Stats' }}
        next={{ href: '#experience', label: 'Next: Quest Log' }}
      />
    </Level>
  )
}
