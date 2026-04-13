import { useEffect, useState } from 'react'
import ParticleCanvas from './ParticleCanvas'
import { useLang } from '../useLang'
import styles from './Hero.module.css'

export default function Hero() {
  const { t, lang, toggle } = useLang()
  const [time, setTime] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  // Close menu on link click
  const handleNavClick = () => setMenuOpen(false)

  return (
    <section className={styles.hero} id="home">
      <ParticleCanvas />

      <nav className={styles.nav}>
        <span className={styles.logo}>{t.nav.logo}</span>

        {/* Desktop links */}
        <div className={styles.navLinks}>
          <a href="#about">{t.nav.about}</a>
          <a href="#work">{t.nav.work}</a>
          <a href="#contact">{t.nav.contact}</a>
          <button className={styles.langBtn} onClick={toggle} aria-label="Toggle language">
            {lang === 'en' ? 'ES' : 'EN'}
          </button>
        </div>

        {/* Mobile controls */}
        <div className={styles.mobileControls}>
          <button className={styles.langBtn} onClick={toggle} aria-label="Toggle language">
            {lang === 'en' ? 'ES' : 'EN'}
          </button>
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div className={`${styles.dropdown} ${menuOpen ? styles.dropdownOpen : ''}`}>
        <a href="#about" className={styles.dropdownLink} onClick={handleNavClick}>{t.nav.about}</a>
        <a href="#work" className={styles.dropdownLink} onClick={handleNavClick}>{t.nav.work}</a>
        <a href="#contact" className={styles.dropdownLink} onClick={handleNavClick}>{t.nav.contact}</a>
      </div>

      <div className={styles.nameBlock}>
        <span className={styles.name1}>Rodrigo</span>
        <span className={styles.name2}>Horvilleur</span>
        <span className={styles.jobTitle}>{t.hero.title}</span>
      </div>

      <div className={styles.desc}>
        <p>{t.hero.desc}</p>
        <div className={styles.descActions}>
          <a href="#work" className={styles.projectLogs}>{t.hero.logs}</a>
          <a href="/Rodrigo_Horvilleur_CV.pdf" target="_blank" rel="noopener noreferrer" className={styles.cvBtn}>
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