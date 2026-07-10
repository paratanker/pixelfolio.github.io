import { CARD, EYEBROW, BODY, META } from '../../styles'
import content from '../../../../data/content.json'
import Typewriter from '../Typewriter'

const { education, languages, trophies } = content.credentials

function CredList({ label, items, trophy = false }) {
  return (
    <div className={CARD}>
      <p className={`${EYEBROW} mb-[0.9rem]`}>{label}</p>
      {items.map((item) => (
        <div className="mb-[0.9rem]" key={item.title}>
          <Typewriter as="span" text={item.title} speed={14} className={`${BODY} font-semibold ${trophy ? 'cred-item__title--trophy' : ''}`} />
          <Typewriter as="span" text={item.meta} speed={12} className={`${META} block mt-[0.2em]`} />
        </div>
      ))}
    </div>
  )
}

export default function EducationScreen() {
  return (
    <div className="grid gap-[1.4rem] grid-cols-1 min-[800px]:grid-cols-3">
      <CredList label="Training Grounds" items={education} />
      <CredList label="Languages" items={languages} />
      <CredList label="Trophies" items={trophies} trophy />
    </div>
  )
}
