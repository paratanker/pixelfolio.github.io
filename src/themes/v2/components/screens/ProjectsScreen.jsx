import { CARD, GROUP_LABEL, BODY, META } from '../../styles'
import content from '../../../../data/content.json'
import Typewriter from '../Typewriter'

const { missionGroups } = content
const { disclaimer } = content.missions

const PROJ_NAME = `proj-name ${BODY} font-semibold block no-underline hover:text-gold`

export default function ProjectsScreen() {
  return (
    <>
      <div className="flex flex-col gap-[1.8rem]">
        {missionGroups.map((group) => (
          <div key={group.name}>
            <p className={`${GROUP_LABEL} block`}>{group.name}</p>
            <div className="grid gap-[1.4rem] grid-cols-1 min-[640px]:grid-cols-2 min-[1040px]:grid-cols-4">
              {group.projects.map((project) => (
                <div className={CARD} key={project.name}>
                  {project.href ? (
                    <Typewriter as="a" text={project.name} speed={14} className={PROJ_NAME} href={project.href} target="_blank" rel="noopener" />
                  ) : (
                    <Typewriter as="span" text={project.name} speed={14} className={PROJ_NAME} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Typewriter as="p" text={disclaimer} speed={12} className={`${META} italic mt-[1.8rem] max-w-[52em]`} />
    </>
  )
}
