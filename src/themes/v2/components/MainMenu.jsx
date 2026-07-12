import MenuButton from './MenuButton'
import content from '../../../data/content.json'

const { brand } = content.site
const { menu } = content

export default function MainMenu({ selectedIndex, onSelect, onOpen, visited, covered, character, onChangeCharacter }) {
  return (
    <div
      className={`absolute inset-0 level-dungeon transition-opacity duration-200 ${covered ? 'opacity-40 pointer-events-none' : ''}`}
      aria-hidden={covered ? 'true' : undefined}
    >
      {/* var(--hud-clear) below the sm breakpoint clears the Hud, which can
          wrap onto up to 3 rows there — see its definition in theme.css. */}
      <p className="stone-label absolute top-[var(--hud-clear)] sm:top-[clamp(3.6rem,7vh,4.6rem)] left-[clamp(1.1rem,4vw,3rem)] text-[0.78rem]">
        {brand} · v1.0
      </p>

      {character && (
        <button
          type="button"
          onClick={onChangeCharacter}
          className="absolute top-[var(--hud-clear)] sm:top-[clamp(3.6rem,7vh,4.6rem)] right-[clamp(1.1rem,4vw,3rem)] inline-flex items-center gap-[0.5em] font-pixel text-[0.56rem] text-parchment/80 bg-black/30 border-2 border-parchment/25 rounded-[6px] pl-[0.4em] pr-[0.7em] py-[0.35em] transition-colors hover:text-gold hover:border-gold/50"
        >
          <img className="pixel-img w-[1.6em] h-auto" src={character.portrait} alt="" aria-hidden="true" />
          CHANGE
        </button>
      )}

      {/* +1.75rem on top of --hud-clear for the "CHOOSE YOUR ADVENTURE" label
          that sits between the brand/CHANGE row above and the menu below. */}
      <div className="h-full w-full flex flex-col gap-3 px-[clamp(1.1rem,4vw,3rem)] pt-[calc(var(--hud-clear)+1.75rem)] sm:pt-[clamp(6rem,11vh,7.5rem)] pb-[clamp(5.5rem,10vh,7rem)]">
        <p className="font-pixel text-[0.56rem] tracking-[0.03em] text-jade [text-shadow:0_2px_0_rgba(0,0,0,0.25)] mb-1">» CHOOSE YOUR ADVENTURE «</p>
        <nav className="flex flex-col gap-3" aria-label="Main menu">
          {menu.map((item, index) => (
            <MenuButton
              key={item.key}
              label={item.label}
              selected={index === selectedIndex}
              visited={visited.has(item.key)}
              onClick={() => onOpen(item.key)}
              onMouseEnter={() => onSelect(index)}
            />
          ))}
        </nav>
      </div>
    </div>
  )
}
