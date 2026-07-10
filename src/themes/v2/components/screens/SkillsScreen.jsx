import { CARD, CHIP_BASE, GROUP_LABEL } from '../../styles'
import content from '../../../../data/content.json'
import Typewriter from '../Typewriter'

const { skillGroups } = content

const CHIP = `${CHIP_BASE} border-white/35 text-white bg-black/18`

export default function SkillsScreen() {
  return (
    <div className="grid gap-[1.3rem] grid-cols-1 min-[700px]:grid-cols-2">
      {skillGroups.map((group) => (
        <div className={CARD} key={group.label}>
          <p className={GROUP_LABEL}>{group.label}</p>
          <div className="flex flex-wrap gap-2">
            {group.chips.map((chip) => (
              <Typewriter as="span" text={chip} speed={20} className={CHIP} key={chip} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
