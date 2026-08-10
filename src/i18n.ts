export type Lang = 'en' | 'es'

export interface Translations {
  meta: {
    title: string
    description: string
  }
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
    pillars: { big: string; label: string }[]
  }
  toolkit: { label: string }
  work: { label: string; educationLabel: string }
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
    tryAgain: string
    errorName: string
    errorEmail: string
    errorEmailInvalid: string
    errorMessage: string
  }
}

export const translations: Record<Lang, Translations> = {
  en: {
    meta: {
      title: 'Rodrigo Horvilleur | Full-Stack Software Engineer',
      description:
        'Full-Stack Software Engineer based in Costa Rica. I build web applications end to end and operate them in production with React, Next.js, Node.js, Python/FastAPI, PostgreSQL and Docker.',
    },
    nav: {
      logo: 'RODRIGO HORVILLEUR',
      about: 'ABOUT',
      work: 'FEATURED WORK',
      contact: 'CONTACT',
    },
    hero: {
      title: 'Full-Stack Software Engineer',
      desc: 'I build complete web applications and then operate them in production, including the Linux infrastructure underneath. Node.js, Python/FastAPI, React, Next.js, PostgreSQL, Docker. Based in Costa Rica.',
      logs: 'PROJECT LOGS →',
      cv: '↓ DOWNLOAD CV',
      available: 'AVAILABLE FOR NEW PROJECTS',
      localTime: 'LOCAL TIME',
    },
    about: {
      label: '02 / ABOUT',
      hi: 'HI',
      there: 'THERE',
      p1: 'Full-Stack Software Engineer based in Costa Rica, with a B.S. in Software Engineering from Universidad Latina de Costa Rica. I ship software and then operate it: architecture, implementation, deployment and the Linux server it runs on.',
      p2: 'My stack is Node.js and Python/FastAPI on the backend, React and Next.js with TypeScript on the front, PostgreSQL for data, and Docker on self-managed Linux. I delivered a production platform serving 150 daily active users as sole engineer, I run a self-hosted SaaS with a 65-test automated suite, and I have published an open-source CLI on npm.',
      p3: 'Advanced English (C1+). I work with Agile / Scrum and care about clean architecture, automated testing and systems that hold up under real use.',
      pillars: [
        { big: 'END-TO-END', label: 'From requirements to production' },
        { big: 'IN PRODUCTION', label: 'Apps with real users today' },
        { big: 'TEAM-READY', label: 'Agile, Scrum and code reviews' },
      ],
    },
    toolkit: { label: '03 / TOOLKIT' },
    work: {
      label: '04 / FEATURED WORK',
      educationLabel: 'EDUCATION & CERTIFICATION',
    },
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
      error: 'ERROR · TRY AGAIN',
      tryAgain: 'Try again',
      errorName: 'Name is required',
      errorEmail: 'Email is required',
      errorEmailInvalid: 'Enter a valid email',
      errorMessage: 'Message is required',
    },
  },
  es: {
    meta: {
      title: 'Rodrigo Horvilleur | Ingeniero de Software Full-Stack',
      description:
        'Ingeniero de Software Full-Stack basado en Costa Rica. Construyo aplicaciones web de extremo a extremo y las opero en producción con React, Next.js, Node.js, Python/FastAPI, PostgreSQL y Docker.',
    },
    nav: {
      logo: 'RODRIGO HORVILLEUR',
      about: 'SOBRE MÍ',
      work: 'PROYECTOS',
      contact: 'CONTACTO',
    },
    hero: {
      title: 'Ingeniero de Software Full-Stack',
      desc: 'Construyo aplicaciones web completas y después las opero en producción, incluida la infraestructura Linux por debajo. Node.js, Python/FastAPI, React, Next.js, PostgreSQL, Docker. Basado en Costa Rica.',
      logs: 'VER PROYECTOS →',
      cv: '↓ DESCARGAR CV',
      available: 'DISPONIBLE PARA NUEVOS PROYECTOS',
      localTime: 'HORA LOCAL',
    },
    about: {
      label: '02 / SOBRE MÍ',
      hi: 'HO',
      there: 'LA',
      p1: 'Ingeniero de Software Full-Stack basado en Costa Rica, con un bachillerato en Ingeniería en Software de la Universidad Latina de Costa Rica. Entrego software y después lo opero: arquitectura, implementación, despliegue y el servidor Linux donde corre.',
      p2: 'Mi stack es Node.js y Python/FastAPI en el backend, React y Next.js con TypeScript en el front, PostgreSQL para datos y Docker sobre Linux autogestionado. Entregué una plataforma en producción con 150 usuarios activos diarios como ingeniero único, opero un SaaS self-hosted con una suite de 65 pruebas automatizadas y publiqué un CLI open source en npm.',
      p3: 'Inglés avanzado (C1+). Trabajo con Agile / Scrum y me importan la arquitectura limpia, las pruebas automatizadas y los sistemas que aguantan uso real.',
      pillars: [
        { big: 'END-TO-END', label: 'De requisitos a producción' },
        { big: 'EN PRODUCCIÓN', label: 'Apps con usuarios reales hoy' },
        { big: 'TRABAJO EN EQUIPO', label: 'Agile, Scrum y code reviews' },
      ],
    },
    toolkit: { label: '03 / HERRAMIENTAS' },
    work: {
      label: '04 / PROYECTOS DESTACADOS',
      educationLabel: 'FORMACIÓN Y CERTIFICACIÓN',
    },
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
      error: 'ERROR · INTENTA DE NUEVO',
      tryAgain: 'Intentar de nuevo',
      errorName: 'El nombre es requerido',
      errorEmail: 'El correo es requerido',
      errorEmailInvalid: 'Ingresa un correo válido',
      errorMessage: 'El mensaje es requerido',
    },
  },
}
