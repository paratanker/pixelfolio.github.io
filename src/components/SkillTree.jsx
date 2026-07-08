import Level from './Level'
import LevelNav from './LevelNav'
import SectionHead from './SectionHead'
import { CARD, CHIP_BASE, GROUP_LABEL } from '../styles'
import content from '../data/content.json'

const { skillGroups } = content
const { eyebrow, title } = content.skills

const CHIP = `${CHIP_BASE} border-white/35 text-white bg-black/18 text-[0.82rem]`

export default function SkillTree() {
  return (
    <Level id="skills" className="bg-lvl-skills" walkerSrc="/characters/7.png">
      <SectionHead eyebrow={eyebrow} title={title} />

      <div className="grid gap-[1.3rem] grid-cols-1 min-[700px]:grid-cols-2">
        {skillGroups.map((group) => (
          <div className={`${CARD} reveal`} key={group.label}>
            <p className={GROUP_LABEL}>{group.label}</p>
            <div className="flex flex-wrap gap-2">
              {group.chips.map((chip) => (
                <span className={CHIP} key={chip}>{chip}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <LevelNav
        prev={{ href: '#projects', label: 'Previous: Missions' }}
        next={{ href: '#credentials', label: 'Next: Trophies' }}
      />
    </Level>
  )
}
