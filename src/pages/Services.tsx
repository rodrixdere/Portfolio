import { useEffect, useRef, useState } from "react";
import Cursor from "../components/Cursor";
import ParticleCanvas from "../components/ParticleCanvas";
import styles from "./Services.module.css";

/* Página de servicios para dueños de negocio (español, sin jerga técnica).
   Audiencia distinta a la del portafolio de dev: acá se vende resultado
   de negocio, no stack. Se comparte en prospección en frío y redes. */

const WHATSAPP = "50660261200";

const wa = (msg: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

const WA_GENERAL = wa(
  "Hola Rodrigo! Vi tu página de servicios y quiero información para mi negocio.",
);
const WA_DEMO = wa(
  "Hola Rodrigo! Quiero ver una demo gratis de cómo se vería el sitio de mi negocio.",
);

/* ── Sitios reales de clientes — la prueba, sin hablar de tecnología ── */

interface Site {
  num: string;
  name: string;
  url: string;
  desc: string;
}

const sites: Site[] = [
  {
    num: "01",
    name: "GEORGE ANGULO FITNESS",
    url: "https://georgeangulofitness.com",
    desc: "Marca de fitness — sus programas, servicios y contacto directo de clientes, todo desde el celular.",
  },
  {
    num: "02",
    name: "PYP MEDIA",
    url: "https://pypmedia.vercel.app/",
    desc: "Productora audiovisual — muestra su trabajo y recibe consultas de nuevos proyectos.",
  },
  {
    num: "03",
    name: "AULA JOVEN",
    url: "https://aulajoven.org",
    desc: "Fundación educativa — cursos y matrícula de estudiantes completamente en línea.",
  },
];

// Igual que en el portafolio: el sitio real se renderiza a resolución
// desktop y se escala para caber en la card
const PREVIEW_W = 1440;
const PREVIEW_H = 900;

function SiteCard({ site }: { site: Site }) {
  const vpRef = useRef<HTMLDivElement>(null);
  const [vpW, setVpW] = useState(0);

  useEffect(() => {
    const el = vpRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setVpW(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const hostname = new URL(site.url).hostname.replace(/^www\./, "");
  const scale = vpW / PREVIEW_W;

  return (
    <a
      href={site.url}
      target="_blank"
      rel="noreferrer"
      className={styles.siteCard}
      aria-label={`${site.name} — abrir sitio en una pestaña nueva`}
    >
      <div className={styles.chrome} aria-hidden="true">
        <span className={styles.chromeDots}>
          <span />
          <span />
          <span />
        </span>
        <span className={styles.chromeUrl}>{hostname}</span>
        <span className={styles.chromeLive}>
          <span className={styles.liveDot} />
          EN LÍNEA
        </span>
      </div>
      <div className={styles.viewport} ref={vpRef}>
        {scale > 0 && (
          <iframe
            src={site.url}
            title={`${site.name} — vista previa`}
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
        )}
      </div>
      <div className={styles.siteInfo}>
        <span className={styles.siteNum}>({site.num})</span>
        <h3 className={styles.siteName}>{site.name}</h3>
        <p className={styles.siteDesc}>{site.desc}</p>
      </div>
    </a>
  );
}

/* ── Dolores por rubro (guiones de valor de la estrategia) ── */

const pains = [
  {
    who: "SALONES · BARBERÍAS · ESTÉTICA",
    pain: "¿El chat saturado de gente pidiendo cita? Tu sitio agenda solo, 24/7, mientras vos trabajás.",
  },
  {
    who: "CLÍNICAS · DENTISTAS · FISIOS · VETES",
    pain: "Que los pacientes te encuentren en Google y reserven su cita sin llamar ni esperar respuesta.",
  },
  {
    who: "CABINAS · TOURS · HOSPEDAJE",
    pain: "Reservas directas en español e inglés, sin pagarle comisión a Airbnb o Booking por cada huésped.",
  },
  {
    who: "PROFESIONALES · COMERCIOS · SERVICIOS",
    pain: "¿Solo tenés Instagram? Un sitio propio te hace ver serio y te encuentra la gente que ya te anda buscando.",
  },
];

/* ── Paquetes (precios de referencia de la estrategia) ── */

interface Pack {
  tag: string;
  name: string;
  price: string;
  priceNote: string;
  features: string[];
  time: string;
  featured?: boolean;
}

const packs: Pack[] = [
  {
    tag: "BÁSICO",
    name: "PRESENCIA",
    price: "desde ₡150.000",
    priceNote: "pago único",
    features: [
      "Una página profesional con tu info, fotos y servicios",
      "Botón directo a tu WhatsApp",
      "Mapa, horarios y redes sociales",
      "Tu propio dominio (.com) y hosting incluidos",
      "Perfecta en celular",
    ],
    time: "Lista en días",
  },
  {
    tag: "PROFESIONAL",
    name: "CAPTACIÓN",
    price: "desde ₡300.000",
    priceNote: "pago único",
    features: [
      "Todo lo del plan Básico",
      "Varias secciones: catálogo, menú, precios, galería",
      "Formulario que llega a tu correo o WhatsApp",
      "Preparada para aparecer en Google",
      "Estadísticas de visitas",
    ],
    time: "1–2 semanas",
  },
  {
    tag: "PREMIUM",
    name: "SISTEMA DE RESERVAS",
    price: "desde ₡650.000",
    priceNote: "según el proyecto",
    features: [
      "Todo lo del plan Profesional",
      "Tus clientes agendan cita solos, 24/7",
      "Panel para ver y administrar tu agenda",
      "Hecho a la medida de tu negocio",
      "El sitio trabaja por vos",
    ],
    time: "Proyecto a la medida",
    featured: true,
  },
  {
    tag: "MENSUAL",
    name: "MANTENIMIENTO + HOSTING",
    price: "desde ₡30.000",
    priceNote: "por mes",
    features: [
      "Hosting, dominio y seguridad administrados",
      "Respaldos de tu sitio",
      "Cambios menores incluidos",
      "Soporte directo conmigo",
    ],
    time: "Tranquilidad todos los meses",
  },
];

/* ── Cómo funciona ── */

const steps = [
  {
    num: "01",
    title: "ME ESCRIBÍS POR WHATSAPP",
    desc: "Me contás qué negocio tenés y qué necesitás. Sin compromiso.",
  },
  {
    num: "02",
    title: "TE MUESTRO UNA DEMO GRATIS",
    desc: "Antes de pagar nada, ves cómo se vería el sitio de tu negocio.",
  },
  {
    num: "03",
    title: "LO CONSTRUYO",
    desc: "Con el 50% de adelanto arranco. En días o semanas está listo.",
  },
  {
    num: "04",
    title: "PUBLICAMOS Y TE ACOMPAÑO",
    desc: "Tu sitio en línea con tu dominio. Mantenimiento mensual opcional.",
  },
];

/* ── Por qué conmigo ── */

const reasons = [
  {
    title: "SITIOS REALES, NO PLANTILLAS",
    desc: "Soy desarrollador profesional: tu sitio carga rápido, funciona bien y se ajusta exactamente a tu negocio.",
  },
  {
    title: "TODO INCLUIDO",
    desc: "Dominio propio, hosting, seguridad y correo profesional. No tenés que contratar nada aparte.",
  },
  {
    title: "EL SITIO ES TUYO",
    desc: "Sin plataformas con mensualidad obligatoria. Tu sitio te pertenece — es un activo de tu negocio.",
  },
  {
    title: "TRATO DIRECTO",
    desc: "Hablás conmigo de principio a fin, no con una agencia. Respondo el mismo día.",
  },
];

export default function Services() {
  useEffect(() => {
    document.documentElement.lang = "es";
    document.title = "Sitios web para tu negocio en Costa Rica — Rodrigo Horvilleur";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Sitios web profesionales para negocios locales en Costa Rica: presencia en Google, botón de WhatsApp y sistemas de reservas en línea. Demo gratis.",
      );
  }, []);

  return (
    <>
      <Cursor />
      <main className={styles.page}>
        {/* ── HERO — misma estructura que el hero del portafolio ── */}
        <section className={styles.hero}>
          <ParticleCanvas />

          <nav className={styles.nav}>
            <span className={styles.logo}>RODRIGO HORVILLEUR · SITIOS WEB</span>
            <div className={styles.navLinks}>
              <a href="#sitios">SITIOS</a>
              <a href="#paquetes">PAQUETES</a>
              <a href="#proceso">PROCESO</a>
              <a href={WA_GENERAL} target="_blank" rel="noreferrer" className={styles.navCta}>
                WHATSAPP
              </a>
            </div>
          </nav>

          <div className={styles.nameBlock}>
            <h1>
              <span className={styles.title1}>SITIOS WEB QUE</span>
              <span className={styles.title1}>TRAEN CLIENTES</span>
              <span className={styles.title2}>A TU NEGOCIO</span>
            </h1>
            <p className={styles.tagline}>PARA NEGOCIOS LOCALES · COSTA RICA</p>
          </div>

          <div className={styles.heroDesc}>
            <p>
              Tu propio dominio, botón de WhatsApp y presencia en Google. Vos
              atendés tu negocio; tu sitio te consigue clientes.
            </p>
            <div className={styles.heroActions}>
              <a href={WA_DEMO} target="_blank" rel="noreferrer" className={styles.demoLink}>
                PEDÍ TU DEMO GRATIS →
              </a>
              <a href={WA_GENERAL} target="_blank" rel="noreferrer" className={styles.waBtn}>
                ESCRIBIME POR WHATSAPP
              </a>
            </div>
          </div>

          <div className={styles.heroFooter}>
            <div className={styles.available}>
              <span className={styles.greenDot} />
              <span>RESPONDO EL MISMO DÍA</span>
            </div>
            <div className={styles.heroPhone}>+506 6026 1200</div>
          </div>
        </section>

        {/* ── SITIOS REALES ── */}
        <section className={styles.section} id="sitios">
          <span className={styles.label}>01 / TRABAJOS REALES</span>
          <h2 className={styles.heading}>
            EN LÍNEA <span className={styles.dim}>HOY MISMO</span>
          </h2>
          <p className={styles.sectionIntro}>
            No son maquetas: son sitios de clientes reales, funcionando ahora.
            Tocá cualquiera y comprobalo.
          </p>
          <div className={styles.sitesGrid}>
            {sites.map((s) => (
              <SiteCard key={s.num} site={s} />
            ))}
          </div>
        </section>

        {/* ── ¿TE SUENA? ── */}
        <section className={styles.section}>
          <span className={styles.label}>02 / ¿TE SUENA?</span>
          <h2 className={styles.heading}>
            TU NEGOCIO <span className={styles.dim}>SIN DEPENDER DEL CHAT</span>
          </h2>
          <div className={styles.painsGrid}>
            {pains.map((p) => (
              <div key={p.who} className={styles.painCard}>
                <span className={styles.painWho}>{p.who}</span>
                <p className={styles.painText}>{p.pain}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PAQUETES ── */}
        <section className={styles.section} id="paquetes">
          <span className={styles.label}>03 / PAQUETES</span>
          <h2 className={styles.heading}>
            ELEGÍ LO QUE <span className={styles.dim}>TU NEGOCIO NECESITA</span>
          </h2>
          <div className={styles.packsGrid}>
            {packs.map((p) => (
              <div
                key={p.tag}
                className={`${styles.packCard} ${p.featured ? styles.packFeatured : ""}`}
              >
                <span className={styles.packTag}>{p.tag}</span>
                <h3 className={styles.packName}>{p.name}</h3>
                <div className={styles.packPrice}>
                  {p.price}
                  <span className={styles.packPriceNote}> · {p.priceNote}</span>
                </div>
                <ul className={styles.packFeatures}>
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <span className={styles.packTime}>{p.time}</span>
                <a
                  href={wa(
                    `Hola Rodrigo! Me interesa el paquete ${p.tag} (${p.name}) para mi negocio.`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className={p.featured ? styles.waBtn : styles.ghostBtn}
                >
                  LO QUIERO →
                </a>
              </div>
            ))}
          </div>
          <p className={styles.packsNote}>
            Precios de referencia — cada negocio es distinto. Escribime y te doy
            un precio fijo sin compromiso. Se trabaja con 50% de adelanto y 50%
            contra entrega.
          </p>
        </section>

        {/* ── PROCESO ── */}
        <section className={styles.section} id="proceso">
          <span className={styles.label}>04 / CÓMO FUNCIONA</span>
          <h2 className={styles.heading}>
            SIMPLE, <span className={styles.dim}>DE PRINCIPIO A FIN</span>
          </h2>
          <div className={styles.stepsGrid}>
            {steps.map((s) => (
              <div key={s.num} className={styles.stepCard}>
                <span className={styles.stepNum}>({s.num})</span>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── POR QUÉ CONMIGO ── */}
        <section className={styles.section}>
          <span className={styles.label}>05 / POR QUÉ CONMIGO</span>
          <h2 className={styles.heading}>
            LO QUE OTROS <span className={styles.dim}>NO TE PUEDEN DAR</span>
          </h2>
          <div className={styles.reasonsGrid}>
            {reasons.map((r) => (
              <div key={r.title} className={styles.reasonCard}>
                <h3 className={styles.reasonTitle}>{r.title}</h3>
                <p className={styles.reasonDesc}>{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className={styles.finalCta}>
          <span className={styles.label}>06 / EMPEZÁ HOY</span>
          <h2 className={styles.finalHeading}>
            ¿HABLAMOS DE
            <br />
            <span className={styles.dim}>TU NEGOCIO?</span>
          </h2>
          <p className={styles.finalDesc}>
            Contame qué necesitás y te muestro una demo gratis de tu sitio.
            Sin compromiso, sin letra chiquita.
          </p>
          <a
            href={WA_GENERAL}
            target="_blank"
            rel="noreferrer"
            className={styles.bigBtn}
          >
            ESCRIBIME POR WHATSAPP →
          </a>
          <div className={styles.finalMeta}>
            <span>+506 6026 1200</span>
            <span>·</span>
            <span>COSTA RICA</span>
            <span>·</span>
            <span>RESPONDO EL MISMO DÍA</span>
          </div>
        </section>

        <footer className={styles.footer}>
          <span>© {new Date().getFullYear()} RODRIGO HORVILLEUR</span>
          <a href="/">PORTAFOLIO DE DESARROLLADOR →</a>
        </footer>
      </main>
    </>
  );
}
