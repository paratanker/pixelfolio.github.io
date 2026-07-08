import { EYEBROW, HEADING } from '../styles'

export default function SectionHead({ eyebrow, title }) {
  return (
    <div className="reveal mb-9">
      <span className={`${EYEBROW} block mb-[0.6rem]`}>{eyebrow}</span>
      <h2 className={`${HEADING} text-[clamp(1.5rem,4vw,2.2rem)]`}>{title}</h2>
    </div>
  )
}
