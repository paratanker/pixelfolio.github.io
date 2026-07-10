import { useEffect, useRef, useState } from 'react'
import { CHARACTER_LIST } from '../data/characters'
import { asset } from '../../../utils/asset'
import { CONFIRM_KEYS, cycleIndex, LEFT_KEYS, matchesKey, RIGHT_KEYS } from '../utils/keyboard'
import content from '../../../data/content.json'

const DOME = asset('assets/dome.png')

const CARD_BASE = 'group flex flex-col items-center gap-3 rounded-[12px] px-[clamp(1rem,3vw,1.6rem)] py-[clamp(1rem,3vh,1.6rem)] transition-transform duration-150 ease'
const CARD_SELECTED = '-translate-y-[3px]'
const CARD_IDLE = 'hover:-translate-y-[1px]'

export default function CharacterSelect({ onSelect }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedIndexRef = useRef(selectedIndex)
  selectedIndexRef.current = selectedIndex

  useEffect(() => {
    function onKeyDown(e) {
      if (matchesKey(e, LEFT_KEYS)) {
        e.preventDefault()
        setSelectedIndex((i) => cycleIndex(i, -1, CHARACTER_LIST.length))
      } else if (matchesKey(e, RIGHT_KEYS)) {
        e.preventDefault()
        setSelectedIndex((i) => cycleIndex(i, 1, CHARACTER_LIST.length))
      } else if (matchesKey(e, CONFIRM_KEYS)) {
        e.preventDefault()
        onSelect(CHARACTER_LIST[selectedIndexRef.current].key)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onSelect])

  return (
    <div className="absolute inset-0 level-dungeon flex flex-col items-center">
      <p className="stone-label absolute top-[clamp(2.2rem,6vh,4.6rem)] left-[clamp(1.1rem,4vw,3rem)] text-[0.78rem]">
        {content.site.brand} · v2.0
      </p>

      <div className="flex-1 flex flex-col items-center justify-center gap-[clamp(0.7rem,3vh,2.6rem)] px-[clamp(1.1rem,4vw,3rem)] py-[clamp(2.2rem,9vh,7rem)] w-full max-w-[56rem] overflow-y-auto scrollbar-hide">
        <p className="font-pixel text-[0.62rem] tracking-[0.03em] text-jade text-center [text-shadow:0_2px_0_rgba(0,0,0,0.25)]">
          » CHOOSE YOUR CHARACTER «
        </p>

        <div className="grid grid-cols-2 gap-[clamp(0.9rem,3vw,1.6rem)] w-full">
          {CHARACTER_LIST.map((character, index) => {
            const selected = index === selectedIndex
            return (
              <button
                key={character.key}
                type="button"
                className={`${CARD_BASE} ${selected ? CARD_SELECTED : CARD_IDLE}`}
                onClick={() => onSelect(character.key)}
                onMouseEnter={() => setSelectedIndex(index)}
                aria-pressed={selected}
              >
                <div className={`relative w-[clamp(5.5rem,min(26vw,30vh),12.5rem)] aspect-[249/276] ${selected ? 'char-frame--selected' : 'opacity-75 group-hover:opacity-95'} transition-opacity duration-150 ease`}>
                  <img className="pixel-img absolute inset-0 w-full h-full" src={DOME} alt="" aria-hidden="true" />
                  <img
                    className="pixel-img absolute left-1/2 bottom-[10%] -translate-x-1/2 w-[52%] h-auto drop-shadow-[0_4px_5px_rgba(0,0,0,0.6)]"
                    src={character.portrait}
                    alt=""
                    aria-hidden="true"
                  />
                </div>
                <div className="flex flex-col items-center gap-[0.5em]">
                  <span className={`font-pixel text-[0.68rem] tracking-[0.02em] [text-shadow:0_2px_0_rgba(0,0,0,0.35)] transition-colors duration-150 ease ${selected ? 'text-gold' : 'text-parchment'}`}>
                    {character.label}
                  </span>
                  <span className="font-mono text-[0.72rem] text-white/60 text-center leading-[1.5]">
                    {character.tagline}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        <p className="font-mono text-[0.72rem] text-white/50 text-center max-w-[26rem]">
          {CHARACTER_LIST[selectedIndex].description}
        </p>

        <button
          type="button"
          className="font-pixel text-[0.62rem] tracking-[0.02em] text-ink bg-gold border-[3px] border-black/30 rounded-[8px] px-[1.7em] py-[1em] shadow-[0_5px_0_rgba(0,0,0,0.4)] transition-transform duration-100 ease hover:translate-y-[2px] hover:shadow-[0_3px_0_rgba(0,0,0,0.4)]"
          onClick={() => onSelect(CHARACTER_LIST[selectedIndex].key)}
        >
          START
        </button>
      </div>
    </div>
  )
}
