import { Lang } from '../i18n'
import { useLang } from '../useLang'
import styles from './Credentials.module.css'

interface Credential {
  title: Record<Lang, string>
  detail: Record<Lang, string>
}

const credentials: Credential[] = [
  {
    title: {
      en: 'B.S. IN SOFTWARE ENGINEERING',
      es: 'BACHILLERATO EN INGENIERÍA EN SOFTWARE',
    },
    detail: {
      en: 'Universidad Latina de Costa Rica · 2021 - present, final 2 courses',
      es: 'Universidad Latina de Costa Rica · 2021 - presente, últimos 2 cursos',
    },
  },
  {
    title: {
      en: 'AWS ACADEMY CLOUD FOUNDATIONS',
      es: 'AWS ACADEMY CLOUD FOUNDATIONS',
    },
    detail: {
      en: 'In progress · preparing AWS Cloud Practitioner',
      es: 'En curso · preparando AWS Cloud Practitioner',
    },
  },
  {
    title: { en: 'ENGLISH C1+', es: 'INGLÉS C1+' },
    detail: {
      en: 'Verbal and written · Spanish native',
      es: 'Verbal y escrito · Español nativo',
    },
  },
]

/* Cierre del Toolkit — las herramientas y después lo que las respalda.
   No es una sección propia a propósito: en el stack, una sección de tres
   líneas la tapa la siguiente apenas aparece */
export default function Credentials() {
  const { t, lang } = useLang()

  return (
    <div className={styles.credentials} id="education">
      <span className={styles.label}>{t.work.educationLabel}</span>
      <div className={styles.grid}>
        {credentials.map((c) => (
          <div key={c.title.en} className={styles.item}>
            <span className={styles.title}>{c.title[lang]}</span>
            <span className={styles.detail}>{c.detail[lang]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
