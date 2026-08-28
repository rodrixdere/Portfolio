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
    p4: string
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
      p1: 'Full-Stack Software Engineer based in Costa Rica, with four years building web applications and a B.S. in Software Engineering from Universidad Latina de Costa Rica. I build and maintain software end to end, from architecture and development to deployment and the infrastructure that keeps it running.',
      p2: 'I built a platform for a foundation to replace a manual, paper-based process with a centralized system for managing their day-to-day operations. I developed the platform independently and took responsibility for the entire product, from understanding the organization\'s needs to deploying and maintaining it in production. The result was a system that became part of their daily workflow and continues to be used in their operations.',
      p3: 'I also develop and run my own finance SaaS, which has given me experience beyond application development: authentication, data isolation, session management, rate limiting, automated testing, deployment, and server administration. Building and operating the product myself has taught me to think about how software behaves in production, not just how to make it work locally.',
      p4: 'I have an advanced level of English (C1+) and experience with Agile/Scrum. I care about clean architecture, maintainable code, and building software that can be trusted in real-world use.',
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
      p1: 'Ingeniero de Software Full-Stack basado en Costa Rica, con cuatro años construyendo aplicaciones web y un bachillerato en Ingeniería en Software de la Universidad Latina de Costa Rica. Construyo y mantengo software de extremo a extremo: arquitectura, desarrollo, despliegue y la infraestructura que lo sostiene.',
      p2: 'Construí para una fundación una plataforma que reemplazó un proceso manual en papel por un sistema centralizado para manejar su operación diaria. La desarrollé por mi cuenta y me hice cargo del producto entero, desde entender qué necesitaba la organización hasta desplegarlo y mantenerlo en producción. El resultado es un sistema que pasó a formar parte de su trabajo cotidiano y que siguen usando hoy.',
      p3: 'También desarrollo y opero mi propio SaaS de finanzas, que me dio experiencia más allá de programar la aplicación: autenticación, aislamiento de datos, manejo de sesiones, límite de peticiones, pruebas automatizadas, despliegue y administración del servidor. Construirlo y operarlo yo mismo me enseñó a pensar en cómo se comporta el software en producción, no solo en cómo hacerlo funcionar localmente.',
      p4: 'Tengo inglés avanzado (C1+) y experiencia con Agile/Scrum. Me importan la arquitectura limpia, el código mantenible y construir software en el que se pueda confiar cuando se usa de verdad.',
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
