import { useEffect, useState } from 'react'
import ParticleCanvas from './ParticleCanvas'
import { useLang } from '../useLang'
import styles from './Hero.module.css'

export default function Hero() {
  const { t } = useLang()
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className={styles.hero} id="home">
      <ParticleCanvas />

      {/* El nav es global y fijo (components/Nav.tsx): acá solo su espacio */}
      <div className={styles.navSpacer} />

      <div className={styles.nameBlock}>
        <h1>
          <span className={styles.name1}>Rodrigo</span>
          <span className={styles.name2}>Horvilleur</span>
        </h1>
        <p className={styles.jobTitle}>{t.hero.title}</p>
      </div>

      <div className={styles.desc}>
        <p>{t.hero.desc}</p>
        <div className={styles.descActions}>
          <a href="#work" className={styles.projectLogs}>{t.hero.logs}</a>
          <a href="/Rodrigo-Horvilleur-CV.pdf" target="_blank" rel="noopener noreferrer" className={styles.cvBtn}>
            {t.hero.cv}
          </a>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.available}>
          <span className={styles.greenDot} />
          <span>{t.hero.available}</span>
        </div>
        <div className={styles.clock}>{t.hero.localTime} {time}</div>
      </div>
    </section>
  )
}