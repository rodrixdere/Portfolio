import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollStack() {
  useEffect(() => {
    // En móvil no aplicar pinning — las secciones son más altas que el viewport
    if (window.innerWidth <= 768) return

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('[data-stack]')

      sections.forEach((section, i) => {
        const isLast = i === sections.length - 1
        if (isLast) return

        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: () => `+=${sections[i + 1]?.offsetHeight ?? window.innerHeight}`,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        })
      })
    })

    return () => ctx.revert()
  }, [])
}