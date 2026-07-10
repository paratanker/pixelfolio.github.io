import { useEffect, useRef } from 'react'
import { cycleIndex, DOWN_KEYS, matchesKey, UP_KEYS } from '../utils/keyboard'

// W/S (or arrow keys) move the main-menu selection and Enter opens it;
// Esc always backs out of whatever screen is open. Keyboard nav only
// drives the main menu (never a screen's own inputs, e.g. Terminal),
// since Enter/W/S are ignored once a screen is active.
export function useMenuNavigation({ menu, activeScreen, selectedIndex, setSelectedIndex, openScreen, closeScreen, disabled = false }) {
  const selectedIndexRef = useRef(selectedIndex)
  selectedIndexRef.current = selectedIndex

  useEffect(() => {
    function onKeyDown(e) {
      if (disabled) return
      if (activeScreen == null) {
        if (matchesKey(e, UP_KEYS)) {
          e.preventDefault()
          setSelectedIndex((i) => cycleIndex(i, -1, menu.length))
        } else if (matchesKey(e, DOWN_KEYS)) {
          e.preventDefault()
          setSelectedIndex((i) => cycleIndex(i, 1, menu.length))
        } else if (e.key === 'Enter') {
          e.preventDefault()
          openScreen(menu[selectedIndexRef.current].key)
        }
      } else if (e.key === 'Escape') {
        e.preventDefault()
        closeScreen()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menu, activeScreen, setSelectedIndex, openScreen, closeScreen, disabled])
}
