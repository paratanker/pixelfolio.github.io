import Level from './Level'
import LevelNav from './LevelNav'
import SectionHead from './SectionHead'
import { CARD, GROUP_LABEL } from '../styles'
import { asset } from '../utils/asset'
import content from '../data/content.json'

const { missionGroups } = content
const { eyebrow, title, disclaimer } = content.missions

const PROJ_NAME = 'proj-name font-semibold text-white block no-underline hover:text-gold'

export default function Missions() {
  return (
    <Level id="projects" className="bg-lvl-missions" walkerSrc={asset('characters/6.png')}>
      <SectionHead eyebrow={eyebrow} title={title} />

      <div className="flex flex-col gap-[1.8rem]">
        {missionGroups.map((group) => (
          <div key={group.name}>
            <p className={`${GROUP_LABEL} block`}>{group.name}</p>
            <div className="grid gap-[1.4rem] grid-cols-1 min-[640px]:grid-cols-2 min-[1040px]:grid-cols-4">
              {group.projects.map((project) => (
                <div className={`${CARD} reveal`} key={project.name}>
                  {project.href ? (
                    <a className={PROJ_NAME} href={project.href} target="_blank" rel="noopener">{project.name}</a>
                  ) : (
                    <span className={PROJ_NAME}>{project.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="reveal font-mono text-[0.68rem] text-white/50 italic mt-[1.8rem] max-w-[52em]">
        {disclaimer}
      </p>

      <LevelNav
        prev={{ href: '#experience', label: 'Previous: Quest Log' }}
        next={{ href: '#skills', label: 'Next: Skill Tree' }}
      />
    </Level>
  )
}
