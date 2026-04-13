import { useRef, useState, FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { useLang } from '../useLang'
import styles from './Contact.module.css'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const { t } = useLang()
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!formRef.current || status === 'sending') return

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
    <section className={styles.contact} id="contact">
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
              <div className={styles.field}>
                <input
                  type="text"
                  name="from_name"
                  placeholder={t.contact.namePlaceholder}
                  required
                  disabled={status === 'sending'}
                  className={styles.input}
                />
              </div>
              <div className={styles.field}>
                <input
                  type="email"
                  name="reply_to"
                  placeholder={t.contact.emailPlaceholder}
                  required
                  disabled={status === 'sending'}
                  className={styles.input}
                />
              </div>
              <div className={styles.field}>
                <textarea
                  name="message"
                  placeholder={t.contact.messagePlaceholder}
                  required
                  rows={4}
                  disabled={status === 'sending'}
                  className={styles.textarea}
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

              {/* Reset option after error */}
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