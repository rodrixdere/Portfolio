import {
  useEffect,
  useRef,
  useState,
  CSSProperties,
  MouseEvent,
  ReactNode,
} from "react";
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
  /* El proyecto no es un sitio web — no hay nada que embeber en la preview */
  noPreview?: boolean;
  /* Reemplaza al hostname en la barra del navegador */
  chromeLabel?: Record<Lang, string>;
  /* Lo que ocupa el lugar de la preview cuando noPreview */
  diagram?: ReactNode;
  desc: Record<Lang, string>;
}

/* DocWizard es un CLI — en vez de una preview del sitio, la card corre una
   sesión de terminal. El texto sale del bloque Demo del README del paquete. */
const CMD = "docwizard --scan ./my-app";

const OUTPUT: { text: string; tone: "dim" | "ok" }[] = [
  { text: "Scanning /home/user/my-app...", tone: "dim" },
  { text: "✓ Scan complete.", tone: "ok" },
  { text: "Name: Aula Joven", tone: "dim" },
  { text: "Roles: admin, estudiante, profesor", tone: "dim" },
  { text: "Login detected.", tone: "dim" },
  { text: "Generating guide... done", tone: "dim" },
  { text: "✓ USER_GUIDE.md written.", tone: "ok" },
];

function DocwizardTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState(0);
  const [lines, setLines] = useState(0);
  const [running, setRunning] = useState(false);

  // Arranca al entrar en pantalla — si corriera al montar, se llegaría
  // a la card con la animación ya terminada
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setTyped(CMD.length);
      setLines(OUTPUT.length);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRunning(true);
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Tecleo del comando. Rápido a propósito: la secuencia entera tiene que
  // terminar en ~1s o el lector se queda esperando para ver de qué va el proyecto
  useEffect(() => {
    if (!running || typed >= CMD.length) return;
    const id = setTimeout(() => setTyped((n) => n + 1), 16);
    return () => clearTimeout(id);
  }, [running, typed]);

  // Salida, línea por línea, una vez tecleado el comando
  useEffect(() => {
    if (!running || typed < CMD.length || lines >= OUTPUT.length) return;
    const id = setTimeout(() => setLines((n) => n + 1), lines === 0 ? 140 : 85);
    return () => clearTimeout(id);
  }, [running, typed, lines]);

  const done = lines >= OUTPUT.length;

  return (
    <div className={styles.terminal} ref={ref}>
      <p className={styles.termCmd}>
        <span className={styles.termPrompt}>$</span> {CMD.slice(0, typed)}
        {typed < CMD.length && <span className={styles.caret} />}
      </p>

      {OUTPUT.slice(0, lines).map((l) => (
        <p
          key={l.text}
          className={`${styles.termLine} ${l.tone === "ok" ? styles.termOk : styles.termDim}`}
        >
          {l.text}
        </p>
      ))}

      {done && (
        <p className={styles.termCmd}>
          <span className={styles.termPrompt}>$</span>{" "}
          <span className={styles.caret} />
        </p>
      )}
    </div>
  );
}

