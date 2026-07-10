import { useEffect, useRef, useState } from 'react'
import content from '../../../../data/content.json'
import { missionsShippedCount } from '../../../../data/stats'
import { elizaReply, ELIZA_BANNER, ELIZA_GREETING } from '../../utils/eliza'
import Typewriter from '../Typewriter'

const PROMPT = 'root@pixelfolio:~$'

const YOU_LABEL = 'YOU:'.padEnd('ELIZA:'.length + 1)
const ELIZA_LABEL = 'ELIZA:'.padEnd('ELIZA:'.length + 1)

const COMMANDS = ['help', 'about', 'experience', 'projects', 'skills', 'education', 'contact', 'clear']

function runCommand(cmd) {
  switch (cmd) {
    case 'help':
      return [
        'Available commands:',
        ...COMMANDS.map((c) => `  /${c}`),
      ]
    case 'about':
      return [content.hero.name, content.hero.subtitle, '', content.hero.description]
    case 'experience':
      return content.quests.map((q) => `${q.duration.padEnd(24)} ${q.title} — ${q.giver}`)
    case 'projects':
      return content.missionGroups.flatMap((group) => [
        `${group.name}:`,
        ...group.projects.map((p) => `  - ${p.name}${p.org ? ` (${p.org})` : ''}`),
      ])
    case 'skills':
      return content.skillGroups.map((g) => `${g.label}: ${g.chips.join(', ')}`)
    case 'education':
      return [
        ...content.credentials.education.map((e) => `${e.title} — ${e.meta}`),
        ...content.credentials.languages.map((l) => `${l.title} — ${l.meta}`),
      ]
    case 'contact':
      return ['Contact details are gated against scrapers.', 'Open the CONTACT screen from the main menu instead.']
    default:
      return [`Unknown command: /${cmd}`, 'Type /help for a list.']
  }
}

const WELCOME = [
  { text: 'Welcome to' },
  { text: ELIZA_BANNER, block: true },
  { text: '' },
  { text: 'Eliza is a mock Rogerian psychotherapist.' },
  { text: 'The original program was described by Joseph Weizenbaum in 1966.' },
  { text: `This version lives in ${content.hero.name}'s terminal — ${missionsShippedCount} systems shipped, and counting.` },
  { text: '' },
  { text: `${ELIZA_LABEL}${ELIZA_GREETING}` },
]

function getInitialHistory() {
  return WELCOME.map((line) => ({ isPrompt: false, ...line }))
}

export default function TerminalScreen() {
  const [history, setHistory] = useState(getInitialHistory)
  const [input, setInput] = useState('')
  const inputRef = useRef(null)
  const bottomRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [history])

  function runSlash(cmdBody) {
    if (cmdBody === 'clear') {
      setHistory(getInitialHistory())
      inputRef.current?.focus()
      return
    }

    const lines = [{ text: `${PROMPT} /${cmdBody}`, isPrompt: true }]
    runCommand(cmdBody).forEach((text) => lines.push({ text, isPrompt: false }))
    setHistory((h) => [...h, ...lines])
    inputRef.current?.focus()
  }

  function submit(e) {
    e.preventDefault()
    const cmd = input.trim()
    if (!cmd) return
    setInput('')

    if (cmd.startsWith('/')) {
      runSlash(cmd.slice(1).toLowerCase())
      return
    }

    setHistory((h) => [
      ...h,
      { text: `${YOU_LABEL}${cmd}`, mine: true },
      { text: `${ELIZA_LABEL}${elizaReply(cmd)}` },
    ])
  }

  function scrollHistory(e) {
    const box = scrollRef.current
    if (!box) return
    const step = box.clientHeight * 0.3
    if (e.key === 'ArrowDown') box.scrollTop += step
    else if (e.key === 'ArrowUp') box.scrollTop -= step
    else if (e.key === 'PageDown') box.scrollTop += box.clientHeight
    else if (e.key === 'PageUp') box.scrollTop -= box.clientHeight
    else return
    e.preventDefault()
  }

  return (
    <div
      className="font-vt text-[1.05rem] leading-[1.5] text-[#8fb996] bg-black/45 border-[3px] border-white/15 rounded-[14px] p-[1.2rem] max-w-[62em] h-[55vh] flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex flex-wrap gap-[0.4rem] pb-2 mb-2 border-b-[2px] border-white/10 shrink-0">
        {COMMANDS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => runSlash(c)}
            className="font-pixel text-[0.5rem] tracking-[0.02em] px-[0.7em] py-[0.45em] rounded-[6px] border-[2px] border-gold/50 bg-gold/10 text-gold hover:bg-gold/20 active:translate-y-[1px] transition-colors"
          >
            /{c}
          </button>
        ))}
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {history.map((line, i) =>
          line.block ? (
            <Typewriter key={i} as="pre" text={line.text} speed={4} className="whitespace-pre overflow-x-auto text-center" />
          ) : line.isPrompt ? (
            <p key={i} className="text-gold">{line.text}</p>
          ) : (
            <Typewriter
              key={i}
              as="p"
              text={line.text}
              speed={10}
              className={`whitespace-pre-wrap${line.mine ? ' text-gold' : ''}`}
            />
          ),
        )}
        <div ref={bottomRef} />
      </div>
      <form className="flex items-center pt-2 shrink-0" onSubmit={submit}>
        <span className="shrink-0 whitespace-pre text-gold">{YOU_LABEL}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={scrollHistory}
          className="flex-1 bg-transparent border-none text-gold font-vt text-[1.05rem] terminal-input"
          autoComplete="off"
          spellCheck="false"
          aria-label="Terminal input"
        />
      </form>
    </div>
  )
}
