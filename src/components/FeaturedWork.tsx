import { useEffect, useRef, useState, CSSProperties, MouseEvent } from "react";
import { Lang } from "../i18n";
import { useLang } from "../useLang";
import styles from "./FeaturedWork.module.css";

interface Project {
  num: string;
  name: string;
  tags: string;
  url: string;
  /* Screenshot estático en /public/projects/ — se usa en vez del iframe
     cuando el sitio no puede embeberse (X-Frame-Options, caídas, etc.) */
  image?: string;
  desc: Record<Lang, string>;
}

const projects: Project[] = [
  {
    num: "01",
    name: "AULA JOVEN",
    tags: "FULLSTACK / REACT · NODE.JS · SUPABASE",
    url: "https://aulajoven.org",
    desc: {
      en: "Educational platform for a Costa Rican foundation — course management, student enrollment and content delivery, built end-to-end from requirements to production.",
      es: "Plataforma educativa para una fundación costarricense — gestión de cursos, matrícula de estudiantes y entrega de contenido, construida de extremo a extremo desde los requisitos hasta producción.",
    },
  },
  {
    num: "02",
    name: "GEORGE ANGULO FITNESS",
    tags: "FRONTEND / REACT",
    url: "https://georgeangulofitness.com",
    desc: {
      en: "Corporate site for a fitness brand — services, training programs and client contact in a fast, mobile-first build.",
      es: "Sitio corporativo para una marca de fitness — servicios, programas de entrenamiento y contacto de clientes en un sitio rápido y mobile-first.",
    },
  },
  {
    num: "03",
    name: "PYPMEDIACR",
    tags: "FRONTEND / REACT · TYPESCRIPT",
    url: "https://pypmedia.vercel.app/",
    desc: {
      en: "Showcase site for a media production company — portfolio, services and contact, with smooth motion throughout.",
      es: "Sitio para una productora de medios — portafolio, servicios y contacto, con animaciones fluidas en todo el recorrido.",
    },
  },
  {
    num: "04",
    name: "CABINANCE",
    tags: "FULLSTACK / NEXT.JS · FASTAPI · POSTGRESQL",
    url: "https://cabinance.app",
    image: "/projects/cabinance.png",
    desc: {
      en: "Personal finance app for the LatAm market — budgets, savings goals, recurring payments, gamified achievements and automatic insights. In production on my own VPS.",
      es: "App de finanzas personales para el mercado LatAm — presupuestos, metas de ahorro, pagos recurrentes, logros gamificados e insights automáticos. En producción en mi propio VPS.",
    },
  },
];

// La vista previa renderiza el sitio real a resolución desktop
// y se escala para caber en la card (misma proporción 16:10)
const PREVIEW_W = 1440;
const PREVIEW_H = 900;
const LENS_SIZE = 180;

