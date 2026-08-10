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

  // Tecleo del comando
  useEffect(() => {
    if (!running || typed >= CMD.length) return;
    const id = setTimeout(() => setTyped((n) => n + 1), 38);
    return () => clearTimeout(id);
  }, [running, typed]);

  // Salida, línea por línea, una vez tecleado el comando
  useEffect(() => {
    if (!running || typed < CMD.length || lines >= OUTPUT.length) return;
    const id = setTimeout(() => setLines((n) => n + 1), lines === 0 ? 420 : 260);
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
      en: "Educational platform for a Costa Rican foundation, built end to end as sole engineer: course management, student enrollment and content delivery across three user roles, over a REST API with JWT authentication and role-based access control. In production with 150 daily active users.",
      es: "Plataforma educativa para una fundación costarricense, construida de extremo a extremo como ingeniero único: gestión de cursos, matrícula de estudiantes y entrega de contenido con tres roles de usuario, sobre una API REST con autenticación JWT y control de acceso por rol. En producción con 150 usuarios activos diarios.",
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
      en: "Open-source CLI published on npm. It scans a project's source code and generates a plain-language end-user guide through the Groq API, turning unstructured technical material into documentation a non-technical reader can actually follow.",
      es: "CLI open source publicado en npm. Recorre el código fuente de un proyecto y genera una guía de usuario en lenguaje llano a través de la API de Groq, convirtiendo material técnico sin estructura en documentación que un lector no técnico sí puede seguir.",
    },
  },
  {
    num: "03",
    name: "GEORGE ANGULO FITNESS",
    tags: "FRONTEND / REACT",
    url: "https://georgeangulofitness.com",
    desc: {
      en: "Corporate site for a fitness brand: services, training programs and client contact, with an interactive map and transactional email, delivered with full technical documentation for handoff.",
      es: "Sitio corporativo para una marca de fitness: servicios, programas de entrenamiento y contacto de clientes, con mapa interactivo y correo transaccional, entregado con documentación técnica completa para el traspaso.",
    },
  },
  {
    num: "04",
    name: "PYPMEDIACR",
    tags: "FRONTEND / REACT · TYPESCRIPT",
    url: "https://pypmedia.vercel.app/",
    desc: {
      en: "Showcase site for a Costa Rican digital-signage company: portfolio, services and contact, with smooth motion throughout. Built solo and deployed on Vercel.",
      es: "Sitio para una empresa costarricense de cartelería digital: portafolio, servicios y contacto, con animaciones fluidas en todo el recorrido. Construido en solitario y desplegado en Vercel.",
    },
  },
  {
    num: "05",
    name: "CABINANCE",
    tags: "FULLSTACK / NEXT.JS · FASTAPI · POSTGRESQL · DOCKER",
    url: "https://cabinance.app",
    image: "/projects/cabinance.png",
    desc: {
      en: "Personal-finance SaaS I built and operate on my own: budgets, savings goals, recurring payments, gamified achievements and insights computed automatically from user financial data. Next.js over a Python/FastAPI backend and PostgreSQL, 65 automated tests, Dockerized on a self-managed Linux VPS behind Cloudflare.",
      es: "SaaS de finanzas personales que construí y opero yo solo: presupuestos, metas de ahorro, pagos recurrentes, logros gamificados e insights calculados automáticamente a partir de los datos financieros del usuario. Next.js sobre un backend Python/FastAPI y PostgreSQL, 65 pruebas automatizadas, dockerizado en un VPS Linux autogestionado detrás de Cloudflare.",
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
  const hasPreview = !project.noPreview;
  useEffect(() => {
    if (!hasPreview) return;
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
  }, [hasPreview]);

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
            className={`${styles.bw} ${colored ? styles.bwOff : ""}`}
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
