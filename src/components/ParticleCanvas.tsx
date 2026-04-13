import { useEffect, useRef } from 'react'

interface Particle {
  ox: number
  oy: number
  x: number
  y: number
  vx: number
  vy: number
  r: number
  alpha: number
}

const REPEL_RADIUS = 120
const REPEL_FORCE = 10
const SPRING = 0.06
const FRICTION = 0.78
const MAX_PARTICLES = 6000  // Límite duro — evita lag en pantallas 4K

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const particles = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const isVisible = useRef(true)  // Pausa cuando el tab está en segundo plano

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    function setSize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
    }

    function buildFromImage() {
      const W = canvas!.width
      const H = canvas!.height
      particles.current = []

      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = '/hands.jpg'

      img.onload = () => spawnFromImage(img, W, H)
      img.onerror = () => {
        // Fallback: dot-grid con densidad controlada
        const STEP = 10
        for (let y = STEP; y < H; y += STEP) {
          for (let x = STEP; x < W; x += STEP) {
            if (particles.current.length >= MAX_PARTICLES) break
            if (Math.random() < 0.12) {
              particles.current.push({
                ox: x, oy: y,
                x: x + (Math.random() - 0.5) * W * 0.5,
                y: y + (Math.random() - 0.5) * H * 0.5,
                vx: 0, vy: 0,
                r: Math.random() * 0.8 + 0.3,
                alpha: Math.random() * 0.3 + 0.05,
              })
            }
          }
        }
      }
    }

    function spawnFromImage(img: HTMLImageElement, W: number, H: number) {
      // Escalar resolución del offscreen canvas para reducir píxeles procesados
      const SCALE = Math.min(1, 800 / Math.max(W, H))
      const offW = Math.floor(W * SCALE)
      const offH = Math.floor(H * SCALE)

      const off = document.createElement('canvas')
      off.width = offW
      off.height = offH
      const oc = off.getContext('2d')!

      const imgAspect = img.naturalWidth / img.naturalHeight
      const canvasAspect = offW / offH
      let drawW = offW, drawH = offH, drawX = 0, drawY = 0
      if (imgAspect > canvasAspect) {
        drawH = offH; drawW = offH * imgAspect; drawX = (offW - drawW) / 2
      } else {
        drawW = offW; drawH = offW / imgAspect; drawY = (offH - drawH) / 2
      }

      oc.drawImage(img, drawX, drawY, drawW, drawH)
      const data = oc.getImageData(0, 0, offW, offH).data
      const STEP = Math.max(4, Math.round(offW / 160))  // Paso mínimo más grande

      for (let y = 0; y < offH; y += STEP) {
        if (particles.current.length >= MAX_PARTICLES) break
        for (let x = 0; x < offW; x += STEP) {
          if (particles.current.length >= MAX_PARTICLES) break
          const i = (y * offW + x) * 4
          const brightness = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114
          if (brightness > 28 && Math.random() < 0.65) {
            // Convertir coordenadas del offscreen al canvas real
            const rx = (x / offW) * W
            const ry = (y / offH) * H
            const jx = rx + (Math.random() - 0.5) * (STEP / SCALE) * 0.8
            const jy = ry + (Math.random() - 0.5) * (STEP / SCALE) * 0.8
            particles.current.push({
              ox: jx, oy: jy,
              x: jx + (Math.random() - 0.5) * W * 0.6,
              y: jy + (Math.random() - 0.5) * H * 0.6,
              vx: 0, vy: 0,
              r: Math.max(0.4, (brightness / 255) * 1.6),
              alpha: 0.2 + (brightness / 255) * 0.7,
            })
          }
        }
      }
    }

    function animate() {
      if (!isVisible.current) {
        rafRef.current = requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, canvas!.width, canvas!.height)
      const pts = particles.current
      const mx = mouse.current.x
      const my = mouse.current.y

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < REPEL_RADIUS && dist > 0) {
          const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_FORCE
          p.vx -= (dx / dist) * force
          p.vy -= (dy / dist) * force
        }

        p.vx += (p.ox - p.x) * SPRING
        p.vy += (p.oy - p.y) * SPRING
        p.vx *= FRICTION
        p.vy *= FRICTION
        p.x += p.vx
        p.y += p.vy

        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    // Pausar animación cuando el tab no está visible — ahorra batería y CPU
    const onVisibilityChange = () => {
      isVisible.current = document.visibilityState === 'visible'
    }

    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => {
      // Debounce del resize — evita reconstruir partículas en cada pixel de resize
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        setSize()
        buildFromImage()
      }, 200)
    }

    setSize()
    buildFromImage()
    animate()

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(resizeTimer)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
      }}
    />
  )
}