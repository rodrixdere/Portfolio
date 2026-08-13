import { useEffect, useState } from 'react'
import { useLang } from '../useLang'
import styles from './Nav.module.css'

const SECTIONS = ['home', 'about', 'work', 'contact'] as const

/* Nav global y fijo: tiene que seguir a la vista en todas las secciones,
   no solo en el hero */
export default function Nav() {
  const { t, lang, toggle } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Sección activa. Con las secciones apiladas y pineadas por GSAP el
  // getBoundingClientRect no dice cuál se está viendo, así que se pregunta
  // qué elemento está pintado en el centro de la pantalla.
  useEffect(() => {
    const pick = () => {
      const el = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
      const section = el?.closest('section[id]')
      const id = section?.id
      if (id && (SECTIONS as readonly string[]).includes(id)) setActive(id)
    }
    pick()
    window.addEventListener('scroll', pick, { passive: true })
    return () => window.removeEventListener('scroll', pick)
  }, [])

  const close = () => setMenuOpen(false)
  const cls = (id: string) => (active === id ? styles.active : undefined)

  // El salto lo hace el ancla nativa; el scroll-margin-top de las secciones
  // (index.css) evita que aterricen debajo del nav
  return (
    <>
      {/* Fondo sólido salvo sobre el hero. Solo con scrollY el nav quedaba
          transparente en móvil y el texto de la sección se le encimaba. */}
      <nav className={`${styles.nav} ${scrolled || active !== 'home' ? styles.navScrolled : ''}`}>
        <a href="#home" className={styles.logo} onClick={close}>{t.nav.logo}</a>

        <div className={styles.navLinks}>
          <a href="#about" className={cls('about')} onClick={close}>{t.nav.about}</a>
          <a href="#work" className={cls('work')} onClick={close}>{t.nav.work}</a>
          <a href="#contact" className={cls('contact')} onClick={close}>{t.nav.contact}</a>
          <button className={styles.langBtn} onClick={toggle} aria-label="Toggle language">
            {lang === 'en' ? 'ES' : 'EN'}
          </button>
        </div>

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

      <div className={`${styles.dropdown} ${menuOpen ? styles.dropdownOpen : ''}`}>
        <a href="#about" className={styles.dropdownLink} onClick={close}>{t.nav.about}</a>
        <a href="#work" className={styles.dropdownLink} onClick={close}>{t.nav.work}</a>
        <a href="#contact" className={styles.dropdownLink} onClick={close}>{t.nav.contact}</a>
      </div>
    </>
  )
}
