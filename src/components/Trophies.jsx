import Level from './Level'
import LevelNav from './LevelNav'
import SectionHead from './SectionHead'
import { CARD, EYEBROW } from '../styles'
import content from '../data/content.json'

const { eyebrow, title, education, languages, trophies } = content.credentials

function CredList({ label, items, trophy = false }) {
  return (
    <div className={`${CARD} reveal`}>
      <p className={`${EYEBROW} mb-[0.9rem]`}>{label}</p>
      {items.map((item) => (
        <div className={trophy ? 'reveal reveal--pop mb-[0.9rem]' : 'mb-[0.9rem]'} key={item.title}>
          <span className={`font-semibold text-white ${trophy ? 'cred-item__title--trophy' : ''}`}>{item.title}</span>
          <span className="font-mono text-[0.7rem] text-white/72 block mt-[0.2em]">{item.meta}</span>
        </div>
      ))}
    </div>
  )
}

export default function Trophies() {
  return (
    <Level id="credentials" className="bg-lvl-trophy" walkerSrc="/characters/9.png">
      <SectionHead eyebrow={eyebrow} title={title} />

      <div className="grid gap-[1.4rem] grid-cols-1 min-[800px]:grid-cols-3">
        <CredList label="Training Grounds" items={education} />
        <CredList label="Languages" items={languages} />
        <CredList label="Trophies" items={trophies} trophy />
      </div>

      <LevelNav
        prev={{ href: '#skills', label: 'Previous: Skill Tree' }}
        next={{ href: '#contact', label: 'Next: Contact' }}
      />
    </Level>
  )
}