function ProjectCard({ project, lang }: { project: Project; lang: Lang }) {
  const vpRef = useRef<HTMLDivElement>(null);
  const [lens, setLens] = useState<{ x: number; y: number } | null>(null);
  const [vp, setVp] = useState({ w: 0, h: 0 });
  const [imgFailed, setImgFailed] = useState(false);

  // Medir el viewport de la card (escala del iframe y clip del lente)
  useEffect(() => {
    const el = vpRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() =>
      setVp({ w: el.clientWidth, h: el.clientHeight }),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // En dispositivos táctiles no hay lente (no hay mouse): la card gana su
  // color cuando entra en pantalla, con una transición CSS. Se usa
  // IntersectionObserver (no scroll por frame) para que el scroll rápido
  // no recalcule el backdrop-filter constantemente.
  const [colored, setColored] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;
    const el = vpRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setColored(entry.isIntersecting),
      // Se activa cuando ~40% de la card es visible; al salir vuelve a B/N
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onMouseMove = (e: MouseEvent) => {
    const rect = vpRef.current?.getBoundingClientRect();
    if (!rect) return;
    setLens({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const hostname = new URL(project.url).hostname.replace(/^www\./, "");
  const scale = vp.w / PREVIEW_W;
  const R = LENS_SIZE / 2;

  // Capa B/N con agujero circular en el mouse: rectángulo horario +
  // círculo antihorario = hueco (fill-rule nonzero). En el hueco se ve
  // el contenido con sus colores reales.
  const bwClip = lens
    ? `path("M0 0H${vp.w}V${vp.h}H0Z M${(lens.x - R).toFixed(1)} ${lens.y.toFixed(1)}a${R} ${R} 0 1 0 ${LENS_SIZE} 0a${R} ${R} 0 1 0 -${LENS_SIZE} 0Z")`
    : undefined;

  const showImage = !!project.image && !imgFailed;

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className={styles.card}
      aria-label={
        lang === "es"
          ? `${project.name} — abrir proyecto en una pestaña nueva`
          : `${project.name} — open project in a new tab`
      }
      onMouseLeave={() => setLens(null)}
    >
      {/* Barra estilo navegador — integra la preview al lenguaje del sitio */}
      <div className={styles.chrome} aria-hidden="true">
        <span className={styles.chromeDots}>
          <span />
          <span />
          <span />
        </span>
        <span className={styles.chromeUrl}>{hostname}</span>
        <span className={styles.chromeLive}>
          <span className={styles.liveDot} />
          LIVE
        </span>
      </div>

      <div className={styles.viewport} ref={vpRef} onMouseMove={onMouseMove}>
        {/* Fondo tipográfico — visible mientras carga el iframe */}
        <div className={styles.placeholder} aria-hidden="true">
          <span className={styles.phNum}>({project.num})</span>
          <span className={styles.phName}>{project.name}</span>
          <span className={styles.phTags}>{project.tags}</span>
        </div>

        {showImage ? (
          <img
            src={project.image}
            alt=""
            className={styles.shot}
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          scale > 0 && (
            <iframe
              src={project.url}
              title={`${project.name} — preview`}
              className={styles.frame}
              style={{
                width: PREVIEW_W,
                height: PREVIEW_H,
                transform: `scale(${scale})`,
              }}
              loading="lazy"
              tabIndex={-1}
              aria-hidden="true"
              sandbox="allow-scripts allow-same-origin"
            />
          )
        )}

        {/* Capa blanco y negro — el agujero del clip muestra el color real */}
        <span
          className={`${styles.bw} ${colored ? styles.bwOff : ""}`}
          aria-hidden="true"
          style={{ clipPath: bwClip }}
        />

        {/* Aro del lente */}
        {lens && (
          <span
            className={styles.lensRing}
            aria-hidden="true"
            style={{ left: lens.x - R, top: lens.y - R }}
          />
        )}

        <span className={styles.cardArrow} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" />
          </svg>
        </span>
      </div>
    </a>
  );
}

export default function FeaturedWork() {
  const { t, lang } = useLang();

  return (
    <section className={styles.work} id="work">
      <span className={styles.label}>{t.work.label}</span>

      {projects.map((p, i) => (
        <article
          key={p.num}
          className={styles.project}
          style={{ "--i": i } as CSSProperties}
        >
          {/* Bookmark — queda fijado arriba cuando el siguiente proyecto lo cubre */}
          <div className={styles.bookmark}>
            <span className={styles.bookmarkNum}>({p.num})</span>
            <span className={styles.bookmarkName}>{p.name}</span>
          </div>

          <div className={styles.projectBody}>
            <div className={styles.info}>
              <h3 className={styles.name}>{p.name}</h3>
              <p className={styles.desc}>{p.desc[lang]}</p>
              <span className={styles.tags}>{p.tags}</span>
            </div>
            <ProjectCard project={p} lang={lang} />
          </div>
        </article>
      ))}
    </section>
  );
}
