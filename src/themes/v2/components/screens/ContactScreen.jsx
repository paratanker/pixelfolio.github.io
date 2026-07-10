import GatedLink from '../GatedLink'
import { getMailtoHref, getWhatsAppHref } from '../../../../utils/contact'
import { activateOnSpace } from '../../utils/keyboard'
import { BTN_BASE, CARD, BODY, META } from '../../styles'
import content from '../../../../data/content.json'
import Typewriter from '../Typewriter'

const { description, footerNote } = content.contactSection
const { resumeMessage } = content.contact
const socialLinks = content.social.filter(({ href }) => href)

export default function ContactScreen() {
  return (
    <div className={`${CARD} max-w-[44em]`}>
      <Typewriter as="p" text={description} speed={18} className={`${BODY} max-w-[32em]`} />
      <div className="flex flex-wrap gap-4 mt-8">
        <GatedLink className={`${BTN_BASE} bg-red text-white`} href={getWhatsAppHref(resumeMessage)} target="_blank" rel="noopener">WhatsApp Me</GatedLink>
        <GatedLink className={`${BTN_BASE} bg-gold text-ink`} href={getMailtoHref()}>Email</GatedLink>
        {socialLinks.map(({ href, label }) => (
          <a
            key={href}
            className={`${BTN_BASE} bg-gold text-ink`}
            href={href}
            target="_blank"
            rel="noopener"
            onKeyDown={activateOnSpace((e) => e.currentTarget.click())}
          >
            {label}
          </a>
        ))}
      </div>
      <Typewriter as="p" text={footerNote} speed={12} className={`${META} mt-5`} />
    </div>
  )
}
