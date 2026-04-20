import { useLang } from "../useLang";
import styles from "./FeaturedWork.module.css";

const projects = [
  {
    num: "01",
    name: "AULA JOVEN",
    tags: "FULLSTACK / REACT & NODE.JS & SUPABASE",
    url: "https://aulajoven.org",
  },
  {
    num: "02",
    name: "MUNDO FIT",
    tags: "FRONTEND / REACT & TYPESCRIPT & CONTENTFUL",
    url: "#",
  },
  {
    num: "03",
    name: "GEORGE ANGULO FITNESS",
    tags: "FRONTEND / REACT",
    url: "https://georgeangulofitness.com",
  },
];

export default function FeaturedWork() {
  const { t } = useLang();

  return (
    <section className={styles.work} id="work" data-stack>
      <div className={styles.inner}>
        <span className={styles.label}>{t.work.label}</span>
        <div className={styles.list}>
          {projects.map((p) => (
            <a
              key={p.num}
              href={p.url}
              target={p.url.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className={styles.row}
            >
              <span className={styles.num}>({p.num})</span>
              <span className={styles.name}>{p.name}</span>
              <span className={styles.tags}>{p.tags}</span>
              <span className={styles.arrow}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 17L17 7M17 7H8M17 7V16"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
