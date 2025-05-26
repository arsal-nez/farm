
import Link from "next/link"
import { ArrowRight, Cloud, Droplets, LineChart, Leaf, Sun, BarChart3, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import WeatherWidget from "@/components/weather-widget"
import HeroAnimation from "@/components/hero-animation"
import ArticleCard from "@/components/article-card"
import FeatureCard from "@/components/feature-card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">AgrolyticAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="/predictions" className="text-sm font-medium hover:text-primary">
              Predictions
            </Link>
            <Link href="/recommendations" className="text-sm font-medium hover:text-primary">
              Recommendations
            </Link>
            <Link href="#articles" className="text-sm font-medium hover:text-primary">
              Articles
            </Link>
          </nav>
          {/* <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div> */}
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background">
          <div className="container flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Machine Learning-Based Crop Yield Prediction
              </h1>
              <p className="text-xl text-muted-foreground">Enhancing Agricultural Productivity with AI</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
              <div className="pt-4 text-sm text-muted-foreground">
                <p>Presented by: Agrolytics</p>
                <p>Team Members: MD ARSALAN</p>
              </div>
            </div>
            <div className="flex-1 relative h-[400px] w-full">
              <HeroAnimation />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-white dark:bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Project Objectives</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our machine learning system aims to revolutionize agricultural productivity through data-driven
                insights.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={<LineChart className="h-10 w-10 text-green-600" />}
                title="Predictive Model Development"
                description="Advanced machine learning models for accurate crop yield estimation based on multiple factors."
              />
              <FeatureCard
                icon={<Cloud className="h-10 w-10 text-green-600" />}
                title="Data Integration"
                description="Integration of real-time weather and soil data for improved prediction accuracy."
              />
              <FeatureCard
                icon={<BarChart3 className="h-10 w-10 text-green-600" />}
                title="Resource Optimization"
                description="Insights for farmers to optimize resource use effectively and maximize yield."
              />
              <FeatureCard
                icon={<Leaf className="h-10 w-10 text-green-600" />}
                title="Scalable Agri-Tech Solutions"
                description="Scalable deployment for real-world applications across different farming environments."
              />
              <FeatureCard
                icon={<Sun className="h-10 w-10 text-green-600" />}
                title="Data-Driven Precision"
                description="Utilizing historical agricultural data to improve prediction accuracy and farming decisions."
              />
              <FeatureCard
                icon={<Droplets className="h-10 w-10 text-green-600" />}
                title="Sustainable Farming"
                description="Promoting sustainable farming practices through optimized resource allocation."
              />
            </div>
          </div>
        </section>

        {/* Weather & Predictions Section */}
        <section id="predictions" className="py-16 bg-green-50 dark:bg-green-950/20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Weather & Yield Predictions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get real-time weather data and accurate crop yield predictions based on our advanced machine learning
                models.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud className="h-5 w-5 text-blue-500" />
                    Weather Details
                  </CardTitle>
                  <CardDescription>Access real-time weather data for your location</CardDescription>
                </CardHeader>
                <CardContent>
                  <WeatherWidget />
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">View Detailed Weather Forecast</Button>
                </CardFooter>
              </Card>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-green-600" />
                    Yield Prediction
                  </CardTitle>
                  <CardDescription>Get accurate crop yield predictions based on various factors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Crop Type</label>
                        <select className="w-full p-2 border rounded-md">
                          <option>Rice</option>
                          <option>Wheat</option>
                          <option>Corn</option>
                          <option>Soybeans</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Soil Type</label>
                        <select className="w-full p-2 border rounded-md">
                          <option>Clay</option>
                          <option>Sandy</option>
                          <option>Loamy</option>
                          <option>Silt</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Area (hectares)</label>
                        <input type="number" className="w-full p-2 border rounded-md" placeholder="Enter area" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Season</label>
                        <select className="w-full p-2 border rounded-md">
                          <option>Kharif</option>
                          <option>Rabi</option>
                          <option>Zaid</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Generate Yield Prediction</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Recommendations Section */}
        <section id="recommendations" className="py-16 bg-white dark:bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Smart Recommendations</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get personalized recommendations based on your farm's specific conditions and needs.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    Irrigation Planning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Optimize your water usage with AI-driven irrigation schedules based on soil moisture, weather
                    forecasts, and crop water requirements.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Recommendations
                  </Button>
                </CardFooter>
              </Card>
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-green-600" />
                    Fertilizer Usage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Get precise fertilizer recommendations based on soil nutrient analysis, crop requirements, and
                    environmental factors.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Recommendations
                  </Button>
                </CardFooter>
              </Card>
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-orange-500" />
                    Crop Planning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Plan your crop rotation and planting schedule based on market trends, weather forecasts, and soil
                    health indicators.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Recommendations
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section id="articles" className="py-16 bg-green-50 dark:bg-green-950/20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Latest Articles</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Stay updated with the latest research and insights from our data sources.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ArticleCard
                title="FAO's Latest Agricultural Data Insights"
                description="Explore the latest agricultural statistics and trends from the Food and Agriculture Organization."
                source="FAO"
                sourceUrl="http://www.fao.org/statistics"
                imageUrl="/placeholder.svg?height=200&width=400"
              />
              <ArticleCard
                title="Using NASA EarthData for Precision Agriculture"
                description="Learn how satellite imagery from NASA can help improve farming decisions and crop yield predictions."
                source="NASA EarthData"
                sourceUrl="https://earthdata.nasa.gov"
                imageUrl="/placeholder.svg?height=200&width=400"
              />
              <ArticleCard
                title="Understanding Soil Health for Better Crop Yields"
                description="Discover how soil health indicators can help predict and improve crop yields across different regions."
                source="Soil Health Card (India)"
                sourceUrl="https://soilhealth.dac.gov.in"
                imageUrl="/placeholder.svg?height=200&width=400"
              />
            </div>
            <div className="mt-8 text-center">
              <Button variant="outline" className="gap-2">
                <BookOpen className="h-4 w-4" />
                View All Articles
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-green-600 text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Farm?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Join thousands of farmers who are already using AgrolyticAI to increase their crop yields and optimize
              resource usage.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="default" className="bg-white text-green-600 hover:bg-gray-100">
                Sign Up Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-green-700">
                Request Demo
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Leaf className="h-6 w-6 text-green-500" />
                <span className="text-xl font-bold text-white">AgrolyticAI</span>
              </div>
              <p className="text-sm">Enhancing Agricultural Productivity with AI</p>
              <p className="text-sm">Team Members: MD ARSALAN, SHIKHAR SINGH, SIMPI KUMARI, UTTAM RAJ</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Features</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-green-500">
                    Yield Prediction
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-500">
                    Weather Analysis
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-500">
                    Recommendations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-500">
                    Resource Optimization
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Data Sources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="http://www.fao.org/statistics" className="hover:text-green-500">
                    FAO
                  </Link>
                </li>
                <li>
                  <Link href="https://icar.org.in" className="hover:text-green-500">
                    ICAR
                  </Link>
                </li>
                <li>
                  <Link href="https://earthdata.nasa.gov" className="hover:text-green-500">
                    NASA EarthData
                  </Link>
                </li>
                <li>
                  <Link href="https://openweathermap.org/api" className="hover:text-green-500">
                    OpenWeather API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>Email: info@agrolyticai.com</li>
                <li>Phone: +91 1234567890</li>
                <li>Address: Agritech Innovation Hub, Bangalore, India</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} AgrolyticAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

