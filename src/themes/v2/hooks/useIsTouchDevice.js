import { useMediaQuery } from './useMediaQuery'

// `any-pointer: coarse` catches touch capability even on devices (like an
// iPad with a trackpad attached) where the *primary* pointer would otherwise
// read as fine — matching the fact that a coarse/touch input is available at all.
const QUERY = '(any-pointer: coarse)'

export function useIsTouchDevice() {
  return useMediaQuery(QUERY)
}
