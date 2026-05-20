import { useRef, useState, FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { useLang } from '../useLang'
import styles from './Contact.module.css'

type Status = 'idle' | 'sending' | 'success' | 'error'

interface FormErrors {
  from_name?: string
  reply_to?: string
  message?: string
}

export default function Contact() {
  const { t } = useLang()
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<FormErrors>({})

  const validate = (form: HTMLFormElement): FormErrors => {
    const name = (form.elements.namedItem('from_name') as HTMLInputElement).value.trim()
    const email = (form.elements.namedItem('reply_to') as HTMLInputElement).value.trim()
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const errs: FormErrors = {}
    if (!name) errs.from_name = t.contact.errorName
    if (!email) errs.reply_to = t.contact.errorEmail
    else if (!emailRegex.test(email)) errs.reply_to = t.contact.errorEmailInvalid
    if (!message) errs.message = t.contact.errorMessage

    return errs
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!formRef.current || status === 'sending') return

    const honeypot = formRef.current.querySelector<HTMLInputElement>('input[name="honeypot"]')
    if (honeypot?.value) return

    const errs = validate(formRef.current)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setErrors({})
    setStatus('sending')

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      setStatus('success')
      formRef.current.reset()
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  const btnLabel =
    status === 'sending' ? t.contact.sending :
    status === 'success' ? t.contact.success :
    status === 'error'   ? t.contact.error   :
    t.contact.send

  return (
    <section className={styles.contact} id="contact" data-stack>
      <div className={styles.inner}>
        <span className={styles.label}>{t.contact.label}</span>

        <div className={styles.grid}>
          <div className={styles.left}>
            <h2 className={styles.heading}>{t.contact.heading}</h2>
            <div className={styles.links}>
              <a href="mailto:rodrixdere@gmail.com" className={styles.link}>E-MAIL</a>
              <a href="https://github.com/rodrixdere" target="_blank" rel="noreferrer" className={styles.link}>GITHUB</a>
              <a href="https://www.linkedin.com/in/rodrigo-horvilleur-b575b8338" target="_blank" rel="noreferrer" className={styles.link}>LINKEDIN</a>
              <a href="tel:+50660261200" className={styles.link}>PHONE</a>
            </div>
            <a href="/Rodrigo-Horvilleur-CV.pdf" download className={styles.cvBtn}>
              <span>{t.contact.cv}</span>
              <span>↓</span>
            </a>
          </div>

          <div className={styles.right}>
            <form ref={formRef} onSubmit={handleSubmit} className={styles.form} noValidate>
              <div className={`${styles.field} ${errors.from_name ? styles.fieldInvalid : ''}`}>
                <input
                  type="text"
                  name="from_name"
                  placeholder={t.contact.namePlaceholder}
                  disabled={status === 'sending'}
                  className={styles.input}
                />
                {errors.from_name && (
                  <span className={styles.fieldError}>{errors.from_name}</span>
                )}
              </div>

              <div className={`${styles.field} ${errors.reply_to ? styles.fieldInvalid : ''}`}>
                <input
                  type="email"
                  name="reply_to"
                  placeholder={t.contact.emailPlaceholder}
                  disabled={status === 'sending'}
                  className={styles.input}
                />
                {errors.reply_to && (
                  <span className={styles.fieldError}>{errors.reply_to}</span>
                )}
              </div>

              <div className={`${styles.field} ${errors.message ? styles.fieldInvalid : ''}`}>
                <textarea
                  name="message"
                  placeholder={t.contact.messagePlaceholder}
                  rows={4}
                  disabled={status === 'sending'}
                  className={styles.textarea}
                />
                {errors.message && (
                  <span className={styles.fieldError}>{errors.message}</span>
                )}
              </div>

              {/* Honeypot - hidden from real users */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <input
                  type="text"
                  name="honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className={`${styles.btn} ${status === 'success' ? styles.btnSuccess : ''} ${status === 'error' ? styles.btnError : ''}`}
              >
                <span>{btnLabel}</span>
                <span className={styles.btnArrow}>
                  {status === 'sending' ? '…' : status === 'success' ? '✓' : '→'}
                </span>
              </button>

              {status === 'error' && (
                <button
                  type="button"
                  className={styles.resetBtn}
                  onClick={() => setStatus('idle')}
                >
                  Try again
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}