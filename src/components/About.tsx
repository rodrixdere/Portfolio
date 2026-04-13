import { useLang } from '../useLang'
import styles from './About.module.css'

const ghostIcons = [
  { top: '5%', left: '3%', svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="50" rx="48" ry="18" fill="none" stroke="currentColor" stroke-width="5"/><ellipse cx="50" cy="50" rx="48" ry="18" fill="none" stroke="currentColor" stroke-width="5" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="48" ry="18" fill="none" stroke="currentColor" stroke-width="5" transform="rotate(120 50 50)"/><circle cx="50" cy="50" r="7" fill="currentColor"/></svg>` },
  { top: '2%', right: '30%', svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="90" height="90" rx="8" fill="currentColor" opacity="0.15"/><rect x="5" y="5" width="90" height="90" rx="8" fill="none" stroke="currentColor" stroke-width="5"/><text x="12" y="72" font-family="monospace" font-weight="900" font-size="52" fill="currentColor">TS</text></svg>` },
  { top: '15%', right: '8%', svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="20" r="10" fill="none" stroke="currentColor" stroke-width="6"/><circle cx="30" cy="80" r="10" fill="none" stroke="currentColor" stroke-width="6"/><circle cx="70" cy="40" r="10" fill="none" stroke="currentColor" stroke-width="6"/><line x1="30" y1="30" x2="30" y2="70" stroke="currentColor" stroke-width="6"/><path d="M30 30 Q30 40 70 40" fill="none" stroke="currentColor" stroke-width="6"/></svg>` },
  { top: '60%', right: '6%', svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="30" width="15" height="12" rx="2" fill="currentColor"/><rect x="28" y="30" width="15" height="12" rx="2" fill="currentColor"/><rect x="46" y="30" width="15" height="12" rx="2" fill="currentColor"/><rect x="28" y="16" width="15" height="12" rx="2" fill="currentColor"/><rect x="46" y="16" width="15" height="12" rx="2" fill="currentColor"/><path d="M5 44 Q50 44 80 44 Q95 44 90 58 Q85 68 70 66 Q65 75 50 72 Q20 75 10 60 Q2 55 5 44Z" fill="none" stroke="currentColor" stroke-width="5"/></svg>` },
  { top: '35%', left: '5%', svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M25 70 Q20 40 50 30 Q35 50 55 55 Q75 60 70 80 Q55 95 25 70Z" fill="none" stroke="currentColor" stroke-width="5"/><line x1="20" y1="85" x2="80" y2="85" stroke="currentColor" stroke-width="5"/></svg>` },
  { top: '55%', right: '28%', svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="55" rx="28" ry="38" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="50" cy="22" r="18" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="43" cy="18" r="3" fill="currentColor"/><circle cx="57" cy="18" r="3" fill="currentColor"/></svg>` },
  { top: '8%', right: '50%', svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M80 10 Q95 50 50 90 Q30 95 15 85 Q5 75 10 55 Q15 35 40 20 Q60 8 80 10Z" fill="none" stroke="currentColor" stroke-width="5"/></svg>` },
  { top: '75%', left: '40%', svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="45" rx="30" ry="32" fill="none" stroke="currentColor" stroke-width="5"/><path d="M35 15 Q30 5 22 8 Q15 15 25 22" fill="none" stroke="currentColor" stroke-width="4"/><path d="M65 15 Q70 5 78 8 Q85 15 75 22" fill="none" stroke="currentColor" stroke-width="4"/></svg>` },
]

export default function About() {
  const { t } = useLang()

  return (
    <section className={styles.about} id="about">
      <div className={styles.ghosts} aria-hidden="true">
        {ghostIcons.map((g, i) => (
          <span
            key={i}
            className={styles.ghost}
            style={{ top: g.top, left: 'left' in g ? (g as any).left : undefined, right: 'right' in g ? (g as any).right : undefined }}
            dangerouslySetInnerHTML={{ __html: g.svg }}
          />
        ))}
      </div>

      <div className={styles.inner}>
        <span className={styles.label}>{t.about.label}</span>

        <div className={styles.grid}>
          <div className={styles.heading}>
            <span className={styles.hi}>{t.about.hi}</span>
            <span className={styles.there}>{t.about.there}</span>
          </div>
          <div className={styles.bio}>
            <p>{t.about.p1}</p>
            <div className={styles.divider} />
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>{t.about.stats.years}</span>
            <span className={styles.statLabel}>{t.about.stats.yearsLabel}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>{t.about.stats.projects}</span>
            <span className={styles.statLabel}>{t.about.stats.projectsLabel}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>{t.about.stats.english}</span>
            <span className={styles.statLabel}>{t.about.stats.englishLabel}</span>
          </div>
        </div>
      </div>
    </section>
  )
}