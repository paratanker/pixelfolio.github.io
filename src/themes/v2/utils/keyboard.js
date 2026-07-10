// Native <a> only activates on Enter; Space is a no-op, which reads as
// broken since these render as buttons and users expect Space to work.
export function activateOnSpace(action) {
  return (e) => {
    if (e.key !== ' ') return
    e.preventDefault()
    action(e)
  }
}

export const LEFT_KEYS = ['a', 'A', 'ArrowLeft']
export const RIGHT_KEYS = ['d', 'D', 'ArrowRight']
export const UP_KEYS = ['w', 'W', 'ArrowUp']
export const DOWN_KEYS = ['s', 'S', 'ArrowDown']
export const JUMP_KEYS = [...UP_KEYS, ' ', 'Spacebar']
export const CONFIRM_KEYS = ['Enter', ' ', 'Spacebar']

export function matchesKey(e, keys) {
  return keys.includes(e.key)
}

// Steps `current` by `delta`, wrapping around a list of `length` items.
export function cycleIndex(current, delta, length) {
  return (current + delta + length) % length
}