const projects: Project[] = [
  {
    num: "01",
    name: "AULA JOVEN",
    tags: "FULLSTACK / REACT · NODE.JS · POSTGRESQL · SUPABASE",
    url: "https://aulajoven.org",
    desc: {
      en: "Educational platform built for a Costa Rican foundation to replace their paper-based workflow. Built end to end, including course management, enrollment, authentication and role-based access for students, teachers and administrators.",
      es: "Plataforma educativa construida para una fundación costarricense para reemplazar su flujo de trabajo en papel. Hecha de extremo a extremo: gestión de cursos, matrícula, autenticación y acceso por rol para estudiantes, profesores y administradores.",
    },
  },
  {
    num: "02",
    name: "DOCWIZARD",
    tags: "OPEN SOURCE / NODE.JS · TYPESCRIPT · GROQ API",
    url: "https://www.npmjs.com/package/docwizard",
    noPreview: true,
    chromeLabel: { en: "PUBLISHED ON NPM", es: "PUBLICADO EN NPM" },
    diagram: <DocwizardTerminal />,
    desc: {
      en: "Open-source CLI that turns a codebase into a user-friendly guide. It analyzes the project structure and generates documentation aimed at people who need to use the software, not read its source code.",
      es: "CLI open source que convierte un código fuente en una guía entendible. Analiza la estructura del proyecto y genera documentación pensada para quien necesita usar el software, no leer su código.",
    },
  },
  {
    num: "03",
    name: "COBBLE LABS",
    tags: "FRONTEND / NEXT.JS · REACT · TYPESCRIPT · TAILWIND",
    url: "https://cobble-lab.com",
    desc: {
      en: "Community tool for a Cobblemon server, combining a Pokédex, team builder and type analysis in one place. Built and deployed independently as a fast, fully static web application.",
      es: "Herramienta para la comunidad de un servidor de Cobblemon que reúne Pokédex, armador de equipos y análisis de tipos en un solo lugar. Construida y desplegada por mi cuenta como una aplicación web totalmente estática y rápida.",
    },
  },
  {
    num: "04",
    name: "PYPMEDIACR",
    tags: "FRONTEND / REACT · TYPESCRIPT",
    url: "https://pypmedia.vercel.app/",
    desc: {
      en: "Showcase website for a Costa Rican digital-signage company, focused on presenting their services and portfolio through a modern, motion-driven interface. Designed, built and deployed independently.",
      es: "Sitio para una empresa costarricense de cartelería digital, enfocado en presentar sus servicios y su portafolio con una interfaz moderna y con movimiento. Diseñado, construido y desplegado por mi cuenta.",
    },
  },
  {
    num: "05",
    name: "CABINANCE",
    tags: "FULLSTACK / NEXT.JS · FASTAPI · POSTGRESQL · DOCKER",
    url: "https://cabinance.app",
    image: "/projects/cabinance.png",
    desc: {
      en: "Personal-finance SaaS for managing budgets, savings and recurring payments. Built and operated end to end, with a focus on user data isolation, authentication, security and reliable deployment.",
      es: "SaaS de finanzas personales para manejar presupuestos, ahorros y pagos recurrentes. Construido y operado de extremo a extremo, con foco en el aislamiento de datos de cada usuario, la autenticación, la seguridad y un despliegue confiable.",
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

  // Las previews quedan siempre en blanco y negro: cada sitio trae su propia
  // paleta y colorearlas rompe la unidad de la sección. El color real aparece
  // solo bajo el lente, en desktop.
  const hasPreview = !project.noPreview;

  const onMouseMove = (e: MouseEvent) => {
    // Sin preview no hay nada que revelar — el lente solo estorbaría
    if (!hasPreview) return;
    const rect = vpRef.current?.getBoundingClientRect();
    if (!rect) return;
    setLens({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const chromeText = project.chromeLabel
    ? project.chromeLabel[lang]
    : new URL(project.url).hostname.replace(/^www\./, "");
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
        <span className={styles.chromeUrl}>{chromeText}</span>
        {/* El punto verde solo si de verdad se está embebiendo el sitio */}
        {hasPreview && (
          <span className={styles.chromeLive}>
            <span className={styles.liveDot} />
            LIVE
          </span>
        )}
      </div>

      <div className={styles.viewport} ref={vpRef} onMouseMove={onMouseMove}>
        {/* Fondo tipográfico — visible mientras carga el iframe, y estado
            definitivo de los proyectos que no son un sitio web */}
        <div className={styles.placeholder} aria-hidden={!project.diagram}>
          <span className={styles.phNum}>({project.num})</span>
          {project.diagram ?? <span className={styles.phName}>{project.name}</span>}
          <span className={styles.phTags}>{project.tags}</span>
        </div>

        {hasPreview &&
          (showImage ? (
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
                title={`${project.name} preview`}
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
          ))}

        {/* Capa blanco y negro — el agujero del clip muestra el color real */}
        {hasPreview && (
          <span
            className={styles.bw}
            aria-hidden="true"
            style={{ clipPath: bwClip }}
          />
        )}

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

      {/* Índice: los proyectos de un vistazo, sin bajar por toda la pila
          sticky ni esperar animaciones */}
      <nav className={styles.index} aria-label={t.work.indexLabel}>
        {projects.map((p) => (
          <a
            key={p.num}
            href={`#project-${p.num}`}
            className={styles.indexItem}
          >
            <span className={styles.indexNum}>{p.num}</span>
            <span className={styles.indexName}>{p.name}</span>
            <span className={styles.indexTag}>{p.tags.split(" / ")[0]}</span>
          </a>
        ))}
      </nav>

      {projects.map((p, i) => (
        <article
          key={p.num}
          id={`project-${p.num}`}
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

      {/* Colchón para el último proyecto: sticky no se desplaza fuera de su
          contenedor, así que sin esto el último no llega a su escalón y sube
          hasta el tope tapando el bookmark del primero */}
      <div className={styles.tail} aria-hidden="true" />
    </section>
  );
}
