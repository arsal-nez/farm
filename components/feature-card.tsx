import type { ReactNode } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3">{icon}</div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

