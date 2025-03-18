"use client"

import { useEffect, useRef } from "react"

export default function PredictionCharts() {
  const featureImportanceRef = useRef<HTMLCanvasElement>(null)
  const scatterPlotRef = useRef<HTMLCanvasElement>(null)
  const errorDistributionRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Draw Feature Importance Chart
    if (featureImportanceRef.current) {
      const ctx = featureImportanceRef.current.getContext("2d")
      if (ctx) {
        // Clear canvas
        ctx.clearRect(0, 0, featureImportanceRef.current.width, featureImportanceRef.current.height)

        // Data
        const features = ["Soil Moisture", "Rainfall", "Temperature", "Other"]
        const importance = [40, 35, 20, 5]
        const colors = ["#3b82f6", "#22c55e", "#f97316", "#6b7280"]

        // Draw bars
        const barWidth = 60
        const spacing = 40
        const startX = 80
        const bottomY = 220

        features.forEach((feature, i) => {
          const x = startX + i * (barWidth + spacing)
          const barHeight = importance[i] * 4 // Scale factor

          // Draw bar
          ctx.fillStyle = colors[i]
          ctx.fillRect(x, bottomY - barHeight, barWidth, barHeight)

          // Draw feature name
          ctx.fillStyle = "#000000"
          ctx.font = "12px Arial"
          ctx.textAlign = "center"
          ctx.fillText(feature, x + barWidth / 2, bottomY + 20)

          // Draw importance percentage
          ctx.font = "bold 14px Arial"
          ctx.fillText(`${importance[i]}%`, x + barWidth / 2, bottomY - barHeight - 10)
        })

        // Draw title
        ctx.fillStyle = "#000000"
        ctx.font = "bold 16px Arial"
        ctx.textAlign = "center"
        ctx.fillText("Feature Importance Chart", featureImportanceRef.current.width / 2, 30)

        // Draw y-axis
        ctx.beginPath()
        ctx.moveTo(50, 40)
        ctx.lineTo(50, bottomY)
        ctx.lineTo(featureImportanceRef.current.width - 50, bottomY)
        ctx.strokeStyle = "#d1d5db"
        ctx.stroke()

        // Draw y-axis labels
        ctx.fillStyle = "#6b7280"
        ctx.font = "12px Arial"
        ctx.textAlign = "right"
        for (let i = 0; i <= 100; i += 20) {
          const y = bottomY - i * 4
          ctx.fillText(`${i}%`, 45, y + 5)

          // Draw horizontal grid line
          ctx.beginPath()
          ctx.moveTo(50, y)
          ctx.lineTo(featureImportanceRef.current.width - 50, y)
          ctx.strokeStyle = "#e5e7eb"
          ctx.stroke()
        }
      }
    }

    // Draw Scatter Plot
    if (scatterPlotRef.current) {
      const ctx = scatterPlotRef.current.getContext("2d")
      if (ctx) {
        // Clear canvas
        ctx.clearRect(0, 0, scatterPlotRef.current.width, scatterPlotRef.current.height)

        // Draw title
        ctx.fillStyle = "#000000"
        ctx.font = "bold 16px Arial"
        ctx.textAlign = "center"
        ctx.fillText("Prediction vs. Actual Yield", scatterPlotRef.current.width / 2, 30)

        // Draw axes
        const margin = 50
        const width = scatterPlotRef.current.width - 2 * margin
        const height = scatterPlotRef.current.height - 2 * margin
        const bottomY = scatterPlotRef.current.height - margin

        ctx.beginPath()
        ctx.moveTo(margin, margin)
        ctx.lineTo(margin, bottomY)
        ctx.lineTo(scatterPlotRef.current.width - margin, bottomY)
        ctx.strokeStyle = "#d1d5db"
        ctx.stroke()

        // Draw axis labels
        ctx.fillStyle = "#000000"
        ctx.font = "14px Arial"
        ctx.textAlign = "center"
        ctx.fillText("Actual Yield (kg/hc)", scatterPlotRef.current.width / 2, bottomY + 35)

        ctx.save()
        ctx.translate(margin - 35, scatterPlotRef.current.height / 2)
        ctx.rotate(-Math.PI / 2)
        ctx.textAlign = "center"
        ctx.fillText("Predicted Yield (kg/hc)", 0, 0)
        ctx.restore()

        // Draw diagonal line (perfect prediction)
        ctx.beginPath()
        ctx.moveTo(margin, bottomY)
        ctx.lineTo(scatterPlotRef.current.width - margin, margin)
        ctx.strokeStyle = "#22c55e"
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.lineWidth = 1

        // Generate some sample data points
        const points = []
        for (let i = 0; i < 30; i++) {
          const actual = 2 + Math.random() * 6
          const predicted = actual + (Math.random() - 0.5) * 2
          points.push({ actual, predicted })
        }

        // Draw data points
        points.forEach((point) => {
          const x = margin + (point.actual / 8) * width
          const y = bottomY - (point.predicted / 8) * height

          ctx.beginPath()
          ctx.arc(x, y, 5, 0, Math.PI * 2)
          ctx.fillStyle = "#3b82f6"
          ctx.fill()
        })

        // Draw axis ticks and labels
        ctx.fillStyle = "#6b7280"
        ctx.font = "12px Arial"
        ctx.textAlign = "center"

        for (let i = 0; i <= 4; i++) {
          // X-axis
          const x = margin + (i / 4) * width
          ctx.beginPath()
          ctx.moveTo(x, bottomY)
          ctx.lineTo(x, bottomY + 5)
          ctx.strokeStyle = "#d1d5db"
          ctx.stroke()
          ctx.fillText((i * 1000).toString(), x, bottomY + 20)

          // Y-axis
          const y = bottomY - (i / 4) * height
          ctx.beginPath()
          ctx.moveTo(margin - 5, y)
          ctx.lineTo(margin, y)
          ctx.stroke()
          ctx.textAlign = "right"
          ctx.fillText((i * 1000).toString(), margin - 10, y + 5)
          ctx.textAlign = "center"
        }
      }
    }

    // Draw Error Distribution Histogram
    if (errorDistributionRef.current) {
      const ctx = errorDistributionRef.current.getContext("2d")
      if (ctx) {
        // Clear canvas
        ctx.clearRect(0, 0, errorDistributionRef.current.width, errorDistributionRef.current.height)

        // Draw title
        ctx.fillStyle = "#000000"
        ctx.font = "bold 16px Arial"
        ctx.textAlign = "center"
        ctx.fillText("Error Distribution Histogram", errorDistributionRef.current.width / 2, 30)

        // Draw axes
        const margin = 50
        const width = errorDistributionRef.current.width - 2 * margin
        const height = errorDistributionRef.current.height - 2 * margin
        const bottomY = errorDistributionRef.current.height - margin

        ctx.beginPath()
        ctx.moveTo(margin, margin)
        ctx.lineTo(margin, bottomY)
        ctx.lineTo(errorDistributionRef.current.width - margin, bottomY)
        ctx.strokeStyle = "#d1d5db"
        ctx.stroke()

        // Draw axis labels
        ctx.fillStyle = "#000000"
        ctx.font = "14px Arial"
        ctx.textAlign = "center"
        ctx.fillText("Prediction Error (kg/hc)", errorDistributionRef.current.width / 2, bottomY + 35)

        ctx.fillStyle = "#000000"
        ctx.font = "14px Arial"
        ctx.textAlign = "right"
        ctx.fillText("Frequency", margin - 10, margin - 10)

        // Generate histogram data
        const binWidth = 0.2
        const bins = []
        for (let i = -2; i <= 2; i += binWidth) {
          bins.push({ min: i, max: i + binWidth, count: 0 })
        }

        // Generate sample error data
        const errors = []
        for (let i = 0; i < 100; i++) {
          // Normal distribution around 0
          const error =
            (Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() - 3) * 1.5
          errors.push(error)

          // Count into bins
          for (const bin of bins) {
            if (error >= bin.min && error < bin.max) {
              bin.count++
              break
            }
          }
        }

        // Find max count for scaling
        const maxCount = Math.max(...bins.map((bin) => bin.count))

        // Draw histogram bars
        bins.forEach((bin) => {
          const x = margin + ((bin.min + 2) / 4) * width
          const barHeight = (bin.count / maxCount) * height
          const barWidth = (binWidth / 4) * width

          // Color based on error (red for negative, green for positive)
          let color = "#22c55e" // green
          if (bin.min < -0.1) {
            color = "#ef4444" // red
          } else if (bin.min >= -0.1 && bin.min <= 0.1) {
            color = "#3b82f6" // blue
          }

          ctx.fillStyle = color
          ctx.fillRect(x, bottomY - barHeight, barWidth, barHeight)
        })

        // Draw center line at 0
        const zeroX = margin + (2 / 4) * width
        ctx.beginPath()
        ctx.moveTo(zeroX, margin)
        ctx.lineTo(zeroX, bottomY)
        ctx.strokeStyle = "#000000"
        ctx.setLineDash([5, 5])
        ctx.stroke()
        ctx.setLineDash([])

        // Draw axis ticks and labels
        ctx.fillStyle = "#6b7280"
        ctx.font = "12px Arial"
        ctx.textAlign = "center"

        for (let i = -2; i <= 2; i++) {
          const x = margin + ((i + 2) / 4) * width
          ctx.beginPath()
          ctx.moveTo(x, bottomY)
          ctx.lineTo(x, bottomY + 5)
          ctx.strokeStyle = "#d1d5db"
          ctx.stroke()
          ctx.fillText(i.toString(), x, bottomY + 20)
        }

        // Add annotation
        ctx.fillStyle = "#000000"
        ctx.font = "italic 12px Arial"
        ctx.textAlign = "center"
        ctx.fillText(
          "Ideal Shape: Centered around 0 for balanced predictions",
          errorDistributionRef.current.width / 2,
          50,
        )
      }
    }
  }, [])

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border">
        <h3 className="text-lg font-medium mb-4">Feature Importance Chart</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Top Factors: Soil Moisture (40%), Rainfall (35%), Temperature (20%)
        </p>
        <div className="flex justify-center">
          <canvas ref={featureImportanceRef} width={500} height={300} className="max-w-full h-auto"></canvas>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          <strong>Insight:</strong> Focus on these factors for better yield predictions. Soil moisture is the most
          critical factor.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border">
        <h3 className="text-lg font-medium mb-4">Prediction vs. Actual Yield Scatter Plot</h3>
        <div className="flex justify-center">
          <canvas ref={scatterPlotRef} width={500} height={300} className="max-w-full h-auto"></canvas>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          <strong>Goal:</strong> Points should align along the diagonal (green line) for perfect predictions.
          <br />
          <strong>Insight:</strong> Deviations from the diagonal show where the model under- or over-predicts.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border">
        <h3 className="text-lg font-medium mb-4">Error Distribution Histogram</h3>
        <div className="flex justify-center">
          <canvas ref={errorDistributionRef} width={500} height={300} className="max-w-full h-auto"></canvas>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          <strong>Ideal Shape:</strong> Centered around 0 for balanced predictions.
          <br />
          <strong>Insight:</strong> The model shows a slight tendency to overpredict (more errors on the positive side).
        </p>
      </div>
    </div>
  )
}

