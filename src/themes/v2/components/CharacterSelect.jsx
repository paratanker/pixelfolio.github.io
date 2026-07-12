import { useEffect, useRef, useState } from 'react'
import { CHARACTER_LIST } from '../data/characters'
import { asset } from '../../../utils/asset'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { CONFIRM_KEYS, cycleIndex, LEFT_KEYS, matchesKey, RIGHT_KEYS } from '../utils/keyboard'
import { isAudioUnlocked, isMuted, playSfx, startMusic, toggleMuted } from '../utils/sound'
import content from '../../../data/content.json'

const DOME = asset('assets/dome.png')

const CARD_BASE = 'group flex flex-col items-center gap-3 rounded-[12px] px-[clamp(1rem,3vw,1.6rem)] py-[clamp(1rem,3vh,1.6rem)] transition-transform duration-150 ease'
const CARD_SELECTED = '-translate-y-[3px]'
const CARD_IDLE = 'hover:-translate-y-[1px]'

export default function CharacterSelect({ onSelect }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedIndexRef = useRef(selectedIndex)
  selectedIndexRef.current = selectedIndex

  // Audio can only start from a real gesture, so gate the screen behind an
  // explicit prompt instead of quietly hooking the visitor's first incidental
  // click/keypress — that click doubles as the unlocking gesture either way.
  const [audioGateOpen, setAudioGateOpen] = useState(() => !isAudioUnlocked())
  const [gateFocusIndex, setGateFocusIndex] = useState(0)
  const enableSoundRef = useRef(null)
  const muteRef = useRef(null)
  const gateRef = useRef(null)

  // Traps Tab/Shift+Tab inside the gate's two buttons instead of letting focus
  // escape onto the character grid hidden behind the backdrop.
  useFocusTrap(gateRef, audioGateOpen)

  // Keep the arrow-key index in sync with real DOM focus in both directions:
  // this effect drives focus from the index (arrow keys), and each button's
  // onFocus drives the index from focus (Tab, mouse, or the trap above) — so
  // Tab order, the visible focus ring, and the confirm-key handler always
  // agree on the same button.
  useEffect(() => {
    if (audioGateOpen) (gateFocusIndex === 0 ? enableSoundRef : muteRef).current?.focus()
  }, [audioGateOpen, gateFocusIndex])

  function enableSound() {
    if (isMuted()) toggleMuted()
    startMusic()
    setAudioGateOpen(false)
  }

  function continueMuted() {
    if (!isMuted()) toggleMuted()
    setAudioGateOpen(false)
  }

  // Blip whenever the highlighted character actually changes (arrow keys or
  // hover), not on mount.
  const selectionSettledRef = useRef(false)
  useEffect(() => {
    if (!selectionSettledRef.current) {
      selectionSettledRef.current = true
      return
    }
    playSfx('move')
  }, [selectedIndex])

  useEffect(() => {
    function onKeyDown(e) {
      if (audioGateOpen) {
        if (matchesKey(e, LEFT_KEYS) || matchesKey(e, RIGHT_KEYS)) {
          e.preventDefault()
          setGateFocusIndex((i) => cycleIndex(i, matchesKey(e, LEFT_KEYS) ? -1 : 1, 2))
        } else if (matchesKey(e, CONFIRM_KEYS)) {
          e.preventDefault()
          ;(gateFocusIndex === 0 ? enableSound : continueMuted)()
        }
        return
      }
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
  }, [onSelect, audioGateOpen, gateFocusIndex])

  return (
    <div className="absolute inset-0 level-dungeon flex flex-col items-center">
      {audioGateOpen && (
        <div
          ref={gateRef}
          className="absolute inset-0 z-40 flex items-center justify-center bg-black/75 backdrop-blur-[2px] px-[clamp(1.1rem,4vw,3rem)]"
          role="dialog"
          aria-modal="true"
          aria-label="Enable sound"
        >
          <div className="flex flex-col items-center gap-[clamp(1rem,3vh,1.5rem)] max-w-[26rem] text-center rounded-[12px] border-[3px] border-black/30 bg-gradient-to-b from-[rgba(74,67,83,0.95)] to-[rgba(15,10,31,0.95)] px-[clamp(1.6rem,5vw,2.4rem)] py-[clamp(1.8rem,5vh,2.6rem)] shadow-[0_6px_0_rgba(0,0,0,0.5)]">
            <p className="font-pixel text-[clamp(0.85rem,2.6vw,1.05rem)] tracking-[0.03em] text-gold [text-shadow:0_2px_0_rgba(0,0,0,0.35)]">
              » ENABLE SOUND «
            </p>
            <p className="font-mono text-[clamp(0.85rem,2.2vw,1rem)] text-white/75 leading-[1.6]">
              This dungeon has a chiptune score and sound effects, synthesized live in your browser.
            </p>
            <div className="flex flex-col sm:flex-row gap-[0.7em] w-full">
              <button
                ref={enableSoundRef}
                type="button"
                onClick={enableSound}
                onMouseEnter={() => setGateFocusIndex(0)}
                onFocus={() => setGateFocusIndex(0)}
                className="flex-1 font-pixel text-[0.62rem] tracking-[0.02em] text-ink bg-gold border-[3px] border-black/30 rounded-[8px] px-[1.2em] py-[0.9em] shadow-[0_5px_0_rgba(0,0,0,0.4)] transition-transform duration-100 ease hover:translate-y-[2px] hover:shadow-[0_3px_0_rgba(0,0,0,0.4)]"
              >
                Enable Sound
              </button>
              <button
                ref={muteRef}
                type="button"
                onClick={continueMuted}
                onMouseEnter={() => setGateFocusIndex(1)}
                onFocus={() => setGateFocusIndex(1)}
                className="flex-1 font-pixel text-[0.62rem] tracking-[0.02em] text-parchment/80 bg-black/35 border-2 border-parchment/25 rounded-[8px] px-[1.2em] py-[0.85em] transition-colors hover:bg-black/55 hover:text-parchment"
              >
                Mute
              </button>
            </div>
          </div>
        </div>
      )}

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
                  <span className="font-mono text-[0.85rem] text-white/60 text-center leading-[1.5]">
                    {character.tagline}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        <p className="font-mono text-[0.85rem] text-white/50 text-center max-w-[26rem]">
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
