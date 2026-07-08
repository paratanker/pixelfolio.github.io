import content from '../data/content.json'

// Base64-encoded to avoid plain-text scraping of contact details from the built JS bundle.
const { emailB64, phoneB64 } = content.contact

export const getMailtoHref = () => `mailto:${atob(emailB64)}`

export const getWhatsAppHref = (message = '') =>
  `https://wa.me/${atob(phoneB64)}${message ? `?text=${encodeURIComponent(message)}` : ''}`
