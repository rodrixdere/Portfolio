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
  work: { label: string; educationLabel: string; indexLabel: string }
  contact: {
    label: string
    heading: string
    cv: string
    nameLabel: string
    emailLabel: string
    messageLabel: string
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
      available: 'OPEN TO FULL-TIME SOFTWARE ENGINEER ROLES',
      localTime: 'LOCAL TIME',
    },
    about: {
      label: '02 / ABOUT',
      hi: 'HELLO',
      there: 'WORLD',
      p1: 'I love putting together stories, details and experiences. I am a full-stack software engineer: I build systems, websites and applications from scratch, and I have fun along the way hiding details that almost nobody will notice, but that I know are there.',
      p2: 'I work close to the people who will use what I build. Before writing any code I make sure I understand what they need, because solving a problem is not enough for me: I want to understand it.',
      p3: 'In my free time I dive into RPGs, shooters and sandbox games, sometimes to learn from their worlds and sometimes to build my own. You will also find me reading about new technologies and learning about whatever sparks my curiosity.',
      pillars: [
        { big: 'END-TO-END', label: 'From requirements to production' },
        { big: 'IN PRODUCTION', label: 'Deployed and maintained by me' },
        { big: 'TEAM-READY', label: 'Agile, Scrum and code reviews' },
      ],
    },
    toolkit: { label: '03 / TOOLKIT' },
    work: {
      label: '04 / FEATURED WORK',
      educationLabel: 'EDUCATION & CERTIFICATION',
      indexLabel: 'Project index',
    },
    contact: {
      label: '05 / CONTACT',
      heading: "LET'S TALK",
      cv: 'DOWNLOAD CV',
      nameLabel: 'NAME',
      emailLabel: 'EMAIL',
      messageLabel: 'MESSAGE',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Your Email',
      messagePlaceholder: 'Tell me about the role or write to me directly',
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
      available: 'DISPONIBLE PARA PUESTOS DE INGENIERO DE SOFTWARE',
      localTime: 'HORA LOCAL',
    },
    about: {
      label: '02 / SOBRE MÍ',
      hi: 'HOLA',
      there: 'MUNDO',
      p1: 'Me gusta armar historias, cuidar los detalles y crear experiencias. Soy ingeniero de software full-stack: construyo sistemas, páginas web y aplicaciones desde cero, y me divierto en el proceso escondiendo detalles que casi nadie va a notar, pero que yo sé que están ahí.',
      p2: 'Trabajo cerca de quienes van a usar lo que construyo. Antes de escribir código me aseguro de entender qué necesitan, porque no me basta con resolver un problema: quiero entenderlo.',
      p3: 'En mi tiempo libre me sumerjo en juegos RPG, FPS y sandbox, a veces para aprender de sus mundos y a veces para crear el mío. También me encontrarás leyendo sobre tecnologías nuevas y aprendiendo de cualquier tema que me dé curiosidad.',
      pillars: [
        { big: 'END-TO-END', label: 'De requisitos a producción' },
        { big: 'EN PRODUCCIÓN', label: 'Desplegadas y mantenidas por mí' },
        { big: 'TRABAJO EN EQUIPO', label: 'Agile, Scrum y code reviews' },
      ],
    },
    toolkit: { label: '03 / HERRAMIENTAS' },
    work: {
      label: '04 / PROYECTOS DESTACADOS',
      educationLabel: 'FORMACIÓN Y CERTIFICACIÓN',
      indexLabel: 'Índice de proyectos',
    },
    contact: {
      label: '05 / CONTACTO',
      heading: 'HABLEMOS',
      cv: 'DESCARGAR CV',
      nameLabel: 'NOMBRE',
      emailLabel: 'CORREO',
      messageLabel: 'MENSAJE',
      namePlaceholder: 'Tu Nombre',
      emailPlaceholder: 'Tu Email',
      messagePlaceholder: 'Contame sobre el puesto o escribime directo',
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
