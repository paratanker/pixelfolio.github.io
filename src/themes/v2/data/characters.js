import { asset } from '../../../utils/asset'

// Two selectable player skins for the platformer level (see PlatformLevel /
// usePlatformerControls). Each needs an idle frame plus a 2-frame walk cycle;
// `portrait` is the frame shown on the character-select screen and next to
// the brand label once a choice has been made.
export const CHARACTERS = {
  hero: {
    key: 'hero',
    label: 'Hero',
    tagline: 'Balanced explorer',
    description: 'Sure-footed and steady — climbs every tier of the castle at an even pace.',
    portrait: asset('characters/5.png'),
    idle: asset('characters/5.png'),
    walk: [asset('characters/1.png'), asset('characters/4.png')],
  },
  princess: {
    key: 'princess',
    label: 'Princess',
    tagline: 'Swift runner',
    description: 'Quick across the platforms — favors momentum over caution.',
    portrait: asset('characters/princess.png'),
    idle: asset('characters/princess.png'),
    walk: [asset('characters/princess.png'), asset('characters/princess-run.png')],
  },
}

export const CHARACTER_LIST = Object.values(CHARACTERS)
