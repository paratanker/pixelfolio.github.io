import { useTypewriter } from '../hooks/useTypewriter'

export default function Typewriter({ text, speed = 28, className, as: Tag = 'span', ...rest }) {
  const { shown, done } = useTypewriter(text, speed)

  return (
    <Tag className={className} aria-label={text} {...rest}>
      <span aria-hidden="true">
        {shown}
        {!done && <span className="typewriter-caret" />}
      </span>
    </Tag>
  )
}
