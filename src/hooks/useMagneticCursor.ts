import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const MAGNETIC_SELECTORS = [
  'h1', 'h2',
  '[data-magnetic]',
  '[data-cursor="text"]',
]

interface CursorState {
  x: number
  y: number
  isStuck: boolean
  stuckEl: Element | null
}

export function useMagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  const state = useRef<CursorState>({ x: 0, y: 0, isStuck: false, stuckEl: null })

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    const pos = { x: 0, y: 0 }

    const setX = gsap.quickSetter(cursor, 'x', 'px')
    const setY = gsap.quickSetter(cursor, 'y', 'px')
    const setFX = gsap.quickSetter(follower, 'x', 'px')
    const setFY = gsap.quickSetter(follower, 'y', 'px')

    const onMouseMove = (e: MouseEvent) => {
      state.current.x = e.clientX
      state.current.y = e.clientY
    }

    const tick = () => {
      const { x, y, isStuck, stuckEl } = state.current

      if (isStuck && stuckEl) {
        const rect = stuckEl.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = x - cx
        const dy = y - cy

        setX(cx + dx * 0.35)
        setY(cy + dy * 0.35)

        gsap.to(follower, {
          x: cx - 60,
          y: cy - 20,
          width: rect.width * 1.1,
          height: 40,
          borderRadius: 4,
          opacity: 0.12,
          duration: 0.4,
          ease: 'power3.out',
          overwrite: true,
        })

        gsap.to(cursor, {
          width: 6,
          height: 6,
          opacity: 0.6,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: true,
        })
      } else {
        setX(x - 6)
        setY(y - 6)

        pos.x += (x - pos.x) * 0.12
        pos.y += (y - pos.y) * 0.12
        setFX(pos.x - 20)
        setFY(pos.y - 20)

        gsap.to(cursor, {
          width: 12,
          height: 12,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: true,
        })

        gsap.to(follower, {
          width: 40,
          height: 40,
          borderRadius: '50%',
          opacity: 0.15,
          duration: 0.5,
          ease: 'power3.out',
          overwrite: true,
        })
      }
    }

    const onMouseEnter = (e: MouseEvent) => {
      const target = e.target
      // Guard: solo Elements tienen .closest, no text nodes ni document
      if (!(target instanceof Element)) return
      const magnetic = MAGNETIC_SELECTORS.some(sel => target.closest(sel))
      if (magnetic) {
        state.current.isStuck = true
        state.current.stuckEl = target.closest(MAGNETIC_SELECTORS.join(','))
      }
    }

    const onMouseLeave = (e: MouseEvent) => {
      const target = e.target
      // Guard: solo Elements tienen .closest, no text nodes ni document
      if (!(target instanceof Element)) return
      const magnetic = MAGNETIC_SELECTORS.some(sel => target.closest(sel))
      if (magnetic) {
        state.current.isStuck = false
        state.current.stuckEl = null
      }
    }

    gsap.ticker.add(tick)
    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseenter', onMouseEnter, true)
    document.addEventListener('mouseleave', onMouseLeave, true)

    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter, true)
      document.removeEventListener('mouseleave', onMouseLeave, true)
    }
  }, [])

  return { cursorRef, followerRef }
}