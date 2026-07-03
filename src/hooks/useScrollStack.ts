import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Evita refreshes bruscos en móvil cuando la barra de dirección
// del navegador se colapsa/expande al scrollear
ScrollTrigger.config({ ignoreMobileResize: true })

export function useScrollStack() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('[data-stack]')

      sections.forEach((section, i) => {
        const next = sections[i + 1]
        if (!next) return // la última sección nunca se pinea

        ScrollTrigger.create({
          trigger: section,
          // Si la sección es más alta que el viewport, se deja scrollear
          // completa y se pinea recién cuando su borde inferior llega al
          // fondo — el contenido largo nunca queda tapado por la siguiente
          start: () =>
            section.offsetHeight > window.innerHeight ? 'bottom bottom' : 'top top',
          // Pinear solo lo necesario para que la siguiente cubra el viewport
          end: () => `+=${Math.min(next.offsetHeight, window.innerHeight)}`,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        })
      })
    })

    // Las fuentes web cambian la altura de las secciones al cargar —
    // recalcular las posiciones de pin cuando estén listas
    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    return () => ctx.revert()
  }, [])
}
