export type Lang = 'en' | 'es'

export interface Translations {
  nav: {
    logo: string
    about: string
    work: string
    contact: string
  }
  hero: {
    title: string
    desc: string
    logs: string
    cv: string
    available: string
    localTime: string
  }
  about: {
    label: string
    hi: string
    there: string
    p1: string
    p2: string
    p3: string
    stats: {
      years: string
      yearsLabel: string
      projects: string
      projectsLabel: string
      english: string
      englishLabel: string
    }
  }
  toolkit: { label: string }
  work: { label: string }
  contact: {
    label: string
    heading: string
    cv: string
    namePlaceholder: string
    emailPlaceholder: string
    messagePlaceholder: string
    send: string
    sending: string
    success: string
    error: string
  }
}

export const translations: Record<Lang, Translations> = {
  en: {
    nav: {
      logo: 'RODRIGO HORVILLEUR',
      about: 'ABOUT',
      work: 'FEATURED WORK',
      contact: 'CONTACT',
    },
    hero: {
      title: 'Full-Stack Developer',
      desc: 'Building complete web applications from requirements to production. React, Node.js, Spring Boot, PostgreSQL. Based in Costa Rica.',
      logs: 'PROJECT LOGS →',
      cv: '↓ DOWNLOAD CV',
      available: 'AVAILABLE FOR NEW PROJECTS',
      localTime: 'LOCAL TIME',
    },
    about: {
      label: '02 / ABOUT',
      hi: 'HI',
      there: 'THERE',
      p1: "Full-Stack Developer and Software Engineering student at Universidad Latina de Costa Rica — finishing my degree. I build complete web applications end-to-end, from requirements gathering to production deployment.",
      p2: "My stack covers React, TypeScript, Node.js, Express, and Spring Boot on the backend, with PostgreSQL, Supabase, and MongoDB for data. I've shipped an educational platform for a local foundation, a gym equipment e-commerce site, and a fitness brand's corporate site.",
      p3: 'Advanced English (C1+). I work with Agile / Scrum and care about clean architecture and systems that hold up under real use.',
      stats: {
        years: '2+',
        yearsLabel: 'Years building',
        projects: '3',
        projectsLabel: 'Projects shipped',
        english: 'C1+',
        englishLabel: 'English level',
      },
    },
    toolkit: { label: '03 / TOOLKIT' },
    work: { label: '04 / FEATURED WORK' },
    contact: {
      label: '05 / START A PROJECT',
      heading: "LET'S TALK",
      cv: 'DOWNLOAD CV',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Your Email',
      messagePlaceholder: 'Tell me about your project',
      send: 'SEND MESSAGE',
      sending: 'SENDING...',
      success: 'MESSAGE SENT ✓',
      error: 'ERROR — TRY AGAIN',
    },
  },
  es: {
    nav: {
      logo: 'RODRIGO HORVILLEUR',
      about: 'SOBRE MÍ',
      work: 'PROYECTOS',
      contact: 'CONTACTO',
    },
    hero: {
      title: 'Desarrollador Full-Stack',
      desc: 'Desarrollo aplicaciones web completas desde los requisitos hasta producción. React, Node.js, Spring Boot, PostgreSQL. Basado en Costa Rica.',
      logs: 'VER PROYECTOS →',
      cv: '↓ DESCARGAR CV',
      available: 'DISPONIBLE PARA NUEVOS PROYECTOS',
      localTime: 'HORA LOCAL',
    },
    about: {
      label: '02 / SOBRE MÍ',
      hi: 'HO',
      there: 'LA',
      p1: 'Desarrollador Full-Stack y estudiante de Ingeniería en Software en la Universidad Latina de Costa Rica — finalizando mi carrera. Construyo aplicaciones web completas de extremo a extremo, desde el levantamiento de requisitos hasta el despliegue en producción.',
      p2: 'Mi stack incluye React, TypeScript, Node.js, Express y Spring Boot en el backend, con PostgreSQL, Supabase y MongoDB para datos. He lanzado una plataforma educativa para una fundación local, un e-commerce de equipos de gimnasio y el sitio corporativo de una marca de fitness.',
      p3: 'Inglés avanzado (C1+). Trabajo con Agile / Scrum y me importa la arquitectura limpia y los sistemas que funcionan bajo uso real.',
      stats: {
        years: '2+',
        yearsLabel: 'Años construyendo',
        projects: '3',
        projectsLabel: 'Proyectos lanzados',
        english: 'C1+',
        englishLabel: 'Nivel de inglés',
      },
    },
    toolkit: { label: '03 / HERRAMIENTAS' },
    work: { label: '04 / PROYECTOS DESTACADOS' },
    contact: {
      label: '05 / INICIAR PROYECTO',
      heading: 'HABLEMOS',
      cv: 'DESCARGAR CV',
      namePlaceholder: 'Tu Nombre',
      emailPlaceholder: 'Tu Email',
      messagePlaceholder: 'Cuéntame sobre tu proyecto',
      send: 'ENVIAR MENSAJE',
      sending: 'ENVIANDO...',
      success: 'MENSAJE ENVIADO ✓',
      error: 'ERROR — INTENTA DE NUEVO',
    },
  },
}