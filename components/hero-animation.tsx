"use client"

import { useEffect, useRef } from "react"
import { useMobile } from "@/hooks/use-mobile"

export default function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useMobile()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Load images
    const cropImage = new Image()
    cropImage.crossOrigin = "anonymous"
    cropImage.src = "/placeholder.svg?height=100&width=100"

    const cloudImage = new Image()
    cloudImage.crossOrigin = "anonymous"
    cloudImage.src = "/placeholder.svg?height=80&width=150"

    const rainImage = new Image()
    rainImage.crossOrigin = "anonymous"
    rainImage.src = "/placeholder.svg?height=50&width=50"

    // Create data points
    const dataPoints: { x: number; y: number; value: number }[] = []
    for (let i = 0; i < 20; i++) {
      dataPoints.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        value: Math.random() * 100,
      })
    }

    // Create clouds
    const clouds: { x: number; y: number; speed: number }[] = []
    for (let i = 0; i < 5; i++) {
      clouds.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height / 3),
        speed: 0.2 + Math.random() * 0.3,
      })
    }

    // Create rain drops
    const raindrops: { x: number; y: number; speed: number; active: boolean }[] = []
    for (let i = 0; i < 50; i++) {
      raindrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 2 + Math.random() * 3,
        active: false,
      })
    }

    // Create crops
    const crops: { x: number; y: number; growth: number; maxGrowth: number }[] = []
    for (let i = 0; i < 10; i++) {
      crops.push({
        x: 50 + (i * (canvas.width - 100)) / 10,
        y: canvas.height - 100,
        growth: 0,
        maxGrowth: 50 + Math.random() * 50,
      })
    }

    // Animation variables
    let frame = 0
    let isRaining = false
    let rainTimer = 0

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw sky gradient
      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      skyGradient.addColorStop(0, "#87CEEB")
      skyGradient.addColorStop(1, "#E0F7FA")
      ctx.fillStyle = skyGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw ground
      const groundGradient = ctx.createLinearGradient(0, canvas.height - 150, 0, canvas.height)
      groundGradient.addColorStop(0, "#8BC34A")
      groundGradient.addColorStop(1, "#795548")
      ctx.fillStyle = groundGradient
      ctx.fillRect(0, canvas.height - 150, canvas.width, 150)

      // Draw data visualization (scatter plot)
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
      ctx.strokeStyle = "#2E7D32"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(50, canvas.height - 200)

      for (let i = 0; i < dataPoints.length; i++) {
        const point = dataPoints[i]
        ctx.lineTo(point.x, canvas.height - 200 - point.value)
      }

      ctx.lineTo(canvas.width - 50, canvas.height - 200)
      ctx.stroke()
      ctx.lineTo(canvas.width - 50, canvas.height - 200)
      ctx.lineTo(50, canvas.height - 200)
      ctx.closePath()
      ctx.fill()

      // Update and draw clouds
      for (let i = 0; i < clouds.length; i++) {
        const cloud = clouds[i]
        cloud.x += cloud.speed

        if (cloud.x > canvas.width + 100) {
          cloud.x = -100
        }

        if (cloudImage.complete) {
          ctx.drawImage(cloudImage, cloud.x, cloud.y, 100, 60)
        }
      }

      // Handle rain
      if (frame % 300 === 0) {
        isRaining = !isRaining
        rainTimer = 0
      }

      if (isRaining) {
        rainTimer++

        // Activate raindrops
        for (let i = 0; i < raindrops.length; i++) {
          const raindrop = raindrops[i]

          if (!raindrop.active && Math.random() > 0.9) {
            raindrop.active = true
            raindrop.x = Math.random() * canvas.width
            raindrop.y = 0
          }

          if (raindrop.active) {
            raindrop.y += raindrop.speed

            // Draw raindrop
            ctx.fillStyle = "rgba(100, 149, 237, 0.7)"
            ctx.beginPath()
            ctx.ellipse(raindrop.x, raindrop.y, 1, 3, 0, 0, Math.PI * 2)
            ctx.fill()

            // Reset raindrop when it reaches the ground
            if (raindrop.y > canvas.height - 150) {
              raindrop.active = false

              // Make crops grow faster when it rains
              for (let j = 0; j < crops.length; j++) {
                const crop = crops[j]
                if (Math.abs(crop.x - raindrop.x) < 50 && crop.growth < crop.maxGrowth) {
                  crop.growth += 0.2
                }
              }
            }
          }
        }
      }

      // Update and draw crops
      for (let i = 0; i < crops.length; i++) {
        const crop = crops[i]

        // Slowly grow crops
        if (crop.growth < crop.maxGrowth) {
          crop.growth += 0.05
        }

        // Draw crop
        const cropHeight = 20 + crop.growth
        ctx.fillStyle = "#4CAF50"
        ctx.beginPath()
        ctx.rect(crop.x - 5, crop.y - cropHeight, 10, cropHeight)
        ctx.fill()

        // Draw crop top
        ctx.fillStyle = "#8BC34A"
        ctx.beginPath()
        ctx.ellipse(crop.x, crop.y - cropHeight, 15, 10, 0, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw ML prediction visualization
      if (frame % 100 === 0) {
        for (let i = 0; i < dataPoints.length; i++) {
          dataPoints[i].value = 50 + Math.sin(frame / 100 + i) * 30
        }
      }

      frame++
      requestAnimationFrame(animate)
    }

    // Start animation when images are loaded
    Promise.all([
      new Promise((resolve) => (cropImage.onload = resolve)),
      new Promise((resolve) => (cloudImage.onload = resolve)),
      new Promise((resolve) => (rainImage.onload = resolve)),
    ]).then(() => {
      animate()
    })

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-lg shadow-lg"
      style={{ background: "linear-gradient(to bottom, #e0f7fa, #b2ebf2)" }}
    />
  )
}

