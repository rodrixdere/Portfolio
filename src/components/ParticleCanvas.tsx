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
const MAX_PARTICLES = 10000

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const particles = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const isVisible = useRef(true)

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
      // Subir SCALE para tener más píxeles disponibles para muestrear
      const SCALE = Math.min(1, 1200 / Math.max(W, H))
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

      // STEP 3 = muestrea más píxeles = más partículas posibles
      const STEP = 3

      for (let y = 0; y < offH; y += STEP) {
        if (particles.current.length >= MAX_PARTICLES) break
        for (let x = 0; x < offW; x += STEP) {
          if (particles.current.length >= MAX_PARTICLES) break
          const i = (y * offW + x) * 4
          const brightness = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114
          if (brightness > 28 && Math.random() < 0.65) {
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
              // Alpha cuantizado a 10 niveles para batching eficiente
              alpha: Math.round((0.2 + (brightness / 255) * 0.7) * 10) / 10,
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

      // 1. Física
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
      }

      // 2. Batched render — agrupa por alpha, ~10 draw calls en vez de N
      const buckets = new Map<number, Particle[]>()
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        if (!buckets.has(p.alpha)) buckets.set(p.alpha, [])
        buckets.get(p.alpha)!.push(p)
      }

      for (const [alpha, group] of buckets) {
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.beginPath()
        for (let i = 0; i < group.length; i++) {
          const p = group[i]
          ctx.moveTo(p.x + p.r, p.y)
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        }
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const onVisibilityChange = () => {
      isVisible.current = document.visibilityState === 'visible'
    }

    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => {
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