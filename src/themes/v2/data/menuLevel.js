// A fixed logical coordinate space for the platformer main menu. Physics run
// entirely in these units; PlatformLevel scales the whole stage to fit the
// viewport (like a game canvas), so jump distances stay reliable regardless
// of screen size.
export const LEVEL_WIDTH = 1000
export const LEVEL_HEIGHT = 520

export const GRAVITY = 1850 // px/s^2
export const JUMP_VELOCITY = 680 // px/s, upward
export const MOVE_SPEED = 280 // px/s
export const SPRITE_WIDTH = 68
// The character PNGs are mostly transparent margin — at the rendered 68px width
// the visible body spans only ~px 23–46 when idle. Support/landing checks inset
// the sprite box by this much per side so the hero can't stand on a platform
// with nothing but invisible margin overlapping it (visibly floating in air).
export const HITBOX_INSET = 22

const BEDROCK_Y = 0
const GROUND_Y = 100
const MID_Y = 210
const TOP_Y = 320

// `key: null` platforms are structural (the safety floor beneath the gaps —
// missing a jump drops the hero here instead of out of the level). Keyed
// platforms each correspond to one `content.menu` entry; PlatformLevel looks
// up the label/icon from content.json by key when rendering its button.
// `material` drives which stone tier a platform renders as (ground = warm
// sandstone, mid = dark basalt, top = pale marble), so climbing higher
// through the level reads as moving through the palace, not just a color swap.
// Each tier's platforms are shifted as a group (gaps between them unchanged,
// so jump distances stay identical) to sit horizontally centered in the
// 1000-unit stage instead of bunched toward the left.
// Every keyed platform patrols side to side (see usePlatformerControls' liveXOf) —
// amplitude is how far it swings from its base x, period is one full round-trip in
// seconds. Amplitudes are sized per tier so neighbors can't touch even if both swing
// toward each other at once, and signs/periods are mixed so platforms don't drift in
// lockstep. Worst-case clearances (gap minus the two amplitudes facing each other):
// ground tier gaps are 150 (education/terminal, terminal/contact), 35 to spare;
// mid tier gaps are 120 (experience/projects) and 130 (projects/skills), 20 to spare;
// profile is alone on the top tier, so it gets the most room to swing.
// Slot positions/gaps/patrol values are unchanged from before -- only which
// key occupies which slot moved, so that reading the level top-to-bottom,
// left-to-right (profile / experience-projects-skills / education-terminal-contact)
// matches `content.menu` order, same as mobile's MainMenu and this array's own
// (DOM/tab) order below.
export const platforms = [
  { key: null, x: 0, width: LEVEL_WIDTH, y: BEDROCK_Y, bedrock: true },

  { key: 'profile', x: 400, width: 200, y: TOP_Y, material: 'top', patrol: { amplitude: 80, period: 5.2 } },

  { key: 'experience', x: 105, width: 180, y: MID_Y, material: 'mid', patrol: { amplitude: 30, period: 3.2 } },
  { key: 'projects', x: 405, width: 180, y: MID_Y, material: 'mid', patrol: { amplitude: 70, period: 3.5 } },
  { key: 'skills', x: 715, width: 180, y: MID_Y, material: 'mid', patrol: { amplitude: -40, period: 4.4 } },

  { key: 'education', x: 110, width: 160, y: GROUND_Y, material: 'ground', patrol: { amplitude: 50, period: 4.6 } },
  { key: 'terminal', x: 420, width: 160, y: GROUND_Y, material: 'ground', patrol: { amplitude: -65, period: 4 } },
  { key: 'contact', x: 730, width: 160, y: GROUND_Y, material: 'ground', patrol: { amplitude: -50, period: 3.8 } },
]

// Hero starts centered on the profile platform (top tier).
const PROFILE = platforms.find((p) => p.key === 'profile')
export const heroStart = { x: PROFILE.x + (PROFILE.width - SPRITE_WIDTH) / 2, y: TOP_Y }
