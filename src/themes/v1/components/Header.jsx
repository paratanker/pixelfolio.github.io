import { useState } from 'react'
import content from '../../../data/content.json'

const { brand } = content.site
const NAV_LINKS = content.nav

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-[5px] left-0 right-0 z-20 bg-black/30 backdrop-blur-[6px]">
      <div className="max-w-[1180px] mx-auto px-[clamp(1.25rem,4vw,3rem)] w-full flex items-center justify-between py-4">
        <a className="font-pixel text-[0.75rem] no-underline text-white" href="#top">{brand}</a>
        <nav className="hidden min-[820px]:flex gap-6 font-pixel text-[0.56rem] tracking-[0.02em]" aria-label="Section navigation">
          {NAV_LINKS.map((link) => (
            <a key={link.href} className="no-underline text-white/75 hover:text-gold" href={link.href}>{link.label}</a>
          ))}
        </nav>
        <button
          type="button"
          className="min-[820px]:hidden inline-flex flex-col justify-center gap-[5px] w-[2.2rem] h-[2.2rem] items-center"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className={`block w-6 h-[2px] bg-white transition-transform duration-200 ${isOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block w-6 h-[2px] bg-white transition-opacity duration-200 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-[2px] bg-white transition-transform duration-200 ${isOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>
      {isOpen && (
        <nav
          id="mobile-nav"
          className="min-[820px]:hidden flex flex-col items-center gap-5 py-6 font-pixel text-[0.6rem] tracking-[0.02em] bg-black/80 backdrop-blur-[6px]"
          aria-label="Section navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              className="no-underline text-white/75 hover:text-gold"
              href={link.href}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
