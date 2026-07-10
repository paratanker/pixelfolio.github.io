// A small clone of Weizenbaum's ELIZA/DOCTOR script: keyword-triggered
// templates with pronoun reflection, falling back to generic prompts that
// keep the "conversation" going without ever really understanding anything.

const REFLECTIONS = {
  am: 'are',
  was: 'were',
  i: 'you',
  "i'm": 'you are',
  "i'd": 'you would',
  "i've": 'you have',
  "i'll": 'you will',
  my: 'your',
  are: 'am',
  "you're": 'I am',
  "you've": 'I have',
  "you'll": 'I will',
  your: 'my',
  yours: 'mine',
  you: 'I',
  me: 'you',
  myself: 'yourself',
  yourself: 'myself',
  mine: 'yours',
}

function reflect(fragment) {
  return fragment
    .trim()
    .split(/\s+/)
    .map((word) => {
      const key = word.toLowerCase().replace(/[.,!?]+$/, '')
      return REFLECTIONS[key] ?? word
    })
    .join(' ')
}

export const ELIZA_GREETING = 'Is something troubling you?'
export const ELIZA_FAREWELL = 'Goodbye. It was nice talking to you.'

// Block-letter banner in the style of the classic web ELIZA implementations.
export const ELIZA_BANNER = [
  'EEEEEE   LL       IIII   ZZZZZZZ    AAAAA ',
  'EE       LL        II         ZZ   AA   AA',
  'EEEE     LL        II       ZZZ    AAAAAAA',
  'EE       LL        II      ZZ      AA   AA',
  'EEEEEE   LLLLLL   IIII   ZZZZZZZ   AA   AA',
].join('\n')

// Ordered by specificity — first match wins, like the original script's rule ranking.
const RULES = [
  [/^(?:bye|goodbye|quit|exit)$/i, [ELIZA_FAREWELL, 'Until next time.', 'Take care.']],
  [/\bi need (.*)/i, ['Why do you need %1?', 'Would getting %1 really help you?', "Are you sure you need %1?"]],
  [/\bi want (.*)/i, ['What would it mean to you if you got %1?', 'Why do you want %1?', 'Suppose you got %1 — then what?']],
  [/\bi (?:am|'m) (?:sad|unhappy|depressed|upset|angry|mad|frustrated)(?:\s+because\s+(.*))?/i, [
    'I am sorry to hear you are %0.',
    'Do you think coming here will help you not to be %0?',
    'How long have you been %0?',
  ]],
  [/\bi (?:am|'m) (.*)/i, ['Did you come to me because you are %1?', 'How long have you been %1?', 'How do you feel about being %1?']],
  [/\bi feel (.*)/i, ['Tell me more about feeling %1.', 'Do you often feel %1?', 'What does feeling %1 remind you of?']],
  [/\bmy (mother|father|mom|dad|sister|brother|family)\b(.*)/i, ['Tell me more about your %1.', 'How do you feel about your %1?', 'Who else in your family%2?']],
  [/\bmy (.*)/i, ['Your %1?', 'Why do you say your %1?', 'Does that have something to do with the fact that your %1?']],
  [/\bbecause (.*)/i, ['Is that the real reason?', 'What other reasons come to mind?', 'Does that reason seem to explain anything else?']],
  [/\b(?:sorry|apologize)\b/i, ['Please, there is no need to apologize.', 'Apologies are not necessary.', 'What feelings do you have when you apologize?']],
  [/\bi (?:dream(?:ed|t)?|dream) (?:about |of )?(.*)/i, ['What does that dream about %1 suggest to you?', 'Do you dream often?', 'What persons appear in your dreams?']],
  [/\bremember (.*)/i, ['Do you often think of %1?', 'What made you think of %1 just now?', 'Why do you remember %1 just now?']],
  [/\bif (.*)/i, ['Do you think it is likely that %1?', 'What would you do if %1?', 'Do you often think about that?']],
  [/\byou are (.*)/i, ['Why do you say I am %1?', 'Does it please you to believe I am %1?']],
  [/\byou('re| are) (.*)/i, ['What makes you think I am %2?']],
  [/\b(?:are you|do you think you are) (.*)/i, ["Why does it matter whether I am %1?", "Would you prefer if I weren't %1?"]],
  [/\bwhy don'?t you (.*)/i, ['Do you really think I should %1?', 'Perhaps I will %1 in good time.']],
  [/\bwhy can'?t i (.*)/i, ['Do you think you should be able to %1?', 'What is stopping you from %1?']],
  [/\b(?:computer|machine|robot|program|bot)s?\b/i, ['Does it bother you that I am just a program?', 'Do computers worry you?', 'Are you talking to me because I am a machine?']],
  [/\bno\b/i, ['Why not?', "You are being a bit negative.", 'Are you saying "no" just to be contrary?']],
  [/\byes\b/i, ['You seem quite sure.', 'I see.', 'I understand.']],
  [/\bhello|hi\b/i, ['How do you do. Please state your problem.', 'Hello. What is on your mind?']],
  [/\b(?:mother|father|parents)\b/i, ['Tell me more about your family.', 'Do your parents come up often in your thoughts?']],
  [/\balways\b/i, ['Can you think of a specific example?', 'When?']],
  [/\bwhat\b/i, ['Why do you ask?', 'Does that question interest you?', 'What is it you really want to know?']],
]

const FALLBACKS = [
  'Please, go on.',
  'What does that suggest to you?',
  'Tell me more about that.',
  'Does talking about this bother you?',
  'Do you feel strongly about discussing such things?',
  'How does that make you feel?',
  'I see. And what does that mean to you?',
  'Can you elaborate on that?',
]

let fallbackIndex = 0

export function elizaReply(input) {
  const text = input.trim()
  if (!text) return 'Please, go on.'

  for (const [pattern, responses] of RULES) {
    const match = text.match(pattern)
    if (!match) continue
    const response = responses[Math.floor(Math.random() * responses.length)]
    return response.replace(/%(\d)/g, (_, group) => reflect(match[Number(group)] ?? ''))
  }

  const fallback = FALLBACKS[fallbackIndex % FALLBACKS.length]
  fallbackIndex += 1
  return fallback
}
