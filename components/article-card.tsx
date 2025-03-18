import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ArticleCardProps {
  title: string
  description: string
  source: string
  sourceUrl: string
  imageUrl: string
}

export default function ArticleCard({ title, description, source, sourceUrl, imageUrl }: ArticleCardProps) {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <CardHeader className="pb-2">
        <h3 className="text-xl font-semibold">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="text-sm text-muted-foreground">
          Source:{" "}
          <Link href={sourceUrl} className="text-green-600 hover:underline">
            {source}
          </Link>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href={sourceUrl} className="flex items-center gap-2">
            Read Full Article <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

