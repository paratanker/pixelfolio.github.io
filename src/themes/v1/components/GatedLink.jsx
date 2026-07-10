import { useState } from 'react'
import { createPortal } from 'react-dom'
import { BTN_SHAPE } from '../styles'

const MODAL_BTN = `${BTN_SHAPE} text-[0.6rem] px-[1.4em] py-[0.8em] hover:translate-y-[2px]`

function randomQuestion() {
  const a = Math.floor(Math.random() * 9) + 1
  const b = Math.floor(Math.random() * 9) + 1
  return { a, b, sum: a + b }
}

export default function GatedLink({ href, target, className, children, ...rest }) {
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState(randomQuestion)
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState(false)

  const startGate = (e) => {
    e.preventDefault()
    setQuestion(randomQuestion())
    setAnswer('')
    setError(false)
    setOpen(true)
  }

  const close = () => setOpen(false)

  const submit = (e) => {
    e.preventDefault()
    if (Number(answer) === question.sum) {
      setOpen(false)
      if (target === '_blank') {
        window.open(href, '_blank', 'noopener')
      } else {
        window.location.href = href
      }
    } else {
      setError(true)
      setQuestion(randomQuestion())
      setAnswer('')
    }
  }

  return (
    <>
      <a href={href} target={target} className={className} onClick={startGate} {...rest}>
        {children}
      </a>
      {open && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={close}
        >
          <form
            className="bg-[#161d38] border-[3px] border-gold rounded-[18px] px-[1.8rem] py-[1.6rem] max-w-[22em] w-full text-center shadow-[0_8px_0_rgba(0,0,0,0.35)]"
            onClick={(e) => e.stopPropagation()}
            onSubmit={submit}
          >
            <p className="font-pixel text-[0.62rem] tracking-[0.03em] text-gold mb-4">QUICK CHECK — NOT A ROBOT?</p>
            <p className="font-mono text-white/90 text-[0.95rem] mb-4">What is {question.a} + {question.b}?</p>
            <input
              autoFocus
              type="number"
              inputMode="numeric"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full text-center font-mono text-[0.95rem] bg-black/30 border-2 border-white/25 rounded-full px-4 py-2 text-white mb-3 focus:outline-none focus:border-gold"
            />
            {error && <p className="font-mono text-[0.72rem] text-red mb-3">Not quite — try again.</p>}
            <div className="flex justify-center gap-3">
              <button
                type="submit"
                className={`${MODAL_BTN} bg-gold text-ink`}
              >
                Continue
              </button>
              <button
                type="button"
                onClick={close}
                className={`${MODAL_BTN} bg-white/15 text-white`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>,
        document.body
      )}
    </>
  )
}
