import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export const ThreeDBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // 1. Setup Scene, Camera & Renderer
    const scene = new THREE.Scene()
    
    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight
    
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)

    // 2. Create Glowing Particles System (Cellular mesh representation)
    const particleCount = 1200
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const originalY = new Float32Array(particleCount)
    const randomSpeeds = new Float32Array(particleCount)

    // Distribute particles in a spherical grid with slight noise
    for (let i = 0; i < particleCount; i++) {
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      
      const r = 2.0 + Math.random() * 0.8 // Radius of the bubble
      
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      
      originalY[i] = y
      randomSpeeds[i] = 0.5 + Math.random() * 2.0
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    // Create a circular particle texture using standard HTML canvas (guarantees a beautiful round glow)
    const canvas = document.createElement('canvas')
    canvas.width = 16
    canvas.height = 16
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8)
      gradient.addColorStop(0, 'rgba(212, 175, 55, 1)')
      gradient.addColorStop(0.3, 'rgba(212, 175, 55, 0.8)')
      gradient.addColorStop(1, 'rgba(212, 175, 55, 0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 16, 16)
    }

    const texture = new THREE.CanvasTexture(canvas)

    // Material configuration (Golden additive glow)
    const material = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.12,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // 3. Mouse Interaction Listeners
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates to range [-1, 1]
      targetX = (event.clientX / window.innerWidth) * 2 - 1
      targetY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    // 4. Animation Loop
    let animationFrameId: number
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()
      const positionsAttr = geometry.attributes.position as THREE.BufferAttribute
      const array = positionsAttr.array as Float32Array

      // Apply standard wave/pulsing movement on particles (cellular behavior)
      for (let i = 0; i < particleCount; i++) {
        const index = i * 3 + 1 // targeting Y axis
        array[index] = originalY[i] + Math.sin(elapsedTime * randomSpeeds[i]) * 0.15
      }
      positionsAttr.needsUpdate = true

      // Slow rotation
      particles.rotation.y = elapsedTime * 0.05
      particles.rotation.x = elapsedTime * 0.02

      // Interpolate mouse movements smoothly (lag/ease effect)
      mouseX += (targetX - mouseX) * 0.05
      mouseY += (targetY - mouseY) * 0.05

      // Ripple the particle coordinate relative to cursor
      particles.position.x = mouseX * 0.5
      particles.position.y = mouseY * 0.5

      renderer.render(scene, camera)
    }

    animate()

    // 5. Handle Container Resizing
    const handleResize = () => {
      if (!containerRef.current) return
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)

    // 6. Cleanup code
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      
      geometry.dispose()
      material.dispose()
      texture.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.6
      }}
    />
  )
}
