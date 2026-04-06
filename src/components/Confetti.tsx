import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Particle = {
  id: number
  x: number
  y: number
  color: string
  size: number
  rotation: number
  drift: number
}

const COLORS = ['#1cb0f6', '#58cc02', '#ff4b4b', '#ffc800', '#ce82ff']

/**
 * A lightweight confetti component using Framer Motion.
 * Renders a burst of colorful particles from the center of the screen.
 */
export function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: 50, // center %
      y: 50, // center %
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 10 + 5,
      rotation: Math.random() * 360,
      drift: Math.random() * 400 - 200,
    }))
    setParticles(newParticles)
    
    // Auto-remove after animation
    const timer = setTimeout(() => setParticles([]), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (particles.length === 0) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ 
            x: '50vw', 
            y: '50vh', 
            opacity: 1, 
            scale: 0, 
            rotate: 0 
          }}
          animate={{
            x: `calc(50vw + ${p.drift}px)`,
            y: '110vh',
            opacity: 0,
            scale: 1,
            rotate: p.rotation + 720,
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            ease: 'easeOut',
          }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  )
}
